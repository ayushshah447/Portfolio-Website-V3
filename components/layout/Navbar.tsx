"use client";

import Link from "next/link";
import MagneticLink from "../ui/MagneticLink";
import { useIntro } from "@/context/IntroContext";

interface NavbarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Navbar({ isOpen, setIsOpen }: NavbarProps) {
  const { isIntroComplete } = useIntro(); // Get state from context

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-40 mix-blend-difference px-8 py-6 flex justify-between items-center text-white transition-opacity duration-700 ${
        isIntroComplete ? "opacity-1" : "opacity-0 pointer-events-none"
      }`}
    >
      <MagneticLink>
        <Link href="/" className="nav-logo text-xl font-bold">
          Ayush Shah
        </Link>
      </MagneticLink>

      <div className="hidden md:flex gap-8 items-center">
        <MagneticLink>
          <Link href="/works">Works</Link>
        </MagneticLink>
        <MagneticLink>
          <Link href="/about">About</Link>
        </MagneticLink>
        <MagneticLink>
          <a href="mailto:ayushshah447@gmail.com">Reach out</a>
        </MagneticLink>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-xl">
        {isOpen ? "Close" : "Menu"}
      </button>
    </nav>
  );
}
