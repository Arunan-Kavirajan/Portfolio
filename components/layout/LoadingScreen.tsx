"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen({
  show,
  count,
}: {
  show: boolean;
  count: number;
}) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    setIsMobile(window.innerWidth < 1024);
  }, []);

  /* ── While we don't know which device yet, show a neutral
       dark screen that matches BOTH themes so nothing flashes ── */
  if (isMobile === null) {
    return show ? (
      <div className="fixed inset-0 z-[9998] bg-[#10151C]" />
    ) : null;
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {isMobile ? (
            /* ═══ MOBILE: Wanted Poster loading — old telegraph / case file ═══ */
            <motion.div
              key="mobile-loading"
              className="fixed inset-0 z-[9998] overflow-hidden select-none"
              style={{ background: "#1e130c" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {/* Dark warm base */}
              <div className="absolute inset-0 bg-[#3D2B1F]" />

              {/* Wood grain */}
              <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <filter id="load-wood">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="6" seed="5" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#load-wood)" />
                </svg>
              </div>

              {/* Heavy vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(10,6,3,0.95)_100%)] pointer-events-none" />

              {/* Flickering warm glow — like a lantern in a dark room */}
              <motion.div
                className="absolute inset-0 pointer-events-none"
                animate={{ opacity: [0.3, 0.5, 0.35, 0.55, 0.4, 0.48] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full bg-[radial-gradient(circle_400px_at_50%_45%,rgba(255,180,100,0.08),transparent)]" />
              </motion.div>

              {/* Center content — old archive stamp */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                {/* Circular seal outline that draws itself */}
                <div className="relative w-24 h-24">
                  <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    {/* Outer ring draws */}
                    <motion.circle
                      cx="50" cy="50" r="44"
                      fill="none"
                      stroke="rgba(210,186,148,0.3)"
                      strokeWidth="1.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.4, ease: "easeInOut" }}
                    />
                    {/* Inner ring draws faster */}
                    <motion.circle
                      cx="50" cy="50" r="36"
                      fill="none"
                      stroke="rgba(210,186,148,0.2)"
                      strokeWidth="0.8"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.0, delay: 0.3, ease: "easeInOut" }}
                    />
                    {/* Cross / registration mark */}
                    <motion.line
                      x1="50" y1="30" x2="50" y2="70"
                      stroke="rgba(210,186,148,0.15)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.6 }}
                    />
                    <motion.line
                      x1="30" y1="50" x2="70" y2="50"
                      stroke="rgba(210,186,148,0.15)"
                      strokeWidth="0.5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.5, delay: 0.7 }}
                    />
                  </svg>

                  {/* Pulsing dot center */}
                  <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#D2BA94]/40"
                    animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  />
                </div>

                {/* Text that types in */}
                <div className="flex flex-col items-center gap-2">
                  <motion.div
                    className="overflow-hidden"
                    initial={{ width: 0 }}
                    animate={{ width: "auto" }}
                    transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  >
                    <span className="font-mono text-[8px] tracking-[0.5em] text-[#D2BA94]/40 uppercase whitespace-nowrap block">
                      Case File No. 001
                    </span>
                  </motion.div>

                  {/* Blinking cursor */}
                  <motion.div
                    className="w-2 h-[1px] bg-[#D2BA94]/30"
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                  />
                </div>
              </div>

              {/* Subtle grain over everything */}
              <div className="absolute inset-0 pointer-events-none opacity-[0.12] mix-blend-overlay">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <filter id="load-grain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="3" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#load-grain)" />
                </svg>
              </div>
            </motion.div>
          ) : (
            /* ═══ DESKTOP: Original Loading Screen (UNTOUCHED) ═══ */
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