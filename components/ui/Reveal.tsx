"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { registerScrub } from "@/lib/revealScrub";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Kept for API compatibility; scrubbed reveals derive stagger from position. */
  delay?: number;
  as?: "div" | "section" | "li";
};

/**
 * Scroll-scrubbed reveal: opacity + rise tied to scroll position (reverses on
 * scroll up), driven by the shared manager. Respects prefers-reduced-motion
 * (leaves content visible and unregistered).
 */
export function Reveal({ children, className = "", as = "div" }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const node = ref.current;
    if (!node) return;
    return registerScrub(node);
  }, []);

  const Tag = as;
  return (
    <Tag ref={ref as never} className={`reveal-scrub ${className}`}>
      {children}
    </Tag>
  );
}
