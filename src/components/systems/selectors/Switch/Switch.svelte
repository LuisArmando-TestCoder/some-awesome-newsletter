<script lang="ts">
  import { writable } from "svelte/store";

  // Prop: initial state of the switch (default: false)
  export let toggled: boolean = false;
  // Callback to be invoked when the switch state changes.
  export let onChange: (newState: boolean) => void = () => {};

  // Create a writable store for the switch state.
  export const switchStore = writable<boolean>(toggled);

  // Toggle function updates both the local state and the store, then calls onChange.
  function toggle() {
    toggled = !toggled;
    switchStore.set(toggled);
    onChange(toggled);
  }

  // Keyboard handler for accessibility: toggles on Enter or Space.
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  }
</script>

<div
  class="glass-switch"
  role="switch"
  tabindex="0"
  aria-checked={toggled}
  on:click={toggle}
  on:keydown={handleKeyDown}
>
  <div class="switch-track">
    <div class="switch-knob {toggled ? 'toggled' : ''}"></div>
  </div>
</div>

<style lang="scss">
  .glass-switch {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    outline: none;

    &:focus {
      box-shadow: 0 0 0 3px var(--color-foreground);
    }
  }

  .switch-track {
    width: 50px;
    height: 24px;
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border-radius: 12px;
    position: relative;
    transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 0 10px -6.5px var(--color-background);

    &:hover {
      box-shadow: 0 0 10px -3px var(--color-background);
    }
  }

  .switch-knob {
    width: 20px;
    height: 20px;
    background: var(--color-foreground);
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    box-shadow: 0 0 5px var(--color-foreground-opaque);

    &.toggled {
      transform: translateX(26px);
    }
  }
</style>
