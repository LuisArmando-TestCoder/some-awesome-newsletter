<script lang="ts">
  import { writable, get } from "svelte/store";
  import type { NewsSource } from "../../../../../../types.ts";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import Country from "../../../../../inputs/Country/Country.svelte";
  import ScheduleTime from "../../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import updateNewsSource from "../../../../../requests/updateNewsSource.ts";
  import { processNewsSourceAction } from "./newsSourceActions.ts";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import regenerateSelectors from "../../../../../requests/regenerateSelectors.ts";
  import store, { latestMessage } from "../../../../../../store.ts";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import { generatePersonality } from "../../../../../requests/generatePersonality.ts";
  import Personality from "../../../../../inputs/Personality/Personality.svelte";
  import CopyUrlWithQR from "../../../../../../common/CopyUrlWithQR.svelte";
  import EmailInput from "../../../../../inputs/Email/Email.svelte"; // Added
  import MarkdownText from "../../../../../texts/MarkdownText/MarkdownText.svelte"; // Added
  import { onMount } from "svelte"; // Ensure onMount is imported

  // The news source to update
  export let newsSource: NewsSource;

  // For error messages
  export let errorMessage: string;

  // For toggling advanced fields
  export let canReveal: boolean = true;

  // Declare updateFields without initializing here
  let updateFields: {
    community: string;
    country: string;
    lead: string;
    personality: string;
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
    openAiApiKey: string;
    emailMaskSender: string;
    appPassword: string;
  };

  onMount(() => {
    // Initialize updateFields inside onMount
    updateFields = {
      community: newsSource.community || "",
      country: newsSource.country || "",
      lead: newsSource.lead || "",
      personality: newsSource.personality || "",
      scheduleTime: newsSource.scheduleTime || "",
      linkSelector: newsSource.linkSelector || "",
      url: newsSource.url || "",
      id: newsSource.id,
      openAiApiKey: newsSource.openAiApiKey || "",
      emailMaskSender: newsSource.emailMaskSender || "",
      appPassword: newsSource.appPassword || "",
    };
  });

  // Validation for email credentials
  let emailValidationError = "";
  $: {
    // Guard the validation logic: only run if updateFields has been initialized
    if (updateFields) {
      const sender = updateFields.emailMaskSender;
      const password = updateFields.appPassword;
      if ((sender && !password) || (!sender && password)) {
        emailValidationError =
          "Both Email Sender and App Password are required if one is provided.";
      } else {
        emailValidationError = ""; // Clear error if both filled or both empty
      }
    } else {
       emailValidationError = ""; // Default before init
    }
  }

  // Local store for the updated news source
  export const updatedNewsSource = writable<NewsSource | null>(null);

  // Variables para el campo Personality:
  let rawContent: string = "";
  let showRawContentArea: boolean = false;

  function toggleRawContentArea() {
    showRawContentArea = !showRawContentArea;
  }

  async function handleGeneratePersonality() {
    try {
      // Ensure updateFields is initialized before accessing id
      if (!updateFields?.id) return;
      const result = await generatePersonality(rawContent, updateFields.id);
      updateFields.personality = result.personality;
    } catch (error: any) {
      errorMessage = error.message;
    }
  }

  // Función original para actualizar la fuente
  async function handleUpdate() {
     // Ensure updateFields is initialized before creating payload
    if (!updateFields?.id) {
        errorMessage = "Form data not initialized correctly.";
        return;
    }
    const payload = {
      community: updateFields.community,
      country: updateFields.country,
      lead: updateFields.lead,
      personality: updateFields.personality,
      scheduleTime: updateFields.scheduleTime,
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
      // Include new fields only if they have values, otherwise send null
      openAiApiKey: updateFields.openAiApiKey || null,
      emailMaskSender: updateFields.emailMaskSender || null,
      appPassword: updateFields.appPassword || null,
    };

    // Prevent submission if email validation fails
    if (emailValidationError) {
      errorMessage = emailValidationError;
      return;
    }

    await processNewsSourceAction(
      payload,
      (f) => f,
      updateNewsSource,
      (msg) => (errorMessage = msg),
      "Failed to update news source. Please try again.",
      (updated) => {
        updatedNewsSource.set(updated);
      }
    );
  }

  const isRegenerating = writable(false);
  const errorRegeneratingSelectors = writable(false);
  $: $store; // Keep store subscription if needed elsewhere
</script>

