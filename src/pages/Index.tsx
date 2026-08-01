import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useMemo } from "react";
import ScrollReveal from "@/components/ScrollReveal";
import DiagonalMarquee from "@/components/DiagonalMarquee";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import aboutImg from "@/assets/about-us-01.webp";
import chbaAward from "@/assets/chba-award.jpg";
import { useArchitect57Projects, fisherYatesShuffle } from "@/hooks/useArchitect57Projects";
import { categoryName, projectTitle } from "@/types/project";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";

const Index = () => {
  const { projects, isLoading } = useArchitect57Projects();
  const { t, lang } = useLang();

  // Randomize once per Homepage mount, after data has loaded.
  const featuredProjects = useMemo(() => {
    if (projects.length === 0) return [];
    const pool = projects.slice(0, 18);
    return fisherYatesShuffle(pool).slice(0, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projects.length === 0]);

  usePageMeta({
    title: "Architect 57 無極建築 | Design Build | Richmond, BC",
    description: "Architect 57 無極建築 delivers integrated design-build services across residential, commercial, industrial, and institutional sectors in Metro Vancouver and beyond.",
  });


  const services = [
    { num: "01", title: t("services.s1.title"), desc: t("services.s1.desc") },
    { num: "02", title: t("services.s2.title"), desc: t("services.s2.desc") },
    { num: "03", title: t("services.s3.title"), desc: t("services.s3.desc") },
    { num: "04", title: t("services.s4.title"), desc: t("services.s4.desc") },
  ];

  return (
    <main className="pb-16 md:pb-0">
      {/* HERO */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="Modern architecture at twilight" className="absolute inset-0 w-full h-full object-cover hero-slide-1" />
          <img src={hero2} alt="Residential tower at night" className="absolute inset-0 w-full h-full object-cover hero-slide-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,6%,10%)]/90 via-[hsl(240,6%,10%)]/40 to-transparent" />
        </div>
        <div className="absolute top-28 right-10 w-4 h-4 border-t border-r border-[#a11d2d]/25 z-10 hidden md:block" />
        <div className="container-wide relative z-10 pb-20 md:pb-28">
          <ScrollReveal>
            <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--gold-accent))] mb-5">
              {t("hero.location")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-4xl mb-6 tracking-tight">
              {t("hero.title1")}
              <br />
              <span className="font-medium">{t("hero.title2")}</span>
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={240}>
            <p className="text-base md:text-lg text-white/60 max-w-lg mb-10 leading-relaxed font-light">
              {t("hero.desc")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              >
                {t("hero.cta1")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-white border border-white/25 px-8 py-4 rounded-sm transition-all duration-300 hover:border-white/50 active:scale-[0.97]"
              >
                {t("hero.cta2")}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DiagonalMarquee />

      {/* SERVICES */}
      <section className="section-padding-lg bg-background relative">
        <div className="absolute top-12 left-6 md:left-10 w-px h-8 bg-[#a11d2d]/20" />
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                  {t("services.label")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-6 tracking-tight">
                  {t("services.title1")}
                  <br />
                  <span className="font-medium">{t("services.title2")}</span>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-8">
                  {t("services.desc")}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground active:scale-[0.97]"
                >
                  {t("services.cta")}
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

      {/* ABOUT */}
      <section className="relative bg-[hsl(var(--surface-warm))] overflow-hidden">
        <div className="container-wide py-28 md:py-40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative">
                <img src={aboutImg} alt="Architect 57 無極建築 office reception" className="w-full aspect-[3/4] object-cover rounded-sm" loading="lazy" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#a11d2d]/25" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5 lg:col-start-8">
              <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                {t("about.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-6 tracking-tight">
                {t("about.title1")}
                <br />
                <span className="font-medium">{t("about.title2")}</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">
                {t("about.desc")}
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6 text-[15px] italic">
                {t("about.quote")}
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-8">
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CP</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">{t("about.cp")}</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CHBA</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">{t("about.chba")}</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">BIM</span>
                  <span className="block text-[11px] text-muted-foreground font-light tracking-wider uppercase mt-1">{t("about.bim")}</span>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
              >
                {t("about.cta")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="mt-8">
                <img src={chbaAward} alt="CHBA National Awards for Housing Excellence" className="w-40 md:w-48 object-contain" loading="lazy" />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="section-padding-lg bg-background relative">
        <div className="absolute top-12 right-6 md:right-10 w-3 h-3 border-t border-r border-[#a11d2d]/20 hidden md:block" />
        <div className="container-wide">
          <ScrollReveal>
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="font-heading text-[11px] font-light tracking-[0.3em] uppercase text-[hsl(var(--purple-muted))] mb-4">
                  {t("featured.label")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground tracking-tight">
                  {t("featured.title1")} <span className="font-medium">{t("featured.title2")}</span>
                </h2>
              </div>
              <Link
                to="/projects"
                className="hidden md:inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
              >
                {t("featured.viewAll")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </ScrollReveal>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-full aspect-[16/10] rounded-sm bg-muted animate-pulse" />
              ))}
            </div>
          ) : featuredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {featuredProjects.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 80}>
                  <Link to={`/projects/${p.slug}`} className="group block relative overflow-hidden rounded-sm">
                    {p.featuredImageUrl ? (
                      <img src={p.featuredImageUrl} alt={projectTitle(p, lang)} className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]" loading="lazy" />
                    ) : (
                      <div className="w-full aspect-[16/10] bg-muted" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 md:p-6">
                      <span className="font-heading text-[11px] font-light tracking-[0.2em] uppercase text-white/60">
                        {categoryName(p.category, lang) ?? ""}
                      </span>
                      <h3 className="font-heading text-lg md:text-xl font-light text-white mt-1">
                        {projectTitle(p, lang)}
                      </h3>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          ) : null}


          <div className="mt-8 text-center md:hidden">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-foreground border-b border-foreground/30 pb-1"
            >
              {t("featured.viewAllProjects")}
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
              {t("cta.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[0.95] mb-8 mx-auto max-w-3xl">
              {t("cta.title1")}
              <br />
              <span className="font-medium">{t("cta.title2")}</span>
            </h2>
            <p className="text-white/50 font-light max-w-md mx-auto mb-10 leading-relaxed">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 font-heading text-[13px] font-light tracking-[0.1em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              >
                {t("cta.btn1")}
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
          title="Architect 57 無極建築 Location — 203-2680 Shell Road, Richmond, BC"
        />
      </section>
    </main>
  );
};

export default Index;
