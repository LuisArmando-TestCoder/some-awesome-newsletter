<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'checked' | 'id' | 'class'> {
    checked?: boolean;
    /** Text next to the box. Also the accessible name. */
    label?: string;
    /** Use instead of label when the label needs links or formatting. */
    labelContent?: Snippet;
    description?: string;
    /** Message from the parent. Show it only after submit. */
    error?: string;
    indeterminate?: boolean;
    disabled?: boolean;
    required?: boolean;
    id?: string;
    class?: string;
  }

  let {
    checked = $bindable(false),
    label = '',
    labelContent,
    description,
    error,
    indeterminate = $bindable(false),
    disabled = false,
    required = false,
    id,
    class: className = '',
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const controlId = $derived(id ?? `checkbox-${uid}`);
  const descId = $derived(`${controlId}-desc`);
  const errorId = $derived(`${controlId}-error`);
  const describedBy = $derived(
    [description ? descId : '', error ? errorId : '', extraDescribedBy ?? '']
      .filter(Boolean)
      .join(' ') || undefined
  );
</script>

<div class="checkbox {className}" class:checkbox--disabled={disabled} class:checkbox--invalid={!!error}>
  <label class="checkbox__row" for={controlId}>
    <span class="checkbox__control">
      <input
        {...rest}
        id={controlId}
        type="checkbox"
        class="checkbox__input"
        bind:checked
        bind:indeterminate
        {disabled}
        {required}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
      />
      <span class="checkbox__box" aria-hidden="true"></span>
    </span>
    <span class="checkbox__text">
      <span class="checkbox__label">
        {#if labelContent}{@render labelContent()}{:else}{label}{/if}
      </span>
      {#if description}
        <span id={descId} class="checkbox__description">{description}</span>
      {/if}
    </span>
  </label>
  {#if error}
    <p id={errorId} class="checkbox__error">
      <svg class="checkbox__error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
      <span>{error}</span>
    </p>
  {/if}
</div>

<style lang="scss">
  .checkbox {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    font-family: var(--font-body);
  }

  .checkbox__row {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--space-3);
    min-height: var(--space-5);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* 24px hit box around an 18px square. The ::before halo is the state layer. */
  .checkbox__control {
    position: relative;
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--space-5);
    height: var(--space-5);

    &::before {
      content: '';
      position: absolute;
      inset: -0.375rem;
      border-radius: var(--radius-full);
      background: var(--text-1);
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--t-out) var(--ease-out);
    }
  }

  .checkbox__input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }

  .checkbox__box {
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-sm);
    transition:
      background-color var(--t-state) var(--ease-out),
      border-color var(--t-state) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      opacity: 0;
      transition:
        opacity var(--dur-fast) var(--ease-out),
        transform var(--dur-base) var(--ease-spring);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .checkbox:not(.checkbox--disabled) .checkbox__row:hover {
      .checkbox__control::before {
        opacity: 0.08;
        transition-duration: var(--t-in);
      }
      .checkbox__box {
        border-color: var(--text-2);
      }
    }
  }

  .checkbox:not(.checkbox--disabled) .checkbox__row:active {
    .checkbox__control::before {
      opacity: 0.12;
      transition-duration: 0ms;
    }
    .checkbox__box {
      transform: scale(0.9);
      transition-duration: 60ms;
    }
  }

  .checkbox__input:focus-visible + .checkbox__box {
    border-color: var(--text-1);
    box-shadow: var(--focus-ring);
  }

  /* Checked and mixed: ink fill plus a mark, so the state never rests on color. */
  .checkbox__input:checked + .checkbox__box,
  .checkbox__input:indeterminate + .checkbox__box {
    background: var(--text-1);
    border-color: var(--text-1);
  }

  .checkbox__input:checked + .checkbox__box::after {
    left: 50%;
    top: 45%;
    width: 0.3125rem;
    height: 0.625rem;
    border-right: 2px solid var(--surface-0);
    border-bottom: 2px solid var(--surface-0);
    transform: translate(-50%, -50%) rotate(45deg);
    opacity: 1;
  }

  .checkbox__input:indeterminate + .checkbox__box::after {
    left: 50%;
    top: 50%;
    width: 0.625rem;
    height: 2px;
    border: 0;
    border-radius: 1px;
    background: var(--surface-0);
    transform: translate(-50%, -50%);
    opacity: 1;
  }

  .checkbox--invalid .checkbox__box,
  .checkbox__input:user-invalid + .checkbox__box {
    border-color: var(--danger);
    border-width: 2px;
  }

  .checkbox__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-top: 0.0625rem;
  }

  .checkbox__label {
    color: var(--text-1);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
  }

  .checkbox__description {
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  .checkbox__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    padding-left: calc(var(--space-5) + var(--space-3));
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .checkbox__error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  .checkbox--disabled {
    opacity: var(--disabled-opacity);

    .checkbox__row {
      cursor: not-allowed;
    }

    .checkbox__box {
      background: var(--surface-2);
      border-color: var(--border-1);
    }

    .checkbox__input:checked + .checkbox__box,
    .checkbox__input:indeterminate + .checkbox__box {
      background: var(--text-3);
      border-color: var(--text-3);
    }
  }

  @media (forced-colors: active) {
    .checkbox__box {
      border-color: CanvasText;
    }
    .checkbox__input:checked + .checkbox__box,
    .checkbox__input:indeterminate + .checkbox__box {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;
    }
    .checkbox__input:checked + .checkbox__box::after {
      border-color: HighlightText;
    }
    .checkbox__input:indeterminate + .checkbox__box::after {
      background: HighlightText;
    }
    .checkbox__input:focus-visible + .checkbox__box {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .checkbox--disabled .checkbox__label {
      color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .checkbox__row:active .checkbox__box {
      transform: none;
    }
  }
</style>
