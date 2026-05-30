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
            start: slideIndex === 0 ? "top top+=10vh" : "top top",
            end: () => `+=${window.innerHeight * 1.2}`,
            pin: true,
            pinSpacing: true,
            scrub: 0.08,
            id: `manifesto-slide-${slideIndex + 1}`,
          },
        });

        tl.to(
          words,
          {
            opacity: 1,
            backgroundColor: `rgba(${HIGHLIGHT}, 0)`,
            duration: 0.45,
            ease: "none",
            stagger: {
              each: 0.03,
            },
          },
          0,
        );
        tl.to(
          contents,
          {
            opacity: 1,
            duration: 0.3,
            ease: "none",
            stagger: {
              each: 0.03,
            },
          },
          0.05,
        );
        tl.to(
          contents,
          {
            opacity: 0,
            duration: 0.15,
            ease: "sine.inOut",
            stagger: {
              each: 0.05,
            },
          },
          1.05,
        );
        tl.to(
          words,
          {
            opacity: 0,
            backgroundColor: `rgba(${HIGHLIGHT}, 1)`,
            duration: 0.2,
            ease: "sine.inOut",
            stagger: {
              each: 0.05,
            },
          },
          1.05,
        );
      });

      previews.forEach((preview, index) => {
        const slide = section.querySelector<HTMLElement>(
          `.manifesto__slide[data-slide="${index + 1}"]`,
        );
        if (!slide) return;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slide,
            start: "top bottom",
            end: "top top",
            scrub: window.innerWidth <= 850 ? 0.02 : 0.04,
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

        gsap.fromTo(
          preview.querySelector("img"),
          { scale: 1 },
          {
            scale: 1.05,
            ease: "none",
            scrollTrigger: {
              trigger: slide,
              start: "top bottom",
              end: "top top",
              scrub: window.innerWidth <= 850 ? 0.08 : 0.15,
            },
          },
        );
      });

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        onEnter: () =>
          gsap.to(".manifesto__previews", {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          }),
        onLeave: () =>
          gsap.to(".manifesto__previews", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          }),
        onEnterBack: () =>
          gsap.to(".manifesto__previews", {
            opacity: 1,
            duration: 0.3,
            ease: "power2.out",
          }),
        onLeaveBack: () =>
          gsap.to(".manifesto__previews", {
            opacity: 0,
            duration: 0.3,
            ease: "power2.in",
          }),
      });
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const imgs = Array.from(section.querySelectorAll<HTMLImageElement>(".manifesto__preview img"));
    if (imgs.length === 0) return;

    const unloaded = imgs.filter((img) => !img.complete);
    if (unloaded.length === 0) {
      ScrollTrigger.refresh();
      return;
    }

    let loaded = 0;
    const onLoad = () => {
      loaded++;
      if (loaded === unloaded.length) ScrollTrigger.refresh();
    };

    unloaded.forEach((img) => {
      img.addEventListener("load", onLoad);
      img.addEventListener("error", onLoad);
    });

    return () => {
      unloaded.forEach((img) => {
        img.removeEventListener("load", onLoad);
        img.removeEventListener("error", onLoad);
      });
    };
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
