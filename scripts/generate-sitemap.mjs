/**
 * Build-time sitemap generator for the Architect 57 public website.
 *
 * Reads the published Architect 57 portfolio slugs from the BluLuma CMS
 * (read-only) and the preserved legacy portfolio routes from
 * src/config/legacyPortfolioRoutes.ts, then writes public/sitemap.xml.
 *
 * Fails loudly (non-zero exit) if the CMS query fails — it must never
 * silently publish a sitemap missing every Project Detail page.
 */

import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const BASE_URL = "https://www.architect57.com";

const SUPABASE_URL =
  process.env.VITE_SUPABASE_URL ?? "https://uzdjwpkgldzhnoxjeyrw.supabase.co";
const SUPABASE_KEY =
  process.env.VITE_SUPABASE_ANON_KEY ??
  "sb_publishable_ifsg2zxajGqu19GsJ2X4RQ_KHBHGIvi";

const rest = async (path) => {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
  });
  if (!res.ok) {
    throw new Error(`CMS query failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
};

export const readLegacyPaths = () => {
  const src = readFileSync(
    resolve("src/config/legacyPortfolioRoutes.ts"),
    "utf8"
  );
  return [...src.matchAll(/path:\s*"(\/[^"]*)"/g)].map((m) => m[1]);
};

const STATIC_ROUTES = ["/", "/projects", "/about", "/contact"];

/** The eleven approved Architect 57 CMS categories eligible for collection pages. */
const APPROVED_CATEGORIES = [
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
];

const normalizeCategoryKey = (value) =>
  (value ?? "").toLowerCase().replace(/[^a-z0-9]/g, "");

const APPROVED_KEYS = new Set(APPROVED_CATEGORIES.map(normalizeCategoryKey));

async function fetchPublishedProjects() {
  const clients = await rest(
    "clients?select=id,slug&slug=in.(architect57,architect-57)&status=eq.active"
  );
  const client =
    clients.find((c) => c.slug === "architect57") ?? clients[0] ?? null;
  if (!client) throw new Error("Architect57 client not found in CMS");

  const items = await rest(
    `content_items?select=id,slug,updated_at&client_id=eq.${client.id}&content_type=eq.portfolio&status=eq.published&limit=1000`
  );
  const projects = items.filter((i) => i.slug && i.slug.trim());
  if (projects.length === 0) {
    throw new Error("CMS returned zero published portfolio projects");
  }
  return projects;
}

/** Approved, active category collection pages that actually have published projects. */
async function fetchCollectionCategories(projects) {
  const ids = projects.map((p) => p.id).filter(Boolean);
  if (ids.length === 0) return [];

  const links = await rest(
    `content_categories?select=content_id,category_id&content_id=in.(${ids.join(",")})&limit=5000`
  );
  const categoryIds = [...new Set(links.map((l) => l.category_id).filter(Boolean))];
  if (categoryIds.length === 0) return [];

  const categories = await rest(
    `categories?select=id,name,slug,sort_order,is_active&id=in.(${categoryIds.join(",")})&limit=1000`
  );

  return categories
    .filter(
      (c) =>
        c.is_active !== false &&
        c.slug &&
        (APPROVED_KEYS.has(normalizeCategoryKey(c.name)) ||
          APPROVED_KEYS.has(normalizeCategoryKey(c.slug)))
    )
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.slug.localeCompare(b.slug));
}

const urlEntry = ({ path, lastmod, changefreq, priority }) =>
  [
    "  <url>",
    `    <loc>${BASE_URL}${path}</loc>`,
    lastmod ? `    <lastmod>${lastmod}</lastmod>` : null,
    changefreq ? `    <changefreq>${changefreq}</changefreq>` : null,
    priority ? `    <priority>${priority}</priority>` : null,
    "  </url>",
  ]
    .filter(Boolean)
    .join("\n");

export async function buildSitemap() {
  const legacyPaths = readLegacyPaths();
  const projects = await fetchPublishedProjects();
  const collections = await fetchCollectionCategories(projects);

  const entries = [
    { path: "/", changefreq: "weekly", priority: "1.0" },
    { path: "/projects", changefreq: "weekly", priority: "0.9" },
    ...legacyPaths.map((p) => ({
      path: p,
      changefreq: "monthly",
      priority: "0.8",
    })),
    ...collections.map((c) => ({
      path: `/projects/collection/${c.slug}`,
      changefreq: "monthly",
      priority: "0.8",
    })),
    { path: "/about", changefreq: "monthly", priority: "0.7" },
    { path: "/contact", changefreq: "yearly", priority: "0.6" },
    ...projects.map((p) => ({
      path: `/projects/${p.slug}`,
      lastmod: p.updated_at ? String(p.updated_at).slice(0, 10) : undefined,
      changefreq: "monthly",
      priority: "0.7",
    })),
  ];

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(urlEntry),
    "</urlset>",
  ].join("\n");

  return { xml, entries, projects, collections, legacyPaths, staticRoutes: STATIC_ROUTES };
}

const isMain =
  process.argv[1] && import.meta.url.endsWith(process.argv[1].split("/").pop());

if (isMain) {
  try {
    const { xml, entries, projects, collections } = await buildSitemap();
    writeFileSync(resolve("public/sitemap.xml"), xml);
    console.log(
      `sitemap.xml written (${entries.length} URLs, ${projects.length} CMS project detail pages, ${collections.length} collection pages)`
    );
  } catch (err) {
    console.error("Sitemap generation FAILED:", err.message);
    process.exit(1);
  }
}
