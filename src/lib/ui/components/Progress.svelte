<!--
  Progress: determinate progress bar with a label.
  Props:
    value: number                    current amount (clamped to 0..max)
    max?: number = 100
    label: string                    what is progressing; visible unless hideLabel
    hideLabel?: boolean = false      keeps the label for screen readers only
    tone?: 'accent' | 'success' | 'warning' | 'danger' = 'accent'
    showValue?: boolean = false      shows the percent next to the label
    valueText?: string               custom readout, for example "3 of 5 steps" (also used as aria-valuetext)
    ...rest                          spread onto the root <div>
  Usage:
    <Progress label="Setup" value={3} max={5} showValue valueText="3 of 5 steps" />
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLDivElement> {
    value: number;
    max?: number;
    label: string;
    hideLabel?: boolean;
    tone?: 'accent' | 'success' | 'warning' | 'danger';
    showValue?: boolean;
    valueText?: string;
  }

  let {
    value,
    max = 100,
    label,
    hideLabel = false,
    tone = 'accent',
    showValue = false,
    valueText,
    class: className = '',
    ...rest
  }: Props = $props();

  const id = $props.id();
  const labelId = `progress-label-${id}`;

  const safeMax = $derived(max > 0 ? max : 100);
  const clamped = $derived(Math.min(Math.max(Number.isFinite(value) ? value : 0, 0), safeMax));
  const percent = $derived(Math.round((clamped / safeMax) * 100));
  const readout = $derived(valueText ?? `${percent}%`);
</script>

<div class="progress progress--{tone} {className}" {...rest}>
  <div class="progress__head" class:sr-only={hideLabel}>
    <span id={labelId} class="progress__label">{label}</span>
    {#if showValue}<span class="progress__value" aria-hidden="true">{readout}</span>{/if}
  </div>
  <div
    class="progress__track"
    role="progressbar"
    aria-labelledby={labelId}
    aria-valuemin={0}
    aria-valuemax={safeMax}
    aria-valuenow={clamped}
    aria-valuetext={valueText}
  >
    <div class="progress__fill" style="width: {percent}%"></div>
  </div>
</div>

<style>
  .progress {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    min-width: 0;
  }

  .progress__head {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    gap: var(--space-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-snug);
  }

  .progress__label {
    font-weight: var(--fw-medium);
    color: var(--text-1);
  }

  .progress__value {
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }

  .progress__track {
    position: relative;
    height: 0.5rem;
    overflow: hidden;
    border-radius: var(--radius-full);
    background: var(--surface-3);
  }

  .progress__fill {
    height: 100%;
    border-radius: inherit;
    background: var(--_fill);
    transition: width var(--dur-base) var(--ease-out);
  }

  .progress--accent {
    --_fill: var(--accent);
  }
  .progress--success {
    --_fill: var(--success);
  }
  .progress--warning {
    --_fill: var(--warning);
  }
  .progress--danger {
    --_fill: var(--danger);
  }
</style>
