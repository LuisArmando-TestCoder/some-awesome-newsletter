<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import { get } from "svelte/store"; // Import get
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import LanguageInput from "../../../inputs/Language/Language.svelte"; // Renamed import
  import submitPublicSubscription from "../../../requests/submitPublicSubscription"; // Corrected import path (was ../../)
  // import LoadingSpinner from "../../../loaders/LoadingSpinner/LoadingSpinner.svelte"; // Removed - Component not found

  export let canReveal = false;

  let isLoading = false;
  let errorMessage = "";

  async function handleLanguageSelect(selectedLanguageCode: string | null) {
    if (!selectedLanguageCode) {
      errorMessage = "Please select a language.";
      return;
    }

    isLoading = true;
    errorMessage = ""; // Clear previous errors

    const currentStore = get(store); // Get current store values once

    // Prepare payload for the API
    const payload = {
      configuratorId: currentStore.subscriberConfiguratorId,
      newsSourceId: currentStore.subscriberNewsSourceId,
      email: currentStore.subscriberEmail,
      name: currentStore.subscriberName,
      language: selectedLanguageCode,
      countryOfResidence: currentStore.subscriberCountry || undefined, // Send country if available
    };

    try {
      const success = await submitPublicSubscription(payload);

      if (success) {
        // Only save language and advance step on successful API call
        saveToStore({
          subscriberLanguage: selectedLanguageCode,
          stepsIndex: currentStore.stepsIndex + 1,
        });
      } else {
        // API call failed (error logged in submitPublicSubscription)
        errorMessage = "Subscription failed. Please check your details or try again later.";
      }
    } catch (error) {
      console.error("Error during language selection submission:", error);
      errorMessage = "An unexpected error occurred. Please try again.";
    } finally {
      isLoading = false;
    }
  }
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your **preferred language** for the newsletter?
  </MarkdownText>

  {#if isLoading}
    <p class="loading-message">Subscribing...</p> 
  {:else if errorMessage}
    <p class="error-message">{errorMessage}</p>
    <LanguageInput
      defaultLanguageCode={$store.subscriberLanguage || null}
      onSelect={handleLanguageSelect}
    />
    <button class="retry-button" on:click={() => errorMessage = ''}>Try Again</button>
  {:else}
    <LanguageInput
      defaultLanguageCode={$store.subscriberLanguage || null}
      onSelect={handleLanguageSelect}
    />
  {/if}
</Centered>

<style>
  /* Minimal style block */
  .error-message {
    color: red;
    text-align: center;
    margin-top: 1rem;
  }
  .loading-message {
    text-align: center;
    margin-top: 1rem;
  }
  .retry-button {
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }
</style>
