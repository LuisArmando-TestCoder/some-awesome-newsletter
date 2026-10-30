<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import { tt, fmt } from "./copy";
  import {
    activeTour,
    availableSteps,
    endTour,
    nextTourStep,
    prevTourStep,
    type ActiveTour,
    type TourPlacement
  } from "./tour";

  const uid = `aiban-tour-${Math.random().toString(36).slice(2, 9)}`;
  const GAP = 12; // space between target and card
  const PAD = 6; // ring padding around target
  const EDGE = 16; // minimum distance from viewport edge

  let cardEl: HTMLDivElement | null = null;
  let previousFocus: HTMLElement | null = null;
  let lastKey = "";
  let wasActive = false;
  let frame = 0;

  let ring: { top: number; left: number; width: number; height: number } | null = null;
  let cardTop = 0;
  let cardLeft = 0;
  let docked = false;
  let current = 1;
  let total = 1;
  let isFirst = true;
  let isLast = true;

  $: step = $activeTour ? $activeTour.def.steps[$activeTour.index] : null;
  $: onTourChange($activeTour);

  function reducedMotion(): boolean {
    try {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch {
      return false;
    }
  }

  function findTarget(): HTMLElement | null {
    if (!step) return null;
    try {
      return document.querySelector<HTMLElement>(step.target);
    } catch {
      return null;
    }
  }

  async function onTourChange(t: ActiveTour | null) {
    if (typeof document === "undefined") return;
    if (!t) {
      lastKey = "";
      ring = null;
      if (wasActive) {
        wasActive = false;
        const el = previousFocus;
        previousFocus = null;
        if (el && document.contains(el)) el.focus();
      }
      return;
    }
    if (!wasActive) {
      wasActive = true;
      previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    const key = `${t.def.id}:${t.index}`;
    if (key === lastKey) return;
    lastKey = key;

    const avail = availableSteps(t.def);
    const pos = avail.indexOf(t.index);
    total = Math.max(avail.length, 1);
    current = pos >= 0 ? pos + 1 : 1;
    isFirst = pos <= 0;
    isLast = pos === avail.length - 1 || pos < 0;

    await tick();
    const target = findTarget();
    if (target) {
      try {
        target.scrollIntoView({ block: "center", inline: "nearest", behavior: reducedMotion() ? "auto" : "smooth" });
      } catch {
        target.scrollIntoView();
      }
    }
    layout();
    await tick();
    layout(); // second pass with the card's real size
    cardEl?.focus({ preventScroll: true });
  }

  function resolvePlacement(
    pref: TourPlacement,
    r: DOMRect,
    w: number,
    h: number,
    vw: number,
    vh: number
  ): Exclude<TourPlacement, "auto"> {
    const fits = {
      bottom: r.bottom + GAP + h <= vh - EDGE,
      top: r.top - GAP - h >= EDGE,
      right: r.right + GAP + w <= vw - EDGE,
      left: r.left - GAP - w >= EDGE
    };
    if (pref !== "auto" && fits[pref]) return pref;
    const order: Array<Exclude<TourPlacement, "auto">> = ["bottom", "top", "right", "left"];
    return order.find((p) => fits[p]) ?? "bottom";
  }

  function layout() {
    if (!$activeTour || typeof window === "undefined") return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    docked = vw < 560;
    const target = findTarget();
    const w = cardEl?.offsetWidth || 340;
    const h = cardEl?.offsetHeight || 200;

    if (!target) {
      ring = null;
      cardTop = Math.max(EDGE, (vh - h) / 2);
      cardLeft = Math.max(EDGE, (vw - w) / 2);
      return;
    }
    const r = target.getBoundingClientRect();
    ring = { top: r.top - PAD, left: r.left - PAD, width: r.width + PAD * 2, height: r.height + PAD * 2 };
    if (docked) return;

    const place = resolvePlacement(step?.placement ?? "auto", r, w, h, vw, vh);
    let top: number;
    let left: number;
    if (place === "bottom" || place === "top") {
      top = place === "bottom" ? r.bottom + GAP : r.top - GAP - h;
      left = r.left + r.width / 2 - w / 2;
    } else {
      left = place === "right" ? r.right + GAP : r.left - GAP - w;
      top = r.top + r.height / 2 - h / 2;
    }
    cardLeft = Math.min(Math.max(EDGE, left), Math.max(EDGE, vw - w - EDGE));
    cardTop = Math.min(Math.max(EDGE, top), Math.max(EDGE, vh - h - EDGE));
  }

  function scheduleLayout() {
    if (!$activeTour) return;
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(layout);
  }

  function isTypingTarget(el: EventTarget | null): boolean {
    if (!(el instanceof HTMLElement)) return false;
    return el.isContentEditable || ["INPUT", "TEXTAREA", "SELECT"].includes(el.tagName);
  }

  function onKeydown(e: KeyboardEvent) {
    if (!$activeTour) return;
    if (e.key === "Escape") {
      e.preventDefault();
      endTour("skipped");
      return;
    }
    if (isTypingTarget(e.target)) return;
    // Enter on a focused button already triggers its click; do not advance twice.
    if (e.key === "Enter" && e.target instanceof HTMLElement && e.target.closest("button, a")) return;
    if (e.key === "ArrowRight" || e.key === "Enter") {
      e.preventDefault();
      nextTourStep();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prevTourStep();
    }
  }

  function onNext() {
    if (isLast) endTour("finished");
    else nextTourStep();
  }

  onMount(() => {
    window.addEventListener("resize", scheduleLayout);
    window.addEventListener("scroll", scheduleLayout, { capture: true, passive: true });
    window.addEventListener("keydown", onKeydown);
  });

  onDestroy(() => {
    if (typeof window === "undefined") return;
    cancelAnimationFrame(frame);
    window.removeEventListener("resize", scheduleLayout);
    window.removeEventListener("scroll", scheduleLayout, { capture: true });
    window.removeEventListener("keydown", onKeydown);
  });
</script>

{#if $activeTour && step}
  <div class="tour-layer">
    {#if ring}
      <div
        class="tour-ring"
        aria-hidden="true"
        style="top: {ring.top}px; left: {ring.left}px; width: {ring.width}px; height: {ring.height}px;"
      ></div>
    {/if}
    <div
      bind:this={cardEl}
      class="tour-card"
      class:docked
      role="dialog"
      aria-modal="false"
      aria-labelledby="{uid}-title"
      aria-describedby="{uid}-body"
      tabindex="-1"
      style={docked ? "" : `top: ${cardTop}px; left: ${cardLeft}px;`}
    >
      <p class="tour-count">{fmt($tt.tour.stepOf, { current, total })}</p>
      <h2 id="{uid}-title" class="tour-title">{step.title}</h2>
      <p id="{uid}-body" class="tour-body">{step.body}</p>
      <div class="tour-actions">
        <button type="button" class="btn-tertiary" on:click={() => endTour("skipped")}>
          {$tt.tour.skip}
        </button>
        <span class="tour-spacer"></span>
        {#if !isFirst}
          <button type="button" class="btn-tertiary" on:click={prevTourStep}>{$tt.tour.back}</button>
        {/if}
        <button type="button" class="btn-primary" on:click={onNext}>
          {isLast ? $tt.tour.finish : $tt.tour.next}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  .tour-layer {
    position: fixed;
    inset: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .tour-ring {
    position: fixed;
    border-radius: var(--radius-md, 8px);
    box-shadow:
      0 0 0 3px var(--focus-color, #6366f1),
      0 0 0 9999px color-mix(in srgb, var(--surface-inverse, #0f172a) 32%, transparent);
    transition:
      top var(--dur-base, 200ms) var(--ease-out, ease-out),
      left var(--dur-base, 200ms) var(--ease-out, ease-out),
      width var(--dur-base, 200ms) var(--ease-out, ease-out),
      height var(--dur-base, 200ms) var(--ease-out, ease-out);
  }

  .tour-card {
    position: fixed;
    pointer-events: auto;
    width: min(22rem, calc(100vw - 2 * var(--space-4, 16px)));
    padding: var(--space-5, 24px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #111827);
    border: 1px solid var(--border-1, #e5e7eb);
    border-radius: var(--radius-lg, 12px);
    box-shadow: var(--shadow-3, 0 12px 32px rgba(0, 0, 0, 0.18));
    font-family: var(--font-body, system-ui, sans-serif);
    transition:
      top var(--dur-base, 200ms) var(--ease-out, ease-out),
      left var(--dur-base, 200ms) var(--ease-out, ease-out);
  }

  .tour-card:focus {
    outline: none;
  }

  .tour-card:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  .tour-card.docked {
    top: auto;
    left: var(--space-4, 16px);
    right: var(--space-4, 16px);
    bottom: var(--space-4, 16px);
    width: auto;
    padding-bottom: calc(var(--space-5, 24px) + env(safe-area-inset-bottom, 0px));
  }

  .tour-count {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text-3, #6b7280);
  }

  .tour-title {
    margin: 0 0 var(--space-2, 8px);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    line-height: var(--lh-tight, 1.3);
    color: var(--text-1, #111827);
  }

  .tour-body {
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.55);
    color: var(--text-2, #374151);
  }

  .tour-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2, 8px);
    margin-top: var(--space-5, 24px);
  }

  .tour-spacer {
    flex: 1;
  }

  button {
    min-height: 44px;
    padding: 0 var(--space-4, 16px);
    border-radius: var(--radius-md, 8px);
    font-family: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    cursor: pointer;
    transition:
      background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }

  button:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  .btn-primary {
    border: 1px solid transparent;
    background: var(--accent, #4f46e5);
    color: var(--accent-contrast, #fff);
  }

  .btn-primary:hover {
    background: var(--accent-hover, #4338ca);
  }

  .btn-tertiary {
    padding: 0 var(--space-2, 8px);
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-link, #4f46e5);
  }

  .btn-tertiary:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  @media (prefers-reduced-motion: reduce) {
    .tour-ring,
    .tour-card,
    button {
      transition: none;
    }
  }
</style>
