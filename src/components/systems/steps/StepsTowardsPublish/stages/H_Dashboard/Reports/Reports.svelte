<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
    import { writable } from "svelte/store"; // ADDED writable
  
    // Central Store and Types
    import store from "../../../../../../store"; // Adjust path
  
    // Data Service (Handles state and API calls)
  
    // Child Components
    import UserAnalytics from "./UserAnalytics.svelte";
  
    // UI Wrappers/Components
    import Page from "../../../../../wrappers/Page/Page.svelte"; // Adjust path
  
    // Props (if any remain - canReveal was one)
  export let canReveal = true; // Keep props passed from parent
  
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
    const openNewsSourceIdStore = writable<string | null>(null); // Store for the open card ID
  
  </script>
  
  <!-- HTML TEMPLATE SECTION -->
  <Page>
      <!-- Analytics Column -->
      <div class="column">
        <!-- Similar check for analytics -->
        {#if newsSources && newsSources.length > 0}
          {@const subsReadyForAnalytics = subscribersByNewsSource && Object.keys(subscribersByNewsSource).length > 0}
           {#if subsReadyForAnalytics}
            <UserAnalytics
              {subscribersByNewsSource}
              allLeadData={$store.leads}
              {newsSources}
              {complementaryColor}
            />
          {:else}
            <!-- Show loading only if news sources exist but subscribers don't yet -->
            <p class="loading-message">Loading analytics data...</p>
          {/if}
        {:else}
          <!-- Optional: Message if no news sources, hence no analytics -->
          <p class="no-data-message">Analytics require configured news sources.</p>
        {/if}
      </div> <!-- Correctly closing charts-column -->
  </Page>
  
  <!-- STYLES -->
  <!-- Import the necessary layout and shared styles -->
  <!-- Component-specific styles are now within their respective component files -->
  <style lang="scss">
    // These imports define the overall page structure and potentially shared variables/mixins
    @use "../Dashboard.scss"; // Main dashboard layout styles if applicable
    @use "./Reports.scss"; // Styles specific to the Users page layout (e.g., .users-page-layout, .column)
  
    // Add any styles *only* relevant to the main Users.svelte shell here
    .title-container {
      display: flex;
      align-items: center;
      gap: 0.5rem; // Space between title and indicator
      margin-bottom: 1rem; // Existing margin likely handled by TextTypes or parent styles
    }
  
    .refresh-indicator {
      font-size: var(--font-size-s); // Smaller text
      color: var(--color-text-secondary); // Muted color
      font-style: italic;
    }
  
    .loading-message,
    .error-message,
    .no-data-message {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: var(--radius-m);
    }
    .loading-message,
    .no-data-message {
      color: var(--color-text-secondary, #666);
    }
    .error-message {
      background-color: var(--color-error-light, #ffebee);
      border: 1px solid var(--color-error, #f44336);
      color: var(--color-error-dark, #c62828);
    }
  </style>
  