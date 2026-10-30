<!-- Overview: narrative line, KPI tiles that count up, next issue, activity arriving. -->
<script lang="ts">
	import { fill, type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const narrative = $derived(
		fill(ui.narrative, { subscribers: example.subscribers, languages: example.languages.length, schedule: example.schedule })
	);
	const kpis = $derived([
		{ label: ui.kpiSubscribers, value: example.subscribers, hint: fill(ui.kpiNew, { count: example.newThisWeek }) },
		{ label: ui.kpiLanguages, value: example.languages.length, hint: example.languages.map((l) => l.code.toUpperCase()).join(' · ') },
		{ label: ui.kpiClicks, value: example.clicks7, hint: '' },
		{ label: ui.kpiAutomations, value: example.automationsOn, hint: '' }
	]);
</script>

<div class="home">
	<p class="ui-h a-in">{fill(ui.hello, { business: example.business })}</p>
	<p class="ui-sub a-in" style:--d="120">{narrative}</p>

	<div class="kpis">
		{#each kpis as k, i (k.label)}
			<div class="ui-card kpi a-in" style:--d={300 + i * 90}>
				<p class="ui-label">{k.label}</p>
				<p class="kpi__v a-count" style:--to={k.value} style:--d={400 + i * 90}></p>
				{#if k.hint}<p class="kpi__h ui-muted">{k.hint}</p>{/if}
			</div>
		{/each}
	</div>

	<div class="cols">
		<div class="ui-card next a-in" style:--d="900">
			<p class="ui-label">{ui.nextIssue}</p>
			<p class="next__title">{example.issue.title}</p>
			<p class="ui-muted next__when">{example.schedule}</p>
			<span class="ui-pill ui-pill--ink a-pop" style:--d="1500"><span class="ui-check"></span>{ui.ready}</span>
		</div>
		<div class="ui-card act a-in" style:--d="1000">
			<p class="ui-label">{ui.activity}</p>
			<ul>
				{#each example.activity as item, i (item)}
					<li class="a-left" style:--d={1700 + i * 700}><span class="dot"></span>{item}</li>
				{/each}
			</ul>
		</div>
	</div>
</div>

<style>
	.home {
		display: grid;
		gap: 4px;
	}
	.kpis {
		display: grid;
		grid-template-columns: repeat(4, minmax(0, 1fr));
		gap: 8px;
		margin-top: 14px;
	}
	.kpi__v {
		margin: 0;
		font-size: 24px;
		font-weight: var(--fw-semibold);
		letter-spacing: -0.02em;
		line-height: 1.1;
	}
	.kpi__h {
		margin: 4px 0 0;
		font-size: 11px;
	}
	.cols {
		display: grid;
		grid-template-columns: 5fr 7fr;
		gap: 8px;
		margin-top: 8px;
	}
	.next__title {
		margin: 0 0 4px;
		font-weight: var(--fw-semibold);
	}
	.next__when {
		margin: 0 0 10px;
	}
	.act ul {
		list-style: none;
		margin: 0;
		padding: 0;
		display: grid;
		gap: 8px;
	}
	.act li {
		display: flex;
		gap: 8px;
		align-items: baseline;
		color: var(--text-2);
	}
	.dot {
		flex-shrink: 0;
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: var(--text-1);
		transform: translateY(-1px);
	}
	@container scmain (width < 30rem) {
		.kpis {
			grid-template-columns: repeat(2, minmax(0, 1fr));
		}
		.cols {
			grid-template-columns: 1fr;
		}
	}
</style>
