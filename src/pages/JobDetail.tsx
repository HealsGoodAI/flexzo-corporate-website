import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Clock, Building2, Briefcase, Calendar, ArrowLeft, ArrowRight, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const JobDetail = () => {
  const { id } = useParams<{ id: string }>();
  const job = jobs.find((j) => j.id === id);

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground">Job not found</h1>
            <p className="mb-8 text-muted-foreground">The job listing you're looking for doesn't exist or has been removed.</p>
            <Link to="/jobs" className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white">
              <ArrowLeft size={16} /> Back to Jobs
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Header */}
      <section className="border-b border-border bg-muted pt-32 pb-12">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link to="/jobs" className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#0075FF]">
              <ArrowLeft size={14} /> Back to all jobs
            </Link>
            <h1 className="mb-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {job.title}
            </h1>
            <p className="mb-6 text-lg text-muted-foreground">{job.organisation}</p>

            <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#0075FF]" /> {job.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Briefcase className="h-4 w-4 text-[#0075FF]" /> {job.salary}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-[#0075FF]" /> {job.workingPattern}
              </span>
              <span className="flex items-center gap-1.5">
                <Building2 className="h-4 w-4 text-[#0075FF]" /> {job.contractType}
              </span>
              {job.band && (
                <span className="flex items-center gap-1.5">
                  <Tag className="h-4 w-4 text-[#0075FF]" /> {job.band}
                </span>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Posted: {job.posted}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" /> Closing: {job.closing}
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div className="space-y-10">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                <h2 className="mb-4 text-xl font-bold text-foreground">About the role</h2>
                <p className="text-base leading-relaxed text-muted-foreground">{job.description}</p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp}>
                <h2 className="mb-4 text-xl font-bold text-foreground">Key responsibilities</h2>
                <ul className="space-y-3">
                  {job.responsibilities.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0075FF]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
                <h2 className="mb-4 text-xl font-bold text-foreground">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((r, i) => (
                    <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0075FF]" />
                      {r}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1} variants={fadeUp} className="rounded-xl border border-border bg-background p-6">
                <h3 className="mb-4 text-base font-bold text-foreground">Benefits</h3>
                <ul className="space-y-3">
                  {job.benefits.map((b, i) => (
                    <li key={i} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0075FF]" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} custom={2} variants={fadeUp}>
                <Link
                  to={`/jobs/${job.id}/apply`}
                  className="group flex w-full items-center justify-center gap-2 rounded-md bg-primary px-6 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white"
                >
                  Apply Now
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobDetail;
