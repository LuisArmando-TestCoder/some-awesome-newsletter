<!-- WS4. Sources: where your content comes from. Your website first, then other sites. Each source has its own settings page. -->
<script lang="ts">
  import { tick } from "svelte";
  import SectionHeader from "../ui/SectionHeader.svelte";
  import Button from "../ui/Button.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import SourcesIntro from "../sources/SourcesIntro.svelte";
  import SourceCard from "../sources/SourceCard.svelte";
  import SourceDetail from "../sources/SourceDetail.svelte";
  import AddSourceForm from "../sources/AddSourceForm.svelte";
  import { orderSources, sourceUsage } from "../sources/sourceUtils";
  import { dt } from "../i18n";
  import { dashboardReady } from "../nav";
  import store from "../../../components/store";
  import type { NewsSource } from "../../../components/types";

  let selectedId: string | null = null;
  let adding = false;
  let listTop: HTMLElement;

  $: loaded = $dashboardReady || Array.isArray($store.config?.newsSources);
  $: sources = orderSources($store.config?.newsSources as NewsSource[] | undefined);
  $: main = sources[0] ?? null;
  $: usage = sourceUsage($store.config, $store.subscribers);
  $: selected = selectedId ? sources.find((s) => s.id === selectedId) ?? null : null;
  $: canAdd = usage.unlimited || !usage.atLimit;

  function count(id: string): number {
    const list = ($store.subscribers as Record<string, unknown[]> | undefined)?.[id];
    return Array.isArray(list) ? list.length : 0;
  }

  async function back() {
    const id = selectedId;
    selectedId = null;
    await tick();
    const btn = id ? document.querySelector<HTMLElement>(`[data-source-id="${CSS.escape(id)}"] button`) : null;
    (btn ?? listTop)?.focus();
  }

  async function openAdd() {
    adding = true;
    await tick();
    document.querySelector<HTMLInputElement>(".sources-add input")?.focus();
  }

  function added() {
    adding = false;
  }
</script>

{#if selected}
  <SourceDetail source={selected} isMain={selected.id === main?.id} subscriberCount={count(selected.id)} onback={back} />
{:else}
  <SectionHeader title={$dt("dash.nav.sources")} description={$dt("dash.sources.desc")}>
    {#if sources.length > 0 && !adding && canAdd}
      <Button variant="primary" icon="plus" onclick={openAdd}>{$dt("dash.sources.addOther")}</Button>
    {/if}
  </SectionHeader>

  <div class="stack">
    {#if !loaded}
      <Skeleton lines={4} label={$dt("dash.state.loading")} />
    {:else if sources.length === 0}
      <SourcesIntro />
      {#if adding}
        <div class="sources-add"><AddSourceForm {usage} main={null} onadded={added} oncancel={() => (adding = false)} /></div>
      {:else}
        <EmptyState icon="source" title={$dt("dash.sources.empty.title")} body={$dt("dash.sources.empty.body")}>
          <Button variant="primary" icon="plus" onclick={openAdd}>{$dt("dash.sources.empty.action")}</Button>
        </EmptyState>
      {/if}
    {:else}
      <SourcesIntro compact={sources.length > 1} />

      {#if adding}
        <div class="sources-add"><AddSourceForm {usage} {main} onadded={added} oncancel={() => (adding = false)} /></div>
      {/if}

      <section aria-labelledby="sources-list-title">
        <h2 class="list-title" id="sources-list-title" tabindex="-1" bind:this={listTop}>{$dt("dash.sources.list.title")}</h2>
        <ul class="grid">
          {#each sources as ns (ns.id)}
            <li data-source-id={ns.id}>
              <SourceCard source={ns} isMain={ns.id === main?.id} subscriberCount={count(ns.id)} onedit={(id) => (selectedId = id)} />
            </li>
          {/each}
        </ul>
      </section>

      {#if !adding && !canAdd}
        <AddSourceForm {usage} {main} />
      {/if}
    {/if}
  </div>
{/if}

<style lang="scss">
  .stack { display: flex; flex-direction: column; gap: var(--space-5); min-width: 0; }
  .list-title { margin: 0 0 var(--space-3); font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); outline: none; }
  .grid { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 300px), 1fr)); gap: var(--space-4); }
  .grid li { display: flex; min-width: 0; }
  .grid li > :global(*) { flex: 1; }
</style>
