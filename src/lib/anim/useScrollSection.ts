import { browser } from '$app/environment';
import { gsap } from 'gsap';
import type { ScrollTrigger as Trigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './gsap.client';

// Svelte action (WS1). Usage: <section use:useScrollSection={{ onActivate }}>
// Fixed: it used to call onMount inside the action (throws) and never killed its trigger.
// ScrollTrigger now loads on demand. Under reduced motion the section shows at once and callbacks still fire.

type ScrollSectionOptions = {
    onActivate?: () => void;
    onDeactivate?: () => void;
    pin?: boolean;
    snap?: number | 'labels' | 'labelsDirectional';
    start?: string;
    end?: string;
};

export function useScrollSection(node: HTMLElement, options: ScrollSectionOptions = {}) {
    if (!browser) return;

    const { onActivate, onDeactivate, pin, snap, start = 'top 80%', end = 'bottom top' } = options;
    let trigger: Trigger | null = null;
    let timeline: gsap.core.Timeline | null = null;
    let destroyed = false;

    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        if (destroyed) return;
        gsap.registerPlugin(ScrollTrigger);
        const reduced = prefersReducedMotion();
        trigger = ScrollTrigger.create({
            trigger: node,
            start,
            end,
            pin: reduced ? false : pin,
            snap: reduced ? undefined : snap,
            onEnter: () => onActivate?.(),
            onLeave: () => onDeactivate?.(),
            onEnterBack: () => onActivate?.(),
            onLeaveBack: () => onDeactivate?.()
        });
        if (!reduced) {
            timeline = gsap.timeline({ scrollTrigger: { trigger: node, start, end } });
            timeline.from(node, { opacity: 0, y: 24, duration: 0.4, ease: 'power3.out' });
        }
    });

    return {
        destroy() {
            destroyed = true;
            trigger?.kill?.();
            timeline?.scrollTrigger?.kill();
            timeline?.kill();
            trigger = null;
            timeline = null;
        }
    };
}
