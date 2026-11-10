import { applyNoindexPolicy } from "../../hosting/noindex-policy.ts";

export default async function searchPolicy(
  request: Request,
  context: { next(): Promise<Response> },
): Promise<Response> {
  return applyNoindexPolicy(request, await context.next());
}