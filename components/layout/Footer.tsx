"use client";

import { useHeroHover } from "./HeroHoverProvider";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const { isHeroHovering } = useHeroHover();

  if (pathname === "/about") return null;

  return (
    <footer
      data-hover={isHeroHovering}
      className="w-full flex max-md:flex-col md:items-center max-md:justify-center md:justify-between px-5 md:px-8 py-4 md:py-6 gap-3 md:gap-0 font-sans text-xs md:text-sm text-ink transition-opacity duration-300 max-md:opacity-100 data-[hover=true]:md:opacity-0 max-md:pointer-events-auto data-[hover=true]:md:pointer-events-none text-center"
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