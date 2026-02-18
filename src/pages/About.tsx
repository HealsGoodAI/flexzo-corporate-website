import { motion } from "framer-motion";
import { ArrowRight, Target, Eye, Users, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-[#0a2540] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0CE3FF]">
            The nation's premium collaborative staff bank
          </p>
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
            About Flexzo
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
            At Flexzo AI, we're redefining healthcare recruitment through intelligent, AI-powered
            solutions that connect NHS Trusts directly with compliance-ready healthcare
            professionals – without the hassle of traditional agencies.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-card p-10"
          >
            <Eye className="mb-4 text-[#0075FF]" size={36} />
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Vision</h2>
            <p className="leading-relaxed text-muted-foreground">
              Our vision is to become the UK's leading collaborative staff bank, empowering
              healthcare professionals and NHS Trusts to connect directly through a fair,
              transparent, and efficient platform. We aim to eliminate unnecessary agency fees,
              reduce recruitment times, and ensure seamless compliance – improving patient care
              while cutting costs for healthcare providers.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-2xl border border-border bg-card p-10"
          >
            <Target className="mb-4 text-[#0CE3FF]" size={36} />
            <h2 className="mb-4 text-2xl font-bold text-foreground">Our Mission</h2>
            <p className="leading-relaxed text-muted-foreground">
              At Flexzo AI, our mission is to revolutionise healthcare staffing by providing an
              innovative, AI-powered platform that connects NHS Trusts directly with a nationwide
              pool of compliance-ready healthcare professionals. We aim to eliminate the
              inefficiencies of traditional recruitment processes, reduce costs by cutting out
              agency fees, and streamline compliance management.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Owned by HealsGood */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Users className="mb-4 text-[#0075FF]" size={40} />
              <h2 className="mb-6 text-3xl font-bold text-foreground">Owned by HealsGood</h2>
              <p className="leading-relaxed text-muted-foreground">
                Flexzo AI is proudly owned by HealsGood, a global leader in healthcare innovation.
                As part of the Healsgood family, Flexzo benefits from a strong foundation of
                expertise in healthcare technology, recruitment, and compliance. Together with
                sister platforms like Careo, we're driving forward a new era of smarter, more
                efficient healthcare staffing solutions that prioritise both patient care and
                workforce empowerment.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-10"
            >
              <h3 className="mb-4 text-xl font-bold text-foreground">Our Story</h3>
              <p className="mb-4 leading-relaxed text-muted-foreground">
                Flexzo AI was founded by Jack Henderson, a visionary entrepreneur with deep roots
                in the healthcare sector. Starting his career as a medical recruiter, Jack gained
                firsthand experience with the challenges and inefficiencies plaguing traditional
                recruitment processes.
              </p>
              <p className="leading-relaxed text-muted-foreground">
                He went on to establish one of the UK's largest clinical insourcing companies,
                transforming how NHS Trusts manage staffing. Recognising a greater opportunity to
                disrupt the industry, Jack launched Flexzo AI – an intelligent, collaborative
                platform designed to eliminate agency barriers, streamline compliance, and empower
                both healthcare providers and professionals.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Talent */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Globe className="mx-auto mb-4 text-[#0075FF]" size={40} />
            <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
              Access a world of healthcare talent
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Flexzo AI connects NHS Trusts to a global network of healthcare professionals,
              ensuring you always have access to the right talent when you need it.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
