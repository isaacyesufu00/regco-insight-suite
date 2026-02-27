import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { FileText, Clock, CheckCircle, AlertTriangle, FilePlus, BarChart3, Shield } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface Profile {
  full_name: string | null;
  company_name: string | null;
  rc_number: string | null;
  account_status: string;
}

interface Report {
  id: string;
  report_name: string;
  report_type: string | null;
  status: string;
  created_at: string;
  file_path: string | null;
}

const DashboardHome = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      const [profileRes, reportsRes] = await Promise.all([
        supabase.from("profiles").select("full_name, company_name, rc_number, account_status").eq("id", user.id).maybeSingle(),
        supabase.from("reports").select("*").eq("user_id", user.id).order("created_at", { ascending: false }),
      ]);

      if (profileRes.data) setProfile(profileRes.data);
      if (reportsRes.data) setReports(reportsRes.data);
      setLoading(false);
    };

    fetchData();

    // Real-time subscription for reports
    const channel = supabase
      .channel("reports-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "reports", filter: `user_id=eq.${user.id}` }, (payload) => {
        if (payload.eventType === "INSERT") {
          setReports((prev) => [payload.new as Report, ...prev]);
        } else if (payload.eventType === "UPDATE") {
          setReports((prev) => prev.map((r) => (r.id === (payload.new as Report).id ? (payload.new as Report) : r)));
        } else if (payload.eventType === "DELETE") {
          setReports((prev) => prev.filter((r) => r.id !== (payload.old as { id: string }).id));
        }
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  const handleDownload = async (filePath: string, reportName: string) => {
    const { data, error } = await supabase.storage.from("reports").createSignedUrl(filePath, 3600);
    if (data?.signedUrl) {
      const a = document.createElement("a");
      a.href = data.signedUrl;
      a.download = reportName;
      a.click();
    }
  };

  const totalReports = reports.length;
  const pendingReports = reports.filter((r) => r.status === "Processing" || r.status === "Draft").length;
  const readyReports = reports.filter((r) => r.status === "Ready").length;

  const statusVariant = (status: string) => {
    switch (status) {
      case "Ready": return "default";
      case "Processing": return "secondary";
      case "Failed": return "destructive";
      default: return "outline";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Welcome, {profile?.company_name || "User"}
          </h1>
          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
            {profile?.rc_number && <span>RC: {profile.rc_number}</span>}
            <Badge variant={profile?.account_status === "Active" ? "default" : "secondary"}>
              {profile?.account_status || "Active"}
            </Badge>
          </div>
        </div>
        <Button asChild>
          <Link to="/dashboard/new-report">
            <FilePlus className="mr-2 h-4 w-4" />
            Create New Report
          </Link>
        </Button>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{totalReports}</p>
              <p className="text-sm text-muted-foreground">Total Reports</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <Clock className="w-5 h-5 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{pendingReports}</p>
              <p className="text-sm text-muted-foreground">Pending</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-accent flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{readyReports}</p>
              <p className="text-sm text-muted-foreground">Ready for Download</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Reports</CardTitle>
        </CardHeader>
        <CardContent>
          {reports.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-1">No reports yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Click Create New Report to get started.
              </p>
              <Button asChild variant="outline">
                <Link to="/dashboard/new-report">
                  <FilePlus className="mr-2 h-4 w-4" />
                  Create New Report
                </Link>
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Date Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.report_name}</TableCell>
                    <TableCell>{report.report_type || "—"}</TableCell>
                    <TableCell>{new Date(report.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={statusVariant(report.status)}>{report.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {report.status === "Ready" && report.file_path && (
                        <Button size="sm" variant="outline" onClick={() => handleDownload(report.file_path!, report.report_name)}>
                          Download
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardHome;
