<script lang="ts">
	import { writable, type Writable } from 'svelte/store';

	export let node: { name: string; children?: any[] };
	export let selectedTags: Writable<string[]>;
	export let toggleTag: (tag: string) => void;

	let expanded = writable(false);

	function handleClick() {
		if (node.children) {
			expanded.update((val) => !val);
		} else {
			toggleTag(node.name);
		}
	}
</script>

<div class="tag-node">
	<div class="tag-item">
		<button 
			class="tag-button" 
			class:selected={!node.children && $selectedTags.includes(node.name)} 
			class:parent={!!node.children}
			on:click={handleClick}
			aria-pressed={!node.children && $selectedTags.includes(node.name)}
			aria-expanded={node.children ? $expanded : undefined}
		>
			<span class="label">{node.name}</span>
			{#if node.children}
				<span class="arrow">{$expanded ? '▲' : '▼'}</span>
			{/if}
		</button>
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
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		padding: 8px 16px;
		border-radius: 20px;
		border: 1px solid #ccd0d5;
		background-color: #ffffff;
		color: #050505;
		font-size: 14px;
		font-weight: 600;
		cursor: pointer;
		transition: all 0.2s ease-in-out;
		text-align: left;

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

		&.parent {
			border-color: #ddd;
			
			&:hover {
				background-color: #e4e6eb;
			}
		}
	}
	
	.arrow {
		font-size: 10px;
		margin-left: 8px;
		color: #65676b;
	}

	.children {
		padding-left: 12px;
		margin-left: 8px;
		border-left: 2px solid #e4e6eb;
	}
</style>
