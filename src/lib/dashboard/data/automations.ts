// WS4. Automations data for the dashboard.
// Contract: docs/aiban/AUTOMATIONS.md section 7 (WS8) and API_CONTRACT.md (WS7).
// Until those endpoints are live, every call falls back to what exists today:
// one "daily issue" automation per news source, driven by the source's
// `scheduleTime` cron and `active` flag, with "Run now" = trigger send.
// Calls go through WS6's helpers in $lib/api/automations (they fall back on 404).
import { writable, get } from "svelte/store";
import { toUserMessage } from "$lib/api/errors";
import { listAutomations, toggleAutomation, runNow as apiRunNow, runAutomation, listRuns } from "$lib/api/automations";
import { dt } from "../i18n";
import store, { saveToConfig } from "../../../components/store";
import type { NewsSource } from "../../../components/types";

export type RecipeId =
  | "daily_issue"
  | "weekly_digest"
  | "new_post_alert"
  | "welcome_new_subscriber"
  | "import_contacts"
  | "write_about_this"
  | "owner_nudges"
  | "owner_weekly_report";

export type TriggerType = "schedule" | "new_article" | "new_subscriber" | "list_imported" | "manual" | "milestone";
export type RunStatus = "queued" | "running" | "ok" | "partial" | "failed" | "skipped";

export type Automation = {
  id: string;
  configuratorId?: string;
  name: string;
  enabled: boolean;
  recipeId?: RecipeId;
  trigger: { type: TriggerType; params?: Record<string, unknown> & { cron?: string; tz?: string } };
  steps: Array<{ type: string; params?: Record<string, unknown> }>;
  newsSourceIds?: string[];
  createdAt?: string;
  updatedAt?: string;
  lastRunAt?: string;
  lastRunStatus?: "ok" | "partial" | "failed" | "skipped";
  nextRunAt?: string;
  stats?: { runs: number; sent: number; failed: number; opens?: number; clicks?: number; costUsd?: number };
  source: "user" | "recipe" | "legacy";
};

export type RunRecord = {
  id: string;
  automationId: string;
  status: RunStatus;
  startedAt: string;
  finishedAt?: string;
  counts?: { recipients: number; sent: number; failed: number; skippedDuplicate?: number; languages?: string[] };
  items?: Array<{ url: string; title?: string }>;
  skipReason?: string;
  error?: string;
};

/** Presets shown to the owner. Order = display order. Copy keys: dash.recipe.<id>.* */
export const RECIPES: Array<{ id: RecipeId; trigger: TriggerType; defaultOn: boolean; existsToday: boolean; icon: string }> = [
  { id: "daily_issue", trigger: "schedule", defaultOn: true, existsToday: true, icon: "clock" },
  { id: "welcome_new_subscriber", trigger: "new_subscriber", defaultOn: true, existsToday: false, icon: "mail" },
  { id: "new_post_alert", trigger: "new_article", defaultOn: false, existsToday: false, icon: "bolt" },
  { id: "weekly_digest", trigger: "schedule", defaultOn: false, existsToday: false, icon: "blog" },
  { id: "import_contacts", trigger: "list_imported", defaultOn: true, existsToday: false, icon: "upload" },
  { id: "owner_nudges", trigger: "milestone", defaultOn: true, existsToday: false, icon: "info" },
  { id: "owner_weekly_report", trigger: "schedule", defaultOn: true, existsToday: false, icon: "chart" },
];

/**
 * Run now makes sense only for automations that write and send an issue from a source:
 * a schedule, new-article or manual trigger, a source, and (when steps are known) a send step.
 * Built-in event automations (welcome, imports, alerts, weekly report) start on their own.
 */
export function canRunNow(a: Automation): boolean {
  if (!a.newsSourceIds?.[0]) return false;
  if (!["schedule", "new_article", "manual"].includes(String(a.trigger?.type))) return false;
  if (a.source === "legacy") return true;
  return Array.isArray(a.steps) && a.steps.some((s) => s?.type === "send_email");
}

/** Built-in automations (id "builtin_<recipeId>") are not stored until the owner first changes them. */
export const isBuiltin = (a: Pick<Automation, "id">) => a.id.startsWith("builtin_");

export type AutomationsState = {
  status: "idle" | "loading" | "ready" | "error";
  /** true when the backend automations endpoint answered. */
  live: boolean;
  items: Automation[];
  error: string | null;
};

export const automations = writable<AutomationsState>({ status: "idle", live: false, items: [], error: null });

function configuratorId(): string {
  const s = get(store);
  return s.config?.configuratorId || s.configuratorEmail || "";
}

