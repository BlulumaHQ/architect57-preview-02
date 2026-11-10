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
  // Append an unscoped directive even when an existing directive targets one bot.
  headers.set("X-Robots-Tag", existing ? `${existing}, noindex` : "noindex");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}