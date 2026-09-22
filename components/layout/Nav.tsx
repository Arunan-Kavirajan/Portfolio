"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-5 md:px-8 py-4 md:py-6 z-50 bg-bg/80 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">
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
          <Link href="/blog">blog</Link>
        </li>
        <li>
          <Link href="/resume">resume</Link>
        </li>
      </ul>
    </nav>
  );
}