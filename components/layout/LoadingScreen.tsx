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
            /* ═══ MOBILE: "GUNSHOTS & TORN BREACH" CINEMATIC LOADING ═══ */
            <MobileGunshotLoading />
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
   MOBILE GUNSHOT & TORN BREACH COMPONENT
   Choreography:
   - 0ms - 320ms: Dark weathered barricade, silent atmosphere
   - 340ms: SHOT 1 (Top-Left) — Muzzle flash, screen recoil, bullet puncture
   - 740ms: SHOT 2 (Bottom-Right) — Muzzle flash, recoil, second puncture
   - 1140ms: SHOT 3 (Center) — Blinding flash, violent recoil, fracture connects
   - 1480ms - 2100ms: Barricade tears in half along the bullet seam and rips
     open into 3D space, revealing the bounty poster wall.
   ══════════════════════════════════════════════════════════════ */
function MobileGunshotLoading() {
  // Pre-generate particle bursts for each shot to ensure determinism and zero hydration mismatch
  // Added jump force (dy_up) and fall distance (dy_down) for gravity physics
  const createParticles = (length: number, spreadX: number, upForce: number) =>
    Array.from({ length }).map((_, i) => ({
      id: i,
      dx: (Math.random() - 0.5) * spreadX,
      dy_up: -Math.random() * upForce,
      dy_down: 100 + Math.random() * 200,
      scale: 0.5 + Math.random() * 0.7,
      isSpark: i % 2 === 0,
    }));

  const shot1Particles = useMemo(() => createParticles(10, 140, 80), []);
  const shot2Particles = useMemo(() => createParticles(10, 140, 80), []);
  const shot3Particles = useMemo(() => createParticles(15, 200, 120), []);

  // Flying wood splinters when the tear rips open
  const tearSplinters = useMemo(
    () =>
      Array.from({ length: 14 }).map((_, i) => ({
        id: i,
        x: 45 + Math.random() * 10,
        y: 20 + Math.random() * 60,
        dx: (Math.random() - 0.5) * 250,
        dy_up: -50 - Math.random() * 100,
        dy_down: 400 + Math.random() * 300,
        rot: (Math.random() - 0.5) * 720,
        width: 3 + Math.random() * 8,
        height: 10 + Math.random() * 25,
      })),
    []
  );

  // Ragged, brutal seam connecting bullet coordinates (Top-Left: 26%,28% -> Center: 50%,46% -> Bottom-Right: 72%,68%)
  const leftFlapClip =
    "polygon(0% 0%, 48% 0%, 53% 8%, 46% 15%, 54% 20%, 26% 28%, 34% 32%, 40% 36%, 36% 40%, 50% 46%, 60% 51%, 52% 57%, 62% 61%, 72% 68%, 65% 74%, 58% 78%, 54% 82%, 45% 90%, 52% 95%, 48% 100%, 0% 100%)";
  const rightFlapClip =
    "polygon(48% 0%, 100% 0%, 100% 100%, 48% 100%, 52% 95%, 45% 90%, 54% 82%, 58% 78%, 65% 74%, 72% 68%, 62% 61%, 52% 57%, 60% 51%, 50% 46%, 36% 40%, 40% 36%, 34% 32%, 26% 28%, 54% 20%, 46% 15%, 53% 8%)";

  return (
    <motion.div
      key="mobile-loading"
      // bg-transparent ensures it directly reveals the MobileHero poster already waiting underneath
      className="fixed inset-0 z-[9998] overflow-hidden select-none bg-transparent perspective-[1200px]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.1 }}
    >
      {/* ── Screen Recoil Wrapper (Shakes violently on each gunshot) ── */}
      <motion.div
        className="w-full h-full relative"
        animate={{
          x: [
            0,
            0, -12, 10, -6, 3, 0,
            0, 14, -12, 8, -4, 0,
            0, -22, 20, -15, 10, -5, 2, 0,
          ],
          y: [
            0,
            0, 8, -9, 5, -2, 0,
            0, -10, 11, -6, 3, 0,
            0, 16, -17, 12, -7, 3, 0,
          ],
        }}
        transition={{
          duration: 1.45,
          times: [
            0,
            0.22, 0.24, 0.26, 0.28, 0.3, 0.34,
            0.5, 0.52, 0.54, 0.56, 0.58, 0.62,
            0.78, 0.8, 0.82, 0.84, 0.86, 0.88, 0.92, 1,
          ],
          ease: "linear",
        }}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* ══════════════ LEFT FLAP ══════════════ */}
        <motion.div
          className="absolute inset-0 bg-[#241710] origin-top-left"
          style={{
            clipPath: leftFlapClip,
            transformStyle: "preserve-3d",
          }}
          animate={{
            // Flap physically falls down and rotates off the hinges
            x: ["0%", "-5%", "-15%"],
            y: ["0%", "30%", "120%"],
            rotateZ: [0, -15, -35],
            rotateX: [0, 20, 45],
            opacity: [1, 1, 0.8],
          }}
          transition={{
            duration: 0.65,
            delay: 1.48,
            ease: [0.5, 0, 0.7, 0.2], // Gravity acceleration ease
          }}
        >
          <BarricadeSurface idPrefix="left" />
        </motion.div>

        {/* ══════════════ RIGHT FLAP ══════════════ */}
        <motion.div
          className="absolute inset-0 bg-[#241710] origin-top-right"
          style={{
            clipPath: rightFlapClip,
            transformStyle: "preserve-3d",
          }}
          animate={{
            x: ["0%", "5%", "15%"],
            y: ["0%", "25%", "120%"],
            rotateZ: [0, 10, 28],
            rotateX: [0, 20, 45],
            opacity: [1, 1, 0.8],
          }}
          transition={{
            duration: 0.65,
            delay: 1.48,
            ease: [0.5, 0, 0.7, 0.2],
          }}
        >
          <BarricadeSurface idPrefix="right" />
        </motion.div>

        {/* ══════════════ THE CONNECTING FRACTURE CRACK ══════════════ */}
        <div className="absolute inset-0 pointer-events-none z-20">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <motion.path
              d="M 48,0 L 53,8 L 46,15 L 54,20 L 26,28 L 34,32 L 40,36 L 36,40 L 50,46 L 60,51 L 52,57 L 62,61 L 72,68 L 65,74 L 58,78 L 54,82 L 45,90 L 52,95 L 48,100"
              fill="none"
              stroke="#FFAA44"
              strokeWidth="1.5"
              className="blur-[2px]"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: [0, 1, 0] }}
              transition={{ delay: 1.14, duration: 0.35, ease: "easeOut" }}
            />
            <motion.path
              d="M 48,0 L 53,8 L 46,15 L 54,20 L 26,28 L 34,32 L 40,36 L 36,40 L 50,46 L 60,51 L 52,57 L 62,61 L 72,68 L 65,74 L 58,78 L 54,82 L 45,90 L 52,95 L 48,100"
              fill="none"
              stroke="#0A0503"
              strokeWidth="1.2"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ delay: 1.14, duration: 0.12, ease: "easeOut" }}
            />
            <motion.path
              d="M 26,28 L 18,34 M 50,46 L 40,54 M 50,46 L 62,42 M 72,68 L 82,62 M 72,68 L 78,76 M 40,36 L 32,32"
              fill="none"
              stroke="#0A0503"
              strokeWidth="0.8"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.8, 0] }}
              transition={{ delay: 1.16, duration: 0.32 }}
            />
          </svg>
        </div>

        {/* ══════════════ BULLET HOLES ══════════════ */}
        <BulletHole
          x="26%"
          y="28%"
          delay={0.34}
          rotation={-18}
          scale={0.95}
          particles={shot1Particles}
        />
        <BulletHole
          x="72%"
          y="68%"
          delay={0.74}
          rotation={32}
          scale={1.05}
          particles={shot2Particles}
        />
        <BulletHole
          x="50%"
          y="46%"
          delay={1.14}
          rotation={-8}
          scale={1.25}
          particles={shot3Particles}
          isHeavy
        />

        {/* ══════════════ FLYING SPLINTERS ON TEAR (GRAVITY ARC) ══════════════ */}
        <div className="absolute inset-0 pointer-events-none z-30">
          {tearSplinters.map((s) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, x: 0, y: 0, rotate: 0 }}
              animate={{
                opacity: [0, 1, 1, 0],
                x: [0, s.dx],
                y: [0, s.dy_up, s.dy_down], // Arc: jump up then fall down
                rotate: [0, s.rot],
              }}
              transition={{
                delay: 1.48,
                duration: 0.6,
                times: [0, 0.2, 0.8, 1],
                ease: "easeInOut",
              }}
              className="absolute bg-[#1B110A] border border-[#4A2D1A] rounded-sm"
              style={{
                left: `${s.x}%`,
                top: `${s.y}%`,
                width: `${s.width}px`,
                height: `${s.height}px`,
                boxShadow: "0 2px 5px rgba(0,0,0,0.7)",
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* ══════════════ MUZZLE FLASHES ══════════════ */}
      {/* Flash 1 (340ms) */}
      <motion.div
        className="absolute inset-0 bg-[#FFF2DE] mix-blend-screen pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.85, 0] }}
        transition={{ delay: 0.34, duration: 0.08, ease: "easeOut" }}
      />
      {/* Flash 2 (740ms) */}
      <motion.div
        className="absolute inset-0 bg-[#FFEED4] mix-blend-screen pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.88, 0] }}
        transition={{ delay: 0.74, duration: 0.08, ease: "easeOut" }}
      />
      {/* Flash 3 (1140ms - Blinding Critical Blast) */}
      <motion.div
        className="absolute inset-0 bg-white mix-blend-screen pointer-events-none z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.98, 0] }}
        transition={{ delay: 1.14, duration: 0.12, ease: "easeOut" }}
      />
    </motion.div>
  );
}

