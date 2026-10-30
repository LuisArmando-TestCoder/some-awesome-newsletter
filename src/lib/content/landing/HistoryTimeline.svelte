<script lang="ts">
	// "The life of one issue": a horizontal chronicle that moves sideways while the page
	// scrolls down (desktop, motion allowed). On small screens or with reduced motion it is
	// a plain vertical list that you can read without any scroll effect. Owner: WS2.
	import { onMount } from 'svelte';

	interface Item {
		mark: string;
		title: string;
		body: string;
	}
	interface Props {
		id?: string;
		eyebrow: string;
		title: string;
		lead: string;
		note: string;
		items: Item[];
		progressLabel: string;
	}
	let { id = 'history', eyebrow, title, lead, note, items, progressLabel }: Props = $props();

	let outer = $state<HTMLElement | null>(null);
	let track = $state<HTMLElement | null>(null);
	let pinned = $state(false);
	let height = $state(0);
	let x = $state(0);
	let progress = $state(0);
	let active = $state(0);

	onMount(() => {
		const mqWide = window.matchMedia('(min-width: 56rem)');
		const mqMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let distance = 0;
		let raf = 0;

		const measure = () => {
			pinned = mqWide.matches && !mqMotion.matches;
			if (!pinned || !track) {
				height = 0;
				x = 0;
				return;
			}
			distance = Math.max(0, track.scrollWidth - window.innerWidth);
			height = distance + window.innerHeight;
			update();
		};

		const update = () => {
			raf = 0;
			if (!pinned || !outer) return;
			const top = outer.getBoundingClientRect().top;
			const p = distance ? Math.min(1, Math.max(0, -top / distance)) : 0;
			progress = p;
			x = -p * distance;
			active = Math.min(items.length - 1, Math.round(p * (items.length - 1)));
		};

		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(update);
		};

		measure();
		const ro = new ResizeObserver(measure);
		if (track) ro.observe(track);
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', measure);
		mqWide.addEventListener('change', measure);
		mqMotion.addEventListener('change', measure);
		return () => {
			ro.disconnect();
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', measure);
			mqWide.removeEventListener('change', measure);
			mqMotion.removeEventListener('change', measure);
		};
	});
</script>

<section
	{id}
	class="history"
	class:history--pinned={pinned}
	aria-labelledby="{id}-title"
	bind:this={outer}
	style:height={pinned ? `${height}px` : null}
