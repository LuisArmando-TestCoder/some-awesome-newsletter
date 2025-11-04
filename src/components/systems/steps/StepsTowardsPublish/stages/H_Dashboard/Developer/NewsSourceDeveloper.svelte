<script lang="ts">
  import type { NewsSource } from "../../../../../../types";
  import store from "../../../../../../store";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import SlotAutoCollapseToggle from "../SlotAutoCollapseToggle.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import DeveloperNewsSourceItem from "./DeveloperNewsSourceItem.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  export let canReveal = true;

  let currentPage = 0;
  const pageSize = 3;
  let searchTerm = "";

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
</script>

<SearchBar
  placeholder={$t['newsSourceDeveloper.searchPlaceholder']}
  on:search={handleSearch}
/>
<SlotAutoCollapseToggle {canReveal} autoCollapse={true} let:getToggleProps>
  {#if newsSourcesReversed && newsSourcesReversed.length}
    {#each paginatedNewsSources as ns (ns.id)}
      <ToggleCard
        {canReveal}
        cardTitle={`${ns.url?.split("//")[1] ?? "N/A"} ⟫ ${ns.lead?.split("//")[1] ?? "N/A"}`}
        {...getToggleProps(ns.id)}
      >
        <DeveloperNewsSourceItem newsSource={ns} {canReveal} />
      </ToggleCard>
    {/each}

    <Pagination
      {currentPage}
      totalItems={filteredNewsSources.length}
      {pageSize}
      on:pageChange={handlePageChange}
    />
  {:else}
    <div class="loading-state">
      <p>
        <TextTypes type="sub-italic">
          {#if $store.config?.newsSources === undefined}
            {$t['newsSourceDeveloper.loading']}
          {:else}
            {$t['newsSourceDeveloper.noSources']}
          {/if}
        </TextTypes>
      </p>
    </div>
  {/if}
</SlotAutoCollapseToggle>

<style lang="scss">
  .loading-state {
    padding: 1rem;
    text-align: center;
    color: #777;
  }
</style>
