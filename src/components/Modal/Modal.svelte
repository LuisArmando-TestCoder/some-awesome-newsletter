<script lang="ts">
  import type { Writable } from 'svelte/store';
  import type { Snippet } from 'svelte';

  interface Props {
    /** Open state. The modal sets it to false when it closes. */
    showModal: Writable<boolean>;
    /** Called on every change of showModal after the first value. */
    onChange?: (value: boolean) => void;
    /** Visible heading. Also names the dialog for assistive tech. */
    title?: string;
    /** Id of an element inside the content that names the dialog. Wins over title. */
    labelledBy?: string;
    children?: Snippet;
  }

  let { showModal, onChange = () => {}, title, labelledBy, children }: Props = $props();

  const uid = $props.id();
  const titleId = `modal-${uid}-title`;

  let visible = $state(false);
  let dialog: HTMLDialogElement | undefined = $state();
  let opener: HTMLElement | null = null;
  let pressedOnBackdrop = false;
  let prevOverflow = '';

  // Track the store. onChange skips the initial value, as before.
  $effect(() => {
    let first = true;
    return showModal.subscribe((value) => {
      visible = value;
      if (first) {
        first = false;
        return;
      }
      onChange(value);
    });
  });

  $effect(() => {
    if (!dialog) return;
    if (visible && !dialog.open) {
      opener = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      prevOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
      dialog.showModal();
    } else if (!visible && dialog.open) {
      dialog.close();
    }
  });

  $effect(() => {
    return () => {
      if (dialog?.open) document.documentElement.style.overflow = prevOverflow;
    };
  });

  function close() {
    showModal.set(false);
  }

  function handleClose() {
    document.documentElement.style.overflow = prevOverflow;
    if (visible) showModal.set(false);
    const target = opener;
    opener = null;
    if (target && target.isConnected) target.focus();
  }

  function handlePointerDown(event: PointerEvent) {
    pressedOnBackdrop = event.target === dialog;
  }

  function handleClick(event: MouseEvent) {
    if (pressedOnBackdrop && event.target === dialog) close();
    pressedOnBackdrop = false;
  }

  const labelId = $derived(labelledBy ?? (title ? titleId : undefined));
</script>

<dialog
  bind:this={dialog}
  class="modal"
  aria-labelledby={labelId}
  onclose={handleClose}
  onpointerdown={handlePointerDown}
  onclick={handleClick}
>
  {#if visible}
    <div class="panel">
      <div class="head" class:has-title={!!title}>
        {#if title}<h2 id={titleId} class="title">{title}</h2>{/if}
        <button type="button" class="close" aria-label="Close" onclick={close}>
          <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18" /></svg>
        </button>
      </div>
      <div class="body">
        {@render children?.()}
      </div>
    </div>
  {/if}
</dialog>

<style>
  .modal {
    width: min(52rem, calc(100vw - 2 * var(--space-4)));
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

  .modal[open] {
    display: flex;
    animation: modal-in var(--dur-base) var(--ease-out);
  }

  .modal::backdrop {
    background: var(--surface-overlay);
    animation: backdrop-in var(--dur-base) var(--ease-out);
  }

  @keyframes modal-in {
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
    .modal[open],
    .modal::backdrop {
      animation: none;
    }
  }

  .panel {
    position: relative;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 0;
  }

  .head {
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    gap: var(--space-3);
    padding: var(--space-3) var(--space-3) 0;
  }

  .head.has-title {
    justify-content: space-between;
    padding: var(--space-5) var(--space-5) var(--space-3);
  }

  .title {
    margin: 0;
    min-width: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .close {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: var(--control-h-sm);
    height: var(--control-h-sm);
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
    line-height: var(--lh-normal);
  }
</style>
