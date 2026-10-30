<!-- Clicks: bars grow day by day, the total counts up, the most clicked links fill in. -->
<script lang="ts">
	import { type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const max = $derived(Math.max(...example.clicksByDay));
	const peak = $derived(example.clicksByDay.indexOf(max));
	const topMax = $derived(Math.max(...example.topLinks.map((l) => l.clicks)));
</script>

<div class="rep">
	<div class="ui-card a-in">
		<div class="head">
			<p class="ui-label">{ui.clicksTitle}</p>
			<p class="total"><span class="a-count" style:--to={example.clicks7} style:--d="200"></span> <span class="ui-muted">{ui.clicks}</span></p>
		</div>
		<div class="chart">
			{#each example.clicksByDay as v, i (i)}
				<div class="col">
					<span class="val a-in" style:--d={500 + i * 140 + 500}>{v}</span>
					<span class="bar a-grow-y" class:is-peak={i === peak} style:height="{(v / max) * 100}%" style:--d={500 + i * 140}></span>
					<span class="day ui-muted">{ui.days[i]}</span>
				</div>
			{/each}
		</div>
	</div>
	<div class="ui-card a-in" style:--d="1600">
		<p class="ui-label">{ui.mostClicked}</p>
		<ul class="top">
			{#each example.topLinks as l, i (l.title)}
				<li class="a-in" style:--d={1900 + i * 250}>
					<span class="top__t">{l.title}</span>
					<span class="top__bar"><span class="a-grow-x" style:width="{(l.clicks / topMax) * 100}%" style:--d={2100 + i * 250}></span></span>
					<span class="top__n">{l.clicks}</span>
				</li>
			{/each}
		</ul>
	</div>
</div>

<style>
	.rep {
		display: grid;
		gap: 8px;
	}
	.head {
		display: flex;
		justify-content: space-between;
		align-items: baseline;
	}
	.total {
		margin: 0;
		font-size: 22px;
		font-weight: var(--fw-semibold);
		letter-spacing: -0.02em;
	}
	.total .ui-muted {
		font-size: 12px;
		font-weight: var(--fw-regular);
		letter-spacing: 0;
	}
	.chart {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 10px;
		height: 130px;
		margin-top: 8px;
	}
	.col {
		display: grid;
		grid-template-rows: auto 1fr auto;
		align-items: end;
		justify-items: center;
		gap: 4px;
		min-height: 0;
	}
	.val {
		font-size: 10px;
		color: var(--text-3);
		font-variant-numeric: tabular-nums;
	}
	.bar {
		align-self: end;
		width: 100%;
		max-width: 28px;
		min-height: 3px;
		border-radius: 4px 4px 1px 1px;
		background: var(--surface-3);
	}
	.bar.is-peak {
		background: var(--text-1);
	}
	.day {
		font-size: 10px;
	}
	.top {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.top li {
		display: grid;
		grid-template-columns: minmax(0, 1.4fr) 1fr auto;
		align-items: center;
		gap: 10px;
	}
	.top__t {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.top__bar {
		height: 6px;
		border-radius: 3px;
		background: var(--surface-2);
		overflow: hidden;
	}
	.top__bar span {
		display: block;
		height: 100%;
		border-radius: 3px;
		background: var(--text-1);
	}
	.top__n {
		font-variant-numeric: tabular-nums;
		font-weight: var(--fw-semibold);
		min-width: 3ch;
		text-align: right;
	}
</style>
