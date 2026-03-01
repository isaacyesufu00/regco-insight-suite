import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Upload, FileText, Download, ShieldCheck, Landmark, Lock, Headphones } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, delay: i * 0.1 },
  }),
};

const stats = [
  { value: "12,000+", label: "Reports Generated" },
  { value: "50,000+", label: "Hours Saved" },
  { value: "150+", label: "Clients Served" },
];

const steps = [
  { icon: Upload, step: "Step 1", title: "You provide your compliance data", desc: "Upload your core banking exports in Excel or CSV format." },
  { icon: FileText, step: "Step 2", title: "RegCo generates your report", desc: "Our engine processes your data and produces audit-ready filings." },
  { icon: Download, step: "Step 3", title: "You download and submit to the CBN", desc: "Download in PDF, Word, or Excel and file with confidence." },
];

const features = [
  { icon: ShieldCheck, title: "Gold-Standard Accuracy", desc: "Every report is validated against CBN formatting and calculation rules." },
  { icon: Landmark, title: "Built for Nigerian Compliance", desc: "Purpose-built for CBN, NFIU, SCUML, and NDIC regulatory frameworks." },
  { icon: Lock, title: "Bank-Grade Security", desc: "End-to-end encryption with SOC 2 compliant infrastructure." },
  { icon: Headphones, title: "Dedicated Support", desc: "Our compliance specialists are available to assist your team." },
];

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="hero-gradient pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            custom={0}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-foreground tracking-tight leading-[1.1]">
              We exist so compliance teams can focus on what matters.
            </h1>
            <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              RegCo automates regulatory reporting for financial institutions in Nigeria, saving compliance teams hours of manual work every week — so they can focus on strategy, not spreadsheets.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0}>
              <span className="text-sm font-semibold text-primary tracking-wide uppercase">Our Mission</span>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold font-display text-foreground">
                Simplifying CBN regulatory reporting through intelligent automation.
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Nigeria's financial institutions face a growing burden of regulatory filings — from monetary policy returns to AML/CFT reports. RegCo was built to eliminate the manual overhead, reduce errors, and ensure every submission meets the CBN's exacting standards.
              </p>
            </motion.div>

            <div className="grid gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  custom={i + 1}
                  className="card-elevated rounded-xl p-6 border border-border/50 text-center"
                >
                  <p className="text-3xl font-extrabold font-display text-primary">{s.value}</p>
                  <p className="mt-1 text-sm text-muted-foreground font-medium">{s.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 md:py-28 hero-gradient">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">How It Works</h2>
            <p className="mt-4 text-muted-foreground text-lg">Three simple steps to audit-ready compliance reports.</p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {steps.map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="card-elevated rounded-xl p-6 border border-border/50 text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">{item.step}</span>
                <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why RegCo */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground">Why RegCo</h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i + 1}
                className="card-elevated rounded-xl p-6 border border-border/50"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-28 bg-foreground">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-background">
              Ready to simplify your compliance reporting?
            </h2>
            <p className="mt-4 text-background/70 text-lg">
              Join hundreds of Nigerian financial institutions already using RegCo.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button asChild size="lg" className="rounded-full px-8 text-base font-semibold">
                <Link to="/signup">Sign up for free</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-8 text-base font-semibold border-background/20 text-background hover:bg-background/10"
              >
                <Link to="/contact">Book a demo</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
