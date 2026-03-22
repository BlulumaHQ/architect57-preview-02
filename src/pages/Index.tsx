import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DiagonalMarquee from "@/components/DiagonalMarquee";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import aboutStudio from "@/assets/about-studio.jpg";
import { featuredProjects as allFeatured } from "@/data/portfolio";

const services = [
  {
    num: "01",
    title: "Integrated Building Design",
    desc: "Full-spectrum architectural design for commercial, residential, industrial, and institutional projects.",
  },
  {
    num: "02",
    title: "Code Consultation",
    desc: "Complex building code consultation with CP Certified Professional expertise.",
  },
  {
    num: "03",
    title: "Project Management",
    desc: "End-to-end project management including planning, coordination, and delivery oversight.",
  },
  {
    num: "04",
    title: "Sustainable Architecture",
    desc: "Environmentally responsible design guided by green building principles and LEED standards.",
  },
];

const featuredProjects = allFeatured.slice(0, 4).map((p) => ({
  img: p.coverImg,
  title: p.title,
  category: p.category,
  slug: p.slug,
}));

const Index = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* HERO — Fullscreen Slideshow */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="Modern architecture at twilight" className="absolute inset-0 w-full h-full object-cover hero-slide-1" />
          <img src={hero2} alt="Residential tower at night" className="absolute inset-0 w-full h-full object-cover hero-slide-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,6%,10%)]/90 via-[hsl(240,6%,10%)]/40 to-transparent" />
        </div>
        <div className="container-wide relative z-10 pb-20 md:pb-28">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-5">
              Richmond, BC — Design Build
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-4xl mb-6 tracking-tight">
              Architecture that
              <br />
              <span className="font-medium">transforms space</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <p className="text-base md:text-lg text-white/60 max-w-lg mb-10 leading-relaxed font-light">
              Integrated building design, code consultation, and sustainable architecture — from concept to completion.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              >
                Start a Project
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-white border border-white/25 px-8 py-4 rounded-sm transition-all duration-300 hover:border-white/50 active:scale-[0.97]"
              >
                View Work
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* DIAGONAL MARQUEE PORTFOLIO */}
      <DiagonalMarquee />

      {/* SERVICES — Split asymmetrical layout */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                  What We Do
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-6 tracking-tight">
                  Comprehensive
                  <br />
                  <span className="font-medium">Services</span>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  From design through delivery, we bring technical precision and creative vision to every project.
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground active:scale-[0.97]"
                >
                  Discuss Your Project
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0 divide-y divide-border">
                {services.map((s, i) => (
                  <ScrollReveal key={s.num} delay={i * 80}>
                    <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                      <span className="md:col-span-2 font-heading text-[13px] font-light text-[hsl(var(--purple-muted))] tracking-wider">
                        {s.num}
                      </span>
                      <h3 className="md:col-span-4 font-heading text-lg font-medium text-foreground">
                        {s.title}
                      </h3>
                      <p className="md:col-span-6 text-muted-foreground font-light leading-relaxed text-[15px]">
                        {s.desc}
                      </p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT — Image + text overlap */}
      <section className="relative bg-[hsl(var(--surface-warm))] overflow-hidden">
        <div className="container-wide py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative">
                <img
                  src={aboutStudio}
                  alt="Architect working on building designs"
                  className="w-full aspect-[3/4] object-cover rounded-sm"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5 lg:col-start-8">
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                About
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-6 tracking-tight">
                Building a better,
                <br />
                <span className="font-medium">healthier world</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, and sustainable architecture.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6 text-[15px] italic">
                "We believe that it is our responsibility making this world a better and healthier place for living."
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CP</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">Certified Professional</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CHBA</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">Awards Finalist</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">BIM</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">Integrated Design</span>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
              >
                Learn More
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS — Creative grid */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-14">
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                  Our Work
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground tracking-tight">
                  Featured <span className="font-medium">Projects</span>
                </h2>
              </div>
              <Link
                to="/projects"
                className="hidden md:inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
              >
                View All
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {/* Creative asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
            {/* Large left */}
            <ScrollReveal className="md:col-span-7">
              <Link to="/projects" className="group block relative overflow-hidden rounded-sm">
                <img
                  src={featuredProjects[0].img}
                  alt={featuredProjects[0].title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
                    {featuredProjects[0].category}
                  </span>
                  <h3 className="font-heading text-xl md:text-2xl font-light text-white mt-1">
                    {featuredProjects[0].title}
                  </h3>
                </div>
              </Link>
            </ScrollReveal>

            {/* Right stack */}
            <div className="md:col-span-5 flex flex-col gap-4 md:gap-5">
              <ScrollReveal delay={100}>
                <Link to="/projects" className="group block relative overflow-hidden rounded-sm">
                  <img
                    src={featuredProjects[1].img}
                    alt={featuredProjects[1].title}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
                      {featuredProjects[1].category}
                    </span>
                    <h3 className="font-heading text-lg font-light text-white mt-1">
                      {featuredProjects[1].title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <Link to="/projects" className="group block relative overflow-hidden rounded-sm">
                  <img
                    src={featuredProjects[2].img}
                    alt={featuredProjects[2].title}
                    className="w-full aspect-[3/2] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 md:p-6">
                    <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
                      {featuredProjects[2].category}
                    </span>
                    <h3 className="font-heading text-lg font-light text-white mt-1">
                      {featuredProjects[2].title}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            </div>
          </div>

          {/* Fourth project — full width */}
          <ScrollReveal delay={300} className="mt-4 md:mt-5">
            <Link to="/projects" className="group block relative overflow-hidden rounded-sm">
              <img
                src={featuredProjects[3].img}
                alt={featuredProjects[3].title}
                className="w-full aspect-[21/9] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 p-6 md:p-8">
                <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
                  {featuredProjects[3].category}
                </span>
                <h3 className="font-heading text-xl md:text-2xl font-light text-white mt-1">
                  {featuredProjects[3].title}
                </h3>
              </div>
            </Link>
          </ScrollReveal>

          {/* Mobile "View All" */}
          <div className="mt-10 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1"
            >
              View All Projects
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-[hsl(var(--surface-dark))]">
        <div className="container-wide py-28 md:py-40 text-center relative z-10">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-5">
              Let's Collaborate
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[0.95] mb-8 mx-auto max-w-3xl">
              Ready to start your
              <br />
              <span className="font-medium">next project?</span>
            </h2>
            <p className="text-white/50 font-light max-w-md mx-auto mb-10 leading-relaxed">
              Contact Architect 57 Inc. for integrated building design, code consultation, and project management in Richmond, BC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              >
                Get a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:604-818-2088"
                className="inline-flex items-center justify-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-white border border-white/20 px-8 py-4 rounded-sm transition-all duration-300 hover:border-white/40 active:scale-[0.97]"
              >
                Call 604.818.2088
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[350px] md:h-[400px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.8!2d-123.1286!3d49.1766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDnCsDEwJzM1LjgiTiAxMjPCsDA3JzQzLjAiVw!5e0!3m2!1sen!2sca!4v1"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Architect 57 Inc. Location — 203-2680 Shell Road, Richmond, BC"
        />
      </section>
    </main>
  );
};

export default Index;
