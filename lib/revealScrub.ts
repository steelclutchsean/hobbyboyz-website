// Shared scroll-scrub manager: registered elements fade + rise tied to their
// position in the viewport (reverses on scroll up). One listener + rAF for all.

const items = new Set<HTMLElement>();
let raf = 0;
let bound = false;

function clamp01(n: number) {
  return Math.min(1, Math.max(0, n));
}

function update() {
  raf = 0;
  const vh = window.innerHeight || 1;
  const start = vh * 0.95; // begins entering
  const end = vh * 0.55; // fully revealed
  items.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    const p = clamp01((start - top) / (start - end));
    el.style.opacity = String(p);
    el.style.transform = `translate3d(0, ${(1 - p) * 24}px, 0)`;
  });
}

function onScroll() {
  if (!raf) raf = requestAnimationFrame(update);
}

export function registerScrub(el: HTMLElement) {
  items.add(el);
  if (!bound) {
    bound = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
  }
  onScroll();
  return () => {
    items.delete(el);
  };
}
