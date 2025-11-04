<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/Users.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store"; // ADDED writable
  import type { NewsSource, NewsletterUser } from "../../../../../../types.js"; // Import NewsSource type if not already implicitly available - ADDED .js

  // Central Store and Types
  import store from "../../../../../../store"; // Adjust path

  // Data Service (Handles state and API calls)
  import * as UserDataService from "./UserDataService"; // Adjust path

  // Child Components
  import NewsSourceUserManagement from "./NewsSourceUserManagement.svelte";
  import UserAnalytics from "../Reports/UserAnalytics.svelte";

  // UI Wrappers/Components
  import Page from "../../../../../wrappers/Page/Page.svelte"; // Adjust path
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte"; // Adjust path
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props (if any remain - canReveal was one)
export let canReveal = true; // Keep props passed from parent

let searchTerm = "";
let currentPage = 0;
const pageSize = 5;

// --- Initialization ---
// REMOVED onMount call - Data is loaded centrally via getConfiguratorSession -> refreshSubscribers

// --- Reactive Data Access ---
  // Access data directly from the central store
  $: config = $store.config;
  $: newsSources = $store.config?.newsSources || []; // Use $store directly
  $: newsSourcesReversed = $store.config?.newsSources
    ? [...$store.config.newsSources].reverse()
    : [];
  $: subscribersByNewsSource = $store.subscribers || {}; // Get subscribers from central store (loaded from localStorage initially)

  $: filteredNewsSources = newsSourcesReversed.filter(ns => {
    const searchTermLower = searchTerm.toLowerCase();
    const inNewsSource = ns.url?.toLowerCase().includes(searchTermLower) ||
                         ns.lead?.toLowerCase().includes(searchTermLower) ||
                         ns.id?.toLowerCase().includes(searchTermLower);

    if (inNewsSource) return true;

    const subscribers = subscribersByNewsSource[ns.id] || [];
    return subscribers.some((sub: NewsletterUser) => 
      sub.email.toLowerCase().includes(searchTermLower) ||
      (sub.name && sub.name.toLowerCase().includes(searchTermLower))
    );
  });

  $: paginatedNewsSources = filteredNewsSources.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  function handleSearch(event: CustomEvent<{ value: string }>) {
    searchTerm = event.detail.value;
    currentPage = 0;
  }

  function handlePageChange(event: CustomEvent<{ page: number }>) {
    currentPage = event.detail.page;
  }
  // $: brandColor = $store.config?.brandColor; // Use $store directly
  $: complementaryColor = $store.complementaryColor; // Assuming this is separate in the main store
  $: isRefreshing = $store.isRefreshingSubscribers; // Subscribe to the refresh flag

  // Removed loading state logic tied to UserDataService stores
  // Consider adding global loading/error states to central store if needed

  // --- State for Auto-Collapse (Using Writable Store) ---
  const openNewsSourceIdStore = writable<string | null>(null); // Store for the open card ID

</script>

<!-- HTML TEMPLATE SECTION -->
<Page>
    <SearchBar placeholder={$t['placeholders.searchUsers']} on:search={handleSearch} />
    <!-- User Management Column -->
    <div class="column user-management-column">
      <div class="title-container">
        <TextTypes type="title">{$t['labels.manageUsers']}</TextTypes>
        {#if isRefreshing}
          <span class="refresh-indicator">({$t['labels.updatingList']})</span>
        {/if}
      </div>

      <!-- Display content based on newsSources availability -->
      {#if newsSourcesReversed && newsSourcesReversed.length > 0}
        <!-- Check if subscriber data is ready (will be from localStorage initially) -->
        {@const subsReady = subscribersByNewsSource && Object.keys(subscribersByNewsSource).length > 0}
        {#if subsReady}
          {#each paginatedNewsSources as newsSource (newsSource.id)}
            {@const subscribersForSource = subscribersByNewsSource[newsSource.id] ?? []}
            <NewsSourceUserManagement
              {newsSource}
              subscribers={subscribersForSource}
              {canReveal}
              {openNewsSourceIdStore}
            />
          {/each}
          <Pagination 
            {currentPage}
            totalItems={filteredNewsSources.length}
            {pageSize}
            on:pageChange={handlePageChange}
          />
        {:else}
          <!-- Show loading specifically for subscribers if news sources exist but subscriber data isn't ready -->
          <p class="loading-message">{$t['loading.subscribers']}</p>
        {/if}
      {:else}
        <!-- Message if no news sources are configured -->
        <p class="no-data-message">
          <TextTypes type="sub-italic">
            {$t['errors.noNewsSourcesConfigured']}
          </TextTypes>
        </p>
      {/if}
    </div> <!-- Correctly closing user-management-column -->
</Page>

<!-- STYLES -->
<!-- Import the necessary layout and shared styles -->
<!-- Component-specific styles are now within their respective component files -->
<style lang="scss">
  // These imports define the overall page structure and potentially shared variables/mixins
  @use "../Dashboard.scss"; // Main dashboard layout styles if applicable
  @use "./Users.scss"; // Styles specific to the Users page layout (e.g., .users-page-layout, .column)

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
