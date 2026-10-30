/** Plain schedule choices for onboarding, mapped to the cron strings the backend stores.
 * The cron is in the owner's local time; send it with `scheduleTimezone: localTimeZone()`
 * so the backend runs it in that zone (sources without a zone run in UTC). */

/** The owner's IANA time zone, e.g. "America/Costa_Rica". */
export function localTimeZone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}

export type Frequency = "daily" | "weekly" | "monthly";

export function buildCron(frequency: Frequency, day: number, hour: number): string {
  const h = Math.max(0, Math.min(23, Math.round(hour)));
  if (frequency === "daily") return `0 ${h} * * *`;
  if (frequency === "monthly") return `0 ${h} 1 * *`;
  const d = Math.max(0, Math.min(6, Math.round(day)));
  return `0 ${h} * * ${d}`;
}

/** Best effort reverse mapping; anything unusual falls back to weekly on Monday at 9. */
export function parseCron(cron: string): { frequency: Frequency; day: number; hour: number } {
  const parts = (cron || "").trim().split(/\s+/);
  if (parts.length !== 5) return { frequency: "weekly", day: 1, hour: 9 };
  const [, hourField, dom, , dow] = parts;
  const hour = /^\d+$/.test(hourField) ? Math.min(23, Number(hourField)) : 9;
  if (dom === "1" && dow === "*") return { frequency: "monthly", day: 1, hour };
  if (dom === "*" && dow === "*") return { frequency: "daily", day: 1, hour };
  if (/^\d$/.test(dow)) return { frequency: "weekly", day: Number(dow) % 7, hour };
  return { frequency: "weekly", day: 1, hour };
}
