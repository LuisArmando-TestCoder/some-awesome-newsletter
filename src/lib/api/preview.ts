/**
 * Email preview rendering. Builds an issue with the existing backend
 * generator (nothing is saved or sent) and returns HTML meant for a
 * sandboxed iframe: <iframe sandbox srcdoc={previewSrcdoc(html)}>.
 */
import { request } from './client';
import { LLM_TIMEOUT_MS } from './config';

export type PreviewInput = {
	newsSource: { url: string; lead?: string; personality?: string; linkSelector?: string; includeImages?: boolean };
	language?: string;
	config?: Record<string, unknown>;
	signal?: AbortSignal;
};

export async function renderPreview(input: PreviewInput): Promise<{ html: string }> {
	const data = await request<{ html?: string }>('/news-source/generate-newsletter', {
		method: 'POST',
		body: { newsSource: input.newsSource, language: input.language ?? 'en', config: input.config ?? {} },
		timeoutMs: LLM_TIMEOUT_MS,
		signal: input.signal,
		errorMessage: 'We could not build the preview. Check the website address and try again.'
	});
	if (!data?.html) throw new Error('We could not build the preview. Check the website address and try again.');
	return { html: data.html };
}

/**
 * Wrap email HTML for an iframe `srcdoc`. Use with `sandbox=""` (no scripts,
 * no same-origin): links open in a new tab, nothing can run.
 */
export function previewSrcdoc(html: string): string {
	const csp = `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; img-src https: data:; style-src 'unsafe-inline' https:; font-src https: data:">`;
	const base = '<base target="_blank">';
	return /<head[^>]*>/i.test(html) ? html.replace(/<head[^>]*>/i, (m) => `${m}${csp}${base}`) : `<!doctype html><html><head>${csp}${base}</head><body>${html}</body></html>`;
}

export type EmailPreviewInput = { newsSourceId?: string; subject?: string; title?: string; html?: string; text?: string; language?: string };
export type EmailPreview = { html: string; subject: string; warnings: string[]; sample: boolean };

/**
 * Render content in the owner's email template (POST /v1/email/preview).
 * Nothing is sent or stored. `sample` is true when the server filled in sample
 * content; `warnings` are ready-to-show sentences. Content over 200 KB fails.
 */
export async function renderEmailPreview(input: EmailPreviewInput, signal?: AbortSignal): Promise<EmailPreview> {
	return request<EmailPreview>('/v1/email/preview', {
		method: 'POST',
		body: input,
		signal,
		idempotent: true,
		errorMessage: 'We could not show the preview. Try again in a minute.'
	});
}

export type PublicPreview = { html: string; subject: string; language: string; url: string; cached: boolean };

/**
 * Landing page preview, no account (POST /v1/public/preview-issue). The server reads the
 * site, writes its newest article as an issue in `language` and renders it in the AIBAN
 * template. Nothing is saved or sent. 5 new previews per hour per visitor; repeated
 * requests for the same site and language are cached on the server.
 */
export function publicPreview(url: string, language: string, signal?: AbortSignal): Promise<PublicPreview> {
	return request<PublicPreview>('/v1/public/preview-issue', {
		method: 'POST',
		auth: 'none',
		body: { url, language },
		timeoutMs: LLM_TIMEOUT_MS,
		signal,
		retries: 0,
		errorMessage: 'We could not write a preview from that site. Check the address and try again.'
	});
}
