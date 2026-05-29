"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "@/lib/gsap";

interface BlockRevealProps {
  children: ReactNode;
  delay?: number;
  backgroundColor?: string;
}

export default function BlockReveal({
  children,
  delay = 0,
  backgroundColor = "#2f2f2f",
}: BlockRevealProps) {
  const blockRef = useRef<HTMLSpanElement>(null); // Changed to Span
  const textRef = useRef<HTMLSpanElement>(null); // Changed to Span

  useEffect(() => {
    gsap.set(textRef.current, { opacity: 0 });

    const tl = gsap.timeline({ delay });
    tl.to(blockRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: "power3.inOut",
    }).to(textRef.current, { opacity: 1, duration: 0.2 }, "-=0.4");
  }, [delay]);

  return (
    // Changed all divs to spans, added verticalAlign to fix line-height issues
    <span
      style={{
        position: "relative",
        display: "inline-block",
        overflow: "hidden",
        verticalAlign: "bottom",
      }}
    >
      <span
        ref={blockRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor,
          zIndex: 2,
        }}
      />
      <span ref={textRef} style={{ display: "inline-block" }}>
        {children}
      </span>
    </span>
  );
}
