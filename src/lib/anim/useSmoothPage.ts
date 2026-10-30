import { browser } from '$app/environment';
import type { ScrollSmoother } from 'gsap/ScrollSmoother';
import { createSmoother, prefersReducedMotion } from './gsap.client';

// Svelte action (WS1). Usage: <div id="smooth-wrapper" use:useSmoothPage><div id="smooth-content">...</div></div>
// Fixed: it used to call onMount inside the action, which throws. Skips itself under reduced motion.

type SmoothPageOptions = {
    smooth?: number;
    smoothTouch?: number;
    effects?: boolean;
    normalizeScroll?: boolean;
    onUpdate?: (self: ScrollSmoother) => void;
    onStop?: (self: ScrollSmoother) => void;
    disableOnReduceMotion?: boolean;
};

export function useSmoothPage(node: HTMLElement, options: SmoothPageOptions = {}) {
    if (!browser) return;

    const { onUpdate, onStop, disableOnReduceMotion = true } = options;
    let smoother: ScrollSmoother | null = null;
    let destroyed = false;

    if (!(disableOnReduceMotion && prefersReducedMotion())) {
        const wrapper = document.getElementById('smooth-wrapper') ?? node;
        const content = document.getElementById('smooth-content') ?? (node.firstElementChild as HTMLElement | null);
        if (wrapper && content) {
            // The callbacks go to ScrollSmoother itself. They used to be handed to the effect
            // triggers, which have no such methods, so they never ran.
            createSmoother(wrapper, content, { onUpdate, onStop }).then((s) => {
                if (destroyed) {
                    s?.kill?.();
                    return;
                }
                smoother = s;
            });
        }
    }

    return {
        destroy() {
            destroyed = true;
            smoother?.kill?.();
            smoother = null;
        }
    };
}
