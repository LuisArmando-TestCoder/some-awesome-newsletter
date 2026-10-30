<script lang="ts">
  import LoadingWheel from "../LoadingWheel/LoadingWheel.svelte";

  export let imageSrc: string;
  export let imageAlt: string;
  export let title: string;
  export let excerpt: string;
  export let readMoreText: string = "Read more";
  export let loading: boolean = false;

  const hasImage = imageSrc && imageSrc !== 'placeholder.jpg';
</script>

{#if loading}
  <div class="news-item news-item--skeleton" aria-hidden="true">
    <div class="news-item-image-wrapper sk"></div>
    <div class="news-item-card">
      <span class="sk sk--title"></span>
      <span class="sk sk--line"></span>
      <span class="sk sk--line sk--short"></span>
    </div>
  </div>
  <span class="sr-only"><LoadingWheel /></span>
{:else}
  <!-- The click handler stays on the card; the title button stretched over it makes it keyboard reachable. -->
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
  <article class="news-item" class:no-image={!hasImage} on:click>
    {#if hasImage}
      <div class="news-item-image-wrapper">
        <img class="news-item-image" src={imageSrc} alt={imageAlt} loading="lazy" decoding="async" />
      </div>
    {/if}
    <div class="news-item-card">
      <div class="news-item-texts">
        <h5 class="news-item-title"><button type="button" class="news-item-link">{title}</button></h5>
        <p class="news-item-desc">{excerpt}</p>
        <span class="more-link" aria-hidden="true">{readMoreText} <span class="more-arrow">&rarr;</span></span>
      </div>
    </div>
  </article>
{/if}

<style lang="scss">
  /* Editorial card: image first, title, two lines, a quiet "Read more". The card lifts 2px and
     its edge darkens on hover; the title button carries keyboard focus for the whole card. */
  .news-item {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    min-width: 0;
    max-width: 100%;
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    overflow: hidden;
    cursor: pointer;
    transition:
      transform var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--border-2);
        transform: translateY(-2px);
        transition-duration: var(--t-in);

        .news-item-image {
          transform: scale(1.03);
        }

        .more-arrow {
          transform: translateX(3px);
        }
      }
    }

    &:active {
      transform: scale(0.99);
      transition-duration: 60ms;
    }

    &:has(.news-item-link:focus-visible) {
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
    }
  }

  .news-item-image-wrapper {
    aspect-ratio: 3 / 2;
    background: var(--surface-2);
    overflow: hidden;
  }

  .news-item-image {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform var(--dur-reveal) var(--ease-out);
  }

  .news-item-card {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--space-2);
    padding: var(--space-5);
  }

  .news-item-texts {
    display: flex;
    flex-direction: column;
    flex: 1;
    gap: var(--space-2);
  }

  .news-item-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: balance;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .news-item-link {
    all: unset;
    cursor: pointer;

    /* Stretched over the whole card. */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    &:focus-visible {
      outline: none;
    }
  }

  .news-item-desc {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .no-image .news-item-desc {
    -webkit-line-clamp: 6;
    line-clamp: 6;
  }

  .more-link {
    margin-top: auto;
    padding-top: var(--space-3);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
  }

  .more-arrow {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }

  /* Loading: the same shape as the card. */
  .news-item--skeleton {
    cursor: default;
  }

  .sk {
    display: block;
    background: var(--surface-2);
    border-radius: var(--radius-sm);
    animation: news-pulse 1.4s var(--ease-in-out) infinite;
  }

  .news-item-image-wrapper.sk {
    border-radius: 0;
  }

  .sk--title {
    height: 1.5rem;
    width: 80%;
    margin-bottom: var(--space-2);
  }

  .sk--line {
    height: 0.875rem;
  }

  .sk--short {
    width: 50%;
  }

  @keyframes news-pulse {
    50% {
      opacity: 0.5;
    }
  }

  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }

  @media (forced-colors: active) {
    .news-item:has(.news-item-link:focus-visible) {
      outline-color: CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .news-item,
    .news-item * {
      transition: none !important;
      animation: none !important;
    }
    .news-item:hover,
    .news-item:active,
    .news-item:hover .news-item-image {
      transform: none;
    }
  }
</style>
