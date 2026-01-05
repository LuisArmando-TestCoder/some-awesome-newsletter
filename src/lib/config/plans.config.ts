// src/lib/config/plans.config.ts
import { writable, type Writable, get } from 'svelte/store';
import { t } from '../i18n/translations';

export type Interval = 'monthly' | 'yearly';
/** * Refactored Plan IDs based on Luis Armando's review.
 * Tiers: Starter ($17), Growth ($35), Pro ($80), Master ($150)
 */
export type PlanId = 'free' | 'starter' | 'growth' | 'pro' | 'master' | 'vipfree';

export interface Plan {
  id: PlanId;
  name: string;
  monthly: number;
  yearly: number; // This will store the total annual cost (Monthly * 12 * 0.65)
  tagline: string;
  featuresBase: string[];
  featuresDelta: string[];
  limits: {
    sources: number;
    users: number; // -1 = unlimited
  };
  ctaLabel: string;
  internalOnly?: boolean;
  productId?: string; // Stripe Price ID
  tier: number;
}

export interface PlansContent {
  currency: string;
  billingIntervals?: Interval[];
  currentPlan: PlanId;
  plans: Plan[];
  contact: { text: string; cta: string; href: string; note?: string };
}

export interface PlansState {
  mockMode: boolean;
  interval: Interval;
  currentPlan: PlanId;
  content: PlansContent | null;
}

const ANNUAL_DISCOUNT = 0.35;

/** * Helper to calculate the 35% discount for annual plans.
 * result = (Monthly * 12) * 0.65
 */
const calcAnnual = (monthly: number) => Math.floor((monthly * 12) * (1 - ANNUAL_DISCOUNT));

/** * Hardcoded Plan definitions ensuring the new limits are enforced.
 * These will be merged with the i18n content.
 */
const PLAN_DEFINITIONS: Record<PlanId, Partial<Plan>> = {
  free: { 
    monthly: 0, yearly: 0, tier: 0, 
    limits: { sources: 1, users: 100 } 
  },
  starter: { 
    monthly: 17, yearly: calcAnnual(17), tier: 1, 
    limits: { sources: 5, users: 100000 },
    productId: 'price_starter_id' 
  },
  growth: { 
    monthly: 35, yearly: calcAnnual(35), tier: 2, 
    limits: { sources: 17, users: 250000 },
    productId: 'price_growth_id' 
  },
  pro: { 
    monthly: 80, yearly: calcAnnual(80), tier: 3, 
    limits: { sources: 25, users: 500000 },
    productId: 'price_pro_id' 
  },
  master: { 
    monthly: 150, yearly: calcAnnual(150), tier: 4, 
    limits: { sources: 50, users: -1 },
    productId: 'price_master_id' 
  },
  vipfree: { 
    monthly: 0, yearly: 0, tier: 99, 
    limits: { sources: 100, users: -1 }, 
    internalOnly: true 
  }
};

/** Compute progressive features for a given plan */
export function computeFeatures(content: PlansContent, target: PlanId): string[] {
  const plan = content.plans.find(p => p.id === target);
  if (!plan) return [];
  
  // Combine base and delta features
  return [...plan.featuresBase, ...plan.featuresDelta];
}

function detectMock(): boolean {
  return !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
}

// Initialize with i18n structure and apply the new pricing logic
const initial: PlansState = {
  mockMode: detectMock(),
  interval: 'monthly',
  currentPlan: 'free',
  content: null
};

const store: Writable<PlansState> = writable(initial);

/** * Load content and merge with hardcoded business logic (prices/limits)
 */
export async function loadPlansContent() {
  const translations = get(t);
  const json = translations.plans as PlansContent;
  
  // Enrich the plans from translations with our hardcoded logic
  const enrichedPlans = json.plans.map(p => ({
    ...p,
    ...PLAN_DEFINITIONS[p.id as PlanId]
  })) as Plan[];

  store.update(s => ({
    ...s,
    content: {
      ...json,
      plans: enrichedPlans
    },
    currentPlan: json.currentPlan || 'free',
    interval: 'monthly'
  }));
}

export function setInterval(interval: Interval) {
  store.update(s => ({ ...s, interval }));
}

export function setCurrentPlan(plan: PlanId) {
  store.update(s => ({ ...s, currentPlan: plan }));
}

export default store;