"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";

function TornEdgeTop() {
  return (
    <div className="absolute top-0 left-0 w-full h-[15px] sm:h-[25px] overflow-hidden pointer-events-none -translate-y-full z-30 drop-shadow-[0_-5px_5px_rgba(0,0,0,0.15)]">
      <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="w-full h-full text-[#E5D4B8] fill-current">
        <path d="M0,20 L0,10 L25,18 L50,8 L75,15 L100,5 L125,12 L150,2 L175,18 L200,7 L225,16 L250,9 L275,19 L300,10 L325,17 L350,6 L375,14 L400,3 L425,16 L450,8 L475,19 L500,10 L525,15 L550,4 L575,12 L600,6 L625,18 L650,9 L675,16 L700,5 L725,14 L750,2 L775,18 L800,7 L825,15 L850,9 L875,17 L900,4 L925,13 L950,8 L975,19 L1000,10 L1000,20 Z" />
      </svg>
    </div>
  );
}

function TornEdgeBottom() {
  return (
    <div className="absolute bottom-0 left-0 w-full h-[15px] sm:h-[25px] overflow-hidden pointer-events-none translate-y-full z-30 drop-shadow-[0_5px_5px_rgba(0,0,0,0.15)]">
      <svg viewBox="0 0 1000 20" preserveAspectRatio="none" className="w-full h-full text-[#E5D4B8] fill-current">
        <path d="M0,0 L0,10 L25,2 L50,12 L75,5 L100,15 L125,8 L150,18 L175,2 L200,13 L225,4 L250,11 L275,1 L300,10 L325,3 L350,14 L375,6 L400,17 L425,4 L450,12 L475,1 L500,10 L525,5 L550,16 L575,8 L600,14 L625,2 L650,11 L675,4 L700,15 L725,6 L750,18 L775,2 L800,13 L825,5 L850,11 L875,3 L900,16 L925,7 L950,12 L975,1 L1000,10 L1000,0 Z" />
      </svg>
    </div>
  );
}

function SharedVintageBackground({ seed = 4, burnTopRight = false, burnBottomLeft = false }) {
  // Use seed to determine if we should show a blood stain
  const showBloodStain = seed % 3 === 0;
  
  return (
    <>
      {/* Subtle Document Surface Grain */}
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`shared-grain-${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed={seed} />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.9 0 0 0  0 0.8 0 0 0  0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#shared-grain-${seed})`} />
        </svg>
      </div>
      
      {/* Vignette matching Statement of Intent */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(139,69,19,0.15)] z-0" />

      {/* Optional Subtle Burn Marks matching Statement of Intent */}
      {burnTopRight && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(30,10,0,0.3)_0%,rgba(60,20,5,0.05)_40%,transparent_70%)] blur-xl pointer-events-none mix-blend-multiply -translate-y-1/4 translate-x-1/4 z-0" />
      )}
      {burnBottomLeft && (
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(20,5,0,0.35)_0%,transparent_60%)] blur-lg pointer-events-none mix-blend-multiply translate-y-1/4 -translate-x-1/4 z-0" />
      )}
      
      {/* Subtle Blood Stain */}
      {showBloodStain && (
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[radial-gradient(circle,rgba(110,20,10,0.15)_0%,rgba(110,20,10,0.03)_40%,transparent_70%)] blur-md pointer-events-none mix-blend-multiply z-0" />
      )}
    </>
  );
}

import { forwardRef } from "react";

