<script lang="ts">
  import { tick } from "svelte";
  import { ob, fmt } from "$lib/tutorial/copy";
  import { ONBOARDING_STEP_COUNT } from "$lib/tutorial/onboardingState";
  import { prevStep } from "./nav";

  /** True when this slot is the visible step. */
  export let canReveal = false;
  /** Zero-based slot index, used for the progress line. */
  export let index = 0;
  export let title = "";
  /** Plain explanation of why we ask. */
  export let why = "";
  /** What happens if the owner skips or leaves the defaults. */
  export let skipNote = "";
  export let primaryLabel = "";
  export let onPrimary: () => void | Promise<void> = () => {};
  export let primaryDisabled = false;
  export let loading = false;
  export let loadingLabel = "";
  export let showBack = true;
  export let onBack: () => void = prevStep;
  /** Optional steps show a secondary Skip button. */
  export let optional = false;
  export let onSkip: () => void = () => {};
  export let skipLabel = "";
  /** Hide the footer when the step renders its own actions. */
  export let hideFooter = false;

  let heading: HTMLHeadingElement;
  let wasRevealed = false;

  const total = ONBOARDING_STEP_COUNT;

  $: if (canReveal && !wasRevealed) {
    wasRevealed = true;
    tick().then(() => heading?.focus({ preventScroll: false }));
  } else if (!canReveal && wasRevealed) {
    wasRevealed = false;
  }

  async function submit(e: Event) {
    e.preventDefault();
    // Buttons inside child components (tag pickers, dropdowns) may lack type="button";
    // only our own primary button (or Enter, which uses it) may submit the step.
    const submitter = (e as SubmitEvent).submitter as HTMLElement | null;
    if (submitter && !submitter.hasAttribute("data-ob-primary")) return;
    if (loading || primaryDisabled) return;
    await onPrimary();
  }

  function skip() {
    if (loading) return;
    onSkip();
  }
</script>

