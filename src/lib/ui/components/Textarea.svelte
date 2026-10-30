<script lang="ts" module>
  let textareaCount = 0;
</script>

<script lang="ts">
  export let value = '';
  export let placeholder = '';
  /** Visible label. When empty, the placeholder becomes the accessible name. */
  export let label = '';
  /** Help text under the label. */
  export let hint = '';
  /** Message from the parent. Show it only after submit or blur. */
  export let error = '';
  export let rows = 4;
  export let id: string | undefined = undefined;

  const autoId = `textarea-${++textareaCount}`;
  $: controlId = id ?? autoId;
  $: hintId = `${controlId}-hint`;
  $: errorId = `${controlId}-error`;
  $: describedBy = [hint ? hintId : '', error ? errorId : ''].filter(Boolean).join(' ') || undefined;

  function autosize(node: HTMLTextAreaElement) {
    const fit = () => {
      if (CSS.supports('field-sizing: content')) return;
      node.style.height = 'auto';
      node.style.height = node.scrollHeight + 'px';
    };
    node.addEventListener('input', fit);
    const ro = new ResizeObserver(fit);
    ro.observe(node);
    fit();
    return {
      destroy() {
        node.removeEventListener('input', fit);
        ro.disconnect();
      }
    };
  }
</script>

<div class="textarea-field" class:textarea-field--invalid={!!error}>
  {#if label}
    <label class="textarea-field__label" for={controlId}>{label}</label>
  {/if}
  {#if hint}
    <p id={hintId} class="textarea-field__hint">{hint}</p>
  {/if}
  <textarea
    {...$$restProps}
    id={controlId}
    {placeholder}
    {rows}
    bind:value
    use:autosize
    class="form__textarea"
    aria-label={label ? undefined : placeholder || undefined}
    aria-describedby={describedBy}
    aria-invalid={error ? true : undefined}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
  ></textarea>
  <div class="textarea-field__error-region" aria-live="polite">
  {#if error}
    <p id={errorId} class="textarea-field__error"><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{error}</span></p>
  {/if}
  </div>
</div>

<style lang="scss">
  .textarea-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
    font-family: var(--font-body);
  }

  .textarea-field__label {
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .textarea-field__hint {
    margin: calc(-1 * var(--space-1)) 0 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }


  /* Field: thin edge, soft radius, ink focus. Empty sits on the quiet surface, filled on paper. */
  .form__textarea {
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

    &:not(:placeholder-shown),
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
  .form__textarea:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    caret-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  .form__textarea:-webkit-autofill:focus-visible {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  .form__textarea:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }

  .textarea-field--invalid .form__textarea,
  .textarea-field--invalid .form__textarea:hover {
    border-color: var(--danger);
  }

  @media (forced-colors: active) {
    .form__textarea {
      border-color: FieldText;
    }
    .form__textarea:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .form__textarea[aria-invalid='true'] {
      border-style: dashed;
    }
  }

  .form__textarea {
    field-sizing: content;
    display: block;
    max-width: 100%;
    min-height: 6rem;
    max-height: 60dvh;
    padding: var(--space-3) var(--control-pad-x);
    line-height: var(--lh-normal);
    resize: vertical;
    overflow: auto;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
  }

  .textarea-field__error-region:not(:has(.textarea-field__error)) {
    margin-top: calc(-1 * var(--space-2));
  }

  .textarea-field__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
  .textarea-field__error .error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }
  @media (forced-colors: active) {
    .textarea-field__error {
      color: CanvasText;
    }
  }
</style>
