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

  export let canReveal = true;

  // Local error messages for each update form
  let updateErrorMessages: Record<string, string> = {};

  // We'll store only the fields we want to display (no id/url/type).
  let updateFields: Record<
    string,
    {
      community: string;
      country: string;
      lead: string;
      personality: string;
      scheduleTime: string;
      linkSelector: string;
      url: string;
      id: string;
    }
  > = {};

  // Listen to changes in store to populate updateFields
  $: if ($store.config?.newsSources) {
    $store.config.newsSources.forEach((ns: NewsSource) => {
      if (!ns || !ns.id) return;
      // Avoid resetting fields if already populated (e.g., during editing)
      if (!updateFields[ns.id]) {
        updateFields[ns.id] = {
          community: ns.community || "",
          country: ns.country || "",
          lead: ns.lead || "",
          personality: ns.personality || "",
          scheduleTime: ns.scheduleTime || "",
          linkSelector: ns.linkSelector || "",
          url: ns.url || "",
          id: ns.id,
        };
      }
    });
    // Optional: Clean up updateFields for sources that no longer exist
    const currentIds = new Set(
      $store.config.newsSources.map((ns: { id: any }) => ns.id)
    );
    Object.keys(updateFields).forEach((id) => {
      if (!currentIds.has(id)) {
        delete updateFields[id];
      }
    });
    updateFields = updateFields; // Trigger reactivity if keys were deleted
  }

  // For display, reverse the array so newest appears first
  $: newsSourcesReversed = $store.config?.newsSources
    ? [...$store.config.newsSources].reverse()
    : [];

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
</script>

<Page>
  <!-- Use the SlotAutoCollapseToggle wrapper -->
  <SlotAutoCollapseToggle {canReveal} autoCollapse={true} let:getToggleProps>
    <!-- ^-- autoCollapse=true makes it an accordion -->
    <!-- ^-- let:getToggleProps provides the helper function -->

    <!-- Toggle card for adding a new news source -->
    <ToggleCard
      {canReveal}
      cardTitle="Add News Source"
      {...getToggleProps(ADD_NEWS_SOURCE_CARD_ID)}
    >
      <!-- Pass canReveal down if AddNewsSourceForm needs it -->
      <AddNewsSourceForm on:added={handleAddSuccess} />
    </ToggleCard>

    <!-- List of existing news sources -->
    <!-- No need for the extra div.news-sources-list unless needed for specific styling -->
    <!-- The SlotAutoCollapseToggle already provides a .toggle-group div -->
    {#if newsSourcesReversed && newsSourcesReversed.length}
      {#each newsSourcesReversed as ns (ns.id)}
        <ToggleCard
          {canReveal}
          cardTitle={`${ns.url?.split("//")[1] ?? "N/A"} ⟫ ${ns.lead?.split("//")[1] ?? "N/A"}`}
          {...getToggleProps(ns.id)}
        >
          <UpdateNewsSourceForm
            newsSource={ns}
            bind:updateFields={updateFields[ns.id]}
            errorMessage={updateErrorMessages[ns.id]}
            {canReveal}
            on:updated={() => {
              console.log(`Update form for ${ns.id} reported update`);
              /* handle post-update logic, e.g. show success message */
            }}
          />
        </ToggleCard>
      {/each}
    {:else}
      <!-- Loading/Empty State -->
      <div class="loading-state">
        <p>
          <TextTypes type="sub-italic">
            {#if $store.config?.newsSources === undefined}
              Loading news sources...
            {:else}
              No news sources configured yet.
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
