<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { get, writable, type Writable } from 'svelte/store';
  import { z } from 'zod';
  import { runtime } from '$lib/config/runtime';
  import Code from '../../../components/systems/inputs/Code/Code.svelte';
  import askForNewAuthCode from '../../../components/systems/requests/askForNewAuthCode';
  import store, { saveToStore } from '../../../components/store';
  import askIsAuthCodeValid from '../../../components/systems/requests/askIsAuthCodeValid';
  import { t } from '$lib/i18n/translations';
  import { at, fmt } from '$lib/tutorial/copy';

  export let mode: 'login' | 'signup' = 'login';
  export let copy: any = writable({});
  export let legal: { termsUrl: string; privacyUrl: string } = { termsUrl: '/legal/terms', privacyUrl: '/legal/privacy' };
  /** Kept for backwards compatibility with existing callers. */
  export let canReveal = true;

  const RESEND_COOLDOWN_S = 30;
  const MAX_RESENDS = 3;
  const RESENT_VISIBLE_MS = 4000;

  const emailSchema = z.string().trim().email();
  const uid = `auth-${mode}-${Math.random().toString(36).slice(2, 8)}`;

  let step: 'email' | 'code' = 'email';
  let email = String(get(store).configuratorEmail || '');

  // Step 1 state
  let emailError = '';
  let sending = false;

  // Step 2 state
  let externalAuthCode: Writable<string>;
  let attempted = false;
  let verifying = false;
  let codeError = false;
  let resendError = '';

  // Resend state
  let lastSentEmail = '';
  let resendCount = 0;
  let cooldown = 0;
  let resending = false;
  let showResent = false;
  let cooldownTimer: ReturnType<typeof setInterval> | null = null;
  let resentTimer: ReturnType<typeof setTimeout> | null = null;

  let codeHeading: HTMLElement;
  let titleHeading: HTMLElement;

  $: resendLimitReached = resendCount >= MAX_RESENDS;

  onMount(() => {
    console.info('[auth-form] mount', { mode, mock: runtime.isMockMode, canReveal });
  });

  onDestroy(() => {
    stopCooldown();
    if (resentTimer) clearTimeout(resentTimer);
  });

  function stopCooldown() {
    if (cooldownTimer) clearInterval(cooldownTimer);
    cooldownTimer = null;
  }

  function startCooldown() {
    stopCooldown();
    cooldown = RESEND_COOLDOWN_S;
    cooldownTimer = setInterval(() => {
      cooldown = Math.max(0, cooldown - 1);
      if (cooldown === 0) stopCooldown();
    }, 1000);
  }

  /** Sends a code to the stored email. Returns true when the backend accepted it. */
  async function sendCode(): Promise<boolean> {
    try {
      await askForNewAuthCode();
    } catch {
      return false;
    }
    return !get(store).authCodeRequestError;
  }

  async function goToStep(next: 'email' | 'code') {
    step = next;
    await tick();
    (next === 'code' ? codeHeading : titleHeading)?.focus();
  }

  async function onEmailSubmit() {
    if (sending) return;
    const value = email.trim();
    if (!emailSchema.safeParse(value).success) {
      emailError = $at.errors.email;
      return;
    }
    emailError = '';
    email = value;

    // Same address and the last code is still fresh: go back to the code step without a new send.
    if (value === lastSentEmail && cooldown > 0) {
      await goToStep('code');
      return;
    }

    if (value !== lastSentEmail) resendCount = 0;
    saveToStore({ configuratorEmail: value });
    sending = true;
    const ok = await sendCode();
    sending = false;
    if (!ok) {
      emailError = $at.errors.send;
      return;
    }
    lastSentEmail = value;
    resetCodeState();
    startCooldown();
    await goToStep('code');
  }

  function resetCodeState() {
    attempted = false;
    codeError = false;
    verifying = false;
    resendError = '';
    externalAuthCode?.set?.('');
  }

  async function onResend() {
    if (resending || cooldown > 0 || resendLimitReached) return;
    resendError = '';
    resending = true;
    const ok = await sendCode();
    resending = false;
    if (!ok) {
      resendError = $at.errors.send;
      return;
    }
    resendCount += 1;
    startCooldown();
    showResent = true;
    if (resentTimer) clearTimeout(resentTimer);
    resentTimer = setTimeout(() => (showResent = false), RESENT_VISIBLE_MS);
  }

  async function onCode(authCode: string) {
    saveToStore({ authCode });
    if (!authCode || authCode.length < 6) return;
    attempted = true;
    codeError = false;
    verifying = true;
    // The store writes localStorage in a microtask; the check reads it from there.
    await tick();
    await Promise.resolve();
    askIsAuthCodeValid(
      () => {
        window.location.href = `/dashboard?x-auth-email=${encodeURIComponent(email)}&x-auth-code=${encodeURIComponent(authCode)}`;
      },
      () => {
        verifying = false;
        codeError = attempted;
      }
    );
  }

  function onChangeEmail() {
    resetCodeState();
    goToStep('email');
  }
