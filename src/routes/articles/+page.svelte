<script lang="ts">
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import languages from "../../components/systems/inputs/Language/languages.ts";
    import ThemeChanger from "../../components/ThemeChanger/ThemeChanger.svelte";
    import PlainText from "../../components/systems/inputs/PlainText/PlainText.svelte";
    import store from "../../components/store.ts";

  let articleHolder: any = null;
  let articles: any[] = [];
  let error: string | null = null;
  let search = "";

  onMount(async () => {
    const holder = $page.url.searchParams.get("holder");
    if (holder) {
      try {
        const response = await fetch(`${$store.apiURL}/articles/${holder}`);
        if (response.ok) {
          articleHolder = await response.json();
          fetchArticles();
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
    const articlePromises = allArticleIds.map(async (id) => {
      const response = await fetch(`http://localhost:8000/article/${id}`);
      const article = await response.json();
      return { ...article, id };
    });
    articles = await Promise.all(articlePromises);
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
  }, {});

  function getFlag(langCode: string) {
    const lang = languages.find((l) => l.code === langCode);
    return lang ? lang.flag : "";
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
        {#each articlesInLang as article}
          <a href={`/article?q=${article.id}`} class="article-card">
            <h3>{getPreview(article.content)}...</h3>
            <p>{article.creation}</p>
          </a>
        {/each}
      </div>
    {/each}
  {:else}
    <p>Loading...</p>
  {/if}
</div>

<style lang="scss">
  @use "../styles/everything.scss";

  .articles-page {
    padding: 2rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 1rem;
  }

  .article-card {
    border: 1px solid #ccc;
    padding: 1rem;
    border-radius: 8px;
    text-decoration: none;
    color: var(--color-background);
    transition: all 0.2s ease-in-out;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
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
</style>
