<script lang="ts">
	// AIBAN landing page, "mono" direction: white page, black ink, chapters like a keynote.
	// Owner: WS2. Previous versions: _deprecated/src/routes/+page.svelte, +page.v1-broadsheet.svelte
	import { tick } from 'svelte';
	import { goto } from '$app/navigation';
	import { t } from '$lib/i18n/translations';
	import en from '$lib/i18n/locales/en';
	import Faq from '$lib/ui/organisms/Faq.svelte';
	import Pricing from '$lib/ui/organisms/Pricing.svelte';
	import IssuePreview from '$lib/content/landing/IssuePreview.svelte';
	import HistoryTimeline from '$lib/content/landing/HistoryTimeline.svelte';
	import ChapterRail from '$lib/content/landing/ChapterRail.svelte';
	import { reveal } from '$lib/content/landing/reveal';
	import {
		normalizeSite,
		brandFromHost,
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
	const brandName = $derived(host ? brandFromHost(host) : '');

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

<div class="mono">
	<ChapterRail labels={L.rail.chapters} navLabel={L.rail.label} />

	<main id="main-content">
		<!-- 01 Cold open -->
		<section id="start" data-chapter class="open" aria-labelledby="hero-title">
			<div class="wrap open__inner">
				<p class="open__kicker">{L.hero.eyebrow}</p>
				<h1 id="hero-title" class="open__title">{L.display.title}</h1>
				<p class="open__lead">{L.hero.lead}</p>

				<form class="site-form" novalidate onsubmit={onPreview}>
					<label for="site-input" class="visually-hidden">{L.hero.formLabel}</label>
					<div class="site-form__pill" class:has-error={!!formError}>
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

				<a class="link-more" href="#how-it-works">{L.hero.secondaryCta} <span aria-hidden="true">&#8595;</span></a>
			</div>

			<div class="wrap open__stage" bind:this={previewEl}>
				<div class="open__device">
					<IssuePreview host={host} labels={L.preview} bind:language={previewLanguage} idPrefix="hero" />
				</div>
				<div class="open__after">
					<p class="open__note">{L.preview.note}</p>
					<a class="btn btn--primary" href={startHref} onclick={onStart}>
						{host ? fill(L.preview.startCta, host) : L.preview.startCtaGeneric}
					</a>
				</div>
				<p class="visually-hidden" aria-live="polite">{announce}</p>
			</div>
		</section>

		<!-- 02 Statement -->
		<section id="why" data-chapter class="statement" aria-label={L.rail.chapters[1]}>
			<div class="wrap">
				<p class="statement__text">
					{#each L.statement.lines as line}
						<span class="statement__line">{line} </span>
					{/each}
				</p>
			</div>
		</section>

		<!-- 03 Languages -->
		<section id="languages" data-chapter class="chapter" aria-labelledby="lang-title">
			<div class="wrap">
				<header class="chapter__head" use:reveal>
					<p class="chapter__eyebrow">{L.languages.eyebrow}</p>
					<h2 id="lang-title" class="chapter__title">{L.languages.title}</h2>
					<p class="chapter__lead">{L.languages.body}</p>
				</header>
				<div class="lang-grid">
					{#each SAMPLE_LANGUAGES as code, i}
						<div class="lang-grid__item" use:reveal style:--i={i}>
							<IssuePreview host={host} labels={L.preview} switchable={false} language={code} compact idPrefix="lang-{code}" />
						</div>
					{/each}
				</div>
				<p class="caption">{L.languages.sampleNote}</p>
			</div>
		</section>

		<!-- 04 Visual history: the life of one issue -->
		<div data-chapter id="how-it-works-chapter" class="chapter-anchor">
			<HistoryTimeline
				id="how-it-works"
				eyebrow={L.history.eyebrow}
				title={L.history.title}
				lead={L.history.lead}
				note={L.history.note}
				items={L.history.items}
				progressLabel={L.history.progressLabel}
			/>
		</div>

		<section class="also" aria-labelledby="also-title">
			<div class="wrap">
				<h3 id="also-title" class="also__title">{L.chain.alsoTitle}</h3>
				<ul class="also__list">
					{#each L.chain.also as item, i}
						<li use:reveal style:--i={i}>
							<p class="also__item-title">{item.title}</p>
							<p class="also__item-body">{item.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- 05 Sender -->
		<section id="sender" data-chapter class="chapter chapter--tint" aria-labelledby="sender-title">
			<div class="wrap split">
				<header class="chapter__head chapter__head--left" use:reveal>
					<p class="chapter__eyebrow">{L.sender.eyebrow}</p>
					<h2 id="sender-title" class="chapter__title">{L.sender.title}</h2>
					<p class="chapter__lead">{L.sender.body}</p>
				</header>
				<figure class="inbox" use:reveal>
					<figcaption class="inbox__caption">{L.sender.inboxLabel}</figcaption>
					<ul class="inbox__list">
						<li class="inbox__row inbox__row--dim" aria-hidden="true"><span class="bar bar--s"></span><span class="bar bar--l"></span></li>
						<li class="inbox__row inbox__row--you">
							<span class="inbox__avatar" aria-hidden="true">{(host ?? 'y').charAt(0).toUpperCase()}</span>
							<div class="inbox__text">
								<p class="inbox__from"><strong>{host ? brandName : L.sender.inboxFrom}</strong></p>
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

		<!-- 06 Grow -->
		<section id="grow" data-chapter class="chapter" aria-labelledby="grow-title">
			<div class="wrap">
				<header class="chapter__head" use:reveal>
					<p class="chapter__eyebrow">{L.grow.eyebrow}</p>
					<h2 id="grow-title" class="chapter__title">{L.grow.title}</h2>
				</header>
				<ul class="tiles">
					{#each L.grow.items as item, i}
						<li class="tile" use:reveal style:--i={i}>
							<p class="tile__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
							<h3 class="tile__title">{item.title}</h3>
							<p class="tile__body">{item.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- 07 Use cases -->
		<section id="who" data-chapter class="chapter chapter--tint" aria-labelledby="uses-title">
			<div class="wrap">
				<header class="chapter__head chapter__head--left" use:reveal>
					<p class="chapter__eyebrow">{L.useCases.eyebrow}</p>
					<h2 id="uses-title" class="chapter__title">{L.useCases.title}</h2>
					<p class="chapter__lead">{L.useCases.lead}</p>
				</header>
				<ul class="uses">
					{#each L.useCases.items as item}
						<li class="uses__item" use:reveal>
							<h3 class="uses__title">{item.title}</h3>
							<p class="uses__body">{item.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- 08 Offer: calm, no scroll effects near money -->
		<section id="pricing" data-chapter class="chapter offer" aria-labelledby="pricing-title">
			<div class="wrap">
				<header class="chapter__head">
					<p class="chapter__eyebrow">{L.pricingIntro.eyebrow}</p>
					<h2 id="pricing-title" class="chapter__title">{L.pricingIntro.title}</h2>
					<p class="chapter__lead">{L.pricingIntro.lead}</p>
				</header>
				<Pricing showHeader={false} headingLevel={2} />
			</div>
		</section>

		<!-- 09 FAQ -->
		<section id="faq" data-chapter class="chapter chapter--tint">
			<div class="wrap wrap--narrow">
				<Faq items={L.faq} title={L.faqTitle} idPrefix="landing-faq" />
			</div>
		</section>

		<!-- 10 Finale -->
		<section id="begin" data-chapter class="finale" aria-labelledby="final-title">
			<div class="wrap finale__inner">
				<h2 id="final-title" class="finale__title">{L.finalCta.title}</h2>
				<p class="finale__body">{L.finalCta.body}</p>
				<div class="finale__actions">
					<a class="btn btn--primary btn--lg" href={startHref} onclick={onStart}>{L.finalCta.cta}</a>
					<a class="link-more" href="/help">{L.finalCta.secondary} <span aria-hidden="true">&#8250;</span></a>
				</div>
			</div>
		</section>
	</main>

</div>

<style lang="scss">
	@use '../lib/content/landing/mono.scss' as mono;

	.mono {
		@include mono.mono-theme;
		font-family: var(--font-body);
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		overflow-x: clip;
		/* The root layout may be a flex or grid container: never let min-content widen the page. */
		width: 100%;
		min-width: 0;
		max-width: 100vw;
	}
	.mono,
	.mono :global(*),
	.mono :global(*::before),
	.mono :global(*::after) {
		box-sizing: border-box;
	}
	/* The global reset does not zero the body margin yet (requests/1.md). */
	:global(body:has(.mono)) {
		margin: 0;
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
		background: var(--surface-inverse);
		color: var(--text-inverse);
		border-radius: var(--radius-full, 999px);
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

	/* Buttons: one primary (black pill), one tertiary text link. */
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: var(--control-h, 2.75rem);
		padding: 0 var(--space-5, 24px);
		border: 0;
		border-radius: var(--radius-full, 999px);
		font: inherit;
		font-size: var(--fs-md, 1rem);
		font-weight: var(--fw-medium, 500);
		letter-spacing: -0.01em;
		text-decoration: none;
		cursor: pointer;
		white-space: nowrap;
		position: relative;
		isolation: isolate;
		transition:
			background-color var(--dur-fast, 120ms) var(--ease-out),
			transform var(--t-out, 200ms) var(--ease-out);
		/* State layer: hover 8%, focus 10%, pressed 12% of the label color. */
		&::before {
			content: '';
			position: absolute;
			inset: 0;
			border-radius: inherit;
			background: currentColor;
			opacity: 0;
			z-index: -1;
			pointer-events: none;
			transition: opacity var(--t-out, 200ms) var(--ease-out);
		}
		@media (hover: hover) and (pointer: fine) {
			&:hover::before {
				opacity: 0.08;
				transition-duration: var(--t-in, 120ms);
			}
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
			&::before {
				opacity: 0.1;
			}
		}
		&:active {
			transform: scale(0.97);
			transition-duration: 60ms;
			&::before {
				opacity: 0.12;
				transition-duration: 0ms;
			}
		}
		@media (prefers-reduced-motion: reduce) {
			&:active {
				transform: none;
			}
		}
	}
	.btn--primary {
		background: var(--accent);
		color: var(--accent-contrast);
		&:hover {
			background: var(--accent-hover);
		}
	}
	.btn--lg {
		min-height: 3.5rem;
		padding-inline: var(--space-7, 48px);
		font-size: var(--fs-lg, 1.125rem);
	}
	.link-more {
		display: inline-flex;
		gap: var(--space-1, 4px);
		font-size: var(--fs-md, 1rem);
		color: var(--text-1);
		text-decoration: none;
		&:hover {
			text-decoration: underline;
			text-underline-offset: 0.2em;
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
			border-radius: var(--radius-sm, 6px);
		}
	}

	/* 01 Cold open */
	.open {
		padding-top: calc(var(--header-h, 4rem) + clamp(3rem, 12vh, 8rem));
		padding-bottom: clamp(4rem, 12vh, 8rem);
		text-align: center;
	}
	.open__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.open__kicker {
		margin: 0 0 var(--space-4, 16px);
		font-size: var(--fs-md, 1rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-3);
	}
	.open__title {
		margin: 0;
		max-width: 13ch;
		font-family: var(--font-display);
		font-size: clamp(3rem, 8.4vw, 7.75rem);
		font-weight: var(--fw-bold, 700);
		line-height: 0.98;
		letter-spacing: -0.045em;
		color: var(--text-1);
		text-wrap: balance;
	}
	.open__lead {
		width: 100%;
		margin: var(--space-6, 32px) 0 var(--space-7, 48px);
		max-width: 38rem;
		font-size: clamp(1.125rem, 1rem + 0.5vw, 1.375rem);
		line-height: 1.5;
		letter-spacing: -0.01em;
		color: var(--text-2);
		text-wrap: pretty;
	}
	.site-form {
		width: 100%;
		max-width: 34rem;
		margin-bottom: var(--space-5, 24px);
	}
	.site-form__pill {
		display: flex;
		align-items: center;
		gap: var(--space-2, 8px);
		padding: 0.375rem 0.375rem 0.375rem var(--space-5, 24px);
		background: var(--surface-2);
		border: 1px solid transparent;
		border-radius: var(--radius-full, 999px);
		transition:
			border-color var(--dur-fast, 120ms) var(--ease-out),
			background-color var(--dur-fast, 120ms) var(--ease-out);
		&:focus-within {
			background: var(--surface-0);
			border-color: var(--border-2);
			box-shadow: var(--shadow-2);
		}
		&.has-error {
			border-color: var(--danger, #b42318);
		}
		@media (max-width: 30rem) {
			flex-direction: column;
			align-items: stretch;
			border-radius: var(--radius-xl, 24px);
			padding: var(--space-2, 8px);
			.btn {
				width: 100%;
			}
		}
	}
	.site-form__input {
		flex: 1;
		min-width: 0;
		min-height: var(--control-h, 2.75rem);
		border: 0;
		background: transparent;
		color: var(--text-1);
		font: inherit;
		font-size: var(--fs-lg, 1.125rem);
		letter-spacing: -0.01em;
		outline: none;
		@media (max-width: 30rem) {
			padding-inline: var(--space-3, 12px);
			text-align: center;
		}
		&::placeholder {
			color: var(--text-3);
			font-size: var(--fs-md, 1rem);
		}
	}
	.site-form__error {
		margin: var(--space-3, 12px) 0 0;
		color: var(--danger, #b42318);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-medium, 500);
	}
	.site-form__hint {
		margin: var(--space-3, 12px) 0 0;
		color: var(--text-3);
		font-size: var(--fs-sm, 0.875rem);
	}
	.open__stage {
		margin-top: clamp(4rem, 10vh, 7rem);
		display: grid;
		justify-items: center;
		gap: var(--space-6, 32px);
		scroll-margin-top: calc(var(--header-h, 4rem) + var(--space-4, 16px));
	}
	.open__device {
		width: 100%;
		max-width: 44rem;
		transform-origin: 50% 0%;
	}
	.open__after {
		display: grid;
		justify-items: center;
		gap: var(--space-4, 16px);
		max-width: 34rem;
	}
	.open__note {
		margin: 0;
		font-size: var(--fs-sm, 0.875rem);
		line-height: 1.5;
		color: var(--text-3);
	}

	/* 02 Statement: lines light up as they scroll into the middle of the screen. */
	.statement {
		padding-block: clamp(6rem, 25vh, 16rem);
	}
	.statement__line {
		display: block;
	}
	.statement__text {
		margin: 0;
		max-width: 22ch;
		font-family: var(--font-display);
		font-size: clamp(2rem, 5.2vw, 4.5rem);
		font-weight: var(--fw-semibold, 600);
		line-height: 1.08;
		letter-spacing: -0.035em;
		color: var(--text-1);
		text-wrap: balance;
	}

	/* Chapters */
	.chapter {
		padding-block: clamp(6rem, 18vh, 11rem);
	}
	.chapter--tint {
		background: var(--surface-2);
	}
	.chapter__head {
		max-width: 46rem;
		margin: 0 auto clamp(3rem, 8vh, 5rem);
		text-align: center;
	}
	.chapter__head--left {
		margin-inline: 0;
		text-align: left;
	}
	.chapter__eyebrow {
		margin: 0 0 var(--space-3, 12px);
		font-size: var(--fs-md, 1rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-3);
	}
	.chapter__title {
		margin: 0 0 var(--space-5, 24px);
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 5.4vw, 4.75rem);
		font-weight: var(--fw-bold, 700);
		line-height: 1.02;
		letter-spacing: -0.04em;
		color: var(--text-1);
		text-wrap: balance;
	}
	.chapter__lead {
		margin: 0;
		font-size: clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem);
		line-height: 1.55;
		letter-spacing: -0.01em;
		color: var(--text-2);
		text-wrap: pretty;
	}
	.caption {
		margin: var(--space-5, 24px) 0 0;
		text-align: center;
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-3);
	}
	ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	/* 03 Languages */
	.lang-grid {
		display: grid;
		gap: var(--space-5, 24px);
		@media (min-width: 56rem) {
			grid-template-columns: repeat(3, 1fr);
		}
	}

	/* Also runs when */
	.chapter-anchor {
		scroll-margin-top: 0;
	}
	.also {
		padding-block: var(--space-8, 64px) clamp(6rem, 16vh, 10rem);
		border-top: 1px solid var(--border-1);
	}
	.also__title {
		margin: 0 0 var(--space-6, 32px);
		font-size: var(--fs-xl, 1.4rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.02em;
	}
	.also__list {
		display: grid;
		gap: var(--space-6, 32px);
		@media (min-width: 48rem) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.also__item-title {
		margin: 0 0 var(--space-2, 8px);
		font-weight: var(--fw-semibold, 600);
		font-size: var(--fs-lg, 1.125rem);
	}
	.also__item-body {
		margin: 0;
		color: var(--text-2);
		line-height: 1.55;
	}

	/* 05 Sender */
	.split {
		display: grid;
		gap: var(--space-8, 64px);
		align-items: center;
		@media (min-width: 56rem) {
			grid-template-columns: 7fr 5fr;
		}
		.chapter__head {
			margin-bottom: 0;
		}
	}
	.inbox {
		margin: 0;
		background: var(--surface-0);
		border-radius: var(--radius-xl, 24px);
		padding: var(--space-5, 24px);
		box-shadow: var(--shadow-3);
	}
	.inbox__caption {
		margin-bottom: var(--space-4, 16px);
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-3);
	}
	.inbox__list {
		display: grid;
		gap: var(--space-2, 8px);
	}
	.inbox__row {
		display: flex;
		gap: var(--space-3, 12px);
		align-items: flex-start;
		padding: var(--space-4, 16px);
		border-radius: var(--radius-lg, 16px);
		background: var(--surface-1);
	}
	.inbox__row--dim {
		flex-direction: column;
		gap: var(--space-2, 8px);
		opacity: 0.55;
	}
	.bar {
		display: block;
		height: 0.5rem;
		border-radius: var(--radius-full, 999px);
		background: var(--surface-3);
	}
	.bar--s { width: 30%; }
	.bar--m { width: 45%; }
	.bar--l { width: 80%; }
	.inbox__row--you {
		background: var(--surface-0);
		box-shadow: 0 0 0 1px var(--border-1), var(--shadow-2);
	}
	.inbox__avatar {
		flex: none;
		display: grid;
		place-items: center;
		width: 2.5rem;
		height: 2.5rem;
		border-radius: var(--radius-full, 999px);
		background: var(--surface-inverse);
		color: var(--text-inverse);
		font-weight: var(--fw-semibold, 600);
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
	}
	.inbox__subject {
		font-weight: var(--fw-semibold, 600);
	}
	.inbox__snippet {
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-2);
	}
	.inbox__time {
		font-size: var(--fs-xs, 0.75rem);
		color: var(--text-3);
	}

	/* 06 Grow */
	.tiles {
		display: grid;
		gap: var(--space-5, 24px);
		@media (min-width: 48rem) {
			grid-template-columns: repeat(3, 1fr);
		}
	}
	.tile {
		background: var(--surface-2);
		border-radius: var(--radius-xl, 24px);
		padding: var(--space-7, 48px) var(--space-6, 32px);
		min-height: 18rem;
		display: flex;
		flex-direction: column;
	}
	.tile__num {
		margin: 0 0 auto;
		font-size: var(--fs-sm, 0.875rem);
		font-variant-numeric: tabular-nums;
		color: var(--text-3);
	}
	.tile__title {
		margin: var(--space-7, 48px) 0 var(--space-2, 8px);
		font-family: var(--font-display);
		font-size: var(--fs-2xl, 1.75rem);
		font-weight: var(--fw-bold, 700);
		letter-spacing: -0.03em;
	}
	.tile__body {
		margin: 0;
		color: var(--text-2);
		line-height: 1.55;
	}

	/* 07 Use cases: an editorial list with type hanging left. */
	.uses__item {
		display: grid;
		gap: var(--space-2, 8px) var(--space-7, 48px);
		padding-block: var(--space-6, 32px);
		border-top: 1px solid var(--border-1);
		@media (min-width: 48rem) {
			grid-template-columns: 5fr 7fr;
			align-items: baseline;
		}
		&:last-child {
			border-bottom: 1px solid var(--border-1);
		}
	}
	.uses__title {
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(1.5rem, 1.2rem + 1.2vw, 2.25rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.03em;
		line-height: 1.1;
	}
	.uses__body {
		margin: 0;
		font-size: var(--fs-lg, 1.125rem);
		color: var(--text-2);
		line-height: 1.55;
	}

	/* 10 Finale */
	.finale {
		padding-top: clamp(7rem, 22vh, 14rem);
		text-align: center;
		overflow: hidden;
	}
	.finale__inner {
		display: grid;
		justify-items: center;
	}
	.finale__title {
		margin: 0 0 var(--space-4, 16px);
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 6vw, 5.5rem);
		font-weight: var(--fw-bold, 700);
		letter-spacing: -0.045em;
		line-height: 1;
	}
	.finale__body {
		margin: 0 0 var(--space-7, 48px);
		max-width: 32rem;
		font-size: clamp(1.0625rem, 1rem + 0.35vw, 1.3125rem);
		line-height: 1.5;
		color: var(--text-2);
	}
	.finale__actions {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: var(--space-6, 32px);
	}

	/* ---------- Motion (decorative only, final states without it) ---------- */
	@media (prefers-reduced-motion: no-preference) {
		/* Reveal on enter: opacity and transform only, 60 ms stagger. */
		.mono :global(.reveal-ready) {
			opacity: 0;
			transform: translate3d(0, 28px, 0);
		}
		.mono :global(.reveal-ready.is-in) {
			opacity: 1;
			transform: none;
			transition:
				opacity var(--dur-chapter) var(--ease-out),
				transform var(--dur-chapter) var(--ease-out);
			transition-delay: calc(var(--i, 0) * var(--stagger));
		}

		/* Hero text arrives once, as real HTML (no wait for LCP). */
		.open__kicker,
		.open__title,
		.open__lead,
		.site-form,
		.link-more {
			animation: rise var(--dur-chapter) var(--ease-out) both;
		}
		.open__title { animation-delay: 60ms; }
		.open__lead { animation-delay: 120ms; }
		.site-form { animation-delay: 180ms; }
		.open__inner .link-more { animation-delay: 240ms; }

		@supports (animation-timeline: view()) {
			/* The issue rises and settles as it scrolls in, like a product reveal. */
			.open__device {
				animation: settle linear both;
				animation-timeline: view();
				animation-range: entry 0% cover 45%;
			}
			/* Statement lines go from grey to ink as they reach the reading line. */
			.statement__line {
				animation: ink linear both;
				animation-timeline: view();
				animation-range: entry 70% cover 55%;
			}
		}
	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}
	}
	@keyframes settle {
		from {
			opacity: 0.4;
			transform: translate3d(0, 48px, 0) scale(0.92);
		}
		to {
			opacity: 1;
			transform: none;
		}
	}
	@keyframes ink {
		from {
			color: var(--text-muted-large);
		}
		to {
			color: var(--text-1);
		}
	}
</style>
