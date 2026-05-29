"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

interface MenuOverlayProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function MenuOverlay({ isOpen, setIsOpen }: MenuOverlayProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (isOpen) {
        // Wipe in background
        gsap.to(menuRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 0.8,
          ease: "power4.inOut",
        });

        // Staggered links with rotate and translate
        gsap.fromTo(
          linksRef.current?.children ?? [],
          { yPercent: 115, rotate: 8, opacity: 0 },
          {
            yPercent: 0,
            rotate: 0,
            opacity: 1,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            delay: 0.3,
          },
        );
      } else {
        gsap.to(menuRef.current, {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 0.6,
          ease: "power4.inOut",
        });
      }
    });

    return () => ctx.revert();
  }, [isOpen]);

  return (
    <div
      ref={menuRef}
      className="fixed inset-0 z-30 bg-[#0f0f0f] flex items-center justify-center"
      style={{ clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)" }}
    >
      <div
        ref={linksRef}
        className="flex flex-col items-center gap-8 text-5xl md:text-7xl font-bold text-white"
      >
        <Link href="/works" onClick={() => setIsOpen(false)}>
          Works
        </Link>
        <Link href="/about" onClick={() => setIsOpen(false)}>
          About
        </Link>
        <a
          href="mailto:hello@victorfuruya.com"
          onClick={() => setIsOpen(false)}
        >
          Reach out
        </a>
      </div>
    </div>
  );
}
