"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLoading } from "@/components/layout/LoadingProvider";

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
  const { isLoading } = useLoading();
  const [start, setStart] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const controls = useAnimation();

  useEffect(() => {
    if (!isLoading) {
      const t = setTimeout(() => setStart(true), 150);
      return () => clearTimeout(t);
    }
  }, [isLoading]);

  useEffect(() => {
    if (start) {
      const runAnim = async () => {
        await controls.start({
          y: 0, rotateZ: 1.2, rotateX: 0, opacity: 1,
          transition: { type: "spring", stiffness: 70, damping: 14, mass: 1.2 }
        });
        controls.start({
          rotateZ: [1.2, 0.2, 1.2],
          rotateX: [0, 1.5, 0],
          transition: { duration: 12, repeat: Infinity, ease: "easeInOut" }
        });
      };
      runAnim();
    }
  }, [start, controls]);
  
  const dustParticles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      scale: 0.15 + Math.random() * 0.8,
      duration: 12 + Math.random() * 18,
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

  const xOffset = (mousePos.x - 0.5) * 25;
  const yOffset = (mousePos.y - 0.5) * 25;

  return (
    <section 
      className="relative h-[100svh] w-full bg-[#1e130c] overflow-hidden flex items-center justify-center pt-[3svh] pb-[3svh] perspective-[1200px] select-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleMouseMove}
    >
      {/* ── Wall Background ── */}
      <div className="absolute inset-0 bg-[#3D2B1F]">
        <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="cinematic-wood">
              <feTurbulence type="fractalNoise" baseFrequency="0.015 0.12" numOctaves="6" seed="5" />
              <feColorMatrix type="saturate" values="0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#cinematic-wood)" />
          </svg>
        </div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_15%,rgba(20,12,6,0.9)_100%)] pointer-events-none" />
        
        {/* Lantern flicker / Ambient light */}
        <motion.div
          className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
          animate={{
            opacity: [0.35, 0.45, 0.38, 0.5, 0.4],
            scale: [1, 1.02, 0.98, 1.01, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-full h-full" style={{ background: `radial-gradient(circle 700px at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,210,160,0.2), transparent)` }} />
        </motion.div>
        
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {dustParticles.map((dust) => (
            <motion.div
              key={dust.id}
              className="absolute w-1 h-1 bg-[#F0E2C8] rounded-full blur-[0.8px] opacity-0 mix-blend-screen"
              style={{ left: `${dust.x}%`, top: `${dust.y}%`, scale: dust.scale }}
              animate={start ? {
                y: [0, -120],
                x: [0, Math.sin(dust.id) * 40],
                opacity: [0, 0.6, 0],
              } : {}}
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

      {start && (
        <>
          {/* ── Nail (Impact at 0.1s) ── */}
          <motion.div
            initial={{ scale: 0, y: -30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 500, damping: 12 }}
            className="absolute top-[6svh] sm:top-[8svh] z-50 pointer-events-none"
          >
            <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#1a110a] rounded-full shadow-[0_4px_6px_rgba(0,0,0,0.7)] border-[1.5px] border-[#36271c]">
               <div className="absolute top-[2px] left-[2px] w-1 h-1 bg-[#8c7462] rounded-full opacity-70 blur-[0.5px]" />
               <motion.div 
                 className="absolute -bottom-2 -right-2 w-5 h-5 bg-black/60 blur-[2px] rounded-full -z-10"
                 animate={{ x: -xOffset * 0.15, y: -yOffset * 0.15 }}
               />
            </div>
          </motion.div>

          {/* ── The Poster Object ── */}
          <motion.div
            initial={{ y: "-100vh", rotateZ: 5, rotateX: 25, opacity: 0 }}
            animate={controls}
            className="relative w-[88vw] max-w-[380px] sm:max-w-[420px] h-[85svh] sm:h-[88svh] z-20"
            style={{
              filter: "drop-shadow(15px 25px 35px rgba(0,0,0,0.7)) drop-shadow(0px 8px 12px rgba(0,0,0,0.6))",
            }}
          >
            <motion.div 
              className="w-full h-full relative"
              animate={{
                rotateX: -yOffset * 0.4,
                rotateY: xOffset * 0.4,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Irregular Paper */}
              <div 
                className="absolute inset-0 bg-[#F0E2C8]"
                style={{
                  clipPath: "polygon(1% 0%, 98.5% 1%, 100% 98.5%, 97% 100%, 1.5% 99%, 0% 1.5%)",
                  boxShadow: "inset 0 0 55px rgba(139,69,19,0.2)",
                }}
              >
                {/* Paper Texture — coarse grain, cranked up */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.6] mix-blend-multiply">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="paper-texture">
                      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="5" stitchTiles="stitch" seed="2" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#paper-texture)" />
                  </svg>
                </div>
                
                {/* Second fiber layer — finer, more visible */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.25] mix-blend-multiply">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="paper-fiber">
                      <feTurbulence type="fractalNoise" baseFrequency="1.2 0.4" numOctaves="3" seed="8" />
                      <feColorMatrix type="saturate" values="0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#paper-fiber)" />
                  </svg>
                </div>
                
                {/* Foxing spots / age speckles */}
                <div className="absolute inset-0 pointer-events-none opacity-[0.18] mix-blend-darken">
                  <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                    <filter id="foxing">
                      <feTurbulence type="fractalNoise" baseFrequency="3" numOctaves="2" seed="14" />
                      <feColorMatrix type="matrix" values="0.3 0 0 0 0.2  0.15 0 0 0 0.1  0 0 0 0 0  0 0 0 0.6 0" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#foxing)" />
                  </svg>
                </div>
                
                {/* Edge darkening / yellowing — thick inner shadow */}
                <div className="absolute inset-0 shadow-[inset_0_0_100px_rgba(61,43,31,0.45)] pointer-events-none" />
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(100,70,30,0.2)] pointer-events-none" />
                
                {/* Creases — thick, visible, weathered */}
                <div className="absolute top-[15%] -right-4 w-[160%] h-[3px] -rotate-[14deg] pointer-events-none flex flex-col opacity-90">
                   <div className="w-full h-[1.5px] bg-white/50" />
                   <div className="w-full h-[1.5px] bg-[#3D2B1F]/30" />
                </div>
                <div className="absolute top-[48%] -left-2 w-[110%] h-[4px] rotate-[0.5deg] pointer-events-none flex flex-col opacity-70">
                   <div className="w-full h-[2px] bg-[#3D2B1F]/25" />
                   <div className="w-full h-[2px] bg-white/40" />
                </div>
                <div className="absolute top-[72%] left-4 w-[80%] h-[2px] rotate-[2deg] pointer-events-none flex flex-col opacity-50">
                   <div className="w-full h-[1px] bg-[#3D2B1F]/15" />
                   <div className="w-full h-[1px] bg-white/25" />
                </div>
                
                {/* Burn marks — heavy, multiple, irregular */}
                <div className="absolute -bottom-6 -left-6 w-36 h-36 pointer-events-none mix-blend-multiply blur-[3px]"
                  style={{ background: "radial-gradient(ellipse at 70% 70%, rgba(30,15,5,0.6) 0%, rgba(60,35,15,0.3) 35%, transparent 70%)" }} />
                <div className="absolute -top-3 -right-3 w-28 h-28 pointer-events-none mix-blend-multiply blur-[2px]"
                  style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(40,20,5,0.4) 0%, rgba(80,45,15,0.15) 40%, transparent 65%)" }} />
                <div className="absolute bottom-[10%] -right-4 w-20 h-24 pointer-events-none mix-blend-multiply blur-[1px]"
                  style={{ background: "radial-gradient(ellipse at 90% 50%, rgba(50,25,8,0.35) 0%, transparent 60%)" }} />
                <div className="absolute top-[30%] -left-2 w-14 h-16 pointer-events-none mix-blend-multiply blur-[1px]"
                  style={{ background: "radial-gradient(ellipse at 10% 50%, rgba(45,22,6,0.2) 0%, transparent 55%)" }} />
                
                {/* Coffee ring stain */}
                <div className="absolute top-[20%] right-[15%] w-16 h-16 rounded-full pointer-events-none mix-blend-multiply opacity-25"
                  style={{ background: "radial-gradient(ellipse, transparent 40%, rgba(120,70,20,0.35) 50%, rgba(120,70,20,0.15) 60%, transparent 70%)" }} />
                
                {/* Scattered dark spots — old ink drips */}
                <div className="absolute top-[65%] left-[22%] w-2 h-2 rounded-full bg-[#3D2B1F]/15 blur-[1px] pointer-events-none" />
                <div className="absolute top-[38%] left-[72%] w-1.5 h-1 rounded-full bg-[#3D2B1F]/12 blur-[0.5px] pointer-events-none rotate-45" />
                <div className="absolute top-[82%] left-[55%] w-1 h-1.5 rounded-full bg-[#3D2B1F]/10 blur-[0.5px] pointer-events-none" />

                {/* Nail stress tear */}
                <div className="absolute top-[-2px] left-1/2 -translate-x-1/2 w-10 h-14 bg-[radial-gradient(ellipse,rgba(61,43,31,0.3)_0%,transparent_70%)] mix-blend-multiply pointer-events-none" />

                {/* Blood stains — aged, dried, subtle */}
                <div className="absolute top-[58%] left-[8%] w-6 h-8 pointer-events-none mix-blend-multiply opacity-40"
                  style={{ background: "radial-gradient(ellipse at 40% 50%, rgba(100,15,15,0.5) 0%, rgba(80,10,10,0.2) 40%, transparent 70%)" }} />
                <div className="absolute top-[62%] left-[10%] w-3 h-2 rounded-full bg-[#5C0E0E]/20 blur-[0.5px] pointer-events-none rotate-[25deg]" />
                <div className="absolute top-[55%] left-[12%] w-1.5 h-1 rounded-full bg-[#6B1212]/15 pointer-events-none" />
                
                <div className="absolute top-[35%] right-[12%] w-4 h-5 pointer-events-none mix-blend-multiply opacity-30"
                  style={{ background: "radial-gradient(ellipse at 60% 40%, rgba(90,12,12,0.45) 0%, transparent 65%)" }} />
                <div className="absolute top-[37%] right-[10%] w-2 h-1.5 rounded-full bg-[#5C0E0E]/15 blur-[0.5px] pointer-events-none rotate-[-15deg]" />
                
                {/* Tiny spatter dots */}
                <div className="absolute top-[56%] left-[5%] w-1 h-1 rounded-full bg-[#6B1212]/18 pointer-events-none" />
                <div className="absolute top-[60%] left-[14%] w-0.5 h-0.5 rounded-full bg-[#5C0E0E]/20 pointer-events-none" />
                <div className="absolute top-[33%] right-[8%] w-1 h-0.5 rounded-full bg-[#6B1212]/12 pointer-events-none rotate-45" />

                {/* ── Poster Content ── */}
                <div className="relative w-full h-full p-4 sm:p-5 flex flex-col z-10">
                  
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute inset-[14px] sm:inset-[18px] border-[1.5px] border-[#3D2B1F]/65 pointer-events-none"
                    style={{ clipPath: "polygon(0 0, 100% 1%, 99% 100%, 1% 99%)" }}
                  />
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="absolute inset-[18px] sm:inset-[22px] border-[0.5px] border-[#3D2B1F]/45 pointer-events-none"
                  />

                  {/* Header (1.0s) */}
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0, duration: 0.4 }}
                    className="mt-3 text-center"
                  >
                    <p className="font-mono text-[6.5px] sm:text-[7.5px] tracking-[0.45em] text-[#4A3828] uppercase font-bold opacity-85">
                      THE COUNTY ARCHIVE
                    </p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <motion.span 
                        animate={{ rotate: 360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="text-[#8B4513]/50 text-[5px] inline-block"
                      >❖</motion.span>
                      <p className="font-serif text-[7.5px] sm:text-[8.5px] tracking-[0.25em] text-[#6B5B48] italic">
                        Case No. 001
                      </p>
                      <motion.span 
                        animate={{ rotate: -360 }} 
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="text-[#8B4513]/50 text-[5px] inline-block"
                      >❖</motion.span>
                    </div>
                  </motion.div>

                  {/* WANTED (1.1s) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 1.15 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.1, type: "spring", stiffness: 250, damping: 18 }}
                    className="mt-4 sm:mt-5 text-center relative"
                  >
                    {/* Ink bleed ghost — slightly offset, blurred duplicate */}
                    <h2 
                      className="absolute inset-0 font-serif text-[17vw] sm:text-[72px] leading-[0.8] tracking-[0.03em] text-[#1a110a]/20 font-black uppercase blur-[1.5px] translate-x-[0.5px] translate-y-[0.3px]"
                      aria-hidden="true"
                    >
                      WANTED
                    </h2>
                    <motion.h2 
                      animate={{ opacity: [0.92, 1, 0.94, 1, 0.93] }}
                      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      className="relative font-serif text-[17vw] sm:text-[72px] leading-[0.8] tracking-[0.03em] text-[#1a110a] font-black uppercase"
                      style={{ 
                        WebkitTextStroke: "1.5px rgba(61,43,31,0.8)",
                        textShadow: "2px 2px 0px rgba(255,255,255,0.4), -1px -1px 0px rgba(0,0,0,0.5), 0 0 4px rgba(28,17,8,0.15)"
                      }}
                    >
                      WANTED
                    </motion.h2>
                  </motion.div>

                  {/* Subtitle (1.3s) */}
                  <motion.div
                    initial={{ opacity: 0, filter: "blur(4px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{ delay: 1.3, duration: 0.4 }}
                    className="flex items-center justify-center gap-2 mt-3 mb-2"
                  >
                    <div className="h-[1.5px] w-8 sm:w-10 bg-[#4A3828]/65 rounded-[50%]" />
                    <p className="font-serif text-[8.5px] sm:text-[10px] tracking-[0.3em] text-[#3D2B1F] italic font-bold">
                      DEAD OR ALIVE
                    </p>
                    <div className="h-[1.5px] w-8 sm:w-10 bg-[#4A3828]/65 rounded-[50%]" />
                  </motion.div>

                  {/* Portrait (1.5s plate, 1.7s develop) */}
                  <div className="flex-1 w-full relative flex justify-center items-center mt-2 mb-3 px-6">
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.5, duration: 0.3 }}
                      className="relative w-full max-w-[210px] sm:max-w-[240px] aspect-[4/5] bg-[#C8AD85] border-[3px] border-[#3D2B1F]/80 overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.5)]"
                      style={{ clipPath: "polygon(1.5% 1%, 98.5% 0%, 100% 99%, 0% 100%)" }}
                    >
                      <motion.div
                        initial={{ opacity: 0, filter: "blur(8px) contrast(200%) grayscale(100%) brightness(2)" }}
                        animate={{ opacity: 0.9, filter: "blur(0px) contrast(120%) grayscale(50%) brightness(0.9)" }}
                        transition={{ delay: 1.7, duration: 2.5, ease: "easeOut" }}
                        className="absolute inset-0 mix-blend-multiply"
                      >
                        <Image
                          src="/bounty-profile.jpg"
                          alt="Arunan Kavirajan"
                          fill
                          className="object-cover object-top"
                          style={{ filter: "sepia(60%) saturate(0.8) hue-rotate(-5deg)" }}
                          priority
                          sizes="(max-width: 640px) 70vw, 240px"
                        />
                      </motion.div>
                      
                      {/* Heavy vignette */}
                      <motion.div 
                        className="absolute inset-0 shadow-[inset_0_0_50px_rgba(30,19,12,0.8)] pointer-events-none mix-blend-multiply"
                        animate={{ opacity: [0.85, 1, 0.85] }}
                        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Photo grain — heavy */}
                      <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <filter id="photo-scratch"><feTurbulence type="fractalNoise" baseFrequency="0.9 0.05" numOctaves="3" seed="7" /></filter>
                          <rect width="100%" height="100%" filter="url(#photo-scratch)" />
                        </svg>
                      </div>
                      {/* Fine photo noise */}
                      <div className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply">
                        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                          <filter id="photo-noise"><feTurbulence type="fractalNoise" baseFrequency="1.5" numOctaves="2" seed="22" /><feColorMatrix type="saturate" values="0" /></filter>
                          <rect width="100%" height="100%" filter="url(#photo-noise)" />
                        </svg>
                      </div>
                    </motion.div>

                    {/* Wax Seal — Matte, flat, grainy maroon (2.0s) */}
                    <div className="absolute -bottom-6 -right-4 sm:-right-3 z-30">
                      {/* SVG Filters for realistic wax melting and grain */}
                      <svg width="0" height="0" className="absolute">
                        <filter id="wax-melt">
                          <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
                          <feDisplacementMap in="SourceGraphic" in2="noise" scale="4" xChannelSelector="R" yChannelSelector="G" />
                        </filter>
                      </svg>

                      <motion.div
                        initial={{ opacity: 0, scale: 2.5, y: -20, rotate: -40 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotate: -8 }}
                        transition={{ delay: 2.0, type: "spring", stiffness: 220, damping: 15, mass: 1.1 }}
                        style={{ filter: "drop-shadow(2px 3px 4px rgba(0,0,0,0.4))" }}
                      >
                        {/* Melted Wax Body Container - Matte & Dark */}
                        <div 
                          className="relative w-[85px] h-[85px] sm:w-[100px] sm:h-[100px] rounded-full flex items-center justify-center"
                          style={{ 
                            filter: "url(#wax-melt)",
                            background: "radial-gradient(circle at 45% 45%, #6e1c20 0%, #4a1012 50%, #2e080a 100%)",
                            boxShadow: "inset 2px 4px 8px rgba(0,0,0,0.3), inset -3px -5px 10px rgba(0,0,0,0.5)"
                          }}
                        >
                          {/* Deep Recessed Center Bowl */}
                          <div 
                            className="absolute w-[65%] h-[65%] rounded-full flex items-center justify-center overflow-hidden"
                            style={{
                              background: "radial-gradient(circle at 50% 50%, #520f12 0%, #300608 100%)",
                              boxShadow: "inset 3px 5px 8px rgba(0,0,0,0.6)"
                            }}
                          >
                             {/* 3D Embossed Emblem (Laurel + Crown) - Dull Red */}
                             <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]" style={{ filter: "drop-shadow(1px 2px 2px rgba(0,0,0,0.7))" }}>
                               {/* Left Laurel */}
                               <path d="M 45,90 C 20,85 10,60 15,40 C 18,30 25,22 30,22 C 22,30 22,45 28,52 C 22,58 26,72 38,78 C 30,72 30,62 38,55 C 32,55 35,45 42,42 C 38,48 40,58 48,60 C 45,70 45,80 45,90 Z" fill="#6e1c20" />
                               {/* Right Laurel */}
                               <path d="M 55,90 C 80,85 90,60 85,40 C 82,30 75,22 70,22 C 78,30 78,45 72,52 C 78,58 74,72 62,78 C 70,72 70,62 62,55 C 68,55 65,45 58,42 C 62,48 60,58 52,60 C 55,70 55,80 55,90 Z" fill="#6e1c20" />
                               
                               {/* Center Base / Ribbon */}
                               <rect x="40" y="72" width="20" height="8" rx="2" fill="#6e1c20" />
                               <rect x="42" y="68" width="16" height="3" rx="1" fill="#6e1c20" />
                               
                               {/* Center Crown / Flame */}
                               <path d="M 42,65 L 45,35 L 50,45 L 55,35 L 58,65 Z" fill="#6e1c20" />
                               <path d="M 46,30 Q 50,12 54,30 Z" fill="#6e1c20" />
                             </svg>
                          </div>

                          {/* Heavy Wax Surface Grain (Matte / Worn) */}
                          <div className="absolute inset-0 rounded-full opacity-40 mix-blend-multiply pointer-events-none">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                              <filter id="wax-grain-new">
                                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="5" seed="12" />
                                <feColorMatrix type="saturate" values="0" />
                              </filter>
                              <rect width="100%" height="100%" filter="url(#wax-grain-new)" />
                            </svg>
                          </div>
                          
                          {/* Dirt and scuff marks over the wax */}
                          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,transparent_40%,rgba(20,10,5,0.4)_100%)] mix-blend-multiply pointer-events-none" />
                        </div>

                        {/* Extra Organic Wax Drips below */}
                        <div 
                          className="absolute -bottom-3 left-[35%] w-5 h-7 rounded-b-full transform rotate-6"
                          style={{ filter: "url(#wax-melt)", background: "#4a1012" }}
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Name (2.3s) */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 2.3, duration: 0.3 }}
                    className="flex flex-col items-center leading-[0.8] mb-3 relative"
                  >
                    <h1 className="font-serif text-[10vw] sm:text-[40px] tracking-tight text-[#2A1C12] uppercase font-bold"
                        style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.35), -0.5px -0.5px 0px rgba(0,0,0,0.3), 0 0 3px rgba(28,17,8,0.1)", WebkitTextStroke: "0.5px rgba(42,28,18,0.4)" }}>
                      ARUNAN
                    </h1>
                    <h1 className="font-serif text-[11vw] sm:text-[44px] tracking-tighter text-[#1C1108] uppercase font-black -mt-1 sm:-mt-1.5 ml-5"
                        style={{ textShadow: "1px 1px 0px rgba(255,255,255,0.3), -0.5px -0.5px 0px rgba(0,0,0,0.4), 0 0 3px rgba(28,17,8,0.12)", WebkitTextStroke: "0.5px rgba(28,17,8,0.5)" }}>
                      KAVIRAJAN
                    </h1>
                  </motion.div>

                  {/* Known For (2.5s) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.5, duration: 0.5 }}
                    className="flex flex-col items-center text-center gap-1 mb-3.5"
                  >
                    <span className="font-mono text-[5.5px] sm:text-[6.5px] tracking-[0.25em] text-[#6B5B48] uppercase border-b border-[#6B5B48]/40 pb-0.5 mb-0.5">
                      KNOWN FOR
                    </span>
                    <p className="font-serif text-[9px] sm:text-[10px] text-[#3D2B1F] italic leading-snug">
                      BUILDING THINGS<br/>
                      TAKING THEM APART<br/>
                      FIGURING OUT WHY
                    </p>
                  </motion.div>



                  {/* Bottom Archival Info (2.8s) */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2.8, duration: 0.5 }}
                    className="mt-auto pt-2 border-t-[1.5px] border-dashed border-[#3D2B1F]/40 flex justify-between items-end px-1 sm:px-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-mono text-[4.5px] sm:text-[5.5px] tracking-[0.25em] text-[#6B5B48]">LAST SEEN</span>
                      <span className="font-serif text-[7.5px] sm:text-[8.5px] text-[#2A1C12] font-bold">CHENNAI, IN</span>
                    </div>
                    
                    <motion.div 
                      className="flex gap-1.5 items-center pb-0.5"
                      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <span className="text-[#8B4513]/60 text-[5px]">✦</span>
                      <span className="text-[#8B4513]/40 text-[4px]">★</span>
                      <span className="text-[#8B4513]/60 text-[5px]">✦</span>
                    </motion.div>

                    <div className="flex flex-col items-end">
                      <span className="font-mono text-[4.5px] sm:text-[5.5px] tracking-[0.25em] text-[#6B5B48]">STATUS</span>
                      <motion.span 
                        animate={{ opacity: [1, 0.6, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="font-serif text-[7.5px] sm:text-[8.5px] text-[#871408] font-black tracking-widest"
                      >
                        ACTIVE
                      </motion.span>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Active Scroll Hint */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.6 }}
            className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 z-50 pointer-events-none"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="w-[1px] h-6 bg-gradient-to-b from-transparent via-[#F0E2C8]/60 to-transparent" />
            </motion.div>
            <span className="font-mono text-[6px] tracking-[0.4em] text-[#F0E2C8]/50 uppercase mt-1">
              Scroll
            </span>
          </motion.div>
        </>
      )}
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
