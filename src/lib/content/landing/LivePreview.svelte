<!--
  LivePreview: a real sample issue written from the visitor's own website (landing hero).
  Calls POST /v1/public/preview-issue (nothing saved or sent) and shows the email in a
  sandboxed frame. One tab per reader language, the visitor's own language first; each
  language is written on demand and kept for the visit.

  States: loading (steps advance while the server works), ready, error (retry, or fall
  back to the sample layout). Every state change is announced politely.
-->
<script lang="ts">
	import { onDestroy } from 'svelte';
	import { publicPreview, previewSrcdoc, type PublicPreview } from '$lib/api/preview';
	import { toUserMessage } from '$lib/api/errors';

	type Labels = {
		badge: string;
		loadingTitle: string;
		steps: string[];
		takes: string;
		readyNote: string;
		readyAnnounce: string;
		languageLabel: string;
		loadingLanguage: string;
		errorTitle: string;
		retry: string;
		showSample: string;
		frameTitle: string;
		openFull: string;
	};
	type Meta = { fromLabel: string; subjectLabel: string };

	interface Props {
		host: string;
		labels: Labels;
		meta: Meta;
		/** UI language of the page; written first and named in this language. */
		uiLanguage: string;
		onfallback?: () => void;
	}
	let { host, labels, meta, uiLanguage, onfallback }: Props = $props();

	type Entry =
		| { state: 'loading'; started: number }
		| { state: 'ready'; data: PublicPreview }
		| { state: 'error'; message: string };

	const fill = (s: string, vars: Record<string, string>) => s.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? `{${k}}`);
	const base = (c: string) => (c === 'jp' ? 'ja' : c).split('-')[0];

	// The visitor's language first, then two common reader languages.
	const languages = $derived([...new Set([base(uiLanguage || 'en'), 'en', 'es', 'de'])].slice(0, 3));
	let active = $state('');
	let entries = $state<Record<string, Entry>>({});
	let controllers: Record<string, AbortController> = {};
	let announce = $state('');
	let now = $state(Date.now());
	let ticker: ReturnType<typeof setInterval> | undefined;

	const names = $derived.by(() => {
		let dn: Intl.DisplayNames | null = null;
		try {
			dn = new Intl.DisplayNames([base(uiLanguage || 'en')], { type: 'language' });
		} catch {
			dn = null;
		}
		const out: Record<string, string> = {};
		for (const c of languages) {
			const n = dn?.of(c) ?? c;
			out[c] = n.charAt(0).toLocaleUpperCase() + n.slice(1);
		}
		return out;
	});

	async function load(code: string, force = false) {
		const current = entries[code];
		if (!force && current && current.state !== 'error') return;
		controllers[code]?.abort();
		const ctl = new AbortController();
		controllers[code] = ctl;
		entries[code] = { state: 'loading', started: Date.now() };
		if (!ticker) ticker = setInterval(() => (now = Date.now()), 1000);
		try {
			const data = await publicPreview(`https://${host}`, code, ctl.signal);
			if (ctl.signal.aborted) return;
			entries[code] = { state: 'ready', data };
			if (code === active) announce = fill(labels.readyAnnounce, { site: host });
		} catch (e) {
			if (ctl.signal.aborted) return;
			entries[code] = { state: 'error', message: toUserMessage(e, '') };
		} finally {
			if (!Object.values(entries).some((x) => x.state === 'loading') && ticker) {
				clearInterval(ticker);
				ticker = undefined;
			}
		}
	}

	// A new site: start over in the visitor's language.
	let lastHost = '';
	$effect(() => {
		if (host === lastHost) return;
		lastHost = host;
		for (const c of Object.values(controllers)) c.abort();
		controllers = {};
		entries = {};
		active = languages[0];
		void load(active);
	});

	function pick(code: string) {
		active = code;
		void load(code);
	}

	function onTabKey(e: KeyboardEvent, i: number) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		const next = languages[(i + (e.key === 'ArrowRight' ? 1 : -1) + languages.length) % languages.length];
		pick(next);
		document.getElementById(`live-tab-${next}`)?.focus();
	}

	const entry = $derived(entries[active]);
	// Steps advance with time while the server works (it does not stream progress).
	const step = $derived(
		entry?.state === 'loading' ? Math.min(labels.steps.length - 1, Math.floor((now - entry.started) / 7000)) : 0
	);

	onDestroy(() => {
		for (const c of Object.values(controllers)) c.abort();
		if (ticker) clearInterval(ticker);
	});
</script>

