import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Brain, Shield, Users, Clock, TrendingDown, Zap } from "lucide-react";
import pharmacyHero from "@/assets/pharmacy-hero.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const helpsList = [
  "Fill rota gaps quickly",
  "Reduce last-minute cancellations",
  "Improve access to reliable locum pharmacists",
  "Streamline recruitment and workforce planning",
];

const whyChoose = [
  "Faster access to locum pharmacist cover",
  "Reduced agency dependency and recruitment costs",
  "Improved workforce planning and staffing visibility",
  "Streamlined compliance tracking and governance support",
  "Designed for modern UK pharmacy services",
];

const BookDemoButton = ({ t }: { t: (s: string) => string }) => (
  <a href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">
    {t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
  </a>
);

const Pharmacy = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: `url(${pharmacyHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#0CE3FF]">{t("Pharmacy")}</p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
              {t("Smarter Locum Cover for")} <span className="text-[#0075FF]">{t("UK Pharmacies")}</span>
            </h1>
            <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mt-10 max-w-2xl text-xl leading-relaxed text-primary-foreground/60 md:text-2xl">
              {t("Flexzo.ai is an AI-powered pharmacy staffing platform designed to help UK pharmacies reduce staffing gaps, improve workforce planning, and cut reliance on expensive agencies.")}
            </motion.p>
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="mt-12 flex flex-wrap gap-4">
              <BookDemoButton t={t} />
              <a href="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40">{t("Contact Sales")}</a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl">
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("Pharmacy Staffing &")} <span className="text-[#0075FF]">{t("Recruitment Platform")}</span>
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("Whether you need urgent locum pharmacist cover, support for service delivery, or long-term recruitment solutions, Flexzo.ai connects pharmacies with compliant professionals quickly and efficiently.")}
            </p>
          </motion.div>
        </div>
      </section>

      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("Workforce Challenges")}</p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl">
                {t("Solve Pharmacy Staffing Shortages")} <span className="text-[#0075FF]">{t("Faster")}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/60">
                {t("Pharmacies across the UK are facing increasing pressure from staff shortages, rising locum costs, and growing demand for clinical pharmacy services.")}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/40">{t("Flexzo.ai helps pharmacies")}</p>
              <ul className="space-y-5">
                {helpsList.map((item, i) => (
                  <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0075FF]" />
                    <span className="text-lg text-primary-foreground">{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { icon: Brain, title: "AI-Powered Recruitment & Locum Matching", desc: "Flexzo.ai uses intelligent matching technology to connect pharmacies with suitable, compliant professionals based on availability and role requirements. Our platform supports faster booking and improved shift coverage while reducing the time spent sourcing staff manually." },
              { icon: TrendingDown, title: "Reduce Locum and Agency Costs", desc: "Agency mark-ups continue to drive up the cost of pharmacy recruitment. Flexzo.ai offers a transparent subscription-based model, helping pharmacies reduce unnecessary fees and gain more control over staffing spend." },
              { icon: Shield, title: "Compliance-Ready Pharmacy Professionals", desc: "Flexzo.ai supports safer recruitment by providing access to professionals who are pre-vetted and compliance-ready, helping pharmacies stay audit-ready while reducing administrative workload." },
            ].map((f, i) => (
              <motion.div key={f.title} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={i} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-12 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
                <f.icon className="mb-6 h-10 w-10 text-[#0075FF]" />
                <h3 className="mb-4 text-xl font-bold text-foreground">{t(f.title)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(f.desc)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {t("Why Pharmacies choose")} <span className="text-[#0075FF]">Flexzo.ai</span>
              </h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp}>
              <ul className="space-y-5">
                {whyChoose.map((item, i) => (
                  <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp} className="flex items-start gap-4">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0075FF]" />
                    <span className="text-lg text-primary-foreground">{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#0075FF]" />
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Book a")} <span className="text-[#0075FF]">{t("Demo")}</span></h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("Looking for a smarter way to manage pharmacy staffing and recruitment? Book a demo today and discover how Flexzo.ai can help your pharmacy reduce rota gaps, lower agency spend, and improve operational efficiency.")}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <BookDemoButton t={t} />
              <a href="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t("Contact Sales")}</a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pharmacy;
