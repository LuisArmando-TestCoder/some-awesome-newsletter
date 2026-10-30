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
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-1, #e5e5e5);
    border-radius: var(--radius-lg, 16px);
    overflow: hidden;
    transition: box-shadow var(--dur-base, 200ms) var(--ease-out, ease-out),
      transform var(--dur-base, 200ms) var(--ease-out, ease-out),
      border-color var(--dur-base, 200ms) var(--ease-out, ease-out);

    &:hover {
      box-shadow: var(--shadow-2, none);
      border-color: var(--border-2, #ccc);
      transform: translateY(-2px);

      img {
        transform: scale(1.03);
      }
    }

    &:focus-within {
      border-color: var(--accent, #2563eb);
    }
  }

  .card__media {
    aspect-ratio: 16 / 9;
    background: var(--surface-2, #f3f3f3);
    overflow: hidden;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-slow, 320ms) var(--ease-out, ease-out);
    }
  }

  .card__body {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
    padding: var(--space-5, 24px);
    flex: 1;
  }

  .card__eyebrow {
    margin: 0;
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-semibold, 600);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--accent, #2563eb);
  }

  .card__title {
    margin: 0;
    font-family: var(--font-display, inherit);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.25);
    color: var(--text-1, #111);
    overflow-wrap: anywhere;
  }

  .card__link {
    color: inherit;
    text-decoration: none;

    /* The whole card is clickable through this one link. */
    &::after {
      content: "";
      position: absolute;
      inset: 0;
    }

    &:focus-visible {
      outline: none;
    }
  }

  .card:has(.card__link:focus-visible) {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 2px;
  }

  .card__excerpt {
    margin: 0;
    color: var(--text-2, #444);
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.55);
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

  .card__meta {
    margin: auto 0 0;
    padding-top: var(--space-2, 8px);
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2, 8px);
    font-size: var(--fs-xs, 0.75rem);
    color: var(--text-3, #777);
  }

  .card--featured {
    @media (min-width: 860px) {
      display: grid;
      grid-template-columns: 3fr 2fr;

      .card__media {
        aspect-ratio: auto;
        min-height: 22rem;
      }

      .card__body {
        padding: var(--space-7, 48px) var(--space-6, 32px);
        justify-content: center;
      }
    }

    .card__title {
      font-size: var(--fs-2xl, 1.75rem);
    }

    .card__excerpt {
      font-size: var(--fs-md, 1rem);
      -webkit-line-clamp: 5;
      line-clamp: 5;
    }
  }

  .card--featured.card--text {
    display: flex;
  }

  @media (prefers-reduced-motion: reduce) {
    .card,
    .card img {
      transition: none;
    }
    .card:hover {
      transform: none;
    }
    .card:hover img {
      transform: none;
    }
  }
</style>
