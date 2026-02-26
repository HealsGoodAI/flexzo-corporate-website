import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";
import { sendContactEmail } from "@/lib/emailService";
import ReCaptcha from "@/components/ReCaptcha";

const offices_uk = [
  { name: "UK Head Office", address: "Noble House, Capital Dr, Milton Keynes, MK14 6QP" },
  { name: "Dubai Office", address: "908B, Business Central Towers, Dubai Internet City, Dubai" },
  { name: "South Africa Office", address: "173 Oxford Rd, Rosebank, Johannesburg, 2196" },
  { name: "USA Office", address: "8 The Green, STE R, Dover, DE 19901, USA" },
];

const offices_us = [
  { name: "USA Head Office", address: "8 The Green, STE R, Dover, DE 19901, USA" },
  { name: "UK Office", address: "Noble House, Capital Dr, Milton Keynes, MK14 6QP" },
  { name: "Dubai Office", address: "908B, Business Central Towers, Dubai Internet City, Dubai" },
  { name: "South Africa Office", address: "173 Oxford Rd, Rosebank, Johannesburg, 2196" },
];

const Contact = () => {
  const { t } = useRegionText();
  const navigate = useNavigate();
  const { regionPath, region } = useRegion();
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [recaptchaToken, setRecaptchaToken] = useState("");

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
      await sendContactEmail({
        name: form.name,
        email: form.email,
        phone: form.phone,
        company: form.company,
        message: form.message,
        recaptchaToken,
      });
      navigate(regionPath("/contact/success"));
    } catch (err) {
      setError("Something went wrong. Please try again or email us at sales@flexzo.ai");
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      <section className="relative overflow-hidden bg-foreground pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#0CE3FF]">{t("Get in touch")}</p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">{t("Contact")}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/70">
            {t("We're here to help you transform healthcare staffing. If you're an NHS Trust looking for smarter recruitment solutions, our team is ready to assist.")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          <div className="space-y-10">
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("Contact Sales")}</h3>
              <a href="mailto:sales@flexzo.ai" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail size={18} className="text-primary" /> sales@flexzo.ai
              </a>
            </div>
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">{t("Service Hours")}</h3>
              <p className="flex items-center gap-2 text-foreground">
                <Clock size={18} className="text-primary" /> {region === "us" ? "Monday to Friday 9am – 5pm (EST)" : t("Monday to Friday 9am – 7pm (UK London Time)")}
              </p>
            </div>
          </div>

          <div>
            <h2 className="mb-8 text-2xl font-bold text-foreground">{t("Send A Message")}</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <Input placeholder={t("Your Name *")} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
                <Input type="email" placeholder={t("Email Address *")} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <Input placeholder={t("Phone Number")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                <Input placeholder={t("Company / Organisation")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
              <Textarea placeholder={t("Your Message *")} required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
              <ReCaptcha onVerify={setRecaptchaToken} onExpire={() => setRecaptchaToken("")} />
              {error && <p className="text-sm text-red-500">{error}</p>}
              <Button type="submit" size="lg" className="w-full sm:w-auto" disabled={submitting || !recaptchaToken}>
                {submitting ? t("Sending…") : t("Send Message")}
              </Button>
            </form>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">{t("Our Offices")}</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(region === "us" ? offices_us : offices_uk).map((office) => (
              <div key={office.name} className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-lg">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin size={20} className="text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{t(office.name)}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{office.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
