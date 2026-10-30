<!-- WS4. Labeled on/off switch (role="switch"). The label is always visible text. -->
<script lang="ts">
  export let checked = false;
  export let label: string;
  export let hideLabel = false;
  export let disabled = false;
  export let busy = false;
  export let onchange: ((value: boolean) => void) | null = null;

  function toggle() {
    if (disabled || busy) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={hideLabel ? label : undefined}
  aria-busy={busy || undefined}
  class="tsw"
  class:on={checked}
  {disabled}
  on:click={toggle}
>
  <span class="tsw__track" aria-hidden="true"><span class="tsw__thumb"></span></span>
  {#if !hideLabel}<span class="tsw__label">{label}</span>{/if}
</button>

<style lang="scss">
  .tsw {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: 0;
    padding: var(--space-1);
    margin: calc(var(--space-1) * -1);
    font: inherit;
    font-size: var(--fs-sm);
    color: var(--text-1);
    cursor: pointer;
    border-radius: var(--radius-full);
    min-height: 32px;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &:disabled { opacity: 0.55; cursor: not-allowed; }
  }
  .tsw__track {
    position: relative;
    width: 40px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--border-2);
    transition: background-color var(--dur-base) var(--ease-out);
    flex-shrink: 0;
  }
  .tsw__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    width: 18px;
    height: 18px;
    border-radius: var(--radius-full);
    background: var(--surface-1);
    box-shadow: var(--shadow-1);
    transition: transform var(--dur-base) var(--ease-out);
  }
  .on .tsw__track { background: var(--accent); }
  .on .tsw__thumb { transform: translateX(16px); }
  .tsw[aria-busy="true"] .tsw__thumb { opacity: 0.6; }
</style>
