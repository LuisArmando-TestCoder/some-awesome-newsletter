// WS4. Dashboard copy helper.
// English strings live in src/lib/i18n/locales-dashboard/en.ts under "dash.*".
// Other locales may not have the new keys yet (WS9 propagates them), so every
// lookup falls back to English, then to the key itself. Never renders "undefined".
import { derived } from "svelte/store";
import { t } from "$lib/i18n/dashboard-translations";
import en from "$lib/i18n/locales-dashboard/en";

type Dict = Record<string, string>;
const EN = en as unknown as Dict;

export type Translate = (key: string, vars?: Record<string, string | number>) => string;

export function fill(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (m, k) => (k in vars ? String(vars[k]) : m));
}

/** `$dt("dash.nav.home")` or `$dt("dash.x", { count: 3 })` */
export const dt = derived(t, ($t) => {
  const cur = ($t ?? {}) as unknown as Dict;
  const fn: Translate = (key, vars) => fill(cur[key] ?? EN[key] ?? key, vars);
  return fn;
});

/** Pick "one" or "other" variant: keys "<base>.one" and "<base>.other". */
export function plural(tr: Translate, base: string, count: number, vars: Record<string, string | number> = {}) {
  return tr(`${base}.${count === 1 ? "one" : "other"}`, { count: formatNumber(count), ...vars });
}

export function formatNumber(n: number): string {
  try {
    return new Intl.NumberFormat().format(n);
  } catch {
    return String(n);
  }
}
