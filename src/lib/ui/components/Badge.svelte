<!--
  Badge: short status label. Soft background with the matching state color for text.
  Props:
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info' = 'neutral'
    dot?: boolean = false        shows a small leading dot in the tone color
    children: Snippet            the label text (keep it to one or two words)
    ...rest                      spread onto the root <span>
  Usage:
    <Badge tone="success" dot>Sent</Badge>
  Note: color is never the only signal; the text itself must say the status.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger' | 'info';
    dot?: boolean;
    children?: Snippet;
  }

  let { tone = 'neutral', dot = false, children, class: className = '', ...rest }: Props = $props();
</script>

<span class="badge badge--{tone} {className}" {...rest}>
  {#if dot}<span class="badge__dot" aria-hidden="true"></span>{/if}
  {@render children?.()}
</span>

<style>
  .badge {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 1.5rem;
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    border: 1px solid transparent;
    background: var(--_bg);
    color: var(--_fg);
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    white-space: nowrap;
    vertical-align: middle;
  }

  .badge__dot {
    width: 0.4375rem;
    height: 0.4375rem;
    border-radius: var(--radius-full);
    background: currentColor;
    flex-shrink: 0;
  }

  .badge--neutral {
    --_bg: var(--surface-2);
    --_fg: var(--text-2);
    border-color: var(--border-1);
  }
  .badge--accent {
    --_bg: var(--accent-soft);
    --_fg: var(--accent);
  }
  .badge--success {
    --_bg: var(--success-soft);
    --_fg: var(--success);
  }
  .badge--warning {
    --_bg: var(--warning-soft);
    --_fg: var(--warning);
  }
  .badge--danger {
    --_bg: var(--danger-soft);
    --_fg: var(--danger);
  }
  .badge--info {
    --_bg: var(--info-soft);
    --_fg: var(--info);
  }
</style>
