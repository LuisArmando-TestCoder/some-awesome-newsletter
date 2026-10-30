// WS4. Report numbers derived from $store.leads ({ [nsId]: { [email]: { [isoTimestamp]: url } } }).
// Memoized on the leads reference so other store writes do not recount clicks.
import { derived, type Readable } from "svelte/store";
import store from "../../../components/store";

export type DayCount = { key: string; date: Date; count: number };
export type LinkCount = { url: string; host: string; path: string; count: number };
export type ClickerCount = { email: string; count: number };

export type ClickReport = {
  days: DayCount[];
  topLinks: LinkCount[];
  topClickers: ClickerCount[];
  total: number;
};

const DAYS = 30;

function dayKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function splitUrl(url: string): { host: string; path: string } {
  try {
    const u = new URL(url);
    return { host: u.hostname.replace(/^www\./, ""), path: u.pathname === "/" ? "" : u.pathname };
  } catch {
    return { host: url || "?", path: "" };
  }
}

export function buildClickReport(leads: Record<string, Record<string, Record<string, string>>>, now = new Date()): ClickReport {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const days: DayCount[] = [];
  const index = new Map<string, DayCount>();
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
    const entry = { key: dayKey(d), date: d, count: 0 };
    days.push(entry);
    index.set(entry.key, entry);
  }
  const links = new Map<string, number>();
  const clickers = new Map<string, number>();
  let total = 0;
  for (const byEmail of Object.values(leads ?? {})) {
    if (!byEmail || typeof byEmail !== "object") continue;
    for (const [email, byTs] of Object.entries(byEmail)) {
      if (!byTs || typeof byTs !== "object") continue;
      for (const [ts, url] of Object.entries(byTs)) {
        total++;
        const t = new Date(ts);
        if (!isNaN(t.getTime())) {
          const hit = index.get(dayKey(t));
          if (hit) hit.count++;
        }
        const u = String(url ?? "");
        links.set(u, (links.get(u) ?? 0) + 1);
        const e = email.toLowerCase();
        clickers.set(e, (clickers.get(e) ?? 0) + 1);
      }
    }
  }
  const topLinks = [...links.entries()]
    .map(([url, count]) => ({ url, count, ...splitUrl(url) }))
    .sort((a, b) => b.count - a.count);
  const topClickers = [...clickers.entries()].map(([email, count]) => ({ email, count })).sort((a, b) => b.count - a.count);
  return { days, topLinks, topClickers, total };
}

let lastLeads: unknown = undefined;
let lastDay = "";
let cached: ClickReport = buildClickReport({});

export const clickReport: Readable<ClickReport> = derived(store, ($s, set) => {
  const leads = ($s.leads ?? {}) as Record<string, Record<string, Record<string, string>>>;
  const day = dayKey(new Date());
  if (leads === lastLeads && day === lastDay) return;
  lastLeads = leads;
  lastDay = day;
  cached = buildClickReport(leads);
  set(cached);
}, cached);
