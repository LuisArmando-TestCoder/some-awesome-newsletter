import { get, writable } from "svelte/store";
import { playTick } from "../audioInteractions";

/**
 * Optional hover/focus sound for elements pushed into `ticks`.
 * Call `startTicks()` from inside onMount; it returns a cleanup function.
 * (The old version called onMount inside onMount, which Svelte 5 rejects.)
 */
export const ticks: HTMLElement[] = [];
export const itemHovered = writable<HTMLElement>();

export function startTicks(): () => void {
  if (typeof window === "undefined") return () => {};
  const onOver = () => {
    for (const item of ticks) {
      if ((item?.matches(":hover") || item?.matches(":focus")) && get(itemHovered) !== item) {
        itemHovered.set(item);
        playTick();
      }
    }
  };
  window.addEventListener("mouseover", onOver, { passive: true });
  const cleanups = ticks.map((tick) => {
    const onFocus = () => playTick();
    const onClick = () => {
      playTick();
      tick?.blur();
    };
    tick?.addEventListener("focus", onFocus);
    tick?.addEventListener("click", onClick);
    return () => {
      tick?.removeEventListener("focus", onFocus);
      tick?.removeEventListener("click", onClick);
    };
  });
  return () => {
    window.removeEventListener("mouseover", onOver);
    cleanups.forEach((c) => c());
  };
}
