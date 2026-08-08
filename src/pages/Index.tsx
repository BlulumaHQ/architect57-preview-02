import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import DiagonalMarquee from "@/components/DiagonalMarquee";
import OurWork from "@/components/home/OurWork";
import Architect57Map from "@/components/Architect57Map";
import hero1 from "@/assets/hero-1.jpg";
import hero2 from "@/assets/hero-2.jpg";
import aboutImg from "@/assets/about-us-01.webp";
import { useArchitect57Projects } from "@/hooks/useArchitect57Projects";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";

const Index = () => {
  const { projects, isLoading } = useArchitect57Projects();
  const { t } = useLang();

  usePageMeta({
    title: "Architect 57 無極建築 | Design Build | Richmond, BC",
    description: "Architect 57 Inc. delivers integrated design-build services across residential, commercial, industrial, and institutional sectors in Metro Vancouver and beyond.",
  });


  const services = [
    { num: "01", title: t("services.s1.title"), desc: t("services.s1.desc") },
    { num: "02", title: t("services.s2.title"), desc: t("services.s2.desc") },
    { num: "03", title: t("services.s3.title"), desc: t("services.s3.desc") },
    { num: "04", title: t("services.s4.title"), desc: t("services.s4.desc") },
    { num: "05", title: t("services.s5.title"), desc: t("services.s5.desc") },
  ];


  return (
    <main className="pb-16 md:pb-0">
      {/* HERO */}
      <section className="relative h-[76svh] min-h-[520px] md:h-screen md:min-h-[600px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero1} alt="Modern architecture at twilight" className="absolute inset-0 w-full h-full object-cover hero-slide-1" />
          <img src={hero2} alt="Residential tower at night" className="absolute inset-0 w-full h-full object-cover hero-slide-2" />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(240,6%,10%)]/90 via-[hsl(240,6%,10%)]/40 to-transparent" />
        </div>
        <div className="absolute top-28 right-10 w-4 h-4 border-t border-r border-[#a11d2d]/25 z-10 hidden md:block" />
        <div className="container-wide relative z-10 pb-14 md:pb-24">
          <ScrollReveal>
            <p className="section-eyebrow section-eyebrow--gold-bright mb-5">
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
            <p className="text-[15px] md:text-lg copy-on-dark overlay-text max-w-lg mb-8 leading-relaxed">
              {t("hero.desc")}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={360}>
            <div className="flex">
              <Link
                to="/projects"
                className="inline-flex items-center gap-3 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-white bg-[#714C90] px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#56386F] active:scale-[0.97]"
              >
                {t("hero.cta2")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <DiagonalMarquee />

      {/* SERVICES */}
      <section className="pt-16 md:pt-28 pb-8 md:pb-12 bg-background relative">
        <div className="absolute top-12 left-6 md:left-10 w-px h-8 bg-[#a11d2d]/20" />
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
            <div className="lg:col-span-4">
              <ScrollReveal>
                <p className="section-eyebrow section-eyebrow--purple mb-4">
                  {t("services.label")}
                </p>
                <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-6 tracking-tight">
                  {t("services.title1")}
                  <br />
                  <span className="font-medium">{t("services.title2")}</span>
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed mb-4">
                  {t("services.desc")}
                </p>
                <p className="text-foreground/80 leading-relaxed text-[15px] mb-6">
                  {t("services.sustainability")}
                </p>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground active:scale-[0.97]"
                >
                  {t("services.cta")}
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-8">
              <div className="space-y-0 divide-y divide-border">
                {services.map((s, i) => (
                  <ScrollReveal key={s.num} delay={i * 60}>
                    <div className="py-3 md:py-[14px] grid grid-cols-1 md:grid-cols-12 gap-x-4 gap-y-1.5 items-start">
                      <span className="md:col-span-2 font-heading text-[13px] md:text-[14px] font-bold text-[hsl(var(--purple-brand))] tracking-wider">
                        {s.num}
                      </span>
                      <h3 className="md:col-span-4 font-heading text-[17px] md:text-lg font-medium text-foreground">
                        {s.title}
                      </h3>
                      <p className="md:col-span-6 text-muted-foreground leading-relaxed text-[15px] mt-1.5 md:mt-0">
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

      {/* OUR WORK */}
      <OurWork projects={projects} isLoading={isLoading} />

      {/* ABOUT — sits immediately above Let's Collaborate */}
      <section id="about" className="relative bg-[hsl(var(--surface-warm))] overflow-hidden">
        <div className="container-wide py-16 md:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative">
                <img src={aboutImg} alt="Architect 57 無極建築 office reception" className="w-full aspect-[3/4] object-cover rounded-sm" loading="lazy" />
                <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[#a11d2d]/25" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5 lg:col-start-8">
              <p className="section-eyebrow section-eyebrow--purple mb-3">
                {t("about.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground leading-tight mb-5 tracking-tight">
                {t("about.title1")}
                <br />
                <span className="font-medium">{t("about.title2")}</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-5">
                {t("about.desc")}
              </p>
              <p className="text-muted-foreground font-light leading-relaxed mb-5 text-[15px] italic">
                {t("about.quote")}
              </p>
              <div className="flex flex-wrap gap-x-8 gap-y-3 mb-6">
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CP</span>
                  <span className="block card-label card-label--muted mt-1">{t("about.cp")}</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">CHBA</span>
                  <span className="block card-label card-label--muted mt-1">{t("about.chba")}</span>
                </div>
                <div>
                  <span className="font-heading text-2xl font-light text-foreground">BIM</span>
                  <span className="block card-label card-label--muted mt-1">{t("about.bim")}</span>
                </div>
              </div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
              >
                {t("about.cta")}
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="relative overflow-hidden bg-[hsl(var(--surface-dark))]">
        <div className="container-wide py-16 md:py-28 text-center relative z-10">
          <ScrollReveal>
            <p className="section-eyebrow section-eyebrow--gold-bright mb-5">
              {t("cta.label")}
            </p>
            <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-white tracking-tight leading-[0.95] mb-8 mx-auto max-w-3xl">
              {t("cta.title1")}
              <br />
              <span className="font-medium">{t("cta.title2")}</span>
            </h2>
            <p className="copy-on-dark max-w-md mx-auto mb-8 leading-relaxed">
              {t("cta.desc")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
              >
                {t("cta.btn1")}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="tel:604-818-2088"
                className="inline-flex items-center justify-center gap-3 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-white border border-white/20 px-8 py-4 rounded-sm transition-all duration-300 hover:border-white/40 active:scale-[0.97]"
              >
                Call 604.818.2088
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* MAP */}
      <section className="h-[280px] md:h-[380px] w-full">
        <Architect57Map title="Architect 57 Inc. — 203-2680 Shell Road, Richmond, BC" />
      </section>
    </main>
  );
};

export default Index;
