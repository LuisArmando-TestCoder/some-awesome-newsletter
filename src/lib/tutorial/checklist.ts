/**
 * Getting-started checklist (WS3). Each item is computed from real data in the app
 * store (config, news sources, subscribers, leads) first. Local evidence from the
 * onboarding flow fills gaps the backend does not record yet (first send, widget copied).
 * See docs/aiban/TUTORIAL_API.md.
 */
import { derived, writable, type Readable } from "svelte/store";
import store from "../../components/store";
import { onboarding } from "./onboardingState";

export type ChecklistItemId = "source" | "sender" | "subscriber" | "send" | "automation" | "widget";

export type ChecklistItem = {
  id: ChecklistItemId;
  done: boolean;
  /** Dashboard tab key in `stepsMapping` that fixes this item. */
  target: "News Sources" | "Profile" | "Users" | "Secrets/Developer";
};

export type ChecklistState = {
  items: ChecklistItem[];
  done: number;
  total: number;
  complete: boolean;
};

type AnyRecord = Record<string, any>;

function countSubscribersOtherThan(subscribers: AnyRecord | undefined, owner: string): number {
  const seen = new Set<string>();
  for (const list of Object.values(subscribers ?? {})) {
    if (!Array.isArray(list)) continue;
    for (const u of list) {
      const e = String(u?.email ?? "").toLowerCase();
      if (e && e !== owner) seen.add(e);
    }
  }
  return seen.size;
}

function countLeads(leads: unknown): number {
  if (!leads) return 0;
  if (typeof leads === "number") return leads;
  if (Array.isArray(leads)) return leads.length;
  if (typeof leads === "object") {
    return Object.values(leads as AnyRecord).reduce((n: number, v) => n + countLeads(v), 0);
  }
  return 0;
}

/** Pure computation, exported for tests and for WS4 if it wants its own store. */
export function computeChecklist(s: AnyRecord, o: AnyRecord): ChecklistState {
  const config = s?.config ?? {};
  const sources: AnyRecord[] = config.newsSources ?? [];
  const owner = String(s?.configuratorEmail ?? "").toLowerCase();
  const anySent = sources.some((ns) => ns?.lastSentAt || ns?.lastRunAt || ns?.firstSentAt || (ns?.stats?.sent ?? 0) > 0);
  const items: ChecklistItem[] = [
    { id: "source", done: sources.length > 0, target: "News Sources" },
    // Sender name only. Onboarding no longer collects email credentials.
    { id: "sender", done: !!String(config.senderName ?? "").trim(), target: "Profile" },
    { id: "subscriber", done: countSubscribersOtherThan(s?.subscribers, owner) > 0, target: "Users" },
    { id: "send", done: anySent || !!o?.firstSendAt, target: "News Sources" },
    { id: "automation", done: sources.some((ns) => ns?.active !== false) && sources.length > 0, target: "News Sources" },
    { id: "widget", done: countLeads(s?.leads) > 0 || !!o?.shareCopied, target: "Secrets/Developer" },
  ];
  const done = items.filter((i) => i.done).length;
  return { items, done, total: items.length, complete: done === items.length };
}

export const checklist: Readable<ChecklistState> = derived([store, onboarding], ([$s, $o]) => computeChecklist($s as AnyRecord, $o as AnyRecord));

const DISMISS_KEY = "aiban.checklist.hidden.v1";
function readHidden(): boolean {
  try {
    return typeof localStorage !== "undefined" && localStorage.getItem(DISMISS_KEY) === "1";
  } catch {
    return false;
  }
}
/** Whether the owner hid the checklist. They can show it again from help. */
export const checklistHidden = writable<boolean>(readHidden());
export function setChecklistHidden(hidden: boolean) {
  checklistHidden.set(hidden);
  try {
    if (hidden) localStorage.setItem(DISMISS_KEY, "1");
    else localStorage.removeItem(DISMISS_KEY);
  } catch {
    /* storage blocked */
  }
}
