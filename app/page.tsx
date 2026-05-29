"use client";

import { useState } from "react";
import Preloader from "@/components/ui/Preloader";
import Hero from "@/components/sections/Hero";
import Manifesto from "@/components/sections/Manifesto";
import Slider from "@/components/sections/Slider";
import Outro from "@/components/sections/Outro";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {/* 1. Preloader Phase */}
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}

      {/* 2-5. Hero & Rest of Site */}
      <Hero startIntro={isLoaded} />

      {isLoaded && (
        <>
          <Manifesto />
          <Slider />
          <Outro />
          <Footer />
        </>
      )}
    </>
  );
}
