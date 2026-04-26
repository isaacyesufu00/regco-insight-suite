import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { CountUp } from "@/components/motion/CountUp";

interface Profile {
  company_name: string | null;
}

interface Report {
  id: string;
  report_name: string;
  report_type: string | null;
  status: string;
  created_at: string;
  file_path: string | null;
  reporting_period_start: string | null;
  reporting_period_end: string | null;
  pdf_url: string | null;
  report_url: string | null;
}

/* ----------------------------- Status helpers ----------------------------- */

const STATUS_STYLE: Record<
  string,
  { label: string; bg: string; border: string; color: string }
> = {
  Pending: { label: "Pending", bg: "rgba(142,142,147,0.12)", border: "rgba(142,142,147,0.18)", color: "#1D1D1F" },
  Processing: { label: "Processing", bg: "rgba(255,159,10,0.12)", border: "rgba(255,159,10,0.18)", color: "#1D1D1F" },
  Ready: { label: "Ready", bg: "rgba(52,199,89,0.12)", border: "rgba(52,199,89,0.18)", color: "#1D1D1F" },
  Failed: { label: "Failed", bg: "rgba(255,59,48,0.12)", border: "rgba(255,59,48,0.18)", color: "#1D1D1F" },
};

const StatusPill = ({ status }: { status: string }) => {
  const s = STATUS_STYLE[status] || STATUS_STYLE.Pending;
  return (
    <span
      style={{
        display: "inline-block",
        background: s.bg,
        border: `1px solid ${s.border}`,
        color: s.color,
        borderRadius: 999,
        padding: "4px 12px",
        fontSize: 12,
        fontWeight: 500,
      }}
    >
      {s.label}
    </span>
  );
};

/* ----------------------------- Page ----------------------------- */

