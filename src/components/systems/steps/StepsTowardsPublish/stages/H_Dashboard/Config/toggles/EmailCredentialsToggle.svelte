<script lang="ts">
  import EmailInput from "../../../../../../inputs/Email/Email.svelte";
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { writable } from "svelte/store";
  import type { Store } from "../../../../../../../types";
  import { t } from "$lib/i18n/dashboard-translations";
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
    placeholder={$t['placeholders.email']}
    value={$emailMaskSender}
    onChange={handleEmailChange}
    label={$t['labels.senderEmail']}
  />

  <PlainText
    type="password"
    placeholder={$t['placeholders.appPassword']}
    value={$appPassword}
    onChange={handlePasswordChange}
    label={$t['labels.appPassword']}
  />

  {#if validationError}
    <p class="error-message">{validationError}</p>
  {/if}

  <MarkdownText {canReveal}>
    {$t['markdown.emailCredentials']}
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
