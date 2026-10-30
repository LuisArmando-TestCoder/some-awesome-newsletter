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
  import type { NewsSource } from "../../../../../../types";
  import { processNewsSourceAction } from "./newsSourceActions";
  import { validateFields } from "./validation";
  import getConfiguratorSession from "../../../../../requests/getConfiguratorSession";
  import { ping } from "../../../../../../Notification/notificationStore";
  
  // Import translation store
  import { t } from "$lib/i18n/dashboard-translations";
  import { dt } from "$lib/dashboard/i18n";
  import { goTo } from "$lib/dashboard/nav";
  import { sourceUsage } from "$lib/dashboard/sources/sourceUtils";

  export const addedNewsSource = writable<NewsSource | null>(null);

  let addNewsSourceUrl = "";
  let addNewsSourceLead = "";
  let addNewsSourcePersonality = "";
  let isPaidNewsletter = false;
  let isAdding = false;
  let addErrorMessage = "";

  // Reactive plan usage (checkPlanLimit reads the store once and never updates).
  $: usage = sourceUsage($store.config, $store.subscribers);
  $: isLimitReached = !usage.unlimited && usage.atLimit;

  function clearAddForm() {
    addNewsSourceUrl = "";
    addNewsSourceLead = "";
    addNewsSourcePersonality = $store.personality;
    isPaidNewsletter = false;
  }

  async function handleAddNewsSource() {
    // In-flight guard: one POST per submit, even on double click or Enter.
    if (isAdding) return;
    if (isLimitReached) {
      addErrorMessage = $dt("dash.sources.limit.usage", { used: usage.used, limit: usage.limit });
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
    try {
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
    } finally {
      isAdding = false;
    }
  }
</script>

<form class="news-source-form" novalidate on:submit|preventDefault={handleAddNewsSource} class:form-disabled={isLimitReached}>
  {#if isLimitReached}
    <div class="limit-warning" role="status">
      <p>{$dt("dash.sources.limit.usage", { used: usage.used, limit: usage.limit })}. <a href="/dashboard?section=settings&tab=billing" on:click|preventDefault={() => goTo("settings", "billing")}>{$dt("dash.sources.limit.action")}</a></p>
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
    <span class="paid-toggle-label">{$t['newsSource.paidNewsletter']}</span>
    <Switch toggled={isPaidNewsletter} onChange={(v) => (isPaidNewsletter = v)} />
  </div>

  {#if isAdding}
    <TextTypes type="sub-highlight-italic">{$latestMessage}</TextTypes>
  {/if}

  <SubmitButton
    disabled={isAdding || isLimitReached}
    loading={isAdding}
    label={isAdding ? $t['newsSource.adding'] : $t['newsSource.uploadButton']}
    type="submit"
  />

  {#if addErrorMessage}
    <div class="error-message" role="alert">{addErrorMessage}</div>
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
