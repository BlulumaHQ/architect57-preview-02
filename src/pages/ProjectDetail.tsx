import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import {
  localizedBodyContent,
  localizedCategoryName,
  
  localizedExcerpt,
  localizedKeyFeatures,
  localizedProjectTitle,
  localizedScopeOfWork,
  localizedSeoDescription,
  localizedSeoTitle,
  localizedTagName,
} from "@/utils/projectLocalization";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";

const formatNumber = (value: number, unit: string | null) => {
  const hasDecimals = !Number.isInteger(value);
  const num = value.toLocaleString("en-US", {
    minimumFractionDigits: hasDecimals ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return unit ? `${num} ${unit}` : num;
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const { projects, isLoading, error, refetch } = useArchitect57Projects();
  const { t, lang } = useLang();

  const project = useMemo(
    () => projects.find((p) => p.slug === slug) ?? null,
    [projects, slug]
  );

  const currentIndex = project ? projects.findIndex((p) => p.id === project.id) : -1;
  const prevProject =
    currentIndex >= 0 ? projects[(currentIndex - 1 + projects.length) % projects.length] : null;
  const nextProject =
    currentIndex >= 0 ? projects[(currentIndex + 1) % projects.length] : null;

  const title = project ? localizedProjectTitle(project, lang) : "";

  const metaTitle = project
    ? localizedSeoTitle(project, lang)
    : "Project | Architect 57 無極建築";

  const factualDesc = project
    ? [title, localizedCategoryName(project.category, lang), project.location]
        .filter(Boolean)
        .join(" — ")
    : "";

  const metaDesc = project
    ? localizedSeoDescription(project, lang) || factualDesc
    : "";

  usePageMeta({ title: metaTitle, description: metaDesc });

  if (isLoading) {
    return (
      <main className="pb-16 md:pb-0">
        <section className="relative h-[74svh] min-h-[460px] md:h-[70vh] md:min-h-[500px] bg-muted animate-pulse" />
        <section className="section-padding bg-background">
          <div className="container-wide space-y-4">
            <div className="h-6 w-1/3 bg-muted rounded-sm animate-pulse" />
            <div className="h-4 w-2/3 bg-muted rounded-sm animate-pulse" />
            <div className="h-4 w-1/2 bg-muted rounded-sm animate-pulse" />
          </div>
        </section>
      </main>
    );
  }

  if (error) {
    return (
      <main className="pb-16 md:pb-0">
        <section className="section-padding-lg bg-background pt-40 text-center">
          <div className="container-wide">
            <p className="text-muted-foreground font-light">{t("state.error")}</p>
            <button
              onClick={() => refetch()}
              className="mt-4 font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              {t("state.retry")}
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!project) {
    return (
      <main className="pb-16 md:pb-0">
        <section className="section-padding-lg bg-background pt-40 text-center">
          <div className="container-wide">
            <p className="text-muted-foreground font-light">{t("projects.noResults")}</p>
            <Link
              to="/projects"
              className="mt-4 inline-block font-heading text-[13px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              {t("detail.back")}
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const projectIndex = currentIndex + 1;
  const category = localizedCategoryName(project.category, lang) || null;
  const tag1 = localizedTagName(project.tag1, lang) || null;
  const tag2 = localizedTagName(project.tag2, lang) || null;
  const classification = [category, tag1, tag2].filter(Boolean) as string[];

  const label = (f: { label: string; labelZh: string | null }) =>
    (lang === "zh" && f.labelZh) || f.label;

  /** Non-empty rows only — empty values never produce a label or placeholder. */
  const rows = (
    entries: Array<[string, string | null | undefined]>
  ): { label: string; value: string }[] =>
    entries
      .filter(([, v]) => typeof v === "string" && v.trim().length > 0)
      .map(([l, v]) => ({ label: l, value: (v as string).trim() }));

  // Definition-driven specifications, plus legacy public values no definition covers.
  const specRows = [
    ...project.specifications.map((f) => ({ label: label(f), value: f.value })),
    ...rows([
      [t("detail.projectYear"), project.projectYear],
      [t("detail.architectRole"), project.architectRoles.join(" · ")],
      [t("detail.client"), project.developerOwnerClient],
    ]),
  ].filter(
    (row, i, all) => all.findIndex((r) => r.label === row.label) === i
  );

  // Definition-driven credits (role label + value), plus uncovered legacy roles.
  const dynamicCredits = project.credits.map((f) => ({
    label: label(f),
    value: f.value,
  }));
  const dynamicCreditValues = new Set(dynamicCredits.map((c) => c.value));
  const creditRows = [
    ...dynamicCredits,
    ...rows([
      [t("detail.designArchitect"), project.designArchitect],
      [t("detail.architectOfRecord"), project.architectOfRecord],
      [t("detail.interiorDesigner"), project.interiorDesigner],
      [t("detail.landscapeArchitect"), project.landscapeArchitect],
      [t("detail.structuralEngineer"), project.structuralEngineer],
      [t("detail.mechanicalEngineer"), project.mechanicalEngineer],
      [t("detail.electricalEngineer"), project.electricalEngineer],
      [t("detail.civilEngineer"), project.civilEngineer],
      [t("detail.otherConsultants"), project.otherConsultants],
      [t("detail.generalContractor"), project.generalContractor],
      [t("detail.photographer"), project.photographer],
      [t("detail.awards"), project.awards],
      [t("detail.publications"), project.publications],
      [t("detail.otherCredits"), project.otherCredits],
    ]).filter((r) => !dynamicCreditValues.has(r.value)),
  ].filter((row, i, all) => all.findIndex((r) => r.label === row.label) === i);

  // Deduplicate by URL, and drop the hero/featured image so it is not rendered twice.
  const galleryImages = Array.from(
    new Map(project.images.filter((i) => i.url).map((i) => [i.url, i])).values()
  ).filter((i) => i.url !== project.featuredImageUrl);

  const tagNames = Array.from(
    new Set(
      project.allTags
        .map((tg) => localizedTagName(tg, lang))
        .filter((n): n is string => Boolean(n && n.trim()))
    )
  );

  const toParagraphs = (text: string) =>
    text.split(/\n{2,}|\n/).map((s) => s.trim()).filter(Boolean);

  // Lead = short description; body = full description. Scope of work has its own
  // section, so it is never reused here (avoids duplicated copy).
  const lead = localizedExcerpt(project, lang) || (project.shortSummary ?? "");
  const bodyText = localizedBodyContent(project, lang);
  const bodyParagraphs = toParagraphs(bodyText).filter((p) => p !== lead.trim());
  const scope = localizedScopeOfWork(project, lang);
  const scopeParagraphs = toParagraphs(scope).filter(
    (p) => p !== lead.trim() && !bodyParagraphs.includes(p)
  );
  const keyFeaturesText = localizedKeyFeatures(project, lang);
  const keyFeatureItems = keyFeaturesText
    .split(/;\s*/)
    .map((s) => s.trim())
    .filter(Boolean);
  const hasNarrative = Boolean(lead) || bodyParagraphs.length > 0;

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative h-[74svh] min-h-[460px] md:h-[70vh] md:min-h-[500px] flex items-end overflow-hidden">
        {project.featuredImageUrl ? (
          <img src={project.featuredImageUrl} alt={title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[hsl(var(--surface-dark))]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 container-wide pb-16 md:pb-20">
          <ScrollReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 card-label card-label--on-dark hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {t("detail.back")}
            </Link>
            {(classification.length > 0 || project.location) && (
              <p className="section-eyebrow section-eyebrow--gold-bright mb-3">
                <span className="mr-3">{String(projectIndex).padStart(2, "0")}</span>
                {[classification.join(" / "), project.location]
                  .filter(Boolean)
                  .join(" — ")}
              </p>
            )}
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[68px] font-light leading-[0.95] text-white tracking-tight max-w-3xl">
              {title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery + Project Information */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
            <div className="lg:col-span-8">
              {galleryImages.length > 0 && (
                <>
                  <h2 className="sr-only">{t("detail.gallery")}</h2>
                  <ProjectGallery images={galleryImages} title={title} />
                </>
              )}
            </div>
            <aside className="lg:col-span-4">
              <p className="section-eyebrow mb-5">{t("detail.information")}</p>
              <div className="space-y-5">
                {classification.length > 0 && (
                  <div>
                    <p className="card-label card-label--purple mb-1.5">{t("detail.category")}</p>
                    <p className="text-foreground font-light">
                      {classification.map((c, i) => (
                        <span key={c}>
                          {i > 0 && <span className="text-muted-foreground/50 mx-1.5">/</span>}
                          {c}
                        </span>
                      ))}
                    </p>
                  </div>
                )}

                {project.location && (
                  <div>
                    <p className="card-label card-label--purple mb-1.5">{t("detail.location")}</p>
                    <p className="text-foreground font-light">{project.location}</p>
                  </div>
                )}

                {project.services.length > 0 && (
                  <div>
                    <p className="card-label card-label--purple mb-1.5">{t("detail.services")}</p>
                    <ul className="space-y-1">
                      {project.services
                        .filter((s) => s && s.trim())
                        .map((s) => (
                          <li key={s} className="text-foreground font-light">
                            {s}
                          </li>
                        ))}
                    </ul>
                  </div>
                )}

                {specRows.length > 0 && (
                  <div className="pt-1">
                    <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-6 gap-y-5">
                      {specRows.map((f) => (
                        <div key={f.label}>
                          <dt className="card-label card-label--purple mb-1.5">{f.label}</dt>
                          <dd className="text-foreground font-light">{f.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {creditRows.length > 0 && (
                  <div className="pt-6 mt-1 border-t border-border">
                    <p className="section-eyebrow mb-5">{t("detail.credits")}</p>
                    <dl className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-6 gap-y-5">
                      {creditRows.map((c) => (
                        <div key={c.label}>
                          <dt className="card-label card-label--purple mb-1.5">{c.label}</dt>
                          <dd className="text-foreground font-light leading-[1.7] whitespace-pre-line break-words">
                            {c.value}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Narrative / Scope / Key Features / Tags */}
      {(hasNarrative ||
        scopeParagraphs.length > 0 ||
        keyFeatureItems.length > 0 ||
        tagNames.length > 0) && (
        <section className="section-padding bg-[hsl(var(--surface-warm))]">
          <div className="container-wide">
            <div className="max-w-3xl space-y-10">
              {hasNarrative && (
                <ScrollReveal>
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-5 tracking-tight">
                    {t("detail.overview")}
                  </h2>
                  {lead && (
                    <p className="text-foreground font-light text-[18px] md:text-[20px] leading-[1.7] mb-5">
                      {lead}
                    </p>
                  )}
                  {bodyParagraphs.length > 0 && (
                    <div className="space-y-4 text-muted-foreground font-light leading-[1.8]">
                      {bodyParagraphs.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                  )}
                </ScrollReveal>
              )}

              {scopeParagraphs.length > 0 && (
                <ScrollReveal>
                  <h2 className="card-label card-label--purple mb-3">{t("detail.scopeOfWork")}</h2>
                  <div className="space-y-3 text-muted-foreground font-light leading-[1.8]">
                    {scopeParagraphs.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                </ScrollReveal>
              )}

              {keyFeatureItems.length > 0 && (
                <ScrollReveal>
                  <h2 className="card-label card-label--purple mb-3">{t("detail.keyFeatures")}</h2>
                  {keyFeatureItems.length > 1 ? (
                    <ul className="space-y-2 text-muted-foreground font-light leading-[1.8]">
                      {keyFeatureItems.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="text-[#714C90] shrink-0">—</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground font-light leading-[1.8] whitespace-pre-line">
                      {keyFeatureItems[0]}
                    </p>
                  )}
                </ScrollReveal>
              )}


              {tagNames.length > 0 && (
                <ScrollReveal>
                  <h2 className="card-label card-label--purple mb-3">{t("detail.tags")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {tagNames.map((name) => (
                      <span
                        key={name}
                        className="px-3 py-1 rounded-full border border-foreground/15 text-[13px] font-light text-muted-foreground"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </ScrollReveal>
              )}
            </div>
          </div>
        </section>
      )}


      {/* Prev / Next */}
      {prevProject && nextProject && (
        <section className="bg-[hsl(var(--surface-dark))]">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <Link to={`/projects/${prevProject.slug}`} className="group block">
              <div className="container-wide py-12 md:py-16 flex items-center gap-4">
                <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
                <div>
                  <p className="section-eyebrow section-eyebrow--on-dark mb-2">{t("detail.previous")}</p>
                  <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                    {localizedProjectTitle(prevProject, lang)}
                  </h3>
                </div>
              </div>
            </Link>
            <Link to={`/projects/${nextProject.slug}`} className="group block">
              <div className="container-wide py-12 md:py-16 flex items-center justify-end gap-4 text-right">
                <div>
                  <p className="section-eyebrow section-eyebrow--on-dark mb-2">{t("detail.next")}</p>
                  <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                    {localizedProjectTitle(nextProject, lang)}
                  </h3>
                </div>
                <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
              </div>
            </Link>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProjectDetail;
