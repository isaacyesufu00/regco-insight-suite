import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const FinalCTASection = () => {
  return (
    <section className="py-28 md:py-36 relative overflow-hidden" style={{ background: "#F5F5F7" }}>
      {/* Soft blue glow */}
      <div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[680px] h-[680px] rounded-full pointer-events-none animate-brand-pulse"
        style={{
          background:
            "radial-gradient(circle, rgba(0,102,204,0.10) 0%, transparent 65%)",
        }}
      />
      <div className="relative container mx-auto px-[22px] text-center max-w-[980px]">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#1D1D1F] tracking-tight leading-[1.05]"
          style={{ letterSpacing: "-0.02em", maxWidth: 980, marginInline: "auto" }}
        >
          Stop filing CBN returns manually.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-5 text-[17px] md:text-[19px] text-[#6E6E73] max-w-[680px] mx-auto"
          style={{ lineHeight: 1.6 }}
        >
          Join the Nigerian financial institutions automating regulatory compliance with RegCo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link
            to="/book-demo"
            className="px-7 py-3 rounded-full text-white text-[17px] font-normal transition-transform ease-apple hover:scale-[1.02] active:scale-[0.98]"
            style={{ background: "#0066CC" }}
          >
            Book a free demo
          </Link>
          <Link
            to="/login"
            className="px-7 py-3 rounded-full text-[17px] font-normal border transition-all ease-apple hover:scale-[1.02] active:scale-[0.98]"
            style={{
              background: "rgba(0,0,0,0.04)",
              borderColor: "rgba(0,0,0,0.12)",
              color: "#1D1D1F",
            }}
          >
            Sign in to dashboard
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTASection;
