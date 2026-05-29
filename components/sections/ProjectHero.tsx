"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import BlockReveal from "../animations/BlockReveal";

export default function ProjectHero() {
  const sectionRef = useRef<HTMLElement>(null);

  const setupGsap = () => {
    const ctx = gsap.context(() => {
      gsap.to(".project-hero-img", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  };

  useRef(setupGsap);

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-[#0f0f0f]"
    >
      <img
        src="/work-section/slider_img_1.webp"
        alt="Project Hero"
        className="project-hero-img absolute inset-0 w-full h-full object-cover scale-110"
      />
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 h-full flex flex-col justify-end p-8 md:p-16 text-white">
        <h1 className="text-5xl md:text-9xl font-bold leading-none">
          <BlockReveal>Guiding your way,</BlockReveal>
          <br />
          <BlockReveal delay={0.2}>Triadlight</BlockReveal>
        </h1>
        <div className="mt-8 flex gap-12 text-sm uppercase tracking-widest opacity-80">
          <span>(Brand) Triadlight</span>
          <span>(Year) 21-23</span>
          <span>(Location) Dublin</span>
        </div>
      </div>
    </section>
  );
}
