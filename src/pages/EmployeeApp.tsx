import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import {
  Smartphone,
  Bell,
  ShieldCheck,
  FileCheck,
  Zap,
  Users,
  TrendingDown,
  MessageSquare,
  Heart,
  WifiOff,
  ArrowRight,
} from "lucide-react";
import employeeAppMockup from "@/assets/employee-app-mockup.png";

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
    icon: Bell,
    title: "Real-Time Shift Discovery & One-Tap Booking",
    description:
      "Intelligent matching and real-time notifications for available shifts with fast one-tap booking or declination workflows.",
  },
  {
    icon: FileCheck,
    title: "In-App Credential Visibility & Document Upload",
    description:
      "Mandatory training alerts, credential status display and secure document upload to reduce late-stage rejection.",
  },
  {
    icon: ShieldCheck,
    title: "Policy-Aware Acceptance Flows",
    description:
      "Conditional offers, provisional booking and two-stage acceptance flows that match local operational rules.",
  },
  {
    icon: Users,
    title: "Engagement Tools & Analytics",
    description:
      "Targeted nudges, incentive bundles, cohort campaigns and detailed engagement analytics for workforce teams.",
  },
  {
    icon: WifiOff,
    title: "Offline Support & Secure Integrations",
    description:
      "Progressive sync for low-connectivity areas, encrypted storage and seamless integration with Portal, Bank and rostering.",
  },
];

const benefits = [
  {
    icon: Zap,
    title: "Faster Time-to-Accept",
    description: "Higher internal fill rates through intelligent prioritisation and frictionless booking.",
  },
  {
    icon: FileCheck,
    title: "Reduced Late Cancellations",
    description: "Credential visibility ensures staff accept only shifts they are authorised to perform.",
  },
  {
    icon: TrendingDown,
    title: "Lower Agency Spend",
    description: "Better internal activation reduces dependency on premium external supply.",
  },
  {
    icon: MessageSquare,
    title: "Less Manager Admin",
    description: "Integrated messaging and in-app guidance reduce calls, emails and manual chasing.",
  },
  {
    icon: Heart,
    title: "Improved Staff Satisfaction",
    description: "Clinicians gain autonomy, control and immediate access to opportunities.",
  },
];

const stats = [
  { value: "1-tap", label: "Shift acceptance" },
  { value: "60%", label: "Faster time-to-cover" },
  { value: "35%", label: "Higher activation rates" },
  { value: "24/7", label: "Mobile access" },
];

const EmployeeApp = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 40% 60%, hsl(210 100% 45% / 0.4) 0%, transparent 60%)"
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
                {t("Employee App")}
              </p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Shifts, pay &")}
                <br />
                <span className="text-[#0075FF]">{t("docs in one app")}</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                {t("A mobile-first companion for clinicians and bank staff that simplifies shift discovery, acceptance and credential management while keeping payroll and compliance at your fingertips.")}
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
                {t("Mobile convenience,")}
                <br />
                {t("operational gains")}
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
              <p>{t("Built for clinicians on the move, the app delivers real-time notifications for available shifts, intelligent matching based on credential currency and preferences, and fast one-tap booking workflows that reduce friction and increase fill rates.")}</p>
              <p>{t("Intelligent push logic prioritises opportunities by fit, proximity and manager-defined priority sequences so the highest-value internal candidates see appropriate roles before external or agency channels are used.")}</p>
              <p>{t("A transparent pay and entitlement view shows shift pay rates, travel allowances and expected earnings, improving trust and reducing disputes. Security and identity are central: secure authentication, encrypted document storage and role-based access.")}</p>
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
            src={employeeAppMockup}
            alt="Employee App dashboard mockup"
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
              {t("From notification to shift")}
            </h2>
          </motion.div>

          <div className="space-y-24">
            {[
              {
                step: "01",
                title: "Discover & Match",
                text: "Real-time notifications surface shifts matched to your credentials, preferences and proximity. Intelligent prioritisation ensures the best-fit opportunities appear first.",
                icon: Bell,
              },
              {
                step: "02",
                title: "Accept & Book",
                text: "One-tap booking with conditional offers and provisional acceptance flows that respect local operational rules. Clear pay and entitlement information before you commit.",
                icon: Smartphone,
              },
              {
                step: "03",
                title: "Verify & Comply",
                text: "In-app credential checks, mandatory training alerts and secure document upload ensure you're authorised before deployment. Reduces late-stage rejection.",
                icon: ShieldCheck,
              },
              {
                step: "04",
                title: "Work & Get Paid",
                text: "Transparent pay rates, travel allowances and expected earnings. Seamless integration with payroll for accurate, timely reconciliation after every shift.",
                icon: Zap,
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
                  <div className="flex h-full items-center justify-center">
                    <div className="h-24 w-24 rounded-2xl bg-[#0075FF]/10 flex items-center justify-center">
                      <item.icon className="h-12 w-12 text-[#0075FF]" />
                    </div>
                  </div>
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
              {t("Why Employee App")}
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
          <motion.p
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl"
          >
            {t("Work when you want:")}{" "}
            <span className="text-[#0075FF]">{t("shifts, pay & documents in one app")}</span>.
          </motion.p>
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
              {t("Ready to")} <span className="text-[#0075FF]">{t("empower your workforce")}</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              {t("Book a demo and see how the Employee App can improve fill rates, reduce agency spend and give clinicians control.")}
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

export default EmployeeApp;
