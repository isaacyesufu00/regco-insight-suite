const reportTypes = [
  "MFB Regulatory Return",
  "CBN Forex Return",
  "AML/CFT Compliance Report",
  "SCUML Compliance Report",
  "NFIU Regulatory Return",
  "Prudential Return",
  "CBN Monetary Policy Return",
];

const Square = () => (
  <span aria-hidden="true" className="inline-block w-3.5 h-3.5 bg-brand-gradient mx-6 align-middle" />
);

const Row = ({ direction }: { direction: "left" | "right" }) => (
  <div className="overflow-hidden py-4">
    <div
      className={`flex w-max ${
        direction === "left" ? "animate-marquee-left" : "animate-marquee-right"
      }`}
    >
      {[...Array(2)].map((_, dup) => (
        <div key={dup} className="flex items-center">
          {reportTypes.map((t, i) => (
            <span
              key={`${dup}-${i}`}
              className="inline-flex items-center text-[17px] font-normal text-[#1D1D1F] whitespace-nowrap"
            >
              {t}
              <Square />
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

const ReportTypesTicker = () => {
  return (
    <section
      className="py-14"
      style={{
        background: "#F5F5F7",
        borderTop: "1px solid rgba(0,0,0,0.12)",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <Row direction="left" />
      <Row direction="right" />
    </section>
  );
};

export default ReportTypesTicker;
