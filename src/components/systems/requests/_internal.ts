/**
 * Shared helpers for the request wrappers. Lazy imports break the old import
 * cycles (store <-> requests <-> UserDataService).
 */
import { get } from "svelte/store";
import type { NewsSource } from "../../types";

export async function refreshSubscribersSafely(): Promise<void> {
  try {
    const mod = await import("../steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService");
    await mod.refreshSubscribers();
  } catch (e) {
    console.error("[requests] Subscriber refresh failed", e);
  }
}

/**
 * The backend returns the full stored source, but the response schema only checks the
 * fields the UI cannot do without (id, url, ...). This is the one place that bridges
 * that loosely checked shape to the app's NewsSource type.
 */
export function asNewsSource(parsed: { id: string }): NewsSource {
  return parsed as unknown as NewsSource;
}

/** Replace one news source in config.newsSources (local store only, no PUT). */
export async function replaceNewsSourceInStore(updated: { id: string } | null | undefined) {
  if (!updated?.id) return;
  const { default: store, saveToStore } = await import("../../store");
  const config = get(store).config || {};
  const current: { id?: string }[] = config.newsSources || [];
  const exists = current.some((s) => s?.id === updated.id);
  const newsSources = exists ? current.map((s) => (s?.id === updated.id ? updated : s)) : [...current, updated];
  saveToStore({ config: { ...config, newsSources } });
}

export function configId(): string {
  // Lazy to keep this module free of the store import at load time.
  try {
    const raw = typeof localStorage !== "undefined" ? localStorage.getItem("configuratorEmail") : null;
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall through */
  }
  return "";
}
