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
  import Button from '$lib/ui/components/Button.svelte';

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
  <div class="confirm__card" aria-live="polite" aria-busy={state === 'loading'}>
    {#if newsletterTitle}
      <p class="confirm__eyebrow">{newsletterTitle}</p>
    {/if}

    {#if state === 'loading'}
      <div class="confirm__skeleton" aria-hidden="true">
        <span class="sk sk--title"></span>
        <span class="sk sk--line"></span>
        <span class="sk sk--line sk--short"></span>
        <span class="sk sk--button"></span>
      </div>
      <p class="sr-only">{$ts.form.loadingInfo}</p>
    {:else if state === 'ready' || state === 'confirming'}
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>{$ts.confirm.title}</h1>
      <p class="confirm__text">
        {#each parts($ts.confirm.body) as part, i (i)}{#if i > 0}<strong dir="ltr">{userEmail}</strong>{/if}{part}{/each}
      </p>
      <Button size="lg" fullWidth loading={state === 'confirming'} loadingLabel={$ts.confirm.confirming} onclick={confirm}>
        {$ts.confirm.button}
      </Button>
      <p class="confirm__hint">
        {$ts.confirm.consent}
        <a href="/legal/privacy">{$ts.form.privacy}</a>
      </p>
    {:else if state === 'success'}
      <div class="confirm__icon confirm__icon--ok" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
      </div>
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>{$ts.confirm.successTitle}</h1>
      <p class="confirm__text">
        {#each parts($ts.confirm.successBody) as part, i (i)}{#if i > 0}<strong dir="ltr">{userEmail}</strong>{/if}{part}{/each}
      </p>
      <p class="confirm__hint">{$ts.confirm.successTip}</p>
    {:else}
      <div class="confirm__icon confirm__icon--error" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"><path d="M12 7v6.5M12 17v.5" /></svg>
      </div>
      <h1 class="confirm__title" tabindex="-1" bind:this={heading}>
        {state === 'invalid' ? $ts.confirm.invalidTitle : $ts.confirm.title}
      </h1>
      <p class="confirm__error" role="alert">
        {state === 'invalid' ? $ts.confirm.invalidBody : state === 'notFound' ? $ts.confirm.notFoundBody : $ts.confirm.errorBody}
      </p>
      {#if state === 'error'}
        <Button size="lg" fullWidth onclick={confirm}>{$ts.confirm.retry}</Button>
      {:else}
        <a class="confirm__link" href="/">{$ts.confirm.home} <span aria-hidden="true">&#8250;</span></a>
      {/if}
    {/if}
  </div>
</main>

<style lang="scss">
  /* Double opt-in: one sentence, one ink pill. Calm card, no shadow. */
  .confirm {
    min-height: calc(100svh - var(--header-h));
    display: grid;
    place-items: center;
    padding: var(--space-8) var(--gutter);
    background: var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .confirm__card {
    box-sizing: border-box;
    width: 100%;
    max-width: var(--container-sm);
    padding: var(--space-8) var(--space-7);
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-2xl);
  }

  .confirm__eyebrow {
    margin: 0 0 var(--space-4);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  .confirm__title {
    margin: 0 0 var(--space-4);
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-display);
    text-wrap: balance;
    outline: none;
  }

  .confirm__title:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }

  .confirm__text {
    margin: 0 0 var(--space-6);
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);

    strong {
      color: var(--text-1);
      font-weight: var(--fw-semibold);
      overflow-wrap: anywhere;
    }
  }

  .confirm__hint {
    margin: var(--space-5) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);

    a {
      color: var(--text-2);
    }
  }

  .confirm__error {
    margin: 0 0 var(--space-6);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .confirm__link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-h);
    color: var(--text-link);
    font-weight: var(--fw-medium);

    span {
      transition: transform var(--dur-base) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover span {
        transform: translateX(3px);
      }
    }
  }

  .confirm__icon {
    display: grid;
    place-items: center;
    width: 3rem;
    height: 3rem;
    margin-block-end: var(--space-5);
    border: 1.5px solid currentColor;
    border-radius: var(--radius-full);
  }

  .confirm__icon--ok {
    color: var(--success);
  }

  .confirm__icon--error {
    color: var(--danger);
  }

  /* Loading: a skeleton shaped like the ready state. */
  .confirm__skeleton {
    display: grid;
    gap: var(--space-3);
  }

  .sk {
    display: block;
    height: 1rem;
    border-radius: var(--radius-sm);
    background: var(--surface-2);
    animation: confirm-pulse 1.4s var(--ease-in-out) infinite;
  }

  .sk--title {
    width: 70%;
    height: 2.25rem;
    margin-bottom: var(--space-3);
  }

  .sk--short {
    width: 55%;
  }

  .sk--button {
    height: 3.5rem;
    margin-top: var(--space-5);
    border-radius: var(--radius-full);
  }

  @keyframes confirm-pulse {
    50% {
      opacity: 0.5;
    }
  }

  @media (max-width: 30rem) {
    .confirm {
      padding-block: var(--space-6);
      place-items: start center;
    }

    .confirm__card {
      padding: 0;
      border: 0;
      border-radius: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .sk {
      animation: none;
    }
  }
</style>
