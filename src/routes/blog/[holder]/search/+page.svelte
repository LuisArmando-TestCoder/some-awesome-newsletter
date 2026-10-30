<script lang="ts">
  import { t } from "../../../../lib/i18n/translations";
  import BlogShell from "../../../../components/articles/BlogShell.svelte";
  import BlogArticleCard from "../../../../components/articles/BlogArticleCard.svelte";
  import BlogSearch from "../../../../components/articles/BlogSearch.svelte";
  import BlogNotice from "../../../../components/articles/BlogNotice.svelte";
  import ArticleCardSkeleton from "../../../../components/ArticleCardSkeleton/ArticleCardSkeleton.svelte";
  import {
    apiBase,
    articlePath,
    blogPath,
    fmt,
    ownerName,
    streamSearch,
    subscribePath,
    type BlogCard,
  } from "../../../../components/articles/blog";

  let { data } = $props();

  const MAX_HITS = 50;

  let results = $state<BlogCard[]>([]);
  let status = $state<"idle" | "loading" | "done" | "error">("idle");
  let query = $state("");
  let attempt = $state(0);

  const name = $derived(ownerName(data.branding, data.holder));
  const blogName = $derived(data.ns && data.branding.newsletterTitle ? data.branding.newsletterTitle : name);
  const subscribeHref = $derived(subscribePath(data.holder, data.subscribeNs));
  const homeHref = $derived(blogPath(data.holder, { ns: data.ns, lang: data.lang }));

  $effect(() => {
    query = data.q;
  });

  $effect(() => {
    const q = data.q;
    void attempt;
    results = [];
    if (!q) {
      status = "idle";
      return;
    }
    status = "loading";
    const ctrl = new AbortController();
    streamSearch(apiBase(), data.holder, q, { newsSourceId: data.ns, lang: data.lang, maxHits: MAX_HITS, signal: ctrl.signal }, (card) => {
      results = [...results, card];
    })
      .then(() => {
        if (!ctrl.signal.aborted) status = "done";
      })
      .catch(() => {
        if (!ctrl.signal.aborted) status = "error";
      });
    return () => ctrl.abort();
  });

  const countText = $derived(
    status === "loading" && results.length === 0
      ? $t.blog.search.searching
      : results.length === 1
        ? $t.blog.search.countOne
        : fmt($t.blog.search.count, { count: results.length })
  );
</script>

<svelte:head>
  <title>{data.q ? `${fmt($t.blog.search.resultsFor, { q: data.q })} | ${blogName}` : `${$t.blog.search.title} | ${blogName}`}</title>
  <meta name="robots" content="noindex, follow" />
</svelte:head>

<BlogShell {blogName} {homeHref} {subscribeHref}>
  <div class="wrap">
    <a class="link back" href={homeHref}><span aria-hidden="true">&larr;</span> {$t.blog.search.browseAll}</a>
    <h1>{data.q ? fmt($t.blog.search.resultsFor, { q: data.q }) : $t.blog.search.title}</h1>
    <div class="search-row">
      <BlogSearch holder={data.holder} newsSourceId={data.ns} lang={data.lang} localCards={results} bind:value={query} autofocus={!data.q} />
    </div>

    {#if data.q}
      <p class="count" aria-live="polite" aria-atomic="true">
        {#if status !== "error"}{countText}{/if}
      </p>
    {/if}

    {#if status === "idle"}
      <BlogNotice title={$t.blog.search.title} body={$t.blog.search.noQuery} />
    {:else if status === "error"}
      <BlogNotice tone="error" title={$t.blog.search.title} body={$t.blog.search.error}>
        <button class="btn btn--primary" type="button" onclick={() => attempt++}>{$t.blog.search.tryAgain}</button>
        <a class="btn btn--secondary" href={homeHref}>{$t.blog.search.browseAll}</a>
      </BlogNotice>
    {:else if status === "done" && results.length === 0}
      <BlogNotice title={fmt($t.blog.search.emptyTitle, { q: data.q })} body={$t.blog.search.emptyBody}>
        <a class="btn btn--primary" href={homeHref}>{$t.blog.search.browseAll}</a>
      </BlogNotice>
    {:else}
      <ul class="grid" aria-busy={status === "loading"}>
        {#each results as card (card.id)}
          <li><BlogArticleCard {card} href={articlePath(data.holder, card.id)} headingLevel={2} /></li>
        {/each}
        {#if status === "loading"}
          {#each Array(results.length ? 1 : 3) as _, i (i)}
            <li aria-hidden="true"><ArticleCardSkeleton /></li>
          {/each}
        {/if}
      </ul>
      {#if status === "done" && results.length >= MAX_HITS}
        <p class="limit">{fmt($t.blog.search.limitNote, { count: MAX_HITS })}</p>
      {/if}
    {/if}
  </div>
</BlogShell>

<style lang="scss">
  .wrap {
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding: var(--space-6, 32px) var(--space-5, 24px) var(--space-9, 96px);
  }

  .back {
    display: inline-flex;
    gap: var(--space-2, 8px);
    font-size: var(--fs-sm, 0.875rem);
  }

  h1 {
    margin: var(--space-4, 16px) 0 var(--space-5, 24px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-3xl, 2.25rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.15);
    color: var(--text-1, #111);
    overflow-wrap: anywhere;
  }

  .search-row {
    margin-bottom: var(--space-4, 16px);
  }

  .count {
    min-height: 1.5em;
    margin: 0 0 var(--space-5, 24px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 18rem), 1fr));
    gap: var(--space-5, 24px);
  }

  .limit {
    margin-top: var(--space-6, 32px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  @media (max-width: 600px) {
    .wrap {
      padding-inline: var(--space-4, 16px);
    }
  }
</style>
