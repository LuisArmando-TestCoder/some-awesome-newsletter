<script lang="ts">
  import { t } from "../../lib/i18n/translations";
  import { fmt } from "./blog";

  interface Props {
    page: number;
    hasNext: boolean;
    hrefFor: (page: number) => string;
  }

  let { page, hasNext, hrefFor }: Props = $props();
</script>

{#if page > 1 || hasNext}
  <nav class="pager" aria-label={$t.blog.pagination}>
    {#if page > 1}
      <a class="btn btn--secondary" href={hrefFor(page - 1)} rel="prev">
        <span aria-hidden="true">&larr;</span> {$t.blog.newer}
      </a>
    {:else}
      <span></span>
    {/if}
    <span class="pager__current" aria-current="page">{fmt($t.blog.page, { page })}</span>
    {#if hasNext}
      <a class="btn btn--secondary" href={hrefFor(page + 1)} rel="next">
        {$t.blog.older} <span aria-hidden="true">&rarr;</span>
      </a>
    {:else}
      <span></span>
    {/if}
  </nav>
{/if}

<style lang="scss">
  .pager {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    align-items: center;
    gap: var(--space-4, 16px);
    margin-top: var(--space-8, 64px);

    > :first-child {
      justify-self: start;
    }
    > :last-child {
      justify-self: end;
    }
  }

  .pager__current {
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  @media (max-width: 520px) {
    .pager {
      grid-template-columns: 1fr 1fr;

      .pager__current {
        grid-column: 1 / -1;
        grid-row: 1;
        justify-self: center;
      }
    }
  }
</style>
