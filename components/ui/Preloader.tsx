"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [count, setCount] = useState(0);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete,
    });

    // Animate counter
    const counter = { val: 0 };
    tl.to(counter, {
      val: 100,
      duration: 1.5,
      ease: "power2.inOut",
      onUpdate: () => setCount(Math.round(counter.val)),
    });

    // Animate progress bar width
    tl.to(
      progressRef.current,
      {
        width: "100%",
        duration: 1.5,
        ease: "power2.inOut",
      },
      0, // Start at the same time as counter
    );

    // Fade out preloader
    tl.to(counterRef.current, {
      opacity: 0,
      yPercent: -50,
      duration: 0.5,
    });
  }, [onComplete]);

  return (
    <div
      ref={counterRef}
      className="preloader-counter fixed inset-0 z-50 flex items-center justify-center bg-[#0f0f0f]"
    >
      <h1 className="text-white">{count}</h1>
      <div className="absolute bottom-0 left-0 h-[3.5px] w-full origin-left bg-[#3a3a3a]">
        <div
          ref={progressRef}
          className="absolute top-0 left-0 h-full bg-white"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}
