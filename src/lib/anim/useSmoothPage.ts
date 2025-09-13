import { onMount } from 'svelte';
import { browser } from '$app/environment';
import { createSmoother, getSmoother, refreshAll } from './gsap.client';

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

    const {
        smooth = 1,
        smoothTouch = 0.1,
        effects = true,
        normalizeScroll = true,
        onUpdate,
        onStop,
        disableOnReduceMotion = true
    } = options;

    let smoother: ReturnType<typeof createSmoother> | null = null;

    onMount(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (disableOnReduceMotion && mediaQuery.matches) {
            console.log('anim.smoother: Reduced motion enabled, skipping ScrollSmoother.');
            return;
        }

        const wrapper = document.getElementById('smooth-wrapper');
        const content = document.getElementById('smooth-content');

        if (wrapper && content) {
            smoother = createSmoother(wrapper, content);
            if (onUpdate) smoother.effects().forEach((effect: any) => effect.onUpdate(onUpdate));
            if (onStop) smoother.effects().forEach((effect: any) => effect.onStop(onStop));
        }

        return () => {
            if (smoother) {
                console.log('anim.smoother: Destroying ScrollSmoother instance.');
                smoother.kill();
                smoother = null;
            }
        };
    });

    return {
        destroy() {
            if (smoother) {
                console.log('anim.smoother: Destroying ScrollSmoother instance from action.');
                smoother.kill();
                smoother = null;
            }
        }
    };
}
