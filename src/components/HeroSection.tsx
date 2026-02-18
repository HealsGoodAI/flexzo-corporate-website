import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import AgentNetwork from "./AgentNetwork";
import heroBg from "@/assets/hero-bg.png";

const sectors = ["NHS Trusts", "Primary Care", "Community Pharmacy", "Mental Health"];

const HeroSection = () => {
  const [sectorIndex, setSectorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSectorIndex((prev) => (prev + 1) % sectors.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative overflow-hidden pt-28 pb-32 min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background" />
      <AgentNetwork />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_left,hsl(var(--background)/0.3)_5%,transparent_40%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/80" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 w-full text-center flex flex-col items-center justify-center min-h-[70vh]">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mb-10 max-w-5xl font-display text-5xl font-bold leading-[1.08] tracking-tight text-foreground md:text-7xl lg:text-8xl"
        >
          An Agentic AI Workforce System{" "}
          <span className="text-[#0075FF]">for</span>
          <br />
          <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={sectors[sectorIndex]}
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="inline-block text-[#0075FF]"
              >
                {sectors[sectorIndex]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mb-14 max-w-2xl text-lg leading-relaxed text-muted-foreground"
        >
          Our agentic system doesn't just fill shifts. It identifies workforce
          gaps, activates the right supply tier, validates compliance in real
          time, and routes demand to the lowest-cost safe option —{" "}
          <span className="font-semibold text-foreground">automatically</span>.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4"
        >
          <a
            href="/book-demo"
            className="rounded-md bg-primary px-8 py-3.5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
          >
            Book a Demo
          </a>
          <a
            href="#features"
            className="rounded-md border border-border bg-background/80 backdrop-blur-sm px-8 py-3.5 font-display text-sm font-semibold text-foreground transition-all hover:bg-[#0075FF] hover:text-white hover:border-[#0075FF]"
          >
            Learn More
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
