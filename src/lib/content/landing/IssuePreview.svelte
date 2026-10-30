<script lang="ts">
	// Email-window mock of one newsletter issue. Purely presentational. Owner: WS2.
	import { buildSample, SAMPLE_LANGUAGES, type SampleLanguage } from '$lib/content/landingSample';

	interface Props {
		host: string | null;
		labels: {
			badge: string;
			fromLabel: string;
			toLabel: string;
			subjectLabel: string;
			languageLabel: string;
			readOnBlog: string;
		};
		/** Show the language switcher. */
		switchable?: boolean;
		language?: SampleLanguage;
		compact?: boolean;
		idPrefix?: string;
	}

	let {
		host,
		labels,
		switchable = true,
		language = $bindable('en'),
		compact = false,
		idPrefix = 'preview'
	}: Props = $props();

	const issue = $derived(buildSample(host, language));

	function onKey(e: KeyboardEvent, i: number) {
		if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
		e.preventDefault();
		const next = (i + (e.key === 'ArrowRight' ? 1 : -1) + SAMPLE_LANGUAGES.length) % SAMPLE_LANGUAGES.length;
		language = SAMPLE_LANGUAGES[next];
		const el = document.getElementById(`${idPrefix}-tab-${SAMPLE_LANGUAGES[next]}`);
		el?.focus();
	}
</script>

