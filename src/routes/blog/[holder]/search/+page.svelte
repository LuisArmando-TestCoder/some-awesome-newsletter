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
  // Follows the URL (?q=) and can still be edited locally.
  let query = $derived(data.q);
  let attempt = $state(0);

  const name = $derived(ownerName(data.branding, data.holder));
  const blogName = $derived(data.ns && data.branding.newsletterTitle ? data.branding.newsletterTitle : name);
  const subscribeHref = $derived(subscribePath(data.holder, data.subscribeNs));
  const homeHref = $derived(blogPath(data.holder, { ns: data.ns, lang: data.lang }));

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
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: var(--space-7) var(--gutter) var(--section-pad);
  }

  .back {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    font-size: var(--fs-sm);

    span {
      transition: transform var(--dur-base) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover span {
        transform: translateX(-3px);
      }
    }
  }

  h1 {
    margin: var(--space-4) 0 var(--space-6);
    max-width: 22ch;
    font-family: var(--font-display);
    font-size: var(--step-chapter);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .search-row {
    margin-bottom: var(--space-5);
  }

  .count {
    min-height: 1.5em;
    margin: 0 0 var(--space-6);
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }

  .grid {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 19rem), 1fr));
    gap: var(--space-8) var(--space-6);
  }

  .limit {
    margin-top: var(--space-7);
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
</style>
