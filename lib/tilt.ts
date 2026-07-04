// Shared device-tilt state, fed by the gyroscope (MotionProvider) and read by
// the holo cards (via CSS vars on <html>) and the 3D box (via subscribe).

export type Tilt = { x: number; y: number }; // each -1..1

let current: Tilt = { x: 0, y: 0 };
const listeners = new Set<(t: Tilt) => void>();

export const tilt = {
  get: () => current,
  set: (t: Tilt) => {
    current = t;
    listeners.forEach((l) => l(t));
  },
  subscribe: (l: (t: Tilt) => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  },
};

export function clamp(n: number, min = -1, max = 1) {
  return Math.min(max, Math.max(min, n));
}
