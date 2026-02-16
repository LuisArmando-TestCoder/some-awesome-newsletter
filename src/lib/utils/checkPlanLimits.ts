
import store from "../../components/store";
import { get } from "svelte/store";

// Use PLAN_CONFIG mirrored from backend if possible, or define here.
// Since we can't easily import from 'ai-newsletter-translated' in frontend build,
// we define the structure again or pass it via API.
// For now, hardcoding based on the provided JSON structure to match backend.

const PLAN_LIMITS: Record<string, { newsSources: number; users: number }> = {
  free: { newsSources: 1, users: 100 },
  starter: { newsSources: 5, users: 100000 },
  growth: { newsSources: 17, users: 250000 },
  pro: { newsSources: 25, users: 500000 },
  master: { newsSources: 50, users: -1 },
  vipfree: { newsSources: -1, users: -1 },
};

export function checkPlanLimit(feature: "newsSources" | "users"): { allowed: boolean; limit: number; current: number; plan: string } {
  const state = get(store);
  const plan = state.config?.pricingPlan || "free";
  const limits = PLAN_LIMITS[plan] || PLAN_LIMITS["free"];
  
  let current = 0;
  let limit = 0;

  if (feature === "newsSources") {
    current = state.config?.newsSources?.length || 0;
    limit = limits.newsSources;
  } else if (feature === "users") {
    // Total subscribers across all lists? Or per list?
    // Backend checks per list usually, but let's check total for Dashboard context 
    // or use the store's stats if available.
    // store.ts has 'subscribers' object.
    // If we want total unique emails:
    // const uniqueEmails = new Set();
    // Object.values(state.subscribers || {}).forEach(list => list.forEach(u => uniqueEmails.add(u.email)));
    // current = uniqueEmails.size;
    
    // Simplification: Check store.stats if present (populated by backend), otherwise fallback.
    // Assuming store doesn't track all subscribers locally in 'config', but in 'subscribers' dict.
    // Let's use a safe fallback.
    current = state.stats?.totalSubscribers || 0; 
    limit = limits.users;
  }

  // -1 means unlimited
  const allowed = limit === -1 || current < limit;

  return { allowed, limit, current, plan };
}
