import { ReactNode } from "react";

interface AuthSplitLayoutProps {
  headline: string;
  tagline: string;
  stats: { value: string; label: string }[];
  children: ReactNode;
}

const AuthSplitLayout = ({ headline, tagline, stats, children }: AuthSplitLayoutProps) => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-[22px] py-14"
      style={{ background: "#F5F5F7" }}
    >
      <div
        className="w-full max-w-[420px] bg-white"
        style={{
          borderRadius: 18,
          padding: 48,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          border: "1px solid rgba(0,0,0,0.08)",
        }}
      >
        {/* Keep props for compatibility; pages can choose to show their own headings */}
        <div className="sr-only">
          <h1>{headline}</h1>
          <p>{tagline}</p>
          {stats.map((s) => (
            <span key={s.label}>
              {s.value} {s.label}
            </span>
          ))}
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthSplitLayout;
