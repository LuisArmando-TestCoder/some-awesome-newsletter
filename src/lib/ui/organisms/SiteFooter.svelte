<!--
  SiteFooter: the closing slide of every public page (Award-Grade Web Playbook, skill 09).
  Layers, top to bottom: closing statement + the same primary CTA as the header,
  fat-footer map, legal row (with the cookie policy link), and an edge-to-edge wordmark
  cropped by the bottom edge.
  Props:
    variant?: 'full' | 'finale-less' | 'compact' = 'full'
      full         closing CTA + map + legal + wordmark (marketing pages)
      finale-less  map + legal + wordmark (the landing has its own finale chapter)
      compact      one legal row only (sign in, sign up, subscribe flows)
-->
<script lang="ts">
	import { t } from '$lib/i18n/translations';
	import en from '$lib/i18n/locales/en';
	import store from '../../../components/store';

	type Variant = 'full' | 'finale-less' | 'compact';
	let { variant = 'full' }: { variant?: Variant } = $props();

	const L = $derived((($t as typeof en)?.landing ?? en.landing) as typeof en.landing);
	const F = $derived(L.footer ?? en.landing.footer);
	const header = $derived((($t as typeof en)?.header ?? en.header) as typeof en.header);
	const isLoggedIn = $derived(Boolean($store?.isAuthCodeValid));
	const year = new Date().getFullYear();
</script>

