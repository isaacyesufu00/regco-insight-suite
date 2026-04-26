import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Item = {
  title: string;
  description: string;
  panelTitle: string;
  panelBody: string;
};

const items: Item[] = [
  {
    title: "Upload CBS Data",
    description:
      "Export your trial balance from Flexcube, Finacle, or any core banking system. RegCo accepts Excel and CSV in any column format.",
    panelTitle: "Upload your export",
    panelBody: "Drop an Excel/CSV. RegCo detects columns and ingests instantly.",
  },
  {
    title: "Automatic Field Mapping",
    description:
      "RegCo reads every row and intelligently maps account codes to CBN field names — no template required, no manual matching.",
    panelTitle: "Mapping in seconds",
    panelBody: "Account codes → CBN fields with confidence checks and overrides.",
  },
  {
    title: "5-Point Validation",
    description:
      "Before generating anything, RegCo checks that your balance sheet reconciles, loans add up, deposits match, CAR is above 10%, and liquidity is above 20%.",
    panelTitle: "Validation pass",
    panelBody: "Balance sheet, loans, deposits, CAR, and liquidity verified.",
  },
  {
    title: "AI Report Generation",
    description:
      "The AI engine generates all sections of your CBN return simultaneously — balance sheet, loan portfolio, capital adequacy, liquidity, and KPIs.",
    panelTitle: "Generate the return",
    panelBody: "Structured output with computed ratios and CBN-aligned sections.",
  },
  {
    title: "Download Your Return",
    description:
      "Your completed CBN-formatted return is ready to download as a text file within 5 minutes. It contains every section the CBN portal requires.",
    panelTitle: "Download",
    panelBody: "Submission-ready file plus a clean summary preview.",
  },
  {
    title: "Email Notification",
    description:
      "RegCo emails you when your report is ready with your key ratios — CAR, liquidity ratio, and NPL — so you can review before submitting.",
    panelTitle: "Notify",
    panelBody: "Instant email with key ratios and a secure download link.",
  },
];

const HowItWorksSection = () => {
  const [active, setActive] = useState(0);
  const rowRefs = useRef<Array<HTMLDivElement | null>>([]);

  const observers = useRef<IntersectionObserver | null>(null);

  const rootMargin = useMemo(() => "-40% 0px -40% 0px", []);

  useEffect(() => {
    observers.current?.disconnect();

    observers.current = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .map((e) => Number((e.target as HTMLElement).dataset.index ?? "0"));
        if (visible.length > 0) setActive(visible[0]);
      },
      { threshold: 0.1, rootMargin },
    );

    rowRefs.current.forEach((el) => el && observers.current?.observe(el));

    return () => observers.current?.disconnect();
  }, [rootMargin]);

  return (
    <section className="py-28 md:py-32" style={{ background: "#F5F5F7" }}>
      <div className="container mx-auto px-[22px]">
        <div className="max-w-[980px] mx-auto">
          <div className="text-[12px] tracking-[0.25em] uppercase text-[#6E6E73] font-semibold">
            How RegCo Works
          </div>
          <div className="mt-4 text-[48px] md:text-[56px] font-semibold text-[#1D1D1F] tracking-[-0.02em] leading-[1.05]">
            A workflow that feels effortless.
          </div>
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[38%_62%] gap-10 lg:gap-16 items-start">
          {/* Left accordion list */}
          <div className="space-y-3">
            {items.map((item, idx) => {
              const isActive = idx === active;
              return (
                <div
                  key={item.title}
                  ref={(el) => {
                    rowRefs.current[idx] = el;
                  }}
                  data-index={idx}
                >
                  <button
                    type="button"
                    onClick={() => setActive(idx)}
                    className="w-full text-left flex items-center gap-3"
                    style={{
                      background: "rgba(0,0,0,0.04)",
                      borderRadius: 980,
                      padding: "10px 18px",
                      transition:
                        "background 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <span
                      aria-hidden="true"
                      className="inline-flex items-center justify-center"
                      style={{
                        width: 22,
                        height: 22,
                        borderRadius: 999,
                        background: isActive ? "#1D1D1F" : "rgba(0,0,0,0.10)",
                        color: isActive ? "#FFFFFF" : "#1D1D1F",
                        transition: "all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                        fontSize: 14,
                        lineHeight: "22px",
                      }}
                    >
                      {isActive ? "●" : "+"}
                    </span>
                    <span className="text-[17px] font-medium text-[#1D1D1F]">{item.title}</span>
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive ? "auto" : 0,
                      opacity: isActive ? 1 : 0,
                      marginTop: isActive ? 10 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                    style={{ overflow: "hidden" }}
                  >
                    <div
                      style={{
                        background: "#F5F5F7",
                        borderRadius: 18,
                        padding: "14px 18px",
                        border: "1px solid rgba(0,0,0,0.08)",
                      }}
                    >
                      <div className="text-[15px] text-[#6E6E73]" style={{ lineHeight: 1.6 }}>
                        {item.description}
                      </div>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>

          {/* Right sticky panel */}
          <div className="lg:sticky" style={{ top: 120 }}>
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="bg-white"
              style={{
                borderRadius: 20,
                boxShadow: "0 20px 60px rgba(0,0,0,0.10)",
                padding: 28,
              }}
            >
              <div className="text-[12px] text-[#6E6E73]">Workflow</div>
              <div className="mt-2 text-[28px] font-semibold text-[#1D1D1F] tracking-[-0.02em]">
                {items[active].panelTitle}
              </div>
              <div className="mt-3 text-[15px] text-[#6E6E73]" style={{ lineHeight: 1.6 }}>
                {items[active].panelBody}
              </div>

              <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {["Status", "Output", "Time", "Review"].map((k) => (
                  <div
                    key={k}
                    style={{
                      background: "#F5F5F7",
                      borderRadius: 18,
                      padding: 16,
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <div className="text-[12px] text-[#6E6E73]">{k}</div>
                    <div className="mt-1 text-[15px] font-medium text-[#1D1D1F]">
                      {k === "Time" ? "Under 5 minutes" : "Ready"}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
