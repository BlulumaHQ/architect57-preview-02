import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

// Images
import mixedHero from "@/assets/project-mixed-use-hero.jpg";
import mixed2 from "@/assets/project-mixed-use-2.jpg";
import mixed3 from "@/assets/project-mixed-use-3.jpg";
import highriseHero from "@/assets/project-highrise-hero.jpg";
import highrise2 from "@/assets/project-highrise-2.jpg";
import highrise3 from "@/assets/project-highrise-3.jpg";
import institutionalHero from "@/assets/project-institutional-hero.jpg";
import institutional2 from "@/assets/project-institutional-2.jpg";
import institutional3 from "@/assets/project-institutional-3.jpg";
import featured1 from "@/assets/featured-1.jpg";
import featured2 from "@/assets/featured-2.jpg";
import featured3 from "@/assets/featured-3.jpg";

const projects = [
  {
    slug: "mixed-use-development",
    title: "Mixed-Use Development",
    category: "Commercial",
    location: "Richmond, BC",
    year: "2023",
    desc: "Multi-story mixed-use complex integrating retail, office, and residential spaces within a single cohesive architectural vision.",
    longDesc: "This mixed-use development required careful integration of commercial retail at ground level with office space and residential units above. The design prioritizes natural light, pedestrian flow, and a unified facade that respects the surrounding urban context while establishing a distinct identity.",
    services: ["Integrated Building Design", "Code Consultation", "Project Management", "BIM"],
    heroImg: mixedHero,
    galleryImgs: [mixed2, mixed3, featured1],
    coverImg: featured1,
  },
  {
    slug: "high-rise-residential",
    title: "High-Rise Residential Tower",
    category: "Residential",
    location: "Richmond, BC",
    year: "2022",
    desc: "Modern high-rise residential tower featuring sustainable design, premium amenities, and panoramic city views.",
    longDesc: "A landmark residential tower designed for urban living at its finest. The building envelope maximizes energy efficiency while floor-to-ceiling glazing offers unobstructed views. Amenity spaces including a rooftop terrace create a vertical community experience.",
    services: ["Integrated Building Design", "Sustainable Architecture", "Code Consultation", "Project Planning"],
    heroImg: highriseHero,
    galleryImgs: [highrise2, highrise3, featured2],
    coverImg: featured2,
  },
  {
    slug: "institutional-complex",
    title: "Institutional Complex",
    category: "Institutional",
    location: "Richmond, BC",
    year: "2021",
    desc: "Purpose-built institutional facility with advanced structural engineering and expansive public atriums.",
    longDesc: "This institutional project required balancing public accessibility with specialized functional requirements. The design features a dramatic central atrium that floods the interior with natural light, while carefully zoned wings accommodate distinct program areas. Materials were selected for durability and civic presence.",
    services: ["Integrated Building Design", "Code Consultation (CP)", "Project Management", "IPD"],
    heroImg: institutionalHero,
    galleryImgs: [institutional2, institutional3, featured3],
    coverImg: featured3,
  },
];

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) return <Navigate to="/projects" replace />;

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

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
              {project.category} — {project.year}
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
                <div className="space-y-8">
                  <div>
                    <p className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))] mb-2">Location</p>
                    <p className="text-foreground font-light">{project.location}</p>
                  </div>
                  <div>
                    <p className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))] mb-2">Year</p>
                    <p className="text-foreground font-light">{project.year}</p>
                  </div>
                  <div>
                    <p className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-[hsl(var(--purple-muted))] mb-2">Services</p>
                    <ul className="space-y-1">
                      {project.services.map((s) => (
                        <li key={s} className="text-foreground font-light text-sm">{s}</li>
                      ))}
                    </ul>
                  </div>
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
                <div className={`overflow-hidden rounded-sm ${i === 0 ? "md:col-span-2" : ""}`}>
                  <img
                    src={img}
                    alt={`${project.title} — view ${i + 1}`}
                    className={`w-full object-cover hover:scale-[1.02] transition-transform duration-700 ${i === 0 ? "aspect-[21/9]" : "aspect-[3/2]"}`}
                    loading="lazy"
                  />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Next Project */}
      <section className="bg-[hsl(var(--surface-dark))]">
        <Link to={`/projects/${nextProject.slug}`} className="group block">
          <div className="container-wide py-20 md:py-28 flex items-center justify-between">
            <div>
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-white/40 mb-3">Next Project</p>
              <h3 className="font-heading text-2xl md:text-4xl font-light text-white tracking-tight group-hover:text-[hsl(var(--gold-accent))] transition-colors duration-300">
                {nextProject.title}
              </h3>
            </div>
            <ArrowRight className="w-6 h-6 text-white/40 group-hover:text-[hsl(var(--gold-accent))] group-hover:translate-x-2 transition-all duration-300" />
          </div>
        </Link>
      </section>
    </main>
  );
};

export default ProjectDetail;