<figure class="live" aria-busy={entry?.state === 'loading'}>
	<div class="live__chrome">
		<span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>
		<span class="live__badge">{entry?.state === 'ready' ? labels.badge : host}</span>
	</div>

	<div class="live__tabs" role="tablist" aria-label={labels.languageLabel}>
		{#each languages as code, i (code)}
			{@const e = entries[code]}
			<button
				id="live-tab-{code}"
				type="button"
				role="tab"
				class="live__tab"
				aria-selected={active === code}
				aria-controls="live-panel"
				tabindex={active === code ? 0 : -1}
				lang={code}
				onclick={() => pick(code)}
				onkeydown={(ev) => onTabKey(ev, i)}
			>
				{names[code]}
				{#if e?.state === 'loading'}<span class="live__tab-spin" aria-hidden="true"></span>{/if}
			</button>
		{/each}
	</div>

	<div id="live-panel" class="live__panel" role="tabpanel" aria-labelledby="live-tab-{active}">
		{#if !entry || entry.state === 'loading'}
			<div class="live__loading">
				<p class="live__loading-title">{fill(labels.loadingTitle, { site: host })}</p>
				<ol class="live__steps">
					{#each labels.steps as s, i (i)}
						<li class:is-done={i < step} class:is-current={i === step} aria-current={i === step ? 'step' : undefined}>
							<span class="mark" aria-hidden="true"></span>
							{fill(s, { site: host, language: names[active] ?? active })}
						</li>
					{/each}
				</ol>
				<div class="live__bar" aria-hidden="true"><span></span></div>
				<p class="live__takes">{labels.takes}</p>
				<!-- Shape of the email that is coming, so the layout does not jump. -->
				<div class="live__ghost" aria-hidden="true"><i></i><i></i><i class="img"></i><i></i><i class="short"></i></div>
			</div>
		{:else if entry.state === 'ready'}
			<dl class="live__meta">
				<div><dt>{meta.fromLabel}</dt><dd>{entry.data.url.replace(/^https?:\/\//, '')}</dd></div>
				<div><dt>{meta.subjectLabel}</dt><dd>{entry.data.subject}</dd></div>
			</dl>
			<iframe
				class="live__frame"
				title={fill(labels.frameTitle, { site: host })}
				sandbox="allow-popups allow-popups-to-escape-sandbox"
				srcdoc={previewSrcdoc(entry.data.html)}
				loading="lazy"
			></iframe>
		{:else}
			<div class="live__error" role="alert">
				<p class="live__error-title"><span class="ico" aria-hidden="true">!</span>{fill(labels.errorTitle, { site: host })}</p>
				{#if entry.message}<p class="live__error-msg">{entry.message}</p>{/if}
				<div class="live__error-actions">
					<button type="button" class="live__retry" onclick={() => load(active, true)}>{labels.retry}</button>
					{#if onfallback}<button type="button" class="live__fallback" onclick={onfallback}>{labels.showSample}</button>{/if}
				</div>
			</div>
		{/if}
	</div>
	<p class="sr-only" role="status" aria-live="polite">{announce}</p>
</figure>

<style>
	.live {
		margin: 0;
		overflow: hidden;
		border: 1px solid var(--border-1);
		border-radius: var(--radius-xl);
		background: var(--surface-0);
		box-shadow: var(--shadow-3);
		text-align: left;
	}
	.live__chrome {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		height: 40px;
		padding: 0 var(--space-4);
		border-bottom: 1px solid var(--border-1);
		background: var(--surface-1);
	}
	.dots {
		display: inline-flex;
		gap: 6px;
	}
	.dots i {
		width: 10px;
		height: 10px;
		border-radius: 50%;
		background: var(--surface-3);
	}
	.live__badge {
		margin-left: auto;
		padding: 2px 10px;
		border: 1px solid var(--border-2);
		border-radius: var(--radius-full);
		font-size: var(--fs-xs);
		font-weight: var(--fw-semibold);
		color: var(--text-2);
		max-width: 60%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.live__tabs {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--border-1);
	}
	.live__tab {
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-height: 36px;
		padding: 0 var(--space-4);
		border: 1px solid var(--border-1);
		border-radius: var(--radius-full);
		background: var(--surface-0);
		color: var(--text-2);
		font: inherit;
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		cursor: pointer;
		transition:
			border-color var(--t-state) var(--ease-out),
			color var(--t-state) var(--ease-out),
			transform var(--t-out) var(--ease-out);
	}
	@media (hover: hover) and (pointer: fine) {
		.live__tab:hover {
			border-color: var(--border-2);
			color: var(--text-1);
		}
	}
	.live__tab:active {
		transform: scale(0.97);
		transition-duration: 60ms;
	}
	.live__tab:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.live__tab[aria-selected='true'] {
		border-color: var(--text-1);
		color: var(--text-1);
		font-weight: var(--fw-semibold);
		box-shadow: inset 0 0 0 1px var(--text-1);
	}
	.live__tab-spin {
		width: 10px;
		height: 10px;
		border: 1.5px solid var(--border-2);
		border-top-color: var(--text-1);
		border-radius: 50%;
		animation: live-spin 700ms linear infinite;
	}

	.live__panel {
		min-height: 34rem;
	}

	/* Loading */
	.live__loading {
		padding: var(--space-6) var(--space-5);
	}
	.live__loading-title {
		margin: 0 0 var(--space-4);
		font-family: var(--font-display);
		font-size: var(--fs-xl);
		font-weight: var(--fw-semibold);
		letter-spacing: -0.02em;
	}
	.live__steps {
		list-style: none;
		margin: 0 0 var(--space-4);
		padding: 0;
		display: grid;
		gap: var(--space-2);
		color: var(--text-3);
	}
	.live__steps li {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		transition: color var(--t-state) var(--ease-out);
	}
	.live__steps .mark {
		flex-shrink: 0;
		width: 16px;
		height: 16px;
		border: 1.5px solid var(--border-2);
		border-radius: 50%;
	}
	.live__steps li.is-current {
		color: var(--text-1);
		font-weight: var(--fw-semibold);
	}
	.live__steps li.is-current .mark {
		border-color: var(--border-1);
		border-top-color: var(--text-1);
		animation: live-spin 800ms linear infinite;
	}
	.live__steps li.is-done {
		color: var(--text-2);
	}
	.live__steps li.is-done .mark {
		border-color: var(--text-1);
		background: var(--text-1);
		box-shadow: inset 0 0 0 3px var(--surface-0);
	}
	.live__bar {
		position: relative;
		height: 3px;
		border-radius: 2px;
		background: var(--surface-2);
		overflow: hidden;
	}
	.live__bar span {
		position: absolute;
		inset: 0 auto 0 0;
		width: 35%;
		background: var(--text-1);
		border-radius: 2px;
		animation: live-slide 1.6s var(--ease-in-out) infinite;
	}
	.live__takes {
		margin: var(--space-3) 0 var(--space-6);
		color: var(--text-3);
		font-size: var(--fs-sm);
	}
	.live__ghost {
		display: grid;
		gap: var(--space-3);
		opacity: 0.6;
	}
	.live__ghost i {
		display: block;
		height: 12px;
		border-radius: 6px;
		background: var(--surface-2);
	}
	.live__ghost i.img {
		height: 140px;
		border-radius: var(--radius-md);
	}
	.live__ghost i.short {
		width: 55%;
	}

	/* Ready */
	.live__meta {
		margin: 0;
		padding: var(--space-3) var(--space-4);
		border-bottom: 1px solid var(--border-1);
		font-size: var(--fs-sm);
		display: grid;
		gap: 2px;
	}
	.live__meta div {
		display: flex;
		gap: var(--space-3);
		min-width: 0;
	}
	.live__meta dt {
		flex: 0 0 4.5rem;
		color: var(--text-3);
	}
	.live__meta dd {
		margin: 0;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-weight: var(--fw-semibold);
	}
	.live__frame {
		display: block;
		width: 100%;
		height: min(78vh, 46rem);
		border: 0;
		background: #ffffff; /* the email itself is always a light document */
		animation: live-in var(--dur-slow) var(--ease-out);
	}

	/* Error */
	.live__error {
		padding: var(--space-7) var(--space-5);
	}
	.live__error-title {
		display: flex;
		align-items: center;
		gap: var(--space-3);
		margin: 0 0 var(--space-2);
		font-weight: var(--fw-semibold);
		font-size: var(--fs-lg);
	}
	.ico {
		display: inline-grid;
		place-items: center;
		flex-shrink: 0;
		width: 22px;
		height: 22px;
		border-radius: 50%;
		border: 1.5px solid var(--danger);
		color: var(--danger);
		font-size: 13px;
		font-weight: var(--fw-bold);
	}
	.live__error-msg {
		margin: 0 0 var(--space-5);
		color: var(--text-2);
	}
	.live__error-actions {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-3);
	}
	.live__retry,
	.live__fallback {
		min-height: 44px;
		padding: 0 var(--space-5);
		border-radius: var(--radius-full);
		font: inherit;
		font-weight: var(--fw-medium);
		cursor: pointer;
	}
	.live__retry {
		border: 0;
		background: var(--accent);
		color: var(--accent-contrast);
	}
	.live__fallback {
		border: 1px solid var(--border-2);
		background: var(--surface-0);
		color: var(--text-1);
	}
	.live__retry:focus-visible,
	.live__fallback:focus-visible {
		outline: none;
		box-shadow: var(--focus-ring);
	}
	.live__retry:active,
	.live__fallback:active {
		transform: scale(0.97);
	}

	@keyframes live-spin {
		to {
			transform: rotate(360deg);
		}
	}
	@keyframes live-slide {
		from {
			transform: translateX(-100%);
		}
		to {
			transform: translateX(300%);
		}
	}
	@keyframes live-in {
		from {
			opacity: 0;
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.live__bar span,
		.live__steps li.is-current .mark,
		.live__tab-spin {
			animation: none;
		}
		.live__bar span {
			width: 100%;
			opacity: 0.3;
		}
	}
</style>
