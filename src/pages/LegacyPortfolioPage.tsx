import { useMemo } from "react";
import ProjectsView from "@/components/projects/ProjectsView";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import usePageMeta from "@/hooks/usePageMeta";
import { useLang } from "@/contexts/LangContext";
import NotFound from "@/pages/NotFound";
import {
  getLegacyPortfolioRoute,
  normalizeTaxonomy,
  type LegacyPortfolioFilter,
} from "@/config/legacyPortfolioRoutes";
import {
  localizedCategoryName,
  localizedTagName,
} from "@/utils/projectLocalization";
import type { PublicProject } from "@/types/project";

const matchesFilter = (p: PublicProject, f: LegacyPortfolioFilter): boolean => {
  if (f.category && normalizeTaxonomy(p.category?.name) !== normalizeTaxonomy(f.category)) {
    return false;
  }
  if (f.tag1 && normalizeTaxonomy(p.tag1?.name) !== normalizeTaxonomy(f.tag1)) {
    return false;
  }
  if (f.tag2 && normalizeTaxonomy(p.tag2?.name) !== normalizeTaxonomy(f.tag2)) {
    return false;
  }
  return true;
};

interface LegacyPortfolioPageProps {
  routeKey: string;
}

/**
 * Renders a preserved legacy Architect 57 portfolio URL as a real page using
 * the exact same CMS-powered Projects UI, filtered by its configured taxonomy.
 */
const LegacyPortfolioPage = ({ routeKey }: LegacyPortfolioPageProps) => {
  const route = getLegacyPortfolioRoute(routeKey);
  const { projects, isLoading, error, refetch } = useArchitect57Projects();
  const { lang } = useLang();

  const title = route ? (lang === "zh" ? route.titleZh : route.titleEn) : "";
  const description = route
    ? lang === "zh"
      ? route.descriptionZh
      : route.descriptionEn
    : "";

  usePageMeta({
    title: title || "Projects | Architect 57 無極建築",
    description,
    path: route?.path ?? "/projects",
  });

  const filtered = useMemo(() => {
    if (!route) return [];
    return projects.filter((p) => route.filters.some((f) => matchesFilter(p, f)));
  }, [projects, route]);

  // Localized eyebrow built only from CMS taxonomy names present in the config.
  const heroLabel = useMemo(() => {
    if (!route) return "";
    const first = route.filters[0];
    const sample = filtered[0];
    if (sample) {
      const cat = localizedCategoryName(sample.category, lang);
      const tag = localizedTagName(sample.tag2 ?? sample.tag1, lang);
      return [cat, tag].filter(Boolean).join(" / ");
    }
    return [first?.category, first?.tag2 ?? first?.tag1].filter(Boolean).join(" / ");
  }, [route, filtered, lang]);

  if (!route) return <NotFound />;

  const heading = title.split("|")[0].trim();

  return (
    <ProjectsView
      heroLabel={heroLabel}
      heroTitle={heading}
      heroDescription={description}
      projects={filtered}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      showFilters={false}
      gridHeading={heading}
    />
  );
};

export default LegacyPortfolioPage;
