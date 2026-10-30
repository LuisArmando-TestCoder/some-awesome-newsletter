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
    gap: var(--space-4);
    margin-top: var(--space-9);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);

    > :first-child {
      justify-self: start;
    }
    > :last-child {
      justify-self: end;
    }

    a span {
      display: inline-block;
      transition: transform var(--dur-base) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      a[rel="prev"]:hover span {
        transform: translateX(-3px);
      }
      a[rel="next"]:hover span {
        transform: translateX(3px);
      }
    }
  }

  /* The current page is marked with weight and a filled dot, not color alone. */
  .pager__current {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    font-variant-numeric: tabular-nums;

    &::before {
      content: "";
      width: 0.375rem;
      height: 0.375rem;
      border-radius: var(--radius-full);
      background: currentColor;
    }
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
