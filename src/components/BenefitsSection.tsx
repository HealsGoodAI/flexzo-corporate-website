import { motion } from "framer-motion";
import { TrendingDown, Zap, ShieldCheck, Users, BarChart3 } from "lucide-react";
import { useRegionText } from "@/lib/regionalize";
import ScrollReveal from "./ScrollReveal";

const benefits = [
  {
    icon: TrendingDown,
    title: "Lower Agency Spend",
    description:
      "Lower agency spend through higher internal fill rates and smarter prioritisation of bank staff.",
  },
  {
    icon: Zap,
    title: "Faster Time-to-Hire",
    description:
      "Faster time-to-hire and shift fill via automated candidate flows and AI prioritised allocations.",
  },
  {
    icon: ShieldCheck,
    title: "Improved Compliance",
    description:
      "Improved compliance and roster accuracy using clinical rule enforcement and credential verification.",
  },
  {
    icon: Users,
    title: "Better Engagement",
    description:
      "Better workforce engagement and retention from mobile-first experiences, transparent allocation and targeted communications.",
  },
  {
    icon: BarChart3,
    title: "Predictable Costs",
    description:
      "Predictable workforce costs and operational resilience as forecasting and collaborative banks reduce variability and peak exposure.",
  },
];

const BenefitsSection = () => {
  const { t } = useRegionText();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
         <ScrollReveal animation="split" className="mb-16 max-w-2xl">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("Why teams choose")} <span className="text-[#0075FF]">Flexzo</span>
          </h2>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex gap-4 rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0075FF]/10">
                <benefit.icon className="h-5 w-5 text-[#0075FF]" />
              </div>
              <div>
                <h3 className="mb-2 font-display text-base font-semibold text-foreground">
                  {t(benefit.title)}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {t(benefit.description)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
