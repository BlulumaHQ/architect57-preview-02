import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import featured1 from "@/assets/featured-1.jpg";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";
import featured4 from "@/assets/featured-4.jpg";
import marquee1 from "@/assets/marquee-1.jpg";
import marquee2 from "@/assets/marquee-2.jpg";
import marquee3 from "@/assets/marquee-3.jpg";
import marquee4 from "@/assets/marquee-4.jpg";
import marquee5 from "@/assets/marquee-5.jpg";
import marquee6 from "@/assets/marquee-6.jpg";

const featuredProjects = [
  { img: featured1, title: "Mixed-Use Development", category: "Commercial", desc: "Multi-story mixed-use complex with retail and residential integration." },
  { img: featured2, title: "High-Rise Residential Tower", category: "Residential", desc: "Modern high-rise residential development with sustainable design features." },
  { img: featured3, title: "Institutional Complex", category: "Institutional", desc: "Purpose-built institutional facility with advanced structural engineering." },
  { img: featured4, title: "Industrial Research Facility", category: "Industrial", desc: "Specialized industrial and research facility with modern infrastructure." },
];

const galleryImages = [marquee1, marquee2, marquee3, marquee4, marquee5, marquee6];

const Projects = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">Our Portfolio</p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              Projects
            </h1>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide space-y-20">
          {featuredProjects.map((p, i) => (
            <ScrollReveal key={p.title} delay={i * 80}>
              <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                <div className="lg:col-span-7 overflow-hidden rounded-sm" style={{ direction: "ltr" }}>
                  <img src={p.img} alt={p.title} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                </div>
                <div className="lg:col-span-4 lg:col-start-9" style={{ direction: "ltr" }}>
                  <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))]">{p.category}</span>
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-foreground mt-2 mb-4 tracking-tight">{p.title}</h2>
                  <p className="text-muted-foreground font-light leading-relaxed">{p.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-[hsl(var(--surface-warm))]">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-12 tracking-tight">
              Project <span className="font-medium">Gallery</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="overflow-hidden rounded-sm">
                  <img
                    src={img}
                    alt={`Architect 57 project ${i + 1}`}
                    className="w-full aspect-[4/3] object-cover hover:scale-[1.03] transition-transform duration-700"
                    loading="lazy"
                  />
                </div>
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
              Have a Project <span className="font-medium">in Mind?</span>
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
