import { useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { useLang } from "@/contexts/LangContext";
import { localizedCategoryName, localizedProjectTitle } from "@/utils/projectLocalization";
import type { PublicProject } from "@/types/project";

/**
 * Client-approved Homepage "Our Work" sequence.
 * Slugs point at existing published CMS records — no duplicated project data here.
 * All displayed content (title, Chinese title, category, image, link) comes from the CMS.
 */
export const OUR_WORK_SLUGS = [
  "rayacom-super-print-factory", // 1. Industrial — Rayacom
  "54th-ave-condo-12", // 2. Residential — 54th
  "new-university-hospital", // 3. University Hospital
  "bridgeport-office", // 4. Commercial — Bridgeport Office
  "arabica-coffee", // 5. Hospitality — %Arabica Coffee (2nd row, middle)
  "architect-57-office", // 6. Interior — Architect 57
  "sqn-education", // 7. Civic — SQN
  "lutheran-community-church", // 8. Religious — Lutheran (3rd row, middle)
  "titanic-exhibition", // 9. Cultural — Titanic
] as const;

interface OurWorkProps {
  projects: PublicProject[];
  isLoading: boolean;
}

const OurWork = ({ projects, isLoading }: OurWorkProps) => {
  const { t, lang } = useLang();

  const selected = useMemo(() => {
    const bySlug = new Map(projects.map((p) => [p.slug, p]));
    const missing: string[] = [];
    const list = OUR_WORK_SLUGS.map((slug) => {
      const found = bySlug.get(slug);
      if (!found) missing.push(slug);
      return found;
    }).filter((p): p is PublicProject => !!p);
    if (missing.length && import.meta.env.DEV) {
      console.warn("[Architect57] Our Work — missing CMS projects:", missing);
    }
    return list;
  }, [projects]);

  return (
    <section id="projects" className="section-padding-lg bg-[#1a1a1a] relative">
      <div className="container-wide">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-7 md:mb-9">
            <div>
              <p className="section-eyebrow section-eyebrow--gold-bright mb-3">
                {t("featured.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-white tracking-tight">
                {t("featured.title1")} {t("featured.title2")}
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-white border-b border-white/40 pb-1 transition-colors hover:border-white"
            >
              {t("featured.viewAll")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="w-full aspect-[16/10] rounded-sm bg-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {selected.map((project, i) => (
              <ScrollReveal key={project.id} delay={i * 60}>
                <Link
                  to={`/projects/${project.slug}`}
                  className="group block relative overflow-hidden rounded-sm"
                >
                  {project.featuredImageUrl ? (
                    <img
                      src={project.featuredImageUrl}
                      alt={localizedProjectTitle(project, lang)}
                      className="w-full aspect-[16/10] object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[16/10] bg-[hsl(var(--surface-charcoal))]" />
                  )}
                  <div className="absolute inset-0 overlay-scrim" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    {project.category && (
                      <span className="block card-label card-label--on-dark mb-1.5">
                        {localizedCategoryName(project.category, lang)}
                      </span>
                    )}
                    <h3 className="font-heading text-xl md:text-2xl font-medium overlay-text tracking-tight leading-snug break-words">
                      {localizedProjectTitle(project, lang)}
                    </h3>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        )}

        <div className="mt-7 text-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-white border-b border-white/40 pb-1"
          >
            {t("featured.viewAllProjects")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OurWork;
