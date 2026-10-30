import type { PageLoad } from "./$types";
import { apiBase, fetchArticlesPage, fetchBranding } from "../../../../components/articles/blog";

export const ssr = true;

/** Loads only the blog branding. Results stream in the browser (NDJSON). */
export const load: PageLoad = async ({ params, url, fetch }) => {
  const holder = params.holder;
  const q = (url.searchParams.get("q") ?? "").trim();
  const ns = url.searchParams.get("ns") ?? "";
  const lang = url.searchParams.get("lang") ?? "";
  const base = apiBase(url.origin);

  let brandingNs = ns;
  if (!brandingNs) {
    const meta = await fetchArticlesPage(fetch, base, holder, { page: 1, size: 1 });
    for (const bucket of Object.values(meta.byLang)) {
      const first = bucket.withImages[0] ?? bucket.withoutImages[0];
      if (first?.newsSourceId) {
        brandingNs = first.newsSourceId;
        break;
      }
    }
  }
  const branding = await fetchBranding(fetch, base, holder, brandingNs);
  return { holder, q, ns, lang, branding, subscribeNs: brandingNs };
};
