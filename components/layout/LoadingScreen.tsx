"use client";

import { useState, useEffect, useMemo } from "react";
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

  /* ── While device type is undetermined on initial mount,
       render a neutral dark canvas matching both themes to prevent any desktop flash ── */
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
            /* ═══ MOBILE: "THE ARCHIVE" CINEMATIC LOADING ═══ */
            <MobileCinematicLoading />
          ) : (
            /* ═══ DESKTOP: Original Loading Screen (STRICTLY UNTOUCHED) ═══ */
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

/* ══════════════════════════════════════════════════════════════
   MOBILE CINEMATIC LOADING
   A grounded, highly realistic archive room aesthetic.
   Relies purely on lighting, photographic grain, deep shadow, 
   and stark typography instead of cartoonish physics/SVGs.
   ══════════════════════════════════════════════════════════════ */
function MobileCinematicLoading() {
  // Generate realistic dust motes that float in the light beam, including out-of-focus lens dust
  const dustMotes = useMemo(
    () =>
      Array.from({ length: 30 }).map((_, i) => {
        const isForeground = i % 5 === 0; // 1 in 5 dust motes are huge and blurred (hitting lens)
        return {
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: isForeground ? 3 + Math.random() * 5 : 0.5 + Math.random() * 2,
          blur: isForeground ? 2 + Math.random() * 3 : 0.5,
          duration: isForeground ? 5 + Math.random() * 3 : 3 + Math.random() * 4,
          delay: Math.random() * 2,
        };
      }),
    []
  );

  return (
    <motion.div
      key="mobile-loading"
      className="fixed inset-0 z-[9998] overflow-hidden select-none bg-[#050302]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
    >
      {/* ── Heavy Film Grain (Photographic Realism) ── */}
      <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none z-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="cinematic-grain">
            <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#cinematic-grain)" />
        </svg>
      </div>

      {/* ── Faulty Archive Light (Harsh, flickering warm spotlight) ── */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-10 mix-blend-screen"
        animate={{
          opacity: [0, 0, 0.8, 0.2, 0.9, 1, 0.95, 1, 0.3, 0.8, 0],
        }}
        transition={{
          duration: 2.1, // Matches LoadingProvider duration exactly
          times: [0, 0.2, 0.22, 0.25, 0.3, 0.4, 0.6, 0.8, 0.85, 0.9, 1],
          ease: "linear",
        }}
        style={{
          background: "radial-gradient(circle 350px at 50% 45%, rgba(255, 190, 120, 0.25), rgba(40, 20, 10, 0.1) 60%, transparent 100%)",
        }}
      />

      {/* ── Film Scratches (Vintage Projector Damage) ── */}
      <div className="absolute inset-0 z-40 pointer-events-none overflow-hidden mix-blend-screen opacity-30">
        <motion.div 
          className="absolute top-0 bottom-0 w-[1px] bg-white"
          animate={{ x: ["10%", "15%", "15%", "85%", "85%", "30%"], opacity: [0, 0.6, 0, 0.5, 0, 0.3] }}
          transition={{ duration: 2.1, times: [0, 0.1, 0.15, 0.6, 0.65, 0.9], ease: "linear" }}
        />
        <motion.div 
          className="absolute top-0 bottom-0 w-[2px] bg-[#FFDDAA]"
          animate={{ x: ["70%", "72%", "72%", "25%", "25%", "60%"], opacity: [0, 0, 0.4, 0, 0.5, 0] }}
          transition={{ duration: 2.1, times: [0, 0.3, 0.35, 0.4, 0.8, 0.85], ease: "linear" }}
        />
      </div>

      {/* ── Floating Dust Motes (Only visible in the light) ── */}
      <div className="absolute inset-0 z-20 pointer-events-none mix-blend-screen opacity-70">
        {dustMotes.map((mote) => (
          <motion.div
            key={mote.id}
            className="absolute rounded-full bg-[#FFEEDD]"
            style={{
              left: `${mote.x}%`,
              top: `${mote.y}%`,
              width: `${mote.size}px`,
              height: `${mote.size}px`,
              filter: `blur(${mote.blur}px)`,
            }}
            animate={{
              y: [0, -30 - Math.random() * 20],
              x: [0, (Math.random() - 0.5) * 15],
              opacity: [0, 0.8, 0],
            }}
            transition={{
              duration: mote.duration,
              delay: mote.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Cinematic Typography / Dossier Mark ── */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30 pointer-events-none">
        <motion.div
          animate={{
            opacity: [0, 0, 0.7, 0.1, 0.9, 0.9, 0],
            filter: ["blur(4px)", "blur(4px)", "blur(0px)", "blur(1px)", "blur(0px)", "blur(0px)", "blur(4px)"],
            scale: [0.95, 0.95, 1, 1, 1, 1.02, 1.05],
          }}
          transition={{
            duration: 2.1,
            times: [0, 0.2, 0.22, 0.25, 0.3, 0.85, 1],
            ease: "linear",
          }}
          className="flex flex-col items-center"
        >
          {/* Faint Redacted Bar */}
          <div className="w-12 h-[2px] bg-[#8A3A20] mb-4 opacity-70" />
          
          <h2 className="font-serif text-[11px] tracking-[0.4em] text-[#E5D3B3] uppercase mb-1 drop-shadow-[0_0_12px_rgba(255,200,140,0.5)] font-bold"
              style={{ textShadow: "1px 0px 1px rgba(255,0,0,0.6), -1px 0px 1px rgba(0,200,255,0.6)" }}>
            BOUNTY POSTED
          </h2>
          <p className="font-serif text-[9px] tracking-[0.25em] text-[#9E8A70] uppercase"
             style={{ textShadow: "0.5px 0px 0.5px rgba(255,0,0,0.4), -0.5px 0px 0.5px rgba(0,200,255,0.4)" }}>
            ARUNAN KAVIRAJAN
          </p>
          
          <div className="w-12 h-[2px] bg-[#8A3A20] mt-4 opacity-70" />
        </motion.div>
      </div>

      {/* ── Deep Shadow Vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,#030201_100%)] z-40 pointer-events-none" />
    </motion.div>
  );
}