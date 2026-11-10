import { applyNoindexPolicy } from "../hosting/noindex-policy";

/** Pages deployment only; Workers deployments use hosting/worker.ts instead. */
export async function onRequest(context: {
  request: Request;
  next(): Promise<Response>;
}): Promise<Response> {
  return applyNoindexPolicy(context.request, await context.next());
}