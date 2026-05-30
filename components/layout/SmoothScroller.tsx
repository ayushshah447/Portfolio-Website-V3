"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "@/lib/gsap";

export default function SmoothScroller({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add(raf);

    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      lenis.off("scroll", ScrollTrigger.update);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <main>{children}</main>;
}
