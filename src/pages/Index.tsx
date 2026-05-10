import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { 
  FileText, Calendar, Upload, Download, Shield, Zap, 
  Check, ChevronDown, Lock, Clock, Building2
} from "lucide-react";
import Navbar from "@/components/Navbar";

/* ═══════════════════════════════════════════════════════════════════════════════
   DESIGN SYSTEM CONSTANTS
═══════════════════════════════════════════════════════════════════════════════ */
const colors = {
  pageBg: "#F5F5F7",
  darkSection: "#1D1D1F",
  blackSection: "#000000",
  whiteSurface: "#FFFFFF",
  textPrimary: "#1D1D1F",
  textSecondary: "#6E6E73",
  textTertiary: "#86868B",
  accentBlue: "#0066CC",
  systemGreen: "#34C759",
  systemRed: "#FF3B30",
};

const easeApple = [0.25, 0.46, 0.45, 0.94];

/* ═══════════════════════════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
═══════════════════════════════════════════════════════════════════════════════ */
function ScrollProgressBar({ scrollYProgress }: { scrollYProgress: any }) {
  const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  return (
    <div style={{ 
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      height: 2, 
      background: "transparent", 
      zIndex: 999 
    }}>
      <motion.div 
        style={{ 
          height: "100%", 
          background: colors.accentBlue, 
          width 
        }} 
      />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   NAVIGATION DOTS
═══════════════════════════════════════════════════════════════════════════════ */
function NavigationDots({ 
  activeSection, 
  onNavigate 
}: { 
  activeSection: number; 
  onNavigate: (index: number) => void;
}) {
  return (
    <div 
      className="hidden md:flex"
      style={{ 
        position: "fixed", 
        right: 24, 
        top: "50%", 
        transform: "translateY(-50%)", 
        flexDirection: "column", 
        gap: 12, 
        zIndex: 100 
      }}
    >
      {Array.from({ length: 12 }).map((_, i) => (
        <button
          key={i}
          onClick={() => onNavigate(i)}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            border: `1.5px solid ${activeSection === i ? colors.accentBlue : "#86868B"}`,
            background: activeSection === i ? colors.accentBlue : "transparent",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
          aria-label={`Go to section ${i + 1}`}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ANIMATED SECTION WRAPPER
═══════════════════════════════════════════════════════════════════════════════ */
function AnimatedSection({ 
  children, 
  background = colors.pageBg,
  id,
  className = ""
}: { 
  children: React.ReactNode; 
  background?: string;
  id: string;
  className?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-40% 0px -40% 0px" });
  
  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        minHeight: "100vh",
        background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: "80px 24px",
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isInView ? 1 : 0 }}
        transition={{ duration: 0.6, ease: easeApple }}
        style={{ width: "100%", maxWidth: 1200 }}
      >
        {children}
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 0 — HERO (Apple Education Style)
═══════════════════════════════════════════════════════════════════════════════ */
const textVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 }
};

function HeroSection() {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Scroll-triggered animations
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <motion.section
      ref={heroRef}
      id="section-0"
      style={{ 
        opacity: heroOpacity,
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: 600,
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
      }}
    >
      {/* Full background image */}
      <motion.div
        style={{
          scale: heroScale,
          position: "absolute",
          inset: 0,
          backgroundImage: "url('/hero_image_.png')",
          backgroundSize: "cover",
          backgroundPosition: "center 20%",
          backgroundRepeat: "no-repeat",
          transformOrigin: "center",
          willChange: "transform",
        }}
      />

      {/* Dark gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to bottom, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.0) 35%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.68) 100%)",
          zIndex: 1,
        }}
      />

      {/* Text content — bottom center */}
      <motion.div
        style={{
          y: textY,
          opacity: textOpacity,
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          paddingBottom: 80,
          paddingLeft: 20,
          paddingRight: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.3, ease: easeApple }}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.5px",
            color: "#FFFFFF",
            margin: 0,
            padding: 0,
          }}
        >
          Built for
        </motion.h1>

        <motion.h1
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.5, ease: easeApple }}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Display', system-ui, sans-serif",
            fontSize: "clamp(40px, 8vw, 64px)",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.5px",
            color: "#FF375F",
            margin: 0,
            padding: 0,
            marginTop: 2,
          }}
        >
          every compliance officer.
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.7, delay: 0.7, ease: easeApple }}
          style={{
            fontFamily: "-apple-system, BlinkMacSystemFont, 'SF Pro Text', system-ui, sans-serif",
            fontSize: "clamp(15px, 2vw, 17px)",
            fontWeight: 400,
            lineHeight: 1.47059,
            letterSpacing: "-0.022em",
            color: "rgba(255,255,255,0.92)",
            maxWidth: 560,
            textAlign: "center",
            marginTop: 20,
          }}
        >
          Stronger compliance outcomes start with automation that understands Nigerian regulations. RegCo turns 3 days of manual filing into under 5 minutes — for every CBN, NFIU, SCUML, NDIC and FIRS return.
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={28} color="rgba(255,255,255,0.6)" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 1 — DASHBOARD HOME MOCKUP
═══════════════════════════════════════════════════════════════════════════════ */
function DashboardHomeMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const statusCards = [
    { label: "Pending", value: "2", color: "#FF9F0A" },
    { label: "Processing", value: "1", color: colors.accentBlue },
    { label: "Ready", value: "8", color: colors.systemGreen },
    { label: "Failed", value: "0", color: "#8E8E93" },
  ];
  
  const recentReports = [
    { name: "MFB Regulatory Return", regulator: "CBN", status: "Ready" },
    { name: "AML/CFT Report", regulator: "NFIU", status: "Processing" },
    { name: "NDIC Premium Return", regulator: "NDIC", status: "Ready" },
  ];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        padding: 24,
      }}
    >
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* Status Cards Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {statusCards.map((card) => (
            <div
              key={card.label}
              style={{
                background: colors.pageBg,
                borderRadius: 14,
                padding: "16px 18px",
              }}
            >
              <p style={{ fontSize: 12, color: colors.textSecondary, marginBottom: 4 }}>{card.label}</p>
              <p style={{ fontSize: 28, fontWeight: 700, color: card.color }}>{card.value}</p>
            </div>
          ))}
        </div>
        
        {/* Mini Table */}
        <div style={{ background: colors.pageBg, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 12 }}>Recent Reports</p>
          {recentReports.map((report, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: i < recentReports.length - 1 ? "1px solid rgba(0,0,0,0.06)" : "none",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, color: colors.textPrimary }}>{report.name}</span>
                <span style={{
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.textSecondary,
                  background: "rgba(0,0,0,0.05)",
                  padding: "2px 8px",
                  borderRadius: 10,
                }}>{report.regulator}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: report.status === "Ready" ? colors.systemGreen : colors.accentBlue,
                  background: report.status === "Ready" ? `${colors.systemGreen}15` : `${colors.accentBlue}15`,
                  padding: "3px 10px",
                  borderRadius: 20,
                }}>{report.status}</span>
                <Download size={14} color={colors.accentBlue} />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section1DashboardHome() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const checkItems = [
    "Live report status updated in real time",
    "Recent reports with one-click download",
    "Compliance score updated monthly",
  ];
  
  return (
    <section
      id="section-1"
      style={{
        position: "relative",
        zIndex: 2,
        background: colors.pageBg,
        borderRadius: "20px 20px 0 0",
        marginTop: -20,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8, ease: easeApple }}
        style={{ width: "100%", maxWidth: 1200 }}
      >
        <div 
          style={{ 
            display: "grid", 
            gridTemplateColumns: "1fr", 
            gap: 60, 
            alignItems: "center",
          }}
          className="md:!grid-cols-2"
        >
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeApple }}
        >
          <p style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}>01</p>
          <h2 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Your compliance at a glance.
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            The Dashboard home shows your real-time compliance status. Four cards tell you instantly how many reports are Pending, Processing, Ready, and Failed — so you always know where you stand before a CBN deadline.
          </p>
          
          {/* Checkmarks */}
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {checkItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <div style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  background: `${colors.accentBlue}15`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <Check size={12} color={colors.accentBlue} strokeWidth={3} />
                </div>
                <span style={{ fontSize: 15, color: colors.textSecondary }}>{item}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Right Mockup */}
        <DashboardHomeMockup />
      </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 2 — CREATE REPORT
