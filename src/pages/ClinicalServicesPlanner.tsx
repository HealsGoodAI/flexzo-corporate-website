import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import {
  BarChart3,
  ShieldCheck,
  FlaskConical,
  ArrowRightLeft,
  LineChart,
  CalendarCheck,
  Workflow,
  ShieldAlert,
  Zap,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

import cspStep1 from "@/assets/csp-step-1.jpg";
import cspStep2 from "@/assets/csp-step-2.jpg";
import cspStep3 from "@/assets/csp-step-3.jpg";
import cspStep4 from "@/assets/csp-step-4.jpg";

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
    title: "Clinically Aware Demand Modelling",
    description:
      "Service, clinic and session-level forecasts built from historical activity, referral patterns and pathway timings.",
  },
  {
    icon: FlaskConical,
    title: "Scenario Modelling & Trade-Off Analysis",
    description:
      '"What if" simulations that quantify cost, continuity and capacity impacts of service changes.',
  },
  {
    icon: ShieldCheck,
    title: "Rule-Driven Safety & Training Protections",
    description:
      "Supervision ratios, procedural skill requirements and trainee protections embedded in planning logic.",
  },
  {
    icon: ArrowRightLeft,
    title: "Direct Handover to Rostering & Forecasting",
    description:
      "Validated service templates translate into executable rotas and feed Flexzo AI for optimisation.",
  },
  {
    icon: LineChart,
    title: "Configurable Analytics & KPI Reporting",
    description:
      "Dashboards and reports for cancelled clinics, throughput, cost-per-session and utilisation to demonstrate value.",
  },
];

const benefits = [
  {
    icon: CalendarCheck,
    title: "Fewer Cancelled Clinics",
    description:
      "Plans reflect clinical pathways and achievable staffing so clinics run as scheduled.",
  },
  {
    icon: Workflow,
    title: "Improved Patient Flow & Throughput",
    description:
      "Services are sized and staffed to demand, reducing bottlenecks and wait times.",
  },
  {
    icon: ShieldAlert,
    title: "Safer, Policy-Compliant Staffing",
    description:
      "Supervision and competency requirements are encoded directly into plans.",
  },
  {
    icon: Zap,
    title: "Faster, Less Error-Prone Implementation",
    description:
      "Validated plans convert directly into executable rosters without rework.",
  },
  {
    icon: TrendingUp,
    title: "Measurable Operational Improvement",
    description:
      "KPIs and continuous learning refine forecasts and recommendations over time.",
  },
];

const stats = [
  { value: "35%", label: "Fewer cancelled clinics" },
  { value: "2x", label: "Faster plan-to-roster" },
  { value: "20%", label: "Higher clinic throughput" },
  { value: "100%", label: "Audit trail coverage" },
];

const ClinicalServicesPlanner = () => {
  const { t } = useRegionText();
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 60% 40%, hsl(210 100% 45% / 0.4) 0%, transparent 60%)"
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
                Clinical Services Planner
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                Design services
                <br />
                <span className="text-[#0075FF]">that deliver</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                A clinical operations platform that connects service design,
                demand forecasting and rostering so staffing matches how care
                is actually delivered.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <RegionLink
                  href="/book-demo"
                  className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
                >
                  Request a Workshop
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </RegionLink>
                <RegionLink
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40"
                >
                  Contact Sales
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
                From strategic plan
                <br />
                to operational rota
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
                Flexzo Clinical Services Planner helps healthcare organisations design,
                model and operationalise service plans so staffing matches how care is
                delivered. It incorporates patient pathways, case mix, throughput and
                skill mix requirements through clinically aware models.
              </p>
              <p>
                By translating strategic plans into operational rotas, the Planner
                reduces cancelled clinics, improves patient flow and ensures the right
                staff with the right competencies are scheduled where they are needed
                most.
              </p>
              <p>
                Scenario modelling supports "what if" analysis that quantifies
                trade-offs — the cost and continuity implications of consolidating
                sessions, changing clinic templates or protecting trainee opportunities.
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
              From design to delivery
            </h2>
          </motion.div>

          <div className="space-y-24">
          {[
              {
                step: "01",
                title: "Model Demand",
                text: "Demand is modelled at the service, clinic and session level using historical activity, referral patterns and pathway timings. Clinically informed rules capture supervision ratios, procedural skill requirements and training protections.",
                image: cspStep1,
              },
              {
                step: "02",
                title: "Simulate & Compare",
                text: "Scenario modelling supports 'what if' analysis that quantifies trade-offs — the cost and continuity implications of consolidating sessions, changing clinic templates or protecting trainee opportunities across services.",
                image: cspStep2,
              },
              {
                step: "03",
                title: "Plan to Roster",
                text: "Validated service plans hand over directly into rostering and Flexzo AI forecasting, converting planning outputs into executable rotas without rework. Operational rosters reflect the exact assumptions used in planning.",
                image: cspStep3,
              },
              {
                step: "04",
                title: "Measure & Refine",
                text: "Analytics highlight bottlenecks, utilisation and clinic productivity. Reports track cancelled clinics, throughput, cost-per-session and waiting time reduction. The Planner learns from realised activity and refines forecasts continuously.",
                image: cspStep4,
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
                  <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{item.title}</h3>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{item.text}</p>
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
              Why Clinical Services Planner
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
              Bridge the gap between service design and{" "}
              <span className="text-[#0075FF]">operational delivery</span>.
            </p>
            <p className="mt-8 text-lg text-primary-foreground/40">
              Measurable reductions in cancellations, higher clinic productivity
              and demonstrable cost savings that support reinvestment into services.
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
              Request a <span className="text-[#0075FF]">clinical planning workshop</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Discover how the Planner can reduce cancelled clinics, improve
              patient flow and align staffing with service objectives.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <RegionLink
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </RegionLink>
              <RegionLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-border px-10 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
              >
                Contact Us
              </RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClinicalServicesPlanner;
