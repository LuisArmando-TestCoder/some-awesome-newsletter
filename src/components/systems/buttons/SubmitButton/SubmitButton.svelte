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
    background: var(--color-background);
    backdrop-filter: blur(6px);
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    box-shadow: 0 0 10px -6.5px var(--color-background);
    transition: 0.15s;
    cursor: pointer;
    pointer-events: auto;
    user-select: none;
    color: var(--color-background-inversion);
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: 18px;
    border-radius: 30px;
    background:  var(--color-background);
    box-shadow: 0 0 17px -3px var(--color-background);
    
    &:hover {
      opacity: 1;
      box-shadow: 0px 0px 15px -7.5px var(--color-background);
      color: var(--color-background);
      background: var(--color-background-inversion);
      padding: 0.75rem 1.75rem;
    }

    &.inactive {
      pointer-events: none;
      opacity: 0.5;
    }
  }
</style>
