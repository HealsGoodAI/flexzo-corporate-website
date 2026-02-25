import { motion } from "framer-motion";
import { Zap, Shield, Users, Brain, Clock, Globe } from "lucide-react";
import { useRegionText } from "@/lib/regionalize";
import ScrollReveal from "./ScrollReveal";

const features = [
  {
    icon: Zap,
    title: "Instant Access to Clinicians",
    desc: "Access a nationwide clinical bank of pre-vetted, compliance-ready clinicians available for temporary or permanent roles.",
  },
  {
    icon: Brain,
    title: "AI-Powered Shift Matching",
    desc: "Smart matching uses real-time availability and location data to notify clinicians who can realistically cover the shift.",
  },
  {
    icon: Shield,
    title: "Effortless Compliance",
    desc: "Automated background checks, registration validation, work authorisation, and ongoing compliance tracking.",
  },
  {
    icon: Clock,
    title: "Seamless Workforce Planning",
    desc: "From last-minute cover to longer-term gaps, match the right clinician to the right shift in real time.",
  },
  {
    icon: Users,
    title: "Zero Fees. Full Transparency.",
    desc: "No agency margins. No permanent placement fees. No hidden costs. Practices pay clinician rates only.",
  },
  {
    icon: Globe,
    title: "Global Healthcare Talent",
    desc: "Connect hospitals and healthcare settings to a worldwide network of verified healthcare professionals.",
  },
];

const FeaturesSection = () => {
  const { t } = useRegionText();

  return (
    <section id="features" className="relative py-32">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal animation="fade-left" className="mb-16">
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {t("Workforce Management, Simplified")}
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            {t("Flexzo AI puts your team")}
            <br />
            <span className="text-[#0075FF]">{t("in control")}</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-px bg-border md:grid-cols-2 lg:grid-cols-3 rounded-2xl overflow-hidden border border-border">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-background p-10 transition-colors hover:bg-surface"
            >
              <div className="mb-6 inline-flex rounded-xl bg-surface p-3 text-foreground transition-all group-hover:bg-accent group-hover:text-accent-foreground">
                <f.icon size={22} strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 font-display text-lg font-semibold text-foreground">
                {t(f.title)}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {t(f.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
