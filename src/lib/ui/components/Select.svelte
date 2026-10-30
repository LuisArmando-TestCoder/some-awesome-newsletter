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
    /** Why the select is unavailable, shown under the label while disabled. */
    disabledReason?: string;
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
    disabledReason,
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  const shownHint = $derived(
    disabled && disabledReason ? [hint, disabledReason].filter(Boolean).join(' ') : hint
  );
</script>

<Field {label} {id} hint={shownHint} {error} {required} {optional} {hideLabel} class={className}>
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
      <svg class="select__chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
        <path d="M4 6.25 8 10.25l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
    </div>
  {/snippet}
</Field>

<style lang="scss">
  .select {
    position: relative;
    display: flex;
  }

  /* Field: thin edge, soft radius, ink focus. Empty sits on the quiet surface, filled on paper. */
  .select__control {
    box-sizing: border-box;
    width: 100%;
    min-height: var(--control-h);
    margin: 0;
    padding: 0 var(--control-pad-x);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    caret-color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:focus {
      background: var(--surface-0);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled, [readonly], :focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &[readonly] {
      background: var(--surface-2);
      border-color: transparent;
      cursor: text;
    }

    &:disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      color: var(--text-2);
      opacity: var(--disabled-opacity);
      cursor: not-allowed;
    }

    /* Invalid wins over hover and focus: the parent error, or the browser's after-blur check. */
    &[aria-invalid='true'],
    &:user-invalid {
      border-color: var(--danger);
    }
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  .select__control:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    caret-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  .select__control:-webkit-autofill:focus-visible {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  .select__control:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }

  .select--invalid .select__control,
  .select--invalid .select__control:hover {
    border-color: var(--danger);
  }

  @media (forced-colors: active) {
    .select__control {
      border-color: FieldText;
    }
    .select__control:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .select__control[aria-invalid='true'] {
      border-style: dashed;
    }
  }

  .select__control {
    padding: 0 calc(var(--control-pad-x) + var(--space-5)) 0 var(--control-pad-x);
    appearance: none;
    cursor: pointer;
    background: var(--surface-0);

    &--empty {
      color: var(--text-3);
      background: var(--surface-1);
    }

    &:disabled {
      cursor: not-allowed;
    }

    option {
      color: var(--text-1);
      background: var(--surface-0);
    }
  }

  .select--sm .select__control {
    min-height: var(--control-h-sm);
  }

  .select__chevron {
    position: absolute;
    top: 50%;
    right: var(--control-pad-x);
    width: 1rem;
    height: 1rem;
    color: var(--text-2);
    transform: translateY(-50%);
    pointer-events: none;
    transition: transform var(--dur-base) var(--ease-out), color var(--t-out) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .select:hover .select__control:not(:disabled) ~ .select__chevron {
      color: var(--text-1);
      transform: translateY(calc(-50% + 1px));
    }
  }
  .select__control:focus-visible ~ .select__chevron {
    color: var(--text-1);
  }

  .select--disabled .select__chevron {
    color: var(--text-3);
  }

  @media (forced-colors: active) {
    .select__chevron {
      color: FieldText;
    }
  }
</style>
