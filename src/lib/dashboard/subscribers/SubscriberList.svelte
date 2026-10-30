<!-- WS4. Subscriber list: one table of unique people across sources, with search,
     filters, pagination, CSV export and removal. Renders only the current page. -->
<script lang="ts">
  import { onDestroy } from "svelte";
  import Card from "../ui/Card.svelte";
  import Button from "../ui/Button.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import ErrorState from "../ui/ErrorState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import Icon from "../ui/Icon.svelte";
  import Pager from "./Pager.svelte";
  import { confirmAction } from "../ui/confirm";
  import { toast } from "$lib/ui/components/toast";
  import { subscriberData, createFilter, downloadCsv, type SubscriberRow } from "./data";
  import { languageName } from "../data/insights";
  import { goTo, dashboardReady } from "../nav";
  import { dt, plural, formatNumber } from "../i18n";
  import store from "../../../components/store";
  import { refreshSubscribers, unsubscribeUserFromSource } from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService";

  const PAGE_SIZE = 25;
  const filter = createFilter();

  let query = "";
  let debounced = "";
  let language = "";
  let source = "";
  let page = 1;
  let timer: ReturnType<typeof setTimeout> | undefined;
  let refreshing = false;
  let loadError: string | null = null;
  let removing: string | null = null;
  let live = "";

  function onQuery() {
    clearTimeout(timer);
    timer = setTimeout(() => (debounced = query), 250);
  }
  onDestroy(() => clearTimeout(timer));

  $: data = $subscriberData;
  $: rows = data.rows;
  $: hasSources = data.sources.length > 0;
  $: neverLoaded = hasSources && data.sources.every((s) => !data.loadedSourceIds.has(s.id));
  $: loading = (!$dashboardReady || $store.isRefreshingSubscribers || refreshing) && rows.length === 0;
  $: showError = !loading && (loadError !== null || ($dashboardReady && neverLoaded));
  $: filtered = filter(rows, { query: debounced, language, source });
  // Back to the first page whenever the filters change.
  const firstPage = (..._filters: unknown[]) => 1;
  $: page = firstPage(debounced, language, source);
  $: pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  $: if (page > pages) page = pages;
  $: visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  $: filtering = !!(debounced.trim() || language || source);

  async function retry() {
    refreshing = true;
    loadError = null;
    try {
      await refreshSubscribers();
    } catch (e) {
      loadError = e instanceof Error ? e.message : $dt("dash.state.errorBody");
    } finally {
      refreshing = false;
    }
  }

  function clearFilters() {
    query = "";
    debounced = "";
    language = "";
    source = "";
  }

  async function remove(row: SubscriberRow) {
    const many = row.sources.length > 1;
    const ok = await confirmAction({
      title: $dt("dash.subs.remove.title"),
      body: many
        ? $dt("dash.subs.remove.bodyMany", { email: row.email, count: row.sources.length })
        : $dt("dash.subs.remove.body", { email: row.email, source: row.sources[0]?.host ?? "" }),
      confirmLabel: $dt("dash.subs.remove.confirm"),
      cancelLabel: $dt("dash.common.cancel"),
      tone: "danger",
    });
    if (!ok) return;
    removing = row.email;
    let failed = 0;
    let lastError = "";
    for (const s of row.sources) {
      try {
        await unsubscribeUserFromSource(row.email, s.id);
      } catch (e) {
        failed++;
        lastError = e instanceof Error ? e.message : String(e);
      }
    }
    removing = null;
    if (failed === 0) {
      live = $dt("dash.subs.remove.done", { email: row.email });
      toast.success(live);
    } else {
      live = $dt("dash.subs.remove.failed", { email: row.email, reason: lastError });
      toast.error(live);
    }
  }

  function exportCsv() {
    if (filtered.length === 0) return;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(filtered, `aiban-subscribers-${stamp}.csv`);
    live = plural($dt, "dash.subs.export.done", filtered.length);
  }

  // Bulk selection. Kept by email so it survives paging and filtering; rows that disappear drop out.
  let selected = new Set<string>();
  let bulkBusy = false;
  $: {
    const present = new Set(rows.map((r) => r.email));
    if ([...selected].some((e) => !present.has(e))) selected = new Set([...selected].filter((e) => present.has(e)));
  }
  $: selectedOnPage = visible.filter((r) => selected.has(r.email)).length;
  $: pageAll = visible.length > 0 && selectedOnPage === visible.length;
  $: pageSome = selectedOnPage > 0 && !pageAll;
  $: selectedRows = rows.filter((r) => selected.has(r.email));

  function mixed(node: HTMLInputElement, value: boolean) {
    node.indeterminate = value;
    return { update(v: boolean) { node.indeterminate = v; } };
  }
  function toggleRow(email: string, on: boolean) {
    const next = new Set(selected);
    if (on) next.add(email); else next.delete(email);
    selected = next;
  }
  function togglePage() {
    const next = new Set(selected);
    if (pageAll) for (const r of visible) next.delete(r.email);
    else for (const r of visible) next.add(r.email);
    selected = next;
  }
  function clearSelection() {
    selected = new Set();
  }
  function exportSelected() {
    if (selectedRows.length === 0) return;
    const stamp = new Date().toISOString().slice(0, 10);
    downloadCsv(selectedRows, `aiban-subscribers-${stamp}.csv`);
    live = plural($dt, "dash.subs.export.done", selectedRows.length);
  }
  async function removeSelected() {
    const list = selectedRows;
    if (list.length === 0 || bulkBusy) return;
    const ok = await confirmAction({
      title: $dt("dash.subs.bulk.removeTitle"),
      body: plural($dt, "dash.subs.bulk.removeBody", list.length),
      confirmLabel: plural($dt, "dash.subs.bulk.removeConfirm", list.length),
      cancelLabel: $dt("dash.common.cancel"),
      tone: "danger",
    });
    if (!ok) return;
    bulkBusy = true;
    let failed = 0;
    let lastError = "";
    for (const row of list) {
      for (const s of row.sources) {
        try {
          await unsubscribeUserFromSource(row.email, s.id);
        } catch (e) {
          failed++;
          lastError = e instanceof Error ? e.message : String(e);
        }
      }
    }
    bulkBusy = false;
    if (failed === 0) {
      live = plural($dt, "dash.subs.bulk.removed", list.length);
      toast.success(live);
      clearSelection();
    } else {
      live = $dt("dash.subs.bulk.removeFailed", { reason: lastError });
      toast.error(live);
    }
  }

  function sourceLabel(r: SubscriberRow) {
    return r.sources.map((s) => s.host).join(", ");
  }