</script>

<div class="auth-page">
  <div class="auth-card">
    <header class="auth-header">
      <img src="/logo/logo.png" alt={runtime.appName} class="auth-logo" />
      <h1 class="auth-title" tabindex="-1" bind:this={titleHeading}>{$copy?.title ?? ''}</h1>
      {#if $copy?.subtitle && step === 'email'}
        <p class="auth-subtitle">{$copy.subtitle}</p>
      {/if}
    </header>

    {#if step === 'email'}
      <form class="auth-step" novalidate on:submit|preventDefault={onEmailSubmit}>
        <div class="field">
          <label class="field-label" for="{uid}-email">{$at.emailLabel}</label>
          <input
            id="{uid}-email"
            class="field-input"
            class:has-error={!!emailError}
            type="email"
            name="email"
            autocomplete="email"
            inputmode="email"
            spellcheck="false"
            placeholder={$copy?.emailPlaceholder ?? ''}
            bind:value={email}
            aria-invalid={emailError ? 'true' : undefined}
            aria-describedby="{uid}-email-hint{emailError ? ` ${uid}-email-error` : ''}"
          />
          <p class="field-hint" id="{uid}-email-hint">{$at.emailHint}</p>
          {#if emailError}
            <p class="field-error" id="{uid}-email-error" role="alert">{emailError}</p>
          {/if}
        </div>

        <button type="submit" class="btn btn-primary" disabled={sending} aria-busy={sending}>
          {#if sending}
            <span class="spinner" aria-hidden="true"></span>
            {$t.authForm.sending}
          {:else}
            {$copy?.continueWithEmail ?? ''}
          {/if}
        </button>
      </form>
    {:else}
      <section class="auth-step" aria-labelledby="{uid}-code-title">
        <div class="code-intro">
          <h2 class="code-title" id="{uid}-code-title" tabindex="-1" bind:this={codeHeading}>{$at.codeTitle}</h2>
          <p class="code-sent">{fmt($at.codeSentTo, { email })}</p>
          <p class="field-hint">{$at.codeHint}</p>
        </div>

        <div class="code-input">
          <Code bind:authCode={externalAuthCode} onChange={onCode} />
        </div>

        <div class="status" role="status" aria-live="polite" aria-atomic="true">
          {#if verifying}
            <p class="status-text">{$at.verifying}</p>
          {:else if showResent}
            <p class="status-text status-success">{$at.resent}</p>
          {/if}
        </div>

        {#if codeError && attempted && !verifying}
          <p class="field-error banner" id="{uid}-code-error" role="alert">{$at.errors.code}</p>
        {/if}
        {#if resendError}
          <p class="field-error banner" role="alert">{resendError}</p>
        {/if}

        <div class="code-actions">
          {#if resendLimitReached}
            <p class="resend-limit">
              <a class="link" href="/help">{$at.resendLimit}</a>
            </p>
          {:else}
            <button
              type="button"
              class="btn btn-secondary"
              on:click={onResend}
              disabled={resending || cooldown > 0 || verifying}
              aria-busy={resending}
            >
              {$at.resend}
            </button>
            {#if cooldown > 0}
              <p class="cooldown" aria-live="off">{fmt($at.resendIn, { seconds: cooldown })}</p>
            {/if}
          {/if}

          <button type="button" class="link" on:click={onChangeEmail}>{$at.changeEmail}</button>
        </div>
      </section>
    {/if}

    <footer class="auth-footer">
      {#if $copy?.switchText || $copy?.switchLink}
        <p class="switch-text">
          {$copy?.switchText ?? ''}
          <a href={$copy?.switchHref} class="link">{$copy?.switchLink ?? ''}</a>
        </p>
      {/if}

      <p class="legal-text">
        {$t.authForm.byProceeding.replace('{appName}', runtime.appName)}
        <a href={legal.termsUrl}>{$t.authForm.termsOfService}</a> {$t.authForm.and}
        <a href={legal.privacyUrl}>{$t.authForm.privacyPolicy}</a>.
      </p>
    </footer>
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  .auth-page {
    min-height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4, 16px);
    box-sizing: border-box;
  }

  .auth-card {
    box-sizing: border-box;
    width: 100%;
    max-width: 440px;
    padding: var(--space-7, 48px) var(--space-6, 32px);
    background: var(--surface-1, #ffffff);
    color: var(--text-1, #0f172a);
    border: 1px solid var(--border-1, rgba(15, 23, 42, 0.08));
    border-radius: var(--radius-xl, 20px);
    box-shadow: var(--shadow-3, 0 24px 48px -12px rgba(15, 23, 42, 0.18));
    animation: card-in var(--dur-slow, 320ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1)) both;

    @media (max-width: 480px) {
      padding: var(--space-6, 32px) var(--space-5, 24px);
    }
  }

  @keyframes card-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }

  /* Header */
  .auth-header {
    text-align: center;
    margin-bottom: var(--space-6, 32px);
  }

  .auth-logo {
    display: block;
    height: 40px;
    width: auto;
    margin: 0 auto var(--space-5, 24px);
  }

  .auth-title {
    margin: 0 0 var(--space-2, 8px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-2xl, 1.75rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
    letter-spacing: -0.02em;
    color: var(--text-1, #0f172a);
  }

  .auth-subtitle {
    margin: 0;
    font-size: var(--fs-md, 1rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-2, #475569);
  }

  .auth-title:focus,
  .code-title:focus {
    outline: none;
  }
  .auth-title:focus-visible,
  .code-title:focus-visible {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 4px;
    border-radius: var(--radius-sm, 4px);
  }

  .auth-step {
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 24px);
    animation: step-in var(--dur-base, 200ms) var(--ease-out, ease-out) both;
  }

  @keyframes step-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  /* Field */
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
  }

  .field-label {
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #0f172a);
  }

  .field-input {
    box-sizing: border-box;
    width: 100%;
    min-height: 48px;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    font: inherit;
    font-size: var(--fs-md, 1rem);
    color: var(--text-1, #0f172a);
    background: var(--surface-1, #ffffff);
    border: 1px solid var(--border-2, #cbd5e1);
    border-radius: var(--radius-md, 10px);
    transition: border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      box-shadow var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &::placeholder {
      color: var(--text-3, #94a3b8);
    }

    &:focus {
      outline: none;
      border-color: var(--accent, #0f172a);
      box-shadow: var(--focus-ring);
    }

    &.has-error {
      border-color: var(--danger, #dc2626);
    }
  }

  .field-hint {
    margin: 0;
    font-size: var(--fs-xs, 0.75rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-3, #64748b);
  }

  .field-error {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    line-height: var(--lh-normal, 1.5);
    color: var(--danger, #dc2626);

    &.banner {
      padding: var(--space-3, 12px);
      background: var(--danger-soft, rgba(220, 38, 38, 0.08));
      border-radius: var(--radius-md, 8px);
      text-align: center;
    }
  }

  /* Buttons: one primary, one secondary, one tertiary (link) */
  .btn {
    box-sizing: border-box;
    width: 100%;
    min-height: 48px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    padding: var(--space-3, 12px) var(--space-5, 24px);
    font: inherit;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--radius-md, 10px);
    cursor: pointer;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:focus-visible {
      outline: 2px solid var(--focus-color, #2563eb);
      outline-offset: 2px;
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  .btn-primary {
    background: var(--accent, #0f172a);
    color: var(--accent-contrast, #ffffff);
    border: 1px solid transparent;
    box-shadow: var(--shadow-1, 0 1px 2px rgba(15, 23, 42, 0.08));

    &:hover:not(:disabled) {
      background: var(--accent-hover, #000000);
    }
  }

  .btn-secondary {
    background: transparent;
    color: var(--text-1, #0f172a);
    border: 1px solid var(--border-2, #cbd5e1);

    &:hover:not(:disabled) {
      background: var(--surface-2, #f1f5f9);
    }
  }

  .link {
    padding: 0;
    background: none;
    border: none;
    font: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-link, var(--accent, #0f172a));
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;

    &:hover {
      color: var(--accent-hover, #000000);
    }

    &:focus-visible {
      outline: 2px solid var(--focus-color, #2563eb);
      outline-offset: 2px;
      border-radius: var(--radius-sm, 4px);
    }
  }

  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full, 50%);
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  /* Step 2 */
  .code-intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
    text-align: center;
  }

  .code-title {
    margin: 0;
    font-size: var(--fs-xl, 1.25rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #0f172a);
  }

  .code-sent {
    margin: 0;
    font-size: var(--fs-md, 1rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-2, #475569);
    overflow-wrap: anywhere;
  }

  .code-input :global(.auth-wrapper) {
    margin: 0;
  }

  .status {
    min-height: 1.5em;
    text-align: center;
  }

  .status-text {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #475569);
  }

  .status-success {
    color: var(--success, #15803d);
    font-weight: var(--fw-medium, 500);
  }

  .code-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3, 12px);
  }

  .cooldown,
  .resend-limit {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-2, #475569);
    text-align: center;
  }

  /* Footer */
  .auth-footer {
    margin-top: var(--space-7, 48px);
    padding-top: var(--space-5, 24px);
    border-top: 1px solid var(--border-1, #e2e8f0);
    text-align: center;
  }

  .switch-text {
    margin: 0 0 var(--space-4, 16px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #475569);
  }

  .legal-text {
    margin: 0;
    font-size: var(--fs-xs, 0.75rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-3, #64748b);

    a {
      color: inherit;
      text-decoration: underline;

      &:hover {
        color: var(--text-1, #0f172a);
      }

      &:focus-visible {
        outline: 2px solid var(--focus-color, #2563eb);
        outline-offset: 2px;
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .auth-card,
    .auth-step {
      animation: none;
    }
    .spinner {
      animation: none;
      border-right-color: currentColor;
      opacity: 0.6;
    }
    .field-input,
    .btn {
      transition: none;
    }
  }
</style>
