/**
 * Whole-block reveal action shared by RevealText and RevealOnScroll.
 *
 * - Fades a block in once (opacity 0 -> 1, 8px rise) the first time it
 *   enters the viewport, using IntersectionObserver.
 * - Only runs when `enabled` is true. Without IntersectionObserver, or when
 *   the person asked for reduced motion, the block is simply visible.
 * - Turning `enabled` off while the block is still waiting reveals it, so
 *   text is never left invisible.
 */
export const REVEAL_PENDING_CLASS = "is-reveal-pending";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return true;
  if (document.documentElement.dataset.motion === "reduced") return true;
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

export function reveal(node: HTMLElement, enabled: boolean = true) {
  let observer: IntersectionObserver | undefined;
  let finished = false;

  function show() {
    finished = true;
    observer?.disconnect();
    observer = undefined;
    node.classList.remove(REVEAL_PENDING_CLASS);
  }

  function start() {
    if (finished || observer) return;
    if (typeof IntersectionObserver === "undefined" || prefersReducedMotion()) {
      finished = true;
      return;
    }
    node.classList.add(REVEAL_PENDING_CLASS);
    observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) show();
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
  }

  if (enabled) start();

  return {
    update(next: boolean = true) {
      if (next) start();
      else if (observer) show();
    },
    destroy() {
      observer?.disconnect();
      observer = undefined;
    },
  };
}
