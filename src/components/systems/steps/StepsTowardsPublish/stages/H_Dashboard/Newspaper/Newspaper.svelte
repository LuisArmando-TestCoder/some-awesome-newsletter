<script lang="ts">
  import { sanitizeHtml } from "$lib/utils/sanitizeHtml";

  // Passed by the step host (MultiSlotComponent); this view is always shown.
  export const canReveal: boolean = true;
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Language from "../../../../../../systems/inputs/Language/Language.svelte";
  import SearchSelector from "../../../../../../systems/selectors/SearchSelector/SearchSelector.svelte";
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import Container from "../../../../../../Container/Container.svelte";
  import store from "../../../../../../store";
  import ArticleCardSkeleton from "../../../../../../ArticleCardSkeleton/ArticleCardSkeleton.svelte";
  import FeaturedArticlesGrid from "../../../../../../articles/FeaturedArticlesGrid.svelte";
  import TextArticlesGrid from "../../../../../../articles/TextArticlesGrid.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { blogPath } from "../../../../../../articles/blog";

  /* ────────────────── types ─────────────────── */
  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
    title: string;
  }

  /* ─────────────── state ─────────────── */
  let articlesWithImages: Article[] = [];
  let articlesWithoutImages: Article[] = [];
  let allUserLanguages: string[] = [];
  let selectedArticle = writable<Article | null>(null);
  let isArticleOpen = writable(false);
  let error: string | null = null;
  let search = "";
  const ITEMS_PER_PAGE = 20;
  let languagePages = new Map<string, number>();
  let searchTimeout: number;
  let newsSourceId: string | null = null;
  let activeTab = "";
  let loading = false;
  let isStreaming = false;
  let noResults = false;
  let totalItems = 0;

  /** One page of articles for one language, as the API returns it. */
  type ArticlesPage = { withImages: Article[]; withoutImages: Article[]; total: number };

  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- plain cache, never rendered
  const articlesCache = new Map<string, ArticlesPage>();

  function getCacheKey(lang: string, page: number) {
    return `${$store.configuratorEmail}-${newsSourceId || ""}-${search}-${lang}-${page}`;
  }

  async function fetchAndCachePage(lang: string, pageToFetch: number): Promise<ArticlesPage> {
    const cacheKey = getCacheKey(lang, pageToFetch);
    if (articlesCache.has(cacheKey) && pageToFetch !== 0) { // Always refetch page 0 on initial load
      return articlesCache.get(cacheKey)!;
    }

    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary used to build a query string
    const pageParams = new URLSearchParams();
    pageParams.set("page", (pageToFetch + 1).toString()); // API is 1-based
    pageParams.set("lang", lang);
    if (newsSourceId) pageParams.set("newsSourceId", newsSourceId);
    const url = `${$store.apiURL()}/articles/${encodeURIComponent($store.configuratorEmail)}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`;

    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`Fetch failed for ${lang} page ${pageToFetch}`);
    }

    const data = await resp.json();
    const articlesData: ArticlesPage = data.articles[lang] || {
      withImages: [],
      withoutImages: [],
      total: 0,
    };
    
    articlesCache.set(cacheKey, articlesData);
    return articlesData;
  }

  function displayPageContent(articlesData: ArticlesPage) {
    articlesWithImages = articlesData.withImages;
    articlesWithoutImages = articlesData.withoutImages;
    totalItems = articlesData.total;
    noResults = articlesData.total === 0;
  }

  async function loadAndDisplayPage(lang: string, page: number) {
    if (!$store.configuratorEmail || !newsSourceId) return;
    loading = true;
    error = null;
    try {
      const articlesData = await fetchAndCachePage(lang, page);
      displayPageContent(articlesData);

      // Prefetch sibling pages in the background
      const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
      if (page > 0) {
        fetchAndCachePage(lang, page - 1).catch((e) => console.error("Prefetch previous failed:", e));
      }
      if (page < totalPages - 1) {
        fetchAndCachePage(lang, page + 1).catch((e) => console.error("Prefetch next failed:", e));
      }
    } catch {
      error = $t['newspaper.errorList'];
    } finally {
      loading = false;
    }
  }

  function handlePageChange(language: string, event: CustomEvent<{ page: number }>) {
    const newPage = event.detail.page;
    // New Map so Svelte sees the change and the pagination highlight moves.
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- legacy component: reassigning a new Map triggers the update
    languagePages = new Map(languagePages).set(language, newPage);
    loadAndDisplayPage(language, newPage);
  }
  
  function handleLanguageChange(code: string | null) {
    if (code && code !== activeTab) {
      activeTab = code;
      const currentPage = languagePages.get(activeTab) || 0;
      loadAndDisplayPage(activeTab, currentPage);
    }
  }

  function handleNewsSourceSelect(selectedId: string | null) {
    newsSourceId = selectedId;
    loadInitialArticles();
  }

  async function handleSearch(event: CustomEvent<{ value: string }>) {
    search = event.detail.value;
    clearTimeout(searchTimeout);

    searchTimeout = setTimeout(async () => {
      articlesWithImages = [];
      articlesWithoutImages = [];
      totalItems = 0;
      noResults = false;
      
      if (!search) {
        loadAndDisplayPage(activeTab, 0);
        return;
      }

      isStreaming = true;
      error = null;
      try {
        // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary used to build a query string
        const qs = new URLSearchParams({ search });
        if (newsSourceId) qs.set("newsSourceId", newsSourceId);
        let searchUrl = `${$store.apiURL()}/articles/${encodeURIComponent($store.configuratorEmail)}?${qs.toString()}`;
        const resp = await fetch(searchUrl);
        if (!resp.ok) throw new Error("Search fetch failed");

        const reader = resp.body?.getReader();
        if (!reader) throw new Error("Failed to get response reader");

        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (line.trim() === "") continue;
            const article = JSON.parse(line);
            const titleMatch = article.content ? article.content.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || article.content.match(/<h2[^>]*>([\s\S]*?)<\/h2>/) : null;
            const title = titleMatch ? titleMatch[1] : "Article";
            const content = article.content ? article.content.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, "").replace(/<h2[^>]*>[\s\S]*?<\/h2>/, "") : "";

            const processedArticle = {
              ...article,
              title,
              content,
            };

            if (article.content && /<img[^>]+>/.test(article.content)) {
              articlesWithImages = [...articlesWithImages, processedArticle];
            } else {
              articlesWithoutImages = [...articlesWithoutImages, processedArticle];
            }
            totalItems++;
          }
        }
        if (totalItems === 0) {
          noResults = true;
        }
      } catch {
        error = $t['newspaper.errorSearch'];
      } finally {
        isStreaming = false;
      }
    }, 1500);
  }

  selectedArticle.subscribe(value => {
    if (value) {
      isArticleOpen.set(true);
    } else {
      isArticleOpen.set(false);
    }
  });

  onMount(() => {
    loadInitialArticles();
  });

  async function loadInitialArticles() {
    // Reset state before fetching new data
    articlesWithImages = [];
    articlesWithoutImages = [];
    totalItems = 0;
    allUserLanguages = [];
    activeTab = "";
    noResults = false;
    articlesCache.clear();
    languagePages = new Map();

    if (!newsSourceId || !$store.configuratorEmail) {
      return;
    }

    loading = true;
    error = null;
    try {
      // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary used to build a query string
      const pageParams = new URLSearchParams();
      pageParams.set("newsSourceId", newsSourceId);
      
      const resp = await fetch(
        `${$store.apiURL()}/articles/${encodeURIComponent($store.configuratorEmail)}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`
      );
      if (!resp.ok) throw new Error("Initial fetch failed");
      const data = await resp.json();

      if (data.articles && Object.keys(data.articles).length > 0) {
        allUserLanguages = Object.keys(data.articles);
        activeTab = allUserLanguages[0];
        
        Object.entries(data.articles as Record<string, ArticlesPage>).forEach(([lang, langData]) => {
          articlesCache.set(getCacheKey(lang, 0), langData);
        });

        displayPageContent(data.articles[activeTab]);
      } else {
        articlesWithImages = [];
        articlesWithoutImages = [];
        totalItems = 0;
        noResults = true;
      }
    } catch {
      error = $t['newspaper.errorList'];
    } finally {
      loading = false;
    }
  }
