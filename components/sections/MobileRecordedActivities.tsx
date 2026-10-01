"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

/* =========================================================================
   PROJECT 01: ALGORITHM LABORATORY
   ========================================================================= */
function ProjectAlgo() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation mappings
  // 0.2 to 0.5: Draw the network
  const draw = useTransform(scrollYProgress, [0.2, 0.5], [0, 1]);
  // 0.5 to 0.7: Nodes appear
  const nodeOpacity = useTransform(scrollYProgress, [0.4, 0.6], [0, 1]);
  // 0.8 to 1.0: Collapse into a flat line as the next page comes up
  const scaleY = useTransform(scrollYProgress, [0.75, 0.95], [1, 0.01]);
  const opacity = useTransform(scrollYProgress, [0.9, 1], [1, 0]);

  return (
    <div ref={ref} className="relative h-[150vh] w-full bg-[#E5D4B8] z-10">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col pt-32 px-8 sm:px-12 overflow-hidden">
        
        {/* Archival Texture */}
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-20">
          <svg width="100%" height="100%">
            <filter id="noise-1"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" /></filter>
            <rect width="100%" height="100%" filter="url(#noise-1)" />
          </svg>
        </div>

        <Link href="/projects/algorithm-laboratory" className="relative z-10 block group">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-8"
          >
            RECORD 01 / SELECTED WORK
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
          >
            ALGORITHM LABORATORY
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#2A1C12]/80 font-light max-w-sm leading-relaxed"
          >
            An interactive space for learning, visualizing, experimenting with, and comparing algorithms.
          </motion.p>
        </Link>

        {/* The Visual */}
        <motion.div 
          style={{ scaleY, opacity }}
          className="absolute bottom-20 left-8 right-8 h-[35svh] flex items-center justify-center pointer-events-none origin-bottom"
        >
          <svg viewBox="0 0 200 150" className="w-full h-full overflow-visible">
            {/* Base grid lines */}
            <line x1="0" y1="75" x2="200" y2="75" stroke="#3D2B1F" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
            <line x1="100" y1="0" x2="100" y2="150" stroke="#3D2B1F" strokeWidth="0.5" strokeDasharray="2 4" opacity="0.2" />
            
            {/* Animated Algorithmic Paths */}
            <motion.path 
              d="M 20,75 L 60,30 L 140,30 L 180,75 L 140,120 L 60,120 Z" 
              fill="none" stroke="#5C3A21" strokeWidth="1" 
              style={{ pathLength: draw }} 
            />
            <motion.path 
              d="M 60,30 L 100,75 L 140,30 M 60,120 L 100,75 L 140,120 M 20,75 L 180,75" 
              fill="none" stroke="#5C3A21" strokeWidth="0.5" opacity="0.5"
              style={{ pathLength: draw }} 
            />

            {/* Nodes */}
            {[
              [20, 75], [60, 30], [140, 30], [180, 75], [140, 120], [60, 120], [100, 75]
            ].map((pos, i) => (
              <motion.circle 
                key={i} cx={pos[0]} cy={pos[1]} r="3" fill="#E5D4B8" stroke="#5C3A21" strokeWidth="1.5"
                style={{ opacity: nodeOpacity }}
              />
            ))}
          </svg>
        </motion.div>
      </div>
    </div>
  );
}

/* =========================================================================
   PROJECT 02: CERTIVA
   ========================================================================= */
