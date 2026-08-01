import { useQuery } from "@tanstack/react-query";
import { fetchArchitect57Projects } from "@/services/projects";
import type { PublicProject } from "@/types/project";

export const architect57ProjectsKey = ["architect57", "published-projects"] as const;

export function useArchitect57Projects() {
  const query = useQuery<PublicProject[]>({
    queryKey: architect57ProjectsKey,
    queryFn: fetchArchitect57Projects,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (query.error && import.meta.env.DEV) {
    console.error("[Architect57] Failed to load projects:", query.error);
  }

  return {
    projects: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error as Error | null,
    refetch: query.refetch,
  };
}

/** Unbiased Fisher–Yates shuffle. */
export function fisherYatesShuffle<T>(items: T[]): T[] {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
