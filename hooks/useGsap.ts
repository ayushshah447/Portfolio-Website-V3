"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

export function useGsap(
  callback: (gsapContext: gsap.Context) => void,
  deps: React.DependencyList = [],
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(ctx);
    }, ref); // Scope GSAP animations to the ref

    return () => ctx.revert(); // Clean up on unmount
    // include callback and spread deps so eslint can verify dependencies
  }, [callback, ...deps]);

  return ref;
}
