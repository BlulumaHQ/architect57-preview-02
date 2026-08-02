import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import {
  projectArea,
  type PublicProject,
  type PublicProjectCategory,
  type PublicProjectTag,
} from "@/types/project";
import {
  localizedCategoryName,
  localizedProjectTitle,
  localizedTagName,
} from "@/utils/projectLocalization";
import { useLang } from "@/contexts/LangContext";

export interface ProjectsViewProps {
  /** Small eyebrow label above the hero heading. */
  heroLabel: string;
  /** Hero H1. */
  heroTitle: string;
  /** Hero supporting copy. */
  heroDescription: string;
  projects: PublicProject[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
  /** Category / Tag 1 / Tag 2 filter bars — only used by /projects. */
  showFilters?: boolean;
  /** Heading above the grid when filters are hidden. */
  gridHeading?: string;
}

/**
 * The one and only Projects presentation component.
 * Used by both /projects and the preserved legacy portfolio URLs so the
 * design, loading/error/empty states, cards, animations and links stay identical.
 */
const ProjectsView = ({
  heroLabel,
  heroTitle,
  heroDescription,
  projects,
  isLoading,
  error,
  refetch,
  showFilters = true,
  gridHeading,
}: ProjectsViewProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t, lang } = useLang();

  const [activeCategory, setActiveCategory] = useState(
    () => searchParams.get("category") ?? "all"
  );
  const [activeTag1Slug, setActiveTag1Slug] = useState<string | null>(
    () => searchParams.get("tag1")
  );
  const [activeTag2Slug, setActiveTag2Slug] = useState<string | null>(
    () => searchParams.get("tag2")
  );

  const categories = useMemo(() => {
    const map = new Map<string, PublicProjectCategory>();
    projects.forEach((p) => {
      if (p.category && p.category.isActive) map.set(p.category.id, p.category);
    });
    return Array.from(map.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );
  }, [projects]);

  const categoryFiltered = useMemo(() => {
    if (activeCategory === "all") return projects;
    return projects.filter((p) => p.category?.slug === activeCategory);
  }, [projects, activeCategory]);

  const tag1Options = useMemo(() => {
    if (activeCategory === "all") return [];
    const map = new Map<string, PublicProjectTag>();
    categoryFiltered.forEach((p) => {
      if (p.tag1 && p.tag1.isActive) map.set(p.tag1.id, p.tag1);
    });
    return Array.from(map.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );
  }, [categoryFiltered, activeCategory]);

  const activeTag1 = useMemo(
    () => tag1Options.find((tg) => tg.slug === activeTag1Slug) ?? null,
    [tag1Options, activeTag1Slug]
  );

  const tag1Filtered = useMemo(() => {
    if (!activeTag1) return categoryFiltered;
    return categoryFiltered.filter((p) => p.tag1?.id === activeTag1.id);
  }, [categoryFiltered, activeTag1]);

  const tag2Options = useMemo(() => {
    if (!activeTag1) return [];
    const map = new Map<string, PublicProjectTag>();
    tag1Filtered.forEach((p) => {
      const tg = p.tag2;
      if (tg && tg.isActive && tg.parentTagId === activeTag1.id) map.set(tg.id, tg);
    });
    return Array.from(map.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );
  }, [tag1Filtered, activeTag1]);

  const activeTag2 = useMemo(
    () => tag2Options.find((tg) => tg.slug === activeTag2Slug) ?? null,
    [tag2Options, activeTag2Slug]
  );

  const filteredProjects = useMemo(() => {
    if (!showFilters) return projects;
    if (!activeTag2) return tag1Filtered;
    return tag1Filtered.filter((p) => p.tag2?.id === activeTag2.id);
  }, [showFilters, projects, tag1Filtered, activeTag2]);

