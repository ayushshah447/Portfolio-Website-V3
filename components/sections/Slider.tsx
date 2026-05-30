"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const slides = [
  { title: "Triadlight", image: "/work-section/slider_img_1.webp" },
  { title: "Itmatters", image: "/work-section/slider_img_2.webp" },
  { title: "Lynice", image: "/work-section/slider_img_4.webp" },
];

export default function Slider() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const ctx = gsap.context(() => {
      const wrappers = gsap.utils.toArray<HTMLElement>(".slide-wrapper");
      const inners = gsap.utils.toArray<HTMLElement>(".slide-inner");
      const title = section.querySelector<HTMLElement>(".slider-title h1");
      const number = section.querySelector<HTMLElement>(".current-number");
      const progress = section.querySelector<HTMLElement>(".slider-progress");
      const labels = gsap.utils.toArray<HTMLElement>(".index-label");

      gsap.set(wrappers, { yPercent: 100 });
      gsap.set(inners, { yPercent: -100 });
      gsap.set(wrappers[0], { yPercent: 0 });
      gsap.set(inners[0], { yPercent: 0 });
      gsap.set(progress, { scaleY: 0, transformOrigin: "top" });
      gsap.set(labels[0], { opacity: 1, x: 0 });
      gsap.set(labels.slice(1), { opacity: 0.45, x: 0 });

      const setSlide = (index: number) => {
        wrappers.forEach((wrapper, wrapperIndex) => {
          const inner = inners[wrapperIndex];
          const isActive = wrapperIndex === index;

          gsap.to(wrapper, {
            yPercent: isActive ? 0 : wrapperIndex < index ? -100 : 100,
            duration: 0.25,
            ease: "power4.out",
            overwrite: true,
          });
          gsap.to(inner, {
            yPercent: isActive ? 0 : wrapperIndex < index ? 100 : -100,
            duration: 0.25,
            ease: "power4.out",
            overwrite: true,
          });
        });

        if (title) {
          gsap.to(title, {
            yPercent: -20,
            opacity: 0,
            duration: 0.18,
            ease: "power2.in",
            onComplete: () => {
              title.textContent = slides[index].title;
              gsap.fromTo(
                title,
                { yPercent: 20, opacity: 0 },
                {
                  yPercent: 0,
                  opacity: 1,
                  duration: 0.45,
                  ease: "power3.out",
                },
              );
            },
          });
        }

        if (number) number.textContent = String(index + 1).padStart(2, "0");
        labels.forEach((label, labelIndex) => {
          gsap.to(label, {
            opacity: labelIndex === index ? 1 : 0.45,
            duration: 0.35,
            ease: "power2.out",
          });
        });
      };

      let current = 0;
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: () => `+=${window.innerHeight * slides.length}`,
        pin: section,
        pinSpacing: false,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const next = Math.min(
            slides.length - 1,
            Math.floor(self.progress * slides.length),
          );
          if (next !== current) {
            current = next;
            setSlide(current);
          }
          if (progress) progress.style.transform = `scaleY(${self.progress})`;

          if (self.progress > 0.85) {
            const fade = (self.progress - 0.85) / 0.15;
            section.style.opacity = String(1 - Math.min(1, fade));
          } else {
            section.style.opacity = "1";
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  const scrollHeight =
    typeof window !== "undefined" ? window.innerHeight * slides.length : 3000;

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: `${scrollHeight}px` }}
    >
      <section
        ref={sectionRef}
        className="slider"
        id="slider-section"
        style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
      >
        <div className="slider-images" id="slider-images">
          {slides.map((slide, index) => (
            <div
              key={slide.title}
              className={`slide-wrapper ${index === 0 ? "active" : ""}`}
              data-slide-index={index}
            >
              <div className="slide-inner">
                <img src={slide.image} alt={slide.title} />
              </div>
            </div>
          ))}
        </div>

        <div className="slider-title" id="slider-title">
          <h1>{slides[0].title}</h1>
        </div>

        <div className="slider-indicator" id="slider-indicator">
          <div className="slider-indices-wrapper" id="slider-indices-wrapper">
            <div className="slider-progress-bar" id="slider-progress-bar-container">
              <div className="slider-progress" id="slider-progress-bar" />
            </div>
            <div className="slider-indices" id="slider-indices">
              {slides.map((slide, index) => (
                <p key={slide.title}>
                  <span className="index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="index-label">{slide.title}</span>
                </p>
              ))}
            </div>
          </div>

          <div className="slider-number" id="slider-number">
            <span className="current-number" id="current-number">
              01
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
