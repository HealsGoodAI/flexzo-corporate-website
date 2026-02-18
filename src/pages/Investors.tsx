import { motion } from "framer-motion";
import { ArrowRight, ExternalLink, TrendingUp, Shield, Globe } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";


const highlights = [
  { label: "Seed Funding Raised", value: "£4m", description: "Enabling NHS rollout and USA explorations" },
  { label: "Lead Investor", value: "Fuel Ventures", description: "Leading UK early-stage VC firm" },
  { label: "Strategic Backer", value: "Octopus Ventures", description: "One of Europe's largest VC investors" },
];

const Investors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-foreground via-foreground to-[#0a2540] pt-32 pb-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0CE3FF]">
            Backed by Leading Investors
          </p>
          <h1 className="mb-6 text-4xl font-bold text-primary-foreground md:text-5xl lg:text-6xl">
            Investors
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-primary-foreground/70">
            Flexzo, developed by Healsgood, is proud to be backed by prominent investors who share
            our vision of transforming NHS service delivery through cutting-edge AI technology. In
            2025, Healsgood successfully secured £1.5 million in funding, led by leading venture
            capital firm Fuel Ventures.
          </p>
        </div>
      </section>

      {/* Investment Highlights */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-6 text-center"
        >
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
            Investment Round
          </p>
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl">
            Investment Round Highlights
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            This oversubscribed round is a powerful validation of the impact Flexzo AI is already
            having — and the scale of the opportunity ahead.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {highlights.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-2xl border border-border bg-card p-8 text-center"
            >
              <p className="mb-2 text-4xl font-bold text-[#0075FF]">{item.value}</p>
              <p className="mb-1 text-sm font-semibold text-foreground">{item.label}</p>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Fuel Ventures */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
                Fueling the growth of ambitious tech companies
              </p>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Proudly Backed by Fuel Ventures
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Flexzo AI is proud to be backed by Fuel Ventures, a leading UK early-stage venture
                capital firm known for supporting high-growth technology companies. In March 2025,
                Fuel Ventures led a £1.5 million funding round for our parent company, Healsgood,
                to accelerate the adoption of Flexzo AI across NHS Trusts nationwide.
              </p>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                This investment enables us to enhance our AI-driven platform, expand our
                collaborative staff bank, and further our mission to revolutionise healthcare
                staffing.
              </p>
              <a
                href="https://www.fuel.ventures/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0075FF] hover:underline"
              >
                Read more about Fuel Ventures <ExternalLink size={14} />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-2xl border border-border bg-card p-10"
            >
              <TrendingUp className="mb-4 text-[#0075FF]" size={40} />
              <h3 className="mb-3 text-xl font-bold text-foreground">About Fuel Ventures</h3>
              <p className="leading-relaxed text-muted-foreground">
                Fuel Ventures specialises in investing in early-stage technology businesses with
                high growth potential. Their portfolio includes some of the UK's most successful
                startups, and they provide not only capital but also strategic support to help
                companies scale. Fuel Ventures' investment in Healsgood underscores their
                confidence in our vision to transform NHS staffing through innovative AI solutions.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Octopus Ventures */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 rounded-2xl border border-border bg-card p-10 lg:order-1"
            >
              <Shield className="mb-4 text-[#0075FF]" size={40} />
              <h3 className="mb-3 text-xl font-bold text-foreground">About Octopus Ventures</h3>
              <p className="leading-relaxed text-muted-foreground">
                Octopus Ventures, part of Octopus Investments, is one of the largest and most
                active venture capital investors in Europe. Their mission is simple — to invest in
                the people, ideas and industries that will change the world. They focus on building
                a more sustainable planet, empowering people and revitalising healthcare.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
                Venture capital for the founders building a better tomorrow
              </p>
              <h2 className="mb-6 text-3xl font-bold text-foreground">
                Funded by Octopus Ventures
              </h2>
              <p className="mb-6 leading-relaxed text-muted-foreground">
                Flexzo AI has secured an investment from Octopus Ventures, one of the largest and
                most active venture capital investors in Europe. This significant investment will
                accelerate the growth and adoption of Flexzo AI across NHS Trusts nationwide.
              </p>
              <p className="mb-8 leading-relaxed text-muted-foreground">
                It empowers us to further enhance our AI-driven platform, expand our collaborative
                staff bank, and strengthen our mission to transform healthcare staffing. With the
                support of Octopus Ventures, we are also building the future of healthcare workforce
                management in the USA.
              </p>
              <a
                href="https://octopusventures.com/about/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-[#0075FF] hover:underline"
              >
                Read more about Octopus Ventures <ExternalLink size={14} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* AWS & Google Cloud */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-6 py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0075FF]">
              Welcome to Flexzo AI
            </p>
            <h2 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">
              Supported by AWS & Google Cloud
            </h2>
            <p className="mx-auto mb-10 max-w-3xl leading-relaxed text-muted-foreground">
              Flexzo AI leverages the robust infrastructure of Google Cloud and Amazon Web Services
              (AWS) to ensure our platform is secure, scalable, and reliable. These partnerships
              enable us to process complex data efficiently, provide real-time analytics, and deliver
              seamless experiences to our users.
            </p>
            <div className="flex items-center justify-center gap-12">
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card">
                <Globe className="text-[#0075FF]" size={32} />
              </div>
              <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-card">
                <Shield className="text-[#0CE3FF]" size={32} />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-gradient-to-br from-foreground via-foreground to-[#0a2540] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold text-primary-foreground md:text-4xl">
            One platform, endless staffing solutions
          </h2>
          <p className="mb-8 text-primary-foreground/70">
            Join the UK's largest collaborative staff bank for healthcare providers. With Flexzo AI,
            you'll have access to locum, short term cover and permanent staff recruitment.
          </p>
          <a
            href="/book-demo"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0075FF] px-8 py-3.5 text-sm font-medium text-white transition-colors hover:bg-[#0060d0]"
          >
            Book a Demo <ArrowRight size={16} />
          </a>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Investors;
