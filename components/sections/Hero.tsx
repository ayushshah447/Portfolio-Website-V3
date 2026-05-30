"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIntro } from "../../context/IntroContext";

interface HeroProps {
  startIntro: boolean;
}

type RevealPiece = {
  element: HTMLElement;
  content: HTMLElement | null;
};

const MASK_RGB = "60, 60, 60";

function splitChars(element: HTMLElement | null): RevealPiece[] {
  if (!element) return [];

  const text = element.textContent ?? "";
  element.innerHTML = "";

  return text.split("").map((char) => {
    const wrapper = document.createElement("span");
    wrapper.className = "block-revealer";
    wrapper.style.backgroundColor = `rgba(${MASK_RGB}, 1)`;

    const content = document.createElement("span");
    content.textContent = char === " " ? "\u00a0" : char;

    wrapper.appendChild(content);
    element.appendChild(wrapper);

    return { element: wrapper, content };
  });
}

function wrapBlock(element: HTMLElement | null): RevealPiece | null {
  if (!element) return null;

  const html = element.innerHTML;
  element.innerHTML = "";
  element.classList.add("block-revealer");
  element.style.backgroundColor = `rgba(${MASK_RGB}, 1)`;

  const content = document.createElement("span");
  content.innerHTML = html;
  element.appendChild(content);

  return { element, content };
}

function revealPieces(
  pieces: RevealPiece[],
  duration = 0.4,
  delay = 0,
  reverse = false,
) {
  const tl = gsap.timeline({ delay });
  const stagger = Math.min(0.05, duration / Math.max(pieces.length, 1));
  const blockDuration = Math.min(0.3, duration * 0.8);

  pieces.forEach((piece, index) => {
    const at = index * stagger;

    if (reverse) {
      tl.to(
        piece.element,
        {
          backgroundColor: `rgba(${MASK_RGB}, 1)`,
          duration: blockDuration * 0.3,
          ease: "power2.in",
        },
        at,
      );
      tl.to(piece.content, { opacity: 0, duration: blockDuration * 0.3 }, at);
      tl.to(
        piece.element,
        {
          opacity: 0,
          duration: blockDuration * 0.4,
          ease: "power2.inOut",
        },
        at + blockDuration * 0.4,
      );
      return;
    }

    tl.to(
      piece.element,
      {
        opacity: 1,
        duration: blockDuration * 0.3,
        ease: "power2.inOut",
      },
      at,
    );
    tl.to(
      piece.element,
      {
        backgroundColor: `rgba(${MASK_RGB}, 0)`,
        duration: blockDuration * 0.6,
        ease: "power2.out",
      },
      at + blockDuration * 0.35,
    );
    tl.to(
      piece.content,
      {
        opacity: 1,
        duration: blockDuration * 0.6,
        ease: "power2.out",
      },
      at + blockDuration * 0.35,
    );
  });

  return tl;
}

