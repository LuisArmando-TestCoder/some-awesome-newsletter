<script lang="ts">
  import { writable } from "svelte/store";
  import store, {
    latestMessage,
  } from "../../../../../../store";

  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import Country from "../../../../../inputs/Country/Country.svelte";

  import createNewsSource from "../../../../../requests/createNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import { validateFields } from "./validation";
  import getConfiguratorSession from "../../../../../requests/getConfiguratorSession";
  import { ping } from "../../../../../../Notification/notificationStore";
  
  // Import translation store
  import { t } from "$lib/i18n/dashboard-translations";

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

  async function handleAddNewsSource() {
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

    await processNewsSourceAction(
      fields,
      (f) => {
        const data: {
          type: string;
          url: string;
          community: string;
          lead?: string;
          personality: string;
        } = {
          type: "website",
          url: f.url,
          community: "Newsletter Users",
          personality: f.personality,
        };

        if (f.lead) {
          data.lead = f.lead;
        }

        return data;
      },
      createNewsSource,
      (msg) => (addErrorMessage = msg),
      $t['newsSource.errorDefault'], // Translated default error
      async (created) => {
        clearAddForm();
        addedNewsSource.set(created);
        await getConfiguratorSession();
        // Translated Ping Notification
        ping($t['newsSource.successTitle'], $t['newsSource.successDescription']);
      }
    );

    isAdding = false;
  }
</script>

<form class="news-source-form" on:submit|preventDefault={handleAddNewsSource}>
  <div class="news-source-input news-source-wrapper">
    <Link
      placeholder={$t['newsSource.urlPlaceholder']}
      value={addNewsSourceUrl}
      onChange={(val) => (addNewsSourceUrl = val)}
    />
    <Country onSelect={(selection) => {
      if (selection) {
        addNewsSourceUrl = selection.ns;
      }
    }} />
  </div>
  <div class="news-source-wrapper">
    <Link
      placeholder={$t['newsSource.leadPlaceholder']}
      value={addNewsSourceLead}
      onChange={(val) => (addNewsSourceLead = val)}
    />
  </div>

  {#if isAdding}
    <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
  {/if}

  <SubmitButton
    disabled={isAdding}
    loading={isAdding}
    label={isAdding ? $t['newsSource.adding'] : $t['newsSource.uploadButton']}
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

  .news-source-wrapper {
    max-width: 512px;
  }
  
  .news-source-input {
    align-items: end;
    grid-gap: 1rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(1fr, 100px));
  }

  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
</style>