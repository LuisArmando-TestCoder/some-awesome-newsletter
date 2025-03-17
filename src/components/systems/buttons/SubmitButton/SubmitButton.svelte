<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  // Props for the glassmorphic submit button
  export let active: boolean = true;
  export let label: string = "Submit";
  export let callback: MouseEventHandler<HTMLButtonElement> = () => {};
</script>

<button
  class="submit-button {active ? 'active' : 'inactive'}"
  on:click={callback}
>
  {label}
</button>

<style lang="scss">
  .submit-button {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 10px -6.5px var(--color-background);
    transition:
      opacity 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
    opacity: 0.8;
    cursor: pointer;
    pointer-events: auto;
    user-select: none;

    &:hover {
      opacity: 1;
      transform: translateY(-2px);
      box-shadow: 0 0 10px -3px var(--color-background);
    }

    &.inactive {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
