<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
  import { onMount } from "svelte";

  // Central Store and Types
  import store from "../../../../../../store.ts"; // Adjust path

  // Data Service (Handles state and API calls)
  import * as UserDataService from "./UserDataService.ts"; // Adjust path

  // Child Components
  import NewsSourceUserManagement from "./NewsSourceUserManagement.svelte";
  import UserAnalytics from "./UserAnalytics.svelte";

  // UI Wrappers/Components
  import Page from "../../../../../wrappers/Page/Page.svelte"; // Adjust path
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte"; // Adjust path

  // Props (if any remain - canReveal was one)
  export let canReveal = true; // Keep props passed from parent

  // --- Initialization ---
  onMount(() => {
    // Trigger initial data load via the service
    // Components will reactively update based on the service's store changes
    UserDataService.loadInitialData();
  });

  // --- Reactive Data Access ---
  // Access data directly from the central store
  $: config = $store.config;
  $: newsSources = $store.config?.newsSources || []; // Use $store directly
  $: subscribersByNewsSource = $store.subscribers || {}; // Get subscribers from central store
  $: allLeadData = $store.leads || {}; // Get leads from central store
  $: brandColor = $store.config?.brandColor; // Use $store directly
  $: complementaryColor = $store.complementaryColor; // Assuming this is separate in the main store

  // Removed loading state logic tied to UserDataService stores
  // Consider adding global loading/error states to central store if needed
</script>

<!-- HTML TEMPLATE SECTION -->
<Page>
  <div class="users-page-layout">
    <!-- User Management Column -->
    <div class="column user-management-column">
      <TextTypes type="title">Manage Users by News Source</TextTypes>

      <!-- Display content based on newsSources availability -->
      {#if newsSources && newsSources.length > 0}
        {#each newsSources as newsSource (newsSource.id)}
          {@const subscribersForSource = (subscribersByNewsSource && subscribersByNewsSource[newsSource.id]) ? subscribersByNewsSource[newsSource.id] : []}
          <NewsSourceUserManagement
            {newsSource}
            subscribers={subscribersForSource}
            {canReveal}
          />
        {/each}
      {:else}
        <!-- Message if no news sources are configured -->
        <p class="no-data-message">
          <TextTypes type="sub-italic">
            No news sources configured yet. Add news sources in the previous
            steps to manage users.
          </TextTypes>
        </p>
      {/if}
    </div> <!-- Correctly closing user-management-column -->

    <!-- Analytics Column -->
    <div class="column charts-column">
      <UserAnalytics
        {subscribersByNewsSource}
        {allLeadData}
        {newsSources}
        {brandColor}
        {complementaryColor}
        isLoading={false}
        loadingError={null}
      />
    </div> <!-- Correctly closing charts-column -->
  </div> <!-- Correctly closing users-page-layout -->
</Page>

<!-- STYLES -->
<!-- Import the necessary layout and shared styles -->
<!-- Component-specific styles are now within their respective component files -->
<style lang="scss">
  // These imports define the overall page structure and potentially shared variables/mixins
  @use "../Dashboard.scss"; // Main dashboard layout styles if applicable
  @use "./Users.scss"; // Styles specific to the Users page layout (e.g., .users-page-layout, .column)

  // Add any styles *only* relevant to the main Users.svelte shell here
  .loading-message,
  .error-message,
  .no-data-message {
    margin-top: 1rem;
    padding: 1rem;
    border-radius: var(--radius-m);
  }
  .loading-message,
  .no-data-message {
    background-color: var(--color-background);
    color: var(--color-text-secondary, #666);
  }
  .error-message {
    background-color: var(--color-error-light, #ffebee);
    border: 1px solid var(--color-error, #f44336);
    color: var(--color-error-dark, #c62828);
  }
</style>
