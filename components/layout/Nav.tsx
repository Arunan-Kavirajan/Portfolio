"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { isMobile, mounted } = useIsMobile();
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    if (!mounted || !isMobile || !isHome) {
      setPastHero(true);
      return;
    }

    const onScroll = () => {
      setPastHero(window.scrollY > window.innerHeight * 0.85);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mounted, isMobile, isHome]);

  /* On mobile homepage: completely hidden until you scroll past the hero */
  const shouldShow = !mounted || !isMobile || !isHome || pastHero;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.nav
          initial={isMobile && isHome ? { y: -60, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -60, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed top-0 left-0 w-full flex items-center justify-between px-5 md:px-8 py-4 md:py-6 z-50 bg-bg/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
        >
          <Link
            href="/"
            className={`font-serif tracking-wide block ${
              isHome ? "text-xl md:text-2xl" : "text-sm font-sans"
            }`}
          >
            Arunan Kavirajan
          </Link>

          <ul className="flex gap-4 md:gap-8 font-sans text-xs md:text-sm">
            <li>
              <Link href="/projects">projects</Link>
            </li>
            <li>
              <Link href="/resume">resume</Link>
            </li>
          </ul>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}