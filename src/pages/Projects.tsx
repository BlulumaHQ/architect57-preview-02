import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { allProjects, categories } from "@/data/portfolio";

// Randomly select 3 featured from Residential + Commercial only
const getTopFeatured = () => {
  const residential = allProjects.filter((p) => p.categorySlug === "residential");
  const commercial = allProjects.filter((p) => p.categorySlug === "commercial");

  const shuffleAndPick = (arr: typeof allProjects, n: number) =>
    [...arr].sort(() => Math.random() - 0.5).slice(0, n);

  // Randomly decide 2+1 split direction
  const resFirst = Math.random() > 0.5;
  const resPicks = shuffleAndPick(residential, resFirst ? 2 : 1);
  const comPicks = shuffleAndPick(commercial, resFirst ? 1 : 2);
  let picks = [...resPicks, ...comPicks];

  if (picks.length < 3) {
    const all = [...residential, ...commercial].filter(
      (p) => !picks.some((x) => x.slug === p.slug)
    );
    picks = [...picks, ...shuffleAndPick(all, 3 - picks.length)];
  }

  return picks.sort(() => Math.random() - 0.5);
};

const Projects = () => {
  const topFeatured = useMemo(getTopFeatured, []);
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const categoryFiltered = useMemo(() => {
    if (activeCategory === "all") return allProjects;
    return allProjects.filter((p) => p.categorySlug === activeCategory);
  }, [activeCategory]);

  const availableTags = useMemo(() => {
    const tagSet = new Set<string>();
    categoryFiltered.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet).sort();
  }, [categoryFiltered]);

  const filteredProjects = useMemo(() => {
    if (!activeTag) return categoryFiltered;
    return categoryFiltered.filter((p) => p.tags.includes(activeTag));
  }, [categoryFiltered, activeTag]);

  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    setActiveTag(null);
  };

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
              A curated selection of residential, commercial, industrial, institutional, and community work across British Columbia and beyond.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Section 1: Top 3 Featured Projects */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-3">
              Featured Work
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-14 tracking-tight">
              Signature Projects
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {topFeatured.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 100}>
                <Link to={`/projects/${p.slug}`} className="group block">
                  <div className="overflow-hidden rounded-sm">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                      loading="lazy"
                    />
                  </div>
                  <div className="mt-4">
                    <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
                      {p.category}
                    </span>
                    <h3 className="font-heading text-xl font-light text-foreground mt-1 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                      {p.name}
                    </h3>
                    <p className="text-muted-foreground/70 text-sm font-light mt-1 flex items-center gap-1.5">
                      <MapPin className="w-3 h-3" />
                      {p.location}
                    </p>
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

      {/* Section 2: Category Filter Bar */}
      <section className="bg-background sticky top-[72px] z-30 border-b border-border">
        <div className="container-wide py-4 overflow-x-auto scrollbar-hide">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.slug}
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

      {/* Tag Filter (secondary) */}
      {availableTags.length > 1 && (
        <section className="bg-background border-b border-border/50">
          <div className="container-wide py-3 overflow-x-auto scrollbar-hide">
            <div className="flex gap-1.5 min-w-max items-center">
              <span className="font-heading text-[10px] font-light tracking-[0.2em] uppercase text-muted-foreground/50 mr-2">Tags</span>
              <button
                onClick={() => setActiveTag(null)}
                className={`text-[10px] font-light tracking-[0.1em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 active:scale-[0.97] whitespace-nowrap border ${
                  !activeTag
                    ? "border-foreground/30 bg-foreground/5 text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                }`}
              >
                All
              </button>
              {availableTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag)}
                  className={`text-[10px] font-light tracking-[0.1em] uppercase px-3 py-1.5 rounded-full transition-all duration-300 active:scale-[0.97] whitespace-nowrap border ${
                    activeTag === tag
                      ? "border-foreground/30 bg-foreground/5 text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: All Projects Grid */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground tracking-tight">
                {activeCategory === "all"
                  ? "All Projects"
                  : categories.find((c) => c.slug === activeCategory)?.label}
                {activeTag && <span className="text-muted-foreground ml-2">/ {activeTag}</span>}
              </h2>
              <span className="text-muted-foreground font-light text-sm">
                {filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""}
              </span>
            </div>
          </ScrollReveal>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {filteredProjects.map((p, i) => (
                <ScrollReveal key={`${p.slug}-${i}`} delay={i * 40}>
                  <Link to={`/projects/${p.slug}`} className="group block">
                    <ProjectCard project={p} />
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-muted-foreground font-light">No projects found in this category.</p>
              <button
                onClick={() => { setActiveCategory("all"); setActiveTag(null); }}
                className="mt-4 font-heading text-[12px] font-light tracking-[0.15em] uppercase text-foreground border-b border-foreground/30 pb-1 hover:border-foreground transition-colors"
              >
                View All Projects
              </button>
            </div>
          )}
        </div>
      </section>

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

// ── Project Card Component ─────────────────────────────

interface ProjectCardProps {
  project: {
    name: string;
    category: string;
    location: string;
    area?: string;
    img: string;
  };
}

const ProjectCard = ({ project }: ProjectCardProps) => (
  <>
    <div className="overflow-hidden rounded-sm relative">
      <img
        src={project.img}
        alt={project.name}
        className="w-full aspect-[4/3] object-cover group-hover:scale-[1.03] transition-transform duration-700"
        loading="lazy"
      />
      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-500 flex items-center justify-center">
        <span className="font-heading text-[13px] font-light tracking-[0.15em] uppercase text-white opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-2 group-hover:translate-y-0">
          See Details
        </span>
      </div>
    </div>
    <div className="mt-3">
      <span className="font-heading text-[10px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
        {project.category}
      </span>
      <h3 className="font-heading text-[15px] font-light text-foreground mt-0.5 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300 leading-snug">
        {project.name}
      </h3>
      {project.location && (
        <p className="text-muted-foreground/60 text-xs font-light mt-1 flex items-center gap-1">
          <MapPin className="w-2.5 h-2.5" />
          {project.location}
        </p>
      )}
      {project.area && (
        <p className="text-muted-foreground/50 text-[11px] font-light mt-0.5">{project.area}</p>
      )}
    </div>
  </>
);

export default Projects;
