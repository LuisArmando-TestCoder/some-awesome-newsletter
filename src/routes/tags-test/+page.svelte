<script lang="ts">
	import Tags from '../../components/systems/selectors/Tags/Tags.svelte';
	import { writable } from 'svelte/store';
    import allTags from './allTags';

	const selectedTags = writable(['AI', 'Svelte', 'TypeScript']);
</script>

<h1>Tags Selector Test Page</h1>

<Tags tags={allTags} {selectedTags} />

<h2>Selected Tags:</h2>
<p>{$selectedTags.join(', ')}</p>

<style>
	h1, h2 {
		font-family: sans-serif;
	}
</style>
