<script lang="ts">
  import { writable, get } from "svelte/store";
  import type { NewsSource } from "../../../../../../types";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import ScheduleTime from "../../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import Switch from "../../../../../selectors/Switch/Switch.svelte";
  import updateNewsSource from "../../../../../requests/updateNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import store, { latestMessage } from "../../../../../../store";
  import { generatePersonality } from "../../../../../requests/generatePersonality";
  import Personality from "../../../../../inputs/Personality/Personality.svelte";
  import EmailInput from "../../../../../inputs/Email/Email.svelte";
  import MarkdownText from "../../../../../texts/MarkdownText/MarkdownText.svelte";
  import { onMount } from "svelte";
  import { ping } from "../../../../../../Notification/notificationStore";
  
  // Translation store import
  import { t } from "$lib/i18n/dashboard-translations";

  export let newsSource: NewsSource;
  export let errorMessage: string;
  export let canReveal: boolean = true;

  type UpdateFieldsType = {
    community: string;
    lead: string;
    personality: string;
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
    emailMaskSender: string;
    appPassword: string;
    includeImages: boolean;
    isPublic: boolean;
  };

  let updateFields: UpdateFieldsType;
  $: if (newsSource) {
    updateFields = {
      community: newsSource.community || "",
      lead: newsSource.lead || "",
      personality: newsSource.personality || "",
      scheduleTime: newsSource.scheduleTime,
      linkSelector: newsSource.linkSelector || "",
      url: newsSource.url || "",
      id: newsSource.id,
      emailMaskSender: newsSource.emailMaskSender || "",
      appPassword: newsSource.appPassword || "",
      includeImages: newsSource.includeImages === undefined ? true : newsSource.includeImages,
      isPublic: newsSource.isPublic === undefined ? true : newsSource.isPublic,
    };
  }

  let emailValidationError = "";
  $: {
    if (updateFields) {
      const sender = updateFields.emailMaskSender;
      const password = updateFields.appPassword;
      if ((sender && !password) || (!sender && password)) {
        emailValidationError = $t['newsSource.errorEmailBoth'];
      } else {
        emailValidationError = "";
      }
    } else {
       emailValidationError = "";
    }
  }

  export const updatedNewsSource = writable<NewsSource | null>(null);

  let isMounted = false;
  onMount(() => {
    isMounted = true;
  });

  let rawContent: string = "";

  async function handleUpdate() {
    if (!updateFields?.id || !updateFields.scheduleTime) {
        errorMessage = $t['newsSource.errorInit'];
        return;
    }
    const payload = {
      community: updateFields.community,
      lead: updateFields.lead,
      personality: updateFields.personality || "",
      scheduleTime: updateFields.scheduleTime,
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
      emailMaskSender: updateFields.emailMaskSender || null,
      appPassword: updateFields.appPassword || null,
      includeImages: updateFields.includeImages,
      isPublic: updateFields.isPublic,
    };

    if (emailValidationError) {
      errorMessage = emailValidationError;
      return;
    }

    await processNewsSourceAction(
      payload,
      (f) => f,
      updateNewsSource,
      (msg) => (errorMessage = msg),
      $t['newsSource.errorUpdateFail'],
      (updated) => {
        if (updated.linkSelector) {
          updateFields = { ...updateFields, linkSelector: updated.linkSelector };
        }
        updatedNewsSource.set(updated);
        ping($t['newsSource.updateSuccessTitle'], $t['newsSource.updateSuccessMsg']);
      }
    );
  }
</script>

<form class="news-source-update-form" on:submit|preventDefault={handleUpdate}>
  {#if updateFields}
    <ToggleCard {canReveal} cardTitle={$t['newsSource.basicSettings']} isOpen={false} onChange={() => {}}>
      <div class="selectors-group">
        <PlainText
          label={$t['newsSource.typeOfClient']}
          placeholder={$t['newsSource.clientPlaceholder']}
          bind:value={updateFields.community}
        />

        <Link
          label={$t['newsSource.urlLabel']}
          placeholder={$t['newsSource.urlPlaceholder']}
          bind:value={updateFields.url}
        />
        <Link
          label={$t['newsSource.leadLabel']}
          placeholder={$t['newsSource.leadPlaceholder']}
          bind:value={updateFields.lead}
        />
        <p class="info-message">
          {$t['newsSource.leadNote']}
        </p>
      </div>
    </ToggleCard>

    <ToggleCard {canReveal} cardTitle={$t['newsSource.advancedSettings']} isOpen={false} onChange={() => {}}>
      <div class="selectors-group">
        <ScheduleTime
          label={$t['newsSource.scheduleLabel']}
          value={updateFields.scheduleTime}
          exclude={["minute", "hour", "dayOfMonth"]}
          onChange={(newValue) => {
            updateFields.scheduleTime = newValue;
            if (isMounted) handleUpdate();
          }}
        />

        <Personality
          personality={updateFields.personality ?? ''}
          newsSourceId={updateFields.id}
          onError={(msg) => (errorMessage = msg)}
          onChange={(newValue) => { 
            updateFields.personality = newValue; 
            if (isMounted) handleUpdate();
          }}
        />

        <div class="switch-container">
          <label for="include-images-switch">{$t['newsSource.includeImages']}</label>
          <Switch
            bind:toggled={updateFields.includeImages}
            on:change={() => { if (isMounted) handleUpdate(); }}
          />
        </div>
        <MarkdownText {canReveal}>
          {$t['newsSource.includeImagesDesc']}
        </MarkdownText>

        <div class="switch-container">
          <label for="is-public-switch">{$t['newsSource.publicVisible']}</label>
          <Switch
            bind:toggled={updateFields.isPublic}
            on:change={() => { if (isMounted) handleUpdate(); }}
          />
        </div>
        <MarkdownText {canReveal}>
          {$t['newsSource.publicVisibleDesc']}
        </MarkdownText>

        <EmailInput
          label={$t['newsSource.senderEmailLabel']}
          placeholder={$t['newsSource.senderEmailPlaceholder']}
          bind:value={updateFields.emailMaskSender}
        />
        <PlainText
          label={$t['newsSource.appPasswordLabel']}
          type="password"
          placeholder={$t['newsSource.appPasswordPlaceholder']}
          bind:value={updateFields.appPassword}
        />
        {#if emailValidationError}
          <p class="error-message">{emailValidationError}</p>
        {/if}
        <MarkdownText {canReveal}>
          {$t['newsSource.emailCredentialsDesc']}
        </MarkdownText>
      </div>
    </ToggleCard>
    
    <SubmitButton label={$t['newsSource.updateButton']} callback={handleUpdate} />

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
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
  .switch-container {
    display: flex;
    align-items: center;
    gap: 1rem; /* Adds space between label and switch */
  }
  .switch-container label {
    /* Optional: style the label */
    font-weight: bold;
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
