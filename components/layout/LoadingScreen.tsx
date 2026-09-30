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
          {/* MOBILE / TABLET (< 1024px): Vintage Bounty Seal Loading Screen */}
          {mounted && isMobile ? (
            <motion.div
              key="mobile-loading"
              className="fixed inset-0 z-[9998] bg-[#F0E2C8] text-[#1C1108] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
              exit={{ opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Vintage double frame */}
              <div className="absolute inset-4 sm:inset-6 border-2 border-[#8B4513]/30 pointer-events-none" />
              <div className="absolute inset-5 sm:inset-7 border border-[#8B4513]/15 pointer-events-none" />
              
              {/* Corner rosettes */}
              <span className="absolute top-8 left-8 text-[#8B4513]/50 font-serif text-sm">✦</span>
              <span className="absolute top-8 right-8 text-[#8B4513]/50 font-serif text-sm">✦</span>
              <span className="absolute bottom-8 left-8 text-[#8B4513]/50 font-serif text-sm">✦</span>
              <span className="absolute bottom-8 right-8 text-[#8B4513]/50 font-serif text-sm">✦</span>

              <div className="relative flex flex-col items-center justify-center max-w-sm w-full">
                
                {/* Vintage Circular Seal */}
                <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center mb-8">
                  {/* Rotating ornamental ring */}
                  <svg className="absolute inset-0 w-full h-full animate-[spin_30s_linear_infinite]" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="90"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="1.5"
                      strokeDasharray="4 4"
                      opacity="0.35"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="78"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="0.8"
                      opacity="0.4"
                    />
                    {/* Curved text */}
                    <path
                      id="seal-text-path"
                      d="M 100, 100 m -68, 0 a 68,68 0 1,1 136,0 a 68,68 0 1,1 -136,0"
                      fill="none"
                    />
                    <text className="font-mono text-[8.5px] uppercase tracking-[0.28em] fill-[#8B4513]/70">
                      <textPath href="#seal-text-path" startOffset="0%">
                        ✦ ARCHIVAL FIELD JOURNAL ✦ SPECIMEN 001 ✦ 2026 ✦
                      </textPath>
                    </text>
                  </svg>

                  {/* Circular progress meter */}
                  <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
                    <circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="1"
                      opacity="0.15"
                    />
                    <circle
                      cx="100"
                      cy="100"
                      r="60"
                      fill="none"
                      stroke="#8B4513"
                      strokeWidth="2.5"
                      strokeDasharray={2 * Math.PI * 60}
                      strokeDashoffset={2 * Math.PI * 60 * (1 - count / 100)}
                      strokeLinecap="round"
                      className="transition-all duration-75"
                    />
                  </svg>

                  {/* Center Emblem / Counter */}
                  <div className="flex flex-col items-center justify-center text-center z-10">
                    <span className="font-serif text-xs text-[#8B4513]/70 uppercase tracking-widest mb-0.5">Vol. I</span>
                    <span className="font-serif text-3xl sm:text-4xl text-[#1C1108] tracking-tight font-medium">
                      {count}
                      <span className="text-lg text-[#8B4513]/60 font-light">%</span>
                    </span>
                    <span className="font-mono text-[8px] text-[#6B5B48] tracking-[0.2em] uppercase mt-1">Loaded</span>
                  </div>

                  {/* Red Wax / Inked Stamp when approaching 100% */}
                  {count >= 90 && (
                    <motion.div
                      initial={{ scale: 2.2, opacity: 0, rotate: -24 }}
                      animate={{ scale: 1, opacity: 0.88, rotate: -10 }}
                      transition={{ type: "spring", damping: 14, stiffness: 220 }}
                      className="absolute z-20 border-2 border-[#9E2A2B] text-[#9E2A2B] px-3 py-1 font-mono text-[10px] tracking-[0.25em] uppercase font-bold shadow-sm"
                      style={{ mixBlendMode: "multiply" }}
                    >
                      UNSEALED
                    </motion.div>
                  )}
                </div>

                {/* Subtext info */}
                <div className="text-center flex flex-col items-center gap-2">
                  <p className="font-serif text-base sm:text-lg text-[#1C1108] tracking-wide">
                    Arunan Kavirajan
                  </p>
                  <p className="font-mono text-[9px] text-[#6B5B48] tracking-[0.28em] uppercase">
                    Opening Field Dossier · Ref 001-AK
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            /* DESKTOP (≥ 1024px): Existing Original Loading Screen (UNTOUCHED) */
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