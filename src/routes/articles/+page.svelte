<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import languages from "../../components/systems/inputs/Language/languages.ts";
  import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
  import PlainText from "../../components/systems/inputs/PlainText/PlainText.svelte";
  import Modal from "../../components/Modal/Modal.svelte";
  import store from "../../components/store.ts";

  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
  }

  let articleHolder: any = null;
  let showModal = false;
  let selectedArticle: Article | null = null;
  let articles: Article[] = [];
  let error: string | null = null;
  let search = "";

  onMount(async () => {
    const holder = $page.url.searchParams.get("holder");
    if (holder) {
      try {
        const response = await fetch(`${$store.apiURL()}/articles/${holder}`);
        if (response.ok) {
          articleHolder = await response.json();
          fetchArticles();
          const articleId = $page.url.searchParams.get("article");
          if (articleId) {
            const article = articles.find(a => a.id === articleId);
            if (article) {
              selectedArticle = article;
              showModal = true;
            }
          }
        } else {
          error = "Article holder not found.";
        }
      } catch (e) {
        error = "Error fetching article holder.";
      }
    } else {
      error = "No article holder specified.";
    }
  });

  async function fetchArticles() {
    const allArticleIds = Object.values(articleHolder).flat();
    for (const id of allArticleIds) {
      fetch(`${$store.apiURL()}/article/${id}`)
        .then((response) => response.json())
        .then((article) => {
          articles = [...articles, { ...article, id }];
        });
    }
  }

  function getImage(content: string) {
    const div = document.createElement("div");

    div.innerHTML = content;

    const img = div.querySelector("img");

    return img;
  }

  function getTitle(content: string) {
    const div = document.createElement("div");

    div.innerHTML = content;

    const h1 = div.querySelector("h1")?.innerText
    const h2 = div.querySelector("h2")?.innerText

    const title = h1 ? (
      (h1.length > (h2?.length || 0)) ? h1 : h2
    ) : h2;

    return title;
  }

  function getPreview(content: string) {
    const div = document.createElement("div");
    div.innerHTML = content;

    return div.innerText.trim().replace(/\n/g, " ").replace(/\s+/g, " ").split(" ").slice(0, 20).join(" ");
  }

  $: filteredArticles = articles.filter((article) =>
    article.content.toLowerCase().includes(search.toLowerCase())
  );

  $: groupedArticles = filteredArticles.reduce((acc, article) => {
    const { language } = article;
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(article);
    return acc;
  }, {} as { [key: string]: Article[] });

  function getFlag(langCode: string) {
    const lang = languages.find((l) => l.code === langCode);
    return lang ? lang.flag : "";
  }

  function openArticle(article: Article) {
    selectedArticle = article;
    showModal = true;
    const url = new URL($page.url);
    url.searchParams.set("article", article.id);
    goto(url.toString(), { replaceState: true });
  }

  function closeModal() {
    showModal = false;
    selectedArticle = null;
    const url = new URL($page.url);
    url.searchParams.delete("article");
    goto(url.toString(), { replaceState: true });
  }
</script>

<ThemeChanger visible={false} />

<div class="articles-page">
  <h1>Articles</h1>
  <PlainText bind:value={search} placeholder="Search articles..." />
  {#if error}
    <p class="error">{error}</p>
  {:else if articles.length > 0}
    {#each Object.entries(groupedArticles) as [language, articlesInLang]}
      <h2>{getFlag(language)} {language}</h2>
      <div class="articles-grid">
        {#each articlesInLang as article (article.id)}
          <button on:click={() => openArticle(article)} class="article-card">
            <img class="img" src={getImage(article.content)?.src} alt={getImage(article.content)?.alt}>
            <h3>{getTitle(article.content)}...</h3>
            <p>{article.creation}</p>
          </button>
        {/each}
      </div>
    {/each}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<Modal showModal={showModal} on:close={closeModal}>
  {#if selectedArticle}
    <div class="modal-content-inner">
      {@html selectedArticle.content}
    </div>
  {/if}
</Modal>

<style lang="scss">
  @use "../styles/everything.scss";

  .img {
    width: 100%;
    height: 200px;
    transition: 0.35s;
    object-fit: cover;
    border: .1px solid;
  }

  .articles-page {
    padding: 2rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
    place-items: self-start;
  }

  .article-card {
    border-radius: 8px;
    text-decoration: none;
    color: var(--color-background);
    transition: all 0.2s ease-in-out;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    text-align: left;

    &:hover {
      .img {
        transform: translate(5px, 5px);
        box-shadow: -5px -5px var(--color-background);
      }
    }
  }

  .error {
    color: red;
  }

  input {
    width: 100%;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  
  .modal-content-inner {
      color: black;
  }
</style>
