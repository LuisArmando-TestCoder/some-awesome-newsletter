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
  /* Hosted signup: a calm centred card on the plain page, no shadow (nothing here floats). */
  .subscribe-page {
    min-height: calc(100svh - var(--header-h));
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--gutter);
    background: var(--surface-0);
  }

  .subscribe-page__card {
    box-sizing: border-box;
    width: 100%;
    max-width: var(--container-sm);
    padding: var(--space-8) var(--space-7);
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-2xl);
  }

  /* Phones: open layout, the form sits on the page. */
  @media (max-width: 30rem) {
    .subscribe-page {
      padding-block: var(--space-6);
      place-items: start center;
    }

    .subscribe-page__card {
      padding: 0;
      border: 0;
      border-radius: 0;
    }
  }
</style>
