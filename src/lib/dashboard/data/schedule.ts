// WS4. Small cron helpers for the dashboard (5 or 6 field cron, UTC or local).
// Supports *, numbers, lists (1,3), ranges (1-5) and steps (*/2, 1-10/3).

function parseField(expr: string, min: number, max: number): Set<number> | null {
  const out = new Set<number>();
  for (const part of expr.split(",")) {
    const [rangePart, stepPart] = part.split("/");
    const step = stepPart ? parseInt(stepPart, 10) : 1;
    if (!Number.isFinite(step) || step < 1) return null;
    let lo = min;
    let hi = max;
    if (rangePart !== "*" && rangePart !== "?") {
      const [a, b] = rangePart.split("-");
      lo = parseInt(a, 10);
      hi = b !== undefined ? parseInt(b, 10) : stepPart ? max : lo;
      if (!Number.isFinite(lo) || !Number.isFinite(hi)) return null;
    }
    for (let v = lo; v <= hi; v += step) if (v >= min && v <= max) out.add(v);
  }
  return out;
}

export type ParsedCron = { minutes: Set<number>; hours: Set<number>; dom: Set<number>; months: Set<number>; dow: Set<number>; domStar: boolean; dowStar: boolean };

export function parseCron(cron?: string | null): ParsedCron | null {
  if (!cron || typeof cron !== "string") return null;
  let f = cron.trim().split(/\s+/);
  if (f.length === 6) f = f.slice(1); // drop seconds
  if (f.length !== 5) return null;
  const minutes = parseField(f[0], 0, 59);
  const hours = parseField(f[1], 0, 23);
  const dom = parseField(f[2], 1, 31);
  const months = parseField(f[3], 1, 12);
  const dowRaw = parseField(f[4], 0, 7);
  if (!minutes || !hours || !dom || !months || !dowRaw) return null;
  const dow = new Set([...dowRaw].map((d) => (d === 7 ? 0 : d)));
  return { minutes, hours, dom, months, dow, domStar: f[2] === "*" || f[2] === "?", dowStar: f[4] === "*" || f[4] === "?" };
}

/** Times a day the cron fires on a day it runs (0 when it is not a valid cron). Issues go out at most once a day. */
export function runsPerDay(cron?: string | null): number {
  const p = parseCron(cron);
  return p ? p.minutes.size * p.hours.size : 0;
}

/** The viewer's IANA time zone, e.g. "America/Costa_Rica". */
export function browserTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export function isValidTimeZone(tz: string | null | undefined): tz is string {
  if (!tz) return false;
  try {
    new Intl.DateTimeFormat("en-US", { timeZone: tz });
    return true;
  } catch {
    return false;
  }
}

const partsFmt = new Map<string, Intl.DateTimeFormat>();
type Wall = { y: number; mo: number; d: number; h: number; mi: number; dow: number };
const DOW: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

/** Wall-clock fields of an instant in a time zone. */
export function wallClock(date: Date, tz: string): Wall {
  if (tz === "UTC") {
    return { y: date.getUTCFullYear(), mo: date.getUTCMonth() + 1, d: date.getUTCDate(), h: date.getUTCHours(), mi: date.getUTCMinutes(), dow: date.getUTCDay() };
  }
  let f = partsFmt.get(tz);
  if (!f) {
    f = new Intl.DateTimeFormat("en-US", { timeZone: tz, hourCycle: "h23", year: "numeric", month: "numeric", day: "numeric", hour: "numeric", minute: "numeric", weekday: "short" });
    partsFmt.set(tz, f);
  }
  const o: Record<string, string> = {};
  for (const p of f.formatToParts(date)) o[p.type] = p.value;
  return { y: +o.year, mo: +o.month, d: +o.day, h: +o.hour % 24, mi: +o.minute, dow: DOW[o.weekday] ?? 0 };
}

/**
 * Next run after `from`. The cron is read in `tz` (IANA). Missing or invalid
 * `tz` means UTC, which is how sources without `scheduleTimezone` run.
 * Day of month 29 to 31 is skipped in months that do not have it (standard cron).
 */
export function nextRun(cron?: string | null, from: Date = new Date(), tz?: string | null): Date | null {
  const p = parseCron(cron);
  if (!p) return null;
  const zone = isValidTimeZone(tz) ? tz : "UTC";
  let t = Math.floor(from.getTime() / 60000) * 60000 + 60000;
  const limit = from.getTime() + 400 * 24 * 3600 * 1000;
  for (let guard = 0; t < limit && guard < 200000; guard++) {
    const w = wallClock(new Date(t), zone);
    if (!p.months.has(w.mo)) {
      t += ((24 - w.h) * 60 - w.mi) * 60000; // next local day
      continue;
    }
    const domOk = p.dom.has(w.d);
    const dowOk = p.dow.has(w.dow);
    const dayOk = p.domStar && p.dowStar ? true : p.domStar ? dowOk : p.dowStar ? domOk : domOk || dowOk;
    if (!dayOk) {
      t += ((24 - w.h) * 60 - w.mi) * 60000;
      continue;
    }
    if (!p.hours.has(w.h)) {
      t += (60 - w.mi) * 60000;
      continue;
    }
    if (!p.minutes.has(w.mi)) {
      t += 60000;
      continue;
    }
    return new Date(t);
  }
  return null;
}

/** Earliest next run across several crons. */
export function earliestNextRun(crons: Array<string | undefined | null | { cron?: string | null; tz?: string | null }>, from = new Date()): Date | null {
  let best: Date | null = null;
  for (const c of crons) {
    const n = c && typeof c === "object" ? nextRun(c.cron, from, c.tz) : nextRun(c as string, from);
    if (n && (!best || n < best)) best = n;
  }
  return best;
}

export function formatDateTime(d: Date | string | null | undefined, opts: Intl.DateTimeFormatOptions = { weekday: "long", hour: "2-digit", minute: "2-digit" }): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  try {
    return new Intl.DateTimeFormat(undefined, opts).format(date);
  } catch {
    return date.toLocaleString();
  }
}

/** "in 3 hours", "2 days ago". */
export function relativeTime(d: Date | string | null | undefined, now = new Date()): string {
  if (!d) return "";
  const date = typeof d === "string" ? new Date(d) : d;
  if (isNaN(date.getTime())) return "";
  const diff = (date.getTime() - now.getTime()) / 1000;
  const abs = Math.abs(diff);
  const units: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31536000], ["month", 2592000], ["week", 604800], ["day", 86400], ["hour", 3600], ["minute", 60],
  ];
  try {
    const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
    for (const [u, s] of units) if (abs >= s) return rtf.format(Math.round(diff / s), u);
    return rtf.format(Math.round(diff / 60), "minute");
  } catch {
    return date.toLocaleString();
  }
}
