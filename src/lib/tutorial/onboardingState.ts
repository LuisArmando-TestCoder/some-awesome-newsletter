/**
 * Persisted onboarding progress (WS3).
 * Stored per owner email in localStorage. Every access is wrapped in try/catch
 * because storage can be blocked (private mode, previews). The flow still works
 * without it; the owner only loses resume-after-reload.
 */
import { get, writable } from "svelte/store";

export const ONBOARDING_STEP_COUNT = 9;

export type OnboardingState = {
  version: 1;
  stepIndex: number;
  completed: boolean;
  startedAt: string;
  completedAt?: string;
  url: string;
  noWebsite: boolean;
  topic: string;
  language: string;
  reader: string;
  linkSelector: string;
  previewHtml: string;
  previewSubject: string;
  testSentTo: string;
  senderVerified: boolean;
  senderSkipped: boolean;
  signatureSaved: boolean;
  scheduleTime: string;
  automationOn: boolean;
  newsSourceId: string;
  firstSendAt: string;
  addedSubscribers: string[];
  shareCopied: boolean;
  /** Activation events with ISO timestamps (STRATEGY.md: onboarding_started, preview_shown, test_sent, first_issue_delivered). */
  events: Record<string, string>;
};

const KEY_PREFIX = "aiban.onboarding.v1:";
/** Website URL handed over by the landing page through /start?url=... */
export const PREFILL_KEY = "aiban.onboarding.prefillUrl";

export function takePrefillUrl(): string {
  try {
    const v = localStorage.getItem(PREFILL_KEY) || "";
    if (v) {
      localStorage.removeItem(PREFILL_KEY);
      return v;
    }
    // Fallback written by the landing page (WS2, PENDING_SITE_KEY in landingSample.ts).
    return localStorage.getItem("aiban.pendingWebsite") || "";
  } catch {
    return "";
  }
}

export function freshOnboardingState(): OnboardingState {
  return {
    version: 1,
    stepIndex: 0,
    completed: false,
    startedAt: new Date().toISOString(),
    url: "",
    noWebsite: false,
    topic: "",
    language: "",
    reader: "",
    linkSelector: "",
    previewHtml: "",
    previewSubject: "",
    testSentTo: "",
    senderVerified: false,
    senderSkipped: false,
    signatureSaved: false,
    scheduleTime: "0 9 * * 1",
    automationOn: true,
    newsSourceId: "",
    firstSendAt: "",
    addedSubscribers: [],
    shareCopied: false,
    events: {},
  };
}

export const onboarding = writable<OnboardingState>(freshOnboardingState());

let ownerKey = "";

function storageKey(email: string) {
  return KEY_PREFIX + (email || "anonymous").toLowerCase();
}

/** Read the saved state for an owner without changing the store. */
export function readSavedOnboarding(email: string): OnboardingState | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const raw = localStorage.getItem(storageKey(email));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return null;
    return { ...freshOnboardingState(), ...parsed };
  } catch {
    return null;
  }
}

/** Load (or start) the onboarding state for this owner and keep it saved. */
export function initOnboarding(email: string): OnboardingState {
  ownerKey = storageKey(email);
  const saved = readSavedOnboarding(email);
  const state = saved ?? freshOnboardingState();
  onboarding.set(state);
  return state;
}

function persist(state: OnboardingState) {
  try {
    if (typeof localStorage === "undefined" || !ownerKey) return;
    // The preview HTML can be large; cap it so storage never fills up.
    const toSave = state.previewHtml.length > 200_000 ? { ...state, previewHtml: "" } : state;
    localStorage.setItem(ownerKey, JSON.stringify(toSave));
  } catch {
    /* storage blocked or full: keep working in memory */
  }
}

export function updateOnboarding(patch: Partial<OnboardingState>) {
  onboarding.update((s) => {
    const next = { ...s, ...patch };
    persist(next);
    return next;
  });
}

export type OnboardingEvent = "onboarding_started" | "preview_shown" | "test_sent" | "first_issue_sent" | "first_issue_delivered" | "onboarding_completed" | "sender_named";

/**
 * Record an activation event once (first occurrence wins). Stored with the onboarding
 * state and logged; WS7 is asked for an endpoint to persist these server side.
 */
export function trackOnboardingEvent(name: OnboardingEvent) {
  const s = get(onboarding);
  if (s.events?.[name]) return;
  const at = new Date().toISOString();
  updateOnboarding({ events: { ...(s.events ?? {}), [name]: at } });
  try {
    console.info("[onboarding:event]", name, at);
    if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("aiban:onboarding", { detail: { name, at } }));
  } catch {
    /* ignore */
  }
}

export function markOnboardingComplete() {
  updateOnboarding({ completed: true, completedAt: new Date().toISOString(), stepIndex: ONBOARDING_STEP_COUNT - 1 });
  trackOnboardingEvent("onboarding_completed");
}

export function isOnboardingComplete(email?: string): boolean {
  if (email) return !!readSavedOnboarding(email)?.completed;
  return get(onboarding).completed;
}

/**
 * Where an owner should land when they open /dashboard.
 * Returns an onboarding slot (0 to 8) when they left setup unfinished, otherwise null.
 */
export function getResumeIndex(email: string): number | null {
  const saved = readSavedOnboarding(email);
  if (!saved || saved.completed) return null;
  const i = Math.max(0, Math.min(ONBOARDING_STEP_COUNT - 1, saved.stepIndex | 0));
  return i;
}
