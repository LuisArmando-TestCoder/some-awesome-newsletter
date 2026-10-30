// Subscribe flow strings. Owner: WS5.
// `t` follows the shared language store (see lazy.ts), merged over English.
// `ts` is what WS5 components read: a deep merge over English, so a key that a
// locale file does not have yet falls back to English instead of `undefined`.
import { derived } from 'svelte/store';
import en from './locales-subscribe/en';
import { createNamespace, deepMerge, normalizeCode } from './lazy';

export type SubscribeStrings = typeof en;

// English is bundled; the other 190 or so languages load on demand (see lazy.ts).
const ns = createNamespace(
  en,
  import.meta.glob(['./locales-subscribe/*.ts', '!./locales-subscribe/en.ts', '!./locales-subscribe/translations.ts'], { import: 'default' }),
);

export const t = ns.t;

export const locales = ns.locales;

export const loadSubscribeLocale = ns.load;

function isObject(v: unknown): v is Record<string, unknown> {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

export const ts = derived(t, ($t) => deepMerge(en, $t) as SubscribeStrings);

/**
 * Switches the subscribe strings to a locale if one exists. Returns true when the
 * locale exists; its file loads in the background and the strings switch when it arrives.
 */
export function setSubscribeLocale(code: string | null | undefined): boolean {
  if (!code || !ns.has(code)) return false;
  void ns.setLocale(code);
  return true;
}

/**
 * True when the locale file has its own (translated) section, e.g. hasLocaleSection('es', 'form').
 * Only knows locales that are loaded already; use localeHasSection to load first.
 */
export function hasLocaleSection(code: string | null | undefined, section: string): boolean {
  if (!code) return false;
  const dict = normalizeCode(code) === 'en' ? (en as Record<string, unknown>) : ns.peek(code);
  return !!dict && isObject(dict[section]);
}

/** Loads the locale if needed, then answers like hasLocaleSection. */
export async function localeHasSection(code: string | null | undefined, section: string): Promise<boolean> {
  if (!code) return false;
  const dict = normalizeCode(code) === 'en' ? (en as Record<string, unknown>) : await ns.load(code);
  return !!dict && isObject(dict[section]);
}

/** Replaces {key} placeholders. Values are inserted as text by Svelte, never as HTML. */
export function fill(template: string | undefined, vars: Record<string, string | number | null | undefined> = {}): string {
  return String(template ?? '').replace(/\{(\w+)\}/g, (_m, key: string) => {
    const v = vars[key];
    return v === undefined || v === null ? '' : String(v);
  });
}
