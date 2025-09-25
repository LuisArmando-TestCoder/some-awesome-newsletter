<script lang="ts">
  import EmailInput from "../../../../../../inputs/Email/Email.svelte";
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { useConfigurator } from "../../../../../../useConfigurator";

  export let canReveal = true;

  const emailMaskSender = writable("");
  const appPassword = writable("");
  let validationError = "";

  useConfigurator((value: Store) => {
    if (value.config.emailMaskSender) {
      emailMaskSender.set(value.config.emailMaskSender);
    }
    if (value.config.appPassword) {
      appPassword.set(value.config.appPassword);
    }
  });

  // Reactive validation
  $: {
    if (($emailMaskSender && !$appPassword) || (!$emailMaskSender && $appPassword)) {
      validationError = "Both Email Sender and App Password are required if one is provided.";
    } else {
      validationError = ""; // Clear error if both filled or both empty
    }
  }

  function handleEmailChange(value: string) {
    emailMaskSender.set(value);
    saveToConfig({ emailMaskSender: value, appPassword: $appPassword });
  }

  function handlePasswordChange(value: string) {
    appPassword.set(value);
    saveToConfig({ emailMaskSender: $emailMaskSender, appPassword: value });
  }
</script>

<div class="credentials-wrapper">
  <EmailInput
    placeholder="Enter the email address to send from"
    value={$emailMaskSender}
    onChange={handleEmailChange}
    label="Sender Email Address"
  />

  <PlainText
    type="password"
    placeholder="Enter your email app password"
    value={$appPassword}
    onChange={handlePasswordChange}
    label="Email App Password"
  />

  {#if validationError}
    <p class="error-message">{validationError}</p>
  {/if}

  <MarkdownText {canReveal}>
    --*(Optional)* Provide email credentials if you want the newsletter sent directly from your email
    account (e.g., Gmail). Requires both Sender Email and an App Password.--
  </MarkdownText>
</div>

<style>
  .credentials-wrapper {
    display: flex;
    flex-direction: column;
    gap: 1rem; /* Add some space between inputs */
  }
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: -0.5rem; /* Adjust spacing */
  }
</style>
