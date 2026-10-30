// Email signature engine. Owner: WS5.
// Structured data in, email-safe HTML out (nested tables, inline styles, no CSS classes,
// no scripts, only http/https/mailto/tel links). The HTML is stored in config.emailSignature
// and printed by templates/newsletterEmail.html when config.showEmailSignature is true.
// The data is stored in config.emailSignatureFields so the editor can reopen it.
// Superset of the dashboard's SignatureFields { name, role, company, phone, website }.

export type SignatureLayout = 'bar' | 'photo' | 'stacked' | 'centered' | 'minimal';
export type SignatureFont = 'sans' | 'serif';
export type SignatureSize = 'sm' | 'md';
export type SignatureImageShape = 'round' | 'square';
export type SocialKey = 'linkedin' | 'x' | 'instagram' | 'facebook' | 'youtube' | 'tiktok' | 'github';

export type SignatureData = {
  version: 2;
  name: string;
  role: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  address: string;
  photoUrl: string;
  logoUrl: string;
  socials: Record<SocialKey, string>;
  ctaLabel: string;
  ctaUrl: string;
  disclaimer: string;
  layout: SignatureLayout;
  accent: string;
  font: SignatureFont;
  size: SignatureSize;
  imageShape: SignatureImageShape;
  /** Field keys the owner switched off without deleting their text. */
  hidden: SignatureFieldKey[];
};

export type SignatureFieldKey =
  | 'name' | 'role' | 'company' | 'phone' | 'email' | 'website' | 'address'
  | 'photoUrl' | 'logoUrl' | 'socials' | 'cta' | 'disclaimer';

export const SOCIAL_KEYS: SocialKey[] = ['linkedin', 'x', 'instagram', 'facebook', 'youtube', 'tiktok', 'github'];
export const SOCIAL_LABELS: Record<SocialKey, string> = {
  linkedin: 'LinkedIn', x: 'X', instagram: 'Instagram', facebook: 'Facebook', youtube: 'YouTube', tiktok: 'TikTok', github: 'GitHub',
};

export const DEFAULT_ACCENT = '#1f5c4f';

export function emptySignature(): SignatureData {
  return {
    version: 2,
    name: '', role: '', company: '', phone: '', email: '', website: '', address: '',
    photoUrl: '', logoUrl: '',
    socials: { linkedin: '', x: '', instagram: '', facebook: '', youtube: '', tiktok: '', github: '' },
    ctaLabel: '', ctaUrl: '', disclaimer: '',
    layout: 'bar', accent: DEFAULT_ACCENT, font: 'sans', size: 'md', imageShape: 'round',
    hidden: [],
  };
}

/** Reads whatever is stored (v2 data, the dashboard's 5-field shape, or nothing). */
export function toSignatureData(stored: unknown, defaults: Partial<SignatureData> = {}): SignatureData {
  const base = { ...emptySignature(), ...defaults };
  if (!stored || typeof stored !== 'object') return base;
  const s = stored as Record<string, unknown>;
  const str = (k: string) => (typeof s[k] === 'string' ? (s[k] as string) : (base as unknown as Record<string, string>)[k] ?? '');
  const socialsIn = (s.socials && typeof s.socials === 'object' ? s.socials : {}) as Record<string, unknown>;
  const socials = { ...base.socials };
  for (const k of SOCIAL_KEYS) if (typeof socialsIn[k] === 'string') socials[k] = socialsIn[k] as string;
  const pick = <T extends string>(k: string, allowed: readonly T[], d: T): T =>
    (allowed as readonly string[]).includes(String(s[k])) ? (s[k] as T) : d;
  return {
    version: 2,
    name: str('name'), role: str('role'), company: str('company'), phone: str('phone'), email: str('email'),
    website: str('website'), address: str('address'), photoUrl: str('photoUrl'), logoUrl: str('logoUrl'),
    socials,
    ctaLabel: str('ctaLabel'), ctaUrl: str('ctaUrl'), disclaimer: str('disclaimer'),
    layout: pick('layout', ['bar', 'photo', 'stacked', 'centered', 'minimal'] as const, base.layout),
    accent: normalizeHex(str('accent')) || base.accent || DEFAULT_ACCENT,
    font: pick('font', ['sans', 'serif'] as const, base.font),
    size: pick('size', ['sm', 'md'] as const, base.size),
    imageShape: pick('imageShape', ['round', 'square'] as const, base.imageShape),
    hidden: Array.isArray(s.hidden) ? (s.hidden.filter((x) => typeof x === 'string') as SignatureFieldKey[]) : [],
  };
}