/* ──────────────────────────────────────────────────────────────
   TEXTURED BARRICADE SURFACE (rendered inside each flap)
   ────────────────────────────────────────────────────────────── */
function BarricadeSurface({ idPrefix }: { idPrefix: string }) {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none">
      {/* Dark heavy wood base */}
      <div className="absolute inset-0 bg-[#2A1B12]" />

      {/* Wood fiber texture */}
      <div className="absolute inset-0 opacity-[0.28] mix-blend-overlay">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`barricade-grain-${idPrefix}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.02 0.14" numOctaves="5" seed="8" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#barricade-grain-${idPrefix})`} />
        </svg>
      </div>

      {/* Heavy age vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_10%,rgba(10,5,3,0.95)_100%)]" />

      {/* Faint stencil mark on barricade */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-30">
        <span className="font-mono text-[9px] tracking-[0.55em] text-[#D2BA94] uppercase font-bold">
          ARCHIVE SECTOR 01
        </span>
        <span className="font-mono text-[7px] tracking-[0.35em] text-[#8C6D50] mt-1.5 uppercase">
          RESTRICTED DOSSIER
        </span>
      </div>

      {/* Surface distress line */}
      <div className="absolute top-[38%] left-0 w-full h-[1px] bg-white/10" />
      <div className="absolute top-[65%] left-0 w-full h-[1px] bg-black/40" />
    </div>
  );
}

