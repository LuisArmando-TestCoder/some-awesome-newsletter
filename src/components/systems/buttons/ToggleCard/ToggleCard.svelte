<script context="module" lang="ts">
  let instanceCount = 0;
</script>

<script lang="ts">
  export let cardTitle: string;
  export let canReveal = false;
  export let isOpen = false;
  export let expanded = false;
  export let onChange: (isOpen: boolean) => void;

  const uid = `toggle-card-${++instanceCount}`;
  const headerId = `${uid}-header`;
  const contentId = `${uid}-content`;

  function toggle() {
    isOpen = !isOpen;
    onChange?.(isOpen);
  }
</script>

<div class="card" class:open={isOpen} class:can-reveal={canReveal}>
  <h3 class="card-heading">
    <button
      id={headerId}
      class="card-header"
      type="button"
      aria-expanded={isOpen}
      aria-controls={contentId}
      on:click={toggle}
    >
      <span class="card-title">{cardTitle ?? ""}</span>
      <span class="chevron" class:open={isOpen} aria-hidden="true"></span>
    </button>
  </h3>
  <div
    id={contentId}
    class="content-wrapper"
    class:open={isOpen}
    role="region"
    aria-labelledby={headerId}
    aria-hidden={isOpen ? undefined : "true"}
    inert={!isOpen}
  >
    <div class="content-inner">
      <div class="content" class:expanded>
        <slot></slot>
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .card {
    margin: var(--space-4) 0;
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    overflow: hidden;
    transition: box-shadow var(--dur-base) var(--ease-out);

    &:hover {
      box-shadow: var(--shadow-2);
    }
  }

  .card-heading {
    margin: 0;
    font: inherit;
  }

  .card-header {
    width: 100%;
    min-height: var(--control-h);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    padding: var(--space-3) var(--card-pad);
    border: none;
    background: transparent;
    color: var(--text-1);
    text-align: left;
    cursor: pointer;
    user-select: none;
    border-radius: var(--radius-lg);

    &:hover {
      background: var(--surface-2);
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--accent);
    }
  }

  .card-title {
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .chevron {
    flex: none;
    width: 0.625rem;
    height: 0.625rem;
    margin-right: var(--space-1);
    border-right: 2px solid var(--text-2);
    border-bottom: 2px solid var(--text-2);
    transform: translateY(-25%) rotate(45deg);
    transition: transform var(--dur-base) var(--ease-out);

    &.open {
      transform: translateY(25%) rotate(225deg);
    }
  }

  .content-wrapper {
    display: grid;
    grid-template-rows: 0fr;
    visibility: hidden;
    transition:
      grid-template-rows var(--dur-slow) var(--ease-out),
      visibility 0s linear var(--dur-slow);

    &.open {
      grid-template-rows: 1fr;
      visibility: visible;
      transition:
        grid-template-rows var(--dur-slow) var(--ease-out),
        visibility 0s linear 0s;
    }
  }

  .content-inner {
    min-height: 0;
    overflow: hidden;
  }

  .content-wrapper.open .content-inner {
    overflow: visible;
  }

  .content {
    display: grid;
    gap: var(--space-4);
    padding: var(--space-2) var(--card-pad) var(--card-pad);
    border-top: 1px solid var(--border-1);

    &.expanded {
      padding: var(--space-2) var(--card-pad) var(--card-pad);
    }
  }
</style>
