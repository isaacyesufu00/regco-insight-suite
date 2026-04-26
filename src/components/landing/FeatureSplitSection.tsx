import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FileCheck, Sparkles, Download } from "lucide-react";
import RegCoLogo from "@/components/RegCoLogo";

const features = [
  {
    icon: FileCheck,
    label: "CBN Validation",
    desc: "Reconciles balance sheet, deposits, and loan portfolio totals before generation.",
  },
  {
    icon: Sparkles,
    label: "AI-Assisted Generation",
    desc: "Deterministic ratios first, AI for intelligent mapping and structure.",
  },
  {
    icon: Download,
    label: "Instant Download",
    desc: "PDF, Excel, or Word — formatted to match the official CBN template.",
  },
];

const FeatureSplitSection = () => {
  return (
    <section style={{ background: "#F5F5F7" }}>
      <div className="grid md:grid-cols-2 min-h-[680px]">
        {/* Left: editorial text */}
        <div className="flex items-center px-[22px] md:px-16 lg:px-24 py-24 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="max-w-md"
          >
            <RegCoLogo size="sm" />
            <h2
              className="mt-8 text-[48px] md:text-[56px] font-semibold text-[#1D1D1F] leading-[1.05] tracking-[-0.02em]"
            >
              No Manual Shortcuts.
              <br />
              Just Real Compliance.
            </h2>
            <p className="mt-5 text-[17px] text-[#6E6E73]" style={{ lineHeight: 1.6 }}>
              RegCo enforces the same controls a CBN examiner would — every figure
              traced, every total reconciled, every ratio checked.
            </p>

            <ul className="mt-8 space-y-5">
              {features.map((f) => (
                <li key={f.label} className="flex items-start gap-4">
                  <div
                    className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ background: "rgba(0,0,0,0.06)" }}
                  >
                    <f.icon className="w-4 h-4" style={{ color: "#0066CC" }} />
                  </div>
                  <div>
                    <div className="text-[17px] font-medium text-[#1D1D1F]">
                      {f.label}
                    </div>
                    <div className="text-[15px] text-[#6E6E73] mt-1" style={{ lineHeight: 1.5 }}>
                      {f.desc}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 flex items-center gap-3">
              <Link
                to="/book-demo"
                className="px-6 py-3 rounded-full text-white text-[17px] font-normal btn-press"
                style={{ background: "#0066CC" }}
              >
                Get Started
              </Link>
              <Link
                to="/security"
                className="px-6 py-3 rounded-full text-[17px] font-normal"
                style={{
                  background: "rgba(0,0,0,0.04)",
                  color: "#1D1D1F",
                  border: "1px solid rgba(0,0,0,0.12)",
                }}
              >
                Read Docs →
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right: Apple-style feature card */}
        <div className="relative overflow-hidden flex items-center justify-center min-h-[400px] px-[22px] py-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="relative z-10 w-full max-w-[420px] bg-white rounded-2xl p-7"
            style={{
              border: "1px solid rgba(0,0,0,0.08)",
              boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
            }}
          >
            <div className="flex items-center justify-between text-[12px] text-[#6E6E73]">
              <span>CBN Return</span>
              <span
                className="px-2.5 py-1 rounded-full text-[12px] font-medium"
                style={{ background: "rgba(52,199,89,0.12)", color: "#1D1D1F" }}
              >
                Validated
              </span>
            </div>
            <div className="mt-4 text-[28px] font-semibold text-[#1D1D1F] leading-tight tracking-[-0.02em]">
              Q4 2025 Regulatory Return
            </div>
            <div className="mt-6 grid grid-cols-3 gap-3">
              {[
                { l: "CAR", v: "18.4%" },
                { l: "Liquidity", v: "42.1%" },
                { l: "NPL", v: "3.2%" },
              ].map((m) => (
                <div
                  key={m.l}
                  className="rounded-lg p-3 text-center"
                  style={{ background: "#F5F5F7", border: "1px solid rgba(0,0,0,0.06)" }}
                >
                  <div className="text-[10px] text-[#6E6E73] uppercase tracking-wider">{m.l}</div>
                  <div className="mt-1 text-base font-semibold text-[#1D1D1F]">{m.v}</div>
                </div>
              ))}
            </div>
            <div
              className="mt-6 pt-4 flex items-center justify-between"
              style={{ borderTop: "1px solid rgba(0,0,0,0.08)" }}
            >
              <span className="text-[12px] text-[#6E6E73]">Generated in 3m 42s</span>
              <span className="text-[12px] font-medium" style={{ color: "#0066CC" }}>
                Ready
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSplitSection;
