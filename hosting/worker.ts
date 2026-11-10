import { applyNoindexPolicy } from "./noindex-policy";

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    return applyNoindexPolicy(request, await env.ASSETS.fetch(request));
  },
};