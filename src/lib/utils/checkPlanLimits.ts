import store from "../../components/store";
import { get } from "svelte/store";
import { computeUsage } from "$lib/api/usage";

/**
 * Can the owner add another news source or subscriber on their plan?
 * Limits live in $lib/api/usage.ts (one table for the whole frontend).
 */
export function checkPlanLimit(feature: "newsSources" | "users"): { allowed: boolean; limit: number; current: number; plan: string } {
  const state = get(store);
  const usage = computeUsage(state.config, state.subscribers);
  const m = feature === "newsSources" ? usage.newsSources : usage.subscribers;
  return { allowed: !m.atLimit, limit: m.limit, current: m.used, plan: usage.plan };
}
