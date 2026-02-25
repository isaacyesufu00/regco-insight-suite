import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import DashboardMock from "./DashboardMock";

const HeroSection = () => {
  return (
    <section className="hero-gradient pt-28 pb-0 md:pt-36 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold font-display text-foreground tracking-tight leading-[1.1]">
            Compliance, not<br />chaos.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Generate reports instantly that <strong className="text-foreground">stay compliant</strong>.
            <br />
            Enjoy <strong className="text-foreground">unlimited</strong>, <strong className="text-foreground">audit-ready</strong> submissions.
            <br />
            Save <strong className="text-foreground">10+ hours weekly</strong> on regulatory filings.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button asChild size="lg" className="rounded-full px-8 text-base font-semibold">
              <Link to="/login">Sign up for free</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-full px-8 text-base font-semibold border-foreground/20"
            >
              <Link to="/contact">Book a demo</Link>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 md:mt-20 max-w-4xl mx-auto relative"
        >
          <DashboardMock />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