{#if variant === 'compact'}
	<footer class="sf sf--compact">
		<div class="sf__wrap sf__legal">
			<p class="sf__rights">&copy; {year} AIBAN</p>
			<nav aria-label={F.legal}>
				<ul>
					<li><a href="/legal/privacy">{F.links.privacy}</a></li>
					<li><a href="/legal/terms">{F.links.terms}</a></li>
					<li><a href="/legal/cookies">{F.links.cookies}</a></li>
					<li><a href="/help">{F.links.help}</a></li>
				</ul>
			</nav>
		</div>
	</footer>
{:else}
	<footer class="sf">
		{#if variant === 'full'}
			<section class="sf__wrap sf__finale" aria-labelledby="sf-finale-title">
				<h2 id="sf-finale-title" class="sf__finale-title">{L.finalCta.title}</h2>
				<div class="sf__finale-side">
					<p class="sf__finale-body">{L.finalCta.body}</p>
					<div class="sf__finale-actions">
						{#if isLoggedIn}
							<a class="sf__cta" href="/dashboard">{header.goToWorkspace ?? 'Open dashboard'}</a>
						{:else}
							<a class="sf__cta" href="/start" data-cta="footer">{L.finalCta.cta}</a>
						{/if}
						<a class="sf__more" href="/help">{L.finalCta.secondary} <span aria-hidden="true">&#8250;</span></a>
					</div>
				</div>
			</section>
		{/if}

		<div class="sf__wrap sf__map">
			<div class="sf__about">
				<a href="/" class="sf__logo">AIBAN</a>
				<p class="sf__tagline">{F.tagline}</p>
				<p class="sf__contact">
					{F.contactLabel}: <a href="mailto:info@aiban.news">info@aiban.news</a>
				</p>
			</div>
			<nav aria-label={F.product}>
				<h2 class="sf__h">{F.product}</h2>
				<ul>
					<li><a href="/#how-it-works">{F.links.howItWorks}</a></li>
					<li><a href="/pricing">{F.links.pricing}</a></li>
					<li><a href="/demo">{F.links.demo}</a></li>
					<li><a href="/help">{F.links.help}</a></li>
				</ul>
			</nav>
			<nav aria-label={F.company}>
				<h2 class="sf__h">{F.company}</h2>
				<ul>
					<li><a href="/about">{F.links.about}</a></li>
					<li><a href="/careers">{F.links.careers}</a></li>
				</ul>
			</nav>
			<nav aria-label={F.legal}>
				<h2 class="sf__h">{F.legal}</h2>
				<ul>
					<li><a href="/legal/privacy">{F.links.privacy}</a></li>
					<li><a href="/legal/terms">{F.links.terms}</a></li>
					<li><a href="/legal/cookies">{F.links.cookies}</a></li>
				</ul>
			</nav>
		</div>

		<p class="sf__wrap sf__rights sf__rights--row">&copy; {year} AIBAN. {F.rights}</p>

		<p class="sf__wordmark" aria-hidden="true">AIBAN</p>
	</footer>
{/if}

<style>
	.sf {
		/* Room for the floating language button so the last row is never under it. */
		padding-bottom: calc(env(safe-area-inset-bottom) + 4.5rem);
		position: relative;
		background: var(--surface-0);
		color: var(--text-2);
		font-size: var(--fs-sm);
		border-top: 1px solid var(--border-1);
		overflow: hidden;
	}
	.sf__wrap {
		width: 100%;
		max-width: var(--container-xl);
		margin-inline: auto;
		padding-inline: var(--gutter);
	}

	.sf a {
		color: var(--text-2);
		text-decoration: none;
		border-radius: var(--radius-sm);
	}
	.sf a:hover {
		color: var(--text-1);
		text-decoration: underline;
	}
	.sf a:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.sf ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--space-2);
	}
	/* 44px tap targets on touch */
	@media (pointer: coarse) {
		.sf ul a {
			display: inline-flex;
			align-items: center;
			min-height: 44px;
		}
		.sf ul {
			gap: 0;
		}
	}

	/* Closing statement */
	.sf__finale {
		display: grid;
		gap: var(--space-6);
		padding-block: var(--section-pad) calc(var(--section-pad) * 0.6);
		border-bottom: 1px solid var(--border-1);
	}
	@media (min-width: 60rem) {
		.sf__finale {
			grid-template-columns: 7fr 5fr;
			align-items: end;
		}
	}
	.sf__finale-title {
		margin: 0;
		font-family: var(--font-display);
		font-size: var(--step-display);
		font-weight: var(--fw-semibold);
		line-height: var(--lh-display);
		letter-spacing: var(--tracking-display);
		color: var(--text-1);
	}
	.sf__finale-body {
		margin: 0 0 var(--space-5);
		max-width: 34ch;
		font-size: var(--fs-lg);
		line-height: var(--lh-snug);
		color: var(--text-2);
	}
	.sf__finale-actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-5);
	}
	.sf .sf__cta {
		display: inline-flex;
		align-items: center;
		min-height: 3.5rem;
		padding: 0 var(--space-6);
		border-radius: var(--radius-full);
		background: var(--accent);
		color: var(--accent-contrast);
		font-size: var(--fs-md);
		font-weight: var(--fw-medium);
		letter-spacing: -0.01em;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}
	.sf .sf__cta:hover {
		background: var(--accent-hover);
		color: var(--accent-contrast);
		text-decoration: none;
	}
	.sf .sf__cta:active {
		transform: scale(0.97);
	}
	.sf .sf__more {
		color: var(--text-1);
		font-size: var(--fs-md);
		font-weight: var(--fw-medium);
	}

	/* Fat-footer map */
	.sf__map {
		display: grid;
		gap: var(--space-6);
		grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
		padding-block: var(--space-8) var(--space-6);
	}
	.sf__about {
		grid-column: 1 / -1;
	}
	@media (min-width: 48rem) {
		.sf__about {
			grid-column: auto;
			min-width: 16rem;
		}
	}
	.sf .sf__logo {
		font-family: var(--font-display);
		font-weight: var(--fw-semibold);
		font-size: var(--fs-lg);
		letter-spacing: -0.03em;
		color: var(--text-1);
	}
	.sf__tagline {
		margin: var(--space-3) 0;
		max-width: 24rem;
		line-height: var(--lh-normal);
	}
	.sf__contact {
		margin: 0;
	}
	.sf__h {
		margin: 0 0 var(--space-3);
		font-family: var(--font-body);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		letter-spacing: 0;
		color: var(--text-1);
	}
	.sf__rights {
		margin: 0;
		color: var(--text-3);
		font-size: var(--fs-xs);
	}
	.sf__rights--row {
		padding-block: var(--space-4);
		border-top: 1px solid var(--border-1);
	}

	/* Wordmark: full width, cropped by the bottom edge. Static, so it costs nothing. */
	.sf__wordmark {
		margin: var(--space-6) 0 0;
		font-family: var(--font-display);
		font-size: 30vw;
		font-weight: var(--fw-bold);
		letter-spacing: -0.07em;
		line-height: 0.74;
		text-align: center;
		color: var(--text-1);
		white-space: nowrap;
		user-select: none;
		transform: translateY(0.1em);
	}

	/* Compact (auth and subscribe flows) */
	.sf--compact {
		background: transparent;
	}
	.sf:has(.sf__wordmark) {
		padding-bottom: 0;
	}
	.sf__legal {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		align-items: center;
		gap: var(--space-3) var(--space-5);
		padding-block: var(--space-5);
	}
	.sf__legal ul {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-1) var(--space-5);
	}

	/* The wordmark rises into place as the footer scrolls in (compositor only). */
	@media (prefers-reduced-motion: no-preference) {
		@supports (animation-timeline: view()) {
			:global(:root:not([data-motion='reduced'])) .sf__wordmark {
				animation: sf-wordmark linear both;
				animation-timeline: view();
				animation-range: entry 0% entry 100%;
			}
		}
	}
	@keyframes sf-wordmark {
		from {
			opacity: 0;
			transform: translateY(0.4em);
		}
		to {
			opacity: 1;
			transform: translateY(0.1em);
		}
	}

	@media print {
		.sf {
			display: none;
		}
	}
</style>
