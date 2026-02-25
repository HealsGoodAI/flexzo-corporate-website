import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Brain, Shield, Users, Clock, TrendingDown, AlertTriangle } from "lucide-react";
import socialCareHero from "@/assets/social-care-hero.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const problems = [
  "High temporary staffing costs",
  "Apps that operate like agencies",
  "Last-minute gaps that lead to frantic calls, messages, and expensive cover",
  "Heavy paperwork and admin, even when using digital tools",
  "Staff juggling multiple apps and logins",
  "No clear view of who is available, compliant, or what shifts will cost until it is too late",
  "Suppliers who earn more when you use more agency staff, not less",
];

const whyChoose = [
  "Built to NHS governance standards and care regulation requirements",
  "Works alongside existing rota, payroll, and workforce systems",
  "No major IT project or disruptive change",
  "Modular by design — start where the pressure is greatest and scale over time",
  "AI-first approach that goes beyond simply digitising existing recruitment models",
];

const BookDemoButton = ({ t }: { t: (s: string) => string }) => (
  <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">
    {t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
  </RegionLink>
);

const SocialCare = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20" style={{ backgroundImage: `url(${socialCareHero})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#0CE3FF]">{t("Social Care")}</p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
              {t("AI-Powered Workforce for")} <span className="text-[#0075FF]">{t("Social Care")}</span>
            </h1>
            <motion.p initial="hidden" animate="visible" custom={1} variants={fadeUp} className="mt-10 max-w-2xl text-xl leading-relaxed text-primary-foreground/60 md:text-2xl">
              {t("Flexzo replaces fragmented, agency-led processes with intelligent automation — helping care homes radically reduce staffing costs while improving fill rates, control, and staff experience.")}
            </motion.p>
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="mt-12 flex flex-wrap gap-4">
              <BookDemoButton t={t} />
              <RegionLink href="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40">{t("Contact Sales")}</RegionLink>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="max-w-5xl">
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("Built for Complex,")} <span className="text-[#0075FF]">{t("Regulated Environments")}</span>
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              {t("Flexzo is an AI-first workforce technology platform launched in 2025 to help health and social care organisations radically reduce staffing costs. Our modular platform covers internal staff banks, agency management, and collaborative shared staff banks across organisations.")}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Problems */}
      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("The Real Problems")}</p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary-foreground md:text-5xl">
                {t("What We Actually Fix in")} <span className="text-[#0075FF]">{t("Care Homes")}</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-primary-foreground/60">
                {t("The result is more pressure on managers, higher costs, and less time for residents.")}
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp}>
              <ul className="space-y-5">
                {problems.map((item, i) => (
                  <motion.li key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i + 2} variants={fadeUp} className="flex items-start gap-4">
                    <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                    <span className="text-lg text-primary-foreground">{t(item)}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              { icon: Brain, title: "AI-First Workforce Automation", desc: "Flexzo goes beyond simply digitising existing recruitment models. Our AI-first approach intelligently automates shift allocation, candidate matching, and workforce planning to deliver faster fills at lower cost." },
              { icon: TrendingDown, title: "Radically Reduce Agency Spend", desc: "Replace expensive agency-led processes with intelligent internal staff banks and collaborative pools across organisations. Start where the pressure is greatest and scale over time." },
              { icon: Shield, title: "Compliance & Governance Built In", desc: "Built to NHS governance standards and care regulation requirements. Automated credential verification, right-to-work checks, and audit-ready reporting — without the heavy paperwork." },
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

      {/* Why Choose */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                {t("Designed for")} <span className="text-[#0075FF]">{t("Care Systems")}</span>
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

      {/* CTA */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#0075FF]" />
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Book a")} <span className="text-[#0075FF]">{t("Demo")}</span></h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              {t("See how Flexzo can help your care organisation reduce temporary staffing costs, improve fill rates, and give managers back their time. Modular by design — start where the pressure is greatest.")}
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <BookDemoButton t={t} />
              <RegionLink href="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t("Contact Sales")}</RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SocialCare;
