<!-- WS4. Articles on the public blog, as links to their real pages (no pop-up). Loading, empty, error and no-match states. -->
<script lang="ts">
  import { onDestroy } from "svelte";
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import ErrorState from "../ui/ErrorState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import Icon from "../ui/Icon.svelte";
  import { dt } from "../i18n";
  import { hostOf } from "../sources/sourceUtils";
  import {
    apiBase,
    articlePath,
    BLOG_PAGE_SIZE,
    byNewest,
    fetchArticlesPage,
    formatDate,
    languageName,
    streamSearch,
    type BlogCard,
    type BlogLanguageInfo,
  } from "../../../components/articles/blog";
  import type { NewsSource } from "../../../components/types";

  export let holder: string;
  export let sources: NewsSource[] = [];
  /** Bound so the link card can share the same source filter. */
  export let newsSourceId: string = "";

  const uid = Math.random().toString(36).slice(2, 8);
  const SIZE = BLOG_PAGE_SIZE;

  let status: "loading" | "ready" | "error" = "loading";
  let languages: BlogLanguageInfo[] = [];
  let lang = "";
  let page = 1;
  let total = 0;
  let cards: BlogCard[] = [];

  let query = "";
  let activeQuery = "";
  let searching = false;
  let searchError: string | null = null;
  let results: BlogCard[] = [];
  let controller: AbortController | null = null;

  let token = 0;
  let lastKey = "";
  let listTop: HTMLElement;

  $: totalPages = Math.max(1, Math.ceil(total / SIZE));
  $: hasNext = page < totalPages;
  $: key = `${holder}|${newsSourceId}`;
  $: if (holder && key !== lastKey) {
    lastKey = key;
    page = 1;
    lang = "";
    clearSearch(false);
    // eslint-disable-next-line svelte/infinite-reactive-loop -- guarded by lastKey: reloads only when holder or source change
    load();
  }

  async function load() {
    const my = ++token;
    status = "loading";
    try {
      const base = apiBase();
      const meta = await fetchArticlesPage(fetch, base, holder, { page: 1, size: 1, newsSourceId: newsSourceId || undefined });
      if (my !== token) return;
      if (!meta.ok) throw new Error("meta");
      languages = meta.languages.filter((l) => l.total > 0);
      // eslint-disable-next-line svelte/infinite-reactive-loop -- lang is not a dependency of the reactive block that calls load()
      if (!languages.some((l) => l.code === lang)) lang = languages[0]?.code ?? "";
      if (!lang) {
        cards = [];
        total = 0;
        status = "ready";
        return;
      }
      const res = await fetchArticlesPage(fetch, base, holder, { page, size: SIZE, newsSourceId: newsSourceId || undefined, lang });
      if (my !== token) return;
      if (!res.ok) throw new Error("page");
      const bucket = res.byLang[lang] ?? { withImages: [], withoutImages: [], total: 0 };
      cards = [...bucket.withImages, ...bucket.withoutImages].sort(byNewest);
      total = bucket.total || languages.find((l) => l.code === lang)?.total || cards.length;
      status = "ready";
    } catch {
      if (my === token) status = "error";
    }
  }

  function goPage(n: number) {
    if (n < 1 || n > totalPages || n === page) return;
    page = n;
    load().then(() => listTop?.focus());
  }

  function changeLang(code: string) {
    lang = code;
    page = 1;
    load();
  }

  async function runSearch() {
    const q = query.trim();
    if (!q) {
      clearSearch();
      return;
    }
    controller?.abort();
    controller = new AbortController();
    activeQuery = q;
    searching = true;
    searchError = null;
    results = [];
    try {
      // streamSearch URL encodes the query and the source id.
      await streamSearch(apiBase(), holder, q, { newsSourceId: newsSourceId || undefined, lang: lang || undefined, maxHits: 50, signal: controller.signal }, (card) => {
        results = [...results, card];
      });
    } catch (e) {
      if ((e as Error)?.name !== "AbortError") searchError = $dt("dash.blog.search.failed");
    } finally {
      searching = false;
    }
  }

  function clearSearch(resetInput = true) {
    controller?.abort();
    controller = null;
    if (resetInput) query = "";
    activeQuery = "";
    results = [];
    searching = false;
    searchError = null;
  }

  onDestroy(() => controller?.abort());

  $: shown = activeQuery ? results : cards;
</script>