export default function Hero({ startIntro }: HeroProps) {
  const wrapperRef = useRef<HTMLElement>(null);
  const bgWrapperRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const revealBgRef = useRef<HTMLDivElement>(null);
  const titleMakeRef = useRef<HTMLSpanElement>(null);
  const titleLastRef = useRef<HTMLSpanElement>(null);
  const topLabelRef = useRef<HTMLParagraphElement>(null);
  const bottomLabelRef = useRef<HTMLParagraphElement>(null);
  const yearRef = useRef<HTMLHeadingElement>(null);
  const scrollDownRef = useRef<HTMLParagraphElement>(null);
  const scrollCleanupRef = useRef<(() => void) | null>(null);

  const { setIsIntroComplete } = useIntro();

  useEffect(() => {
    if (!startIntro) return;

    scrollCleanupRef.current?.();
    scrollCleanupRef.current = null;

    const ctx = gsap.context(() => {
      const wrapper = wrapperRef.current;
      const card = cardRef.current;
      const bgWrapper = bgWrapperRef.current;
      const bgImage = bgImageRef.current;
      const revealBg = revealBgRef.current;

      if (!wrapper || !card || !bgWrapper || !bgImage || !revealBg) return;

      const getCardClip = () => {
        const cardRect = card.getBoundingClientRect();
        const heroRect = wrapper.getBoundingClientRect();
        const left = ((cardRect.left - heroRect.left) / heroRect.width) * 100;
        const top = ((cardRect.top - heroRect.top) / heroRect.height) * 100;
        const right = ((cardRect.right - heroRect.left) / heroRect.width) * 100;
        const bottom =
          ((cardRect.bottom - heroRect.top) / heroRect.height) * 100;

        return `polygon(${left}% ${top}%, ${right}% ${top}%, ${right}% ${bottom}%, ${left}% ${bottom}%)`;
      };

      const year = splitChars(yearRef.current);
      const last = splitChars(titleLastRef.current);
      const makeIt = splitChars(titleMakeRef.current);
      const topLabel = wrapBlock(topLabelRef.current);
      const bottomLabel = wrapBlock(bottomLabelRef.current);
      const scrollDown = wrapBlock(scrollDownRef.current);

      const textGroups = [
        year,
        bottomLabel ? [bottomLabel] : [],
        last,
        makeIt,
        topLabel ? [topLabel] : [],
      ];
      const textRevealTl = gsap.timeline({ paused: true });
      textRevealTl.set(scrollDownRef.current, { display: "block" }, 0);
      textGroups.forEach((pieces, index) => {
        let delay = index * 0.05;
        if (index >= 2) delay += 0.15;
        textRevealTl.add(revealPieces(pieces, 0.4), delay);
      });
      if (scrollDown) textRevealTl.add(revealPieces([scrollDown], 0.4), 0.5);

      gsap.set(bgWrapper, {
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)",
      });
      gsap.set(bgImage, {
        scale: 1.72,
        transformOrigin: "50% 50%",
      });
      gsap.set(card, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });
      gsap.set(revealBg, {
        opacity: 0,
        scale: 1,
        clipPath: getCardClip(),
      });
      gsap.set(scrollDownRef.current, {
        display: "none",
        opacity: 0.5,
      });

      const initScrollAnimations = () => {
        const scrollCtx = gsap.context(() => {
          let zSet = false;
          const tl = gsap.timeline({
            scrollTrigger: {
              id: "heroScroll",
              trigger: wrapper,
              start: "top top",
              end: "+=100%",
              pin: true,
              scrub: 0.28,
              invalidateOnRefresh: true,
              onUpdate: (self) => {
                if (!zSet && self.progress > 0.6 && wrapper) {
                  wrapper.style.zIndex = "1";
                  zSet = true;
                }
              },
            },
          });

          tl.fromTo(
            revealBg,
            { clipPath: getCardClip },
            {
              clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
              ease: "none",
            },
            0,
          );

          tl.to(
            overlayRef.current,
            {
              opacity: 1,
              ease: "none",
              duration: 1.1,
            },
            0,
          );

          [
            bottomLabel ? [bottomLabel] : [],
            topLabel ? [topLabel] : [],
          ].forEach((pieces, index) => {
            tl.add(revealPieces(pieces, 0.5, 0, true), 0.1 + index * 0.1);
          });

          [year, last, makeIt].forEach((pieces, index) => {
            tl.add(revealPieces(pieces, 0.3, 0, true), 0.6 + index * 0.05);
          });
        }, wrapper);

        scrollCleanupRef.current = () => scrollCtx.revert();
        ScrollTrigger.refresh();
      };

      const tl = gsap.timeline({
        onComplete: () => {
          setIsIntroComplete(true);
          initScrollAnimations();
        },
      });

      tl.to(
        bgWrapper,
        {
          clipPath: getCardClip(),
          duration: 1.25,
          ease: "hop",
        },
        0.9,
      );
      tl.to(
        bgImage,
        {
          scale: 1.15,
          duration: 1.25,
          ease: "hop",
        },
        0.9,
      );
      tl.to(
        bgWrapper,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1.5,
          ease: "hop",
        },
        2.4,
      );
      tl.to(
        bgImage,
        {
          scale: 1,
          duration: 1.5,
          ease: "hop",
        },
        2.4,
      );
      tl.to(
        card,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          duration: 1,
          ease: "hop",
        },
        3.65,
      );
      tl.add(() => textRevealTl.play(0), 3.9);
      tl.add(() => {
        gsap.set(revealBg, {
          opacity: 1,
          scale: 1,
          clipPath: getCardClip(),
        });
      }, 4.65);
    }, wrapperRef);

    return () => {
      scrollCleanupRef.current?.();
      scrollCleanupRef.current = null;
      ctx.revert();
    };
  }, [startIntro, setIsIntroComplete]);

  return (
    <section ref={wrapperRef} className="hero relative z-40">
      <p ref={scrollDownRef} className="scroll-down">
        Scroll Down
      </p>

      <div ref={bgWrapperRef} className="hero-bg">
        <img ref={bgImageRef} src="/hero/hero.webp" alt="" />
      </div>

      <div ref={overlayRef} className="hero-overlay" />
      <div ref={revealBgRef} className="card-reveal-bg" />

      <div ref={cardRef} className="card">
        <div className="card-top-left">
          <p ref={topLabelRef} className="label">
            Frontend Developer
          </p>
          <h1 className="make-it-last">
            <span ref={titleMakeRef} className="make-it">
              Make It
            </span>
            <br />
            <span ref={titleLastRef} className="last">
              Last
            </span>
          </h1>
        </div>

        <div className="card-bottom-right">
          <p ref={bottomLabelRef} className="label">
            Portfolio
          </p>
          <h1 ref={yearRef}>‘26</h1>
        </div>
      </div>
    </section>
  );
}
