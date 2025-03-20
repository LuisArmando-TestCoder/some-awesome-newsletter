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
    <div
      class="switch-knob {toggled ? 'toggled' : ''}"
      style="transition-delay: .225s;"
    ></div>
  </div>
</div>

<!-- filters -->
<svg xmlns="http://www.w3.org/2000/svg" version="1.1" width="0" height="0">
  <defs>
    <filter id="shadowed-goo">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="goo"
      />
      <feGaussianBlur in="goo" stdDeviation="3" result="shadow" />
      <feColorMatrix
        in="shadow"
        mode="matrix"
        values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
        result="shadow"
      />
      <feOffset in="shadow" dx="1" dy="1" result="shadow" />
      <feBlend in2="shadow" in="goo" result="goo" />
      <feBlend in2="goo" in="SourceGraphic" result="mix" />
    </filter>
    <filter id="goo">
      <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="10" />
      <feColorMatrix
        in="blur"
        mode="matrix"
        values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
        result="goo"
      />
      <feBlend in2="goo" in="SourceGraphic" result="mix" />
    </filter>
  </defs>
</svg>
<filter id="goo">
  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" width="0" height="0" />
  <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
  <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
</filter>

<style lang="scss">
  .glass-switch {
    display: inline-block;
    cursor: pointer;
    user-select: none;
    outline: none;

    &:focus {
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
    filter: url("#goo");

    &:hover {
      box-shadow: 0 0 10px -3px var(--color-background);
    }
  }

  .switch-knob {
    --unit: 20px;
    width: var(--unit);
    height: var(--unit);
    background: var(--color-background);
    border-radius: 50%;
    position: absolute;
    top: 2px;
    left: 2px;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;

    &.toggled {
      transform: translateX(26px);
    }
  }
</style>
