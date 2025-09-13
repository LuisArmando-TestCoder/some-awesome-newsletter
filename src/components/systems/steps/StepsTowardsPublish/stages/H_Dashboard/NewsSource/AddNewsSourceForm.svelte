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

  // 2) Create a writable store for tracking the newly added news source
  export const addedNewsSource = writable<any>(null);

  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let addNewsSourceSchedule = "";
  let isAdding = false;
  let addErrorMessage = "";

  function clearAddForm() {
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = "";
    addNewsSourceSchedule = "";
  }

  // Called when the user submits the add form
  async function handleAddNewsSource() {
    isAdding = true;
    const fields = {
      url: addNewsSourceUrl,
      lead: addNewsSourceLead,
      personality: addNewsSourcePersonality,
      schedule: addNewsSourceSchedule,
    };

    await processNewsSourceAction(
      fields,
      (f) => ({
        type: "website",
        url: f.url,
        community: "Newsletter Users",
        lead: f.lead,
        scheduleTime: f.schedule,
        personality: f.personality,
      }),
      createNewsSource,
      (msg) => (addErrorMessage = msg),
      "Failed to add news source. Please try again.",
      (created) => {
        // If successful, push into local store config
        const currentConfig = $store.config;
        if (currentConfig?.newsSources) {
          currentConfig.newsSources.push(created);
          saveToStore({ config: currentConfig });
        }
        clearAddForm();

        // 3) Instead of dispatching an event, update the store
        addedNewsSource.set(created);
      }
    );

    isAdding = false;
  }
</script>

<form class="news-source-form" on:submit|preventDefault={handleAddNewsSource}>
  <Link
    placeholder="Lead (destination URL or identifier)"
    value={addNewsSourceLead}
    onChange={(val) => (addNewsSourceLead = val)}
  />
  <Link
    placeholder="News Source URL"
    value={addNewsSourceUrl}
    onChange={(val) => (addNewsSourceUrl = val)}
  />
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
