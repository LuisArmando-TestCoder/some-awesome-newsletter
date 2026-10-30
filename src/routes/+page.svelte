<script lang="ts">
	// AIBAN landing page. Owner: WS2. Previous version: _deprecated/src/routes/+page.svelte
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n/translations';
	import en from '$lib/i18n/locales/en';
	import Faq from '$lib/ui/organisms/Faq.svelte';
	import Pricing from '$lib/ui/organisms/Pricing.svelte';
	import IssuePreview from '$lib/content/landing/IssuePreview.svelte';
	import {
		normalizeSite,
		PENDING_SITE_KEY,
		SAMPLE_LANGUAGES,
		type SampleLanguage
	} from '$lib/content/landingSample';
	import {
		canonical,
		jsonLd,
		organizationLd,
		DEFAULT_OG_IMAGE,
		SITE_NAME,
		SITE_URL
	} from '$lib/content/seo';
	import store from '../components/store';
	import logout from '../components/systems/requests/logout';

	// Onboarding entry (WS3). /start sends signed-in owners to /dashboard and others to /signup,
	// and pre-fills the first setup field from ?url=.
	const START_HREF = '/start';

	// Locale files that predate the landing keys fall back to English.
	const L = $derived(($t as typeof en).landing ?? en.landing);

	let siteInput = $state('');
	let host = $state<string | null>(null);
	let formError = $state('');
	let announce = $state('');
	let previewLanguage = $state<SampleLanguage>('en');
	let previewEl = $state<HTMLElement | null>(null);

	const fill = (s: string, site: string) => s.replaceAll('{site}', site);

	const startHref = $derived.by(() => {
		return host ? `${START_HREF}?url=${encodeURIComponent(`https://${host}`)}` : START_HREF;
	});

	async function onPreview(e: SubmitEvent) {
		e.preventDefault();
		const next = normalizeSite(siteInput);
		if (!next) {
			formError = L.hero.formError;
			return;
		}
		formError = '';
		host = next;
		announce = fill(L.preview.liveRegion, next);
		await tick();
		if (previewEl && window.matchMedia('(max-width: 60rem)').matches) {
			const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
			previewEl.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
		}
	}

	function onStart(e: MouseEvent) {
		e.preventDefault();
		// Signed-out visitors start from a clean local state, as the header links do.
		if (!$store.isAuthCodeValid) logout(false);
		try {
			if (host) localStorage.setItem(PENDING_SITE_KEY, `https://${host}`);
		} catch {
			/* storage blocked: the ?url= parameter still carries the address */
		}
		goto(startHref);
	}

	const softwareLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'SoftwareApplication',
		name: SITE_NAME,
		url: `${SITE_URL}/`,
		applicationCategory: 'BusinessApplication',
		operatingSystem: 'Web',
		description: L.seo.description,
		offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD', description: 'Free plan' }
	});

	const faqLd = $derived({
		'@context': 'https://schema.org',
		'@type': 'FAQPage',
		mainEntity: L.faq.map((f) => ({
			'@type': 'Question',
			name: f.q,
			acceptedAnswer: { '@type': 'Answer', text: f.a }
		}))
	});

	const year = new Date().getFullYear();
</script>

