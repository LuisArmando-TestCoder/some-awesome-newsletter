// WS15. The owner's blog address and custom domain (backend: /v1/blog-site).
import { request } from './client';
import { isApiError } from './errors';

export type DomainStatus = 'none' | 'pending' | 'dns_ok' | 'live' | 'failed';
export type BlogSiteSettings = {
	handle: string;
	/** Where readers find the blog now: the owner's domain when live, else AIBAN's address. */
	blogUrl: string;
	/** AIBAN's address for the blog (always works). */
	defaultUrl: string;
	domain: string | null;
	domainStatus: DomainStatus;
	domainMessage: string;
	domainCheckedAt: string | null;
	dns: { type: 'CNAME' | 'A'; name: string; value: string } | null;
};

export const getBlogSite = () => request<BlogSiteSettings>('/v1/blog-site', { requireAuth: true, dedupe: false });

export const updateBlogSite = (patch: { handle?: string; domain?: string | null }) =>
	request<BlogSiteSettings>('/v1/blog-site', { method: 'PUT', body: patch, requireAuth: true, idempotent: true });

export const verifyBlogDomain = () => request<BlogSiteSettings>('/v1/blog-site/verify', { method: 'POST', requireAuth: true });

/** The message for one field of a failed save, falling back to the general message. */
export function fieldError(e: unknown, field: string): string {
	if (!isApiError(e)) return '';
	const body = e.body as { error?: { details?: { fields?: Array<{ path?: string; message?: string }>; field?: string } } } | undefined;
	const fields = body?.error?.details?.fields ?? [];
	return fields.find((f) => f.path === field)?.message ?? e.userMessage;
}
