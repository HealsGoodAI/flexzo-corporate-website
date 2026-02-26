import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Send, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";
import { sendBookDemoEmail } from "@/lib/emailService";
import bookDemoHero from "@/assets/book-demo-hero.jpg";
import ReCaptcha from "@/components/ReCaptcha";

const BookDemo = () => {
  const navigate = useNavigate();
  const { regionPath } = useRegion();
  const { t } = useRegionText();
  const [form, setForm] = useState({ name: "", email: "", telephone: "", organisation: "", date: "", time: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    if (!recaptchaToken) {
      setError("Please complete the reCAPTCHA verification.");
      setSubmitting(false);
      return;
    }
    try {
      await sendBookDemoEmail({
        name: form.name,
        email: form.email,
        telephone: form.telephone,
        organisation: form.organisation,
        date: form.date,
        time: form.time,
        recaptchaToken,
      });
      navigate(regionPath("/book-demo/success"));
    } catch (err) {
      setError("Something went wrong. Please try again or email us at sales@flexzo.ai");
      setSubmitting(false);
    }
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
                {error && <p className="text-sm text-red-500">{error}</p>}
                <ReCaptcha onVerify={setRecaptchaToken} onExpire={() => setRecaptchaToken("")} />
                <button type="submit" disabled={submitting || !recaptchaToken} className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0075FF] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0060d0] disabled:opacity-60">
                  {submitting ? t("Sending…") : t("Book now")} <Send size={16} />
                </button>
              </form>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="hidden lg:block">
              <div className="overflow-hidden rounded-2xl border border-border bg-muted/50">
                <img src={bookDemoHero} alt="Healthcare professional" className="h-56 w-full object-cover" />
                <div className="p-10">
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