function ProjectCertiva() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation mappings
  const slideY1 = useTransform(scrollYProgress, [0.2, 0.45], [40, 0]);
  const slideY2 = useTransform(scrollYProgress, [0.3, 0.55], [-40, 0]);
  const rot1 = useTransform(scrollYProgress, [0.2, 0.45], [-6, 0]);
  const rot2 = useTransform(scrollYProgress, [0.3, 0.55], [6, 0]);
  const docOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  return (
    <div ref={ref} className="relative h-[150vh] w-full bg-[#DFCEB3] z-20 shadow-[0_-20px_50px_rgba(0,0,0,0.08)]">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col pt-32 px-8 sm:px-12 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25">
          <svg width="100%" height="100%">
            <filter id="noise-2"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" /></filter>
            <rect width="100%" height="100%" filter="url(#noise-2)" />
          </svg>
        </div>

        <Link href="/projects/certiva" className="relative z-10 block group">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-8"
          >
            RECORD 02 / SELECTED WORK
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
          >
            CERTIVA
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#2A1C12]/80 font-light max-w-sm leading-relaxed"
          >
            A browser-based certificate tool that turns templates and participant data into personalized certificates.
          </motion.p>
        </Link>

        {/* The Visual */}
        <div className="absolute bottom-16 left-8 right-8 h-[40svh] flex items-center justify-center pointer-events-none">
          
          {/* Layer 1: Template Outline */}
          <motion.div 
            style={{ y: slideY1, rotate: rot1, opacity: docOpacity }}
            className="absolute w-[70%] max-w-[240px] aspect-[1.414] border border-[#5C3A21]/30 bg-[#E8DCC4]/50 backdrop-blur-sm flex flex-col p-4 sm:p-6"
          >
            <div className="w-1/3 h-[1px] bg-[#5C3A21]/20 mb-4" />
            <div className="w-3/4 h-[1px] bg-[#5C3A21]/20 mb-2" />
            <div className="w-1/2 h-[1px] bg-[#5C3A21]/20 mb-auto" />
            <div className="flex justify-between">
              <div className="w-1/4 h-[1px] bg-[#5C3A21]/20" />
              <div className="w-1/4 h-[1px] bg-[#5C3A21]/20" />
            </div>
          </motion.div>

          {/* Layer 2: Data Overlay resolving into place */}
          <motion.div 
            style={{ y: slideY2, rotate: rot2, opacity: docOpacity }}
            className="absolute w-[70%] max-w-[240px] aspect-[1.414] border border-[#5C3A21]/60 flex flex-col items-center justify-center p-4 sm:p-6"
          >
            <div className="font-serif italic text-[#2A1C12] text-xs sm:text-sm border-b border-[#2A1C12]/30 pb-1 mb-2">
              Participant Name
            </div>
            <div className="font-mono text-[6px] text-[#5C3A21]/60 tracking-widest uppercase">
              ID: 8492-X
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   PROJECT 03: ANDROID BILLING APP
   ========================================================================= */
function ProjectBilling() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Animation mappings
  // The receipt container height grows
  const receiptHeight = useTransform(scrollYProgress, [0.3, 0.6], ["0%", "100%"]);
  const receiptOpacity = useTransform(scrollYProgress, [0.3, 0.4], [0, 1]);
  // The content inside fades in slightly later
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  return (
    <div ref={ref} className="relative h-[150vh] w-full bg-[#E8DCC4] z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.05)]">
      <div className="sticky top-0 h-[100svh] w-full flex flex-col pt-32 px-8 sm:px-12 overflow-hidden">
        
        <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30">
          <svg width="100%" height="100%">
            <filter id="noise-3"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="4" /></filter>
            <rect width="100%" height="100%" filter="url(#noise-3)" />
          </svg>
        </div>

        <Link href="/projects/android-billing-app" className="relative z-10 block group">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-8"
          >
            RECORD 03 / SELECTED WORK
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
          >
            ANDROID BILLING APP
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.2 }}
            className="font-sans text-base sm:text-lg text-[#2A1C12]/80 font-light max-w-sm leading-relaxed"
          >
            A practical billing and order management app built for small food stalls and everyday retail work.
          </motion.p>
        </Link>

        {/* The Visual */}
        <div className="absolute bottom-0 left-8 w-[160px] sm:w-[200px] h-[40svh] flex flex-col pointer-events-none">
          
          {/* Printer Slot (Fixed at top of visual area) */}
          <div className="w-full h-2 bg-[#2A1C12]/10 rounded-full mb-[-4px] relative z-10 shadow-[inset_0_2px_4px_rgba(0,0,0,0.1)]" />
          
          {/* Receipt Strip (Grows downward) */}
          <motion.div 
            style={{ height: receiptHeight, opacity: receiptOpacity }}
            className="w-[90%] mx-auto bg-[#F4EFE6] shadow-[0_10px_20px_rgba(0,0,0,0.1)] border-x border-b border-[#3D2B1F]/10 flex flex-col origin-top overflow-hidden"
          >
            <motion.div style={{ opacity: contentOpacity }} className="p-4 flex flex-col gap-2">
              <div className="font-mono text-[8px] text-[#2A1C12]/50 text-center mb-2">ORDER #042</div>
              
              <div className="flex justify-between font-mono text-[7px] text-[#2A1C12]/70 border-b border-dashed border-[#3D2B1F]/20 pb-1">
                <span>ITEM</span>
                <span>QTY</span>
              </div>
              
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between font-mono text-[7px] text-[#2A1C12]/80">
                  <div className="w-16 h-1.5 bg-[#2A1C12]/10" />
                  <div className="w-4 h-1.5 bg-[#2A1C12]/10" />
                </div>
              ))}
              
              <div className="mt-2 pt-2 border-t border-dashed border-[#3D2B1F]/20 flex justify-between font-mono text-[8px] font-bold text-[#2A1C12]">
                <span>TOTAL</span>
                <div className="w-8 h-2 bg-[#2A1C12]/20" />
              </div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   MAIN COMPONENT EXPORT
   ========================================================================= */
export default function MobileRecordedActivities() {
  return (
    <section className="relative w-full z-20">
      
      {/* Intro Header */}
      <div className="bg-[#E5D4B8] pt-32 pb-16 px-8 sm:px-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.3em] text-[#5C3A21]/70 uppercase mb-4"
        >
          RECORDED ACTIVITIES
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-lg text-[#2A1C12]/60 italic"
        >
          3 SELECTED RECORDS
        </motion.div>
      </div>

      {/* The Parallax Project Pages */}
      <ProjectAlgo />
      <ProjectCertiva />
      <ProjectBilling />

      {/* Outro Archival Link */}
      <div className="bg-[#E8DCC4] pt-24 pb-48 px-8 sm:px-12 relative z-40 shadow-[0_-20px_50px_rgba(0,0,0,0.03)] border-t border-[#3D2B1F]/5">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.3em] text-[#5C3A21]/70 uppercase mb-4"
        >
          FULL EXHIBIT
        </motion.div>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-serif text-base text-[#2A1C12]/80 mb-10"
        >
          The complete collection of recorded work.
        </motion.p>
        <motion.a 
          href="https://github.com/Arunan-Kavirajan/project-exhibit" 
          target="_blank" 
          rel="noopener noreferrer" 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-mono text-[10px] tracking-widest text-[#2A1C12] border border-[#3D2B1F]/30 px-6 py-3 uppercase hover:bg-[#3D2B1F]/5 transition-colors inline-block"
        >
          [ FULL EXHIBIT ↗ ]
        </motion.a>
      </div>

    </section>
  );
}
