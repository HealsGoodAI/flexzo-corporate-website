/* ── Job type & normalizer ── */

export interface Job {
  id: string;
  title: string;
  organisation: string;
  location: string;
  salary: string;
  posted: string;
  closing: string;
  contractType: string;
  workingPattern: string;
  band?: string;
  speciality?: string;
  region?: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  benefits: string[];
}

interface RawDateValue {
  text?: string | null;
  date?: string | null;
}

interface RawJob {
  id: string;
  country?: string;
  job_title: string;
  organisation: string;
  location?: string;
  job_manager?: string;
  job_role?: string;
  grade?: string;
  specialism?: string;
  sub_specialism?: string;
  shift?: string;
  pay?: { text?: string | null; currency?: string; amount?: number | null; unit?: string | null } | string;
  dates?: { start?: string | RawDateValue | null; end?: string | RawDateValue | null };
  employment_type?: string;
  // Legacy flat fields
  core_rate?: string;
  start_date?: string;
  end_date?: string;
  about_the_role?: string;
  key_responsibilities?: string[];
  requirements?: string[];
  formatted_description?: string;
  benefits?: string[];
}

export function normalizeRawJob(raw: RawJob): Job {
  const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const ordinal = (n: number) => {
    const s = ["th","st","nd","rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
  };
  const prettyDate = (iso: string): string => {
    const d = new Date(iso);
    if (isNaN(d.getTime())) return iso;
    return `${ordinal(d.getDate())} ${MONTHS[d.getMonth()]}`;
  };
  const fmtDate = (d?: string | RawDateValue | null): string => {
    if (!d || d === "NaT") return "Open";
    if (typeof d === "string") return prettyDate(d);
    const raw_val = d.date ?? d.text ?? null;
    if (!raw_val) return "Open";
    return prettyDate(raw_val);
  };

  // Handle pay: could be an object { text, amount, unit } or a legacy string
  let salary = "Competitive";
  if (raw.pay) {
    if (typeof raw.pay === "string") {
      salary = raw.pay;
    } else if (raw.pay.text) {
      salary = raw.pay.unit ? `${raw.pay.text}/${raw.pay.unit}` : raw.pay.text;
    }
  } else if (raw.core_rate) {
    salary = raw.core_rate;
  }

  // Handle dates: could be nested object, string, or legacy flat fields
  const startDate = raw.dates?.start ?? raw.start_date;
  const endDate = raw.dates?.end ?? raw.end_date;

  const isUS = raw.country === "US";
  const originalOrg = raw.organisation;

  // For US jobs, replace client names with "Flexzo" in text fields
  const replaceOrg = (text: string) => {
    if (!isUS || !originalOrg || !text) return text;
    return text.split(originalOrg).join("Flexzo");
  };

  return {
    id: raw.id,
    title: raw.job_title,
    organisation: isUS ? "" : raw.organisation,
    location: raw.location ?? raw.sub_specialism ?? raw.specialism ?? "",
    salary,
    posted: fmtDate(startDate),
    closing: fmtDate(endDate),
    contractType: raw.employment_type && raw.employment_type !== "Not specified"
      ? raw.employment_type
      : raw.shift ?? "",
    workingPattern: raw.shift ?? "",
    band: raw.grade,
    speciality: raw.specialism,
    region: raw.country,
    description: replaceOrg(raw.about_the_role ?? ""),
    responsibilities: (raw.key_responsibilities ?? []).map(replaceOrg),
    requirements: (raw.requirements ?? []).map(replaceOrg),
    benefits: (raw.benefits ?? []).map(replaceOrg),
  };
}

/* ── In-memory cache (persists across renders, cleared on full reload) ── */

const cache: Record<string, Job[]> = {};

/**
 * Lazily load and cache jobs for a given region.
 * JSON files are dynamically imported so the other region's
 * data never hits the bundle until requested.
 */
export async function loadJobsByRegion(region: "uk" | "us"): Promise<Job[]> {
  if (cache[region]) return cache[region];

  if (region === "us") {
    const [raw, staticMod] = await Promise.all([
      import("./jobs_us.json"),
      Promise.resolve({ default: [] as Job[] }), // no static US jobs yet
    ]);
    const normalized = (raw.default as unknown as RawJob[]).map(normalizeRawJob);
    cache[region] = [...normalized, ...staticMod.default];
  } else {
    const [raw, staticMod] = await Promise.all([
      import("./jobs_uk.json"),
      import("./jobs_static_uk"),
    ]);
    const normalized = (raw.default as unknown as RawJob[]).map(normalizeRawJob);
    cache[region] = [...normalized, ...staticMod.staticUkJobs];
  }

  return cache[region];
}

/**
 * Synchronous accessor — returns cached jobs or empty array.
 * Use after `loadJobsByRegion` has resolved, or inside the `useJobs` hook.
 */
export function getJobsByRegion(region: "uk" | "us"): Job[] {
  return cache[region] ?? [];
}

/** Backwards-compat default (empty until loaded) */
export const jobs: Job[] = [];
