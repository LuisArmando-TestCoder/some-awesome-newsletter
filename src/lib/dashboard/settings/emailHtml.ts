// WS4. Helpers that build preview and signature HTML from user input.
// Every user value goes through escapeHtml or safeUrl before it touches HTML.

export function escapeHtml(s: string | null | undefined): string {
  return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);
}

/** Adds https:// when missing. Returns "" for anything that is not http(s). */
export function normalizeUrl(input: string | null | undefined): string {
  let v = String(input ?? "").trim().replace(/\s+/g, "");
  if (!v) return "";
  if (!/^[a-z][a-z0-9+.-]*:/i.test(v)) v = "https://" + v.replace(/^\/+/, "");
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:" ? u.toString() : "";
  } catch {
    return "";
  }
}

/** Image sources we allow in previews: https URLs and inline images. */
export function safeImageSrc(src: string | null | undefined): string {
  const v = String(src ?? "").trim();
  if (/^data:image\/(png|jpe?g|gif|webp);base64,[a-z0-9+/=\s]+$/i.test(v)) return v;
  if (/^https:\/\//i.test(v)) return escapeHtml(v);
  return "";
}

export const DEFAULT_BRAND_COLOR = "#1f5c4f"; // matches the backend email template default

/** "#abc" or "#aabbcc" -> "#aabbcc"; anything else -> "". */
export function normalizeHex(v: string | null | undefined): string {
  const s = String(v ?? "").trim();
  if (/^#[0-9a-f]{6}$/i.test(s)) return s.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(s)) return ("#" + s[1] + s[1] + s[2] + s[2] + s[3] + s[3]).toLowerCase();
  return "";
}

/** Text color that reads on top of the brand color (same rule as the email template). */
export function onColor(hex: string): string {
  const h = normalizeHex(hex) || DEFAULT_BRAND_COLOR;
  const n = [1, 3, 5]
    .map((i) => parseInt(h.slice(i, i + 2), 16) / 255)
    .map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  const L = 0.2126 * n[0] + 0.7152 * n[1] + 0.0722 * n[2];
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.0556 ? "#ffffff" : "#111111";
}

export type SignatureFields = { name: string; role: string; company: string; phone: string; website: string };
export const EMPTY_SIGNATURE: SignatureFields = { name: "", role: "", company: "", phone: "", website: "" };

/** Email-safe signature table built from plain fields. Returns "" when every field is empty. */
export function buildSignature(f: SignatureFields, color: string = DEFAULT_BRAND_COLOR): string {
  const accent = normalizeHex(color) || DEFAULT_BRAND_COLOR;
  const url = normalizeUrl(f.website);
  const shown = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const roleLine = [f.role.trim(), f.company.trim()].filter(Boolean).map(escapeHtml).join(", ");
  const phone = f.phone.trim();
  const tel = phone.replace(/[^\d+]/g, "");
  const parts = [
    f.name.trim() ? `<strong style="font-size:15px;color:#1a1a17">${escapeHtml(f.name.trim())}</strong>` : "",
    roleLine ? `<span style="color:#4a4943">${roleLine}</span>` : "",
    phone ? (tel ? `<a href="tel:${escapeHtml(tel)}" style="color:#4a4943;text-decoration:none">${escapeHtml(phone)}</a>` : escapeHtml(phone)) : "",
    url ? `<a href="${escapeHtml(url)}" style="color:${accent};text-decoration:none">${escapeHtml(shown)}</a>` : "",
  ].filter(Boolean);
  if (!parts.length) return "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5"><tr><td width="3" style="background:${accent};font-size:0;line-height:0">&nbsp;</td><td style="padding-left:12px">${parts.join("<br>")}</td></tr></table>`;
}
