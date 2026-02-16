<script lang="ts">
  import CardComponent from "../../../../../selectors/Card/Card.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import SlotAutoCollapseToggle from "../SlotAutoCollapseToggle.svelte"; // <--- Import the wrapper

  import type { NewsSource } from "../../../../../../types";
  import store, { latestMessage } from "../../../../../../store";

  import AddNewsSourceForm from "./AddNewsSourceForm.svelte";
  import UpdateNewsSourceForm from "./UpdateNewsSourceForm.svelte";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { checkPlanLimit } from "$lib/utils/checkPlanLimits";

  export let canReveal = true;

  let currentPage = 0;
  const pageSize = 3;
  let searchTerm = "";
  let cardTitle: string;

  // Local error messages for each update form
  let updateErrorMessages: Record<string, string> = {};

  // For display, reverse the array so newest appears first
  $: newsSourcesReversed = $store.config?.newsSources
    ? [...$store.config.newsSources].reverse()
    : [];

  $: filteredNewsSources = newsSourcesReversed.filter(
    (ns) =>
      ns.url?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ns.lead?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ns.id?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  $: paginatedNewsSources = filteredNewsSources.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  function handlePageChange(event: CustomEvent<{ page: number }>) {
    currentPage = event.detail.page;
  }

  function handleSearch(event: CustomEvent<{ value: string }>) {
    searchTerm = event.detail.value;
    currentPage = 0; // Reset to first page on new search
  }

  // No longer need local isAddCardOpen state
  // let isAddCardOpen = false; <--- REMOVED

  function handleAddSuccess() {
    // Logic after a source is successfully added (e.g., show message)
    // The card closing is now handled automatically by SlotAutoCollapseToggle if autoCollapse=true
    // or by the user clicking again otherwise.
    console.log("News source added successfully!");
    // Maybe refetch data or wait for store update
  }

  // Define a stable ID for the static "Add" card
  const ADD_NEWS_SOURCE_CARD_ID = "add-news-source";

  $: limitCheck = checkPlanLimit("newsSources");
  $: isLimitReached = !limitCheck.allowed;
</script>

<Page>
  <SearchBar
    placeholder={$t['newsSource.searchPlaceholder']}
    on:search={handleSearch}
  />
  <!-- Use the SlotAutoCollapseToggle wrapper -->
  <SlotAutoCollapseToggle {canReveal} autoCollapse={true} let:getToggleProps>
    <!-- ^-- autoCollapse=true makes it an accordion -->
    <!-- ^-- let:getToggleProps provides the helper function -->

    <!-- Toggle card for adding a new news source -->
    <!-- Toggle card for adding a new news source -->
    <ToggleCard
      {canReveal}
      cardTitle={`${$t['newsSource.addTitle']} ${isLimitReached ? '(Limit Reached)' : ''}`}
      {...getToggleProps(ADD_NEWS_SOURCE_CARD_ID)}
    >
      <!-- Pass canReveal down if AddNewsSourceForm needs it -->
      <AddNewsSourceForm on:added={handleAddSuccess} />
    </ToggleCard>

    <!-- List of existing news sources -->
    <!-- No need for the extra div.news-sources-list unless needed for specific styling -->
    <!-- The SlotAutoCollapseToggle already provides a .toggle-group div -->
    {#if newsSourcesReversed && newsSourcesReversed.length}
      {#each paginatedNewsSources as ns, i (ns.id)}
        <ToggleCard
          {canReveal}
          cardTitle={`${ns.url?.split("//")[1] ?? $t['labels.notApplicable']} ⟫ ${ns.lead?.split("//")[1] ?? $t['labels.notApplicable']}`}
          {...getToggleProps(ns.id)}
        >
          <UpdateNewsSourceForm
            bind:newsSource={paginatedNewsSources[i]}
            errorMessage={updateErrorMessages[ns.id]}
            {canReveal}
            on:updated={() => {
              console.log(`Update form for ${ns.id} reported update`);
              // Find the index of the news source in the original array and update it
              const index = $store.config.newsSources.findIndex(
                (source: NewsSource) => source.id === ns.id
              );
              if (index !== -1) {
                $store.config.newsSources[index] = paginatedNewsSources[i];
              }
            }}
          />
        </ToggleCard>
      {/each}

      <Pagination
        {currentPage}
        totalItems={filteredNewsSources.length}
        {pageSize}
        on:pageChange={handlePageChange}
      />
    {:else}
      <!-- Loading/Empty State -->
      <div class="loading-state">
        <p>
          <TextTypes type="sub-italic">
            {#if $store.config?.newsSources === undefined}
              {$t['newsSource.loading']}
            {:else}
              {$t['newsSource.noSources']}
            {/if}
          </TextTypes>
        </p>
        {#if $latestMessage}
          <TextTypes type="sub-italic">
            {$latestMessage}
          </TextTypes>
        {/if}
      </div>
    {/if}
  </SlotAutoCollapseToggle>
  <!-- End wrapper -->
</Page>

<style lang="scss">
  /* Remove or adjust original margin if SlotAutoCollapseToggle provides enough spacing */
  /* .news-sources-list {
    margin-top: 2rem;
  } */

  .loading-state {
    padding: 1rem;
    text-align: center;
    color: #777; // Example style
    /* Add styles as needed */
  }

  /* Optional: If you need specific styling for the list *within* the toggle group */
  /* This targets the default slot content area */
  :global(.toggle-group > div:not(.horizontal-controls)) {
    /* Your list-specific styles here if needed */
  }
</style>
