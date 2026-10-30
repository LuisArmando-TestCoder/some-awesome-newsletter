<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    open?: boolean;
    title: string;
    description?: string;
    size?: 'sm' | 'md' | 'lg';
    side?: 'right' | 'left' | 'bottom';
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
    side = 'right',
    dismissible = true,
    closeLabel = 'Close',
    onclose,
    children,
    footer,
    class: className = ''
  }: Props = $props();

  const uid = $props.id();
  const titleId = `drw-${uid}-title`;
  const descId = `drw-${uid}-desc`;

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
  class="drawer side-{side} size-{size} {className}"
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
  .drawer {
    position: fixed;
    margin: 0;
    padding: 0;
    max-width: none;
    max-height: none;
    border: 0;
    background: var(--surface-0);
    color: var(--text-1);
    box-shadow: var(--shadow-3);
    font-family: var(--font-body);
    overflow: hidden;
  }

  .side-right,
  .side-left {
    inset-block: 0;
    width: min(var(--drawer-w), 100vw);
    height: 100%;
    height: 100dvh;
  }

  .size-sm { --drawer-w: 22rem; }
  .size-md { --drawer-w: 28rem; }
  .size-lg { --drawer-w: 40rem; }

  .side-right {
    inset-inline: auto 0;
    border-inline-start: 1px solid var(--border-1);
    border-start-start-radius: var(--radius-xl);
    border-end-start-radius: var(--radius-xl);
    --drawer-from: translateX(1.5rem);
  }

  .side-left {
    inset-inline: 0 auto;
    border-inline-end: 1px solid var(--border-1);
    border-start-end-radius: var(--radius-xl);
    border-end-end-radius: var(--radius-xl);
    --drawer-from: translateX(-1.5rem);
  }

  .side-bottom {
    inset-inline: 0;
    inset-block: auto 0;
    width: 100%;
    max-height: min(85vh, 85dvh);
    border-top: 1px solid var(--border-1);
    border-start-start-radius: var(--radius-xl);
    border-start-end-radius: var(--radius-xl);
    --drawer-from: translateY(1.5rem);
  }

  @media (max-width: 28rem) {
    .side-right,
    .side-left {
      border-radius: 0;
    }
  }

  /* Enter: slides in from its edge. @starting-style gives the first frame, no keyframes. */
  .drawer[open] {
    display: flex;
    opacity: 1;
    transform: none;
    transition:
      opacity var(--dur-base) var(--ease-out),
      transform var(--dur-slow) var(--ease-out);
  }

  @starting-style {
    .drawer[open] {
      opacity: 0;
      transform: var(--drawer-from);
    }
  }

  .drawer::backdrop {
    background: var(--surface-overlay);
    backdrop-filter: blur(8px) saturate(1.2);
    -webkit-backdrop-filter: blur(8px) saturate(1.2);
    opacity: 1;
    transition: opacity var(--dur-base) var(--ease-out);
  }

  @starting-style {
    .drawer[open]::backdrop {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .drawer[open],
    .drawer::backdrop {
      transition: none;
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

  /* Close: round ghost button with the full state set. */
  .close {
    position: relative;
    flex: none;
    display: inline-grid;
    place-items: center;
    width: var(--control-h);
    height: var(--control-h);
    margin: calc(-1 * var(--space-2)) calc(-1 * var(--space-2)) 0 0;
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .close svg {
    width: 1.25rem;
    height: 1.25rem;
    transition: transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .close:hover {
      background: var(--surface-2);
      color: var(--text-1);
      transition-duration: var(--t-in);
    }
    .close:hover svg {
      transform: rotate(90deg);
    }
  }

  .close:active {
    background: var(--surface-3);
    transform: scale(0.94);
    transition-duration: 60ms;
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
    scrollbar-gutter: stable;
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
    background: var(--surface-0);
    padding-bottom: max(var(--space-4), env(safe-area-inset-bottom));
  }

  @media (forced-colors: active) {
    .drawer {
      border: 1px solid CanvasText;
    }
    .close:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .close:active,
    .close:hover svg {
      transform: none;
    }
  }
</style>