</script>

<p class="sr-only" aria-live="polite">{live}</p>

{#if loading}
  <Card><Skeleton lines={6} label={$dt("dash.subs.list.loading")} /></Card>
{:else if showError}
  <ErrorState title={$dt("dash.subs.list.errorTitle")} message={loadError ?? $dt("dash.subs.list.errorBody")} onRetry={retry} />
{:else if !hasSources}
  <EmptyState icon="source" title={$dt("dash.subs.noSources.title")} body={$dt("dash.subs.noSources.body")}>
    <Button variant="primary" onclick={() => goTo("sources")}>{$dt("dash.subs.noSources.action")}</Button>
  </EmptyState>
{:else if rows.length === 0}
  <EmptyState icon="people" title={$dt("dash.subs.empty.title")} body={$dt("dash.subs.empty.body")}>
    <Button variant="primary" icon="plus" onclick={() => goTo("subscribers", "add")}>{$dt("dash.subs.empty.add")}</Button>
    <Button variant="secondary" icon="upload" onclick={() => goTo("subscribers", "add")}>{$dt("dash.subs.empty.import")}</Button>
    <Button variant="tertiary" icon="code" onclick={() => goTo("subscribers", "form")}>{$dt("dash.subs.empty.form")}</Button>
  </EmptyState>
{:else}
  {#if data.possiblyCut.length}
    <div class="mb">
      <Notice tone="info">
        {$dt("dash.subs.list.cutHint", { sources: data.possiblyCut.map((s) => s.host).join(", "), limit: formatNumber(1000) })}
      </Notice>
    </div>
  {/if}

  <Card pad={false}>
    <div class="toolbar">
      <div class="search">
        <label class="sr-only" for="subs-search">{$dt("dash.subs.list.searchLabel")}</label>
        <span class="search__icon" aria-hidden="true"><Icon name="search" size={16} /></span>
        <input
          id="subs-search"
          type="search"
          autocomplete="off"
          placeholder={$dt("dash.subs.list.searchPlaceholder")}
          bind:value={query}
          on:input={onQuery}
        />
      </div>
      <div class="filters">
        <label class="sr-only" for="subs-lang">{$dt("dash.subs.list.languageFilter")}</label>
        <select id="subs-lang" bind:value={language}>
          <option value="">{$dt("dash.subs.list.allLanguages")}</option>
          {#each data.languages as code (code)}
            <option value={code}>{languageName(code)}</option>
          {/each}
          <option value="?">{$dt("dash.common.unknown")}</option>
        </select>
        {#if data.sources.length > 1}
          <label class="sr-only" for="subs-source">{$dt("dash.subs.list.sourceFilter")}</label>
          <select id="subs-source" bind:value={source}>
            <option value="">{$dt("dash.subs.list.allSources")}</option>
            {#each data.sources as s (s.id)}
              <option value={s.id}>{s.host}</option>
            {/each}
          </select>
        {/if}
      </div>
      <div class="actions">
        <Button size="sm" variant="secondary" icon="download" disabled={filtered.length === 0} onclick={exportCsv}>
          {filtering ? $dt("dash.subs.export.filtered") : $dt("dash.subs.export.all")}
        </Button>
        <Button size="sm" variant="ghost" icon="refresh" loading={refreshing} onclick={retry} ariaLabel={$dt("dash.subs.list.refresh")}>{$dt("dash.subs.list.refresh")}</Button>
      </div>
    </div>

    {#if selected.size > 0}
      <div class="bulk" role="region" aria-label={$dt("dash.subs.bulk.label")}>
        <p class="bulk__count" aria-live="polite">{plural($dt, "dash.subs.bulk.selected", selected.size)}</p>
        <div class="bulk__actions">
          <Button size="sm" variant="secondary" icon="download" onclick={exportSelected}>{$dt("dash.subs.bulk.export")}</Button>
          <Button size="sm" variant="danger" loading={bulkBusy} onclick={removeSelected}>{$dt("dash.subs.bulk.remove")}</Button>
          <Button size="sm" variant="tertiary" disabled={bulkBusy} onclick={clearSelection}>{$dt("dash.subs.bulk.clear")}</Button>
        </div>
      </div>
    {/if}

    {#if loadError}
      <div class="inline-error"><Notice tone="danger">{loadError}</Notice></div>
    {/if}

    {#if filtered.length === 0}
      <div class="nomatch">
        <EmptyState compact icon="search" title={$dt("dash.subs.list.noMatch")} body={$dt("dash.subs.list.noMatchBody")}>
          <Button size="sm" variant="secondary" onclick={clearFilters}>{$dt("dash.subs.list.clearFilters")}</Button>
        </EmptyState>
      </div>
    {:else}
      <div class="table-wrap">
        <table class="subs">
          <caption class="sr-only">{$dt("dash.subs.list.caption")}</caption>
          <thead>
            <tr>
              <th scope="col" class="c-check">
                <input
                  type="checkbox"
                  class="check"
                  checked={pageAll}
                  use:mixed={pageSome}
                  aria-checked={pageSome ? "mixed" : pageAll ? "true" : "false"}
                  aria-label={$dt("dash.subs.bulk.selectPage")}
                  on:change={togglePage}
                />
              </th>
              <th scope="col">{$dt("dash.subs.col.email")}</th>
              <th scope="col">{$dt("dash.subs.col.name")}</th>
              <th scope="col">{$dt("dash.subs.col.language")}</th>
              <th scope="col">{$dt("dash.subs.col.source")}</th>
              <th scope="col"><span class="sr-only">{$dt("dash.subs.col.actions")}</span></th>
            </tr>
          </thead>
          <tbody>
            {#each visible as r (r.email)}
              <tr class:is-selected={selected.has(r.email)}>
                <td class="c-check">
                  <input
                    type="checkbox"
                    class="check"
                    checked={selected.has(r.email)}
                    aria-label={$dt("dash.subs.bulk.selectRow", { email: r.email })}
                    on:change={(e) => toggleRow(r.email, e.currentTarget.checked)}
                  />
                </td>
                <td class="c-email" data-label={$dt("dash.subs.col.email")}><span class="email">{r.email}</span></td>
                <td data-label={$dt("dash.subs.col.name")}>{#if r.name}{r.name}{:else}<span class="muted">{$dt("dash.subs.list.noName")}</span>{/if}</td>
                <td data-label={$dt("dash.subs.col.language")}>{r.language ? languageName(r.language) : $dt("dash.common.unknown")}</td>
                <td data-label={$dt("dash.subs.col.source")}>{sourceLabel(r)}</td>
                <td class="c-actions">
                  <Button
                    size="sm"
                    variant="tertiary"
                    loading={removing === r.email}
                    disabled={bulkBusy || (removing !== null && removing !== r.email)}
                    ariaLabel={$dt("dash.subs.remove.aria", { email: r.email })}
                    onclick={() => remove(r)}
                  >{$dt("dash.subs.remove.button")}</Button>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="pager-wrap">
        <Pager {page} pageSize={PAGE_SIZE} total={filtered.length} label={$dt("dash.subs.pager.label")} on:change={(e) => (page = e.detail)} />
      </div>
    {/if}
  </Card>
{/if}

<style lang="scss">
  .mb { margin-bottom: var(--space-4); }
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-3);
    align-items: center;
    padding: var(--space-4);
    border-bottom: 1px solid var(--border-1);
  }
  .search { position: relative; flex: 1 1 16rem; min-width: 0; }
  .search__icon { position: absolute; left: var(--space-3); top: 50%; transform: translateY(-50%); color: var(--text-3); display: flex; pointer-events: none; }
  input[type="search"],
  select {
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    font: inherit;
    font-size: var(--fs-sm);
    box-sizing: border-box;
    transition: border-color var(--t-out) var(--ease-out), box-shadow var(--t-out) var(--ease-out);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); border-color: var(--text-1); }
  }
  @media (hover: hover) and (pointer: fine) {
    input[type="search"]:hover, select:hover { border-color: var(--text-2); transition-duration: var(--t-in); }
  }
  input[type="search"] { padding-left: calc(var(--space-3) * 2 + 16px); }
  input::placeholder { color: var(--text-3); }
  /* An active filter reads as set: ink edge and semibold value, not color alone. */
  select:not(:has(option[value=""]:checked)) { border-color: var(--text-1); font-weight: var(--fw-semibold); }
  .filters { display: flex; gap: var(--space-2); flex: 0 1 auto; }
  .filters select { width: auto; min-width: 10rem; }
  .actions { display: flex; gap: var(--space-2); margin-left: auto; }

  .bulk {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-2) var(--space-4);
    padding: var(--space-2) var(--space-4);
    background: var(--surface-2);
    border-bottom: 1px solid var(--border-1);
  }
  .bulk__count { margin: 0; font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); font-variant-numeric: tabular-nums; }
  .bulk__actions { display: flex; flex-wrap: wrap; align-items: center; gap: var(--space-2); }

  .inline-error { padding: var(--space-3) var(--space-4) 0; }
  .nomatch { padding: var(--space-4); }
  /* Own scroll box so the header can stick while you scroll the rows. */
  .table-wrap { overflow: auto; max-height: min(70vh, 48rem); overscroll-behavior: contain; }
  .subs { width: 100%; border-collapse: separate; border-spacing: 0; font-size: var(--fs-sm); }
  th {
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--surface-1);
    text-align: left;
    font-weight: var(--fw-medium);
    color: var(--text-2);
    font-size: var(--fs-xs);
    letter-spacing: 0;
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border-1);
    white-space: nowrap;
  }
  td { padding: var(--row-pad-y) var(--space-4); border-bottom: 1px solid var(--border-1); color: var(--text-1); vertical-align: middle; }
  tbody tr { transition: background-color var(--t-out) var(--ease-out); }
  @media (hover: hover) and (pointer: fine) {
    tbody tr:hover { background: var(--surface-2); transition-duration: var(--t-in); }
  }
  tbody tr:focus-within { background: var(--surface-2); }
  tbody tr.is-selected { background: var(--surface-2); }
  tbody tr.is-selected td:first-child { box-shadow: inset 3px 0 0 var(--text-1); }
  tbody tr:last-child td { border-bottom: 0; }
  .c-check { width: 1%; padding-right: 0; }
  .check {
    width: 1.125rem;
    height: 1.125rem;
    margin: 0;
    vertical-align: middle;
    accent-color: var(--text-1);
    cursor: pointer;
    &:focus-visible { outline: 2px solid var(--focus-color); outline-offset: 2px; }
  }
  .email { word-break: break-all; font-weight: var(--fw-medium); }
  .muted { color: var(--text-3); }
  .c-actions { text-align: right; white-space: nowrap; }
  .pager-wrap { padding: 0 var(--space-4) var(--space-4); border-top: 1px solid var(--border-1); }

  @media (forced-colors: active) {
    tbody tr.is-selected td:first-child { box-shadow: inset 3px 0 0 Highlight; }
  }

  @media (max-width: 40rem) {
    .toolbar { flex-direction: column; align-items: stretch; padding-inline: var(--space-4); }
    .filters { flex-direction: column; }
    .filters select { width: 100%; }
    .actions { margin-left: 0; justify-content: space-between; }
    .actions :global(button) { min-height: 44px; }
    .table-wrap { max-height: none; overflow: visible; }
    thead { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
    .subs, tbody, tr, td { display: block; width: 100%; box-sizing: border-box; }
    tr { position: relative; padding: var(--space-3) var(--space-4) var(--space-3) calc(var(--space-4) + 2.5rem); border-bottom: 1px solid var(--border-1); }
    td { border: 0; padding: var(--space-1) 0; display: grid; grid-template-columns: 6.5rem minmax(0, 1fr); gap: var(--space-2); }
    td::before { content: attr(data-label); color: var(--text-3); font-size: var(--fs-xs); }
    td.c-check { position: absolute; left: var(--space-4); top: var(--space-3); width: auto; display: grid; place-items: center; min-width: 1.75rem; min-height: 1.75rem; padding: 0; }
    td.c-check::before { content: none; }
    tbody tr.is-selected td:first-child { box-shadow: none; }
    tbody tr.is-selected { box-shadow: inset 3px 0 0 var(--text-1); }
    .c-actions { display: flex; justify-content: flex-end; padding-top: var(--space-2); }
    .c-actions::before { content: none; }
    .c-actions :global(button) { min-height: 44px; }
  }
</style>