<Card title={$dt("dash.blog.list.title")}>
  <div class="controls">
    {#if sources.length > 1}
      <Field id="blog-src-{uid}" label={$dt("dash.blog.list.source")}>
        <select id="blog-src-{uid}" bind:value={newsSourceId}>
          <option value="">{$dt("dash.blog.list.allSources")}</option>
          {#each sources as ns (ns.id)}<option value={ns.id}>{hostOf(ns.url) || ns.id}</option>{/each}
        </select>
      </Field>
    {/if}
    {#if languages.length > 1}
      <Field id="blog-lang-{uid}" label={$dt("dash.blog.list.language")}>
        <select id="blog-lang-{uid}" value={lang} on:change={(e) => changeLang(e.currentTarget.value)} disabled={status === "loading"}>
          {#each languages as l (l.code)}<option value={l.code}>{languageName(l.code)} ({l.total})</option>{/each}
        </select>
      </Field>
    {/if}
    <form class="search" role="search" on:submit|preventDefault={runSearch}>
      <Field id="blog-q-{uid}" label={$dt("dash.blog.search.label")}>
        <div class="search__row">
          <input id="blog-q-{uid}" type="search" bind:value={query} placeholder={$dt("dash.blog.search.placeholder")} autocomplete="off" />
          <Button type="submit" variant="secondary" icon="search" loading={searching}>{$dt("dash.blog.search.submit")}</Button>
        </div>
      </Field>
    </form>
  </div>

  <h3 class="sr" tabindex="-1" bind:this={listTop}>{$dt("dash.blog.list.title")}</h3>
  <p class="sr" role="status" aria-live="polite">
    {#if status === "loading" || searching}{$dt("dash.state.loading")}{:else if activeQuery}{$dt("dash.blog.search.count", { count: results.length, query: activeQuery })}{/if}
  </p>

  {#if activeQuery}
    <div class="searchbar">
      <p>{$dt("dash.blog.search.showing", { query: activeQuery })}</p>
      <Button size="sm" variant="tertiary" icon="close" onclick={() => clearSearch()}>{$dt("dash.blog.search.clear")}</Button>
    </div>
  {/if}

  {#if status === "loading" && !activeQuery}
    <div class="skel"><Skeleton lines={6} label={$dt("dash.state.loading")} /></div>
  {:else if status === "error" && !activeQuery}
    <ErrorState message={$dt("dash.blog.list.error")} onRetry={load} />
  {:else if searchError}
    <ErrorState message={searchError} onRetry={runSearch} />
  {:else if activeQuery && !searching && results.length === 0}
    <EmptyState compact icon="search" title={$dt("dash.blog.search.noneTitle")} body={$dt("dash.blog.search.noneBody", { query: activeQuery })} />
  {:else if !activeQuery && cards.length === 0}
    <EmptyState icon="blog" title={$dt("dash.blog.empty.title")} body={$dt("dash.blog.empty.body")} />
  {:else}
    <ul class="list">
      {#each shown as a (a.id)}
        <li class="item">
          {#if a.imageUrl}
            <img class="item__img" src={a.imageUrl} alt="" loading="lazy" width="96" height="72" />
          {:else}
            <span class="item__img item__img--none" aria-hidden="true"><Icon name="blog" size={20} /></span>
          {/if}
          <div class="item__body">
            <a class="item__title" href={articlePath(holder, a.id)} target="_blank" rel="noopener">
              {a.title}<span class="sr"> {$dt("dash.blog.list.opensNewTab")}</span>
              <Icon name="external" size={14} />
            </a>
            {#if a.excerpt}<p class="item__excerpt">{a.excerpt}</p>{/if}
            <p class="item__meta">
              {#if a.isoDate}<time datetime={a.isoDate}>{formatDate(a.isoDate, a.language || "en")}</time>{/if}
              {#if a.language}<span>{languageName(a.language)}</span>{/if}
              {#if a.minutes}<span>{$dt("dash.blog.list.minutes", { count: a.minutes })}</span>{/if}
            </p>
          </div>
        </li>
      {/each}
    </ul>
    {#if searching}<div class="skel"><Skeleton lines={2} label={$dt("dash.state.loading")} /></div>{/if}

    {#if !activeQuery && totalPages > 1}
      <nav class="pager" aria-label={$dt("dash.blog.list.pages")}>
        <Button size="sm" variant="secondary" disabled={page <= 1 || status === "loading"} onclick={() => goPage(page - 1)}>{$dt("dash.blog.list.prev")}</Button>
        <span class="pager__info" aria-current="page">{$dt("dash.blog.list.pageOf", { page, total: totalPages })}</span>
        <Button size="sm" variant="secondary" disabled={!hasNext || status === "loading"} onclick={() => goPage(page + 1)}>{$dt("dash.blog.list.next")}</Button>
      </nav>
    {/if}
  {/if}
</Card>

<style lang="scss">
  .controls { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: var(--space-4); align-items: end; margin-bottom: var(--space-5); }
  .search { grid-column: span 2; min-width: 0; }
  @media (max-width: 640px) { .search { grid-column: auto; } }
  .search__row { display: flex; gap: var(--space-2); }
  .search__row input { flex: 1; min-width: 0; }
  .searchbar { display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-3); p { margin: 0; font-size: var(--fs-sm); color: var(--text-2); } }
  .skel { min-height: 10rem; }
  .list { list-style: none; margin: 0; padding: 0; }
  .item { display: flex; gap: var(--space-4); padding: var(--space-4) 0; border-top: 1px solid var(--border-1); &:first-child { border-top: 0; padding-top: 0; } }
  .item__img { width: 6rem; height: 4.5rem; border: 1px solid var(--border-1); border-radius: var(--radius-md); object-fit: cover; flex-shrink: 0; background: var(--surface-2); }
  .item__img--none { display: grid; place-items: center; color: var(--text-3); }
  .item__body { min-width: 0; flex: 1; }
  .item__title { display: inline-flex; align-items: baseline; gap: var(--space-1); min-height: 44px; align-content: center; font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); text-decoration: none; overflow-wrap: anywhere; text-underline-offset: 0.2em; &:hover { text-decoration: underline; text-decoration-thickness: 2px; } &:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); } }
  .item__excerpt { margin: var(--space-1) 0 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .item__meta { margin: var(--space-2) 0 0; display: flex; gap: var(--space-3); flex-wrap: wrap; font-size: var(--fs-xs); color: var(--text-3); }
  @media (max-width: 480px) { .item__img { width: 4rem; height: 4rem; } }
  .pager { display: flex; justify-content: center; align-items: center; gap: var(--space-3); margin-top: var(--space-5); }
  .pager__info { font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; margin: 0; padding: 0; border: 0; }
</style>