{#if canReveal}
  <section class="ob-shell" aria-labelledby="ob-title-{index}">
    <div class="ob-progress" aria-label={$ob.progressLabel}>
      <span class="ob-progress__text">{fmt($ob.progress, { current: index + 1, total })}</span>
      <div class="ob-progress__track" role="progressbar" aria-valuemin="1" aria-valuemax={total} aria-valuenow={index + 1} aria-valuetext={fmt($ob.progress, { current: index + 1, total })}>
        {#each Array(total) as _, i (i)}
          <span class="ob-progress__seg" class:is-done={i < index} class:is-current={i === index} aria-hidden="true"></span>
        {/each}
      </div>
    </div>

    <form class="ob-card" on:submit={submit} novalidate>
      <header class="ob-header">
        <h1 id="ob-title-{index}" class="ob-title" tabindex="-1" bind:this={heading}>{title}</h1>
        {#if why}
          <p class="ob-why"><span class="ob-why__label">{$ob.whyLabel}:</span> {why}</p>
        {/if}
      </header>

      <div class="ob-body">
        <slot />
      </div>

      {#if skipNote}
        <p class="ob-skipnote">
          <svg class="ob-skipnote__icon" viewBox="0 0 16 16" aria-hidden="true"><circle cx="8" cy="8" r="6.5" /><path d="M8 7.25v4M8 4.75v.25" /></svg>
          <span>{skipNote}</span>
        </p>
      {/if}

      {#if !hideFooter}
        <footer class="ob-footer">
          {#if showBack && index > 0}
            <button type="button" class="ob-btn ob-btn--tertiary ob-back" on:click={onBack}>
              <span aria-hidden="true">&larr;</span> {$ob.back}
            </button>
          {:else}
            <span class="ob-footer__spacer"></span>
          {/if}
          <div class="ob-footer__right">
            {#if optional}
              <button type="button" class="ob-btn ob-btn--secondary" on:click={skip} aria-disabled={loading ? "true" : undefined}>
                {skipLabel || $ob.skip}
              </button>
            {/if}
            <button
              type="submit"
              data-ob-primary
              class="ob-btn ob-btn--primary"
              class:is-loading={loading}
              aria-disabled={primaryDisabled || loading ? "true" : undefined}
              aria-busy={loading}
            >
              <span class="ob-btn__label">{primaryLabel || $ob.continue}</span>
              <span class="ob-btn__busy" aria-hidden={!loading}><span class="ob-spinner" aria-hidden="true"></span>{loadingLabel || $ob.working}</span>
            </button>
          </div>
        </footer>
      {/if}
      <slot name="after" />
    </form>
  </section>
{/if}

<style lang="scss">
  /* Onboarding: one question per screen in large type, a step indicator above it, and the
     action bar pinned to the thumb zone on phones. Open layout, no card chrome. */
  .ob-shell {
    width: min(var(--container-md), 100%);
    margin: 0 auto;
    padding: var(--space-7) var(--gutter) var(--space-9);
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
    font-family: var(--font-body);
    color: var(--text-1);
    animation: ob-enter var(--dur-slow) var(--ease-out);
  }

  @keyframes ob-enter {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
  }

  /* ---------- Step indicator: one segment per step, current one wider ---------- */
  .ob-progress {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
  }
  .ob-progress__text {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .ob-progress__track {
    display: flex;
    gap: var(--space-1);
    align-items: center;
  }
  .ob-progress__seg {
    flex: 1 1 0;
    height: 4px;
    border-radius: var(--radius-full);
    background: var(--border-1);
    transition:
      background-color var(--dur-slow) var(--ease-out),
      flex-grow var(--dur-slow) var(--ease-out);

    &.is-done {
      background: var(--text-1);
    }

    /* Current: ink, twice as wide, and taller, so it reads without color. */
    &.is-current {
      flex-grow: 2.5;
      height: 6px;
      background: var(--text-1);
    }
  }

  /* ---------- Question ---------- */
  .ob-card {
    display: flex;
    flex-direction: column;
    gap: var(--space-7);
  }

  .ob-header {
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }
  .ob-title {
    margin: 0;
    max-width: 20ch;
    font-family: var(--font-display);
    font-size: var(--fs-4xl);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    text-wrap: balance;
    &:focus {
      outline: none;
    }
    &:focus-visible {
      outline: 2px solid var(--focus-color);
      outline-offset: 4px;
      border-radius: var(--radius-sm);
    }
  }
  .ob-why {
    margin: 0;
    max-width: 56ch;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
    text-wrap: pretty;
  }
  .ob-why__label {
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .ob-body {
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
  }

  .ob-skipnote {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    max-width: 60ch;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }
  .ob-skipnote__icon {
    flex-shrink: 0;
    width: 1rem;
    height: 1rem;
    margin-top: 0.15em;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.4;
    stroke-linecap: round;
  }

  /* ---------- Action bar ---------- */
  .ob-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);
  }
  .ob-footer__right {
    display: flex;
    gap: var(--space-3);
    margin-left: auto;
    flex-wrap: wrap;
    align-items: center;
  }

  /* Phones: the bar sticks to the bottom, primary full width in the thumb zone,
     back as a text link above it, safe-area padding for the home indicator. */
  @media (max-width: 40rem) {
    .ob-shell {
      padding-bottom: var(--space-6);
      gap: var(--space-6);
    }
    .ob-card {
      gap: var(--space-6);
    }
    .ob-title {
      font-size: var(--fs-3xl);
    }
    .ob-footer {
      position: sticky;
      bottom: 0;
      z-index: 5;
      margin-inline: calc(-1 * var(--gutter));
      padding: var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));
      background: var(--surface-glass);
      backdrop-filter: saturate(1.8) blur(20px);
      -webkit-backdrop-filter: saturate(1.8) blur(20px);
      flex-direction: column-reverse;
      align-items: stretch;
      gap: var(--space-2);
    }
    .ob-footer__spacer {
      display: none;
    }
    .ob-footer__right {
      flex-direction: column-reverse;
      align-items: stretch;
      margin-left: 0;
      gap: var(--space-2);
    }
    .ob-footer__right :global(.ob-btn--primary) {
      width: 100%;
      min-height: 3.25rem;
    }
    .ob-back {
      align-self: center;
    }
  }

  /* ---------- Shared field styles for every onboarding step ---------- */
  .ob-shell :global(.ob-field) {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }
  .ob-shell :global(.ob-label) {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
  }
  .ob-shell :global(.ob-hint) {
    margin: 0;
    font-size: var(--fs-xs);
    color: var(--text-3);
    line-height: var(--lh-normal);
  }
  .ob-shell :global(.ob-input),
  .ob-shell :global(.ob-textarea),
  .ob-shell :global(.ob-select) {
    width: 100%;
    box-sizing: border-box;
    min-height: 3.5rem;
    font: inherit;
    font-size: var(--fs-lg);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4);
    transition:
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }
  .ob-shell :global(.ob-select) {
    cursor: pointer;
  }
  .ob-shell :global(.ob-textarea) {
    min-height: 6rem;
    resize: vertical;
    font-size: var(--fs-md);
  }
  .ob-shell :global(.ob-input::placeholder),
  .ob-shell :global(.ob-textarea::placeholder) {
    color: var(--text-3);
  }
  @media (hover: hover) and (pointer: fine) {
    .ob-shell :global(.ob-input:hover:not(:focus)),
    .ob-shell :global(.ob-textarea:hover:not(:focus)),
    .ob-shell :global(.ob-select:hover:not(:focus)) {
      border-color: var(--text-2);
      transition-duration: var(--t-in);
    }
  }
  .ob-shell :global(.ob-input:focus-visible),
  .ob-shell :global(.ob-textarea:focus-visible),
  .ob-shell :global(.ob-select:focus-visible),
  .ob-shell :global(.ob-input:focus),
  .ob-shell :global(.ob-textarea:focus) {
    outline: none;
    border-color: var(--text-1);
    box-shadow: var(--focus-ring);
  }
  .ob-shell :global(.ob-input[aria-invalid="true"]),
  .ob-shell :global(.ob-textarea[aria-invalid="true"]) {
    border-color: var(--danger);
  }
  /* Error and success: icon + text, not a colored box alone. */
  .ob-shell :global(.ob-error),
  .ob-shell :global(.ob-success) {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
  .ob-shell :global(.ob-error) {
    color: var(--danger);
  }
  .ob-shell :global(.ob-success) {
    color: var(--success);
  }
  .ob-shell :global(.ob-error)::before,
  .ob-shell :global(.ob-success)::before {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 1.125rem;
    height: 1.125rem;
    margin-top: 0.05em;
    border: 1.5px solid currentColor;
    border-radius: var(--radius-full);
    font-size: 0.6875rem;
    font-weight: var(--fw-bold);
    line-height: 1;
  }
  .ob-shell :global(.ob-error)::before {
    content: "!";
  }
  .ob-shell :global(.ob-success)::before {
    content: "\2713";
  }

  /* ---------- Buttons: ink pill, outlined pill, text link ---------- */
  .ob-shell :global(.ob-btn) {
    position: relative;
    font: inherit;
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    border-radius: var(--radius-full);
    padding: 0 var(--space-6);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    border: 1px solid transparent;
    white-space: nowrap;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }
  .ob-shell :global(.ob-btn:focus-visible) {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .ob-shell :global(.ob-btn:active:not([aria-disabled="true"]):not(:disabled)) {
    transform: scale(0.97);
    transition-duration: 60ms;
  }
  .ob-shell :global(.ob-btn:disabled),
  .ob-shell :global(.ob-btn[aria-disabled="true"]:not([aria-busy="true"])) {
    opacity: var(--disabled-opacity);
    cursor: not-allowed;
  }
  .ob-shell :global(.ob-btn[aria-busy="true"]) {
    cursor: progress;
  }
  .ob-shell :global(.ob-btn--primary) {
    min-height: 3rem;
    background: var(--accent);
    color: var(--accent-contrast);
  }
  .ob-shell :global(.ob-btn--secondary) {
    background: var(--surface-0);
    color: var(--text-1);
    border-color: var(--border-2);
  }
  .ob-shell :global(.ob-btn--tertiary) {
    background: none;
    color: var(--text-link);
    padding-inline: var(--space-2);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
  }
  @media (hover: hover) and (pointer: fine) {
    .ob-shell :global(.ob-btn--primary:hover:not(:disabled):not([aria-disabled="true"])) {
      background: var(--accent-hover);
      transition-duration: var(--t-in);
    }
    .ob-shell :global(.ob-btn--secondary:hover:not(:disabled):not([aria-disabled="true"])) {
      background: var(--surface-2);
      transition-duration: var(--t-in);
    }
    .ob-shell :global(.ob-btn--tertiary:hover:not(:disabled)) {
      box-shadow: none;
      text-decoration-color: currentColor;
    }
  }
  .ob-back span {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .ob-back:hover span {
      transform: translateX(-3px);
    }
  }

  /* Pending: label and busy text share one cell so the width never jumps; the busy
     text and spinner appear only after 350 ms. */
  .ob-footer .ob-btn--primary {
    display: inline-grid;
    place-items: center;
  }
  .ob-btn__label,
  .ob-btn__busy {
    grid-area: 1 / 1;
  }
  .ob-btn__busy {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    visibility: hidden;
  }
  .is-loading .ob-btn__label {
    animation: ob-swap-out 1ms 350ms forwards;
  }
  .is-loading .ob-btn__busy {
    visibility: visible;
    opacity: 0;
    animation: ob-swap-in 1ms 350ms forwards;
  }
  @keyframes ob-swap-out {
    to {
      opacity: 0;
    }
  }
  @keyframes ob-swap-in {
    to {
      opacity: 1;
    }
  }

  .ob-spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: ob-spin 0.8s linear infinite;
  }
  @keyframes ob-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (forced-colors: active) {
    .ob-progress__seg {
      background: GrayText;
    }
    .ob-progress__seg.is-done,
    .ob-progress__seg.is-current {
      background: CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .ob-shell {
      animation: none;
    }
    .ob-progress__seg {
      transition: none;
    }
    .ob-shell :global(.ob-btn:active) {
      transform: none !important;
    }
    .ob-spinner {
      animation: none;
      border-right-color: currentColor;
      opacity: 0.6;
    }
    .is-loading .ob-btn__label,
    .is-loading .ob-btn__busy {
      animation-duration: 1ms;
    }
  }
</style>