</script>

<div class="newspaper-container">
  <header class="hero-section">
    <h1>{$t['newspaper.title']}</h1>
    <p>{$t['newspaper.subtitle']}</p>
  </header>

  <div class="news-source-selector">
    <SearchSelector
      items={$store.config.newsSources}
      valueFieldName="id"
      displayFieldName="url"
      onSelect={handleNewsSourceSelect}
      label={$t['labels.chooseNewsSource']}
      defaultSelectedValue={newsSourceId}
    />
    {#if newsSourceId}
    <a href={blogPath($store.configuratorEmail, { ns: newsSourceId, lang: activeTab })} target="_blank" rel="noopener noreferrer" class="article-link">{$t['labels.shareNewspaper']}</a>
    {/if}
  </div>

  {#if newsSourceId}
  <main class="articles-content" class:article-open={$isArticleOpen}>
    <div class="articles-wrapper">
      <div class="controls">
        <div class="controls__languages">
        {#if activeTab}
          <Language
            whitelist={allUserLanguages}
            onSelect={(code) => handleLanguageChange(code)}
            label={$t['labels.producedInLanguages']}
            defaultLanguageCode={activeTab}
          />
        {/if}
      </div>
      <SearchBar bind:value={search} placeholder={$t['placeholders.searchArticles']} on:search={handleSearch} />
    </div>

    {#if isStreaming}
      <div class="skeleton-wrapper">
        <section class="featured-grid">
          <div class="main-article"><ArticleCardSkeleton /></div>
          <div class="secondary-articles">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
        </section>
      </div>
    {/if}

    {#if error}
      <p class="error">{error}</p>
    {:else if loading && !isStreaming}
      <div class="skeleton-wrapper">
        <section class="featured-grid">
          <div class="main-article"><ArticleCardSkeleton /></div>
          <div class="secondary-articles">
            <ArticleCardSkeleton />
            <ArticleCardSkeleton />
          </div>
        </section>
      </div>
    {:else}
      {#if noResults}
        <p>{$t['labels.noArticlesFound']}</p>
      {:else if articlesWithImages.length > 0}
        <FeaturedArticlesGrid articles={articlesWithImages.slice(0, 3)} bind:selectedArticle />
      {/if}

      {#if articlesWithoutImages.length > 0}
        <TextArticlesGrid articles={articlesWithoutImages} bind:selectedArticle={selectedArticle} />
      {/if}

      {#if articlesWithImages.length > 3}
        <section class="standard-grid-repeater">
          {#each articlesWithImages.slice(3) as _article, i (i)}
            {#if i % 3 === 0}
              <FeaturedArticlesGrid
                articles={articlesWithImages.slice(i + 3, i + 6)}
                rearranged={true}
                order={i / 3 % 2}
                bind:selectedArticle
              />
            {/if}
          {/each}
        </section>
      {/if}

      {#if !search}
      <Pagination currentPage={languagePages.get(activeTab) ?? 0} {totalItems} pageSize={ITEMS_PER_PAGE} on:pageChange={(e) => handlePageChange(activeTab, e)} />
      {/if}
    {/if}
    </div>
    <div class="article-viewer">
      {#if $isArticleOpen && $selectedArticle}
        <Container show={$isArticleOpen}>
          <div class="modal-content-inner">
            <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
            <h2>{@html sanitizeHtml($selectedArticle.title)}</h2>
            <p><small>{$t['labels.created']}: {$selectedArticle.creation} | {$t['labels.language']}: {$selectedArticle.language}</small></p>
            <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
            {@html sanitizeHtml($selectedArticle.content)}
          </div>
        </Container>
      {/if}
    </div>
  </main>
  {/if}
</div>

<style lang="scss">
  .newspaper-container {
    width: 100%;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: 0;
  }

  .hero-section {
    text-align: center;
    margin-bottom: 3rem;
  }

  .news-source-selector {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    margin-bottom: 2rem;
    gap: 1rem;
    flex-wrap: wrap;
  }

  .article-link {
    display: inline-flex;
    align-items: center;
    min-height: var(--control-h);
    padding: 0 var(--control-pad-x);
    background-color: var(--surface-1);
    border: 1px solid var(--border-2);
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    border-radius: var(--radius-full);
    transition: background-color var(--t-out) var(--ease-out), transform var(--t-out) var(--ease-out);

    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &:active { transform: scale(0.97); transition-duration: 60ms; }
    @media (hover: hover) and (pointer: fine) {
      &:hover { background-color: var(--surface-2); transition-duration: var(--t-in); }
    }
  }

  .controls__languages {
    padding: 1.5rem;
  }

  .modal-content-inner {
    height: 80vh;
    overflow-y: auto;
  }

  .articles-content {
    display: flex;
    position: relative;
    width: 100%;
    gap: 2rem;
  }

  .articles-wrapper {
    flex: 1 1 100%;
    transition: flex-basis 0.95s cubic-bezier(0.25, 0, 0.25, 1);
  }

  .article-viewer {
    flex: 0 0 0%;
    max-width: 0;
    transition: flex-basis 0.75s cubic-bezier(0.25, 0, 0.25, 1), max-width 0.5s cubic-bezier(0.25, 0, 0.25, 1);
    overflow: hidden;
    position: sticky;
    top: 2rem;
    height: 100vh;
  }

  .articles-content.article-open .articles-wrapper {
    flex-basis: 65%;
  }

  .articles-content.article-open .article-viewer {
    flex-basis: 35%;
    max-width: 35%;
  }

  @media (max-width: 1024px) {
    .articles-content {
      display: block;
      position: relative;
      overflow: hidden;
    }

    .articles-wrapper {
      width: 100%;
      position: relative;
      left: 0;
      transition: left 0.5s cubic-bezier(0.25, 0, 0.25, 1);
    }

    .article-viewer {
      position: absolute;
      top: 0;
      left: 100%;
      width: 100%;
      height: 100%;
      max-width: 100%;
      flex-basis: auto;
      transition: left 0.5s cubic-bezier(0.25, 0, 0.25, 1);
      z-index: 10;
    }

    .articles-content.article-open .articles-wrapper {
      left: -100%;
    }

    .articles-content.article-open .article-viewer {
      left: 0;
      max-width: 100%;
      flex-basis: auto;
    }
  }
</style>
