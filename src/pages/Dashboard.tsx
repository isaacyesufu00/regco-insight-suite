import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { FileText, BarChart3, Shield, CheckCircle, Clock, AlertTriangle, LogOut } from "lucide-react";

interface ComplianceScore {
  score: number;
  status_label: string;
}

interface ReportStatus {
  id: string;
  report_name: string;
  report_subtype: string;
  status: string;
}

interface UserStats {
  on_time_rate: number;
  violations: number;
  reports_filed: number;
}

const defaultReports: ReportStatus[] = [
  { id: "1", report_name: "CBN Report – Ready for Submission", report_subtype: "Q4 2025 Regulatory Return", status: "Ready" },
  { id: "2", report_name: "NDIC Return – Pending Review", report_subtype: "Annual Compliance Filing", status: "Pending" },
  { id: "3", report_name: "Risk Alert: Filing Deadline in 3 Days", report_subtype: "SEC Quarterly Report", status: "Urgent" },
];

const statusOrder = { Ready: 0, Pending: 1, Urgent: 2 };

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [score, setScore] = useState<ComplianceScore>({ score: 0, status_label: "No data yet" });
  const [reports, setReports] = useState<ReportStatus[]>(defaultReports);
  const [stats, setStats] = useState<UserStats>({ on_time_rate: 0, violations: 0, reports_filed: 0 });

  useEffect(() => {
    if (!user) return;
    const fetchData = async () => {
      const [scoreRes, reportRes, statsRes] = await Promise.all([
        supabase.from("compliance_scores").select("score, status_label").eq("user_id", user.id).order("created_at", { ascending: false }).limit(1).maybeSingle(),
        supabase.from("report_statuses").select("*").eq("user_id", user.id),
        supabase.from("user_stats").select("on_time_rate, violations, reports_filed").eq("user_id", user.id).maybeSingle(),
      ]);

      if (scoreRes.data) setScore(scoreRes.data);
      if (reportRes.data && reportRes.data.length > 0) {
        const sorted = [...reportRes.data].sort(
          (a, b) => (statusOrder[a.status as keyof typeof statusOrder] ?? 3) - (statusOrder[b.status as keyof typeof statusOrder] ?? 3)
        );
        setReports(sorted);
      }
      if (statsRes.data) setStats(statsRes.data);
    };
    fetchData();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const statusConfig = {
    Ready: { color: "#22c55e", bg: "#f0fdf4", icon: CheckCircle },
    Pending: { color: "#f59e0b", bg: "#fffbeb", icon: Clock },
    Urgent: { color: "#ef4444", bg: "#fef2f2", icon: AlertTriangle },
  };

  const circumference = 2 * Math.PI * 52;
  const strokeDashoffset = circumference - (score.score / 100) * circumference;

  return (
    <div className="min-h-screen" style={{ background: "#eef2ff", fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: "#ff5f57" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
            <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
          </div>
          <span className="text-base font-semibold ml-2" style={{ color: "#1a1a2e" }}>
            RegCo Dashboard
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 text-sm font-medium px-4 py-2 rounded-xl hover:bg-white/60 transition-colors"
          style={{ color: "#8a8a9a" }}
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>

      {/* Dashboard content */}
      <div className="max-w-6xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Compliance Score Card */}
          <div className="rounded-2xl p-8 flex flex-col items-center justify-center" style={{ background: "#f6f8fc", border: "1px solid #e8ecf4" }}>
            <div className="relative w-32 h-32 mb-4">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e8ecf4" strokeWidth="8" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#3b6ef8" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} style={{ transition: "stroke-dashoffset 1s ease" }} />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold" style={{ color: "#3b6ef8" }}>{score.score}</span>
              </div>
            </div>
            <p className="text-base font-semibold" style={{ color: "#1a1a2e" }}>Compliance Score</p>
            <p className="text-sm mt-1" style={{ color: "#8a8a9a" }}>{score.status_label}</p>
          </div>

          {/* Report Status Card */}
          <div className="lg:col-span-2 rounded-2xl p-6" style={{ background: "#ffffff", border: "1px solid #e8ecf4" }}>
            <h3 className="text-sm font-semibold mb-4" style={{ color: "#8a8a9a", textTransform: "uppercase", letterSpacing: "0.05em" }}>Report Status</h3>
            <div className="space-y-3">
              {reports.map((report) => {
                const config = statusConfig[report.status as keyof typeof statusConfig] || statusConfig.Pending;
                const Icon = config.icon;
                return (
                  <div key={report.id} className="flex items-center gap-4 p-3 rounded-xl" style={{ background: "#f9fafb" }}>
                    <div className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: config.bg }}>
                      <Icon className="w-4 h-4" style={{ color: config.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: "#1a1a2e" }}>{report.report_name}</p>
                      <p className="text-xs truncate" style={{ color: "#8a8a9a" }}>{report.report_subtype}</p>
                    </div>
                    <span className="text-xs font-semibold px-3 py-1 flex-shrink-0" style={{ background: config.bg, color: config.color, borderRadius: 999 }}>{report.status}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="rounded-2xl p-6 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid #e8ecf4" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#eef2ff" }}>
              <FileText className="w-5 h-5" style={{ color: "#3b6ef8" }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>{stats.reports_filed}</p>
              <p className="text-sm" style={{ color: "#8a8a9a" }}>Reports Filed</p>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid #e8ecf4" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#eef2ff" }}>
              <BarChart3 className="w-5 h-5" style={{ color: "#3b6ef8" }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>{stats.on_time_rate}%</p>
              <p className="text-sm" style={{ color: "#8a8a9a" }}>On-Time Rate</p>
            </div>
          </div>
          <div className="rounded-2xl p-6 flex items-center gap-4" style={{ background: "#ffffff", border: "1px solid #e8ecf4" }}>
            <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: "#eef2ff" }}>
              <Shield className="w-5 h-5" style={{ color: "#3b6ef8" }} />
            </div>
            <div>
              <p className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>{stats.violations}</p>
              <p className="text-sm" style={{ color: "#8a8a9a" }}>Violations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
