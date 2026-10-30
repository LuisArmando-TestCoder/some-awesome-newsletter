// New flow (onboarding) strings. English is bundled; other languages load on demand (see lazy.ts).
import en from './locales-newflow/en';
import { createNamespace } from './lazy';

const ns = createNamespace(
  en,
  import.meta.glob(['./locales-newflow/*.ts', '!./locales-newflow/en.ts', '!./locales-newflow/translations.ts'], { import: 'default' }),
);

export const t = ns.t;
export const locales = ns.locales;
export const loadLocale = ns.load;
export const setLocale = ns.setLocale;
