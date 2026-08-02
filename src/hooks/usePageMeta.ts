import { useEffect } from "react";

interface PageMeta {
  title: string;
  description: string;
  /** Absolute path for the self-referencing canonical / og:url, e.g. "/daycare". */
  path?: string;
  /** Force "noindex, nofollow" (e.g. the 404 page) even on the production host. */
  noindex?: boolean;
}

/** Production canonical host — never a Netlify/Lovable preview host. */
export const CANONICAL_HOST = "https://www.architect57.com";

/** Preview / staging hosts must never compete with the production domain. */
export const isNoindexHost = (hostname: string): boolean =>
  hostname.endsWith(".netlify.app") || hostname.endsWith(".lovable.app");

const usePageMeta = ({ title, description, path, noindex = false }: PageMeta) => {
  useEffect(() => {
    document.title = title;

    const setMeta = (name: string, content: string) => {
      let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("name", name);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    const setOg = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute("property", property);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    setMeta("description", description);
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setOg("og:title", title);
    setOg("og:description", description);

    // Self-referencing canonical + og:url on the production host.
    const rawPath = path ?? window.location.pathname;
    const cleanPath = rawPath !== "/" ? rawPath.replace(/\/+$/, "") : "/";
    const canonicalUrl = `${CANONICAL_HOST}${cleanPath === "/" ? "/" : cleanPath}`;

    let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!link) {
      link = document.createElement("link");
      link.setAttribute("rel", "canonical");
      document.head.appendChild(link);
    }
    link.setAttribute("href", canonicalUrl);
    setOg("og:url", canonicalUrl);

    // Staging / preview hosts: keep them out of the index.
    let robots = document.querySelector('meta[name="robots"]') as HTMLMetaElement | null;
    if (noindex || isNoindexHost(window.location.hostname)) {
      if (!robots) {
        robots = document.createElement("meta");
        robots.setAttribute("name", "robots");
        document.head.appendChild(robots);
      }
      robots.setAttribute("content", "noindex, nofollow");
    } else if (robots) {
      robots.setAttribute("content", "index, follow");
    }
  }, [title, description, path, noindex]);
};

export default usePageMeta;
