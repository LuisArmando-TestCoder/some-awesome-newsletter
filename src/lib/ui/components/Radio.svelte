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
  }

  .radio__control {
    position: relative;
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    width: var(--space-5);
    height: var(--space-5);
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
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      margin: auto;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: var(--radius-full);
      background: var(--accent-contrast);
      transform: scale(0);
      transition: transform var(--dur-fast) var(--ease-out);
    }
  }

  .radio:hover .radio__dot {
    border-color: var(--text-3);
  }

  .radio__input:focus-visible + .radio__dot {
    border-color: var(--accent);
    box-shadow: var(--focus-ring);
  }

  .radio__input:checked + .radio__dot {
    background: var(--accent);
    border-color: var(--accent);

    &::after {
      transform: scale(1);
    }
  }

  .radio--invalid .radio__dot {
    border-color: var(--danger);
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

    .radio__dot {
      background: var(--surface-2);
      border-color: var(--border-1);
    }

    .radio__input:checked + .radio__dot {
      background: var(--text-3);
      border-color: var(--text-3);
    }

    .radio__label,
    .radio__description {
      color: var(--text-3);
    }
  }
</style>
