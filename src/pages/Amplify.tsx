import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegionText } from "@/lib/regionalize";
import RegionLink from "@/components/RegionLink";
import amplifyPartners from "@/assets/amplify-partners.png";
import amplifyStep1 from "@/assets/amplify-step-1.jpg";
import amplifyStep2 from "@/assets/amplify-step-2.jpg";
import amplifyStep3 from "@/assets/amplify-step-3.jpg";
import amplifyStep4 from "@/assets/amplify-step-4.jpg";
import {
  Megaphone,
  Radio,
  Gift,
  BrainCircuit,
  Link2,
  BarChart3,
  TrendingUp,
  Users,
  Globe,
  Eye,
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
  { icon: Radio, title: "Omnichannel Campaign Engine", description: "Sequence messages across push, SMS, email, voice and in-app channels with A/B testing and campaign templates." },
  { icon: Gift, title: "Incentive Orchestration & Governance", description: "Configurable monetary and non-monetary rewards tied to outcomes, with audit trails and fairness/rotation rules." },
  { icon: BrainCircuit, title: "Behavioural Segmentation & Predictive Models", description: "Identify high-value cohorts, predict responsiveness and flag at-risk staff for retention interventions." },
  { icon: Link2, title: "Closed-Loop Integrations", description: "Bi-directional APIs to Candidate Portal, Mobile App, Staff Bank, E-Rostering and payroll for campaign → roster → pay reconciliation." },
  { icon: BarChart3, title: "ROI & Operational Analytics", description: "Campaign attribution, uplift measurement, incentive ROI calculators and dashboards that tie engagement to agency replacement and cost savings." },
];

const benefits = [
  { icon: TrendingUp, title: "Self-Sustaining Talent Network", description: "Builds a growing database of candidates over time, reducing future sourcing effort." },
  { icon: Users, title: "Reduced Agency Dependency", description: "Internal activation and direct sourcing replace premium external supply." },
  { icon: Globe, title: "Expanded Candidate Reach", description: "Campaigns extend into new regions and specialties for hard-to-fill roles." },
  { icon: Eye, title: "Continuous Visibility", description: "Hard-to-fill roles maintain active presence across trusted job engines and aggregators." },
  { icon: Megaphone, title: "Transparent ROI", description: "Engagement spend converts into predictable operational capacity with measurable outcomes." },
];

const stats = [
  { value: "5x", label: "Wider candidate reach" },
  { value: "40%", label: "Lower cost-per-hire" },
  { value: "24/7", label: "Always-on campaigns" },
  { value: "100%", label: "Auditable incentives" },
];

const Amplify = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, hsl(210 100% 45% / 0.4) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}>
              <p className="mb-6 text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("Amplify")}</p>
              <h1 className="text-5xl font-bold leading-[1.05] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl">
                {t("Activate talent,")}<br /><span className="text-[#0075FF]">{t("amplify reach")}</span>
              </h1>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-primary-foreground/60">
                {t("When a role has limited or no matching clinicians, Amplify cascades it into optimised vacancy campaigns across high-performing external sources — attracting fresh candidates directly into your database.")}
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <RegionLink href="/book-demo" className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]">
                  {t("Book a Demo")} <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </RegionLink>
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
              <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">{t("Overview")}</p>
              <h2 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl">{t("Behavioural science")}<br />{t("meets measurable coverage")}</h2>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={1} variants={fadeUp} className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>{t("Flexzo Amplify turns behavioural science into measurable coverage: omnichannel nudges, incentive orchestration and predictive analytics that increase internal activation, reduce agency dependence and deliver transparent ROI.")}</p>
              <p>{t("The platform automatically identifies jobs with no matching candidates and sends them to the advertising engine for external promotion. Campaigns are optimised for reach and cost-per-application across trusted job engines, aggregators and media channels.")}</p>
              <p>{t("New candidates flow directly back into your CRM, growing your database and improving future matching accuracy. Integrated, auditable and governed for healthcare.")}</p>
            </motion.div>
          </div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={2} variants={fadeUp} className="mt-16">
            <img src={amplifyPartners} alt="Amplify partner platforms including Google Ads, Meta, LinkedIn Ads, TikTok Ads, Monster, ZipRecruiter, Reed, Adzuna, Joblift, Heyjobs and JobGet" className="w-full" />
          </motion.div>
        </div>
      </section>

      <section className="bg-foreground py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0CE3FF]">{t("Capabilities")}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl">{t("Features")}</h2>
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
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("From gap to candidate")}</h2>
          </motion.div>
          <div className="space-y-24">
            {[
              { step: "01", title: "Identify Gaps", text: "The platform automatically identifies jobs with no matching candidates in your existing database, flagging roles that need external sourcing.", img: amplifyStep1 },
              { step: "02", title: "Launch Campaigns", text: "Roles are sent to the advertising engine for external promotion. Campaigns are optimised for reach and cost-per-application across trusted job engines, aggregators and media channels.", img: amplifyStep2 },
              { step: "03", title: "Attract & Capture", text: "New candidates flow directly back into your CRM, growing your database and improving future matching accuracy. Omnichannel nudges keep candidates engaged.", img: amplifyStep3 },
              { step: "04", title: "Measure & Optimise", text: "Campaign attribution, uplift measurement and incentive ROI calculators tie engagement spend to agency replacement and cost savings. Continuous optimisation improves results over time.", img: amplifyStep4 },
            ].map((item, i) => (
              <motion.div key={item.step} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} custom={0} variants={fadeUp} className={`grid items-center gap-12 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}>
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="mb-4 flex items-center gap-4"><span className="text-6xl font-bold text-[#0075FF]/20 md:text-7xl">{item.step}</span></div>
                  <h3 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">{t(item.title)}</h3>
                  <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{t(item.text)}</p>
                </div>
                <div className={`aspect-[4/3] overflow-hidden rounded-2xl ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <img src={item.img} alt={item.title} className="h-full w-full object-cover" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-28 lg:py-36">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp} className="mb-16">
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#0075FF]">{t("Why Amplify")}</p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Benefits")}</h2>
          </motion.div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, i) => (
              <motion.div key={benefit.title} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i} variants={fadeUp} className="group rounded-2xl border border-border bg-background p-10 transition-all hover:border-[#0075FF]/20 hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-[#0075FF]/10 transition-colors group-hover:bg-[#0075FF]/20"><benefit.icon className="h-7 w-7 text-[#0075FF]" /></div>
                <h3 className="mb-3 text-xl font-semibold text-foreground">{t(benefit.title)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(benefit.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-foreground py-32 lg:py-40">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)" }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.p initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }} className="text-4xl font-bold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {t("Convert engagement spend into")} <span className="text-[#0075FF]">{t("predictable operational capacity")}</span>.
          </motion.p>
        </div>
      </section>

      <section className="py-28 lg:py-36">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
            <h2 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Ready to")} <span className="text-[#0075FF]">{t("amplify")}</span> {t("your reach?")}</h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground">{t("Book a demo and discover how Amplify can build your talent network and reduce agency dependency.")}</p>
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

export default Amplify;
