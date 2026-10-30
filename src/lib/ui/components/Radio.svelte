<script lang="ts">
  import type { HTMLInputAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLInputAttributes, 'type' | 'value' | 'id' | 'class'> {
    /** The value currently chosen in the group. Bind it on every radio of the group. */
    group?: string;
    value: string;
    label: string;
    description?: string;
    name?: string;
    disabled?: boolean;
    invalid?: boolean;
    id?: string;
    class?: string;
  }

  let {
    group = $bindable(),
    value,
    label,
    description,
    name,
    disabled = false,
    invalid = false,
    id,
    class: className = '',
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const controlId = $derived(id ?? `radio-${uid}`);
  const descId = $derived(`${controlId}-desc`);
  const describedBy = $derived(
    [description ? descId : '', extraDescribedBy ?? ''].filter(Boolean).join(' ') || undefined
  );
</script>

<label class="radio {className}" class:radio--disabled={disabled} class:radio--invalid={invalid} for={controlId}>
  <span class="radio__control">
    <input
      {...rest}
      id={controlId}
      type="radio"
      class="radio__input"
      {name}
      {value}
      bind:group
      {disabled}
      aria-describedby={describedBy}
    />
    <span class="radio__dot" aria-hidden="true"></span>
  </span>
  <span class="radio__text">
    <span class="radio__label">{label}</span>
    {#if description}
      <span id={descId} class="radio__description">{description}</span>
    {/if}
  </span>
</label>

<style lang="scss">
  .radio {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--space-3);
    min-height: var(--space-5);
    font-family: var(--font-body);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }

  /* 24px hit box around an 18px ring. The ::before halo is the state layer. */
  .radio__control {
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

  .radio__input {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: inherit;
  }

  .radio__dot {
    position: relative;
    width: 1.125rem;
    height: 1.125rem;
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      background-color var(--t-state) var(--ease-out),
      border-color var(--t-state) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--radius-full);
      background: var(--surface-0);
      transform: scale(0);
      transition: transform var(--dur-base) var(--ease-spring);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .radio:not(.radio--disabled):hover {
      .radio__control::before {
        opacity: 0.08;
        transition-duration: var(--t-in);
      }
      .radio__dot {
        border-color: var(--text-2);
      }
    }
  }

  .radio:not(.radio--disabled):active {
    .radio__control::before {
      opacity: 0.12;
      transition-duration: 0ms;
    }
    .radio__dot {
      transform: scale(0.9);
      transition-duration: 60ms;
    }
  }

  .radio__input:focus-visible + .radio__dot {
    border-color: var(--text-1);
    box-shadow: var(--focus-ring);
  }

  /* Selected: ink ring with a paper dot inside, plus the label goes semibold. */
  .radio__input:checked + .radio__dot {
    background: var(--text-1);
    border-color: var(--text-1);

    &::after {
      transform: scale(1);
    }
  }
  .radio:has(.radio__input:checked) .radio__label {
    font-weight: var(--fw-medium);
  }

  .radio--invalid .radio__dot {
    border-color: var(--danger);
    border-width: 2px;
  }

  .radio__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-top: 0.0625rem;
  }

  .radio__label {
    color: var(--text-1);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
  }

  .radio__description {
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  .radio--disabled {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);

    .radio__dot {
      background: var(--surface-2);
      border-color: var(--border-1);
    }

    .radio__input:checked + .radio__dot {
      background: var(--text-3);
      border-color: var(--text-3);
    }
  }

  @media (forced-colors: active) {
    .radio__dot {
      border-color: CanvasText;
    }
    .radio__input:checked + .radio__dot {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;

      &::after {
        background: HighlightText;
      }
    }
    .radio__input:focus-visible + .radio__dot {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .radio--disabled .radio__label {
      color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .radio:active .radio__dot {
      transform: none;
    }
  }
</style>
