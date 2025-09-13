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
  import SmoothScrollWrapper from "../../components/SmoothScrollWrapper/SmoothScrollWrapper.svelte";
  import SoftTitle from "../../components/SoftTitle/SoftTitle.svelte";
    import { isDarkTheme, themeIndex } from "../../components/ThemeChanger/theme-store";

  /* ────────────────── types ─────────────────── */
  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
  }
  interface Group {
    withImages: Article[];
    withoutImages: Article[];
  }

  /* ─────────────── state ─────────────── */
  let articleHolder: any = null;
  let showModal = writable(false);
  let selectedArticle: Article | null = null;
  let articles: Article[] = [];
  let error: string | null = null;
  let search = "";
  let currentId = writable();
  const ITEMS_PER_PAGE = 10;

  /* ───────────── utilities ───────────── */
  function getImage(html: string) {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.querySelector("img") as HTMLImageElement | null;
  }
  const hasImage = (c: string) => !!getImage(c);

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

  const getFlag = (code: string) =>
    languages.find((l) => l.code === code)?.flag || "";

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
    let article = articles.find((a) => a.id === id);
    if (!article) {
      article = await fetchSingleArticle(id);
      if (!article) return;
    }
    openArticle(article);
  }

  /* ───────────── data fetching ───────────── */
  async function fetchSingleArticle(id: string): Promise<Article | null> {
    try {
      const r = await fetch(`${$store.apiURL()}/article/${id}`);
      if (!r.ok) return null;
      const a = await r.json();
      const article = { ...a, id } as Article;
      if (!articles.some((art) => art.id === id)) {
        articles = [...articles, article];
        currentId.set(id);
      }
      return article;
    } catch (err) {
      console.error(`Failed to fetch article ${id}: ${err}`);
      return null;
    }
  }

  /* ───────────── initial load ───────────── */
  onMount(async () => {
    isDarkTheme.set(false)

    const holder = $page.url.searchParams.get("holder");
    if (!holder) {
      error = "No article holder specified.";
      return;
    }

    const deepLinkedId = $page.url.searchParams.get("article");

    try {
      const resp = await fetch(`${$store.apiURL()}/articles/${holder}`);
      if (!resp.ok) throw new Error("holder fetch failed");
      articleHolder = Object.fromEntries(
        Object.entries(await resp.json()).map(([k, v]) => [k, v.reverse()])
      );

      const ids: string[] = Object.values(articleHolder).flat();

      if (deepLinkedId && ids.includes(deepLinkedId)) {
        await openArticleById(deepLinkedId);
      }

      ids
        .filter((id) => id !== deepLinkedId)
        .forEach((id) => fetchSingleArticle(id));
    } catch {
      error = "Error fetching article list.";
    }
  });

  /* ───────────── derived stores ───────────── */
  $: filteredArticles = articles.filter((a) =>
    a.content.toLowerCase().includes(search.toLowerCase())
  );

  $: groupedArticles = filteredArticles.reduce((acc, a) => {
    const lang = a.language || "unknown";
    if (!acc[lang]) acc[lang] = { withImages: [], withoutImages: [] } as Group;
    hasImage(a.content) ? acc[lang].withImages.push(a) : acc[lang].withoutImages.push(a);
    return acc;
  }, {} as Record<string, Group>);
</script>

<ThemeChanger visible={false} />

<SmoothScrollWrapper>
  <SoftTitle text={$currentId ?? "Newsletter"} />

  <div class="articles-page">
    <h1>Articles</h1>
    <PlainText bind:value={search} placeholder="Search articles..." />

    {#if error}
      <p class="error">{error}</p>
    {:else if articles.length === 0}
      <p>Loading...</p>
    {:else}
      {#each Object.entries(groupedArticles) as [language, group]}
        <!-- WITH IMAGES -->
        {#if group.withImages.length}
          <Pagination {ITEMS_PER_PAGE} items={group.withImages} let:pageItems>
            <h2 class="articles-flag">{getFlag(language)} {language}</h2>
            <div class="articles-grid">
              {#each pageItems as article (article.id)}
                <button class="article-card" on:click={() => openArticle(article)}>
                  <!-- replaced <img> with background div -->
                  <div
                    class="img bg-img"
                    role="img"
                    aria-label={getImage(article.content)?.alt || ""}
                    style={`background-image:url('${getImage(article.content)?.src || "placeholder.jpg"}');`}
                  ></div>

                  <h3>{getTitle(article.content)}</h3>
                  <div>
                    <o>{getPreview(noH1(article.content))}...</o>
                  </div>
                  <p><sup>{article.creation}</sup></p>
                </button>
              {/each}
            </div>
          </Pagination>
        {/if}

        <!-- WITHOUT IMAGES -->
        {#if group.withoutImages.length}
          <Pagination {ITEMS_PER_PAGE} items={group.withoutImages} let:pageItems>
            <ul class="articles-list">
              {#each pageItems as article (article.id)}
                <li>
                  <button class="article-card no-img" on:click={() => openArticle(article)}>
                    <h3>{getTitle(article.content)}</h3>
                    <p>{getPreview(article.content)}</p>
                    <small>{article.creation}</small>
                  </button>
                </li>
              {/each}
            </ul>
          </Pagination>
        {/if}
      {/each}
    {/if}
  </div>

  <p class="loading-articles">{$currentId}</p>
</SmoothScrollWrapper>

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
    /* object-fit only affects real <img>; harmless for <div> */
    object-fit: cover;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed; /* keep background fixed on scroll */
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
    place-items: start;
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

      /* shared hover effect for img / bg-img */
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
