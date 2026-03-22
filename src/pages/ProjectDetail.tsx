import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { allProjects, getProjectIndex } from "@/data/portfolio";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = allProjects.find((p) => p.slug === slug);
  const { t } = useLang();

  const metaTitle = project
    ? `${project.name} | Architect 57 無極建築`
    : "Project Not Found | Architect 57 無極建築";

  const metaDesc = project
    ? `${project.name}${project.location ? ` in ${project.location}` : ""} by Architect 57 無極建築 — ${project.category}${project.area ? `, ${project.area}` : ""}${project.detail ? `. ${project.detail}` : ""}.`
    : "Project not found.";

  usePageMeta({ title: metaTitle, description: metaDesc });

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];
  const projectIndex = getProjectIndex(slug!);

  const facts: { label: string; value: string }[] = [
    { label: t("detail.category"), value: t(`cat.${project.categorySlug}`) },
  ];
  if (project.tags.length > 0) facts.push({ label: t("detail.tags"), value: project.tags.join(", ") });
  if (project.location) facts.push({ label: t("detail.location"), value: project.location });
  if (project.area) facts.push({ label: t("detail.area"), value: project.area });
  if (project.budget) facts.push({ label: t("detail.budget"), value: project.budget });
  if (project.detail) facts.push({ label: t("detail.details"), value: project.detail });

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img src={project.img} alt={project.name} className="absolute inset-0 w-full h-full object-cover" />
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
              {t(`cat.${project.categorySlug}`)} — {project.location || "—"}
            </p>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[68px] font-light leading-[0.95] text-white tracking-tight max-w-3xl">
              {project.name}
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
                  <p>{project.name} — {t(`cat.${project.categorySlug}`)}{project.location ? `, ${project.location}` : ""}.</p>
                  {project.area && <p>{t("detail.area")}: {project.area}.</p>}
                  {project.budget && <p>{t("detail.budget")}: {project.budget}.</p>}
                  {project.detail && <p>{project.detail}</p>}
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
      <section className="section-padding-lg bg-[hsl(var(--surface-warm))]">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mb-12 tracking-tight">
              {t("detail.gallery")}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.galleryImgs.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className={`overflow-hidden rounded-sm ${i === 0 && project.galleryImgs.length > 1 ? "md:col-span-2" : ""}`}>
                  <img
                    src={img}
                    alt={`${project.name} — view ${i + 1}`}
                    className={`w-full object-cover hover:scale-[1.02] transition-transform duration-700 ${i === 0 && project.galleryImgs.length > 1 ? "aspect-[21/9]" : "aspect-[3/2]"}`}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      <section className="bg-[hsl(var(--surface-dark))]">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <Link to={`/projects/${prevProject.slug}`} className="group block">
            <div className="container-wide py-16 md:py-24 flex items-center gap-4">
              <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">{t("detail.previous")}</p>
                <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                  {prevProject.name}
                </h3>
              </div>
            </div>
          </Link>
          <Link to={`/projects/${nextProject.slug}`} className="group block">
            <div className="container-wide py-16 md:py-24 flex items-center justify-end gap-4 text-right">
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">{t("detail.next")}</p>
                <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                  {nextProject.name}
                </h3>
              </div>
              <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:translate-x-1 transition-all duration-300 shrink-0" />
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default ProjectDetail;
