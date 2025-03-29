<script lang="ts">
  import TextTypes from "../../../../texts/TextTypes/TextTypes.svelte";
  import Switch from "../../../../selectors/Switch/Switch.svelte";
  // We don't import ToggleCard here, the consumer does.

  // --- Props ---

  /** Controls the auto-collapse (accordion) behavior */
  export let autoCollapse = true;

  /** Controls visibility/interactivity (passed down via slot props if needed) */
  export let canReveal = true; // Note: Consumer must use this if needed

  /** Optional ID of an item to be open initially */
  export let initiallyOpenId: string | number | null = null;

  // --- State ---

  /** Tracks the open/closed state of each item by its ID */
  let openStates: Record<string | number, boolean> = {};

  /** Flag to prevent re-running initial setup */
  let initialized = false;

  // --- Logic ---

  /** Initialize open state based on initiallyOpenId (runs once) */
  $: if (!initialized && initiallyOpenId !== null) {
    openStates = { [initiallyOpenId]: true };
    initialized = true; // Mark as initialized
  }

  /** Handles changes initiated by a child ToggleCard */
  function handleToggleChange(itemId: string | number, newState: boolean) {
    let newStates = { ...openStates }; // Create a mutable copy

    if (autoCollapse && newState) {
      // Auto-collapse ON and OPENING an item:
      // Close all others, open the target item.
      newStates = {}; // Reset all states
      newStates[itemId] = true; // Open only the current one
    } else {
      // Auto-collapse OFF OR CLOSING an item:
      // Just update the state for the specific item.
      if (newState) {
        newStates[itemId] = true;
      } else {
        delete newStates[itemId]; // Or set to false
      }
    }

    // Reassign to trigger Svelte's reactivity
    openStates = newStates;
  }

  /**
   * Function passed via slot props.
   * The consumer calls this for each toggleable item they render,
   * passing the item's unique ID.
   * Returns the necessary props (isOpen, onChange) for that item.
   */
  function getToggleProps(itemId: string | number): {
    isOpen: boolean;
    onChange: (isOpen: boolean) => void;
  } {
    return {
      isOpen: openStates[itemId] ?? false,
      onChange: (isOpen: boolean) => handleToggleChange(itemId, isOpen),
      // We could also pass canReveal here if needed: canReveal: canReveal
    };
  }

  /** Reactive dependency (ensures component updates if autoCollapse changes) */
  $: autoCollapse;
</script>

{#if canReveal}
  <!-- Auto Collapse Control UI -->
  <div class="horizontal">
    <div class="pad-right">
      <TextTypes type="sub-italic">Auto collapse is</TextTypes>
      <span class="text-space" class:highlight={autoCollapse}>
        {#key autoCollapse}
          {autoCollapse ? "on" : "off"}
        {/key}
      </span>
    </div>
    <Switch
      toggled={autoCollapse}
      onChange={(value) => {
        autoCollapse = value;
      }}
    />
  </div>

  <!-- Slot for consumer's content -->
  <div class="toggle-group">
    <!-- Pass the getToggleProps function back to the consumer -->
    <slot {getToggleProps}></slot>
  </div>
{:else}
  <!-- Optional: Render nothing or a placeholder if !canReveal -->
  <slot name="hidden"></slot>
  <!-- Allows consumer to provide content even when hidden -->
{/if}

<style lang="scss">
  /* Add the same styles as the previous DynamicAutoCollapseToggle */
  .horizontal-controls {
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    padding: 0.5rem;
  }
  .pad-right {
    margin-right: 0.75rem;
  }
  .text-space {
    margin-left: 0.25rem;
  }
  .highlight {
    font-weight: bold;
  }
  .toggle-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  /* Import shared styles if necessary */
  /* @use "./Dashboard.scss"; */
</style>
