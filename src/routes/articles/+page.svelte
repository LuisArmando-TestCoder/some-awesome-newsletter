<script lang="ts">
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import languages from "../../components/systems/inputs/Language/languages";
  import SearchBar from "../../components/SearchBar/SearchBar.svelte";
  import Pagination from "../../components/Pagination/Pagination.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import store from "../../components/store";
  import Tabs from "../../lib/ui/molecules/Tabs.svelte";
  import ArticleCardSkeleton from "../../components/ArticleCardSkeleton/ArticleCardSkeleton.svelte";

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
  function getImage(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.querySelector("img") as HTMLImageElement | null;
  }

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

  function getPreview(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.trim().replace(/\s+/g, " ");
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

  // Reactive slicing for text-only articles
  $: quarter = Math.ceil(articlesWithoutImages.length / 4);
  $: textSlice1 = articlesWithoutImages.slice(0, quarter);
  $: textSlice2 = articlesWithoutImages.slice(quarter, quarter * 2);
  $: textSlice3 = articlesWithoutImages.slice(quarter * 2, quarter * 3);
  $: textSlice4 = articlesWithoutImages.slice(quarter * 3);

</script>

<div class="articles-page-container">
  <header class="hero-section">
    <h1>The Latest Insights</h1>
    <p>Explore our curated collection of articles, news, and expert opinions.</p>
  </header>

  <main class="articles-content">
    <div class="controls">
      <SearchBar bind:value={search} placeholder="Search articles..." />
      <Tabs items={availableLanguages} bind:activeItem={activeTab}>
        <div slot="item" let:item>
          {getFlag(item)} {item}
        </div>
      </Tabs>
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
        <section class="featured-grid">
          {#if articlesWithImages[0]}
            {@const mainArticle = articlesWithImages[0]}
            <div class="main-article" on:click={() => openArticle(mainArticle)}>
              <div class="image-container"><img src={getImage(mainArticle.content)?.src} alt={getTitle(mainArticle.content)} /></div>
              <div class="text-content">
                <h2>{getTitle(mainArticle.content)}</h2>
                <p class="preview-text">{getPreview(noH1(mainArticle.content))}</p>
              </div>
            </div>
          {/if}
          <div class="secondary-articles">
            {#each articlesWithImages.slice(1, 3) as article (article.id)}
              <div class="secondary-article" on:click={() => openArticle(article)}>
                <div class="image-container"><img src={getImage(article.content)?.src} alt={getTitle(article.content)} /></div>
                <div class="text-content">
                  <h3>{getTitle(article.content)}</h3>
                  <p class="preview-text">{getPreview(noH1(article.content))}</p>
                </div>
              </div>
            {/each}
          </div>
        </section>
      {/if}

      <!-- Section 2: Dynamic Text-Focused Grids -->
      {#if articlesWithoutImages.length > 0}
        <section class="text-articles-section">
          {#if textSlice1.length > 0}
            <div class="text-grid-wrapper grid-a">
              {#each textSlice1 as article (article.id)}
                <div class="text-card" on:click={() => openArticle(article)}>
                  <h3>{getTitle(article.content)}</h3>
                  <p class="preview-text">{getPreview(noH1(article.content))}</p>
                </div>
              {/each}
            </div>
          {/if}
          {#if textSlice2.length > 0}
            <div class="text-grid-wrapper grid-b">
              {#each textSlice2 as article (article.id)}
                <div class="text-card" on:click={() => openArticle(article)}><h4>{getTitle(article.content)}</h4></div>
              {/each}
            </div>
          {/if}
          {#if textSlice3.length > 0}
            <div class="text-grid-wrapper grid-c">
              {#each textSlice3 as article (article.id)}
                <div class="text-card" on:click={() => openArticle(article)}><h4>{getTitle(article.content)}</h4></div>
              {/each}
            </div>
          {/if}
          {#if textSlice4.length > 0}
            <div class="text-grid-wrapper grid-d">
              {#each textSlice4 as article (article.id)}
                <div class="text-card" on:click={() => openArticle(article)}><h4>{getTitle(article.content)}</h4></div>
              {/each}
            </div>
          {/if}
        </section>
      {/if}

      <!-- Section 3: Rearranged Featured Grids -->
      {#if articlesWithImages.length > 3}
        <section class="standard-grid-repeater">
          {#each articlesWithImages.slice(3) as article, i}
            {#if i % 3 === 0}
              {@const main = articlesWithImages[i + 3]}
              {@const s1 = articlesWithImages[i + 4]}
              {@const s2 = articlesWithImages[i + 5]}
              {#if main}
                <div class="featured-grid rearranged" style="--order: {i / 3 % 2}">
                  <div class="main-article" on:click={() => openArticle(main)}>
                    <div class="image-container"><img src={getImage(main.content)?.src} alt={getTitle(main.content)} /></div>
                    <div class="text-content">
                      <h2>{getTitle(main.content)}</h2>
                      <p class="preview-text">{getPreview(noH1(main.content))}</p>
                    </div>
                  </div>
                  <div class="secondary-articles">
                    {#if s1}
                      <div class="secondary-article" on:click={() => openArticle(s1)}>
                        <div class="image-container"><img src={getImage(s1.content)?.src} alt={getTitle(s1.content)} /></div>
                        <div class="text-content">
                          <h3>{getTitle(s1.content)}</h3>
                          <p class="preview-text">{getPreview(noH1(s1.content))}</p>
                        </div>
                      </div>
                    {/if}
                    {#if s2}
                      <div class="secondary-article" on:click={() => openArticle(s2)}>
                        <div class="image-container"><img src={getImage(s2.content)?.src} alt={getTitle(s2.content)} /></div>
                        <div class="text-content">
                          <h3>{getTitle(s2.content)}</h3>
                          <p class="preview-text">{getPreview(noH1(s2.content))}</p>
                        </div>
                      </div>
                    {/if}
                  </div>
                </div>
              {/if}
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

  .image-container {
    overflow: hidden;
    border-radius: var(--border-radius);
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--transition-speed) ease;
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    margin-bottom: 4rem;
    align-items: stretch;
    
    &.rearranged {
      .main-article { order: calc(1 - var(--order, 0)); }
      .secondary-articles { order: calc(0 + var(--order, 0)); }
    }

    .main-article, .secondary-article {
      display: flex;
      flex-direction: column;
      min-height: 200px;
    }

    .main-article {
      .preview-text {
        -webkit-line-clamp: 4;
      }
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }

    .secondary-articles {
      display: flex;
      flex-direction: column;
      gap: 2rem;
    }

    .secondary-article {
      flex: 1;
      .preview-text {
        -webkit-line-clamp: 2;
      }
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }
  }

  .text-articles-section {
    background-color: #f9f9f9;
    padding: 3rem 2rem;
    border-radius: var(--border-radius);
    margin-bottom: 4rem;
  }

  .text-grid-wrapper {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .text-card {
      background: #fff;
      padding: 1.5rem;
      border: 1px solid #eee;
      border-radius: var(--border-radius);
      cursor: pointer;
      transition: all var(--transition-speed) ease;
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      }
    }
  }

  .grid-a {
    grid-template-columns: 1fr 1fr;
    .text-card:first-child {
      grid-column: 1 / -1;
      text-align: center;
      h3 { font-size: 2rem; }
      .preview-text {
        -webkit-line-clamp: 4;
      }
    }
  }

  .grid-b {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-c {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }

  .grid-d {
    display: flex;
    flex-direction: column;
    gap: 1rem;
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
