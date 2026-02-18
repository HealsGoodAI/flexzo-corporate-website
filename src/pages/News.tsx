import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";
import newsFeaturedImg from "@/assets/news-featured.jpg";

const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const News = () => {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    return articles.filter((a) => {
      const matchesSearch =
        !search ||
        a.title.toLowerCase().includes(search.toLowerCase()) ||
        a.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === "All" || a.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── HERO ── Pentagram-inspired: minimal, typographic */}
      <section className="pt-32 pb-12 lg:pt-40 lg:pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#0075FF]">
              Knowledge Hub
            </p>
            <h1 className="max-w-3xl text-5xl font-bold leading-[1.08] tracking-tight text-foreground md:text-7xl">
              Insights &<br />
              <span className="text-[#0075FF]">Industry News</span>
            </h1>
          </motion.div>

          {/* Search + filters — clean inline bar */}
          <motion.div
            initial="hidden"
            animate="visible"
            custom={1}
            variants={fadeUp}
            className="mt-12 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-foreground text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="relative max-w-xs w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
              <input
                type="text"
                placeholder="Search…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-full border border-border bg-background py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-foreground/20"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="border-t border-border" />
      </div>

      {/* ── FEATURED ARTICLE ── Large editorial card */}
      {featured && (
        <section className="py-16 lg:py-20">
          <div className="mx-auto max-w-7xl px-6">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <Link
                to={`/news/${featured.slug}`}
                className="group grid items-center gap-12 lg:grid-cols-[1.2fr_1fr]"
              >
                {/* Left: large color block with category */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-foreground flex flex-col justify-end lg:aspect-[4/3]">
                  <img src={newsFeaturedImg} alt="Healthcare professional" className="absolute inset-0 h-full w-full object-cover opacity-40" />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/60 to-transparent" />
                  <div className="relative z-10 p-10">
                    <span className="mb-4 inline-block rounded-full bg-[#0075FF] px-4 py-1.5 text-xs font-semibold text-white">
                      {featured.category}
                    </span>
                    <h2 className="text-3xl font-bold leading-tight text-primary-foreground md:text-4xl lg:text-5xl">
                      {featured.title}
                    </h2>
                  </div>
                </div>

                {/* Right: excerpt + meta */}
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center gap-6 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {featured.readTime}
                    </span>
                    <span>{featured.date}</span>
                  </div>
                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground transition-all group-hover:text-[#0075FF] group-hover:gap-3">
                    Read Article
                    <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* ── ARTICLE GRID ── Pentagram-style: alternating large/small */}
      <section className="pb-24 lg:pb-32">
        <div className="mx-auto max-w-7xl px-6">
          {rest.length > 0 && (
            <p className="mb-10 text-sm text-muted-foreground">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </p>
          )}

          <div className="grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((article, i) => {
              // Every 4th item spans 2 columns for editorial variety
              const isWide = i % 5 === 0 && i > 0;

              return (
                <motion.div
                  key={article.slug}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  variants={fadeUp}
                  className={isWide ? "md:col-span-2" : ""}
                >
                  <Link
                    to={`/news/${article.slug}`}
                    className="group block"
                  >
                    {/* Color accent bar */}
                    <div className={`mb-6 overflow-hidden rounded-xl bg-foreground ${isWide ? "aspect-[21/9]" : "aspect-[16/10]"} flex items-end p-6 relative`}>
                      <div className="absolute inset-0 opacity-[0.05]" style={{
                        backgroundImage: `radial-gradient(circle at ${30 + (i * 17) % 60}% ${20 + (i * 23) % 50}%, hsl(210 100% 45% / 0.3) 0%, transparent 60%)`
                      }} />
                      <span className="relative z-10 rounded-full bg-primary-foreground/10 px-3 py-1 text-xs font-medium text-primary-foreground/70 backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>

                    <h3 className={`font-bold leading-snug text-foreground transition-colors group-hover:text-[#0075FF] ${isWide ? "text-2xl md:text-3xl" : "text-lg"}`}>
                      {article.title}
                    </h3>

                    <p className={`mt-3 leading-relaxed text-muted-foreground ${isWide ? "text-base max-w-2xl" : "text-sm"}`}>
                      {article.excerpt}
                    </p>

                    <div className="mt-5 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        {article.readTime}
                      </span>
                      <span>{article.date}</span>
                      <ArrowRight
                        size={14}
                        className="ml-auto transition-transform group-hover:translate-x-1 group-hover:text-[#0075FF]"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default News;
