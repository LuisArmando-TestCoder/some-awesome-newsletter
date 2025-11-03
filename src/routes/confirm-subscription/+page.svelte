<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import store, { globalLanguage } from '../../components/store';
  import translations from '../../lib/i18n/translations';
  import type en from '../../lib/i18n/locales/en';

  type Translation = typeof en;
  type LanguageKey = keyof typeof translations;

  const typedTranslations = translations as Record<LanguageKey, Translation>;

  let configId: string | null = null;
  let newsSourceId: string | null = null;
  let userEmail: string | null = null;
  let termsAccepted = false;
  let message = '';
  let t: Translation;

  $: {
    const lang = $globalLanguage as LanguageKey;
    t = typedTranslations[lang] || typedTranslations.en;
  }

  onMount(() => {
    const params = $page.url.searchParams;
    configId = params.get('configId');
    newsSourceId = params.get('newsSourceId');
    userEmail = params.get('userEmail');
  });

  async function confirmSubscription() {
    if (!termsAccepted) {
      message = t.confirmSubscription.mustAccept;
      return;
    }

    if (configId && newsSourceId && userEmail) {
      const apiURL = $store.apiURL();
      const response = await fetch(`${apiURL}/confirm-subscription?configId=${configId}&newsSourceId=${newsSourceId}&userEmail=${userEmail}`);
      const data = await response.json();

      if (response.ok) {
        message = data.message;
      } else {
        message = data.error;
      }
    } else {
      message = t.confirmSubscription.invalidLink;
    }
  }
</script>

<div class="container">
  <div class="card">
    <h1>{t.confirmSubscription.title}</h1>
    {#if message}
      <p>{message}</p>
      <a href="/" class="button">{t.confirmSubscription.goBack}</a>
    {:else}
      <p>{t.confirmSubscription.pleaseAccept}</p>
      <div class="terms">
        <input type="checkbox" id="terms" bind:checked={termsAccepted} />
        <label for="terms">
          {t.confirmSubscription.iAccept} <a href="/legal/terms">{t.confirmSubscription.termsAndConditions}</a> {t.confirmSubscription.and}
          <a href="/legal/privacy">{t.confirmSubscription.privacyPolicy}</a>.
        </label>
      </div>
      <button on:click={confirmSubscription}>{t.confirmSubscription.confirm}</button>
    {/if}
  </div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--c-bg-alt);
  }
  .card {
    max-width: 600px;
    padding: var(--space-xl);
    background: var(--c-bg);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-lg);
    text-align: center;
  }
  .terms {
    margin: var(--space-lg) 0;
  }
  .terms a {
    color: blue;
    text-decoration: none;
  }
  .terms a:hover {
    text-decoration: underline;
  }
  button, .button {
    display: inline-block;
    font-weight: 600;
    border-radius: var(--radius-md);
    padding: 0.75rem 1.5rem;
    text-align: center;
    transition: all var(--transition-fast);
    border: 2px solid transparent;
    cursor: pointer;
    background-color: var(--c-primary);
    color: var(--c-white);
  }
  button:hover, .button:hover {
    background-color: var(--c-primary-dark);
  }
</style>
