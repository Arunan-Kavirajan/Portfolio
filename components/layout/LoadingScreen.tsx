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
          {/* ─── MOBILE: Wall prelude — the loading IS the reveal ─── */}
          {mounted && isMobile ? (
            <motion.div
              key="mobile-loading"
              className="fixed inset-0 z-[9998] overflow-hidden select-none"
              style={{ background: "#3D2B1F" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            >
              {/* Matching wall grain so dissolve is seamless */}
              <div className="absolute inset-0 opacity-20 mix-blend-overlay">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <filter id="load-wood">
                    <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="6" seed="5" />
                    <feColorMatrix type="saturate" values="0" />
                  </filter>
                  <rect width="100%" height="100%" filter="url(#load-wood)" />
                </svg>
              </div>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,12,6,0.6)_100%)]" />

              {/* Archival mark */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.5 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="font-mono text-[9px] tracking-[0.4em] text-[#D2BA94]/60 uppercase"
                >
                  Archive 001
                </motion.span>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.35 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="font-mono text-[7px] tracking-[0.3em] text-[#D2BA94]/40 uppercase"
                >
                  Cataloguing…
                </motion.span>
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