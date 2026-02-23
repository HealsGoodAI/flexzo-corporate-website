import { useState, useMemo, useCallback } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  Briefcase,
  Clock,
  SlidersHorizontal,
  X,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { jobs, type Job } from "@/data/jobs";
import { Slider } from "@/components/ui/slider";
import { useRegion } from "@/hooks/useRegion";
import { useRegionText } from "@/lib/regionalize";

/* ── helpers ───────────────────────────────────────── */

const categories = [
  "All",
  "Registered Nurse",
  "Practice Nurse",
  "Specialist Nurse",
  "Charge Nurse",
  "Staff Nurse",
  "Nursing Auxiliary",
  "Outpatient Nurse",
] as const;

type SortOption = "relevance" | "newest" | "closing-soon" | "salary-high" | "salary-low";

const sortLabels: Record<SortOption, string> = {
  relevance: "Most Relevant",
  newest: "Newest First",
  "closing-soon": "Closing Soon",
  "salary-high": "Highest Salary",
  "salary-low": "Lowest Salary",
};

/** Extract the first numeric salary figure from a salary string */
function parseSalaryMin(salary: string): number | null {
  const match = salary.match(/[\d,]+/);
  if (!match) return null;
  const num = Number(match[0].replace(/,/g, ""));
  // If "an hour", annualise roughly
  if (salary.toLowerCase().includes("hour")) return num * 2080;
  return num;
}

function matchesCategory(job: Job, category: string): boolean {
  if (category === "All") return true;
  const t = job.title.toLowerCase();
  const c = category.toLowerCase();
  return t.includes(c);
}

/* ── component ─────────────────────────────────────── */