═══════════════════════════════════════════════════════════════════════════════ */
const steps = [
  { num: "01", icon: FileText, title: "Select Return", desc: "Choose from 16 mandatory return types across all regulators." },
  { num: "02", icon: Calendar, title: "Set Period", desc: "Pick the reporting month, quarter, or year for your filing." },
  { num: "03", icon: Upload, title: "Upload CBS Data", desc: "Drag your core banking system export onto the upload zone." },
  { num: "04", icon: Download, title: "Download Report", desc: "Get a submission-ready CBN document in seconds." },
];

const returnTypes = [
  "MFB Regulatory Return", "Monetary Policy Return", "Credit Bureau Report", "Forex Return",
  "AML/CFT Report", "STR Report", "CTR Report", "PEP Report",
  "SCUML Return", "NDIC Premium Return", "NDIC SRF Return", "Annual Tax Return",
  "VAT Return", "WHT Return", "Capital Adequacy Return", "Liquidity Return"
];

function Section2CreateReport() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <AnimatedSection background={colors.whiteSurface} id="section-2">
      <div ref={ref} style={{ textAlign: "center" }}>
        <p style={{ 
          fontSize: 13, 
          color: colors.accentBlue, 
          fontFamily: "monospace",
          marginBottom: 12,
        }}>02</p>
        <h2 style={{ 
          fontSize: "clamp(36px, 5vw, 56px)", 
          fontWeight: 700, 
          color: colors.textPrimary,
          lineHeight: 1.1,
          marginBottom: 16,
        }}>
          Generate any return in 4 steps.
        </h2>
        <p style={{ 
          fontSize: 18, 
          color: colors.textSecondary, 
          maxWidth: 700,
          margin: "0 auto 48px",
          lineHeight: 1.6,
        }}>
          Select your return type, set the period, upload your CBS data, and download a submission-ready CBN document.
        </p>
        
        {/* Step Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", 
          gap: 20,
          marginBottom: 48,
        }}>
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.15, duration: 0.6, ease: easeApple }}
              whileHover={{ y: -4, boxShadow: "0 20px 60px rgba(0,0,0,0.12)" }}
              style={{
                background: colors.whiteSurface,
                borderRadius: 16,
                border: "1px solid rgba(0,0,0,0.08)",
                padding: 32,
                textAlign: "left",
                cursor: "default",
                transition: "box-shadow 0.3s ease",
              }}
            >
              <p style={{ 
                fontSize: 48, 
                color: colors.accentBlue, 
                fontFamily: "monospace",
                fontWeight: 700,
                marginBottom: 16,
              }}>{step.num}</p>
              <step.icon size={28} color={colors.textPrimary} strokeWidth={1.5} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 18, fontWeight: 600, color: colors.textPrimary, marginBottom: 8 }}>{step.title}</p>
              <p style={{ fontSize: 14, color: colors.textSecondary, lineHeight: 1.5 }}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
        
        {/* Highlight Box */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          style={{
            background: colors.darkSection,
            borderRadius: 16,
            padding: 32,
          }}
        >
          <p style={{ 
            fontSize: 18, 
            color: colors.whiteSurface, 
            marginBottom: 20,
            lineHeight: 1.5,
          }}>
            RegCo supports all 16 mandatory returns across CBN, NFIU, SCUML, NDIC and FIRS.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {returnTypes.map((name) => (
              <span
                key={name}
                style={{
                  fontSize: 12,
                  color: colors.whiteSurface,
                  background: "rgba(255,255,255,0.1)",
                  padding: "6px 12px",
                  borderRadius: 20,
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 3 — MY REPORTS
═══════════════════════════════════════════════════════════════════════════════ */
function MyReportsMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const tabs = ["All", "CBN", "NFIU", "SCUML", "NDIC", "FIRS"];
  const reports = [
    { name: "MFB Regulatory Return Q1 2026", date: "Mar 15, 2026" },
    { name: "AML/CFT Annual Report 2025", date: "Feb 28, 2026" },
    { name: "NDIC Premium Return Q4 2025", date: "Jan 31, 2026" },
    { name: "Credit Bureau Report Dec 2025", date: "Jan 10, 2026" },
  ];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        padding: 24,
        overflow: "hidden",
      }}
    >
      {/* Filter Tabs */}
      <div style={{ display: "flex", gap: 4, marginBottom: 20, borderBottom: "1px solid rgba(0,0,0,0.06)", paddingBottom: 12 }}>
        {tabs.map((tab, i) => (
          <span
            key={tab}
            style={{
              fontSize: 13,
              fontWeight: i === 1 ? 600 : 400,
              color: i === 1 ? colors.accentBlue : colors.textSecondary,
              padding: "6px 12px",
              borderBottom: i === 1 ? `2px solid ${colors.accentBlue}` : "2px solid transparent",
              marginBottom: -13,
              cursor: "pointer",
            }}
          >
            {tab}
          </span>
        ))}
      </div>
      
      {/* Table Rows */}
      {reports.map((report, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "14px 8px",
            borderRadius: 8,
            borderBottom: i < reports.length - 1 ? "1px solid rgba(0,0,0,0.04)" : "none",
            cursor: "pointer",
            transition: "background 0.2s ease",
          }}
        >
          <div>
            <p style={{ fontSize: 14, fontWeight: 500, color: colors.textPrimary }}>{report.name}</p>
            <p style={{ fontSize: 12, color: colors.textTertiary }}>{report.date}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: colors.systemGreen,
              background: `${colors.systemGreen}15`,
              padding: "4px 12px",
              borderRadius: 20,
            }}>Ready</span>
            <div style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: colors.accentBlue,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
              <Download size={14} color={colors.whiteSurface} />
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function Section3MyReports() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <AnimatedSection background={colors.pageBg} id="section-3">
      <div 
        ref={ref}
        style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: 60, 
          alignItems: "center",
        }}
        className="md:!grid-cols-2"
      >
        {/* Left Mockup */}
        <div className="order-2 md:order-1">
          <MyReportsMockup />
        </div>
        
        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeApple }}
          className="order-1 md:order-2"
        >
          <p style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}>03</p>
          <h2 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Every report. Always accessible.
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            lineHeight: 1.6,
          }}>
            My Reports is your complete filing history. Filter by status or regulator. Download any report instantly. Every generated return is stored securely and available any time — even years later if the CBN requests historical records.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 4 — COMPLIANCE CALENDAR
