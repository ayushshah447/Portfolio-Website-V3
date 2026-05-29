"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import MenuOverlay from "@/components/layout/MenuOverlay";
import SmoothScroller from "@/components/layout/SmoothScroller";
import { IntroProvider } from "@/context/IntroContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <IntroProvider>
      <Navbar isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <MenuOverlay isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      <SmoothScroller>{children}</SmoothScroller>
    </IntroProvider>
  );
}
