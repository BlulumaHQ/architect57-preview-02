import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";
import ProjectsView from "@/components/projects/ProjectsView";

const Projects = () => {
  const { projects, isLoading, error, refetch } = useArchitect57Projects();
  const { t, lang } = useLang();

  usePageMeta({
    title: "Projects | Architect 57 無極建築",
    description:
      lang === "zh"
        ? "瀏覽 Architect 57 無極建築的住宅、商業、工業、機構、社區、文化、室內及規劃專案。"
        : "Explore architectural projects by Architect 57 無極建築 across residential, commercial, industrial, institutional, community, cultural, interior, and planning work.",
    path: "/projects",
  });

  return (
    <ProjectsView
      heroLabel={t("projects.label")}
      heroTitle={t("projects.title")}
      heroDescription={t("projects.desc")}
      projects={projects}
      isLoading={isLoading}
      error={error}
      refetch={refetch}
      showFeatured
      showFilters
    />
  );
};

export default Projects;
