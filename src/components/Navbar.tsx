import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import flexzoLogo from "@/assets/Flexzo-Logo.svg";
import flexzoLogoWhite from "@/assets/flexzo-logo-white.png";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";

const dropdownMenus: Record<string, { label: string; href: string }[]> = {
  Products: [
    { label: "AI Sourcing", href: "/products/ai-sourcing" },
    { label: "Internal Staff Bank", href: "/products/internal-staff-bank" },
    { label: "Collaborative Staff Bank", href: "/products/collaborative-staff-bank" },
    { label: "National Staff Bank", href: "#" },
    { label: "Amplify", href: "/products/amplify" },
    { label: "Clinical Services Planner", href: "/products/clinical-services-planner" },
    { label: "Employee App", href: "/products/employee-app" },
    { label: "Rostering", href: "/products/rostering" },
  ],
  Sectors: [
    { label: "Primary Care", href: "/sectors/primary-care" },
    { label: "Hospitals", href: "/sectors/hospitals" },
    { label: "Private Healthcare", href: "/sectors/private-healthcare" },
    { label: "Pharmacy", href: "/sectors/pharmacy" },
  ],
};

const simpleLinks: Record<string, string> = {
  Features: "/platform-features",
  News: "/news",
  Jobs: "/jobs",
  Contact: "/contact",
};

const navItems = ["Products", "Sectors", "Features", "News", "Jobs", "Contact"];

interface NavbarProps {
  transparent?: boolean;
}

const Navbar = ({ transparent = false }: NavbarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { regionPath } = useRegion();
  const { t } = useRegionText();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!transparent) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [transparent]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isTransparent = transparent && !scrolled && !mobileOpen;

  const resolveHref = (href: string) => {
    if (href.startsWith("http") || href === "#") return href;
    return regionPath(href);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isTransparent
            ? "bg-transparent border-b border-transparent"
            : "bg-background/90 backdrop-blur-xl border-b border-border/50"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <a href={regionPath("/")} className="relative z-[60] flex items-center">
            <img
              src={isTransparent ? flexzoLogoWhite : flexzoLogo}
              alt="Flexzo"
              className="h-7"
            />
          </a>

          {/* Desktop */}
          <div ref={navRef} className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => {
              const hasDropdown = item in dropdownMenus;
              if (hasDropdown) {
                const isOpen = openDropdown === item;
                return (
                  <div key={item} className="relative">
                    <button
                      onClick={() => setOpenDropdown(isOpen ? null : item)}
                      className={`flex items-center gap-1 text-sm transition-colors ${
                        isTransparent
                          ? "text-white/70 hover:text-white"
                          : "text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {item}
                      <ChevronDown size={14} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="absolute left-0 top-full z-50 mt-3 w-56 rounded-md border border-border bg-background py-2 shadow-lg">
                        {dropdownMenus[item].map((link) => (
                          <a
                            key={link.label}
                            href={resolveHref(link.href)}
                            className="block px-4 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            onClick={() => setOpenDropdown(null)}
                          >
                            {t(link.label)}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={item}
                  href={resolveHref(simpleLinks[item] || `#${item.toLowerCase()}`)}
                  className={`text-sm transition-colors ${
                    isTransparent
                      ? "text-white/70 hover:text-white"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item}
                </a>
              );
            })}
            <a
              href={resolveHref("/book-demo")}
              className={`rounded-md px-6 py-2.5 text-sm font-medium transition-all ${
                isTransparent
                  ? "bg-white/10 text-white border border-white/20 hover:bg-[#0075FF] hover:border-[#0075FF]"
                  : "bg-primary text-primary-foreground hover:bg-[#0075FF] hover:text-white"
              }`}
            >
              Login
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`relative z-[60] lg:hidden ${isTransparent ? "text-white" : "text-foreground"}`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Full-screen mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
            className="fixed inset-0 z-[55] flex flex-col bg-foreground lg:hidden"
          >
            <div className="flex items-center px-8 pt-6">
              <a href={regionPath("/")} onClick={() => setMobileOpen(false)} className="h-8 w-8 rounded-full bg-[#0CE3FF] block" />
            </div>

            <div className="flex flex-1 flex-col justify-center px-8">
              <nav className="flex flex-col gap-2">
                {navItems.map((item, i) => {
                  const hasDropdown = item in dropdownMenus;
                  if (hasDropdown) {
                    const isExpanded = mobileExpanded === item;
                    return (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      >
                        <button
                          onClick={() => setMobileExpanded(isExpanded ? null : item)}
                          className="flex w-full items-center justify-between py-3 text-3xl font-bold text-primary-foreground transition-colors hover:text-[#0075FF]"
                        >
                          {item}
                          <ChevronDown
                            size={20}
                            className={`text-primary-foreground/40 transition-transform ${isExpanded ? "rotate-180" : ""}`}
                          />
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="flex flex-col gap-1 pb-2 pl-4">
                                {dropdownMenus[item].map((link, j) => (
                                  <motion.a
                                    key={link.label}
                                    href={resolveHref(link.href)}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: j * 0.04, duration: 0.3 }}
                                    className="py-2 text-lg text-primary-foreground/50 transition-colors hover:text-[#0075FF]"
                                    onClick={() => setMobileOpen(false)}
                                  >
                                    {t(link.label)}
                                  </motion.a>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  }
                  return (
                    <motion.a
                      key={item}
                      href={resolveHref(simpleLinks[item] || `#${item.toLowerCase()}`)}
                      initial={{ opacity: 0, x: 40 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + i * 0.06, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      className="py-3 text-3xl font-bold text-primary-foreground transition-colors hover:text-[#0075FF]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item}
                    </motion.a>
                  );
                })}
              </nav>

              <motion.a
                href={resolveHref("/book-demo")}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                className="mt-10 inline-block rounded-md bg-[#0075FF] px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-[#0060D0]"
                onClick={() => setMobileOpen(false)}
              >
                Login
              </motion.a>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="px-8 pb-10"
            >
              <p className="text-sm text-primary-foreground/30">
                © {new Date().getFullYear()} Flexzo. All rights reserved.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
