import { motion } from "framer-motion";
import aiSourcingHero from "@/assets/ai-sourcing-hero.jpg";
import aiSourcingPredictImg from "@/assets/ai-sourcing-predict.jpg";
import aiSourcingMatchImg from "@/assets/ai-sourcing-match.jpg";
import aiSourcingFillImg from "@/assets/ai-sourcing-fill.jpg";
import aiSourcingLearnImg from "@/assets/ai-sourcing-learn.jpg";
import aiSourcingOverviewImg from "@/assets/ai-sourcing-overview.png";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import {
  BarChart3,
  ShieldCheck,
  Users,
  Eye,
  LayoutDashboard,
  TrendingDown,
  Zap,
  ClipboardCheck,
  Brain,
  Target,
  ArrowRight,
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
    icon: BarChart3,
    title: "Service-level Predictive Forecasting",
    description:
      "Granular forecasts by service, location, shift type and grade built from historical, patient flow and seasonal signals.",
  },
  {
    icon: ShieldCheck,
    title: "Policy-Aware Optimiser",
    description:
      "Encodes trust rules (supervision ratios, training protections, pay bands) to generate operationally feasible allocations.",
  },
  {
    icon: Users,
    title: "Graded Skill Matching",
    description:
      "Ranks clinicians by competency and scope of practice to ensure safe, appropriate allocations.",
  },
  {
    icon: Eye,
    title: "Explainability & Audit Trails",
    description:
      "Ranked recommendations, alternatives and stored rationale to support governance and manager trust.",
  },
  {
    icon: LayoutDashboard,
    title: "Scenario Modelling & Dashboards",
    description:
      '"What-if" scenarios and KPIs (fill rate, agency reliance, roster compliance) for decision support.',
  },
];

const benefits = [
  {
    icon: TrendingDown,
    title: "Lower Agency Spend",
    description:
      "Prioritise internal capacity and optimise allocations before using external supply.",
  },
  {
    icon: Zap,
    title: "Faster Time-to-Fill",
    description:
      "Predictive matching and automated escalation dramatically shorten staffing gaps.",
  },
  {
    icon: ClipboardCheck,
    title: "Compliant Rosters",
    description:
      "Respect local policies and clinical safety constraints automatically.",
  },
  {
    icon: Brain,
    title: "Reduced Cognitive Load",
    description:
      "Ranked options, cost estimates and risk indicators for quicker decisions.",
  },
  {
    icon: Target,
    title: "Measurable ROI",
    description:
      "Scenario testing, continuous learning and tracked improvements to KPIs.",
  },
];

const stats = [
  { value: "40%", label: "Reduction in agency spend" },
  { value: "3x", label: "Faster time-to-fill" },
  { value: "98%", label: "Roster compliance rate" },
  { value: "24/7", label: "Automated matching" },
];

const AiSourcing = () => {
  const { t } = useRegionText();
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── Full-bleed dark immersive block */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: `url(${aiSourcingHero})` }}
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-foreground/60" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
                AI Sourcing
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                Predict tomorrow's
                <br />
                <span className="text-[#0075FF]">demand today</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                A clinically tuned workforce intelligence engine that combines
                predictive forecasting, skills-based matching and policy-aware
                optimisation.
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

            {/* Right: large stats */}
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

      {/* ── OVERVIEW ── Large text editorial block */}
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
                Clinically tuned
                <br />
                workforce intelligence
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
                Designed specifically for clinical environments, Flexzo AI models
                service-level demand, grade and skill mixes, seasonal patterns and
                operational constraints so planners can anticipate pressure points
                and act before gaps arise.
              </p>
              <p>
                By pairing forecasts with skill-aware optimisation, it proposes
                allocations that respect clinical rules, local policies and staff
                competencies while minimising unnecessary agency usage and overtime.
              </p>
              <p>
                The system provides explainable recommendations and ranked
                alternatives so managers understand trade-offs and can apply
                judgement where needed.
              </p>
            </motion.div>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            custom={2}
            variants={fadeUp}
            className="mt-16"
          >
            <img
              src={aiSourcingOverviewImg}
              alt="AI matching candidates with availability scores"
              className="w-full rounded-2xl"
            />
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ── Full-bleed dark block with large cards */}
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
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/50">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── Alternating large blocks */}
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
              From forecast to fill
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Predict Demand",
                text: "Forecasts operate at the right granularity — by service, location, shift type and grade — enriched with historical activity, patient flow signals and external seasonality such as elective cycles and winter demand.",
                image: aiSourcingPredictImg,
              },
              {
                step: "02",
                title: "Match & Optimise",
                text: "Staff are scheduled to roles that align with their competencies and scope of practice. Policy-aware optimisation encodes trust-specific rules such as supervision ratios, protected training time, and local pay bands.",
                image: aiSourcingMatchImg,
              },
              {
                step: "03",
                title: "Fill & Escalate",
                text: "Automation matches available clinicians from internal banks according to priority rules, availability and predicted fit, escalating to agency options only when internal capacity is insufficient.",
                image: aiSourcingFillImg,
              },
              {
                step: "04",
                title: "Learn & Improve",
                text: "With continuous learning, models adapt to local patterns, improving accuracy and recommendations. Operational dashboards present root-cause insights and near-term forecasts to track improvement.",
                image: aiSourcingLearnImg,
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={0}
                variants={fadeUp}
                className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
              >
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex items-center gap-4">
                    <span className="text-6xl font-bold text-[#0075FF]/20 md:text-7xl">{item.step}</span>
                  </div>
                  <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t(item.title)}</h3>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{t(item.text)}</p>
                </div>
                <div className={`aspect-[4/3] overflow-hidden rounded-2xl bg-muted ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  {item.image ? (
                    <img src={item.image} alt={item.title} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-24 w-24 rounded-2xl bg-[#0075FF]/10 flex items-center justify-center">
                        {i === 1 && <Users className="h-12 w-12 text-[#0075FF]" />}
                        {i === 2 && <Zap className="h-12 w-12 text-[#0075FF]" />}
                        {i === 3 && <Brain className="h-12 w-12 text-[#0075FF]" />}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── Light section with bold cards */}
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
              Why Flexzo AI
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
                <h3 className="mb-3 text-xl font-semibold text-foreground">{benefit.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE ── Full-bleed dark dramatic block */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
          >
            Flexzo AI turns complex workforce variables into{" "}
            <span className="text-[#0075FF]">actionable, explainable recommendations</span>.
          </motion.p>
        </div>
      </section>

      {/* ── CTA ── Clean bottom section */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to see it <span className="text-[#0075FF]">in action</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Book a demo and discover how Flexzo AI can transform your
              workforce planning.
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

export default AiSourcing;
