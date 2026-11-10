import { describe, expect, it } from "vitest";
import { isNoindexHost } from "../hooks/usePageMeta";

describe("platform hostname search policy", () => {
  for (const suffix of ["lovable.app", "workers.dev", "pages.dev", "netlify.app"]) {
    it(`excludes every level of subdomain under ${suffix}`, () => {
      expect(isNoindexHost(`site.${suffix}`)).toBe(true);
      expect(isNoindexHost(`preview.branch.site.${suffix}`)).toBe(true);
    });
  }
  it("does not exclude the existing production canonical host", () => {
    expect(isNoindexHost("www.architect57.com")).toBe(false);
    expect(isNoindexHost("architect57.com")).toBe(false);
  });
  it("does not mistake suffix lookalikes for platform hosts", () => {
    expect(isNoindexHost("notlovable.app")).toBe(false);
    expect(isNoindexHost("site.lovable.app.example.com")).toBe(false);
  });
});