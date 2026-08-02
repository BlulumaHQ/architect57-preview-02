import { useMemo } from "react";
import { useParams } from "react-router-dom";
import ProjectsView from "@/components/projects/ProjectsView";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";
import { localizedCategoryName } from "@/utils/projectLocalization";
import { normalizeCategoryKey } from "@/components/home/CategoryShowcase";

/**
 * /projects/collection/:slug — a single CMS category collection.
 * Uses the exact same Projects UI so both languages share one implementation.
 */
const CollectionGallery = () => {
  const { slug } = useParams();
  const { projects, isLoading, error, refetch } = useArchitect57Projects();
  const { t, lang } = useLang();

  const key = normalizeCategoryKey(slug);

  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          p.category &&
          (normalizeCategoryKey(p.category.slug) === key ||
            normalizeCategoryKey(p.category.name) === key)
      ),
    [projects, key]
  );

  const category = filtered[0]?.category ?? null;
  const heading =
    localizedCategoryName(category, lang) || (slug ?? "").replace(/-/g, " ");

  const description =
    lang === "zh"
      ? `瀏覽 Architect 57 無極建築的${heading}類別專案。`
      : `Explore ${heading} projects by Architect 57 Inc.`;

  usePageMeta({
    title: `${heading} | Architect 57 無極建築`,
    description,
    path: `/projects/collection/${slug ?? ""}`,
  });

  return (
    <ProjectsView
      heroLabel={t("projects.label")}
      heroTitle={heading}
      heroDescription={description}
      projects={filtered}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      showFeatured={false}
      showFilters={false}
      gridHeading={heading}
    />
  );
};

export default CollectionGallery;
