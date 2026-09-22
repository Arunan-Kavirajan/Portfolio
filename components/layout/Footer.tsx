"use client";

import { motion } from "framer-motion";
import { useHeroHover } from "./HeroHoverProvider";

export default function Footer() {
  const { isHeroHovering } = useHeroHover();

  return (
    <footer
      data-hover={isHeroHovering}
      className="w-full flex items-center justify-between px-8 py-6 font-sans text-sm text-ink transition-opacity duration-300 max-md:opacity-100 data-[hover=true]:md:opacity-0 max-md:pointer-events-auto data-[hover=true]:md:pointer-events-none"
    >
      <div className="flex gap-6">
        <a
          href="https://github.com/arunan-kavirajan"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          github
        </a>
        <a
          href="https://linkedin.com/in/arunan-kavirajan"
          target="_blank"
          rel="noopener noreferrer"
          className="no-underline"
        >
          linkedin
        </a>
      </div>
      <a 
        href="mailto:arunan.kavirajan@gmail.com" 
        className="no-underline"
      >
        arunan.kavirajan@gmail.com
      </a>
    </footer>
  );
}