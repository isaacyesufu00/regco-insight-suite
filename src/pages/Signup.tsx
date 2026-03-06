import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle } from "lucide-react";

const planLabels: Record<string, string> = {
  starter: "Starter",
  growth: "Growth",
};
const Signup = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const selectedPlan = searchParams.get("plan");
  const planName = selectedPlan ? planLabels[selectedPlan] : null;
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedName = fullName.trim();
    const trimmedCompany = companyName.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedCompany || !trimmedEmail || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { data, error: authError } = await supabase.auth.signUp({
      email: trimmedEmail,
      password,
      options: {
        data: { full_name: trimmedName, company_name: trimmedCompany },
        emailRedirectTo: window.location.origin,
      },
    });
    setLoading(false);

    if (authError) {
      setError(authError.message);
    } else if (data.user && !data.session) {
      // Email confirmation is required
      setError("");
      setShowConfirmation(true);
    } else {
      navigate("/dashboard");
    }
  };

  if (showConfirmation) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#eef2ff" }}>
        <div className="w-full max-w-md rounded-2xl p-8 shadow-lg text-center" style={{ background: "#ffffff" }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#f0fdf4" }}>
            <CheckCircle className="w-8 h-8" style={{ color: "#22c55e" }} />
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Check your email</h2>
          <p className="text-sm mb-6" style={{ color: "#8a8a9a" }}>
            We've sent a confirmation link to your email. Please click it to verify your account, then come back and log in.
          </p>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/login">Go to Login</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12" style={{ background: "#eef2ff" }}>
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg" style={{ background: "#ffffff" }}>
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-2">
            <img src="/assets/RegCo_Logo.png" alt="RegCo Logo" className="h-10 w-auto" />
          </Link>
          <p className="text-sm" style={{ color: "#8a8a9a" }}>
            Create your compliance account
          </p>
          {planName && (
            <div className="mt-3 inline-block rounded-full px-4 py-1.5 text-sm font-semibold" style={{ background: "#eef2ff", color: "#3b6ef8" }}>
              You are signing up for the {planName} Plan
            </div>
          )}
        </div>
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" style={{ color: "#1a1a2e" }}>Full Name</Label>
            <Input id="name" placeholder="John Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} required style={{ borderRadius: 12 }} maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="company" style={{ color: "#1a1a2e" }}>Company Name</Label>
            <Input id="company" placeholder="Acme Bank Ltd" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required style={{ borderRadius: 12 }} maxLength={100} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: "#1a1a2e" }}>Email</Label>
            <Input id="email" type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ borderRadius: 12 }} maxLength={255} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: "#1a1a2e" }}>Password</Label>
            <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={8} style={{ borderRadius: 12 }} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm" style={{ color: "#1a1a2e" }}>Confirm Password</Label>
            <Input id="confirm" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required style={{ borderRadius: 12 }} />
          </div>
          {error && (
            <p className="text-sm font-medium" style={{ color: "#ef4444" }}>{error}</p>
          )}
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold h-11"
            style={{ background: "#3b6ef8", borderRadius: 12 }}
          >
            {loading ? "Creating account..." : "Create Account"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm" style={{ color: "#8a8a9a" }}>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold" style={{ color: "#3b6ef8" }}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
