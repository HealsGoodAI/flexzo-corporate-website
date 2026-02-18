import { useState } from "react";
import { MapPin, Mail, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const offices = [
  {
    name: "UK Head Office",
    address: "Noble House, Capital Dr, Milton Keynes, MK14 6QP",
  },
  {
    name: "Dubai Office",
    address: "908B, Business Central Towers, Dubai Internet City, Dubai",
  },
  {
    name: "South Africa Office",
    address: "173 Oxford Rd, Rosebank, Johannesburg, 2196",
  },
  {
    name: "USA Office",
    address: "8 The Green, STE R, Dover, DE 19901, USA",
  },
];

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-[#0CE3FF]">
            Get in touch
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight text-primary-foreground md:text-5xl">
            Contact
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-primary-foreground/70">
            We're here to help you transform healthcare staffing. If you're an NHS Trust looking for smarter recruitment solutions, our team is ready to assist.
          </p>
        </div>
      </section>

      {/* Contact info + Form */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.5fr]">
          {/* Left: contact details */}
          <div className="space-y-10">
            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Contact Sales
              </h3>
              <a href="mailto:sales@flexzo.ai" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail size={18} className="text-primary" />
                sales@flexzo.ai
              </a>
            </div>

            <div>
              <h3 className="mb-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
                Service Hours
              </h3>
              <p className="flex items-center gap-2 text-foreground">
                <Clock size={18} className="text-primary" />
                Monday to Friday 9am – 7pm (UK London Time)
              </p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            <h2 className="mb-8 text-2xl font-bold text-foreground">Send A Message</h2>
            {submitted ? (
              <div className="rounded-lg border border-border bg-muted/50 p-8 text-center">
                <p className="text-lg font-semibold text-foreground">Thank you for your message!</p>
                <p className="mt-2 text-muted-foreground">We'll get back to you as soon as possible.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Input
                    placeholder="Your Name *"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <Input
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  />
                  <Input
                    placeholder="Company / Organisation"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                  />
                </div>
                <Textarea
                  placeholder="Your Message *"
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <Button type="submit" size="lg" className="w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="border-t border-border bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-12 text-center text-3xl font-bold text-foreground">Our Offices</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {offices.map((office) => (
              <div
                key={office.name}
                className="rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <MapPin size={20} className="text-primary" />
                </div>
                <h3 className="mb-2 font-semibold text-foreground">{office.name}</h3>
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
