<!-- WS4. Form field wrapper: label, hint (what happens if you skip it), error after submit. -->
<script lang="ts">
  export let id: string;
  export let label: string;
  export let hint: string | null = null;
  export let error: string | null = null;
  export let optional = false;
  export let optionalLabel = "Optional";
</script>

<div class="field" class:has-error={!!error}>
  <label class="field__label" for={id}>
    {label}
    {#if optional}<span class="field__opt">{optionalLabel}</span>{/if}
  </label>
  <slot />
  {#if hint}<p class="field__hint" id="{id}-hint">{hint}</p>{/if}
  {#if error}
    <p class="field__error" id="{id}-error" role="alert">
      <svg class="field__error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
      <span>{error}</span>
    </p>
  {/if}
</div>

<style lang="scss">
  .field { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
  .field__label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-1); display: flex; gap: var(--space-2); align-items: baseline; }
  .field__opt { font-weight: var(--fw-regular); color: var(--text-3); font-size: var(--fs-xs); }
  .field__hint { margin: 0; font-size: var(--fs-xs); color: var(--text-3); line-height: var(--lh-normal); }
  .field__error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    color: var(--danger);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
  .field__error-icon { flex: none; width: 1em; height: 1em; margin-top: 0.15em; }

  /* Slotted controls: thin edge, soft radius, ink focus. Empty on the quiet surface, filled on paper. */
  .field :global(input:where(:not([type="checkbox"], [type="radio"], [type="color"], [type="range"], [type="file"]))),
  .field :global(select),
  .field :global(textarea) {
    width: 100%;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    color: var(--text-1);
    caret-color: var(--text-1);
    font: inherit;
    font-size: var(--fs-md);
    box-sizing: border-box;
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }
  .field :global(textarea) { min-height: 120px; resize: vertical; line-height: var(--lh-normal); }
  .field :global(input::placeholder), .field :global(textarea::placeholder) { color: var(--text-3); opacity: 1; }
  .field :global(input:not(:placeholder-shown)), .field :global(textarea:not(:placeholder-shown)), .field :global(select),
  .field :global(input:focus), .field :global(textarea:focus) { background: var(--surface-0); }
  @media (hover: hover) and (pointer: fine) {
    .field :global(:is(input, select, textarea):hover:not(:disabled):not([readonly]):not(:focus)) {
      border-color: var(--text-2);
      transition-duration: var(--t-in);
    }
  }
  .field :global(:is(input, select, textarea):focus-visible) { outline: none; box-shadow: var(--focus-ring); border-color: var(--text-1); }
  .field :global(:is(input, textarea)[readonly]) { background: var(--surface-2); border-color: transparent; cursor: text; }
  .field :global(:is(input, select, textarea):disabled) { background: var(--surface-2); border-color: var(--border-1); color: var(--text-2); opacity: var(--disabled-opacity); cursor: not-allowed; }
  .field :global(input:-webkit-autofill) {
    -webkit-text-fill-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  .field :global(input:autofill) { box-shadow: inset 0 0 0 100vmax var(--surface-2); }
  .field :global(:is(input, select, textarea):user-invalid),
  .field :global(:is(input, select, textarea)[aria-invalid="true"]),
  .has-error :global(input), .has-error :global(select), .has-error :global(textarea) { border-color: var(--danger); }

  @media (forced-colors: active) {
    .field :global(:is(input, select, textarea):focus-visible) { outline: 2px solid Highlight; outline-offset: 2px; }
    .field__error { color: CanvasText; }
  }
</style>
