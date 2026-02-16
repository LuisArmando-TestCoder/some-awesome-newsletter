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
  import { checkPlanLimit } from "$lib/utils/checkPlanLimits";

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
  
  // Helper to make URLs readable for the UI
  function formatUrl(url: string | undefined): string {
    if (!url) return "N/A";
    return url.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
  }

  function getPath(url: string | undefined): string {
    if (!url) return "";
    const path = url.replace(/^(?:https?:\/\/)?(?:www\.)?[^\/]+/i, "");
    return path === "/" || path === "" ? "Root" : path;
  }

  $: limitCheck = checkPlanLimit("newsSources");
  $: isLimitReached = !limitCheck.allowed;
</script>

<div class="developer-sources-container">
  <header class="section-header">
    <div class="header-text">
      <h3>{$t['newsSourceDeveloper.loading'] ? $t['newsSourceDeveloper.loading'].replace('Loading', 'API News Sources') : "API News Sources"}</h3>
      <p>{filteredNewsSources.length} sources found</p>
    </div>
    <div class="search-wrapper">
      <SearchBar
        placeholder={$t['newsSourceDeveloper.searchPlaceholder']}
        on:search={handleSearch}
      />
    </div>
  </header>

  {#if isLimitReached}
    <div class="limit-banner">
      Plan limits exceeded. API access may be restricted. <a href="/plans">Upgrade</a>
    </div>
  {/if}

  <SlotAutoCollapseToggle {canReveal} autoCollapse={true} let:getToggleProps>
    {#if newsSourcesReversed && newsSourcesReversed.length}
      <div class="sources-list" class:restricted-mode={isLimitReached}>
        {#each paginatedNewsSources as ns (ns.id)}
          <div class="source-card-wrapper">
            <ToggleCard
              {canReveal}
              cardTitle="{formatUrl(ns.url)} → {formatUrl(ns.lead)}"
              {...getToggleProps(ns.id)}
            >
              <div class="card-inner-context">
                <span class="path-badge">{getPath(ns.url)}</span>
                <DeveloperNewsSourceItem newsSource={ns} {canReveal} />
              </div>
            </ToggleCard>
          </div>
        {/each}
      </div>

      <footer class="pagination-footer">
        <Pagination
          {currentPage}
          totalItems={filteredNewsSources.length}
          {pageSize}
          on:pageChange={handlePageChange}
        />
      </footer>
    {:else}
      <div class="empty-state">
        <div class="icon-placeholder">ℹ️</div>
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
</div>

<style lang="scss">
  .developer-sources-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;

    h3 { margin: 0; font-size: 1.25rem; }
    p { margin: 0; font-size: 0.85rem; color: #666; }

    .search-wrapper {
      width: 300px;
    }
  }

  .limit-banner {
    background: #fff3cd;
    color: #856404;
    padding: 10px;
    border-radius: 6px;
    text-align: center;
    font-size: 0.9rem;
    a { font-weight: bold; color: inherit; }
  }

  .sources-list {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .source-card-wrapper {
    :global(.toggle-card-header) {
      background: #fdfdfd;
      &:hover { background: #f7f7f7; }
    }
  }

  .card-inner-context {
    position: relative;
    padding-top: 10px;
  }

  .path-badge {
    position: absolute;
    top: -35px;
    right: 10px;
    font-size: 0.7rem;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 4px;
    color: #888;
  }

  .pagination-footer {
    display: flex;
    justify-content: center;
    padding: 20px 0;
  }

  .empty-state {
    padding: 4rem 2rem;
    text-align: center;
    background: #fafafa;
    border: 2px dashed #eee;
    border-radius: 12px;
    
    .icon-placeholder { font-size: 2rem; margin-bottom: 10px; }
  }
</style>