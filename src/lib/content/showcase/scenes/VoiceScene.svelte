<!-- Your voice: the ideal reader is written in, tone chips are picked. -->
<script lang="ts">
	import Cursor from './Cursor.svelte';
	import { type Example, type ShowcaseUi } from '../types';
	let { example, ui }: { example: Example; ui: ShowcaseUi } = $props();
	const extra = ['Formal', 'Playful'];
</script>

<div class="voice">
	<div class="a-in">
		<p class="ui-label">{ui.voiceReader}</p>
		<div class="ui-card area">
			{#each example.reader.split(' ') as word, i (i)}<span class="word" style:--w={i}>{word} </span>{/each}
			<span class="caret"></span>
		</div>
	</div>
	<div class="a-in" style:--d="400">
		<p class="ui-label">{ui.voiceTone}</p>
		<div class="chips">
			{#each example.tones as tone, i (tone)}
				<span class="chip is-on" style:--d={2400 + i * 450}><span class="ui-check"></span>{tone}</span>
			{/each}
			{#each extra as tone (tone)}
				<span class="chip">{tone}</span>
			{/each}
		</div>
	</div>
	<Cursor x0="60%" y0="20%" x1="24%" y1="44%" d={2200} />
</div>

<style>
	.voice {
		position: relative;
		display: grid;
		gap: 16px;
		align-content: start;
		min-height: 100%;
	}
	.area {
		min-height: 88px;
		padding: 12px 14px;
		font-size: 14px;
		line-height: 1.5;
	}
	/* Words appear one after another, like typing. */
	.word {
		animation: sc-word 1ms steps(1) both;
		animation-delay: calc(300ms + var(--w) * 90ms);
	}
	@keyframes -global-sc-word {
		from {
			opacity: 0;
		}
	}
	.caret {
		display: inline-block;
		width: 1px;
		height: 1em;
		margin-left: 2px;
		background: var(--text-1);
		vertical-align: -2px;
		animation: sc-blink 1s steps(1) infinite;
	}
	@keyframes -global-sc-blink {
		50% {
			opacity: 0;
		}
	}
	.chips {
		display: flex;
		flex-wrap: wrap;
		gap: 6px;
	}
	.chip {
		display: inline-flex;
		align-items: center;
		gap: 6px;
		padding: 5px 12px;
		border: 1px solid var(--border-1);
		border-radius: var(--radius-full);
		color: var(--text-2);
		font-size: 12px;
		font-weight: var(--fw-medium);
	}
	.chip .ui-check {
		display: none;
	}
	/* Final state is selected; before its moment it looks unselected. */
	.chip.is-on {
		border-color: var(--text-1);
		background: var(--text-1);
		color: var(--surface-0);
		animation: sc-chip 220ms var(--ease-out) both;
		animation-delay: calc(var(--d) * 1ms);
	}
	.chip.is-on .ui-check {
		display: inline-block;
		animation: sc-word 1ms steps(1) both;
		animation-delay: calc(var(--d) * 1ms);
	}
	@keyframes -global-sc-chip {
		from {
			border-color: var(--border-1);
			background: transparent;
			color: var(--text-2);
		}
	}
</style>
