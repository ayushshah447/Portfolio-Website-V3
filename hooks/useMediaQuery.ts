"use client";

import { useSyncExternalStore } from "react";

function getMediaQueryMatches(query: string): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  return window.matchMedia(query).matches;
}

export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (notify) => {
      const media = window.matchMedia(query);
      media.addEventListener("change", notify);
      return () => media.removeEventListener("change", notify);
    },
    () => getMediaQueryMatches(query),
    () => false,
  );
}