// ---------- small, strict helpers ----------
export function escapeHtml(v: string | null | undefined): string {
  return String(v ?? '').replace(/[&<>"'`$\\{}]/g, (c) => `&#${c.charCodeAt(0)};`);
}

export function normalizeHex(v: string | null | undefined): string {
  const s = String(v ?? '').trim();
  const h = s.startsWith('#') ? s : `#${s}`;
  if (/^#[0-9a-f]{6}$/i.test(h)) return h.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(h)) return `#${h[1]}${h[1]}${h[2]}${h[2]}${h[3]}${h[3]}`.toLowerCase();
  return '';
}

/** Adds https:// when missing. Returns '' for anything that is not http(s). */
export function normalizeUrl(v: string | null | undefined): string {
  let s = String(v ?? '').trim();
  if (!s) return '';
  if (!/^[a-z][a-z0-9+.-]*:/i.test(s)) s = `https://${s.replace(/^\/\//, '')}`;
  try {
    const u = new URL(s);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : '';
  } catch {
    return '';
  }
}

export function displayUrl(url: string): string {
  return url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '');
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = ch.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** Text on the accent color (button label). */
export function onAccent(hex: string): string {
  const L = luminance(hex);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.0556 ? '#ffffff' : '#111111';
}

/** Accent used for text links: falls back to ink when the accent is too light on white. */
function linkColor(hex: string): string {
  return luminance(hex) <= 0.18 ? hex : '#1a1a17';
}

export function isVisible(d: SignatureData, key: SignatureFieldKey): boolean {
  return !d.hidden.includes(key);
}

export function isEmpty(d: SignatureData): boolean {
  return !buildSignatureHtml(d);
}

// ---------- HTML builder ----------
type BuildOptions = {
  /** Adds data-sig-field attributes so the editor can map clicks to fields. Never use for saved HTML. */
  annotate?: boolean;
};

export function buildSignatureHtml(d: SignatureData, opts: BuildOptions = {}): string {
  const accent = normalizeHex(d.accent) || DEFAULT_ACCENT;
  const link = linkColor(accent);
  const fontStack = d.font === 'serif' ? "Georgia,'Times New Roman',serif" : 'Arial,Helvetica,sans-serif';
  const fs = d.size === 'sm' ? 13 : 14;
  const nameFs = d.size === 'sm' ? 15 : 17;
  const tag = (key: SignatureFieldKey) => (opts.annotate ? ` data-sig-field="${key}"` : '');
  const vis = (key: SignatureFieldKey) => isVisible(d, key);

  const name = vis('name') ? d.name.trim() : '';
  const roleLine = [vis('role') ? d.role.trim() : '', vis('company') ? d.company.trim() : ''].filter(Boolean);
  const phone = vis('phone') ? d.phone.trim() : '';
  const tel = phone.replace(/[^\d+]/g, '');
  const email = vis('email') && EMAIL_RE.test(d.email.trim()) ? d.email.trim() : '';
  const website = vis('website') ? normalizeUrl(d.website) : '';
  const address = vis('address') ? d.address.trim() : '';
  const photo = vis('photoUrl') ? normalizeUrl(d.photoUrl) : '';
  const logo = vis('logoUrl') ? normalizeUrl(d.logoUrl) : '';
  const socials = vis('socials')
    ? SOCIAL_KEYS.map((k) => ({ k, url: normalizeUrl(d.socials[k]) })).filter((s) => s.url)
    : [];
  const ctaUrl = vis('cta') ? normalizeUrl(d.ctaUrl) : '';
  const ctaLabel = vis('cta') ? d.ctaLabel.trim() : '';
  const disclaimer = vis('disclaimer') ? d.disclaimer.trim() : '';

  const muted = 'color:#4a4943;';
  const a = (href: string, text: string, style: string, key: SignatureFieldKey) =>
    `<a href="${escapeHtml(href)}" target="_blank" style="${style}text-decoration:none;"${tag(key)}>${escapeHtml(text)}</a>`;

  const lines: string[] = [];
  if (name) lines.push(`<div style="font-size:${nameFs}px;line-height:1.3;font-weight:bold;color:#1a1a17;"${tag('name')}>${escapeHtml(name)}</div>`);
  if (roleLine.length) {
    const role = vis('role') && d.role.trim() ? `<span${tag('role')}>${escapeHtml(d.role.trim())}</span>` : '';
    const company = vis('company') && d.company.trim() ? `<span${tag('company')}>${escapeHtml(d.company.trim())}</span>` : '';
    lines.push(`<div style="${muted}">${[role, company].filter(Boolean).join(', ')}</div>`);
  }
  const contact: string[] = [];
  if (phone) contact.push(tel ? a(`tel:${tel}`, phone, muted, 'phone') : `<span${tag('phone')}>${escapeHtml(phone)}</span>`);
  if (email) contact.push(a(`mailto:${email}`, email, muted, 'email'));
  if (website) contact.push(a(website, displayUrl(website), `color:${link};`, 'website'));
  if (contact.length) lines.push(`<div style="padding-top:4px;">${contact.join(`<span style="color:#8c887d;">&nbsp;&nbsp;|&nbsp;&nbsp;</span>`)}</div>`);
  if (address) lines.push(`<div style="${muted}"${tag('address')}>${escapeHtml(address)}</div>`);
  if (socials.length)
    lines.push(
      `<div style="padding-top:4px;"${tag('socials')}>${socials
        .map((s) => `<a href="${escapeHtml(s.url)}" target="_blank" style="color:${link};text-decoration:none;font-weight:bold;">${SOCIAL_LABELS[s.k]}</a>`)
        .join(`<span style="color:#8c887d;">&nbsp;&nbsp;&middot;&nbsp;&nbsp;</span>`)}</div>`,
    );
  if (ctaUrl && ctaLabel)
    lines.push(
      `<table role="presentation" cellpadding="0" cellspacing="0" border="0"${d.layout === 'centered' ? ' align="center"' : ''} style="margin-top:10px;"${tag('cta')}><tr><td style="background:${accent};border-radius:6px;"><a href="${escapeHtml(ctaUrl)}" target="_blank" style="display:inline-block;padding:8px 16px;font-family:${fontStack};font-size:${fs}px;font-weight:bold;color:${onAccent(accent)};text-decoration:none;">${escapeHtml(ctaLabel)}</a></td></tr></table>`,
    );

  if (!lines.length && !photo && !logo && !disclaimer) return '';

  const radius = d.imageShape === 'round' ? '50%' : '8px';
  const photoImg = photo
    ? `<img src="${escapeHtml(photo)}" width="72" height="72" alt="${escapeHtml(name || 'Photo')}" style="display:block;width:72px;height:72px;border-radius:${radius};object-fit:cover;border:0;"${tag('photoUrl')}>`
    : '';
  const logoImg = logo
    ? `<img src="${escapeHtml(logo)}" height="32" alt="${escapeHtml(d.company.trim() || 'Logo')}" style="display:block;height:32px;width:auto;max-width:160px;border:0;"${tag('logoUrl')}>`
    : '';
  const text = lines.join('');
  const wrap = (inner: string) =>
    `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="font-family:${fontStack};font-size:${fs}px;line-height:1.5;color:#1a1a17;">${inner}</table>`;
  const disclaimerRow = disclaimer
    ? `<tr><td colspan="3" style="padding-top:12px;font-size:11px;line-height:1.4;color:#6b6a63;"${tag('disclaimer')}>${escapeHtml(disclaimer).replace(/\n/g, '<br>')}</td></tr>`
    : '';

  switch (d.layout) {
    case 'photo': {
      const left = photoImg || logoImg;
      return wrap(
        `<tr>${left ? `<td valign="top" style="padding-right:14px;">${left}</td>` : ''}<td valign="top" style="border-left:2px solid ${accent};padding-left:14px;">${text}${photoImg && logoImg ? `<div style="padding-top:10px;">${logoImg}</div>` : ''}</td></tr>${disclaimerRow}`,
      );
    }
    case 'stacked':
      return wrap(
        `<tr><td>${logoImg ? `<div style="padding-bottom:10px;">${logoImg}</div>` : ''}${photoImg ? `<div style="padding-bottom:10px;">${photoImg}</div>` : ''}${text}<div style="margin-top:12px;height:2px;width:48px;background:${accent};line-height:2px;font-size:0;">&nbsp;</div></td></tr>${disclaimerRow}`,
      );
    case 'centered':
      return wrap(
        `<tr><td align="center" style="text-align:center;">${photoImg ? `<div style="padding-bottom:10px;"><center>${photoImg}</center></div>` : ''}${text}${logoImg ? `<div style="padding-top:10px;"><center>${logoImg}</center></div>` : ''}</td></tr>${disclaimerRow.replace('colspan="3" style="', 'colspan="3" align="center" style="text-align:center;')}`,
      );
    case 'minimal':
      return wrap(`<tr><td>${text}${logoImg ? `<div style="padding-top:8px;">${logoImg}</div>` : ''}</td></tr>${disclaimerRow}`);
    case 'bar':
    default:
      return wrap(
        `<tr><td width="3" style="width:3px;background:${accent};font-size:0;line-height:0;">&nbsp;</td><td valign="top" style="padding-left:14px;">${text}</td>${photoImg || logoImg ? `<td valign="top" style="padding-left:16px;">${photoImg || logoImg}</td>` : ''}</tr>${disclaimerRow}`,
      );
  }
}
