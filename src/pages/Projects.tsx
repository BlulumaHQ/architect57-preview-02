import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { featuredProjects, collections, categories } from "@/data/portfolio";

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredFeatured = useMemo(() => {
    if (activeFilter === "all") return featuredProjects;
    return featuredProjects.filter((p) => p.categorySlug === activeFilter);
  }, [activeFilter]);

  const filteredCollections = useMemo(() => {
    if (activeFilter === "all") return collections;
    return collections.filter((c) => c.categorySlug === activeFilter);
  }, [activeFilter]);

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">
              Our Portfolio
            </p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              Projects
            </h1>
            <p className="text-white/50 font-light mt-6 max-w-xl leading-relaxed">
              A curated selection of our most significant architectural work alongside project collections organized by typology.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-background border-b border-border sticky top-[72px] z-30">
        <div className="container-wide py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`font-heading text-[11px] font-light tracking-[0.15em] uppercase px-5 py-2.5 rounded-sm transition-all duration-300 active:scale-[0.97] whitespace-nowrap ${
                  activeFilter === cat.slug
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

      {/* Section 1: Featured Projects */}
      {filteredFeatured.length > 0 && (
        <section className="section-padding-lg bg-background">
          <div className="container-wide">
            <ScrollReveal>
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-3">
                Featured Work
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-16 tracking-tight">
                Signature Projects
              </h2>
            </ScrollReveal>

            <div className="space-y-20">
              {filteredFeatured.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}>
                  <Link to={`/projects/${p.slug}`} className="group block">
                    <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                      <div className="lg:col-span-7 overflow-hidden rounded-sm" style={{ direction: "ltr" }}>
                        <img
                          src={p.coverImg}
                          alt={p.title}
                          className="w-full aspect-[3/2] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                          loading="lazy"
                        />
                      </div>
                      <div className="lg:col-span-4 lg:col-start-9" style={{ direction: "ltr" }}>
                        <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
                          {p.category}
                        </span>
                        <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mt-2 mb-2 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                          {p.title}
                        </h3>
                        <p className="text-muted-foreground/70 text-sm font-light mb-3">
                          {p.location}{p.area ? ` — ${p.area}` : ""}
                        </p>
                        <p className="text-muted-foreground font-light leading-relaxed mb-6 line-clamp-3">{p.desc}</p>
                        <span className="inline-flex items-center gap-2 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                          View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Divider */}
      {filteredFeatured.length > 0 && filteredCollections.length > 0 && (
        <div className="container-wide">
          <div className="h-px bg-border" />
        </div>
      )}

      {/* Section 2: Collections */}
      {filteredCollections.length > 0 && (
        <section className="section-padding-lg bg-background">
          <div className="container-wide">
            <ScrollReveal>
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-3">
                By Typology
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-16 tracking-tight">
                Project Collections
              </h2>
            </ScrollReveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCollections.map((c, i) => (
                <ScrollReveal key={c.slug} delay={i * 80}>
                  <Link to={`/projects/collection/${c.slug}`} className="group block">
                    <div className="overflow-hidden rounded-sm mb-5">
                      <img
                        src={c.coverImg}
                        alt={c.title}
                        className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-heading text-lg font-light text-foreground tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                          {c.title}
                        </h3>
                        <p className="text-muted-foreground font-light text-sm mt-1">
                          {c.projects.length} project{c.projects.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-[hsl(var(--gold-accent))] group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Empty state */}
      {filteredFeatured.length === 0 && filteredCollections.length === 0 && (
        <section className="section-padding-lg bg-background text-center">
          <div className="container-tight">
            <p className="text-muted-foreground font-light">No projects found in this category.</p>
            <button
              onClick={() => setActiveFilter("all")}
              className="mt-4 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
            >
              View All Projects
            </button>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[hsl(var(--surface-dark))] py-24 md:py-32 text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              Have a Project in Mind?
            </h2>
            <p className="text-white/50 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              Let's discuss how Architect 57 can bring your vision to life.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
            >
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Projects;
