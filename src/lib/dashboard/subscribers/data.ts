// WS4. Subscriber list data: one row per unique email across all sources.
// Built from $store.subscribers and memoized on the references that matter, so
// unrelated store writes (theme, step index, drafts) do not rebuild 50k rows.
import { derived, type Readable } from "svelte/store";
import store from "../../../components/store";
import type { NewsSource } from "../../../components/types";

export type SourceRef = { id: string; host: string };

export type SubscriberRow = {
  email: string;
  name: string;
  /** lowercased language code, "" when unknown */
  language: string;
  sources: SourceRef[];
  /** lowercased "email name" used by search */
  haystack: string;
};

export type SubscriberData = {
  rows: SubscriberRow[];
  /** source ids present in $store.subscribers (loaded at least once) */
  loadedSourceIds: Set<string>;
  sources: SourceRef[];
  /** language codes in use, most common first */
  languages: string[];
  /** sources that returned exactly the backend page limit */
  possiblyCut: SourceRef[];
  countBySource: Record<string, number>;
};

/** The backend returns at most this many subscribers per source today. */
export const BACKEND_LIMIT = 1000;

export function hostOf(url: string | undefined | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

const EMPTY: SubscriberData = { rows: [], loadedSourceIds: new Set(), sources: [], languages: [], possiblyCut: [], countBySource: {} };

/** Subscriber fields read here; the API may send more. */
type RawSubscriber = { email?: unknown; name?: unknown; language?: unknown } | null;

function build(subsBySource: Record<string, RawSubscriber[]>, newsSources: NewsSource[]): SubscriberData {
  const sources: SourceRef[] = newsSources.filter((ns) => ns?.id).map((ns) => ({ id: ns.id as string, host: hostOf(ns.url) || (ns.id as string) }));
  const byId = new Map(sources.map((s) => [s.id, s]));
  const unique = new Map<string, SubscriberRow>();
  const langCount = new Map<string, number>();
  const countBySource: Record<string, number> = {};
  const possiblyCut: SourceRef[] = [];
  const loadedSourceIds = new Set<string>();

  for (const [sourceId, list] of Object.entries(subsBySource ?? {})) {
    if (!Array.isArray(list)) continue;
    loadedSourceIds.add(sourceId);
    const ref = byId.get(sourceId) ?? { id: sourceId, host: sourceId };
    countBySource[sourceId] = list.length;
    if (list.length === BACKEND_LIMIT) possiblyCut.push(ref);
    for (const u of list) {
      if (!u) continue;
      const email = String(u.email ?? "").trim();
      if (!email) continue;
      const key = email.toLowerCase();
      const existing = unique.get(key);
      if (existing) {
        if (!existing.sources.some((s) => s.id === ref.id)) existing.sources.push(ref);
        if (!existing.name && u.name) {
          existing.name = String(u.name);
          existing.haystack = `${key} ${existing.name.toLowerCase()}`;
        }
        continue;
      }
      const name = u.name && u.name !== email ? String(u.name) : "";
      const language = String(u.language ?? "").toLowerCase();
      unique.set(key, { email, name, language, sources: [ref], haystack: `${key} ${name.toLowerCase()}` });
      if (language) langCount.set(language, (langCount.get(language) ?? 0) + 1);
    }
  }

  const rows = [...unique.values()].sort((a, b) => a.email.localeCompare(b.email));
  const languages = [...langCount.entries()].sort((a, b) => b[1] - a[1]).map(([code]) => code);
  return { rows, loadedSourceIds, sources, languages, possiblyCut, countBySource };
}

let lastSubs: unknown = null;
let lastSources: unknown = null;
let cached: SubscriberData = EMPTY;

/** Memoized: rebuilds only when the subscribers object or the sources list changes. */
export const subscriberData: Readable<SubscriberData> = derived(store, ($s, set) => {
  const subs = $s.subscribers ?? {};
  const ns = $s.config?.newsSources ?? [];
  if (subs === lastSubs && ns === lastSources) return;
  lastSubs = subs;
  lastSources = ns;
  cached = build(subs as Record<string, RawSubscriber[]>, ns);
  set(cached);
}, EMPTY);

export type Filters = { query: string; language: string; source: string };

/** Returns a filter function that remembers its last inputs and result. */
export function createFilter() {
  let lastRows: SubscriberRow[] | null = null;
  let lastKey = "";
  let lastOut: SubscriberRow[] = [];
  return (rows: SubscriberRow[], f: Filters): SubscriberRow[] => {
    const q = f.query.trim().toLowerCase();
    const key = `${q}\u0000${f.language}\u0000${f.source}`;
    if (rows === lastRows && key === lastKey) return lastOut;
    lastRows = rows;
    lastKey = key;
    if (!q && !f.language && !f.source) {
      lastOut = rows;
      return rows;
    }
    lastOut = rows.filter(
      (r) =>
        (!q || r.haystack.includes(q)) &&
        (!f.language || (f.language === "?" ? !r.language : r.language === f.language)) &&
        (!f.source || r.sources.some((s) => s.id === f.source))
    );
    return lastOut;
  };
}

function csvCell(v: string): string {
  // Neutralize spreadsheet formulas, then quote when needed.
  let s = v ?? "";
  if (/^[=+\-@\t\r]/.test(s)) s = `'${s}`;
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export function toCsv(rows: SubscriberRow[]): string {
  const lines = ["email,name,language,source"];
  for (const r of rows) lines.push([r.email, r.name, r.language, r.sources.map((s) => s.host).join(" ")].map(csvCell).join(","));
  return lines.join("\r\n");
}

export function downloadCsv(rows: SubscriberRow[], fileName = "subscribers.csv") {
  if (typeof document === "undefined") return;
  const blob = new Blob(["﻿" + toCsv(rows)], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
