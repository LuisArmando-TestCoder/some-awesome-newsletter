import { onMount } from 'svelte';
import { browser } from '$app/environment';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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

    let trigger: ScrollTrigger | null = null;

    onMount(() => {
        gsap.matchMedia().add('(prefers-reduced-motion: no-preference)', () => {
            const timeline = gsap.timeline({
                scrollTrigger: {
                    trigger: node,
                    start,
                    end,
                    pin,
                    snap,
                    onEnter: () => {
                        console.log(`anim.section: Section ${node.id || ''} entered`);
                        if (onActivate) onActivate();
                    },
                    onLeave: () => {
                        console.log(`anim.section: Section ${node.id || ''} left`);
                        if (onDeactivate) onDeactivate();
                    },
                    onEnterBack: () => {
                        console.log(`anim.section: Section ${node.id || ''} entered back`);
                        if (onActivate) onActivate();
                    },
                    onLeaveBack: () => {
                        console.log(`anim.section: Section ${node.id || ''} left back`);
                        if (onDeactivate) onDeactivate();
                    }
                }
            });

            timeline.from(node, {
                opacity: 0,
                y: 50,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        return () => {
            if (trigger) {
                console.log(`anim.section: Destroying ScrollTrigger for section ${node.id || ''}`);
                trigger.kill();
                trigger = null;
            }
        };
    });

    return {
        destroy() {
            if (trigger) {
                console.log(`anim.section: Destroying ScrollTrigger for section ${node.id || ''} from action`);
                trigger.kill();
                trigger = null;
            }
        }
    };
}
