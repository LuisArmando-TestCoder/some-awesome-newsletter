<script lang="ts">
  import { onMount } from 'svelte';
  import { z } from 'zod';
  import { runtime } from '$lib/config/runtime';
  import EmailInput from '$lib/ui/components/EmailInput.svelte';
    import Code from '../../../components/systems/inputs/Code/Code.svelte';
    import MarkdownText from '../../../components/systems/texts/MarkdownText/MarkdownText.svelte';
    import askForNewAuthCode from '../../../components/systems/requests/askForNewAuthCode';
    import type { Writable } from 'svelte/store';
    import store, { saveToStore } from '../../../components/store';
    import askIsAuthCodeValid from '../../../components/systems/requests/askIsAuthCodeValid';
    import logout from '../../../components/systems/requests/logout';

  export let mode: 'login' | 'signup' = 'login';
  export let copy: any; // from auth.json (login or signup branch)
  export let legal: { termsUrl: string; privacyUrl: string } = { termsUrl: '/legal/terms', privacyUrl: '/legal/privacy' };
  let externalAuthCode: Writable<string>;

  export let canReveal = true;

  const emailSchema = z.string().email();
  let email = '';
  let errorMsg = '';
  let loading = false;

  // Step state: 'initial' = show Google + Email, 'code' = show code input
  let step: 'initial' | 'code' = 'initial';

  onMount(() => {
    console.info('[auth-form] mount', { mode, mock: runtime.isMockMode });
  });

  async function onEmail() {
    // Validate email
    if (!emailSchema.safeParse(email).success) {
      errorMsg = 'Please enter a valid email address.';
      return;
    }
    errorMsg = '';
    loading = true;
    try {
      await askForNewAuthCode();
      step = 'code';
    } catch (e) {
      errorMsg = 'Failed to send auth code. Please try again.';
    }
    loading = false;
  }

  function goBack() {
    step = 'initial';
    // Optionally clear code/email state if needed
  }
</script>