const PaperBlock = forwardRef(({ children, seed, burnTopRight = false, burnBottomLeft = false, rotationClass = "", className = "" }: any, ref: any) => {
  return (
    <div ref={ref} className={`relative w-[92%] sm:w-[85%] mx-auto bg-[#E5D4B8] my-10 sm:my-14 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${rotationClass} ${className}`}>
      <SharedVintageBackground seed={seed} burnTopRight={burnTopRight} burnBottomLeft={burnBottomLeft} />
      {/* Removed overflow-hidden so content doesn't get cut off vertically */}
      <div className="relative z-10 flex flex-col px-6 sm:px-12 py-16 sm:py-24">
        {children}
      </div>
    </div>
  );
});

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
  // Update mappings for shorter scroll
  const draw = useTransform(scrollYProgress, [0.1, 0.4], [0, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const scaleY = useTransform(scrollYProgress, [0.7, 0.95], [1, 0.01]);
  const opacity = useTransform(scrollYProgress, [0.85, 1], [1, 0]);

  return (
    <PaperBlock ref={ref} seed={1} burnTopRight={true} rotationClass="rotate-[1deg]">
      <Link href="/projects/algorithm-laboratory" className="relative z-20 block group flex-shrink-0">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-6 sm:mb-8"
        >
          RECORD 01 / SELECTED WORK
        </motion.div>
        <motion.h3 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-10%" }}
          transition={{ delay: 0.1 }}
          className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-4 sm:mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
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

      {/* The Detailed Algorithm Visual */}
      <div className="w-full relative mt-16 flex flex-col items-center justify-center pointer-events-none min-h-[30vh]">
        <motion.div 
          style={{ scaleY, opacity }}
          className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-square flex items-center justify-center origin-bottom"
        >
          
          {/* Complex Archival Geometry Background */}
          <div className="absolute inset-2 border border-dashed border-[#3D2B1F]/20 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute inset-12 border border-[#3D2B1F]/10 rounded-full" />
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#3D2B1F]/10" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#3D2B1F]/10" />
          
          <svg viewBox="0 0 200 200" className="w-full h-full absolute inset-0 overflow-visible">
            
            {/* Complex sweeping traversal paths */}
            <motion.path 
              d="M 100,100 L 160,60 L 140,150 L 60,160 L 40,80 L 100,100 Z"
              fill="none" stroke="#5C3A21" strokeWidth="0.75"
              style={{ pathLength: draw }}
            />
            <motion.path 
              d="M 100,100 L 180,100 M 100,100 L 20,100 M 100,100 L 100,20 M 100,100 L 100,180"
              fill="none" stroke="#5C3A21" strokeWidth="0.3" strokeDasharray="2 4"
              style={{ pathLength: draw }}
            />
            <motion.path 
              d="M 40,80 L 100,20 L 160,60"
              fill="none" stroke="#5C3A21" strokeWidth="0.5" strokeDasharray="1 3"
              style={{ pathLength: draw }}
            />
            
            {/* Node plotting */}
            {[
              [100,100], [160,60], [140,150], [60,160], [40,80], [100,20], [180,100], [20,100], [100,180]
            ].map((pos, i) => (
              <motion.g key={i} style={{ opacity: nodeOpacity }}>
                <circle cx={pos[0]} cy={pos[1]} r="5" fill="#E5D4B8" stroke="#5C3A21" strokeWidth="1" />
                <circle cx={pos[0]} cy={pos[1]} r="1.5" fill="#5C3A21" />
              </motion.g>
            ))}
          </svg>
          
          {/* Readout Text */}
          <motion.div 
            style={{ opacity: nodeOpacity }} 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 font-mono text-[8px] text-[#5C3A21]/80 bg-[#E5D4B8] px-3 border border-[#3D2B1F]/10 py-1 tracking-widest shadow-sm"
          >
            TRAVERSAL O(N log N)
          </motion.div>
        </motion.div>
      </div>
    </PaperBlock>
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
  const slideY1 = useTransform(scrollYProgress, [0.1, 0.35], [40, 0]);
  const slideY2 = useTransform(scrollYProgress, [0.2, 0.45], [-40, 0]);
  const rot1 = useTransform(scrollYProgress, [0.1, 0.35], [-6, 0]);
  const rot2 = useTransform(scrollYProgress, [0.2, 0.45], [6, 0]);
  const docOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  return (
    <PaperBlock ref={ref} seed={2} burnBottomLeft={true} rotationClass="rotate-[-1deg]">
      <Link href="/projects/certiva" className="relative z-20 block group flex-shrink-0">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-6 sm:mb-8"
          >
            RECORD 02 / SELECTED WORK
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-4 sm:mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
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

        {/* The Detailed Certiva Visual */}
        <div className="flex-1 w-full relative mt-8 flex flex-col items-center justify-center pointer-events-none perspective-[1000px]">
          
          {/* Layer 1: The Template Background */}
          <motion.div 
            style={{ y: slideY1, rotateZ: rot1, rotateX: 10, opacity: docOpacity }}
            className="absolute w-[60%] max-w-[200px] aspect-[0.707] border-2 border-[#5C3A21]/20 bg-[#E8DCC4] shadow-[0_20px_40px_rgba(0,0,0,0.1)] flex flex-col p-5"
          >
            {/* Ornate border inside */}
            <div className="absolute inset-1.5 border border-dashed border-[#5C3A21]/15" />
            <div className="w-16 h-[1px] bg-[#5C3A21]/30 mx-auto mt-4 mb-8" />
            
            {/* Empty form lines */}
            <div className="w-full flex flex-col gap-4 items-center mb-auto relative z-10">
              <div className="w-3/4 h-[1px] bg-[#5C3A21]/15" />
              <div className="w-1/2 h-[1px] bg-[#5C3A21]/15" />
            </div>

            {/* Empty signatures */}
            <div className="flex justify-between mt-auto w-full px-2 relative z-10">
              <div className="w-10 h-[1px] bg-[#5C3A21]/20" />
              <div className="w-10 h-[1px] bg-[#5C3A21]/20" />
            </div>
            
            {/* Faint Seal outline */}
            <div className="absolute bottom-12 right-6 w-8 h-8 rounded-full border border-[#5C3A21]/10" />
          </motion.div>

          {/* Layer 2: The Data Overlay sliding in */}
          <motion.div 
            style={{ y: slideY2, rotateZ: rot2, rotateX: 10, opacity: docOpacity }}
            className="absolute w-[60%] max-w-[200px] aspect-[0.707] flex flex-col items-center p-5 z-10"
          >
            <div className="font-serif italic text-[#2A1C12] text-lg sm:text-xl mt-[2.75rem] mb-2 border-b border-[#2A1C12]/20 pb-1">
              Arunan Kavirajan
            </div>
            <div className="font-mono text-[6px] text-[#5C3A21] tracking-widest uppercase mb-16">
              PARTICIPANT ID: 8492-X
            </div>
            
            {/* Scanner line that sweeps down */}
            <motion.div 
              animate={{ y: [0, 180, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 right-0 top-8 h-[2px] bg-gradient-to-r from-transparent via-[#8A3A20]/40 to-transparent shadow-[0_2px_4px_rgba(138,58,32,0.2)]"
            />

            {/* Validation Stamp */}
            <motion.div 
              initial={{ scale: 2, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              viewport={{ once: false }}
              className="absolute bottom-[2.5rem] right-4 border-2 border-[#8A3A20]/60 text-[#8A3A20]/80 font-mono text-[8px] font-bold p-1 rotate-[-15deg] shadow-sm backdrop-blur-sm bg-[#E8DCC4]/50"
            >
              VALIDATED
            </motion.div>
          </motion.div>
        </div>
    </PaperBlock>
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
  const receiptHeight = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);
  const receiptOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const contentOpacity = useTransform(scrollYProgress, [0.4, 0.55], [0, 1]);

  return (
    <PaperBlock ref={ref} seed={3} burnTopRight={true} rotationClass="rotate-[0.5deg]">
      <Link href="/projects/android-billing-app" className="relative z-20 block group flex-shrink-0">
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            className="font-mono text-[9px] text-[#5C3A21]/60 tracking-[0.2em] mb-6 sm:mb-8"
          >
            RECORD 03 / SELECTED WORK
          </motion.div>
          <motion.h3 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-10%" }}
            transition={{ delay: 0.1 }}
            className="font-serif text-3xl sm:text-4xl text-[#2A1C12] mb-4 sm:mb-6 tracking-tight group-hover:text-[#5C3A21] transition-colors"
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

        {/* Vintage Archival Receipt Visual */}
        <div className="flex-1 w-full relative mt-8 flex flex-col items-center justify-start pointer-events-none">
          
          {/* Vintage Archival Clip / Folder edge */}
          <div className="w-[200px] h-3 bg-[#3D2B1F]/10 border-b border-[#3D2B1F]/20 relative z-20 shadow-[0_4px_10px_rgba(0,0,0,0.05)]" />
          
          {/* Ledger / Typewriter Slip */}
          <motion.div 
            style={{ height: receiptHeight, opacity: receiptOpacity }}
            className="w-[180px] bg-[#EAE0CD] shadow-[0_15px_30px_rgba(0,0,0,0.15)] border-x border-[#3D2B1F]/15 flex flex-col origin-top overflow-hidden relative -mt-1 z-10"
          >
            {/* Rough torn paper edge at the bottom */}
            <div className="absolute bottom-0 left-0 w-full h-1.5 bg-[linear-gradient(-45deg,transparent_33.33%,#E8DCC4_33.33%,#E8DCC4_66.66%,transparent_66.66%),linear-gradient(45deg,transparent_33.33%,#E8DCC4_33.33%,#E8DCC4_66.66%,transparent_66.66%)] bg-[length:6px_12px] opacity-20" />

            <div className="p-4 flex flex-col gap-3 pb-8">
              
              {/* Typewriter Header */}
              <div className="flex flex-col mb-1 border-b border-[#3D2B1F]/30 pb-2">
                <div className="font-mono text-[8px] font-bold text-[#3D2B1F] tracking-wider mb-1">CASH TALLY / RECORD</div>
                <div className="font-mono text-[6px] text-[#3D2B1F]/60">ENTRY 042 • SEC. 1</div>
              </div>
              
              <motion.div style={{ opacity: contentOpacity }} className="flex flex-col gap-2 mt-2">
                {[...Array(4)].map((_, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: -5 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex justify-between font-mono text-[7px] text-[#3D2B1F]/80 items-end"
                  >
                    <span className="opacity-90 tracking-widest">{['GN', 'DR', 'ML', 'GN'][i]}</span>
                    <div className="flex-1 mx-2 mb-1 border-b border-dotted border-[#3D2B1F]/30" />
                    <span className="font-bold">4.50</span>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                style={{ opacity: contentOpacity }}
                className="mt-2 pt-2 border-t-2 border-[#3D2B1F]/20 flex justify-between font-mono text-[8px] font-bold text-[#3D2B1F]"
              >
                <span>SUM</span>
                <span>18.00</span>
              </motion.div>

              {/* Vintage Ink Stamp */}
              <motion.div 
                style={{ opacity: contentOpacity }}
                className="mt-6 flex justify-center"
              >
                <div className="w-12 h-12 border-2 border-[#8A3A20]/40 rounded-full flex items-center justify-center rotate-[-12deg] opacity-70 mix-blend-multiply">
                   <div className="border border-[#8A3A20]/40 rounded-full w-10 h-10 flex items-center justify-center">
                     <span className="font-serif text-[6px] text-[#8A3A20]/60 font-bold uppercase tracking-widest">PAID</span>
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
    </PaperBlock>
  );
}

export default function MobileRecordedActivities() {
  return (
    <section className="relative w-full z-20 bg-[#0c0805] py-12 overflow-x-hidden">
      
      {/* Intro Header */}
      <PaperBlock seed={4} rotationClass="rotate-[-1deg]">
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
      </PaperBlock>

      {/* The Parallax Project Pages */}
      <ProjectAlgo />
      <ProjectCertiva />
      <ProjectBilling />

      {/* Outro Archival Link */}
      <PaperBlock seed={5} rotationClass="rotate-[1deg]">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-mono text-[9px] tracking-[0.3em] text-[#5C3A21]/70 uppercase mb-4"
        >
          ALL RECORDED ACTIVITY
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
        <Link href="/projects" passHref legacyBehavior>
          <motion.a 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-mono text-[10px] tracking-widest text-[#2A1C12] border border-[#3D2B1F]/30 px-6 py-3 uppercase hover:bg-[#3D2B1F]/5 transition-colors inline-block"
          >
            [ ALL RECORDED ACTIVITY ↗ ]
          </motion.a>
        </Link>
      </PaperBlock>

    </section>
  );
}
