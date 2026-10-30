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
  let toggleEl: HTMLButtonElement;

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

  /** Esc closes the inline panel and returns focus to its toggle. */
  function onPanelKeydown(e: KeyboardEvent) {
    if (compact && e.key === "Escape" && expanded) {
      e.stopPropagation();
      expanded = false;
      toggleEl?.focus();
    }
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
        bind:this={toggleEl}
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
        <svg class="chevron" viewBox="0 0 16 16" width="12" height="12" aria-hidden="true" focusable="false"><path d="M4 6l4 4 4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
      </button>
    </span>
  {/if}

  {#if !compact || expanded}
    <!-- Esc from anywhere inside the panel closes it (keyboard delegation, not a click target). -->
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <section
      id="{uid}-panel"
      class="help-card"
      class:inline={compact}
      aria-labelledby="{uid}-title"
      on:keydown={onPanelKeydown}
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
  /* Contextual help: a quiet bordered note. Compact mode is a "What is this?" disclosure
     with a turning chevron; Esc closes it and returns focus to the toggle. */
  .help-compact {
    display: inline-flex;
  }

  .help-toggle {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-h);
    padding: 0 var(--space-2);
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    box-shadow: none;
    transition: color var(--t-out) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .help-toggle:hover {
      box-shadow: none;
      color: var(--text-1);
      text-decoration: underline;
      text-underline-offset: 0.2em;
      transition-duration: var(--t-in);
    }
  }

  .help-toggle[aria-expanded='true'] {
    color: var(--text-1);
  }

  .help-toggle .chevron {
    transition: transform var(--dur-slow) var(--ease-out);
  }

  .help-toggle[aria-expanded='true'] .chevron {
    transform: rotate(180deg);
  }

  .help-card {
    padding: var(--space-4) var(--space-5) var(--space-5);
    background: var(--surface-1);
    color: var(--text-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    font-family: var(--font-body);
  }

  .help-card.inline {
    margin-top: var(--space-2);
    background: var(--surface-0);
    box-shadow: var(--shadow-2);
    transition:
      opacity var(--dur-base) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @starting-style {
    .help-card.inline {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  .help-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
  }

  .help-title {
    margin: 0;
    padding: var(--space-2) 0;
    font-family: var(--font-display);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
  }

  .help-close {
    display: inline-grid;
    place-items: center;
    flex: none;
    width: var(--control-h);
    height: var(--control-h);
    margin-right: calc(-1 * var(--space-3));
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .help-close:hover {
      background: var(--surface-2);
      box-shadow: none;
      color: var(--text-1);
      transition-duration: var(--t-in);
    }
  }

  .help-close:active {
    background: var(--surface-3);
  }

  .help-what,
  .help-why {
    margin: 0;
    max-width: 60ch;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .help-label {
    margin: var(--space-4) 0 var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .help-actions {
    margin-top: var(--space-4);
  }

  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--control-h-sm);
    padding: 0 var(--space-4);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    font-family: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .btn-secondary:hover {
      background: var(--surface-2);
      box-shadow: none;
      transition-duration: var(--t-in);
    }
  }

  .btn-secondary:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  .help-toggle:focus-visible,
  .help-close:focus-visible,
  .btn-secondary:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-secondary,
    .help-toggle .chevron,
    .help-card.inline {
      transition: none;
    }
    .btn-secondary:active {
      transform: none;
    }
  }
</style>
