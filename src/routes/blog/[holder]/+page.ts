import type { PageLoad } from "./$types";
import {
  apiBase,
  BLOG_PAGE_SIZE,
  byNewest,
  fetchArticlesPage,
  fetchBranding,
  type BlogCard,
} from "../../../components/articles/blog";

export const ssr = true;

export const load: PageLoad = async ({ params, url, fetch }) => {
  const holder = params.holder;
  const ns = url.searchParams.get("ns") ?? url.searchParams.get("newsSourceId") ?? "";
  const langParam = url.searchParams.get("lang") ?? "";
  const page = Math.max(1, Number.parseInt(url.searchParams.get("page") ?? "1", 10) || 1);
  const base = apiBase(url.origin);

  // 1) Tiny request to learn which languages exist and how many articles each has.
  //    When the language is already known, run the page request in parallel.
  const metaReq = fetchArticlesPage(fetch, base, holder, { page: 1, size: 1, newsSourceId: ns });
  const earlyPageReq = langParam
    ? fetchArticlesPage(fetch, base, holder, { page, size: BLOG_PAGE_SIZE, newsSourceId: ns, lang: langParam })
    : null;
  const brandingEarly = ns ? fetchBranding(fetch, base, holder, ns) : null;

  const meta = await metaReq;
  const languages = meta.languages;
  const activeLang = languages.some((l) => l.code === langParam) ? langParam : (languages[0]?.code ?? "");

  let pageRes = earlyPageReq ? await earlyPageReq : null;
  if (!pageRes || !pageRes.byLang[activeLang]) {
    pageRes = activeLang
      ? await fetchArticlesPage(fetch, base, holder, { page, size: BLOG_PAGE_SIZE, newsSourceId: ns, lang: activeLang })
      : meta;
  }

  const bucket = pageRes.byLang[activeLang] ?? { withImages: [], withoutImages: [], total: 0 };
  const withImages = [...bucket.withImages].sort(byNewest);
  const all: BlogCard[] = [...bucket.withImages, ...bucket.withoutImages].sort(byNewest);

  // One featured article (latest with an image) on the first page only.
  const featured = page === 1 ? (withImages[0] ?? null) : null;
  const latest = featured ? all.filter((c) => c.id !== featured.id) : all;
  const hasNext = bucket.withImages.length >= BLOG_PAGE_SIZE || bucket.withoutImages.length >= BLOG_PAGE_SIZE;

  const brandingNs = ns || featured?.newsSourceId || all[0]?.newsSourceId || "";
  const branding = brandingEarly ? await brandingEarly : await fetchBranding(fetch, base, holder, brandingNs);

  return {
    holder,
    ns,
    page,
    activeLang,
    languages,
    total: bucket.total,
    featured,
    latest,
    hasNext,
    branding,
    subscribeNs: brandingNs,
    error: !meta.ok || !pageRes.ok,
  };
};
