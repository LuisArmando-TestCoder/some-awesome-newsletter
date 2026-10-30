import { derived } from "svelte/store";
import { t } from "$lib/i18n/newflow-translations";
import en from "$lib/i18n/locales-newflow/en";

type Dict = { [key: string]: unknown };

/** Deep merge: values from `over` win, missing keys fall back to `base` (English). */
function merge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object" || Array.isArray(over)) return base;
  if (!base || typeof base !== "object") return base;
  const out: Dict = { ...(base as Dict) };
  for (const key of Object.keys(base as Dict)) {
    const b = (base as Dict)[key];
    const o = (over as Dict)[key];
    if (o === undefined || o === null || o === "") continue;
    out[key] = typeof b === "object" && b !== null ? merge(b, o) : typeof o === typeof b ? o : b;
  }
  return out as T;
}

/** Onboarding strings in the active language, English for any key not translated yet. */
export const ob = derived(t, ($t) => merge(en.onboarding, ($t as Dict)?.onboarding));
/** Tutorial (checklist, tour, help) strings. */
export const tt = derived(t, ($t) => merge(en.tutorial, ($t as Dict)?.tutorial));
/** Auth strings used by AuthForm. */
export const at = derived(t, ($t) => merge(en.auth, ($t as Dict)?.auth));

/** Replace {name} placeholders. */
export function fmt(template: string, vars: Record<string, string | number> = {}): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => (vars[k] !== undefined ? String(vars[k]) : `{${k}}`));
}
