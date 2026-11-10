/** Match only platform subdomains; never infer a custom-domain allowlist. */
export const isNoindexHost = (hostname: string): boolean =>
  ["lovable.app", "workers.dev", "pages.dev", "netlify.app"].some(
    (suffix) => hostname.toLowerCase().endsWith(`.${suffix}`)
  );

/** Preserve body, status, caching and all custom-domain crawler policies. */
export function applyNoindexPolicy(request: Request, response: Response): Response {
  if (
    !isNoindexHost(new URL(request.url).hostname) ||
    !/^text\/html(?:\s*;|$)/i.test(response.headers.get("content-type") ?? "")
  ) {
    return response;
  }
  const headers = new Headers(response.headers);
  const existing = headers.get("X-Robots-Tag");
  // Put the unscoped directive first, before any bot-specific prefix.
  headers.set("X-Robots-Tag", existing ? `noindex, ${existing}` : "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}