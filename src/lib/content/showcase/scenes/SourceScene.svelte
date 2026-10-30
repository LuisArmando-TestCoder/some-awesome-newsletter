<!-- Your website: the address is typed, AIBAN reads the site, the newest articles appear. -->
<script lang="ts">
	import Cursor from './Cursor.svelte';
	import { fill, type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const url = $derived('https://' + example.site);
</script>

<div class="src">
	<p class="ui-label a-in">{ui.sourceLabel}</p>
	<div class="row a-in" style:--d="100">
		<span class="ui-field field"><span class="a-type" style:--n={url.length} style:--d="400">{url}</span></span>
		<span class="ui-btn ui-btn--ink a-press" style:--d="2300">{ui.sourceButton}</span>
	</div>
	<div class="status">
		<p class="reading"><span class="spin"></span>{ui.reading}</p>
		<p class="found a-in" style:--d="3200"><span class="ui-check"></span>{fill(ui.found, { count: example.articles.length })}</p>
	</div>
	<ul class="list">
		{#each example.articles as a, i (a)}
			<li class="ui-card a-in" style:--d={3400 + i * 260}>
				<span class="thumb"></span>
				<span class="t">{a}</span>
				<span class="ui-muted host">{example.site}</span>
			</li>
		{/each}
	</ul>
	<Cursor x0="30%" y0="80%" x1="88%" y1="13%" d={1300} />
</div>

<style>
	.src {
		position: relative;
		display: grid;
		gap: 10px;
		align-content: start;
		min-height: 100%;
	}
	.row {
		display: flex;
		gap: 8px;
	}
	.field {
		flex: 1;
		min-width: 0;
		font-family: var(--font-mono);
		font-size: 12px;
	}
	.status {
		display: grid;
		height: 20px;
	}
	.status p {
		grid-area: 1 / 1;
		display: flex;
		align-items: center;
		gap: 8px;
		margin: 0;
		font-size: 12px;
	}
	/* "Reading" shows from the click until the articles arrive; hidden at the end. */
	.reading {
		color: var(--text-2);
		visibility: hidden;
		animation: sc-reading 3.2s linear both;
	}
	@keyframes -global-sc-reading {
		0%,
		70% {
			opacity: 0;
			visibility: hidden;
		}
		72%,
		99% {
			opacity: 1;
			visibility: visible;
		}
		100% {
			opacity: 0;
			visibility: hidden;
		}
	}
	.found {
		font-weight: var(--fw-semibold);
	}
	.spin {
		width: 12px;
		height: 12px;
		border: 1.5px solid var(--border-2);
		border-top-color: var(--text-1);
		border-radius: 50%;
		animation: sc-spin 700ms linear infinite;
	}
	@keyframes -global-sc-spin {
		to {
			transform: rotate(360deg);
		}
	}
	.list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 6px;
	}
	.list li {
		display: grid;
		grid-template-columns: 40px 1fr auto;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
	}
	.thumb {
		height: 28px;
		border-radius: 6px;
		background: linear-gradient(135deg, var(--surface-2), var(--surface-3));
	}
	.t {
		font-weight: var(--fw-medium);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.host {
		font-size: 11px;
	}
	@container scmain (width < 30rem) {
		.host {
			display: none;
		}
		.list li {
			grid-template-columns: 32px 1fr;
		}
	}
</style>
