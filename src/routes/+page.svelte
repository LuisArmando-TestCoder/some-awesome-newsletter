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
	import LivePreview from '$lib/content/landing/LivePreview.svelte';
	import { language as uiLanguage } from '$lib/stores/language.store';
	import HistoryTimeline from '$lib/content/landing/HistoryTimeline.svelte';
	import ChapterRail from '$lib/content/landing/ChapterRail.svelte';
	import DashboardShowcase from '$lib/content/showcase/DashboardShowcase.svelte';
	import { fill as fillShowcase } from '$lib/content/showcase/types';
	import { reveal } from '$lib/content/landing/reveal';
	import LanguageMarquee from '$lib/content/landing/LanguageMarquee.svelte';
	import {
		heroFx,
		statementFx,
		dealFx,
		flapFx,
		senderFx,
		stackFx,
		planeFx,
		convergeFx,
		ruledFx,
		irisFx,
		growthFx,
		magnetic,
		words
	} from '$lib/content/landing/scrollFx';
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
	// Sample dashboards (placeholder data, labelled as such): one example business per use case.
	const SC = $derived(($t as typeof en).showcase ?? en.showcase);
	let useCase = $state(0);
	let useScene = $state(0);
	const useExample = $derived(SC.examples[useCase % SC.examples.length]);
	function pickUseCase(i: number) {
		useCase = i;
		useScene = 0;
	}
	function onUseCaseKey(e: KeyboardEvent, i: number) {
		const n = L.useCases.items.length;
		let to = -1;
		if (e.key === 'ArrowDown' || e.key === 'ArrowRight') to = (i + 1) % n;
		else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') to = (i - 1 + n) % n;
		else if (e.key === 'Home') to = 0;
		else if (e.key === 'End') to = n - 1;
		if (to < 0) return;
		e.preventDefault();
		pickUseCase(to);
		document.getElementById(`usecase-tab-${to}`)?.focus();
	}
	const GROW_SCENES = ['signup', 'blog', 'import'] as const;

	let siteInput = $state('');
	let host = $state<string | null>(null);
	let formError = $state('');
	let announce = $state('');
	let previewLanguage = $state<SampleLanguage>('en');
	let previewEl = $state<HTMLElement | null>(null);
	// After a site is entered the hero shows a real issue written from it (LivePreview);
	// the placeholder layout comes back only if the visitor asks for it after an error.
	let showSampleLayout = $state(false);
	const LIVE = $derived(L.live ?? en.landing.live);
	const MARQUEE = $derived(L.marquee ?? en.landing.marquee);
	// WS15: the automatic blog on the owner's domain is the main sale.
	const BS = $derived(L.blogSite ?? en.landing.blogSite);
	const BS_WEEKS = 52;
	const BS_LANGS = ['EN', 'ES', 'DE'];
	const bsHost = $derived(`blog.${host ?? BS.urlHost}`);
	// Real space between split words, so the heading still reads as a sentence to screen readers.
	const SP = ' ';

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
		showSampleLayout = false;
		announce = fill(LIVE.loadingTitle, next);
		await tick();
		// Always bring the preview into view: it sits below the fold on every screen size.
		if (previewEl) {
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
		<section id="start" data-chapter class="open" aria-labelledby="hero-title" use:heroFx>
			<div class="wrap open__inner">
				<p class="open__kicker">{L.hero.eyebrow}</p>
				<h1 id="hero-title" class="open__title">
					{#each words(L.display.title) as w, i (i)}<span class="w" style:--i={i}><span class="w__in">{w}</span></span>{SP}{/each}
				</h1>
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
				<div class="open__device" class:is-live={host && !showSampleLayout}>
					{#if host && !showSampleLayout}
						<LivePreview
							{host}
							labels={LIVE}
							meta={L.preview}
							uiLanguage={$uiLanguage}
							onfallback={() => (showSampleLayout = true)}
						/>
					{:else}
						<IssuePreview host={host} labels={L.preview} bind:language={previewLanguage} idPrefix="hero" />
					{/if}
				</div>
				<div class="open__after">
					<p class="open__note">{host && !showSampleLayout ? fill(LIVE.readyNote, host) : L.preview.note}</p>
					<a class="btn btn--primary" href={startHref} onclick={onStart}>
						{host ? fill(L.preview.startCta, host) : L.preview.startCtaGeneric}
					</a>
				</div>
				<p class="visually-hidden" aria-live="polite">{announce}</p>
			</div>
		</section>

		<!-- 02 Statement -->
		<section id="why" data-chapter class="statement" aria-label={L.rail.chapters[1]} use:statementFx>
			<div class="statement__stage">
				<div class="wrap">
					<p class="visually-hidden">{L.statement.lines.join(' ')}</p>
					<p class="statement__text" aria-hidden="true">
						{#each L.statement.lines as line, li (li)}
							<span class="statement__line">{#each words(line) as w, wi (wi)}<span class="w">{w}</span>{SP}{/each}</span>
						{/each}
					</p>
				</div>
			</div>
		</section>

		<LanguageMarquee label={MARQUEE.label} pause={MARQUEE.pause} play={MARQUEE.play} />

		<!-- 03 Your blog, on your domain (WS15): the main sale -->
		<section id="your-blog" data-chapter class="chapter blogsite" aria-labelledby="blogsite-title" use:growthFx>
			<div class="wrap blogsite__grid">
				<header class="chapter__head chapter__head--left blogsite__head" use:reveal>
					<p class="chapter__eyebrow">{BS.eyebrow}</p>
					<h2 id="blogsite-title" class="chapter__title">{BS.title}</h2>
					<p class="chapter__lead">{BS.lead}</p>
					<ul class="blogsite__points">
						{#each BS.points as pt (pt.title)}
							<li>
								<h3 class="blogsite__point-title">{pt.title}</h3>
								<p class="blogsite__point-body">{pt.body}</p>
							</li>
						{/each}
					</ul>
					<a class="link-more" href="#start">{BS.cta} <span aria-hidden="true">&#8593;</span></a>
				</header>
				<figure class="site" data-weeks={BS_WEEKS} data-per-week={BS_LANGS.length} data-week-label={BS.weekLabel}>
					<div class="site__bar" aria-hidden="true">
						<span class="site__dots"><span></span><span></span><span></span></span>
						<span class="site__url">
							<svg class="site__lock" viewBox="0 0 16 16" width="12" height="12"><path d="M4.5 7V5a3.5 3.5 0 0 1 7 0v2M3.5 7h9v6.5h-9z" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" /></svg>
							<span class="site__typed">{bsHost}</span>
						</span>
					</div>
					<div class="site__body" aria-hidden="true">
						<div class="site__stats">
							<p class="site__week" data-week>{BS.weekLabel.replace('{n}', String(BS_WEEKS))}</p>
							<p class="site__pages"><span class="site__count" data-pages>{BS_WEEKS * BS_LANGS.length}</span> <span>{BS.pagesLabel}</span></p>
						</div>
						<ol class="site__feed">
							{#each Array.from({ length: 9 }, (_, i) => i) as i (i)}
								<li class="site__row">
									<span class="site__thumb"></span>
									<span class="site__lines"><span class="bar bar--l"></span><span class="bar bar--m"></span></span>
									<span class="site__lang">{BS_LANGS[i % BS_LANGS.length]}</span>
								</li>
							{/each}
						</ol>
					</div>
					<figcaption class="caption site__caption">
						<span class="visually-hidden">{BS.weekLabel.replace('{n}', String(BS_WEEKS))}: {BS_WEEKS * BS_LANGS.length} {BS.pagesLabel}. </span>{BS.exampleNote}
					</figcaption>
				</figure>
			</div>
		</section>

		<!-- 03 Languages -->
		<section id="languages" data-chapter class="chapter" aria-labelledby="lang-title" use:dealFx>
			<div class="wrap">
				<header class="chapter__head" use:reveal>
					<p class="chapter__eyebrow">{L.languages.eyebrow}</p>
					<h2 id="lang-title" class="chapter__title">{L.languages.title}</h2>
					<p class="chapter__lead">{L.languages.body}</p>
				</header>
				<div class="lang-grid">
					{#each SAMPLE_LANGUAGES as code, i}
						<div class="lang-grid__item" style:--i={i}>
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

		<section class="also" aria-labelledby="also-title" use:flapFx>
			<span class="also__rule" aria-hidden="true"></span>
			<div class="wrap">
				<h3 id="also-title" class="also__title">{L.chain.alsoTitle}</h3>
				<ul class="also__list">
					{#each L.chain.also as item, i}
						<li style:--i={i}>
							<p class="also__item-title">{item.title}</p>
							<p class="also__item-body">{item.body}</p>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- 05 Sender -->
		<section id="sender" data-chapter class="chapter chapter--tint" aria-labelledby="sender-title" use:senderFx>
			<div class="wrap split">
				<header class="chapter__head chapter__head--left" use:reveal>
					<p class="chapter__eyebrow">{L.sender.eyebrow}</p>
					<h2 id="sender-title" class="chapter__title">{L.sender.title}</h2>
					<p class="chapter__lead">{L.sender.body}</p>
				</header>
				<figure class="inbox">
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
		<section id="grow" data-chapter class="chapter" aria-labelledby="grow-title" use:stackFx>
			<div class="wrap">
				<header class="chapter__head" use:reveal>
					<p class="chapter__eyebrow">{L.grow.eyebrow}</p>
					<h2 id="grow-title" class="chapter__title">{L.grow.title}</h2>
				</header>
				<ul class="tiles">
					{#each L.grow.items as item, i}
						<li class="tile" style:--i={i}>
							{#if GROW_SCENES[i]}
								<DashboardShowcase
									class="tile__demo"
									example={SC.examples[0]}
									scenes={[GROW_SCENES[i]]}
									variant="bare"
									duration={7000}
									label="{item.title}. {SC.sampleBadge}"
								/>
							{/if}
							<div class="tile__text">
								<p class="tile__num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</p>
								<h3 class="tile__title">{item.title}</h3>
								<p class="tile__body">{item.body}</p>
							</div>
						</li>
					{/each}
				</ul>
			</div>
		</section>

		<!-- 07 Use cases -->
		<section id="who" data-chapter class="chapter chapter--tint" aria-labelledby="uses-title" use:planeFx>
			<div class="wrap">
				<header class="chapter__head chapter__head--left" use:reveal>
					<p class="chapter__eyebrow">{L.useCases.eyebrow}</p>
					<h2 id="uses-title" class="chapter__title">{L.useCases.title}</h2>
					<p class="chapter__lead">{L.useCases.lead}</p>
				</header>
				<div class="uses">
					<div class="uses__list" role="tablist" aria-orientation="vertical" aria-label={SC.examplesLabel}>
						{#each L.useCases.items as item, i (item.title)}
							<button
								id="usecase-tab-{i}"
								type="button"
								role="tab"
								class="uses__tab"
								aria-selected={i === useCase}
								aria-controls="usecase-panel"
								tabindex={i === useCase ? 0 : -1}
								onclick={() => pickUseCase(i)}
								onkeydown={(e) => onUseCaseKey(e, i)}
							>
								<span class="uses__title">{item.title}</span>
								<span class="uses__body">{item.body}</span>
							</button>
						{/each}
					</div>
					<div id="usecase-panel" class="uses__panel" role="tabpanel" aria-labelledby="usecase-tab-{useCase}">
						<DashboardShowcase
							example={useExample}
							scenes={['home', 'issue', 'reports']}
							bind:scene={useScene}
							onloop={() => pickUseCase((useCase + 1) % L.useCases.items.length)}
							caption={fillShowcase(SC.caption, { business: useExample.business, kind: useExample.kind })}
						/>
					</div>
				</div>
			</div>
		</section>

		<!-- 08 Offer: calm, no scroll effects near money -->
		<section id="pricing" data-chapter class="chapter offer" aria-labelledby="pricing-title" use:convergeFx>
			<div class="wrap">
				<header class="chapter__head">
					<p class="chapter__eyebrow">{L.pricingIntro.eyebrow}</p>
					<h2 id="pricing-title" class="chapter__title">
						{#each words(L.pricingIntro.title) as w, wi (wi)}<span class="w">{w}</span>{SP}{/each}
					</h2>
					<p class="chapter__lead">{L.pricingIntro.lead}</p>
				</header>
				<Pricing showHeader={false} headingLevel={2} />
			</div>
		</section>

		<!-- 09 FAQ -->
		<section id="faq" data-chapter class="chapter chapter--tint faq-chapter" aria-labelledby="landing-faq-title" use:ruledFx>
			<div class="wrap wrap--narrow">
				<h2 id="landing-faq-title" class="faq-head">
					<span class="visually-hidden">{L.faqTitle}</span>
					<span aria-hidden="true">
						{#each words(L.faqTitle) as w, wi (wi)}<span class="faq-head__w">{#each Array.from(w) as c, j (j)}<span class="ch" data-o={j - (Array.from(w).length - 1) / 2}>{c}</span>{/each}</span>{SP}{/each}
					</span>
				</h2>
				<Faq items={L.faq} title="" idPrefix="landing-faq" />
			</div>
		</section>

		<!-- 10 Finale -->
		<section id="begin" data-chapter class="finale" aria-labelledby="final-title" use:irisFx>
			<div class="finale__bg" aria-hidden="true"></div>
			<div class="wrap finale__inner">
				<h2 id="final-title" class="finale__title">{L.finalCta.title}</h2>
				<p class="finale__body">{L.finalCta.body}</p>
				<div class="finale__actions">
					<a class="btn btn--primary btn--lg btn--magnet" href={startHref} onclick={onStart} data-cta="finale" use:magnetic>
						<span class="btn__label">{L.finalCta.cta}</span>
					</a>
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
		.w {
			display: inline-block;
			/* Mask for the load reveal; the padding keeps descenders inside it. */
			overflow: clip;
			padding-bottom: 0.1em;
			margin-bottom: -0.1em;
			vertical-align: top;
		}
		.w__in {
			display: inline-block;
		}
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
	/* The live issue is read, not admired: no scroll effect on it. */
	.open__device.is-live {
		max-width: 46rem;
		animation: none !important;
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

	/* 02 Statement. With motion, the section grows tall and the sentence holds the centre of
	   the screen while each word comes into focus (scrollFx statementFx). */
	.statement {
		padding-block: clamp(6rem, 25vh, 16rem);
	}
	.statement:global(.is-fx) {
		height: 280svh;
		padding-block: 0;
	}
	.statement:global(.is-fx) .statement__stage {
		position: sticky;
		top: 0;
		height: 100svh;
		display: grid;
		align-items: center;
	}
	.statement__line {
		display: block;
	}
	.statement__text :global(.w) {
		display: inline-block;
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

	/* 03 Your blog (WS15) */
	.blogsite__grid {
		display: grid;
		gap: var(--space-8, 64px);
		align-items: center;
		@media (min-width: 56rem) {
			grid-template-columns: minmax(0, 6fr) minmax(0, 6fr);
		}
	}
	.blogsite__head {
		margin-bottom: 0;
	}
	.blogsite__points {
		display: grid;
		gap: var(--space-5, 24px);
		margin: var(--space-7, 48px) 0 var(--space-6, 32px);
		li {
			padding-left: var(--space-5, 24px);
			border-left: 2px solid var(--text-1);
		}
	}
	.blogsite__point-title {
		margin: 0 0 var(--space-1, 4px);
		font-size: var(--fs-lg, 1.125rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.01em;
	}
	.blogsite__point-body {
		margin: 0;
		color: var(--text-2);
		line-height: 1.55;
	}
	.site {
		margin: 0;
		min-width: 0;
	}
	.site__bar {
		display: flex;
		align-items: center;
		gap: var(--space-4, 16px);
		padding: var(--space-3, 12px) var(--space-4, 16px);
		background: var(--surface-2);
		border: 1px solid var(--border-1);
		border-bottom: 0;
		border-radius: var(--radius-xl, 24px) var(--radius-xl, 24px) 0 0;
	}
	.site__dots {
		display: flex;
		gap: 6px;
		span {
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: var(--surface-3);
		}
	}
	.site__url {
		flex: 1;
		min-width: 0;
		display: flex;
		align-items: center;
		gap: var(--space-2, 8px);
		padding: 0.4rem var(--space-4, 16px);
		background: var(--surface-0);
		border-radius: var(--radius-full, 999px);
		font-family: var(--font-mono, ui-monospace, monospace);
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-1);
		overflow: hidden;
	}
	.site__lock {
		flex: none;
		color: var(--text-3);
	}
	.site__typed {
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.site__body {
		padding: var(--space-6, 32px);
		background: var(--surface-0);
		border: 1px solid var(--border-1);
		border-radius: 0 0 var(--radius-xl, 24px) var(--radius-xl, 24px);
		box-shadow: var(--shadow-3);
	}
	.site__stats {
		display: flex;
		align-items: baseline;
		justify-content: space-between;
		gap: var(--space-4, 16px);
		flex-wrap: wrap;
		padding-bottom: var(--space-5, 24px);
		margin-bottom: var(--space-4, 16px);
		border-bottom: 1px solid var(--border-1);
	}
	.site__week {
		margin: 0;
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
		font-variant-numeric: tabular-nums;
		color: var(--text-3);
	}
	.site__pages {
		margin: 0;
		display: flex;
		align-items: baseline;
		gap: var(--space-2, 8px);
		color: var(--text-2);
	}
	.site__count {
		display: inline-block;
		min-width: 3ch;
		text-align: right;
		font-family: var(--font-display);
		font-size: clamp(2.5rem, 5vw, 4rem);
		font-weight: var(--fw-bold, 700);
		letter-spacing: -0.04em;
		line-height: 1;
		font-variant-numeric: tabular-nums;
		color: var(--text-1);
	}
	.site__feed {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--space-2, 8px);
	}
	.site__row {
		display: grid;
		grid-template-columns: 2.75rem minmax(0, 1fr) auto;
		align-items: center;
		gap: var(--space-3, 12px);
		padding: var(--space-2, 8px);
		border-radius: var(--radius-md, 12px);
		background: var(--surface-1);
	}
	.site__thumb {
		height: 2rem;
		border-radius: var(--radius-sm, 6px);
		background: var(--surface-3);
	}
	.site__lines {
		display: grid;
		gap: 6px;
	}
	.site__lang {
		padding: 0.15rem 0.5rem;
		border: 1px solid var(--border-2);
		border-radius: var(--radius-full, 999px);
		font-size: var(--fs-xs, 0.75rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-2);
	}
	.site__caption {
		text-align: left;
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
	}
	.also__rule {
		display: block;
		height: 1px;
		margin-bottom: var(--space-8, 64px);
		margin-top: calc(-1 * var(--space-8, 64px));
		background: var(--border-1);
		transform-origin: 0 50%;
	}
	.also__list > li {
		backface-visibility: hidden;
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
		@media (min-width: 64rem) {
			grid-template-columns: repeat(3, minmax(0, 1fr));
		}
	}
	.tile {
		background: var(--surface-2);
		border-radius: var(--radius-xl, 24px);
		padding: var(--space-6, 32px);
		min-width: 0;
		display: flex;
		flex-direction: column;
	}
	.tile__num {
		margin: 0;
		font-size: var(--fs-sm, 0.875rem);
		font-variant-numeric: tabular-nums;
		color: var(--text-3);
	}
	.tile__title {
		margin: var(--space-3, 12px) 0 var(--space-2, 8px);
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

	/* 07 Use cases: pick a business on the left, its sample dashboard plays on the right. */
	.uses {
		display: grid;
		gap: var(--space-6, 32px) var(--space-8, 64px);
		@media (min-width: 64rem) {
			grid-template-columns: 4fr 8fr;
			align-items: start;
		}
	}
	.uses__list {
		display: grid;
		border-top: 1px solid var(--border-1);
		@media (max-width: 63.99rem) {
			display: flex;
			flex-wrap: wrap;
			gap: var(--space-2, 8px);
			border-top: 0;
		}
	}
	.uses__tab {
		display: grid;
		gap: var(--space-2, 8px);
		width: 100%;
		padding: var(--space-4, 16px) 0 var(--space-4, 16px) var(--space-4, 16px);
		border: 0;
		border-bottom: 1px solid var(--border-1);
		border-radius: 0;
		background: none;
		color: var(--text-3);
		font: inherit;
		text-align: left;
		cursor: pointer;
		box-shadow: inset 2px 0 0 transparent;
		transition:
			color var(--t-state) var(--ease-out),
			box-shadow var(--t-state) var(--ease-out);
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				color: var(--text-1);
				box-shadow: inset 2px 0 0 var(--border-2);
			}
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
			border-radius: var(--radius-sm, 6px);
		}
		&:active {
			transform: scale(0.99);
		}
		&[aria-selected='true'] {
			color: var(--text-1);
			box-shadow: inset 2px 0 0 var(--text-1);
		}
		@media (max-width: 63.99rem) {
			width: auto;
			min-height: 44px;
			padding: var(--space-2, 8px) var(--space-4, 16px);
			border: 1px solid var(--border-1);
			border-radius: var(--radius-full, 999px);
			box-shadow: none;
			&[aria-selected='true'] {
				border-color: var(--text-1);
				box-shadow: inset 0 0 0 1px var(--text-1);
			}
		}
	}
	.uses__title {
		font-family: var(--font-display);
		font-size: clamp(1.125rem, 1rem + 0.5vw, 1.5rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.02em;
		line-height: 1.15;
		@media (max-width: 63.99rem) {
			font-size: var(--fs-sm, 0.875rem);
			letter-spacing: 0;
		}
	}
	.uses__body {
		display: none;
		font-size: var(--fs-md, 1rem);
		color: var(--text-2);
		line-height: 1.55;
	}
	@media (min-width: 64rem) {
		.uses__tab[aria-selected='true'] .uses__body {
			display: block;
		}
	}
	.uses__panel {
		min-width: 0;
	}

	/* Grow tiles carry a live mini view of the feature above their text. */
	.tile :global(.tile__demo) {
		margin: calc(var(--space-6, 32px) * -0.5) calc(var(--space-6, 32px) * -0.5) var(--space-6, 32px);
	}
	/* Stacking cards (desktop with motion, scrollFx stackFx): each card sticks a little lower
	   than the one before, so the pile shows its edges. */
	.tiles:global(.is-stack) {
		grid-template-columns: minmax(0, 1fr);
		gap: 8vh;
		padding-bottom: 4vh;
		.tile {
			position: sticky;
			top: calc(var(--header-h, 4rem) + 3vh + var(--i, 0) * 1.75rem);
			display: grid;
			grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
			align-items: center;
			gap: var(--space-8, 64px);
			min-height: min(66svh, 34rem);
			padding: var(--space-7, 48px);
			border: 1px solid var(--border-1);
			box-shadow: var(--shadow-3);
			transform-origin: 50% 0%;
		}
		.tile :global(.tile__demo) {
			margin: 0;
		}
		.tile__title {
			font-size: clamp(2rem, 3.4vw, 3.25rem);
			line-height: 1.02;
			margin-block: var(--space-4, 16px) var(--space-4, 16px);
		}
		.tile__body {
			font-size: var(--fs-lg, 1.125rem);
			max-width: 26rem;
		}
	}

	/* 08 Pricing heading: words are boxes so they can slide (scrollFx convergeFx). */
	.offer .chapter__title :global(.w) {
		display: inline-block;
	}

	/* 09 FAQ heading drawn letter by letter, and ruled lines drawn under each question. */
	.faq-head {
		margin: 0 auto var(--space-7, 48px);
		max-width: 18ch;
		font-family: var(--font-display);
		font-size: clamp(2.25rem, 5vw, 4rem);
		font-weight: var(--fw-bold, 700);
		line-height: 1.04;
		letter-spacing: -0.035em;
		text-align: center;
		text-wrap: balance;
		color: var(--text-1);
	}
	.faq-head__w {
		display: inline-block;
		white-space: nowrap;
	}
	.faq-head :global(.ch) {
		display: inline-block;
	}
	.faq-chapter:global(.is-ruled) :global(.faq__item) {
		position: relative;
		border-bottom-color: transparent;
	}
	.faq-chapter:global(.is-ruled) :global(.faq__item::after) {
		content: '';
		position: absolute;
		inset: auto 0 -1px 0;
		height: 1px;
		background: var(--border-1);
		transform: scaleX(var(--draw, 1));
		transform-origin: 0 50%;
	}
	.faq-chapter:global(.is-ruled) :global(.faq__button) {
		overflow: clip;
	}
	.faq-chapter:global(.is-ruled) :global(.faq__text) {
		display: inline-block;
	}

	/* 10 Finale: ink chapter. With motion, the ink opens as a circle (scrollFx irisFx). */
	.finale {
		position: relative;
		isolation: isolate;
		padding-block: clamp(7rem, 22vh, 14rem);
		text-align: center;
		overflow: hidden;
		color: var(--text-inverse);
	}
	.finale__bg {
		position: absolute;
		inset: 0;
		z-index: -1;
		background: var(--surface-inverse);
	}
	.finale .btn--primary {
		background: var(--surface-0);
		color: var(--text-1);
		&:hover {
			background: var(--surface-2);
		}
	}
	.finale .link-more {
		color: var(--text-inverse);
	}
	.btn__label {
		display: inline-block;
	}
	.finale__inner {
		display: grid;
		justify-items: center;
	}
	.finale__title {
		margin: 0 0 var(--space-4, 16px);
		color: var(--text-inverse);
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
		color: color-mix(in oklch, var(--text-inverse) 74%, var(--surface-inverse));
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
		.open__lead,
		.site-form,
		.link-more {
			animation: rise var(--dur-chapter) var(--ease-out) both;
		}
		/* Each headline word rises out of its own mask (transform only: the text is painted for LCP). */
		.open__title .w__in {
			animation: word-rise var(--dur-chapter) var(--ease-out) both;
			animation-delay: calc(60ms + var(--i, 0) * 70ms);
		}
		.open__lead { animation-delay: 120ms; }
		.site-form { animation-delay: 180ms; }
		.open__inner .link-more { animation-delay: 240ms; }

	}
	@keyframes rise {
		from {
			opacity: 0;
			transform: translate3d(0, 18px, 0);
		}
	}
	@keyframes word-rise {
		from {
			transform: translate3d(0, 105%, 0);
		}
	}
</style>
