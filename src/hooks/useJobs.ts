import { useState, useEffect } from "react";
import { useRegion } from "@/hooks/useRegion";
import { loadJobsByRegion, getJobsByRegion, type Job } from "@/data/jobs";

interface UseJobsReturn {
  jobs: Job[];
  loading: boolean;
}

/**
 * Lazy-loads the job data for the current region with in-memory caching.
 * On first call for a region the JSON is dynamically imported; subsequent
 * calls (even across components) return instantly from cache.
 */
export function useJobs(): UseJobsReturn {
  const { region } = useRegion();
  const cached = getJobsByRegion(region);
  const [jobs, setJobs] = useState<Job[]>(cached);
  const [loading, setLoading] = useState(cached.length === 0);

  useEffect(() => {
    let cancelled = false;
    const existing = getJobsByRegion(region);
    if (existing.length > 0) {
      setJobs(existing);
      setLoading(false);
      return;
    }

    setLoading(true);
    loadJobsByRegion(region).then((loaded) => {
      if (!cancelled) {
        setJobs(loaded);
        setLoading(false);
      }
    });

    return () => { cancelled = true; };
  }, [region]);

  return { jobs, loading };
}
