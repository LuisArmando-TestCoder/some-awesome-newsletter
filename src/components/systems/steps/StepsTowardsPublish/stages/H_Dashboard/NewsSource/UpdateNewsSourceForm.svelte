<script lang="ts">
  import { writable, get } from "svelte/store";
  import type { NewsSource } from "../../../../../../types";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import ScheduleTime from "../../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import Switch from "../../../../../selectors/Switch/Switch.svelte"; // Import Switch component
  import updateNewsSource from "../../../../../requests/updateNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import regenerateSelectors from "../../../../../requests/regenerateSelectors";
  import store, { latestMessage } from "../../../../../../store";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import { generatePersonality } from "../../../../../requests/generatePersonality";
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

  // Define the type for updateFields
  type UpdateFieldsType = {
    community: string;
    lead: string;
    personality: string; // Revert back to string
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
    // active: boolean; // Removed
    emailMaskSender: string;
    appPassword: string;
    includeImages: boolean; // Added for image toggle
    isPublic: boolean; // Added for public/private toggle
  };

  // Initialize updateFields with the defined type and default values
  let updateFields: UpdateFieldsType = {
    community: "",
    lead: "", // Use empty string instead of type annotation
    personality: "", // Ensure personality is initialized as string
    scheduleTime: "", // Use empty string
    linkSelector: "", // Use empty string
    url: "", // Use empty string
    id: "",
    // active: true, // Removed default active state
    emailMaskSender: "",
    appPassword: "",
    includeImages: true, // Default to true
    isPublic: true, // Default to true
  };

  onMount(() => {
    // Update updateFields with actual newsSource data once mounted
    updateFields = {
      community: newsSource.community || "",
      lead: newsSource.lead || "", // Ensure lead is string
      personality: newsSource.personality || "", // Initialize with string or empty string
      scheduleTime: newsSource.scheduleTime || "",
      linkSelector: newsSource.linkSelector || "",
      url: newsSource.url || "", // Ensure url is string
      id: newsSource.id,
      // active: newsSource.active === undefined ? true : newsSource.active, // Removed active state initialization
      emailMaskSender: newsSource.emailMaskSender || "",
      appPassword: newsSource.appPassword || "",
      // Default to true if undefined in the source data
      includeImages: newsSource.includeImages === undefined ? true : newsSource.includeImages,
      isPublic: newsSource.isPublic === undefined ? true : newsSource.isPublic, // Initialize isPublic
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
  let debounceTimeout: ReturnType<typeof setTimeout>;

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
      lead: updateFields.lead,
      personality: updateFields.personality || "", // Ensure it's always a string in payload
      scheduleTime: updateFields.scheduleTime, // Pass the frequency string
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
      // active: updateFields.active, // Removed active state from payload
      // Include new fields only if they have values, otherwise send null
      emailMaskSender: updateFields.emailMaskSender || null,
      appPassword: updateFields.appPassword || null,
      includeImages: updateFields.includeImages, // Add the flag to the payload
      isPublic: updateFields.isPublic, // Add the isPublic flag to the payload
    };

    console.log("[UpdateNewsSourceForm.svelte] Payload to be sent:", payload);

    // Prevent submission if email validation fails
    if (emailValidationError) {
      errorMessage = emailValidationError;
      return;
    }

    await processNewsSourceAction(
      payload,
      (f) => f, // This seems like an identity function, might need review depending on processNewsSourceAction's purpose
      // Pass a simplified reference to updateNewsSource. processNewsSourceAction needs to handle passing the correct arguments.
      updateNewsSource,
      (msg) => (errorMessage = msg),
      "Failed to update news source. Please try again.",
      (updated) => {
        console.log("[UpdateNewsSourceForm.svelte] onSuccess received:", JSON.stringify(updated, null, 2));
        if (updated.linkSelector) {
          console.log("[UpdateNewsSourceForm.svelte] Updating linkSelector to:", updated.linkSelector);
          updateFields = { ...updateFields, linkSelector: updated.linkSelector };
        }
        updatedNewsSource.set(updated);
      }
    );
  }

  const isRegenerating = writable(false);
  const errorRegeneratingSelectors = writable(false);
  $: $store; // Keep store subscription if needed elsewhere

  latestMessage.subscribe((message) => {
    if (message.includes("Regenerating selectors")) {
      isRegenerating.set(true);
      errorRegeneratingSelectors.set(false);
    } else if (message.includes("Selectors regenerated successfully")) {
      isRegenerating.set(false);
      errorRegeneratingSelectors.set(false);
    } else if (message.includes("Error regenerating selectors")) {
      isRegenerating.set(false);
      errorRegeneratingSelectors.set(true);
    }
  });
</script>

<form class="news-source-update-form" on:submit|preventDefault={handleUpdate}>
  <!-- Remove #if updateFields block as it's initialized directly now -->
    <ToggleCard {canReveal} cardTitle="Basic Settings" isOpen={false} onChange={() => {}}>
      <div class="selectors-group">

        <PlainText
          label="Buyer Persona"
          placeholder="e.g. 'My Dear Newsletter Users'"
          bind:value={updateFields.community}
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

    <ToggleCard {canReveal} cardTitle="Advanced Generation Settings" isOpen={false} onChange={() => {}}>
      <div class="selectors-group">
        <ScheduleTime
          label="Schedule Time"
          value={updateFields.scheduleTime}
          onChange={(schedule) => {
            console.log("[UpdateNewsSourceForm.svelte] onChange received:", schedule);
            updateFields.scheduleTime = schedule;
          }}
        />

        <Personality
          personality={updateFields.personality ?? ''}
          newsSourceId={updateFields.id}
          onError={(msg) => (errorMessage = msg)}
          onChange={(newValue) => { updateFields.personality = newValue; }}
        />

        <!-- Include Images Toggle -->
        <div class="switch-container">
          <label for="include-images-switch">Include Images in Newsletter</label>
          <Switch
            bind:toggled={updateFields.includeImages}
          />
        </div>
        <MarkdownText {canReveal}>
          --Whether to include automatically sourced stock images in the generated newsletter content.--
        </MarkdownText>

        <!-- Public/Private Toggle -->
        <div class="switch-container">
          <label for="is-public-switch">Publicly Visible in Widget</label>
          <Switch
            bind:toggled={updateFields.isPublic}
          />
        </div>
        <MarkdownText {canReveal}>
          --If enabled, this news source can be listed for users to subscribe to in the widget. Private sources are only for direct links.--
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
    
    <ToggleCard {canReveal} cardTitle="Developer Settings" isOpen={false} onChange={() => {}}>
      <div class="selectors-group">

        <!-- Removed Active Switch Container -->
        <CopyUrlWithQR
          configuratorEmail={$store.configuratorEmail}
          newsSourceId={newsSource.id}
          lead={newsSource.lead}
          label="Link for manual subscription"
        />
        <CopyUrlWithQR
          fullUrl={`https://aibanewsletter.club/users/${encodeURIComponent($store.configuratorEmail)}/${encodeURIComponent(newsSource.id)}`}
          label="Post Request URL for API subscription / Body: {"{ bio, countryOfResidence, email, language, name }"}"
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
      </div>
      
    </ToggleCard>

    <SubmitButton label="Update News Source" callback={handleUpdate} />

    {#if errorMessage}
      <div class="error-message">{errorMessage}</div>
    {/if}
  <!-- End of removed #if block -->
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