/** One legacy automation per news source (what the backend runs today). */
export function legacyFromConfig(): Automation[] {
  const s = get(store);
  const sources: NewsSource[] = s.config?.newsSources ?? [];
  return sources.map((ns) => {
    // nextRunAt is left out on purpose: the card computes it live, so it never goes stale.
    return {
      id: `legacy_${ns.id}`,
      name: ns.url,
      enabled: ns.active !== false,
      recipeId: "daily_issue",
      trigger: { type: "schedule", params: { cron: ns.scheduleTime, tz: ns.scheduleTimezone || undefined } },
      steps: [],
      newsSourceIds: [ns.id],
      source: "legacy",
    } satisfies Automation;
  });
}

export async function loadAutomations(): Promise<void> {
  const id = configuratorId();
  automations.update((a) => ({ ...a, status: a.items.length ? a.status : "loading", error: null }));
  try {
    const remote = (await listAutomations(id)) as unknown as Automation[];
    const live = Array.isArray(remote) && remote.some((x) => x.source !== "legacy");
    // Legacy items always come from the store we already have, so they match what the owner just saved.
    const items = live ? [...remote.filter((x) => x.source !== "legacy"), ...legacyFromConfig().filter((l) => !remote.some((r) => r.source !== "legacy" && r.newsSourceIds?.some((n) => l.newsSourceIds?.includes(n))))] : legacyFromConfig();
    automations.set({ status: "ready", live, items, error: null });
  } catch (e) {
    // Any other failure: still show what we know from the config, with a warning.
    automations.set({ status: "ready", live: false, items: legacyFromConfig(), error: toUserMessage(e) });
  }
}

/** Turn an automation on or off. Legacy ones flip the news source `active` flag. */
export async function setAutomationEnabled(a: Automation, enabled: boolean): Promise<void> {
  const prev = get(automations);
  const prevSources = get(store).config?.newsSources;
  automations.update((s) => ({ ...s, items: s.items.map((x) => (x.id === a.id ? { ...x, enabled } : x)) }));
  try {
    if (a.source === "legacy" || !prev.live) {
      const nsId = a.newsSourceIds?.[0];
      const s = get(store);
      const newsSources = (s.config?.newsSources ?? []).map((ns: NewsSource) => (ns.id === nsId ? { ...ns, active: enabled } : ns));
      const saved = await saveToConfig({ newsSources });
      if (!saved) throw new Error("save failed");
      automations.update((st) => ({ ...st, items: st.live ? st.items : legacyFromConfig() }));
    } else {
      // A built-in comes back as a stored automation with a new id: replace the card's item.
      const saved = (await toggleAutomation(a.id, enabled)) as unknown as Automation | undefined;
      if (saved && typeof saved.id === "string") {
        automations.update((st) => ({ ...st, items: st.items.map((x) => (x.id === a.id ? { ...x, ...saved, enabled: saved.enabled ?? enabled } : x)) }));
      }
    }
  } catch (e) {
    automations.set(prev);
    // Put the source back the way it was locally, without sending another save.
    if (prevSources) await saveToConfig({ newsSources: prevSources }, false);
    throw e;
  }
}

/** Run once now (send the next issue). Returns a run id when the backend gives one. */
export async function runAutomationNow(a: Automation): Promise<string | null> {
  const nsId = a.newsSourceIds?.[0];
  if (!nsId || !canRunNow(a)) throw new Error(get(dt)("dash.automations.noSourceToRun"));
  // Stored automations run by id, so their own settings apply and the run shows in their history.
  const res = a.source === "legacy" || !get(automations).live ? await apiRunNow({ newsSourceId: nsId, mode: "send_now" }) : await runAutomation(a.id);
  return res?.runId ?? null;
}

export async function loadRuns(a: Automation, limit = 10): Promise<{ live: boolean; runs: RunRecord[] }> {
  // Legacy ids have run history on the server too (GET /v1/automations/legacy_<id>/runs).
  try {
    const runs = (await listRuns(a.id, { limit })) as unknown as RunRecord[];
    return { live: true, runs: Array.isArray(runs) ? runs : [] };
  } catch {
    return { live: false, runs: [] };
  }
}

/** Change the schedule of a legacy (news source) automation. */
export async function saveLegacySchedule(nsId: string, cron: string, timezone?: string): Promise<void> {
  const s = get(store);
  const newsSources = (s.config?.newsSources ?? []).map((ns: NewsSource) => (ns.id === nsId ? { ...ns, scheduleTime: cron, ...(timezone ? { scheduleTimezone: timezone } : {}) } : ns));
  const saved = await saveToConfig({ newsSources });
  if (!saved) throw new Error("save failed");
  automations.update((st) => ({ ...st, items: st.live ? st.items : legacyFromConfig() }));
}
