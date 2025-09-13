// src/lib/config/plans.config.ts
import { writable, type Writable } from 'svelte/store';

export type Interval = 'monthly' | 'yearly';
export type PlanId = 'trial' | 'starter' | 'pro';

export interface Plan {
  id: PlanId;
  name: string;
  monthly: number;
  yearly: number;
  tagline: string;
  featuresBase: string[];
  featuresDelta: string[];
  limits: Record<string, number>; // -1 = unlimited
  ctaLabel: string;
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

/** Compute progressive features for a given plan using reverse-limiter */
export function computeFeatures(content: PlansContent, target: PlanId): string[] {
  const order: PlanId[] = ['trial', 'starter', 'pro'];
  const idx = order.indexOf(target);
  const byId = new Map(content.plans.map(p => [p.id, p]));
  const collected: string[] = [];
  for (let i = 0; i <= idx; i++) {
    const p = byId.get(order[i])!;
    if (i === 0) collected.push(...p.featuresBase);
    else collected.push(...p.featuresDelta);
  }
  return collected;
}

/** Detect mock mode from env-safe condition your app already uses */
function detectMock(): boolean {
  // Example: if Stripe keys are missing, we consider pricing mockable.
  return !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY; // adapt to your runtime
}

const initial: PlansState = {
  mockMode: detectMock(),
  interval: 'monthly',
  currentPlan: 'trial',
  content: null
};

const store: Writable<PlansState> = writable(initial);

/** Load JSON once and sync state (call in onMount or layout load) */
export async function loadPlansContent(path = '/content/plans.json') {
  const res = await fetch(path, { headers: { 'cache-control': 'no-cache' } });
  const json = (await res.json()) as PlansContent;
  store.update(s => ({
    ...s,
    content: json,
    currentPlan: json.currentPlan,
    interval: (json.billingIntervals?.[0] ?? 'monthly') as Interval
  }));
}

export function setInterval(interval: Interval) {
  store.update(s => ({ ...s, interval }));
}

export function setCurrentPlan(plan: PlanId) {
  store.update(s => ({ ...s, currentPlan: plan }));
}

export default store; // <— DEFAULT EXPORT: writable store
