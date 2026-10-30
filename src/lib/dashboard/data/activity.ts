// WS4. Activity feed. Uses GET /activity when WS7 ships it; until then it is
// built from data that exists today: link clicks (leads) and manual sends.
import { get } from "svelte/store";
import { getActivity, type ActivityItem as ApiActivityItem } from "$lib/api/activity";
import store from "../../../components/store";
import type { NewsSource } from "../../../components/types";
import { dt } from "../i18n";

export type ActivityItem = {
  id: string;
  at: string;
  kind: "click" | "send" | "subscribe" | "run" | "source" | "other";
  /** dash.activity.<kind> template key, filled with vars */
  textKey: string;
  vars: Record<string, string | number>;
  /** Ready-made text from the backend; wins over textKey. */
  text?: string;
  /** Something went wrong (failed send or run): shown with the alert icon. */
  alert?: boolean;
};

/** Icon name for each kind (names from ui/Icon.svelte). */
export function activityIcon(item: Pick<ActivityItem, "kind" | "alert">): string {
  if (item.alert) return "alert";
  return { click: "arrow", send: "send", subscribe: "people", run: "bolt", source: "source", other: "info" }[item.kind] ?? "info";
}

/** Kind (icon group) for each /v1 activity type (API_CONTRACT.md, activity). */
const KIND_BY_TYPE: Record<string, ActivityItem["kind"]> = {
  "issue.sent": "send",
  "issue.failed": "send",
  "automation.run_finished": "run",
  "automation.run_requested": "run",
  "automation.created": "run",
  "automation.updated": "run",
  "automation.deleted": "run",
  "automation.toggled": "run",
  run: "run",
  "subscriber.added": "subscribe",
  "subscriber.confirmed": "subscribe",
  "subscriber.unsubscribed": "subscribe",
  "subscriber.deleted": "subscribe",
  "subscribers.imported": "subscribe",
  "news_source.added": "source",
  "news_source.updated": "source",
  "news_source.deleted": "source",
  // Older names, kept so items written before /v1 still get an icon.
  send: "send",
  subscriber: "subscribe",
};

export function activityKind(type: string): ActivityItem["kind"] {
  return KIND_BY_TYPE[type] ?? "other";
}

const str = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : "");
const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);

/**
 * Text key and values for one /v1 activity item (keys dash.activity.*, English in
 * locales-dashboard/en.ts). Types without a key keep the backend title.
 */
export function describeForDashboard(r: ApiActivityItem): ActivityItem {
  const d = (r.data ?? {}) as Record<string, unknown>;
  const title = str(d.title) || str(d.name);
  const email = str(d.email);
  const base = { id: r.id, at: r.createdAt, kind: activityKind(String(r.type)), vars: {} as Record<string, string | number> };
  const withTitle = (key: string, noTitleKey: string, extra: Record<string, string | number> = {}): ActivityItem =>
    title ? { ...base, textKey: key, vars: { title, ...extra } } : { ...base, textKey: noTitleKey, vars: extra };
  const tr = get(dt);
  const name = title || tr("dash.activity.anAutomation");
  switch (r.type) {
    case "issue.sent": {
      const count = num(d.sent) ?? num(d.recipients);
      if (count !== undefined) return withTitle(`dash.activity.issue.sentTo.${count === 1 ? "one" : "other"}`, `dash.activity.issue.sentToNoTitle.${count === 1 ? "one" : "other"}`, { count });
      return withTitle("dash.activity.issue.sent", "dash.activity.issue.sentNoTitle");
    }
    case "issue.failed":
      return { ...withTitle("dash.activity.issue.failed", "dash.activity.issue.failedNoTitle"), alert: true };
    case "automation.run_finished": {
      const st = str(d.status);
      const status = ["ok", "partial", "failed", "skipped"].includes(st) ? st : "ok";
      return { ...base, textKey: `dash.activity.run.${status}`, vars: { name }, alert: status === "failed" };
    }
    case "automation.run_requested":
      return { ...base, textKey: d.dryRun ? "dash.activity.run.testRequested" : "dash.activity.run.requested", vars: { name } };
    case "automation.created":
      return { ...base, textKey: "dash.activity.automation.created", vars: { name } };
    case "automation.updated":
      return { ...base, textKey: "dash.activity.automation.updated", vars: { name } };
    case "automation.deleted":
      return { ...base, textKey: "dash.activity.automation.deleted", vars: { name } };
    case "automation.toggled":
      return { ...base, textKey: d.enabled ? "dash.activity.automation.on" : "dash.activity.automation.off", vars: { name } };
    case "subscriber.added":
      return email ? { ...base, textKey: "dash.activity.subscriber.added", vars: { email } } : { ...base, textKey: "dash.activity.subscriber.addedNoEmail" };
    case "subscriber.confirmed":
      return email ? { ...base, textKey: "dash.activity.subscriber.confirmed", vars: { email } } : { ...base, textKey: "dash.activity.subscriber.confirmedNoEmail" };
    case "subscribers.imported": {
      const count = num(d.count) ?? num(d.added);
      return count !== undefined
        ? { ...base, textKey: `dash.activity.subscribers.imported.${count === 1 ? "one" : "other"}`, vars: { count } }
        : { ...base, textKey: "dash.activity.subscribers.importedNoCount" };
    }
    case "news_source.added":
      return withTitle("dash.activity.source.added", "dash.activity.source.addedNoTitle");
    default:
      // Other types (and runs from the fallback) keep the plain-language title from $lib/api/activity.
      return { ...base, textKey: "", text: r.detail ? `${r.title}. ${r.detail}` : r.title, alert: r.status === "error" };
  }
}

function hostOf(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function activityFromStore(limit = 12): ActivityItem[] {
  const s = get(store);
  const items: ActivityItem[] = [];
  const sources: NewsSource[] = s.config?.newsSources ?? [];
  const nameOf = (id: string) => hostOf(sources.find((n) => n.id === id)?.url ?? id);
  const leads = (s.leads ?? {}) as Record<string, Record<string, Record<string, string>>>;
  for (const [nsId, byEmail] of Object.entries(leads)) {
    if (!byEmail || typeof byEmail !== "object") continue;
    for (const [email, byTs] of Object.entries(byEmail)) {
      if (!byTs || typeof byTs !== "object") continue;
      for (const [ts, url] of Object.entries(byTs)) {
        if (isNaN(Date.parse(ts))) continue;
        items.push({ id: `c-${nsId}-${email}-${ts}`, at: ts, kind: "click", textKey: "dash.activity.click", vars: { email, link: hostOf(String(url)), source: nameOf(nsId) } });
      }
    }
  }
  for (const ns of sources) {
    if (ns.lastManualSendTimestamp) {
      const at = new Date(ns.lastManualSendTimestamp);
      if (!isNaN(at.getTime())) items.push({ id: `s-${ns.id}`, at: at.toISOString(), kind: "send", textKey: "dash.activity.manualSend", vars: { source: hostOf(ns.url) } });
    }
  }
  return items.sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
}

export async function loadActivity(limit = 12): Promise<{ live: boolean; items: ActivityItem[] }> {
  let remote: ActivityItem[] = [];
  try {
    const res = await getActivity({ limit });
    remote = (Array.isArray(res) ? res : []).map(describeForDashboard);
  } catch {
    remote = [];
  }
  // Clicks and manual sends from data we already have fill the feed until the backend records more.
  const local = activityFromStore(limit);
  const items = [...remote, ...local].sort((a, b) => b.at.localeCompare(a.at)).slice(0, limit);
  return { live: remote.length > 0, items };
}
