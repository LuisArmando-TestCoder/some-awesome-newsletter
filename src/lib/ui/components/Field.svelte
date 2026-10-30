<script lang="ts" module>
  export type FieldControlProps = {
    /** id to put on the native control so the label points at it. */
    id: string;
    /** Space separated ids of the hint and error, for aria-describedby. */
    describedBy: string | undefined;
    /** True when an error is shown. Use for aria-invalid. */
    invalid: boolean;
  };
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    label: string;
    id?: string;
    hint?: string;
    /** Message from the parent. Show it only after submit or blur. */
    error?: string;
    required?: boolean;
    optional?: boolean;
    /** Keeps the label for screen readers but hides it visually. */
    hideLabel?: boolean;
    optionalText?: string;
    class?: string;
    children: Snippet<[FieldControlProps]>;
  }

  let {
    label,
    id,
    hint,
    error,
    required = false,
    optional = false,
    hideLabel = false,
    optionalText = 'Optional',
    class: className = '',
    children
  }: Props = $props();

  const uid = $props.id();
  const controlId = $derived(id ?? `field-${uid}`);
  const hintId = $derived(`${controlId}-hint`);
  const errorId = $derived(`${controlId}-error`);
  const invalid = $derived(!!error);
  const describedBy = $derived(
    [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined
  );
</script>

<div class="field {className}" class:field--invalid={invalid}>
  <label for={controlId} class="field__label" class:sr-only={hideLabel}>
    <span class="field__label-text">{label}</span>
    {#if required}<span class="field__required" aria-hidden="true">*</span>{/if}
    {#if optional && !required}<span class="field__optional">{optionalText}</span>{/if}
  </label>

  {#if hint}
    <p id={hintId} class="field__hint">{hint}</p>
  {/if}

  {@render children({ id: controlId, describedBy, invalid })}

  <div class="field__error-region" aria-live="polite">
    {#if error}
      <p id={errorId} class="field__error">
        <svg class="field__error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" />
          <path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />
        </svg>
        <span>{error}</span>
      </p>
    {/if}
  </div>
</div>

<style lang="scss">
  .field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
    width: 100%;
    font-family: var(--font-body);
  }

  .field__label {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-2);
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .field__required {
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }

  .field__optional {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
  }

  .field__hint {
    margin: 0;
    margin-top: calc(-1 * var(--space-1));
    color: var(--text-3);
    font-size: var(--fs-sm);
    font-style: normal;
    line-height: var(--lh-normal);
  }

  /* Keep the live region in the tree, but cancel its gap while it is empty. */
  .field__error-region:not(:has(.field__error)) {
    margin-top: calc(-1 * var(--space-2));
  }

  .field__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .field__error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  /* One short nudge when an error appears (off under reduced motion). */
  @media (prefers-reduced-motion: no-preference) {
    :global(:root:not([data-motion='reduced'])) .field__error {
      animation: field-error-in var(--dur-base) var(--ease-out);
    }
  }
  @keyframes field-error-in {
    from {
      opacity: 0;
      transform: translateY(-0.25rem);
    }
  }

  @media (forced-colors: active) {
    .field__error {
      color: CanvasText;
    }
  }
</style>
