<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import store, { saveToStore } from "../../../../store";
  import type { NewsSource, Config, Store } from "../../../../types"; // Import Store from types.ts
  import getPublicConfig from "../../../requests/getPublicConfig";

  export let canReveal = false; // For step progression, managed by parent

  let localConfiguratorId: string | null = null;
  let localNewsSourceIdFromQuery: string | null = null;
  
  let availableNewsSources: NewsSource[] = [];
  let localSelectedNewsSourceId: string = "";

  let isLoading: boolean = false;
  let errorMessage: string = "";

  // Props to communicate readiness to parent
  export let isStepComplete: boolean = false;

  onMount(async () => {
    const urlParams = $page.url.searchParams;
    localConfiguratorId = urlParams.get("configuratorId");
    localNewsSourceIdFromQuery = urlParams.get("newsSourceId");

    if (!localConfiguratorId) {
      errorMessage = "Configuration ID (configuratorId) is missing from URL parameters.";
      isStepComplete = false;
      return;
    }
    saveToStore({ widgetConfiguratorId: localConfiguratorId });

    if (localNewsSourceIdFromQuery) {
      localSelectedNewsSourceId = localNewsSourceIdFromQuery;
      saveToStore({ widgetSelectedNewsSourceId: localSelectedNewsSourceId });
      isStepComplete = true;
    } else {
      isLoading = true;
      try {
        const publicConfig: Config | null = await getPublicConfig(localConfiguratorId);
        if (publicConfig && publicConfig.newsSources) {
          availableNewsSources = publicConfig.newsSources.filter(ns => ns.isPublic !== false && ns.active !== false);
          if (availableNewsSources.length > 0) {
            // Don't auto-select, let user choose or ensure selection triggers completion
            // localSelectedNewsSourceId = availableNewsSources[0].id; 
            // saveToStore({ widgetSelectedNewsSourceId: localSelectedNewsSourceId });
            // isStepComplete = true; // Completion depends on selection now
          } else {
            errorMessage = "No public news sources available for this configuration.";
            isStepComplete = false;
          }
        } else {
          errorMessage = "Could not load news sources configuration.";
          isStepComplete = false;
        }
      } catch (err) {
        console.error("Error fetching public news sources:", err);
        errorMessage = "Failed to load news sources.";
        isStepComplete = false;
      } finally {
        isLoading = false;
      }
    }
  });

  function handleNewsSourceSelection(event: Event) {
    const target = event.target as HTMLSelectElement;
    localSelectedNewsSourceId = target.value;
    if (localSelectedNewsSourceId) {
        saveToStore({ widgetSelectedNewsSourceId: localSelectedNewsSourceId });
        isStepComplete = true;
        errorMessage = ""; // Clear error if selection is made
    } else {
        isStepComplete = false;
    }
  }

  // Watch for changes that might affect step completion
  $: {
    if (localConfiguratorId && localNewsSourceIdFromQuery) {
        isStepComplete = true;
    } else if (localConfiguratorId && availableNewsSources.length > 0 && localSelectedNewsSourceId) {
        isStepComplete = true;
    } else if (localConfiguratorId && availableNewsSources.length === 0 && !localNewsSourceIdFromQuery) {
        // No sources to select, but configuratorId is present. This step is "complete" in terms of its own logic,
        // but the overall flow might be blocked. Parent should handle this.
        // For now, let's say it's not complete if no selection can be made.
        isStepComplete = false;
    } else if (!localConfiguratorId) {
        isStepComplete = false;
    }
    // If configuratorId is present, but no newsSourceIdFromQuery and no availableNewsSources,
    // and no selection has been made yet, the step is not complete.
    else if (localConfiguratorId && !localNewsSourceIdFromQuery && availableNewsSources.length > 0 && !localSelectedNewsSourceId) {
        isStepComplete = false;
    }
  }

</script>

<div class="step-initial-params">
  <h3>Step 1: Newsletter Configuration</h3>

  {#if errorMessage}
    <p class="error-message">{errorMessage}</p>
  {/if}

  {#if isLoading}
    <p>Loading news sources...</p>
  {/if}

  {#if !localConfiguratorId && !errorMessage}
    <p class="info-message">Waiting for Configuration ID...</p>
  {/if}

  {#if localConfiguratorId && !localNewsSourceIdFromQuery && availableNewsSources.length > 0 && !isLoading}
    <div class="form-group">
      <label for="news-source-select-widget">Choose a Newsletter:</label>
      <select id="news-source-select-widget" on:change={handleNewsSourceSelection} bind:value={localSelectedNewsSourceId} required>
        <option value="">-- Select a Newsletter --</option>
        {#each availableNewsSources as ns (ns.id)}
          <option value={ns.id}>{ns.url || ns.id}</option> 
          <!-- TODO: Use a more descriptive name for news source if available, e.g., ns.name or ns.description -->
        {/each}
      </select>
    </div>
  {:else if localConfiguratorId && localNewsSourceIdFromQuery}
    <p>Selected Newsletter (from URL): {localNewsSourceIdFromQuery}</p>
  {:else if localConfiguratorId && !isLoading && availableNewsSources.length === 0 && !localNewsSourceIdFromQuery && !errorMessage}
    <!-- This case is handled by the errorMessage "No public news sources available..." -->
  {/if}
</div>

<style>
  .step-initial-params {
    /* Styles for this step */
  }
  .form-group {
    margin-bottom: 1rem;
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
  }
  .form-group select {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  .error-message {
    color: red;
    margin-bottom: 1rem;
  }
  .info-message {
    color: #333;
    margin-bottom: 1rem;
  }
</style>
