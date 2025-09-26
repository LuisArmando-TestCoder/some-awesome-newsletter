<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let articles: Article[] = [];
  export let rearranged = false;
  export let order = 0;

  const dispatch = createEventDispatcher();

  interface Article {
    id: string;
    content: string;
    creation: string;
    language: string;
  }

  function getImage(html: string) {
    if (typeof document === "undefined") return null;
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.querySelector("img") as HTMLImageElement | null;
  }

  function getTitle(html: string) {
    if (typeof document === "undefined") return "Article";
    const div = document.createElement("div");
    div.innerHTML = html;
    const h1 = div.querySelector("h1")?.innerText;
    const h2 = div.querySelector("h2")?.innerText;
    return h1 || h2 || "Article";
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

  function openArticle(article: Article) {
    dispatch("open", article);
  }

  $: mainArticle = articles[0];
  $: secondaryArticle1 = articles[1];
  $: secondaryArticle2 = articles[2];
</script>

<section class="featured-grid" class:rearranged style="--order: {order}">
  {#if mainArticle}
    <div class="main-article" on:click={() => openArticle(mainArticle)}>
      <div class="image-container"><img src={getImage(mainArticle.content)?.src} alt={getTitle(mainArticle.content)} /></div>
      <div class="text-content">
        <h2>{getTitle(mainArticle.content)}</h2>
        <p class="preview-text">{getPreview(noH1(mainArticle.content))}</p>
      </div>
    </div>
  {/if}
  <div class="secondary-articles">
    {#if secondaryArticle1}
      <div class="secondary-article" on:click={() => openArticle(secondaryArticle1)}>
        <div class="image-container"><img src={getImage(secondaryArticle1.content)?.src} alt={getTitle(secondaryArticle1.content)} /></div>
        <div class="text-content">
          <h3>{getTitle(secondaryArticle1.content)}</h3>
          <p class="preview-text">{getPreview(noH1(secondaryArticle1.content))}</p>
        </div>
      </div>
    {/if}
    {#if secondaryArticle2}
      <div class="secondary-article" on:click={() => openArticle(secondaryArticle2)}>
        <div class="image-container"><img src={getImage(secondaryArticle2.content)?.src} alt={getTitle(secondaryArticle2.content)} /></div>
        <div class="text-content">
          <h3>{getTitle(secondaryArticle2.content)}</h3>
          <p class="preview-text">{getPreview(noH1(secondaryArticle2.content))}</p>
        </div>
      </div>
    {/if}
  </div>
</section>

<style lang="scss">
  :root {
    --border-radius: 12px;
    --transition-speed: 0.3s;
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
      gap: 2rem;
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

  .preview-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
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
      }
    }

    .featured-grid.rearranged .main-article .preview-text {
      -webkit-line-clamp: 15;
    }
  }
</style>