/* ──────────────────────────────────────────────────────────────
   INDIVIDUAL BULLET HOLE COMPONENT
   ────────────────────────────────────────────────────────────── */
function BulletHole({
  x,
  y,
  delay,
  rotation,
  scale,
  particles,
  isHeavy = false,
}: {
  x: string;
  y: string;
  delay: number;
  rotation: number;
  scale: number;
  particles: Array<{
    id: number;
    dx: number;
    dy_up?: number;
    dy_down?: number;
    scale: number;
    isSpark: boolean;
  }>;
  isHeavy?: boolean;
}) {
  return (
    <>
      {/* 1. Scorched soot halo on the wood */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.35, 1], opacity: 0.95 }}
        transition={{ delay, duration: 0.18, ease: "easeOut" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full z-10"
        style={{
          left: x,
          top: y,
          width: isHeavy ? "110px" : "85px",
          height: isHeavy ? "110px" : "85px",
          background:
            "radial-gradient(circle, rgba(12,6,3,0.98) 0%, rgba(28,12,5,0.78) 32%, rgba(55,22,8,0.35) 55%, transparent 75%)",
        }}
      />

      {/* 2. Light beam shining through the puncture from behind */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: [0, 1.8, 1], opacity: [0, 1, 0.8] }}
        transition={{ delay, duration: 0.28, ease: "easeOut" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none rounded-full blur-[3px] z-10"
        style={{
          left: x,
          top: y,
          width: isHeavy ? "70px" : "50px",
          height: isHeavy ? "70px" : "50px",
          background:
            "radial-gradient(circle, rgba(255,230,170,0.95) 0%, rgba(255,160,50,0.55) 40%, transparent 70%)",
        }}
      />

      {/* 3. Physical jagged bullet puncture aperture */}
      <motion.div
        initial={{ scale: 0, rotate: rotation - 25 }}
        animate={{ scale, rotate: rotation }}
        transition={{ delay, type: "spring", stiffness: 500, damping: 14 }}
        className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
        style={{ left: x, top: y }}
      >
        <svg
          width={isHeavy ? "58" : "46"}
          height={isHeavy ? "58" : "46"}
          viewBox="0 0 48 48"
          className="overflow-visible"
        >
          {/* Scorched irregular rim */}
          <polygon
            points="24,8 29,17 38,13 33,21 42,25 32,30 37,39 27,33 23,41 20,32 10,36 15,26 7,22 17,18 13,11 22,15"
            fill="#0B0502"
            stroke="#261005"
            strokeWidth="1.6"
          />
          {/* Deep dark void center */}
          <polygon
            points="24,13 28,19 34,17 30,22 36,25 29,28 32,34 26,30 22,36 20,29 14,32 18,25 11,23 18,20 16,14 22,17"
            fill="#030101"
          />
          {/* Wood splinter highlights catching light */}
          <line x1="24" y1="8" x2="22" y2="17" stroke="rgba(240,220,180,0.65)" strokeWidth="1.2" />
          <line x1="38" y1="13" x2="31" y2="21" stroke="rgba(240,220,180,0.5)" strokeWidth="0.9" />
          <line x1="37" y1="39" x2="28" y2="31" stroke="rgba(240,220,180,0.6)" strokeWidth="1.1" />
          <line x1="10" y1="36" x2="18" y2="27" stroke="rgba(240,220,180,0.5)" strokeWidth="0.9" />

          {/* Radiating stress cracks */}
          <path
            d="M24,8 L25,0 M38,13 L47,8 M42,25 L52,27 M37,39 L45,48 M23,41 L22,50 M10,36 L2,42 M7,22 L-2,21 M13,11 L6,3"
            stroke="rgba(22,9,3,0.85)"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </motion.div>

      {/* 4. Burst of sparks and wood particles (Gravity Arc) */}
      <div className="absolute pointer-events-none z-30" style={{ left: x, top: y }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, opacity: 1, scale: p.scale }}
            animate={{ 
              x: p.dx, 
              y: [0, p.dy_up || -20, p.dy_down || 100], 
              opacity: [1, 1, 0], 
              scale: [p.scale, p.scale, 0] 
            }}
            transition={{ delay, duration: 0.5, times: [0, 0.3, 1], ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: p.isSpark ? "3px" : "4.5px",
              height: p.isSpark ? "3px" : "3px",
              background: p.isSpark ? "#FFAA33" : "#3B2010",
              boxShadow: p.isSpark ? "0 0 6px #FF8800" : "none",
            }}
          />
        ))}
      </div>
    </>
  );
}