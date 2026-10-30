<!-- Subscribers: people arrive one by one with their language, a toast confirms the newest. -->
<script lang="ts">
	import { type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const via = (k: string) => (ui.sources as Record<string, string>)[k] ?? k;
</script>

<div class="subs">
	<div class="head a-in">
		<p class="ui-h">{ui.subscribersTitle}</p>
		<span class="count"><span class="a-count" style:--to={example.subscribers} style:--d="300"></span></span>
	</div>
	<div class="langs a-in" style:--d="200">
		{#each example.languages as l, i (l.code)}
			<div class="lang">
				<span class="lang__n">{l.name}</span>
				<span class="lang__bar"><span class="a-grow-x" style:width="{l.share}%" style:--d={500 + i * 150}></span></span>
				<span class="lang__p">{l.share}%</span>
			</div>
		{/each}
	</div>
	<div class="ui-card table a-in" style:--d="700">
		<div class="row row--head ui-label">
			<span>Email</span><span>{ui.language}</span><span>{ui.joinedVia}</span>
		</div>
		{#each example.people as p, i (p.email)}
			<div class="row" class:is-new={i === 0} style:--d={1100 + (example.people.length - 1 - i) * 450}>
				<span class="email">{p.email}</span>
				<span class="ui-pill">{p.lang}</span>
				<span class="ui-muted">{via(p.via)}</span>
			</div>
		{/each}
	</div>
	<div class="ui-toast a-in" style:--d="3200"><span class="ui-check"></span>{ui.newSubscriber}: {example.people[0].email}</div>
</div>

<style>
	.subs {
		position: relative;
		display: grid;
		gap: 10px;
		min-height: 100%;
		padding-bottom: 40px;
	}
	.head {
		display: flex;
		align-items: baseline;
		gap: 10px;
	}
	.count {
		font-size: 20px;
		font-weight: var(--fw-semibold);
		color: var(--text-3);
	}
	.langs {
		display: grid;
		gap: 6px;
	}
	.lang {
		display: grid;
		grid-template-columns: 6rem 1fr 3ch;
		align-items: center;
		gap: 10px;
		font-size: 12px;
	}
	.lang__bar {
		height: 6px;
		border-radius: 3px;
		background: var(--surface-2);
		overflow: hidden;
	}
	.lang__bar span {
		display: block;
		height: 100%;
		background: var(--text-1);
		border-radius: 3px;
	}
	.lang__p {
		text-align: right;
		font-variant-numeric: tabular-nums;
		color: var(--text-2);
	}
	.table {
		padding: 4px 0;
	}
	.row {
		display: grid;
		grid-template-columns: minmax(0, 1fr) 3.5rem 7rem;
		align-items: center;
		gap: 10px;
		padding: 8px 14px;
		border-top: 1px solid var(--border-1);
		animation: sc-row 500ms var(--ease-out) both;
		animation-delay: calc(var(--d, 0) * 1ms);
	}
	.row--head {
		border-top: 0;
		margin: 0;
		padding-block: 6px;
		animation: none;
	}
	.row.is-new {
		background: var(--surface-1);
		box-shadow: inset 2px 0 0 var(--text-1);
	}
	.email {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	@keyframes -global-sc-row {
		from {
			opacity: 0;
			transform: translateY(-8px);
		}
	}
</style>
