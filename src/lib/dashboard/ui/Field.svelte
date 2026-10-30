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
  {#if error}<p class="field__error" id="{id}-error" role="alert">{error}</p>{/if}
</div>

<style lang="scss">
  .field { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
  .field__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); display: flex; gap: var(--space-2); align-items: baseline; }
  .field__opt { font-weight: var(--fw-regular); color: var(--text-3); font-size: var(--fs-xs); }
  .field__hint { margin: 0; font-size: var(--fs-xs); color: var(--text-3); line-height: var(--lh-normal); }
  .field__error { margin: 0; font-size: var(--fs-xs); color: var(--danger); font-weight: var(--fw-medium); }
  .field :global(input:not([type="checkbox"]):not([type="radio"]):not([type="color"])),
  .field :global(select),
  .field :global(textarea) {
    width: 100%;
    min-height: var(--control-h, 44px);
    padding: var(--space-2) var(--space-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    color: var(--text-1);
    font: inherit;
    font-size: var(--fs-md);
    box-sizing: border-box;
  }
  .field :global(textarea) { min-height: 120px; resize: vertical; line-height: var(--lh-normal); }
  .field :global(input::placeholder), .field :global(textarea::placeholder) { color: var(--text-3); font-size: var(--fs-sm); }
  .field :global(input:focus-visible), .field :global(select:focus-visible), .field :global(textarea:focus-visible) { outline: none; box-shadow: var(--focus-ring); border-color: var(--accent); }
  .has-error :global(input), .has-error :global(select), .has-error :global(textarea) { border-color: var(--danger); }
</style>
