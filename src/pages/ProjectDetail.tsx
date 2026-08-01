import { useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
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
        <section className="relative h-[70vh] min-h-[500px] bg-muted animate-pulse" />
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
              className="mt-4 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
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
              className="mt-4 inline-block font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
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
  push(t("detail.tag1"), localizedTagName(project.tag1, lang));
  push(t("detail.tag2"), localizedTagName(project.tag2, lang));
  push(t("detail.location"), project.location);
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
  push(t("detail.role"), project.role);
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
  push(t("detail.developer"), project.developerOwnerClient);
  push(t("detail.photographer"), project.photographer);
  push(t("detail.otherCredits"), project.otherCredits);
  push(t("detail.awards"), project.awards);
  push(t("detail.publications"), project.publications);

  const overviewParagraphs = overview
    ? overview.split(/\n{2,}|\n/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
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
              className="inline-flex items-center gap-2 font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> {t("detail.back")}
            </Link>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-3">
              <span className="mr-3">{String(projectIndex).padStart(2, "0")}</span>
              {category ?? "—"} — {project.location || "—"}
            </p>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[68px] font-light leading-[0.95] text-white tracking-tight max-w-3xl">
              {title}
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Info */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div className="lg:col-span-7">
              <ScrollReveal>
                <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-6 tracking-tight">
                  {t("detail.overview")}
                </h2>
                <div className="space-y-4 text-muted-foreground font-light leading-[1.8]">
                  {overviewParagraphs.length > 0 ? (
                    overviewParagraphs.map((para, i) => <p key={i}>{para}</p>)
                  ) : (
                    <p>
                      {title}
                      {category ? ` — ${category}` : ""}
                      {project.location ? `, ${project.location}` : ""}.
                    </p>
                  )}
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-4 lg:col-start-9">
              <ScrollReveal delay={100}>
                <div className="space-y-6">
                  {facts.map((f) => (
                    <div key={f.label}>
                      <p className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))] mb-1.5">
                        {f.label}
                      </p>
                      <p className="text-foreground font-light">{f.value}</p>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      {project.images.length > 0 && (
        <section className="section-padding-lg bg-[hsl(var(--surface-warm))]">
          <div className="container-wide">
            <ScrollReveal>
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-12 tracking-tight">
                {t("detail.gallery")}
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <ScrollReveal key={img.id} delay={i * 60}>
                  <div className={`overflow-hidden rounded-sm ${i === 0 && project.images.length > 1 ? "md:col-span-2" : ""}`}>
                    <img
                      src={img.url}
                      alt={localizedImageAlt(img, lang, `${title} — view ${i + 1}`)}
                      className={`w-full object-cover hover:scale-[1.02] transition-transform duration-700 ${i === 0 && project.images.length > 1 ? "aspect-[21/9]" : "aspect-[3/2]"}`}
                      loading="lazy"
                    />
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next */}
      {prevProject && nextProject && (
        <section className="bg-[hsl(var(--surface-dark))]">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <Link to={`/projects/${prevProject.slug}`} className="group block">
              <div className="container-wide py-16 md:py-24 flex items-center gap-4">
                <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
                <div>
                  <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">{t("detail.previous")}</p>
                  <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                    {localizedProjectTitle(prevProject, lang)}
                  </h3>
                </div>
              </div>
            </Link>
            <Link to={`/projects/${nextProject.slug}`} className="group block">
              <div className="container-wide py-16 md:py-24 flex items-center justify-end gap-4 text-right">
                <div>
                  <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">{t("detail.next")}</p>
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
