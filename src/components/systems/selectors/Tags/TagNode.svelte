<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	export let node: { name: string; children?: any[] };
	export let selectedTags: Writable<string[]>;
	export let toggleTag: (tag: string) => void;

	let expanded = writable(false);

	function toggleExpand() {
		expanded.update((val) => !val);
	}
</script>

<div class="tag-node">
	<div class="tag-item">
		<button class="tag-button" class:selected={$selectedTags.includes(node.name)} on:click={() => toggleTag(node.name)} aria-pressed={$selectedTags.includes(node.name)}>
			{node.name}
		</button>
		{#if node.children}
			<button class="expand-button" on:click={toggleExpand}>
				{$expanded ? '−' : '+'}
			</button>
		{/if}
	</div>
	{#if node.children && $expanded}
		<div class="children">
			{#each node.children as child}
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
		gap: 8px;
		margin-bottom: 8px;
	}
	.tag-button {
		padding: 8px 16px;
		border-radius: 20px;
		border: 1px solid #ccd0d5;
		background-color: #ffffff;
		color: #050505;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: #e4e6eb;
		}

		&.selected {
			background-color: #1877f2;
			color: #ffffff;
			border-color: #1877f2;

			&:hover {
				background-color: #166fe5;
			}
		}
	}
	.expand-button {
		width: 24px;
		height: 24px;
		border-radius: 50%;
		border: 1px solid #ccd0d5;
		background-color: #ffffff;
		color: #050505;
		font-size: 16px;
		font-weight: 600;
		cursor: pointer;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: all 0.2s ease-in-out;

		&:hover {
			background-color: #e4e6eb;
		}
	}
	.children {
		padding-left: 24px;
		border-left: 1px solid #ccd0d5;
		margin-left: 12px;
	}
</style>
