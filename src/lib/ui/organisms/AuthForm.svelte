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
  import { t } from '$lib/i18n/translations';

  export let mode: 'login' | 'signup' = 'login';
  export let copy: any;
  export let legal: { termsUrl: string; privacyUrl: string } = { termsUrl: '/legal/terms', privacyUrl: '/legal/privacy' };
  let externalAuthCode: Writable<string>;

  export let canReveal = true;

  const emailSchema = z.string().email();
  let email = '';
  let errorMsg = '';
  let loading = false;

  $: $t;

  let step: 'initial' | 'code' = 'initial';

  onMount(() => {
    console.info('[auth-form] mount', { mode, mock: runtime.isMockMode });
  });

  async function onEmail() {
    if (!emailSchema.safeParse(email).success) {
      errorMsg = $t.authForm.emailValidation;
      return;
    }
    errorMsg = '';
    loading = true;
    try {
      await askForNewAuthCode();
      step = 'code';
    } catch (e) {
      errorMsg = $t.authForm.failedToSendCode;
    }
    loading = false;
  }

  function goBack() {
    step = 'initial';
  }
</script>

<div class="auth-page-wrapper">
  <div class="auth-ambient-mesh"></div>

  <div class="auth-form-card">
    <header class="auth-header">
      <div class="logo-wrapper">
        <img src="/logo/logo-inverted.png" alt="logo" class="logo-img" />
      </div>
      <h1 class="auth-title">{copy?.title}</h1>
      {#if copy?.subtitle}
        <p class="auth-subtitle">{copy?.subtitle}</p>
      {/if}
    </header>

    <div class="step-container" class:active={step === 'initial'}>
      <div class="step-content">
        <div class="input-group">
           <EmailInput 
              bind:value={email} 
              placeholder={copy?.emailPlaceholder} 
              label="Work Email" 
              onEnter={() => onEmail()} 
              onChange={(value) => {
                saveToStore({ configuratorEmail: value });
              }} 
           />
        </div>

        <button 
          on:click={onEmail} 
          class="btn-primary" 
          disabled={loading}
          class:loading={loading}
        >
          {#if loading}
            <span class="spinner"></span>
            {$t.authForm.sending}
          {:else}
            {copy?.continueWithEmail}
          {/if}
        </button>

        {#if errorMsg}
          <div class="error-banner" role="alert">
            <svg class="error-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{errorMsg}</span>
          </div>
        {/if}
      </div>
    </div>

    <div class="step-container" class:active={step === 'code'}>
      <div class="step-content">
        <div class="code-header">
           <MarkdownText canReveal={$store.hasNewEmailCodeBeenSent}>
            **{$t.authForm.codeSent}**
          </MarkdownText>
          <p class="code-email-display">{email}</p>
        </div>

        <div class="code-input-wrapper">
          <Code
            bind:authCode={externalAuthCode}
            onChange={(authCode) => {
              saveToStore({ authCode });
              if (authCode) {
                saveToStore({ hasNewEmailCodeBeenSent: true, isAuthCodeValid: true });
                askIsAuthCodeValid(() => {              
                  window.location.href = `/dashboard?x-auth-email=${email}&x-auth-code=${authCode}`;
                });
              }
            }}
          />
        </div>

        {#if !$store.isAuthCodeValid && $store.authCode && $store.hasNewEmailCodeBeenSent}
          <div class="error-banner">{$t.authForm.invalidCode}</div>
        {/if}

        <div class="code-actions">
          <button
            class="link-btn resend-btn"
            on:click={() => askForNewAuthCode()}
          >
            {$t.authForm.regenerateCode}
          </button>
          
          <button on:click={goBack} class="link-btn back-btn">
             <span class="arrow">←</span> {$t.authForm.back}
          </button>
        </div>
      </div>
    </div>

    <div class="auth-footer">
      <p class="switch-text">
        {copy?.switchText}
        <a href={copy?.switchHref} class="highlight-link">{copy?.switchLink}</a>
      </p>

      <p class="legal-text">
        {$t.authForm.byProceeding.replace('{appName}', runtime.appName)}
        <a href={legal.termsUrl}>{$t.authForm.termsOfService}</a> {$t.authForm.and}
        <a href={legal.privacyUrl}>{$t.authForm.privacyPolicy}</a>.
      </p>
    </div>
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  /* --- Tokens --- */
  :root {
    --auth-bg-color: #ffffff;
    --auth-text-main: #0f172a;
    --auth-text-muted: #64748b;
    --auth-primary: #0f172a; /* Enterprise Black/Dark Blue */
    --auth-primary-hover: #000000;
    --auth-border: #e2e8f0;
    --auth-radius: 20px;
    --auth-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
    --auth-transition: cubic-bezier(0.16, 1, 0.3, 1);
  }

  /* --- Page Layout --- */
  .auth-page-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-md);
    position: relative;
    overflow: hidden;
  }

  .auth-ambient-mesh {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 0%, #f1f5f9 0%, #ffffff 70%);
    z-index: -1;
  }

  /* --- Card Component --- */
  .auth-form-card {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    width: 100%;
    max-width: 440px;
    padding: 3rem 2.5rem;
    border-radius: var(--auth-radius);
    box-shadow: 
        0 0 0 1px rgba(0,0,0,0.05),
        var(--auth-shadow);
    transition: transform 0.4s var(--auth-transition);

    /* Subtle entrance animation */
    animation: cardFloat 0.8s var(--auth-transition) forwards;
    transform: translateY(10px);
    opacity: 0;
  }

  @keyframes cardFloat {
    to { transform: translateY(0); opacity: 1; }
  }

  /* --- Header --- */
  .auth-header {
    text-align: center;
    margin-bottom: 2rem;

    .logo-wrapper {
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: center;
        
        .logo-img {
            height: 40px;
            width: auto;
            display: block;
        }
    }

    .auth-title {
        font-size: 1.75rem;
        font-weight: 800;
        color: var(--auth-text-main);
        margin-bottom: 0.5rem;
        letter-spacing: -0.02em;
    }

    .auth-subtitle {
        font-size: 0.95rem;
        color: var(--auth-text-muted);
        line-height: 1.5;
    }
  }

  /* --- Transitions (Grid Accordion) --- */
  .step-container {
    display: grid;
    grid-template-rows: 0fr;
    opacity: 0;
    transition: 
        grid-template-rows 0.5s var(--auth-transition),
        opacity 0.3s ease,
        transform 0.5s var(--auth-transition);
    transform: translateX(20px);
    pointer-events: none;

    .step-content {
        overflow: hidden;
    }

    &.active {
        grid-template-rows: 1fr;
        opacity: 1;
        transform: translateX(0);
        pointer-events: auto;
    }
  }

  /* --- Inputs & Groups --- */
  .input-group {
    margin-bottom: 1.5rem;
  }

  /* --- Buttons --- */
  .btn-primary {
    width: 100%;
    padding: 0.875rem;
    background: var(--auth-primary);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);

    &:hover {
        background: var(--auth-primary-hover);
        transform: translateY(-1px);
        box-shadow: 0 10px 15px -3px rgba(0,0,0,0.15);
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
        transform: none;
    }
  }

  /* Loading Spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(255,255,255,0.3);
    border-radius: 50%;
    border-top-color: #fff;
    animation: spin 0.8s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* --- Error State --- */
  .error-banner {
    margin-top: 1rem;
    background: #fef2f2;
    border: 1px solid #fee2e2;
    color: #ef4444;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
  }
  .error-icon { width: 18px; height: 18px; }
  
  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0); }
    20%, 80% { transform: translate3d(2px, 0, 0); }
    30%, 50%, 70% { transform: translate3d(-2px, 0, 0); }
    40%, 60% { transform: translate3d(2px, 0, 0); }
  }

  /* --- Step 2: Code Styling --- */
  .code-header {
    text-align: center;
    margin-bottom: 1.5rem;
    
    /* Targeting MarkdownText output generically */
    :global(p) {
        margin: 0;
        font-weight: 600;
        color: var(--auth-text-main);
    }
  }

  .code-email-display {
    font-size: 0.9rem;
    color: var(--auth-text-muted);
    margin-top: 0.25rem;
  }

  .code-input-wrapper {
    margin-bottom: 2rem;
    display: flex;
    justify-content: center;
  }

  .code-actions {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Text Buttons */
  .link-btn {
    background: none;
    border: none;
    font-size: 0.9rem;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;

    &.resend-btn {
        color: var(--auth-primary);
        font-weight: 600;
        text-decoration: underline;
        text-align: center;
    }

    &.back-btn {
        color: var(--auth-text-muted);
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 6px;
        
        .arrow { transition: transform 0.2s; }
        
        &:hover {
            color: var(--auth-text-main);
            .arrow { transform: translateX(-4px); }
        }
    }
  }

  /* --- Footer --- */
  .auth-footer {
    margin-top: 2.5rem;
    text-align: center;
    border-top: 1px solid var(--auth-border);
    padding-top: 1.5rem;
  }

  .switch-text {
    font-size: 0.95rem;
    color: var(--auth-text-muted);
    margin-bottom: 1rem;
  }

  .highlight-link {
    color: var(--auth-primary);
    font-weight: 700;
    text-decoration: none;
    &:hover { text-decoration: underline; }
  }

  .legal-text {
    font-size: 0.75rem;
    color: #94a3b8;
    line-height: 1.5;
    
    a {
        color: inherit;
        text-decoration: underline;
        &:hover { color: var(--auth-text-main); }
    }
  }
</style>