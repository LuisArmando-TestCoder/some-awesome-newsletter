<!--
  DashboardShowcase: an animated, HTML-built replica of the AIBAN dashboard for public pages
  (playbook skill 14, "marketing showcase of a dashboard": live UI, tiles assemble, numbers count up).
  Everything inside the window is sample data from en.ts `showcase.examples`, and the window says so.

  Props:
    example      one sample business (showcase.examples[i])
    scenes       which views to play, in order
    scene        bindable index of the current scene
    variant      'app' (with sidebar) or 'bare' (just the view, for small tiles)
    controls     show the scene tabs and the pause button (default true)
    autoplay     advance on its own while in view (default true)
    duration     ms per scene (default 6500)
    caption      visible caption under the window (optional)
    onloop       called when the last scene ends (to move to the next example)

  Motion rules: plays only while at least 15% visible, the tab is visible, and the pointer or focus
  is not inside. A visible Pause button stops everything (WCAG 2.2.2). With reduced motion nothing
  moves: each scene shows its final state and the tabs switch views by hand.
-->
<script lang="ts">
	import { onMount, untrack } from 'svelte';
	import { t } from '$lib/i18n/translations';
	import en from '$lib/i18n/locales/en';
	import { SCENE_NAV, type Example, type SceneId, type ShowcaseStrings } from './types';
	import HomeScene from './scenes/HomeScene.svelte';
	import IssueScene from './scenes/IssueScene.svelte';
	import ReportsScene from './scenes/ReportsScene.svelte';
	import SubscribersScene from './scenes/SubscribersScene.svelte';
	import AutomationScene from './scenes/AutomationScene.svelte';
	import SourceScene from './scenes/SourceScene.svelte';
	import VoiceScene from './scenes/VoiceScene.svelte';
	import SignupScene from './scenes/SignupScene.svelte';
	import BlogScene from './scenes/BlogScene.svelte';
	import ImportScene from './scenes/ImportScene.svelte';

	interface Props {
		example: Example;
		scenes: SceneId[];
		scene?: number;
		variant?: 'app' | 'bare';
		controls?: boolean;
		autoplay?: boolean;
		duration?: number;
		caption?: string;
		label?: string;
		onloop?: () => void;
		class?: string;
	}

	let {
		example,
		scenes,
		scene = $bindable(0),
		variant = 'app',
		controls = true,
		autoplay = true,
		duration = 6500,
		caption,
		label,
		onloop,
		class: className = ''
	}: Props = $props();

	const S = $derived((($t as typeof en)?.showcase ?? en.showcase) as ShowcaseStrings);
	const uid = $props.id();

	let root: HTMLElement | undefined = $state();
	let inView = $state(false);
	let userPaused = $state(false);
	let hovering = $state(false);
	let pageHidden = $state(false);
	let reduced = $state(false);

	const running = $derived(autoplay && !reduced && !userPaused && inView && !hovering && !pageHidden);
	const current = $derived(scenes[Math.min(scene, scenes.length - 1)] ?? scenes[0]);
	const navKey = $derived(SCENE_NAV[current]);

	// Restart a scene's choreography when the scene or the example changes.
	let runKey = $state(0);
	$effect(() => {
		void current;
		void example;
		untrack(() => runKey++);
	});

	function next() {
		if (scene >= scenes.length - 1) {
			if (onloop) onloop();
			scene = 0;
		} else {
			scene += 1;
		}
	}

	/** The active tab's progress bar is a CSS animation; when it ends, the next scene starts.
	    Pausing the animations (Pause, hover, offscreen) therefore pauses the timer too. */
	function onProgressEnd() {
		if (!reduced && autoplay) next();
	}

	function pick(i: number) {
		scene = i;
		runKey++;
	}

	function onTabKey(e: KeyboardEvent, i: number) {
		const n = scenes.length;
		let to = -1;
		if (e.key === 'ArrowRight' || e.key === 'ArrowDown') to = (i + 1) % n;
		else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') to = (i - 1 + n) % n;
		else if (e.key === 'Home') to = 0;
		else if (e.key === 'End') to = n - 1;
		if (to < 0) return;
		e.preventDefault();
		pick(to);
		root?.querySelector<HTMLButtonElement>(`#${uid}-tab-${to}`)?.focus();
	}

	onMount(() => {
		const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
		const readReduced = () =>
			(reduced = mq.matches || document.documentElement.dataset.motion === 'reduced');
		readReduced();
		mq.addEventListener('change', readReduced);
		const mo = new MutationObserver(readReduced);
		mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-motion'] });

		const onVis = () => (pageHidden = document.hidden);
		document.addEventListener('visibilitychange', onVis);

		let io: IntersectionObserver | undefined;
		if ('IntersectionObserver' in window && root) {
			io = new IntersectionObserver(([e]) => (inView = e.isIntersecting), { threshold: 0.15 });
			io.observe(root);
		} else {
			inView = true;
		}
		return () => {
			mq.removeEventListener('change', readReduced);
			mo.disconnect();
			document.removeEventListener('visibilitychange', onVis);
			io?.disconnect();
		};
	});
