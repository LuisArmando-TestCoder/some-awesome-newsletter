<script lang="ts">
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import languages from "../../components/systems/inputs/Language/languages";
  import Language from "../../components/systems/inputs/Language/Language.svelte";
  import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  import Pagination from "../../components/Pagination/Pagination.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import store from "../../components/store";
  import ArticleCardSkeleton from "../../components/ArticleCardSkeleton/ArticleCardSkeleton.svelte";
  import FeaturedArticlesGrid from "../../components/articles/FeaturedArticlesGrid.svelte";
  import TextArticlesGrid from "../../components/articles/TextArticlesGrid.svelte";

  /* ────────────────── types ─────────────────── */
  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
  }

  /* ─────────────── state ─────────────── */
  let articlesWithImages: Article[] = [];
  let articlesWithoutImages: Article[] = [];
  let availableLanguages: string[] = [];
  let showModal = writable(false);
  let selectedArticle: Article | null = null;
  let error: string | null = null;
  let search = "";
  const ITEMS_PER_PAGE = 20; // Increased to accommodate more complex layouts
  let languagePages = new Map<string, number>();
  let holder = "";
  let activeTab = "";
  let loading = false;
  let totalItems = 0;

  async function fetchArticles(holder: string, newsSourceId?: string) {
    const pageParams = new URLSearchParams();
    languagePages.forEach((page, lang) => {
      if (page) {
        pageParams.set(`page_${lang}`, page.toString());
      }
    });

    if (newsSourceId) {
      pageParams.set("newsSourceId", newsSourceId);
    }

    loading = true;
    try {
      const resp = await fetch(
        `${$store.apiURL()}/articles/${holder}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`
      );
      if (!resp.ok) throw new Error("holder fetch failed");
      const data = await resp.json();

      if (availableLanguages.length === 0 && data.articles) {
        availableLanguages = Object.keys(data.articles);
      }
      
      if (!activeTab && availableLanguages.length > 0) {
        activeTab = availableLanguages[0];
      }
      
      const articlesData = data.articles[activeTab] || { withImages: [], withoutImages: [], totalWithImages: 0, totalWithoutImages: 0 };
      articlesWithImages = articlesData.withImages;
      articlesWithoutImages = articlesData.withoutImages;
      totalItems = articlesData.totalWithImages + articlesData.totalWithoutImages;

    } catch (err) {
      error = "Error fetching article list.";
    } finally {
      loading = false;
    }
  }

  function handlePageChange(language: string, event: CustomEvent<{ page: number }>) {
    languagePages.set(language, event.detail.page);
    if (holder) {
      fetchArticles(holder);
    }
  }

  /* ───────────── utilities ───────────── */
  function getTitle(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    const h1 = div.querySelector("h1")?.innerText;
    const h2 = div.querySelector("h2")?.innerText;
    return h1 || h2 || "Article";
  }

  function noH1(content: string) {
    const div = document.createElement("div");
    div.innerHTML = content;
    div.querySelector("h1")?.remove();
    div.querySelector("h2")?.remove();
    return div.innerHTML;
  }

  const getFlag = (code: string | undefined) =>
    languages.find((l) => l.code === code)?.flag ?? "";

  /* ────────── navigation helpers ────────── */
  function updateURLParam(id: string | null) {
    const url = new URL($page.url);
    id ? url.searchParams.set("article", id) : url.searchParams.delete("article");
    goto(`/articles?${url.searchParams.toString()}`, { replaceState: true, noScroll: true });
  }

  function openArticle(article: Article) {
    selectedArticle = article;
    showModal.set(true);
    updateURLParam(article.id);
  }

  function closeModal() {
    showModal.set(false);
    selectedArticle = null;
    updateURLParam(null);
  }

  async function openArticleById(id: string) {
    const fetchedArticle = await fetchSingleArticle(id);
    if (fetchedArticle) {
      openArticle(fetchedArticle);
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
      error = "No article holder specified.";
      return;
    }
    holder = holderParam;

    const newsSourceId = $page.url.searchParams.get("newsSourceId");
    await fetchArticles(holder, newsSourceId ?? undefined);

    const deepLinkedId = $page.url.searchParams.get("article");
    if (deepLinkedId) {
      await openArticleById(deepLinkedId);
    }
  });

  $: if (activeTab) {
    fetchArticles(holder);
  }

</script>

<div class="articles-page-container">
  <header class="hero-section">
    <h1>The Latest Insights</h1>
    <p>Explore our curated collection of articles, news, and expert opinions.</p>
  </header>

  <main class="articles-content">
    <div class="controls">
      <div class="controls__languages">
        <Language
          whitelist={availableLanguages}
          onSelect={(code) => {
            if (code) {
              activeTab = code;
            }
          }}
          label={"We've produced news in all these languages"}
          defaultLanguageCode={activeTab}
        />
      </div>
      <SearchBar bind:value={search} placeholder="Search articles..." />
    </div>

    {#if error}
      <p class="error">{error}</p>
    {:else if loading}
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
      {#if articlesWithImages.length > 0}
        <FeaturedArticlesGrid articles={articlesWithImages.slice(0, 3)} on:open={(e) => openArticle(e.detail)} />
      {/if}

      <!-- Section 2: Dynamic Text-Focused Grids -->
      {#if articlesWithoutImages.length > 0}
        <TextArticlesGrid articles={articlesWithoutImages} on:open={(e) => openArticle(e.detail)} />
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
                on:open={(e) => openArticle(e.detail)}
              />
            {/if}
          {/each}
        </section>
      {/if}

      <Pagination currentPage={languagePages.get(activeTab) || 0} {totalItems} pageSize={ITEMS_PER_PAGE} on:pageChange={(e) => handlePageChange(activeTab, e)} />
    {/if}
  </main>

  <footer class="page-footer">
    <p>&copy; {new Date().getFullYear()} Some Awesome Newsletter. All Rights Reserved.</p>
  </footer>
</div>

<Modal {showModal} onChange={(v) => !v && closeModal()}>
  {#if selectedArticle}
    <div class="modal-content-inner">
      <h2>{getTitle(selectedArticle.content)}</h2>
      <p><small>Created: {selectedArticle.creation} | Language: {selectedArticle.language}</small></p>
      {@html noH1(selectedArticle.content)}
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
