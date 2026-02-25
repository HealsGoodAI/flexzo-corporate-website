import { motion } from "framer-motion";
import collaborativeBankMockup from "@/assets/collaborative-bank-mockup.png";
import nsbStep1 from "@/assets/nsb-step-1.jpg";
import nsbStep2 from "@/assets/nsb-step-2.jpg";
import nsbStep3 from "@/assets/nsb-step-3.jpg";
import nsbStep4 from "@/assets/nsb-step-4.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import {
  ShieldCheck,
  Scale,
  Link2,
  BarChart3,
  Megaphone,
  Shield,
  TrendingDown,
  Zap,
  Gavel,
  FileCheck,
  ArrowRight,
  Network,
  Handshake,
  Building2,
  Settings,
  Users,
  Globe,
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
    icon: ShieldCheck,
    title: "Credential Portability at Scale",
    description:
      "Verified credentials, training records and indemnity travel with clinicians across the entire national network — enabling safe cross-site deployment with automated trust-to-trust approvals.",
  },
  {
    icon: Scale,
    title: "Governance-First Design",
    description:
      "Encodes eligibility, pay harmonisation, escalation policies and handback rules at a national level to ensure transparent, fair and auditable allocations across all participating organisations.",
  },
  {
    icon: Link2,
    title: "Near-Real-Time Integrations",
    description:
      "Rostering, payroll and HR connections across partner organisations provide a unified, up-to-date national supply picture and simplify cross-organisation reconciliation.",
  },
  {
    icon: BarChart3,
    title: "National Scenario Modelling",
    description:
      "Test elective recovery, surge response and incident scenarios at national scale; visualise utilisation, cross-trust fill rates and credential gaps across the entire network.",
  },
  {
    icon: Megaphone,
    title: "Targeted Mobilisation & Incentives",
    description:
      "National campaigns, priority sequencing and incentive mechanics that activate clinicians across regions without undermining local pools or creating inequitable competition.",
  },
  {
    icon: Globe,
    title: "Clinical Compliance Tooling",
    description:
      "Purpose-built compliance tooling for cross-organisation deployments ensures clinicians meet site-specific competencies, regulatory requirements and local governance standards before every shift.",
  },
];

const benefits = [
  {
    icon: Shield,
    title: "Access to a Larger Qualified Pool",
    description:
      "Connect isolated local pools into a governed national resource, dramatically increasing the available qualified workforce for every participating organisation.",
  },
  {
    icon: Zap,
    title: "Faster Cross-Cover",
    description:
      "Audited handovers and automated approvals shorten time-to-cover across the entire network, restoring capacity during peaks or incidents in hours, not days.",
  },
  {
    icon: TrendingDown,
    title: "Lower Agency Spend",
    description:
      "Internal cross-cover at national scale reduces premium external supply and overall staffing cost, delivering measurable reductions in agency spend.",
  },
  {
    icon: Gavel,
    title: "Improved Capacity Resilience",
    description:
      "A national fabric of shared clinical staff reduces single-site dependency, ensuring sustainable workforce coverage even during simultaneous demand spikes.",
  },
  {
    icon: FileCheck,
    title: "Preserved Local Autonomy",
    description:
      "Governance-first design protects clinical safety, pay equity and trust autonomy — local rules and priorities are always respected within the national framework.",
  },
];

const stats = [
  { value: "40%", label: "Reduction in regional agency spend" },
  { value: "6x", label: "Faster cross-site cover" },
  { value: "100%", label: "Auditable governance trail" },
  { value: "100+", label: "Partner organisations supported" },
];

