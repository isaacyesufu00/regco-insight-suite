import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const DashboardSettings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [rcNumber, setRcNumber] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("full_name, company_name, rc_number").eq("id", user.id).maybeSingle().then(({ data }) => {
      if (data) {
        setFullName(data.full_name || "");
        setCompanyName(data.company_name || "");
        setRcNumber(data.rc_number || "");
      }
    });
  }, [user]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    const { error } = await supabase.from("profiles").update({ full_name: fullName, company_name: companyName, rc_number: rcNumber }).eq("id", user.id);
    setSaving(false);
    toast({
      title: error ? "Error" : "Saved",
      description: error ? error.message : "Profile updated successfully.",
      variant: error ? "destructive" : "default",
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage your company profile and preferences.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="rcNumber">RC Number</Label>
              <Input id="rcNumber" value={rcNumber} onChange={(e) => setRcNumber(e.target.value)} placeholder="e.g. RC123456" />
            </div>
            <Button type="submit" disabled={saving}>{saving ? "Saving..." : "Save Changes"}</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSettings;
