import { useState, useEffect, useCallback } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import AuthSplitLayout from "@/components/auth/AuthSplitLayout";
import RegCoLogo from "@/components/RegCoLogo";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [attemptCount, setAttemptCount] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<Date | null>(null);
  const [countdown, setCountdown] = useState("");

  const isLocked = lockedUntil && lockedUntil > new Date();

  useEffect(() => {
    if (!lockedUntil) return;
    const tick = () => {
      const diff = lockedUntil.getTime() - Date.now();
      if (diff <= 0) {
        setLockedUntil(null);
        setAttemptCount(0);
        setCountdown("");
        if (email.trim()) {
          supabase
            .from("login_attempts")
            .update({ attempt_count: 0, locked_until: null })
            .eq("email", email.trim().toLowerCase())
            .then();
        }
        return;
      }
      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setCountdown(`${mins}:${secs.toString().padStart(2, "0")}`);
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, [lockedUntil, email]);

  const checkLockStatus = useCallback(async (emailAddr: string) => {
    const { data } = await supabase
      .from("login_attempts")
      .select("attempt_count, locked_until")
      .eq("email", emailAddr)
      .maybeSingle();
    if (data) {
      setAttemptCount(data.attempt_count ?? 0);
      if (data.locked_until && new Date(data.locked_until) > new Date()) {
        setLockedUntil(new Date(data.locked_until));
        return true;
      }
    }
    return false;
  }, []);

  const recordFailedAttempt = async (emailAddr: string) => {
    const { data: existing } = await supabase
      .from("login_attempts")
      .select("id, attempt_count")
      .eq("email", emailAddr)
      .maybeSingle();

    const newCount = (existing?.attempt_count ?? 0) + 1;
    const lockTime = newCount >= 5 ? new Date(Date.now() + 15 * 60 * 1000).toISOString() : null;

    if (existing) {
      await supabase
        .from("login_attempts")
        .update({ attempt_count: newCount, locked_until: lockTime, last_attempt_at: new Date().toISOString() })
        .eq("id", existing.id);
    } else {
      await supabase
        .from("login_attempts")
        .insert({ email: emailAddr, attempt_count: newCount, locked_until: lockTime, last_attempt_at: new Date().toISOString() });
    }

    setAttemptCount(newCount);
    if (lockTime) setLockedUntil(new Date(lockTime));
  };

  const resetAttempts = async (emailAddr: string) => {
    await supabase
      .from("login_attempts")
      .update({ attempt_count: 0, locked_until: null })
      .eq("email", emailAddr);
    setAttemptCount(0);
    setLockedUntil(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail || !password) {
      setError("Please fill in all fields.");
      return;
    }

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
      await resetAttempts(trimmedEmail);
      navigate("/dashboard");
    }
  };

  const stats = [
    { value: "5 min", label: "Report generation" },
    { value: "7", label: "Return types" },
    { value: "₦2M+", label: "Fines prevented" },
  ];

  return (
    <AuthSplitLayout
      headline="Regulatory Compliance. Automated."
      tagline="Trusted by MFBs across Nigeria."
      stats={stats}
    >
      {/* Logo */}
      <div className="flex justify-center mb-10">
        <RegCoLogo size="md" />
      </div>

      {isLocked ? (
        <div className="text-center">
          <div
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ background: "#fef2f2" }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </div>
          <h2 className="text-[28px] font-semibold mb-2" style={{ color: "#1D1D1F", letterSpacing: "-0.02em" }}>
            Account Temporarily Locked
          </h2>
          <p className="text-[15px] mb-4" style={{ color: "#6E6E73", lineHeight: 1.5 }}>
            Try again in 15 minutes or reset your password.
          </p>
          <div className="text-3xl font-mono font-bold mb-6" style={{ color: "#ef4444" }}>
            {countdown}
          </div>
          <Link
            to="/forgot-password"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full text-[17px] font-normal btn-press"
            style={{
              background: "rgba(0,0,0,0.04)",
              border: "1px solid rgba(0,0,0,0.12)",
              color: "#1D1D1F",
              textDecoration: "none",
            }}
          >
            Forgot Password
          </Link>
        </div>
      ) : (
        <>
          <h2 className="text-[28px] font-semibold text-center mb-2" style={{ color: "#1D1D1F", letterSpacing: "-0.02em" }}>
            Sign in to RegCo
          </h2>
          <p className="text-[15px] text-center mb-8" style={{ color: "#6E6E73", lineHeight: 1.5 }}>
            Enter your email and password to continue.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-[13px] font-medium mb-1.5"
                style={{ color: "#1D1D1F" }}
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@institution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full text-[17px] focus:outline-none transition-all"
                style={{
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#1D1D1F",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,102,204,0.20)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-[13px] font-medium mb-1.5"
                style={{ color: "#1D1D1F" }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-[17px] focus:outline-none transition-all"
                style={{
                  background: "rgba(0,0,0,0.04)",
                  border: "1px solid rgba(0,0,0,0.12)",
                  borderRadius: 10,
                  padding: "12px 16px",
                  color: "#1D1D1F",
                }}
                onFocus={(e) => (e.currentTarget.style.boxShadow = "0 0 0 3px rgba(0,102,204,0.20)")}
                onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
              />
              <div className="text-right mt-1.5">
                <Link
                  to="/forgot-password"
                  className="text-[14px] font-normal"
                  style={{ color: "#0066CC" }}
                >
                  Forgot password?
                </Link>
              </div>
            </div>

            {error && (
              <p className="text-sm font-medium" style={{ color: "#ef4444" }}>
                {error}
              </p>
            )}
            {attemptCount >= 3 && attemptCount < 5 && (
              <div
                className="rounded-[10px] px-4 py-3 text-sm font-medium"
                style={{
                  background: "rgba(255,159,10,0.12)",
                  color: "#1D1D1F",
                  border: "1px solid rgba(255,159,10,0.18)",
                }}
              >
                ⚠️ {attemptCount} failed attempts. Account locks at 5.
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white text-[17px] font-normal btn-press disabled:opacity-60"
              style={{
                background: "#0066CC",
                borderRadius: 980,
                height: 52,
              }}
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center text-[14px]" style={{ color: "#6E6E73" }}>
            <Link to="/book-demo" style={{ color: "#0066CC" }}>
              Don't have an account? Book a demo
            </Link>
          </div>

          <div
            className="text-center text-xs mt-10"
            style={{ color: "#AAA" }}
          >
            <Link to="/contact" className="hover:underline">Help</Link>
            <span className="mx-2">·</span>
            <Link to="/terms" className="hover:underline">Terms</Link>
            <span className="mx-2">·</span>
            <Link to="/privacy-policy" className="hover:underline">Privacy</Link>
          </div>
        </>
      )}
    </AuthSplitLayout>
  );
};

export default Login;
