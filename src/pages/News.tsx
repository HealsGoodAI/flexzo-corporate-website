import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, ArrowRight, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { articles } from "@/data/articles";

import articleImg1 from "@/assets/article-1.jpg";
import articleImg2 from "@/assets/article-2.jpg";
import articleImg3 from "@/assets/article-3.jpg";
import articleImg4 from "@/assets/article-4.jpg";
import articleImg5 from "@/assets/article-5.jpg";
import articleImg6 from "@/assets/article-6.jpg";
import articleImg7 from "@/assets/article-7.jpg";

const articleImages = [articleImg1, articleImg2, articleImg3, articleImg4, articleImg5, articleImg6, articleImg7];

const categories = ["All", ...Array.from(new Set(articles.map((a) => a.category)))];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
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

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* ── DARK HEADER ── */}
      <section className="bg-foreground min-h-[40vh] flex items-end">
        <div className="mx-auto max-w-7xl w-full px-6 pb-8">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-left text-6xl font-bold tracking-tight text-primary-foreground md:text-8xl lg:text-9xl"
          >
            The News.
          </motion.h1>
        </div>
      </section>

      {/* ── WHITE BODY ── */}
      <div className="bg-white">
        {/* Filters bar */}
        <div className="mx-auto max-w-7xl px-6 py-8 border-b border-border">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
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
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="py-20 text-center mx-auto max-w-7xl px-6">
            <p className="text-lg text-muted-foreground">No articles found matching your search.</p>
          </div>
        ) : (
          <div className="mx-auto max-w-7xl px-6">
            {/* ── ROW 1: Hero featured (large image left, stacked articles right) ── */}
            <div className="grid gap-8 py-12 lg:grid-cols-[1.4fr_1fr] border-b border-border">
              {/* Lead article */}
              {filtered[0] && (
                <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
                  <Link to={`/news/${filtered[0].slug}`} className="group block">
                    <div className="aspect-[16/10] overflow-hidden rounded-xl mb-5">
                      <img
                        src={articleImages[0]}
                        alt={filtered[0].title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#0075FF]">
                      {filtered[0].category}
                    </span>
                    <h2 className="mt-2 text-2xl font-bold leading-tight text-foreground group-hover:text-[#0075FF] transition-colors md:text-3xl">
                      {filtered[0].title}
                    </h2>
                    <p className="mt-3 text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {filtered[0].excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock size={12} />{filtered[0].readTime}</span>
                      <span>{filtered[0].date}</span>
                    </div>
                  </Link>
                </motion.div>
              )}

              {/* Stacked articles 2-4 */}
              <div className="flex flex-col divide-y divide-border">
                {filtered.slice(1, 4).map((article, i) => (
                  <motion.div
                    key={article.slug}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i + 1}
                    variants={fadeUp}
                    className="py-5 first:pt-0 last:pb-0"
                  >
                    <Link to={`/news/${article.slug}`} className="group flex gap-5">
                      <div className="w-28 h-20 flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={articleImages[i + 1]}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0075FF]">
                          {article.category}
                        </span>
                        <h3 className="mt-1 text-sm font-bold leading-snug text-foreground group-hover:text-[#0075FF] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <span className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                          <Clock size={10} />{article.readTime}
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── ROW 2: Three equal columns with images ── */}
            {filtered.length > 4 && (
              <div className="grid gap-8 py-12 md:grid-cols-3 border-b border-border">
                {filtered.slice(4, 7).map((article, i) => (
                  <motion.div
                    key={article.slug}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={i}
                    variants={fadeUp}
                  >
                    <Link to={`/news/${article.slug}`} className="group block">
                      <div className="aspect-[16/10] overflow-hidden rounded-xl mb-4">
                        <img
                          src={articleImages[i + 4]}
                          alt={article.title}
                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0075FF]">
                        {article.category}
                      </span>
                      <h3 className="mt-2 text-lg font-bold leading-snug text-foreground group-hover:text-[#0075FF] transition-colors">
                        {article.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
                        <Clock size={12} />
                        {article.readTime}
                        <ArrowRight size={12} className="ml-auto transition-transform group-hover:translate-x-1 group-hover:text-[#0075FF]" />
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}

            {/* ── ROW 3+: Remaining articles as a compact list ── */}
            {filtered.length > 7 && (
              <div className="py-12">
                <h2 className="mb-8 text-2xl font-bold text-foreground">More Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filtered.slice(7).map((article, i) => (
                    <motion.div
                      key={article.slug}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      custom={i}
                      variants={fadeUp}
                    >
                      <Link to={`/news/${article.slug}`} className="group block rounded-xl border border-border bg-background p-6 transition-shadow hover:shadow-lg h-full">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#0075FF]">
                          {article.category}
                        </span>
                        <h3 className="mt-3 text-base font-bold leading-snug text-foreground group-hover:text-[#0075FF] transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="mt-3 text-sm text-muted-foreground line-clamp-3">
                          {article.excerpt}
                        </p>
                        <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                          <Clock size={12} />
                          {article.readTime}
                          <span>{article.date}</span>
                          <ArrowRight size={12} className="ml-auto transition-transform group-hover:translate-x-1 group-hover:text-[#0075FF]" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default News;
