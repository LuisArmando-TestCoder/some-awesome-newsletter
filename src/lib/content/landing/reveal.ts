// Svelte action: adds `is-in` when the element enters the viewport (once).
// With reduced motion, or without IntersectionObserver, the element is shown at once.
export function reveal(node: HTMLElement, options: { threshold?: number } = {}) {
	const reduce =
		typeof window === 'undefined' ||
		window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
		!('IntersectionObserver' in window);
	if (reduce) {
		node.classList.add('is-in');
		return {};
	}
	// Already on screen at load: never hide it (protects LCP and avoids a flash).
	if (node.getBoundingClientRect().top < window.innerHeight * 0.92) {
		node.classList.add('is-in');
		return {};
	}
	node.classList.add('reveal-ready');
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('is-in');
					io.disconnect();
				}
			}
		},
		{ threshold: options.threshold ?? 0.15, rootMargin: '0px 0px -8% 0px' }
	);
	io.observe(node);
	return { destroy: () => io.disconnect() };
}
