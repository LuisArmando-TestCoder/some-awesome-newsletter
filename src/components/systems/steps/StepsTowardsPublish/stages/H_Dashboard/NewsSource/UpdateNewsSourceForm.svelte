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

  // The news source to update
  export let newsSource: NewsSource;

  // The local update fields we track
  export let updateFields: {
    community: string;
    country: string;
    lead: string;
    personality: string;
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
  };

  // For error messages
  export let errorMessage: string;
  // For toggling advanced fields
  export let canReveal: boolean = true;

  // Local store for the updated news source
  export const updatedNewsSource = writable<NewsSource | null>(null);

  // Variables para el campo Personality:
  // rawContent contiene el texto a partir del cual se generará la personalidad.
  let rawContent: string = "";
  // showRawContentArea controla si se muestra el textarea para ingresar rawContent.
  let showRawContentArea: boolean = false;

  // Función para cambiar la visibilidad del área de rawContent
  function toggleRawContentArea() {
    showRawContentArea = !showRawContentArea;
  }

  // Función que llama a la API para generar la personalidad a partir de rawContent.
  async function handleGeneratePersonality() {
    try {
      const result = await generatePersonality(rawContent, updateFields.id);
      // Actualiza el campo personality con la descripción generada
      updateFields.personality = result.personality;
    } catch (error: any) {
      errorMessage = error.message;
    }
  }

  // Función original para actualizar la fuente
  async function handleUpdate() {
    const payload = {
      community: updateFields.community,
      country: updateFields.country,
      lead: updateFields.lead,
      personality: updateFields.personality,
      scheduleTime: updateFields.scheduleTime,
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
    };

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

  $: updateFields;
  $: $store;
</script>

<form class="news-source-update-form" on:submit|preventDefault={handleUpdate}>
  <ToggleCard {canReveal} cardTitle="Basic Settings" isOpen={false}>
    <div class="selectors-group">
      <PlainText
        label="Buyer Persona"
        placeholder="e.g. 'Expats from US'"
        value={updateFields.community}
        onChange={(val) => (updateFields.community = val)}
      />

      <Country
        label="Newsletter target country"
        defaultCountryCode={updateFields.country}
        onSelect={(code) => (updateFields.country = code)}
      />

      <Link
        label="Lead"
        placeholder="Destination URL or text"
        value={updateFields.lead}
        onChange={(val) => (updateFields.lead = val)}
      />

      <Link
        label="News Source URL"
        placeholder="Your news source URL"
        value={updateFields.url}
        onChange={(val) => (updateFields.url = val)}
      />
    </div>
  </ToggleCard>

  <ToggleCard {canReveal} cardTitle="Advanced Generation Settings" isOpen={false}>
    <div class="selectors-group">

      <ScheduleTime
        label="Schedule Time"
        placeholder="e.g., 'every Monday at 9 AM'"
        value={updateFields.scheduleTime}
        onChange={(_, cron) => (updateFields.scheduleTime = cron)}
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
        value={updateFields.linkSelector}
        onChange={(val) => (updateFields.linkSelector = val)}
      />

      <Personality
        personality={updateFields.personality}
        newsSourceId={updateFields.id}
        onChange={(val) => (updateFields.personality = val)}
        onError={(msg) => (errorMessage = msg)}
      />
    </div>
  </ToggleCard>

  <SubmitButton label="Update News Source" callback={handleUpdate} />

  {#if errorMessage}
    <div class="error-message">{errorMessage}</div>
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
</style>
