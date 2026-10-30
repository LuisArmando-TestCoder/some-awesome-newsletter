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
  author: string;
  newsSourceId: string;
  creation: string;
  isoDate: string;
  description: string;
  image: string;
  minutes: number;
}

export const load: PageLoad = async ({ params, url, fetch }) => {
  const holder = params.holder;
  const id = params.id;
  const base = apiBase(url.origin);

  let status: "ok" | "notfound" | "error" = "ok";
  let article: BlogArticle | null = null;

  try {
    const r = await fetchWithTimeout(fetch, `${base}/article/${encodeURIComponent(id)}`);
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
        author: raw?.author ?? "",
        newsSourceId: raw?.newsSourceId ?? "",
        creation: raw?.creation ?? "",
        isoDate: creationToIso(raw?.creation ?? ""),
        description: truncate(text, 155),
        image: firstImage(content),
        minutes: readingMinutes(text),
      };
      // An article only belongs to the blog of its own author.
      if (article.author && article.author.toLowerCase() !== holder.toLowerCase()) {
        status = "notfound";
        article = null;
      }
    }
  } catch {
    status = "error";
  }

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
    status,
    article,
    branding,
    ns,
    otherLanguages: meta.languages.filter((l) => l.code !== article?.language),
  };
};
