"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";

interface MagneticLinkProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export default function MagneticLink({
  children,
  className,
  strength = 0.3,
}: MagneticLinkProps) {
  const ref = useRef<HTMLSpanElement>(null); // Changed from HTMLAnchorElement to HTMLSpanElement

  const handleMouseMove = (e: React.MouseEvent<HTMLSpanElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(ref.current, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(ref.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });
  };

  return (
    <span
      ref={ref}
      className={`inline-block ${className}`} // Changed to span, added inline-block
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </span>
  );
}
