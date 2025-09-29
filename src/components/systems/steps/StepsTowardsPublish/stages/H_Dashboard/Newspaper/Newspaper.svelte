<script lang="ts">
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import Language from "../../../../../../systems/inputs/Language/Language.svelte";
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import Modal from "../../../../../../Modal/Modal.svelte";
  import store from "../../../../../../store";
  import ArticleCardSkeleton from "../../../../../../ArticleCardSkeleton/ArticleCardSkeleton.svelte";
  import FeaturedArticlesGrid from "../../../../../../articles/FeaturedArticlesGrid.svelte";
  import TextArticlesGrid from "../../../../../../articles/TextArticlesGrid.svelte";

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
  let showModal = writable(false);
  let selectedArticle: Article | null = null;
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

  const articlesCache = new Map<string, any>();

  function getCacheKey(lang: string, page: number) {
    return `${$store.configuratorEmail}-${newsSourceId || ""}-${search}-${lang}-${page}`;
  }

  async function fetchAndCachePage(lang: string, pageToFetch: number) {
    const cacheKey = getCacheKey(lang, pageToFetch);
    if (articlesCache.has(cacheKey) && pageToFetch !== 0) { // Always refetch page 0 on initial load
      return articlesCache.get(cacheKey);
    }

    const pageParams = new URLSearchParams();
    pageParams.set("page", (pageToFetch + 1).toString()); // API is 1-based
    pageParams.set("lang", lang);
    if (newsSourceId) pageParams.set("newsSourceId", newsSourceId);
    const url = `${$store.apiURL()}/articles/${$store.configuratorEmail}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`;

    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`Fetch failed for ${lang} page ${pageToFetch}`);
    }

    const data = await resp.json();
    const articlesData = data.articles[lang] || {
      withImages: [],
      withoutImages: [],
      total: 0,
    };
    
    articlesCache.set(cacheKey, articlesData);
    return articlesData;
  }

  function displayPageContent(articlesData: any) {
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
    } catch (err) {
      error = "Error fetching article list.";
    } finally {
      loading = false;
    }
  }

  function handlePageChange(language: string, event: CustomEvent<{ page: number }>) {
    const newPage = event.detail.page;
    languagePages.set(language, newPage);
    loadAndDisplayPage(language, newPage);
  }
  
  function handleLanguageChange(code: string | null) {
    if (code && code !== activeTab) {
      activeTab = code;
      const currentPage = languagePages.get(activeTab) || 0;
      loadAndDisplayPage(activeTab, currentPage);
    }
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
        let searchUrl = `${$store.apiURL()}/articles/${$store.configuratorEmail}?search=${search}`;
        if (newsSourceId) {
          searchUrl += `&newsSourceId=${newsSourceId}`;
        }
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
      } catch (err) {
        error = "Error fetching search results.";
      } finally {
        isStreaming = false;
      }
    }, 1500);
  }

  function openArticle(article: Article) {
    selectedArticle = article;
    showModal.set(true);
  }

  function closeModal() {
    showModal.set(false);
    selectedArticle = null;
  }

  async function loadInitialArticles() {
    // Reset state before fetching new data
    articlesWithImages = [];
    articlesWithoutImages = [];
    totalItems = 0;
    allUserLanguages = [];
    activeTab = "";
    noResults = false;
    articlesCache.clear();
    languagePages.clear();

    if (!newsSourceId || !$store.configuratorEmail) {
      return;
    }

    loading = true;
    error = null;
    try {
      const pageParams = new URLSearchParams();
      pageParams.set("newsSourceId", newsSourceId);
      
      const resp = await fetch(
        `${$store.apiURL()}/articles/${$store.configuratorEmail}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`
      );
      if (!resp.ok) throw new Error("Initial fetch failed");
      const data = await resp.json();

      if (data.articles && Object.keys(data.articles).length > 0) {
        allUserLanguages = Object.keys(data.articles);
        activeTab = allUserLanguages[0];
        
        Object.entries(data.articles).forEach(([lang, langData]) => {
          articlesCache.set(getCacheKey(lang, 0), langData);
        });

        displayPageContent(data.articles[activeTab]);
      } else {
        articlesWithImages = [];
        articlesWithoutImages = [];
        totalItems = 0;
        noResults = true;
      }
    } catch (err) {
      error = "Error loading initial articles.";
    } finally {
      loading = false;
    }
  }
