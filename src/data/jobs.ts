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

interface RawJob {
  id: string;
  job_title: string;
  organisation: string;
  job_manager?: string;
  job_role?: string;
  grade?: string;
  specialism?: string;
  sub_specialism?: string;
  shift?: string;
  core_rate?: string;
  start_date?: string;
  end_date?: string;
  about_the_role?: string;
  key_responsibilities?: string[];
  requirements?: string[];
  formatted_description?: string;
}

export function normalizeRawJob(raw: RawJob): Job {
  const fmt = (d?: string) => (!d || d === "NaT" ? "Open" : d);
  return {
    id: raw.id,
    title: raw.job_title,
    organisation: raw.organisation,
    location: "Not specified",
    salary: raw.core_rate ?? "Competitive",
    posted: fmt(raw.start_date),
    closing: fmt(raw.end_date),
    contractType: raw.shift ?? "Not specified",
    workingPattern: raw.shift ?? "Not specified",
    band: raw.grade,
    speciality: raw.specialism,
    description: raw.about_the_role ?? "",
    responsibilities: raw.key_responsibilities ?? [],
    requirements: raw.requirements ?? [],
    benefits: [],
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
