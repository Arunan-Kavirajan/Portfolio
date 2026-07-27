"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="fixed top-0 left-0 w-full flex items-center justify-between px-8 py-6 z-50">
      <Link
        href="/"
        className={`font-serif tracking-wide transition-all ${
          isHome ? "text-2xl" : "text-sm font-sans"
        }`}
      >
        arunan kavirajan
      </Link>
      <ul className="flex gap-8 font-sans text-sm">
        <li>
          <Link href="/projects" className="hover:text-coral transition-colors">
            projects
          </Link>
        </li>
        <li>
          <Link href="/blog" className="hover:text-coral transition-colors">
            blog
          </Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-coral transition-colors">
            about
          </Link>
        </li>
        <li>
          <Link href="/resume" className="hover:text-coral transition-colors">
            resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}