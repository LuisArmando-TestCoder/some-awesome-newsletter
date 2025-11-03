<script lang="ts">
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import languages from "../../components/systems/inputs/Language/languages";
  import Language from "../../components/systems/inputs/Language/Language.svelte";
  import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  import Pagination from "../../components/Pagination/Pagination.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import store from "../../components/store";
  import ArticleCardSkeleton from "../../components/ArticleCardSkeleton/ArticleCardSkeleton.svelte";
  import FeaturedArticlesGrid from "../../components/articles/FeaturedArticlesGrid.svelte";
  import TextArticlesGrid from "../../components/articles/TextArticlesGrid.svelte";
  import PlainText from "../../components/systems/inputs/PlainText/PlainText.svelte";
  import { t } from "../../lib/i18n/translations";
  import { globalLanguage } from "../../components/store";

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
  let availableLanguages: string[] = [];
  let showModal = writable(false);
  let selectedArticle = writable<Article | null>(null);
  let error: string | null = null;
  let search = "";
  const ITEMS_PER_PAGE = 20;
  let languagePages = new Map<string, number>();
  let searchTimeout: any;
  let holder = "";
  let newsSourceId: string | null = "";
  let activeTab = "";
  let loading = true;
  let isStreaming = false;
  let noResults = false;
  let totalItems = 0;

  $: $t;

  const articlesCache = new Map<string, any>();

  function getCacheKey(lang: string, page: number) {
    return `${holder}-${newsSourceId || ""}-${search}-${lang}-${page}`;
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
    const url = `${$store.apiURL()}/articles/${holder}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`;

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
  }

  async function loadAndDisplayPage(lang: string, page: number) {
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
      error = $t.articles.errorFetching;
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
      updateURL({ lang: code });
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
        updateURL({ search: null });
        loadAndDisplayPage(activeTab, 0);
        return;
      }

      isStreaming = true;
      error = null;
      try {
        let searchUrl = `${$store.apiURL()}/articles/${holder}?search=${search}`;
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
        error = $t.articles.errorFetching;
      } finally {
        isStreaming = false;
      }
      updateURL({ search: search });
    }, 1500);
  }

  /* ───────────── utilities ───────────── */
  const getFlag = (code: string | undefined) =>
    languages.find((l) => l.code === code)?.flag ?? "";

  /* ────────── navigation helpers ────────── */
  function updateURL(params: { [key: string]: string | null }) {
    if (!browser) return;
    const url = new URL($page.url);
    Object.entries(params).forEach(([key, value]) => {
      if (value) {
        url.searchParams.set(key, value);
      } else {
        url.searchParams.delete(key);
      }
    });
    goto(`?${url.searchParams.toString()}`, { replaceState: true, noScroll: true });
  }

  selectedArticle.subscribe(value => {
    if (value) {
      showModal.set(true);
      updateURL({ article: value.id });
    } else {
      showModal.set(false);
      updateURL({ article: null });
    }
  });

  async function openArticleById(id: string) {
    const fetchedArticle = await fetchSingleArticle(id);
    if (fetchedArticle) {
      selectedArticle.set(fetchedArticle);
    }
  }

  /* ───────────── data fetching ───────────── */
  async function fetchSingleArticle(id: string): Promise<Article | null> {
    try {
      const r = await fetch(`${$store.apiURL()}/article/${id}`);
      if (!r.ok) return null;
      return { ...(await r.json()), id };
    } catch (err) {
      return null;
    }
  }

  /* ───────────── initial load ───────────── */
  onMount(async () => {
    const holderParam = $page.url.searchParams.get("holder");
    if (!holderParam) {
      error = $t.articles.noArticleSpecified;
      loading = false;
      return;
    }
    holder = holderParam;
    newsSourceId = $page.url.searchParams.get("newsSourceId");
    const langParam = $page.url.searchParams.get("lang");
    const searchParam = $page.url.searchParams.get("search");

    if (searchParam) {
      search = searchParam;
      handleSearch(new CustomEvent("search", { detail: { value: search } }));
      return;
    }

    // Initial fetch to discover languages and load page 0
    try {
      const pageParams = new URLSearchParams();
      if (newsSourceId) pageParams.set("newsSourceId", newsSourceId);
      
      const resp = await fetch(
        `${$store.apiURL()}/articles/${holder}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`
      );
      if (!resp.ok) throw new Error("Initial fetch failed");
      const data = await resp.json();

      if (data.articles) {
        availableLanguages = Object.keys(data.articles);
        if (availableLanguages.length > 0) {
          activeTab = langParam && availableLanguages.includes(langParam) ? langParam : availableLanguages[0];
          
          // Prime the cache with page 0 data for all languages
          Object.entries(data.articles).forEach(([lang, langData]) => {
            articlesCache.set(getCacheKey(lang, 0), langData);
          });

          // Display page 0 for the active tab
          displayPageContent(data.articles[activeTab]);
        }
      }
    } catch (err) {
      error = $t.articles.errorFetching;
    } finally {
      loading = false;
    }

    const deepLinkedId = $page.url.searchParams.get("article");
    if (deepLinkedId) {
      await openArticleById(deepLinkedId);
    }
  });
