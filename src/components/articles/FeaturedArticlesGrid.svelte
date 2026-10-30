<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
  import type { Writable } from "svelte/store";

  export let articles: Article[] = [];
  export let rearranged = false;
  export let order = 0;
  export let selectedArticle: Writable<Article | null>;

  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
    title: string;
  }

  function getImage(html: string) {
    if (typeof document === "undefined") return null;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.querySelector("img") as HTMLImageElement | null;
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

  $: mainArticle = articles[0];
  $: secondaryArticle1 = articles[1];
  $: secondaryArticle2 = articles[2];
</script>

<section class="featured-grid" class:rearranged style="--order: {order}">
  {#if mainArticle}
    <div class="main-article" class:selected={mainArticle.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(mainArticle)} on:keydown={(e) => onKey(e, mainArticle)}>
      <div class="image-container"><img src={getImage(mainArticle.content)?.src} alt={mainArticle.title} /></div>
      <div class="text-content">
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        <h2>{@html sanitizeHtml(mainArticle.title)}</h2>
        <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
        <p class="preview-text">{@html sanitizeHtml(getPreview(noH1(mainArticle.content)))}</p>
      </div>
    </div>
  {/if}
  <div class="secondary-articles">
    {#if secondaryArticle1}
      <div class="secondary-article" class:selected={secondaryArticle1.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(secondaryArticle1)} on:keydown={(e) => onKey(e, secondaryArticle1)}>
        <div class="image-container"><img src={getImage(secondaryArticle1.content)?.src} alt={secondaryArticle1.title} /></div>
        <div class="text-content">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <h3>{@html sanitizeHtml(secondaryArticle1.title)}</h3>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <p class="preview-text">{@html sanitizeHtml(getPreview(noH1(secondaryArticle1.content)))}</p>
        </div>
      </div>
    {/if}
    {#if secondaryArticle2}
      <div class="secondary-article" class:selected={secondaryArticle2.id === $selectedArticle?.id} role="button" tabindex="0" on:click={() => openArticle(secondaryArticle2)} on:keydown={(e) => onKey(e, secondaryArticle2)}>
        <div class="image-container"><img src={getImage(secondaryArticle2.content)?.src} alt={secondaryArticle2.title} /></div>
        <div class="text-content">
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <h3>{@html sanitizeHtml(secondaryArticle2.title)}</h3>
          <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
          <p class="preview-text">{@html sanitizeHtml(getPreview(noH1(secondaryArticle2.content)))}</p>
        </div>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">

  .image-container {
    overflow: hidden;
    border-radius: var(--radius-lg, 16px);
    flex: 1;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-slow, 320ms) ease;
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 2rem;
    padding: 2rem;
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
      cursor: pointer;
      border: 2px solid transparent;
      transition: border-color 0.3s ease;
    }

    .selected {
      border-color: var(--accent, #2563eb);
    }

    .main-article {
      .preview-text {
        -webkit-line-clamp: 4;
        line-clamp: 4;
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
      gap: 2rem;
      .preview-text {
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }
      &:hover {
        img {
          transform: scale(1.05);
        }
      }
    }
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
    .featured-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 768px) {
    .featured-grid .main-article {
      gap: 2rem;
      .preview-text {
        -webkit-line-clamp: 10;
        line-clamp: 10;
      }
    }

    .featured-grid.rearranged .main-article .preview-text {
      -webkit-line-clamp: 15;
      line-clamp: 15;
    }
  }
  [role="button"]:focus-visible {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 2px;
  }
</style>
