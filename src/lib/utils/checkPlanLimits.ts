
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
  newsletter: { newsSources: 10, users: 10000 },
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
    // Calculate total subscribers from the subscribers object in store
    const subscribersObj = state.subscribers || {};
    const uniqueEmails = new Set();
    Object.values(subscribersObj).forEach((list: any) => {
      if (Array.isArray(list)) {
        list.forEach(u => {
          if (u && u.email) uniqueEmails.add(u.email);
        });
      }
    });
    
    current = uniqueEmails.size;
    limit = limits.users;
  }

  // -1 means unlimited
  const allowed = limit === -1 || current < limit;

  return { allowed, limit, current, plan };
}
