// WS4. Numbers, checklist and nudges computed from data the dashboard already has.
// Everything here is derived from the store (config, subscribers, leads), so it
// costs no extra requests and works before the new endpoints ship.
import { derived } from "svelte/store";
import store from "../../../components/store";
import type { NewsSource } from "../../../components/types";
import { earliestNextRun } from "./schedule";

export type Subscriber = { email: string; name?: string; language?: string; countryOfResidence?: string; createdAt?: string; subscribedAt?: string };

export type Metrics = {
  ready: boolean;
  sources: NewsSource[];
  activeSources: number;
  subscribers: number;
  /** subscribers excluding the owner's own address */
  realSubscribers: number;
  languages: Array<{ code: string; count: number }>;
  clicks7d: number;
  clicks30d: number;
  clicksTotal: number;
  nextSend: Date | null;
  nextSendSource: NewsSource | null;
  lastManualSend: Date | null;
  plan: string;
};

const DAY = 86400000;

export const metrics = derived(store, ($s): Metrics => {
  const sources: NewsSource[] = $s.config?.newsSources ?? [];
  const owner = String($s.configuratorEmail ?? "").toLowerCase();
  const subsBySource = ($s.subscribers ?? {}) as Record<string, Subscriber[]>;
  const unique = new Map<string, Subscriber>();
  for (const list of Object.values(subsBySource)) {
    if (!Array.isArray(list)) continue;
    for (const u of list) if (u?.email) unique.set(u.email.toLowerCase(), u);
  }
  const langCount = new Map<string, number>();
  for (const u of unique.values()) {
    const code = (u.language || "?").toLowerCase();
    langCount.set(code, (langCount.get(code) ?? 0) + 1);
  }
  const languages = [...langCount.entries()].map(([code, count]) => ({ code, count })).sort((a, b) => b.count - a.count);

  // leads: { [nsId]: { [email]: { [isoTimestamp]: url } } }
  let clicks7d = 0, clicks30d = 0, clicksTotal = 0;
  const now = Date.now();
  const leads = ($s.leads ?? {}) as Record<string, Record<string, Record<string, string>>>;
  for (const byEmail of Object.values(leads)) {
    if (!byEmail || typeof byEmail !== "object") continue;
    for (const byTs of Object.values(byEmail)) {
      if (!byTs || typeof byTs !== "object") continue;
      for (const ts of Object.keys(byTs)) {
        clicksTotal++;
        const t = Date.parse(ts);
        if (!isNaN(t)) {
          if (now - t <= 7 * DAY) clicks7d++;
          if (now - t <= 30 * DAY) clicks30d++;
        }
      }
    }
  }

  const active = sources.filter((ns) => ns.active !== false);
  const nextSend = earliestNextRun(active.map((ns) => ({ cron: ns.scheduleTime, tz: ns.scheduleTimezone })));
  let nextSendSource: NewsSource | null = null;
  if (nextSend) nextSendSource = active.find((ns) => earliestNextRun([{ cron: ns.scheduleTime, tz: ns.scheduleTimezone }])?.getTime() === nextSend.getTime()) ?? null;
  const manual = sources
    .map((ns) => ns.lastManualSendTimestamp)
    .filter((v): v is string | number => !!v)
    .map((v) => new Date(v))
    .filter((d) => !isNaN(d.getTime()));
  const lastManualSend = manual.length ? new Date(Math.max(...manual.map((d) => d.getTime()))) : null;

  return {
    ready: !!$s.config,
    sources,
    activeSources: active.length,
    subscribers: unique.size,
    realSubscribers: [...unique.keys()].filter((e) => e !== owner).length,
    languages,
    clicks7d,
    clicks30d,
    clicksTotal,
    nextSend,
    nextSendSource,
    lastManualSend,
    plan: $s.config?.pricingPlan || "free",
  };
});

export type ChecklistItem = { id: string; done: boolean; titleKey: string; bodyKey: string; action: { section: string; tab?: string } };

