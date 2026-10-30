<!-- Schedule: the pointer turns the weekly automation on; the next run appears. -->
<script lang="ts">
	import Cursor from './Cursor.svelte';
	import { fill, type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const sentence = $derived(
		fill(ui.automationSentence, { schedule: example.schedule.charAt(0).toUpperCase() + example.schedule.slice(1) })
	);
</script>

<div class="auto">
	<p class="ui-h a-in">{ui.automationTitle}</p>
	<div class="ui-card card a-in" style:--d="200">
		<div class="top">
			<div>
				<p class="sentence">{sentence}</p>
				<p class="ui-muted chips">
					{#each example.languages as l (l.code)}<span class="ui-pill">{l.name}</span>{/each}
				</p>
			</div>
			<span class="switch a-press" style:--d="2100">
				<span class="switch__state">{ui.on}</span>
				<span class="switch__track"><span class="switch__thumb"></span></span>
			</span>
		</div>
		<div class="runs">
			<div class="run a-in" style:--d="2600">
				<span class="ui-label">{ui.nextIssue}</span>
				<strong>{example.schedule}</strong>
			</div>
			<div class="run a-in" style:--d="2800">
				<span class="ui-label">{ui.subscribersTitle}</span>
				<strong>{example.subscribers}</strong>
			</div>
		</div>
	</div>
	<div class="ui-toast a-in" style:--d="2500"><span class="ui-check"></span>{ui.automationOn}</div>
	<Cursor x0="40%" y0="95%" x1="94%" y1="13%" d={1000} />
</div>

<style>
	.auto {
		position: relative;
		display: grid;
		gap: 12px;
		align-content: start;
		min-height: 100%;
		padding-bottom: 44px;
	}
	.card {
		padding: 16px;
	}
	.top {
		display: flex;
		justify-content: space-between;
		gap: 16px;
	}
	.sentence {
		margin: 0 0 10px;
		max-width: 34ch;
		font-size: 14px;
		line-height: 1.45;
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 4px;
		margin: 0;
	}
	/* Switch: the final state is ON; before the click it shows OFF. */
	.switch {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		align-self: flex-start;
		font-size: 12px;
		font-weight: var(--fw-semibold);
	}
	.switch__track {
		position: relative;
		width: 38px;
		height: 22px;
		border-radius: 11px;
		background: var(--text-1);
		animation: sc-track 200ms var(--ease-out) both;
		animation-delay: 2.1s;
	}
	.switch__thumb {
		position: absolute;
		top: 3px;
		left: 19px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background: var(--surface-0);
		animation: sc-thumb 260ms var(--ease-spring) both;
		animation-delay: 2.1s;
	}
	.switch__state {
		animation: sc-state 1ms steps(1) both;
		animation-delay: 2.1s;
	}
	@keyframes -global-sc-track {
		from {
			background: var(--surface-3);
		}
	}
	@keyframes -global-sc-thumb {
		from {
			left: 3px;
		}
	}
	@keyframes -global-sc-state {
		from {
			opacity: 0;
		}
	}
	.runs {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 8px;
		margin-top: 16px;
		padding-top: 12px;
		border-top: 1px solid var(--border-1);
	}
	.run {
		display: grid;
	}
	.run .ui-label {
		margin: 0;
	}
</style>
