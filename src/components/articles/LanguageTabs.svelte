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
    scrollbar-width: thin;
    border-bottom: 1px solid var(--border-1, #e5e5e5);
  }

  ul {
    display: flex;
    gap: var(--space-1, 4px);
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    white-space: nowrap;
    color: var(--text-2, #444);
    font-weight: var(--fw-medium, 500);
    font-size: var(--fs-sm, 0.875rem);
    text-decoration: none;
    transition: color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      border-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:hover {
      color: var(--text-1, #111);
    }

    &.active {
      color: var(--text-1, #111);
      font-weight: var(--fw-semibold, 600);
      border-bottom-color: var(--accent, #2563eb);
    }
  }

  .count {
    font-size: var(--fs-xs, 0.75rem);
    color: var(--text-3, #777);
    background: var(--surface-2, #f3f3f3);
    border-radius: var(--radius-full, 999px);
    padding: 0 var(--space-2, 8px);
  }
</style>
