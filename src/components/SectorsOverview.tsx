import { motion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { useRegion } from "@/hooks/useRegion";
import hospitalsHero from "@/assets/hospitals-hero.jpg";
import primaryCareHero from "@/assets/primary-care.jpg";
import privateHealthcareHero from "@/assets/private-healthcare.jpg";
import pharmacyHero from "@/assets/community-pharmacy.jpg";
import { useRegionText } from "@/lib/regionalize";

const sectors = [
  {
    title: "NHS Trusts & Hospitals",
    description:
      "End-to-end workforce automation for acute, community and mental health trusts — from internal bank to agency cascade.",
    image: hospitalsHero,
    href: "/sectors/hospitals",
  },
  {
    title: "Primary Care",
    description:
      "Zero-fee staffing for GP practices with AI-powered matching and compliance built in.",
    image: primaryCareHero,
    href: "/sectors/primary-care",
  },
  {
    title: "Private Healthcare",
    description:
      "Premium talent pipelines and credential management for independent providers.",
    image: privateHealthcareHero,
    href: "/sectors/private-healthcare",
  },
  {
    title: "Community Pharmacy",
    description:
      "Rapid locum cover and compliance automation purpose-built for pharmacy.",
    image: pharmacyHero,
    href: "/sectors/pharmacy",
  },
];

const SectorsOverview = () => {
  const { t } = useRegionText();
  const { regionPath } = useRegion();
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((prev) => (prev + 2) % sectors.length);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 2 + sectors.length) % sectors.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 8000);
    return () => clearInterval(interval);
  }, [next]);

  const visibleSectors = [
    sectors[currentIndex],
    sectors[(currentIndex + 1) % sectors.length],
  ];

  return (
    <section className="bg-foreground py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-14 flex items-end justify-between"
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-background/40">
              {t("Sectors We Serve")}
            </span>
            <h2 className="max-w-xl font-display text-3xl font-bold text-background md:text-4xl">
              {t("Built for every corner of healthcare")}
            </h2>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <button
              onClick={prev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/60 transition-colors hover:border-background/40 hover:text-background"
              aria-label="Previous sectors"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={next}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-background/20 text-background/60 transition-colors hover:border-background/40 hover:text-background"
              aria-label="Next sectors"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {visibleSectors.map((sector, i) => (
            <motion.div
              key={`${sector.title}-${currentIndex}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ delay: i * 0.15, duration: 0.5, ease: "easeOut" }}
            >
              <Link
                to={regionPath(sector.href)}
                className="group relative flex flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                  <img
                    src={sector.image}
                    alt={t(sector.title)}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-2 font-display text-2xl font-bold text-white md:text-3xl">
                    {t(sector.title)}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-white/70 line-clamp-2">
                    {t(sector.description)}
                  </p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-colors group-hover:text-white">
                    {t("Explore sector")} <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {Array.from({ length: Math.ceil(sectors.length / 2) }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i * 2)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === i * 2
                  ? "w-6 bg-primary"
                  : "w-2 bg-background/30"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsOverview;