</script>

<div class="newspaper-container">
  <header class="hero-section">
    <h1>Newspaper</h1>
    <p>Select a news source to see the articles.</p>
  </header>

  <div class="news-source-selector">
    <label for="news-source-select">Choose a news source:</label>
    <select id="news-source-select" bind:value={newsSourceId} on:change={loadInitialArticles}>
        <option value={null}>--Please choose an option--</option>
      {#each $store.config.newsSources as source}
        <option value={source.id}>{source.url}</option>
      {/each}
    </select>
    {#if newsSourceId}
    <a href="/articles?holder={$store.configuratorEmail}&lang={activeTab}" target="_blank" class="article-link">Share Newspaper</a>
    {/if}
  </div>

  {#if newsSourceId}
  <main class="articles-content">
    <div class="controls">
      <div class="controls__languages">
        {#if activeTab}
          <Language
            whitelist={allUserLanguages}
            onSelect={(code) => handleLanguageChange(code)}
            label={"We've produced news in all these languages"}
            defaultLanguageCode={activeTab}
          />
        {/if}
      </div>
      <SearchBar bind:value={search} placeholder="Search articles..." on:search={handleSearch} />
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
        <p>No articles found for this news source.</p>
      {:else if articlesWithImages.length > 0}
        <FeaturedArticlesGrid articles={articlesWithImages.slice(0, 3)} on:open={(e) => openArticle(e.detail)} />
      {/if}

      {#if articlesWithoutImages.length > 0}
        <TextArticlesGrid articles={articlesWithoutImages} on:open={(e) => openArticle(e.detail)} />
      {/if}

      {#if articlesWithImages.length > 3}
        <section class="standard-grid-repeater">
          {#each articlesWithImages.slice(3) as article, i}
            {#if i % 3 === 0}
              <FeaturedArticlesGrid
                articles={articlesWithImages.slice(i + 3, i + 6)}
                rearranged={true}
                order={i / 3 % 2}
                on:open={(e) => openArticle(e.detail)}
              />
            {/if}
          {/each}
        </section>
      {/if}

      {#if !search}
      <Pagination currentPage={languagePages.get(activeTab) || 0} {totalItems} pageSize={ITEMS_PER_PAGE} on:pageChange={(e) => handlePageChange(activeTab, e)} />
      {/if}
    {/if}
  </main>
  {/if}
</div>

<Modal {showModal} onChange={(v) => !v && closeModal()}>
  {#if selectedArticle}
    <div class="modal-content-inner">
      <h2>{selectedArticle.title}</h2>
      <p><small>Created: {selectedArticle.creation} | Language: {selectedArticle.language}</small></p>
      {@html selectedArticle.content}
    </div>
  {/if}
</Modal>

<style lang="scss">
  .newspaper-container {
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0;
  }

  .hero-section {
    text-align: center;
    padding: 5rem 1rem;
    margin-bottom: 3rem;
  }

  .news-source-selector {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    gap: 1rem;

    label {
      font-weight: bold;
    }

    select {
      padding: 0.5rem;
      border-radius: 8px;
    }
  }

  .article-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background-color: #007bff;
    color: white;
    text-decoration: none;
    border-radius: 8px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #0056b3;
    }
  }

  .controls__languages {
    padding: 1.5rem;
  }

  .standard-grid-repeater .featured-grid {
    margin-bottom: 4rem;
  }

  .modal-content-inner {
    height: 80vh;
    overflow-y: auto;
  }
</style>
