import type {
  Lang,
  PublicProject,
  PublicProjectCategory,
  PublicProjectImage,
  PublicProjectTag,
} from "@/types/project";

/**
 * Single source of truth for bilingual rendering of CMS project data.
 * Both English and Traditional Chinese render through the SAME components;
 * only the values returned by these helpers differ.
 */

const clean = (v?: string | null): string => (typeof v === "string" ? v.trim() : "");

/** Pick the Chinese value when in zh mode and non-empty, else the English value. */
export function localizedValue(
  lang: Lang,
  englishValue?: string | null,
  chineseValue?: string | null
): string {
  if (lang === "zh") {
    const zh = clean(chineseValue);
    if (zh) return zh;
  }
  return clean(englishValue);
}

/** First non-empty value in the provided chain. */
const firstOf = (...values: Array<string | null | undefined>): string => {
  for (const v of values) {
    const s = clean(v);
    if (s) return s;
  }
  return "";
};

export const localizedProjectTitle = (p: PublicProject, lang: Lang): string =>
  localizedValue(lang, p.title, p.titleZh) || clean(p.title);

export const localizedExcerpt = (p: PublicProject, lang: Lang): string =>
  localizedValue(lang, p.excerpt, p.excerptZh);

export const localizedBodyContent = (p: PublicProject, lang: Lang): string =>
  localizedValue(lang, p.bodyContent, p.bodyContentZh);

export const localizedScopeOfWork = (p: PublicProject, lang: Lang): string =>
  localizedValue(lang, p.scopeOfWork, p.scopeOfWorkZh);

export const localizedKeyFeatures = (p: PublicProject, lang: Lang): string =>
  localizedValue(lang, p.keyFeatures, p.keyFeaturesZh);

/** Main body/overview copy with the full bilingual fallback chain. */
export function localizedDescription(p: PublicProject, lang: Lang): string {
  if (lang === "zh") {
    return firstOf(
      p.bodyContentZh,
      p.scopeOfWorkZh,
      p.excerptZh,
      p.bodyContent,
      p.scopeOfWork,
      p.shortSummary,
      p.excerpt
    );
  }
  return firstOf(p.bodyContent, p.scopeOfWork, p.shortSummary, p.excerpt);
}

export function localizedSeoTitle(p: PublicProject, lang: Lang): string {
  const suffix = "Architect 57 無極建築";
  const explicit = lang === "zh" ? clean(p.seoTitleZh) : clean(p.seoTitle);
  if (explicit) return explicit;
  return `${localizedProjectTitle(p, lang)} | ${suffix}`;
}

export function localizedSeoDescription(p: PublicProject, lang: Lang): string {
  if (lang === "zh") {
    return firstOf(
      p.seoDescriptionZh,
      p.excerptZh,
      p.seoDescription,
      p.excerpt,
      p.shortSummary
    );
  }
  return firstOf(p.seoDescription, p.excerpt, p.shortSummary);
}

export const localizedCategoryName = (
  category: PublicProjectCategory | null,
  lang: Lang
): string => (category ? localizedValue(lang, category.name, category.nameZh) : "");

export const localizedTagName = (
  tag: PublicProjectTag | null,
  lang: Lang
): string => (tag ? localizedValue(lang, tag.name, tag.nameZh) : "");

export const localizedTag1Name = (p: PublicProject, lang: Lang): string =>
  localizedTagName(p.tag1, lang);

export const localizedTag2Name = (p: PublicProject, lang: Lang): string =>
  localizedTagName(p.tag2, lang);

/** alt_text_zh → alt_text → localized project title. */
export function localizedImageAlt(
  image: Pick<PublicProjectImage, "altText" | "altTextZh"> | null,
  lang: Lang,
  fallbackTitle: string
): string {
  const value = image ? localizedValue(lang, image.altText, image.altTextZh) : "";
  return value || fallbackTitle;
}

export function localizedImageCaption(
  image: Pick<PublicProjectImage, "caption" | "captionZh"> | null,
  lang: Lang
): string {
  return image ? localizedValue(lang, image.caption, image.captionZh) : "";
}