  // Keep optional query-string state in sync (no route change).
  useEffect(() => {
    if (!showFilters) return;
    const next = new URLSearchParams(searchParams);
    const set = (key: string, value: string | null) => {
      if (value) next.set(key, value);
      else next.delete(key);
    };
    set("category", activeCategory === "all" ? null : activeCategory);
    set("tag1", activeTag1?.slug ?? null);
    set("tag2", activeTag2?.slug ?? null);
    if (next.toString() !== searchParams.toString()) {
      setSearchParams(next, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showFilters, activeCategory, activeTag1, activeTag2]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveTag1Slug(null);
    setActiveTag2Slug(null);
  };

  const handleTag1Change = (slug: string | null) => {
    setActiveTag1Slug(slug);
    setActiveTag2Slug(null);
  };

  const activeCategoryLabel =
    activeCategory === "all"
      ? t("projects.allProjects")
      : localizedCategoryName(
          categories.find((c) => c.slug === activeCategory) ?? null,
          lang
        ) || t("projects.allProjects");

  const filterRowClass =
    "flex flex-wrap items-center gap-2 md:gap-2.5 overflow-visible";

  const categoryButtonClass = (active: boolean) =>
    `font-heading text-[13px] font-semibold tracking-[0.06em] uppercase px-4 md:px-5 py-2.5 rounded-sm transition-all duration-300 active:scale-[0.97] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      active
        ? "bg-foreground text-background"
        : "text-foreground/80 hover:text-foreground hover:bg-muted"
    }`;

  const tagButtonClass = (active: boolean) =>
    `text-[12.5px] font-semibold tracking-[0.05em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 active:scale-[0.97] border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
      active
        ? "border-foreground/40 bg-foreground/10 text-foreground"
        : "border-border text-foreground/75 hover:text-foreground hover:border-foreground/40"
    }`;

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-24 md:pt-32 pb-10 md:pb-14">
        <div className="container-wide">
          <ScrollReveal>
            <p className="section-eyebrow section-eyebrow--gold-bright mb-3">
              {heroLabel}
            </p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              {heroTitle}
            </h1>
            <p className="text-white/90 font-light mt-5 max-w-xl leading-relaxed">
              {heroDescription}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {error ? (
        <section className="py-16 md:py-20 bg-background">
          <div className="container-wide text-center">
            <p className="text-muted-foreground font-light">{t("state.error")}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              {t("state.retry")}
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* Filters */}
          {showFilters && (
            <section className="bg-background border-b border-border">
              <div className="container-wide py-4 md:py-5 space-y-3">
                {/* Category */}
                <div className={filterRowClass} role="group" aria-label={t("projects.label")}>
                  {[
                    { id: "all", slug: "all", label: t("cat.all") },
                    ...categories.map((c) => ({
                      id: c.id,
                      slug: c.slug,
                      label: localizedCategoryName(c, lang) || c.name,
                    })),
                  ].map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      aria-pressed={activeCategory === cat.slug}
                      onClick={() => handleCategoryChange(cat.slug)}
                      className={categoryButtonClass(activeCategory === cat.slug)}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>

                {/* Tag 1 — only after a category is chosen */}
                {activeCategory !== "all" && tag1Options.length > 0 && (
                  <div className={filterRowClass} role="group" aria-label={t("projects.tags")}>
                    <span className="card-label card-label--muted mr-1">
                      {t("projects.tags")}
                    </span>
                    <button
                      type="button"
                      aria-pressed={!activeTag1}
                      onClick={() => handleTag1Change(null)}
                      className={tagButtonClass(!activeTag1)}
                    >
                      {t("cat.all")}
                    </button>
                    {tag1Options.map((tg) => (
                      <button
                        key={tg.id}
                        type="button"
                        aria-pressed={activeTag1?.id === tg.id}
                        onClick={() => handleTag1Change(tg.slug)}
                        className={tagButtonClass(activeTag1?.id === tg.id)}
                      >
                        {localizedTagName(tg, lang) || tg.name}
                      </button>
                    ))}
                  </div>
                )}

                {/* Tag 2 */}
                {activeTag1 && tag2Options.length > 0 && (
                  <div className={filterRowClass} role="group" aria-label={t("projects.tag2")}>
                    <span className="card-label card-label--muted mr-1">
                      {t("projects.tag2")}
                    </span>
                    <button
                      type="button"
                      aria-pressed={!activeTag2}
                      onClick={() => setActiveTag2Slug(null)}
                      className={tagButtonClass(!activeTag2)}
                    >
                      {t("cat.all")}
                    </button>
                    {tag2Options.map((tg) => (
                      <button
                        key={tg.id}
                        type="button"
                        aria-pressed={activeTag2?.id === tg.id}
                        onClick={() => setActiveTag2Slug(tg.slug)}
                        className={tagButtonClass(activeTag2?.id === tg.id)}
                      >
                        {localizedTagName(tg, lang) || tg.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* All Projects Grid */}
          <section className="py-10 md:py-16 bg-background">
            <div className="container-wide">
              <ScrollReveal>
                <div className="flex items-end justify-between mb-5 md:mb-6">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground tracking-tight">
                    {showFilters ? (
                      <>
                        {activeCategoryLabel}
                        {activeTag1 && (
                          <span className="text-muted-foreground ml-2">
                            / {localizedTagName(activeTag1, lang)}
                          </span>
                        )}
                        {activeTag2 && (
                          <span className="text-muted-foreground ml-2">
                            / {localizedTagName(activeTag2, lang)}
                          </span>
                        )}
                      </>
                    ) : (
                      gridHeading ?? t("projects.allProjects")
                    )}
                  </h2>
                  <span
                    className="text-muted-foreground font-light text-sm"
                    aria-live="polite"
                  >
                    {filteredProjects.length}{" "}
                    {filteredProjects.length !== 1
                      ? t("projects.projects")
                      : t("projects.project")}
                  </span>
                </div>
              </ScrollReveal>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>
                      <div className="w-full aspect-[4/3] rounded-sm bg-muted animate-pulse" />
                      <div className="mt-3 h-4 w-2/3 rounded-sm bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {filteredProjects.map((p, i) => (
                    <ScrollReveal key={p.id} delay={i * 40}>
                      <Link to={`/projects/${p.slug}`} className="group block">
                        <ProjectCard project={p} />
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-14">
                  <p className="text-muted-foreground font-light">
                    {projects.length === 0 ? t("state.empty") : t("projects.noResults")}
                  </p>
                  {showFilters && projects.length > 0 && (
                    <button
                      onClick={() => handleCategoryChange("all")}
                      className="mt-4 font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
                    >
                      {t("projects.viewAll")}
                    </button>
                  )}
                  {!showFilters && (
                    <Link
                      to="/projects"
                      className="mt-4 inline-block font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
                    >
                      {t("projects.viewAll")}
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="bg-[hsl(var(--surface-dark))] py-12 md:py-20 text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-5 tracking-tight">
              {t("projects.ctaTitle")}
            </h2>
            <p className="text-white/90 font-light max-w-lg mx-auto mb-7 leading-relaxed">
              {t("projects.ctaDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
            >
              {t("projects.ctaBtn")} <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

// ── Project Card Component ─────────────────────────────

const ProjectCard = ({ project }: { project: PublicProject }) => {
  const { t, lang } = useLang();
  const name = localizedProjectTitle(project, lang);
  const area = projectArea(project);
  return (
    <>
      <div className="overflow-hidden rounded-sm relative">
        {project.featuredImageUrl ? (
          <img src={project.featuredImageUrl} alt={name} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
        ) : (
          <div className="w-full aspect-[4/3] bg-muted" />
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
          <span className="font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            {t("projects.seeDetails")}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span className="card-label card-label--purple">
          {localizedCategoryName(project.category, lang)}
        </span>
        <h3 className="font-heading text-[15px] font-light text-foreground mt-0.5 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300 leading-snug">
          {name}
        </h3>
        {project.location && (
          <p className="text-muted-foreground text-[13px] font-normal mt-1 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {project.location}
          </p>
        )}
        {area && (
          <p className="text-muted-foreground text-[12px] font-normal mt-0.5">{area}</p>
        )}
      </div>
    </>
  );
};

export default ProjectsView;
