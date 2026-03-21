import { Link } from "react-router-dom";
import { Phone, ArrowRight, Award, Building2, Compass, ShieldCheck, CheckCircle2 } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import heroImg from "@/assets/hero-building.jpg";
import project1 from "@/assets/project-1.jpg";
import project2 from "@/assets/project-2.jpg";
import project3 from "@/assets/project-3.jpg";

const stats = [
  { value: "CP", label: "Certified Professional" },
  { value: "IPD", label: "Integrated Project Delivery" },
  { value: "BIM", label: "Building Info Modelling" },
  { value: "CHBA", label: "Awards Finalist" },
];

const services = [
  { icon: Building2, title: "Integrated Building Design", desc: "Full-spectrum architectural design for commercial, residential, industrial, and institutional projects." },
  { icon: Compass, title: "Code Consultation (CP)", desc: "Complex building code consultation with CP Certified Professional expertise." },
  { icon: ShieldCheck, title: "Project Management", desc: "End-to-end project management including planning, coordination, and delivery oversight." },
  { icon: Award, title: "Sustainable Architecture", desc: "Environmentally responsible design guided by green building principles and LEED standards." },
];

const projects = [
  { img: project1, title: "Mixed-Use Development", category: "Commercial" },
  { img: project2, title: "High-Rise Residential", category: "Residential" },
  { img: project3, title: "Specialized Industrial", category: "Industrial" },
];

const trustPoints = [
  "Canadian Home Builder's Association Sam Awards Finalist",
  "CHBA National Awards for Housing Excellence Finalist",
  "U.S. Green Building Council — Las Vegas Regional Chapter",
  "CP Certified Professional",
];

const Index = () => {
  return (
    <main className="pb-16 md:pb-0">
      {/* HERO */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={heroImg} alt="Modern architectural building by Architect 57" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[hsl(var(--hero-overlay))]/80" />
        </div>
        <div className="container-wide relative z-10 py-32 md:py-40">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-secondary mb-6">
              Richmond, BC — Design Build Firm
            </p>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <h1 className="font-heading text-[38px] md:text-[52px] lg:text-[64px] font-extrabold leading-[1.05] text-white max-w-3xl mb-6">
              Integrated Architecture &amp; Building Code Experts
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={200}>
            <p className="text-lg md:text-xl text-white/80 max-w-xl mb-10 leading-relaxed">
              Architect 57 Inc. specializes in integrated building design, complex building code consultation, specialized industrial, research and technology, mix-use, commercial, residential, and sustainable architecture.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 text-base">
                Get a Free Consultation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:604-818-2088" className="btn-outline border-white text-white hover:bg-white hover:text-foreground inline-flex items-center justify-center gap-2 text-base">
                <Phone className="w-4 h-4" />
                604-818-2088
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="bg-primary">
        <div className="container-wide py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((s, i) => (
              <ScrollReveal key={s.value} delay={i * 80}>
                <div className="text-center">
                  <div className="font-heading text-3xl md:text-4xl font-extrabold text-secondary mb-1">{s.value}</div>
                  <div className="text-sm text-primary-foreground/80 font-medium">{s.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section-padding-lg bg-[hsl(var(--section-alt))]">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">What We Do</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 max-w-2xl">
              Comprehensive Architectural Services
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mb-12">
              From design through delivery, we bring technical precision and creative vision to every project.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 80}>
                <div className="bg-background rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300 h-full">
                  <s.icon className="w-10 h-10 text-primary mb-5" strokeWidth={1.5} />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{s.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={350}>
            <div className="mt-10 text-center">
              <Link to="/contact" className="btn-primary inline-flex items-center gap-2">
                Discuss Your Project <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* TRUST SIGNALS */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Why Choose Us</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                Award-Winning Expertise You Can Trust
              </h2>
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                Architect 57 Inc. is a proud finalist of the Canadian Home Builder's Association Sam Awards. Principal Ching-yeh (Cary) Tsai devotes his energy towards sustainable design and community building.
              </p>
              <ul className="space-y-4 mb-8">
                {trustPoints.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-foreground font-medium">{t}</span>
                  </li>
                ))}
              </ul>
              <Link to="/about" className="btn-outline inline-flex items-center gap-2">
                Learn More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://static.wixstatic.com/media/c77437_4601df6848d54b219a808518d7bc496d~mv2.jpg/v1/fit/w_960/h_541/q_90/quality_auto/c77437_4601df6848d54b219a808518d7bc496d~mv2.jpg"
                  alt="Architect 57 project"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-lg" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* PROJECTS PREVIEW */}
      <section className="section-padding-lg bg-[hsl(var(--section-alt))]">
        <div className="container-wide">
          <ScrollReveal>
            <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">Our Work</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-12">Featured Projects</h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 100}>
                <Link to="/projects" className="group block rounded-lg overflow-hidden bg-background shadow-sm hover:shadow-lg transition-shadow duration-300">
                  <div className="overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      className="w-full aspect-[3/2] object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">{p.category}</span>
                    <h3 className="font-heading text-lg font-bold text-foreground mt-1">{p.title}</h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal delay={350}>
            <div className="mt-10 text-center">
              <Link to="/projects" className="btn-outline inline-flex items-center gap-2">
                View All Projects <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal direction="left">
              <div className="relative rounded-lg overflow-hidden shadow-xl">
                <img
                  src="https://static.wixstatic.com/media/c77437_103a5583bbfd4523ad16683a9cd14d0c~mv2.jpg/v1/fit/w_960/h_540/quality_auto/c77437_103a5583bbfd4523ad16683a9cd14d0c~mv2.jpg"
                  alt="Architect 57 building design"
                  className="w-full aspect-[4/3] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-foreground/10 rounded-lg" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right">
              <p className="font-heading text-sm font-bold uppercase tracking-[0.2em] text-primary mb-3">About Architect 57</p>
              <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-6">
                Building a Better, Healthier World
              </h2>
              <p className="text-muted-foreground text-lg mb-6 leading-relaxed">
                We believe that it is our responsibility making this world a better and healthier place for living. Our principal, Ching-yeh (Cary) Tsai, devotes his energy towards the formation of the U.S. Green Building Council — Las Vegas Regional Chapter.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                From integrated project delivery and BIM to complex code consultation and sustainable architecture, we bring decades of experience to every engagement.
              </p>
              <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                More About Us <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative section-padding-lg overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="container-wide relative z-10 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground mb-6 mx-auto max-w-2xl">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-10">
              Contact Architect 57 Inc. for integrated building design, code consultation, and project management in Richmond, BC.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="btn-secondary inline-flex items-center justify-center gap-2 text-base">
                Get a Free Consultation <ArrowRight className="w-4 h-4" />
              </Link>
              <a href="tel:604-818-2088" className="inline-flex items-center justify-center gap-2 text-base font-heading font-bold text-primary-foreground border-2 border-primary-foreground/30 px-7 py-3.5 rounded transition-all hover:bg-primary-foreground/10 active:scale-[0.97]">
                <Phone className="w-4 h-4" />
                Call 604-818-2088
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
