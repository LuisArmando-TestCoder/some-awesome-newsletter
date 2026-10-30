<script lang="ts">
  // Getting-started checklist card. Reflects real state (see checklist.ts).
  // Props let WS4 decide navigation; by default "Open" switches the dashboard tab.
  import { createEventDispatcher } from "svelte";
  import { saveToStore, stepsMapping } from "../../components/store";
  import { checklist, checklistHidden, setChecklistHidden, type ChecklistItem } from "./checklist";
  import { tt, fmt } from "./copy";

  /** Allow hiding the card. Onboarding shows it read-only. */
  export let dismissible = true;
  /** Hide the "Open" buttons (used in the onboarding summary). */
  export let showActions = true;
  /** Override navigation. Receives the item; default switches dashboard tab. */
  export let onOpen: ((item: ChecklistItem) => void) | null = null;
  export let headingLevel: 2 | 3 = 2;

  const dispatch = createEventDispatcher<{ open: ChecklistItem; hide: void }>();

  function open(item: ChecklistItem) {
    dispatch("open", item);
    if (onOpen) return onOpen(item);
    saveToStore({ stepsIndex: stepsMapping[item.target] });
  }

  $: percent = Math.round(($checklist.done / $checklist.total) * 100);
  /** The next thing to do: the first open item. Marked as the current step. */
  $: currentId = $checklist.items.find((i) => !i.done)?.id;
</script>

{#if !$checklistHidden || !dismissible}
  <section class="gs" aria-labelledby="gs-title">
    <header class="gs__head">
      <div>
        <svelte:element this={"h" + headingLevel} id="gs-title" class="gs__title">{$tt.checklistTitle}</svelte:element>
        <p class="gs__progress">
          {$checklist.complete ? $tt.checklistDone : fmt($tt.checklistProgress, { done: $checklist.done, total: $checklist.total })}
        </p>
      </div>
      {#if dismissible}
        <button
          type="button"
          class="gs__link"
          on:click={() => {
            setChecklistHidden(true);
            dispatch("hide");
          }}>{$tt.dismiss}</button
        >
      {/if}
    </header>
    <div class="gs__bar" role="progressbar" aria-valuemin="0" aria-valuemax={$checklist.total} aria-valuenow={$checklist.done} aria-label={$tt.checklistTitle}>
      <div style="--gs-pct: {percent / 100}"></div>
    </div>
    <ol class="gs__list">
      {#each $checklist.items as item (item.id)}
        <li class="gs__item" class:done={item.done} class:current={item.id === currentId} aria-current={item.id === currentId ? "step" : undefined}>
          <span class="gs__check" aria-hidden="true">
            {#if item.done}
              <svg viewBox="0 0 16 16" width="14" height="14"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
            {/if}
          </span>
          <div class="gs__text">
            <span class="gs__item-title">
              {$tt.items[item.id].title}
              <span class="sr-only">({item.done ? $tt.doneLabel : $tt.todoLabel})</span>
            </span>
            {#if !item.done}<span class="gs__item-body">{$tt.items[item.id].body}</span>{/if}
          </div>
          {#if showActions && !item.done}
            <button type="button" class="gs__open" on:click={() => open(item)}>{$tt.open}<span class="gs__arrow" aria-hidden="true">&rarr;</span></button>
          {/if}
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style lang="scss">
  /* Getting started: a numbered list with clear done / current / to do states.
     Done = filled check + struck title. Current = ink ring + bold title + action. */
  .gs {
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    padding: var(--space-5) var(--space-5) var(--space-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
    color: var(--text-1);
    font-family: var(--font-body);
  }
  .gs__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-3);
  }
  .gs__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .gs__progress {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }
  .gs__link {
    flex: none;
    background: none;
    border: 0;
    padding: 0 var(--space-2);
    min-height: var(--control-h);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
    cursor: pointer;
    box-shadow: none;
    border-radius: var(--radius-sm);
    transition:
      color var(--t-out) var(--ease-out),
      text-decoration-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        box-shadow: none;
        color: var(--text-1);
        text-decoration-color: currentColor;
        transition-duration: var(--t-in);
      }
    }
  }
  .gs__bar {
    height: 4px;
    border-radius: var(--radius-full);
    background: var(--border-1);
    overflow: hidden;

    div {
      height: 100%;
      width: 100%;
      background: var(--text-1);
      border-radius: inherit;
      transform-origin: left center;
      transform: scaleX(var(--gs-pct));
      transition: transform var(--dur-slow) var(--ease-out);
    }
  }
  .gs__list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
  }
  .gs__item {
    display: flex;
    align-items: center;
    gap: var(--space-4);
    min-height: 3.5rem;
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border-1);
    &:first-child {
      border-top: 0;
    }
  }
  .gs__check {
    flex: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: var(--radius-full);
    border: 1.5px solid var(--border-2);
    display: grid;
    place-items: center;
    color: var(--surface-0);
    transition:
      background-color var(--t-state) var(--ease-out),
      border-color var(--t-state) var(--ease-out);
  }
  .done .gs__check {
    background: var(--text-1);
    border-color: var(--text-1);
  }
  .current .gs__check {
    border: 2px solid var(--text-1);
    box-shadow: inset 0 0 0 3px var(--surface-0), inset 0 0 0 8px var(--text-1);
  }
  .gs__text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    flex: 1;
    min-width: 0;
  }
  .gs__item-title {
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
  }
  .current .gs__item-title {
    font-weight: var(--fw-semibold);
  }
  .done .gs__item-title {
    color: var(--text-3);
    text-decoration: line-through;
    text-decoration-color: var(--border-2);
  }
  .gs__item-body {
    font-size: var(--fs-sm);
    color: var(--text-3);
  }
  .gs__open {
    flex: none;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-4);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--surface-2);
        box-shadow: none;
        transition-duration: var(--t-in);

        .gs__arrow {
          transform: translateX(3px);
        }
      }
    }

    &:active {
      transform: scale(0.97);
      transition-duration: 60ms;
    }
  }
  /* The next step's action is the strong one. */
  .current .gs__open {
    background: var(--accent);
    color: var(--accent-contrast);
    border-color: var(--accent);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--accent-hover);
      }
    }
  }
  .gs__arrow {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }
  .gs__link:focus-visible,
  .gs__open:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0 0 0 0);
    white-space: nowrap;
  }
  @media (max-width: 30rem) {
    .gs {
      padding-inline: var(--space-4);
    }
    .gs__item {
      flex-wrap: wrap;
    }
    .gs__open {
      margin-left: calc(1.5rem + var(--space-4));
    }
  }
  @media (forced-colors: active) {
    .done .gs__check,
    .gs__bar div {
      background: CanvasText;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .gs__bar div,
    .gs__open {
      transition: none;
    }
    .gs__open:active {
      transform: none;
    }
  }
</style>
