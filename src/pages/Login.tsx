import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RegCoLogo from "@/assets/RegCo_Logo.png";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(0);

  const isLocked = secondsLeft > 0;

  // Countdown timer
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Lock expired — re-check via edge function
          const trimmed = email.trim().toLowerCase();
          if (trimmed) {
            supabase.functions
              .invoke("check-login-lockout", { body: { email: trimmed } })
              .then(({ data }) => {
                if (data && !data.is_locked) {
                  setAttemptCount(0);
                }
              });
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, email]);

  const formatCountdown = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const checkLockStatus = useCallback(async (emailAddr: string): Promise<boolean> => {
    try {
      const { data } = await supabase.functions.invoke("check-login-lockout", {
        body: { email: emailAddr },
      });
      if (data) {
        setAttemptCount(data.attempt_count ?? 0);
        if (data.is_locked && data.seconds_remaining > 0) {
          setSecondsLeft(data.seconds_remaining);
          return true;
        }
      }
    } catch {
      // If check fails, allow login attempt
    }
    return false;
  }, []);

  const recordFailedAttempt = async (emailAddr: string) => {
    try {
      const { data } = await supabase.functions.invoke("record-login-attempt", {
        body: { email: emailAddr },
      });
      if (data) {
        setAttemptCount(data.attempt_count ?? 0);
        if (data.is_locked && data.seconds_remaining > 0) {
          setSecondsLeft(data.seconds_remaining);
        }
      }
    } catch {
      // Silent fail — don't block login UX
    }
  };

  const resetAttempts = async () => {
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const token = sessionData?.session?.access_token;
      if (token) {
        await supabase.functions.invoke("reset-login-attempts", {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    } catch {
      // Silent fail
    }
    setAttemptCount(0);
    setSecondsLeft(0);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

    // Check lock status before attempting
    const locked = await checkLockStatus(trimmedEmail);
    if (locked) return;

    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({
      email: trimmedEmail,
      password,
    });
    setLoading(false);

    if (authError) {
      await recordFailedAttempt(trimmedEmail);
      if (authError.message === "Email not confirmed") {
        setError("Please check your email and confirm your account before logging in.");
      } else if (authError.message === "Invalid login credentials") {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(authError.message);
      }
    } else {
      await resetAttempts();
      navigate("/dashboard");
    }
  };

  if (isLocked) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#eef2ff" }}>
        <div className="w-full max-w-md rounded-2xl p-8 shadow-lg text-center" style={{ background: "#ffffff" }}>
          <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "#fef2f2" }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2" style={{ color: "#1a1a2e" }}>Account Temporarily Locked</h2>
          <p className="text-sm mb-4" style={{ color: "#8a8a9a" }}>
            Your account has been temporarily locked for security reasons. Please try again in 15 minutes or click Forgot Password to reset your credentials.
          </p>
          <div className="text-3xl font-mono font-bold mb-6" style={{ color: "#ef4444" }}>
            {formatCountdown(secondsLeft)}
          </div>
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link to="/contact">Forgot Password</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#eef2ff" }}>
      <div className="w-full max-w-md rounded-2xl p-8 shadow-lg" style={{ background: "#ffffff" }}>
        <div className="text-center mb-8">
          <Link to="/" className="flex items-center justify-center mb-2 flex-shrink-0">
            <img src={RegCoLogo} alt="RegCo" style={{ width: 160, height: 40, minWidth: 160, minHeight: 40, objectFit: "contain", objectPosition: "center", display: "block", flexShrink: 0, background: "transparent" }} />
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
          {attemptCount >= 3 && attemptCount < 5 && (
            <div className="rounded-lg px-4 py-3 text-sm font-medium" style={{ background: "#fff7ed", color: "#c2410c", border: "1px solid #fed7aa" }}>
              ⚠️ Warning — you have made {attemptCount} failed login attempts. Your account will be locked after 5 attempts.
            </div>
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
          Access is by invitation only.{" "}
          <Link to="/contact" className="font-semibold" style={{ color: "#3b6ef8" }}>
            Book a demo
          </Link>{" "}
          to get started.
        </p>
      </div>
    </div>
  );
};

export default Login;
