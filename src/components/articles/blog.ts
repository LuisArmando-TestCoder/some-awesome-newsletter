/**
 * Shared helpers for the public blog (src/routes/blog/**).
 * Pure functions only: they run on the server (SSR load) and in the browser.
 */
import { get } from "svelte/store";
import store from "../store";
import languages from "../systems/inputs/Language/languages";
import { isOwnHost, type BlogRef, type PublicBlogSite } from "$lib/blog/hosts";
export type { BlogRef, PublicBlogSite };

export const BLOG_PAGE_SIZE = 20;
export const SITE_ORIGIN = "https://aibanewsletter.club";

/** Slim card shape used by every blog list. Built from full or slim API articles. */
export interface BlogCard {
  id: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  language: string;
  newsSourceId: string;
  creation: string;
  isoDate: string;
  minutes: number;
}

export interface BlogBranding {
  newsletterTitle: string;
  senderName: string;
}

export interface BlogLanguageInfo {
  code: string;
  total: number;
}

/* ───────────── API base ───────────── */

export function apiBase(origin?: string): string {
  return get(store).apiURL(origin);
}

/** fetch with a timeout so a cold backend does not hang SSR forever. */
export async function fetchWithTimeout(
  f: typeof fetch,
  input: string,
  ms = 12000,
  init: RequestInit = {}
): Promise<Response> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await f(input, { ...init, signal: init.signal ?? ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

/* ───────────── text helpers ───────────── */

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&#x27;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
};

export function decodeEntities(s: string): string {
  return s
    .replace(/&(amp|lt|gt|quot|apos|nbsp|#39|#x27);/g, (m) => ENTITIES[m] ?? m)
    .replace(/&#(\d+);/g, (_, n) => String.fromCharCode(Number(n)));
}

/** HTML to plain text (no DOM needed, SSR safe). */
export function plainText(html: string): string {
  return decodeEntities(
    (html || "")
      .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();
}

export function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + "...";
}

export function firstImage(html: string): string {
  const m = (html || "").match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? decodeEntities(m[1]) : "";
}

export function readingMinutes(text: string): number {
  const words = text ? text.split(/\s+/).length : 0;
  return Math.max(1, Math.round(words / 220));
}

/** "M/D/YYYY" (backend format) to "YYYY-MM-DD". Returns "" when unparseable. */
export function creationToIso(creation: string): string {
  if (!creation) return "";
  const m = creation.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})/);
  if (m) {
    const [, mo, d, y] = m;
    return `${y}-${mo.padStart(2, "0")}-${d.padStart(2, "0")}`;
  }
  const t = Date.parse(creation);
  return Number.isNaN(t) ? "" : new Date(t).toISOString().slice(0, 10);
}

export function formatDate(iso: string, lang = "en"): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  try {
    return new Intl.DateTimeFormat(lang, { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
  } catch {
    return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(date);
  }
}

export function languageName(code: string): string {
  return languages.find((l: { code: string }) => l.code === code)?.name ?? code.toUpperCase();
}

/** Simple "{name}" interpolation for i18n strings. */
export function fmt(str: string | undefined, vars: Record<string, string | number> = {}): string {
  return (str ?? "").replace(/\{(\w+)\}/g, (_, k) => (k in vars ? String(vars[k]) : `{${k}}`));
}

/* ───────────── shapes ───────────── */

/** Article fields read from the API (full articles and slim search hits). */
export type RawArticle = {
  id?: string | number;
  title?: string;
  content?: string;
  excerpt?: string;
  imageUrl?: string;
  language?: string;
  newsSourceId?: string;
  creation?: string;
};

/** Accepts a full article ({content}) or a slim search hit ({excerpt,imageUrl}). */
export function toCard(a: RawArticle | null | undefined): BlogCard {
  const content: string = a?.content ?? "";
  const text = content ? plainText(content) : decodeEntities(a?.excerpt ?? "");
  const iso = creationToIso(a?.creation ?? "");
  return {
    id: String(a?.id ?? ""),
    title: plainText(a?.title ?? "") || "Article",
    excerpt: truncate(text, 220),
    imageUrl: a?.imageUrl || firstImage(content),
    language: a?.language ?? "",
    newsSourceId: a?.newsSourceId ?? "",
    creation: a?.creation ?? "",
    isoDate: iso,
    minutes: content ? readingMinutes(text) : 0,
  };
}

export function byNewest(a: BlogCard, b: BlogCard): number {
  return (b.isoDate || "").localeCompare(a.isoDate || "");
}

/** The backend falls back to "Newsletter" / "Sender" when the owner left them empty. */
export function cleanBranding(raw: unknown): BlogBranding {
  const r = (raw && typeof raw === "object" ? raw : {}) as { newsletterTitle?: unknown; senderName?: unknown };
  const title = typeof r.newsletterTitle === "string" ? r.newsletterTitle.trim() : "";
  const sender = typeof r.senderName === "string" ? r.senderName.trim() : "";
  return {
    newsletterTitle: title === "Newsletter" ? "" : title,
    senderName: sender === "Sender" ? "" : sender,
  };
}

/** Never show a full email address publicly: use the part before "@". */
export function ownerHandle(holder: string): string {
  const local = (holder || "").split("@")[0] || "";
  return local.replace(/[._-]+/g, " ").trim() || "this newsletter";
}

export function ownerName(branding: BlogBranding, holder: string): string {
  return branding.senderName || ownerHandle(holder);
}

/* ───────────── URLs ───────────── */

/** A blog reference: the holder string (links under /blog/<holder>) or a BlogRef from the blog layout. */
export type BlogRefLike = string | BlogRef;

/** Path prefix for a blog: "/blog/<handle>" on AIBAN's site, "" on the owner's own domain. */
export function blogBase(ref: BlogRefLike): string {
  return typeof ref === "string" ? `/blog/${encodeURIComponent(ref)}` : ref.base;
}

/** Builds the BlogRef for a blog page from where it is being served. */
export function blogRef(site: PublicBlogSite, pageUrl: URL): BlogRef {
  const own = isOwnHost(pageUrl.hostname);
  return {
    handle: site.handle,
    base: own ? `/blog/${encodeURIComponent(site.handle)}` : "",
    origin: own ? (pageUrl.hostname === "localhost" || pageUrl.hostname === "127.0.0.1" ? pageUrl.origin : SITE_ORIGIN) : `https://${pageUrl.hostname}`,
  };
}

export function blogPath(ref: BlogRefLike, params: Record<string, string | number | null | undefined> = {}): string {
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== null && v !== undefined && v !== "" && !(k === "page" && Number(v) <= 1)) qs.set(k, String(v));
  }
  const s = qs.toString();
  return `${blogBase(ref) || "/"}${s ? `?${s}` : ""}`;
}

