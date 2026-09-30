"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════
   COMPACT HOMEPAGE — A Personal Field Journal
   Mobile + Tablet (< 1024px)

   PALETTE — Vintage Bounty Poster
   ─────────────────────────────────
   Parchment bg:   #F0E2C8
   Dark ink:       #1C1108
   Medium ink:     #4A3828
   Faded ink:      #6B5B48
   Dusty:          #9C8B78
   Accent (rust):  #8B4513
   Border:         #8B4513 at low opacity
   Hero bg:        #F0E2C8 (Parchment matching)
   ═══════════════════════════════════════════════════════════ */

/* ── Shared chapter label ── */
function ChapterMark({ number, title }: { number: string; title: string }) {
  return (
    <div className="flex items-center gap-4 mb-16 md:mb-24">
      <span className="font-mono text-[10px] tracking-[0.3em] text-[#8B4513]/70">{number}</span>
      <div className="h-[1px] w-8 bg-[#8B4513]/25" />
      <span className="font-mono text-[10px] tracking-[0.3em] text-[#8B4513]/50 uppercase">{title}</span>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   01 — THE COVER
   Cinematic, physical vintage bounty poster.
   ────────────────────────────────────────────────────────── */
function TheCover() {
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  const dustParticles = useMemo(() => {
    return Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.2 + Math.random() * 0.8,
      duration: 15 + Math.random() * 15,
      delay: Math.random() * 5,
    }));
  }, []);

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const currentTarget = e.currentTarget as HTMLElement;
    const { width, height, left, top } = currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width;
    const y = (clientY - top) / height;
    setMousePos({ x, y });
  };

  const xOffset = (mousePos.x - 0.5) * 20;
  const yOffset = (mousePos.y - 0.5) * 20;

  return (
    <section 
      className="relative h-[100dvh] w-full bg-[#1e130c] overflow-hidden flex items-center justify-center pt-[3vh] pb-[3vh] perspective-[1000px] select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* ── Wall Background ── */}
      <div className="absolute inset-0 bg-[#3D2B1F]">
        <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="cinematic-wood">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="6" seed="5" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#cinematic-wood)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,rgba(20,12,6,0.85)_100%)] pointer-events-none" />
        
        <motion.div 
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          animate={{
            background: `radial-gradient(circle 600px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,200,150,0.15), transparent)`
          }}
          transition={{ type: "spring", stiffness: 40, damping: 20 }}
        />
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {dustParticles.map((dust) => (
            <motion.div
              key={dust.id}
              className="absolute w-1 h-1 bg-[#D2BA94] rounded-full blur-[1px] opacity-0 mix-blend-screen"
              style={{ left: `${dust.x}%`, top: `${dust.y}%`, scale: dust.scale }}
              animate={{
                y: [0, -100],
                x: [0, Math.sin(dust.id) * 30],
                opacity: [0, 0.4, 0],
              }}
              transition={{
                duration: dust.duration,
                delay: dust.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>
      </div>

      {/* ── Nail (Impact at 0.25s) ── */}
      <motion.div
        initial={{ scale: 0, y: -20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 400, damping: 12 }}
        className="absolute top-[6vh] sm:top-[8vh] z-50 pointer-events-none"
      >
        <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1a110a] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.6)] border-[1.5px] border-[#36271c]">
           <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-[#8c7462] rounded-full opacity-60 blur-[0.5px]" />
           <motion.div 
             className="absolute -bottom-2 -right-2 w-4 h-4 bg-black/50 blur-[2px] rounded-full -z-10"
             animate={{ x: -xOffset * 0.15, y: -yOffset * 0.15 }}
           />
        </div>
      </motion.div>

      {/* ── The Poster Object (Drops at 0.45s) ── */}
      <motion.div
        initial={{ y: "-100vh", rotateZ: 4, rotateX: 25, opacity: 0 }}
        animate={{ y: 0, rotateZ: 1.2, rotateX: 0, opacity: 1 }}
        transition={{ delay: 0.45, type: "spring", stiffness: 70, damping: 14, mass: 1.2 }}
        className="relative w-[88vw] max-w-[380px] sm:max-w-[420px] h-[85vh] sm:h-[88vh] z-20"
        style={{
          filter: "drop-shadow(15px 25px 35px rgba(0,0,0,0.65)) drop-shadow(0px 8px 12px rgba(0,0,0,0.5))",
        }}
      >
        <motion.div 
          className="w-full h-full relative"
          animate={{
            rotateX: -yOffset * 0.35,
            rotateY: xOffset * 0.35,
          }}
          transition={{ type: "spring", stiffness: 80, damping: 25 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Irregular Paper */}
          <div 
            className="absolute inset-0 bg-[#F0E2C8]"
            style={{
              clipPath: "polygon(1% 0%, 98% 1%, 100% 98%, 97% 100%, 2% 99%, 0% 2%)",
              boxShadow: "inset 0 0 50px rgba(139,69,19,0.18)",
            }}
          >
            {/* Paper Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.35] mix-blend-multiply">
              <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <filter id="paper-texture">
                  <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
                  <feColorMatrix type="saturate" values="0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paper-texture)" />
              </svg>
            </div>
            
            <div className="absolute inset-0 shadow-[inset_0_0_90px_rgba(61,43,31,0.25)] pointer-events-none" />
            
            {/* Creases */}
            <div className="absolute top-0 right-10 w-[150%] h-[2px] -rotate-12 pointer-events-none flex flex-col opacity-70">
               <div className="w-full h-[1px] bg-white/40" />
               <div className="w-full h-[1px] bg-[#3D2B1F]/15" />
            </div>
            <div className="absolute top-[48%] left-0 w-full h-[3px] pointer-events-none flex flex-col opacity-50">
               <div className="w-full h-[1.5px] bg-[#3D2B1F]/15" />
               <div className="w-full h-[1.5px] bg-white/30" />
            </div>
            
            {/* Burn marks */}
            <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-[radial-gradient(circle,rgba(61,43,31,0.4)_0%,transparent_70%)] mix-blend-multiply blur-[2px] pointer-events-none" />
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-[radial-gradient(circle,rgba(139,69,19,0.15)_0%,transparent_70%)] mix-blend-multiply blur-[1px] pointer-events-none" />

            {/* Nail stress tear */}
            <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-8 h-10 bg-[radial-gradient(ellipse,rgba(61,43,31,0.15)_0%,transparent_70%)] mix-blend-multiply pointer-events-none" />

            {/* ── Poster Content ── */}
            <div className="relative w-full h-full p-4 sm:p-5 flex flex-col z-10">
              
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                className="absolute inset-[14px] sm:inset-[18px] border-[1.5px] border-[#3D2B1F]/60 pointer-events-none"
                style={{ clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" }}
              />
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.95, duration: 0.5 }}
                className="absolute inset-[18px] sm:inset-[22px] border-[0.5px] border-[#3D2B1F]/40 pointer-events-none"
              />

              {/* Header (1.15s) */}
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.15, duration: 0.4 }}
                className="mt-3 text-center"
              >
                <p className="font-mono text-[6.5px] sm:text-[7.5px] tracking-[0.45em] text-[#4A3828] uppercase font-bold opacity-85">
                  THE COUNTY ARCHIVE
                </p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="text-[#8B4513]/50 text-[5px]">❖</span>
                  <p className="font-serif text-[7.5px] sm:text-[8.5px] tracking-[0.25em] text-[#6B5B48] italic">
                    Case No. 001
                  </p>
                  <span className="text-[#8B4513]/50 text-[5px]">❖</span>
                </div>
              </motion.div>

              {/* WANTED (1.30s) */}
              <motion.div
                initial={{ opacity: 0, scale: 1.15 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.30, type: "spring", stiffness: 250, damping: 18 }}
                className="mt-4 sm:mt-5 text-center relative"
              >
                <h2 
                  className="font-serif text-[17vw] sm:text-[72px] leading-[0.8] tracking-[0.03em] text-[#1a110a] font-black uppercase"
                  style={{ 
                    WebkitTextStroke: "1px rgba(61,43,31,0.6)",
                    textShadow: "1px 2px 1px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.3)"
                  }}
                >
                  WANTED
                </h2>
              </motion.div>

              {/* Subtitle (1.55s) */}
              <motion.div
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 1.55, duration: 0.4 }}
                className="flex items-center justify-center gap-2 mt-3 mb-2"
              >
                <div className="h-[1.5px] w-8 sm:w-10 bg-[#4A3828]/60 rounded-[50%]" />
                <p className="font-serif text-[8.5px] sm:text-[10px] tracking-[0.3em] text-[#3D2B1F] italic font-bold">
                  DEAD CODE OR ALIVE
                </p>
                <div className="h-[1.5px] w-8 sm:w-10 bg-[#4A3828]/60 rounded-[50%]" />
              </motion.div>

              {/* Portrait (1.75s plate, 2.00s develop) */}
              <div className="flex-1 w-full relative flex justify-center items-center mt-2 mb-3 px-6">
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.75, duration: 0.3 }}
                  className="relative w-full max-w-[210px] sm:max-w-[240px] aspect-[4/5] bg-[#D2BA94] border-[2px] border-[#3D2B1F]/70 overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.3)]"
                  style={{ clipPath: "polygon(1.5% 1%, 98.5% 0%, 100% 99%, 0% 100%)" }}
                >
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(8px) contrast(200%) grayscale(100%) brightness(2)" }}
                    animate={{ opacity: 0.85, filter: "blur(0px) contrast(115%) grayscale(55%) brightness(0.95)" }}
                    transition={{ delay: 2.00, duration: 2.5, ease: "easeOut" }}
                    className="absolute inset-0 mix-blend-multiply"
                  >
                    <Image
                      src="/profile_new.jpg"
                      alt="Arunan Kavirajan"
                      fill
                      className="object-cover object-top"
                      style={{ filter: "sepia(50%) saturate(0.85) hue-rotate(-5deg)" }}
                      priority
                      sizes="(max-width: 640px) 70vw, 240px"
                    />
                  </motion.div>
                  
                  <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(42,28,18,0.7)] pointer-events-none mix-blend-multiply" />
                  
                  {/* Photo scratches */}
                  <div className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                      <filter id="photo-scratch"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.05" numOctaves="2" /></filter>
                      <rect width="100%" height="100%" filter="url(#photo-scratch)" />
                    </svg>
                  </div>
                </motion.div>

                {/* Wax Seal (2.35s) */}
                <motion.div
                  initial={{ scale: 3.5, opacity: 0, rotate: -45 }}
                  animate={{ scale: 1, opacity: 1, rotate: -15 }}
                  transition={{ delay: 2.35, type: "spring", stiffness: 280, damping: 16, mass: 1.2 }}
                  className="absolute bottom-1 sm:bottom-0 right-4 sm:right-6 z-30"
                  style={{ filter: "drop-shadow(3px 5px 8px rgba(0,0,0,0.45))" }}
                >
                  <div 
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center relative"
                    style={{ 
                      background: "radial-gradient(circle at 35% 30%, #BA2A1A 0%, #871408 55%, #4F0902 100%)",
                      boxShadow: "inset -2px -2px 6px rgba(0,0,0,0.6), inset 2px 2px 8px rgba(255,255,255,0.25)",
                      clipPath: "polygon(8% 12%, 24% 4%, 47% 1%, 74% 6%, 93% 22%, 98% 46%, 96% 75%, 83% 92%, 58% 99%, 31% 96%, 10% 82%, 1% 54%)"
                    }}
                  >
                    <span className="font-serif text-2xl sm:text-3xl font-bold text-[#F0E2C8]/85 drop-shadow-md mix-blend-overlay">AK</span>
                  </div>
                  <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-3.5 h-6 bg-[#871408] rounded-full blur-[0.5px]"
                       style={{ background: "linear-gradient(to bottom, #871408, #4F0902)" }} />
                </motion.div>
              </div>

              {/* Name (2.60s) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.60, duration: 0.3 }}
                className="flex flex-col items-center leading-[0.8] mb-3 relative"
              >
                <h1 className="font-serif text-[10vw] sm:text-[40px] tracking-tight text-[#2A1C12] uppercase font-bold"
                    style={{ textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.3)" }}>
                  ARUNAN
                </h1>
                <h1 className="font-serif text-[11vw] sm:text-[44px] tracking-tighter text-[#1C1108] uppercase font-black -mt-1 sm:-mt-1.5 ml-5">
                  KAVIRAJAN
                </h1>
              </motion.div>

              {/* Known For (2.85s) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.85, duration: 0.5 }}
                className="flex flex-col items-center text-center gap-1 mb-3.5"
              >
                <span className="font-mono text-[5.5px] sm:text-[6.5px] tracking-[0.25em] text-[#6B5B48] uppercase border-b border-[#6B5B48]/30 pb-0.5 mb-0.5">
                  KNOWN FOR
                </span>
                <p className="font-serif text-[9px] sm:text-[10px] text-[#3D2B1F] italic leading-snug">
                  BUILDING THINGS<br/>
                  TAKING THEM APART<br/>
                  FIGURING OUT WHY
                </p>
              </motion.div>

              {/* Classification Marks (2.85s) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.85, duration: 0.5 }}
                className="flex justify-center gap-2.5 mb-4"
              >
                <div className="border border-[#4A3828]/60 px-1.5 py-0.5 transform -rotate-3">
                  <span className="font-mono text-[6.5px] sm:text-[7.5px] tracking-wider text-[#3D2B1F] uppercase font-bold">SOFTWARE</span>
                </div>
                <div className="border border-[#4A3828]/60 px-1.5 py-0.5 transform rotate-2 bg-[#4A3828]/5">
                  <span className="font-mono text-[6.5px] sm:text-[7.5px] tracking-wider text-[#3D2B1F] uppercase font-bold">SECURITY</span>
                </div>
                <div className="border border-[#4A3828]/60 px-1.5 py-0.5 transform -rotate-1">
                  <span className="font-mono text-[6.5px] sm:text-[7.5px] tracking-wider text-[#3D2B1F] uppercase font-bold">AI / ML</span>
                </div>
              </motion.div>

              {/* Bottom Archival Info (3.10s) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.10, duration: 0.5 }}
                className="mt-auto pt-2 border-t-[1.5px] border-dashed border-[#3D2B1F]/30 flex justify-between items-end px-1 sm:px-2"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-[4.5px] sm:text-[5.5px] tracking-[0.25em] text-[#6B5B48]">LAST SEEN</span>
                  <span className="font-serif text-[7.5px] sm:text-[8.5px] text-[#2A1C12] font-bold">CHENNAI, IN</span>
                </div>
                
                <div className="flex gap-1.5 items-center pb-0.5">
                  <span className="text-[#8B4513]/50 text-[5px]">✦</span>
                  <span className="text-[#8B4513]/30 text-[4px]">★</span>
                  <span className="text-[#8B4513]/50 text-[5px]">✦</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="font-mono text-[4.5px] sm:text-[5.5px] tracking-[0.25em] text-[#6B5B48]">STATUS</span>
                  <span className="font-serif text-[7.5px] sm:text-[8.5px] text-[#871408] font-black tracking-widest">ACTIVE</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   02 — A NOTE TO SELF
   ────────────────────────────────────────────────────────── */
function ANoteToSelf() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8]">
      <div className="max-w-xl mx-auto md:max-w-2xl">
        <ChapterMark number="02" title="A Note to Self" />

        <div className="flex flex-col gap-8 md:gap-10">
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1108] leading-relaxed">
            I&apos;ve always wanted to know what&apos;s underneath.
          </p>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#6B5B48] leading-relaxed font-light">
            How things work. Why they fail. What happens when you start pulling them apart.
          </p>
          <p className="font-sans text-base sm:text-lg md:text-xl text-[#6B5B48] leading-relaxed font-light">
            That curiosity is probably what keeps me building.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   03 — UNDER THE SURFACE
   ────────────────────────────────────────────────────────── */
