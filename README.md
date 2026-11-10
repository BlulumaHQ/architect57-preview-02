# Architect 57 deployment search policy

The site remains a React/Vite SPA. Production canonical URLs, sitemap,
robots.txt, social metadata and visible UI are unchanged.

## Conditional response headers

`hosting/noindex-policy.ts` adds `X-Robots-Tag: noindex` to **HTML only**
when the incoming hostname ends in `.lovable.app`, `.workers.dev`,
`.pages.dev` or `.netlify.app`. All other hosts pass through untouched,
including their existing indexing restrictions. It does not redirect,
authenticate or block requests. The browser metadata hook uses the same
hostname rule as supplementary protection, not as the crawler guarantee.

- **Cloudflare Workers + Static Assets (current target):** `wrangler.jsonc`
  runs `hosting/worker.ts` before every asset request, including SPA fallbacks.
  Deploy the updated configuration and code with the existing Workers workflow.
- **Netlify backup:** `netlify.toml` registers the hostname-aware Edge Function
  on every path. A new Netlify deployment is required.
- **Cloudflare Pages (only if deployed there):** root `functions/_middleware.ts`
  wraps all HTML responses. Deploy with Pages Functions enabled; a static-only
  upload does not execute middleware. Host-specific `_headers` additionally
  cover conventional Workers/Pages static-asset hostnames, never custom domains.
- **Lovable hosting limitation:** Lovable does not execute these serving
  adapters or process `_headers`/`netlify.toml`. The shared static HTML has no
  global noindex because it must remain safe for custom domains. Therefore
  publishing/updating on Lovable alone cannot guarantee crawler-visible noindex
  for every `.lovable.app` HTML response. Its hosting layer would need to add
  the header conditionally. Client-side metadata is not sufficient proof.

## Verification scope

The project domain check reported **unpublished, no connected custom domains**.
The existing `www.architect57.com` canonical domain was observed publicly, but
is not a verified custom-domain connection in this Lovable project.
No actual Workers, Pages or Netlify deployment URLs were provided or invented.

Public HTTP checks before deployment:
- `https://www.architect57.com/` and
  `/projects/bridgeport-office-building`: HTTP 200, no `X-Robots-Tag` or static
  robots noindex; existing production canonical preserved. This verifies the
  current live responses, not deployment of the new policy.
- `https://architect57-preview-02.lovable.app/` and the same project path:
  HTTP 404 HTML with no noindex header or robots meta. Not publicly serving the
  app and **not confirmed protected**.
- The provided `id-preview--77965ae0-8fd4-4cd1-8ae1-d50f81256e99.lovable.app`
  preview: HTTP 401 plain text with `X-Robots-Tag: noindex, nofollow`.
  This existing access restriction is not changed by the project and does not
  verify publicly accessible application HTML.

Tests: `bunx vitest run src/test/noindex-host.test.ts src/test/noindex-response.test.ts`.
Verified: 27 tests passed, 26 route-audit checks passed, and the automatic
preview build reported `build OK`. No manual project build was run.
The Workers adapter also passed 25 real local HTTP hostname/path checks using
a source-HTML fixture (not a production bundle). The pinned local runtime
cannot run the existing `2026-08-08` compatibility date (its maximum is
`2026-07-29`); only a temporary test configuration used the older date.
The project's deployment compatibility date and dependency versions were not changed.
Netlify and Pages adapters passed unit tests, not deployed-platform checks.
Route audit: `npm run audit:routes`. After redeployment, check raw GET/HEAD
responses at `/`, `/about`, a real project URL and a missing nested path on
each actual deployment host. Platform HTML must contain an unscoped noindex
header; custom-domain HTML must preserve its original policies. robots.txt
must continue to allow crawling so crawlers can see the noindex directive.
