<script lang="ts">
	import type { TagTreeNode } from "./types";
	import { writable, type Writable } from 'svelte/store';
	import TagNode from './TagNode.svelte';

	export let tags: TagTreeNode[] = [];
	export let selectedTags: Writable<string[]> = writable([]);

	function toggleTag(tag: string) {
		selectedTags.update((currentSelected) => {
			// eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary; the store gets a plain array
			const newSelected = new Set(currentSelected);
			if (newSelected.has(tag)) {
				newSelected.delete(tag);
			} else {
				newSelected.add(tag);
			}
			return Array.from(newSelected);
		});
	}
</script>

<div class="tags-container">
	{#each tags as node (node.name)}
		<TagNode {node} {selectedTags} {toggleTag} />
	{/each}
</div>

<style lang="scss">
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: var(--space-2);
		padding: var(--space-3);
		border: 1px solid var(--border-1);
		border-radius: var(--radius-lg);
		background-color: var(--surface-1);
	}
</style>
