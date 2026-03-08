import RegCoLogo from "@/assets/RegCo_Logo.png";

const columns = [
  {
    title: "Product",
    links: ["Reports", "Monitoring", "Dashboard", "Pricing"],
  },
  {
    title: "Company",
    links: ["About", "Careers", "Contact"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms", "Security Policy"],
  },
];

const Footer = () => (
  <footer className="border-t border-border bg-muted/30 py-14">
    <div className="container mx-auto px-4 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <img src={RegCoLogo} alt="RegCo" style={{ width: 100, height: 28, objectFit: "contain", objectPosition: "left", display: "block", flexShrink: 0, background: "transparent" }} />
          <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
            AI-powered regulatory reporting and compliance infrastructure for financial institutions.
          </p>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="text-sm font-semibold text-foreground mb-3">{col.title}</h4>
            <ul className="space-y-2">
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="mt-12 pt-6 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">© 2026 RegCo. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

export default Footer;
