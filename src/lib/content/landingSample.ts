// Builds the clearly labeled sample issue shown on the landing page.
// Everything here is placeholder content. Nothing is fetched from the visitor's site,
// so the sample never claims facts about their business. Owner: WS2.

export type SampleLanguage = 'en' | 'es' | 'de';

export interface SampleIssue {
	site: string;
	brand: string;
	fromAddress: string;
	language: SampleLanguage;
	languageName: string;
	subject: string;
	greeting: string;
	headline: string;
	paragraphs: string[];
	cta: string;
	signoff: string;
}

/** Returns a normalized hostname, or null when the input is not a plausible web address. */
export function normalizeSite(input: string): string | null {
	const raw = (input || '').trim();
	if (!raw) return null;
	let candidate = raw;
	if (!/^https?:\/\//i.test(candidate)) candidate = `https://${candidate}`;
	try {
		const url = new URL(candidate);
		const host = url.hostname.toLowerCase().replace(/^www\./, '');
		// Needs a dot, a TLD of 2+ letters, and only hostname characters.
		if (!/^[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/.test(host)) return null;
		return host;
	} catch {
		return null;
	}
}

/** "acme-studio.co.uk" becomes "Acme Studio". */
export function brandFromHost(host: string): string {
	const label = host.split('.')[0] || host;
	return label
		.split(/[-_]/)
		.filter(Boolean)
		.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
		.join(' ');
}

const COPY: Record<SampleLanguage, Omit<SampleIssue, 'site' | 'brand' | 'fromAddress' | 'language'>> = {
	en: {
		languageName: 'English',
		subject: 'This week from {brand}',
		greeting: 'Hello,',
		headline: 'Your newest article, rewritten for your readers',
		paragraphs: [
			'This paragraph stands in for the summary AIBAN writes from the latest article on your website. It keeps your tone and the points you make.',
			'A second paragraph explains why the topic matters to the reader and links back to the full article on your site.'
		],
		cta: 'Read the full article',
		signoff: 'Talk soon, the {brand} team'
	},
	es: {
		languageName: 'Español',
		subject: 'Esta semana en {brand}',
		greeting: 'Hola:',
		headline: 'Tu artículo más reciente, reescrito para tus lectores',
		paragraphs: [
			'Este párrafo ocupa el lugar del resumen que AIBAN escribe a partir del artículo más reciente de tu sitio. Mantiene tu tono y tus ideas.',
			'Un segundo párrafo explica por qué el tema le importa al lector y enlaza al artículo completo en tu sitio.'
		],
		cta: 'Leer el artículo completo',
		signoff: 'Hasta pronto, el equipo de {brand}'
	},
	de: {
		languageName: 'Deutsch',
		subject: 'Diese Woche von {brand}',
		greeting: 'Hallo,',
		headline: 'Ihr neuester Artikel, neu geschrieben für Ihre Leser',
		paragraphs: [
			'Dieser Absatz steht für die Zusammenfassung, die AIBAN aus dem neuesten Artikel Ihrer Website schreibt. Ton und Aussagen bleiben erhalten.',
			'Ein zweiter Absatz erklärt, warum das Thema für den Leser wichtig ist, und verlinkt auf den vollständigen Artikel.'
		],
		cta: 'Ganzen Artikel lesen',
		signoff: 'Bis bald, Ihr Team von {brand}'
	}
};

export const SAMPLE_LANGUAGES: SampleLanguage[] = ['en', 'es', 'de'];

export function buildSample(host: string | null, language: SampleLanguage = 'en'): SampleIssue {
	const site = host || 'yourcompany.com';
	const brand = host ? brandFromHost(host) : 'Your Company';
	const c = COPY[language];
	const fill = (s: string) => s.replaceAll('{brand}', brand);
	return {
		site,
		brand,
		fromAddress: `hello@${site}`,
		language,
		languageName: c.languageName,
		subject: fill(c.subject),
		greeting: c.greeting,
		headline: c.headline,
		paragraphs: c.paragraphs,
		cta: c.cta,
		signoff: fill(c.signoff)
	};
}

/** Key used to hand the website to onboarding (WS3 reads it to prefill the first step). */
export const PENDING_SITE_KEY = 'aiban.pendingWebsite';
