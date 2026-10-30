<script lang="ts">
  // Legacy URL: /articles?holder=<email>&newsSourceId=&lang=&search=&article=
  // Forwards to the blog routes. The old page body lives in _deprecated/src/routes/articles/+page.svelte.
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { page } from "$app/state";
  import { t } from "../../lib/i18n/translations";
  import BlogNotice from "../../components/articles/BlogNotice.svelte";
  import { articlePath, blogPath, searchPath } from "../../components/articles/blog";

  let missing = $state(false);

  onMount(() => {
    const sp = page.url.searchParams;
    const holder = sp.get("holder");
    if (!holder) {
      missing = true;
      return;
    }
    const ns = sp.get("newsSourceId") ?? "";
    const lang = sp.get("lang") ?? "";
    const article = sp.get("article");
    const search = sp.get("search");
    const target = article
      ? articlePath(holder, article) + (ns ? `?ns=${encodeURIComponent(ns)}` : "")
      : search
        ? searchPath(holder, search, { ns, lang })
        : blogPath(holder, { ns, lang });
    goto(target, { replaceState: true });
  });
</script>

<svelte:head>
  <meta name="robots" content="noindex" />
</svelte:head>

<div class="page">
  {#if missing}
    <BlogNotice headingLevel={1} title={$t.blog.errorTitle} body={$t.blog.missingHolder} />
  {:else}
    <p class="redirect" role="status">{$t.blog.redirecting}</p>
  {/if}
</div>

<style lang="scss">
  .page {
    min-height: 70vh;
    padding: var(--section-pad) var(--gutter);
    background: var(--surface-0);
  }
  .redirect {
    margin: 0;
    text-align: center;
    color: var(--text-3);
    font-size: var(--fs-sm);
  }
</style>
