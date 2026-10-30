/** Smooth-scroll to an element id. Does nothing when the element is missing or on the server. */
export default function scroll(id: string) {
  if (typeof document === "undefined") return;
  const element = document.getElementById(id);
  if (!element) return;
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  element.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
}