export function articlePath(ref: BlogRefLike, id: string): string {
  return `${blogBase(ref)}/${encodeURIComponent(id)}`;
}

export function searchPath(ref: BlogRefLike, q: string, params: Record<string, string | null | undefined> = {}): string {
  const qs = new URLSearchParams({ q });
  for (const [k, v] of Object.entries(params)) if (v) qs.set(k, v);
  return `${blogBase(ref)}/search?${qs.toString()}`;
}

export function subscribePath(ref: BlogRefLike, newsSourceId: string): string {
  // The backend accepts the blog handle here (WS15), so the owner's email is not in the link.
  const qs = new URLSearchParams({ configuratorId: typeof ref === "string" ? ref : ref.handle });
  if (newsSourceId) qs.set("newsSourceId", newsSourceId);
  return `/subscribe?${qs.toString()}`;
}

export async function fetchBranding(f: typeof fetch, base: string, holder: string, newsSourceId: string): Promise<BlogBranding> {
  if (!holder || !newsSourceId) return { newsletterTitle: "", senderName: "" };
  try {
    const qs = new URLSearchParams({ configuratorId: holder, newsSourceId });
    const r = await fetchWithTimeout(f, `${base}/public-config-info?${qs.toString()}`, 8000);
    if (!r.ok) return { newsletterTitle: "", senderName: "" };
    return cleanBranding(await r.json());
  } catch {
    return { newsletterTitle: "", senderName: "" };
  }
}

export interface ArticlesPage {
  ok: boolean;
  languages: BlogLanguageInfo[];
  byLang: Record<string, { withImages: BlogCard[]; withoutImages: BlogCard[]; total: number }>;
}

