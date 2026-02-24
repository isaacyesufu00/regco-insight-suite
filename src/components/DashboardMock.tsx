import { CheckCircle, Clock, AlertTriangle, BarChart3, FileText, Shield } from "lucide-react";

const DashboardMock = () => {
  return (
    <div className="card-elevated-lg rounded-2xl border border-border/60 overflow-hidden">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60 bg-muted/30">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-destructive/60" />
          <span className="w-3 h-3 rounded-full bg-warning/60" />
          <span className="w-3 h-3 rounded-full bg-success/60" />
        </div>
        <span className="text-xs text-muted-foreground font-medium ml-2">RegCo Dashboard</span>
      </div>

      <div className="p-5 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {/* Compliance Score */}
        <div className="md:col-span-1 bg-accent/40 rounded-xl p-5 flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full border-4 border-primary flex items-center justify-center mb-3">
            <span className="text-2xl font-bold text-primary">94</span>
          </div>
          <p className="text-sm font-semibold text-foreground">Compliance Score</p>
          <p className="text-xs text-muted-foreground mt-1">Excellent standing</p>
        </div>

        {/* Report cards */}
        <div className="md:col-span-2 flex flex-col gap-3">
          <div className="flex items-center gap-3 bg-accent/30 rounded-lg p-4">
            <CheckCircle className="w-5 h-5 text-success shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">CBN Report – Ready for Submission</p>
              <p className="text-xs text-muted-foreground">Q4 2025 Regulatory Return</p>
            </div>
            <span className="text-xs font-medium text-success bg-success/10 px-2.5 py-1 rounded-full shrink-0">Ready</span>
          </div>
          <div className="flex items-center gap-3 bg-accent/30 rounded-lg p-4">
            <Clock className="w-5 h-5 text-warning shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">NDIC Return – Pending Review</p>
              <p className="text-xs text-muted-foreground">Annual Compliance Filing</p>
            </div>
            <span className="text-xs font-medium text-warning bg-warning/10 px-2.5 py-1 rounded-full shrink-0">Pending</span>
          </div>
          <div className="flex items-center gap-3 bg-accent/30 rounded-lg p-4">
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground">Risk Alert: Filing Deadline in 3 Days</p>
              <p className="text-xs text-muted-foreground">SEC Quarterly Report</p>
            </div>
            <span className="text-xs font-medium text-destructive bg-destructive/10 px-2.5 py-1 rounded-full shrink-0">Urgent</span>
          </div>
        </div>

        {/* Bottom row */}
        <div className="md:col-span-3 grid grid-cols-3 gap-3">
          <div className="bg-accent/30 rounded-lg p-4 flex items-center gap-3">
            <FileText className="w-5 h-5 text-primary" />
            <div>
              <p className="text-lg font-bold text-foreground">24</p>
              <p className="text-xs text-muted-foreground">Reports Filed</p>
            </div>
          </div>
          <div className="bg-accent/30 rounded-lg p-4 flex items-center gap-3">
            <BarChart3 className="w-5 h-5 text-primary" />
            <div>
              <p className="text-lg font-bold text-foreground">98%</p>
              <p className="text-xs text-muted-foreground">On-Time Rate</p>
            </div>
          </div>
          <div className="bg-accent/30 rounded-lg p-4 flex items-center gap-3">
            <Shield className="w-5 h-5 text-primary" />
            <div>
              <p className="text-lg font-bold text-foreground">0</p>
              <p className="text-xs text-muted-foreground">Violations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMock;
