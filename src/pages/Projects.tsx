import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
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
import usePageMeta from "@/hooks/usePageMeta";

const Projects = () => {
  const { projects, isLoading, error, refetch } = useArchitect57Projects();
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag1, setActiveTag1] = useState<string | null>(null);
  const [activeTag2, setActiveTag2] = useState<string | null>(null);
  const { t, lang } = useLang();

  usePageMeta({
    title: "Projects | Architect 57 無極建築",
    description:
      lang === "zh"
        ? "瀏覽 Architect 57 無極建築的住宅、商業、工業、機構、社區、文化、室內及規劃專案。"
        : "Explore architectural projects by Architect 57 無極建築 across residential, commercial, industrial, institutional, community, cultural, interior, and planning work.",
  });

  // Signature Projects — prefer CMS is_featured, fill by sort order.
  const topFeatured = useMemo(() => {
    const featured = projects
      .filter((p) => p.isFeatured)
      .sort((a, b) => a.sortOrder - b.sortOrder)
      .slice(0, 3);
    const picks = [...featured];
    for (const p of projects) {
      if (picks.length >= 3) break;
      if (!picks.some((x) => x.id === p.id)) picks.push(p);
    }
    return picks.slice(0, 3);
  }, [projects]);

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
    const map = new Map<string, PublicProjectTag>();
    categoryFiltered.forEach((p) => {
      if (p.tag1 && p.tag1.isActive) map.set(p.tag1.id, p.tag1);
    });
    return Array.from(map.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );
  }, [categoryFiltered]);

  const tag1Filtered = useMemo(() => {
    if (!activeTag1) return categoryFiltered;
    return categoryFiltered.filter((p) => p.tag1?.id === activeTag1);
  }, [categoryFiltered, activeTag1]);

  const tag2Options = useMemo(() => {
    if (!activeTag1) return [];
    const map = new Map<string, PublicProjectTag>();
    tag1Filtered.forEach((p) => {
      const tg = p.tag2;
      if (tg && tg.isActive && tg.parentTagId === activeTag1) map.set(tg.id, tg);
    });
    return Array.from(map.values()).sort(
      (a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name)
    );
  }, [tag1Filtered, activeTag1]);

  const filteredProjects = useMemo(() => {
    if (!activeTag2) return tag1Filtered;
    return tag1Filtered.filter((p) => p.tag2?.id === activeTag2);
  }, [tag1Filtered, activeTag2]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveTag1(null);
    setActiveTag2(null);
  };

  const handleTag1Change = (id: string | null) => {
    setActiveTag1(id);
    setActiveTag2(null);
  };

  const activeCategoryLabel =
    activeCategory === "all"
      ? t("projects.allProjects")
      : localizedCategoryName(
          categories.find((c) => c.slug === activeCategory) ?? null,
          lang
        ) || t("projects.allProjects");

  const tagButtonClass = (active: boolean) =>
    `text-[10px] font-light tracking-[0.1em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 active:scale-[0.97] whitespace-nowrap border ${
      active
        ? "border-foreground/30 bg-foreground/5 text-foreground"
        : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
    }`;

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">
              {t("projects.label")}
            </p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              {t("projects.title")}
            </h1>
            <p className="text-white/50 font-light mt-6 max-w-xl leading-relaxed">
              {t("projects.desc")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {error ? (
        <section className="section-padding-lg bg-background">
          <div className="container-wide text-center py-20">
            <p className="text-muted-foreground font-light">{t("state.error")}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              {t("state.retry")}
            </button>
          </div>
        </section>
      ) : (
        <>
          {/* Featured */}
          <section className="section-padding-lg bg-background">
            <div className="container-wide">
              <ScrollReveal>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-3">
                  {t("projects.featuredLabel")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-14 tracking-tight">
                  {t("projects.featuredTitle")}
                </h2>
              </ScrollReveal>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {isLoading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i}>
                        <div className="w-full aspect-[4/3] rounded-sm bg-muted animate-pulse" />
                      </div>
                    ))
                  : topFeatured.map((p, i) => (
                      <ScrollReveal key={p.id} delay={i * 100}>
                        <Link to={`/projects/${p.slug}`} className="group block">
                          <div className="overflow-hidden rounded-sm">
                            {p.featuredImageUrl ? (
                              <img src={p.featuredImageUrl} alt={localizedProjectTitle(p, lang)} className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                            ) : (
                              <div className="w-full aspect-[4/3] bg-muted" />
                            )}
                          </div>
                          <div className="mt-4">
                            <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
                              {localizedCategoryName(p.category, lang)}
                            </span>
                            <h3 className="font-heading text-xl font-light text-foreground mt-1 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                              {localizedProjectTitle(p, lang)}
                            </h3>
                            {p.location && (
                              <p className="text-muted-foreground/70 text-sm font-light mt-1 flex items-center gap-1.5">
                                <MapPin className="w-3 h-3" />
                                {p.location}
                              </p>
                            )}
                          </div>
                        </Link>
                      </ScrollReveal>
                    ))}
              </div>
            </div>
          </section>

          {/* Divider */}
          <div className="container-wide">
            <div className="h-px bg-border" />
          </div>

          {/* Category Filter */}
          <section className="bg-background sticky top-[72px] z-30 border-b border-border">
            <div className="container-wide py-4 overflow-x-auto scrollbar-hide">
              <div className="flex gap-2 min-w-max">
                {[{ id: "all", slug: "all", label: t("cat.all") }, ...categories.map((c) => ({ id: c.id, slug: c.slug, label: localizedCategoryName(c, lang) || c.name }))].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.slug)}
                    className={`font-heading text-[11px] font-light tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 active:scale-[0.97] whitespace-nowrap ${
                      activeCategory === cat.slug
                        ? "bg-foreground text-background"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Tag 1 Filter */}
          {tag1Options.length > 1 && (
            <section className="bg-background border-b border-border/50">
              <div className="container-wide py-3 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1.5 min-w-max items-center">
                  <span className="font-heading text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground/50 mr-2">{t("projects.tags")}</span>
                  <button onClick={() => handleTag1Change(null)} className={tagButtonClass(!activeTag1)}>
                    {t("cat.all")}
                  </button>
                  {tag1Options.map((tg) => (
                    <button key={tg.id} onClick={() => handleTag1Change(tg.id)} className={tagButtonClass(activeTag1 === tg.id)}>
                      {localizedTagName(tg, lang) || tg.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Tag 2 Filter */}
          {activeTag1 && tag2Options.length > 0 && (
            <section className="bg-background border-b border-border/50">
              <div className="container-wide py-3 overflow-x-auto scrollbar-hide">
                <div className="flex gap-1.5 min-w-max items-center">
                  <span className="font-heading text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground/50 mr-2">{t("projects.tag2")}</span>
                  <button onClick={() => setActiveTag2(null)} className={tagButtonClass(!activeTag2)}>
                    {t("cat.all")}
                  </button>
                  {tag2Options.map((tg) => (
                    <button key={tg.id} onClick={() => setActiveTag2(tg.id)} className={tagButtonClass(activeTag2 === tg.id)}>
                      {localizedTagName(tg, lang) || tg.name}
                    </button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* All Projects Grid */}
          <section className="section-padding-lg bg-background">
            <div className="container-wide">
              <ScrollReveal>
                <div className="flex items-end justify-between mb-10">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground tracking-tight">
                    {activeCategoryLabel}
                    {activeTag1 && (
                      <span className="text-muted-foreground ml-2">
                        / {localizedTagName(tag1Options.find((tg) => tg.id === activeTag1) ?? null, lang)}
                      </span>
                    )}
                    {activeTag2 && (
                      <span className="text-muted-foreground ml-2">
                        / {localizedTagName(tag2Options.find((tg) => tg.id === activeTag2) ?? null, lang)}
                      </span>
                    )}
                  </h2>
                  <span className="text-muted-foreground font-light text-sm">
                    {filteredProjects.length} {filteredProjects.length !== 1 ? t("projects.projects") : t("projects.project")}
                  </span>
                </div>
              </ScrollReveal>

              {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i}>
                      <div className="w-full aspect-[4/3] rounded-sm bg-muted animate-pulse" />
                      <div className="mt-3 h-4 w-2/3 rounded-sm bg-muted animate-pulse" />
                    </div>
                  ))}
                </div>
              ) : filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {filteredProjects.map((p, i) => (
                    <ScrollReveal key={p.id} delay={i * 40}>
                      <Link to={`/projects/${p.slug}`} className="group block">
                        <ProjectCard project={p} />
                      </Link>
                    </ScrollReveal>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-muted-foreground font-light">
                    {projects.length === 0 ? t("state.empty") : t("projects.noResults")}
                  </p>
                  {projects.length > 0 && (
                    <button
                      onClick={() => { setActiveCategory("all"); setActiveTag1(null); setActiveTag2(null); }}
                      className="mt-4 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
                    >
                      {t("projects.viewAll")}
                    </button>
                  )}
                </div>
              )}
            </div>
          </section>
        </>
      )}

      {/* CTA */}
      <section className="bg-[hsl(var(--surface-dark))] py-24 md:py-32 text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              {t("projects.ctaTitle")}
            </h2>
            <p className="text-white/50 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              {t("projects.ctaDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
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
          <span className="font-heading text-[13px] font-light tracking-[0.15em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
            {t("projects.seeDetails")}
          </span>
        </div>
      </div>
      <div className="mt-3">
        <span className="font-heading text-[10px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
          {localizedCategoryName(project.category, lang)}
        </span>
        <h3 className="font-heading text-[15px] font-light text-foreground mt-0.5 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300 leading-snug">
          {name}
        </h3>
        {project.location && (
          <p className="text-muted-foreground/60 text-xs font-light mt-1 flex items-center gap-1">
            <MapPin className="w-2.5 h-2.5" />
            {project.location}
          </p>
        )}
        {area && (
          <p className="text-muted-foreground/50 text-[11px] font-light mt-0.5">{area}</p>
        )}
      </div>
    </>
  );
};

export default Projects;
