<script lang="ts">
  import type { Snippet } from "svelte";
  import { t } from "../../lib/i18n/translations";

  interface Props {
    blogName: string;
    homeHref: string;
    subscribeHref: string;
    children: Snippet;
  }

  let { blogName, homeHref, subscribeHref, children }: Props = $props();
</script>

<div class="blog-shell">
  <a class="skip" href="#blog-main">{$t.mainPage?.skipToMainContent ?? "Skip to main content"}</a>
  <header class="topbar">
    <div class="topbar__inner">
      <a class="topbar__name" href={homeHref} aria-label={`${blogName}, ${$t.blog.home}`}>{blogName}</a>
      <a class="btn btn--primary btn--sm" href={subscribeHref}>{$t.blog.subscribe}</a>
    </div>
  </header>

  <main id="blog-main" class="blog-main" tabindex="-1">
    {@render children()}
  </main>

  <footer class="blog-footer">
    <a href="/">{$t.blog.publishedWith}</a>
  </footer>
</div>

<style lang="scss">
  .blog-shell {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--surface-0, #fff);
    color: var(--text-1, #111);
    font-family: var(--font-body, system-ui, sans-serif);
  }

  .skip {
    position: absolute;
    left: var(--space-4, 16px);
    top: calc(-1 * var(--space-10, 128px));
    z-index: 100;
    padding: var(--space-2, 8px) var(--space-4, 16px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #111);
    border-radius: var(--radius-sm, 4px);
    box-shadow: var(--shadow-2, none);

    &:focus {
      top: var(--space-2, 8px);
    }
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: 20;
    background: color-mix(in srgb, var(--surface-0, #fff) 88%, transparent);
    backdrop-filter: saturate(1.4) blur(10px);
    -webkit-backdrop-filter: saturate(1.4) blur(10px);
    border-bottom: 1px solid var(--border-1, #e5e5e5);
  }

  .topbar__inner {
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding: var(--space-3, 12px) var(--space-5, 24px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4, 16px);
  }

  .topbar__name {
    font-family: var(--font-display, inherit);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
    color: var(--text-1, #111);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;

    &:hover {
      color: var(--accent, #2563eb);
    }
  }

  .blog-main {
    flex: 1;
    width: 100%;
    outline: none;
  }

  .blog-footer {
    border-top: 1px solid var(--border-1, #e5e5e5);
    padding: var(--space-6, 32px) var(--space-5, 24px);
    text-align: center;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-3, #777);

    a {
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 0.2em;

      &:hover {
        color: var(--text-1, #111);
      }
    }
  }

  :global(.blog-shell a:focus-visible),
  :global(.blog-shell button:focus-visible),
  :global(.blog-shell input:focus-visible) {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 2px;
  }

  /* Button styles shared by blog pages (primary, secondary, tertiary). */
  :global(.blog-shell .btn) {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    min-height: 2.75rem;
    padding: var(--space-2, 8px) var(--space-5, 24px);
    border-radius: var(--radius-full, 999px);
    border: 1px solid transparent;
    font: inherit;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }
  :global(.blog-shell .btn--sm) {
    min-height: 2.25rem;
    padding: var(--space-1, 4px) var(--space-4, 16px);
    font-size: var(--fs-sm, 0.875rem);
  }
  :global(.blog-shell .btn--primary) {
    background: var(--accent, #2563eb);
    color: var(--accent-contrast, #fff);
  }
  :global(.blog-shell .btn--primary:hover) {
    background: var(--accent-hover, #1d4ed8);
  }
  :global(.blog-shell .btn--secondary) {
    background: var(--surface-1, #fff);
    color: var(--text-1, #111);
    border-color: var(--border-2, #ccc);
  }
  :global(.blog-shell .btn--secondary:hover) {
    background: var(--surface-2, #f5f5f5);
  }
  :global(.blog-shell .link) {
    color: var(--text-link, #2563eb);
    font-weight: var(--fw-medium, 500);
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.blog-shell *) {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
