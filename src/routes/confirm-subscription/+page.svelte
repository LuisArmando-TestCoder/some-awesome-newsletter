<!--
  Double opt-in landing: /confirm-subscription?configId=...&newsSourceId=...&userEmail=...
  Owner: WS5. One click confirms. The page waits for that click on purpose: mail
  scanners open links automatically, and a GET that confirmed on load would let them do it.
-->
<script lang="ts">
  import { onMount, tick } from 'svelte';
  import { page } from '$app/stores';
  import { ts, fill } from '$lib/i18n/subscribe-translations';
  import { confirmSubscription, fetchPublicInfo } from '../../components/systems/widgets/Subscribe/subscribe';

  type State = 'loading' | 'ready' | 'confirming' | 'success' | 'invalid' | 'notFound' | 'error';

  let state: State = 'loading';
  let configId = '';
  let newsSourceId = '';
  let userEmail = '';
  let token = '';
  let newsletterTitle = '';
  let heading: HTMLElement;

  onMount(async () => {
    const params = $page.url.searchParams;
    configId = params.get('configId') ?? '';
    newsSourceId = params.get('newsSourceId') ?? '';
    token = params.get('token') ?? '';
    // Older confirmation links did not encode the address, so a "+" arrives as a space.
    // Email addresses cannot contain spaces, so turning them back is safe.
    userEmail = (params.get('userEmail') ?? '').trim().replace(/ /g, '+');

    if (!configId || !newsSourceId || !userEmail.includes('@')) {
      state = 'invalid';
      return;
    }
    state = 'ready';
    const info = await fetchPublicInfo(configId, newsSourceId);
    if (info?.newsletterTitle) newsletterTitle = info.newsletterTitle;
  });

  async function confirm() {
    if (state === 'confirming') return;
    state = 'confirming';
    const result = await confirmSubscription(configId, newsSourceId, userEmail, token);
    if (result.ok) state = 'success';
    else if (result.code === 'not_found') state = 'notFound';
    else if (result.code === 'invalid') state = 'invalid';
    else state = 'error';
    await tick();
    heading?.focus();
  }

  function parts(template: string): string[] {
    return fill(template, { email: '\u0000' }).split('\u0000');
  }
</script>

<svelte:head>
  <title>{$ts.confirm.title}</title>
  <meta name="robots" content="noindex" />
</svelte:head>

<main class="confirm">
  <div class="confirm__card" aria-live="polite">
    {#if newsletterTitle}
      <p class="confirm__eyebrow">{newsletterTitle}</p>
    {/if}

    {#if state === 'loading'}
      <p class="confirm__text">{$ts.form.loadingInfo}</p>
    {:else if state === 'ready' || state === 'confirming'}
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>{$ts.confirm.title}</h1>
      <p class="confirm__text">
        {#each parts($ts.confirm.body) as part, i}{#if i > 0}<strong dir="ltr">{userEmail}</strong>{/if}{part}{/each}
      </p>
      <button class="confirm__button" type="button" on:click={confirm} disabled={state === 'confirming'} aria-busy={state === 'confirming'}>
        {state === 'confirming' ? $ts.confirm.confirming : $ts.confirm.button}
      </button>
      <p class="confirm__hint">
        {$ts.confirm.consent}
        <a href="/legal/privacy">{$ts.form.privacy}</a>
      </p>
    {:else if state === 'success'}
      <div class="confirm__icon confirm__icon--ok" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>{$ts.confirm.successTitle}</h1>
      <p class="confirm__text">
        {#each parts($ts.confirm.successBody) as part, i}{#if i > 0}<strong dir="ltr">{userEmail}</strong>{/if}{part}{/each}
      </p>
      <p class="confirm__hint">{$ts.confirm.successTip}</p>
    {:else}
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>
        {state === 'invalid' ? $ts.confirm.invalidTitle : $ts.confirm.title}
      </h1>
      <p class="confirm__error" role="alert">
        {state === 'invalid' ? $ts.confirm.invalidBody : state === 'notFound' ? $ts.confirm.notFoundBody : $ts.confirm.errorBody}
      </p>
      {#if state === 'error'}
        <button class="confirm__button" type="button" on:click={confirm}>{$ts.confirm.retry}</button>
      {:else}
        <a class="confirm__link" href="/">{$ts.confirm.home}</a>
      {/if}
    {/if}
  </div>
</main>

<style lang="scss">
  .confirm {
    min-height: calc(100vh - var(--header-h));
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--space-4);
    background: var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .confirm__card {
    box-sizing: border-box;
    width: 100%;
    max-width: var(--container-sm);
    padding: var(--space-7) var(--space-6);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-2);
  }

  .confirm__eyebrow {
    margin: 0 0 var(--space-4);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-caps);
    text-transform: uppercase;
    color: var(--text-2);
  }

  .confirm__title {
    margin: 0 0 var(--space-3);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    outline: none;
  }

  .confirm__text {
    margin: 0 0 var(--space-5);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);

    strong {
      overflow-wrap: anywhere;
    }
  }

  .confirm__hint {
    margin: var(--space-4) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-2);

    a {
      color: var(--text-2);
    }
  }

  .confirm__error {
    margin: 0 0 var(--space-5);
    padding: var(--space-3) var(--space-4);
    color: var(--text-1);
    background: var(--danger-soft);
    border-inline-start: 3px solid var(--danger);
    border-radius: var(--radius-sm);
  }

  .confirm__button {
    box-sizing: border-box;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 48px;
    padding: var(--space-2) var(--space-5);
    font: inherit;
    font-weight: var(--fw-semibold);
    color: var(--accent-contrast);
    background: var(--accent);
    border: 0;
    border-radius: var(--radius-md);
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease-out);

    &:hover {
      background: var(--accent-hover);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      cursor: progress;
      opacity: 0.75;
    }
  }

  .confirm__link {
    color: var(--text-link);
    font-weight: var(--fw-medium);
  }

  .confirm__icon {
    display: grid;
    place-items: center;
    width: 44px;
    height: 44px;
    margin-block-end: var(--space-4);
    border-radius: var(--radius-full);
  }

  .confirm__icon--ok {
    color: var(--success);
    background: var(--success-soft);
  }

  @media (max-width: 480px) {
    .confirm {
      padding: var(--space-5) var(--space-3);
      place-items: start center;
    }

    .confirm__card {
      padding: var(--space-6) var(--space-4);
    }
  }
</style>
