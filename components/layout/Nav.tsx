"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useHeroHover } from "./HeroHoverProvider";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isHeroHovering } = useHeroHover();
  const hideRest = isHome && isHeroHovering;

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-50">
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 170, damping: 22 }}
        className={
          hideRest
            ? "fixed left-[42%] top-[14%] -translate-x-1/2 z-[80]"
            : "relative"
        }
      >
        <Link
          href="/"
          className={`font-serif tracking-wide transition-all block ${
            isHome
              ? hideRest
                ? "text-5xl"
                : "text-2xl"
              : "text-sm font-sans"
          }`}
        >
          Arunan Kavirajan
        </Link>
      </motion.div>

      <motion.ul
        className="flex gap-8 font-sans text-sm"
        animate={{ opacity: hideRest ? 0 : 1 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        style={{ pointerEvents: hideRest ? "none" : "auto" }}
      >
        <li>
          <Link href="/projects">projects</Link>
        </li>
        <li>
          <Link href="/blog">blog</Link>
        </li>
        <li>
          <Link href="/resume">resume</Link>
        </li>
      </motion.ul>
    </nav>
  );
}