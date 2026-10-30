<!-- Hosted subscribe page: /subscribe?configuratorId=...&newsSourceId=...&lead=...&language=xx. Owner: WS5. -->
<script lang="ts">
  import { page } from '$app/stores';
  import SubscribeForm from '../../components/systems/widgets/Subscribe/SubscribeForm.svelte';
  import type { PageData } from './$types.js';
  import { ts } from '$lib/i18n/subscribe-translations';

  export let data: PageData;

  $: params = $page.url.searchParams;
  $: configuratorId = data.configuratorId ?? params.get('configuratorId');
  $: newsSourceId = data.newsSourceId ?? params.get('newsSourceId');
  $: lead = data.lead ?? params.get('lead');
  $: language = params.get('language') ?? params.get('lang');
</script>

<svelte:head>
  <title>{$ts.page.title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="subscribe-page">
  <div class="subscribe-page__card">
    <SubscribeForm {configuratorId} {newsSourceId} {lead} defaultLanguage={language} headingLevel={1} />
  </div>
</main>

<style lang="scss">
  .subscribe-page {
    min-height: calc(100vh - var(--header-h));
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--space-4);
    background: var(--surface-0);
  }

  .subscribe-page__card {
    box-sizing: border-box;
    width: 100%;
    max-width: var(--container-sm);
    padding: var(--space-7) var(--space-6);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2);
  }

  @media (max-width: 480px) {
    .subscribe-page {
      padding: var(--space-5) var(--space-3);
      place-items: start center;
    }

    .subscribe-page__card {
      padding: var(--space-6) var(--space-4);
    }
  }
</style>
