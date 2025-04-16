<script lang="ts">
  import { get } from "svelte/store";
  import EmailInput from "../../../../../../inputs/Email/Email.svelte";
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.js";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  let emailMaskSender = get(store).config.emailMaskSender || "";
  let appPassword = get(store).config.appPassword || "";
  let validationError = "";

  // Reactive validation
  $: {
    if ((emailMaskSender && !appPassword) || (!emailMaskSender && appPassword)) {
      validationError = "Both Email Sender and App Password are required if one is provided.";
    } else {
      validationError = ""; // Clear error if both filled or both empty
    }
  }

  function handleEmailChange(value: string) {
    emailMaskSender = value;
    saveToConfig({ emailMaskSender, appPassword });
  }

  function handlePasswordChange(value: string) {
    appPassword = value;
    saveToConfig({ emailMaskSender, appPassword });
  }
</script>

<div class="credentials-wrapper">
  <EmailInput
    placeholder="Enter the email address to send from"
    value={emailMaskSender}
    onChange={handleEmailChange}
    label="Sender Email Address"
  />

  <PlainText
    type="password"
    placeholder="Enter your email app password"
    value={appPassword}
    onChange={handlePasswordChange}
    label="Email App Password"
  />

  {#if validationError}
    <p class="error-message">{validationError}</p>
  {/if}

  <MarkdownText {canReveal}>
    --*(Optional)* Provide email credentials if you want the newsletter sent directly from your email account (e.g., Gmail). Requires both Sender Email and an App Password.--
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
