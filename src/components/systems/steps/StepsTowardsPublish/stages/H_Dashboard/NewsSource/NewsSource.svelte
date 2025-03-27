<script lang="ts">
  import CardComponent from "../../../../../selectors/Card/Card.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";

  import type { NewsSource } from "../../../../../../types.ts";
  import store, { latestMessage } from "../../../../../../store.ts";

  import AddNewsSourceForm from "./AddNewsSourceForm.svelte";
  import UpdateNewsSourceForm from "./UpdateNewsSourceForm.svelte";

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
  }

  // For display, reverse the array so newest appears first
  $: newsSourcesReversed = $store.config?.newsSources
    ? [...$store.config.newsSources].reverse()
    : [];

  let isAddCardOpen = false;

  function handleAddSuccess() {
    // e.g. close the card or refresh
    isAddCardOpen = false;
  }
</script>

<CardComponent collapsed={false} {canReveal} svg="idea" label="News Sources">
  <!-- Toggle card for adding a new news source -->
  <ToggleCard
    {canReveal}
    cardTitle="Add News Source"
    isOpen={isAddCardOpen}
    onChange={(isOpen) => (isAddCardOpen = isOpen)}
  >
    <AddNewsSourceForm on:added={handleAddSuccess} />
  </ToggleCard>

  <!-- List of existing news sources -->
  <div class="news-sources-list">
    {#if newsSourcesReversed && newsSourcesReversed.length}
      {#each newsSourcesReversed as ns (ns.id)}
        <ToggleCard
          {canReveal}
          cardTitle={`${ns.url.split("//")[1]} ⟫ ${ns.lead.split("//")[1]}`}
          isOpen={false}
        >
          <UpdateNewsSourceForm
            newsSource={ns}
            bind:updateFields={updateFields[ns.id]}
            errorMessage={updateErrorMessages[ns.id]}
            {canReveal}
            on:updated={() => {
              /* handle post-update logic, e.g. re-fetch or show a success msg */
            }}
          />
        </ToggleCard>
      {/each}
    {:else}
      <p class="loading">
        <TextTypes type="sub-highlight-italic">
          We are obtaining your news sources
        </TextTypes>
      </p>
      <TextTypes type="sub-highlight-italic">
        {$latestMessage}
      </TextTypes>
    {/if}
  </div>
</CardComponent>

<style lang="scss">
  .news-sources-list {
    margin-top: 2rem;
  }
</style>