═══════════════════════════════════════════════════════════════════════════════ */
function CalendarMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const daysInMonth = 31;
  const startDay = 4;
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  
  const deadlines: Record<number, string> = {
    3: "green",
    8: "green",
    15: "red",
    22: "orange",
  };
  
  const upcomingDeadlines = [
    { name: "CBN Monetary Policy Return", days: 6, color: "#FF3B30" },
    { name: "NFIU STR Report", days: 13, color: "#FF9F0A" },
    { name: "NDIC Premium Return", days: 22, color: colors.systemGreen },
  ];
  
  const calendarCells = [];
  for (let i = 0; i < startDay; i++) {
    calendarCells.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendarCells.push(day);
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        padding: 24,
      }}
    >
      <p style={{ fontSize: 16, fontWeight: 600, color: colors.textPrimary, marginBottom: 16 }}>May 2026</p>
      
      {/* Day Headers */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 8 }}>
        {days.map((day) => (
          <div key={day} style={{ fontSize: 11, color: colors.textTertiary, textAlign: "center", padding: 4 }}>
            {day}
          </div>
        ))}
      </div>
      
      {/* Calendar Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 4, marginBottom: 20 }}>
        {calendarCells.map((day, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: i * 0.02, duration: 0.3 }}
            style={{
              aspectRatio: "1",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 13,
              color: day ? colors.textPrimary : "transparent",
              background: day ? colors.pageBg : "transparent",
              borderRadius: 8,
              position: "relative",
            }}
          >
            {day}
            {day && deadlines[day] && (
              <div style={{
                position: "absolute",
                bottom: 4,
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: deadlines[day] === "red" ? "#FF3B30" : deadlines[day] === "orange" ? "#FF9F0A" : colors.systemGreen,
              }} />
            )}
          </motion.div>
        ))}
      </div>
      
      {/* Upcoming Deadlines */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: colors.textPrimary, marginBottom: 12 }}>Upcoming Deadlines</p>
        {upcomingDeadlines.map((deadline, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 0",
          }}>
            <span style={{ fontSize: 13, color: colors.textSecondary }}>{deadline.name}</span>
            <span style={{
              fontSize: 11,
              fontWeight: 600,
              color: deadline.color,
              background: `${deadline.color}15`,
              padding: "3px 10px",
              borderRadius: 20,
            }}>{deadline.days} days</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Section4ComplianceCalendar() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const urgencyIndicators = [
    { label: "Due within 7 days", color: "#FF3B30" },
    { label: "Due within 14 days", color: "#FF9F0A" },
    { label: "Filed on time", color: colors.systemGreen },
  ];
  
  return (
    <AnimatedSection background={colors.whiteSurface} id="section-4">
      <div 
        ref={ref}
        style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: 60, 
          alignItems: "center",
        }}
        className="md:!grid-cols-2"
      >
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeApple }}
        >
          <p style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}>04</p>
          <h2 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Never miss a deadline.
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            The Compliance Calendar shows every CBN, NFIU, SCUML, NDIC and FIRS filing deadline for the year. Deadlines are colour-coded by urgency — red means due in 7 days, orange means due in 14 days, green means you&apos;re ahead. Your compliance score updates automatically as you file.
          </p>
          
          {/* Urgency Indicators */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {urgencyIndicators.map((item) => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: item.color,
                }} />
                <span style={{ fontSize: 14, color: colors.textSecondary }}>{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
        
        {/* Right Mockup */}
        <CalendarMockup />
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 5 — TRANSACTION MONITOR (DARK)
═══════════════════════════════════════════════════════════════════════════════ */
function Section5TransactionMonitor() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const features = [
    { icon: Shield, title: "5 AML Rules Applied Automatically", desc: "CTR, structuring, velocity, round-figure, large transaction." },
    { icon: Zap, title: "Instant Flagging — Results in Seconds", desc: "No manual review needed for initial screening." },
    { icon: FileText, title: "STR Queue Ready for NFIU Submission", desc: "Flagged transactions are queued for suspicious transaction reporting." },
  ];
  
  return (
    <section
      id="section-5"
      style={{
        minHeight: "100vh",
        background: colors.darkSection,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
      }}
    >
      <div ref={ref} style={{ width: "100%", maxWidth: 1200, textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}
        >05</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.whiteSurface,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          AML flagging. Built in.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            fontSize: 18, 
            color: colors.textTertiary, 
            maxWidth: 700,
            margin: "0 auto 48px",
            lineHeight: 1.6,
          }}
        >
          Upload your transaction data and RegCo automatically applies 5 CBN AML rules — Currency Transaction Reports, structuring detection, velocity checks, round-figure analysis, and large transaction flags. Suspicious transactions are highlighted instantly.
        </motion.p>
        
        {/* Feature Cards */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
          gap: 20,
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ 
                delay: 0.3 + i * 0.1, 
                duration: 0.6, 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
              }}
              style={{
                background: "#2C2C2E",
                borderRadius: 16,
                padding: 32,
                textAlign: "left",
              }}
            >
              <feature.icon size={28} color={colors.accentBlue} strokeWidth={1.5} style={{ marginBottom: 16 }} />
              <p style={{ fontSize: 17, fontWeight: 600, color: colors.whiteSurface, marginBottom: 8 }}>{feature.title}</p>
              <p style={{ fontSize: 14, color: colors.textTertiary, lineHeight: 1.5 }}>{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 6 — RISK ANALYSIS with DONUT CHART
═══════════════════════════════════════════════════════════════════════════════ */
function DonutChart() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();
  
  const data = [
    { label: "Pass", value: 65, color: colors.systemGreen },
    { label: "Watch List", value: 20, color: "#FF9F0A" },
    { label: "Substandard", value: 8, color: "#FF6B35" },
    { label: "Doubtful", value: 5, color: colors.systemRed },
    { label: "Loss", value: 2, color: "#8B0000" },
  ];
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const radius = 80;
  const strokeWidth = 20;
  const circumference = 2 * Math.PI * radius;
  
  let cumulativePercent = 0;
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        padding: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200">
        <g transform="rotate(-90 100 100)">
          {data.map((item, i) => {
            const percent = item.value / total;
            const strokeDasharray = circumference;
            const strokeDashoffset = circumference * (1 - percent);
            const rotation = cumulativePercent * 360;
            cumulativePercent += percent;
            
            return (
              <motion.circle
                key={item.label}
                cx="100"
                cy="100"
                r={radius}
                fill="none"
                stroke={item.color}
                strokeWidth={strokeWidth}
                strokeDasharray={strokeDasharray}
                initial={{ strokeDashoffset: circumference }}
                animate={isInView ? { strokeDashoffset } : {}}
                transition={{ delay: 0.2 + i * 0.15, duration: 1.2, ease: "easeOut" }}
                style={{
                  transformOrigin: "center",
                  transform: `rotate(${rotation}deg)`,
                }}
              />
            );
          })}
        </g>
        <text x="100" y="95" textAnchor="middle" style={{ fontSize: 28, fontWeight: 700, fill: colors.textPrimary }}>
          {total}%
        </text>
        <text x="100" y="115" textAnchor="middle" style={{ fontSize: 12, fill: colors.textSecondary }}>
          Total Portfolio
        </text>
      </svg>
      
      {/* Legend */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 24, justifyContent: "center" }}>
        {data.map((item) => (
          <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color }} />
            <span style={{ fontSize: 12, color: colors.textSecondary }}>{item.label} {item.value}%</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Section6RiskAnalysis() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const classifications = [
    { label: "Pass", color: colors.systemGreen },
    { label: "Watch List", color: "#FFD60A" },
    { label: "Substandard", color: "#FF9F0A" },
    { label: "Doubtful", color: colors.systemRed },
    { label: "Loss", color: "#8B0000" },
  ];
  
  return (
    <AnimatedSection background={colors.pageBg} id="section-6">
      <div 
        ref={ref}
        style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: 60, 
          alignItems: "center",
        }}
        className="md:!grid-cols-2"
      >
        {/* Left Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeApple }}
        >
          <p style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}>06</p>
          <h2 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Know your loan book.
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            lineHeight: 1.6,
            marginBottom: 24,
          }}>
            Upload your loan portfolio and RegCo classifies every borrower using the CBN CAMEL framework — Pass, Watch List, Substandard, Doubtful, or Loss. Required provisions are calculated automatically at CBN rates.
          </p>
          
          {/* Classification Badges */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {classifications.map((item) => (
              <span
                key={item.label}
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: item.color,
                  background: `${item.color}15`,
                  padding: "6px 14px",
                  borderRadius: 20,
                }}
              >
                {item.label}
              </span>
            ))}
          </div>
        </motion.div>
        
        {/* Right Donut Chart */}
        <DonutChart />
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 7 — COMPLIANCE MAIL
═══════════════════════════════════════════════════════════════════════════════ */
function EmailMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const emails = [
    { sender: "Central Bank of Nigeria", subject: "Monetary Policy Rate Update", unread: true },
    { sender: "NFIU", subject: "AML/CFT Compliance Notice", unread: false },
    { sender: "SCUML", subject: "Quarterly Registration Reminder", unread: false },
  ];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -60 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        overflow: "hidden",
        display: "flex",
        minHeight: 320,
      }}
    >
      {/* Left Panel - Email List */}
      <div style={{ 
        width: "40%", 
        borderRight: "1px solid rgba(0,0,0,0.06)",
        background: colors.pageBg,
      }}>
        {emails.map((email, i) => (
          <div
            key={i}
            style={{
              padding: "16px",
              borderBottom: "1px solid rgba(0,0,0,0.04)",
              background: i === 0 ? colors.whiteSurface : "transparent",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              {email.unread && (
                <div style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: colors.accentBlue,
                }} />
              )}
              <span style={{ 
                fontSize: 12, 
                fontWeight: email.unread ? 600 : 400, 
                color: colors.textPrimary,
              }}>{email.sender}</span>
            </div>
            <p style={{ 
              fontSize: 11, 
              color: colors.textSecondary,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}>{email.subject}</p>
          </div>
        ))}
      </div>
      
      {/* Right Panel - Email Content */}
      <div style={{ flex: 1, padding: 24 }}>
        <p style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>From</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, marginBottom: 16 }}>Central Bank of Nigeria</p>
        <p style={{ fontSize: 11, color: colors.textTertiary, marginBottom: 4 }}>Subject</p>
        <p style={{ fontSize: 14, fontWeight: 600, color: colors.textPrimary, marginBottom: 24 }}>Monetary Policy Rate Update</p>
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 16 }}>
          <p style={{ fontSize: 13, color: colors.textSecondary, lineHeight: 1.6 }}>
            Dear Compliance Officer,
            <br /><br />
            Please be informed that the Monetary Policy Committee (MPC) has maintained the Monetary Policy Rate (MPR) at 18.75%...
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function Section7ComplianceMail() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <AnimatedSection background={colors.whiteSurface} id="section-7">
      <div 
        ref={ref}
        style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr", 
          gap: 60, 
          alignItems: "center",
        }}
        className="md:!grid-cols-2"
      >
        {/* Left Mockup */}
        <div className="order-2 md:order-1">
          <EmailMockup />
        </div>
        
        {/* Right Text */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: easeApple }}
          className="order-1 md:order-2"
        >
          <p style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}>07</p>
          <h2 style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 20,
          }}>
            Your regulatory inbox.
          </h2>
          <p style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            lineHeight: 1.6,
          }}>
            Compliance Mail is your dedicated inbox for all regulatory correspondence — CBN circulars, NFIU notices, SCUML updates. Everything in one place, organised by regulator, never lost in a personal email.
          </p>
        </motion.div>
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 8 — SETTINGS
═══════════════════════════════════════════════════════════════════════════════ */
function SettingsMockup() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const toggles = [
    { label: "Email when report is ready", enabled: true },
    { label: "Deadline reminders", enabled: true },
    { label: "CBN circular alerts", enabled: false },
  ];
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: easeApple }}
      style={{
        background: colors.whiteSurface,
        borderRadius: 20,
        boxShadow: "0 32px 80px rgba(0,0,0,0.12)",
        padding: 32,
        maxWidth: 480,
        margin: "0 auto",
      }}
    >
      {/* Institution Name */}
      <div style={{ marginBottom: 20 }}>
        <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 6 }}>Institution Name</label>
        <div style={{
          background: colors.pageBg,
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
          color: colors.textPrimary,
        }}>
          Nakdnx Microfinance Bank
        </div>
      </div>
      
      {/* License Category */}
      <div style={{ marginBottom: 24 }}>
        <label style={{ fontSize: 12, color: colors.textSecondary, display: "block", marginBottom: 6 }}>License Category</label>
        <div style={{
          background: colors.pageBg,
          borderRadius: 10,
          padding: "12px 14px",
          fontSize: 14,
          color: colors.textPrimary,
        }}>
          State MFB
        </div>
      </div>
      
      {/* Toggles */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}>
        {toggles.map((toggle, i) => (
          <div key={i} style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "12px 0",
          }}>
            <span style={{ fontSize: 14, color: colors.textPrimary }}>{toggle.label}</span>
            <div style={{
              width: 44,
              height: 26,
              borderRadius: 13,
              background: toggle.enabled ? colors.systemGreen : "#E5E5EA",
              padding: 2,
              transition: "background 0.2s ease",
            }}>
              <div style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                background: colors.whiteSurface,
                boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
                transform: toggle.enabled ? "translateX(18px)" : "translateX(0)",
                transition: "transform 0.2s ease",
              }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function Section8Settings() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  return (
    <AnimatedSection background={colors.pageBg} id="section-8">
      <div ref={ref} style={{ textAlign: "center" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          style={{ 
            fontSize: 13, 
            color: colors.accentBlue, 
            fontFamily: "monospace",
            marginBottom: 12,
          }}
        >08</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ 
            fontSize: "clamp(36px, 5vw, 56px)", 
            fontWeight: 700, 
            color: colors.textPrimary,
            lineHeight: 1.1,
            marginBottom: 16,
          }}
        >
          Configured for your institution.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ 
            fontSize: 18, 
            color: colors.textSecondary, 
            maxWidth: 600,
            margin: "0 auto 48px",
            lineHeight: 1.6,
          }}
        >
          Settings stores your institution profile, CBN license number, and notification preferences. Set it once — RegCo pre-fills it on every return automatically.
        </motion.p>
        
        <SettingsMockup />
      </div>
    </AnimatedSection>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   WHO WE SERVE — STICKY SCROLL SECTION
