import { motion } from "framer-motion";
import rosteringHero from "@/assets/rostering-hero.jpg";
import rosteringStep1 from "@/assets/rostering-step-1.jpg";
import rosteringStep2 from "@/assets/rostering-step-2.jpg";
import rosteringStep3 from "@/assets/rostering-step-3.jpg";
import rosteringStep4 from "@/assets/rostering-step-4.jpg";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import {
  CalendarDays, ShieldCheck, Users, BarChart3, Clock, Smartphone, Brain, Target, ArrowRight, Activity, UserCheck, Layers,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const stats = [
  { value: "2M+", label: "Staff rostered across the UK" },
  { value: "30%", label: "Reduction in unfilled shifts" },
  { value: "99%", label: "Roster compliance rate" },
  { value: "24/7", label: "Real-time visibility" },
];

const keyBenefits = [
  { icon: Users, title: "One Platform. All Staff.", description: "From doctors and nurses to porters and allied health professionals — roster every staff group across multi-disciplinary teams. Skills, leave requests and working patterns are all accounted for, ensuring you operate effectively and to budget." },
  { icon: Brain, title: "Agentic & Human Intelligence", description: "Combine professional clinical judgement with our Agentic Intelligence Engine. Take the guesswork and mundane tasks out of building the perfect roster — balancing budgets, fairness, safety, compliance rules and clinical demand." },
  { icon: Activity, title: "Productivity & Efficiency", description: "Match staff numbers and skills to care needs with demand-based rostering. Reduce cancelled care, unnecessary agency use and lost capacity by understanding exactly what needs to be delivered." },
  { icon: Clock, title: "Real-Time Dynamic Rostering", description: "Things change before and during shifts. See changes in care needs and staff availability as they happen, with AI-driven predictive acuity giving you a real-time command centre for your workforce across teams and sites." },
];

const features = [
  { icon: CalendarDays, title: "Availability & Absence Management", description: "Manage annual leave, sickness, study leave and additional shift requests with full visibility and control. Sophisticated skills tracking and work regulation rules built in." },
  { icon: Target, title: "Activity-Based Rostering", description: "Schedule the right multi-professional team by understanding exact clinical activity — from theatres to laboratories. Prevent cancelled care and maximise team productivity." },
  { icon: BarChart3, title: "Staffing Command Centre", description: "Live mobile view of staffing deployment across multiple sites. Real-time visibility of staffing levels and care needs for bed meetings, command centres and senior executives on call." },
  { icon: Layers, title: "Integrated Temporary Staffing", description: "Fully integrated bank, shared bank and agency solutions ensure temporary staffing is only used when needed, at the right cost, with maximum control of quality." },
  { icon: ShieldCheck, title: "Compliance & Governance", description: "Encode trust-specific rules, supervision ratios, protected training time and local pay bands. Every roster decision is auditable and policy-compliant." },
  { icon: Smartphone, title: "Staff Self-Service App", description: "Put the roster in staff hands. View personal rosters, book bank shifts, request changes and communicate with teams — all from one integrated mobile app." },
];

const howItWorks = [
  { step: "01", title: "Define Care Demand", text: "Model staffing requirements by service, location, shift type and grade. Understand patient acuity and clinical activity to build rosters around care needs, not just headcounts.", image: rosteringStep1 },
  { step: "02", title: "Build & Optimise Rosters", text: "Our AI engine creates fair, efficient rosters that balance staff preferences, compliance rules, budget constraints and clinical safety. Multi-professional and cross-site scheduling handled automatically.", image: rosteringStep2 },
  { step: "03", title: "Deploy & Monitor", text: "Publish rosters to staff via the mobile app. Monitor real-time staffing against demand with live dashboards. Automatically escalate gaps through internal bank before agency.", image: rosteringStep3 },
  { step: "04", title: "Adapt & Improve", text: "Dynamic rostering responds to real-time changes. Predictive AI learns from patterns to improve future rosters, reduce costs and ensure safer staffing outcomes continuously.", image: rosteringStep4 },
];

const Rostering = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" style={{ backgroundImage: `url(${rosteringHero})` }} />
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("Rostering")}</p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Smarter rostering for")}<br /><span className="text-[#0075FF]">{t("safer care")}</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                {t("The only end-to-end roster solution built for multi-professional health and care teams. Fully integrated rostering, absence management, temporary staffing and real-time command — giving you complete control of costs, quality and staff experience.")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">{t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></RegionLink>
                <RegionLink href="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40">{t("Contact Sales")}</RegionLink>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="grid grid-cols-2 gap-6">
              {stats.map((stat, i) => (
                <motion.div key={stat.label} custom={i + 2} initial="hidden" animate="visible" variants={fadeUp} className="rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 p-8 backdrop-blur-sm">
                  <p className="text-4xl font-bold text-[#0075FF] md:text-5xl">{stat.value}</p>
                  <p className="mt-2 text-sm text-primary-foreground/50">{t(stat.label)}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}>
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">{t("Key Benefits")}</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">{t("Rostering that")}<br />{t("delivers outcomes")}</h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{t("Scheduling health and care staff is increasingly complex. Flexzo Rostering cuts through this complexity to help control cost, improve staff experience and make care safer.")}</p>
            </motion.div>
            <div className="grid gap-6 sm:grid-cols-2">
              {keyBenefits.map((benefit, i) => (
                <motion.div key={benefit.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0075FF]/10 transition-colors group-hover:bg-[#0075FF]/20"><benefit.icon className="h-6 w-6 text-[#0075FF]" /></div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{t(benefit.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(benefit.description)}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("Capabilities")}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">{t("One trusted platform.")}<br />{t("Multiple solutions.")}</h2>
          </motion.div>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => (
              <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="group border border-primary-foreground/5 bg-foreground p-10 transition-colors hover:bg-primary-foreground/5">
                <feature.icon className="mb-6 h-8 w-8 text-[#0075FF] transition-transform group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold text-primary-foreground">{t(feature.title)}</h3>
                <p className="text-sm leading-relaxed text-primary-foreground/50">{t(feature.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-20 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">{t("How it works")}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("From demand to deployment")}</h2>
          </motion.div>
          <div className="space-y-24">
            {howItWorks.map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex items-center gap-4"><span className="text-6xl font-bold text-[#0075FF]/20 md:text-7xl">{item.step}</span></div>
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

      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {t("Get the right people, in the right place, at the")} <span className="text-[#0075FF]">{t("right time")}</span>.
          </motion.p>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Ready to see it")} <span className="text-[#0075FF]">{t("in action")}</span>?</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t("Book a demo and discover how Flexzo Rostering can transform your workforce scheduling.")}</p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white">{t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></RegionLink>
              <RegionLink href="/contact" className="inline-flex items-center gap-2 rounded-md border border-border px-10 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-muted">{t("Contact Us")}</RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rostering;
