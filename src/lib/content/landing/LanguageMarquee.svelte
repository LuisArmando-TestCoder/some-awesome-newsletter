<script lang="ts">
	// Breath slide between the statement and the languages chapter (WS14).
	// Two rows of real reader languages, each written in its own script, drifting in
	// opposite directions. Scrolling speeds them up and leans them in the scroll direction.
	// WCAG 2.2.2: a visible Pause button, and it pauses on hover and on keyboard focus.
	// Reduced motion: two still rows. Only runs while on screen.
	import { onMount } from 'svelte';
	import languagesData from '../../../components/systems/inputs/Language/languages';

	interface Props {
		label: string;
		pause: string;
		play: string;
	}
	let { label, pause, play }: Props = $props();

	// Codes subscribers can pick in the signup form, shown in their own language.
	const CODES = ['es', 'pt', 'fr', 'de', 'it', 'ja', 'zh', 'ko', 'hi', 'ar', 'ru', 'tr', 'nl', 'pl', 'sw', 'id', 'th', 'vi', 'bn', 'uk', 'he', 'fa', 'ta', 'en'];
	const offered = new Set((languagesData as Array<{ code: string }>).map((l) => l.code));
	const endonym = (code: string) => {
		try {
			const n = new Intl.DisplayNames([code], { type: 'language' }).of(code) ?? code;
			return n.charAt(0).toLocaleUpperCase(code) + n.slice(1);
		} catch {
			return code;
		}
	};
	const items = CODES.filter((c) => offered.has(c)).map((code) => ({ code, name: endonym(code) }));
	const half = Math.ceil(items.length / 2);
	const rowA = items.slice(0, half);
	const rowB = items.slice(half);

	let paused = $state(false);
	let hovering = $state(false);
	let still = $state(false);
	let root = $state<HTMLElement | null>(null);
	let trackA = $state<HTMLElement | null>(null);
	let trackB = $state<HTMLElement | null>(null);

	onMount(() => {
		still =
			matchMedia('(prefers-reduced-motion: reduce)').matches ||
			document.documentElement.getAttribute('data-motion') === 'reduced';
		if (still || !root || !trackA || !trackB) return;

		let raf = 0;
		let last = performance.now();
		let lastY = scrollY;
		let boost = 0; // px/s from scrolling, decays
		let skew = 0;
		let xa = 0;
		let xb = 0;
		let wa = trackA.scrollWidth / 2;
		let wb = trackB.scrollWidth / 2;
		const ro = new ResizeObserver(() => {
			wa = trackA!.scrollWidth / 2;
			wb = trackB!.scrollWidth / 2;
		});
		ro.observe(trackA);

		const wrap = (v: number, w: number) => (w ? ((v % w) + w) % w : 0);
		const frame = (now: number) => {
			const dt = Math.min(64, now - last) / 1000;
			last = now;
			const dy = scrollY - lastY;
			lastY = scrollY;
			const v = dt ? dy / dt : 0; // px/s
			boost += (v - boost) * 0.12;
			const target = Math.max(-10, Math.min(10, boost * 0.006));
			skew += (target - skew) * 0.1;
			if (!(paused || hovering)) {
				const speed = 48 + Math.abs(boost) * 0.25;
				const dir = boost < -1 ? -1 : 1;
				xa = wrap(xa + speed * dt * dir, wa);
				xb = wrap(xb + speed * dt * dir, wb);
			}
			trackA!.style.transform = `translate3d(${-xa}px,0,0) skewX(${-skew}deg)`;
			trackB!.style.transform = `translate3d(${xb - wb}px,0,0) skewX(${-skew}deg)`;
			raf = requestAnimationFrame(frame);
		};
		const io = new IntersectionObserver(([e]) => {
			cancelAnimationFrame(raf);
			if (e.isIntersecting) {
				last = performance.now();
				lastY = scrollY;
				raf = requestAnimationFrame(frame);
			}
		});
		io.observe(root);
		return () => {
			io.disconnect();
			ro.disconnect();
			cancelAnimationFrame(raf);
		};
	});
</script>