</script>

<figure
	bind:this={root}
	class="sc sc--{variant} {className}"
	class:is-paused={!running}
	class:is-reduced={reduced}
	style:--sc-dur="{duration}ms"
	aria-labelledby={caption ? `${uid}-cap` : undefined}
	aria-label={caption ? undefined : (label ?? S.sampleBadge)}
	onpointerenter={() => (hovering = true)}
	onpointerleave={() => (hovering = false)}
	onfocusin={() => (hovering = true)}
	onfocusout={(e) => {
		if (!root?.contains(e.relatedTarget as Node | null)) hovering = false;
	}}
>
	<!-- The window is an illustration: hidden from assistive tech, the caption describes it. -->
	<div class="sc__window" aria-hidden="true" inert>
		<div class="sc__chrome">
			<span class="sc__dots"><i></i><i></i><i></i></span>
			<span class="sc__url">{S.appUrl}</span>
			<span class="sc__badge">{S.sampleBadge}</span>
		</div>
		<div class="sc__body">
			{#if variant === 'app'}
				<nav class="sc__side">
					<p class="sc__brand"><span class="sc__mark">A</span>{example.business}</p>
					<ul>
						{#each Object.entries(S.nav) as [key, name] (key)}
							<li class:is-current={key === navKey}><span class="sc__ico"></span>{name}</li>
						{/each}
					</ul>
					<p class="sc__site">{example.site}</p>
				</nav>
			{/if}
			<div class="sc__main">
				{#key runKey}
					<div class="sc__scene">
						{#if current === 'home'}<HomeScene {example} ui={S.ui} />
						{:else if current === 'issue'}<IssueScene {example} ui={S.ui} />
						{:else if current === 'reports'}<ReportsScene {example} ui={S.ui} />
						{:else if current === 'subscribers'}<SubscribersScene {example} ui={S.ui} />
						{:else if current === 'automation'}<AutomationScene {example} ui={S.ui} />
						{:else if current === 'source'}<SourceScene {example} ui={S.ui} />
						{:else if current === 'voice'}<VoiceScene {example} ui={S.ui} />
						{:else if current === 'signup'}<SignupScene {example} ui={S.ui} />
						{:else if current === 'blog'}<BlogScene {example} ui={S.ui} />
						{:else if current === 'import'}<ImportScene {example} ui={S.ui} />
						{/if}
					</div>
				{/key}
			</div>
		</div>
	</div>

	{#if controls && (scenes.length > 1 || autoplay)}
		<div class="sc__controls">
			{#if scenes.length > 1}
				<div class="sc__tabs" role="tablist" aria-label={S.scenesLabel}>
					{#each scenes as id, i (id)}
						<button
							id="{uid}-tab-{i}"
							type="button"
							role="tab"
							class="sc__tab"
							aria-selected={i === scene}
							tabindex={i === scene ? 0 : -1}
							onclick={() => pick(i)}
							onkeydown={(e) => onTabKey(e, i)}
						>
							<span class="sc__tab-label">{S.scenes[id]}</span>
							<span class="sc__tab-track" aria-hidden="true">
								{#if i === scene}
									{#key runKey}
										<span class="sc__tab-fill" onanimationend={onProgressEnd}></span>
									{/key}
								{/if}
							</span>
						</button>
					{/each}
				</div>
			{:else}
				<!-- One scene that loops: the hidden bar still drives the timer. -->
				{#key runKey}
					<span class="sc__solo-fill" onanimationend={() => !reduced && runKey++} aria-hidden="true"></span>
				{/key}
			{/if}
			{#if autoplay && !reduced}
				<button
					type="button"
					class="sc__pause"
					aria-pressed={userPaused}
					aria-label={userPaused ? S.play : S.pause}
					title={userPaused ? S.play : S.pause}
					onclick={() => (userPaused = !userPaused)}
				>
					{#if userPaused}
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3.5v9l7-4.5z" fill="currentColor" /></svg>
					{:else}
						<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M5 3.5h2v9H5zM9 3.5h2v9H9z" fill="currentColor" /></svg>
					{/if}
				</button>
			{/if}
		</div>
	{:else if autoplay && !reduced}
		{#key runKey}
			<span class="sc__solo-fill" onanimationend={() => runKey++} aria-hidden="true"></span>
		{/key}
	{/if}

	{#if caption}
		<figcaption id="{uid}-cap" class="sc__caption">{caption}</figcaption>
	{/if}
</figure>

<style lang="scss">
	/* ---------- Window ---------- */
	.sc {
		--sc-radius: var(--radius-xl);
		position: relative;
		margin: 0;
		min-width: 0;
		container-type: inline-size;
		container-name: sc;
	}
	.sc__window {
		position: relative;
		overflow: hidden;
		border: 1px solid var(--border-1);
		border-radius: var(--sc-radius);
		background: var(--surface-0);
		box-shadow: var(--shadow-3);
		font-family: var(--font-body);
		color: var(--text-1);
		font-size: 13px;
		line-height: 1.4;
		user-select: none;
	}
	.sc__chrome {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		height: 36px;
		padding: 0 var(--space-3);
		border-bottom: 1px solid var(--border-1);
		background: var(--surface-1);
	}
	.sc__dots {
		display: inline-flex;
		gap: 6px;
		i {
			width: 9px;
			height: 9px;
			border-radius: 50%;
			background: var(--surface-3);
		}
	}
	.sc__url {
		flex: 1;
		min-width: 0;
		max-width: 16rem;
		margin-inline: auto;
		padding: 3px 12px;
		border-radius: var(--radius-full);
		background: var(--surface-2);
		color: var(--text-3);
		font-size: 11px;
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.sc__badge {
		flex-shrink: 0;
		padding: 2px 9px;
		border: 1px solid var(--border-2);
		border-radius: var(--radius-full);
		color: var(--text-2);
		font-size: 11px;
		font-weight: var(--fw-semibold);
	}
	.sc__body {
		display: flex;
		min-height: 25rem;
	}
	.sc--bare .sc__body {
		min-height: 15rem;
	}

	/* Sidebar, same anatomy as the real one (current item: weight + dot) */
	.sc__side {
		flex: 0 0 11rem;
		display: flex;
		flex-direction: column;
		gap: var(--space-3);
		padding: var(--space-3);
		border-right: 1px solid var(--border-1);
		background: var(--surface-1);
		ul {
			list-style: none;
			margin: 0;
			padding: 0;
			display: grid;
			gap: 2px;
		}
		li {
			display: flex;
			align-items: center;
			gap: 8px;
			padding: 6px 8px;
			border-radius: var(--radius-sm);
			color: var(--text-2);
			transition: background-color var(--dur-slow) var(--ease-out), color var(--dur-slow) var(--ease-out);
		}
		li.is-current {
			background: var(--surface-2);
			color: var(--text-1);
			font-weight: var(--fw-semibold);
		}
		li.is-current::after {
			content: '';
			width: 5px;
			height: 5px;
			margin-left: auto;
			border-radius: 50%;
			background: currentColor;
		}
	}
	.sc__ico {
		width: 12px;
		height: 12px;
		border-radius: 3px;
		border: 1.5px solid currentColor;
		opacity: 0.7;
	}
	.sc__brand {
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0 0 var(--space-2);
		font-weight: var(--fw-semibold);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.sc__mark {
		display: inline-grid;
		place-items: center;
		flex-shrink: 0;
		width: 20px;
		height: 20px;
		border-radius: 6px;
		background: var(--surface-inverse);
		color: var(--text-inverse);
		font-size: 11px;
	}
	.sc__site {
		margin: auto 0 0;
		color: var(--text-3);
		font-size: 11px;
	}
	.sc__main {
		position: relative;
		flex: 1;
		min-width: 0;
		padding: var(--space-5);
		container-type: inline-size;
		container-name: scmain;
	}
	.sc__scene {
		position: relative;
		height: 100%;
	}
	@container sc (width < 40rem) {
		.sc__side {
			display: none;
		}
		.sc__main {
			padding: var(--space-4);
		}
		.sc__body {
			min-height: 22rem;
		}
		/* Pointer positions are tuned for the full layout; hide it when the view reflows. */
		.sc__main :global(.ui-cursor) {
			display: none;
		}
	}

	/* ---------- Controls: scene tabs that fill as the scene plays, and Pause ---------- */
	.sc__controls {
		display: flex;
		align-items: flex-start;
		gap: var(--space-3);
		margin-top: var(--space-4);
	}
	.sc__tabs {
		flex: 1;
		min-width: 0;
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: minmax(0, 1fr);
		gap: var(--space-2);
	}
	.sc__tab {
		display: grid;
		gap: 8px;
		min-height: 44px;
		padding: var(--space-2) 2px;
		border: 0;
		border-radius: var(--radius-sm);
		background: none;
		color: var(--text-3);
		font: inherit;
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		text-align: left;
		cursor: pointer;
		box-shadow: none;
	}
	.sc__tab-label {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	@media (hover: hover) and (pointer: fine) {
		.sc__tab:hover {
			color: var(--text-1);
			box-shadow: none;
		}
	}
	.sc__tab[aria-selected='true'] {
		color: var(--text-1);
		font-weight: var(--fw-semibold);
	}
	.sc__tab:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.sc__tab:active {
		transform: scale(0.98);
	}
	.sc__tab-track {
		position: relative;
		display: block;
		height: 2px;
		border-radius: 2px;
		background: var(--border-1);
		overflow: hidden;
	}
	.sc__tab[aria-selected='true'] .sc__tab-track {
		background: var(--border-2);
	}
	.sc__tab-fill,
	.sc__solo-fill {
		position: absolute;
		inset: 0;
		background: var(--text-1);
		transform-origin: left;
		animation: sc-progress var(--sc-dur) linear both;
	}
	.sc__solo-fill {
		position: absolute;
		width: 0;
		height: 0;
		overflow: hidden;
	}
	.sc.is-reduced .sc__tab-fill {
		animation: none;
	}
	@keyframes sc-progress {
		from {
			transform: scaleX(0);
		}
	}
	.sc__pause {
		flex-shrink: 0;
		display: inline-grid;
		place-items: center;
		width: 44px;
		height: 44px;
		border: 1px solid var(--border-1);
		border-radius: var(--radius-full);
		background: var(--surface-0);
		color: var(--text-1);
		cursor: pointer;
	}
	.sc__pause:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.sc__pause:active {
		transform: scale(0.94);
	}
	.sc__pause[aria-pressed='true'] {
		background: var(--surface-2);
		border-color: var(--border-2);
	}
	/* Small single-view showcases: the Pause button sits on the window's corner. */
	.sc--bare .sc__controls {
		position: absolute;
		right: var(--space-2);
		bottom: var(--space-2);
		margin: 0;
	}
	.sc--bare .sc__pause {
		width: 36px;
		height: 36px;
		background: var(--surface-glass);
		backdrop-filter: blur(8px);
		-webkit-backdrop-filter: blur(8px);
	}
	.sc__caption {
		margin: var(--space-3) 0 0;
		max-width: 60ch;
		color: var(--text-3);
		font-size: var(--fs-xs);
		line-height: var(--lh-normal);
	}

	/* ---------- Choreography kit shared by every scene ----------
	   Rule: every element's normal style is its FINAL state. Animations only describe
	   where it comes from (`from` + fill both), so reduced motion shows the end result. */
	.sc :global(.a-in),
	.sc :global(.a-left),
	.sc :global(.a-pop),
	.sc :global(.a-grow-x),
	.sc :global(.a-grow-y),
	.sc :global(.a-type),
	.sc :global(.a-count),
	.sc :global(.a-press),
	.sc :global(.a-out),
	.sc :global(.a-on),
	.sc :global(.a-cursor) {
		animation-duration: 650ms;
		animation-timing-function: var(--ease-out);
		animation-fill-mode: both;
		animation-delay: calc(var(--d, 0) * 1ms);
	}
	.sc :global(.a-in) {
		animation-name: sc-in;
	}
	.sc :global(.a-left) {
		animation-name: sc-left;
	}
	.sc :global(.a-pop) {
		animation-name: sc-pop;
		animation-timing-function: var(--ease-spring);
	}
	.sc :global(.a-grow-x) {
		animation-name: sc-grow-x;
		transform-origin: left center;
		animation-duration: 900ms;
	}
	.sc :global(.a-grow-y) {
		animation-name: sc-grow-y;
		transform-origin: center bottom;
		animation-duration: 900ms;
	}
	.sc :global(.a-type) {
		animation-name: sc-type;
		animation-timing-function: steps(var(--n, 24), end);
		animation-duration: calc(var(--n, 24) * 45ms);
	}
	.sc :global(.a-count) {
		animation-name: sc-count;
		animation-duration: 1400ms;
		animation-timing-function: cubic-bezier(0.2, 0.8, 0.2, 1);
		counter-reset: sc-n var(--sc-n);
		--sc-n: var(--to, 0);
		font-variant-numeric: tabular-nums;
	}
	.sc :global(.a-count)::after {
		content: counter(sc-n);
	}
	.sc :global(.a-press) {
		animation-name: sc-press;
		animation-duration: 360ms;
		animation-fill-mode: none;
	}
	.sc :global(.a-out) {
		animation-name: sc-out;
		animation-duration: 300ms;
		opacity: 0;
		visibility: hidden;
	}
	.sc :global(.a-cursor) {
		animation-name: sc-cursor;
		animation-duration: 1100ms;
		animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
	}

	/* Paused (button, hover, offscreen, hidden tab): freeze every animation in place. */
	.sc.is-paused :global(*),
	.sc.is-paused :global(*::before),
	.sc.is-paused :global(*::after) {
		animation-play-state: paused !important;
	}
	/* Reduced motion: final states only, no cursor. */
	.sc.is-reduced :global(*),
	.sc.is-reduced :global(*::before),
	.sc.is-reduced :global(*::after) {
		animation: none !important;
	}
	.sc.is-reduced :global(.a-cursor) {
		display: none;
	}

	@keyframes sc-in {
		from {
			opacity: 0;
			transform: translateY(10px);
		}
	}
	@keyframes sc-left {
		from {
			opacity: 0;
			transform: translateX(-14px);
		}
	}
	@keyframes sc-pop {
		from {
			opacity: 0;
			transform: scale(0.88);
		}
	}
	@keyframes sc-grow-x {
		from {
			transform: scaleX(0);
		}
	}
	@keyframes sc-grow-y {
		from {
			transform: scaleY(0);
		}
	}
	@keyframes sc-type {
		from {
			clip-path: inset(0 100% 0 0);
		}
	}
	@keyframes sc-count {
		from {
			--sc-n: 0;
		}
	}
	@keyframes sc-press {
		40% {
			transform: scale(0.93);
		}
	}
	@keyframes sc-out {
		from {
			opacity: 1;
			visibility: visible;
		}
	}
	@keyframes sc-cursor {
		from {
			translate: var(--x0, 0) var(--y0, 0);
			opacity: 0;
		}
		15% {
			opacity: 1;
		}
	}

	/* Shared mini UI pieces for scenes (same anatomy as the real dashboard) */
	.sc :global(.ui-h) {
		margin: 0;
		font-family: var(--font-display);
		font-size: 20px;
		font-weight: var(--fw-semibold);
		letter-spacing: -0.02em;
		line-height: 1.15;
	}
	.sc :global(.ui-sub) {
		margin: 4px 0 0;
		color: var(--text-2);
	}
	.sc :global(.ui-muted) {
		color: var(--text-3);
	}
	.sc :global(.ui-label) {
		margin: 0 0 6px;
		color: var(--text-3);
		font-size: 11px;
		font-weight: var(--fw-semibold);
	}
	.sc :global(.ui-card) {
		padding: 12px 14px;
		border: 1px solid var(--border-1);
		border-radius: var(--radius-lg);
		background: var(--surface-0);
	}
	.sc :global(.ui-pill) {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 1px 8px;
		border: 1px solid var(--border-1);
		border-radius: var(--radius-full);
		color: var(--text-2);
		font-size: 11px;
		font-weight: var(--fw-medium);
		white-space: nowrap;
	}
	.sc :global(.ui-pill--ink) {
		border-color: var(--text-1);
		color: var(--text-1);
	}
	.sc :global(.ui-btn) {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		padding: 0 12px;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-2);
		color: var(--text-1);
		font-size: 12px;
		font-weight: var(--fw-medium);
		white-space: nowrap;
	}
	.sc :global(.ui-btn--ink) {
		border-color: transparent;
		background: var(--accent);
		color: var(--accent-contrast);
	}
	.sc :global(.ui-field) {
		display: flex;
		align-items: center;
		height: 32px;
		padding: 0 10px;
		border: 1px solid var(--border-2);
		border-radius: var(--radius-md);
		background: var(--surface-0);
		white-space: nowrap;
		overflow: hidden;
	}
	.sc :global(.ui-toast) {
		position: absolute;
		right: 0;
		bottom: 0;
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 12px;
		border-radius: var(--radius-md);
		background: var(--surface-inverse);
		color: var(--text-inverse);
		font-size: 12px;
		font-weight: var(--fw-medium);
		box-shadow: var(--shadow-2);
	}
	.sc :global(.ui-check) {
		display: inline-block;
		width: 9px;
		height: 5px;
		border-left: 1.5px solid currentColor;
		border-bottom: 1.5px solid currentColor;
		transform: translateY(-1px) rotate(-45deg);
	}
	/* Fake pointer: a full-size layer translated by % of the scene, the arrow sits at its corner. */
	.sc :global(.ui-cursor) {
		position: absolute;
		z-index: 5;
		inset: 0;
		pointer-events: none;
		translate: var(--x1) var(--y1);
	}
	.sc :global(.ui-cursor svg) {
		position: absolute;
		left: 0;
		top: 0;
		width: 18px;
		height: 18px;
		color: var(--text-1);
		filter: drop-shadow(0 1px 1px rgb(0 0 0 / 0.35));
	}
	.sc :global(.ui-cursor .a-ring) {
		position: absolute;
		left: -9px;
		top: -9px;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 2px solid var(--focus-color);
		opacity: 0;
		animation: sc-ring 500ms var(--ease-out) both;
		animation-delay: calc(var(--d2, 0) * 1ms);
	}
	@keyframes sc-ring {
		from {
			opacity: 0.8;
			transform: scale(0.3);
		}
		to {
			opacity: 0;
			transform: scale(1.5);
		}
	}
</style>
