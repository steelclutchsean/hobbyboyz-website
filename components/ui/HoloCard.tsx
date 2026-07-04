"use client";

import {
  useRef,
  useState,
  useCallback,
  type ReactNode,
  type PointerEvent,
} from "react";

type HoloCardProps = {
  children: ReactNode;
  className?: string;
  /** Show the rainbow foil sheen (for card-like imagery). */
  foil?: boolean;
  /** Max tilt in degrees. */
  max?: number;
};

/**
 * 3D pointer tilt with an optional holographic foil sheen, like a real
 * refractor card catching light. Pointer position drives CSS custom
 * properties consumed below. Falls back to a static card when the pointer
 * is coarse (touch) or the user prefers reduced motion (handled in CSS).
 */
export function HoloCard({
  children,
  className = "",
  foil = false,
  max = 10,
}: HoloCardProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  const onMove = useCallback(
    (e: PointerEvent<HTMLDivElement>) => {
      const node = ref.current;
      if (!node) return;
      const rect = node.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width; // 0..1
      const py = (e.clientY - rect.top) / rect.height; // 0..1
      node.style.setProperty("--rx", `${(0.5 - py) * max * 2}deg`);
      node.style.setProperty("--ry", `${(px - 0.5) * max * 2}deg`);
      node.style.setProperty("--mx", `${px * 100}%`);
      node.style.setProperty("--my", `${py * 100}%`);
    },
    [max],
  );

  const reset = useCallback(() => {
    const node = ref.current;
    if (!node) return;
    node.style.setProperty("--rx", "0deg");
    node.style.setProperty("--ry", "0deg");
    setActive(false);
  }, []);

  return (
    <div className="holo-perspective">
      <div
        ref={ref}
        onPointerMove={(e) => {
          if (e.pointerType === "touch") return;
          onMove(e);
        }}
        onPointerEnter={(e) => {
          if (e.pointerType === "touch") return;
          setActive(true);
        }}
        onPointerLeave={reset}
        data-active={active}
        className={`holo-card ${foil ? "holo-foil" : ""} ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
