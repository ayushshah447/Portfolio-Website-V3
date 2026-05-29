"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ClipPathRevealProps {
  children: ReactNode;
  start?: string;
  end?: string;
}

export default function ClipPathReveal({
  children,
  start = "top 85%",
  end = "top 40%",
}: ClipPathRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    gsap.fromTo(
      el,
      { clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" },
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        ease: "power3.inOut",
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub: 1,
        },
      },
    );
  }, [start, end]);

  return <div ref={containerRef}>{children}</div>;
}
