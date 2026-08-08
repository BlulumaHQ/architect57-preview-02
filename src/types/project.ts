export interface PublicProjectCategory {
  id: string;
  name: string;
  nameZh: string | null;
  slug: string;
  sortOrder: number;
  isActive: boolean;
}

export interface PublicProjectTag {
  id: string;
  name: string;
  nameZh: string | null;
  slug: string;
  level: 1 | 2;
  sortOrder: number;
  isActive: boolean;
  categoryId: string | null;
  parentTagId: string | null;
}

export interface PublicProjectImage {
  id: string;
  url: string;
  altText: string | null;
  altTextZh: string | null;
  caption: string | null;
  captionZh: string | null;
  credit: string | null;
  isFeatured: boolean;
  sortOrder: number;
  width: number | null;
  height: number | null;
}

export interface PublicProject {
  id: string;
  slug: string;

  title: string;
  titleZh: string | null;

  excerpt: string | null;
  excerptZh: string | null;

  bodyContent: string | null;
  bodyContentZh: string | null;

  seoTitle: string | null;
  seoTitleZh: string | null;
  seoDescription: string | null;
  seoDescriptionZh: string | null;

  status: string;
  isFeatured: boolean;
  sortOrder: number;

  category: PublicProjectCategory | null;
  tag1: PublicProjectTag | null;
  tag2: PublicProjectTag | null;
  allTags: PublicProjectTag[];

  location: string | null;
  city: string | null;
  province: string | null;
  country: string | null;

  projectStatus: string | null;
  projectYear: string | null;
  yearStarted: string | null;
  yearCompleted: string | null;

  floorAreaValue: number | null;
  floorAreaUnit: string | null;
  siteAreaValue: number | null;
  siteAreaUnit: string | null;

  unitsCount: number | null;
  storeysCount: number | null;
  parkingSpaces: number | null;
  constructionBudget: string | null;

  services: string[];
  role: string | null;
  architectRoles: string[];
  shortSummary: string | null;

  scopeOfWork: string | null;
  scopeOfWorkZh: string | null;
  keyFeatures: string | null;
  keyFeaturesZh: string | null;

  designArchitect: string | null;
  architectOfRecord: string | null;
  interiorDesigner: string | null;
  landscapeArchitect: string | null;
  structuralEngineer: string | null;
  mechanicalEngineer: string | null;
  electricalEngineer: string | null;
  civilEngineer: string | null;
  otherConsultants: string | null;
  generalContractor: string | null;
  developerOwnerClient: string | null;
  photographer: string | null;
  otherCredits: string | null;

  awards: string | null;
  publications: string | null;

  featuredImageUrl: string | null;
  images: PublicProjectImage[];

  createdAt: string;
  updatedAt: string;
}

export type Lang = "en" | "zh";

/** Formatted area string, floor area first, then site area. */
export const projectArea = (p: PublicProject): string | null => {
  const fmt = (value: number | null, unit: string | null) => {
    if (value === null || value === undefined || Number.isNaN(value)) return null;
    const hasDecimals = !Number.isInteger(value);
    const num = value.toLocaleString("en-US", {
      minimumFractionDigits: hasDecimals ? 2 : 0,
      maximumFractionDigits: 2,
    });
    return unit ? `${num} ${unit}` : num;
  };
  return (
    fmt(p.floorAreaValue, p.floorAreaUnit) ??
    fmt(p.siteAreaValue, p.siteAreaUnit) ??
    null
  );
};
