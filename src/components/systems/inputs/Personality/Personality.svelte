<!-- src/components/systems/inputs/PersonalityField.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import PlainText from "../PlainText/PlainText.svelte";
  import IconButton from "../../buttons/IconButton/IconButton.svelte";
  import { generatePersonality } from "../../requests/generatePersonality.ts";
  import { latestMessage } from "../../../store.ts";
  import { writable } from "svelte/store";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";

  // Props:
  // - personality: el valor actual de la descripción personalizada.
  // - newsSourceId: para el request.
  // - onChange: callback para actualizar el valor (p. ej., actualizando el updateFields en el padre).
  // - onError: callback para reportar errores.
  export let personality: string;
  export let newsSourceId: string;
  export let onChange: (value: string) => void = () => {};
  export let onError: (message: string) => void = () => {};

  let isRegenerating = writable(false);
  let errorRegeneratingSelectors = writable(false);

  // Estado interno:
  let rawContent: string = "";
  let showRawContentArea: boolean = false;

  function toggleRawContentArea() {
    showRawContentArea = !showRawContentArea;
  }

  async function handleGeneratePersonality() {
    let result;
    try {
      result = await generatePersonality(rawContent, newsSourceId);
      // Actualiza el valor de personality con la descripción generada.
      onChange(result.personality);
    } catch (error: any) {
      onError(error.message);
    }

    return result;
  }
</script>

<div class="personality-section">
  <div class="input-row">
    <PlainText
      placeholder="Input any personality description..."
      value={personality}
      {onChange}
    />
    <SubmitButton label="Generate?" callback={toggleRawContentArea} />
  </div>
  {#if showRawContentArea}
    <div class={$isRegenerating ? "loading" : "none"}>
      {$isRegenerating ? $latestMessage : ""}
    </div>
    <div class={$errorRegeneratingSelectors ? "error" : "none"}>
      {$errorRegeneratingSelectors
        ? `Error regenerating selectors at: ${$latestMessage}`
        : ""}
    </div>
    <div class="raw-content-area" transition:slide>
      <textarea
        tabindex="1"
        bind:value={rawContent}
        placeholder="Paste any text here to generate a personality description from it..."
      ></textarea>
      <IconButton
        src="./icons/refresh.svg"
        callback={async () => {
          isRegenerating.set(true);
          errorRegeneratingSelectors.set(false);
          const response = await handleGeneratePersonality();
          errorRegeneratingSelectors.set(!response);
          isRegenerating.set(false);
          if (response) {
            showRawContentArea = false;
          }
        }}
      />
    </div>
  {/if}
</div>

<style lang="scss">
  .personality-section {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .input-row {
    display: flex;
    align-items: center;
    gap: 1rem;
    place-items: end;
  }
  /* Asumiendo que tu PlainText aplica la clase global ".plain-text-input" */
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
  .raw-content-area :global(.icon-button) {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
  }
</style>
