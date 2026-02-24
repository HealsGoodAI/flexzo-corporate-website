import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AgentNetwork from "./AgentNetwork";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "./RegionLink";

const sectors_uk = ["NHS Trusts", "Primary Care", "Community Pharmacy", "Mental Health"];

const HeroSection = () => {
  const { t } = useRegionText();
  const sectors = sectors_uk.map(s => t(s));
  const [sectorIndex, setSectorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectorIndex((prev) => (prev + 1) % sectors.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sectors.length]);

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-background/70" />
      <AgentNetwork />

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-7xl"
        >
          {t("An Agentic AI")}
          <br />
          {t("Workforce System")}
          <br />
          <span className="text-[#0075FF]">
            {t("for")}{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={sectorIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="inline-block"
              >
                {sectors[sectorIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground"
        >
          {t("Our agentic system doesn't just fill shifts. It identifies workforce gaps, activates the right supply tier, validates compliance in real time, and routes demand to the lowest-cost safe option —")}{" "}
          <strong className="text-foreground">{t("automatically")}</strong>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <RegionLink
            href="/book-demo"
            className="rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
          >
            {t("Book a Demo")}
          </RegionLink>
          <a
            href="#features"
            className="rounded-md border border-border bg-background/80 backdrop-blur-sm px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-[#0075FF] hover:text-white hover:border-[#0075FF]"
          >
            {t("Learn More")}
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
