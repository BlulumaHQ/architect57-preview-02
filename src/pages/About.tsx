import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutImg1 from "@/assets/about-us-01.webp";

const services = [
  "Integrated Building Design",
  "Complex Building Code Consultation",
  "Integrated Project Delivery (IPD)",
  "Code Consultation (CP)",
  "Building Info Modelling (BIM)",
  "Project Management",
  "Mix-Use Development",
  "High-Rise Residential",
  "Specialized Industrial",
  "Research and Technology",
  "Commercial Architecture",
  "Residential Architecture",
  "Industrial Architecture",
  "Institutional Architecture",
  "Sustainable Architecture",
  "Project Planning",
];

const About = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-32 md:pt-44 pb-20 md:pb-28">
        {/* Micro red corner */}
        <div className="absolute bottom-8 right-10 w-4 h-4 border-b border-r border-[#a11d2d]/20 hidden md:block" />
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-4">About Us</p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              Architect 57 Inc.
            </h1>
            <p className="text-lg text-white/50 font-light mt-4">
              Design Build — Richmond, BC
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-lg bg-background relative">
        {/* Micro red line */}
        <div className="absolute top-12 left-6 md:left-10 w-px h-8 bg-[#a11d2d]/20" />
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={aboutImg1}
                  alt="Architect 57 Inc. office reception with orange accent wall"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                {/* Tiny red corner accent */}
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b border-r border-[#a11d2d]/25" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5 lg:col-start-8">
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                Our Story
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6 tracking-tight">
                Decades of <span className="font-medium">expertise</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, industrial, institutional, sustainable architecture, project planning, and many more.
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Architect 57 Inc. is a proud finalist of the Canadian Home Builder's Association Sam Awards (now called CHBA National Awards for Housing Excellence).
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                Principal Ching-yeh (Cary) Tsai devotes his energy towards the formation of the U.S. Green Building Council — Las Vegas Regional Chapter as part of his way of giving back to the community and help to build a better, healthier, and sustainable living environment.
              </p>
              <p className="text-foreground font-light text-lg italic leading-relaxed">
                "We believe that it is our responsibility making this world a better and healthier place for living."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-[hsl(var(--surface-warm))]">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
              Expertise
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-12 tracking-tight">
              Our <span className="font-medium">Services</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
            {services.map((s, i) => (
              <ScrollReveal key={s} delay={i * 30}>
                <div className="flex items-center gap-4 py-3 border-b border-border">
                  <span className="text-[11px] text-muted-foreground font-light tabular-nums w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-foreground font-light">{s}</span>
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
              Let's Work <span className="font-medium">Together</span>
            </h2>
            <p className="text-white/50 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              Contact us to discuss your next architectural project in Richmond, BC.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
            >
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default About;
