import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import aboutImg1 from "@/assets/about-us-01.webp";
import { useLang } from "@/contexts/LangContext";
import usePageMeta from "@/hooks/usePageMeta";

const About = () => {
  const { t } = useLang();
  usePageMeta({
    title: "About | Architect 57 無極建築",
    description: "Learn about Architect 57 無極建築 — a Richmond-based architecture studio specializing in design-build, building code consulting, BIM coordination, and sustainable design across BC and beyond.",
  });

  const services = Array.from({ length: 16 }, (_, i) => t(`svc.${i + 1}`));

  return (
    <main className="pb-16 md:pb-0">
      {/* Hero */}
      <section className="relative bg-[hsl(var(--surface-dark))] pt-28 md:pt-36 pb-12 md:pb-20">
        <div className="absolute bottom-8 right-10 w-4 h-4 border-b border-r border-[#a11d2d]/20 hidden md:block" />
        <div className="container-wide">
          <ScrollReveal>
            <p className="section-eyebrow section-eyebrow--gold-bright mb-4">{t("aboutPage.label")}</p>
            <h1 className="font-heading text-[40px] md:text-[60px] lg:text-[76px] font-light leading-[0.95] text-white max-w-3xl tracking-tight">
              {t("brand.inc")}
            </h1>
            <p className="text-lg text-white/90 font-light mt-4">
              {t("aboutPage.subtitle")}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding-lg bg-background relative">
        <div className="absolute top-12 left-6 md:left-10 w-px h-8 bg-[#a11d2d]/20" />
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <ScrollReveal direction="left" className="lg:col-span-6">
              <div className="relative overflow-hidden rounded-sm">
                <img src={aboutImg1} alt="Architect 57 無極建築 office" className="w-full aspect-[4/3] object-cover" loading="lazy" />
                <div className="absolute -bottom-1 -right-1 w-5 h-5 border-b border-r border-[#a11d2d]/25" />
              </div>
            </ScrollReveal>
            <ScrollReveal direction="right" className="lg:col-span-5 lg:col-start-8">
              <p className="section-eyebrow section-eyebrow--purple mb-4">
                {t("aboutPage.storyLabel")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-6 tracking-tight">
                {t("aboutPage.storyTitle1")} <span className="font-medium">{t("aboutPage.storyTitle2")}</span>
              </h2>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">{t("aboutPage.p1")}</p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">{t("aboutPage.p2")}</p>
              <p className="text-muted-foreground font-light leading-relaxed mb-6">{t("aboutPage.p3")}</p>
              <p className="text-foreground font-light text-lg italic leading-relaxed">
                {t("about.quote")}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-[hsl(var(--surface-warm))]">
        <div className="container-wide">
          <ScrollReveal>
            <p className="section-eyebrow section-eyebrow--purple mb-4">
              {t("aboutPage.servicesLabel")}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground mb-8 tracking-tight">
              {t("aboutPage.servicesTitle1")} <span className="font-medium">{t("aboutPage.servicesTitle2")}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-4">
            {services.map((s, i) => (
              <ScrollReveal key={i} delay={i * 30}>
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
      <section className="bg-[hsl(var(--surface-dark))] py-14 md:py-24 text-center">
        <div className="container-tight">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-white mb-6 tracking-tight">
              {t("aboutPage.ctaTitle1")} <span className="font-medium">{t("aboutPage.ctaTitle2")}</span>
            </h2>
            <p className="text-white/90 font-light max-w-lg mx-auto mb-8 leading-relaxed">
              {t("aboutPage.ctaDesc")}
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-[hsl(var(--surface-dark))] bg-[hsl(var(--gold-accent))] px-8 py-4 rounded-sm transition-all duration-300 hover:opacity-90 active:scale-[0.97]"
            >
              {t("aboutPage.ctaBtn")} <ArrowRight className="w-4 h-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
};

export default About;
