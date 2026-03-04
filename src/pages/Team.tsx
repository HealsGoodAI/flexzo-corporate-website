import { motion } from "framer-motion";
import teamJackHenderson from "@/assets/team-jack-henderson.jpg";
import teamSeanMcmanus from "@/assets/team-sean-mcmanus.jpg";
import teamCharlieMeek from "@/assets/team-charlie-meek.jpg";
import teamMattPool from "@/assets/team-matt-pool.jpg";
import teamBradleyPirie from "@/assets/team-bradley-pirie.jpg";
import teamAliyaIrgaleeva from "@/assets/team-aliya-irgaleeva.jpg";
import teamCharandasSingh from "@/assets/team-charandas-singh.jpg";
import teamJackOconnell from "@/assets/team-jack-oconnell.jpg";
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
  bio: string;
  linkedin?: string;
  image?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Jack Henderson",
    role: "Chief Executive Officer",
    bio: "Serial entrepreneur with a proven track record in healthcare innovation. Founded KPI Health, scaling it from £0 to over £20m in revenue. Deep expertise in NHS operations, RTT performance, and healthcare staffing.",
    linkedin: "https://www.linkedin.com/in/jack-henderson-18a78b173/",
    image: teamJackHenderson,
  },
  {
    name: "Sean McManus",
    role: "Chief of Staff",
    bio: "Experienced sales leader with a strong background in healthcare recruitment. Previously held senior roles at Medical-Locums Group, specialising in sales strategy, revenue growth, and building high-performing teams.",
    linkedin: "https://www.linkedin.com/in/smmcmanus/",
    image: teamSeanMcmanus,
  },
  {
    name: "Charlie Meek",
    role: "Head of Brand Marketing & Experience Design",
    bio: "Growth-focused product and marketing leader driving Flexzo's global brand, marketing, and UX strategy. Deep expertise in growth marketing and brand development within the AI recruit-tech space.",
    linkedin: "https://www.linkedin.com/in/charlie-meek-8821636/",
    image: teamCharlieMeek,
  },
  {
    name: "Bradley Pirie",
    role: "Chief Technology Officer",
    bio: "Leading technology strategy, platform architecture, and engineering delivery across AI-driven healthcare solutions. Deep expertise in distributed systems, cloud infrastructure, and product-focused engineering.",
    linkedin: "https://www.linkedin.com/in/bradley-pirie-7b9787151/",
    image: teamBradleyPirie,
  },
  {
    name: "Aliya Irgaleeva",
    role: "Head of AI",
    bio: "AI and machine learning specialist with a background in biophysics. Extensive experience leading technology initiatives across startups and government projects, specialising in scalable AI systems for healthcare.",
    linkedin: "https://www.linkedin.com/in/aliya-irgaleeva-594098209/",
    image: teamAliyaIrgaleeva,
  },
  {
    name: "Matt Pool",
    role: "Director of Strategic Partnerships",
    bio: "Works with NHS leaders to redesign temporary workforce models. Over a decade in healthcare staffing and frontline recruitment operations, partnering with organisations to move towards AI-driven workforce models.",
    linkedin: "https://www.linkedin.com/in/matthew-pool-848a0147/",
    image: teamMattPool,
  },
  {
    name: "Charandas Singh",
    role: "Senior Product Manager",
    bio: "A proven product leader steering Flexzo's product strategy with a relentless focus on customers and commercial outcomes. Unites people, technology, and priorities to accelerate growth and deliver sustained value. Combining strong strategic vision with active execution, ensuring shared clarity and momentum — taking products from initial concept through to successful adoption and impact.",
    linkedin: "https://www.linkedin.com/in/charandas-singh/",
    image: teamCharandasSingh,
  },
  {
    name: "Jack O'Connell",
    role: "Resourcing & Client Delivery Manager",
    bio: "A highly experienced healthcare recruiter with a strong understanding of both client and candidate needs. Builds long-term relationships through clear communication, market insight, and a consultative approach. With a deep grasp of the end-to-end recruitment process, he consistently keeps quality and outcomes at the forefront for all parties.",
    linkedin: "https://www.linkedin.com/in/jack-o-connell-50592524/",
    image: teamJackOconnell,
  },
];

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

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {teamMembers.map((member, i) => (
              <motion.div
                key={`${member.role}-${i}`}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={i}
                variants={fadeUp}
                className="group rounded-2xl border border-border bg-background p-6 transition-all hover:border-[#0075FF]/30 hover:shadow-lg hover:shadow-[#0075FF]/5"
              >
                <div className="mb-5 flex flex-col items-center text-center">
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-foreground">
                    {member.image ? (
                      <img
                        src={member.image}
                        alt={member.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className={`flex h-full w-full items-center justify-center ${avatarColors[i % avatarColors.length]}`}>
                        <span className="text-xl font-bold text-white/80">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </span>
                      </div>
                    )}
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-foreground">
                    {member.name}
                  </h3>
                  <p className="mt-0.5 text-sm font-medium text-[#0075FF]">
                    {member.role}
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground text-center">
                  {member.bio}
                </p>
                {member.linkedin && (
                  <div className="mt-5 pt-5 border-t border-border flex justify-center">
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0075FF] text-white transition-all hover:bg-[#0060D0]"
                      aria-label={`${member.name} on LinkedIn`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                  </div>
                )}
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