<div class="auth-form">
  <div class="auth-form__card">
    <div class="auth-form__header">
      <img src="/icons/logo.png" width="175" alt="logo" class="auth-form__logo" />
      <h1 class="auth-form__title">{copy?.title}</h1>
    </div>
    {#if copy?.subtitle}
      <p class="auth-form__subtitle">{copy?.subtitle}</p>
    {/if}

    <div class="auth-form__container {step === 'initial' ? 'show' : 'hide'}">
      <!-- Google (form redirect) -->
      <form class="auth-form__google-form" method="post" action="?/OAuth2" style="margin-bottom: var(--space-md);">
        <button class="auth-form__button auth-form__button--google" type="submit">
          <svg aria-hidden="true" viewBox="0 0 24 24" class="auth-form__icon"><path fill="currentColor" d="M21.35 11.1h-9.18v2.96h5.27c-.23 1.46-1.59 4.29-5.27 4.29-3.17 0-5.76-2.62-5.76-5.85s2.59-5.85 5.76-5.85c1.81 0 3.02.77 3.72 1.43l2.53-2.44C16.6 3.83 14.49 3 12.17 3 6.97 3 2.75 7.22 2.75 12.5S6.97 22 12.17 22c7.08 0 8.78-6.1 8.78-9.27 0-.63-.07-1.03-.17-1.63Z"/></svg>
          <span>{copy?.google}</span>
        </button>
      </form>
      <!-- Divider -->
      <div class="auth-form__divider">
        <span class="auth-form__divider-line"></span>
        <span>{copy?.or}</span>
        <span class="auth-form__divider-line"></span>
      </div>
      <!-- Email input -->
      <EmailInput bind:value={email} placeholder={copy?.emailPlaceholder} label="Email" onEnter={() => onEmail()} 
        onChange={(value) => {
          saveToStore({
            configuratorEmail: value,
          });
        }} />
      <button onclick={onEmail} class="auth-form__button auth-form__button--primary" disabled={loading}>
        {loading ? 'Sending...' : copy?.continueWithEmail}
      </button>
      {#if errorMsg}
        <p class="auth-form__error">{errorMsg}</p>
      {/if}
    </div>

    <div class="auth-form__container {step === 'code' ? 'show' : 'hide'}">
      <div class="center">
        <MarkdownText canReveal={$store.hasNewEmailCodeBeenSent}>
          **We sent an auth code to your email**
        </MarkdownText>
      </div>
      <Code
        bind:authCode={externalAuthCode}
        onChange={(authCode) => {
          saveToStore({
            authCode,
          });

          if (authCode) {
            saveToStore({
              hasNewEmailCodeBeenSent: true,
              isAuthCodeValid: true,
            });
            askIsAuthCodeValid(() => {              
              window.location.href = `/dashboard?x-auth-email=${email}&x-auth-code=${authCode}`;
            });
          }
        }}
      />
      {#if !$store.isAuthCodeValid && $store.authCode && $store.hasNewEmailCodeBeenSent}
        <div class="error center">Invalid auth code provided</div>
      {/if}

      <button
        aria-label="Request a new code"
        class="resend"
        onclick={() => {
          askForNewAuthCode();
        }}
      >
        If you didn't receive the email, you can regenerate the code here
      </button>
      <button onclick={goBack} class="auth-form__button auth-form__button--google" style="margin-top: 1rem;">
        ← Back
      </button>
    </div>

    <!-- Switch link -->
    <p class="auth-form__switch">
      {copy?.switchText}
      <a href={copy?.switchHref} class="auth-form__switch-link">{copy?.switchLink}</a>
    </p>

    <!-- Legal -->
    <p class="auth-form__legal">
      By proceeding, you are agreeing to {runtime.appName}'s
      <a href={legal.termsUrl} class="auth-form__legal-link">Terms of Service</a> and
      <a href={legal.privacyUrl} class="auth-form__legal-link">Privacy Policy</a>.
    </p>
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';


  .error {
    color: red;
  }

  .center {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .resend {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    justify-content: end;
    width: 100%;
    text-decoration: underline;

    &::after {
      content: "<";
      display: inline-block;
      position: relative;
      animation: wave 1s ease-in-out infinite;
      left: 0;

      @keyframes wave {
        0% {
          left: 0px;
        }

        50% {
          left: 10px;
        }
      }
    }

    &:hover {
      text-decoration:wavy;

      &::after {
        animation: none;
      }
    }
  }

  .auth-form {
    padding: var(--space-xl) 0;
    height: 100vh;
    display: grid;
    place-items: center;

    &__card {
      background: var(--c-white);
      border-radius: var(--radius-lg);
      padding: var(--space-lg);
      box-shadow: var(--shadow-md);
      transition: transform var(--transition-normal), box-shadow var(--transition-normal);
      max-width: 440px;
      margin: 0 auto;
      display: grid;

      &:hover {
        transform: translateY(-4px);
        box-shadow: var(--shadow-lg);
      }
    }

    &__header {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      place-items: center start;
      grid-gap: var(--space-sm);
      margin-bottom: var(--space-md);
    }

    &__logo {
      display: block;
    }

    &__title {
      margin: 0;
      line-height: 1.2;
      letter-spacing: -0.01em;
      color: var(--c-text);
      text-align: right;
    }

    &__subtitle {
      margin-bottom: var(--space-lg);
    }

    &__button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      width: 100%;
      padding: 0.5rem 1rem;
      border-radius: var(--radius-md);
      font-weight: 600;
      margin-bottom: var(--space-md);
      border: 0 solid #000;

      &--google {
        border: 1.5px solid var(--c-border);
        background: var(--c-bg);
        color: var(--c-text);

        &:hover {
          background: var(--c-bg-alt);
          color: var(--c-primary-dark);
          text-decoration: none;
        }
      }

      &--primary {
        background: var(--c-primary);
        color: var(--c-white);
        font-weight: 700;
        transition: .1s;

        &:hover {
          background: var(--c-primary-dark);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
          text-decoration: none;
          transform: scale(1.01);
        }
      }
    }

    &__icon {
      width: 20px;
      height: 20px;
      opacity: 0.9;
    }

    &__divider {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: var(--space-sm);
      margin: var(--space-lg) 0;
      color: var(--c-text-light);
      letter-spacing: 0.08em;
    }

    &__divider-line {
      height: 1px;
      background: var(--c-border);
      width: 100%;
      max-width: 120px;
    }

    &__label {
      color: var(--c-text);
      font-weight: 600;
      margin-bottom: var(--space-xs);
      display: block;
    }

    &__input {
      appearance: none;
      width: 100%;
      background: var(--c-bg);
      color: var(--c-text);
      border: 1.5px solid var(--c-border);
      border-radius: var(--radius-md);
      padding: 0.7rem 0.9rem;
      line-height: 1.4;
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast), background var(--transition-fast);
      margin-bottom: var(--space-md);

      &::placeholder { color: var(--c-text-muted, #9aa3af); opacity: 0.9; }

      &:hover { border-color: var(--c-border-strong, #cbd5e1); }

      &:focus {
        border-color: var(--c-primary);
        outline: 0;
        box-shadow: 0 0 0 3px color-mix(in oklab, var(--c-primary) 20%, transparent);
        background: var(--c-white);
      }
    }

    &__error {
      margin: 0 0 var(--space-xs);
      font-weight: 600;
      animation: shake 280ms ease-in-out;
      color: red;
    }

    &__switch {
      color: var(--c-text-light);
      margin-top: var(--space-md);
    }

    &__switch-link {
      color: var(--c-primary);
      font-weight: 700;
      text-decoration: none;
      &:hover { text-decoration: underline; }
    }

    &__legal {
      max-width: 440px;
      margin: var(--space-lg) auto 0;
      color: var(--c-text-light);
      line-height: 1.5;
    }

    &__legal-link {
      color: var(--c-primary);
      text-decoration: underline;
      &:hover { color: var(--c-primary-dark); }
    }
  }

  @keyframes shake {
    10%, 90% { transform: translateX(-1px); }
    20%, 80% { transform: translateX(2px); }
    30%, 50%, 70% { transform: translateX(-4px); }
    40%, 60% { transform: translateX(4px); }
  }
  .auth-form__container {
    transition: max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s;
    overflow: hidden;
    max-height: 1000px;
    opacity: 1;
    will-change: max-height, opacity;
    &.hide {
      max-height: 0;
      opacity: 0;
      pointer-events: none;
    }
    &.show {
      max-height: 1000px;
      opacity: 1;
      pointer-events: auto;
    }
  }
</style>
