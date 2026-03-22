import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";

import sf1 from "@/assets/collection-single-family-1.jpg";
import sf2 from "@/assets/collection-single-family-2.jpg";
import sf3 from "@/assets/collection-single-family-3.jpg";
import dc1 from "@/assets/collection-daycare-1.jpg";
import dc2 from "@/assets/collection-daycare-2.jpg";
import mx1 from "@/assets/collection-multiplex-1.jpg";
import mx2 from "@/assets/collection-multiplex-2.jpg";

interface CollectionProject {
  name: string;
  location?: string;
  img: string;
}

interface Collection {
  slug: string;
  title: string;
  desc: string;
  projects: CollectionProject[];
}

const collections: Collection[] = [
  {
    slug: "single-family",
    title: "Single Family",
    desc: "Custom residential homes designed with precision and care for families across the Lower Mainland.",
    projects: [
      { name: "Burnaby Residence", location: "Burnaby, BC", img: sf1 },
      { name: "Richmond Custom Home", location: "Richmond, BC", img: sf2 },
      { name: "Surrey Estate", location: "Surrey, BC", img: sf3 },
    ],
  },
  {
    slug: "daycare-education",
    title: "Daycare & Education",
    desc: "Purpose-built educational and childcare facilities designed for safety, creativity, and growth.",
    projects: [
      { name: "Rainbow Kids Daycare", location: "Richmond, BC", img: dc1 },
      { name: "Little Scholars Academy", location: "Vancouver, BC", img: dc2 },
    ],
  },
  {
    slug: "multiplex",
    title: "Multiplex",
    desc: "Multi-unit residential developments that balance density with livability and architectural character.",
    projects: [
      { name: "Garden City Fourplex", location: "Richmond, BC", img: mx1 },
      { name: "Westminster Sixplex", location: "New Westminster, BC", img: mx2 },
    ],
  },
];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                  {project.location && (
                    <p className="text-muted-foreground font-light text-sm mt-1">{project.location}</p>
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
