// Shared logic for the public subscribe form, the embed and the confirm page. Owner: WS5.
// Talks to two public backend endpoints:
//   GET  {api}/public-config-info?configuratorId&newsSourceId -> { newsletterTitle, senderName, logo?, brandColor? }
//   POST {api}/public-subscribe { configuratorId, newsSourceId, email, name, language }
import { get } from 'svelte/store';
import store from '../../../store';
import languagesData from '../../inputs/Language/languages';

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Right-to-left scripts among the codes we offer or receive.
export const RTL_LANGS = ['ar', 'fa', 'ur', 'he', 'ps', 'sd', 'ug', 'yi', 'dv', 'ks', 'ku', 'arz', 'apc', 'apd', 'pes', 'pnb'];

// Regional codes some browsers report, mapped to the two-letter code the backend accepts.
const MACRO: Record<string, string> = { apc: 'ar', arz: 'ar', apd: 'ar', pes: 'fa', prs: 'fa', yue: 'zh', wuu: 'zh', cmn: 'zh', pnb: 'pa', nb: 'no', nn: 'no', iw: 'he', in: 'id', fil: 'tl' };

export function baseCode(code: string | null | undefined): string {
  const c = String(code ?? '').trim().toLowerCase().split(/[-_]/)[0];
  return MACRO[c] ?? c;
}

export function isRtl(code: string | null | undefined): boolean {
  return RTL_LANGS.includes(String(code ?? '').toLowerCase().split(/[-_]/)[0]);
}

export type LanguageOption = { code: string; label: string };

/** Two-letter codes only (the backend validates ISO 639-1), labelled in the UI language. */
export function languageOptions(uiLang = 'en'): LanguageOption[] {
  let names: Intl.DisplayNames | null = null;
  try {
    names = new Intl.DisplayNames([uiLang, 'en'], { type: 'language' });
  } catch {
    names = null;
  }
  const seen = new Set<string>();
  const out: LanguageOption[] = [];
  for (const lang of languagesData as Array<{ code: string; name: string }>) {
    const code = lang.code.toLowerCase();
    if (code.length !== 2 || seen.has(code)) continue;
    seen.add(code);
    let label = lang.name;
    try {
      const own = new Intl.DisplayNames([code], { type: 'language' }).of(code);
      const local = names?.of(code);
      if (local && own && own.toLowerCase() !== local.toLowerCase()) label = `${local} (${own})`;
      else if (local) label = local;
    } catch {
      /* keep the English name */
    }
    out.push({ code, label: label.charAt(0).toLocaleUpperCase(uiLang) + label.slice(1) });
  }
  return out.sort((a, b) => a.label.localeCompare(b.label, uiLang));
}

export function languageLabel(code: string, uiLang = 'en'): string {
  try {
    const n = new Intl.DisplayNames([uiLang, 'en'], { type: 'language' }).of(code);
    if (n) return n.charAt(0).toLocaleUpperCase(uiLang) + n.slice(1);
  } catch {
    /* fall through */
  }
  const found = (languagesData as Array<{ code: string; name: string }>).find((l) => l.code === code);
  return found?.name ?? code;
}

/** First match from an explicit preference, then the browser's languages, then English. */
export function detectLanguage(available: string[], preferred?: string | null): string {
  const candidates: string[] = [];
  if (preferred) candidates.push(preferred);
  if (typeof navigator !== 'undefined') {
    candidates.push(...(navigator.languages ?? []), navigator.language ?? '');
  }
  for (const c of candidates) {
    const b = baseCode(c);
    if (b && available.includes(b)) return b;
  }
  return available.includes('en') ? 'en' : available[0] ?? 'en';
}

export function sanitizeColor(value: string | null | undefined): string | null {
  const v = String(value ?? '').trim().replace(/^%23/, '#');
  const withHash = v.startsWith('#') ? v : `#${v}`;
  if (/^#[0-9a-f]{6}$/i.test(withHash)) return withHash.toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(withHash)) {
    const [r, g, b] = withHash.slice(1);
    return `#${r}${r}${g}${g}${b}${b}`.toLowerCase();
  }
  return null;
}

