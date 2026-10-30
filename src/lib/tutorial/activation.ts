/**
 * Activation (decision by Luis, 2026-10-30):
 * an owner is activated when their first issue reaches at least one CONFIRMED subscriber
 * who is not the owner, within 7 days of signing up.
 *
 * Exact measurement needs backend data (requested from WS7/WS8): a per-send delivery log and
 * `confirmedAt` on subscribers (set when someone signs up through the form or accepts an
 * invitation). Until the send log exists, the interim rule below is used:
 *   first send happened (onboarding or a source with send timestamps)
 *   AND a subscriber other than the owner has `confirmedAt` (or `accepted === true`)
 *   AND both happened within 7 days of `startedAt`.
 * Early indicators tracked next to it: time to first preview, first test received.
 */
import { derived, type Readable } from "svelte/store";
import store from "../../components/store";
import { onboarding } from "./onboardingState";

export const ACTIVATION_WINDOW_DAYS = 7;

export type ActivationState = {
  activated: boolean;
  /** True while the 7-day window is still open and the owner is not activated yet. */
  inWindow: boolean;
  /** ISO time the window closes, or "" if unknown. */
  windowEndsAt: string;
  /** Whether the result comes from the interim rule (no backend send log yet). */
  interim: boolean;
  hasFirstSend: boolean;
  hasConfirmedReader: boolean;
};

type AnyRecord = Record<string, any>;

function confirmedAt(u: AnyRecord): string {
  if (u?.confirmedAt) return String(u.confirmedAt);
  const subs = u?.subscriptions;
  if (subs && typeof subs === "object") {
    for (const byConfig of Object.values(subs as AnyRecord)) {
      for (const s of Object.values((byConfig ?? {}) as AnyRecord)) {
        if (s?.confirmedAt) return String(s.confirmedAt);
        if (s?.accepted === true) return "unknown";
      }
    }
  }
  return "";
}

export function computeActivation(s: AnyRecord, o: AnyRecord, now: Date = new Date()): ActivationState {
  const owner = String(s?.configuratorEmail ?? "").toLowerCase();
  const started = o?.startedAt ? new Date(o.startedAt) : null;
  const end = started ? new Date(started.getTime() + ACTIVATION_WINDOW_DAYS * 86_400_000) : null;
  const within = (iso: string) => {
    if (!end || !iso || iso === "unknown") return true;
    const t = new Date(iso).getTime();
    return Number.isNaN(t) || t <= end.getTime();
  };

  const sources: AnyRecord[] = s?.config?.newsSources ?? [];
  const sendTimes = [o?.firstSendAt, ...sources.map((ns) => ns?.firstSentAt || ns?.lastSentAt)].filter(Boolean) as string[];
  const hasFirstSend = sendTimes.some(within);

  let hasConfirmedReader = false;
  for (const list of Object.values((s?.subscribers ?? {}) as AnyRecord)) {
    if (!Array.isArray(list)) continue;
    for (const u of list) {
      const email = String(u?.email ?? "").toLowerCase();
      if (!email || email === owner) continue;
      const at = confirmedAt(u);
      if (at && within(at)) hasConfirmedReader = true;
    }
  }

  const activated = hasFirstSend && hasConfirmedReader;
  return {
    activated,
    inWindow: !activated && !!end && now.getTime() <= end.getTime(),
    windowEndsAt: end ? end.toISOString() : "",
    interim: true,
    hasFirstSend,
    hasConfirmedReader,
  };
}

export const activation: Readable<ActivationState> = derived([store, onboarding], ([$s, $o]) => computeActivation($s as AnyRecord, $o as AnyRecord));
