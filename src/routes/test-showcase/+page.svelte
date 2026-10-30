<script lang="ts">
	// Internal preview of the sample dashboard showcases (noindex).
	import DashboardShowcase from '$lib/content/showcase/DashboardShowcase.svelte';
	import en from '$lib/i18n/locales/en';
	import { page } from '$app/stores';
	const ex = en.showcase.examples;
	const n = $derived(Number($page.url.searchParams.get('ex') ?? 0));
	const only = $derived($page.url.searchParams.get('scene'));
	const all = ['home', 'issue', 'reports', 'subscribers', 'automation', 'source', 'voice', 'signup', 'blog', 'import'] as const;
	const scenes = $derived(only ? ([only] as unknown as typeof all[number][]) : [...all]);
</script>

<svelte:head><meta name="robots" content="noindex" /></svelte:head>
<main style="max-width: 72rem; margin: 2rem auto; padding: 0 1rem;">
	<DashboardShowcase example={ex[n]} {scenes} caption="Test" />
</main>
