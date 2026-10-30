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
      <div class="tour-top">
        <p class="tour-count">{fmt($tt.tour.stepOf, { current, total })}</p>
        <span class="tour-dots" aria-hidden="true">
          {#each Array(total) as _, i (i)}
            <span class="tour-dot" class:done={i + 1 < current} class:on={i + 1 === current}></span>
          {/each}
        </span>
      </div>
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
          {#if !isLast}<span class="tour-arrow" aria-hidden="true">&rarr;</span>{/if}
        </button>
      </div>
    </div>
  </div>
{/if}

<style>
  /* Guided tour: the target is cut out of a dimmed page with a focus-colored ring; the card
     floats next to it (docked to the bottom on phones). Esc skips, arrow keys step. */
  .tour-layer {
    position: fixed;
    inset: 0;
    z-index: var(--z-tooltip);
    pointer-events: none;
  }

  .tour-ring {
    position: fixed;
    border-radius: var(--radius-md);
    box-shadow:
      0 0 0 2px var(--surface-0),
      0 0 0 4px var(--focus-color),
      0 0 0 9999px var(--surface-overlay);
    transition:
      top var(--dur-slow) var(--ease-out),
      left var(--dur-slow) var(--ease-out),
      width var(--dur-slow) var(--ease-out),
      height var(--dur-slow) var(--ease-out);
  }

  .tour-card {
    position: fixed;
    pointer-events: auto;
    width: min(23rem, calc(100vw - 2 * var(--space-4)));
    padding: var(--space-5);
    background: var(--surface-0);
    color: var(--text-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-3);
    font-family: var(--font-body);
    transition:
      top var(--dur-slow) var(--ease-out),
      left var(--dur-slow) var(--ease-out),
      opacity var(--dur-base) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @starting-style {
    .tour-card {
      opacity: 0;
      transform: translateY(6px);
    }
  }

  .tour-card:focus {
    outline: none;
  }

  .tour-card:focus-visible {
    outline: 2px solid var(--focus-color);
    outline-offset: 2px;
  }

  .tour-card.docked {
    top: auto;
    left: var(--space-3);
    right: var(--space-3);
    bottom: var(--space-3);
    width: auto;
    padding-bottom: calc(var(--space-5) + env(safe-area-inset-bottom, 0px));
  }

  .tour-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    margin-bottom: var(--space-3);
  }

  .tour-count {
    margin: 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }

  /* Step dots: done = ink, current = wide ink pill, upcoming = hairline. */
  .tour-dots {
    display: inline-flex;
    gap: 4px;
  }
  .tour-dot {
    width: 6px;
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--border-1);
    transition:
      width var(--dur-base) var(--ease-out),
      background-color var(--dur-base) var(--ease-out);
  }
  .tour-dot.done {
    background: var(--text-3);
  }
  .tour-dot.on {
    width: 18px;
    background: var(--text-1);
  }

  .tour-title {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: balance;
  }

  .tour-body {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .tour-actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: var(--space-5);
  }

  .tour-spacer {
    flex: 1;
  }

  button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-5);
    border-radius: var(--radius-full);
    font-family: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  button:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .btn-primary {
    border: 1px solid transparent;
    background: var(--accent);
    color: var(--accent-contrast);
  }

  .tour-arrow {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }

  .btn-tertiary {
    padding: 0 var(--space-2);
    border: 1px solid transparent;
    background: transparent;
    color: var(--text-2);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
  }

  @media (hover: hover) and (pointer: fine) {
    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: none;
      transition-duration: var(--t-in);
    }
    .btn-primary:hover .tour-arrow {
      transform: translateX(3px);
    }
    .btn-tertiary:hover {
      box-shadow: none;
      color: var(--text-1);
      text-decoration-color: currentColor;
      transition-duration: var(--t-in);
    }
  }

  @media (forced-colors: active) {
    .tour-ring {
      outline: 3px solid Highlight;
    }
    .tour-dot.on,
    .tour-dot.done {
      background: CanvasText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .tour-ring,
    .tour-card,
    .tour-dot,
    button {
      transition: none;
    }
    button:active {
      transform: none;
    }
  }
</style>
