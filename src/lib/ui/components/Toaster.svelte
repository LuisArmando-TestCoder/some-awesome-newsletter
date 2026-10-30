<script module lang="ts">
  // Only one Toaster renders at a time, so mounting it in two layouts never shows toasts twice.
  let owner: symbol | null = null;
</script>

<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { toasts, toast, type ToastItem } from './toast';

  interface Props {
    /** Accessible name of the close button on each toast. */
    closeLabel?: string;
    /** Accessible name of the notifications region. */
    regionLabel?: string;
  }

  let { closeLabel = 'Close', regionLabel = 'Notifications' }: Props = $props();

  let active = $state(false);
  let reduceMotion = $state(false);

  const polite = $derived($toasts.filter((t) => t.tone !== 'danger'));
  const urgent = $derived($toasts.filter((t) => t.tone === 'danger'));

  onMount(() => {
    const me = Symbol('toaster');
    if (owner === null) {
      owner = me;
      active = true;
    }
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () =>
      (reduceMotion = mq.matches || document.documentElement.dataset.motion === 'reduced');
    sync();
    mq.addEventListener('change', sync);
    return () => {
      mq.removeEventListener('change', sync);
      if (owner === me) owner = null;
    };
  });

  /** Closes the toast after its duration. Pauses while hovered or focused. */
  function autoDismiss(node: HTMLElement, item: ToastItem) {
    if (!item.duration || item.duration <= 0) return {};
    let remaining = item.duration;
    let started = 0;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let hovered = false;
    let focused = false;

    const start = () => {
      clearTimeout(timer);
      started = Date.now();
      timer = setTimeout(() => toast.dismiss(item.id), remaining);
    };
    const pause = () => {
      if (timer === undefined) return;
      clearTimeout(timer);
      timer = undefined;
      remaining = Math.max(1000, remaining - (Date.now() - started));
    };
    const update = () => (hovered || focused ? pause() : start());
    const enter = () => ((hovered = true), update());
    const leave = () => ((hovered = false), update());
    const fin = () => ((focused = true), update());
    const fout = (e: FocusEvent) => {
      if (e.relatedTarget instanceof Node && node.contains(e.relatedTarget)) return;
      focused = false;
      update();
    };

    node.addEventListener('mouseenter', enter);
    node.addEventListener('mouseleave', leave);
    node.addEventListener('focusin', fin);
    node.addEventListener('focusout', fout);
    start();

    return {
      destroy() {
        clearTimeout(timer);
        node.removeEventListener('mouseenter', enter);
        node.removeEventListener('mouseleave', leave);
        node.removeEventListener('focusin', fin);
        node.removeEventListener('focusout', fout);
      }
    };
  }

  function runAction(item: ToastItem) {
    item.action?.onclick();
    toast.dismiss(item.id);
  }
</script>

{#snippet card(item: ToastItem)}
  <div
    class="toast"
    data-tone={item.tone}
    use:autoDismiss={item}
    transition:fly={{ y: reduceMotion ? 0 : 8, duration: reduceMotion ? 0 : 200 }}
  >
    <span class="icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {#if item.tone === 'success'}
          <circle cx="12" cy="12" r="9" /><path d="m8 12.5 2.5 2.5L16 9.5" />
        {:else if item.tone === 'warning'}
          <path d="M12 3.5 2.5 20h19L12 3.5Z" /><path d="M12 10v4.5" /><path d="M12 17.5h.01" />
        {:else if item.tone === 'danger'}
          <circle cx="12" cy="12" r="9" /><path d="M12 7.5v5.5" /><path d="M12 16.5h.01" />
        {:else}
          <circle cx="12" cy="12" r="9" /><path d="M12 11v5.5" /><path d="M12 7.5h.01" />
        {/if}
      </svg>
    </span>
    <div class="body">
      {#if item.title}<p class="title">{item.title}</p>{/if}
      <p class="message">{item.message}</p>
      {#if item.action}
        <button type="button" class="action" onclick={() => runAction(item)}>{item.action.label}</button>
      {/if}
    </div>
    <button type="button" class="close" aria-label={closeLabel} onclick={() => toast.dismiss(item.id)}>
      <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
    </button>
  </div>
{/snippet}

{#if active}
  <section class="toaster" aria-label={regionLabel}>
    <div class="stack" role="status" aria-live="polite" aria-relevant="additions">
      {#each polite as item (item.id)}
        {@render card(item)}
      {/each}
    </div>
    <div class="stack" role="alert" aria-live="assertive" aria-relevant="additions">
      {#each urgent as item (item.id)}
        {@render card(item)}
      {/each}
    </div>
  </section>
{/if}

<style>
  .toaster {
    position: fixed;
    z-index: var(--z-toast);
    inset-inline: var(--space-3);
    bottom: var(--space-3);
    display: flex;
    flex-direction: column;
    pointer-events: none;
  }

  @media (min-width: 40rem) {
    .toaster {
      inset-inline: auto var(--space-5);
      bottom: var(--space-5);
      width: min(24rem, calc(100vw - 2 * var(--space-5)));
    }
  }

  .stack {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .stack:not(:empty) + .stack:not(:empty) {
    margin-top: var(--space-2);
  }

  .toast {
    pointer-events: auto;
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: start;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3) var(--space-3) var(--space-4);
    background: var(--surface-1);
    color: var(--text-1);
    border: 1px solid var(--border-1);
    border-inline-start: 3px solid var(--tone, var(--info));
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-3);
    font-family: var(--font-body);
  }

  .toast[data-tone='info'] { --tone: var(--info); }
  .toast[data-tone='success'] { --tone: var(--success); }
  .toast[data-tone='warning'] { --tone: var(--warning); }
  .toast[data-tone='danger'] { --tone: var(--danger); }

  .icon {
    display: inline-flex;
    color: var(--tone, var(--info));
    padding-top: var(--space-1);
  }

  .icon svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .body {
    min-width: 0;
    padding-block: var(--space-1);
  }

  .title {
    margin: 0 0 var(--space-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
  }

  .message {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
    overflow-wrap: anywhere;
  }

  .title + .message {
    color: var(--text-2);
  }

  .action {
    margin-top: var(--space-2);
    padding: 0;
    border: 0;
    background: none;
    color: var(--text-link);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;
    border-radius: var(--radius-sm);
  }

  .close {
    display: inline-grid;
    place-items: center;
    width: var(--control-h-sm);
    height: var(--control-h-sm);
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-3);
    cursor: pointer;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
  }

  .close svg {
    width: 1.125rem;
    height: 1.125rem;
  }

  .close:hover {
    background: var(--surface-2);
    color: var(--text-1);
  }

  .close:focus-visible,
  .action:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
</style>
