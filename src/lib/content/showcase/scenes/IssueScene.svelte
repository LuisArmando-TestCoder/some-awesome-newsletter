<!-- The output: the same issue in each reader's language, the language switching on its own. -->
<script lang="ts">
	import { type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const langs = $derived(example.issue.langs);
</script>

<div class="issue">
	<div class="tabs a-in">
		<span class="ui-label tabs__label">{ui.readerLanguage}</span>
		{#each langs as l (l.code)}
			<span class="tab">{l.name}</span>
		{/each}
	</div>
	<div class="mail ui-card a-in" style:--d="150">
		{#each langs as l (l.code)}
			<div class="copy">
				<p class="meta"><span class="ui-muted">{ui.from}</span> <strong>{example.business}</strong></p>
				<p class="meta"><span class="ui-muted">{ui.subject}</span> <strong>{l.subject}</strong></p>
				<hr />
				<p class="brand">{example.business}</p>
				<p class="title">{l.subject}</p>
				<div class="img"></div>
				<p class="sum">{l.summary}</p>
				<span class="ui-btn ui-btn--ink">{ui.readMore}</span>
			</div>
		{/each}
	</div>
</div>

<style>
	/* Each language copy is shown for one third of the scene, on a loop driven by CSS. */
	.issue {
		display: grid;
		gap: 10px;
	}
	.tabs {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 6px;
	}
	.tabs__label {
		margin: 0 6px 0 0;
	}
	/* Three languages, each shown for a third of the scene (keyframes per position). */
	.tab {
		padding: 3px 10px;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-1);
		color: var(--text-2);
		font-size: 12px;
		animation: var(--k) var(--sc-dur) linear both;
	}
	.copy {
		grid-area: 1 / 1;
		animation: var(--k) var(--sc-dur) linear both;
	}
	.tab:nth-of-type(1) { --k: sc-on-1; }
	.tab:nth-of-type(2) { --k: sc-on-2; }
	.tab:nth-of-type(3) { --k: sc-on-3; }
	.copy:nth-child(1) { --k: sc-show-1; }
	.copy:nth-child(2) { --k: sc-show-2; }
	.copy:nth-child(3) { --k: sc-show-3; }
	/* Final state without motion: the first language. */
	.tab:nth-of-type(1) {
		border-color: var(--text-1);
		color: var(--text-1);
		font-weight: var(--fw-semibold);
	}
	.copy:not(:first-child) {
		visibility: hidden;
	}
	.mail {
		position: relative;
		display: grid;
		padding: 16px 18px;
	}
	@keyframes -global-sc-show-1 { 0%, 32% { visibility: visible; opacity: 1; } 34%, 100% { visibility: hidden; opacity: 0; } }
	@keyframes -global-sc-show-2 { 0%, 32% { visibility: hidden; opacity: 0; } 34%, 65% { visibility: visible; opacity: 1; } 67%, 100% { visibility: hidden; opacity: 0; } }
	@keyframes -global-sc-show-3 { 0%, 65% { visibility: hidden; opacity: 0; } 67%, 100% { visibility: visible; opacity: 1; } }
	@keyframes -global-sc-on-1 { 0%, 32% { border-color: var(--text-1); color: var(--text-1); } 34%, 100% { border-color: var(--border-1); color: var(--text-2); } }
	@keyframes -global-sc-on-2 { 0%, 32% { border-color: var(--border-1); color: var(--text-2); } 34%, 65% { border-color: var(--text-1); color: var(--text-1); } 67%, 100% { border-color: var(--border-1); color: var(--text-2); } }
	@keyframes -global-sc-on-3 { 0%, 65% { border-color: var(--border-1); color: var(--text-2); } 67%, 100% { border-color: var(--text-1); color: var(--text-1); } }
	.meta {
		margin: 0 0 3px;
		font-size: 12px;
	}
	hr {
		border: 0;
		border-top: 1px solid var(--border-1);
		margin: 10px 0 12px;
	}
	.brand {
		margin: 0 0 6px;
		font-weight: var(--fw-bold);
		letter-spacing: -0.02em;
	}
	.title {
		margin: 0 0 10px;
		font-family: var(--font-display);
		font-size: 18px;
		font-weight: var(--fw-semibold);
		letter-spacing: -0.02em;
		line-height: 1.2;
	}
	.img {
		height: 64px;
		margin-bottom: 10px;
		border-radius: var(--radius-md);
		background: linear-gradient(135deg, var(--surface-2), var(--surface-3));
	}
	.sum {
		margin: 0 0 12px;
		color: var(--text-2);
	}
</style>
