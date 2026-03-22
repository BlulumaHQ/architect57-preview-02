import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

import srcImg1 from "@/assets/source-project-1.jpg";
import srcImg4 from "@/assets/source-project-4.jpg";
import srcImg7 from "@/assets/source-project-7.jpg";
import srcImg10 from "@/assets/source-project-10.jpg";
import srcImg3 from "@/assets/source-project-3.jpg";
import srcImg6 from "@/assets/source-project-6.jpg";

const featuredProjects = [
  {
    slug: "mixed-use-development",
    img: srcImg1,
    title: "Mixed-Use Development",
    category: "Commercial",
    year: "2023",
    desc: "Multi-story mixed-use complex with retail and residential integration.",
  },
  {
    slug: "high-rise-residential",
    img: srcImg4,
    title: "High-Rise Residential Tower",
    category: "Residential",
    year: "2022",
    desc: "Modern high-rise residential development with sustainable design features.",
  },
  {
    slug: "institutional-complex",
    img: srcImg7,
    title: "Institutional Complex",
    category: "Institutional",
    year: "2021",
    desc: "Purpose-built institutional facility with advanced structural engineering.",
  },
];

const collections = [
  {
    slug: "single-family",
    title: "Single Family",
    count: 3,
    img: srcImg10,
  },
  {
    slug: "daycare-education",
    title: "Daycare & Education",
    count: 2,
    img: srcImg3,
  },
  {
    slug: "multiplex",
    title: "Multiplex",
    count: 2,
    img: srcImg6,
  },
];

const Projects = () => {
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

      {/* Section 1: Featured Projects */}
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
            {featuredProjects.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 80}>
                <Link to={`/projects/${p.slug}`} className="group block">
                  <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                    <div className="lg:col-span-7 overflow-hidden rounded-sm" style={{ direction: "ltr" }}>
                      <img
                        src={p.img}
                        alt={p.title}
                        className="w-full aspect-[3/2] object-cover group-hover:scale-[1.03] transition-transform duration-700"
                        loading="lazy"
                      />
                    </div>
                    <div className="lg:col-span-4 lg:col-start-9" style={{ direction: "ltr" }}>
                      <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">
                        {p.category} — {p.year}
                      </span>
                      <h3 className="font-heading text-2xl md:text-3xl font-light text-foreground mt-2 mb-4 tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground font-light leading-relaxed mb-6">{p.desc}</p>
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

      {/* Divider */}
      <div className="container-wide">
        <div className="h-px bg-border" />
      </div>

      {/* Section 2: Collections */}
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {collections.map((c, i) => (
              <ScrollReveal key={c.slug} delay={i * 80}>
                <Link to={`/projects/collection/${c.slug}`} className="group block">
                  <div className="overflow-hidden rounded-sm mb-5">
                    <img
                      src={c.img}
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
                        {c.count} project{c.count !== 1 ? "s" : ""}
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