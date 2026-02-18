import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import hospitalsHero from "@/assets/hospitals-hero.jpg";
import primaryCareHero from "@/assets/primary-care-hero.jpg";
import privateHealthcareHero from "@/assets/private-healthcare-hero.jpg";
import pharmacyHero from "@/assets/pharmacy-hero.jpg";

const sectors = [
  { title: "NHS Trusts & Hospitals", description: "End-to-end workforce automation for acute, community and mental health trusts — from internal bank to agency cascade.", image: hospitalsHero, href: "/sectors/hospitals", span: "lg:col-span-2 lg:row-span-2", imgHeight: "h-72 lg:h-full" },
  { title: "Primary Care", description: "Zero-fee staffing for GP practices with AI-powered matching and compliance built in.", image: primaryCareHero, href: "/sectors/primary-care", span: "", imgHeight: "h-52" },
  { title: "Private Healthcare", description: "Premium talent pipelines and credential management for independent providers.", image: privateHealthcareHero, href: "/sectors/private-healthcare", span: "", imgHeight: "h-52" },
  { title: "Community Pharmacy", description: "Rapid locum cover and compliance automation purpose-built for pharmacy.", image: pharmacyHero, href: "/sectors/pharmacy", span: "lg:col-span-2", imgHeight: "h-52" },
];

const SectorsOverview = () => {
  return (
    <section className="bg-foreground py-28">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-14">
          <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-background/40">Sectors We Serve</span>
          <h2 className="max-w-xl font-display text-3xl font-bold text-background md:text-4xl">Built for every corner of healthcare</h2>
        </motion.div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {sectors.map((sector, i) => (
            <motion.div key={sector.title} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className={sector.span}>
              <Link to={sector.href} className="group relative flex h-full flex-col overflow-hidden rounded-2xl">
                <div className={`relative w-full overflow-hidden ${sector.imgHeight}`}>
                  <img src={sector.image} alt={sector.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <h3 className="mb-1 font-display text-lg font-semibold text-white md:text-xl">{sector.title}</h3>
                  <p className="mb-3 text-sm leading-relaxed text-white/70 line-clamp-2">{sector.description}</p>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-white/90 transition-colors group-hover:text-white">
                    Explore sector <ArrowRight size={12} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectorsOverview;
