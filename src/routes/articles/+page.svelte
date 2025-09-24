<script lang="ts">
  /* ─────────────────── imports ─────────────────── */
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import languages from "../../components/systems/inputs/Language/languages";
  import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
  import PlainText from "../../components/systems/inputs/PlainText/PlainText.svelte";
  import Pagination from "../../components/Pagination/Pagination.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import store from "../../components/store";
  import SoftTitle from "../../components/SoftTitle/SoftTitle.svelte";
  import NewsCard from "../../components/NewsCard/NewsCard.svelte";
  import { isDarkTheme } from "../../components/ThemeChanger/theme-store";
  import Tabs from "../../lib/ui/molecules/Tabs.svelte";

  /* ────────────────── types ─────────────────── */
  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
  }

  /* ─────────────── state ─────────────── */
  let groupedArticles: Record<string, any> = {};
  let showModal = writable(false);
  let selectedArticle: Article | null = null;
  let error: string | null = null;
  let search = "";
  let currentId = writable();
  const ITEMS_PER_PAGE = 10;
  let languagePages = new Map<string, number>();
  let holder = "";
  let activeTab = "";
  let loading = false;

  async function fetchArticles(holder: string) {
    const pageParams = new URLSearchParams();
    languagePages.forEach((page, lang) => {
      if (page) {
        pageParams.set(`page_${lang}`, page.toString());
      }
    });

    loading = true;
    try {
      const resp = await fetch(
        `${$store.apiURL()}/articles/${holder}?${pageParams.toString()}&size=${ITEMS_PER_PAGE}`
      );
      if (!resp.ok) throw new Error("holder fetch failed");
      const data = await resp.json();
      groupedArticles = data.articles || {};
      if (!activeTab && Object.keys(groupedArticles).length) {
        activeTab = Object.keys(groupedArticles)[0];
      }
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
    return h1 ? (h1.length >= (h2?.length || 0) ? h1 : h2) : h2 || "Article";
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
    return div.innerText.trim().replace(/\s+/g, " ").split(" ").slice(0, 10).join(" ");
  }

  const getFlag = (code: string | undefined) =>
    languages.find((l) => l.code === code)?.flag ?? "";

  /* ────────── navigation helpers ────────── */
  function updateURLParam(id: string | null) {
    const url = new URL($page.url);
    id ? url.searchParams.set("article", id) : url.searchParams.delete("article");
    goto(`/articles?${url.searchParams.toString()}`, { replaceState: true });
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
    isDarkTheme.set(false);

    const holderParam = $page.url.searchParams.get("holder");
    if (!holderParam) {
      error = "No article holder specified.";
      return;
    }
    holder = holderParam;

    const deepLinkedId = $page.url.searchParams.get("article");

    if (deepLinkedId) {
      await openArticleById(deepLinkedId);
    } else {
      await fetchArticles(holder);
    }
  });
</script>

<ThemeChanger visible={false} />

<SoftTitle text={$currentId?.toString() ?? "Newsletter"} />

<div class="articles-page">
  <h1>Articles</h1>
  <Tabs items={Object.keys(groupedArticles)} bind:activeItem={activeTab}>
    <div slot="item" let:item>
      {getFlag(item)} {item}
    </div>
  </Tabs>
  <PlainText bind:value={search} placeholder="Search articles..." />


  {#if error}
    <p class="error">{error}</p>
  {:else if !Object.keys(groupedArticles).length}
    <p>Loading...</p>
  {:else}
    {#each Object.entries(groupedArticles) as [language, group]}
      {#if activeTab === language}
        <!-- WITH IMAGES -->
        {#if group.withImages.length}
          <div class="articles-grid">
            {#each group.withImages as article (article.id)}
              <NewsCard
                imageSrc={getImage(article.content)?.src ?? "placeholder.jpg"}
                imageAlt={getImage(article.content)?.alt ?? ""}
                title={getTitle(article.content) ?? "Article"}
                excerpt={getPreview(noH1(article.content))}
                link={`/articles?holder=${holder}&article=${article.id}`}
                on:click={() => openArticle(article)}
                loading={loading}
              />
            {/each}
          </div>
          <Pagination
            currentPage={languagePages.get(language) || 0}
            totalItems={group.totalWithImages}
            pageSize={ITEMS_PER_PAGE}
            on:pageChange={(e) => handlePageChange(language, e)}
          />
        {/if}

        <!-- WITHOUT IMAGES -->
        {#if group.withoutImages.length}
          <ul class="articles-list">
            {#each group.withoutImages as article (article.id)}
              <li>
                <NewsCard
                  imageSrc={"placeholder.jpg"}
                  imageAlt={""}
                  title={getTitle(article.content) ?? "Article"}
                  excerpt={getPreview(noH1(article.content))}
                  link={`/articles?holder=${holder}&article=${article.id}`}
                  on:click={() => openArticle(article)}
                  loading={loading}
                />
              </li>
            {/each}
          </ul>
          <Pagination
            currentPage={languagePages.get(language) || 0}
            totalItems={group.totalWithoutImages}
            pageSize={ITEMS_PER_PAGE}
            on:pageChange={(e) => handlePageChange(language, e)}
          />
        {/if}
      {/if}
    {/each}
  {/if}
</div>

<p class="loading-articles">{$currentId}</p>

<!-- ───────────── modal ───────────── -->
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
  @use "../styles/everything.scss";

  .loading-articles {
    text-align: right;
    text-wrap: wrap;
    padding: 1rem;
  }

  .articles-flag {
    padding-top: 3rem;
  }

  .img,
  .bg-img {
    width: 100%;
    height: 200px;
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    transition: 0.35s;
    border: 0.1px solid;
  }

  .articles-page {
    padding: 2rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 2rem;
    grid-auto-rows: 380px; /* Adjust this value as needed */
  }

  .articles-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-bottom: 2rem;
    padding: 0;
  }

  .article-card {
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;
    color: var(--color-background);
    transition: all 0.2s ease-in-out;

    &:hover {
      text-decoration: underline;

      .img,
      .bg-img {
        transform: translate(5px, 5px);
        box-shadow: -5px -5px var(--color-background);
      }
    }
  }

  .no-img {
    padding: 0 0 1rem;

    &:hover {
      border: 0.1px solid;
      transform: translate(-5px, -5px);
      box-shadow: 5px 5px var(--color-background);
      padding: 0 1rem 1rem;
    }
  }

  .error {
    color: red;
  }

  .modal-content-inner {
    background: white;
    color: black;
    padding: 20px;
    max-height: 80vh;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h2 {
    margin-top: 0;
  }
</style>