<figure class="issue" class:issue--compact={compact} lang={language}>
	<div class="issue__chrome" aria-hidden="true">
		<span></span><span></span><span></span>
		<p class="issue__badge">{labels.badge}</p>
	</div>

	{#if switchable}
		<div class="issue__tabs" role="tablist" aria-label={labels.languageLabel}>
			{#each SAMPLE_LANGUAGES as code, i (code)}
				{@const name = buildSample(host, code).languageName}
				<button
					type="button"
					role="tab"
					id="{idPrefix}-tab-{code}"
					aria-selected={language === code}
					aria-controls="{idPrefix}-panel"
					tabindex={language === code ? 0 : -1}
					class="issue__tab"
					lang={code}
					onclick={() => (language = code)}
					onkeydown={(e) => onKey(e, i)}
				>
					{name}
				</button>
			{/each}
		</div>
	{/if}

	<div
		class="issue__body"
		id="{idPrefix}-panel"
		role={switchable ? 'tabpanel' : undefined}
		aria-labelledby={switchable ? `${idPrefix}-tab-${language}` : undefined}
	>
		<dl class="issue__meta">
			<div><dt>{labels.fromLabel}</dt><dd>{issue.brand} &lt;{issue.fromAddress}&gt;</dd></div>
			{#if !compact}
				<div><dt>{labels.toLabel}</dt><dd>{issue.languageName}</dd></div>
			{/if}
			<div><dt>{labels.subjectLabel}</dt><dd class="issue__subject">{issue.subject}</dd></div>
		</dl>

		<div class="issue__content">
			<p class="issue__brand">{issue.brand}</p>
			<p class="issue__greeting">{issue.greeting}</p>
			<p class="issue__headline">{issue.headline}</p>
			<div class="issue__image" aria-hidden="true"></div>
			{#each compact ? issue.paragraphs.slice(0, 1) : issue.paragraphs as p, itemIndex (itemIndex)}
				<p class="issue__p">{p}</p>
			{/each}
			<p class="issue__cta" aria-hidden="true">{issue.cta}</p>
			{#if !compact}
				<p class="issue__signoff">{issue.signoff}</p>
				<p class="issue__foot">{labels.readOnBlog}: {issue.site}/blog</p>
			{/if}
		</div>
	</div>
</figure>

<style lang="scss">
	.issue {
		margin: 0;
		background: var(--surface-1, #fff);
		border: 1px solid var(--border-1, #e3dfd5);
		border-radius: var(--radius-lg, 16px);
		box-shadow: var(--shadow-3, 0 12px 32px rgb(0 0 0 / 0.08));
		overflow: hidden;
		color: var(--text-1, #1a1a17);
		font-family: var(--font-body, system-ui, sans-serif);
		text-align: left;
	}
	.issue--compact {
		box-shadow: var(--shadow-1, 0 1px 2px rgb(0 0 0 / 0.06));
	}
	.issue__chrome {
		display: flex;
		align-items: center;
		gap: var(--space-2, 8px);
		padding: var(--space-3, 12px) var(--space-4, 16px);
		background: var(--surface-2, #f2efe8);
		border-bottom: 1px solid var(--border-1, #e3dfd5);
		span {
			width: 0.625rem;
			height: 0.625rem;
			border-radius: var(--radius-full, 999px);
			background: var(--border-2, #8c887d);
			opacity: 0.45;
		}
	}
	.issue__badge {
		margin: 0 0 0 auto;
		font-size: var(--fs-xs, 0.75rem);
		font-weight: var(--fw-semibold, 600);
		color: var(--warning, #8a5a00);
		background: var(--warning-soft, #fbf0d9);
		padding: var(--space-1, 4px) var(--space-2, 8px);
		border-radius: var(--radius-full, 999px);
	}
	.issue__tabs {
		display: flex;
		gap: var(--space-1, 4px);
		padding: var(--space-2, 8px) var(--space-4, 16px) 0;
		border-bottom: 1px solid var(--border-1, #e3dfd5);
	}
	.issue__tab {
		appearance: none;
		background: none;
		border: 0;
		border-bottom: 2px solid transparent;
		padding: var(--space-2, 8px) var(--space-3, 12px);
		font: inherit;
		font-size: var(--fs-sm, 0.875rem);
		color: var(--text-2, #4a4943);
		cursor: pointer;
		min-height: 2.75rem;
		transition: color var(--dur-fast, 120ms) var(--ease-out, ease-out);
		&:hover {
			color: var(--text-1, #1a1a17);
		}
		&[aria-selected='true'] {
			color: var(--text-1, #1a1a17);
			font-weight: var(--fw-semibold, 600);
			border-bottom-color: var(--accent, #1f5c4f);
		}
		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring, 0 0 0 3px #1f5c4f);
			border-radius: var(--radius-sm, 6px);
		}
	}
	.issue__body {
		padding: var(--space-4, 16px) var(--space-5, 24px) var(--space-5, 24px);
	}
	.issue__meta {
		margin: 0 0 var(--space-4, 16px);
		display: grid;
		gap: var(--space-1, 4px);
		font-size: var(--fs-sm, 0.875rem);
		div {
			display: flex;
			gap: var(--space-2, 8px);
			min-width: 0;
		}
		dt {
			color: var(--text-3, #6b6a63);
			min-width: 4.5rem;
		}
		dd {
			margin: 0;
			color: var(--text-1, #1a1a17);
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
	.issue__subject {
		font-weight: var(--fw-semibold, 600);
	}
	.issue__content {
		border-top: 1px solid var(--border-1, #e3dfd5);
		padding-top: var(--space-4, 16px);
	}
	.issue__brand {
		margin: 0 0 var(--space-3, 12px);
		font-family: var(--font-display, Georgia, serif);
		font-weight: var(--fw-bold, 700);
		font-size: var(--fs-lg, 1.125rem);
		color: var(--accent, #1f5c4f);
	}
	.issue__greeting,
	.issue__p,
	.issue__signoff {
		margin: 0 0 var(--space-3, 12px);
		font-size: var(--fs-sm, 0.875rem);
		line-height: var(--lh-normal, 1.6);
		color: var(--text-2, #4a4943);
	}
	.issue__headline {
		margin: 0 0 var(--space-3, 12px);
		font-family: var(--font-display, Georgia, serif);
		font-size: var(--fs-xl, 1.3rem);
		line-height: var(--lh-tight, 1.15);
		font-weight: var(--fw-semibold, 600);
		color: var(--text-1, #1a1a17);
		text-wrap: balance;
	}
	.issue__image {
		aspect-ratio: 16 / 7;
		border-radius: var(--radius-md, 10px);
		margin-bottom: var(--space-3, 12px);
		background:
			linear-gradient(135deg, var(--accent-soft, #e6f0ec), var(--surface-2, #f2efe8));
	}
	.issue__cta {
		display: inline-block;
		margin: var(--space-1, 4px) 0 var(--space-4, 16px);
		padding: var(--space-2, 8px) var(--space-4, 16px);
		background: var(--accent, #1f5c4f);
		color: var(--accent-contrast, #fff);
		border-radius: var(--radius-sm, 6px);
		font-size: var(--fs-sm, 0.875rem);
		font-weight: var(--fw-semibold, 600);
	}
	.issue__foot {
		margin: 0;
		font-size: var(--fs-xs, 0.75rem);
		color: var(--text-3, #6b6a63);
	}
	.issue--compact .issue__body {
		padding: var(--space-3, 12px) var(--space-4, 16px) var(--space-4, 16px);
	}
	.issue--compact .issue__headline {
		font-size: var(--fs-lg, 1.125rem);
	}
</style>
