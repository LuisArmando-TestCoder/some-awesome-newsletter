<script lang="ts" context="module">
  const DISMISSED_KEY = "aiban.help.dismissed.v1";

  function readDismissed(): string[] {
    try {
      if (typeof localStorage === "undefined") return [];
      const parsed = JSON.parse(localStorage.getItem(DISMISSED_KEY) || "[]");
      return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
    } catch {
      return [];
    }
  }

  /** True when the help card with this id was closed before. */
  export function isHelpDismissed(id: string): boolean {
    return readDismissed().includes(id);
  }

  /** Remembers that the help card with this id was closed. */
  export function dismissHelp(id: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      const list = readDismissed();
      if (!list.includes(id)) localStorage.setItem(DISMISSED_KEY, JSON.stringify([...list, id]));
    } catch {
      /* storage blocked: the card shows again next visit */
    }
  }

  /** Shows a closed help card again. */
  export function restoreHelp(id: string): void {
    try {
      if (typeof localStorage === "undefined") return;
      localStorage.setItem(DISMISSED_KEY, JSON.stringify(readDismissed().filter((x) => x !== id)));
    } catch {
      /* ignore */
    }
  }
</script>

<script lang="ts">
  import { createEventDispatcher, onMount } from "svelte";
  import { tt } from "./copy";

  export let title: string;
  export let what: string;
  export let why: string;
  /** When set, the card can be closed and stays closed (remembered in localStorage). */
  export let id: string | undefined = undefined;
  export let actionLabel: string | undefined = undefined;
  export let actionHref: string | undefined = undefined;
  export let onAction: (() => void) | undefined = undefined;
  /** Small "What is this?" button that expands the card inline. */
  export let compact = false;

  const dispatch = createEventDispatcher<{ dismiss: { id: string }; action: void }>();
  const uid = `aiban-help-${Math.random().toString(36).slice(2, 9)}`;

  let dismissed = false;
  let expanded = false;

  onMount(() => {
    if (id) dismissed = isHelpDismissed(id);
  });

  function close() {
    if (compact) {
      expanded = false;
      return;
    }
    if (!id) return;
    dismissHelp(id);
    dismissed = true;
    dispatch("dismiss", { id });
  }

  function runAction() {
    onAction?.();
    dispatch("action");
  }

  $: showCloseButton = compact || !!id;
</script>

{#if !dismissed}
  {#if compact}
    <span class="help-compact">
      <button
        type="button"
        class="help-toggle"
        aria-expanded={expanded}
        aria-controls="{uid}-panel"
        on:click={() => (expanded = !expanded)}
      >
        <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
          <circle cx="10" cy="10" r="8.25" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path
            d="M7.75 7.75a2.25 2.25 0 1 1 3.4 1.94c-.67.4-1.15.9-1.15 1.56v.25"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
          />
          <circle cx="10" cy="14.25" r="0.9" fill="currentColor" />
        </svg>
        <span>{$tt.help.whatIsThis}</span>
      </button>
    </span>
  {/if}

  {#if !compact || expanded}
    <section
      id="{uid}-panel"
      class="help-card"
      class:inline={compact}
      aria-labelledby="{uid}-title"
    >
      <div class="help-head">
        <h3 id="{uid}-title" class="help-title">{title}</h3>
        {#if showCloseButton}
          <button type="button" class="help-close" aria-label={$tt.help.close} title={$tt.help.close} on:click={close}>
            <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true" focusable="false">
              <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
            </svg>
          </button>
        {/if}
      </div>
      <p class="help-what">{what}</p>
      <p class="help-label">{$tt.help.whyItMatters}</p>
      <p class="help-why">{why}</p>
      {#if actionLabel && (actionHref || onAction)}
        <div class="help-actions">
          {#if actionHref}
            <a class="btn-secondary" href={actionHref} on:click={() => dispatch("action")}>{actionLabel}</a>
          {:else}
            <button type="button" class="btn-secondary" on:click={runAction}>{actionLabel}</button>
          {/if}
        </div>
      {/if}
    </section>
  {/if}
{/if}

<style>
  .help-compact {
    display: inline-flex;
  }

  .help-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1, 4px);
    min-height: 44px;
    padding: 0 var(--space-2, 8px);
    border: 1px solid transparent;
    border-radius: var(--radius-md, 8px);
    background: transparent;
    color: var(--text-link, #4f46e5);
    font-family: var(--font-body, inherit);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    cursor: pointer;
  }

  .help-toggle:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .help-card {
    padding: var(--space-4, 16px) var(--space-5, 24px) var(--space-5, 24px);
    background: var(--accent-soft, #eef2ff);
    color: var(--text-1, #111827);
    border: 1px solid var(--border-1, #e5e7eb);
    border-radius: var(--radius-lg, 12px);
    font-family: var(--font-body, inherit);
  }

  .help-card.inline {
    margin-top: var(--space-2, 8px);
    background: var(--surface-1, #fff);
    box-shadow: var(--shadow-1, 0 1px 2px rgba(0, 0, 0, 0.06));
  }

  .help-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3, 12px);
  }

  .help-title {
    margin: 0;
    padding: var(--space-2, 8px) 0;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    line-height: var(--lh-tight, 1.3);
    color: var(--text-1, #111827);
  }

  .help-close {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: 44px;
    height: 44px;
    margin-right: calc(-1 * var(--space-3, 12px));
    border: 0;
    border-radius: var(--radius-full, 9999px);
    background: transparent;
    color: var(--text-2, #374151);
    cursor: pointer;
  }

  .help-close:hover {
    background: var(--surface-2, #f3f4f6);
    color: var(--text-1, #111827);
  }

  .help-what,
  .help-why {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.55);
    color: var(--text-2, #374151);
  }

  .help-label {
    margin: var(--space-3, 12px) 0 var(--space-1, 4px);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #111827);
  }

  .help-actions {
    margin-top: var(--space-4, 16px);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 var(--space-4, 16px);
    border: 1px solid var(--border-2, #d1d5db);
    border-radius: var(--radius-md, 8px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #111827);
    font-family: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }

  .btn-secondary:hover {
    background: var(--surface-2, #f3f4f6);
  }

  .help-toggle:focus-visible,
  .help-close:focus-visible,
  .btn-secondary:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-secondary {
      transition: none;
    }
  }
</style>
