// App strings (public pages, auth, header). English is bundled; other languages
// load on demand, one file per language (see lazy.ts). The old default export
// with every language bundled is gone on purpose: it put about 37 languages on every page.
import en from './locales/en';
import { createNamespace } from './lazy';

const ns = createNamespace(
  en,
  import.meta.glob(['./locales/*.ts', '!./locales/en.ts'], { import: 'default' }),
);

export const t = ns.t;
export const locales = ns.locales;
export const loadLocale = ns.load;
export const setLocale = ns.setLocale;