>
	<div class="history__stage">
		<header class="history__head">
			<p class="history__eyebrow">{eyebrow}</p>
			<h2 id="{id}-title" class="history__title">{title}</h2>
			<p class="history__lead">{lead}</p>
		</header>

		<ol class="history__track" bind:this={track} style:transform={pinned ? `translate3d(${x}px,0,0)` : null}>
			{#each items as item, i}
				<li class="era" class:era--active={!pinned || i <= active}>
					<p class="era__mark" aria-hidden="true">{item.mark}</p>
					<div class="era__text">
						<p class="era__step"><span class="visually-hidden">{i + 1}. </span>{String(i + 1).padStart(2, '0')}</p>
						<h3 class="era__title">{item.title}</h3>
						<p class="era__body">{item.body}</p>
					</div>
				</li>
			{/each}
		</ol>

		<div class="history__foot">
			<p class="history__note">{note}</p>
			{#if pinned}
				<div
					class="history__bar"
					role="progressbar"
					aria-label={progressLabel}
					aria-valuemin={0}
					aria-valuemax={items.length}
					aria-valuenow={active + 1}
				>
					<span style:transform="scaleX({progress})"></span>
				</div>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	.visually-hidden {
		position: absolute;
		width: 1px;
		height: 1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
	}
	.history {
		position: relative;
		background: var(--surface-0, #fff);
		padding-block: var(--space-9, 96px);
	}
	.history--pinned {
		padding-block: 0;
	}
	.history__stage {
		width: 100%;
	}
	.history--pinned .history__stage {
		position: sticky;
		top: 0;
		height: 100vh;
		height: 100svh;
		display: grid;
		grid-template-rows: auto 1fr auto;
		grid-template-columns: minmax(0, 1fr);
		overflow: hidden;
		padding-block: calc(var(--header-h, 4rem) + var(--space-6, 32px)) var(--space-6, 32px);
	}
	.history__head {
		max-width: var(--container-lg, 72rem);
		margin: 0 auto var(--space-7, 48px);
		padding-inline: var(--space-5, 24px);
		width: 100%;
	}
	.history--pinned .history__head {
		margin-bottom: var(--space-4, 16px);
	}
	.history__eyebrow {
		margin: 0 0 var(--space-2, 8px);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-3, #6e6e73);
	}
	.history__title {
		margin: 0 0 var(--space-3, 12px);
		font-family: var(--font-display, sans-serif);
		font-size: var(--fs-4xl, 3.5rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.03em;
		line-height: 1.02;
		color: var(--text-1, #1d1d1f);
	}
	.history__lead {
		margin: 0;
		max-width: 40rem;
		font-size: var(--fs-lg, 1.125rem);
		line-height: var(--lh-normal, 1.6);
		color: var(--text-2, #545458);
	}
	.history__track {
		list-style: none;
		margin: 0;
		padding: 0 var(--space-5, 24px);
		display: grid;
		gap: var(--space-8, 64px);
		max-width: var(--container-lg, 72rem);
		margin-inline: auto;
	}
	.history--pinned .history__track {
		display: flex;
		align-items: center;
		gap: var(--space-9, 96px);
		max-width: none;
		width: max-content;
		padding-inline: max(var(--space-5, 24px), calc((100vw - var(--container-lg, 72rem)) / 2 + var(--space-5, 24px)));
		padding-right: 20vw;
		will-change: transform;
	}
	.era {
		display: grid;
		gap: var(--space-4, 16px);
		border-top: 1px solid var(--border-1, #e5e5ea);
		padding-top: var(--space-5, 24px);
	}
	.history--pinned .era {
		width: max-content;
		min-width: min(30rem, 60vw);
		border-top: 0;
		padding-top: 0;
		opacity: 0.28;
		transition: opacity var(--dur-slow, 320ms) var(--ease-out, ease-out);
	}
	.history--pinned .era--active {
		opacity: 1;
	}
	.era__mark {
		margin: 0;
		font-family: var(--font-display, sans-serif);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.05em;
		line-height: 0.9;
		color: var(--text-1, #1d1d1f);
		font-size: clamp(3.5rem, 12vw, 6rem);
		white-space: nowrap;
	}
	.history--pinned .era__mark {
		font-size: clamp(5rem, 12vw, 11rem);
	}
	.history--pinned .era__text {
		max-width: 30rem;
	}
	.era__step {
		margin: 0 0 var(--space-2, 8px);
		font-size: var(--fs-sm, 0.875rem);
		font-variant-numeric: tabular-nums;
		color: var(--text-3, #6e6e73);
	}
	.era__title {
		margin: 0 0 var(--space-2, 8px);
		font-size: var(--fs-xl, 1.4rem);
		font-weight: var(--fw-semibold, 600);
		letter-spacing: -0.01em;
		color: var(--text-1, #1d1d1f);
	}
	.era__body {
		margin: 0;
		max-width: 30rem;
		font-size: var(--fs-md, 1rem);
		line-height: var(--lh-normal, 1.6);
		color: var(--text-2, #545458);
	}
	.history__foot {
		max-width: var(--container-lg, 72rem);
		width: 100%;
		margin: var(--space-6, 32px) auto 0;
		padding-inline: var(--space-5, 24px);
		display: flex;
		align-items: center;
		gap: var(--space-5, 24px);
		flex-wrap: wrap;
	}
	.history__note {
		margin: 0;
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-3, #6e6e73);
	}
	.history__bar {
		flex: 1 1 12rem;
		height: 2px;
		background: var(--border-1, #e5e5ea);
		border-radius: var(--radius-full, 999px);
		overflow: hidden;
		span {
			display: block;
			height: 100%;
			background: var(--text-1, #1d1d1f);
			transform-origin: left center;
		}
	}
</style>
