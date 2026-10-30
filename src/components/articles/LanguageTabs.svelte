<script lang="ts">
  import { t } from "../../lib/i18n/translations";
  import { languageName, type BlogLanguageInfo } from "./blog";

  interface Props {
    languages: BlogLanguageInfo[];
    active: string;
    hrefFor: (code: string) => string;
  }

  let { languages, active, hrefFor }: Props = $props();
</script>

{#if languages.length > 1}
  <nav class="tabs" aria-label={$t.blog.languages}>
    <ul>
      {#each languages as l (l.code)}
        <li>
          <a
            href={hrefFor(l.code)}
            class:active={l.code === active}
            aria-current={l.code === active ? "page" : undefined}
            hreflang={l.code}
            data-sveltekit-noscroll
          >
            {languageName(l.code)}
            <span class="count">{l.total}</span>
          </a>
        </li>
      {/each}
    </ul>
  </nav>
{/if}

<style lang="scss">
  .tabs {
    overflow-x: auto;
    scrollbar-width: none;
    border-bottom: 1px solid var(--border-1);
    margin-inline: calc(-1 * var(--space-1));
  }

  .tabs::-webkit-scrollbar {
    display: none;
  }

  ul {
    display: flex;
    gap: var(--space-1);
    list-style: none;
    margin: 0;
    padding: 0 var(--space-1);
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    white-space: nowrap;
    color: var(--text-2);
    font-weight: var(--fw-medium);
    font-size: var(--fs-sm);
    text-decoration: none;
    transition:
      color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--text-1);
        border-bottom-color: var(--border-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible {
      outline-offset: -2px;
      border-radius: var(--radius-sm);
    }

    /* Current: ink underline plus weight. */
    &.active {
      color: var(--text-1);
      font-weight: var(--fw-semibold);
      border-bottom-color: var(--text-1);
    }
  }

  .count {
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    font-variant-numeric: tabular-nums;
    color: var(--text-3);
    background: var(--surface-2);
    border-radius: var(--radius-full);
    padding: 0 var(--space-2);
    line-height: 1.6;
  }

  @media (forced-colors: active) {
    a.active {
      border-bottom-color: Highlight;
    }
  }
</style>
