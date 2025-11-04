<script lang="ts">
	import { writable, type Writable } from 'svelte/store';
	import TagNode from './TagNode.svelte';

	export let tags: { name: string; children?: any[] }[] = [];
	export let selectedTags: Writable<string[]> = writable([]);

	function toggleTag(tag: string) {
		selectedTags.update((currentSelected) => {
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
	{#each tags as node}
		<TagNode {node} {selectedTags} {toggleTag} />
	{/each}
</div>

<style lang="scss">
	.tags-container {
		display: flex;
		flex-wrap: wrap;
		gap: 8px;
		padding: 10px;
		border-radius: 8px;
		background-color: #f0f2f5;
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
</style>
