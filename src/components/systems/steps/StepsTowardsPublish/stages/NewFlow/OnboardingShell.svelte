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

  $: total = ONBOARDING_STEP_COUNT;
  $: percent = Math.round(((index + 1) / total) * 100);

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
</script>

{#if canReveal}
  <section class="ob-shell" aria-labelledby="ob-title-{index}">
    <div class="ob-progress" aria-label={$ob.progressLabel}>
      <span class="ob-progress__text">{fmt($ob.progress, { current: index + 1, total })}</span>
      <div class="ob-progress__track" role="progressbar" aria-valuemin="1" aria-valuemax={total} aria-valuenow={index + 1}>
        <div class="ob-progress__fill" style="width: {percent}%"></div>
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
        <p class="ob-skipnote">{skipNote}</p>
      {/if}

      {#if !hideFooter}
        <footer class="ob-footer">
          {#if showBack && index > 0}
            <button type="button" class="ob-btn ob-btn--tertiary" on:click={onBack}>{$ob.back}</button>
          {:else}
            <span></span>
          {/if}
          <div class="ob-footer__right">
            {#if optional}
              <button type="button" class="ob-btn ob-btn--secondary" on:click={onSkip} disabled={loading}>
                {skipLabel || $ob.skip}
              </button>
            {/if}
            <button type="submit" data-ob-primary class="ob-btn ob-btn--primary" disabled={primaryDisabled || loading} aria-busy={loading}>
              {#if loading}<span class="ob-spinner" aria-hidden="true"></span>{loadingLabel || $ob.working}{:else}{primaryLabel || $ob.continue}{/if}
            </button>
          </div>
        </footer>
      {/if}
      <slot name="after" />
    </form>
  </section>
{/if}

<style lang="scss">
  .ob-shell {
    width: min(var(--container-sm, 40rem), 100%);
    margin: 0 auto;
    padding: var(--space-6, 32px) var(--space-4, 16px) var(--space-8, 64px);
    display: flex;
    flex-direction: column;
    gap: var(--space-4, 16px);
    font-family: var(--font-body, inherit);
    color: var(--text-1, #14171a);
    animation: ob-enter var(--dur-slow, 320ms) var(--ease-out, ease-out);
  }

  @keyframes ob-enter {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ob-shell { animation: none; }
    .ob-progress__fill { transition: none !important; }
  }

  .ob-progress {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
  }
  .ob-progress__text {
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #4a5058);
    font-weight: var(--fw-medium, 500);
  }
  .ob-progress__track {
    height: 6px;
    border-radius: var(--radius-full, 999px);
    background: var(--surface-2, #eceef1);
    overflow: hidden;
  }
  .ob-progress__fill {
    height: 100%;
    background: var(--accent, #3b5bdb);
    border-radius: inherit;
    transition: width var(--dur-slow, 320ms) var(--ease-out, ease-out);
  }

  .ob-card {
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-1, #e3e6ea);
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-2, 0 4px 16px rgba(0, 0, 0, 0.06));
    padding: var(--space-6, 32px);
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 24px);
  }
  @media (max-width: 560px) {
    .ob-card { padding: var(--space-5, 24px) var(--space-4, 16px); }
  }

  .ob-header { display: flex; flex-direction: column; gap: var(--space-2, 8px); }
  .ob-title {
    margin: 0;
    font-family: var(--font-display, inherit);
    font-size: var(--fs-2xl, 1.75rem);
    line-height: var(--lh-tight, 1.2);
    font-weight: var(--fw-bold, 700);
    color: var(--text-1, #14171a);
    text-wrap: balance;
    &:focus { outline: none; }
    &:focus-visible { outline: 2px solid var(--focus-color, #7b93ff); outline-offset: 4px; border-radius: var(--radius-sm, 4px); }
  }
  .ob-why {
    margin: 0;
    font-size: var(--fs-md, 1rem);
    line-height: var(--lh-normal, 1.5);
    color: var(--text-2, #4a5058);
  }
  .ob-why__label { font-weight: var(--fw-semibold, 600); color: var(--text-1, #14171a); }

  .ob-body { display: flex; flex-direction: column; gap: var(--space-4, 16px); }

  .ob-skipnote {
    margin: 0;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-radius: var(--radius-md, 8px);
    background: var(--surface-2, #f4f5f7);
    color: var(--text-2, #4a5058);
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.5);
  }

  .ob-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3, 12px);
    flex-wrap: wrap;
  }
  .ob-footer__right { display: flex; gap: var(--space-3, 12px); margin-left: auto; flex-wrap: wrap; }

  /* Shared field styles for every onboarding step. Hint text is smaller and lighter than input text. */
  .ob-shell :global(.ob-field) { display: flex; flex-direction: column; gap: var(--space-2, 8px); }
  .ob-shell :global(.ob-label) {
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #14171a);
  }
  .ob-shell :global(.ob-hint) {
    margin: 0;
    font-size: var(--fs-xs, 0.8125rem);
    color: var(--text-3, #6b7280);
    line-height: var(--lh-normal, 1.5);
  }
  .ob-shell :global(.ob-input),
  .ob-shell :global(.ob-textarea),
  .ob-shell :global(.ob-select) {
    width: 100%;
    box-sizing: border-box;
    font: inherit;
    font-size: var(--fs-lg, 1.125rem);
    color: var(--text-1, #14171a);
    background: var(--surface-0, #fff);
    border: 1px solid var(--border-2, #c9ced6);
    border-radius: var(--radius-md, 8px);
    padding: var(--space-3, 12px) var(--space-4, 16px);
    transition: border-color var(--dur-fast, 120ms), box-shadow var(--dur-fast, 120ms);
  }
  .ob-shell :global(.ob-textarea) { min-height: 6rem; resize: vertical; font-size: var(--fs-md, 1rem); }
  .ob-shell :global(.ob-input::placeholder),
  .ob-shell :global(.ob-textarea::placeholder) { color: var(--text-3, #8a9099); font-size: var(--fs-md, 1rem); }
  .ob-shell :global(.ob-input:focus-visible),
  .ob-shell :global(.ob-textarea:focus-visible),
  .ob-shell :global(.ob-select:focus-visible) {
    outline: none;
    border-color: var(--accent, #3b5bdb);
    box-shadow: var(--focus-ring);
  }
  .ob-shell :global(.ob-input[aria-invalid="true"]),
  .ob-shell :global(.ob-textarea[aria-invalid="true"]) { border-color: var(--danger, #c92a2a); }
  .ob-shell :global(.ob-error) {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--danger, #c92a2a);
    background: var(--danger-soft, #fff0f0);
    border-radius: var(--radius-md, 8px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
  }
  .ob-shell :global(.ob-success) {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--success, #2b8a3e);
    background: var(--success-soft, #ebfbee);
    border-radius: var(--radius-md, 8px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
  }

  /* One primary, one secondary, one tertiary (text link) style. */
  .ob-shell :global(.ob-btn) {
    font: inherit;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    border-radius: var(--radius-md, 8px);
    padding: var(--space-3, 12px) var(--space-5, 24px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2, 8px);
    min-height: 44px;
    border: 1px solid transparent;
    transition: background var(--dur-fast, 120ms), border-color var(--dur-fast, 120ms), color var(--dur-fast, 120ms);
  }
  .ob-shell :global(.ob-btn:focus-visible) { outline: 2px solid var(--focus-color, #7b93ff); outline-offset: 2px; }
  .ob-shell :global(.ob-btn:disabled) { opacity: 0.55; cursor: not-allowed; }
  .ob-shell :global(.ob-btn--primary) { background: var(--accent, #3b5bdb); color: var(--accent-contrast, #fff); }
  .ob-shell :global(.ob-btn--primary:hover:not(:disabled)) { background: var(--accent-hover, #2f4ac0); }
  .ob-shell :global(.ob-btn--secondary) { background: var(--surface-1, #fff); color: var(--text-1, #14171a); border-color: var(--border-2, #c9ced6); }
  .ob-shell :global(.ob-btn--secondary:hover:not(:disabled)) { background: var(--surface-2, #f4f5f7); }
  .ob-shell :global(.ob-btn--tertiary) {
    background: none;
    color: var(--text-link, #3b5bdb);
    padding-left: var(--space-2, 8px);
    padding-right: var(--space-2, 8px);
    text-decoration: underline;
    text-underline-offset: 3px;
  }
  .ob-shell :global(.ob-btn--tertiary:hover:not(:disabled)) { color: var(--accent-hover, #2f4ac0); }

  .ob-spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: 50%;
    animation: ob-spin 0.8s linear infinite;
  }
  @keyframes ob-spin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .ob-spinner { animation-duration: 2s; } }
</style>