═══════════════════════════════════════════════════════════════════════════════ */
const institutions = [
  {
    name: "Unit Microfinance Banks",
    scale: "Operating in single locations across Nigeria",
    pain: "Filing 7–10 mandatory returns manually every month with limited compliance staff",
    value: "Complete automation means one compliance officer can handle all filings alone",
    stat: "847",
    statLabel: "Unit MFBs licensed by CBN",
  },
  {
    name: "State Microfinance Banks",
    scale: "Operating across entire states with multiple branches",
    pain: "Consolidating data from multiple branches for unified regulatory reporting",
    value: "Multi-branch data consolidation and automated return generation",
    stat: "126",
    statLabel: "State MFBs licensed by CBN",
  },
  {
    name: "National Microfinance Banks",
    scale: "Operating nationwide with complex reporting requirements",
    pain: "Managing 16 mandatory returns across 5 regulators with dedicated teams",
    value: "Full regulatory calendar management and automated multi-regulator filing",
    stat: "8",
    statLabel: "National MFBs licensed by CBN",
  },
  {
    name: "Primary Mortgage Banks",
    scale: "Specialised mortgage lending institutions",
    pain: "Complex loan portfolio reporting and CBN prudential return compliance",
    value: "Automated loan classification, provision calculation, and prudential returns",
    stat: "34",
    statLabel: "PMBs licensed by CBN",
  },
  {
    name: "Finance Companies",
    scale: "Non-bank financial institutions and fintechs",
    pain: "FIRS and SCUML compliance alongside CBN oversight",
    value: "Complete multi-regulator compliance from a single dashboard",
    stat: "50+",
    statLabel: "Fastest growing licensed category",
  },
];

