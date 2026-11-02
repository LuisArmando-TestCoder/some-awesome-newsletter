// Landing scroll choreography: one technique per chapter (WS14).
// Every effect is a Svelte action. Each one:
//   - loads GSAP ScrollTrigger on demand (the landing is the only page that pays for it),
//   - runs only when motion is allowed (OS setting and the Display settings menu),
//   - leaves the markup in its final, readable state when it does not run (no JS, reduced motion),
//   - animates transform, opacity, clip-path and filter only,
//   - cleans up every trigger it made on destroy.
import { browser } from '$app/environment';
import type { gsap as GsapType } from 'gsap';
import type { ScrollTrigger as STType } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '$lib/anim/gsap.client';

type Gsap = typeof GsapType;
type ST = typeof STType;
type Kit = { gsap: Gsap; ScrollTrigger: ST };

let kitPromise: Promise<Kit> | null = null;

/** GSAP + ScrollTrigger, registered once, plus one shared refresh when the page height changes. */
function loadKit(): Promise<Kit> {
	if (kitPromise) return kitPromise;
	kitPromise = Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([g, st]) => {
		const gsap = g.gsap;
		const ScrollTrigger = st.ScrollTrigger;
		gsap.registerPlugin(ScrollTrigger);
		ScrollTrigger.config({ ignoreMobileResize: true });
		// Content that grows after load (the live preview, fonts, demos) shifts every trigger below it.
		let t = 0;
		const refresh = () => {
			clearTimeout(t);
			t = window.setTimeout(() => ScrollTrigger.refresh(), 180);
		};
		new ResizeObserver(refresh).observe(document.body);
		document.fonts?.ready.then(refresh).catch(() => {});
		return { gsap, ScrollTrigger };
	});
	return kitPromise;
}

const DESKTOP = '(min-width: 56rem)';
const MOTION = '(prefers-reduced-motion: no-preference)';

/**
 * Wraps an effect. `setup` runs inside a gsap.matchMedia context, so every tween and
 * trigger it creates is reverted when the media query stops matching or the node goes away.
 */
function effect<P = undefined>(
	setup: (kit: Kit, node: HTMLElement, ctx: { desktop: boolean; params: P }) => void | (() => void)
) {
	return (node: HTMLElement, params?: P) => {
		if (!browser || prefersReducedMotion()) return {};
		let mm: ReturnType<Gsap['matchMedia']> | null = null;
		let gone = false;
		loadKit().then((kit) => {
			if (gone) return;
			mm = kit.gsap.matchMedia();
			mm.add({ desktop: `${DESKTOP} and ${MOTION}`, mobile: `not ${DESKTOP} and ${MOTION}` }, (c) => {
				const { desktop, mobile } = c.conditions as { desktop: boolean; mobile: boolean };
				if (!desktop && !mobile) return;
				return setup(kit, node, { desktop, params: params as P });
			});
		});
		return {
			destroy() {
				gone = true;
				mm?.revert();
			}
		};
	};
}

const $$ = (root: Element, sel: string) => Array.from(root.querySelectorAll<HTMLElement>(sel));

/* ------------------------------------------------------------------ 01 Hero
   Kinetic exit: the headline's words drift apart, lift at different speeds and lose focus
   as you leave the cold open. The issue preview opens through a window that grows. */
export const heroFx = effect(({ gsap }, node, { desktop }) => {
	const words = $$(node, '.open__title .w');
	const mid = (words.length - 1) / 2;
	const exit = gsap.timeline({
		scrollTrigger: { trigger: node.querySelector('.open__title'), start: 'top 22%', end: 'bottom -10%', scrub: 0.6 }
	});
	words.forEach((w, i) => {
		const d = i - mid;
		exit.to(
			w,
			{
				x: () => d * (desktop ? 34 : 14),
				y: () => -(40 + Math.abs(d) * (desktop ? 26 : 12)) * (i % 2 ? 1.4 : 1),
				rotate: d * 1.5,
				opacity: 0,
				filter: 'blur(10px)',
				ease: 'none'
			},
			0
		);
	});
	exit.to(node.querySelector('.open__kicker'), { y: -30, opacity: 0, ease: 'none' }, 0);

	const device = node.querySelector<HTMLElement>('.open__device');
	if (device) {
		gsap.fromTo(
			device,
			{ clipPath: 'inset(14% 18% 0% 18% round 48px)', scale: 0.92, y: 70 },
			{
				clipPath: 'inset(-8% -8% -8% -8% round 0px)',
				scale: 1,
				y: 0,
				ease: 'none',
				scrollTrigger: { trigger: device, start: 'top bottom', end: 'top 30%', scrub: 0.5 }
			}
		);
	}
});

/* ------------------------------------------------------------------ 02 Statement
   Pinned word reveal: the sentence holds the centre of the screen while each word goes
   from a blurred whisper to ink. Screen readers get the plain sentence. */
