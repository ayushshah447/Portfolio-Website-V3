import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Prevent SSR errors by checking for the window object
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, CustomEase);
  CustomEase.create("hop", "0.9, 0, 0.1, 1");
}

export { gsap, ScrollTrigger, CustomEase };
