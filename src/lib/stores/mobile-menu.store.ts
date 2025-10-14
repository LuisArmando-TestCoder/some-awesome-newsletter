import { writable } from 'svelte/store';

/**
 * A store to control the visibility of the mobile menu.
 */
export const isMobileMenuOpen = writable(false);