// SVG Building illustrations for each institution type
function InstitutionSVG({ index }: { index: number }) {
  const svgStyle = { stroke: "#FFFFFF", strokeWidth: 1.5, fill: "none" };
  
  if (index === 0) {
    // Unit MFB - Small single-storey building
    return (
      <svg width="200" height="160" viewBox="0 0 200 160" style={svgStyle}>
        <rect x="40" y="60" width="120" height="80" rx="2" />
        <rect x="60" y="80" width="30" height="40" />
        <rect x="110" y="80" width="30" height="40" />
        <line x1="40" y1="60" x2="100" y2="30" />
        <line x1="160" y1="60" x2="100" y2="30" />
        <rect x="85" y="100" width="30" height="40" />
      </svg>
    );
  }
  if (index === 1) {
    // State MFB - Multi-branch layout
    return (
      <svg width="200" height="160" viewBox="0 0 200 160" style={svgStyle}>
        <rect x="20" y="80" width="50" height="60" rx="2" />
        <rect x="75" y="50" width="50" height="90" rx="2" />
        <rect x="130" y="80" width="50" height="60" rx="2" />
        <line x1="45" y1="80" x2="45" y2="50" />
        <line x1="45" y1="50" x2="100" y2="50" />
        <line x1="155" y1="80" x2="155" y2="50" />
        <line x1="155" y1="50" x2="100" y2="50" />
        <rect x="30" y="100" width="15" height="20" />
        <rect x="85" y="70" width="15" height="20" />
        <rect x="140" y="100" width="15" height="20" />
      </svg>
    );
  }
  if (index === 2) {
    // National MFB - Large headquarters
    return (
      <svg width="200" height="160" viewBox="0 0 200 160" style={svgStyle}>
        <rect x="50" y="30" width="100" height="110" rx="2" />
        <rect x="60" y="50" width="20" height="15" />
        <rect x="90" y="50" width="20" height="15" />
        <rect x="120" y="50" width="20" height="15" />
        <rect x="60" y="75" width="20" height="15" />
        <rect x="90" y="75" width="20" height="15" />
        <rect x="120" y="75" width="20" height="15" />
        <rect x="60" y="100" width="20" height="15" />
        <rect x="90" y="100" width="20" height="15" />
        <rect x="120" y="100" width="20" height="15" />
        <rect x="85" y="120" width="30" height="20" />
        <line x1="50" y1="30" x2="100" y2="10" />
        <line x1="150" y1="30" x2="100" y2="10" />
      </svg>
    );
  }
  if (index === 3) {
    // PMB - Building with house icon
    return (
      <svg width="200" height="160" viewBox="0 0 200 160" style={svgStyle}>
        <rect x="50" y="50" width="100" height="90" rx="2" />
        <rect x="65" y="70" width="25" height="25" />
        <rect x="110" y="70" width="25" height="25" />
        <rect x="65" y="105" width="25" height="25" />
        <rect x="110" y="105" width="25" height="25" />
        {/* House icon on top */}
        <polygon points="100,15 130,40 70,40" />
        <rect x="80" y="40" width="40" height="10" />
      </svg>
    );
  }
  // Finance Company - Modern fintech tower
  return (
    <svg width="200" height="160" viewBox="0 0 200 160" style={svgStyle}>
      <rect x="70" y="20" width="60" height="120" rx="4" />
      <line x1="85" y1="40" x2="115" y2="40" />
      <line x1="85" y1="55" x2="115" y2="55" />
      <line x1="85" y1="70" x2="115" y2="70" />
      <line x1="85" y1="85" x2="115" y2="85" />
      <line x1="85" y1="100" x2="115" y2="100" />
      <line x1="85" y1="115" x2="115" y2="115" />
      <circle cx="100" cy="30" r="5" />
      <rect x="90" y="125" width="20" height="15" />
    </svg>
  );
}

function WhoWeServeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      const index = Math.min(Math.floor(latest * institutions.length), institutions.length - 1);
      setActiveIndex(index);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Counter animation hook
  function AnimatedCounter({ value, inView }: { value: string; inView: boolean }) {
    const [count, setCount] = useState(0);
    const numericValue = parseInt(value.replace(/[^0-9]/g, '')) || 0;
    const suffix = value.replace(/[0-9]/g, '');

    useEffect(() => {
      if (inView && numericValue > 0) {
        let start = 0;
        const duration = 1500;
        const increment = numericValue / (duration / 16);
        const timer = setInterval(() => {
          start += increment;
          if (start >= numericValue) {
            setCount(numericValue);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        return () => clearInterval(timer);
      }
    }, [inView, numericValue]);

    return <>{count}{suffix}</>;
  }

  return (
    <section
      ref={containerRef}
      id="who-we-serve"
      style={{
        background: colors.blackSection,
        position: "relative",
        height: `${100 + institutions.length * 100}vh`,
      }}
    >
      {/* Header */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
      }}>
        {/* Top intro section */}
        <div style={{
          padding: "80px 24px 40px",
          textAlign: "center",
        }}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: 13,
              color: colors.accentBlue,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
            }}
          >Who We Serve</motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              color: colors.whiteSurface,
              marginBottom: 12,
            }}
          >
            Built for every licensed institution.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 19,
              color: colors.textTertiary,
            }}
          >
            From Unit MFBs to Commercial Banks.
          </motion.p>
        </div>

        {/* Two-column sticky content */}
        <div style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
        className="!grid-cols-1 md:!grid-cols-2"
        >
          {/* Left panel - Content */}
          <div style={{
            background: colors.darkSection,
            padding: "40px 48px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}>
            {institutions.map((inst, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0 }}
                animate={{ opacity: activeIndex === i ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                style={{
                  position: activeIndex === i ? "relative" : "absolute",
                  display: activeIndex === i ? "block" : "none",
                }}
              >
                <h3 style={{
                  fontSize: "clamp(32px, 4vw, 48px)",
                  fontWeight: 700,
                  color: colors.whiteSurface,
                  marginBottom: 12,
                }}>
                  {inst.name}
                </h3>
                <p style={{
                  fontSize: 17,
                  color: colors.textTertiary,
                  marginBottom: 32,
                }}>
                  {inst.scale}
                </p>
                <p style={{
                  fontSize: "clamp(48px, 6vw, 64px)",
                  fontWeight: 700,
                  color: colors.accentBlue,
                  marginBottom: 8,
                }}>
                  <AnimatedCounter value={inst.stat} inView={activeIndex === i} />
                </p>
                <p style={{
                  fontSize: 15,
                  color: colors.textTertiary,
                  marginBottom: 32,
                }}>
                  {inst.statLabel}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Automated Filing", "Multi-regulator", "Real-time Status"].map((pill) => (
                    <span key={pill} style={{
                      background: "rgba(255,255,255,0.1)",
                      color: colors.whiteSurface,
                      fontSize: 12,
                      fontWeight: 500,
                      padding: "6px 14px",
                      borderRadius: 20,
                    }}>
                      {pill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Right panel - SVG Illustration */}
          <div style={{
            background: colors.blackSection,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 40,
          }}
          className="hidden md:flex"
          >
            {institutions.map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ 
                  opacity: activeIndex === i ? 1 : 0,
                  scale: activeIndex === i ? 1 : 0.9,
                }}
                transition={{ duration: 0.5 }}
                style={{
                  position: activeIndex === i ? "relative" : "absolute",
                  display: activeIndex === i ? "block" : "none",
                }}
              >
                <InstitutionSVG index={i} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom stats bar */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        background: colors.darkSection,
        padding: "32px 24px",
      }}>
        <div style={{
          maxWidth: 1000,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 24,
          textAlign: "center",
        }}
        className="!grid-cols-2 md:!grid-cols-4"
        >
          {[
            { value: "1,000+", label: "Licensed institutions in Nigeria" },
            { value: "16", label: "Mandatory returns per institution per year" },
            { value: "₦2M", label: "Minimum fine per missed filing" },
            { value: "5 min", label: "RegCo filing time vs 3–5 days manual" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p style={{ fontSize: 28, fontWeight: 700, color: colors.whiteSurface }}>{stat.value}</p>
              <p style={{ fontSize: 13, color: colors.textTertiary }}>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   PRICING SECTION
═══════════════════════════════════════════════════════════════════════════════ */
const pricingTiers = [
  {
    name: "Unit MFB",
    badge: "Unit MFB",
    badgeColor: colors.textTertiary,
    features: [
      "Up to 10 CBN returns",
      "NFIU quarterly reports",
      "FIRS monthly remittances",
      "1 user account",
      "Email support",
    ],
    popular: false,
  },
  {
    name: "State MFB",
    badge: "State MFB",
    badgeColor: colors.accentBlue,
    features: [
      "All 16 mandatory returns",
      "Multi-branch data consolidation",
      "SCUML annual compliance",
      "3 user accounts",
      "Priority support",
      "Compliance calendar",
    ],
    popular: true,
  },
  {
    name: "National MFB",
    badge: "National MFB",
    badgeColor: colors.darkSection,
    features: [
      "All 16 mandatory returns",
      "Unlimited branches",
      "Dedicated compliance manager",
      "Unlimited user accounts",
      "24/7 support",
      "API access",
    ],
    popular: false,
  },
  {
    name: "Commercial Bank",
    badge: "Commercial Bank",
    badgeColor: colors.blackSection,
    features: [
      "Everything in National MFB",
      "Custom CBS integration",
      "White-label option",
      "SLA guarantee",
      "On-premise deployment option",
      "Custom regulatory modules",
    ],
    popular: false,
  },
];

function PricingSection() {
  const ref = useRef(null);
  const navigate = useNavigate();
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="pricing"
      ref={ref}
      style={{
        background: colors.pageBg,
        padding: "100px 24px 80px",
      }}
    >
      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          style={{
            fontSize: 13,
            color: colors.accentBlue,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >Pricing</motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          style={{
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700,
            color: colors.textPrimary,
            marginBottom: 16,
          }}
        >
          The right plan for your institution.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{
            fontSize: 19,
            color: colors.textSecondary,
            maxWidth: 560,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          Transparent pricing based on your license category.
          <br />
          Every plan includes all returns for your regulator tier.
        </motion.p>
      </div>

      {/* Pricing Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 20,
        maxWidth: 1200,
        margin: "0 auto 64px",
      }}
      className="!grid-cols-1 sm:!grid-cols-2 lg:!grid-cols-4"
      >
        {pricingTiers.map((tier, i) => (
          <motion.div
            key={tier.name}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.6, ease: easeApple }}
            whileHover={{ y: -8, boxShadow: "0 32px 80px rgba(0,0,0,0.12)" }}
            style={{
              background: colors.whiteSurface,
              borderRadius: 20,
              border: tier.popular ? `2px solid ${colors.accentBlue}` : "1px solid rgba(0,0,0,0.08)",
              padding: "40px 32px",
              display: "flex",
              flexDirection: "column",
              gap: 20,
              position: "relative",
              transform: tier.popular ? "scale(1.03)" : "scale(1)",
              zIndex: tier.popular ? 2 : 1,
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            {tier.popular && (
              <div style={{
                position: "absolute",
                top: -12,
                left: "50%",
                transform: "translateX(-50%)",
                background: colors.accentBlue,
                color: colors.whiteSurface,
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 12px",
                borderRadius: 20,
              }}>
                Most Popular
              </div>
            )}

            {/* Badge */}
            <span style={{
              background: tier.popular ? `${colors.accentBlue}15` : "rgba(0,0,0,0.05)",
              color: tier.badgeColor,
              fontSize: 12,
              fontWeight: 600,
              padding: "6px 14px",
              borderRadius: 20,
              alignSelf: "flex-start",
            }}>
              {tier.badge}
            </span>

            {/* Features */}
            <ul style={{ listStyle: "none", padding: 0, margin: 0, flex: 1 }}>
              {tier.features.map((feature) => (
                <li key={feature} style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontSize: 15,
                  color: colors.textPrimary,
                  marginBottom: 12,
                }}>
                  <Check size={16} style={{ color: colors.systemGreen, flexShrink: 0 }} />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Price */}
            <div style={{ borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20 }}>
              <p style={{ fontSize: 13, color: colors.textTertiary, marginBottom: 4 }}>Pricing</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: colors.textPrimary }}>
                Contact us for pricing
              </p>
            </div>

            {/* CTA */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/book-demo")}
              style={{
                background: colors.accentBlue,
                color: colors.whiteSurface,
                fontSize: 15,
                fontWeight: 500,
                padding: "14px 24px",
                borderRadius: 980,
                border: "none",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Request a Quote
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Trust Bar */}
      <div style={{
        background: colors.pageBg,
        borderTop: "1px solid rgba(0,0,0,0.06)",
        paddingTop: 40,
      }}>
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: 48,
          flexWrap: "wrap",
        }}>
          {[
            { icon: Shield, text: "CBN Compliant Architecture" },
            { icon: Lock, text: "Bank-grade Data Security" },
            { icon: Clock, text: "99.9% Uptime SLA" },
          ].map(({ icon: Icon, text }) => (
            <motion.div
              key={text}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <Icon size={20} color={colors.textTertiary} />
              <span style={{ fontSize: 14, color: colors.textSecondary }}>{text}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   ABOUT SECTION
═══════════════════════════════════════════════════════════════════════════════ */
function AboutSection() {
  const navigate = useNavigate();

  // Word-by-word animation for problem statement
  const problemText = "Nigerian financial institutions file over 16,000 regulatory returns every month. Most are filed manually. In Excel. Taking 3 to 5 days each.";
  const problemWords = problemText.split(" ");

  return (
    <section id="about">
      {/* Sub-section 1: Problem Statement */}
      <div style={{
        background: colors.blackSection,
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 900 }}>
          <p style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            color: colors.whiteSurface,
            lineHeight: 1.15,
            marginBottom: 32,
          }}>
            {problemWords.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.3 }}
                style={{ display: "inline-block", marginRight: "0.3em" }}
              >
                {word}
              </motion.span>
            ))}
          </p>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 1.5 }}
            style={{
              fontSize: 24,
              color: colors.textTertiary,
            }}
          >
            One missed filing costs a minimum ₦2,000,000 CBN fine. There is a better way.
          </motion.p>
        </div>
      </div>

      {/* Sub-section 2: Scale Card */}
      <div style={{
        background: colors.pageBg,
        padding: "100px 24px",
        display: "flex",
        justifyContent: "center",
      }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            background: colors.whiteSurface,
            borderRadius: 24,
            padding: 48,
            maxWidth: 780,
            width: "100%",
            boxShadow: "0 32px 80px rgba(0,0,0,0.08)",
          }}
        >
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 40,
          }}
          className="!grid-cols-1 sm:!grid-cols-2"
          >
            {[
              { value: "1,000+", label: "Licensed financial institutions in Nigeria" },
              { value: "16", label: "Mandatory returns per institution per year" },
              { value: "₦2,000,000", label: "Minimum CBN fine per late filing" },
              { value: "5 minutes", label: "RegCo filing time" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ textAlign: "center" }}
              >
                <p style={{ fontSize: 56, fontWeight: 700, color: colors.textPrimary, marginBottom: 8 }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: 15, color: colors.textSecondary }}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Sub-section 3: Mission Statement */}
      <div style={{
        background: colors.whiteSurface,
        padding: "100px 24px",
        textAlign: "center",
      }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 13,
              color: colors.accentBlue,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 24,
            }}
          >Our Mission</motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 36,
              fontWeight: 500,
              color: colors.textPrimary,
              lineHeight: 1.3,
              marginBottom: 32,
            }}
          >
            {`"RegCo exists so that every licensed financial institution in Nigeria can meet its regulatory obligations without friction, without fear, and without 3 sleepless days before every CBN deadline."`}
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <p style={{ fontSize: 15, color: colors.textTertiary }}>— Isaac Yesufu</p>
            <p style={{ fontSize: 15, color: colors.textTertiary }}>Founder & CEO, RegCo Technologies Limited</p>
          </motion.div>
        </div>
      </div>

      {/* Sub-section 4: Roadmap */}
      <div style={{
        background: colors.pageBg,
        padding: "100px 24px",
      }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            style={{
              fontSize: 13,
              color: colors.accentBlue,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              marginBottom: 12,
              textAlign: "center",
            }}
          >Product Roadmap</motion.p>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: colors.textPrimary,
              marginBottom: 64,
              textAlign: "center",
            }}
          >
            {`What's coming.`}
          </motion.h3>

          {/* Timeline */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 24,
            position: "relative",
          }}
          className="!grid-cols-1 md:!grid-cols-2 lg:!grid-cols-4"
          >
            {/* Connector line */}
            <div style={{
              position: "absolute",
              top: 40,
              left: "5%",
              right: "5%",
              height: 2,
              background: "rgba(0,0,0,0.1)",
              zIndex: 0,
            }}
            className="hidden lg:block"
            />

            {[
              {
                quarter: "Q1 2026",
                status: "Launched",
                color: colors.systemGreen,
                items: ["Core regulatory return automation for all 16 CBN/NFIU/SCUML/NDIC/FIRS returns"],
              },
              {
                quarter: "Q2 2026",
                status: "In Progress",
                color: colors.accentBlue,
                items: ["Universal CBS parser — direct FlexCube, Ncube, Finacle integration"],
              },
              {
                quarter: "Q3 2026",
                status: "Coming",
                color: "transparent",
                borderColor: colors.accentBlue,
                items: ["PEP screening and sanctions list integration", "Regulatory change tracking and automatic form updates"],
              },
              {
                quarter: "Q4 2026",
                status: "Planned",
                color: "transparent",
                borderColor: colors.textTertiary,
                items: ["Examination preparation pack", "Multi-institution management for holding companies"],
              },
            ].map((milestone, i) => (
              <motion.div
                key={milestone.quarter}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                style={{
                  background: milestone.color || colors.pageBg,
                  border: milestone.borderColor ? `2px solid ${milestone.borderColor}` : "none",
                  borderRadius: 16,
                  padding: 24,
                  position: "relative",
                  zIndex: 1,
                }}
              >
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: milestone.color === "transparent" ? colors.textPrimary : colors.whiteSurface,
                  }}>
                    {milestone.quarter}
                  </span>
                  {milestone.status === "Launched" && (
                    <Check size={16} color={colors.whiteSurface} />
                  )}
                </div>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  color: milestone.color === "transparent" ? colors.textSecondary : "rgba(255,255,255,0.8)",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}>
                  {milestone.status}
                </span>
                <ul style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "16px 0 0",
                }}>
                  {milestone.items.map((item) => (
                    <li key={item} style={{
                      fontSize: 13,
                      color: milestone.color === "transparent" ? colors.textSecondary : "rgba(255,255,255,0.9)",
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sub-section 5: Final CTA */}
      <div style={{
        background: colors.darkSection,
        padding: "100px 24px",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Pulsing glow */}
        <motion.div
          animate={{ opacity: [0.06, 0.12, 0.06] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            height: 600,
            background: `radial-gradient(circle, ${colors.accentBlue} 0%, transparent 70%)`,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "relative", zIndex: 1 }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              fontSize: "clamp(36px, 5vw, 56px)",
              fontWeight: 700,
              color: colors.whiteSurface,
              marginBottom: 16,
            }}
          >
            Ready to file your first return?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 19,
              color: colors.textTertiary,
              marginBottom: 40,
            }}
          >
            Join Nigerian financial institutions already using RegCo.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              onClick={() => navigate("/book-demo")}
              style={{
                background: colors.whiteSurface,
                color: colors.textPrimary,
                fontSize: 17,
                fontWeight: 500,
                padding: "16px 40px",
                borderRadius: 980,
                border: "none",
                cursor: "pointer",
              }}
            >
              Book a Demo
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02, background: "rgba(255,255,255,0.15)" }}
              onClick={() => navigate("/login")}
              style={{
                background: "transparent",
                color: colors.whiteSurface,
                fontSize: 17,
                fontWeight: 500,
                padding: "16px 40px",
                borderRadius: 980,
                border: `1px solid ${colors.textTertiary}`,
                cursor: "pointer",
              }}
            >
              Sign In
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   SECTION 9 — FINAL CTA (LEGACY - KEPT FOR NAVIGATION)
═══════════════════════════════════════════════════════════════════════════════ */
function Section9FinalCTA() {
  // This section is now replaced by the About section's final CTA
  // Keeping function stub for any legacy references
  return null;
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════════ */
const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSection, setActiveSection] = useState(0);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[id^='section-'], #who-we-serve, #pricing, #about");
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      sections.forEach((section, i) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.scrollY;
        const sectionBottom = sectionTop + rect.height;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(i);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sectionIds = [
      "section-0", "section-1", "section-2", "section-3", "section-4",
      "section-5", "section-6", "section-7", "section-8",
      "who-we-serve", "pricing", "about"
    ];
    const section = document.getElementById(sectionIds[index]);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div 
      ref={containerRef} 
      style={{ background: colors.blackSection }}
    >
      <Navbar />
      <ScrollProgressBar scrollYProgress={scrollYProgress} />
      <NavigationDots activeSection={activeSection} onNavigate={scrollToSection} />
      
      <HeroSection />
      <Section1DashboardHome />
      <Section2CreateReport />
      <Section3MyReports />
      <Section4ComplianceCalendar />
      <Section5TransactionMonitor />
      <Section6RiskAnalysis />
      <Section7ComplianceMail />
      <Section8Settings />
      <WhoWeServeSection />
      <PricingSection />
      <AboutSection />
    </div>
  );
};

export default Index;
