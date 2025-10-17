<script lang="ts">
  // 1) Remove createEventDispatcher import
  // import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";
  import store, {
    latestMessage,
    saveToStore,
  } from "../../../../../../store";

  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";

  import createNewsSource from "../../../../../requests/createNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import { validateFields } from "./validation";
    import getConfiguratorSession from "../../../../../requests/getConfiguratorSession";

  // 2) Create a writable store for tracking the newly added news source
  export const addedNewsSource = writable<any>(null);

  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let isAdding = false;
  let addErrorMessage = "";

  function clearAddForm() {
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = $store.personality;
  }

  // Called when the user submits the add form
  async function handleAddNewsSource() {
    console.log("[AddNewsSourceForm.svelte] handleAddNewsSource called");
    const fields = {
      url: addNewsSourceUrl,
      lead: addNewsSourceLead,
      personality: addNewsSourcePersonality,
    };
    const error = validateFields(fields);
    if (error) {
      addErrorMessage = error;
      return;
    }
    isAdding = true;
    console.log("[AddNewsSourceForm.svelte] fields", fields);

    await processNewsSourceAction(
      fields,
      (f) => ({
        type: "website",
        url: f.url,
        community: "Newsletter Users",
        lead: f.lead,
        personality: f.personality,
      }),
      createNewsSource,
      (msg) => (addErrorMessage = msg),
      "Failed to add news source. Please try again.",
      async (created) => {
        // The createNewsSource request already updates the store, so we don't need to do it here.
        // We just clear the form and update the local 'addedNewsSource' store.
        clearAddForm();
        addedNewsSource.set(created);
        await getConfiguratorSession();
      }
    );

    isAdding = false;
  }
</script>

<form class="news-source-form" on:submit|preventDefault={handleAddNewsSource}>
  <Link
    placeholder="News Source URL"
    value={addNewsSourceUrl}
    onChange={(val) => (addNewsSourceUrl = val)}
  />
  <Link
    placeholder="Lead (destination URL or identifier)"
    value={addNewsSourceLead}
    onChange={(val) => (addNewsSourceLead = val)}
  />
  <p class="info-message">
    Note: The lead URL is optional, but it's highly recommended. It helps our AI to better understand the context of your news source and generate more relevant content.
  </p>
  <!-- Personality & schedule are optional in the example -->
  <!-- Add additional inputs for Personality and Schedule if desired -->

  {#if isAdding}
    <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
  {/if}

  <SubmitButton
    disabled={isAdding}
    loading={isAdding}
    label={isAdding ? "Adding" : "Upload News Source"}
    callback={handleAddNewsSource}
  />

  {#if addErrorMessage}
    <div class="error-message">{addErrorMessage}</div>
  {/if}
</form>

<style lang="scss">
  .news-source-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
</style>
