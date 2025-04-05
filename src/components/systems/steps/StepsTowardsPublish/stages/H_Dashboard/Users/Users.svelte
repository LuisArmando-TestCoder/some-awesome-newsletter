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
  // Subscribe to stores from the service and the central store
  const {
    subscribersByNewsSource,
    allLeadData,
    loadingSubscribers,
    loadingLeads,
    loadingError,
  } = UserDataService;

  // Derive props for children directly from store subscriptions
  $: config = $store.config;
  $: newsSources = config?.newsSources || [];
  $: brandColor = config?.brandColor;
  $: complementaryColor = $store.complementaryColor; // Assuming this is separate in the main store

  // Combine loading states for analytics
  $: isAnalyticsLoading = $loadingSubscribers || $loadingLeads;
</script>

<!-- HTML TEMPLATE SECTION -->
<Page>
  <div class="users-page-layout">
    <!-- User Management Column -->
    <div class="column user-management-column">
      <TextTypes type="title">Manage Users by News Source</TextTypes>

      {#if $loadingSubscribers && !newsSources.length}
        <!-- Show initial loading only if we haven't potentially loaded sources yet -->
        <p class="loading-message">
          <TextTypes type="sub-italic">Loading subscribers...</TextTypes>
        </p>
      {:else if $loadingError && !$subscribersByNewsSource}
        <!-- Show error only if it prevented loading subscribers -->
        <p class="error-message">Error loading data: {$loadingError}</p>
      {:else}
        <!-- Loop through news sources from the config store -->
        {#if newsSources.length > 0}
          {#each newsSources as newsSource (newsSource.id)}
            {@const subscribersForSource =
              $subscribersByNewsSource[newsSource.id] || []}
            <NewsSourceUserManagement
              {newsSource}
              subscribers={subscribersForSource}
              {canReveal}
            />
          {/each}
        {:else}
          <!-- Message if loading is done but no news sources are configured -->
          {#if !$loadingSubscribers}
            <p class="no-data-message">
              <TextTypes type="sub-italic">
                No news sources configured yet. Add news sources in the previous
                steps to manage users.
              </TextTypes>
            </p>
          {/if}
        {/if}
      {/if}
    </div>

    <!-- Analytics Column -->
    <div class="column charts-column">
      <UserAnalytics
        subscribersByNewsSource={$subscribersByNewsSource}
        allLeadData={$allLeadData}
        {newsSources}
        {brandColor}
        {complementaryColor}
        isLoading={isAnalyticsLoading}
        loadingError={$loadingError}
      />
    </div>
  </div>
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
