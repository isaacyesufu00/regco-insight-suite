import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import DashboardMock from "./DashboardMock";

const HeroSection = () => {
  return (
    <section className="hero-gradient pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-foreground tracking-tight leading-tight">
            Compliance, not chaos.
          </h1>
          <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            AI-powered regulatory reporting built for financial institutions.
            Generate, validate, and submit regulatory reports in minutes — not weeks.
          </p>
          <p className="mt-3 text-sm text-muted-foreground/80">
            Reduce compliance risk. Save 10+ hours weekly. Stay audit-ready.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button size="lg" className="rounded-full px-8 text-base font-semibold">
              Get Started Free
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-semibold"
            >
              Book a Demo
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-14 md:mt-20 max-w-5xl mx-auto"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
