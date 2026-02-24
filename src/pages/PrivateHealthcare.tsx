import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Brain, Shield, Users, Clock, Zap, TrendingDown, AlertTriangle, Eye, Building2 } from "lucide-react";
import privateHero from "@/assets/private-healthcare-hero.jpg";
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

const challenges = [
  {
    icon: Users,
    title: "Staffing shortages",
    desc: "Hospitals often struggle to find qualified clinicians quickly enough to meet demand, leading to rota gaps, cancelled lists, and reduced capacity.",
  },
  {
    icon: TrendingDown,
    title: "Rising agency costs",
    desc: "Agency fees continue to increase, placing pressure on budgets and reducing available investment into patient care and service expansion.",
  },
  {
    icon: Shield,
    title: "Compliance and governance workload",
    desc: "Managing compliance for temporary and permanent staff is time-consuming and costly — and remains the responsibility of the hospital.",
  },
  {
    icon: Eye,
    title: "Lack of control and visibility",
    desc: "Traditional recruitment models offer limited oversight on who applies, candidate quality, and whether staff are genuinely available.",
  },
];

const modernStaffing = [
  { title: "Faster", desc: "Fill shifts and clinics quickly using AI matching and real-time availability.", icon: Zap },
  { title: "Cheaper", desc: "Reduce reliance on agencies and avoid escalating recruitment costs.", icon: TrendingDown },
  { title: "Higher Quality", desc: "Access professionals who are vetted, verified, and monitored.", icon: Shield },
  { title: "More Efficient", desc: "Minimise administrative burden and reduce time spent on manual recruitment tasks.", icon: Clock },
];

const keyBenefits = [
  "Lower staffing costs through reduced agency dependency",
  "Faster shift coverage to maintain service delivery",
  "Improved workforce planning through centralised visibility",
  "Enhanced patient outcomes by reducing delays and cancellations",
  "Stronger governance with improved compliance oversight",
  "Greater operational efficiency by streamlining recruitment workflows",
];

const platformFeatures = [
  { title: "Instant access to healthcare professionals", desc: "Find compliant staff quickly when demand increases." },
  { title: "AI-powered shift assignments", desc: "Only alert professionals who can realistically attend shifts, improving fill rates and reliability." },
  { title: "Effortless compliance management", desc: "Automated document tracking, verification processes, and reminders help reduce governance workload." },
  { title: "Seamless workforce planning", desc: "Coordinate extra clinics, theatre sessions, and service expansion with better staffing control." },
];

const whyChoose = [
  "A reliable pool of compliant healthcare professionals",
  "Faster recruitment and rota coverage",
  "Reduced staffing costs with transparent pricing",
  "A smarter way to manage workforce demand without increasing admin burden",
];

const BookDemoButton = () => (
  <RegionLink
    href="/book-demo"
    className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
  >
    Book a Demo
    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
  </RegionLink>
);

