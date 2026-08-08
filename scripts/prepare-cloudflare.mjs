/**
 * Cloudflare Pages build post-processing for the Architect 57 static SPA.
 *
 * Cloudflare Pages provides native SPA fallback as long as the output does not
 * contain a top-level 404.html. The Netlify catch-all `_redirects` rule must
 * therefore NOT be shipped in the Cloudflare output — but `public/_redirects`
 * stays in the repository so the Netlify backup deployment keeps working.
 */

import { existsSync, rmSync, statSync } from "node:fs";
import { resolve } from "node:path";

const dist = resolve("dist");
const p = (rel) => resolve(dist, rel);

const report = [];
const errors = [];

const require_ = (rel, kind = "file") => {
  const target = p(rel);
  const ok =
    existsSync(target) &&
    (kind === "dir" ? statSync(target).isDirectory() : statSync(target).isFile());
  if (ok) report.push(`  OK      dist/${rel} exists`);
  else errors.push(`  MISSING dist/${rel} is required but was not found`);
  return ok;
};

// 1 + 2. Required build output.
require_("index.html");
require_("assets", "dir");

// 3. Remove the Netlify-only catch-all from the Cloudflare output.
if (existsSync(p("_redirects"))) {
  rmSync(p("_redirects"), { force: true });
  report.push("  OK      dist/_redirects removed (Netlify-only catch-all)");
} else {
  report.push("  OK      dist/_redirects absent");
}

// 4. A top-level 404.html would disable Cloudflare's native SPA fallback.
if (existsSync(p("404.html"))) {
  errors.push(
    "  FAIL    dist/404.html exists — it disables Cloudflare Pages SPA fallback"
  );
} else {
  report.push("  OK      dist/404.html absent (native SPA fallback enabled)");
}

// 5 - 7. Preserved assets.
require_("_headers");
require_("robots.txt");
require_("sitemap.xml");

// 8. Report.
console.log("Cloudflare Pages build validation");
console.log("=================================");
for (const line of report) console.log(line);
for (const line of errors) console.log(line);
console.log(
  `\n${report.length} checks passed, ${errors.length} failed — output directory: dist`
);

if (errors.length) process.exit(1);
