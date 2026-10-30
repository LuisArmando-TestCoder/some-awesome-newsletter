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
  {#if error}
    <p id={errorId} class="textarea-field__error">{error}</p>
  {/if}
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

  .form__textarea {
    field-sizing: content;
    display: block;
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    min-height: 6rem;
    max-height: 60dvh;
    margin: 0;
    padding: var(--space-3) var(--control-pad-x);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    resize: vertical;
    overflow: auto;
    overflow-wrap: break-word;
    word-break: break-word;
    white-space: pre-wrap;
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:hover {
      border-color: var(--text-3);
    }

    &:focus-visible {
      outline: none;
      border-color: var(--accent);
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      color: var(--text-3);
      cursor: not-allowed;
    }
  }

  .textarea-field--invalid .form__textarea,
  .textarea-field--invalid .form__textarea:hover {
    border-color: var(--danger);
  }

  .textarea-field__error {
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
</style>
