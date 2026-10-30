<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    title: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    /** Escape, backdrop click and the close button close the dialog. */
    dismissible?: boolean;
    /** Accessible name of the close button. */
    closeLabel?: string;
    onclose?: () => void;
    children?: Snippet;
    footer?: Snippet;
    class?: string;
  }

  let {
    open = $bindable(false),
    title,
    description,
    size = 'md',
    dismissible = true,
    closeLabel = 'Close',
    onclose,
    children,
    footer,
    class: className = ''
  }: Props = $props();

  const uid = $props.id();
  const titleId = `dlg-${uid}-title`;
  const descId = `dlg-${uid}-desc`;

  let dialog: HTMLDialogElement | undefined = $state();
  let opener: HTMLElement | null = null;
  let pressedOnBackdrop = false;
  let prevOverflow = '';

  $effect(() => {
    if (!dialog) return;
    if (open && !dialog.open) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  });

  $effect(() => {
    // Leaving the page while open: release the scroll lock.
    return () => {
      if (dialog?.open) document.documentElement.style.overflow = prevOverflow;
    };
  });

  function handleClose() {
    document.documentElement.style.overflow = prevOverflow;
    if (open) open = false;
    const target = opener;
    opener = null;
    if (target && target.isConnected) target.focus();
    onclose?.();
  }

  function handleCancel(event: Event) {
    if (!dismissible) event.preventDefault();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && !dismissible) event.preventDefault();
  }

  function handlePointerDown(event: PointerEvent) {
    pressedOnBackdrop = event.target === dialog;
  }

  function handleClick(event: MouseEvent) {
    if (dismissible && pressedOnBackdrop && event.target === dialog) open = false;
    pressedOnBackdrop = false;
  }
</script>

<dialog
  bind:this={dialog}
  class="dialog size-{size} {className}"
  aria-labelledby={titleId}
  aria-describedby={description ? descId : undefined}
  oncancel={handleCancel}
  onclose={handleClose}
  onkeydown={handleKeydown}
  onpointerdown={handlePointerDown}
  onclick={handleClick}
>
  {#if open}
    <div class="panel">
      <header class="head">
        <div class="heading">
          <h2 id={titleId} class="title">{title}</h2>
          {#if description}<p id={descId} class="description">{description}</p>{/if}
        </div>
        {#if dismissible}
          <button type="button" class="close" aria-label={closeLabel} onclick={() => (open = false)}>
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        {/if}
      </header>
      <div class="body">
        {@render children?.()}
      </div>
      {#if footer}
        <footer class="foot">{@render footer()}</footer>
      {/if}
    </div>
  {/if}
</dialog>

<style>
  .dialog {
    width: min(var(--dialog-w), calc(100vw - 2 * var(--space-4)));
    max-width: none;
    max-height: min(90vh, 90dvh);
    margin: auto;
    padding: 0;
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-1);
    box-shadow: var(--shadow-3);
    font-family: var(--font-body);
    overflow: hidden;
  }

  .size-sm { --dialog-w: 26rem; }
  .size-md { --dialog-w: 36rem; }
  .size-lg { --dialog-w: 52rem; }

  .dialog[open] {
    display: flex;
    animation: dialog-in var(--dur-base) var(--ease-out);
  }

  .dialog::backdrop {
    background: var(--surface-overlay);
    animation: backdrop-in var(--dur-base) var(--ease-out);
  }

  @keyframes dialog-in {
    from {
      opacity: 0;
      transform: translateY(0.5rem);
    }
  }

  @keyframes backdrop-in {
    from {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .dialog[open],
    .dialog::backdrop {
      animation: none;
    }
  }

  .panel {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
  }

  .head {
    display: flex;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-5) var(--space-5) var(--space-3);
  }

  .heading {
    flex: 1;
    min-width: 0;
  }

  .title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .description {
    margin: var(--space-2) 0 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .close {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: var(--control-h-sm);
    height: var(--control-h-sm);
    margin: calc(-1 * var(--space-1)) calc(-1 * var(--space-2)) 0 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);
  }

  .close svg {
    width: 1.25rem;
    height: 1.25rem;
  }

  .close:hover {
    background: var(--surface-2);
    color: var(--text-1);
  }

  .close:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .body {
    flex: 1;
    min-height: 0;
    overflow-y: auto;
    overscroll-behavior: contain;
    padding: 0 var(--space-5) var(--space-5);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-1);
  }

  .foot {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-5);
    border-top: 1px solid var(--border-1);
    background: var(--surface-1);
  }
</style>
