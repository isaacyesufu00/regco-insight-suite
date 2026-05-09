import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform, useInView, useAnimation } from "framer-motion";
import { 
  FileText, Calendar, Upload, Download, Shield, Zap, 
  Check, ChevronDown
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

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
      {Array.from({ length: 9 }).map((_, i) => (
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
   SECTION 0 — HERO
═══════════════════════════════════════════════════════════════════════════════ */
function HeroSection() {
  const words = ["Everything", "you", "need."];
  
  return (
    <section
      id="section-0"
      style={{
        minHeight: "100vh",
        background: colors.blackSection,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "40px 24px",
      }}
    >
      <div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          style={{
            fontSize: 14,
            color: colors.accentBlue,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 16,
          }}
        >
          RegCo Dashboard
        </motion.p>
        
        <h1 style={{ 
          fontSize: "clamp(48px, 10vw, 80px)", 
          fontWeight: 700, 
          color: colors.whiteSurface,
          lineHeight: 1.05,
          marginBottom: 24,
        }}>
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.4 + i * 0.08, 
                duration: 0.6, 
                ease: easeApple 
              }}
              style={{ display: "inline-block", marginRight: i < words.length - 1 ? "0.3em" : 0 }}
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            color: colors.textTertiary,
            maxWidth: 600,
            margin: "0 auto",
            lineHeight: 1.5,
          }}
        >
          One dashboard. Every CBN return. Filed in under 5 minutes.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          style={{ marginTop: 60 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ChevronDown size={28} color={colors.whiteSurface} strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </div>
    </section>
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
          {statusCards.map((card, i) => (
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
    <AnimatedSection background={colors.pageBg} id="section-1">
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
    </AnimatedSection>
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
          whileHover={{ background: "rgba(0,102,204,0.04)" }}
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
  const startDay = 4; // May 2026 starts on Friday (index 4 if Mon=0)
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
   SECTION 9 — FINAL CTA
═══════════════════════════════════════════════════════════════════════════════ */
function Section9FinalCTA({ onFinish }: { onFinish: () => void }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");
  const fullText = "You're ready.";
  
  useEffect(() => {
    if (isInView) {
      let i = 0;
      const interval = setInterval(() => {
        if (i <= fullText.length) {
          setDisplayText(fullText.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
        }
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isInView]);
  
  return (
    <section
      ref={ref}
      id="section-9"
      style={{
        minHeight: "80vh",
        background: colors.blackSection,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 24px",
      }}
    >
      <div>
        <h2 style={{ 
          fontSize: "clamp(48px, 8vw, 72px)", 
          fontWeight: 700, 
          color: colors.whiteSurface,
          lineHeight: 1.1,
          marginBottom: 16,
          minHeight: "1.2em",
        }}>
          {displayText}
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            style={{ color: colors.accentBlue }}
          >|</motion.span>
        </h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 0.6 }}
          style={{
            fontSize: "clamp(18px, 3vw, 24px)",
            color: colors.textTertiary,
            marginBottom: 40,
          }}
        >
          Generate your first return now.
        </motion.p>
        
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 2, duration: 0.6 }}
          whileHover={{ scale: 1.02, background: "#0077ED" }}
          onClick={onFinish}
          style={{
            background: colors.accentBlue,
            color: colors.whiteSurface,
            fontSize: 17,
            fontWeight: 500,
            padding: "16px 40px",
            borderRadius: 980,
            border: "none",
            cursor: "pointer",
            transition: "all 0.3s ease",
          }}
        >
          Go to Dashboard
        </motion.button>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════════════════ */
export default function DashboardTutorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSection, setActiveSection] = useState(0);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll("[id^='section-']");
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

  const completeTutorial = async () => {
    if (user) {
      await supabase.from("profiles").update({ tutorial_completed: true }).eq("id", user.id);
    }
  };

  const scrollToSection = (index: number) => {
    const section = document.getElementById(`section-${index}`);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFinish = async () => {
    await completeTutorial();
    navigate("/dashboard");
  };

  return (
    <div 
      ref={containerRef} 
      style={{ 
        background: colors.blackSection,
      }}
    >
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
      <Section9FinalCTA onFinish={handleFinish} />
    </div>
  );
}
