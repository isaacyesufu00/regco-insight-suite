import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      navigate("/dashboard");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#eef2ff" }}>
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg" style={{ background: "#ffffff" }}>
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold" style={{ color: "#1a1a2e" }}>
            RegCo
          </h1>
          <p className="mt-2 text-sm" style={{ color: "#8a8a9a" }}>
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
              className="rounded-xl border-gray-200 focus:ring-2"
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
              className="rounded-xl border-gray-200"
              style={{ borderRadius: 12 }}
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="w-full text-white font-semibold rounded-xl h-11"
            style={{ background: "#3b6ef8", borderRadius: 12 }}
          >
            {loading ? "Signing in..." : "Sign In"}
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
