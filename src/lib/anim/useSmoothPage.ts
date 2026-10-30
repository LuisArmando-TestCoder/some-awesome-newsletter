import { browser } from '$app/environment';
import { createSmoother, prefersReducedMotion } from './gsap.client';

// Svelte action (WS1). Usage: <div id="smooth-wrapper" use:useSmoothPage><div id="smooth-content">...</div></div>
// Fixed: it used to call onMount inside the action, which throws. Skips itself under reduced motion.

type SmoothPageOptions = {
    smooth?: number;
    smoothTouch?: number;
    effects?: boolean;
    normalizeScroll?: boolean;
    onUpdate?: (self: any) => void;
    onStop?: (self: any) => void;
    disableOnReduceMotion?: boolean;
};

export function useSmoothPage(node: HTMLElement, options: SmoothPageOptions = {}) {
    if (!browser) return;

    const { onUpdate, onStop, disableOnReduceMotion = true } = options;
    let smoother: any = null;
    let destroyed = false;

    if (!(disableOnReduceMotion && prefersReducedMotion())) {
        const wrapper = document.getElementById('smooth-wrapper') ?? node;
        const content = document.getElementById('smooth-content') ?? (node.firstElementChild as HTMLElement | null);
        if (wrapper && content) {
            createSmoother(wrapper, content).then((s) => {
                if (destroyed) {
                    s?.kill?.();
                    return;
                }
                smoother = s;
                if (!smoother) return;
                if (onUpdate) smoother.effects().forEach((effect: any) => effect.onUpdate?.(onUpdate));
                if (onStop) smoother.effects().forEach((effect: any) => effect.onStop?.(onStop));
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