/** GET /articles/:holder for one page across all languages. */
export async function fetchArticlesPage(
  f: typeof fetch,
  base: string,
  holder: string,
  opts: { page?: number; size?: number; newsSourceId?: string; lang?: string } = {}
): Promise<ArticlesPage> {
  const qs = new URLSearchParams();
  qs.set("page", String(Math.max(1, opts.page ?? 1)));
  qs.set("size", String(opts.size ?? BLOG_PAGE_SIZE));
  if (opts.newsSourceId) qs.set("newsSourceId", opts.newsSourceId);
  if (opts.lang) qs.set("lang", opts.lang);
  try {
    const r = await fetchWithTimeout(f, `${base}/articles/${encodeURIComponent(holder)}?${qs.toString()}`);
    if (!r.ok) return { ok: false, languages: [], byLang: {} };
    const data = await r.json();
    const byLang: ArticlesPage["byLang"] = {};
    const langs: BlogLanguageInfo[] = [];
    type RawLanguagePage = { withImages?: RawArticle[]; withoutImages?: RawArticle[]; total?: unknown } | null;
    for (const [code, ld] of Object.entries<RawLanguagePage>(data?.articles ?? {})) {
      byLang[code] = {
        withImages: (ld?.withImages ?? []).map(toCard),
        withoutImages: (ld?.withoutImages ?? []).map(toCard),
        total: Number(ld?.total ?? 0),
      };
      langs.push({ code, total: Number(ld?.total ?? 0) });
    }
    langs.sort((a, b) => b.total - a.total);
    return { ok: true, languages: langs, byLang };
  } catch {
    return { ok: false, languages: [], byLang: {} };
  }
}

/**
 * Streams the NDJSON search endpoint. Calls onHit for each slim article.
 * Resolves with the hit count. Throws on network/HTTP failure (not on abort).
 */
export async function streamSearch(
  base: string,
  holder: string,
  q: string,
  opts: { newsSourceId?: string; lang?: string; maxHits?: number; signal?: AbortSignal },
  onHit: (card: BlogCard) => void
): Promise<number> {
  const qs = new URLSearchParams({ search: q });
  if (opts.newsSourceId) qs.set("newsSourceId", opts.newsSourceId);
  if (opts.lang) qs.set("lang", opts.lang);
  if (opts.maxHits) qs.set("maxHits", String(opts.maxHits));
  const resp = await fetch(`${base}/articles/${encodeURIComponent(holder)}?${qs.toString()}`, { signal: opts.signal });
  if (!resp.ok) throw new Error(`Search failed with status ${resp.status}`);
  let count = 0;
  const handle = (line: string) => {
    const s = line.trim();
    if (!s) return;
    try {
      onHit(toCard(JSON.parse(s)));
      count++;
    } catch {
      /* skip a malformed line */
    }
  };
  const reader = resp.body?.getReader();
  if (!reader) {
    (await resp.text()).split("\n").forEach(handle);
    return count;
  }
  const decoder = new TextDecoder();
  let buffer = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buffer += decoder.decode(value, { stream: true });
    const lines = buffer.split("\n");
    buffer = lines.pop() ?? "";
    lines.forEach(handle);
  }
  handle(buffer + decoder.decode());
  return count;
}

/* ───────────── recent searches (per browser) ───────────── */

const RECENT_KEY = (holder: string) => `aiban.blog.recent.${holder}`;

export function readRecent(holder: string): string[] {
  try {
    const raw = localStorage.getItem(RECENT_KEY(holder));
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list.filter((x) => typeof x === "string").slice(0, 5) : [];
  } catch {
    return [];
  }
}

export function saveRecent(holder: string, q: string): string[] {
  const term = q.trim();
  if (!term) return readRecent(holder);
  const next = [term, ...readRecent(holder).filter((x) => x.toLowerCase() !== term.toLowerCase())].slice(0, 5);
  try {
    localStorage.setItem(RECENT_KEY(holder), JSON.stringify(next));
  } catch {
    /* storage blocked: keep working without it */
  }
  return next;
}

export function clearRecent(holder: string): void {
  try {
    localStorage.removeItem(RECENT_KEY(holder));
  } catch {
    /* ignore */
  }
}
