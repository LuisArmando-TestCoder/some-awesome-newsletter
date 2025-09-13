import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { SplitText } from 'gsap/SplitText';

// --- 1. REGISTER PLUGINS ---
// This should only happen once per page load.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

console.log('anim.init: GSAP plugins registered', {
    version: gsap.version,
    isClient: typeof window !== 'undefined'
});

// --- 2. SMOOTHER INSTANCE MANAGEMENT ---
let smoother: ScrollSmoother | null = null;

/**
 * Creates a new ScrollSmoother instance. Kills the old one if it exists.
 * @param wrapper - The wrapper element for the smooth scroll container.
 * @param content - The content element for the smooth scroll container.
 * @returns The new ScrollSmoother instance.
 */
export function createSmoother(wrapper: HTMLElement, content: HTMLElement): ScrollSmoother {
    if (smoother) {
        console.log('anim.smoother: Killing existing ScrollSmoother instance.');
        smoother.kill();
    }
    console.log('anim.smoother: Creating new ScrollSmoother instance.');
    smoother = ScrollSmoother.create({
        wrapper,
        content,
        smooth: 1,
        effects: true,
        smoothTouch: 0.1,
        normalizeScroll: true
    });
    return smoother;
}

/**
 * Returns the current ScrollSmoother instance.
 * @returns The ScrollSmoother instance or null if it doesn't exist.
 */
export function getSmoother(): ScrollSmoother | null {
    return smoother;
}

/**
 * Refreshes all ScrollTrigger instances.
 */
export function refreshAll(): void {
    console.log('anim.refresh: Refreshing all ScrollTriggers.');
    ScrollTrigger.refresh();
}

export { gsap };
