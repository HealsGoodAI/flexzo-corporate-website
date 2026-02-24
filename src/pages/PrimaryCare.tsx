import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Users, Brain, Clock, Globe, CheckCircle2, Sparkles } from "lucide-react";
import primaryCareHero from "@/assets/primary-care-hero.jpg";
import primaryCarePractice from "@/assets/primary-care-practice.jpg";
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

const features = [
  {
    icon: Users,
    title: "Instant Access to Clinicians",
    desc: "Access a nationwide clinical bank of pre-vetted, compliance-ready clinicians available for temporary or permanent roles without lengthy recruitment cycles.",
  },
  {
    icon: Clock,
    title: "Seamless Workforce Planning",
    desc: "Whether it's last-minute cover or longer-term gaps, Flexzo AI matches the right clinician to the right shift in real time, helping practices maintain safe, consistent care.",
  },
  {
    icon: Shield,
    title: "Effortless Compliance Management",
    desc: "Upload your documentation once. Flexzo handles background checks, registration validation, work authorisation, and ongoing compliance tracking with automated reminders built in.",
  },
  {
    icon: Globe,
    title: "Zero Fees. Full Transparency.",
    desc: "No agency margins. No permanent placement fees. No hidden costs. Practices pay clinician rates only.",
  },
  {
    icon: Brain,
    title: "AI-Powered Shift Matching",
    desc: "Smart matching uses real-time availability and location data to notify only clinicians who can realistically cover the shift, reducing cancellations and improving reliability.",
  },
];

const pilotBenefits = [
  "Temporary staffing at clinician rates only",
  "Permanent recruitment with no agency fees",
  "Automated sourcing, compliance, and re-booking",
  "Access to a national clinical workforce bank",
  "Participation in a 12-month fully subsidised Primary Care Workforce Trial",
  "A limited upfront research grant (availability restricted)",
];

const getStartedBenefits = [
  "Fill shifts faster",
  "Reduce admin and agency reliance",
  "Access a national bank of compliance-ready clinicians",
  "Improve continuity, predictability, and cost control",
];

const PrimaryCare = () => {
  const { t } = useRegionText();
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-foreground">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${primaryCareHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/70 to-foreground" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="max-w-4xl">
            <p className="mb-8 text-sm font-semibold uppercase tracking-[0.3em] text-[#0CE3FF]">
              Primary Care
            </p>
            <h1 className="text-5xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-7xl lg:text-8xl">
              Smarter staffing for{" "}
              <span className="text-[#0075FF]">primary care</span>
            </h1>
            <motion.p
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="mt-10 max-w-2xl text-xl leading-relaxed text-primary-foreground/60 md:text-2xl"
            >
              Flexzo Primary Care connects GP practices and PCNs directly with verified clinicians
              for temporary cover and permanent roles, without agency fees or unnecessary admin.
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

      {/* ── ZERO FEES STATEMENT ── */}
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
              <span className="text-[#0075FF]">Zero Fees.</span> Now & Forever.
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-muted-foreground md:text-2xl">
              Direct access to clinical talent without agency margins, placement fees, or lock-ins.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── BUILT FOR PRIMARY CARE ── */}
      <section className="pb-32 lg:pb-44">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
                Built for primary care
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                Connect directly with verified GPs, ANPs, practice nurses and AHPs
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Reducing costs, automating compliance, and supporting continuity of care.
              </p>
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
              className="aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <img src={primaryCarePractice} alt="GP practice" className="h-full w-full object-cover" />
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
            className="mb-16 max-w-3xl"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">
              Workforce Management, Simplified
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Flexzo AI puts primary care teams{" "}
              <span className="text-[#0075FF]">in control</span>
            </h2>
          </motion.div>

          <div className="grid gap-px overflow-hidden rounded-2xl border border-primary-foreground/10 bg-primary-foreground/5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group border border-primary-foreground/5 bg-foreground p-10 transition-colors hover:bg-primary-foreground/5"
              >
                <f.icon className="mb-6 h-8 w-8 text-[#0075FF] transition-transform group-hover:scale-110" />
                <h3 className="mb-3 text-xl font-semibold text-primary-foreground">
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed text-primary-foreground/50">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NATIONAL CLINICAL BANK ── */}
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
                National Reach
              </p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                Access a National Clinical Bank
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
                Flexzo Primary Care gives practices direct access to clinicians across the UK —
                GPs, ANPs, Practice Nurses, and AHPs — expanding reach without increasing spend.
              </p>
              <p className="font-medium text-foreground">
                If Flexzo can supply, you access candidates you may not otherwise reach.
                <br />
                If it can't, your existing supply chain continues uninterrupted.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── DITCH THE AGENCY ── */}
      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)"
        }} />
        <div className="relative z-10 mx-auto max-w-5xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <h2 className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Ditch the{" "}
              <span className="text-[#0075FF]">Agency Hassle</span>
            </h2>
            <p className="mt-8 max-w-3xl text-xl leading-relaxed text-primary-foreground/60">
              Tired of juggling multiple agencies, emails, and duplicated admin? Flexzo replaces
              fragmented processes with one collaborative platform — giving practices control over
              staffing, compliance, and re-engagement of trusted clinicians.
            </p>
            <div className="mt-12">
              <RegionLink
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── PILOT PROGRAMME ── */}
      <section className="py-32 lg:py-44">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeUp}
            >
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">
                Pilot Programme
              </p>
              <h2 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">
                One Platform.
                <br />
                A Smarter Workforce Model.
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
                Flexzo Primary Care supports practices exploring a margin-free workforce approach
                through a low-risk, fully subsidised pilot.
              </p>
              <div className="mt-10">
                <RegionLink
                  href="/book-demo"
                  className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
                >
                  Book a Demo
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </RegionLink>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              custom={1}
              variants={fadeUp}
            >
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Participating practices receive
              </p>
              <ul className="space-y-5">
                {pilotBenefits.map((item, i) => (
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

      {/* ── GET STARTED CTA ── */}
      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <Sparkles className="mx-auto mb-6 h-10 w-10 text-[#0075FF]" />
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Ready to <span className="text-[#0075FF]">Get Started</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">
              Join forward-thinking GP practices shaping the future of primary care workforce models.
            </p>

            <ul className="mx-auto mt-10 flex max-w-lg flex-col gap-4 text-left">
              {getStartedBenefits.map((item, i) => (
                <motion.li
                  key={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[#0075FF]" />
                  <span className="text-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>

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

export default PrimaryCare;
