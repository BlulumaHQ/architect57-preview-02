import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const galleryImages = [
  "https://static.wixstatic.com/media/c77437_1e4a8ac76daa45a8bf59405a5f20ad52~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_1e4a8ac76daa45a8bf59405a5f20ad52~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_7b4db7df81224912985098241431659d~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_7b4db7df81224912985098241431659d~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_d00926a0b2de47d09caf5af023c27eed~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_d00926a0b2de47d09caf5af023c27eed~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_59b8d6e5c94f448aa25c6282e6b5ab1c~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_59b8d6e5c94f448aa25c6282e6b5ab1c~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_f6af5b73841649cdb65661bd21175ebe~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_f6af5b73841649cdb65661bd21175ebe~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_2d601ba4beb045c6956b1a4c7781b22c~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_2d601ba4beb045c6956b1a4c7781b22c~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_573edefa5c484c15b82178fb040970b0~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_573edefa5c484c15b82178fb040970b0~mv2.jpg",
  "https://static.wixstatic.com/media/c77437_2e151fdc1ed14ec1a2032b854f3c143f~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_2e151fdc1ed14ec1a2032b854f3c143f~mv2.jpg",
];

const featuredProjects = [
  { img: project1, title: "Mixed-Use Development", category: "Commercial", desc: "Multi-story mixed-use complex with retail and residential integration." },
  { img: project2, title: "High-Rise Residential Tower", category: "Residential", desc: "Modern high-rise residential development with sustainable design features." },
  { img: project3, title: "Specialized Industrial Facility", category: "Industrial", desc: "Purpose-built industrial facility with advanced structural engineering." },
];

const Projects = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="bg-primary section-padding-lg pt-32 md:pt-40">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">Our Portfolio</p>
            <h1 className="text-[38px] md:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] text-primary-foreground max-w-3xl mb-6">
              Projects
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl">
              A selection of our work across commercial, residential, industrial, and institutional sectors.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <div className="space-y-16">
            {featuredProjects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "lg:[direction:rtl]" : ""}`}>
                  <div className="rounded-lg overflow-hidden shadow-lg" style={{ direction: "ltr" }}>
                    <img src={p.img} alt={p.title} className="w-full aspect-[3/2] object-cover" loading="lazy" />
                  </div>
                  <div className="lg:px-4" style={{ direction: "ltr" }}>
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.category}</span>
                    <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mt-2 mb-4">{p.title}</h2>
                    <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding bg-[hsl(var(--section-alt))]">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10">Project Gallery</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {galleryImages.map((img, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <div className="rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                  <img src={img} alt={`Architect 57 project ${i + 1}`} className="w-full aspect-square object-cover hover:scale-[1.03] transition-transform duration-500" loading="lazy" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding bg-primary text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">Have a Project in Mind?</h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Let's discuss how Architect 57 can bring your vision to life.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
              Start Your Project <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default Projects;
