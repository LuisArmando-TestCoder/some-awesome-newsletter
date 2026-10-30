<script lang="ts">
  import { t } from "../../lib/i18n/translations";
  import { fmt, formatDate, type BlogCard } from "./blog";

  interface Props {
    card: BlogCard;
    href: string;
    variant?: "featured" | "default";
    headingLevel?: 2 | 3;
    eager?: boolean;
  }

  let { card, href, variant = "default", headingLevel = 3, eager = false }: Props = $props();

  let imageFailed = $state(false);
  const showImage = $derived(!!card.imageUrl && !imageFailed);
  const date = $derived(formatDate(card.isoDate, card.language || "en"));
</script>

<article class="card card--{variant}" class:card--text={!showImage} lang={card.language || undefined}>
  {#if showImage}
    <div class="card__media">
      <img
        src={card.imageUrl}
        alt=""
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        onerror={() => (imageFailed = true)}
      />
    </div>
  {/if}
  <div class="card__body">
    {#if variant === "featured"}
      <p class="card__eyebrow">{$t.blog.featured}</p>
    {/if}
    <svelte:element this={`h${headingLevel}`} class="card__title">
      <a {href} class="card__link">{card.title}</a>
    </svelte:element>
    {#if card.excerpt}
      <p class="card__excerpt">{card.excerpt}</p>
    {/if}
    <p class="card__meta">
      {#if date}<time datetime={card.isoDate}>{date}</time>{/if}
      {#if date && card.minutes}<span aria-hidden="true">·</span>{/if}
      {#if card.minutes}<span>{fmt($t.blog.minRead, { n: card.minutes })}</span>{/if}
    </p>
  </div>
</article>

<style lang="scss">
  /* Editorial card: image first, confident title, quiet meta. One real link stretched over
     the whole card; hover lifts 2px and darkens the edge; press settles to .99. */
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition:
      transform var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--border-2);
        transform: translateY(-2px);
        transition-duration: var(--t-in);

        img {
          transform: scale(1.03);
        }

        .card__link {
          text-decoration-color: currentColor;
        }
      }
    }

    &:active {
      transform: scale(0.99);
      transition-duration: 60ms;
    }
  }

  .card__media {
    aspect-ratio: 3 / 2;
    background: var(--surface-2);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-reveal) var(--ease-out);
    }
  }

  .card__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-5) var(--space-5);
    flex: 1;
  }

  .card__eyebrow {
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  .card__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: balance;
    overflow-wrap: anywhere;
  }

  .card__link {
    color: inherit;
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.15em;
    text-decoration-color: transparent;
    transition: text-decoration-color var(--t-out) var(--ease-out);

    /* The whole card is clickable through this one link. */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
      z-index: 1;
    }

    &:focus-visible {
      outline: none;
    }
  }

  .card:has(.card__link:focus-visible) {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }

  .card__excerpt {
    margin: 0;
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
  }

  .card--text .card__excerpt {
    -webkit-line-clamp: 6;
    line-clamp: 6;
  }

  .card--text .card__body {
    padding-top: var(--space-6);
  }

  .card__meta {
    margin: auto 0 0;
    padding-top: var(--space-2);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
    font-size: var(--fs-xs);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }

  /* Featured: a cover story. Big image, display-size title. */
  .card--featured {
    border-radius: var(--radius-2xl);

    @media (min-width: 860px) {
      display: grid;
      grid-template-columns: 3fr 2fr;

      .card__media {
        aspect-ratio: auto;
        min-height: 28rem;
      }

      .card__body {
        padding: var(--space-8) var(--space-7);
        justify-content: center;
        gap: var(--space-4);
      }
    }

    .card__title {
      font-size: var(--step-chapter);
      line-height: var(--lh-display);
      letter-spacing: var(--tracking-display);
    }

    .card__excerpt {
      font-size: var(--fs-lg);
      line-height: var(--lh-snug);
      -webkit-line-clamp: 4;
      line-clamp: 4;
    }
  }

  .card--featured.card--text {
    display: flex;

    .card__body {
      padding: var(--space-8) var(--space-7);
    }
  }

  @media (max-width: 30rem) {
    .card--featured .card__body,
    .card--featured.card--text .card__body {
      padding: var(--space-5);
    }
  }

  @media (forced-colors: active) {
    .card:has(.card__link:focus-visible) {
      outline-color: CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card img {
      transition: none;
    }
    .card:hover,
    .card:active,
    .card:hover img {
      transform: none;
    }
  }
</style>
