<!--
  StatTile: one key number with its label, period and change.
  Props:
    label: string                     what the number is, for example "Open rate"
    value: string | number            preformatted value, for example "48%" or 1250
    hint?: string                     period or context, for example "Last 7 days"
    delta?: { value: string; direction: 'up' | 'down' | 'flat'; good?: boolean }
                                      change vs the previous period; good sets green (true) or red (false),
                                      leave it out for a neutral color
    loading?: boolean = false         shows skeletons and sets aria-busy
    href?: string                     makes the tile a link to the detail view
    ...rest                           spread onto the root element
  Usage:
    <StatTile label="Subscribers" value="1,250" hint="Last 30 days"
      delta={{ value: '12%', direction: 'up', good: true }} />
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';
  import Skeleton from './Skeleton.svelte';

  type Delta = { value: string; direction: 'up' | 'down' | 'flat'; good?: boolean };

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'title'> {
    label: string;
    value: string | number;
    hint?: string;
    delta?: Delta;
    loading?: boolean;
    href?: string;
  }

  let { label, value, hint, delta, loading = false, href, class: className = '', ...rest }: Props = $props();

  const tone = $derived(
    !delta || delta.direction === 'flat' || delta.good === undefined ? 'neutral' : delta.good ? 'good' : 'bad'
  );
  const directionWord = $derived(
    delta ? (delta.direction === 'up' ? 'up' : delta.direction === 'down' ? 'down' : 'no change') : ''
  );
</script>

{#snippet body()}
  <span class="stat__label">{label}</span>
  {#if loading}
    <span class="stat__value"><Skeleton width="5ch" height="1em" /></span>
    <span class="stat__meta"><Skeleton width="8ch" height="0.875em" /></span>
  {:else}
    <span class="stat__value">{value}</span>
    {#if delta || hint}
      <span class="stat__meta">
        {#if delta}
          <span class="stat__delta stat__delta--{tone}">
            <svg class="stat__arrow" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
              {#if delta.direction === 'up'}
                <path d="M8 3.5 13 9H3z" fill="currentColor" />
              {:else if delta.direction === 'down'}
                <path d="M8 12.5 3 7h10z" fill="currentColor" />
              {:else}
                <path d="M3 7.25h10v1.5H3z" fill="currentColor" />
              {/if}
            </svg>
            <span class="sr-only">{directionWord}</span>
            {#if delta.direction !== 'flat' || delta.value}{delta.value}{/if}
          </span>
        {/if}
        {#if hint}<span class="stat__hint">{hint}</span>{/if}
      </span>
    {/if}
  {/if}
{/snippet}

{#if href !== undefined}
  <a class="stat stat--link {className}" {href} aria-busy={loading ? 'true' : undefined} {...rest}>
    {@render body()}
  </a>
{:else}
  <div class="stat {className}" aria-busy={loading ? 'true' : undefined} {...rest}>
    {@render body()}
  </div>
{/if}

<style>
  .stat {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
    padding: var(--card-pad);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-1);
    text-decoration: none;
    box-shadow: var(--shadow-1);
  }

  .stat--link {
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);
  }
  .stat--link:hover {
    border-color: var(--border-2);
    box-shadow: var(--shadow-2);
  }
  .stat--link:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .stat__label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--text-2);
  }

  .stat__value {
    display: block;
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    font-variant-numeric: tabular-nums;
    color: var(--text-1);
    overflow-wrap: anywhere;
  }

  .stat__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-2);
    font-size: var(--fs-xs);
    line-height: var(--lh-snug);
    color: var(--text-3);
  }

  .stat__delta {
    display: inline-flex;
    align-items: center;
    gap: 0.125rem;
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
  }
  .stat__delta--good {
    color: var(--success);
  }
  .stat__delta--bad {
    color: var(--danger);
  }
  .stat__delta--neutral {
    color: var(--text-2);
  }

  .stat__arrow {
    width: 0.875em;
    height: 0.875em;
  }
</style>
