import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const reportOptions = [
  "CBN Returns",
  "NDIC Filing",
  "SEC Quarterly Report",
  "FIRS Compliance",
  "Other",
];

const Contact = () => {
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [reportType, setReportType] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = fullName.trim();
    const trimmedCompany = companyName.trim();
    const trimmedEmail = email.trim();
    const trimmedPhone = phone.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail) {
      setError("Please fill in all required fields.");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const payload = {
      full_name: trimmedName.slice(0, 100),
      company_name: trimmedCompany.slice(0, 100),
      email: trimmedEmail.slice(0, 255),
      phone: trimmedPhone.slice(0, 30) || null,
      report_type: reportType || null,
      message: trimmedMessage.slice(0, 2000) || null,
    };

    // Save to database
    const { error: dbError } = await supabase.from("demo_requests").insert(payload);

    if (dbError) {
      setLoading(false);
      setError("Something went wrong. Please try again.");
      return;
    }

    // Send email notification (fire and forget — don't block user on email failure)
    try {
      await supabase.functions.invoke("send-demo-notification", { body: payload });
    } catch (emailErr) {
      console.error("Email notification failed:", emailErr);
    }

    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#eef2ff" }}>
      <div className="w-full max-w-lg rounded-2xl p-8 shadow-lg" style={{ background: "#ffffff" }}>
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" style={{ color: "#3b6ef8" }}>
              <rect x="3" y="3" width="18" height="18" rx="4" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12h8M12 8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <span className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>RegCo</span>
          </Link>
        </div>

        {submitted ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#f0fdf4" }}>
              <CheckCircle className="w-8 h-8" style={{ color: "#22c55e" }} />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Thank you!</h2>
            <p className="text-sm" style={{ color: "#8a8a9a" }}>
              We'll be in touch within 24 hours.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full px-6" style={{ borderRadius: 999 }}>
              <Link to="/">Back to home</Link>
            </Button>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-1" style={{ color: "#1a1a2e" }}>Book a Demo</h2>
            <p className="text-sm text-center mb-8" style={{ color: "#8a8a9a" }}>
              See how RegCo can simplify your regulatory reporting. Fill in your details and our team will be in touch within 24 hours.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Full Name *</Label>
                <Input placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required maxLength={100} style={{ borderRadius: 12 }} />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Company Name *</Label>
                <Input placeholder="Acme Bank Ltd" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required maxLength={100} style={{ borderRadius: 12 }} />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Email Address *</Label>
                <Input type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required maxLength={255} style={{ borderRadius: 12 }} />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Phone Number <span style={{ color: "#8a8a9a" }}>(optional)</span></Label>
                <Input type="tel" placeholder="+234 800 000 0000" value={phone} onChange={(e) => setPhone(e.target.value)} maxLength={30} style={{ borderRadius: 12 }} />
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Which reports do you need help with?</Label>
                <select
                  value={reportType}
                  onChange={(e) => setReportType(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  style={{ borderRadius: 12 }}
                >
                  <option value="">Select an option</option>
                  {reportOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label style={{ color: "#1a1a2e" }}>Tell us about your compliance needs <span style={{ color: "#8a8a9a" }}>(optional)</span></Label>
                <textarea
                  placeholder="Describe your regulatory reporting challenges..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={2000}
                  rows={4}
                  className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                  style={{ borderRadius: 12 }}
                />
              </div>
              {error && (
                <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading}
                className="w-full text-white font-semibold h-11"
                style={{ background: "#3b6ef8", borderRadius: 999 }}
              >
                {loading ? "Submitting..." : "Request a Demo"}
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Contact;
