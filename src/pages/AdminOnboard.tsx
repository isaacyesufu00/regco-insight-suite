import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle2, Loader2 } from "lucide-react";

const LICENSE_CATEGORIES = [
  "Commercial Bank",
  "Merchant Bank",
  "National MFB",
  "State MFB",
  "Unit MFB",
  "Finance Company",
  "Other",
];

const ALL_REPORT_TYPES = [
  "CBN Monetary Policy Return",
  "CBN Forex Return",
  "AML/CFT Report",
  "NFIU Regulatory Return",
  "Prudential Return",
  "MFB Regulatory Return",
  "SCUML Compliance Report",
];

interface SuccessData {
  institution_name: string;
  report_types: string[];
  email_sent: boolean;
}

const AdminOnboard = () => {
  const { toast } = useToast();

  const [form, setForm] = useState({
    institution_name: "",
    rc_number: "",
    cbn_license_category: "",
    compliance_lead_name: "",
    email: "",
    phone: "",
    onboarding_notes: "",
  });
  const [reportTypes, setReportTypes] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<SuccessData | null>(null);

  const updateField = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const toggleReportType = (rt: string) => {
    setReportTypes((prev) =>
      prev.includes(rt) ? prev.filter((x) => x !== rt) : [...prev, rt]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (reportTypes.length === 0) {
      toast({ title: "Please select at least one report type", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData.session?.access_token;

      const res = await fetch(
        `https://pdplkprcomjslilznbsl.supabase.co/functions/v1/onboard-client`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            report_types: reportTypes,
          }),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || "Onboarding failed");
      }

      setSuccess({
        institution_name: result.institution_name,
        report_types: result.report_types,
        email_sent: result.email_sent,
      });
    } catch (err: any) {
      toast({
        title: "Onboarding failed",
        description: err.message,
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const resetForm = () => {
    setForm({
      institution_name: "",
      rc_number: "",
      cbn_license_category: "",
      compliance_lead_name: "",
      email: "",
      phone: "",
      onboarding_notes: "",
    });
    setReportTypes([]);
    setSuccess(null);
  };

  if (success) {
    return (
      <Card className="max-w-lg mx-auto">
        <CardContent className="pt-8 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-1">Client Onboarded Successfully</h2>
            <p className="text-muted-foreground">{success.institution_name} is now on RegCo.</p>
          </div>
          <div className="text-left space-y-2">
            <p className="text-sm font-medium text-foreground">Assigned Report Types:</p>
            <div className="flex flex-wrap gap-2">
              {success.report_types.map((rt) => (
                <Badge key={rt} variant="secondary">{rt}</Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
            <CheckCircle2 className="w-4 h-4 text-primary" />
            {success.email_sent
              ? "Welcome email sent to the compliance lead."
              : "Welcome email could not be sent. Share the login link manually."}
          </div>
          <Button onClick={resetForm} className="w-full">Onboard Another Client</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Onboard New Client</CardTitle>
        <CardDescription>Register a new institution on the RegCo platform. A welcome email with a password setup link will be sent automatically.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Institution Name *</Label>
              <Input value={form.institution_name} onChange={(e) => updateField("institution_name", e.target.value)} required maxLength={200} placeholder="e.g. First Microfinance Bank" />
            </div>
            <div className="space-y-2">
              <Label>RC Number *</Label>
              <Input value={form.rc_number} onChange={(e) => updateField("rc_number", e.target.value)} required maxLength={50} placeholder="RC123456" />
            </div>
          </div>

          <div className="space-y-2">
            <Label>CBN License Category *</Label>
            <Select value={form.cbn_license_category} onValueChange={(v) => updateField("cbn_license_category", v)}>
              <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
              <SelectContent>
                {LICENSE_CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Compliance Lead Full Name *</Label>
              <Input value={form.compliance_lead_name} onChange={(e) => updateField("compliance_lead_name", e.target.value)} required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Compliance Lead Email *</Label>
              <Input type="email" value={form.email} onChange={(e) => updateField("email", e.target.value)} required maxLength={255} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Phone Number *</Label>
            <Input value={form.phone} onChange={(e) => updateField("phone", e.target.value)} required maxLength={30} placeholder="+234..." />
          </div>

          <div className="space-y-3">
            <Label>Report Types *</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ALL_REPORT_TYPES.map((rt) => (
                <label key={rt} className="flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-accent/50 transition-colors">
                  <Checkbox
                    checked={reportTypes.includes(rt)}
                    onCheckedChange={() => toggleReportType(rt)}
                  />
                  <span className="text-sm">{rt}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Onboarding Notes (Optional)</Label>
            <Textarea
              value={form.onboarding_notes}
              onChange={(e) => updateField("onboarding_notes", e.target.value)}
              maxLength={1000}
              placeholder="Any internal notes about this client..."
              rows={3}
            />
          </div>

          <Button type="submit" disabled={submitting} className="w-full" size="lg">
            {submitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Onboarding Client...
              </>
            ) : (
              "Onboard Client"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AdminOnboard;