export const statementFx = effect(({ gsap }, node) => {
	node.classList.add('is-fx');
	const words = $$(node, '.statement__text .w');
	gsap.fromTo(
		words,
		{ opacity: 0.12, filter: 'blur(8px)', y: '0.12em' },
		{
			opacity: 1,
			filter: 'blur(0px)',
			y: 0,
			ease: 'none',
			stagger: 0.4,
			scrollTrigger: { trigger: node, start: 'top top', end: 'bottom bottom', scrub: 0.4 }
		}
	);
	return () => node.classList.remove('is-fx');
});

/* ------------------------------------------------------------------ 03 Languages
   The deal: three copies of one issue start stacked like a hand of cards in the centre,
   then fan out to their own columns as the grid scrolls in. */
export const dealFx = effect(({ gsap }, node, { desktop }) => {
	const grid = node.querySelector<HTMLElement>('.lang-grid');
	if (!grid) return;
	const cards = $$(grid, '.lang-grid__item');
	const n = cards.length;
	const offset = (el: HTMLElement) => {
		const g = grid.getBoundingClientRect();
		const r = el.getBoundingClientRect();
		return g.left + g.width / 2 - (r.left + r.width / 2);
	};
	cards.forEach((c, i) => (c.style.zIndex = String(n - Math.abs(i - (n - 1) / 2) * 2)));
	gsap.fromTo(
		cards,
		{
			x: (i: number, el: HTMLElement) => (desktop ? offset(el) : 0),
			y: (i: number) => (desktop ? 90 + Math.abs(i - (n - 1) / 2) * 10 : 80),
			rotate: (i: number) => (i - (n - 1) / 2) * (desktop ? 7 : 4),
			scale: desktop ? 0.82 : 0.94
		},
		{
			x: 0,
			y: 0,
			rotate: 0,
			scale: 1,
			ease: 'none',
			scrollTrigger: {
				trigger: grid,
				start: 'top 95%',
				end: desktop ? 'top 30%' : 'top 55%',
				scrub: 0.6,
				invalidateOnRefresh: true
			}
		}
	);
	return () => cards.forEach((c) => (c.style.zIndex = ''));
});

/* ------------------------------------------------------------------ "Also runs when"
   Split flap: each card flips up on its bottom hinge, one after the other, like a
   departure board turning over. Plays once. */
export const flapFx = effect(({ gsap }, node) => {
	const items = $$(node, '.also__list > li');
	const rule = node.querySelector('.also__rule');
	const tl = gsap.timeline({ scrollTrigger: { trigger: node, start: 'top 78%', once: true } });
	if (rule) tl.fromTo(rule, { scaleX: 0 }, { scaleX: 1, duration: 0.9, ease: 'expo.out' }, 0);
	tl.fromTo(
		items,
		{ rotateX: -92, opacity: 0, transformPerspective: 900, transformOrigin: '50% 0%' },
		{ rotateX: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.4)', stagger: 0.14 },
		0.15
	);
});

/* ------------------------------------------------------------------ 05 Sender
   Window to full bleed: the tinted chapter grows from a rounded card into the whole
   screen while your issue drops into the reader's inbox and the other mail makes room. */
export const senderFx = effect(({ gsap }, node, { desktop }) => {
	const range = { trigger: node, start: 'top bottom', end: desktop ? 'top 15%' : 'top 35%', scrub: 0.5 };
	gsap.fromTo(
		node,
		{ clipPath: `inset(0% ${desktop ? 6 : 3}% 0% ${desktop ? 6 : 3}% round ${desktop ? 56 : 28}px)` },
		{ clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: range }
	);
	const you = node.querySelector('.inbox__row--you');
	const dims = $$(node, '.inbox__row--dim');
	const tl = gsap.timeline({ scrollTrigger: { ...range, start: 'top 75%', end: 'top 10%' } });
	if (dims[0]) tl.fromTo(dims[0], { y: 64 }, { y: 0, ease: 'none' }, 0);
	if (dims[1]) tl.fromTo(dims[1], { y: -40 }, { y: 0, ease: 'none' }, 0);
	if (you)
		tl.fromTo(
			you,
			{ y: -160, rotate: -5, scale: 1.08, opacity: 0 },
			{ y: 0, rotate: 0, scale: 1, opacity: 1, ease: 'power2.out' },
			0
		);
});

/* ------------------------------------------------------------------ 06 Grow
   Stacking cards: each feature card sticks under the header and the next one slides
   over it; the card underneath steps back and dims. Desktop only (mobile stacks plainly). */
