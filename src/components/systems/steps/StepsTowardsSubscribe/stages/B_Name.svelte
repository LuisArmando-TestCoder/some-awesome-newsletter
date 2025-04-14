<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store.ts";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { onMount } from "svelte";

  export let canReveal = false;

  let nameValue = $store.subscriberName; // Initialize with store value
  let isValid = nameValue.trim().length > 0; // Basic validation: not empty

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    nameValue = target.value; // No need to trim here, maybe later
    isValid = nameValue.trim().length > 0;
    saveToStore({
      subscriberName: nameValue, // Save potentially untrimmed value, trim on submit/use
    });
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      if (isValid) {
        // Optionally trim before advancing:
        // saveToStore({ subscriberName: nameValue.trim() });
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
      }
    }
  }

  // Sync with store on mount in case it was pre-populated
  onMount(() => {
    nameValue = $store.subscriberName;
    isValid = nameValue.trim().length > 0;
  });
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your **name**?
  </MarkdownText>
  <div class="name-input-wrapper">
    <input
      id="name-input"
      type="text"
      bind:value={nameValue}
      placeholder="Your name"
      on:input={handleInput}
      on:keydown={handleKeyDown}
      aria-label="Your name"
      class:invalid={!isValid && nameValue !== ""}
    />
    {#if !isValid && nameValue !== ""}
      <span class="error-message">Please enter your name.</span>
    {/if}
  </div>
</Centered>

<style lang="scss">
  // Reusing similar styles from Email input for consistency
  .name-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
    margin-top: 1rem; // Add some space after the title
  }

  input {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: var(--color-foreground);
    transition:
      border 0.3s ease,
      box-shadow 0.3s ease;
    outline: none;
    text-align: center;
  }

  input::placeholder {
    color: var(--color-foreground-opaque);
  }

  input:focus {
    border-color: var(--color-foreground);
    box-shadow: 0 0 10px -2px var(--color-foreground);
  }

  input.invalid {
    border-color: red;
    box-shadow: 0 0 10px -2px red;
  }

  .error-message {
    margin-top: 0.25rem;
    font-size: 0.875rem;
    color: red;
    text-align: center;
  }
</style>
