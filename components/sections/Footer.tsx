"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import MagneticLink from "../ui/MagneticLink";

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerRef.current, {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "top 50%",
          scrub: 1,
        },
      });
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative h-screen bg-[#e2e2e2] text-[#0f0f0f] flex flex-col justify-between overflow-hidden"
    >
      <div className="flex-1 flex items-center justify-between px-8 md:px-16 pt-16">
        <div>
          <span className="text-sm font-bold uppercase tracking-widest">
            Special Thanks
          </span>
          <h1 className="text-6xl md:text-9xl font-bold mt-2">DevbyShadow</h1>
        </div>
        <div className="text-right">
          <span className="text-sm font-bold uppercase tracking-widest">
            Socials
          </span>
          <div className="flex gap-4 mt-2 justify-end text-3xl font-bold">
            <MagneticLink>
              <a href="instagram.com">Ig</a>
            </MagneticLink>
            <MagneticLink>
              <a href="linkedin.com">In</a>
            </MagneticLink>
            <MagneticLink>
              <a href="behance.com">Be</a>
            </MagneticLink>
          </div>
        </div>
      </div>
      <div className="px-8 md:px-16 pb-8 flex justify-between items-end text-sm opacity-60">
        <p>&copy;2026 Ayush Shah</p>
        <p>Make It Last</p>
      </div>
    </footer>
  );
}
