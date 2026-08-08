import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import ProjectGallery from "@/components/projects/ProjectGallery";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import {
  localizedCategoryName,
  localizedDescription,
  localizedImageAlt,
  localizedProjectTitle,
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
  const overview = localizedDescription(project, lang);
  const category = localizedCategoryName(project.category, lang) || null;

  const facts: { label: string; value: string }[] = [];
  const push = (label: string, value: string | null | undefined) => {
    if (value && String(value).trim()) facts.push({ label, value: String(value) });
  };

  push(t("detail.category"), category);
  push(t("detail.location"), project.location);
  if (project.architectRoles.length > 0)
    push(t("detail.architectRole"), project.architectRoles.join(" · "));
  push(t("detail.client"), project.developerOwnerClient);
  push(t("detail.projectStatus"), project.projectStatus);
  push(t("detail.projectYear"), project.projectYear);
  push(t("detail.yearStarted"), project.yearStarted);
  push(t("detail.yearCompleted"), project.yearCompleted);
  if (project.floorAreaValue !== null)
    push(t("detail.floorArea"), formatNumber(project.floorAreaValue, project.floorAreaUnit));
  if (project.siteAreaValue !== null)
    push(t("detail.siteArea"), formatNumber(project.siteAreaValue, project.siteAreaUnit));
  if (project.unitsCount !== null) push(t("detail.units"), String(project.unitsCount));
  if (project.storeysCount !== null) push(t("detail.storeys"), String(project.storeysCount));
  if (project.parkingSpaces !== null) push(t("detail.parking"), String(project.parkingSpaces));
  push(t("detail.budget"), project.constructionBudget);
  if (project.services.length > 0) push(t("detail.services"), project.services.join(", "));
  push(t("detail.designArchitect"), project.designArchitect);
  push(t("detail.architectOfRecord"), project.architectOfRecord);
  push(t("detail.interiorDesigner"), project.interiorDesigner);
  push(t("detail.landscapeArchitect"), project.landscapeArchitect);
  push(t("detail.structuralEngineer"), project.structuralEngineer);
  push(t("detail.mechanicalEngineer"), project.mechanicalEngineer);
  push(t("detail.electricalEngineer"), project.electricalEngineer);
  push(t("detail.civilEngineer"), project.civilEngineer);
  push(t("detail.otherConsultants"), project.otherConsultants);
  push(t("detail.generalContractor"), project.generalContractor);
  push(t("detail.photographer"), project.photographer);
  push(t("detail.awards"), project.awards);
  push(t("detail.publications"), project.publications);

  const galleryImages = Array.from(
    new Map(project.images.filter((i) => i.url).map((i) => [i.url, i])).values()
  );

  const tagNames = Array.from(
    new Set(
      project.allTags
        .map((tg) => localizedTagName(tg, lang))
        .filter((n): n is string => Boolean(n && n.trim()))
    )
  );

  const overviewParagraphs = overview
    ? overview.split(/\n{2,}|\n/).map((s) => s.trim()).filter(Boolean)
    : [];

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
            <p className="section-eyebrow section-eyebrow--gold-bright mb-3">
              <span className="mr-3">{String(projectIndex).padStart(2, "0")}</span>
              {category ?? "—"} — {project.location || "—"}
            </p>
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
                {facts.map((f) => (
                  <div key={f.label}>
                    <p className="card-label card-label--purple mb-1.5">{f.label}</p>
                    <p className="text-foreground font-light">{f.value}</p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Overview / Other Credits / Tags */}
      <section className="section-padding bg-[hsl(var(--surface-warm))]">
        <div className="container-wide">
          <div className="max-w-3xl space-y-10">
            {overviewParagraphs.length > 0 && (
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-5 tracking-tight">
                  {t("detail.overview")}
                </h2>
                <div className="space-y-4 text-muted-foreground font-light leading-[1.8]">
                  {overviewParagraphs.map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </ScrollReveal>
            )}

            {project.otherCredits && (
              <ScrollReveal>
                <h2 className="card-label card-label--purple mb-2">{t("detail.otherCredits")}</h2>
                <p className="text-foreground font-light leading-[1.8] whitespace-pre-line">
                  {project.otherCredits}
                </p>
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
