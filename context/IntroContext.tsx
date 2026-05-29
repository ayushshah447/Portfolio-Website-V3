"use client";

import { createContext, useContext, useState, ReactNode } from "react";

const IntroContext = createContext<{
  isIntroComplete: boolean;
  setIsIntroComplete: (v: boolean) => void;
}>({
  isIntroComplete: false,
  setIsIntroComplete: () => {},
});

export function IntroProvider({ children }: { children: ReactNode }) {
  const [isIntroComplete, setIsIntroComplete] = useState(false);

  return (
    <IntroContext.Provider value={{ isIntroComplete, setIsIntroComplete }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntro = () => useContext(IntroContext);
