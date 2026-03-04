import { motion } from "framer-motion";
import { Users, Heart, Lightbulb, Shield, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegionLink from "@/components/RegionLink";
import { useRegionText } from "@/lib/regionalize";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const values = [
  {
    icon: Heart,
    title: "People First",
    description: "Every decision we make starts with the people who deliver care and those who receive it.",
  },
  {
    icon: Lightbulb,
    title: "Innovation With Purpose",
    description: "We build technology that solves real problems — not tech for tech's sake.",
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Open communication, honest pricing, and accountability at every level.",
  },
  {
    icon: Target,
    title: "Relentless Focus",
    description: "We obsess over outcomes that matter: better care, lower costs, happier professionals.",
  },
];

interface TeamMember {
  name: string;
  role: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  { name: "Team Member", role: "CEO & Co-Founder" },
  { name: "Team Member", role: "CTO & Co-Founder" },
  { name: "Team Member", role: "COO" },
  { name: "Team Member", role: "VP of Engineering" },
  { name: "Team Member", role: "Head of Product" },
  { name: "Team Member", role: "Head of Sales" },
  { name: "Team Member", role: "Head of Operations" },
  { name: "Team Member", role: "Head of Compliance" },
  { name: "Team Member", role: "Senior Software Engineer" },
  { name: "Team Member", role: "Senior Software Engineer" },
  { name: "Team Member", role: "Product Designer" },
  { name: "Team Member", role: "Account Manager" },
];

// Generate initials colour from index
const avatarColors = [
  "bg-[#0075FF]",
  "bg-[#0CE3FF]/80",
  "bg-[#0075FF]/70",
  "bg-[#0CE3FF]/60",
  "bg-[#0075FF]/60",
  "bg-[#0CE3FF]/70",
];

const Team = () => {
  const { t } = useRegionText();

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── */}
      <section className="relative flex min-h-[60vh] items-end overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-[0.06]" style={{
          backgroundImage: "radial-gradient(circle at 30% 50%, hsl(210 100% 45% / 0.4) 0%, transparent 50%), radial-gradient(circle at 80% 30%, hsl(190 100% 50% / 0.2) 0%, transparent 40%)"
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-20 pt-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <div className="mb-6 flex items-center gap-3">
              <Users className="h-5 w-5 text-[#0075FF]" />
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#0075FF]">
                Our Team
              </p>
            </div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl"
            >
              Industry experts who{" "}
              <span className="text-[#0075FF]">understand the journey</span>
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/50 md:text-xl"
            >
              {t("We're a team of healthcare professionals, engineers, and operators united by a single mission: transforming how healthcare staffing works.")}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#0075FF]">
              What Drives Us
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Our values shape every{" "}
              <span className="text-[#0075FF]">product we build</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className="group rounded-2xl border border-border bg-background p-8 transition-all hover:border-[#0075FF]/30 hover:shadow-lg hover:shadow-[#0075FF]/5"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0075FF]/10">
                    <Icon className="h-6 w-6 text-[#0075FF]" />
                  </div>
                  <h3 className="mb-3 text-lg font-bold text-foreground">
                    {value.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="bg-muted/30 py-24 lg:py-32">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="mb-16"
          >
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#0075FF]">
              Meet The Team
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              The people behind{" "}
              <span className="text-[#0075FF]">Flexzo</span>
            </h2>
          </motion.div>

          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamMembers.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group"
              >
                <div className="mb-5 aspect-[3/4] overflow-hidden rounded-2xl bg-foreground relative">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className={`flex h-full w-full items-center justify-center ${avatarColors[i % avatarColors.length]}`}>
                      <span className="text-5xl font-bold text-white/80">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </span>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-foreground">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative bg-foreground py-24 lg:py-32">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 70% 40%, hsl(210 100% 45% / 0.3) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold text-primary-foreground md:text-5xl">
              Want to join the{" "}
              <span className="text-[#0075FF]">team</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/50">
              {t("We're always looking for passionate people who want to make a difference in healthcare.")}
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <RegionLink
                href="/jobs"
                className="inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
              >
                View Open Roles
              </RegionLink>
              <RegionLink
                href="/contact"
                className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-primary-foreground/10"
              >
                Get in Touch
              </RegionLink>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;
