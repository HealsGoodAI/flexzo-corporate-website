import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useRegion } from "@/hooks/useRegion";

const footerColumns = [
  {
    title: "Products",
    links: [
      { label: "AI Sourcing", href: "/products/ai-sourcing" },
      { label: "Internal Staff Bank", href: "/products/internal-staff-bank" },
      { label: "Collaborative Staff Bank", href: "#" },
      { label: "National Staff Bank", href: "#" },
      { label: "Amplify", href: "/products/amplify" },
      { label: "Clinical Services Planner", href: "/products/clinical-services-planner" },
      { label: "Employee App", href: "/products/employee-app" },
    ],
  },
  {
    title: "Sectors",
    links: [
      { label: "Primary Care", href: "/sectors/primary-care" },
      { label: "Hospitals", href: "/sectors/hospitals" },
      { label: "Private Healthcare", href: "/sectors/private-healthcare" },
      { label: "Pharmacy", href: "/sectors/pharmacy" },
    ],
    subsection: {
      title: "Company",
      links: [
        { label: "About", href: "/about" },
        { label: "Investors", href: "/investors" },
        { label: "News", href: "/news" },
        { label: "Team", href: "#" },
      ],
    },
  },
  {
    title: "Info",
    links: [
      { label: "Jobs", href: "/jobs" },
      { label: "News", href: "/news" },
      { label: "Book a Demo", href: "/book-demo" },
      { label: "Contact Us", href: "/contact" },
      { label: "Events", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Terms & Conditions", href: "/terms-and-conditions" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Cookies Policy", href: "#" },
      { label: "Legal", href: "#" },
    ],
  },
  {
    title: "Follow",
    links: [
      { label: "Linkedin", href: "https://www.linkedin.com/company/flexzo-ai" },
      { label: "facebook", href: "#" },
      { label: "instagram", href: "https://www.instagram.com/flexzoai/" },
      { label: "Tiktok", href: "#" },
      { label: "X", href: "https://x.com/FlexzoAi" },
    ],
  },
];

const regionLabels: Record<string, string> = {
  uk: "United Kingdom",
  us: "United States",
};

const Footer = () => {
  const { region, switchRegion, regionPath } = useRegion();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const resolveHref = (href: string) => {
    if (href.startsWith("http") || href === "#") return href;
    return regionPath(href);
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr_1fr_1fr_1fr]">
          {/* Left column: region selector + tagline */}
          <div className="lg:col-span-1">
            {/* Region dropdown */}
            <div className="relative mb-8">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex w-full max-w-[220px] items-center justify-between rounded-lg border border-primary-foreground/20 px-4 py-3 text-sm text-primary-foreground"
              >
                {regionLabels[region]}
                <ChevronDown size={16} className="ml-2 opacity-60" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 z-10 mt-1 w-full max-w-[220px] rounded-lg border border-primary-foreground/20 bg-foreground shadow-lg">
                  {(["uk", "us"] as const).map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        switchRegion(r);
                        setDropdownOpen(false);
                      }}
                      className={`block w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        r === region
                          ? "text-primary-foreground font-medium"
                          : "text-primary-foreground/60 hover:text-primary-foreground"
                      }`}
                    >
                      {regionLabels[r]}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="max-w-xs text-lg font-semibold leading-snug text-primary-foreground">
              Flexzo is an AI-powered healthcare staffing platform designed to
              simplify recruitment for NHS Trusts, recruitment agencies, and
              healthcare professionals.
            </p>

            <a
              href={resolveHref("/book-demo")}
              className="mt-8 inline-block rounded-lg border border-primary-foreground/30 px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-[#0075FF] hover:text-white hover:border-[#0075FF]"
            >
              Book a Demo
            </a>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h4 className="mb-4 text-sm font-bold text-primary-foreground">
                {col.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={resolveHref(link.href)}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
              {"subsection" in col && col.subsection && (
                <div className="mt-8">
                  <h4 className="mb-4 text-sm font-bold text-primary-foreground">
                    {col.subsection.title}
                  </h4>
                  <ul className="flex flex-col gap-2.5">
                    {col.subsection.links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={resolveHref(link.href)}
                          className="text-sm text-primary-foreground/60 transition-colors hover:text-primary-foreground"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-[#0CE3FF]" />
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} Flexzo. All right reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
