import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// --- Base registration (seguro en SSR) ---
gsap.registerPlugin(ScrollTrigger);

console.log('anim.init: GSAP base registered', {
  version: gsap.version,
  isClient: typeof window !== 'undefined'
});

// --- Manejamos las referencias a plugins dinámicos ---
let smoother: any = null;
let ScrollSmoother: any = null;
let SplitText: any = null;

/**
 * Carga dinámica de plugins que solo existen en el cliente.
 */
async function loadClientPlugins() {
  if (typeof window === 'undefined') return;

  if (!ScrollSmoother || !SplitText) {
    const smootherModule = await import('gsap/ScrollSmoother');
    const splitTextModule = await import('gsap/SplitText');

    ScrollSmoother = smootherModule.ScrollSmoother;
    SplitText = splitTextModule.SplitText;

    gsap.registerPlugin(ScrollSmoother, SplitText);

    console.log('anim.init: Client GSAP plugins registered', {
      hasSmoother: !!ScrollSmoother,
      hasSplitText: !!SplitText
    });
  }
}

/**
 * Crea una nueva instancia de ScrollSmoother.
 */
export async function createSmoother(wrapper: HTMLElement, content: HTMLElement) {
  await loadClientPlugins();

  if (!ScrollSmoother) {
    console.warn('ScrollSmoother not available (probably SSR).');
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

export function refreshAll(): void {
  console.log('anim.refresh: Refreshing all ScrollTriggers.');
  ScrollTrigger.refresh();
}

export { gsap };
