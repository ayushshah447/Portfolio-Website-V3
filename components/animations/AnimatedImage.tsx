"use client";

import { useRef, useEffect } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import Image from "next/image";

interface AnimatedImageProps {
  src: string;
  alt: string;
  speed?: number; // Parallax speed multiplier (e.g., 0.2 = slow, 1 = normal)
}

export default function AnimatedImage({
  src,
  alt,
  speed = 0.3,
}: AnimatedImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { yPercent: -10 * speed, scale: 1.2 },
      {
        yPercent: 10 * speed,
        scale: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  }, [speed]);

  return (
    <div style={{ overflow: "hidden", width: "100%", height: "100%" }}>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
