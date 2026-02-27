import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { FilePlus, Upload } from "lucide-react";

const reportTypes = [
  "CBN Regulatory Return",
  "NDIC Filing",
  "SEC Quarterly Report",
  "Annual Compliance Report",
  "Risk Assessment",
  "Other",
];

const NewReport = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reportName, setReportName] = useState("");
  const [reportType, setReportType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !reportName || !reportType) return;

    setSubmitting(true);
    let filePath: string | null = null;

    try {
      // Upload file if provided
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${user.id}/${Date.now()}.${ext}`;
        const { error: uploadError } = await supabase.storage.from("reports").upload(path, file);
        if (uploadError) throw uploadError;
        filePath = path;
      }

      // Insert report record
      const { error } = await supabase.from("reports").insert({
        user_id: user.id,
        report_name: reportName,
        report_type: reportType,
        status: file ? "Ready" : "Processing",
        file_path: filePath,
      });

      if (error) throw error;

      toast({
        title: "Report created",
        description: "Your report has been submitted successfully.",
      });
      navigate("/dashboard");
    } catch (err: any) {
      toast({
        title: "Error",
        description: err.message || "Failed to create report.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FilePlus className="w-5 h-5 text-primary" />
            Create New Report
          </CardTitle>
          <CardDescription>Fill in the details below to generate a new compliance report.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="reportName">Report Name</Label>
              <Input
                id="reportName"
                placeholder="e.g. Q1 2026 CBN Return"
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  {reportTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach File (optional)</Label>
              <div className="border border-input rounded-lg p-4 text-center">
                <input
                  id="file"
                  type="file"
                  className="hidden"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  accept=".pdf,.xlsx,.xls,.csv,.doc,.docx"
                />
                <label htmlFor="file" className="cursor-pointer flex flex-col items-center gap-2">
                  <Upload className="w-8 h-8 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {file ? file.name : "Click to upload PDF, Excel, CSV, or Word"}
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={submitting || !reportName || !reportType}>
                {submitting ? "Creating..." : "Create Report"}
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewReport;
