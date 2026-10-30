<script lang="ts">
	// Slide-style chapter index ("03 / 10") for the landing. It watches elements with
	// [data-chapter] and links to each one. Desktop only; hidden on touch-sized screens.
	import { onMount } from 'svelte';

	interface Props {
		labels: string[];
		navLabel: string;
	}
	let { labels, navLabel }: Props = $props();

	let ids = $state<string[]>([]);
	let current = $state(0);

	onMount(() => {
		const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-chapter]'));
		ids = nodes.map((n) => n.id);
		// The current chapter is the last one whose top has passed the middle of the screen.
		// At the very bottom of the page the last chapter wins, even when it is short.
		let raf = 0;
		const measure = () => {
			raf = 0;
			const line = window.innerHeight * 0.5;
			let i = 0;
			nodes.forEach((n, k) => {
				if (n.getBoundingClientRect().top <= line) i = k;
			});
			const last = nodes[nodes.length - 1];
			if (last && last.getBoundingClientRect().bottom <= window.innerHeight) i = nodes.length - 1;
			current = i;
		};
		const onScroll = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};
		measure();
		window.addEventListener('scroll', onScroll, { passive: true });
		window.addEventListener('resize', onScroll);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener('scroll', onScroll);
			window.removeEventListener('resize', onScroll);
		};
	});

	const pad = (n: number) => String(n).padStart(2, '0');
</script>

{#if ids.length}
	<nav class="rail" aria-label={navLabel}>
		<p class="rail__count" aria-hidden="true">
			<span class="rail__now">{pad(current + 1)}</span> / {pad(ids.length)}
		</p>
		<ol class="rail__list">
			{#each ids as id, i}
				<li>
					<a href="#{id}" class="rail__dot" class:is-current={i === current} aria-current={i === current ? 'step' : undefined}>
						<span class="rail__label">{labels[i] ?? pad(i + 1)}</span>
					</a>
				</li>
			{/each}
		</ol>
	</nav>
{/if}

<style lang="scss">
	.rail {
		position: fixed;
		right: var(--space-5, 24px);
		top: 50%;
		transform: translateY(-50%);
		z-index: var(--z-header, 50);
		display: none;
		flex-direction: column;
		align-items: flex-end;
		gap: var(--space-3, 12px);
		/* White drawn with "difference": ink on light chapters, white on the ink finale. */
		mix-blend-mode: difference;
		@media (min-width: 64rem) and (hover: hover) {
			display: flex;
		}
	}
	.rail__count {
		margin: 0;
		font-size: var(--fs-xs, 0.75rem);
		font-variant-numeric: tabular-nums;
		color: rgb(255 255 255 / 0.55);
		letter-spacing: 0.04em;
	}
	.rail__now {
		color: #fff;
		font-weight: var(--fw-semibold, 600);
	}
	.rail__list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: var(--space-2, 8px);
		justify-items: end;
	}
	.rail__dot {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: var(--space-2, 8px);
		height: 1rem;
		text-decoration: none;
		color: rgb(255 255 255 / 0.6);
		&::after {
			content: '';
			width: 0.75rem;
			height: 2px;
			border-radius: var(--radius-full, 999px);
			background: rgb(255 255 255 / 0.45);
			transition:
				width var(--dur-base, 200ms) var(--ease-out, ease-out),
				background-color var(--dur-base, 200ms) var(--ease-out, ease-out);
		}
		&.is-current::after {
			width: 1.75rem;
			background: #fff;
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring, 0 0 0 3px #0066cc);
			border-radius: var(--radius-sm, 6px);
		}
	}
	.rail__label {
		font-size: var(--fs-xs, 0.75rem);
		opacity: 0;
		transform: translateX(4px);
		transition:
			opacity var(--dur-base, 200ms) var(--ease-out, ease-out),
			transform var(--dur-base, 200ms) var(--ease-out, ease-out);
		white-space: nowrap;
	}
	/* Labels show on hover or focus only, so they never sit on top of the big type. */
	.rail:hover .rail__label,
	.rail__dot:focus-visible .rail__label {
		opacity: 1;
		transform: none;
	}
	.rail__dot.is-current .rail__label {
		color: #fff;
	}
	@media (prefers-reduced-motion: reduce) {
		.rail__dot::after,
		.rail__label {
			transition: none;
		}
	}
</style>
