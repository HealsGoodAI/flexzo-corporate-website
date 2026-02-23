import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Eye, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { testEmailTemplates, type TestEmailResult } from "@/lib/emailService";
import { useRegion } from "@/hooks/useRegion";

const EmailTemplateTest = () => {
  const { regionPath } = useRegion();
  const [form, setForm] = useState({
    firstName: "Jane",
    lastName: "Doe",
    email: "jane.doe@example.com",
    jobTitle: "Registered Nurse – Diabetes Specialist",
    jobLink: `${window.location.origin}/uk/jobs/diabetes-specialist-nurse`,
  });
  const [result, setResult] = useState<TestEmailResult | null>(null);
  const [activeTab, setActiveTab] = useState<"applicant" | "lead">("applicant");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePreview = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await testEmailTemplates(form);
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate preview");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="border-b border-border bg-muted pt-32 pb-10">
        <div className="mx-auto max-w-4xl px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
              Internal Tool
            </p>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Email Template Verifier
            </h1>
            <p className="text-base text-muted-foreground">
              Preview and verify both candidate and internal lead email templates with test data.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-10">
        <div className="mx-auto max-w-4xl px-6">
          <div className="grid gap-8 lg:grid-cols-[320px_1fr]">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Test Data
              </h2>
              {[
                { key: "firstName", label: "First Name" },
                { key: "lastName", label: "Last Name" },
                { key: "email", label: "Email" },
                { key: "jobTitle", label: "Job Title" },
                { key: "jobLink", label: "Job Link" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="mb-1 block text-xs font-medium text-muted-foreground">
                    {label}
                  </label>
                  <input
                    type="text"
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                    className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus:border-accent"
                  />
                </div>
              ))}

              <button
                onClick={handlePreview}
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {loading ? "Generating…" : "Preview Templates"}
              </button>

              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  <AlertCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  {error}
                </div>
              )}

              {result && (
                <div className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-xs text-green-700 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
                  <CheckCircle className="h-3.5 w-3.5 mt-0.5 shrink-0" />
                  Templates rendered successfully
                </div>
              )}
            </motion.div>

            {/* Preview */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="min-h-[500px]"
            >
              {result ? (
                <>
                  {/* Tab bar */}
                  <div className="mb-4 flex gap-1 rounded-lg border border-border bg-muted p-1">
                    {(["applicant", "lead"] as const).map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                          activeTab === tab
                            ? "bg-background text-foreground shadow-sm"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-2">
                          {tab === "applicant" ? (
                            <Send className="h-3.5 w-3.5" />
                          ) : (
                            <Mail className="h-3.5 w-3.5" />
                          )}
                          {tab === "applicant" ? "Candidate Email" : "Lead Email (Sales)"}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Subject line */}
                  <div className="mb-3 rounded-lg border border-border bg-muted/50 px-4 py-2">
                    <span className="text-xs font-medium text-muted-foreground">Subject: </span>
                    <span className="text-xs text-foreground">
                      {activeTab === "applicant" ? result.applicantSubject : result.leadSubject}
                    </span>
                  </div>

                  {/* Rendered email */}
                  <div className="overflow-hidden rounded-xl border border-border shadow-sm">
                    <iframe
                      srcDoc={activeTab === "applicant" ? result.applicantEmailHtml : result.leadEmailHtml}
                      title={`${activeTab} email preview`}
                      className="h-[700px] w-full border-0 bg-white"
                      sandbox="allow-same-origin"
                    />
                  </div>
                </>
              ) : (
                <div className="flex h-full items-center justify-center rounded-xl border border-dashed border-border bg-muted/30 p-12">
                  <div className="text-center">
                    <Mail className="mx-auto mb-3 h-10 w-10 text-muted-foreground/40" />
                    <p className="text-sm font-medium text-muted-foreground">
                      Click "Preview Templates" to render both email templates
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EmailTemplateTest;
