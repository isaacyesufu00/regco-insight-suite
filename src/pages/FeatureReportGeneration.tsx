import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageCTA from "@/components/PageCTA";
import { motion } from "framer-motion";
import { Upload, ListChecks, Settings, Eye, Download, FileText, FileSpreadsheet, FileType, Check, RefreshCw } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { duration: 0.45, delay: i * 0.1 } }),
};

const steps = [
  { icon: Upload, label: "Upload your data file (Excel or CSV from any CBS)." },
  { icon: ListChecks, label: "Select your CBN return type and reporting period." },
  { icon: Settings, label: "RegCo validates and structures your data automatically." },
  { icon: Eye, label: "Review the pre-filled report on screen." },
  { icon: Download, label: "Generate and download in PDF, Word, or Excel." },
];

const reportTypes = [
  { name: "CBN Monetary Policy Return", who: "Commercial Banks", freq: "Monthly" },
  { name: "CBN Forex Return", who: "Commercial Banks", freq: "Weekly & Monthly" },
  { name: "AML/CFT Report", who: "All Institutions", freq: "Quarterly" },
  { name: "NFIU Regulatory Return", who: "All Institutions", freq: "Quarterly" },
  { name: "Prudential Return", who: "Commercial Banks", freq: "Monthly" },
  { name: "MFB Regulatory Return", who: "Microfinance Banks", freq: "Monthly" },
  { name: "SCUML Compliance Report", who: "Finance Companies", freq: "Annual" },
];

const formats = [
  { icon: FileText, name: "PDF", desc: "Formatted to exact CBN standards. Print and submit directly." },
  { icon: FileType, name: "Word", desc: "Editable for minor adjustments before submission." },
  { icon: FileSpreadsheet, name: "Excel", desc: "Full underlying data for internal audit and verification." },
];

const FeatureReportGeneration = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <section className="hero-gradient pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-display text-foreground tracking-tight leading-[1.1]">
            From Raw Data to CBN-Ready Report in Minutes.
          </h1>
          <p className="mt-6 text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Upload your core banking export. Select your return type. Download a submission-ready document. That is the entire process.
          </p>
        </motion.div>
      </div>
    </section>

    {/* Steps */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-14">
          How it works
        </motion.h2>
        <div className="max-w-3xl mx-auto space-y-0">
          {steps.map((s, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="flex items-start gap-4 relative pb-8 last:pb-0">
              {/* Connector line */}
              {i < steps.length - 1 && <div className="absolute left-[23px] top-12 w-0.5 h-[calc(100%-32px)] bg-border" />}
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 z-10">
                <s.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="pt-3">
                <span className="text-xs font-bold text-primary mr-2">Step {i + 1}</span>
                <span className="text-sm text-foreground">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Report Types */}
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-12">
          Supported Report Types
        </motion.h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {reportTypes.map((r, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="rounded-2xl border border-border/60 p-5 card-elevated">
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-success shrink-0" />
                <h3 className="text-sm font-bold text-foreground">{r.name}</h3>
              </div>
              <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">{r.freq}</span>
              <p className="text-xs text-muted-foreground mt-2">Applies to: {r.who}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Download Formats */}
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-2xl md:text-3xl font-bold font-display text-foreground text-center mb-12">
          Download Formats
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {formats.map((f, i) => (
            <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i + 1} className="rounded-2xl border border-border/60 p-6 card-elevated text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <f.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.name}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Accuracy */}
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="max-w-2xl mx-auto text-center">
          <RefreshCw className="w-10 h-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold font-display text-foreground mb-4">
            Built to CBN standards. Updated when they change.
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            RegCo monitors CBN template changes and updates report formats automatically so institutions never submit in an outdated format. Your compliance team does not need to track template revisions — we handle it.
          </p>
        </motion.div>
      </div>
    </section>

    <PageCTA headline="Ready to generate your first report?" contactMessage="I am interested in RegCo report generation. Please contact me to discuss pricing." />
    <Footer />
  </div>
);

export default FeatureReportGeneration;
