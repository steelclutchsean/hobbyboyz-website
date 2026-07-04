"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Reveal } from "./ui/Reveal";

// The WebGL scene can't render on the server.
const Scene = dynamic(() => import("./box/Scene"), {
  ssr: false,
  loading: () => <Poster />,
});

function Poster() {
  return (
    <Image
      src="/brand/box-photo.png"
      alt="Hobby Boyz First Class box"
      fill
      sizes="(max-width: 768px) 100vw, 60vw"
      className="object-contain"
      priority={false}
    />
  );
}

export function BoxShowcase() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const onChange = () => setReduced(media.matches);
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <section
      id="box"
      className="relative scroll-mt-20 overflow-hidden px-5 py-20 sm:px-8 sm:py-28"
    >
      <Reveal className="mx-auto max-w-2xl text-center">
        <p className="font-display text-xs uppercase tracking-[0.3em] text-gold-gradient">
          First class
        </p>
        <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight text-chrome sm:text-4xl">
          Every hit ships in style.
        </h2>
        <p className="mt-5 text-base leading-relaxed text-ink-muted">
          Our First Class box, done right. Give it a spin and watch the finish
          catch the light.
        </p>
      </Reveal>

      {/* 3D stage */}
      <div className="relative mx-auto mt-6 h-[58vh] max-h-[620px] min-h-[380px] w-full max-w-4xl cursor-grab touch-none active:cursor-grabbing">
        {reduced ? <Poster /> : <Scene spin />}
      </div>

      <p className="mt-2 text-center font-display text-xs uppercase tracking-[0.3em] text-ink-muted/60">
        Drag to spin
      </p>
    </section>
  );
}
