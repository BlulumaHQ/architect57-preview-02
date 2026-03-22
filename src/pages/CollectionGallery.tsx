import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { collections } from "@/data/portfolio";

const CollectionGallery = () => {
  const { slug } = useParams();
  const collection = collections.find((c) => c.slug === slug);

  if (!collection) return <Navigate to="/projects" replace />;

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container-wide">
          <ScrollReveal>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60 hover:text-white transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Projects
            </Link>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">
              Collection
            </p>
            <h1 className="font-heading text-[36px] md:text-[56px] lg:text-[68px] font-light leading-[0.95] text-white tracking-tight max-w-3xl">
              {collection.title}
            </h1>
            <p className="text-white/50 font-light mt-6 max-w-xl leading-relaxed">
              {collection.desc}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collection.projects.map((project, i) => (
              <ScrollReveal key={project.name} delay={i * 80}>
                <div className="group">
                  <div className="overflow-hidden rounded-sm mb-4">
                    <img
                      src={project.img}
                      alt={project.name}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-[1.02] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-heading text-lg font-light text-foreground tracking-tight">
                    {project.name}
                  </h3>
                  <p className="text-muted-foreground font-light text-sm mt-1">{project.location}</p>
                  {/* Metadata line */}
                  {(project.area || project.budget || project.designer || project.notes) && (
                    <p className="text-muted-foreground/60 font-light text-xs mt-1.5">
                      {[project.area, project.budget, project.designer, project.notes]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[hsl(var(--surface-dark))] py-20 md:py-28 text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-heading text-2xl md:text-3xl font-light text-white mb-6 tracking-tight">
              Have a Similar Project?
            </h2>
            <p className="text-white/50 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              Let's discuss how Architect 57 can bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
            >
              Start Your Project
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default CollectionGallery;
