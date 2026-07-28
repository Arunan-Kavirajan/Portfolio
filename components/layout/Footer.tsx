"use client";

import { motion } from "framer-motion";
import { useHeroHover } from "./HeroHoverProvider";

export default function Footer() {
  const { isHeroHovering } = useHeroHover();

  return (
    <motion.footer
      className="w-full flex items-center justify-between px-8 py-6 border-t border-border font-sans text-sm text-ink"
      animate={{ opacity: isHeroHovering ? 0 : 1 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{ pointerEvents: isHeroHovering ? "none" : "auto" }}
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
      <a href="mailto:YOUR_EMAIL@example.com" className="no-underline">
        arunan.kavirajan@gmail.com
      </a>
    </motion.footer>
  );
}