const JobSearchResults = () => {
  const { regionPath } = useRegion();
  const { t } = useRegionText();
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get("role") || "";
  const initialLocation = searchParams.get("location") || "";

  const [roleQuery, setRoleQuery] = useState(initialRole);
  const [locationQuery, setLocationQuery] = useState(initialLocation);
  const [category, setCategory] = useState("All");
  const [salaryRange, setSalaryRange] = useState<[number, number]>([0, 100000]);
  const [maxDistance, setMaxDistance] = useState(100);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [showFilters, setShowFilters] = useState(true);
  const [sortOpen, setSortOpen] = useState(false);

  const filteredJobs = useMemo(() => {
    let results = jobs.filter((job) => {
      // text search
      const matchesRole =
        !roleQuery ||
        job.title.toLowerCase().includes(roleQuery.toLowerCase()) ||
        job.organisation.toLowerCase().includes(roleQuery.toLowerCase()) ||
        job.description.toLowerCase().includes(roleQuery.toLowerCase());
      const matchesLocation =
        !locationQuery ||
        job.location.toLowerCase().includes(locationQuery.toLowerCase());

      // category
      if (!matchesCategory(job, category)) return false;

      // salary range
      const sal = parseSalaryMin(job.salary);
      if (sal !== null && (sal < salaryRange[0] || sal > salaryRange[1])) return false;

      return matchesRole && matchesLocation;
    });

    // sort
    results = [...results].sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.posted).getTime() - new Date(a.posted).getTime();
        case "closing-soon":
          return new Date(a.closing).getTime() - new Date(b.closing).getTime();
        case "salary-high": {
          const sa = parseSalaryMin(a.salary) ?? 0;
          const sb = parseSalaryMin(b.salary) ?? 0;
          return sb - sa;
        }
        case "salary-low": {
          const sa = parseSalaryMin(a.salary) ?? 0;
          const sb = parseSalaryMin(b.salary) ?? 0;
          return sa - sb;
        }
        default: {
          // relevance: prioritise title match, then org match
          const q = roleQuery.toLowerCase();
          if (!q) return 0;
          const aTitle = a.title.toLowerCase().includes(q) ? 1 : 0;
          const bTitle = b.title.toLowerCase().includes(q) ? 1 : 0;
          return bTitle - aTitle;
        }
      }
    });

    return results;
  }, [roleQuery, locationQuery, category, salaryRange, sortBy]);

  const clearFilters = useCallback(() => {
    setCategory("All");
    setSalaryRange([0, 100000]);
    setMaxDistance(100);
    setSortBy("relevance");
  }, []);

  const activeFilterCount = [
    category !== "All",
    salaryRange[0] > 0 || salaryRange[1] < 100000,
    maxDistance < 100,
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Search header */}
      <section className="border-b border-border bg-muted pt-28 pb-8">
        <div className="mx-auto max-w-6xl px-6">
          <Link
            to={regionPath("/jobs")}
            className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" /> {t("Back to Jobs")}
          </Link>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Role or organisation"
                value={roleQuery}
                onChange={(e) => setRoleQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              {roleQuery && (
                <button onClick={() => setRoleQuery("")}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
            <div className="flex flex-1 items-center gap-3 rounded-lg border border-border bg-background px-4 py-3">
              <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
              <input
                type="text"
                placeholder="Region or city"
                value={locationQuery}
                onChange={(e) => setLocationQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
              {locationQuery && (
                <button onClick={() => setLocationQuery("")}>
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="py-8">
        <div className="mx-auto max-w-6xl px-6">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-medium text-foreground">
              <span className="text-accent">{filteredJobs.length}</span>{" "}
              {filteredJobs.length === 1 ? "result" : "results"}
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
                >
                  {sortLabels[sortBy]}
                  <ChevronDown className="h-4 w-4" />
                </button>
                {sortOpen && (
                  <div className="absolute right-0 z-50 mt-1 w-48 rounded-lg border border-border bg-background py-1 shadow-lg">
                    {(Object.keys(sortLabels) as SortOption[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          setSortBy(opt);
                          setSortOpen(false);
                        }}
                        className={`block w-full px-4 py-2 text-left text-sm transition-colors hover:bg-muted ${
                          sortBy === opt
                            ? "font-semibold text-accent"
                            : "text-foreground"
                        }`}
                      >
                        {sortLabels[opt]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar filters */}
            {showFilters && (
              <motion.aside
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden w-64 shrink-0 lg:block"
              >
                <div className="sticky top-28 space-y-6 rounded-xl border border-border bg-background p-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-sm font-semibold text-foreground">
                      Filters
                    </h3>
                    <button
                      onClick={clearFilters}
                      className="text-xs text-accent hover:underline"
                    >
                      Clear all
                    </button>
                  </div>

                  {/* Category */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Category
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          onClick={() => setCategory(cat)}
                          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                            category === cat
                              ? "bg-accent text-accent-foreground"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }`}
                        >
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Salary range */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Salary Range (Annual)
                    </p>
                    <Slider
                      min={0}
                      max={100000}
                      step={5000}
                      value={salaryRange}
                      onValueChange={(v) =>
                        setSalaryRange(v as [number, number])
                      }
                      className="mb-2"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>£{salaryRange[0].toLocaleString()}</span>
                      <span>£{salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Location distance */}
                  <div>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Distance
                    </p>
                    <Slider
                      min={5}
                      max={100}
                      step={5}
                      value={[maxDistance]}
                      onValueChange={(v) => setMaxDistance(v[0])}
                      className="mb-2"
                    />
                    <p className="text-xs text-muted-foreground">
                      Within {maxDistance} miles
                    </p>
                  </div>
                </div>
              </motion.aside>
            )}

            {/* Results grid */}
            <div className="flex-1">
              {filteredJobs.length === 0 ? (
                <div className="rounded-xl border border-border bg-background px-6 py-16 text-center">
                  <p className="mb-2 text-base font-medium text-foreground">
                    No results found
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search or filters.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  {filteredJobs.map((job, i) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                    >
                      <Link
                        to={regionPath(`/jobs/${job.id}`)}
                        className="group flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border bg-background p-5 transition-all hover:shadow-lg hover:border-accent/30"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="mb-2 flex items-center gap-3">
                            <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                              {job.contractType}
                            </span>
                            <span className="text-[11px] text-muted-foreground">
                              Closes {job.closing}
                            </span>
                          </div>
                          <h3 className="mb-1 font-display text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                            {job.title}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {job.organisation}
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-muted-foreground sm:shrink-0">
                          <span className="flex items-center gap-1.5">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {job.location}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Briefcase className="h-3 w-3 shrink-0" />
                            {job.salary}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="h-3 w-3 shrink-0" />
                            {job.workingPattern}
                          </span>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default JobSearchResults;
