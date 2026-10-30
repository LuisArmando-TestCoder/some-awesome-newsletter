<script lang="ts" module>
  export type SelectOption = { value: string; label: string; disabled?: boolean };
</script>

<script lang="ts">
  import type { HTMLSelectAttributes } from 'svelte/elements';
  import Field from './Field.svelte';

  interface Props extends Omit<HTMLSelectAttributes, 'value' | 'id' | 'class' | 'size'> {
    value?: string;
    label: string;
    options: SelectOption[];
    /** Shown as the first, unselectable option while nothing is chosen. */
    placeholder?: string;
    hint?: string;
    /** Message from the parent. Show it only after submit or blur. */
    error?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    hideLabel?: boolean;
    size?: 'sm' | 'md';
    id?: string;
    class?: string;
  }

  let {
    value = $bindable(''),
    label,
    options,
    placeholder,
    hint,
    error,
    required = false,
    optional = false,
    disabled = false,
    hideLabel = false,
    size = 'md',
    id,
    class: className = '',
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();
</script>

<Field {label} {id} {hint} {error} {required} {optional} {hideLabel} class={className}>
  {#snippet children({ id: controlId, describedBy, invalid })}
    <div
      class="select"
      class:select--sm={size === 'sm'}
      class:select--invalid={invalid}
      class:select--disabled={disabled}
    >
      <select
        {...rest}
        id={controlId}
        bind:value
        {required}
        {disabled}
        aria-invalid={invalid || undefined}
        aria-describedby={[describedBy, extraDescribedBy].filter(Boolean).join(' ') || undefined}
        class="select__control"
        class:select__control--empty={!value}
      >
        {#if placeholder}
          <option value="" disabled>{placeholder}</option>
        {/if}
        {#each options as option (option.value)}
          <option value={option.value} disabled={option.disabled}>{option.label}</option>
        {/each}
      </select>
      <span class="select__chevron" aria-hidden="true"></span>
    </div>
  {/snippet}
</Field>

<style lang="scss">
  .select {
    position: relative;
    display: flex;
  }

  .select__control {
    width: 100%;
    min-height: var(--control-h);
    margin: 0;
    padding: 0 calc(var(--control-pad-x) + var(--space-5)) 0 var(--control-pad-x);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    appearance: none;
    cursor: pointer;
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

    &:hover {
      border-color: var(--text-3);
    }

    &:focus-visible {
      outline: none;
      border-color: var(--accent);
      box-shadow: var(--focus-ring);
    }

    &--empty {
      color: var(--text-3);
    }

    &:disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      color: var(--text-3);
      cursor: not-allowed;
    }

    option {
      color: var(--text-1);
      background: var(--surface-1);
    }
  }

  .select--sm .select__control {
    min-height: var(--control-h-sm);
  }

  .select--invalid .select__control,
  .select--invalid .select__control:hover {
    border-color: var(--danger);
  }

  .select__chevron {
    position: absolute;
    top: 50%;
    right: var(--control-pad-x);
    width: 0.5rem;
    height: 0.5rem;
    border-right: 2px solid var(--text-2);
    border-bottom: 2px solid var(--text-2);
    transform: translateY(-70%) rotate(45deg);
    pointer-events: none;
  }

  .select--disabled .select__chevron {
    border-color: var(--text-3);
  }
</style>
