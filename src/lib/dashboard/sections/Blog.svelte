<!-- WS4. Blog (replaces "Newspaper"): the blog's address and domain (WS15) and the list of published articles. -->
<script lang="ts">
  import SectionHeader from "../ui/SectionHeader.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import BlogSiteCard from "../blog/BlogSiteCard.svelte";
  import BlogArticles from "../blog/BlogArticles.svelte";
  import { dt } from "../i18n";
  import store from "../../../components/store";
  import type { NewsSource } from "../../../components/types";

  let newsSourceId = "";
  $: holder = $store.configuratorEmail || "";
  $: sources = (($store.config?.newsSources ?? []) as NewsSource[]).filter((s) => s.isPublic !== false);
</script>

<SectionHeader title={$dt("dash.nav.blog")} description={$dt("dash.blog.desc")} />

<div class="stack">
  {#if !holder}
    <Skeleton lines={4} label={$dt("dash.state.loading")} />
  {:else}
    <BlogSiteCard />
    <BlogArticles {holder} {sources} bind:newsSourceId />
  {/if}
</div>

<style lang="scss">
  .stack { display: flex; flex-direction: column; gap: var(--space-5); min-width: 0; }
</style>
