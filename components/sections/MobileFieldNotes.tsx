"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MobileFieldNotes() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress within this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax for the paper itself (slides up slightly faster than scroll)
  const paperY = useTransform(scrollYProgress, [0, 1], [100, -50]);
  
  // Parallax for background stains
  const stain1Y = useTransform(scrollYProgress, [0, 1], [-20, 40]);
  const stain2Y = useTransform(scrollYProgress, [0, 1], [50, -30]);

  // Drying ink effect (blur and opacity) for each paragraph
  // Paragraph 1 fades in early
  const p1Opacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const p1Blur = useTransform(scrollYProgress, [0.15, 0.35], ["blur(4px)", "blur(0px)"]);
  
  // Paragraph 2 fades in next
  const p2Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const p2Blur = useTransform(scrollYProgress, [0.3, 0.5], ["blur(4px)", "blur(0px)"]);
  
  // Paragraph 3 fades in last
  const p3Opacity = useTransform(scrollYProgress, [0.45, 0.65], [0, 1]);
  const p3Blur = useTransform(scrollYProgress, [0.45, 0.65], ["blur(4px)", "blur(0px)"]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-[100svh] bg-[#0c0805] flex items-center justify-center py-24 px-4 sm:px-8 overflow-hidden z-20"
      style={{
        // Dark desk background with a subtle spotlight in the center
        backgroundImage: "radial-gradient(circle at 50% 50%, #1c110a 0%, #0c0805 100%)"
      }}
    >
      {/* Background Dust Motes */}
      <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id="desk-dust">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="15" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
          </filter>
          <rect width="100%" height="100%" filter="url(#desk-dust)" />
        </svg>
      </div>

      {/* Desk Parallax Elements (Edges) */}
      <motion.div 
        className="absolute top-10 -left-6 w-32 h-32 rounded-full bg-black/40 blur-[15px] pointer-events-none"
        style={{ y: stain1Y }}
      />
      <motion.div 
        className="absolute bottom-20 -right-10 w-40 h-40 rounded-full bg-black/60 blur-[20px] pointer-events-none"
        style={{ y: stain2Y }}
      />

      {/* The Ledger Paper */}
      <motion.div 
        className="relative w-full max-w-[400px] bg-[#E8DCC4] p-8 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_0_60px_rgba(139,69,19,0.15)]"
        style={{ 
          y: paperY,
          // Slightly torn/uneven edges using a subtle clip-path
          clipPath: "polygon(1% 0%, 99% 1%, 100% 98%, 0% 100%, 0% 2%)"
        }}
      >
        {/* Paper Texture (Grain & Stains) */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-40">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="paper-grain">
              <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" seed="2" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.9 0 0 0  0 0.8 0 0 0  0 0 0 0.4 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paper-grain)" />
          </svg>
        </div>

        {/* Faint Coffee Ring Stain */}
        <div className="absolute -top-4 -right-8 w-32 h-32 rounded-full border-[3px] border-[#5C3A21]/20 mix-blend-multiply pointer-events-none" 
             style={{ filter: "blur(1px)", transform: "scaleY(0.85) rotate(-15deg)" }} />
        <div className="absolute -top-3 -right-6 w-28 h-28 rounded-full border-[1px] border-[#5C3A21]/10 mix-blend-multiply pointer-events-none" 
             style={{ filter: "blur(0.5px)", transform: "scaleY(0.85) rotate(-15deg)" }} />

        {/* Ledger Header */}
        <div className="relative mb-10 pb-4 border-b border-[#3D2B1F]/20">
          <p className="font-mono text-[9px] tracking-[0.3em] text-[#5C3A21] uppercase mb-1 opacity-70">
            Archival Entry No. 2
          </p>
          <h2 className="font-serif text-3xl tracking-tight text-[#2A1C12] uppercase font-bold"
              style={{ textShadow: "0.5px 0.5px 0px rgba(255,255,255,0.5)" }}>
            Field Notes
          </h2>
          {/* Stamped Date */}
          <div className="absolute top-2 right-0 border-2 border-[#8A3A20]/40 text-[#8A3A20]/60 font-mono text-[8px] tracking-widest px-2 py-1 rotate-[4deg] mix-blend-multiply">
            CONFIDENTIAL
          </div>
        </div>

        {/* The Content (Drying Ink Effect) */}
        <div className="relative font-serif text-[#1A110A] text-base sm:text-lg leading-relaxed flex flex-col gap-6">
          
          {/* Faint Ruled Lines Behind Text */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-start" style={{ marginTop: '0.4rem' }}>
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-full h-[1px] bg-[#3D2B1F]/5 mb-[1.75rem]" />
            ))}
          </div>

          <motion.p 
            className="relative font-medium"
            style={{ opacity: p1Opacity, filter: p1Blur }}
          >
            I’ve always been the kind of person who wants to know <span className="italic text-[#631d1f]">what’s underneath.</span>
          </motion.p>
          
          <motion.p 
            className="relative"
            style={{ opacity: p2Opacity, filter: p2Blur }}
          >
            How things work, why they fail, and what happens when you start pulling them apart.
          </motion.p>
          
          <motion.p 
            className="relative"
            style={{ opacity: p3Opacity, filter: p3Blur }}
          >
            That curiosity is probably what keeps me building.
          </motion.p>

        </div>

        {/* Ink Smudge / Fingerprint at bottom */}
        <div className="absolute bottom-4 left-6 w-8 h-12 bg-[#2A1C12]/10 rounded-[40%] blur-[2px] mix-blend-multiply rotate-45 pointer-events-none" />
      </motion.div>
    </section>
  );
}