export const stackFx = effect(({ gsap }, node, { desktop }) => {
	if (!desktop) return;
	const list = node.querySelector<HTMLElement>('.tiles');
	if (!list) return;
	list.classList.add('is-stack');
	const cards = $$(list, '.tile');
	cards.forEach((card, i) => {
		const next = cards[i + 1];
		if (!next) return;
		gsap.fromTo(card, { scale: 1, filter: 'brightness(1)' }, {
			scale: 1 - (cards.length - 1 - i) * 0.05,
			filter: 'brightness(0.94)',
			ease: 'none',
			scrollTrigger: { trigger: next, start: 'top bottom', end: () => `top ${parseFloat(getComputedStyle(next).top) || 0}px`, scrub: true, invalidateOnRefresh: true }
		});
	});
	return () => list.classList.remove('is-stack');
});

/* ------------------------------------------------------------------ 07 Use cases
   Tilted plane: the sample dashboard arrives lying back in 3D and stands up flat as it
   reaches you. The business list draws in from a mask. */
export const planeFx = effect(({ gsap }, node, { desktop }) => {
	const panel = node.querySelector('.uses__panel');
	if (panel)
		gsap.fromTo(
			panel,
			{ rotateX: desktop ? 38 : 22, scale: 0.84, y: 90, transformPerspective: 1600, transformOrigin: '50% 100%' },
			{
				rotateX: 0,
				scale: 1,
				y: 0,
				ease: 'none',
				scrollTrigger: { trigger: panel, start: 'top bottom', end: 'top 35%', scrub: 0.6 }
			}
		);
	const tabs = $$(node, '.uses__tab');
	gsap.fromTo(
		tabs,
		{ clipPath: 'inset(0% 100% 0% 0%)', x: -24 },
		{
			clipPath: 'inset(0% 0% 0% 0%)',
			x: 0,
			duration: 0.8,
			ease: 'expo.out',
			stagger: 0.07,
			clearProps: 'clipPath',
			scrollTrigger: { trigger: node.querySelector('.uses__list'), start: 'top 85%', once: true }
		}
	);
});

/* ------------------------------------------------------------------ 08 Pricing
   Converging type: the two halves of the headline slide in from opposite sides and meet.
   Only the heading moves; the plans, prices and buttons stay still (no motion near money). */
export const convergeFx = effect(({ gsap }, node, { desktop }) => {
	const words = $$(node, '.chapter__title .w');
	const half = Math.ceil(words.length / 2);
	const shift = desktop ? 18 : 10;
	gsap.fromTo(
		words,
		{ xPercent: (i: number) => (i < half ? -shift * 6 : shift * 6), opacity: 0.15 },
		{
			xPercent: 0,
			opacity: 1,
			ease: 'none',
			scrollTrigger: { trigger: node, start: 'top 95%', end: 'top 35%', scrub: 0.5 }
		}
	);
});

/* ------------------------------------------------------------------ 09 FAQ
   Tracking in and ruled lines: the title's letters close in as it arrives,
   then each question's rule is drawn left to right and the question rises above it. */
export const ruledFx = effect(({ gsap, ScrollTrigger }, node) => {
	// Each letter starts pushed away from the middle of its word and closes in: tracking,
	// drawn with transforms only so the heading never reflows.
	const chars = $$(node, '.faq-head .ch');
	if (chars.length)
		gsap.fromTo(
			chars,
			{ x: (i: number, el: HTMLElement) => `${parseFloat(el.dataset.o || '0') * 0.05}em`, opacity: 0 },
			{
				x: 0,
				opacity: 1,
				ease: 'none',
				scrollTrigger: { trigger: node.querySelector('.faq-head'), start: 'top 95%', end: 'top 45%', scrub: 0.5 }
			}
		);
	const items = $$(node, '.faq__item');
	node.classList.add('is-ruled');
	gsap.set(items, { '--draw': 0 });
	gsap.set($$(node, '.faq__text'), { yPercent: 110 });
	const batch = ScrollTrigger.batch(items, {
		start: 'top 92%',
		once: true,
		onEnter: (els) => {
			gsap.to(els, { '--draw': 1, duration: 1, ease: 'expo.inOut', stagger: 0.08 });
			gsap.to(
				els.map((e) => e.querySelector('.faq__text')),
				{ yPercent: 0, duration: 0.8, ease: 'expo.out', stagger: 0.08, delay: 0.25 }
			);
		}
	});
	return () => {
		batch.forEach((t) => t.kill());
		node.classList.remove('is-ruled');
		gsap.set(items, { clearProps: '--draw' });
		gsap.set($$(node, '.faq__text'), { clearProps: 'transform' });
	};
});

/* ------------------------------------------------------------------ 10 Finale
   Iris and zoom: ink opens as a circle from where the button sits, and the closing line
   shrinks from oversized into place inside it. */
