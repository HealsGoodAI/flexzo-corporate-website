import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { useRegionText } from "@/lib/regionalize";

const BookDemo = () => {
  const { toast } = useToast();
  const { t } = useRegionText();
  const [form, setForm] = useState({ name: "", email: "", telephone: "", organisation: "", date: "", time: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      toast({ title: t("Thank you!"), description: t("Your demo request has been sent. We'll be in touch shortly.") });
      setForm({ name: "", email: "", telephone: "", organisation: "", date: "", time: "" });
      setSubmitting(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="bg-background pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="mb-4 text-4xl font-bold text-foreground md:text-5xl">{t("Book a demo")}</h1>
              <p className="mb-10 max-w-lg text-muted-foreground">
                {t("Please only fill out this form if you are a Trust / Agency looking to use Flexzo software to find and place candidates in your organisation.")}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input type="text" name="name" placeholder={t("Your Name *")} required value={form.name} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <input type="email" name="email" placeholder={t("Your Email *")} required value={form.email} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <input type="tel" name="telephone" placeholder={t("Your Telephone *")} required value={form.telephone} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <input type="text" name="organisation" placeholder={t("NHS Trust / Agency *")} required value={form.organisation} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <input type="text" name="date" placeholder={t("Ideal Date for Demo *")} required value={form.date} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <input type="text" name="time" placeholder={t("Ideal Time for Demo *")} required value={form.time} onChange={handleChange} className="w-full rounded-lg border border-border bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#0075FF]/50" />
                <button type="submit" disabled={submitting} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0075FF] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0060d0] disabled:opacity-60">
                  {submitting ? t("Sending…") : t("Book now")} <Send size={16} />
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="rounded-2xl border border-border bg-muted/50 p-10">
                <Globe className="mb-6 text-[#0075FF]" size={48} />
                <h2 className="mb-4 text-2xl font-bold text-foreground">{t("Access a world of healthcare talent")}</h2>
                <p className="mb-8 leading-relaxed text-muted-foreground">
                  {t("Flexzo AI connects Hospitals and Healthcare settings to a global network of healthcare professionals. Book a demo to see how our AI-powered platform can transform your staffing.")}
                </p>
                <div className="space-y-4">
                  {[
                    "AI-matched candidates in real-time",
                    "No placement fees",
                    "Full compliance management",
                    "Collaborative staff bank access",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-[#0075FF]" />
                      <span className="text-sm text-muted-foreground">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BookDemo;