function luminance(hex: string): number {
  const ch = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
  const lin = ch.map((c) => (c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)));
  return 0.2126 * lin[0] + 0.7152 * lin[1] + 0.0722 * lin[2];
}

/** Text color with the higher WCAG contrast on the given background. */
export function readableOn(hex: string): string {
  const L = luminance(hex);
  return 1.05 / (L + 0.05) >= (L + 0.05) / 0.0556 ? '#ffffff' : '#111111';
}

export function safeHttpUrl(value: string | null | undefined): string | null {
  if (!value) return null;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' || u.protocol === 'http:' ? u.toString() : null;
  } catch {
    return null;
  }
}

export function apiBase(): string {
  const s = get(store) as { apiURL?: () => string };
  return typeof s.apiURL === 'function' ? s.apiURL() : 'https://ai-newsletter-translated.onrender.com';
}

export type PublicInfo = {
  newsletterTitle?: string;
  senderName?: string;
  logo?: string;
  brandColor?: string;
  isPaidNewsletter?: boolean;
  /** True only when the owner is on a paid plan and turned the AIBAN badge off (the backend decides). */
  hidePoweredBy?: boolean;
};

export async function fetchPublicInfo(configuratorId: string, newsSourceId: string): Promise<PublicInfo | null> {
  try {
    const qs = new URLSearchParams({ configuratorId, newsSourceId });
    const res = await fetch(`${apiBase()}/public-config-info?${qs}`, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = (await res.json()) as PublicInfo;
    return data && typeof data === 'object' ? data : null;
  } catch {
    return null;
  }
}

export type SubscribeErrorCode = 'invalid' | 'not_found' | 'limit' | 'server' | 'network';
export type SubscribeResult = { ok: true } | { ok: false; code: SubscribeErrorCode; detail?: string };

export async function subscribeToNewsletter(input: {
  configuratorId: string;
  newsSourceId: string;
  email: string;
  name?: string;
  language: string;
}): Promise<SubscribeResult> {
  const email = input.email.trim();
  // The backend requires a name. When the reader skips it, use the part before the @,
  // which is what the old flow stored for everyone.
  const name = (input.name ?? '').trim() || email.split('@')[0];
  let res: Response;
  try {
    res = await fetch(`${apiBase()}/public-subscribe`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        configuratorId: input.configuratorId,
        newsSourceId: input.newsSourceId,
        email,
        name,
        language: baseCode(input.language),
      }),
    });
  } catch {
    return { ok: false, code: 'network' };
  }
  if (res.ok) return { ok: true };
  let detail: string | undefined;
  try {
    detail = ((await res.json()) as { error?: string })?.error;
  } catch {
    /* no body */
  }
  if (res.status === 400) return { ok: false, code: 'invalid', detail };
  if (res.status === 403) return { ok: false, code: 'limit', detail };
  if (res.status === 404) return { ok: false, code: 'not_found', detail };
  return { ok: false, code: 'server', detail };
}

export type ConfirmResult = { ok: true } | { ok: false; code: 'not_found' | 'invalid' | 'server' | 'network' };

export async function confirmSubscription(configId: string, newsSourceId: string, userEmail: string, token = ''): Promise<ConfirmResult> {
  const qs = new URLSearchParams({ configId, newsSourceId, userEmail });
  // Signed links carry a token. The backend refuses unsigned links once LEGACY_UNSIGNED_LINKS is off.
  if (token) qs.set('token', token);
  try {
    const res = await fetch(`${apiBase()}/confirm-subscription?${qs}`, { headers: { Accept: 'application/json' } });
    if (res.ok) return { ok: true };
    if (res.status === 404) return { ok: false, code: 'not_found' };
    if (res.status === 400 || res.status === 403) return { ok: false, code: 'invalid' };
    return { ok: false, code: 'server' };
  } catch {
    return { ok: false, code: 'network' };
  }
}

/** Tells the parent page (embed loader) about size and state. Never sends the email address. */
export function postToParent(message: Record<string, unknown>): void {
  if (typeof window === 'undefined' || window.parent === window) return;
  try {
    window.parent.postMessage({ source: 'aiban-subscribe', ...message }, '*');
  } catch {
    /* parent gone */
  }
}
