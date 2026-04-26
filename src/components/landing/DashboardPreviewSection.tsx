import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  Home,
  FileText,
  FilePlus,
  Mail,
  CalendarDays,
  Database,
  Settings,
} from "lucide-react";

const navItems = [
  { icon: Home, label: "Dashboard" },
  { icon: FileText, label: "My Reports", active: true, badge: 3 },
  { icon: FilePlus, label: "Create Report" },
  { icon: Mail, label: "Compliance Mail", badge: 4 },
  { icon: CalendarDays, label: "Calendar" },
  { icon: Database, label: "Data Sources" },
  { icon: Settings, label: "Settings" },
];

const DashboardPreviewSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 1]);

  return (
    <section ref={ref} className="py-28 md:py-32 overflow-hidden" style={{ background: "#F5F5F7" }}>
      <div className="container mx-auto px-[22px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-[48px] md:text-[56px] font-semibold text-[#1D1D1F] text-center tracking-[-0.02em] leading-[1.05]"
        >
          A dashboard built for compliance teams.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-center text-[17px] md:text-[19px] text-[#6E6E73] max-w-[680px] mx-auto"
          style={{ lineHeight: 1.6 }}
        >
          One place for raw data, generated reports, calendar deadlines, and regulator notices.
        </motion.p>

        <motion.div
          style={{
            rotateX,
            scale,
            opacity,
            transformPerspective: 1200,
            transformOrigin: "center top",
          }}
          className="mt-16 max-w-6xl mx-auto"
        >
          <div
            className="rounded-[20px] overflow-hidden"
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
            }}
          >
            <div className="grid grid-cols-[260px_1fr] min-h-[440px]">
              {/* Sidebar */}
              <div
                className="p-4"
                style={{
                  background: "#FFFFFF",
                  borderRight: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                {/* Institution card */}
                <div
                  className="rounded-2xl p-4 flex items-center gap-3"
                  style={{
                    background: "#F5F5F7",
                    border: "1px solid rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <span className="text-[#1D1D1F] text-lg">✦</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] text-[#6E6E73]">Team</div>
                    <div className="text-sm font-semibold text-[#1D1D1F] truncate">Nakdnx MFB</div>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center gap-4 mt-3 px-2 text-[12px] text-[#6E6E73]">
                  <span>Overview</span>
                  <span>· 24</span>
                  <span>· 6</span>
                  <span>· 83</span>
                </div>

                {/* Nav items */}
                <div className="mt-6 space-y-1">
                  {navItems.map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center gap-3.5 px-3 py-2.5 rounded-[10px] transition-colors ${
                        item.active
                          ? "bg-[#F5F5F7]"
                          : ""
                      }`}
                      style={
                        item.active
                          ? { border: "1px solid rgba(0,0,0,0.08)" }
                          : undefined
                      }
                    >
                      <item.icon
                        className={`w-4 h-4 ${
                          item.active ? "text-[#1D1D1F]" : "text-[#86868B]"
                        }`}
                      />
                      <span
                        className={`flex-1 text-[13px] ${
                          item.active
                            ? "text-[#1D1D1F] font-semibold"
                            : "text-[#6E6E73] font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                      {item.badge && (
                        <span
                          className="w-5 h-5 rounded-full text-[10px] font-semibold flex items-center justify-center"
                          style={{ background: "rgba(0,0,0,0.08)", color: "#1D1D1F" }}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Main content */}
              <div className="p-6" style={{ background: "#F5F5F7" }}>
                <div
                  className="bg-white rounded-2xl p-5 flex items-center justify-between"
                  style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-2 h-2 rounded-full bg-success" />
                    <div>
                      <div className="text-[11px] text-[#6E6E73]">Nakdnx MFB Ltd.</div>
                      <div className="text-base font-semibold text-[#1D1D1F]">
                        CBN Q4 2025 Return
                      </div>
                    </div>
                  </div>
                  <span
                    className="w-7 h-7 rounded-full text-xs font-semibold flex items-center justify-center"
                    style={{ background: "#1D1D1F", color: "#FFFFFF" }}
                  >
                    8
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div
                    className="bg-white rounded-2xl p-5"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      style={{ background: "rgba(142,142,147,0.12)", color: "#1D1D1F" }}
                    >
                      Pending
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-[#1D1D1F]">12 reports</div>
                    <div className="text-[12px] text-[#6E6E73] mt-1">Awaiting upload</div>
                  </div>
                  <div
                    className="bg-white rounded-2xl p-5"
                    style={{ border: "1px solid rgba(0,0,0,0.08)" }}
                  >
                    <div
                      className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-semibold"
                      style={{ background: "rgba(255,159,10,0.12)", color: "#1D1D1F" }}
                    >
                      Processing
                    </div>
                    <div className="mt-3 text-2xl font-semibold text-[#1D1D1F]">4 reports</div>
                    <div className="text-[12px] text-[#6E6E73] mt-1">Validating CBS data</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DashboardPreviewSection;
