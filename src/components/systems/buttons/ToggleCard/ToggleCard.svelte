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
      <span class="chevron-box" aria-hidden="true">
        <svg class="chevron" class:open={isOpen} viewBox="0 0 16 16" focusable="false">
          <path d="M4 6.25 8 10.25l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
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
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: border-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        border-color: var(--border-2);
        transition-duration: var(--t-in);
      }
    }

    &.open {
      border-color: var(--border-2);
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
    border-radius: inherit;
    -webkit-tap-highlight-color: transparent;
    transition: background-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--surface-1);
        transition-duration: var(--t-in);
      }
      &:hover .chevron-box {
        background: var(--surface-2);
      }
    }

    &:active {
      background: var(--surface-2);
      transition-duration: 0ms;
    }

    &:focus-visible {
      outline: none;
      box-shadow: inset 0 0 0 2px var(--focus-color);
    }
  }

  .card-title {
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .chevron-box {
    flex: none;
    display: inline-grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: var(--radius-full);
    color: var(--text-2);
    transition: background-color var(--t-out) var(--ease-out);
  }

  /* Expanded: the chevron turns over (aria-expanded on the trigger carries the state). */
  .chevron {
    width: 1rem;
    height: 1rem;
    transition: transform var(--dur-slow) var(--ease-out);

    &.open {
      transform: rotate(180deg);
    }
  }

  @media (forced-colors: active) {
    .card {
      border-color: CanvasText;
    }
    .card-header:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: -2px;
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
