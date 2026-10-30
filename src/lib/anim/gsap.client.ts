import { gsap } from 'gsap';
import type { ScrollSmoother as Smoother } from 'gsap/ScrollSmoother';
import type { ScrollTrigger as Trigger } from 'gsap/ScrollTrigger';

// GSAP helpers for the landing page only (WS1). Functional screens do not animate.
// Plugins load on demand: ScrollTrigger when something needs a refresh, ScrollSmoother only when a smoother is created.
// SplitText is no longer loaded (nothing uses it, and per-word text animation is not allowed on functional screens).

let smoother: Smoother | null = null;
let ScrollSmoother: typeof Smoother | null = null;
let ScrollTrigger: typeof Trigger | null = null;

/** True when the person asked for less motion (OS setting or the Display settings menu). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return true;
  return (
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.getAttribute('data-motion') === 'reduced'
  );
}

async function loadScrollTrigger() {
  if (typeof window === 'undefined' || ScrollTrigger) return;
  const triggerModule = await import('gsap/ScrollTrigger');
  ScrollTrigger = triggerModule.ScrollTrigger;
  gsap.registerPlugin(ScrollTrigger);
}

async function loadScrollSmoother() {
  if (typeof window === 'undefined' || ScrollSmoother) return;
  await loadScrollTrigger();
  const smootherModule = await import('gsap/ScrollSmoother');
  ScrollSmoother = smootherModule.ScrollSmoother;
  gsap.registerPlugin(ScrollSmoother);
}

/** Creates a ScrollSmoother. Returns null on the server or when reduced motion is on. */
export async function createSmoother(
  wrapper: HTMLElement,
  content: HTMLElement,
  callbacks: { onUpdate?: (self: Smoother) => void; onStop?: (self: Smoother) => void } = {}
): Promise<Smoother | null> {
  if (prefersReducedMotion()) return null;
  await loadScrollSmoother();
  if (!ScrollSmoother) return null;

  if (smoother) smoother.kill();
  smoother = ScrollSmoother.create({
    wrapper,
    content,
    smooth: 1,
    effects: true,
    smoothTouch: 0.1,
    normalizeScroll: true,
    ...callbacks
  });
  return smoother;
}

export function getSmoother() {
  return smoother;
}

/** Refreshes ScrollTriggers. Does nothing (and downloads nothing) when no trigger was ever created. */
export async function refreshAll(): Promise<void> {
  if (ScrollTrigger) ScrollTrigger.refresh();
}

export { gsap };
