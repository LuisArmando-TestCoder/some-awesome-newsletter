<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
  import type { Writable } from "svelte/store";

  export let articles: Article[] = [];
  export let selectedArticle: Writable<Article | null>;

  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
    title: string;
  }


  function noH1(content: string) {
    if (typeof document === "undefined") return content;
    const div = document.createElement("div");
    div.innerHTML = content;
    div.querySelector("h1")?.remove();
    div.querySelector("h2")?.remove();
    return div.innerHTML;
  }

  function getPreview(html: string) {
    if (typeof document === "undefined") return "";
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.innerText.trim().replace(/\s+/g, " ");
  }

  function onKey(e: KeyboardEvent, article: Article) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openArticle(article);
    }
  }

  function openArticle(article: Article) {
    selectedArticle.set(article);
  }

  $: quarter = Math.ceil(articles.length / 4);
  $: textSlice1 = articles.slice(0, quarter);
  $: textSlice2 = articles.slice(quarter, quarter * 2);
  $: textSlice3 = articles.slice(quarter * 2, quarter * 3);
  $: textSlice4 = articles.slice(quarter * 3);
</script>

<section class="text-articles-section">
  {#if textSlice1.length > 0}
    <div class="text-grid-wrapper grid-a">
      {#each textSlice1 as article (article.id)}
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}>
          <h3>{@html sanitizeHtml(article.title)}</h3>
          <p class="preview-text">{@html sanitizeHtml(getPreview(noH1(article.content)))}</p>
        </div>
      {/each}
    </div>
  {/if}
  {#if textSlice2.length > 0}
    <div class="text-grid-wrapper grid-b">
      {#each textSlice2 as article (article.id)}
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
  {#if textSlice3.length > 0}
    <div class="text-grid-wrapper grid-c">
      {#each textSlice3 as article (article.id)}
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
  {#if textSlice4.length > 0}
    <div class="text-grid-wrapper grid-d">
      {#each textSlice4 as article (article.id)}
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
</section>

<style lang="scss">

  .text-articles-section {
    background-color: var(--surface-2, #f9f9f9);
    padding: 3rem 2rem;
    border-radius: var(--radius-lg, 16px);
    margin-bottom: 4rem;
  }

  .text-grid-wrapper {
    display: grid;
    gap: 1.5rem;
    margin-bottom: 2rem;
    
    .text-card {
      background: var(--surface-1, #fff);
      padding: 1.5rem;
      border: 1px solid var(--border-1, #eee);
      border-radius: var(--radius-lg, 16px);
      cursor: pointer;
      transition: all var(--dur-slow, 320ms) ease;
      box-sizing: border-box;
      min-width: 0;
      overflow-wrap: break-word;
      border: 2px solid transparent;
      transition: all var(--dur-slow, 320ms) ease;
      &:hover {
        transform: translateY(-5px);
        box-shadow: var(--shadow-2, none);
      }
    }
    .selected {
      border-color: var(--accent, #2563eb);
    }
  }

  .grid-a {
    grid-template-columns: 1fr 1fr;
    .text-card:first-child {
      grid-column: 1 / -1;
      text-align: center;
      h3 { font-size: var(--fs-2xl, 2rem); }
      .preview-text {
        -webkit-line-clamp: 4;
        line-clamp: 4;
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

  .preview-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 767px) {
    .text-articles-section {
      padding: 2rem 1rem;
    }
    .grid-a,
    .grid-b {
      grid-template-columns: 1fr;
    }
    .grid-a .text-card:first-child h3 {
      font-size: var(--fs-xl, 1.5rem);
    }
  }
  [role="button"]:focus-visible {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 2px;
  }
</style>
