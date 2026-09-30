"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   COMPACT HOME HERO — mobile + tablet photographic archive
   ───────────────────────────────────────────────────────── */

function PhotoLayer({ scrollYProgress }: { scrollYProgress: any }) {
  const brightness = useTransform(scrollYProgress, [0, 0.3, 0.6], [0.1, 0.5, 1]);
  const contrast = useTransform(scrollYProgress, [0, 0.35, 0.6], [0.4, 0.75, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.4, 0.6], [10, 3, 0]);
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 0.7], [1, 0.5, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.4, 1]);

  const filterStr = useTransform(
    [brightness, contrast, blur, grayscale] as any,
    ([b, c, bl, g]: number[]) =>
      `brightness(${b}) contrast(${c}) blur(${bl}px) grayscale(${g})`
  );

  return (
    <motion.div
      className="absolute inset-0"
      style={{ filter: filterStr, opacity }}
    >
      <Image
        src="/profile_new.jpg"
        alt="Arunan Kavirajan"
        fill
        className="object-cover object-top"
        priority
        sizes="(max-width: 640px) 70vw, (max-width: 1024px) 55vw, 45vw"
      />
    </motion.div>
  );
}

export default function CompactHomeHero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* ── Photographic "fault" — slight mis-registration ── */
  const faultX = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 3, 2]);
  const faultY = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, -2, -1.5]);
  const faultOpacity = useTransform(scrollYProgress, [0.5, 0.6, 0.7], [0, 0.3, 0.18]);

  /* ── Film grain ── */
  const grainOpacity = useTransform(scrollYProgress, [0, 0.3, 0.8], [0.5, 0.25, 0.1]);

  /* ── Archival metadata ── */
  const metaOpacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 0.95], [0.6, 0.8, 0.8, 0]);

  /* ── Name typography ── */
  const nameOpacity = useTransform(scrollYProgress, [0.35, 0.55], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.35, 0.55], [25, 0]);

  /* ── Disciplines ── */
  const discOpacity = useTransform(scrollYProgress, [0.55, 0.7], [0, 1]);
  const discY = useTransform(scrollYProgress, [0.55, 0.7], [15, 0]);

  /* ── Statement ── */
  const stmtOpacity = useTransform(scrollYProgress, [0.7, 0.85], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.7, 0.85], [15, 0]);

  /* ── Section exit ── */
  const sectionOpacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  /* ── Scroll indicator fade ── */
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="h-[250vh] relative bg-[#0A0A08]"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden will-change-transform">
        <motion.div
          className="absolute inset-0 flex flex-col"
          style={{ opacity: sectionOpacity }}
        >
          {/* ═══ FILM GRAIN OVERLAY ═══ */}
          <motion.div
            className="absolute inset-0 z-40 pointer-events-none mix-blend-overlay"
            style={{ opacity: grainOpacity }}
          >
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <filter id="grain">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency="0.65"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grain)" opacity="0.4" />
            </svg>
          </motion.div>

          {/* ═══ PHOTOGRAPH CONTAINER ═══ */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Mis-registered shadow layer (the "fault") */}
            <motion.div
              className="absolute w-[72vw] max-w-[400px] sm:w-[58vw] sm:max-w-[440px] md:w-[48vw] md:max-w-[500px] aspect-[3/4] rounded-sm overflow-hidden"
              style={{
                x: faultX,
                y: faultY,
                opacity: faultOpacity,
              }}
            >
              <Image
                src="/profile_new.jpg"
                alt=""
                fill
                className="object-cover object-top"
                style={{ filter: "contrast(2) brightness(0.15)" }}
                priority
                aria-hidden="true"
              />
            </motion.div>

            {/* Primary photograph */}
            <div className="relative w-[72vw] max-w-[400px] sm:w-[58vw] sm:max-w-[440px] md:w-[48vw] md:max-w-[500px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl">
              <PhotoLayer scrollYProgress={scrollYProgress} />

              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,8,0.65)_100%)] z-10" />

              {/* Edge darkening */}
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(10,10,8,0.5)] z-10" />
            </div>
          </div>

          {/* ═══ ARCHIVAL METADATA ═══ */}
          <motion.div
            className="absolute top-0 pt-20 px-6 w-full flex justify-between items-start z-30 pointer-events-none"
            style={{ opacity: metaOpacity }}
          >
            <div className="flex flex-col gap-1.5">
              <span className="font-mono text-[10px] tracking-[0.35em] text-[#36D9E6] uppercase">
                01 / Archive
              </span>
              <span className="font-mono text-[9px] tracking-[0.25em] text-[#69737D] uppercase">
                Subject 001
              </span>
            </div>
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#69737D]">
              2026
            </span>
          </motion.div>

          {/* Bottom-left archival tag */}
          <motion.div
            className="absolute bottom-6 left-6 z-30 pointer-events-none"
            style={{ opacity: metaOpacity }}
          >
            <span className="font-mono text-[9px] tracking-[0.3em] text-[#69737D]/70 uppercase">
              Software / Security / AI
            </span>
          </motion.div>

          {/* ═══ NAME TYPOGRAPHY ═══ */}
          <motion.div
            className="absolute bottom-[28%] sm:bottom-[30%] md:bottom-[32%] w-full px-6 z-30 pointer-events-none"
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <h1 className="font-serif text-[14vw] sm:text-[11vw] md:text-[9vw] leading-[0.85] tracking-tight text-[#E8EDF2]">
              <span className="block">ARUNAN</span>
              <span className="block text-[#E8EDF2]/60 mt-1">KAVIRAJAN</span>
            </h1>
          </motion.div>

          {/* ═══ DISCIPLINES ═══ */}
          <motion.div
            className="absolute bottom-[16%] sm:bottom-[18%] md:bottom-[20%] w-full px-6 z-30 pointer-events-none"
            style={{ opacity: discOpacity, y: discY }}
          >
            <div className="flex gap-4 sm:gap-6 flex-wrap">
              {["Software", "Cybersecurity", "AI / ML"].map((d) => (
                <span
                  key={d}
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#36D9E6] uppercase"
                >
                  {d}
                </span>
              ))}
            </div>
          </motion.div>

          {/* ═══ STATEMENT ═══ */}
          <motion.div
            className="absolute bottom-[6%] sm:bottom-[8%] md:bottom-[10%] w-full px-6 z-30 pointer-events-none"
            style={{ opacity: stmtOpacity, y: stmtY }}
          >
            <p className="font-serif text-xl sm:text-2xl md:text-3xl text-[#E8EDF2]/90 leading-relaxed max-w-sm">
              I build software.
              <br />
              <span className="italic text-[#E8EDF2]/50">I study how it breaks.</span>
            </p>
          </motion.div>

          {/* ═══ BREATHING FRAME BORDER ═══ */}
          <div className="absolute inset-4 sm:inset-6 border border-[#36D9E6]/[0.08] rounded-sm z-20 pointer-events-none animate-[breathe_4s_ease-in-out_infinite]" />

          {/* ═══ SCROLL INDICATOR ═══ */}
          <motion.div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-none flex flex-col items-center gap-2"
            style={{ opacity: scrollHintOpacity }}
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#69737D] uppercase">Scroll</span>
            <svg
              className="w-4 h-4 text-[#36D9E6] animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </motion.div>
        </motion.div>
      </div>

      {/* Keyframe for breathing border */}
      <style jsx>{`
        @keyframes breathe {
          0%, 100% { opacity: 0.08; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}
