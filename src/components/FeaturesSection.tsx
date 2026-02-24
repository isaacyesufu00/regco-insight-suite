import { motion } from "framer-motion";
import { ArrowRight, Upload, Building2, Calendar, FileText, Heart, AlertTriangle, Clock, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.15 },
  }),
};

const FeaturesSection = () => {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeUp}
          custom={0}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">
            Save hours every week with RegCo
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Built for compliance teams, regulatory officers, and fintech operators.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
          {/* Card 1 – Reports */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={1}
            className="card-elevated rounded-2xl border border-border/60 overflow-hidden flex flex-col"
          >
            <div className="p-6 md:p-8 flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">Generate Regulatory Reports Instantly</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Automatically prepare structured regulatory reports aligned with financial authority standards.
              </p>

              {/* Mock UI */}
              <div className="mt-6 bg-muted/50 rounded-xl p-4 space-y-3">
                <MockRow icon={<Upload className="w-4 h-4" />} label="Upload financial data" />
                <MockRow icon={<Building2 className="w-4 h-4" />} label="Select regulatory body (CBN, SEC, NDIC)" />
                <MockRow icon={<Calendar className="w-4 h-4" />} label="Choose reporting period" />
                <MockRow icon={<FileText className="w-4 h-4" />} label="Generate Report" highlight />
              </div>
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button variant="ghost" className="text-primary font-semibold px-0 hover:bg-transparent hover:text-primary/80">
                About Reports <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>

          {/* Card 2 – Monitoring */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={fadeUp}
            custom={2}
            className="card-elevated rounded-2xl border border-border/60 overflow-hidden flex flex-col"
          >
            <div className="p-6 md:p-8 flex-1">
              <h3 className="text-xl font-bold text-foreground mb-2">Continuous Compliance Monitoring</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Track compliance metrics, identify red flags, and stay ahead of regulatory deadlines.
              </p>

              {/* Mock UI */}
              <div className="mt-6 bg-muted/50 rounded-xl p-4 space-y-3">
                <MockRow icon={<Heart className="w-4 h-4" />} label="Compliance Health Score" />
                <MockRow icon={<AlertTriangle className="w-4 h-4" />} label="Risk Alert notification" />
                <MockRow icon={<Clock className="w-4 h-4" />} label="Filing deadline tracker" />
                <MockRow icon={<BarChart3 className="w-4 h-4" />} label="Submission history timeline" />
              </div>
            </div>
            <div className="px-6 pb-6 md:px-8 md:pb-8">
              <Button variant="ghost" className="text-primary font-semibold px-0 hover:bg-transparent hover:text-primary/80">
                About Monitoring <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const MockRow = ({ icon, label, highlight }: { icon: React.ReactNode; label: string; highlight?: boolean }) => (
  <div className={`flex items-center gap-3 rounded-lg px-3 py-2.5 ${highlight ? "bg-primary/10 text-primary" : "bg-background text-foreground"}`}>
    <span className="text-primary">{icon}</span>
    <span className="text-sm font-medium">{label}</span>
  </div>
);

export default FeaturesSection;
