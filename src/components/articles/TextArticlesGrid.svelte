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
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} aria-current={article.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <h3>{@html sanitizeHtml(article.title)}</h3>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <p class="preview-text">{@html sanitizeHtml(getPreview(noH1(article.content)))}</p>
        </div>
      {/each}
    </div>
  {/if}
  {#if textSlice2.length > 0}
    <div class="text-grid-wrapper grid-b">
      {#each textSlice2 as article (article.id)}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} aria-current={article.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
  {#if textSlice3.length > 0}
    <div class="text-grid-wrapper grid-c">
      {#each textSlice3 as article (article.id)}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} aria-current={article.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
  {#if textSlice4.length > 0}
    <div class="text-grid-wrapper grid-d">
      {#each textSlice4 as article (article.id)}
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        <div class="text-card" class:selected={article.id === $selectedArticle?.id} aria-current={article.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(article)} on:keydown={(e) => onKey(e, article)}><h4>{@html sanitizeHtml(article.title)}</h4></div>
      {/each}
    </div>
  {/if}
</section>

<style lang="scss">
  /* Text-only stories in a typographic grid: no boxes inside boxes, hairlines between items. */
  .text-articles-section {
    padding: var(--space-7) 0;
    margin-bottom: var(--space-9);
    border-top: 1px solid var(--text-1);
  }

  .text-grid-wrapper {
    display: grid;
    gap: var(--space-4) var(--space-6);
    margin-bottom: var(--space-6);

    .text-card {
      position: relative;
      box-sizing: border-box;
      min-width: 0;
      padding: var(--space-5);
      background: var(--surface-0);
      border: 1px solid var(--border-1);
      border-radius: var(--radius-lg);
      cursor: pointer;
      overflow-wrap: break-word;
      box-shadow: none;
      transition:
        transform var(--t-out) var(--ease-out),
        border-color var(--t-out) var(--ease-out);

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          box-shadow: none;
          border-color: var(--border-2);
          transform: translateY(-2px);
          transition-duration: var(--t-in);
        }
      }

      &:active {
        transform: scale(0.99);
        transition-duration: 60ms;
      }

      &:focus-visible {
        box-shadow: none;
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
      }
    }

    /* The open article: ink border plus a dot, not color alone. */
    .selected {
      border-color: var(--text-1);

      h3::before,
      h4::before {
        content: "";
        display: inline-block;
        width: 0.4em;
        height: 0.4em;
        margin-inline-end: 0.4em;
        vertical-align: middle;
        border-radius: var(--radius-full);
        background: currentColor;
      }
    }

    h3,
    h4 {
      margin: 0;
      font-family: var(--font-display);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-tight);
      letter-spacing: var(--tracking-tight);
      color: var(--text-1);
      text-wrap: balance;
    }

    h3 {
      font-size: var(--fs-xl);
    }

    h4 {
      font-size: var(--fs-md);
    }
  }

  .grid-a {
    grid-template-columns: 1fr 1fr;

    .text-card:first-child {
      grid-column: 1 / -1;
      padding: var(--space-7) var(--space-6);

      h3 {
        max-width: 24ch;
        font-size: var(--step-chapter);
        line-height: var(--lh-display);
        letter-spacing: var(--tracking-display);
      }

      .preview-text {
        max-width: 60ch;
        font-size: var(--fs-lg);
        -webkit-line-clamp: 4;
        line-clamp: 4;
      }
    }
  }

  .grid-b {
    grid-template-columns: repeat(3, 1fr);
  }

  .grid-c {
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr));
  }

  .grid-d {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }

  .preview-text {
    margin: var(--space-3) 0 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  @media (max-width: 767px) {
    .grid-a,
    .grid-b {
      grid-template-columns: 1fr;
    }

    .grid-a .text-card:first-child {
      padding: var(--space-5);

      h3 {
        font-size: var(--fs-2xl);
      }
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .text-grid-wrapper .text-card {
      transform: none !important;
    }
  }
</style>
