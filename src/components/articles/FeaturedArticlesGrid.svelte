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
    <div class="main-article" class:selected={mainArticle.id === $selectedArticle?.id} aria-current={mainArticle.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(mainArticle)} on:keydown={(e) => onKey(e, mainArticle)}>
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
      <div class="secondary-article" class:selected={secondaryArticle1.id === $selectedArticle?.id} aria-current={secondaryArticle1.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(secondaryArticle1)} on:keydown={(e) => onKey(e, secondaryArticle1)}>
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
      <div class="secondary-article" class:selected={secondaryArticle2.id === $selectedArticle?.id} aria-current={secondaryArticle2.id === $selectedArticle?.id ? "true" : undefined} aria-haspopup="dialog" role="button" tabindex="0" on:click={() => openArticle(secondaryArticle2)} on:keydown={(e) => onKey(e, secondaryArticle2)}>
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
  /* Editorial cover grid: one lead story, two side stories. Each card opens the article. */
  .image-container {
    overflow: hidden;
    border-radius: var(--radius-lg);
    background: var(--surface-2);
    aspect-ratio: 3 / 2;
    flex: 1;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-reveal) var(--ease-out);
    }
  }

  .featured-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: var(--space-7) var(--space-6);
    padding: var(--space-6) 0;
    margin-bottom: var(--space-9);
    align-items: stretch;

    &.rearranged {
      .main-article { order: calc(1 - var(--order, 0)); }
      .secondary-articles { order: calc(0 + var(--order, 0)); }
    }

    .main-article,
    .secondary-article {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: var(--space-4);
      min-height: 200px;
      padding: var(--space-3);
      border: 1px solid transparent;
      border-radius: var(--radius-xl);
      cursor: pointer;
      box-shadow: none;
      transition:
        transform var(--t-out) var(--ease-out),
        border-color var(--t-out) var(--ease-out),
        background-color var(--t-out) var(--ease-out);

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          box-shadow: none;
          border-color: var(--border-1);
          transform: translateY(-2px);
          transition-duration: var(--t-in);

          img {
            transform: scale(1.03);
          }
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

    /* The open article: border plus a dot before the title, not color alone. */
    .selected {
      border-color: var(--text-1);
      background: var(--surface-1);

      h2::before,
      h3::before {
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

    h2,
    h3 {
      margin: 0;
      font-family: var(--font-display);
      font-weight: var(--fw-semibold);
      line-height: var(--lh-tight);
      color: var(--text-1);
      text-wrap: balance;
    }

    h2 {
      font-size: var(--fs-3xl);
      line-height: var(--lh-display);
      letter-spacing: var(--tracking-display);
    }

    h3 {
      font-size: var(--fs-xl);
      letter-spacing: var(--tracking-tight);
    }

    .main-article .preview-text {
      font-size: var(--fs-md);
      -webkit-line-clamp: 4;
      line-clamp: 4;
    }

    .secondary-articles {
      display: flex;
      flex-direction: column;
      gap: var(--space-5);
    }

    .secondary-article {
      flex: 1;

      .preview-text {
        -webkit-line-clamp: 2;
        line-clamp: 2;
      }
    }
  }

  .text-content {
    display: grid;
    gap: var(--space-2);
  }

  .preview-text {
    margin: 0;
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
    .featured-grid {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 768px) {
    .featured-grid .main-article .preview-text {
      -webkit-line-clamp: 10;
      line-clamp: 10;
    }

    .featured-grid.rearranged .main-article .preview-text {
      -webkit-line-clamp: 15;
      line-clamp: 15;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .featured-grid .main-article,
    .featured-grid .secondary-article,
    .image-container img {
      transform: none !important;
    }
  }
</style>