<form class="news-source-update-form" on:submit|preventDefault={handleUpdate}>
  {#if updateFields} <!-- Use updateFields existence as indicator that onMount has run -->
    <CopyUrlWithQR
      configuratorEmail={$store.configuratorEmail}
      newsSourceId={newsSource.id}
      lead={newsSource.lead}
    />
    <ToggleCard {canReveal} cardTitle="Basic Settings" isOpen={false}>
      <div class="selectors-group">

        <PlainText
          label="Buyer Persona"
          placeholder="e.g. 'Expats from US'"
          bind:value={updateFields.community}
        />

        <Country
          label="Newsletter target country"
          defaultCountryCode={updateFields.country}
          onSelect={(code) => (updateFields.country = code)}
        />

        <Link
          label="Lead"
          placeholder="Destination URL or text"
          bind:value={updateFields.lead}
        />

        <Link
          label="News Source URL"
          placeholder="Your news source URL"
          bind:value={updateFields.url}
        />
      </div>
    </ToggleCard>

    <ToggleCard {canReveal} cardTitle="Advanced Generation Settings" isOpen={false}>
      <div class="selectors-group">

        <ScheduleTime
          label="Schedule Time"
          placeholder="e.g., 'every Monday at 9 AM'"
          bind:value={updateFields.scheduleTime}
        />

        <IconButton
          src="./icons/refresh.svg"
          disabled={$isRegenerating}
          loading={$isRegenerating}
          label="Regenerate Selectors"
          callback={async () => {
            isRegenerating.set(true);
            errorRegeneratingSelectors.set(false);
            const response = await regenerateSelectors(
              $store.configuratorEmail,
              updateFields.id,
              updateFields.url
            );
            errorRegeneratingSelectors.set(!response);
            isRegenerating.set(false);
            if (response) {
              updateFields.linkSelector = response.linkSelector;
            }
          }}
        />
        <div class={$isRegenerating ? "loading" : "none"}>
          {$isRegenerating ? $latestMessage : ""}
        </div>
        <div class={$errorRegeneratingSelectors ? "error" : "none"}>
          {$errorRegeneratingSelectors
            ? `Error regenerating selectors at: ${$latestMessage}`
            : ""}
        </div>
        <PlainText
          label="Link Selector"
          placeholder="CSS selector for article link"
          bind:value={updateFields.linkSelector}
        />

        <Personality
          bind:personality={updateFields.personality}
          newsSourceId={updateFields.id}
          onError={(msg) => (errorMessage = msg)}
        />

        <!-- OpenAI API Key Input -->
        <PlainText
          label="OpenAI API Key (Optional)"
          placeholder="Leave blank to use global key"
          bind:value={updateFields.openAiApiKey}
        />
        <MarkdownText {canReveal}>
          --Overrides the global OpenAI key for this specific news source.--
        </MarkdownText>

        <!-- Email Credentials Inputs -->
        <EmailInput
          label="Sender Email Address (Optional)"
          placeholder="Leave blank to use global credentials"
          bind:value={updateFields.emailMaskSender}
        />
        <PlainText
          label="Email App Password (Optional)"
          type="password"
          placeholder="Required if Sender Email is provided"
          bind:value={updateFields.appPassword}
        />
        {#if emailValidationError}
          <p class="error-message">{emailValidationError}</p>
        {/if}
        <MarkdownText {canReveal}>
          --Overrides the global email credentials for this specific news source. Both fields are required if one is provided.--
        </MarkdownText>

      </div>
    </ToggleCard>

    <SubmitButton label="Update News Source" callback={handleUpdate} />

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
  {:else}
    <!-- Optional: Show a loading state or nothing while updateFields initializes -->
    <p>Loading form...</p>
  {/if}
</form>

<style lang="scss">
  .news-source-update-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .selectors-group {
    margin: 1rem 0;
    display: grid;
    gap: 25px;
  }
  .personality-section {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .input-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  /* El input ocupa la mayor parte del ancho */
  .input-row :global(.plain-text-input) {
    flex: 1;
  }
  .generate-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
    cursor: pointer;
    border: none;
    background-color: var(--color-x-gradient-inversion);
    color: var(--color-background);
    border-radius: 5px;
    transition: background 0.3s ease;
  }
  .generate-btn:hover {
    background-color: var(--color-x-gradient);
  }
  /* Área glassmorphic para rawContent */
  .raw-content-area {
    position: relative;
    margin-top: 0.5rem;
    padding: 1rem;
    background: rgba(255, 255, 255, 0.15);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
  }
  .raw-content-area textarea {
    width: 100%;
    height: 100px;
    padding: 0.5rem;
    font-size: 1rem;
    background: transparent;
    border: none;
    color: var(--color-foreground);
    resize: vertical;
    outline: none;
  }
  /* IconButton posicionado en la esquina superior derecha */
  .raw-content-area :global(.icon-button) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  .error-message { /* Ensure error message style is present */
    color: red;
    font-size: 0.875rem;
    margin-top: -0.5rem; /* Adjust spacing if needed */
  }
</style>
