import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import { Users, CalendarCheck, ShieldCheck, DollarSign, Zap, MapPin, BarChart3, Brain, ArrowRight, CheckCircle2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const hospitalFeatures = [
  { icon: Users, title: "Instant Access to Healthcare Professionals", description: "Skip the slow hiring process. Flexzo AI connects hospitals and healthcare providers with a nationwide database of pre-vetted, compliance-ready professionals — ready to work now." },
  { icon: CalendarCheck, title: "Seamless Workforce Planning", description: "Staff shortages? Not on our watch. Flexzo AI fills shifts in real time, matching the right professionals to your vacancies instantly — so patient care never takes a hit." },
  { icon: ShieldCheck, title: "Centralised Compliance & Credential Management", description: "Track all compliance documents in real time with automated renewal reminders to stay audit-ready." },
  { icon: DollarSign, title: "Zero Fees. Now & Forever.", description: "Ditch costly agency fees. Flexzo AI offers a transparent subscription model, saving hospitals money while ensuring healthcare professionals earn more. A win-win for everyone." },
  { icon: Zap, title: "Faster Hiring Process", description: "Fill urgent shifts in minutes with AI-driven candidate matching and instant confirmations." },
  { icon: MapPin, title: "Location-Based Shift Assignments", description: "Ensure reliability with smart recommendations based on real-time travel distance and shift location." },
  { icon: BarChart3, title: "Real-Time Analytics & Reporting", description: "Access workforce data, hiring trends, and compliance insights to optimise staffing decisions." },
  { icon: Brain, title: "AI-Driven Smart Hiring", description: "Automatically match shifts with qualified candidates, reducing hiring time and admin workload." },
];

const PlatformFeatures = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-foreground/60" />
        <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 70% 40%, hsl(210 100% 50% / 0.4) 0%, transparent 50%), radial-gradient(circle at 20% 80%, hsl(185 100% 55% / 0.2) 0%, transparent 40%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("The nation's premium collaborative staff bank")}</p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Platform")} <span className="text-[#0075FF]">{t("Features")}</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                {t("Flexzo AI is designed to revolutionise healthcare staffing, providing candidates with flexibility and control over their careers while offering NHS Trusts a seamless, cost-effective solution for workforce management.")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">{t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></RegionLink>
                <RegionLink href="/contact" className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-colors hover:border-primary-foreground/40">{t("Contact Sales")}</RegionLink>
              </div>
            </motion.div>
            <motion.div initial="hidden" animate="visible" custom={2} variants={fadeUp} className="hidden lg:flex items-center justify-center">
              <div className="relative">
                <div className="h-80 w-80 rounded-full bg-[#0075FF]/10 flex items-center justify-center">
                  <div className="h-56 w-56 rounded-full bg-[#0075FF]/10 flex items-center justify-center">
                    <div className="h-32 w-32 rounded-full bg-[#0075FF]/20 flex items-center justify-center">
                      <Brain className="h-16 w-16 text-[#0075FF]" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">{t("Built specifically for hospitals & agencies")}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Features for Hospitals & Agencies")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {hospitalFeatures.map((feature, i) => (
              <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0075FF]/10 transition-colors group-hover:bg-[#0075FF]/20"><feature.icon className="h-6 w-6 text-[#0075FF]" /></div>
                <h3 className="mb-3 text-lg font-semibold text-foreground">{t(feature.title)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(feature.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}>
            <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">{t("Ready to")} <span className="text-[#0075FF]">{t("get started")}</span>?</h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-primary-foreground/50">
              {t("Join the UK's leading NHS Trusts in transforming healthcare recruitment. Book a free demo today and discover how our AI-powered platform can help you.")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-8">
              {[t("Fill shifts faster"), t("AI-matched candidates"), t("No fees")].map((item) => (
                <div key={item} className="flex items-center gap-3 text-primary-foreground/60"><CheckCircle2 className="h-5 w-5 text-[#0CE3FF]" /><span className="text-sm font-medium">{item}</span></div>
              ))}
            </div>
            <div className="mt-10">
              <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-10 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">{t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></RegionLink>
              <p className="mt-4 text-sm text-primary-foreground/30">* {t("No credit card required")}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PlatformFeatures;
