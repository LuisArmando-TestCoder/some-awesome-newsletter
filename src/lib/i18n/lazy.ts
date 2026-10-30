// Lazy locale loading (WS10 bundle fix).
// Each namespace bundles only its English file, so first paint never shows keys.
// Other languages are separate chunks, loaded with import() when the active
// language changes. Missing keys in a locale fall back to English (deep merge).
// Namespaces follow the shared `language` store, so a namespace that loads late
// (for example the dashboard after a client side navigation) picks up the
// current language on its own.
import { writable, type Writable } from 'svelte/store';
import { language } from '$lib/stores/language.store';

export type Dict = Record<string, unknown>;
type Loader = () => Promise<unknown>;

function isObject(v: unknown): v is Dict {
  return !!v && typeof v === 'object' && !Array.isArray(v);
}

/** English (`base`) with every non-empty value of `over` laid on top, nested objects included. */
export function deepMerge<T>(base: T, over: unknown): T {
  if (!isObject(over)) return base;
  if (!isObject(base)) return (over as T) ?? base;
  const out: Dict = { ...base };
  for (const key of Object.keys(over)) {
    const b = base[key];
    const o = over[key];
    if (o === undefined || o === null || o === '') continue;
    out[key] = isObject(b) && isObject(o) ? deepMerge(b, o) : o;
  }
  return out as T;
}

/** "es-MX" -> "es". The app stores Japanese as "jp"; browsers report "ja". */
export function normalizeCode(code: string | null | undefined): string {
  const base = String(code ?? '').trim().toLowerCase().split(/[-_]/)[0];
  return base === 'ja' ? 'jp' : base;
}

/** The `lang` attribute for an app code ("jp" is "ja" in HTML). */
export function htmlLang(code: string): string {
  return code === 'jp' ? 'ja' : code;
}

export type Namespace<T> = {
  t: Writable<T>;
  /** Every language this namespace has a file for, English first. */
  locales: string[];
  has: (code: string | null | undefined) => boolean;
  /** Loads a locale file (cached). Undefined when the namespace has no such file. */
  load: (code: string | null | undefined) => Promise<Dict | undefined>;
  /** Loaded locale, if any, without loading it. */
  peek: (code: string | null | undefined) => Dict | undefined;
  /** Loads the locale and sets `t` to it merged over English. Unknown codes show English. */
  setLocale: (code: string | null | undefined) => Promise<boolean>;
};

/**
 * `globbed` comes from import.meta.glob on the namespace folder (lazy, `import: 'default'`).
 * en.ts and translations.ts are ignored if the pattern includes them.
 */
export function createNamespace<T>(en: T, globbed: Record<string, Loader>): Namespace<T> {
  const loaders: Record<string, Loader> = {};
  for (const [file, loader] of Object.entries(globbed)) {
    const code = file.slice(file.lastIndexOf('/') + 1).replace(/\.ts$/, '');
    if (code !== 'en' && code !== 'translations') loaders[code] = loader;
  }
  const cache: Record<string, Dict> = { en: en as Dict };
  const t = writable<T>(en);
  const locales = ['en', ...Object.keys(loaders)];
  let request = 0;

  const has = (code: string | null | undefined) => {
    const c = normalizeCode(code);
    return c === 'en' || c in loaders;
  };
  const peek = (code: string | null | undefined) => cache[normalizeCode(code)];

  async function load(code: string | null | undefined): Promise<Dict | undefined> {
    const c = normalizeCode(code);
    if (cache[c]) return cache[c];
    const loader = loaders[c];
    if (!loader) return undefined;
    try {
      const dict = (await loader()) as Dict;
      cache[c] = dict;
      return dict;
    } catch (error) {
      if (import.meta.env.DEV) console.warn(`Could not load the "${c}" strings`, error);
      return undefined;
    }
  }

  async function setLocale(code: string | null | undefined): Promise<boolean> {
    const id = ++request;
    const c = normalizeCode(code);
    // English and locales loaded before need no request.
    const ready = cache[c];
    const dict = ready ?? (await load(c));
    // A newer request started while this one was loading: let that one win.
    if (id !== request) return !!dict;
    t.set(c === 'en' || !dict ? deepMerge(en, en) : deepMerge(en, dict));
    return !!dict;
  }

  if (typeof window !== 'undefined') {
    language.subscribe((code) => {
      void setLocale(code);
    });
  }

  return { t, locales, has, load, peek, setLocale };
}
