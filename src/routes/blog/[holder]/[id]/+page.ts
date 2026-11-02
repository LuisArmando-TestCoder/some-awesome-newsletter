import { error } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import {
  apiBase,
  creationToIso,
  fetchArticlesPage,
  fetchBranding,
  fetchWithTimeout,
  firstImage,
  plainText,
  readingMinutes,
  truncate,
  type BlogLanguageInfo,
} from "../../../../components/articles/blog";

export const ssr = true;

export interface BlogArticle {
  id: string;
  title: string;
  content: string;
  language: string;
  newsSourceId: string;
  /** The original article on the owner's website, when the issue was written from one. */
  sourceUrl: string;
  /** Other language versions of the same issue (for hreflang and the language links). */
  translations: Array<{ id: string; language: string }>;
  creation: string;
  isoDate: string;
  description: string;
  image: string;
  minutes: number;
}

export const load: PageLoad = async ({ params, url, fetch, parent }) => {
  // The blog handle, resolved once by the layout (WS15).
  const { holder } = await parent();
  const id = params.id;
  const base = apiBase(url.origin);

  let status: "ok" | "notfound" | "error" = "ok";
  let article: BlogArticle | null = null;

  try {
    // ?blog= makes the backend answer 404 when the article belongs to another blog.
    const r = await fetchWithTimeout(fetch, `${base}/article/${encodeURIComponent(id)}?blog=${encodeURIComponent(holder)}`);
    if (r.status === 404) status = "notfound";
    else if (!r.ok) status = "error";
    else {
      const raw = await r.json();
      const content: string = raw?.content ?? "";
      const text = plainText(content);
      article = {
        id,
        title: plainText(raw?.title ?? "") || "Article",
        content,
        language: raw?.language ?? "",
        sourceUrl: typeof raw?.sourceUrl === "string" && /^https?:\/\//i.test(raw.sourceUrl) ? raw.sourceUrl : "",
        translations: Array.isArray(raw?.translations)
          ? raw.translations.filter((x: unknown): x is { id: string; language: string } => Boolean(x && typeof (x as { id?: unknown }).id === "string"))
          : [],
        newsSourceId: raw?.newsSourceId ?? "",
        creation: raw?.creation ?? "",
        isoDate: creationToIso(raw?.creation ?? ""),
        description: truncate(text, 155),
        image: firstImage(content),
        minutes: readingMinutes(text),
      };
    }
  } catch {
    status = "error";
  }

  // A real 404 status, so search engines drop missing articles instead of indexing an error page.
  if (status === "notfound") error(404, "Article not found");

  const ns = url.searchParams.get("ns") ?? article?.newsSourceId ?? "";
  const [branding, meta] = await Promise.all([
    fetchBranding(fetch, base, holder, ns),
    article
      ? fetchArticlesPage(fetch, base, holder, { page: 1, size: 1, newsSourceId: article.newsSourceId })
      : Promise.resolve({ ok: false, languages: [] as BlogLanguageInfo[], byLang: {} }),
  ]);

  return {
    holder,
    id,
    status: status as "ok" | "notfound" | "error",
    article,
    branding,
    ns,
    otherLanguages: meta.languages.filter((l) => l.code !== article?.language),
  };
};
