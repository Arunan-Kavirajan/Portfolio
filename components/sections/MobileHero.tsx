"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────
   COMPACT HOME HERO — mobile + tablet photographic archive
   ───────────────────────────────────────────────────────── */

function PhotoLayer({ scrollYProgress }: { scrollYProgress: any }) {
  // Drive each filter component independently via useTransform → number
  const brightness = useTransform(scrollYProgress, [0, 0.25, 0.55], [0.08, 0.4, 1]);
  const contrast = useTransform(scrollYProgress, [0, 0.3, 0.55], [0.3, 0.7, 1]);
  const blur = useTransform(scrollYProgress, [0, 0.35, 0.55], [12, 4, 0]);
  const grayscale = useTransform(scrollYProgress, [0, 0.4, 0.6], [1, 0.6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.08], [0.3, 1]);

  // Compose a single CSS filter string from the 4 values
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

  /* ── Photographic "fault" — slight mis-registration of a shadow layer ── */
  const faultX = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 3, 2]);
  const faultY = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, -2, -1.5]);
  const faultOpacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 0.35, 0.2]);

  /* ── Film grain overlay opacity ── */
  const grainOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [0.6, 0.35, 0.15]);

  /* ── Archival metadata ── */
  const metaOpacity = useTransform(scrollYProgress, [0, 0.1, 0.8, 0.9], [0.5, 0.7, 0.7, 0]);

  /* ── Name typography reveal ── */
  const nameOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const nameY = useTransform(scrollYProgress, [0.3, 0.5], [30, 0]);

  /* ── Disciplines reveal ── */
  const discOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const discY = useTransform(scrollYProgress, [0.5, 0.65], [20, 0]);

  /* ── Final statement reveal ── */
  const stmtOpacity = useTransform(scrollYProgress, [0.65, 0.8], [0, 1]);
  const stmtY = useTransform(scrollYProgress, [0.65, 0.8], [20, 0]);

  /* ── Overall section exit ── */
  const sectionOpacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="h-[500vh] relative bg-[#0A0A08]"
    >
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden">
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
                  baseFrequency="0.75"
                  numOctaves="4"
                  stitchTiles="stitch"
                />
                <feColorMatrix type="saturate" values="0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#grain)" opacity="0.5" />
            </svg>
          </motion.div>

          {/* ═══ PHOTOGRAPH CONTAINER ═══ */}
          <div className="absolute inset-0 flex items-center justify-center z-10">
            {/* Mis-registered shadow layer (the "fault") */}
            <motion.div
              className="absolute w-[70vw] max-w-[380px] sm:w-[55vw] sm:max-w-[420px] md:w-[45vw] md:max-w-[480px] aspect-[3/4] rounded-sm overflow-hidden"
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
                style={{ filter: "contrast(2) brightness(0.2)" }}
                priority
                aria-hidden="true"
              />
            </motion.div>

            {/* Primary photograph */}
            <div
              className="relative w-[70vw] max-w-[380px] sm:w-[55vw] sm:max-w-[420px] md:w-[45vw] md:max-w-[480px] aspect-[3/4] rounded-sm overflow-hidden shadow-2xl"
            >
              <PhotoLayer scrollYProgress={scrollYProgress} />

              {/* Vignette */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(10,10,8,0.7)_100%)] z-10" />

              {/* Edge darkening for film feel */}
              <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(10,10,8,0.6)] z-10" />
            </div>
          </div>

          {/* ═══ ARCHIVAL METADATA ═══ */}
          <motion.div
            className="absolute top-[env(safe-area-inset-top,0px)] pt-20 px-6 w-full flex justify-between items-start z-30 pointer-events-none"
            style={{ opacity: metaOpacity }}
          >
            <div className="flex flex-col gap-1">
              <span className="font-mono text-[9px] tracking-[0.35em] text-[#8A8070] uppercase">
                01 / Archive
              </span>
              <span className="font-mono text-[8px] tracking-[0.25em] text-[#8A8070]/60 uppercase">
                Subject 001
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.25em] text-[#8A8070]/60">
              2026
            </span>
          </motion.div>

          {/* Bottom-left archival tag */}
          <motion.div
            className="absolute bottom-6 left-6 z-30 pointer-events-none"
            style={{ opacity: metaOpacity }}
          >
            <span className="font-mono text-[8px] tracking-[0.3em] text-[#8A8070]/50 uppercase">
              Software / Security / AI
            </span>
          </motion.div>

          {/* ═══ NAME TYPOGRAPHY ═══ */}
          <motion.div
            className="absolute bottom-[28%] sm:bottom-[30%] md:bottom-[32%] w-full px-6 z-30 pointer-events-none"
            style={{ opacity: nameOpacity, y: nameY }}
          >
            <h1 className="font-serif text-[13vw] sm:text-[10vw] md:text-[8vw] leading-[0.85] tracking-tight text-[#E8E0D4]">
              <span className="block">ARUNAN</span>
              <span className="block text-[#E8E0D4]/70 mt-1">KAVIRAJAN</span>
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
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.2em] text-[#8A8070] uppercase"
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
            <p className="font-serif text-lg sm:text-xl md:text-2xl text-[#E8E0D4]/80 leading-relaxed italic max-w-sm">
              I build software.
              <br />
              <span className="text-[#E8E0D4]/50">I study how it breaks.</span>
            </p>
          </motion.div>

          {/* ═══ THIN FRAME BORDER ═══ */}
          <div className="absolute inset-4 sm:inset-6 border border-[#8A8070]/10 rounded-sm z-20 pointer-events-none" />
        </motion.div>
      </div>
    </section>
  );
}
