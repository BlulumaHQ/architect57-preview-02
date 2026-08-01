/**
 * Route audit for the preserved Architect 57 legacy portfolio URLs.
 *
 * Verifies, without a running server, that every configured legacy path:
 *  - has a React Router <Route> definition (before the wildcard)
 *  - resolves to a real page component (never <Navigate>, never NotFound)
 *  - produces a self-referencing canonical on the production www host
 *  - appears in public/sitemap.xml
 *  - never uses a Netlify/Lovable canonical
 * and that all project links use /projects/{slug}.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { readLegacyPaths } from "./generate-sitemap.mjs";

const BASE_URL = "https://www.architect57.com";
const read = (p) => readFileSync(resolve(p), "utf8");

const failures = [];
const pass = [];
const check = (ok, message) => (ok ? pass.push(message) : failures.push(message));

const legacyPaths = readLegacyPaths();
const app = read("src/App.tsx");
const legacyPage = read("src/pages/LegacyPortfolioPage.tsx");
const meta = read("src/hooks/usePageMeta.ts");

// 1. Router coverage, ordering and no redirects.
const wildcardIndex = app.indexOf('path="*"');
for (const path of legacyPaths) {
  const routeIndex = app.indexOf(`path="${path}"`);
  check(routeIndex !== -1, `route defined for ${path}`);
  check(
    routeIndex !== -1 && wildcardIndex !== -1 && routeIndex < wildcardIndex,
    `route for ${path} declared before the wildcard NotFound route`
  );
  if (routeIndex !== -1) {
    const element = app.slice(routeIndex, routeIndex + 320);
    check(
      !element.includes("<Navigate"),
      `${path} does not use <Navigate> (no redirect to Home or /projects)`
    );
    check(
      element.includes("LegacyPortfolioPage"),
      `${path} renders LegacyPortfolioPage (real page content, not NotFound)`
    );
  }
}

// 2. Canonical handling.
check(
  meta.includes(`"${BASE_URL}"`) || meta.includes(BASE_URL),
  "canonical host is https://www.architect57.com"
);
check(
  !meta.includes("netlify.app\"") || meta.includes("isNoindexHost"),
  "no Netlify canonical host used"
);
check(
  legacyPage.includes("path: route?.path") ||
    legacyPage.includes("path={route.path}") ||
    legacyPage.includes("route?.path ??"),
  "legacy pages emit a self-referencing canonical path"
);

// 3. Sitemap coverage.
const sitemapPath = "public/sitemap.xml";
if (!existsSync(resolve(sitemapPath))) {
  failures.push("public/sitemap.xml is missing — run the sitemap generator");
} else {
  const sitemap = read(sitemapPath);
  for (const path of legacyPaths) {
    check(
      sitemap.includes(`<loc>${BASE_URL}${path}</loc>`),
      `sitemap contains ${BASE_URL}${path}`
    );
  }
  for (const path of ["/", "/projects", "/about", "/contact"]) {
    const loc = path === "/" ? `${BASE_URL}/` : `${BASE_URL}${path}`;
    check(sitemap.includes(`<loc>${loc}</loc>`), `sitemap contains ${loc}`);
  }
  const detailCount = (sitemap.match(/\/projects\/[^<]+<\/loc>/g) ?? []).length;
  check(detailCount > 0, `sitemap contains ${detailCount} project detail URLs`);
  check(
    !sitemap.includes("netlify.app") && !sitemap.includes("lovable.app"),
    "sitemap contains no Netlify/Lovable preview URLs"
  );
}

// 4. Project detail links.
const view = read("src/components/projects/ProjectsView.tsx");
check(
  view.includes("`/projects/${p.slug}`"),
  "project cards link to /projects/{slug}"
);

// 5. SPA fallback ordering.
const redirects = read("public/_redirects");
const fallbackIndex = redirects.indexOf("/*");
const firstRedirect = redirects.search(/^\/[a-z]/m);
check(
  fallbackIndex > firstRedirect,
  "SPA fallback declared after the explicit trailing-slash redirects"
);

console.log("Route audit\n===========");
for (const p of pass) console.log(`  PASS  ${p}`);
for (const f of failures) console.log(`  FAIL  ${f}`);
console.log(`\n${pass.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
