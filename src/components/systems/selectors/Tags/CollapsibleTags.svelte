<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import CollapsibleTagNode from './CollapsibleTagNode.svelte';

	export let tags: { name: string; children?: any[] }[] = [];
	export let selectedTags: Writable<string[]> = writable([]);

	function toggleTag(tag: string) {
		selectedTags.update((currentSelected) => {
			if (currentSelected.includes(tag)) {
				return [];
			} else {
				return [tag];
			}
		});
	}
</script>

<div class="tags-container">
	{#each tags as node}
		<CollapsibleTagNode {node} {selectedTags} {toggleTag} />
	{/each}
</div>

<style lang="scss">
	.tags-container {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding: 10px;
		border-radius: 8px;
	}
</style>
