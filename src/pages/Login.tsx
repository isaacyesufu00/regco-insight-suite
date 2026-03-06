import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import regcoLogo from "@/assets/RegCo_Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setLoading(false);

    if (authError) {
      if (authError.message === "Email not confirmed") {
        setError("Please check your email and confirm your account before logging in.");
      } else if (authError.message === "Invalid login credentials") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(authError.message);
      }
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#eef2ff" }}>
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg" style={{ background: "#ffffff" }}>
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center gap-2 mb-2">
            <img src={regcoLogo} alt="RegCo" className="h-7 w-auto" />
          </Link>
          <p className="text-sm" style={{ color: "#8a8a9a" }}>
            Sign in to your compliance dashboard
          </p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email" style={{ color: "#1a1a2e" }}>Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ borderRadius: 12 }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" style={{ color: "#1a1a2e" }}>Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
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
            style={{ background: "#3b6ef8", borderRadius: 12 }}
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm" style={{ color: "#8a8a9a" }}>
          Don't have an account?{" "}
          <Link to="/signup" className="font-semibold" style={{ color: "#3b6ef8" }}>
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
