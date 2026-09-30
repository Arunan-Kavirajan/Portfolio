"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/lib/hooks/useIsMobile";

export default function LoadingScreen({
  show,
  count,
}: {
  show: boolean;
  count: number;
}) {
  const { isMobile, mounted } = useIsMobile();

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* ─── MOBILE / TABLET: Ink & Parchment Loading ─── */}
          {mounted && isMobile ? (
            <motion.div
              key="mobile-loading"
              className="fixed inset-0 z-[9998] bg-[#F0E2C8] flex flex-col items-center justify-center select-none overflow-hidden"
              exit={{
                clipPath: "circle(0% at 50% 50%)",
              }}
              transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            >
              {/* Paper texture */}
              <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-multiply">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <filter id="load-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="5" stitchTiles="stitch" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#load-grain)" opacity="0.6" />
                </svg>
              </div>

              {/* Thin decorative line across the top */}
              <div className="absolute top-0 left-0 w-full h-[2px] bg-[#1C1108]/10" />
              <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1C1108]/10" />

              {/* Content */}
              <div className="relative flex flex-col items-center gap-10 z-10">
                {/* Initials monogram */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative"
                >
                  <span className="font-serif text-7xl sm:text-8xl text-[#1C1108] font-bold tracking-tighter leading-none">
                    AK
                  </span>
                  <div className="absolute -inset-4 border border-[#1C1108]/20 rounded-full" />
                  <div className="absolute -inset-6 border border-[#1C1108]/8 rounded-full" />
                </motion.div>

                {/* Progress line — a horizontal ink stroke that fills */}
                <div className="w-48 sm:w-56 relative">
                  <div className="h-[1px] w-full bg-[#1C1108]/10" />
                  <motion.div
                    className="absolute top-0 left-0 h-[2px] bg-[#1C1108]"
                    style={{ width: `${count}%` }}
                    transition={{ duration: 0.05 }}
                  />
                  {/* Moving dot at the tip */}
                  <motion.div
                    className="absolute top-[-2px] w-[5px] h-[5px] rounded-full bg-[#8B4513]"
                    style={{ left: `${count}%` }}
                    transition={{ duration: 0.05 }}
                  />
                </div>

                {/* Name and ref */}
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="flex flex-col items-center gap-2"
                >
                  <span className="font-mono text-[9px] tracking-[0.35em] text-[#6B5B48] uppercase">
                    Arunan Kavirajan
                  </span>
                  <span className="font-mono text-[8px] tracking-[0.2em] text-[#9C8B78] uppercase">
                    Portfolio · 2026
                  </span>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            /* ─── DESKTOP: Original Loading Screen (UNTOUCHED) ─── */
            <motion.div
              key="desktop-loading"
              className="fixed inset-0 z-[9998] bg-bg flex flex-col items-center justify-center gap-4"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <p className="font-sans text-sm tracking-wide text-muted">
                arunan kavirajan
              </p>
              <p className="font-serif text-7xl text-ink">{count}&apos;</p>
            </motion.div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}