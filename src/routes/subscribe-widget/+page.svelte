<!--
  Embeddable signup form. Owner: WS5.
  /subscribe-widget?configuratorId=...&newsSourceId=...
    &layout=full|compact  &theme=auto|light|dark  &accent=1f5c4f  &logo=0|1
    &lang=xx (interface language)  &language=xx (preselected issue language)  &lead=https://...
  Loaded in an iframe directly or by /subscribe-widget/embed.js, which listens for
  { source: 'aiban-subscribe', type: 'resize', height } messages.
-->
<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { page } from '$app/stores';
  import { browser } from '$app/environment';
  import SubscribeForm from '../../components/systems/widgets/Subscribe/SubscribeForm.svelte';
  import { setSubscribeLocale, ts } from '$lib/i18n/subscribe-translations';
  import { postToParent } from '../../components/systems/widgets/Subscribe/subscribe';

  $: params = $page.url.searchParams;
  $: configuratorId = params.get('configuratorId');
  $: newsSourceId = params.get('newsSourceId');
  $: layout = (params.get('layout') === 'compact' ? 'compact' : 'full') as 'full' | 'compact';
  $: accent = params.get('accent');
  $: showLogo = params.get('logo') !== '0';
  $: lead = params.get('lead');
  $: language = params.get('language');

  let previousTheme: string | undefined;
  let frame: HTMLDivElement;
  let observer: ResizeObserver | null = null;

  onMount(() => {
    document.body.classList.add('aiban-embed');
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        postToParent({ type: 'resize', height: Math.ceil(frame.getBoundingClientRect().height) + 2 });
      });
      observer.observe(frame);
    }
    const ui = params.get('lang');
    // The layout's LanguagePicker sets strings on mount too; apply the embed's choice after it.
    if (ui) setTimeout(() => setSubscribeLocale(ui), 0);

    // The embed follows its own theme param, not the visitor's AIBAN preference. Applied after
    // the layout's ThemeChanger has run its own onMount.
    const theme = params.get('theme');
    previousTheme = document.documentElement.dataset.theme;
    setTimeout(() => {
      if (theme === 'light' || theme === 'dark') {
        document.documentElement.dataset.theme = theme;
      } else if (window.matchMedia) {
        document.documentElement.dataset.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      }
    }, 0);
  });

  onDestroy(() => {
    observer?.disconnect();
    if (!browser) return;
    document.body.classList.remove('aiban-embed');
    if (previousTheme) document.documentElement.dataset.theme = previousTheme;
  });
</script>

<svelte:head>
  <title>{$ts.page.title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="embed" bind:this={frame}>
  <SubscribeForm {configuratorId} {newsSourceId} {layout} {accent} {showLogo} {lead} defaultLanguage={language} uiLanguage={params.get('lang')} embedded reportSize={false} headingLevel={2} />
</div>

<style lang="scss">
  /* Inside an iframe the site chrome has no place. WS1 asked to skip it in the layout; this is the fallback. */
  :global(body.aiban-embed) {
    background: transparent !important;
    min-height: 0 !important;
  }

  :global(body.aiban-embed .header-wrapper),
  :global(body.aiban-embed .lang-picker) {
    display: none !important;
  }

  /* The form keeps its own surface so text stays readable on any host page color. */
  .embed {
    padding: var(--space-5);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }
</style>
