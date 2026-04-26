import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";

const tiers = [
  {
    name: "Unit MFB",
    headline: "Single branch compliance.",
    description: "Everything you need for accurate monthly filing.",
    price: "₦150,000",
    cadence: "/month",
    setup: "₦0 setup",
    features: [
      "CBN return generation",
      "Upload Excel/CSV",
      "5-point validation",
      "Email notifications",
      "1 compliance seat",
    ],
    href: "/book-demo",
  },
  {
    name: "State MFB",
    headline: "Multi-branch automation.",
    description: "Scale reporting with multiple teams and reminders.",
    price: "₦450,000",
    cadence: "/month",
    setup: "₦0 setup",
    features: [
      "All report types",
      "Calendar reminders",
      "Priority support",
      "5 compliance seats",
      "Data source connections",
    ],
    href: "/book-demo",
  },
  {
    name: "National MFB",
    headline: "Enterprise-grade reporting.",
    description: "Advanced controls and integrations for large institutions.",
    price: "Custom",
    cadence: "",
    setup: "Contact sales",
    features: [
      "Unlimited reports",
      "Dedicated success manager",
      "SLA + on-prem option",
      "Custom integrations",
      "Security review support",
    ],
    href: "/contact",
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-28 md:py-32" style={{ background: "#F5F5F7" }}>
      <div className="container mx-auto px-[22px]">
        <div className="max-w-[1200px] mx-auto">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="text-[48px] md:text-[56px] font-semibold text-[#1D1D1F] tracking-[-0.02em] leading-[1.05]"
            >
              Simple pricing.
            </motion.h2>

            <Link
              to="/#pricing"
              className="text-[17px] font-normal"
              style={{ color: "#0066CC" }}
            >
              Compare all plans ›
            </Link>
          </div>

          <p className="mt-5 text-[17px] md:text-[19px] text-[#6E6E73] max-w-[680px]" style={{ lineHeight: 1.6 }}>
            One subscription. Predictable pricing for every institution size you serve.
          </p>

          <div className="mt-14 grid lg:grid-cols-3 gap-6">
            {tiers.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
                className="pricing-card group bg-white"
                style={{
                  borderRadius: 18,
                  padding: 32,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  transition:
                    "box-shadow 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div
                      className="text-[12px] uppercase tracking-[0.14em]"
                      style={{ color: "#6E6E73" }}
                    >
                      {t.name}
                    </div>
                    <div className="mt-3 text-[28px] font-semibold text-[#1D1D1F] tracking-[-0.02em] leading-tight">
                      {t.headline}
                    </div>
                    <div className="mt-3 text-[15px]" style={{ color: "#6E6E73", lineHeight: 1.6 }}>
                      {t.description}
                    </div>
                  </div>

                  {/* Apple-style plus */}
                  <div
                    aria-hidden="true"
                    className="flex items-center justify-center shrink-0"
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 999,
                      background: "#1D1D1F",
                      color: "#FFFFFF",
                      transform: "rotate(0deg)",
                      transition: "transform 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    }}
                  >
                    <span
                      className="inline-block transition-transform group-hover:rotate-45"
                    >
                      +
                    </span>
                  </div>
                </div>

                {/* Reveal zone */}
                <div
                  className="pricing-reveal mt-6 overflow-hidden"
                  style={{
                    maxHeight: 0,
                    transition: "max-height 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                  }}
                >
                  <div className="pt-2">
                    <div className="flex items-end gap-2">
                      <div className="text-[36px] font-semibold text-[#1D1D1F] tracking-[-0.02em]">
                        {t.price}
                      </div>
                      {t.cadence ? (
                        <div className="text-[15px] text-[#6E6E73]" style={{ paddingBottom: 6 }}>
                          {t.cadence}
                        </div>
                      ) : null}
                    </div>
                    <div className="mt-1 text-[13px] text-[#6E6E73]">{t.setup}</div>
                    <ul className="mt-5 space-y-2">
                      {t.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-[15px] text-[#1D1D1F]">
                          <Check className="w-4 h-4 mt-[3px]" style={{ color: "#6E6E73" }} />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                    <Link
                      to={t.href}
                      className="mt-7 inline-flex items-center justify-center w-full btn-press"
                      style={{
                        background: "#0066CC",
                        color: "#FFFFFF",
                        borderRadius: 980,
                        padding: "13px 24px",
                        fontSize: 17,
                        textDecoration: "none",
                      }}
                    >
                      Book a demo
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
