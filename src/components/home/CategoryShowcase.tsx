import { useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ScrollReveal from "@/components/ScrollReveal";
import { fisherYatesShuffle } from "@/hooks/useArchitect57Projects";
import { useLang } from "@/contexts/LangContext";
import { localizedCategoryName } from "@/utils/projectLocalization";
import type { PublicProject, PublicProjectCategory } from "@/types/project";

/** Normalize a CMS category name or slug for comparison against the approved list. */
export const normalizeCategoryKey = (value?: string | null): string =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

/** The eleven approved Architect 57 CMS categories eligible for the homepage showcase. */
export const APPROVED_CATEGORIES = [
  "Civic / Institutional",
  "Commercial",
  "Cultural",
  "Healthcare",
  "Hospitality",
  "Industrial",
  "Interior Design / Tenant Improvement",
  "Mixed-Use",
  "Religious",
  "Residential",
  "Urban Design & Master Planning",
] as const;

const APPROVED_KEYS = new Set(APPROVED_CATEGORIES.map(normalizeCategoryKey));

/** Fallback Traditional Chinese names used only when the CMS has no name_zh. */
const ZH_FALLBACK: Record<string, string> = {
  civicinstitutional: "公共 / 機構",
  commercial: "商業",
  cultural: "文化",
  healthcare: "醫療",
  hospitality: "酒店餐飲",
  industrial: "工業",
  interiordesigntenantimprovement: "室內設計 / 租戶裝修",
  mixeduse: "綜合用途",
  religious: "宗教",
  residential: "住宅",
  urbandesignmasterplanning: "城市設計與總體規劃",
};

export interface ShowcaseCategory {
  category: PublicProjectCategory;
  imageUrl: string | null;
}

const SHOWCASE_COUNT = 6;

/**
 * Build the eligible category list from CMS projects:
 * only approved categories, cover image = first project by sort_order with an image.
 */
export function buildEligibleCategories(projects: PublicProject[]): ShowcaseCategory[] {
  const byCategory = new Map<string, { category: PublicProjectCategory; projects: PublicProject[] }>();

  for (const p of projects) {
    const cat = p.category;
    if (!cat || !cat.isActive) continue;
    const key = normalizeCategoryKey(cat.name);
    const slugKey = normalizeCategoryKey(cat.slug);
    if (!APPROVED_KEYS.has(key) && !APPROVED_KEYS.has(slugKey)) continue;
    const entry = byCategory.get(cat.id) ?? { category: cat, projects: [] };
    entry.projects.push(p);
    byCategory.set(cat.id, entry);
  }

  return Array.from(byCategory.values())
    .map(({ category, projects: list }) => {
      const sorted = [...list].sort(
        (a, b) => a.sortOrder - b.sortOrder || a.createdAt.localeCompare(b.createdAt)
      );
      const cover = sorted.find((p) => !!p.featuredImageUrl)?.featuredImageUrl ?? null;
      if (!cover && import.meta.env.DEV) {
        console.warn(
          `[Architect57] Category "${category.name}" has no published project with a featured image.`
        );
      }
      return { category, imageUrl: cover };
    })
    .sort(
      (a, b) =>
        a.category.sortOrder - b.category.sortOrder ||
        a.category.name.localeCompare(b.category.name)
    );
}

/** Pick six distinct categories, preferring those that have a cover image. */
export function selectShowcaseCategories(eligible: ShowcaseCategory[]): ShowcaseCategory[] {
  const withImage = eligible.filter((e) => e.imageUrl);
  const withoutImage = eligible.filter((e) => !e.imageUrl);
  const picked = fisherYatesShuffle(withImage).slice(0, SHOWCASE_COUNT);
  if (picked.length < SHOWCASE_COUNT) {
    picked.push(...fisherYatesShuffle(withoutImage).slice(0, SHOWCASE_COUNT - picked.length));
  }
  return picked;
}

interface CategoryShowcaseProps {
  projects: PublicProject[];
  isLoading: boolean;
}

const CategoryShowcase = ({ projects, isLoading }: CategoryShowcaseProps) => {
  const { t, lang } = useLang();

  // Selection is computed once per homepage mount, immediately after data loads,
  // and then frozen — language switches and unrelated rerenders never change it.
  const frozen = useRef<ShowcaseCategory[] | null>(null);

  const eligible = useMemo(() => buildEligibleCategories(projects), [projects]);

  const selected = useMemo(() => {
    if (frozen.current) return frozen.current;
    if (eligible.length === 0) return [];
    frozen.current = selectShowcaseCategories(eligible);
    return frozen.current;
  }, [eligible]);

  const categoryLabel = (category: PublicProjectCategory) => {
    const cms = localizedCategoryName(category, lang);
    if (lang === "zh" && !category.nameZh) {
      const key = normalizeCategoryKey(category.name) || normalizeCategoryKey(category.slug);
      return ZH_FALLBACK[key] ?? cms;
    }
    return cms;
  };

  return (
    <section id="projects" className="section-padding-lg bg-background relative">
      <div className="absolute top-10 right-6 md:right-10 w-3 h-3 border-t border-r border-[#a11d2d]/20 hidden md:block" />
      <div className="container-wide">
        <ScrollReveal>
          <div className="flex items-end justify-between mb-7 md:mb-9">
            <div>
              <p className="section-eyebrow section-eyebrow--purple mb-3">
                {t("featured.label")}
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-light text-foreground tracking-tight">
                {t("categories.title")}
              </h2>
            </div>
            <Link
              to="/projects"
              className="hidden md:inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1 transition-colors hover:border-foreground"
            >
              {t("featured.viewAll")}
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Array.from({ length: SHOWCASE_COUNT }).map((_, i) => (
              <div key={i} className="w-full aspect-[16/10] rounded-sm bg-muted animate-pulse" />
            ))}
          </div>
        ) : selected.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {selected.map(({ category, imageUrl }, i) => (
              <ScrollReveal key={category.id} delay={i * 80}>
                <Link
                  to={`/projects/collection/${category.slug}`}
                  className="group block relative overflow-hidden rounded-sm"
                >
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={categoryLabel(category)}
                      className="w-full aspect-[16/10] object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full aspect-[16/10] bg-[hsl(var(--surface-charcoal))]" />
                  )}
                  <div className="absolute inset-0 overlay-scrim" />
                  <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                    <h3 className="font-heading text-xl md:text-2xl font-medium overlay-text tracking-tight leading-snug break-words">
                      {categoryLabel(category)}
                    </h3>
                    <span className="mt-2 inline-flex items-center gap-2 card-label card-label--on-dark">
                      {t("category.viewProjects")}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : null}

        <div className="mt-7 text-center md:hidden">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-heading text-[13px] md:text-[14px] font-semibold tracking-[0.07em] uppercase text-foreground border-b border-foreground/30 pb-1"
          >
            {t("featured.viewAllProjects")}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;
