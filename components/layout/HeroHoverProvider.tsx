"use client";

import { createContext, useContext, useState } from "react";

type HeroHoverContextType = {
  isHeroHovering: boolean;
  setIsHeroHovering: (value: boolean) => void;
};

const HeroHoverContext = createContext<HeroHoverContextType>({
  isHeroHovering: false,
  setIsHeroHovering: () => {},
});

export function useHeroHover() {
  return useContext(HeroHoverContext);
}

export default function HeroHoverProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isHeroHovering, setIsHeroHovering] = useState(false);

  return (
    <HeroHoverContext.Provider value={{ isHeroHovering, setIsHeroHovering }}>
      {children}
    </HeroHoverContext.Provider>
  );
}