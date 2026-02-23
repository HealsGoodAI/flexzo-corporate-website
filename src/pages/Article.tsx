import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import { useRegion } from "@/hooks/useRegion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const Article = () => {
  const { slug } = useParams<{ slug: string }>();
  const { regionPath } = useRegion();
  const article = articles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="flex items-center justify-center pt-40 pb-20">
          <div className="text-center">
            <h1 className="mb-4 text-3xl font-bold text-foreground">Article Not Found</h1>
            <Link to={regionPath("/news")} className="text-[#0075FF] hover:underline">
              ← Back to Knowledge Hub
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const related = articles
    .filter((a) => a.category === article.category && a.slug !== article.slug)
    .slice(0, 3);

  // Extract a pull quote from the first section's content (second paragraph if available)
  const pullQuote = article.sections[0]?.content?.length > 1
    ? article.sections[0].content[1]
    : null;

  // Generate a deterministic accent position for the hero
  const accentX = ((article.slug.charCodeAt(0) * 17) % 40) + 30;
  const accentY = ((article.slug.charCodeAt(1) * 13) % 30) + 20;

  return (
    <div className="min-h-screen bg-background">
      <Navbar transparent />

      {/* ── HERO ── Full-bleed editorial header */}
      <section className="relative min-h-[70vh] flex items-end overflow-hidden bg-foreground">
        {/* Subtle radial accent */}
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `radial-gradient(circle at ${accentX}% ${accentY}%, hsl(210 100% 45% / 0.5) 0%, transparent 50%)`
        }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-16 pt-40">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <Link
              to={regionPath("/news")}
              className="mb-10 inline-flex items-center gap-2 text-sm text-primary-foreground/40 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft size={14} />
              Knowledge Hub
            </Link>

            <div className="mb-8 flex flex-wrap items-center gap-4">
              <span className="rounded-full bg-[#0075FF] px-4 py-1.5 text-xs font-semibold text-white">
                {article.category}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/40">
                <Calendar size={14} />
                {article.publishedDate}
              </span>
              <span className="flex items-center gap-1.5 text-sm text-primary-foreground/40">
                <Clock size={14} />
                {article.readTime}
              </span>
            </div>

            <motion.h1
              initial="hidden"
              animate="visible"
              custom={1}
              variants={fadeUp}
              className="max-w-4xl text-4xl font-bold leading-[1.08] tracking-tight text-primary-foreground md:text-6xl lg:text-7xl"
            >
              {article.title}
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              custom={2}
              variants={fadeUp}
              className="mt-8 max-w-2xl text-lg leading-relaxed text-primary-foreground/50 md:text-xl"
            >
              {article.excerpt}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <article className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-16 lg:grid-cols-[1fr_320px]">
            {/* Main content */}
            <div>
              {article.sections.map((section, i) => {
                // Insert a pull quote after the first section
                const showPullQuote = i === 1 && pullQuote;

                return (
                  <div key={i}>
                    {showPullQuote && (
                      <motion.blockquote
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeUp}
                        className="my-16 border-l-4 border-[#0075FF] pl-8 lg:pl-12"
                      >
                        <p className="text-2xl font-bold leading-snug text-foreground md:text-3xl">
                          {pullQuote.length > 200 ? pullQuote.slice(0, 200) + "…" : pullQuote}
                        </p>
                      </motion.blockquote>
                    )}

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={0}
                      variants={fadeUp}
                      className="mb-12"
                    >
                      {section.heading && section.headingLevel === 2 && (
                        <h2 className="mb-6 mt-16 text-3xl font-bold tracking-tight text-foreground md:text-4xl first:mt-0">
                          {section.heading}
                        </h2>
                      )}
                      {section.heading && section.headingLevel === 3 && (
                        <h3 className="mb-4 mt-10 text-xl font-bold text-foreground md:text-2xl">
                          {section.heading}
                        </h3>
                      )}
                      {section.content.map((paragraph, j) => (
                        <p key={j} className="mb-5 text-lg leading-[1.8] text-muted-foreground">
                          {paragraph}
                        </p>
                      ))}
                    </motion.div>

                    {/* Visual separator every 3rd section */}
                    {i > 0 && i % 3 === 0 && i < article.sections.length - 1 && (
                      <div className="my-16 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <div className="h-2 w-2 rounded-full bg-[#0075FF]" />
                        <div className="h-px flex-1 bg-border" />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-28 space-y-10">
                {/* Table of contents */}
                <div>
                  <h4 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                    In this article
                  </h4>
                  <nav className="flex flex-col gap-2">
                    {article.sections
                      .filter((s) => s.heading && s.headingLevel === 2)
                      .map((s, i) => (
                        <span
                          key={i}
                          className="text-sm leading-snug text-muted-foreground transition-colors hover:text-foreground cursor-default"
                        >
                          {s.heading}
                        </span>
                      ))}
                  </nav>
                </div>

                {/* Mini CTA */}
                <div className="rounded-2xl bg-foreground p-8">
                  <h4 className="mb-3 text-lg font-bold text-primary-foreground">
                    Transform your workforce
                  </h4>
                  <p className="mb-6 text-sm text-primary-foreground/50">
                    Discover how Flexzo AI can help your organisation reduce costs and improve fill rates.
                  </p>
                  <a
                    href="/book-demo"
                    className="inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
                  >
                    Book a Demo
                    <ArrowRight size={14} />
                  </a>
                </div>

                {/* Share / meta */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Tag size={12} />
                    {article.category}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock size={12} />
                    {article.readTime}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Calendar size={12} />
                    {article.publishedDate}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </article>

      {/* ── BOTTOM CTA ── Full-width editorial */}
      <section className="relative bg-foreground py-24 lg:py-32">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle at 70% 40%, hsl(210 100% 45% / 0.3) 0%, transparent 50%)"
        }} />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="text-3xl font-bold text-primary-foreground md:text-5xl">
              Ready to transform your{" "}
              <span className="text-[#0075FF]">workforce strategy</span>?
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg text-primary-foreground/50">
              Discover how Flexzo AI can help your Trust reduce costs, improve fill rates
              and build workforce resilience.
            </p>
            <div className="mt-10">
              <a
                href="/book-demo"
                className="group inline-flex items-center gap-2 rounded-md bg-[#0075FF] px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-[#0060D0]"
              >
                Book a Demo
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── Pentagram-style cards */}
      {related.length > 0 && (
        <section className="py-20 lg:py-28">
          <div className="mx-auto max-w-7xl px-6">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="mb-12 text-3xl font-bold text-foreground md:text-4xl"
            >
              Related Articles
            </motion.h2>
            <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                >
                  <Link
                    to={regionPath(`/news/${rel.slug}`)}
                    className="group block"
                  >
                    <div className="mb-5 aspect-[16/10] overflow-hidden rounded-xl bg-foreground flex items-end p-6 relative">
                      <div className="absolute inset-0 opacity-[0.06]" style={{
                        backgroundImage: `radial-gradient(circle at ${30 + (i * 23) % 50}% ${20 + (i * 17) % 40}%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)`
                      }} />
                      <span className="relative z-10 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/70 backdrop-blur-sm">
                        {rel.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-snug text-foreground transition-colors group-hover:text-[#0075FF]">
                      {rel.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {rel.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {rel.readTime}
                      <ArrowRight size={12} className="ml-auto transition-transform group-hover:translate-x-1 group-hover:text-[#0075FF]" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Article;
