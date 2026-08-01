/**
 * Single source of truth for preserved legacy Architect 57 portfolio URLs.
 *
 * These root-level paths were indexed by Google from the previous Wix site and
 * must keep returning real HTTP 200 pages rendered with the current CMS-powered
 * Projects UI. Add new verified paths here only (Google Search Console / old
 * Wix sitemap) — routing, canonicals, sitemap and the route audit all read
 * from this list.
 */

export interface LegacyPortfolioFilter {
  category?: string;
  tag1?: string;
  tag2?: string;
}

export interface LegacyPortfolioRoute {
  path: string;
  titleEn: string;
  titleZh: string;
  descriptionEn: string;
  descriptionZh: string;
  filters: LegacyPortfolioFilter[];
}

export const legacyPortfolioRoutes: LegacyPortfolioRoute[] = [
  {
    path: "/single-family",
    titleEn: "Single-Family Projects | Architect 57 無極建築",
    titleZh: "獨立住宅專案 | Architect 57 無極建築",
    descriptionEn:
      "Explore selected single-family residential projects by Architect 57.",
    descriptionZh: "瀏覽 Architect 57 無極建築的精選獨立住宅專案。",
    filters: [
      {
        category: "Residential",
        tag1: "Single-Family",
      },
    ],
  },
  {
    path: "/daycare",
    titleEn: "Daycare Projects | Architect 57 無極建築",
    titleZh: "幼兒教育空間專案 | Architect 57 無極建築",
    descriptionEn:
      "Explore selected daycare and early-learning projects by Architect 57.",
    descriptionZh: "瀏覽 Architect 57 無極建築的幼兒教育及日托空間專案。",
    filters: [
      {
        category: "Civic / Institutional",
        tag1: "Education",
        tag2: "Daycare",
      },
    ],
  },
  {
    path: "/multi-family-office-building",
    titleEn: "Multi-Family and Office Building Projects | Architect 57 無極建築",
    titleZh: "多戶住宅及辦公建築專案 | Architect 57 無極建築",
    descriptionEn:
      "Explore selected multi-family residential, mixed-use, townhouse, apartment, high-rise, and office-building projects by Architect 57.",
    descriptionZh:
      "瀏覽 Architect 57 無極建築的多戶住宅、綜合用途、聯排住宅、公寓、高層住宅及辦公建築專案。",
    filters: [
      {
        category: "Residential",
        tag1: "Multi-Family",
      },
      {
        category: "Commercial",
        tag1: "Office",
      },
      {
        category: "Mixed-Use",
      },
    ],
  },
];

/** Route key = path without the leading slash. */
export const legacyRouteKey = (route: LegacyPortfolioRoute): string =>
  route.path.replace(/^\//, "");

export const getLegacyPortfolioRoute = (
  routeKey: string
): LegacyPortfolioRoute | undefined =>
  legacyPortfolioRoutes.find((r) => legacyRouteKey(r) === routeKey);

/** Case-insensitive, whitespace-trimmed comparison used for CMS matching. */
export const normalizeTaxonomy = (value?: string | null): string =>
  typeof value === "string" ? value.trim().toLowerCase() : "";
