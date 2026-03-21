import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";

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
      <section className="bg-primary section-padding-lg pt-32 md:pt-40">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-3">About Us</p>
            <h1 className="text-[38px] md:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] text-primary-foreground max-w-3xl mb-6">
              Architect 57 Inc.
            </h1>
            <p className="text-lg text-primary-foreground/80 max-w-xl">
              Design Build — Richmond, BC
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-lg bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <ScrollReveal direction="left">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://static.wixstatic.com/media/c77437_c1a9b4d6c9ac44bd939d83a79666bf08~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_c1a9b4d6c9ac44bd939d83a79666bf08~mv2.jpg"
                  alt="Architect 57 Inc. office"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">Our Story</h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, industrial, institutional, sustainable architecture, project planning, and many more.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Architect 57 Inc. is a proud finalist of the Canadian Home Builder's Association Sam Awards (now called CHBA National Awards for Housing Excellence).
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Principal Ching-yeh (Cary) Tsai devotes his energy towards the formation of the U.S. Green Building Council — Las Vegas Regional Chapter as part of his way of giving back to the community and help to build a better, healthier, and sustainable living environment.
              </p>
              <p className="text-foreground font-semibold text-lg italic">
                "We believe that it is our responsibility making this world a better and healthier place for living."
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-[hsl(var(--section-alt))]">
        <div className="container-wide">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-10">Our Services</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4">
            {services.map((s, i) => (
              <ScrollReveal key={s} delay={i * 40}>
                <div className="flex items-center gap-3 py-2">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                  <span className="text-foreground font-medium">{s}</span>
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
            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground mb-6">Let's Work Together</h2>
            <p className="text-primary-foreground/80 text-lg max-w-lg mx-auto mb-8">
              Contact us to discuss your next architectural project in Richmond, BC.
            </p>
            <Link to="/contact" className="btn-secondary inline-flex items-center gap-2">
              Contact Us <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default About;
