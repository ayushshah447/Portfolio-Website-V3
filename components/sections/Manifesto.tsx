"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const manifestoSlides = [
  {
    text: "Unforgettable memories are not defined by details.",
    align: "left",
  },
  {
    text: "They are felt.",
    align: "center",
  },
  {
    text: "Design translates emotion into form.",
    align: "left",
  },
  {
    text: "Form that evokes.",
    align: "center",
  },
];

const previewImages = [
  "/manifesto/img-1.webp",
  "/manifesto/img-2.webp",
  "/manifesto/img-3.webp",
];

const HIGHLIGHT = "60, 60, 60";

function splitWords(element: HTMLElement) {
  const text = element.textContent ?? "";
  element.innerHTML = "";

  return text.split(/\s+/).map((word) => {
    const wrapper = document.createElement("span");
    wrapper.className = "manifesto__word";
    wrapper.innerHTML = `<span>${word}</span>`;
    element.appendChild(wrapper);
    element.appendChild(document.createTextNode(" "));
    return wrapper;
  });
}

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const previews = gsap.utils.toArray<HTMLElement>(".manifesto__preview");
      const slides = gsap.utils.toArray<HTMLElement>(".manifesto__slide");

      gsap.set(".manifesto__previews", { opacity: 0 });
      gsap.set(previews, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
      });

      slides.forEach((slide, slideIndex) => {
        const text = slide.querySelector<HTMLElement>(".manifesto__text");
        if (!text) return;

        const words = splitWords(text);
        const contents = words.map((word) => word.querySelector("span"));
        gsap.set(words, {
          opacity: 0,
          backgroundColor: `rgba(${HIGHLIGHT}, 1)`,
        });
        gsap.set(contents, { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top top",
            end: () => `+=${window.innerHeight * 2.5}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.18,
            id: `manifesto-slide-${slideIndex + 1}`,
          },
        });

        tl.to(
          words,
          {
            opacity: 1,
            backgroundColor: `rgba(${HIGHLIGHT}, 0)`,
            duration: 0.72,
            ease: "none",
            stagger: {
              each: 0.045,
            },
          },
          0,
        );
        tl.to(
          contents,
          {
            opacity: 1,
            duration: 0.5,
            ease: "none",
            stagger: {
              each: 0.045,
            },
          },
          0.08,
        );
        tl.to(
          contents,
          {
            opacity: 0,
            duration: 0.22,
            ease: "sine.inOut",
            stagger: {
              each: 0.072,
            },
          },
          1.05,
        );
        tl.to(
          words,
          {
            opacity: 0,
            backgroundColor: `rgba(${HIGHLIGHT}, 1)`,
            duration: 0.35,
            ease: "sine.inOut",
            stagger: {
              each: 0.072,
            },
          },
          1.05,
        );
      });

      previews.forEach((preview, index) => {
        const spacer = section.querySelector<HTMLElement>(
          `.manifesto__spacer[data-spacer="${index + 1}"]`,
        );
        if (!spacer) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: spacer,
            start: index === 0 ? "top 50%" : "top 105%",
            end: "bottom top",
            scrub: window.innerWidth <= 850 ? 0.04 : 0.08,
            id: `manifesto-preview-${index + 1}`,
          },
        });

        tl.fromTo(
          preview,
          {
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 0.4,
            ease: "none",
          },
        );

        if (index < previews.length - 1) {
          tl.to(preview, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: 0.4,
            delay: 0.6,
            ease: "none",
          });
        }

        gsap.fromTo(
          preview.querySelector("img"),
          { scale: 1 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: spacer,
              start: index === 0 ? "top bottom" : "top 105%",
              end: "bottom top",
              scrub: window.innerWidth <= 850 ? 0.28 : 1,
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        onEnter: () =>
          gsap.to(".manifesto__previews", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={sectionRef} className="next-section manifesto" id="manifesto-section">
      <div className="manifesto__previews">
        {previewImages.map((src, index) => (
          <div
            key={src}
            className={`manifesto__preview manifesto__preview--${index + 1}`}
            data-preview={index + 1}
          >
            <img src={src} alt="" />
          </div>
        ))}
      </div>

      {manifestoSlides.map((slide, index) => (
        <div key={slide.text}>
          <section
            className={`manifesto__slide manifesto__slide--${index + 1} ${
              index === manifestoSlides.length - 1
                ? "manifesto__slide--last"
                : ""
            }`}
            data-slide={index + 1}
          >
            <div className="manifesto__copy">
              <p
                className={`manifesto__text manifesto__text--${slide.align}`}
              >
                {slide.text}
              </p>
            </div>
          </section>
          {index < manifestoSlides.length - 1 && (
            <div
              className="manifesto__spacer"
              data-spacer={index + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
}
