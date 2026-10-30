// Billing form strings. English is bundled; other languages load on demand (see lazy.ts).
import en from './locales-billing-form/en';
import { createNamespace } from './lazy';

const ns = createNamespace(
  en,
  import.meta.glob(['./locales-billing-form/*.ts', '!./locales-billing-form/en.ts', '!./locales-billing-form/translations.ts'], { import: 'default' }),
);

export const t = ns.t;
export const locales = ns.locales;
export const loadLocale = ns.load;
export const setLocale = ns.setLocale;
