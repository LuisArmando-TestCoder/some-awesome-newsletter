<script lang="ts">
  import EmailInput from "../../../../../../inputs/Email/Email.svelte";
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { t } from "$lib/i18n/dashboard-translations";
  import { useConfigurator } from "../../../../../../useConfigurator";
  import { slide } from 'svelte/transition';

  export let canReveal = true;

  const emailMaskSender = writable("");
  const appPassword = writable("");
  let validationError = "";
  let showSteps = false;

  useConfigurator((value: Store) => {
    if (value.config.emailMaskSender) {
      emailMaskSender.set(value.config.emailMaskSender);
    }
    if (value.config.appPassword) {
      appPassword.set(value.config.appPassword);
    }
  });

  $: {
    if (($emailMaskSender && !$appPassword) || (!$emailMaskSender && $appPassword)) {
      validationError = $t["credentials.errorBothRequired"];
    } else {
      validationError = "";
    }
  }

  function handleEmailChange(value: string) {
    emailMaskSender.set(value);
    saveToConfig({ emailMaskSender: value, appPassword: $appPassword });
  }

  function handlePasswordChange(value: string) {
    const cleaned = value.replace(/\s/g, "");
    appPassword.set(cleaned);
    saveToConfig({ emailMaskSender: $emailMaskSender, appPassword: cleaned });
  }

  function toggleSteps() {
    showSteps = !showSteps;
  }
</script>

<div class="credentials-wrapper">
  <div class="helper-card">
    <div class="icon-bg">🔑</div>
    <div class="text-content">
      <div class="title-row">
        <h4>{$t["credentials.title"]}</h4>
        <span class="optional-badge">{$t["credentials.optional"]}</span>
      </div>
      <p class="intro-text">
        {@html $t["credentials.intro"]}
      </p>
      <p class="google-requirement">
        {@html $t["credentials.googleRequirement"]}
      </p>
      <button class="toggle-btn" class:active={showSteps} on:click={toggleSteps}>
        <span>{showSteps ? $t["credentials.hideGuide"] : $t["credentials.howToGet"]}</span>
        <span class="chevron">{showSteps ? '▲' : '▼'}</span>
      </button>
    </div>
  </div>

  {#if showSteps}
    <div class="tutorial-box" transition:slide>
      <div class="tutorial-header">
        <h5>{$t["credentials.quickConfig"]}</h5>
        <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" class="external-link">
          {$t["credentials.goGoogle"]}
        </a>
      </div>
      
      <div class="steps-grid">
        <div class="step-item">
          <span class="step-badge">1</span>
          <p>{@html $t["credentials.step1"]}</p>
        </div>
        <div class="step-item">
          <span class="step-badge">2</span>
          <p>{@html $t["credentials.step2"]}</p>
        </div>
        <div class="step-item">
          <span class="step-badge">3</span>
          <p>{@html $t["credentials.step3"]}</p>
        </div>
      </div>
    </div>
  {/if}

  <div class="form-container">
    <EmailInput
      placeholder={$t["placeholders.email"]}
      value={$emailMaskSender}
      onChange={handleEmailChange}
      label={$t["labels.senderEmail"]}
    />

    <div class="password-wrapper">
      <PlainText
        type="password"
        placeholder={$t["placeholders.appPassword"]}
        value={$appPassword}
        onChange={handlePasswordChange}
        label={$t["labels.appPassword"]}
      />
      {#if $appPassword.length > 0 && $appPassword.length !== 16}
        <span class="char-count">{$appPassword.length}/16</span>
      {/if}
    </div>
  </div>

  {#if validationError}
    <div class="error-toast">
      <span>⚠️</span> {validationError}
    </div>
  {/if}
</div>

<style>
  .credentials-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .helper-card {
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
  }

  .title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 0.5rem;
  }

  .optional-badge {
    background: rgba(0, 0, 0, 0.05);
    color: #666;
    font-size: 0.7rem;
    padding: 2px 8px;
    border-radius: 4px;
    text-transform: uppercase;
    font-weight: bold;
    letter-spacing: 0.5px;
  }

  .icon-bg {
    font-size: 1.5rem;
    background: rgba(0, 0, 0, 0.05);
    padding: 0.75rem;
    border-radius: 12px;
  }

  .helper-card h4 {
    margin: 0;
    font-size: 1.1rem;
    color: #000;
  }

  .intro-text {
    margin: 0 0 0.75rem 0;
    font-size: 0.9rem;
    color: #000;
    line-height: 1.5;
    opacity: 0.8;
  }

  .google-requirement {
    margin: 0;
    font-size: 0.9rem;
    color: #000;
    line-height: 1.4;
  }

  .toggle-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background: #4facfe;
    border: none;
    color: white;
    padding: 8px 16px;
    border-radius: 100px;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: 600;
    margin-top: 1.25rem;
    transition: transform 0.2s, background 0.2s;
  }

  .toggle-btn:hover {
    background: #3b8fd9;
    transform: translateY(-1px);
  }

  .toggle-btn.active {
    background: rgba(0, 0, 0, 0.05);
    color: #4facfe;
    border: 1px solid rgba(79, 172, 254, 0.4);
  }

  .tutorial-box {
    background: rgba(79, 172, 254, 0.05);
    border: 1px solid rgba(79, 172, 254, 0.2);
    border-radius: 12px;
    padding: 1.25rem;
  }

  .tutorial-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }

  .tutorial-header h5 {
    margin: 0;
    color: #4facfe;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.75rem;
  }

  .external-link {
    color: #4facfe;
    text-decoration: none;
    font-size: 0.75rem;
    font-weight: 600;
  }

  .external-link:hover {
    text-decoration: underline;
  }

  .steps-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .step-item {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .step-badge {
    background: #4facfe;
    color: #fff;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: bold;
    flex-shrink: 0;
  }

  .step-item p {
    margin: 0;
    font-size: 0.85rem;
    color: #000;
  }

  .form-container {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .password-wrapper {
    position: relative;
  }

  .char-count {
    position: absolute;
    right: 12px;
    top: 38px;
    font-size: 0.7rem;
    color: #ff6b6b;
    font-weight: bold;
  }

  .error-toast {
    background: rgba(255, 107, 107, 0.1);
    border: 1px solid rgba(255, 107, 107, 0.2);
    color: #ff6b6b;
    padding: 0.75rem;
    border-radius: 8px;
    font-size: 0.85rem;
    display: flex;
    gap: 8px;
    align-items: center;
  }
</style>