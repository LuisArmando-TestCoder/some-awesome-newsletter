<script lang="ts">
  import { writable } from "svelte/store";
  import store, {
    latestMessage,
  } from "../../../../../../store";

  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import Country from "../../../../../inputs/Country/Country.svelte";
  import Switch from "$lib/ui/components/Switch.svelte";

  import createNewsSource from "../../../../../requests/createNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import { validateFields } from "./validation";
  import getConfiguratorSession from "../../../../../requests/getConfiguratorSession";
  import { ping } from "../../../../../../Notification/notificationStore";
  
  // Import translation store
  import { t } from "$lib/i18n/dashboard-translations";
  import { checkPlanLimit } from "$lib/utils/checkPlanLimits";

  export const addedNewsSource = writable<any>(null);

  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let isPaidNewsletter = false;
  let isAdding = false;
  let addErrorMessage = "";

  $: limitCheck = checkPlanLimit("newsSources");
  $: isLimitReached = !limitCheck.allowed;

  function clearAddForm() {
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = $store.personality;
    isPaidNewsletter = false;
  }

  async function handleAddNewsSource() {
    if (isLimitReached) {
      addErrorMessage = `Plan limit reached: ${limitCheck.limit} news sources. Upgrade to add more.`;
      return;
    }

    const fields = {
      url: addNewsSourceUrl,
      lead: addNewsSourceLead,
      personality: addNewsSourcePersonality,
      isPaidNewsletter,
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
          isPaidNewsletter?: boolean;
        } = {
          type: "website",
          url: f.url,
          community: "Newsletter Users",
          personality: f.personality,
          isPaidNewsletter: f.isPaidNewsletter,
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

<form class="news-source-form" on:submit|preventDefault={handleAddNewsSource} class:form-disabled={isLimitReached}>
  {#if isLimitReached}
    <div class="limit-warning">
      <p><strong>Limit Reached:</strong> You have {limitCheck.current} news sources (Limit: {limitCheck.limit}). <a href="/plans">Upgrade Plan</a></p>
    </div>
  {/if}

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

  <div class="paid-toggle-wrapper">
    <span class="paid-toggle-label">Paid Newsletter</span>
    <Switch toggled={isPaidNewsletter} onChange={(v) => (isPaidNewsletter = v)} />
  </div>

  {#if isAdding}
    <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
  {/if}

  <SubmitButton
    disabled={isAdding || isLimitReached}
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

  .form-disabled {
    opacity: 0.7;
  }

  .limit-warning {
    background-color: var(--color-warning-light, #fff3cd);
    border: 1px solid var(--color-warning, #ffc107);
    color: var(--color-warning-dark, #856404);
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
    
    a {
      color: inherit;
      text-decoration: underline;
      font-weight: bold;
    }
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

  .paid-toggle-wrapper {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 5px;
  }

  .paid-toggle-label {
    font-size: 0.9rem;
    font-weight: 600;
    color: #4b5563;
  }
</style>
