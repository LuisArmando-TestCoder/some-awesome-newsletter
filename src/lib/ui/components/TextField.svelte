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
    /** Why the field is unavailable, shown under the label while disabled. */
    disabledReason?: string;
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
    disabledReason,
    'aria-describedby': extraDescribedBy,
    ...rest
  }: Props = $props();

  let revealed = $state(false);
  const inputType = $derived(type === 'password' && revealed ? 'text' : type);
  const filled = $derived(value !== null && value !== undefined && String(value) !== '');
  const shownHint = $derived(
    disabled && disabledReason ? [hint, disabledReason].filter(Boolean).join(' ') : hint
  );
</script>

{#snippet affix(content: Affix, kind: 'prefix' | 'suffix')}
  <span class="text-field__affix text-field__affix--{kind}">
    {#if typeof content === 'string'}{content}{:else}{@render content()}{/if}
  </span>
{/snippet}

<Field {label} {id} hint={shownHint} {error} {required} {optional} {hideLabel} class={className}>
  {#snippet children({ id: controlId, describedBy, invalid })}
    <div
      class="text-field"
      class:text-field--sm={size === 'sm'}
      class:text-field--invalid={invalid}
      class:text-field--disabled={disabled}
      class:text-field--readonly={readonly}
      class:text-field--filled={filled}
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
          <svg class="text-field__reveal-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
            <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
            <circle cx="12" cy="12" r="2.75" fill="none" stroke="currentColor" stroke-width="1.6" />
            {#if revealed}<path d="M4 4l16 16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" />{/if}
          </svg>
          <span>{revealed ? hidePasswordText : showPasswordText}</span>
        </button>
      {/if}
    </div>
  {/snippet}
</Field>

<style lang="scss">
  /* Field shell: thin edge, soft radius, ink focus. Empty sits on the quiet surface, filled on paper. */
  .text-field {
    display: flex;
    align-items: stretch;
    min-height: var(--control-h);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &--filled,
    &:focus-within {
      background: var(--surface-0);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.text-field--disabled, .text-field--readonly, :focus-within) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-within {
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    /* Invalid wins over hover and focus: the parent error, or the browser's after-blur check. */
    &--invalid,
    &--invalid:hover,
    &--invalid:focus-within,
    &:has(.text-field__input:user-invalid) {
      border-color: var(--danger);
    }

    &--sm {
      min-height: var(--control-h-sm);
    }

    &--disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      opacity: var(--disabled-opacity);
      cursor: not-allowed;
    }

    /* Read-only: value stays readable and selectable, the chrome goes quiet. */
    &--readonly {
      background: var(--surface-2);
      border-color: transparent;
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
    caret-color: var(--text-1);
    outline: none;
    appearance: none;

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:disabled {
      color: var(--text-2);
      cursor: not-allowed;
    }

    &[readonly] {
      background: transparent;
      cursor: text;
    }

    /* The wrapper shows focus, so the global outline is not needed here. */
    &:focus-visible {
      outline: none;
    }
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  .text-field__input:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    caret-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  .text-field__input:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
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
    position: relative;
    flex: none;
    align-self: center;
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: 2rem;
    min-width: 2rem;
    margin-right: var(--space-1);
    padding: 0 var(--space-3);
    background: transparent;
    border: 0;
    border-radius: var(--radius-full);
    color: var(--text-2);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background: var(--surface-2);
        color: var(--text-1);
        transition-duration: var(--t-in);
      }
    }

    &:active:not(:disabled) {
      background: var(--surface-3);
      transform: scale(0.97);
      transition-duration: 60ms;
    }

    &[aria-pressed='true'] {
      color: var(--text-1);
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

  .text-field__reveal-icon {
    width: 1rem;
    height: 1rem;
  }

  @media (forced-colors: active) {
    .text-field {
      border-color: FieldText;
    }
    .text-field:focus-within {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .text-field--invalid {
      border-style: dashed;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .text-field__reveal:active {
      transform: none;
    }
  }
</style>