export const checklist = derived([store, metrics], ([$s, $m]): ChecklistItem[] => {
  const cfg = $s.config ?? {};
  const hasSender = !!(cfg.senderName || cfg.email?.senderName || cfg.email?.auth?.user);
  const hasVoice = $m.sources.some((ns) => !!ns.personality?.trim());
  return [
    { id: "source", done: $m.sources.length > 0, titleKey: "dash.check.source.title", bodyKey: "dash.check.source.body", action: { section: "sources" } },
    { id: "voice", done: hasVoice, titleKey: "dash.check.voice.title", bodyKey: "dash.check.voice.body", action: { section: "sources" } },
    { id: "sender", done: hasSender, titleKey: "dash.check.sender.title", bodyKey: "dash.check.sender.body", action: { section: "settings", tab: "sending" } },
    { id: "subscriber", done: $m.realSubscribers > 0, titleKey: "dash.check.subscriber.title", bodyKey: "dash.check.subscriber.body", action: { section: "subscribers", tab: "add" } },
    { id: "automation", done: $m.activeSources > 0 && !!$m.nextSend, titleKey: "dash.check.automation.title", bodyKey: "dash.check.automation.body", action: { section: "automations" } },
  ];
});

export type Nudge = { id: string; tone: "info" | "warning" | "danger"; titleKey: string; bodyKey: string; actionKey: string; action: { section: string; tab?: string }; vars?: Record<string, string | number> };

const USER_LIMITS: Record<string, number> = { free: 100, starter: 100000, growth: 250000, pro: 500000, master: -1, vipfree: -1, newsletter: 10000 };

export const nudges = derived([store, metrics], ([$s, $m]): Nudge[] => {
  const out: Nudge[] = [];
  if (!$m.ready) return out;
  const cfg = $s.config ?? {};
  const limit = USER_LIMITS[$m.plan] ?? 100;
  if (limit > 0 && $m.subscribers >= limit) {
    out.push({ id: "limit-hit", tone: "danger", titleKey: "dash.nudge.limitHit.title", bodyKey: "dash.nudge.limitHit.body", actionKey: "dash.nudge.limitHit.action", action: { section: "settings", tab: "billing" }, vars: { limit } });
  } else if (limit > 0 && $m.subscribers >= limit * 0.8) {
    out.push({ id: "limit-near", tone: "warning", titleKey: "dash.nudge.limitNear.title", bodyKey: "dash.nudge.limitNear.body", actionKey: "dash.nudge.limitNear.action", action: { section: "settings", tab: "billing" }, vars: { count: $m.subscribers, limit } });
  }
  if ($m.sources.length > 0 && $m.activeSources === 0) {
    out.push({ id: "paused", tone: "warning", titleKey: "dash.nudge.paused.title", bodyKey: "dash.nudge.paused.body", actionKey: "dash.nudge.paused.action", action: { section: "automations" } });
  }
  if ($m.realSubscribers === 0) {
    out.push({ id: "no-subs", tone: "info", titleKey: "dash.nudge.noSubs.title", bodyKey: "dash.nudge.noSubs.body", actionKey: "dash.nudge.noSubs.action", action: { section: "subscribers", tab: "add" } });
  }
  if (!cfg.logo) {
    out.push({ id: "no-logo", tone: "info", titleKey: "dash.nudge.noLogo.title", bodyKey: "dash.nudge.noLogo.body", actionKey: "dash.nudge.noLogo.action", action: { section: "settings", tab: "brand" } });
  }
  if ($m.languages.length <= 1 && $m.realSubscribers >= 10) {
    out.push({ id: "one-lang", tone: "info", titleKey: "dash.nudge.oneLang.title", bodyKey: "dash.nudge.oneLang.body", actionKey: "dash.nudge.oneLang.action", action: { section: "subscribers", tab: "form" } });
  }
  if ($m.sources.length === 1 && $m.realSubscribers > 0) {
    out.push({ id: "second-source", tone: "info", titleKey: "dash.nudge.secondSource.title", bodyKey: "dash.nudge.secondSource.body", actionKey: "dash.nudge.secondSource.action", action: { section: "sources" } });
  }
  return out;
});

/** Language code to a readable name in the viewer's locale. */
export function languageName(code: string): string {
  if (!code || code === "?") return "Unknown";
  try {
    const dn = new Intl.DisplayNames(undefined, { type: "language" });
    return dn.of(code) ?? code;
  } catch {
    return code;
  }
}
