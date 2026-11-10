// @vitest-environment node
import { describe, expect, it } from "vitest";
import worker from "../../hosting/worker";
import { onRequest } from "../../functions/_middleware";
import netlifyPolicy from "../../netlify/edge-functions/search-policy";
import { applyNoindexPolicy } from "../../hosting/noindex-policy";

describe("crawler-visible response policy", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    for (const path of ["/", "/about", "/projects/bridgeport-office-building", "/missing/path"]) {
      it(`adds noindex without blocking HTML on ${suffix}${path}`, async () => {
        const request = new Request(`https://preview.branch.site.${suffix}${path}`);
        const response = applyNoindexPolicy(request, new Response("public HTML", {
          status: path === "/missing/path" ? 404 : 200,
          headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "public, max-age=60" },
        }));
        expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
        expect(response.status).toBe(path === "/missing/path" ? 404 : 200);
        expect(response.headers.get("Cache-Control")).toBe("public, max-age=60");
        expect(response.headers.get("Location")).toBeNull();
        expect(await response.text()).toBe("public HTML");
      });
    }
  }
  for (const hostname of ["www.architect57.com", "architect57.com"]) {
    it(`preserves index eligibility and existing restrictions on ${hostname}`, () => {
      const request = new Request(`https://${hostname}/projects/test`);
      for (const robots of [null, "index, follow", "noindex, nofollow"]) {
        const headers = new Headers({ "Content-Type": "text/html" });
        if (robots) headers.set("X-Robots-Tag", robots);
        const original = new Response("unchanged", { headers });
        expect(applyNoindexPolicy(request, original)).toBe(original);
        expect(original.headers.get("X-Robots-Tag")).toBe(robots);
      }
    });
  }
  it("leaves robots.txt, sitemap and non-HTML assets untouched", () => {
    for (const type of ["text/plain", "application/xml", "application/javascript", "image/png"]) {
      const original = new Response("asset", { headers: { "Content-Type": type } });
      expect(applyNoindexPolicy(new Request("https://site.pages.dev/asset"), original)).toBe(original);
    }
  });
  it("retains existing bot-specific directives and adds unscoped noindex", () => {
    const response = applyNoindexPolicy(new Request("https://site.netlify.app/"), new Response("html", {
      headers: { "Content-Type": "text/html", "X-Robots-Tag": "googlebot: nofollow" },
    }));
    expect(response.headers.get("X-Robots-Tag")).toBe("googlebot: nofollow, noindex");
  });
  it("all three deployment adapters wrap the actual downstream HTML", async () => {
    const request = new Request("https://site.account.workers.dev/projects/bridgeport-office-building");
    const next = async () => new Response("SPA fallback", { headers: { "Content-Type": "text/html" } });
    const responses = await Promise.all([
      worker.fetch(request, { ASSETS: { fetch: next } }),
      onRequest({ request, next }),
      netlifyPolicy(request, { next }),
    ]);
    for (const response of responses) {
      expect(response.headers.get("X-Robots-Tag")).toBe("noindex");
      expect(await response.text()).toBe("SPA fallback");
    }
  });
});