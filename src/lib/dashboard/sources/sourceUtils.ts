// WS4. Helpers for the Sources section: host names, schedule in words, plan usage.
import { nextRun, parseCron } from "../data/schedule";
import { computeUsage } from "$lib/api/usage";
import type { NewsSource } from "../../../components/types";
import type { Translate } from "../i18n";

/** "https://www.acme.com/blog" -> "acme.com/blog" */
export function hostOf(url?: string | null): string {
  if (!url) return "";
  try {
    const u = new URL(url);
    const path = u.pathname.replace(/\/+$/, "");
    return u.hostname.replace(/^www\./, "") + (path && path !== "/" ? path : "");
  } catch {
    return url.replace(/^https?:\/\//, "").replace(/\/+$/, "");
  }
}

/** Oldest source first: the first one the owner added is treated as "your website". */
export function orderSources(list: NewsSource[] | undefined | null): NewsSource[] {
  return Array.isArray(list) ? [...list] : [];
}

function dayName(d: number): string {
  const base = new Date(Date.UTC(2024, 0, 7 + d)); // 2024-01-07 is a Sunday
  try {
    return new Intl.DateTimeFormat(undefined, { weekday: "long", timeZone: "UTC" }).format(base);
  } catch {
    return String(d);
  }
}

/** Plain sentence for a schedule, in the viewer's time zone. The cron is read in `tz` (missing = UTC, older sources). */
export function scheduleWords(cron: string | null | undefined, tr: Translate, tz?: string | null): string {
  const p = parseCron(cron);
  const first = p ? nextRun(cron, new Date(), tz) : null;
  if (!p || !first) return tr("dash.sources.schedule.none");
  let time = "";
  try {
    time = new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(first);
  } catch {
    time = `${String(first.getHours()).padStart(2, "0")}:${String(first.getMinutes()).padStart(2, "0")}`;
  }
  if (!p.domStar) {
    const dom = [...p.dom][0] ?? 1;
    return tr("dash.sources.schedule.monthly", { day: dom, time });
  }
  if (p.dowStar) return tr("dash.sources.schedule.daily", { time });
  // Collect the local weekdays of the next week of runs.
  const local = new Set<number>();
  let at = new Date();
  for (let i = 0; i < 7; i++) {
    const n = nextRun(cron, at, tz);
    if (!n) break;
    local.add(n.getDay());
    at = n;
  }
  const days = [...local].sort((a, b) => ((a + 6) % 7) - ((b + 6) % 7));
  if (days.length === 5 && [1, 2, 3, 4, 5].every((d) => days.includes(d))) return tr("dash.sources.schedule.weekdays", { time });
  if (days.length === 1) return tr("dash.sources.schedule.weekly", { day: dayName(days[0]), time });
  return tr("dash.sources.schedule.days", { days: days.map(dayName).join(", "), time });
}

export type SourceUsage = { used: number; limit: number; unlimited: boolean; atLimit: boolean; overLimit: boolean };

/** Plan usage for sources, computed from the live store (reactive when called with $store values). */
export function sourceUsage(
  config: Parameters<typeof computeUsage>[0],
  subscribers: Parameters<typeof computeUsage>[1]
): SourceUsage {
  const u = computeUsage(config, subscribers).newsSources;
  return { used: u.used, limit: u.limit, unlimited: u.unlimited, atLimit: u.atLimit, overLimit: !u.unlimited && u.used > u.limit };
}

/** Accept "acme.com" as well as "https://acme.com". Returns null when it is not a web address. */
export function normalizeUrl(raw: string): string | null {
  const v = (raw || "").trim();
  if (!v) return null;
  const withScheme = /^https?:\/\//i.test(v) ? v : `https://${v}`;
  try {
    const u = new URL(withScheme);
    if (!u.hostname.includes(".")) return null;
    return u.toString();
  } catch {
    return null;
  }
}