</script>

<div class="articles-page-container">
  <header class="hero-section">
    <h1>{$t.articles.title}</h1>
    <p>{$t.articles.subtitle}</p>
  </header>

  <main class="articles-content">
    <div class="controls">
      <div class="controls__languages">
        {#if activeTab}
          <Language
            whitelist={availableLanguages}
            onSelect={(code) => handleLanguageChange(code)}
            label={$t.articles.producedIn}
            defaultLanguageCode={activeTab}
          />
        {/if}
      </div>
      <SearchBar bind:value={search} placeholder={$t.articles.searchPlaceholder} on:search={handleSearch} />
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
      <!-- Section 1: Featured Articles -->
      {#if noResults}
        <p>{$t.articles.noArticlesFound}</p>
      {:else if articlesWithImages.length > 0}
        <FeaturedArticlesGrid articles={articlesWithImages.slice(0, 3)} bind:selectedArticle />
      {/if}

      <!-- Section 2: Dynamic Text-Focused Grids -->
      {#if articlesWithoutImages.length > 0}
        <TextArticlesGrid articles={articlesWithoutImages} bind:selectedArticle />
      {/if}

      <!-- Section 3: Rearranged Featured Grids -->
      {#if articlesWithImages.length > 3}
        <section class="standard-grid-repeater">
          {#each articlesWithImages.slice(3) as article, i}
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
      <Pagination currentPage={languagePages.get(activeTab) || 0} {totalItems} pageSize={ITEMS_PER_PAGE} on:pageChange={(e) => handlePageChange(activeTab, e)} />
      {/if}
    {/if}
  </main>

  <footer class="page-footer">
    <p>&copy; {new Date().getFullYear()} Some Awesome Newsletter. {$t.articles.rightsReserved}</p>
  </footer>
</div>

<Modal {showModal} onChange={(v) => !v && selectedArticle.set(null)}>
  {#if $selectedArticle}
    <div class="modal-content-inner">
      <h2>{@html $selectedArticle.title}</h2>
      <p><small>{$t.articles.created} {$selectedArticle.creation} | {$t.articles.language} {$selectedArticle.language}</small></p>
      {@html $selectedArticle.content}
    </div>
  {/if}
</Modal>

<style lang="scss">
  :root {
    --border-radius: 12px;
    --transition-speed: 0.3s;
  }

  .controls__languages {
    padding: 1.5rem;
  }

  .articles-page-container {
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

  .standard-grid-repeater .featured-grid {
    margin-bottom: 4rem;
  }

  .page-footer {
    text-align: center;
    padding: 3rem 0;
    margin-top: 2rem;
    border-top: 1px solid #eee;
  }

  .modal-content-inner {
    height: 80vh;
    overflow-y: auto;
  }

  .preview-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (min-width: 768px) {
    .featured-grid .main-article {
      gap: 2rem;
      .preview-text {
        -webkit-line-clamp: 10;
      }
    }

    .featured-grid.rearranged .main-article .preview-text {
      -webkit-line-clamp: 15;
    }
  }
</style>
