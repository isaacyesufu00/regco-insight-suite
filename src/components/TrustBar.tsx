const items = [
  "CBN Compliant",
  "NDPC Registered",
  "256-bit Encrypted",
  "7 Report Types Supported",
  "State MFB Certified",
  "Unit MFB Supported",
  "National MFB Ready",
  "NFIU Approved",
  "SCUML Recognized",
];

const Mark = () => (
  <span
    aria-hidden="true"
    className="inline-block w-2.5 h-2.5 bg-brand-gradient mx-5 align-middle"
  />
);

const TrustBar = () => {
  return (
    <div
      className="w-full overflow-hidden py-3"
      style={{
        background: "#F5F5F7",
        borderTop: "1px solid rgba(0,0,0,0.12)",
        borderBottom: "1px solid rgba(0,0,0,0.12)",
      }}
    >
      <div className="flex w-max animate-marquee-slow">
        {[...Array(2)].map((_, dup) => (
          <div key={dup} className="flex items-center">
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="text-[13px] font-normal text-[#6E6E73] whitespace-nowrap inline-flex items-center"
              >
                {item}
                <Mark />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
