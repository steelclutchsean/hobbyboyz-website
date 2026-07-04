"use client";

import { useEffect, useRef, useState } from "react";
import { tilt, clamp } from "@/lib/tilt";

// Degrees of tilt considered "full" deflection.
const RANGE = 32;

type OrientationEventStatic = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<"granted" | "denied">;
};

export function MotionProvider() {
  const [showChip, setShowChip] = useState(false);
  const targetRef = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });
  const baselineBeta = useRef<number | null>(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const touch =
      window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window;
    const hasOrientation = "DeviceOrientationEvent" in window;
    if (reduced || !touch || !hasOrientation) return;
    const OrientationEvent = DeviceOrientationEvent as OrientationEventStatic;
    const needsPermission =
      typeof OrientationEvent.requestPermission === "function";

    let listening = false;
    let enabledClassSet = false;

    const onOrient = (e: DeviceOrientationEvent) => {
      if (e.beta == null || e.gamma == null) return;
      if (baselineBeta.current == null) baselineBeta.current = e.beta;
      // gamma: left-right, beta: front-back (relative to how it was first held).
      targetRef.current = {
        x: clamp(e.gamma / RANGE),
        y: clamp((e.beta - baselineBeta.current) / RANGE),
      };
      if (!enabledClassSet) {
        enabledClassSet = true;
        document.documentElement.classList.add("tilt-enabled");
        setShowChip(false);
        try {
          sessionStorage.setItem("tilt", "1");
        } catch {}
      }
    };

    const startLoop = () => {
      const loop = () => {
        const s = smoothRef.current;
        const t = targetRef.current;
        s.x += (t.x - s.x) * 0.12;
        s.y += (t.y - s.y) * 0.12;
        const rootStyle = document.documentElement.style;
        rootStyle.setProperty("--ry", `${s.x * 12}deg`);
        rootStyle.setProperty("--rx", `${-s.y * 12}deg`);
        rootStyle.setProperty("--mx", `${50 + s.x * 50}%`);
        rootStyle.setProperty("--my", `${50 + s.y * 50}%`);
        tilt.set({ x: s.x, y: s.y });
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
    };

    const start = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("deviceorientation", onOrient);
      startLoop();
    };

    const alreadyGranted = (() => {
      try {
        return sessionStorage.getItem("tilt") === "1";
      } catch {
        return false;
      }
    })();

    if (needsPermission && !alreadyGranted) {
      setShowChip(true);
    } else if (needsPermission && alreadyGranted) {
      // Permission may still require a gesture; show chip as a fallback.
      setShowChip(true);
    } else {
      start(); // Android: no permission needed.
    }

    // Expose the enabler for the chip button.
    (window as unknown as { __enableTilt?: () => void }).__enableTilt =
      async () => {
        if (needsPermission) {
          try {
            const res = await OrientationEvent.requestPermission!();
            if (res !== "granted") return;
          } catch {
            return;
          }
        }
        start();
      };

    return () => {
      window.removeEventListener("deviceorientation", onOrient);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (!showChip) return null;

  return (
    <button
      type="button"
      onClick={() =>
        (window as unknown as { __enableTilt?: () => void }).__enableTilt?.()
      }
      className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-4 py-2.5 font-display text-xs uppercase tracking-[0.2em] text-ink shadow-gold-glow"
      aria-label="Enable tilt to move the artwork with your phone"
    >
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-gold-300" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="6" y="2.5" width="12" height="19" rx="2.5" />
        <path d="M2.5 9 1 12l1.5 3M21.5 9 23 12l-1.5 3" />
      </svg>
      Enable tilt
    </button>
  );
}
