<!--
  Stepper: shows where the person is in a multi-step flow (setup, tutorial, wizard).
  Props:
    steps: { label: string; description?: string }[]
    current: number                    0-based index of the active step
    orientation?: 'horizontal' | 'vertical' = 'horizontal'
    onselect?: (index: number) => void  when set, completed steps become buttons that go back to that step
    label?: string = 'Progress'        accessible name of the list
    completedLabel?: string = 'Completed'  screen reader suffix for finished steps
    ...rest                            spread onto the root <ol>
  Usage:
    <Stepper steps={[{ label: 'Connect' }, { label: 'Design' }, { label: 'Send' }]} current={1}
      onselect={(i) => (step = i)} />
-->
<script lang="ts">
  import type { HTMLOlAttributes } from 'svelte/elements';

  type Step = { label: string; description?: string };

  interface Props extends Omit<HTMLOlAttributes, 'onselect'> {
    steps: Step[];
    current: number;
    orientation?: 'horizontal' | 'vertical';
    onselect?: (index: number) => void;
    label?: string;
    completedLabel?: string;
  }

  let {
    steps,
    current,
    orientation = 'horizontal',
    onselect,
    label = 'Progress',
    completedLabel = 'Completed',
    class: className = '',
    ...rest
  }: Props = $props();

  function status(index: number): 'complete' | 'current' | 'upcoming' {
    if (index < current) return 'complete';
    if (index === current) return 'current';
    return 'upcoming';
  }
</script>

{#snippet marker(index: number, state: 'complete' | 'current' | 'upcoming')}
  <span class="stepper__marker" aria-hidden="true">
    {#if state === 'complete'}
      <svg viewBox="0 0 16 16" focusable="false">
        <path
          d="M3.5 8.5 6.5 11.5 12.5 4.5"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    {:else}
      {index + 1}
    {/if}
  </span>
{/snippet}

{#snippet text(step: Step, state: 'complete' | 'current' | 'upcoming')}
  <span class="stepper__text">
    <span class="stepper__label">
      {step.label}{#if state === 'complete'}<span class="sr-only">, {completedLabel}</span>{/if}
    </span>
    {#if step.description}<span class="stepper__description">{step.description}</span>{/if}
  </span>
{/snippet}

<ol class="stepper stepper--{orientation} {className}" aria-label={label} {...rest}>
  {#each steps as step, index (index)}
    {@const state = status(index)}
    <li class="stepper__step stepper__step--{state}" aria-current={state === 'current' ? 'step' : undefined}>
      {#if state === 'complete' && onselect}
        <button type="button" class="stepper__item stepper__item--button" onclick={() => onselect(index)}>
          {@render marker(index, state)}
          {@render text(step, state)}
        </button>
      {:else}
        <span class="stepper__item">
          {@render marker(index, state)}
          {@render text(step, state)}
        </span>
      {/if}
    </li>
  {/each}
</ol>

<style>
  .stepper {
    display: flex;
    margin: 0;
    padding: 0;
    list-style: none;
    counter-reset: none;
  }

  .stepper--horizontal {
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    gap: var(--space-3) var(--space-2);
  }

  .stepper--vertical {
    flex-direction: column;
    gap: 0;
  }

  .stepper__step {
    position: relative;
    display: flex;
    min-width: 0;
  }

  .stepper--horizontal .stepper__step {
    flex: 1 1 8rem;
  }

  /* Connector lines */
  .stepper--horizontal .stepper__step:not(:last-child)::after {
    content: '';
    flex: 1 1 auto;
    align-self: flex-start;
    min-width: var(--space-4);
    height: 1px;
    margin: calc(var(--_marker) / 2) var(--space-2) 0;
    background: var(--border-2);
  }
  .stepper--horizontal .stepper__step--complete:not(:last-child)::after {
    background: var(--accent);
  }

  .stepper--vertical .stepper__step:not(:last-child) {
    padding-bottom: var(--space-5);
  }
  .stepper--vertical .stepper__step:not(:last-child)::after {
    content: '';
    position: absolute;
    top: calc(var(--_marker) + var(--space-1));
    bottom: var(--space-1);
    left: calc(var(--_marker) / 2);
    width: 1px;
    background: var(--border-2);
  }
  .stepper--vertical .stepper__step--complete:not(:last-child)::after {
    background: var(--accent);
  }

  .stepper {
    --_marker: 1.75rem;
  }

  .stepper__item {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    min-width: 0;
    min-height: var(--_marker);
    color: var(--text-3);
  }

  .stepper__item--button {
    margin: 0;
    padding: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: none;
    font: inherit;
    text-align: start;
    cursor: pointer;
  }
  .stepper__item--button:hover .stepper__label {
    text-decoration: underline;
    text-underline-offset: 0.2em;
  }
  .stepper__item--button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .stepper__marker {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--_marker);
    height: var(--_marker);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-1);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    transition:
      background-color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out),
      color var(--dur-base) var(--ease-out);
  }
  .stepper__marker svg {
    width: 1rem;
    height: 1rem;
  }

  .stepper__text {
    display: flex;
    flex-direction: column;
    gap: 0.125rem;
    min-width: 0;
    padding-top: 0.25rem;
  }

  .stepper__label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .stepper__description {
    font-size: var(--fs-xs);
    line-height: var(--lh-snug);
    color: var(--text-3);
  }

  /* States */
  .stepper__step--complete .stepper__item {
    color: var(--text-2);
  }
  .stepper__step--complete .stepper__marker {
    background: var(--accent);
    border-color: var(--accent);
    color: var(--accent-contrast);
  }

  .stepper__step--current .stepper__item {
    color: var(--text-1);
  }
  .stepper__step--current .stepper__label {
    font-weight: var(--fw-semibold);
  }
  .stepper__step--current .stepper__marker {
    border: 2px solid var(--accent);
    background: var(--accent-soft);
    color: var(--accent);
  }

  @media (max-width: 40rem) {
    .stepper--horizontal .stepper__step {
      flex-basis: 100%;
    }
    .stepper--horizontal .stepper__step:not(:last-child)::after {
      display: none;
    }
  }
</style>
