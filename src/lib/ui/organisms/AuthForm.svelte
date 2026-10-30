<script lang="ts" module>
  /** Page copy for the login and signup screens (from $t.auth.login / $t.auth.signup). */
  export type AuthCopy = {
    title?: string;
    subtitle?: string;
    emailPlaceholder?: string;
    continueWithEmail?: string;
    switchText?: string;
    switchLink?: string;
    switchHref?: string;
  };
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from 'svelte';
  import { get, writable, type Writable } from 'svelte/store';
  import { z } from 'zod';
  import { runtime } from '$lib/config/runtime';
  import Button from '$lib/ui/components/Button.svelte';
  import Spinner from '$lib/ui/components/Spinner.svelte';
  import askForNewAuthCode from '../../../components/systems/requests/askForNewAuthCode';
  import store, { saveToStore } from '../../../components/store';
  import askIsAuthCodeValid from '../../../components/systems/requests/askIsAuthCodeValid';
  import { t } from '$lib/i18n/translations';
  import { at, fmt } from '$lib/tutorial/copy';

  export let mode: 'login' | 'signup' = 'login';
  export let copy: Writable<AuthCopy> = writable({});
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
  const CODE_LENGTH = 6;
  // One real input for the code (playbook skill 13): paste, autofill and screen readers all work.
  let externalAuthCode: Writable<string> = writable('');
  let codeInput: HTMLInputElement;
  let verified = false;
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

  /** The translated reason a send failed: paused (503), too many requests (429), or the general message. */
  function sendErrorText(): string {
    const status = Number((get(store) as { authCodeRequestStatus?: number }).authCodeRequestStatus ?? 0);
    const e = $at.errors as Record<string, string>;
    if (status === 503 && e.busy) return e.busy;
    if (status === 429 && e.tooMany) return e.tooMany;
    return e.send;
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
      emailError = sendErrorText();
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
      resendError = sendErrorText();
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
        verified = true;
        window.location.href = `/dashboard?x-auth-email=${encodeURIComponent(email)}&x-auth-code=${encodeURIComponent(authCode)}`;
      },
      () => {
        verifying = false;
        codeError = attempted;
        // Keep focus in the field and select the digits so a retype replaces them.
        codeInput?.select();
      }
    );
  }

  /** Digits only, capped at 6. A full code goes to onCode; anything shorter clears it. */
  function onCodeInput(event: Event) {
    const target = event.currentTarget as HTMLInputElement;
    const clean = target.value.replace(/[^0-9]/g, '').slice(0, CODE_LENGTH);
    target.value = clean;
    externalAuthCode.set(clean);
    onCode(clean.length === CODE_LENGTH ? clean : '');
  }

  function onResendClick() {
    if (verifying) return;
    onResend();
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
            class:shake={!!emailError}
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
          {#if emailError}
            <p class="field-error" id="{uid}-email-error" role="alert">
              <svg class="field-error__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.1v.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
              <span>{emailError}</span>
            </p>
          {/if}
          <p class="field-hint" id="{uid}-email-hint">{$at.emailHint}</p>
        </div>

        <Button type="submit" size="lg" fullWidth loading={sending} loadingLabel={$t.authForm.sending}>
          {$copy?.continueWithEmail ?? ''}
        </Button>
      </form>
    {:else}
      <section class="auth-step" aria-labelledby="{uid}-code-title">
        <div class="code-intro">
          <h2 class="code-title" id="{uid}-code-title" tabindex="-1" bind:this={codeHeading}>{$at.codeTitle}</h2>
          <p class="code-sent" id="{uid}-code-sent">
            <span>{fmt($at.codeSentTo, { email })}</span>
            <span class="code-sent__sep" aria-hidden="true">&middot;</span>
            <button type="button" class="link" on:click={onChangeEmail}>{$at.changeEmail}</button>
          </p>
        </div>

        <div class="code-field" class:is-error={codeError && attempted && !verifying} class:is-busy={verifying} class:is-done={verified}>
          <label class="sr-only" for="{uid}-code">{$t.authForm.codeLabel}</label>
          <input
            bind:this={codeInput}
            id="{uid}-code"
            class="code-input"
            class:shake={codeError && attempted && !verifying}
            type="text"
            name="one-time-code"
            inputmode="numeric"
            autocomplete="one-time-code"
            pattern="[0-9]*"
            maxlength={CODE_LENGTH}
            spellcheck="false"
            autocapitalize="off"
            value={$externalAuthCode}
            on:input={onCodeInput}
            aria-invalid={codeError && attempted && !verifying ? 'true' : undefined}
            aria-busy={verifying ? 'true' : undefined}
            aria-describedby="{uid}-code-sent {uid}-code-hint{codeError && attempted && !verifying ? ` ${uid}-code-error` : ''}"
          />
        </div>

        <div class="status" role="status" aria-live="polite" aria-atomic="true">
          {#if verified}
            <p class="status-text status-success">
              <svg class="status-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {$t.authForm.codeAccepted}
            </p>
          {:else if verifying}
            <p class="status-text"><Spinner size="sm" label="" />{$at.verifying}</p>
          {:else if showResent}
            <p class="status-text status-success">
              <svg class="status-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
              {$at.resent}
            </p>
          {/if}
        </div>

        {#if codeError && attempted && !verifying}
          <p class="field-error field-error--center" id="{uid}-code-error" role="alert">
            <svg class="field-error__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.1v.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            <span>{$at.errors.code}</span>
          </p>
        {/if}
        {#if resendError}
          <p class="field-error field-error--center" role="alert">
            <svg class="field-error__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.1v.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" /></svg>
            <span>{resendError}</span>
          </p>
        {/if}

        <p class="field-hint field-hint--center" id="{uid}-code-hint">{$at.codeHint}</p>

        <div class="code-actions">
          {#if resendLimitReached}
            <p class="resend-limit">
              <a class="link" href="/help">{$at.resendLimit}</a>
            </p>
          {:else}
            <button
              type="button"
              class="link resend"
              on:click={onResendClick}
              aria-disabled={resending || cooldown > 0 || verifying ? 'true' : undefined}
              aria-busy={resending ? 'true' : undefined}
              aria-describedby={cooldown > 0 ? `${uid}-cooldown` : undefined}
            >
              {#if resending}<Spinner size="sm" label="" />{/if}
              {$at.resend}
            </button>
            {#if cooldown > 0}
              <p class="cooldown" id="{uid}-cooldown" aria-live="off">
                <span class="cooldown__ring" style="--p: {cooldown / RESEND_COOLDOWN_S}" aria-hidden="true"></span>
                {fmt($at.resendIn, { seconds: cooldown })}
              </p>
            {/if}
          {/if}
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
  /* Calm, centred sign-in (playbook skill 13, Mono): one field, one ink pill, the code as one
     real input drawn as six underlined slots. Base type and colors come from tokens.scss. */

  .auth-page {
    width: 100%;
    min-height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-6) var(--gutter);
  }

  .auth-card {
    width: 100%;
    max-width: 28rem;
    padding: var(--space-8) var(--space-7);
    background: var(--surface-0);
    color: var(--text-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-2xl);
  }

  /* Phones: an open layout, no box inside the box. */
  @media (max-width: 30rem) {
    .auth-card {
      padding: var(--space-4) 0;
      border: 0;
      border-radius: 0;
    }
  }

  /* ---------- Header ---------- */
  .auth-header {
    margin-bottom: var(--space-7);
  }

  .auth-logo {
    display: block;
    height: 2rem;
    width: auto;
    margin: 0 0 var(--space-7);
  }

  .auth-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
  }

  .auth-subtitle {
    margin: var(--space-3) 0 0;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
  }

  .auth-title:focus,
  .code-title:focus {
    outline: none;
  }
  .auth-title:focus-visible,
  .code-title:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 4px;
    border-radius: var(--radius-sm);
  }

  .auth-step {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    animation: step-in var(--dur-base) var(--ease-out) both;
  }

  @keyframes step-in {
    from {
      opacity: 0;
    }
  }

  /* ---------- Email field ---------- */
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .field-label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
  }

  .field-input {
    width: 100%;
    min-height: 3.25rem;
    padding: 0 var(--space-4);
    font-size: var(--fs-md);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition:
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible,
    &:focus {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &.has-error {
      border-color: var(--danger);
    }
  }

  .field-hint {
    margin: 0;
    font-size: var(--fs-xs);
    line-height: var(--lh-normal);
    color: var(--text-3);

    &--center {
      text-align: center;
    }
  }

  .field-error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--danger);

    &--center {
      justify-content: center;
      text-align: left;
    }
  }

  .field-error__icon,
  .status-icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-top: 0.1em;
  }

  /* ---------- Links (text buttons) ---------- */
  .link {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 1.5rem;
    padding: 0;
    background: none;
    border: 0;
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-link);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    cursor: pointer;
    transition: text-decoration-thickness var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover:not([aria-disabled='true']) {
        text-decoration-thickness: 2px;
        transition-duration: var(--t-in);
      }
    }

    /* The global state layer paints a fill; a text link uses its underline instead. */
    &:is(button) {
      box-shadow: none;
    }

    &:focus-visible {
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
      border-radius: var(--radius-sm);
    }

    &:active:not([aria-disabled='true']) {
      opacity: 0.7;
      transition-duration: 0ms;
    }

    &[aria-disabled='true'] {
      color: var(--text-3);
      text-decoration-color: transparent;
      cursor: not-allowed;
    }

    &[aria-busy='true'] {
      cursor: progress;
    }
  }

  /* ---------- Code step ---------- */
  .code-intro {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .code-title {
    margin: 0;
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
  }

  .code-sent {
    margin: 0;
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-2);
    overflow-wrap: anywhere;
  }

  .code-sent__sep {
    margin-inline: var(--space-1);
    color: var(--text-3);
  }

  /* One input, six slots: monospace digits spread with letter-spacing, and a repeating
     underline drawn under each slot. Slot = 1ch glyph + 1ch spacing. */
  .code-field {
    --_line: var(--border-2);
    display: flex;
    justify-content: center;
    padding-block: var(--space-3);
  }
  .code-field:focus-within {
    --_line: var(--text-1);
  }
  .code-field.is-error {
    --_line: var(--danger);
  }
  .code-field.is-done {
    --_line: var(--success);
  }
  .code-field.is-busy {
    --_line: var(--text-3);
  }

  .code-input {
    box-sizing: border-box;
    width: 13ch;
    height: 1.6em;
    padding: 0 0 0 0.5ch;
    border: 0;
    border-radius: var(--radius-sm);
    background-color: transparent;
    background-image: repeating-linear-gradient(
      90deg,
      transparent 0 0.25ch,
      var(--_line) 0.25ch 1.75ch,
      transparent 1.75ch 2ch
    );
    background-repeat: no-repeat;
    background-position: 0 100%;
    background-size: 12ch 2px;
    background-origin: border-box;
    font-family: var(--font-mono);
    font-size: clamp(1.75rem, 1.4rem + 1.6vw, 2.25rem);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
    letter-spacing: 1ch;
    line-height: 1;
    color: var(--text-1);
    caret-color: var(--text-1);
    text-align: left;
    transition: opacity var(--t-state) var(--ease-out);

    &:focus,
    &:focus-visible {
      outline: none;
    }

    &:focus-visible {
      outline: 2px solid var(--focus-color);
      outline-offset: 0.35em;
    }

    &[aria-busy='true'] {
      opacity: 0.6;
    }
  }

  /* ---------- Status ---------- */
  .status {
    min-height: 1.5em;
    text-align: center;
  }

  .status-text {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  .status-success {
    color: var(--success);
    font-weight: var(--fw-medium);
  }

  .code-actions {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }

  .resend {
    min-height: var(--control-h);
  }

  .cooldown,
  .resend-limit {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-3);
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  .cooldown {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
  }

  /* A ring that empties with the countdown. */
  .cooldown__ring {
    width: 0.875rem;
    height: 0.875rem;
    border-radius: var(--radius-full);
    background: conic-gradient(var(--text-3) calc(var(--p) * 360deg), var(--border-1) 0);
    mask: radial-gradient(circle, transparent 48%, currentColor 52%);
    transition: background var(--dur-base) linear;
  }

  /* ---------- Footer ---------- */
  .auth-footer {
    margin-top: var(--space-7);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);
  }

  .switch-text {
    margin: 0 0 var(--space-3);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  .legal-text {
    margin: 0;
    font-size: var(--fs-xs);
    line-height: var(--lh-normal);
    color: var(--text-3);

    a {
      color: inherit;
      text-decoration: underline;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--text-1);
        }
      }

      &:focus-visible {
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
        border-radius: var(--radius-sm);
      }
    }
  }

  @media (forced-colors: active) {
    .code-input {
      border-bottom: 2px solid CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .auth-step {
      animation: none;
    }
  }
</style>
