import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import staffBankStepImg from "@/assets/staff-bank-step.jpg";
import staffBankStep2Img from "@/assets/staff-bank-step-2.jpg";
import staffBankStep3Img from "@/assets/staff-bank-step-3.jpg";
import staffBankStep4Img from "@/assets/staff-bank-step-4.jpg";
import {
  Link2,
  ShieldCheck,
  Brain,
  Smartphone,
  SlidersHorizontal,
  TrendingDown,
  Zap,
  ClipboardCheck,
  Users,
  HeartPulse,
  ArrowRight,
  BarChart3,
  RefreshCw,
  Building2,
  Settings,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const features = [
  {
    icon: Link2,
    title: "Tight e-Rostering & Payroll Integration",
    description:
      "Bank activity is embedded in everyday workforce planning for seamless pay and roster alignment.",
  },
  {
    icon: ShieldCheck,
    title: "Automated Competency & Compliance Workflows",
    description:
      "Auditable verification, credential currency and pre-employment checks reduce manual admin and risk.",
  },
  {
    icon: Brain,
    title: "AI-Enabled Prioritisation",
    description:
      "Ranked, trust-aware matching surfaces the best-fit internal staff before external options are used.",
  },
  {
    icon: Smartphone,
    title: "Candidate Mobile App & Targeted Engagement",
    description:
      "Personalised shift recommendations, real-time notifications and incentive mechanics drive activation and retention.",
  },
  {
    icon: SlidersHorizontal,
    title: "Rules-Driven Governance & Analytics",
    description:
      "Configurable eligibility, priority sequences, escalation paths plus dashboards for utilisation, fill-times and agency replacement metrics.",
  },
];

const benefits = [
  {
    icon: TrendingDown,
    title: "Lower Agency & Premium Costs",
    description:
      "Higher internal fill rates and smarter prioritisation reduce reliance on expensive external supply.",
  },
  {
    icon: Zap,
    title: "Faster Shift Fill",
    description:
      "Automated matching and proactive push notifications reduce vacancy time dramatically.",
  },
  {
    icon: ClipboardCheck,
    title: "Reduced Admin Burden",
    description:
      "Streamlined verification and auditable processes improve compliance and free up workforce teams.",
  },
  {
    icon: Users,
    title: "Higher Workforce Engagement",
    description:
      "Mobile experiences, transparent pay and targeted incentives drive retention and participation.",
  },
  {
    icon: HeartPulse,
    title: "Greater Operational Resilience",
    description:
      "Governed sharing and data-driven optimisation ensure continuity of care across services.",
  },
];

const stats = [
  { value: "60%", label: "Internal fill rate uplift" },
  { value: "2x", label: "Faster shift fill" },
  { value: "100%", label: "Compliance audit trail" },
  { value: "35%", label: "Reduction in agency spend" },
];

const InternalStaffBank = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 70% 40%, hsl(210 100% 50% / 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, hsl(185 100% 55% / 0.2) 0%, transparent 40%)"
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
                {t("Internal Staff Bank")}
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Make your float pool the")}{" "}
                <span className="text-[#0075FF]">first place you look</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                A purpose-built platform that turns casual and temporary workers
                into a reliable, first-choice source of clinical cover — reducing
                agency reliance and lowering cost-per-shift.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="/book-demo"
                  className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
                >
                  Book a Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40"
                >
                  Contact Sales
                </a>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i + 2}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm"
                >
                  <p className="text-4xl font-bold text-[#0075FF] md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/50">{stat.label}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
                Overview
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {t("Centralise, mobilise")}
                <br />
                {t("& engage your bank")}
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="space-y-6 text-lg leading-relaxed text-muted-foreground"
            >
              <p>
                {t("Flexzo Staff Bank centralises onboarding, compliance, availability and engagement so that bank activity is embedded in everyday workforce planning. Managers see a single view of credential currency, shift preferences, recent activity and performance indicators, enabling confident approvals and faster fills.")}
              </p>
              <p>
                {t("Automated verification workflows streamline pre-employment checks and maintain an auditable compliance trail, reducing manual administration and protecting patient safety. Predictive prioritisation ensures that high-value internal candidates are surfaced before agency options are considered.")}
              </p>
              <p>
                {t("For multi-site organisations, the Staff Bank can operate collaboratively to share capacity across departments or partner trusts while preserving credential checks, pay rules and local approvals — increasing resilience during periods of peak demand.")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
              Capabilities
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              Features
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group border border-primary-foreground/5 bg-foreground p-10 transition-colors hover:bg-primary-foreground/5"
              >
                <feature.icon className="mb-6 h-8 w-8 text-[#0075FF] transition-transform group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold text-primary-foreground">
                  {t(feature.title)}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/50">
                  {t(feature.description)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-20 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
              How it works
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              From pool to placement
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Onboard & Verify",
                text: "Rapid role-based onboarding with automated competency checks and credential verification. Build an auditable, compliant bank from day one.",
                icon: ClipboardCheck,
                image: staffBankStepImg,
              },
              {
                step: "02",
                title: "Prioritise & Match",
                text: "AI-enabled prioritisation surfaces the best-fit internal staff for each shift based on skills, availability, preferences and trust-specific rules.",
                icon: Brain,
                image: staffBankStep2Img,
              },
              {
                step: "03",
                title: "Engage & Mobilise",
                text: "Targeted communications, personalised shift recommendations and incentive mechanics drive activation through the candidate mobile app.",
                icon: Smartphone,
                image: staffBankStep3Img,
              },
              {
                step: "04",
                title: "Measure & Optimise",
                text: "Dashboards track bank utilisation, fill-times, agency replacement and staff satisfaction. Continuous refinement of prioritisation rules and incentive strategies.",
                icon: BarChart3,
                image: staffBankStep4Img,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0}
                variants={fadeUp}
                className={`grid items-center gap-12 lg:grid-cols-2`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-6xl font-bold text-[#0075FF]/20 md:text-7xl">{item.step}</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t(item.title)}</h3>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{t(item.text)}</p>
                </div>
                <div className={`aspect-[4/3] overflow-hidden rounded-2xl bg-muted ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
              {t("Why Flexzo Staff Bank")}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Benefits
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div
                key={benefit.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-background p-10 transition-all hover:border-[#0075FF]/20 hover:shadow-lg"
              >
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0075FF]/10 transition-colors group-hover:bg-[#0075FF]/20">
                  <benefit.icon className="h-7 w-7 text-[#0075FF]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{t(benefit.title)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(benefit.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── IMPACT QUOTE ── */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <p className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Transform scattered pools into a{" "}
              <span className="text-[#0075FF]">dependable, governed workforce</span>.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/50">
              Lower agency reliance, accelerate fills, simplify compliance and
              improve staff engagement — delivering measurable cost savings and
              sustained operational resilience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("Ready to build your")} <span className="text-[#0075FF]">{t("staff bank")}</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("Book a demo and discover how Flexzo Staff Bank can transform your internal workforce into a dependable source of clinical cover.")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <a
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-10 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Contact Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InternalStaffBank;