const PrivateHealthcare = () => {
  const { t } = useRegionText();
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${privateHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#0CE3FF]">
              Private Healthcare
            </p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
              Private{" "}
              <span className="text-[#0075FF]">Hospitals</span>
            </h1>
            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mt-10 max-w-2xl text-xl leading-relaxed text-primary-foreground/60 md:text-2xl"
            >
              Reduce Agency Spend. Improve Staffing Control. Keep Services Moving.
            </motion.p>
            <motion.div
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="mt-12 flex flex-wrap gap-4"
            >
              <BookDemoButton />
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
                Modern workforce platform for{" "}
                <span className="text-[#0075FF]">private healthcare</span>
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
                Private hospitals are under increasing pressure to maintain safe staffing levels,
                meet patient demand, and deliver efficient elective care — all while controlling costs.
              </p>
              <p>
                Flexzo.ai provides a modern workforce platform designed to help private healthcare
                providers access compliant clinical professionals quickly, reduce dependency on
                agencies, and manage staffing more effectively.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CHALLENGES ── Dark section */}
      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
              Industry Challenges
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">
              The Challenge Facing{" "}
              <span className="text-[#0075FF]">Private Hospitals</span>
            </h2>
            <p className="mt-6 text-lg text-primary-foreground/60">
              Many private providers face the same recurring issues:
            </p>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 md:grid-cols-2">
            {challenges.map((c, i) => (
              <motion.div
                key={c.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group border border-primary-foreground/5 bg-foreground p-10 transition-colors hover:bg-primary-foreground/5"
              >
                <c.icon className="mb-6 h-8 w-8 text-[#0075FF] transition-transform group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold text-primary-foreground">{c.title}</h3>
                <p className="text-sm leading-relaxed text-primary-foreground/50">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESS PROFESSIONALS ── Bold editorial */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="max-w-5xl"
          >
            <h2 className="text-4xl font-bold leading-[1.15] tracking-tight text-foreground md:text-6xl lg:text-7xl">
              Access a large database of{" "}
              <span className="text-[#0075FF]">compliant professionals</span>
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Gain access to a growing pool of healthcare professionals who are pre-vetted,
              compliance-ready, and available to work. Flexzo.ai enables private hospitals to
              source and book staff directly through an intelligent workforce platform.
            </p>
            <div className="mt-12">
              <BookDemoButton />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── THREE FEATURE COLUMNS ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-3">
            {[
              {
                icon: TrendingDown,
                title: "Eliminate unnecessary agency mark-ups",
                desc: "Flexzo.ai operates on a subscription model — meaning you avoid expensive agency premiums and maintain predictable staffing costs.",
              },
              {
                icon: Brain,
                title: "AI-powered matching and shift booking",
                desc: "Our platform uses intelligent matching to connect you with the most suitable clinicians for your vacancies, faster.",
              },
              {
                icon: Shield,
                title: "Built for compliance and audit readiness",
                desc: "Upload documentation once and Flexzo.ai supports the process through automated compliance tracking, reminders, and verification workflows.",
              },
            ].map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-background p-12 transition-all hover:border-[#0075FF]/20 hover:shadow-lg"
              >
                <f.icon className="mb-6 h-10 w-10 text-[#0075FF]" />
                <h3 className="mb-4 text-xl font-bold text-foreground">{f.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MODERN STAFFING ── 4-card grid */}
      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
              Built for Modern Private Healthcare
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Staffing solutions that are
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {modernStaffing.map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-[#0075FF]/20 hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0075FF]/10 transition-colors group-hover:bg-[#0075FF]/20">
                  <item.icon className="h-6 w-6 text-[#0075FF]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-12"
          >
            <BookDemoButton />
          </motion.div>
        </div>
      </section>

      {/* ── KEY BENEFITS ── Dark split */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
                Key Benefits for{" "}
                <span className="text-[#0075FF]">Private Hospitals</span>
              </h2>
              <p className="mt-6 text-lg text-primary-foreground/60">
                Using Flexzo.ai helps private providers achieve:
              </p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
            >
              <ul className="space-y-5">
                {keyBenefits.map((item, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 2}
                    variants={fadeUp}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0075FF]" />
                    <span className="text-lg text-primary-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── ONE PLATFORM ── */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="mb-16 max-w-3xl"
          >
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              One Platform.{" "}
              <span className="text-[#0075FF]">Endless Staffing Solutions.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Flexzo.ai supports private hospitals with:
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {platformFeatures.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="flex items-start gap-4 rounded-2xl border border-border bg-background p-8 transition-shadow hover:shadow-md"
              >
                <CheckCircle2 className="mt-1 h-6 w-6 shrink-0 text-[#0075FF]" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={4}
            variants={fadeUp}
            className="mt-12"
          >
            <BookDemoButton />
          </motion.div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                Why Private Hospitals Choose{" "}
                <span className="text-[#0075FF]">Flexzo.ai</span>
              </h2>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
            >
              <p className="mb-6 text-lg text-muted-foreground">
                Private hospitals are increasingly choosing Flexzo.ai because it provides:
              </p>
              <ul className="space-y-5">
                {whyChoose.map((item, i) => (
                  <motion.li
                    key={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 2}
                    variants={fadeUp}
                    className="flex items-start gap-4"
                  >
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#0075FF]" />
                    <span className="text-lg text-foreground">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
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
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#0075FF]" />
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Book a <span className="text-[#0075FF]">Demo</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Want to see how Flexzo.ai can help your private hospital reduce agency spend and
              improve staffing efficiency? Contact our team today to arrange a personalised demo.
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Discover how Flexzo.ai can support your workforce planning, improve fill rates,
              and streamline staffing operations.
            </p>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <BookDemoButton />
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

export default PrivateHealthcare;