<section
	class="marquee"
	class:is-still={still}
	aria-label={label}
	bind:this={root}
	onpointerenter={() => (hovering = true)}
	onpointerleave={() => (hovering = false)}
	onfocusin={() => (hovering = true)}
	onfocusout={() => (hovering = false)}
>
	<div class="marquee__row">
		<ul class="marquee__track" bind:this={trackA}>
			{#each rowA as l (l.code)}
				<li lang={l.code}>{l.name}</li>
			{/each}
			{#each rowA as l (l.code + '-copy')}
				<li lang={l.code} aria-hidden="true">{l.name}</li>
			{/each}
		</ul>
	</div>
	<div class="marquee__row marquee__row--b">
		<ul class="marquee__track" bind:this={trackB}>
			{#each rowB as l (l.code)}
				<li lang={l.code}>{l.name}</li>
			{/each}
			{#each rowB as l (l.code + '-copy')}
				<li lang={l.code} aria-hidden="true">{l.name}</li>
			{/each}
		</ul>
	</div>
	{#if !still}
		<button type="button" class="marquee__toggle" aria-pressed={paused} onclick={() => (paused = !paused)}>
			<span class="marquee__icon" aria-hidden="true">
				{#if paused}
					<svg width="12" height="12" viewBox="0 0 12 12"><path d="M3 1.5v9l7.5-4.5z" fill="currentColor" /></svg>
				{:else}
					<svg width="12" height="12" viewBox="0 0 12 12"><path d="M2.5 1.5h2.5v9H2.5zM7 1.5h2.5v9H7z" fill="currentColor" /></svg>
				{/if}
			</span>
			{paused ? play : pause}
		</button>
	{/if}
</section>

<style lang="scss">
	.marquee {
		position: relative;
		padding-block: clamp(3rem, 9vh, 6rem);
		overflow: hidden;
		border-block: 1px solid var(--border-1);
		display: grid;
		gap: clamp(0.5rem, 1.5vw, 1rem);
	}
	.marquee__row {
		overflow: hidden;
		mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
	}
	.marquee__track {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		width: max-content;
		will-change: transform;
		li {
			flex: none;
			display: flex;
			align-items: center;
			padding-inline: clamp(1rem, 2.5vw, 2.25rem);
			font-family: var(--font-display);
			font-size: clamp(2.5rem, 7vw, 6.5rem);
			font-weight: var(--fw-bold, 700);
			letter-spacing: -0.04em;
			line-height: 1.15;
			color: var(--text-1);
			white-space: nowrap;
			&::after {
				content: '';
				width: 0.18em;
				height: 0.18em;
				margin-left: clamp(2rem, 5vw, 4.5rem);
				border-radius: 50%;
				background: var(--text-3);
			}
		}
	}
	/* Second row: outlined, so the two rows read as foreground and background. */
	.marquee__row--b .marquee__track li {
		color: transparent;
		-webkit-text-stroke: 1.25px var(--text-1);
		&::after {
			background: transparent;
			box-shadow: inset 0 0 0 1.25px var(--text-3);
		}
	}
	.marquee__toggle {
		position: absolute;
		right: var(--space-5, 24px);
		bottom: var(--space-3, 12px);
		display: inline-flex;
		align-items: center;
		gap: var(--space-2, 8px);
		min-height: 2.25rem;
		padding: 0 var(--space-4, 16px);
		border: 1px solid var(--border-2);
		border-radius: var(--radius-full, 999px);
		background: var(--surface-0);
		color: var(--text-1);
		font: inherit;
		font-size: var(--fs-sm, 0.875rem);
		cursor: pointer;
		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background: var(--surface-2);
			}
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
		}
		&:active {
			transform: scale(0.97);
		}
	}
	/* Reduced motion: still rows that wrap instead of scrolling. */
	.is-still .marquee__track {
		width: auto;
		flex-wrap: wrap;
		justify-content: center;
		li[aria-hidden='true'] {
			display: none;
		}
	}
	.is-still .marquee__row {
		mask-image: none;
	}
	.is-still .marquee__track li {
		font-size: clamp(1.75rem, 4vw, 3rem);
	}
	.is-still .marquee__row--b .marquee__track li {
		color: var(--text-2);
		-webkit-text-stroke: 0;
	}
</style>