export const irisFx = effect(({ gsap }, node, { desktop }) => {
	const bg = node.querySelector('.finale__bg');
	const range = { trigger: node, start: 'top bottom', end: desktop ? 'top 10%' : 'top 30%', scrub: 0.5 };
	if (bg)
		gsap.fromTo(
			bg,
			{ clipPath: 'circle(4% at 50% 72%)' },
			{ clipPath: 'circle(120% at 50% 72%)', ease: 'none', scrollTrigger: range }
		);
	const title = node.querySelector('.finale__title');
	if (title)
		gsap.fromTo(
			title,
			{ scale: desktop ? 2.6 : 1.6, opacity: 0, filter: 'blur(12px)' },
			{
				scale: 1,
				opacity: 1,
				filter: 'blur(0px)',
				ease: 'none',
				scrollTrigger: { ...range, start: 'top 75%', end: desktop ? 'top 5%' : 'top 25%' }
			}
		);
	gsap.fromTo(
		$$(node, '.finale__body, .finale__actions'),
		{ y: 40, opacity: 0 },
		{ y: 0, opacity: 1, ease: 'none', stagger: 0.2, scrollTrigger: { ...range, start: 'top 45%', end: 'top 0%' } }
	);
});

/* ------------------------------------------------------------------ Magnetic button
   Leans toward a fine pointer, up to 10 px; the label follows a little further.
   Not on touch screens and not with reduced motion. */
export function magnetic(node: HTMLElement, strength = 10) {
	if (!browser || prefersReducedMotion() || !matchMedia('(hover: hover) and (pointer: fine)').matches) return {};
	let rect: DOMRect | null = null;
	const label = node.querySelector<HTMLElement>('.btn__label');
	const set = (x: number, y: number) => {
		node.style.translate = `${x}px ${y}px`;
		if (label) label.style.translate = `${x * 0.4}px ${y * 0.4}px`;
	};
	const enter = () => {
		rect = node.getBoundingClientRect();
		node.style.transition = 'translate 120ms linear';
		if (label) label.style.transition = 'translate 120ms linear';
	};
	const move = (e: PointerEvent) => {
		if (!rect) return;
		const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
		const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
		set(dx * strength, dy * strength);
	};
	const leave = () => {
		rect = null;
		node.style.transition = 'translate 500ms cubic-bezier(0.22, 1, 0.36, 1)';
		if (label) label.style.transition = node.style.transition;
		set(0, 0);
	};
	node.addEventListener('pointerenter', enter);
	node.addEventListener('pointermove', move);
	node.addEventListener('pointerleave', leave);
	return {
		destroy() {
			node.removeEventListener('pointerenter', enter);
			node.removeEventListener('pointermove', move);
			node.removeEventListener('pointerleave', leave);
		}
	};
}

/** Splits a sentence into words for the effects above. Spaces stay as real text nodes. */
export function words(text: string): string[] {
	return text.split(/\s+/).filter(Boolean);
}

/* ------------------------------------------------------------------ 03 Your blog (WS15)
   Growth counter: the blog's address types itself into the browser bar, then the weeks and
   the pages on the site count up with the scroll while new articles fill the feed, one row
   per language. The markup already holds the final numbers (no JS, reduced motion). */
export const growthFx = effect(({ gsap }, node, { desktop }) => {
	const fig = node.querySelector<HTMLElement>('.site');
	if (!fig) return;
	const typed = fig.querySelector('.site__typed');
	const week = fig.querySelector<HTMLElement>('[data-week]');
	const pages = fig.querySelector<HTMLElement>('[data-pages]');
	const rows = $$(fig, '.site__row');
	const weeks = Number(fig.dataset.weeks || 52);
	const perWeek = Number(fig.dataset.perWeek || 3);
	const label = fig.dataset.weekLabel || 'Week {n}';
	const fmt = new Intl.NumberFormat(document.documentElement.lang || undefined);
	const state = { w: 1 };
	const paint = () => {
		const n = Math.max(1, Math.round(state.w));
		if (week) week.textContent = label.replace('{n}', fmt.format(n));
		if (pages) pages.textContent = fmt.format(n * perWeek);
	};
	const tl = gsap.timeline({
		defaults: { ease: 'none' },
		scrollTrigger: { trigger: fig, start: desktop ? 'top 80%' : 'top 90%', end: desktop ? 'bottom 35%' : 'bottom 55%', scrub: 0.4 }
	});
	if (typed) tl.fromTo(typed, { clipPath: 'inset(0% 100% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.2 }, 0);
	tl.fromTo(state, { w: 1 }, { w: weeks, duration: 0.8, onUpdate: paint }, 0.2);
	tl.fromTo(
		rows,
		{ y: -18, opacity: 0, scale: 0.97 },
		{ y: 0, opacity: 1, scale: 1, duration: 0.12, stagger: 0.68 / Math.max(1, rows.length) },
		0.2
	);
	return () => {
		state.w = weeks;
		paint();
	};
});
