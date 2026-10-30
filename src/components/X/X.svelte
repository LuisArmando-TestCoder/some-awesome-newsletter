<script lang="ts">
  export let trigger: (isChecked: boolean) => void;
  export let isChecked: boolean = false;
  /** Accessible name for the toggle. */
  export let ariaLabel: string = "Menu";
  let inputElement: Element;
</script>

<input
  on:click={() => {
    const triggerValue = trigger(isChecked);

    if (triggerValue === undefined) {
      isChecked = !isChecked;

      return;
    }

    isChecked = !!triggerValue;
  }}
  bind:this={inputElement}
  class="x {isChecked}"
  checked={isChecked}
  type="checkbox"
  aria-label={ariaLabel}
/>

<style lang="scss">
  @use './X.scss';
</style>