<svelte:head>
	<title>{L.seo.title}</title>
	<meta name="description" content={L.seo.description} />
	<link rel="canonical" href={canonical('/')} />
	<meta property="og:site_name" content={SITE_NAME} />
	<meta property="og:title" content={L.seo.title} />
	<meta property="og:description" content={L.seo.description} />
	<meta property="og:url" content={canonical('/')} />
	<meta property="og:type" content="website" />
	<meta property="og:image" content={DEFAULT_OG_IMAGE} />
	<meta property="og:image:alt" content={L.seo.ogImageAlt} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={L.seo.title} />
	<meta name="twitter:description" content={L.seo.description} />
	<meta name="twitter:image" content={DEFAULT_OG_IMAGE} />
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD with "<" escaped, so it cannot close the script tag -->
	{@html jsonLd(organizationLd)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD with "<" escaped, so it cannot close the script tag -->
	{@html jsonLd(softwareLd)}
	<!-- eslint-disable-next-line svelte/no-at-html-tags -- JSON-LD with "<" escaped, so it cannot close the script tag -->
	{@html jsonLd(faqLd)}
</svelte:head>

<a href="#main-content" class="skip-link">{L.skipLink}</a>

<main id="main-content" class="landing">
	<!-- Hero with the website preview -->
	<section class="hero" aria-labelledby="hero-title">
		<div class="wrap hero__grid">
			<div class="hero__copy">
				<p class="eyebrow">{L.hero.eyebrow}</p>
				<h1 id="hero-title" class="hero__title">{L.hero.title}</h1>
				<p class="hero__lead">{L.hero.lead}</p>

				<form class="site-form" novalidate onsubmit={onPreview}>
					<label for="site-input" class="site-form__label">{L.hero.formLabel}</label>
					<div class="site-form__row">
						<input
							id="site-input"
							class="site-form__input"
							type="text"
							inputmode="url"
							autocomplete="url"
							spellcheck="false"
							autocapitalize="off"
							placeholder={L.hero.formPlaceholder}
							bind:value={siteInput}
							aria-describedby="site-hint{formError ? ' site-error' : ''}"
							aria-invalid={formError ? 'true' : undefined}
						/>
						<button type="submit" class="btn btn--primary">{L.hero.formSubmit}</button>
					</div>
					{#if formError}
						<p id="site-error" class="site-form__error" role="alert">{formError}</p>
					{/if}
					<p id="site-hint" class="site-form__hint">{L.hero.formHint}</p>
				</form>

				<a class="link-tertiary" href="#how-it-works">{L.hero.secondaryCta}</a>
			</div>

			<div class="hero__preview" bind:this={previewEl}>
				<IssuePreview host={host} labels={L.preview} bind:language={previewLanguage} idPrefix="hero" />
				<p class="hero__note">{L.preview.note}</p>
				<a class="btn btn--primary btn--block" href={startHref} onclick={onStart}>
					{host ? fill(L.preview.startCta, host) : L.preview.startCtaGeneric}
				</a>
				<p class="visually-hidden" aria-live="polite">{announce}</p>
			</div>
		</div>
	</section>

	<!-- Trigger to action chain -->
	<section id="how-it-works" class="section section--alt" aria-labelledby="chain-title">
		<div class="wrap">
			<header class="section__head">
				<p class="eyebrow">{L.chain.eyebrow}</p>
				<h2 id="chain-title" class="section__title">{L.chain.title}</h2>
				<p class="section__lead">{L.chain.lead}</p>
			</header>

			<div class="chain">
				<div class="chain__trigger">
					<p class="chain__label">{L.chain.triggerLabel}</p>
					<div class="card card--trigger">
						<span class="chain__icon" aria-hidden="true">
							<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
						</span>
						<h3 class="card__title">{L.chain.trigger.title}</h3>
						<p class="card__body">{L.chain.trigger.body}</p>
					</div>
				</div>

				<div class="chain__actions">
					<p class="chain__label">{L.chain.actionLabel}</p>
					<ol class="steps">
						{#each L.chain.steps as step, i (i)}
							<li class="steps__item">
								<span class="steps__num" aria-hidden="true">{i + 1}</span>
								<div>
									<h3 class="steps__title">{step.title}</h3>
									<p class="steps__body">{step.body}</p>
								</div>
							</li>
						{/each}
					</ol>
				</div>
			</div>

			<div class="also">
				<h3 class="also__title">{L.chain.alsoTitle}</h3>
				<ul class="also__list">
					{#each L.chain.also as item, itemIndex (itemIndex)}
						<li class="card">
							<p class="card__title">{item.title}</p>
							<p class="card__body">{item.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</div>
	</section>

	<!-- Languages -->
	<section class="section" aria-labelledby="lang-title">
		<div class="wrap">
			<header class="section__head section__head--left">
				<p class="eyebrow">{L.languages.eyebrow}</p>
				<h2 id="lang-title" class="section__title">{L.languages.title}</h2>
				<p class="section__lead">{L.languages.body}</p>
			</header>
			<div class="lang-grid">
				{#each SAMPLE_LANGUAGES as code (code)}
					<IssuePreview
						host={host}
						labels={L.preview}
						switchable={false}
						language={code}
						compact
						idPrefix="lang-{code}"
					/>
				{/each}
			</div>
			<p class="caption">{L.languages.sampleNote}</p>
		</div>
	</section>

	<!-- Sender -->
	<section class="section section--alt" aria-labelledby="sender-title">
		<div class="wrap split">
			<header class="section__head section__head--left">
				<p class="eyebrow">{L.sender.eyebrow}</p>
				<h2 id="sender-title" class="section__title">{L.sender.title}</h2>
				<p class="section__lead">{L.sender.body}</p>
			</header>
			<figure class="inbox">
				<figcaption class="inbox__caption">{L.sender.inboxLabel}</figcaption>
				<ul class="inbox__list">
					<li class="inbox__row inbox__row--dim" aria-hidden="true"><span class="bar bar--s"></span><span class="bar bar--l"></span></li>
					<li class="inbox__row inbox__row--you">
						<span class="inbox__avatar" aria-hidden="true">{(host ?? 'y').charAt(0).toUpperCase()}</span>
						<div class="inbox__text">
							<p class="inbox__from">
								<strong>{L.sender.inboxFrom}</strong>
								<span>&lt;hello@{host ?? 'yourcompany.com'}&gt;</span>
							</p>
							<p class="inbox__subject">{fill(L.sender.inboxSubject, host ?? 'yourcompany.com')}</p>
							<p class="inbox__snippet">{L.sender.inboxSnippet}</p>
						</div>
						<span class="inbox__time">{L.sender.inboxTime}</span>
					</li>
					<li class="inbox__row inbox__row--dim" aria-hidden="true"><span class="bar bar--m"></span><span class="bar bar--l"></span></li>
				</ul>
			</figure>
		</div>
	</section>

	<!-- Grow -->
	<section class="section" aria-labelledby="grow-title">
		<div class="wrap">
			<header class="section__head">
				<p class="eyebrow">{L.grow.eyebrow}</p>
				<h2 id="grow-title" class="section__title">{L.grow.title}</h2>
			</header>
			<ul class="grid-3">
				{#each L.grow.items as item, itemIndex (itemIndex)}
					<li class="card">
						<h3 class="card__title">{item.title}</h3>
						<p class="card__body">{item.body}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Use cases -->
	<section class="section section--alt" aria-labelledby="uses-title">
		<div class="wrap">
			<header class="section__head">
				<p class="eyebrow">{L.useCases.eyebrow}</p>
				<h2 id="uses-title" class="section__title">{L.useCases.title}</h2>
				<p class="section__lead">{L.useCases.lead}</p>
			</header>
			<ul class="uses">
				{#each L.useCases.items as item, itemIndex (itemIndex)}
					<li class="uses__item">
						<h3 class="uses__title">{item.title}</h3>
						<p class="uses__body">{item.body}</p>
					</li>
				{/each}
			</ul>
		</div>
	</section>

	<!-- Pricing (existing organism, prices unchanged) -->
	<section id="pricing" class="section" aria-labelledby="pricing-title">
		<div class="wrap">
			<header class="section__head">
				<p class="eyebrow">{L.pricingIntro.eyebrow}</p>
				<h2 id="pricing-title" class="section__title">{L.pricingIntro.title}</h2>
				<p class="section__lead">{L.pricingIntro.lead}</p>
			</header>
			<Pricing showHeader={false} headingLevel={2} />
		</div>
	</section>

	<!-- FAQ -->
	<section id="faq" class="section section--alt">
		<div class="wrap wrap--narrow">
			<Faq items={L.faq} title={L.faqTitle} idPrefix="landing-faq" />
		</div>
	</section>

	<!-- Final CTA -->
	<section class="final" aria-labelledby="final-title">
		<div class="wrap final__box">
			<h2 id="final-title" class="final__title">{L.finalCta.title}</h2>
			<p class="final__body">{L.finalCta.body}</p>
			<div class="final__actions">
				<a class="btn btn--inverse" href={startHref} onclick={onStart}>{L.finalCta.cta}</a>
				<a class="link-inverse" href="/help">{L.finalCta.secondary}</a>
			</div>
		</div>
	</section>
</main>

<footer class="footer">
	<div class="wrap footer__grid">
		<div class="footer__about">
			<a href="/" class="footer__logo" aria-label={($t as typeof en).nav?.home ?? 'AIBAN home'}>
				<img src="/logo/logo.png" width="28" height="28" alt="" loading="lazy" decoding="async" />
				<span>AIBAN</span>
			</a>
			<p class="footer__tagline">{L.footer.tagline}</p>
			<p class="footer__contact">
				{L.footer.contactLabel}: <a href="mailto:info@aiban.news">info@aiban.news</a>
			</p>
		</div>
		<nav aria-label={L.footer.product}>
			<h2 class="footer__h">{L.footer.product}</h2>
			<ul>
				<li><a href="/#how-it-works">{L.footer.links.howItWorks}</a></li>
				<li><a href="/pricing">{L.footer.links.pricing}</a></li>
				<li><a href="/demo">{L.footer.links.demo}</a></li>
				<li><a href="/help">{L.footer.links.help}</a></li>
			</ul>
		</nav>
		<nav aria-label={L.footer.company}>
			<h2 class="footer__h">{L.footer.company}</h2>
			<ul>
				<li><a href="/about">{L.footer.links.about}</a></li>
				<li><a href="/careers">{L.footer.links.careers}</a></li>
			</ul>
		</nav>
		<nav aria-label={L.footer.legal}>
			<h2 class="footer__h">{L.footer.legal}</h2>
			<ul>
				<li><a href="/legal/privacy">{L.footer.links.privacy}</a></li>
				<li><a href="/legal/terms">{L.footer.links.terms}</a></li>
				<li><a href="/legal/cookies">{L.footer.links.cookies}</a></li>
			</ul>
		</nav>
	</div>
	<p class="wrap footer__rights">&copy; {year} AIBAN. {L.footer.rights}</p>
</footer>

<style lang="scss">
	.landing {
		background: var(--surface-0, #faf8f4);
		color: var(--text-1, #1a1a17);
		font-family: var(--font-body, system-ui, sans-serif);
	}
	.wrap {
		width: 100%;
		max-width: var(--container-lg, 72rem);
		margin-inline: auto;
		padding-inline: var(--space-5, 24px);
	}
	.wrap--narrow {
		max-width: var(--container-md, 52rem);
	}
	.skip-link {
		position: absolute;
		left: var(--space-4, 16px);
		top: calc(-1 * var(--space-10, 128px));
		z-index: var(--z-toast, 100);
		padding: var(--space-2, 8px) var(--space-4, 16px);
		background: var(--surface-inverse, #1a1a17);
		color: var(--text-inverse, #faf8f4);
		border-radius: var(--radius-sm, 6px);
		&:focus {
			top: var(--space-4, 16px);
		}
	}
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	.eyebrow {
		margin: 0 0 var(--space-3, 12px);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: var(--tracking-caps, 0.06em);
		text-transform: uppercase;
		color: var(--accent, #1f5c4f);
	}

	/* Buttons: one primary, one inverse (on dark band), one tertiary link. */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2, 8px);
		min-height: var(--control-h, 2.75rem);
		padding: 0 var(--space-5, 24px);
		border: 1px solid transparent;
		border-radius: var(--radius-md, 10px);
		font: inherit;
		font-size: var(--fs-md, 1rem);
		font-weight: var(--fw-semibold, 600);
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		transition:
			background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
			color var(--dur-fast, 120ms) var(--ease-out, ease-out);
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring, 0 0 0 3px #1f5c4f);
		}
	}
	.btn--primary {
		background: var(--accent, #1f5c4f);
		color: var(--accent-contrast, #fff);
		&:hover {
			background: var(--accent-hover, #174a3f);
		}
	}
	.btn--inverse {
		background: var(--surface-0, #faf8f4);
		color: var(--text-1, #1a1a17);
		&:hover {
			background: var(--surface-2, #f2efe8);
		}
	}
	.btn--block {
		width: 100%;
		white-space: normal;
		text-align: center;
		padding-block: var(--space-2, 8px);
	}
	.link-tertiary,
	.link-inverse {
		font-weight: var(--fw-semibold, 600);
		text-underline-offset: 0.2em;
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring, 0 0 0 3px #1f5c4f);
			border-radius: var(--radius-sm, 6px);
		}
	}
	.link-tertiary {
		color: var(--text-link, #1f5c4f);
	}
	.link-inverse {
		color: var(--text-inverse, #faf8f4);
	}

	/* Hero */
	.hero {
		padding-block: calc(var(--header-h, 4rem) + var(--space-7, 48px)) var(--space-8, 64px);
	}
	.hero__grid {
		display: grid;
		gap: var(--space-7, 48px);
		align-items: start;
		@media (min-width: 60rem) {
			grid-template-columns: 1.05fr 0.95fr;
			gap: var(--space-8, 64px);
		}
	}
	.hero__title {
		margin: 0 0 var(--space-4, 16px);
		font-family: var(--font-display, Georgia, serif);
		font-size: var(--fs-4xl, 3rem);
		line-height: var(--lh-tight, 1.15);
		letter-spacing: var(--tracking-tight, -0.01em);
		font-weight: var(--fw-semibold, 600);
		text-wrap: balance;
	}
	.hero__lead {
		margin: 0 0 var(--space-6, 32px);
		font-size: var(--fs-lg, 1.125rem);
		line-height: var(--lh-normal, 1.6);
		color: var(--text-2, #4a4943);
		max-width: var(--measure, 68ch);
	}
	.hero__preview {
		display: grid;
		gap: var(--space-4, 16px);
		scroll-margin-top: calc(var(--header-h, 4rem) + var(--space-4, 16px));
	}
	.hero__note {
		margin: 0;
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-2, #4a4943);
		line-height: var(--lh-normal, 1.6);
	}

	.site-form {
		margin-bottom: var(--space-5, 24px);
		max-width: 36rem;
	}
	.site-form__label {
		display: block;
		margin-bottom: var(--space-2, 8px);
		font-weight: var(--fw-semibold, 600);
		font-size: var(--fs-md, 1rem);
	}
	.site-form__row {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2, 8px);
	}
	.site-form__input {
		flex: 1 1 14rem;
		min-width: 0;
		min-height: var(--control-h, 2.75rem);
		padding: 0 var(--space-4, 16px);
		border: 1px solid var(--border-2, #8c887d);
		border-radius: var(--radius-md, 10px);
		background: var(--surface-1, #fff);
		color: var(--text-1, #1a1a17);
		font: inherit;
		font-size: var(--fs-md, 1rem);
		&::placeholder {
			color: var(--text-3, #6b6a63);
			font-size: var(--fs-sm, 0.875rem);
		}
		&:focus-visible {
			outline: none;
			border-color: var(--accent, #1f5c4f);
			box-shadow: var(--focus-ring, 0 0 0 3px #1f5c4f);
		}
		&[aria-invalid='true'] {
			border-color: var(--danger, #b42318);
		}
	}
	.site-form__error {
		margin: var(--space-2, 8px) 0 0;
		color: var(--danger, #b42318);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-medium, 500);
	}
	.site-form__hint {
		margin: var(--space-2, 8px) 0 0;
		color: var(--text-3, #6b6a63);
		font-size: var(--fs-sm, 0.875rem);
	}

	/* Sections */
	.section {
		padding-block: var(--space-9, 96px);
		@media (max-width: 40rem) {
			padding-block: var(--space-8, 64px);
		}
	}
	.section--alt {
		background: var(--surface-1, #fff);
		border-block: 1px solid var(--border-1, #e3dfd5);
	}
	.section__head {
		max-width: var(--container-sm, 40rem);
		margin: 0 auto var(--space-7, 48px);
		text-align: center;
	}
	.section__head--left {
		margin-inline: 0;
		text-align: left;
	}
	.section__title {
		margin: 0 0 var(--space-3, 12px);
		font-family: var(--font-display, Georgia, serif);
		font-size: var(--fs-3xl, 2.25rem);
		line-height: var(--lh-tight, 1.15);
		font-weight: var(--fw-semibold, 600);
		text-wrap: balance;
	}
	.section__lead {
		margin: 0;
		font-size: var(--fs-lg, 1.125rem);
		line-height: var(--lh-normal, 1.6);
		color: var(--text-2, #4a4943);
	}
	.caption {
		margin: var(--space-4, 16px) 0 0;
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-3, #6b6a63);
	}

	ul,
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
	}
	.card {
		background: var(--surface-0, #faf8f4);
		border: 1px solid var(--border-1, #e3dfd5);
		border-radius: var(--radius-lg, 16px);
		padding: var(--space-5, 24px);
	}
	.section:not(.section--alt) .card {
		background: var(--surface-1, #fff);
	}
	.card__title {
		margin: 0 0 var(--space-2, 8px);
		font-size: var(--fs-lg, 1.125rem);
		font-weight: var(--fw-semibold, 600);
		line-height: var(--lh-snug, 1.3);
	}
	.card__body {
		margin: 0;
		color: var(--text-2, #4a4943);
		line-height: var(--lh-normal, 1.6);
	}

	/* Chain */
	.chain {
		display: grid;
		gap: var(--space-6, 32px);
		@media (min-width: 52rem) {
			grid-template-columns: 18rem 1fr;
			gap: var(--space-8, 64px);
		}
	}
	.chain__trigger {
		@media (min-width: 52rem) {
			position: sticky;
			top: calc(var(--header-h, 4rem) + var(--space-5, 24px));
			align-self: start;
		}
	}
	.chain__label {
		margin: 0 0 var(--space-3, 12px);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-3, #6b6a63);
		text-transform: uppercase;
		letter-spacing: var(--tracking-caps, 0.06em);
	}
	.card--trigger {
		border-color: var(--accent, #1f5c4f);
		background: var(--accent-soft, #e6f0ec);
	}
	.chain__icon {
		display: inline-flex;
		margin-bottom: var(--space-3, 12px);
		color: var(--accent, #1f5c4f);
	}
	.steps {
		position: relative;
		display: grid;
		gap: var(--space-5, 24px);
		&::before {
			content: '';
			position: absolute;
			left: 1.125rem;
			top: var(--space-2, 8px);
			bottom: var(--space-2, 8px);
			width: 2px;
			background: var(--border-1, #e3dfd5);
		}
	}
	.steps__item {
		position: relative;
		display: grid;
		grid-template-columns: 2.25rem 1fr;
		gap: var(--space-4, 16px);
		align-items: start;
	}
	.steps__num {
		position: relative;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-full, 999px);
		background: var(--surface-1, #fff);
		border: 2px solid var(--accent, #1f5c4f);
		color: var(--accent, #1f5c4f);
		font-weight: var(--fw-bold, 700);
		font-size: var(--fs-sm, 0.875rem);
	}
	.steps__title {
		margin: var(--space-1, 4px) 0 var(--space-1, 4px);
		font-size: var(--fs-lg, 1.125rem);
		font-weight: var(--fw-semibold, 600);
	}
	.steps__body {
		margin: 0;
		color: var(--text-2, #4a4943);
		line-height: var(--lh-normal, 1.6);
		max-width: var(--measure, 68ch);
	}
	.also {
		margin-top: var(--space-8, 64px);
	}
	.also__title {
		margin: 0 0 var(--space-4, 16px);
		font-size: var(--fs-xl, 1.3rem);
		font-family: var(--font-display, Georgia, serif);
		font-weight: var(--fw-semibold, 600);
	}
	.also__list,
	.grid-3 {
		display: grid;
		gap: var(--space-4, 16px);
		@media (min-width: 48rem) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Languages */
	.lang-grid {
		display: grid;
		gap: var(--space-4, 16px);
		@media (min-width: 56rem) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Sender */
	.split {
		display: grid;
		gap: var(--space-7, 48px);
		align-items: center;
		@media (min-width: 56rem) {
			grid-template-columns: 1fr 1fr;
		}
		.section__head {
			margin-bottom: 0;
		}
	}
	.inbox {
		margin: 0;
		background: var(--surface-0, #faf8f4);
		border: 1px solid var(--border-1, #e3dfd5);
		border-radius: var(--radius-lg, 16px);
		padding: var(--space-4, 16px);
		box-shadow: var(--shadow-2, 0 4px 16px rgb(0 0 0 / 0.06));
	}
	.inbox__caption {
		margin-bottom: var(--space-3, 12px);
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-3, #6b6a63);
	}
	.inbox__list {
		display: grid;
		gap: var(--space-2, 8px);
	}
	.inbox__row {
		display: flex;
		gap: var(--space-3, 12px);
		align-items: flex-start;
		padding: var(--space-3, 12px);
		border-radius: var(--radius-md, 10px);
		background: var(--surface-1, #fff);
		border: 1px solid var(--border-1, #e3dfd5);
	}
	.inbox__row--dim {
		flex-direction: column;
		gap: var(--space-2, 8px);
		opacity: 0.6;
	}
	.bar {
		display: block;
		height: 0.5rem;
		border-radius: var(--radius-full, 999px);
		background: var(--surface-3, #e8e4da);
	}
	.bar--s { width: 30%; }
	.bar--m { width: 45%; }
	.bar--l { width: 80%; }
	.inbox__row--you {
		border-color: var(--accent, #1f5c4f);
		box-shadow: var(--shadow-1, 0 1px 2px rgb(0 0 0 / 0.06));
	}
	.inbox__avatar {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.25rem;
		height: 2.25rem;
		border-radius: var(--radius-full, 999px);
		background: var(--accent, #1f5c4f);
		color: var(--accent-contrast, #fff);
		font-weight: var(--fw-bold, 700);
	}
	.inbox__text {
		flex: 1;
		min-width: 0;
		p {
			margin: 0;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.inbox__from {
		font-size: var(--fs-sm, 0.875rem);
		span {
			color: var(--text-3, #6b6a63);
			margin-left: var(--space-1, 4px);
		}
	}
	.inbox__subject {
		font-weight: var(--fw-semibold, 600);
	}
	.inbox__snippet {
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-2, #4a4943);
	}
	.inbox__time {
		font-size: var(--fs-xs, 0.75rem);
		color: var(--text-3, #6b6a63);
	}

	/* Use cases */
	.uses {
		display: grid;
		gap: var(--space-1, 4px) var(--space-7, 48px);
		@media (min-width: 48rem) {
			grid-template-columns: 1fr 1fr;
		}
	}
	.uses__item {
		padding: var(--space-5, 24px) 0;
		border-top: 1px solid var(--border-1, #e3dfd5);
	}
	.uses__title {
		margin: 0 0 var(--space-2, 8px);
		font-family: var(--font-display, Georgia, serif);
		font-size: var(--fs-xl, 1.3rem);
		font-weight: var(--fw-semibold, 600);
	}
	.uses__body {
		margin: 0;
		color: var(--text-2, #4a4943);
		line-height: var(--lh-normal, 1.6);
	}

	/* Final CTA */
	.final {
		padding-block: var(--space-9, 96px);
	}
	.final__box {
		max-width: var(--container-md, 52rem);
		background: var(--surface-inverse, #1a1a17);
		color: var(--text-inverse, #faf8f4);
		border-radius: var(--radius-xl, 24px);
		padding: var(--space-8, 64px) var(--space-6, 32px);
		text-align: center;
	}
	.final__title {
		margin: 0 0 var(--space-3, 12px);
		font-family: var(--font-display, Georgia, serif);
		font-size: var(--fs-3xl, 2.25rem);
		font-weight: var(--fw-semibold, 600);
		line-height: var(--lh-tight, 1.15);
	}
	.final__body {
		margin: 0 auto var(--space-6, 32px);
		max-width: 34rem;
		font-size: var(--fs-lg, 1.125rem);
		line-height: var(--lh-normal, 1.6);
		opacity: 0.85;
	}
	.final__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-5, 24px);
	}

	/* Footer */
	.footer {
		background: var(--surface-1, #fff);
		border-top: 1px solid var(--border-1, #e3dfd5);
		padding-block: var(--space-8, 64px) var(--space-6, 32px);
		color: var(--text-2, #4a4943);
		font-size: var(--fs-sm, 0.875rem);
		a {
			color: var(--text-2, #4a4943);
			text-decoration: none;
			&:hover {
				color: var(--text-1, #1a1a17);
				text-decoration: underline;
			}
			&:focus-visible {
				outline: none;
				box-shadow: var(--focus-ring, 0 0 0 3px #1f5c4f);
				border-radius: var(--radius-sm, 6px);
			}
		}
		ul {
			display: grid;
			gap: var(--space-2, 8px);
		}
	}
	.footer__grid {
		display: grid;
		gap: var(--space-6, 32px);
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
	}
	.footer__about {
		grid-column: 1 / -1;
		@media (min-width: 48rem) {
			grid-column: auto;
			min-width: 16rem;
		}
	}
	.footer__logo {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2, 8px);
		font-weight: var(--fw-bold, 700);
		color: var(--text-1, #1a1a17) !important;
	}
	.footer__tagline {
		margin: var(--space-3, 12px) 0;
		max-width: 22rem;
		line-height: var(--lh-normal, 1.6);
	}
	.footer__contact {
		margin: 0;
	}
	.footer__h {
		margin: 0 0 var(--space-3, 12px);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-1, #1a1a17);
	}
	.footer__rights {
		margin-top: var(--space-7, 48px);
		color: var(--text-3, #6b6a63);
		font-size: var(--fs-xs, 0.75rem);
	}
</style>
