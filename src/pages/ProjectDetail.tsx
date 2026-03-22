import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { featuredProjects } from "@/data/portfolio";

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = featuredProjects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = featuredProjects.findIndex((p) => p.slug === slug);
  const prevProject = featuredProjects[(currentIndex - 1 + featuredProjects.length) % featuredProjects.length];
  const nextProject = featuredProjects[(currentIndex + 1) % featuredProjects.length];

  // Build facts list dynamically
  const facts: { label: string; value: string }[] = [
    { label: "Location", value: project.location },
    { label: "Category", value: project.category },
  ];
  if (project.area) facts.push({ label: "Area", value: project.area });
  if (project.budget) facts.push({ label: "Budget", value: project.budget });
  if (project.coDesigner) facts.push({ label: "Co-Designer", value: project.coDesigner });
  if (project.designer) facts.push({ label: "Designer", value: project.designer });
  if (project.codes) facts.push({ label: "Codes", value: project.codes });
  if (project.notes) facts.push({ label: "Recognition", value: project.notes });

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <img
          src={project.heroImg}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
        <div className="relative z-10 container-wide pb-16 md:pb-20">
          <ScrollReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-3">
              {project.category} — {project.location}
            </p>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[68px] font-light leading-[0.95] text-white tracking-tight max-w-3xl">
              {project.title}
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
                  Project Overview
                </h2>
                <p className="text-muted-foreground font-light leading-[1.8] mb-4">{project.desc}</p>
                <p className="text-muted-foreground font-light leading-[1.8]">{project.longDesc}</p>
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
                  {project.services.length > 0 && (
                    <div>
                      <p className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))] mb-1.5">
                        Services
                      </p>
                      <ul className="space-y-1">
                        {project.services.map((s) => (
                          <li key={s} className="text-foreground font-light text-sm">{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
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
              Project Gallery
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.galleryImgs.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className={`overflow-hidden rounded-sm ${i === 0 && project.galleryImgs.length > 1 ? "md:col-span-2" : ""}`}>
                  <img
                    src={img}
                    alt={`${project.title} — view ${i + 1}`}
                    className={`w-full object-cover hover:scale-[1.02] transition-transform duration-700 ${i === 0 && project.galleryImgs.length > 1 ? "aspect-[21/9]" : "aspect-[3/2]"}`}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Prev / Next Navigation */}
      <section className="bg-[hsl(var(--surface-dark))]">
        <div className="grid grid-cols-2 divide-x divide-white/10">
          <Link to={`/projects/${prevProject.slug}`} className="group block">
            <div className="container-wide py-16 md:py-24 flex items-center gap-4">
              <ArrowLeft className="w-5 h-5 text-white/30 group-hover:text-[hsl(var(--gold-accent))] group-hover:-translate-x-1 transition-all duration-300 shrink-0" />
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">Previous</p>
                <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                  {prevProject.title}
                </h3>
              </div>
            </div>
          </Link>
          <Link to={`/projects/${nextProject.slug}`} className="group block">
            <div className="container-wide py-16 md:py-24 flex items-center justify-end gap-4 text-right">
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-2">Next</p>
                <h3 className="font-heading text-lg md:text-2xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                  {nextProject.title}
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