function UnderTheSurface() {
  const stages = ["MAKE", "TAKE APART", "UNDERSTAND", "MAKE AGAIN"];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="03" title="Under the Surface" />

        <div className="flex flex-col gap-12 md:gap-16">
          {stages.map((stage, i) => (
            <motion.div
              key={stage}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="flex items-baseline gap-6"
            >
              <span className="font-mono text-[10px] text-[#8B4513]/40 tracking-widest">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1C1108] tracking-tight">{stage}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   04 — THINGS I'M CHASING
   ────────────────────────────────────────────────────────── */
function ThingsImChasing() {
  const interests = ["SOFTWARE", "CYBERSECURITY", "AI / ML", "SYSTEMS", "EXPERIMENTATION", "BUILDING"];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="04" title="Things I'm Chasing" />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-12">
          {interests.map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <span className="font-serif text-xl sm:text-2xl text-[#1C1108] tracking-tight">{item}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   05 — THE WORKBENCH
   ────────────────────────────────────────────────────────── */
function TheWorkbench() {
  const categories = [
    { label: "Languages", items: ["C", "Python", "JavaScript", "TypeScript", "Bash"] },
    { label: "Frameworks / Software", items: ["React", "Next.js", "Node.js", "Flutter", "Tailwind CSS"] },
    { label: "Data / Backend", items: ["Supabase", "Firebase", "SQLite"] },
    { label: "Tools", items: ["Git", "GitHub", "Linux", "VS Code", "Vercel"] },
  ];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="05" title="The Workbench" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-16 md:gap-12 mb-20">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: ci * 0.1 }}
            >
              <h3 className="font-mono text-[10px] text-[#8B4513] tracking-[0.2em] uppercase mb-6 pb-3 border-b border-[#8B4513]/20">{cat.label}</h3>
              <div className="flex flex-col gap-3">
                {cat.items.map((item) => (
                  <span key={item} className="font-sans text-lg sm:text-xl text-[#1C1108] font-light">{item}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Current experiments */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="pt-12 border-t border-[#8B4513]/10"
        >
          <h3 className="font-serif italic text-lg text-[#6B5B48] mb-6">Current Experiments</h3>
          <div className="flex flex-wrap gap-x-8 gap-y-4">
            {["Cybersecurity", "AI/ML", "AI Agents", "Cloud"].map((item) => (
              <span key={item} className="font-mono text-xs text-[#6B5B48] tracking-[0.15em] uppercase">{item}</span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   06 — RECENT SPECIMENS
   ────────────────────────────────────────────────────────── */
const specimens = [
  { id: "koda", number: "01", title: "KODA", note: "Agentic codebase detective", tags: ["Next.js", "TypeScript", "GitHub API"] },
  { id: "echoes", number: "02", title: "ECHOES", note: "Anonymous drifting messages", tags: ["React", "Supabase", "Framer Motion"] },
  { id: "certiva", number: "03", title: "CERTIVA", note: "Certificate automation at scale", tags: ["React", "Vite", "PDF-lib"] },
  { id: "algolab", number: "04", title: "ALGORITHM LABORATORY", note: "Interactive visualization engine", tags: ["FastAPI", "Python", "React"] },
  { id: "dbrownie", number: "05", title: "ANDROID BILLING APP", note: "Retail POS with Bluetooth printing", tags: ["Flutter", "Dart", "SQLite"] },
  { id: "chatclub", number: "06", title: "CHAT CLUB WEBSITE", note: "Club platform with event management", tags: ["Next.js", "Firebase"] },
  { id: "pallavan", number: "07", title: "PALLAVAN MES", note: "Offline-first manufacturing system", tags: ["React", "Dexie.js", "Firebase"] },
  { id: "ascend", number: "08", title: "ASCEND", note: "Gamified productivity platform", tags: ["React", "Firebase", "Vite"] },
];

function RecentSpecimens() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="06" title="Recent Specimens" />

        <div className="flex flex-col gap-12 md:gap-10">
          {specimens.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
            >
              <Link href={`/projects/${s.id}`} className="group block">
                <div className="flex items-baseline gap-4 mb-2">
                  <span className="font-mono text-[10px] text-[#8B4513]/40 tracking-widest">{s.number}</span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight group-hover:text-[#8B4513] transition-colors">{s.title}</h3>
                </div>
                <p className="font-sans text-sm text-[#6B5B48] font-light ml-10 mb-3">{s.note}</p>
                <div className="flex flex-wrap gap-3 ml-10">
                  {s.tags.map((t) => (
                    <span key={t} className="font-mono text-[9px] text-[#9C8B78] tracking-widest uppercase">{t}</span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   07 — RECORDS
   ────────────────────────────────────────────────────────── */
function Records() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="07" title="Records" />

        {/* Experience */}
        <div className="mb-24 md:mb-32">
          <div className="font-mono text-[9px] text-[#6B5B48] tracking-[0.3em] uppercase mb-12">Experience</div>

          <div className="flex flex-col gap-16">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <span className="font-mono text-[10px] text-[#8B4513] tracking-widest mb-3 block">2026</span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#1C1108] tracking-tight mb-2">ApexFlow Technologies</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light">Software Development Intern</p>
              <p className="font-serif text-sm text-[#9C8B78] italic mt-2">Six-month internship</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
              <span className="font-mono text-[10px] text-[#8B4513]/70 tracking-widest mb-3 block">2026</span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight mb-2">DecodeLabs</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light">Python Programming Intern</p>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1C1108] tracking-tight mb-2">CHAT</h3>
              <p className="font-sans text-base text-[#6B5B48] font-light mb-1">Computer Hardware and AI Technology Club</p>
              <p className="font-serif text-sm text-[#9C8B78] italic">Official platform with dynamic event management</p>
            </motion.div>
          </div>
        </div>

        {/* Education */}
        <div className="pt-16 border-t border-[#8B4513]/10">
          <div className="font-mono text-[9px] text-[#6B5B48] tracking-[0.3em] uppercase mb-12">Education</div>

          <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl text-[#1C1108] tracking-tight mb-3 leading-tight">
              SRM Institute of Science and Technology
            </h3>
            <p className="font-sans text-base sm:text-lg text-[#6B5B48] font-light mb-2">B.Tech Information Technology</p>
            <span className="font-mono text-[10px] text-[#8B4513] tracking-widest">2025 — PRESENT</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   08 — MARGINALIA
   ────────────────────────────────────────────────────────── */
function Marginalia() {
  const notes = [
    { label: "Books", value: "Always reading something" },
    { label: "Philosophy", value: "Why things exist the way they do" },
    { label: "Electronics", value: "Hardware under the software" },
    { label: "Languages", value: "Words shape how you think" },
    { label: "Current Obsession", value: "How systems fail gracefully" },
  ];

  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#F0E2C8] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl">
        <ChapterMark number="08" title="Marginalia" />

        <div className="flex flex-col gap-8">
          {notes.map((n, i) => (
            <motion.div
              key={n.label}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6"
            >
              <span className="font-mono text-[10px] text-[#8B4513]/50 tracking-[0.2em] uppercase min-w-[120px]">{n.label}</span>
              <span className="font-serif text-lg sm:text-xl text-[#4A3828]/80 italic">{n.value}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────
   09 — LAST FRAME
   ────────────────────────────────────────────────────────── */
function LastFrame() {
  return (
    <section className="px-6 md:px-12 py-32 md:py-48 bg-[#EBD9BC] border-t border-[#8B4513]/10">
      <div className="max-w-xl mx-auto md:max-w-3xl text-center">
        <ChapterMark number="09" title="Last Frame" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#1C1108] tracking-tighter">
            ARUNAN KAVIRAJAN
          </h2>

          <div className="flex flex-wrap justify-center gap-8">
            <a href="mailto:arunan.kavirajan@gmail.com" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">Email</a>
            <a href="https://github.com/arunan-kavirajan" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/arunan-kavirajan" target="_blank" rel="noopener noreferrer" className="font-mono text-[10px] text-[#4A3828] hover:text-[#8B4513] tracking-widest uppercase transition-colors">LinkedIn</a>
            <Link href="/resume" className="font-mono text-[10px] text-[#8B4513] hover:text-[#1C1108] tracking-widest uppercase transition-colors">Resume</Link>
          </div>

          <p className="font-serif text-base sm:text-lg text-[#6B5B48] italic mt-4">
            Still curious.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════════
   ASSEMBLED COMPACT HOMEPAGE
   ══════════════════════════════════════════════════════════ */
export default function CompactHomeHero() {
  return (
    <main className="bg-[#F0E2C8] text-[#1C1108] selection:bg-[#8B4513]/25">
      <TheCover />
      <ANoteToSelf />
      <UnderTheSurface />
      <ThingsImChasing />
      <TheWorkbench />
      <RecentSpecimens />
      <Records />
      <Marginalia />
      <LastFrame />
    </main>
  );
}