const NationalStaffBank = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 60% 30%, hsl(210 100% 50% / 0.4) 0%, transparent 50%), radial-gradient(circle at 30% 70%, hsl(185 100% 55% / 0.2) 0%, transparent 40%)"
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
                {t("National Staff Bank")}
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Make hiring frictionless for")}{" "}
                <span className="text-[#0075FF]">{t("clinical candidates")}</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                {t("Flexzo National Staff Bank transforms isolated local pools into a governed national resource — increasing resilience, lowering regional agency reliance and accelerating cross-site cover across the entire healthcare system.")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <RegionLink
                  href="/book-demo"
                  className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
                >
                  {t("Book a Demo")}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </RegionLink>
                <RegionLink
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40"
                >
                  {t("Contact Sales")}
                </RegionLink>
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
                  <p className="mt-2 text-sm text-primary-foreground/50">{t(stat.label)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="pt-28 pb-0 lg:pt-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
                {t("Overview")}
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                {t("A national operational")}
                <br />
                {t("fabric for clinical staffing")}
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
                {t("Flexzo National Staff Bank combines credential portability, trust-aware governance, secure integrations and targeted mobilisation to deliver measurable reductions in premium spend, faster restoration of capacity during peaks or incidents, and a transparent, fair system that protects clinicians and preserves local autonomy.")}
              </p>
              <p>
                {t("Unlike other shared bank concepts, National Staff Bank provides clinical compliance tooling purpose-built for cross-organisation deployments and governance-first design that makes regional sharing truly operational — not just aspirational.")}
              </p>
              <p>
                {t("For clinicians, the experience is mobile-first and seamless: profiles carry verified credentials and preferences, shift offers surface appropriate cross-site roles, and pay or travel variations are transparent before acceptance.")}
              </p>
            </motion.div>
          </div>
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          custom={2}
          variants={fadeUp}
          className="mt-20"
        >
          <img
            src={collaborativeBankMockup}
            alt="National Staff Bank dashboard mockup"
            className="w-full block"
          />
        </motion.div>
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
              {t("Capabilities")}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              {t("Features")}
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
              {t("How it works")}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("From isolated pools to national resilience")}
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Govern & Configure",
                text: "National governance workshops define rulesets, pay harmonisation and escalation policies. Trust agreements are encoded into the platform with pilot validation across initial partner organisations.",
                icon: Settings,
                img: nsbStep1,
              },
              {
                step: "02",
                title: "Connect & Integrate",
                text: "Integration with local rostering, payroll and HR systems across all partner organisations creates a unified national supply picture, letting planners locate available clinicians and initiate transfers with minimal manual work.",
                icon: Network,
                img: nsbStep2,
              },
              {
                step: "03",
                title: "Mobilise & Deploy",
                text: "Targeted national mobilisation campaigns and incentive mechanics activate clinicians across regions when demand spikes, improving responsiveness without undermining local staff pools or creating inequitable competition.",
                icon: Handshake,
                img: nsbStep3,
              },
              {
                step: "04",
                title: "Measure & Refine",
                text: "National dashboards show utilisation heatmaps, cross-trust fill rates, credential gaps and audit trails. Continuous measurement refines priority logic, mobilisation strategies and clinician incentives at scale.",
                icon: BarChart3,
                img: nsbStep4,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0}
                variants={fadeUp}
                className="grid items-center gap-12 lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-6xl font-bold text-[#0075FF]/20 md:text-7xl">{item.step}</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t(item.title)}</h3>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{t(item.text)}</p>
                </div>
                <div className={`aspect-[4/3] overflow-hidden rounded-2xl bg-muted ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img
                    src={item.img}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
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
              {t("Why National Staff Bank")}
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              {t("Benefits")}
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
              {t("A national bank that makes hiring frictionless for")}{" "}
              <span className="text-[#0075FF]">{t("clinical candidates")}</span>.
            </p>
            <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/50">
              {t("Increasing resilience, lowering regional agency reliance and accelerating cross-site cover — delivering measurable reductions in premium spend and faster restoration of capacity during peaks or incidents.")}
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
              {t("Ready to build a")} <span className="text-[#0075FF]">{t("national bank")}</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("Book a demo and discover how Flexzo National Staff Bank can transform fragmented local pools into governed national resilience.")}
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <RegionLink
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
              >
                {t("Book a Demo")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </RegionLink>
              <RegionLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-10 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                {t("Contact Us")}
              </RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NationalStaffBank;
