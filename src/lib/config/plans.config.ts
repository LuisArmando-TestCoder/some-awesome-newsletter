// src/lib/config/plans.config.ts
import { writable, type Writable, get } from 'svelte/store';
import { t } from '../i18n/translations';

export type Interval = 'monthly' | 'yearly';
export type PlanId = 'free' | 'starter' | 'growth' | 'pro' | 'master' | 'vipfree' | 'newsletter';

export interface Plan {
  id: PlanId;
  name: string;
  monthly: number;
  yearly: number;
  tagline: string;
  featuresBase: string[];
  featuresDelta: string[];
  limits: {
    newsSources: number;
    users: number; 
  };
  ctaLabel: string;
  internalOnly?: boolean;
  productId?: string;
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
const calcAnnual = (monthly: number) => Math.floor((monthly * 12) * (1 - ANNUAL_DISCOUNT));

const PLAN_DEFINITIONS: Record<PlanId, Partial<Plan>> = {
  free: { monthly: 0, yearly: 0, tier: 0, limits: { newsSources: 1, users: 100 } },
  starter: { monthly: 17, yearly: calcAnnual(17), tier: 1, limits: { newsSources: 5, users: 100000 }, productId: 'price_starter_id' },
  growth: { monthly: 35, yearly: calcAnnual(35), tier: 2, limits: { newsSources: 17, users: 250000 }, productId: 'price_growth_id' },
  pro: { monthly: 80, yearly: calcAnnual(80), tier: 3, limits: { newsSources: 25, users: 500000 }, productId: 'price_pro_id' },
  master: { monthly: 150, yearly: calcAnnual(150), tier: 4, limits: { newsSources: 50, users: -1 }, productId: 'price_master_id' },
  vipfree: { monthly: 0, yearly: 0, tier: 99, limits: { newsSources: -1, users: -1 }, internalOnly: true },
  newsletter: { monthly: 0, yearly: 0, tier: 5, limits: { newsSources: 10, users: 10000 }, productId: 'price_newsletter_id' }
};

export function computeFeatures(content: PlansContent, target: PlanId): string[] {
  if (!content || !content.plans) return [];
  const plan = content.plans.find(p => p.id === target);
  if (!plan) return [];
  return [...plan.featuresBase, ...plan.featuresDelta];
}

const initial: PlansState = {
  mockMode: !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
  interval: 'monthly',
  currentPlan: 'free',
  content: null
};

const store: Writable<PlansState> = writable(initial);

export async function loadPlansContent() {
  const translations = get(t);
  const json = translations.plans as PlansContent;
  
  if (!json?.plans) return;

  const enrichedPlans = json.plans.map(p => ({
    ...p,
    ...PLAN_DEFINITIONS[p.id as PlanId]
  })) as Plan[];

  store.update(s => ({
    ...s,
    content: { ...json, plans: enrichedPlans },
    currentPlan: json.currentPlan || 'free'
  }));
}

export function setInterval(interval: Interval) {
  store.update(s => ({ ...s, interval }));
}

export default store;