const DashboardHome = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    Promise.all([
      supabase.from("profiles").select("company_name").eq("id", user.id).maybeSingle(),
      supabase.from("reports").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
    ]).then(([p, r]) => {
      if (p.data) setProfile(p.data);
      if (r.data) setReports(r.data as Report[]);
      setLoading(false);
    });

    const channel = supabase
      .channel("dashboard-home")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "reports", filter: `user_id=eq.${user.id}` },
        (payload) => {
          if (payload.eventType === "INSERT") setReports((p) => [payload.new as Report, ...p]);
          else if (payload.eventType === "UPDATE") {
            const u = payload.new as Report;
            setReports((p) => p.map((r) => (r.id === u.id ? u : r)));
            if (u.status === "Ready")
              toast({ title: "Report ready", description: `"${u.report_name}" is ready to download.` });
          } else if (payload.eventType === "DELETE") {
            setReports((p) => p.filter((r) => r.id !== (payload.old as { id: string }).id));
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, toast]);

  const handleDownload = async (r: Report) => {
    let url: string | null = null;
    if (r.report_url) {
      const { data } = supabase.storage.from("reports").getPublicUrl(r.report_url);
      url = data?.publicUrl || null;
    } else if (r.pdf_url) {
      url = r.pdf_url;
    } else if (r.file_path) {
      const { data } = await supabase.storage.from("reports").createSignedUrl(r.file_path, 3600);
      url = data?.signedUrl || null;
    }
    if (!url) {
      toast({ title: "Download unavailable", description: "Try again shortly.", variant: "destructive" });
      return;
    }
    const a = document.createElement("a");
    a.href = url;
    a.download = r.report_name;
    a.click();
  };

  const counts = {
    Pending: reports.filter((r) => r.status === "Pending").length,
    Processing: reports.filter((r) => r.status === "Processing").length,
    Ready: reports.filter((r) => r.status === "Ready").length,
    Failed: reports.filter((r) => r.status === "Failed").length,
  };

  const recentReports = reports.slice(0, 8);
  const latestReportName = reports[0]?.report_name || "No reports yet";

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2" style={{ borderColor: "#0066CC" }} />
      </div>
    );
  }

  const cardStyle: React.CSSProperties = {
    background: "#FFFFFF",
    border: "1px solid rgba(0,0,0,0.08)",
    borderRadius: 18,
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
  };

  return (
    <div className="space-y-3">
      {/* Header card */}
      <div
        style={{ ...cardStyle, padding: "20px 24px" }}
        className="flex items-center justify-between"
      >
        <div>
          <div className="flex items-center gap-2">
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "#22C55E",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: 14, color: "#888888" }}>
              {profile?.company_name || "Your Institution"}
            </span>
          </div>
          <h2
            style={{
              fontSize: 20,
              fontWeight: 600,
              color: "#1D1D1F",
              marginTop: 4,
              letterSpacing: "-0.01em",
            }}
          >
            {latestReportName}
          </h2>
        </div>
        <span
          style={{
            background: "#1D1D1F",
            color: "#FFFFFF",
            borderRadius: "50%",
            width: 32,
            height: 32,
            fontSize: 14,
            fontWeight: 600,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {reports.length}
        </span>
      </div>

      {/* Status summary cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { status: "Pending", subtitle: "Awaiting upload" },
          { status: "Processing", subtitle: "Validating CBS data" },
          { status: "Ready", subtitle: "Available to download" },
          { status: "Failed", subtitle: "Needs attention" },
        ].map((c) => (
          <div key={c.status} style={{ ...cardStyle, padding: 24 }}>
            <StatusPill status={c.status} />
            <p
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: "#1D1D1F",
                marginTop: 16,
                lineHeight: 1,
                letterSpacing: "-0.03em",
              }}
            >
              <CountUp to={counts[c.status as keyof typeof counts]} />
            </p>
            <p style={{ fontSize: 17, color: "#1D1D1F", marginTop: 6 }}>reports</p>
            <p style={{ fontSize: 13, color: "#6E6E73", marginTop: 4 }}>{c.subtitle}</p>
          </div>
        ))}
      </div>

      {/* Recent reports table */}
      <div style={{ ...cardStyle, padding: 0, overflow: "hidden" }}>
        <div
          className="flex items-center justify-between"
          style={{
            background: "#F5F5F7",
            padding: "14px 20px",
            borderBottom: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <h3 style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F" }}>Recent Reports</h3>
          <Link
            to="/dashboard/reports"
            style={{ fontSize: 13, fontWeight: 500, color: "#0066CC" }}
          >
            View all →
          </Link>
        </div>

        {recentReports.length === 0 ? (
          <div className="text-center py-12 px-6">
            <p style={{ color: "#888888", fontSize: 14 }}>
              No reports yet.{" "}
              <Link to="/dashboard/new-report" style={{ color: "#0066CC", fontWeight: 600 }}>
                Create your first report
              </Link>
              .
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr style={{ background: "#F5F5F7", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
                  {["REPORT", "TYPE", "PERIOD", "STATUS", "DATE", "ACTION"].map((h) => (
                    <th
                      key={h}
                      style={{
                        textAlign: "left",
                        padding: "12px 20px",
                        fontSize: 11,
                        fontWeight: 500,
                        color: "#6E6E73",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentReports.map((r) => (
                  <tr
                    key={r.id}
                    className="transition-colors"
                    style={{ borderBottom: "1px solid rgba(0,0,0,0.05)" }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(0,0,0,0.02)")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ padding: "14px 20px", fontSize: 14, fontWeight: 500, color: "#1D1D1F" }}>
                      {r.report_name}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#888888" }}>
                      {r.report_type || "—"}
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#888888" }}>
                      {r.reporting_period_start && r.reporting_period_end
                        ? `${new Date(r.reporting_period_start).toLocaleDateString()} – ${new Date(r.reporting_period_end).toLocaleDateString()}`
                        : "—"}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      <StatusPill status={r.status} />
                    </td>
                    <td style={{ padding: "14px 20px", fontSize: 13, color: "#AAAAAA" }}>
                      {new Date(r.created_at).toLocaleDateString()}
                    </td>
                    <td style={{ padding: "14px 20px" }}>
                      {r.status === "Ready" ? (
                        <button
                          onClick={() => handleDownload(r)}
                          style={{ fontSize: 13, fontWeight: 500, color: "#0066CC" }}
                          className="hover:underline"
                        >
                          Download
                        </button>
                      ) : (
                        <Link
                          to="/dashboard/reports"
                          style={{ fontSize: 13, fontWeight: 500, color: "#888888" }}
                          className="hover:underline"
                        >
                          View
                        </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardHome;
