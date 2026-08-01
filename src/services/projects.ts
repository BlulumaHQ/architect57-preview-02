import { supabase } from "@/lib/supabase";
import type {
  PublicProject,
  PublicProjectCategory,
  PublicProjectImage,
  PublicProjectTag,
} from "@/types/project";

const CLIENT_SLUGS = ["architect57", "architect-57"];

const isDev = import.meta.env.DEV;

const devWarn = (...args: unknown[]) => {
  if (isDev) console.warn(...args);
};

const nonEmpty = (v: unknown): string | null => {
  if (typeof v !== "string") return null;
  const trimmed = v.trim();
  return trimmed ? trimmed : null;
};

const num = (v: unknown): number | null =>
  v === null || v === undefined || v === "" ? null : Number(v);

interface ContentItemRow {
  id: string;
  slug: string | null;
  title: string | null;
  title_zh: string | null;
  excerpt: string | null;
  excerpt_zh: string | null;
  body_content: string | null;
  body_content_zh: string | null;
  seo_title: string | null;
  seo_title_zh: string | null;
  seo_description: string | null;
  seo_description_zh: string | null;
  status: string;
  is_featured: boolean | null;
  sort_order: number | null;
  featured_image_url: string | null;
  created_at: string;
  updated_at: string;
}

export class Architect57ClientNotFoundError extends Error {
  constructor() {
    super("Architect57 client not found");
    this.name = "Architect57ClientNotFoundError";
  }
}

