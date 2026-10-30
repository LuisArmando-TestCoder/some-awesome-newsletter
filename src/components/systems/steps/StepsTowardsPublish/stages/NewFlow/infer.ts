/** Small inference helpers for onboarding (WS3). Pure functions, no network. */

/** Accept "example.com", "www.example.com/blog" or a full URL; return an https URL. */
export function normalizeUrl(input: string): string {
  let v = (input || "").trim();
  if (!v) return "";
  v = v.replace(/\s+/g, "");
  if (!/^https?:\/\//i.test(v)) v = "https://" + v.replace(/^\/+/, "");
  return v;
}

/** "https://www.silva-studio.com/blog" -> "Readers of Silva Studio" style seed text. */
export function siteNameFromUrl(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./i, "");
    const base = host.split(".")[0] || host;
    return base
      .split(/[-_]/)
      .filter(Boolean)
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  } catch {
    return "";
  }
}

export function guessReaderFromUrl(url: string): string {
  const name = siteNameFromUrl(url);
  return name ? `Customers and followers of ${name}` : "";
}

/** Two-letter language code from the browser, or "" when unknown. */
export function browserLanguage(): string {
  try {
    const lang = (typeof navigator !== "undefined" && (navigator.languages?.[0] || navigator.language)) || "";
    return lang.split("-")[0].toLowerCase();
  } catch {
    return "";
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export function isEmail(v: string): boolean {
  return EMAIL_RE.test((v || "").trim());
}

/** Split pasted text into unique, trimmed addresses and the parts that are not valid emails. */
export function parseEmailList(text: string): { valid: string[]; invalid: string[] } {
  const parts = (text || "")
    .split(/[\s,;]+/)
    .map((s) => s.trim().replace(/^<|>$/g, ""))
    .filter(Boolean);
  const valid: string[] = [];
  const invalid: string[] = [];
  const seen = new Set<string>();
  for (const p of parts) {
    const lower = p.toLowerCase();
    if (seen.has(lower)) continue;
    seen.add(lower);
    (isEmail(p) ? valid : invalid).push(p);
  }
  return { valid, invalid };
}

/** Escape text for safe use inside generated HTML (signature). */
export function escapeHtml(s: string): string {
  return (s || "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}
