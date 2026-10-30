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
  /* Public blog reader chrome: a quiet glass bar with the publication name, one ink pill,
     and a whisper of a footer. Editorial restraint; the articles carry the page. */
  .blog-shell {
    min-height: 100vh;
    min-height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .skip {
    position: absolute;
    left: var(--gutter);
    top: calc(-1 * var(--space-10));
    z-index: var(--z-toast);
    padding: var(--space-2) var(--space-4);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    font-weight: var(--fw-medium);
    border-radius: var(--radius-full);
    text-decoration: none;

    &:focus {
      top: var(--space-2);
    }
  }

  .topbar {
    position: sticky;
    top: 0;
    z-index: var(--z-header);
    background: var(--surface-glass);
    backdrop-filter: saturate(1.8) blur(20px);
    -webkit-backdrop-filter: saturate(1.8) blur(20px);
    border-bottom: 1px solid var(--border-1);
  }

  .topbar__inner {
    max-width: var(--container-xl);
    min-height: var(--header-h-condensed);
    margin: 0 auto;
    padding: var(--space-2) var(--gutter);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
  }

  .topbar__name {
    font-family: var(--font-display);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: var(--lh-tight);
    color: var(--text-1);
    text-decoration: none;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    min-width: 0;
    padding-block: var(--space-2);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        text-decoration: underline;
        text-decoration-thickness: 2px;
      }
    }
  }

  .blog-main {
    flex: 1;
    width: 100%;
    outline: none;
  }

  .blog-footer {
    border-top: 1px solid var(--border-1);
    padding: var(--space-7) var(--gutter);
    text-align: center;
    font-size: var(--fs-xs);
    color: var(--text-3);

    a {
      color: inherit;
      text-decoration: underline;
      text-underline-offset: 0.2em;

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          color: var(--text-1);
        }
      }
    }
  }

  :global(.blog-shell a:focus-visible),
  :global(.blog-shell button:focus-visible),
  :global(.blog-shell input:focus-visible),
  :global(.blog-shell select:focus-visible) {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }

  /* Button styles shared by blog pages. Primary is the solid ink pill; nothing else is filled. */
  :global(.blog-shell .btn) {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-5);
    border-radius: var(--radius-full);
    border: 1px solid transparent;
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    line-height: 1;
    text-decoration: none;
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }
  :global(.blog-shell .btn:active) {
    transform: scale(0.97);
    transition-duration: 60ms;
  }
  :global(.blog-shell .btn--sm) {
    min-height: var(--control-h-sm);
    padding: 0 var(--space-4);
    font-size: var(--fs-sm);
  }
  :global(.blog-shell .btn--primary) {
    background: var(--accent);
    color: var(--accent-contrast);
  }
  :global(.blog-shell .btn--secondary) {
    background: var(--surface-0);
    color: var(--text-1);
    border-color: var(--border-2);
  }
  @media (hover: hover) and (pointer: fine) {
    :global(.blog-shell .btn--primary:hover) {
      background: var(--accent-hover);
      transition-duration: var(--t-in);
    }
    :global(.blog-shell .btn--secondary:hover) {
      background: var(--surface-2);
      transition-duration: var(--t-in);
    }
  }
  :global(.blog-shell .btn:focus-visible) {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  :global(.blog-shell .link) {
    color: var(--text-link);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }

  /* On the smallest phones the topbar pill stays reachable without crowding the name. */
  @media (max-width: 22rem) {
    .topbar__inner {
      gap: var(--space-2);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    :global(.blog-shell *) {
      transition: none !important;
      animation: none !important;
    }
  }
</style>
