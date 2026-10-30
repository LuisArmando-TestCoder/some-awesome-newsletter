<script lang="ts" module>
  export type RadioOption = { value: string; label: string; description?: string; disabled?: boolean };
</script>

<script lang="ts">
  import Radio from './Radio.svelte';

  interface Props {
    value?: string;
    legend: string;
    options: RadioOption[];
    name?: string;
    orientation?: 'vertical' | 'horizontal';
    hint?: string;
    /** Message from the parent. Show it only after submit. */
    error?: string;
    required?: boolean;
    optional?: boolean;
    optionalText?: string;
    disabled?: boolean;
    hideLegend?: boolean;
    id?: string;
    class?: string;
    onchange?: (value: string) => void;
  }

  let {
    value = $bindable(''),
    legend,
    options,
    name,
    orientation = 'vertical',
    hint,
    error,
    required = false,
    optional = false,
    optionalText = 'Optional',
    disabled = false,
    hideLegend = false,
    id,
    class: className = '',
    onchange
  }: Props = $props();

  const uid = $props.id();
  const groupId = $derived(id ?? `radio-group-${uid}`);
  const groupName = $derived(name ?? groupId);
  const hintId = $derived(`${groupId}-hint`);
  const errorId = $derived(`${groupId}-error`);
  const describedBy = $derived(
    [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined
  );
</script>

<fieldset
  id={groupId}
  class="radio-group {className}"
  class:radio-group--invalid={!!error}
  aria-describedby={describedBy}
  {disabled}
>
  <legend class="radio-group__legend" class:sr-only={hideLegend}>
    <span>{legend}</span>
    {#if required}<span class="radio-group__required" aria-hidden="true">*</span>{/if}
    {#if optional && !required}<span class="radio-group__optional">{optionalText}</span>{/if}
  </legend>

  {#if hint}
    <p id={hintId} class="radio-group__hint">{hint}</p>
  {/if}

  <div class="radio-group__options radio-group__options--{orientation}">
    {#each options as option (option.value)}
      <Radio
        bind:group={value}
        name={groupName}
        value={option.value}
        label={option.label}
        description={option.description}
        disabled={disabled || option.disabled}
        invalid={!!error}
        {required}
        onchange={(e) => onchange?.(e.currentTarget.value)}
      />
    {/each}
  </div>

  <div class="radio-group__error-region" aria-live="polite">
    {#if error}
      <p id={errorId} class="radio-group__error">
        <svg class="radio-group__error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
        <span>{error}</span>
      </p>
    {/if}
  </div>
</fieldset>

<style lang="scss">
  .radio-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
    margin: 0;
    padding: 0;
    border: 0;
    font-family: var(--font-body);
  }

  .radio-group__legend {
    display: inline-flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: var(--space-1) var(--space-2);
    margin-bottom: var(--space-1);
    padding: 0;
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .radio-group__required {
    color: var(--text-2);
    font-weight: var(--fw-semibold);
  }

  .radio-group__optional {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
  }

  .radio-group__hint {
    margin: calc(-1 * var(--space-2)) 0 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  .radio-group__options {
    display: flex;
    gap: var(--space-3);

    &--vertical {
      flex-direction: column;
    }

    &--horizontal {
      flex-direction: row;
      flex-wrap: wrap;
      gap: var(--space-3) var(--space-5);
    }
  }

  .radio-group__error-region:not(:has(.radio-group__error)) {
    margin-top: calc(-1 * var(--space-3));
  }

  .radio-group__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .radio-group__error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  .radio-group:disabled .radio-group__legend {
    color: var(--text-3);
  }

  @media (forced-colors: active) {
    .radio-group__error {
      color: CanvasText;
    }
  }
</style>
