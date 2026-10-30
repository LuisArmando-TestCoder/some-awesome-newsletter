/**
 * Platform admin API (backend /v1/admin/*, API/v1/admin/adminV1Router.ts).
 * Only emails listed in the backend ADMIN_EMAILS env var get answers; everyone
 * else gets 404, which isNotAdmin() detects.
 */
import { request, seg } from './client';
import { isApiError } from './errors';

export type PlanId = 'free' | 'starter' | 'growth' | 'pro' | 'master' | 'vipfree';
export const PLAN_OPTIONS: Array<{ value: PlanId; label: string }> = [
	{ value: 'free', label: 'Free' },
	{ value: 'starter', label: 'Starter' },
	{ value: 'growth', label: 'Growth' },
	{ value: 'pro', label: 'Pro' },
	{ value: 'master', label: 'Master' },
	{ value: 'vipfree', label: 'VIP (free, no limits)' }
];

export type AdminSource = {
	id: string;
	url: string;
	active: boolean;
	isPublic: boolean;
	isPaidNewsletter: boolean;
	scheduleTime?: string;
	newsletterTitle?: string;
};

export type AdminTenant = {
	id: string;
	senderName: string;
	newsletterTitle: string;
	plan: { id: PlanId; name: string };
	vip: boolean;
	newsSources: AdminSource[];
	sourceCount: number;
	activeSourceCount: number;
	paidSourceCount: number;
	hasOwnSender: boolean;
	createdAt?: string | null;
	updatedAt?: string | null;
	adminNote?: string;
};

export type AdminTenantDetail = AdminTenant & {
	subscribersBySource: Record<string, number | null>;
	totalSubscribers: number;
	limits: { newsSources: number | null; subscribers: number | null };
	thisMonth: { emailsSent: number; aiRuns: number };
};

export type AdminOverview = {
	tenants: number;
	sources: number;
	activeSources: number;
	paidSources: number;
	withOwnSender: number;
	byPlan: Record<string, number>;
	generatedAt: string;
};

export const isNotAdmin = (e: unknown) => isApiError(e) && (e.status === 404 || e.status === 403);

export const getOverview = () => request<AdminOverview>('/v1/admin/overview', { requireAuth: true });

export function listTenants(q: { q?: string; plan?: PlanId; paid?: boolean; limit?: number; offset?: number; fresh?: boolean } = {}) {
	return request<{ items: AdminTenant[]; total: number; offset: number; limit: number }>('/v1/admin/tenants', {
		requireAuth: true,
		query: { q: q.q, plan: q.plan, paid: q.paid === undefined ? undefined : String(q.paid), limit: q.limit, offset: q.offset, fresh: q.fresh ? 1 : undefined },
		dedupe: false
	});
}

export const getTenant = (id: string) => request<AdminTenantDetail>(`/v1/admin/tenants/${seg(id)}`, { requireAuth: true, dedupe: false });

export const updateTenant = (id: string, patch: { pricingPlan?: PlanId; vip?: boolean; adminNote?: string }) =>
	request<AdminTenant>(`/v1/admin/tenants/${seg(id)}`, {
		method: 'PATCH',
		body: patch,
		requireAuth: true,
		errorMessage: 'We could not save this customer. Try again.'
	});

export const updateTenantSource = (id: string, nsId: string, patch: { isPaidNewsletter?: boolean; active?: boolean; isPublic?: boolean }) =>
	request<AdminTenant>(`/v1/admin/tenants/${seg(id)}/news-sources/${seg(nsId)}`, {
		method: 'PATCH',
		body: patch,
		requireAuth: true,
		errorMessage: 'We could not save this newsletter. Try again.'
	});

/* ------------------------------------------------------------------ */
/* Admin access, admin list and audit log                               */
/* ------------------------------------------------------------------ */

export type AdminMe = { email: string; isAdmin: boolean };
export type AdminEntry = { email: string; addedAt: string | null; addedBy: string | null; source: 'env' | 'database' };
export type AdminAuditEntry = {
	id: string;
	at: string;
	actor: string;
	action: 'tenant.updated' | 'news_source.updated' | 'admin.added' | 'admin.removed';
	tenantId?: string;
	newsSourceId?: string;
	target?: string;
	changes?: Record<string, { from: unknown; to: unknown }>;
};

/** Who is signed in and whether they are an admin. Never 404 for a signed-in owner. */
export const getMe = () => request<AdminMe>('/v1/admin/me', { requireAuth: true, dedupe: false, retries: 1 });

export const listAdmins = async () => (await request<{ items: AdminEntry[] }>('/v1/admin/admins', { requireAuth: true, dedupe: false })).items;

export const addAdmin = async (email: string) =>
	(
		await request<{ items: AdminEntry[] }>('/v1/admin/admins', {
			method: 'POST',
			body: { email },
			requireAuth: true,
			errorMessage: 'We could not add this admin. Try again.'
		})
	).items;

export const removeAdmin = async (email: string) =>
	(
		await request<{ items: AdminEntry[] }>(`/v1/admin/admins/${seg(email)}`, {
			method: 'DELETE',
			requireAuth: true,
			errorMessage: 'We could not remove this admin. Try again.'
		})
	).items;

export const listAudit = (q: { limit?: number; cursor?: string; tenantId?: string } = {}) =>
	request<{ items: AdminAuditEntry[]; nextCursor: string | null }>('/v1/admin/audit', {
		requireAuth: true,
		query: { limit: q.limit, cursor: q.cursor, tenantId: q.tenantId },
		dedupe: false
	});
