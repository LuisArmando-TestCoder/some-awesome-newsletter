/**
 * HTML sanitizer for content we did not write (LLM output, scraped articles,
 * owner signatures) before it goes into {@html}.
 *
 * Browser: DOM based allow-list (drops scripts, frames, forms, event handlers,
 * javascript: and data: URLs except images). Server (SSR): a conservative
 * regex pass with the same rules. Prefer DOMPurify when it can be installed
 * (requested from WS1); keep this as the single call site so swapping is easy.
 */
const DROP_TAGS = new Set(['script', 'style', 'iframe', 'frame', 'frameset', 'object', 'embed', 'applet', 'form', 'input', 'button', 'textarea', 'select', 'option', 'link', 'meta', 'base', 'svg', 'math', 'template', 'noscript']);
const URL_ATTRS = new Set(['href', 'src', 'xlink:href', 'action', 'formaction', 'poster', 'background', 'srcset', 'cite']);
const SAFE_URL = /^(https?:|mailto:|tel:|#|\/(?!\/)|\.{0,2}\/|[^:]*$)/i;
const SAFE_DATA_IMAGE = /^data:image\/(png|gif|jpe?g|webp|avif);base64,/i;
// Browsers skip control characters and spaces inside URLs ("java\0script:"), so strip them before the check.
// eslint-disable-next-line no-control-regex -- matching control characters is the purpose of this pattern
const URL_IGNORED_CHARS = /[\u0000- ]+/g;

function safeUrl(value: string, attr: string, tag: string): boolean {
	const v = value.replace(URL_IGNORED_CHARS, '').trim();
	if (attr === 'srcset') return v.split(',').every((part) => SAFE_URL.test(part.trim().split(/\s+/)[0] ?? ''));
	if (SAFE_DATA_IMAGE.test(v) && (tag === 'img' || attr === 'src')) return true;
	return SAFE_URL.test(v);
}

function sanitizeDom(html: string): string {
	const doc = new DOMParser().parseFromString(`<body>${html}</body>`, 'text/html');
	const walk = (node: Element) => {
		for (const child of Array.from(node.children)) {
			const tag = child.tagName.toLowerCase();
			if (DROP_TAGS.has(tag)) {
				child.remove();
				continue;
			}
			for (const attr of Array.from(child.attributes)) {
				const name = attr.name.toLowerCase();
				if (name.startsWith('on') || name === 'srcdoc' || name === 'formaction') child.removeAttribute(attr.name);
				else if (URL_ATTRS.has(name) && !safeUrl(attr.value, name, tag)) child.removeAttribute(attr.name);
				else if (name === 'style' && /expression\s*\(|javascript:|url\s*\(\s*['"]?\s*(javascript|data:(?!image))/i.test(attr.value)) child.removeAttribute(attr.name);
			}
			if (tag === 'a' && child.getAttribute('target') === '_blank') child.setAttribute('rel', 'noopener noreferrer');
			walk(child);
		}
	};
	walk(doc.body);
	return doc.body.innerHTML;
}

function sanitizeString(html: string): string {
	let out = html;
	for (const tag of DROP_TAGS) {
		out = out.replace(new RegExp(`<${tag}\\b[\\s\\S]*?<\\/${tag}\\s*>`, 'gi'), '');
		out = out.replace(new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi'), '');
	}
	out = out.replace(/\s(on[a-z]+|srcdoc|formaction)\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, '');
	out = out.replace(/\s(href|src|xlink:href|action|poster|background|cite)\s*=\s*("([^"]*)"|'([^']*)'|([^\s>]+))/gi, (m, _a, _q, d, s, u) => {
		const v = String(d ?? s ?? u ?? '');
		return SAFE_URL.test(v.replace(URL_IGNORED_CHARS, '')) || SAFE_DATA_IMAGE.test(v) ? m : '';
	});
	out = out.replace(/\sstyle\s*=\s*("[^"]*(expression\s*\(|javascript:)[^"]*"|'[^']*(expression\s*\(|javascript:)[^']*')/gi, '');
	return out;
}

export function sanitizeHtml(html: string | null | undefined): string {
	if (!html) return '';
	if (typeof DOMParser !== 'undefined') {
		try {
			return sanitizeDom(String(html));
		} catch {
			/* fall through */
		}
	}
	return sanitizeString(String(html));
}

/** Plain text from HTML without executing anything (no detached innerHTML). */
export function htmlToText(html: string | null | undefined): string {
	if (!html) return '';
	if (typeof DOMParser !== 'undefined') {
		try {
			return new DOMParser().parseFromString(String(html), 'text/html').body.textContent?.replace(/\s+/g, ' ').trim() ?? '';
		} catch {
			// Parser failed: use the regex fallback below.
		}
	}
	return String(html).replace(/<style[\s\S]*?<\/style>|<script[\s\S]*?<\/script>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}
