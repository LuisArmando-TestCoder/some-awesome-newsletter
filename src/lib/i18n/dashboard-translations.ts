// Dashboard strings. English is bundled; other languages load on demand (see lazy.ts).
import en from './locales-dashboard/en';
import { createNamespace } from './lazy';

const ns = createNamespace(
  en,
  import.meta.glob(['./locales-dashboard/*.ts', '!./locales-dashboard/en.ts', '!./locales-dashboard/translations.ts'], { import: 'default' }),
);

export const t = ns.t;
export const locales = ns.locales;
export const loadLocale = ns.load;
export const setLocale = ns.setLocale;
