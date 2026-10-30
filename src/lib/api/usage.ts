/**
 * Usage against plan limits. GET /usage (requested from WS7) when live,
 * otherwise computed from the config and subscribers already in the store.
 * Limits mirror backend helper/checkActionLimit.ts and plans.config.ts.
 */
import { request, withFallback } from './client';

export type PlanId = 'free' | 'starter' | 'growth' | 'pro' | 'master' | 'vipfree' | 'newsletter';
export type Meter = { used: number; limit: number; unlimited: boolean; remaining: number; percent: number; atLimit: boolean; nearLimit: boolean };
export type Usage = { plan: PlanId; newsSources: Meter; subscribers: Meter; source: 'server' | 'local' };

export const PLAN_LIMITS: Record<PlanId, { newsSources: number; users: number }> = {
	free: { newsSources: 1, users: 100 },
	starter: { newsSources: 5, users: 100000 },
	growth: { newsSources: 17, users: 250000 },
	pro: { newsSources: 25, users: 500000 },
	master: { newsSources: 50, users: -1 },
	vipfree: { newsSources: -1, users: -1 },
	newsletter: { newsSources: 10, users: 10000 }
};

export function meter(used: number, limit: number): Meter {
	const unlimited = limit < 0;
	const remaining = unlimited ? Infinity : Math.max(0, limit - used);
	const percent = unlimited || limit === 0 ? 0 : Math.min(100, Math.round((used / limit) * 100));
	return { used, limit, unlimited, remaining, percent, atLimit: !unlimited && used >= limit, nearLimit: !unlimited && percent >= 80 };
}

export function planOf(config: { pricingPlan?: string; vip?: boolean } | undefined): PlanId {
	const p = (config?.pricingPlan ?? 'free') as PlanId;
	return p in PLAN_LIMITS ? p : 'free';
}

/** Unique subscriber emails across all sources. */
export function countSubscribers(byNewsSource: Record<string, Array<{ email?: string }>> | undefined): number {
	const set = new Set<string>();
	for (const list of Object.values(byNewsSource ?? {})) if (Array.isArray(list)) for (const u of list) if (u?.email) set.add(u.email.toLowerCase());
	return set.size;
}

export function computeUsage(config: { pricingPlan?: string; newsSources?: unknown[] } | undefined, subscribers: Record<string, Array<{ email?: string }>> | undefined): Usage {
	const plan = planOf(config);
	const limits = PLAN_LIMITS[plan];
	return {
		plan,
		newsSources: meter(config?.newsSources?.length ?? 0, limits.newsSources),
		subscribers: meter(countSubscribers(subscribers), limits.users),
		source: 'local'
	};
}

/** GET /v1/usage response. In `limits`, null means unlimited. */
export type ServerUsage = {
	plan: { id: string; name: string };
	period: { start: string; end: string };
	limits: { newsSources: number | null; subscribers: number | null };
	used: { newsSources: number; subscribers: number; sendsThisMonth: number; aiRunsThisMonth: number };
	percent: { newsSources: number | null; subscribers: number | null };
	nearLimit: string[];
	upgradeUrl: string;
};

export type UsageWithMonth = Usage & { sendsThisMonth?: number; aiRunsThisMonth?: number; planName?: string };

/** Usage from the server (counts every subscriber, not only the loaded ones); local estimate as fallback. */
export async function getUsage(local: () => Usage): Promise<UsageWithMonth> {
	return withFallback<UsageWithMonth>(
		async () => {
			const u = await request<ServerUsage>('/v1/usage');
			const lim = (v: number | null) => (v === null ? -1 : v);
			return {
				plan: (u.plan.id in PLAN_LIMITS ? u.plan.id : 'free') as PlanId,
				planName: u.plan.name,
				newsSources: meter(u.used.newsSources, lim(u.limits.newsSources)),
				subscribers: meter(u.used.subscribers, lim(u.limits.subscribers)),
				sendsThisMonth: u.used.sendsThisMonth,
				aiRunsThisMonth: u.used.aiRunsThisMonth,
				source: 'server'
			};
		},
		local,
		true
	);
}
