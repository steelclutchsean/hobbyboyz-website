"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

type ParallaxImageProps = {
  src: string;
  alt: string;
  sizes?: string;
};

/**
 * Image that drifts vertically within its (overflow-hidden) frame as the
 * section scrolls through the viewport. Scaled up so the drift never exposes
 * an edge. No-ops under reduced motion.
 */
export function ParallaxImage({ src, alt, sizes }: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        const center = rect.top + rect.height / 2;
        const p = (center - vh / 2) / vh; // ~0 when centered
        el.style.transform = `translate3d(0, ${p * 42}px, 0) scale(1.12)`;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 will-change-transform">
      <Image src={src} alt={alt} fill sizes={sizes} className="object-cover" />
    </div>
  );
}
