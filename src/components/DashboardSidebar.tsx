import {
  Home,
  FileText,
  PlusSquare,
  Mail,
  Calendar,
  Database,
  Settings,
  ChevronsUpDown,
  Sparkles,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface DashboardSidebarProps {
  companyName?: string | null;
  pendingCount?: number;
  unreadMail?: number;
}

interface NavItem {
  label: string;
  to: string;
  icon: typeof Home;
  badgeKey?: "pending" | "unread";
  end?: boolean;
}

const NAV: NavItem[] = [
  { label: "Dashboard", to: "/dashboard", icon: Home, end: true },
  { label: "My Reports", to: "/dashboard/reports", icon: FileText, badgeKey: "pending" },
  { label: "Create Report", to: "/dashboard/new-report", icon: PlusSquare },
  { label: "Compliance Mail", to: "/dashboard/mail", icon: Mail, badgeKey: "unread" },
  { label: "Calendar", to: "/dashboard/calendar", icon: Calendar },
  { label: "Data Sources", to: "/dashboard/data-sources", icon: Database },
  { label: "Settings", to: "/dashboard/settings", icon: Settings },
];

export function DashboardSidebar({ companyName, pendingCount = 0, unreadMail = 0 }: DashboardSidebarProps) {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/login");
  };

  const isActive = (item: NavItem) =>
    item.end ? location.pathname === item.to : location.pathname.startsWith(item.to);

  const getBadge = (item: NavItem): number => {
    if (item.badgeKey === "pending") return pendingCount;
    if (item.badgeKey === "unread") return unreadMail;
    return 0;
  };

  return (
    <aside
      className="hidden lg:flex flex-col flex-shrink-0"
      style={{
        width: 280,
        background: "#FFFFFF",
        borderRight: "1px solid rgba(0,0,0,0.08)",
        padding: "20px 16px",
      }}
    >
      {/* Institution card */}
      <div
        style={{
          background: "#F5F5F7",
          border: "1px solid rgba(0,0,0,0.08)",
          borderRadius: 14,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: "50%",
            background: "rgba(0,0,0,0.06)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Sparkles size={18} color="#0066CC" strokeWidth={1.8} />
        </div>
        <div className="min-w-0 flex-1">
          <p style={{ fontSize: 12, color: "#6E6E73", lineHeight: 1.2 }}>Team</p>
          <p
            className="truncate"
            style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", marginTop: 2 }}
          >
            {companyName || "Your Institution"}
          </p>
        </div>
        <ChevronsUpDown size={14} color="rgba(0,0,0,0.35)" />
      </div>

      {/* Stats row */}
      <div
        className="flex items-center gap-2 mt-3 px-1"
        style={{ fontSize: 13, color: "#6E6E73" }}
      >
        <span>Overview</span>
        <span style={{ color: "rgba(0,0,0,0.25)" }}>·</span>
        <span>{pendingCount + unreadMail + 24}</span>
        <span style={{ color: "rgba(0,0,0,0.25)" }}>·</span>
        <span>{pendingCount}</span>
        <span style={{ color: "rgba(0,0,0,0.25)" }}>·</span>
        <span>83</span>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex flex-col gap-0.5 flex-1">
        {NAV.map((item) => {
          const active = isActive(item);
          const badge = getBadge(item);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className="group transition-all"
              style={{
                height: 44,
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "0 12px",
                borderRadius: 10,
                background: active ? "#F5F5F7" : "transparent",
                border: active ? "1px solid rgba(0,0,0,0.08)" : "1px solid transparent",
                transition: "background 0.15s, border-color 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!active) e.currentTarget.style.background = "rgba(0,0,0,0.03)";
              }}
              onMouseLeave={(e) => {
                if (!active) e.currentTarget.style.background = "transparent";
              }}
            >
              <Icon
                size={18}
                strokeWidth={1.5}
                color={active ? "#1D1D1F" : "#86868B"}
              />
              <span
                className="flex-1"
                style={{
                  fontSize: 14,
                  fontWeight: active ? 600 : 500,
                  color: active ? "#1D1D1F" : "#6E6E73",
                }}
              >
                {item.label}
              </span>
              {badge > 0 && (
                <span
                  style={{
                    background: "rgba(0,0,0,0.08)",
                    color: "#1D1D1F",
                    borderRadius: 999,
                    minWidth: 24,
                    height: 24,
                    padding: "0 7px",
                    fontSize: 12,
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Sign out */}
      <button
        onClick={handleSignOut}
        className="flex items-center gap-3 mt-2"
        style={{
          height: 44,
          padding: "0 12px",
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 500,
          color: "#6E6E73",
          background: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#FEF2F2";
          e.currentTarget.style.color = "#DC2626";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
          e.currentTarget.style.color = "#6E6E73";
        }}
      >
        <LogOut size={18} strokeWidth={1.5} />
        <span>Sign out</span>
      </button>
    </aside>
  );
}
