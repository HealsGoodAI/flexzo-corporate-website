import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Briefcase, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { jobs } from "@/data/jobs";
import { useRegionText } from "@/lib/regionalize";

const FeaturedJobsSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { t } = useRegionText();

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let raf: number;
    let speed = 0.5;
    let paused = false;

    const step = () => {
      if (!paused && el) {
        el.scrollLeft += speed;
        if (el.scrollLeft >= el.scrollWidth - el.clientWidth) {
          el.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(step);
    };

    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    raf = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
    };
  }, []);

  return (
    <section className="py-24 bg-surface">
      <div className="mx-auto max-w-7xl px-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between"
        >
          <div>
            <span className="mb-3 inline-block text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {t("Featured Roles")}
            </span>
            <h2 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {t("Latest opportunities")}
            </h2>
          </div>
          <Link
            to="/jobs"
            className="hidden items-center gap-1 text-sm font-semibold text-accent transition-colors hover:text-accent/80 sm:flex"
          >
            {t("View all roles")} <ArrowRight size={14} />
          </Link>
        </motion.div>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto px-6 pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {[...jobs, ...jobs].map((job, i) => (
          <motion.div
            key={`${job.id}-${i}`}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: Math.min(i * 0.04, 0.4) }}
            className="shrink-0"
          >
            <Link
              to={`/jobs/${job.id}`}
              className="group flex h-full w-[320px] flex-col justify-between rounded-xl border border-border bg-background p-6 transition-all hover:shadow-lg hover:border-accent/30"
            >
              <div>
                <div className="mb-4 flex items-start justify-between gap-2">
                  <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {job.contractType}
                  </span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    Closes {job.closing}
                  </span>
                </div>
                <h3 className="mb-1 font-display text-base font-semibold text-foreground group-hover:text-accent transition-colors line-clamp-2">
                  {t(job.title)}
                </h3>
                <p className="mb-4 text-sm text-muted-foreground">
                  {t(job.organisation)}
                </p>
              </div>
              <div className="flex flex-col gap-2 border-t border-border pt-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  {job.location}
                </span>
                <span className="flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 shrink-0" />
                  {job.salary}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5 shrink-0" />
                  {job.workingPattern}
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 text-center sm:hidden">
        <Link
          to="/jobs"
          className="inline-flex items-center gap-1 text-sm font-semibold text-accent"
        >
          {t("View all roles")} <ArrowRight size={14} />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedJobsSection;
