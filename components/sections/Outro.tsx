"use client";

import BlockReveal from "../animations/BlockReveal";
import ClipPathReveal from "../animations/ClipPathReveal";

export default function Outro() {
  return (
    <section className="relative min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center text-white py-32 px-8 overflow-hidden">
      <div className="z-10 text-center mb-16">
        <h2 className="text-5xl md:text-8xl font-bold mb-4">
          <BlockReveal delay={0.2}>Who&apos;s behind</BlockReveal>
        </h2>
        <h2 className="text-5xl md:text-8xl font-bold">
          <BlockReveal delay={0.4}>the work.</BlockReveal>
        </h2>
      </div>

      <ClipPathReveal start="top 80%" end="top 20%">
        <div className="w-[80vw] max-w-4xl h-[60vh] relative">
          <img
            src="/outro-about/about-hero_img.webp"
            alt="Memory"
            className="w-full h-full object-cover"
          />
        </div>
      </ClipPathReveal>

      <div className="z-10 text-center mt-16">
        <h2 className="text-4xl md:text-6xl">
          <BlockReveal delay={0.6}>Carve it into</BlockReveal>
        </h2>
        <h1 className="text-6xl md:text-9xl font-bold mt-2">
          <BlockReveal delay={0.8}>Memory</BlockReveal>
        </h1>
      </div>
    </section>
  );
}
