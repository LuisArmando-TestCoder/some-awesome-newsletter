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
  class="switch-wrapper"
  role="switch"
  tabindex="0"
  aria-checked={toggled}
  aria-label="Toggle Period"
  on:click={toggle}
  on:keydown={handleKeyDown}
>
  <div class="switch-track" class:toggled>
    <div class="switch-fill"></div>
    
    <div class="switch-knob-container">
      <div class="switch-knob">
        <div class="knob-icon off">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </div>
        <div class="knob-icon on">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </div>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  /* --- Variables derived from your Pricing Section --- */
  :root {
    --sw-width: 56px;
    --sw-height: 32px;
    --sw-pad: 4px;
    
    /* Colors */
    --sw-bg-off: #e2e8f0;         /* Slate 200 */
    --sw-bg-on: #4f46e5;          /* Indigo 600 (Brand Primary) */
    --sw-knob: #ffffff;
    --sw-icon-off: #94a3b8;       /* Slate 400 */
    --sw-icon-on: #4f46e5;        /* Brand Primary */
    
    /* Physics */
    --sw-ease: cubic-bezier(0.25, 0.8, 0.25, 1);
  }

  .switch-wrapper {
    display: inline-flex;
    cursor: pointer;
    user-select: none;
    outline: none;
    -webkit-tap-highlight-color: transparent;
    border-radius: 99px;

    /* Accessibility Focus Ring */
    &:focus-visible .switch-track {
      box-shadow: 
        0 0 0 2px #fff,
        0 0 0 4px var(--sw-bg-on);
    }
  }

  .switch-track {
    position: relative;
    width: var(--sw-width);
    height: var(--sw-height);
    background: var(--sw-bg-off);
    border-radius: 99px;
    transition: background-color 0.4s var(--sw-ease), box-shadow 0.2s ease;
    
    /* Inner shadow creates the "recessed" groove look */
    box-shadow: inset 0 2px 4px rgba(0,0,0,0.06);
    border: 1px solid rgba(0,0,0,0.05);

    &.toggled {
      background: var(--sw-bg-on);
      /* Remove inner shadow when active for a "filled" look */
      box-shadow: none;
      border-color: transparent;
    }
  }

  /* The container moves the knob. 
     Separating container (position) from knob (style) allows for 
     morphing animations without layout shifts. */
  .switch-knob-container {
    position: absolute;
    top: var(--sw-pad);
    left: var(--sw-pad);
    width: calc(var(--sw-height) - (var(--sw-pad) * 2));
    height: calc(var(--sw-height) - (var(--sw-pad) * 2));
    transition: transform 0.4s var(--sw-ease);
    will-change: transform;
    pointer-events: none;
  }

  /* Move the knob when toggled */
  .toggled .switch-knob-container {
    transform: translateX(calc(var(--sw-width) - var(--sw-height)));
  }

  .switch-knob {
    width: 100%;
    height: 100%;
    background: var(--sw-knob);
    border-radius: 50%;
    
    /* High quality floating shadow */
    box-shadow: 
      0 2px 4px 0 rgba(0,0,0,0.2), 
      0 1px 1px 0 rgba(0,0,0,0.1);
      
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* --- Icon Animations --- */
  .knob-icon {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity 0.3s ease, transform 0.4s var(--sw-ease);
    
    svg {
      width: 12px;
      height: 12px;
    }

    &.off {
      opacity: 1;
      transform: scale(1) rotate(0deg);
      color: var(--sw-icon-off);
    }
    
    &.on {
      opacity: 0;
      transform: scale(0.5) rotate(-45deg);
      color: var(--sw-icon-on);
    }
  }

  /* State: Toggled Active */
  .toggled {
    .knob-icon.off {
      opacity: 0;
      transform: scale(0.5) rotate(45deg);
    }
    .knob-icon.on {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
  }

  /* --- Hover Micro-interaction --- */
  .switch-wrapper:hover .switch-knob {
    /* Subtle scale up on hover */
    transform: scale(1.05);
    box-shadow: 
      0 4px 6px -1px rgba(0,0,0,0.2), 
      0 2px 4px -1px rgba(0,0,0,0.1);
  }
</style>