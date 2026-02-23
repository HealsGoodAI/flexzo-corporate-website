import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Upload, X, FileText, AlertCircle } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getJobsByRegion } from "@/data/jobs";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";
import { sendApplicationEmails } from "@/lib/emailService";

const JobApplication = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { region, regionPath } = useRegion();
  const { t } = useRegionText();
  const jobs = getJobsByRegion(region);
  const job = jobs.find((j) => j.id === id);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [agreeShareProfile, setAgreeShareProfile] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({ ...prev, cv: "Please upload a PDF or Word document" }));
        return;
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrors((prev) => ({ ...prev, cv: "File must be under 10MB" }));
        return;
      }
      setCvFile(file);
      setErrors((prev) => {
        const { cv, ...rest } = prev;
        return rest;
      });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.firstName.trim()) errs.firstName = "First name is required";
    if (!form.lastName.trim()) errs.lastName = "Last name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!cvFile) errs.cv = "Please upload your CV/resume";
    if (!agreeTerms) errs.terms = "You must agree to the terms and conditions";
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      await sendApplicationEmails({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        jobTitle: job!.title,
        jobId: id!,
        cvFile: cvFile!,
      });
      navigate(regionPath(`/jobs/${id}/apply/success`), { state: { jobTitle: job?.title } });
    } catch {
      setErrors((prev) => ({
        ...prev,
        submit: "Something went wrong submitting your application. Please try again or email us at applications@flexzo.ai",
      }));
      setSubmitting(false);
    }
  };

  if (!job) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex min-h-[60vh] items-center justify-center pt-24">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground">{t("Job not found")}</h1>
            <Link to={regionPath("/jobs")} className="inline-flex items-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white">
              <ArrowLeft size={16} /> {t("Back to Jobs")}
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

      <section className="border-b border-border bg-muted pt-32 pb-10">
        <div className="mx-auto max-w-2xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Link to={regionPath(`/jobs/${id}`)} className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-[#0075FF]">
              <ArrowLeft size={14} /> {t("Back to job details")}
            </Link>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-[#0075FF]">{t("Apply Now")}</p>
            <h1 className="mb-2 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              {job.title}
            </h1>
            <p className="text-base text-muted-foreground">{job.organisation} · {job.location}</p>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-2xl px-6">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onSubmit={handleSubmit}
            className="space-y-8"
          >
            {/* Name fields */}
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("First name")} <span className="text-[#0075FF]">*</span>
                </label>
                <input
                  type="text"
                  value={form.firstName}
                  onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-foreground bg-background outline-none transition-colors placeholder:text-muted-foreground focus:border-[#0075FF] focus:ring-1 focus:ring-[#0075FF] ${errors.firstName ? "border-red-400" : "border-border"}`}
                  placeholder="John"
                />
                {errors.firstName && <p className="mt-1.5 text-xs text-red-500">{errors.firstName}</p>}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-foreground">
                  {t("Last name")} <span className="text-[#0075FF]">*</span>
                </label>
                <input
                  type="text"
                  value={form.lastName}
                  onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                  className={`w-full rounded-lg border px-4 py-3 text-sm text-foreground bg-background outline-none transition-colors placeholder:text-muted-foreground focus:border-[#0075FF] focus:ring-1 focus:ring-[#0075FF] ${errors.lastName ? "border-red-400" : "border-border"}`}
                  placeholder="Smith"
                />
                {errors.lastName && <p className="mt-1.5 text-xs text-red-500">{errors.lastName}</p>}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                {t("Email address")} <span className="text-[#0075FF]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={`w-full rounded-lg border px-4 py-3 text-sm text-foreground bg-background outline-none transition-colors placeholder:text-muted-foreground focus:border-[#0075FF] focus:ring-1 focus:ring-[#0075FF] ${errors.email ? "border-red-400" : "border-border"}`}
                placeholder="john.smith@example.com"
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* CV Upload */}
            <div>
              <label className="mb-2 block text-sm font-medium text-foreground">
                {t("CV / Resume")} <span className="text-[#0075FF]">*</span>
              </label>
              {cvFile ? (
                <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/50 px-4 py-3">
                  <FileText className="h-5 w-5 shrink-0 text-[#0075FF]" />
                  <span className="flex-1 truncate text-sm text-foreground">{cvFile.name}</span>
                  <button
                    type="button"
                    onClick={() => setCvFile(null)}
                    className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className={`flex cursor-pointer flex-col items-center gap-3 rounded-lg border-2 border-dashed px-6 py-8 transition-colors hover:border-[#0075FF]/40 hover:bg-muted/30 ${errors.cv ? "border-red-400" : "border-border"}`}>
                  <Upload className="h-8 w-8 text-muted-foreground" />
                  <div className="text-center">
                    <p className="text-sm font-medium text-foreground">{t("Click to upload your CV")}</p>
                    <p className="mt-1 text-xs text-muted-foreground">{t("PDF or Word document, max 10MB")}</p>
                  </div>
                  <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} className="hidden" />
                </label>
              )}
              {errors.cv && <p className="mt-1.5 text-xs text-red-500">{errors.cv}</p>}
            </div>

            {/* Terms checkbox */}
            <div className="space-y-4">
              <label className={`flex cursor-pointer gap-3 ${errors.terms ? "text-red-500" : ""}`}>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[#0075FF]"
                />
                <span className="text-sm text-muted-foreground">
                  {t("I agree to the")}{" "}
                  <Link to={regionPath("/terms-and-conditions")} target="_blank" className="text-[#0075FF] underline hover:text-[#0060D0]">
                    {t("Terms and Conditions")}
                  </Link>{" "}
                  <span className="text-[#0075FF]">*</span>
                </span>
              </label>
              {errors.terms && <p className="-mt-2 ml-7 text-xs text-red-500">{errors.terms}</p>}

              <label className="flex cursor-pointer gap-3">
                <input
                  type="checkbox"
                  checked={agreeShareProfile}
                  onChange={(e) => setAgreeShareProfile(e.target.checked)}
                  className="mt-0.5 h-4 w-4 shrink-0 rounded border-border accent-[#0075FF]"
                />
                <span className="text-sm text-muted-foreground">
                  {t("I agree to share my profile with Hospitals & Trusts who are employers on the Flexzo platform")}
                </span>
              </label>
            </div>

            {errors.submit && (
              <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground transition-all hover:bg-[#0075FF] hover:text-white disabled:opacity-60"
            >
              {submitting ? t("Submitting…") : t("Submit Application")}
              {!submitting && <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />}
            </button>
          </motion.form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobApplication;
