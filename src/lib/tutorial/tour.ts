import { get, writable } from "svelte/store";

export type TourPlacement = "top" | "bottom" | "left" | "right" | "auto";

export type TourStep = {
  /** CSS selector of the element to point at, typically [data-tour="x"]. */
  target: string;
  title: string;
  body: string;
  placement?: TourPlacement;
};

export type TourDefinition = {
  id: string;
  steps: TourStep[];
};

export type ActiveTour = { def: TourDefinition; index: number };
export type TourEndReason = "finished" | "skipped";

const SEEN_KEY = "aiban.tour.seen.v1";

/** The tour on screen right now, or null. GuidedTour renders from this. */
export const activeTour = writable<ActiveTour | null>(null);

/** Last tour that ended and why. Useful for analytics or follow-up prompts. */
export const lastTourEnd = writable<{ id: string; reason: TourEndReason } | null>(null);

function readSeen(): string[] {
  try {
    if (typeof localStorage === "undefined") return [];
    const raw = localStorage.getItem(SEEN_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function writeSeen(ids: string[]): void {
  try {
    if (typeof localStorage === "undefined") return;
    localStorage.setItem(SEEN_KEY, JSON.stringify(Array.from(new Set(ids))));
  } catch {
    /* storage blocked: the tour may show again, which is acceptable */
  }
}

export function hasSeenTour(id: string): boolean {
  return readSeen().includes(id);
}

export function markTourSeen(id: string): void {
  const seen = readSeen();
  if (!seen.includes(id)) writeSeen([...seen, id]);
}

export function resetTour(id: string): void {
  writeSeen(readSeen().filter((x) => x !== id));
}

/** True when the step's target exists in the DOM (always false during SSR). */
export function stepTargetExists(step: TourStep | undefined): boolean {
  if (!step || typeof document === "undefined") return false;
  try {
    return document.querySelector(step.target) !== null;
  } catch {
    return false; // invalid selector
  }
}

/** First index from `from` moving by `dir` whose target is in the DOM, or -1. */
function findAvailable(def: TourDefinition, from: number, dir: 1 | -1): number {
  for (let i = from; i >= 0 && i < def.steps.length; i += dir) {
    if (stepTargetExists(def.steps[i])) return i;
  }
  return -1;
}

/** Steps of the active tour whose targets exist, for "2 of 4" counters. */
export function availableSteps(def: TourDefinition): number[] {
  const out: number[] = [];
  def.steps.forEach((s, i) => {
    if (stepTargetExists(s)) out.push(i);
  });
  return out;
}

/** Starts a tour at its first visible step. Returns false if no step can be shown. */
export function startTour(def: TourDefinition): boolean {
  if (typeof document === "undefined" || !def.steps.length) return false;
  const index = findAvailable(def, 0, 1);
  if (index < 0) return false;
  activeTour.set({ def, index });
  return true;
}

export function nextTourStep(): void {
  const cur = get(activeTour);
  if (!cur) return;
  const index = findAvailable(cur.def, cur.index + 1, 1);
  if (index < 0) endTour("finished");
  else activeTour.set({ def: cur.def, index });
}

export function prevTourStep(): void {
  const cur = get(activeTour);
  if (!cur) return;
  const index = findAvailable(cur.def, cur.index - 1, -1);
  if (index >= 0) activeTour.set({ def: cur.def, index });
}

/** Ends the active tour and marks it seen, whether finished or skipped. */
export function endTour(reason: TourEndReason): void {
  const cur = get(activeTour);
  if (!cur) return;
  markTourSeen(cur.def.id);
  activeTour.set(null);
  lastTourEnd.set({ id: cur.def.id, reason });
}

/** Starts the tour only the first time. Returns whether it started. */
export function offerTourOnce(def: TourDefinition): boolean {
  if (get(activeTour) || hasSeenTour(def.id)) return false;
  return startTour(def);
}
