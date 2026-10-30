<!-- WS4. Paginated ranked list (10 per page) used on the Clicks tab. -->
<script lang="ts">
  import BarList from "./BarList.svelte";
  import Pager from "../subscribers/Pager.svelte";
  export let items: { id: string; label: string; sub?: string; count: number; title?: string }[] = [];
  export let pagerLabel = "Pages";
  const PAGE = 10;
  let page = 1;
  $: pages = Math.max(1, Math.ceil(items.length / PAGE));
  $: if (page > pages) page = pages;
  $: max = items[0]?.count ?? 1;
  $: visible = items.slice((page - 1) * PAGE, page * PAGE);
</script>

<BarList items={visible} {max} />
{#if items.length > PAGE}
  <Pager {page} pageSize={PAGE} total={items.length} label={pagerLabel} on:change={(e) => (page = e.detail)} />
{/if}
