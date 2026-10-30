<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLInputAttributes } from 'svelte/elements';
  import Field from './Field.svelte';

  type Affix = string | Snippet;

  interface Props
    extends Omit<HTMLInputAttributes, 'value' | 'type' | 'size' | 'prefix' | 'id' | 'class'> {
    value?: string | number | null;
    label: string;
    type?: 'text' | 'email' | 'url' | 'password' | 'tel' | 'number' | 'search' | 'date';
    placeholder?: string;
    hint?: string;
    /** Message from the parent. Show it only after submit or blur. */
    error?: string;
    required?: boolean;
    optional?: boolean;
    disabled?: boolean;
    readonly?: boolean;
    hideLabel?: boolean;
    /** Text or snippet shown before the value, for example "https://". */
    prefix?: Affix;
    /** Text or snippet shown after the value, for example "%". */
    suffix?: Affix;
    size?: 'sm' | 'md';
    id?: string;
    class?: string;
    showPasswordText?: string;
    hidePasswordText?: string;
  }

  let {
    value = $bindable(''),
    label,
    type = 'text',
    placeholder,
    hint,
    error,
    required = false,
    optional = false,
    disabled = false,
    readonly = false,
    hideLabel = false,
    prefix,
    suffix,
    size = 'md',
    id,
    class: className = '',
    showPasswordText = 'Show',
    hidePasswordText = 'Hide',
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  let revealed = $state(false);
  const inputType = $derived(type === 'password' && revealed ? 'text' : type);
</script>

{#snippet affix(content: Affix, kind: 'prefix' | 'suffix')}
  <span class="text-field__affix text-field__affix--{kind}">
    {#if typeof content === 'string'}{content}{:else}{@render content()}{/if}
  </span>
{/snippet}

<Field {label} {id} {hint} {error} {required} {optional} {hideLabel} class={className}>
  {#snippet children({ id: controlId, describedBy, invalid })}
    <div
      class="text-field"
      class:text-field--sm={size === 'sm'}
      class:text-field--invalid={invalid}
      class:text-field--disabled={disabled}
      class:text-field--readonly={readonly}
    >
      {#if prefix}{@render affix(prefix, 'prefix')}{/if}
      <input
        {...rest}
        id={controlId}
        type={inputType}
        bind:value
        {placeholder}
        {required}
        {disabled}
        {readonly}
        aria-invalid={invalid || undefined}
        aria-describedby={[describedBy, extraDescribedBy].filter(Boolean).join(' ') || undefined}
        class="text-field__input"
      />
      {#if suffix}{@render affix(suffix, 'suffix')}{/if}
      {#if type === 'password'}
        <button
          type="button"
          class="text-field__reveal"
          aria-controls={controlId}
          aria-pressed={revealed}
          {disabled}
          onclick={() => (revealed = !revealed)}
        >
          {revealed ? hidePasswordText : showPasswordText}
        </button>
      {/if}
    </div>
  {/snippet}
</Field>

<style lang="scss">
  .text-field {
    display: flex;
    align-items: stretch;
    min-height: var(--control-h);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

    &:hover {
      border-color: var(--text-3);
    }

    &:focus-within {
      border-color: var(--accent);
      box-shadow: var(--focus-ring);
    }

    &--invalid,
    &--invalid:hover {
      border-color: var(--danger);
    }

    &--sm {
      min-height: var(--control-h-sm);
    }

    &--disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      cursor: not-allowed;
    }

    &--readonly {
      background: var(--surface-2);
    }
  }

  .text-field__input {
    flex: 1 1 auto;
    min-width: 0;
    width: 100%;
    margin: 0;
    padding: 0 var(--control-pad-x);
    background: transparent;
    border: 0;
    border-radius: inherit;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    outline: none;
    appearance: none;

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:disabled {
      color: var(--text-3);
      cursor: not-allowed;
    }

    /* The wrapper shows focus, so the global outline is not needed here. */
    &:focus-visible {
      outline: none;
    }
  }

  .text-field__affix {
    display: inline-flex;
    flex: none;
    align-items: center;
    color: var(--text-3);
    font-size: var(--fs-md);
    white-space: nowrap;
    user-select: none;

    &--prefix {
      padding-left: var(--control-pad-x);
      margin-right: calc(-1 * var(--control-pad-x) + var(--space-1));
    }

    &--suffix {
      padding-right: var(--control-pad-x);
      margin-left: calc(-1 * var(--control-pad-x) + var(--space-1));
    }
  }

  .text-field__reveal {
    flex: none;
    align-self: center;
    min-height: var(--space-5);
    min-width: var(--space-5);
    margin-right: var(--space-2);
    padding: 0 var(--space-2);
    background: transparent;
    border: 0;
    border-radius: var(--radius-sm);
    color: var(--text-link);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition: background-color var(--dur-fast) var(--ease-out);

    &:hover {
      background: var(--accent-soft);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      color: var(--text-3);
      background: transparent;
      cursor: not-allowed;
    }
  }
</style>
