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
      <div style="width: {percent}%"></div>
    </div>
    <ol class="gs__list">
      {#each $checklist.items as item (item.id)}
        <li class="gs__item" class:done={item.done}>
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
            <button type="button" class="gs__open" on:click={() => open(item)}>{$tt.open}</button>
          {/if}
        </li>
      {/each}
    </ol>
  </section>
{/if}

<style lang="scss">
  .gs {
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-1, #e3e6ea);
    border-radius: var(--radius-lg, 16px);
    padding: var(--space-5, 24px);
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    color: var(--text-1, #14171a);
    font-family: var(--font-body, inherit);
  }
  .gs__head { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-3, 12px); }
  .gs__title { margin: 0; font-size: var(--fs-lg, 1.125rem); font-weight: var(--fw-bold, 700); }
  .gs__progress { margin: var(--space-1, 4px) 0 0; font-size: var(--fs-sm, 0.875rem); color: var(--text-2, #4a5058); }
  .gs__link {
    background: none;
    border: 0;
    padding: var(--space-2, 8px);
    min-height: 44px;
    font: inherit;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-link, #3b5bdb);
    text-decoration: underline;
    cursor: pointer;
  }
  .gs__bar {
    height: 6px;
    border-radius: var(--radius-full, 999px);
    background: var(--surface-2, #eceef1);
    overflow: hidden;
    div { height: 100%; background: var(--success, #2b8a3e); transition: width var(--dur-slow, 320ms) var(--ease-out, ease-out); }
  }
  .gs__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
  .gs__item {
    display: flex;
    align-items: center;
    gap: var(--space-3, 12px);
    padding: var(--space-3, 12px) 0;
    border-top: 1px solid var(--border-1, #e3e6ea);
    &:first-child { border-top: 0; }
  }
  .gs__check {
    flex: none;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    border: 2px solid var(--border-2, #c9ced6);
    display: grid;
    place-items: center;
    color: var(--accent-contrast, #fff);
  }
  .done .gs__check { background: var(--success, #2b8a3e); border-color: var(--success, #2b8a3e); }
  .gs__text { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
  .gs__item-title { font-size: var(--fs-md, 1rem); font-weight: var(--fw-medium, 500); }
  .done .gs__item-title { color: var(--text-2, #4a5058); text-decoration: line-through; }
  .gs__item-body { font-size: var(--fs-sm, 0.875rem); color: var(--text-3, #6b7280); }
  .gs__open {
    flex: none;
    min-height: 36px;
    padding: var(--space-1, 4px) var(--space-3, 12px);
    font: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #14171a);
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-2, #c9ced6);
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    &:hover { background: var(--surface-2, #f4f5f7); }
  }
  .gs__link:focus-visible, .gs__open:focus-visible { outline: 2px solid var(--focus-color, #7b93ff); outline-offset: 2px; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (prefers-reduced-motion: reduce) { .gs__bar div { transition: none; } }
</style>
