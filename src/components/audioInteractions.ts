/**
 * Short UI sounds. Silent when the browser blocks autoplay, when the visitor
 * prefers reduced motion, or on the server.
 */
function play(url: string) {
  if (typeof document === "undefined") return;
  try {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const audio = new Audio(url);
    audio.crossOrigin = "anonymous";
    audio.volume = 0.4;
    audio.play().catch(() => {
      /* autoplay blocked: ignore */
    });
  } catch {
    /* no audio support */
  }
}

export function playTick() {
  play("https://cdn.cosmicjs.com/2b091760-e582-11ef-b333-e101bec29f3d-tick2.mp3");
}

export function playTack() {
  play("https://cdn.cosmicjs.com/2aeba450-e582-11ef-b333-e101bec29f3d-tick.mp3");
}
