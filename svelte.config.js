import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

const API_ORIGIN = process.env.PUBLIC_API_URL?.replace(/\/+$/, '') || 'https://ai-newsletter-translated.onrender.com';
const API_WS = API_ORIGIN.replace(/^http/, 'ws');

/**
 * Content security policy. Report-only for now (WS6, 2026-10-30): violations
 * are logged by /api/csp-report so we can tighten it without breaking pages.
 * To enforce, move `reportOnly` to `directives` (see docs/aiban/ws6-summary.md).
 * Hosts come from what the app loads today (docs/aiban/ws6-security.md).
 */
const cspDirectives = {
	'default-src': ['self'],
	'script-src': ['self', 'strict-dynamic'],
	'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com', 'https://cdn.quilljs.com'],
	'img-src': ['self', 'data:', 'blob:', 'https:'],
	'font-src': ['self', 'data:', 'https://fonts.gstatic.com'],
	'media-src': ['self', 'blob:', 'https://cdn.cosmicjs.com', 'https://videos.pexels.com'],
	'connect-src': ['self', API_ORIGIN, API_WS, 'http://localhost:8000', 'ws://localhost:8000'],
	'frame-src': ['self', 'https://www.youtube.com', 'https://www.youtube-nocookie.com'],
	'worker-src': ['self', 'blob:'],
	'object-src': ['none'],
	'base-uri': ['self'],
	'form-action': ['self', 'https://accounts.google.com'],
	'report-uri': ['/api/csp-report']
};

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto.
		adapter: adapter(),
		csp: {
			mode: 'auto',
			reportOnly: cspDirectives
		}
	}
};

export default config;
