import { useState, useMemo, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Search, MapPin, Briefcase, Clock, Building2, Smartphone, Shield, Zap, Globe, UserCheck, CalendarCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs } from "@/data/jobs";
import { useRegionText } from "@/lib/regionalize";

const whyFlexzo = [
  { icon: Smartphone, title: "Ditch the Agency Hassle", description: "No more juggling multiple agencies, endless phone calls, and constant paperwork. One intelligent platform replaces it all." },
  { icon: CalendarCheck, title: "You're in Control", description: "Update your availability via email, WhatsApp, or SMS. Choose when and where you work with full freedom over your workload." },
  { icon: Zap, title: "AI-Powered Matching", description: "Our smart AI system automatically matches your skills, role, and availability to the best shifts — no more missed opportunities." },
  { icon: Shield, title: "Compliance Made Easy", description: "From DBS checks to professional registration and occupational health — your credentials are managed and verified in one place." },
  { icon: Globe, title: "Nationwide Network", description: "Access opportunities across NHS Trusts and healthcare organisations throughout the UK, all through one streamlined platform." },
  { icon: UserCheck, title: "Built for Healthcare", description: "Flexzo is the only platform designed specifically for healthcare professionals. We understand the challenges you face every day." },
];

const Jobs = () => {
  const { t } = useRegionText();
  const [roleQuery, setRoleQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (roleQuery) params.set("role", roleQuery);
    if (locationQuery) params.set("location", locationQuery);
    navigate(`/jobs/search?${params.toString()}`);
  };

  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {
      const matchesRole = !roleQuery || job.title.toLowerCase().includes(roleQuery.toLowerCase()) || job.organisation.toLowerCase().includes(roleQuery.toLowerCase());
      const matchesLocation = !locationQuery || job.location.toLowerCase().includes(locationQuery.toLowerCase());
      return matchesRole && matchesLocation;
    });
  }, [roleQuery, locationQuery]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let animId: number;
    let speed = 0.5;
    const step = () => { if (!el) return; el.scrollLeft += speed; if (el.scrollLeft >= el.scrollWidth - el.clientWidth) { el.scrollLeft = 0; } animId = requestAnimationFrame(step); };
    animId = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(step); };
    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    return () => { cancelAnimationFrame(animId); el.removeEventListener("mouseenter", pause); el.removeEventListener("mouseleave", resume); };
  }, [filteredJobs]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-muted pt-32 pb-16">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">{t("Flexzo Jobs")}</p>
            <h1 className="mb-4 font-display text-4xl font-bold tracking-tight text-foreground md:text-5xl">{t("Find your next healthcare role")}</h1>
            <p className="mb-10 text-base text-muted-foreground">{t("Browse opportunities across NHS Trusts and healthcare organisations nationwide.")}</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="flex w-full flex-col overflow-hidden rounded-md border border-border bg-background shadow-sm sm:flex-row">
            <div className="flex flex-1 items-center gap-3 border-b border-border px-5 py-5 sm:border-b-0 sm:border-r">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input type="text" placeholder={t("Search by role or organisation")} value={roleQuery} onChange={(e) => setRoleQuery(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            </div>
            <div className="flex flex-1 items-center gap-3 px-5 py-5">
              <MapPin className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input type="text" placeholder={t("Region or city")} value={locationQuery} onChange={(e) => setLocationQuery(e.target.value)} className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            </div>
            <button onClick={handleSearch} className="rounded-md bg-primary px-8 py-5 font-display text-sm font-semibold text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground">{t("Search")}</button>
          </motion.div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex items-center justify-between">
            <p className="text-sm font-medium text-foreground"><span className="text-accent">{filteredJobs.length}</span> {filteredJobs.length === 1 ? t("role") : t("roles")} {t("available")}</p>
            <p className="text-xs text-muted-foreground">{t("Scroll or hover to browse")}</p>
          </div>
        </div>
        <div ref={scrollRef} className="flex gap-5 overflow-x-auto px-6 pb-4 scrollbar-hide" style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}>
          {filteredJobs.length === 0 ? (
            <div className="mx-auto rounded-xl border border-border bg-background px-6 py-16 text-center min-w-[300px]">
              <p className="text-base text-muted-foreground">{t("No jobs match your search. Try broadening your criteria.")}</p>
            </div>
          ) : (
            filteredJobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="shrink-0">
                <Link to={`/jobs/${job.id}`} className="group flex h-full w-[340px] flex-col justify-between rounded-xl border border-border bg-background p-6 transition-all hover:shadow-lg hover:border-accent/30">
                  <div>
                    <div className="mb-4 flex items-start justify-between gap-2">
                      <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">{job.contractType}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{t("Closes")} {job.closing}</span>
                    </div>
                    <h3 className="mb-1 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">{job.title}</h3>
                    <p className="mb-4 text-sm text-muted-foreground">{job.organisation}</p>
                  </div>
                  <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5 shrink-0" />{job.location}</span>
                    <span className="flex items-center gap-2"><Briefcase className="h-3.5 w-3.5 shrink-0" />{job.salary}</span>
                    <span className="flex items-center gap-2"><Clock className="h-3.5 w-3.5 shrink-0" />{job.workingPattern}</span>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>

      <section className="border-t border-border bg-muted py-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-6 text-center">
            <p className="mb-3 font-display text-sm font-semibold uppercase tracking-[0.2em] text-accent">{t("For Healthcare Professionals")}</p>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t("The future of healthcare staffing")}</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">
              {t("Flexzo AI's Collaborative Staff Bank connects you directly with hospitals across the UK. No agencies, no hassle — just one intelligent platform built for you.")}
            </p>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {whyFlexzo.map((item, i) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="group flex gap-4 rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-md">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/10"><item.icon className="h-5 w-5 text-accent" /></div>
                <div>
                  <h3 className="mb-2 font-display text-base font-semibold text-foreground">{t(item.title)}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{t(item.description)}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 text-center">
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">{t("How it works")}</h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground">{t("Getting started with Flexzo is simple. Sign up once, and our AI handles the rest.")}</p>
          </motion.div>
          <div className="grid gap-12 md:grid-cols-3">
            {[
              { step: "01", title: "Create Your Profile", description: "Sign up quickly using our step-by-step process. Upload your credentials once — the AI system handles everything else." },
              { step: "02", title: "Set Your Availability", description: "Update your desired shift availability via email, WhatsApp, or SMS. It only takes a few clicks." },
              { step: "03", title: "Get Matched & Confirmed", description: "When your skills match a shift, you'll be notified automatically. Accept or decline with full freedom — your placement is secured upon approval." },
            ].map((item, i) => (
              <motion.div key={item.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 font-display text-lg font-bold text-accent">{item.step}</div>
                <h3 className="mb-2 font-display text-lg font-semibold text-foreground">{t(item.title)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{t(item.description)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-primary py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="mb-4 font-display text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">{t("Ready to take control of your career?")}</h2>
            <p className="mb-8 text-base text-primary-foreground/70">{t("Join the Flexzo AI Collaborative Staff Bank and access opportunities nationwide.")}</p>
            <Link to="/book-demo" className="inline-block rounded-lg bg-accent px-8 py-3 font-display text-sm font-semibold text-accent-foreground transition-all hover:opacity-90">{t("Get Started")}</Link>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Jobs;
