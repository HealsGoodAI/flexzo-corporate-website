import { Link, useParams, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";

const JobApplicationSuccess = () => {
  const { id } = useParams<{ id: string }>();
  const { regionPath } = useRegion();
  const { t } = useRegionText();
  const location = useLocation();
  const jobTitle = (location.state as any)?.jobTitle || "this role";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center pt-24 pb-16">
        <div className="mx-auto max-w-lg px-6 text-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10">
              <CheckCircle className="h-10 w-10 text-accent" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="mb-3 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {t("Application submitted")}
            </h1>
            <p className="mb-2 text-base text-muted-foreground">
              {t("Your application for")} <span className="font-semibold text-foreground">{jobTitle}</span> {t("has been received.")}
            </p>
            <p className="mb-10 text-sm text-muted-foreground">
              {t("We'll review your details and be in touch shortly. Keep an eye on your inbox.")}
            </p>

            <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              {id && (
                <Link
                  to={regionPath(`/jobs/${id}`)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-muted"
                >
                  {t("View job details")}
                </Link>
              )}
              <Link
                to={regionPath("/jobs")}
                className="group inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-accent hover:text-accent-foreground"
              >
                {t("Browse more jobs")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplicationSuccess;
