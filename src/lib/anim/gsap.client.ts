import { gsap } from 'gsap';

console.log('anim.init: GSAP base loaded', {
  version: gsap.version,
  isClient: typeof window !== 'undefined'
});

// --- Variables globales ---
let smoother: any = null;
let ScrollSmoother: any = null;
let SplitText: any = null;
let ScrollTrigger: any = null;

/**
 * Carga dinámica de plugins en cliente.
 */
async function loadClientPlugins() {
  if (typeof window === 'undefined') return;

  if (!ScrollTrigger) {
    const triggerModule = await import('gsap/ScrollTrigger');
    ScrollTrigger = triggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }

  if (!ScrollSmoother || !SplitText) {
    const smootherModule = await import('gsap/ScrollSmoother');
    const splitTextModule = await import('gsap/SplitText');

    ScrollSmoother = smootherModule.ScrollSmoother;
    SplitText = splitTextModule.SplitText;

    gsap.registerPlugin(ScrollSmoother, SplitText);
  }

  console.log('anim.init: Client GSAP plugins registered', {
    hasTrigger: !!ScrollTrigger,
    hasSmoother: !!ScrollSmoother,
    hasSplitText: !!SplitText
  });
}

/**
 * Crea una nueva instancia de ScrollSmoother.
 */
export async function createSmoother(wrapper: HTMLElement, content: HTMLElement) {
  await loadClientPlugins();

  if (!ScrollSmoother) {
    console.warn('ScrollSmoother not available (SSR context).');
    return null;
  }

  if (smoother) {
    console.log('anim.smoother: Killing existing instance.');
    smoother.kill();
  }

  console.log('anim.smoother: Creating new instance.');
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

export function getSmoother() {
  return smoother;
}

export async function refreshAll(): Promise<void> {
  await loadClientPlugins();
  if (ScrollTrigger) {
    console.log('anim.refresh: Refreshing all ScrollTriggers.');
    ScrollTrigger.refresh();
  }
}

export { gsap };
