<!--
  Error page (playbook skill 16): correct status from SvelteKit, plain words,
  popular links before anything clever, and a way to report a broken link.
-->
<script lang="ts">
	import { page } from '$app/stores';
	import { t } from '$lib/i18n/translations';
	import en from '$lib/i18n/locales/en';

	const E = $derived((($t as typeof en)?.errorPage ?? en.errorPage) as typeof en.errorPage);
	const status = $derived($page.status);
	const isNotFound = $derived(status === 404);
</script>

<svelte:head>
	<title>{isNotFound ? E.notFoundTitle : E.serverTitle} | AIBAN</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<main class="err">
	<div class="err__wrap">
		<p class="page-eyebrow rise">{isNotFound ? E.notFoundEyebrow : E.serverEyebrow.replace('{status}', String(status))}</p>
		<h1 class="page-title rise rise-2">{isNotFound ? E.notFoundTitle : E.serverTitle}</h1>
		<p class="page-lede rise rise-3">{isNotFound ? E.notFoundBody : E.serverBody}</p>

		<div class="err__actions">
			{#if !isNotFound}
				<button class="err__cta" type="button" onclick={() => location.reload()}>{E.retry}</button>
				<a class="err__more" href="/">{E.home} <span aria-hidden="true">&#8250;</span></a>
			{:else}
				<a class="err__cta" href="/">{E.home}</a>
			{/if}
		</div>

		<nav class="err__links" aria-labelledby="err-popular">
			<h2 id="err-popular" class="err__h">{E.popularTitle}</h2>
			<ul>
				<li><a href="/#how-it-works">{E.links.howItWorks}<span aria-hidden="true">&#8594;</span></a></li>
				<li><a href="/pricing">{E.links.pricing}<span aria-hidden="true">&#8594;</span></a></li>
				<li><a href="/help">{E.links.help}<span aria-hidden="true">&#8594;</span></a></li>
				<li><a href="/login">{E.links.login}<span aria-hidden="true">&#8594;</span></a></li>
			</ul>
		</nav>

		<p class="err__report">{E.report}</p>
	</div>
	<p class="err__code" aria-hidden="true">{status}</p>
</main>

<style>
	.err {
		position: relative;
		overflow: hidden;
		min-height: calc(100svh - var(--header-h));
	}
	.err__wrap {
		position: relative;
		z-index: 1;
		max-width: var(--container-xl);
		margin-inline: auto;
		padding: calc(var(--section-pad) * 0.7) var(--gutter) var(--section-pad);
	}
	.err__actions {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: var(--space-5);
		margin-top: var(--space-7);
	}
	.err__cta {
		display: inline-flex;
		align-items: center;
		min-height: 3.5rem;
		padding: 0 var(--space-6);
		border: 0;
		border-radius: var(--radius-full);
		background: var(--accent);
		color: var(--accent-contrast);
		font-size: var(--fs-md);
		font-weight: var(--fw-medium);
		text-decoration: none;
		cursor: pointer;
		transition:
			background-color var(--dur-fast) var(--ease-out),
			transform var(--dur-base) var(--ease-out);
	}
	.err__cta:hover {
		background: var(--accent-hover);
	}
	.err__cta:active {
		transform: scale(0.97);
	}
	.err__cta:focus-visible,
	.err__links a:focus-visible,
	.err__more:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.err__more {
		color: var(--text-1);
		font-weight: var(--fw-medium);
	}
	.err__links {
		margin-top: var(--space-9);
		max-width: 40rem;
	}
	.err__h {
		margin: 0 0 var(--space-3);
		font-family: var(--font-body);
		font-size: var(--fs-sm);
		font-weight: var(--fw-semibold);
		letter-spacing: 0;
		color: var(--text-3);
	}
	.err__links ul {
		list-style: none;
		margin: 0;
		padding: 0;
		border-top: 1px solid var(--border-1);
	}
	.err__links li {
		border-bottom: 1px solid var(--border-1);
	}
	.err__links a {
		display: flex;
		justify-content: space-between;
		align-items: center;
		min-height: 3.5rem;
		color: var(--text-1);
		font-size: var(--fs-xl);
		font-weight: var(--fw-medium);
		letter-spacing: -0.02em;
		text-decoration: none;
	}
	.err__links a span {
		transition: transform var(--dur-base) var(--ease-out);
	}
	.err__links a:hover span {
		transform: translateX(4px);
	}
	.err__report {
		margin: var(--space-6) 0 0;
		max-width: 52ch;
		color: var(--text-3);
		font-size: var(--fs-sm);
	}
	.err__code {
		position: absolute;
		right: -0.06em;
		bottom: -0.2em;
		margin: 0;
		font-family: var(--font-display);
		font-size: clamp(10rem, 38vw, 34rem);
		font-weight: var(--fw-bold);
		letter-spacing: -0.08em;
		line-height: 1;
		color: var(--surface-2);
		user-select: none;
		pointer-events: none;
	}
</style>