export async function fetchArchitect57Projects(): Promise<PublicProject[]> {
  // 1. Find the Architect57 client by slug.
  const { data: clients, error: clientError } = await supabase
    .from("clients")
    .select("id, client_name, slug")
    .in("slug", CLIENT_SLUGS)
    .eq("status", "active");

  if (clientError) throw clientError;

  const client =
    clients?.find((c) => c.slug === "architect57") ?? clients?.[0] ?? null;

  if (!client) {
    if (isDev) {
      console.error(
        "[Architect57] No active client found with slug 'architect57'. Project content cannot be loaded."
      );
    }
    throw new Architect57ClientNotFoundError();
  }

  // 2. Published portfolio content items.
  const { data: itemRows, error: itemsError } = await supabase
    .from("content_items")
    .select(
      "id, slug, title, title_zh, excerpt, excerpt_zh, body_content, body_content_zh, seo_title, seo_title_zh, seo_description, seo_description_zh, status, is_featured, sort_order, featured_image_url, created_at, updated_at"
    )
    .eq("client_id", client.id)
    .eq("content_type", "portfolio")
    .eq("status", "published");

  if (itemsError) throw itemsError;

  const items = ((itemRows ?? []) as ContentItemRow[]).filter((i) =>
    nonEmpty(i.slug)
  );
  if (items.length === 0) return [];

  const ids = items.map((i) => i.id);

  // 3-9. Related data, batched.
  const [detailsRes, contentCatsRes, contentTagsRes, mediaRes] =
    await Promise.all([
      supabase.from("portfolio_details").select("*").in("content_id", ids),
      supabase
        .from("content_categories")
        .select("content_id, category_id")
        .in("content_id", ids),
      supabase
        .from("content_tags")
        .select("content_id, tag_id")
        .in("content_id", ids),
      supabase.from("media_assets").select("*").in("content_id", ids),
    ]);

  for (const res of [detailsRes, contentCatsRes, contentTagsRes, mediaRes]) {
    if (res.error) throw res.error;
  }

  const categoryIds = Array.from(
    new Set((contentCatsRes.data ?? []).map((r) => r.category_id).filter(Boolean))
  );
  const tagIds = Array.from(
    new Set((contentTagsRes.data ?? []).map((r) => r.tag_id).filter(Boolean))
  );

  const [catsRes, tagsRes] = await Promise.all([
    categoryIds.length
      ? supabase
          .from("categories")
          .select("id, name, name_zh, slug, sort_order, is_active")
          .in("id", categoryIds)
      : Promise.resolve({ data: [], error: null } as const),
    tagIds.length
      ? supabase
          .from("tags")
          .select(
            "id, name, name_zh, slug, tag_level, sort_order, is_active, category_id, parent_tag_id"
          )
          .in("id", tagIds)
      : Promise.resolve({ data: [], error: null } as const),
  ]);

  if (catsRes.error) throw catsRes.error;
  if (tagsRes.error) throw tagsRes.error;

  const categoryById = new Map<string, PublicProjectCategory>();
  for (const c of catsRes.data ?? []) {
    categoryById.set(c.id, {
      id: c.id,
      name: c.name ?? "",
      nameZh: nonEmpty(c.name_zh),
      slug: c.slug ?? "",
      sortOrder: c.sort_order ?? 0,
      isActive: c.is_active !== false,
    });
  }

  const tagById = new Map<string, PublicProjectTag>();
  for (const tg of tagsRes.data ?? []) {
    tagById.set(tg.id, {
      id: tg.id,
      name: tg.name ?? "",
      nameZh: nonEmpty(tg.name_zh),
      slug: tg.slug ?? "",
      level: (tg.tag_level === 2 ? 2 : 1) as 1 | 2,
      sortOrder: tg.sort_order ?? 0,
      isActive: tg.is_active !== false,
      categoryId: tg.category_id ?? null,
      parentTagId: tg.parent_tag_id ?? null,
    });
  }

  const detailByContent = new Map<string, Record<string, unknown>>();
  for (const d of detailsRes.data ?? []) {
    detailByContent.set(d.content_id as string, d as Record<string, unknown>);
  }

  const catsByContent = new Map<string, PublicProjectCategory[]>();
  for (const link of contentCatsRes.data ?? []) {
    const cat = categoryById.get(link.category_id);
    if (!cat) continue;
    const list = catsByContent.get(link.content_id) ?? [];
    list.push(cat);
    catsByContent.set(link.content_id, list);
  }

  const tagsByContent = new Map<string, PublicProjectTag[]>();
  for (const link of contentTagsRes.data ?? []) {
    const tg = tagById.get(link.tag_id);
    if (!tg) continue;
    const list = tagsByContent.get(link.content_id) ?? [];
    list.push(tg);
    tagsByContent.set(link.content_id, list);
  }

  const mediaByContent = new Map<string, PublicProjectImage[]>();
  for (const m of mediaRes.data ?? []) {
    const url = nonEmpty(m.file_url);
    if (!url) continue;
    const list = mediaByContent.get(m.content_id as string) ?? [];
    list.push({
      id: m.id,
      url,
      altText: nonEmpty(m.alt_text),
      altTextZh: nonEmpty(m.alt_text_zh),
      caption: nonEmpty(m.caption),
      captionZh: nonEmpty(m.caption_zh),
      credit: nonEmpty(m.image_credit),
      isFeatured: m.is_featured === true,
      sortOrder: m.sort_order ?? 0,
      width: num(m.width_px),
      height: num(m.height_px),
      // keep created_at for stable ordering
      ...({ createdAt: m.created_at } as object),
    } as PublicProjectImage & { createdAt?: string });
    mediaByContent.set(m.content_id as string, list);
  }

  const pickTag = (
    list: PublicProjectTag[],
    level: 1 | 2,
    slug: string
  ): PublicProjectTag | null => {
    const matches = list
      .filter((tg) => tg.level === level && tg.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
    if (matches.length > 1) {
      devWarn(
        `[Architect57] Project "${slug}" has ${matches.length} level-${level} tags; using lowest sort_order.`
      );
    }
    return matches[0] ?? null;
  };

  const projects: PublicProject[] = items.map((item) => {
    const d = (detailByContent.get(item.id) ?? {}) as Record<string, unknown>;
    const linkedCats = (catsByContent.get(item.id) ?? [])
      .filter((c) => c.isActive)
      .sort((a, b) => a.sortOrder - b.sortOrder || a.name.localeCompare(b.name));
    const linkedTags = tagsByContent.get(item.id) ?? [];

    const images = (mediaByContent.get(item.id) ?? []).slice().sort((a, b) => {
      if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
      if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
      const ac = (a as { createdAt?: string }).createdAt ?? "";
      const bc = (b as { createdAt?: string }).createdAt ?? "";
      return ac.localeCompare(bc);
    });

    const featuredImageUrl =
      nonEmpty(item.featured_image_url) ??
      images.find((i) => i.isFeatured)?.url ??
      images[0]?.url ??
      null;

    const city = nonEmpty(d.city);
    const province = nonEmpty(d.province);
    const country = nonEmpty(d.country);
    const location =
      nonEmpty(d.location) ??
      ([city, province, country].filter(Boolean).join(", ") || null);

    return {
      id: item.id,
      slug: item.slug as string,
      title: item.title ?? "",
      titleZh: nonEmpty(item.title_zh),
      excerpt: nonEmpty(item.excerpt),
      excerptZh: nonEmpty(item.excerpt_zh),
      bodyContent: nonEmpty(item.body_content),
      bodyContentZh: nonEmpty(item.body_content_zh),
      seoTitle: nonEmpty(item.seo_title),
      seoTitleZh: nonEmpty(item.seo_title_zh),
      seoDescription: nonEmpty(item.seo_description),
      seoDescriptionZh: nonEmpty(item.seo_description_zh),
      status: item.status,
      isFeatured: item.is_featured === true,
      sortOrder:
        item.sort_order === null || item.sort_order === undefined
          ? Number.MAX_SAFE_INTEGER
          : item.sort_order,
      category: linkedCats[0] ?? null,
      tag1: pickTag(linkedTags, 1, item.slug as string),
      tag2: pickTag(linkedTags, 2, item.slug as string),
      location,
      city,
      province,
      country,
      projectStatus: nonEmpty(d.project_status),
      projectYear: nonEmpty(d.project_year),
      yearStarted: nonEmpty(d.year_started),
      yearCompleted: nonEmpty(d.year_completed),
      floorAreaValue: num(d.floor_area_value),
      floorAreaUnit: nonEmpty(d.floor_area_unit),
      siteAreaValue: num(d.site_area_value),
      siteAreaUnit: nonEmpty(d.site_area_unit),
      unitsCount: num(d.units_count),
      storeysCount: num(d.storeys_count),
      parkingSpaces: num(d.parking_spaces),
      constructionBudget: nonEmpty(d.construction_budget),
      services: Array.isArray(d.services) ? (d.services as string[]) : [],
      role: nonEmpty(d.role),
      shortSummary: nonEmpty(d.short_summary),
      scopeOfWork: nonEmpty(d.scope_of_work),
      scopeOfWorkZh: nonEmpty(d.scope_of_work_zh),
      keyFeatures: nonEmpty(d.key_features),
      keyFeaturesZh: nonEmpty(d.key_features_zh),
      designArchitect: nonEmpty(d.design_architect),
      architectOfRecord: nonEmpty(d.architect_of_record),
      interiorDesigner: nonEmpty(d.interior_designer),
      landscapeArchitect: nonEmpty(d.landscape_architect),
      structuralEngineer: nonEmpty(d.structural_engineer),
      mechanicalEngineer: nonEmpty(d.mechanical_engineer),
      electricalEngineer: nonEmpty(d.electrical_engineer),
      civilEngineer: nonEmpty(d.civil_engineer),
      otherConsultants: nonEmpty(d.other_consultants),
      generalContractor: nonEmpty(d.general_contractor),
      developerOwnerClient: nonEmpty(d.developer_owner_client),
      photographer: nonEmpty(d.photographer),
      otherCredits: nonEmpty(d.other_credits),
      awards: nonEmpty(d.awards),
      publications: nonEmpty(d.publications),
      featuredImageUrl,
      images,
      createdAt: item.created_at,
      updatedAt: item.updated_at,
    };
  });

  // 11. Sort: sort_order asc (nulls last), created_at asc, id asc.
  projects.sort(
    (a, b) =>
      a.sortOrder - b.sortOrder ||
      a.createdAt.localeCompare(b.createdAt) ||
      a.id.localeCompare(b.id)
  );

  return projects;
}
