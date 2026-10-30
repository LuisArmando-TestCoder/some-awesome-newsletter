<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
  
    // Central Store and Types
    import store from "../../../../../../store"; // Adjust path
  import { t } from "$lib/i18n/dashboard-translations";
  
    // Data Service (Handles state and API calls)
  
    // Child Components
    import UserAnalytics from "./UserAnalytics.svelte";
  
    // UI Wrappers/Components
    import Page from "../../../../../wrappers/Page/Page.svelte"; // Adjust path
  
    // Props (if any remain - canReveal was one)
  export const canReveal: boolean = true; // Passed by MainSteps; this view is always visible
  
  // --- Initialization ---
  // REMOVED onMount call - Data is loaded centrally via getConfiguratorSession -> refreshSubscribers
  
  // --- Reactive Data Access ---
    // Access data directly from the central store
    $: newsSources = $store.config?.newsSources || []; // Use $store directly
    $: subscribersByNewsSource = $store.subscribers || {}; // Get subscribers from central store (loaded from localStorage initially)
    // $: brandColor = $store.config?.brandColor; // Use $store directly
    $: complementaryColor = $store.complementaryColor; // Assuming this is separate in the main store
  
    // Removed loading state logic tied to UserDataService stores
    // Consider adding global loading/error states to central store if needed
  
    // --- State for Auto-Collapse (Using Writable Store) ---
  
  </script>
  
  <!-- HTML TEMPLATE SECTION -->
  <Page>
      <!-- Analytics Column -->
      <div class="column">
        <!-- Similar check for analytics -->
        {#if newsSources && newsSources.length > 0}
          {@const subsReadyForAnalytics = !$store.isRefreshingSubscribers || Object.keys(subscribersByNewsSource || {}).length > 0}
           {#if subsReadyForAnalytics}
            <UserAnalytics
              {subscribersByNewsSource}
              allLeadData={$store.leads}
              {newsSources}
              {complementaryColor}
            />
          {:else}
            <!-- Show loading only if news sources exist but subscribers don't yet -->
            <p class="loading-message">{$t['loading.analytics']}</p>
          {/if}
        {:else}
          <!-- Optional: Message if no news sources, hence no analytics -->
          <p class="no-data-message">{$t['errors.noNewsSourcesConfigured'] || "Add a source first. Reports appear once you have subscribers."}</p>
        {/if}
      </div> <!-- Correctly closing charts-column -->
  </Page>
  
  <!-- STYLES -->
  <!-- Import the necessary layout and shared styles -->
  <!-- Component-specific styles are now within their respective component files -->
  <style lang="scss">
    @use "../Users/Users.scss";
    @include Users.layout-column;

    .loading-message,
    .no-data-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: var(--radius-m);
    }
    .loading-message,
    .no-data-message {
      color: var(--color-text-secondary, #666);
    }
  </style>
