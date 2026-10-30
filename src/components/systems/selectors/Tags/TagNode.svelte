<script lang="ts">
	import type { TagTreeNode } from "./types";
	import { writable, type Writable } from 'svelte/store';

	export let node: TagTreeNode;
	export let selectedTags: Writable<string[]>;
	export let toggleTag: (tag: string) => void;

	let expanded = writable(false);

	function toggleExpand() {
		expanded.update((val) => !val);
	}
</script>

<div class="tag-node">
	<div class="tag-item">
		<button type="button" class="tag-button" class:selected={$selectedTags.includes(node.name)} on:click={() => toggleTag(node.name)} aria-pressed={$selectedTags.includes(node.name)}>
			{#if $selectedTags.includes(node.name)}<svg class="check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>{/if}
			{node.name}
		</button>
		{#if node.children}
			<button type="button" class="expand-button" on:click={toggleExpand} aria-expanded={$expanded} aria-label={node.name}>
				<svg class="chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6.25 8 10.25l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
			</button>
		{/if}
	</div>
	{#if node.children && $expanded}
		<div class="children">
			{#each node.children as child (child.name)}
				<svelte:self node={child} {selectedTags} {toggleTag} />
			{/each}
		</div>
	{/if}
</div>

<style lang="scss">
	.tag-node {
		width: 100%;
	}
	.tag-item {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		margin-bottom: var(--space-2);
	}

	/* Tag chip: pill, thin edge, ink on paper. Selected = ink fill plus a check (never color alone). */
	.tag-button {
		position: relative;
		display: inline-flex;
		align-items: center;
		gap: var(--space-2);
		min-height: var(--control-h-sm);
		padding: 0 var(--space-4);
		border-radius: var(--radius-full);
		border: 1px solid var(--border-2);
		background-color: var(--surface-0);
		color: var(--text-1);
		font-family: var(--font-body);
		font-size: var(--fs-sm);
		font-weight: var(--fw-medium);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition:
			background-color var(--t-out) var(--ease-out),
			border-color var(--t-out) var(--ease-out),
			color var(--t-out) var(--ease-out),
			box-shadow var(--t-out) var(--ease-out),
			transform var(--dur-base) var(--ease-out);

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: var(--surface-2);
				border-color: var(--text-2);
				transition-duration: var(--t-in);
			}
		}

		&:active {
			transform: scale(0.97);
			transition-duration: 60ms;
		}

		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
		}

		&.selected {
			background-color: var(--text-1);
			color: var(--surface-0);
			border-color: var(--text-1);

			@media (hover: hover) and (pointer: fine) {
				&:hover {
					background-color: var(--text-1);
					box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-1) 16%, transparent);
				}
			}
		}
	}

	.check {
		flex: none;
		width: 0.875rem;
		height: 0.875rem;
		margin-inline-start: calc(-1 * var(--space-1));
	}

	.chevron {
		flex: none;
		width: 1rem;
		height: 1rem;
		color: var(--text-2);
		transition: transform var(--dur-slow) var(--ease-out);
	}

	[aria-expanded='true'] > .chevron,
	[aria-expanded='true'] .chevron {
		transform: rotate(180deg);
	}

	.expand-button {
		display: inline-grid;
		place-items: center;
		width: var(--control-h-sm);
		height: var(--control-h-sm);
		padding: 0;
		border-radius: var(--radius-full);
		border: 1px solid var(--border-2);
		background-color: var(--surface-0);
		color: var(--text-1);
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
		transition:
			background-color var(--t-out) var(--ease-out),
			border-color var(--t-out) var(--ease-out),
			box-shadow var(--t-out) var(--ease-out),
			transform var(--dur-base) var(--ease-out);

		@media (hover: hover) and (pointer: fine) {
			&:hover {
				background-color: var(--surface-2);
				border-color: var(--text-2);
				transition-duration: var(--t-in);
			}
		}

		&:active {
			transform: scale(0.94);
			transition-duration: 60ms;
		}

		&:focus-visible {
			outline: none;
			box-shadow: var(--focus-ring);
		}

		&[aria-expanded='true'] {
			border-color: var(--text-1);
		}
	}
	.children {
		padding-left: var(--space-5);
		border-left: 1px solid var(--border-1);
		margin-left: var(--space-3);
	}

	@media (forced-colors: active) {
		.tag-button {
			border-color: ButtonText;
		}
		.tag-button.selected {
			forced-color-adjust: none;
			background-color: Highlight;
			color: HighlightText;
			border-color: Highlight;
		}
		.tag-button:focus-visible {
			outline: 2px solid CanvasText;
			outline-offset: 2px;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.tag-button:active {
			transform: none;
		}
	}
</style>
