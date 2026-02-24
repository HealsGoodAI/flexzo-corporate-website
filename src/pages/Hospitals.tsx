import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Users, Brain, Clock, TrendingDown, CheckCircle2, Sparkles, BarChart3, ClipboardCheck } from "lucide-react";
import hospitalsHero from "@/assets/hospitals-hero.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const trustBenefits = [
  "Fill shifts faster with compliant professionals",
  "Improve rota coverage and workforce efficiency",
  "Reduce last-minute cancellations",
  "Support elective recovery and additional capacity",
];

const whyChoose = [
  "Faster access to compliant healthcare professionals",
  "Reduced agency dependency and improved cost control",
  "Improved workforce planning and staffing visibility",
  "AI-powered recruitment and shift filling",
  "Supports insourcing and elective recovery programmes",
  "Streamlined compliance tracking and governance support",
];

const Hospitals = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${hospitalsHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#0CE3FF]">
              {t("NHS Hospitals")}
            </p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
              {t("NHS Trust Staffing &")}{" "}
              <span className="text-[#0075FF]">{t("Workforce Platform")}</span>
            </h1>
            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mt-10 max-w-2xl text-xl leading-relaxed text-primary-foreground/60 md:text-2xl"
            >
              Reduce Agency Spend. Fill Shifts Faster. Stay Fully Compliant.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-4"
            >
              <RegionLink
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </RegionLink>
              <RegionLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40"
              >
                Contact Sales
              </RegionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">Overview</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {t("AI-powered staffing for")}{" "}
                <span className="text-[#0075FF]">{t("NHS Trusts")}</span>
              </h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>{t("Flexzo.ai is an AI-powered NHS staffing platform designed to help NHS Trusts reduce agency reliance, improve workforce planning, and access compliant healthcare professionals faster.")}</p>
              <p>{t("With NHS waiting lists under continued pressure, Trusts need smarter systems to manage staffing gaps, deliver additional clinics, and maintain safe services without escalating costs.")}</p>
              <p>{t("Flexzo.ai supports NHS Trusts with a modern solution for insourcing, recruitment, and temporary workforce management.")}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SOLVE STAFFING SHORTAGES ── */}
      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">Workforce Challenges</p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl">
                {t("Solve NHS Staffing Shortages")}{" "}
                <span className="text-[#0075FF]">{t("Faster")}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/60">
                {t("NHS Trusts are facing ongoing workforce challenges, including rota gaps, recruitment delays, and limited visibility of available staff.")}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/40">{t("Flexzo.ai helps Trusts")}</p>
              <ul className="space-y-5">
                {trustBenefits.map((item, i) => (
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

      {/* ── REDUCE AGENCY SPEND ── */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl">
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("Reduce NHS")}{" "}
              <span className="text-[#0075FF]">{t("Agency Spend")}</span>
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("Agency fees continue to place major strain on NHS budgets. Flexzo.ai helps Trusts reduce unnecessary agency costs by providing direct access to a large pool of healthcare professionals through a transparent subscription model.")}
            </p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              {t("This keeps funding within the NHS system and supports long-term financial sustainability.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── AI MATCHING & COMPLIANCE ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-12 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
              <Brain className="mb-6 h-10 w-10 text-[#0075FF]" />
              <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">AI-Powered Shift Matching & Recruitment</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("Flexzo.ai uses AI-driven technology to match the right professionals to the right shifts quickly. Our platform supports smarter recruitment workflows, improved candidate matching, and faster shift booking — helping NHS teams spend less time on admin and more time on patient care.")}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-12 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
              <Shield className="mb-6 h-10 w-10 text-[#0075FF]" />
              <h3 className="mb-4 text-2xl font-bold text-foreground md:text-3xl">Compliance-Ready Healthcare Professionals</h3>
              <p className="text-lg leading-relaxed text-muted-foreground">
                {t("Flexzo.ai supports safer staffing by providing access to vetted professionals with compliance monitoring and automated document tracking. Trusts benefit from improved governance, audit readiness, and reduced compliance workload.")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHY TRUSTS CHOOSE ── */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {t("Why NHS Trusts choose")}{" "}
                <span className="text-[#0075FF]">Flexzo.ai</span>
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

      {/* ── BOOK A DEMO CTA ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#0075FF]" />
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Book a <span className="text-[#0075FF]">Demo</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("Looking for a smarter way to manage NHS staffing and workforce planning? Book a demo today and discover how Flexzo.ai can help your Trust reduce agency spend, improve shift coverage, and deliver services more efficiently.")}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <RegionLink
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </RegionLink>
              <RegionLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Contact Sales
              </RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Hospitals;
