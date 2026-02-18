import { motion } from "framer-motion";
import { Zap, MapPin, Clock, Building2, ArrowRight } from "lucide-react";
import candidateStephanie from "@/assets/candidate-stephanie.png";
import candidateJeremy from "@/assets/candidate-jeremy.png";
import candidateKevin from "@/assets/candidate-kevin.png";
import candidateMcPatrick from "@/assets/candidate-mcpatrick.png";

const candidates = [
  { img: candidateStephanie, delay: 0 },
  { img: candidateJeremy, delay: 0.4 },
  { img: candidateKevin, delay: 0.8 },
  { img: candidateMcPatrick, delay: 1.2 },
];

const jobs = [
  {
    title: "ENT Consultant",
    location: "St Thomas' Hospital, London",
    shift: "Mon 08:00 – 18:00",
    band: "Band 8a",
    urgent: true,
  },
  {
    title: "Nurse Practitioner",
    location: "Royal Free Hospital, London",
    shift: "Tue 07:00 – 19:00",
    band: "Band 6",
    urgent: false,
  },
  {
    title: "Physician Associate",
    location: "Manchester Royal Infirmary",
    shift: "Wed 09:00 – 21:00",
    band: "Band 7",
    urgent: true,
  },
  {
    title: "Primary Care Physician",
    location: "Leeds General Infirmary",
    shift: "Thu 08:00 – 16:00",
    band: "Band 8b",
    urgent: false,
  },
];

const MatchingSection = () => {
  return (
    <section id="staff-bank" className="relative overflow-hidden py-32 bg-surface">
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="mb-4 inline-block text-xs font-medium uppercase tracking-widest text-muted-foreground">
            AI-Powered Matching
          </span>
          <h2 className="font-display text-4xl font-bold text-foreground md:text-5xl">
            Watch our agents
            <br />
            <span className="text-muted-foreground">match in real-time</span>
          </h2>
        </motion.div>

        {/* Matching visualization */}
        <div className="grid items-center gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Candidates column */}
          <div className="flex flex-col gap-4">
            {candidates.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: c.delay,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    delay: c.delay * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-shadow hover:shadow-lg"
                >
                  <img
                    src={c.img}
                    alt="Healthcare candidate"
                    className="h-auto w-full"
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Center connector */}
          <div className="hidden flex-col items-center gap-3 lg:flex">
            {candidates.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: c.delay + 0.5, duration: 0.4 }}
                className="flex items-center gap-2"
              >
                {/* Animated connection line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ delay: c.delay + 0.6, duration: 0.5 }}
                  className="h-px bg-gradient-to-r from-border to-accent/50"
                />

                {/* Pulse dot */}
                <motion.div
                  animate={{
                    scale: [1, 1.4, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: c.delay,
                    repeat: Infinity,
                  }}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20"
                >
                  <Zap size={16} />
                </motion.div>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 60 }}
                  viewport={{ once: true }}
                  transition={{ delay: c.delay + 0.8, duration: 0.5 }}
                  className="h-px bg-gradient-to-r from-accent/50 to-border"
                />
              </motion.div>
            ))}
          </div>

          {/* Jobs column */}
          <div className="flex flex-col gap-4">
            {jobs.map((job, i) => (
              <motion.div
                key={job.title}
                initial={{ opacity: 0, x: 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: candidates[i].delay + 0.3,
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 3,
                    delay: candidates[i].delay * 2 + 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="group rounded-2xl border border-border bg-background p-6 shadow-sm transition-all hover:shadow-lg"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h4 className="font-display text-base font-semibold text-foreground">
                      {job.title}
                    </h4>
                    {job.urgent && (
                      <span className="rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                        Urgent
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Building2 size={14} className="shrink-0" />
                      <span>{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={14} className="shrink-0" />
                      <span>{job.shift}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="shrink-0" />
                      <span>{job.band}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-1 text-xs font-medium text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View match details <ArrowRight size={12} />
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile connector indicator */}
        <div className="mt-8 flex items-center justify-center gap-2 lg:hidden">
          <motion.div
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-lg shadow-accent/20"
          >
            <Zap size={16} />
          </motion.div>
          <span className="text-sm font-medium text-muted-foreground">
            AI matching candidates to shifts
          </span>
        </div>
      </div>
    </section>
  );
};

export default MatchingSection;
