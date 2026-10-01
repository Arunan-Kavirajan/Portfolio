"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { forwardRef } from "react";

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
  return (
    <>
      <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30 z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <filter id={`shared-grain-${seed}`}>
            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed={seed} />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.9 0 0 0  0 0.8 0 0 0  0 0 0 0.5 0" />
          </filter>
          <rect width="100%" height="100%" filter={`url(#shared-grain-${seed})`} />
        </svg>
      </div>
      
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_80px_rgba(139,69,19,0.15)] z-0" />

      {burnTopRight && (
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(30,10,0,0.3)_0%,rgba(60,20,5,0.05)_40%,transparent_70%)] blur-xl pointer-events-none mix-blend-multiply -translate-y-1/4 translate-x-1/4 z-0" />
      )}
      {burnBottomLeft && (
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-[radial-gradient(circle,rgba(20,5,0,0.35)_0%,transparent_60%)] blur-lg pointer-events-none mix-blend-multiply translate-y-1/4 -translate-x-1/4 z-0" />
      )}
    </>
  );
}

const PaperBlock = forwardRef(({ children, seed, burnTopRight = false, burnBottomLeft = false, className = "" }: any, ref: any) => {
  return (
    <div ref={ref} className={`relative w-[94%] mx-auto bg-[#E5D4B8] my-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)] ${className}`}>
      <TornEdgeTop />
      <SharedVintageBackground seed={seed} burnTopRight={burnTopRight} burnBottomLeft={burnBottomLeft} />
      <div className="relative z-10 flex flex-col pt-24 pb-12 overflow-hidden">
        {children}
      </div>
      <TornEdgeBottom />
    </div>
  );
});

export default function MobileKnownToUse() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Scanner line position: moves from 10% to 90% of the container height
  const scannerY = useTransform(scrollYProgress, [0.1, 0.8], ["10%", "90%"]);
  // Scanner opacity: fades in at 0.1, stays, fades out at 0.8
  const scannerOpacity = useTransform(scrollYProgress, [0.05, 0.1, 0.8, 0.85], [0, 1, 1, 0]);

  // Labels
  const observedOpacity = useTransform(scrollYProgress, [0.1, 0.2, 0.7, 0.8], [0, 1, 1, 0]);
  const recordedOpacity = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);

  return (
    <section className="bg-[#0c0805] w-full py-16">
      <PaperBlock ref={ref} seed={6} burnBottomLeft={true}>

         {/* Header */}
         <div className="flex flex-col items-center text-center px-6 mb-12 relative z-20">
           <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C12] tracking-tight mb-3">
             KNOWN TO USE
           </h2>
           <p className="font-sans font-light text-[#5C3A21]/80 text-[13px] tracking-wide">
             Tools observed across the subject's work.
           </p>
         </div>

         {/* Editorial Scanner Guide */}
         <motion.div 
           style={{ top: scannerY, opacity: scannerOpacity }}
           className="absolute left-0 right-0 h-[1px] bg-[#8A3A20]/30 z-30 pointer-events-none"
         >
           <div className="absolute -top-[3px] left-4 w-1 h-[7px] border-l border-[#8A3A20]/50" />
           <div className="absolute -top-[3px] right-4 w-1 h-[7px] border-r border-[#8A3A20]/50" />
         </motion.div>

         {/* Labels */}
         <motion.div 
           style={{ opacity: observedOpacity }}
           className="absolute left-6 top-48 font-mono text-[7px] text-[#5C3A21]/50 tracking-[0.2em] uppercase origin-left rotate-[-90deg] translate-y-8"
         >
           STATE 01 / OBSERVED
         </motion.div>

         <motion.div 
           style={{ opacity: recordedOpacity }}
           className="absolute left-6 top-48 font-mono text-[7px] text-[#8A3A20]/70 tracking-[0.2em] uppercase origin-left rotate-[-90deg] translate-y-8"
         >
           STATE 03 / RECORDED
         </motion.div>

         {/* Typographic Field */}
         <div className="flex-1 w-full relative z-20 flex flex-col justify-around px-8 sm:px-12 pb-12">
           
           {/* Row 1: Languages */}
           <div className="flex w-full justify-between items-end">
             <TechWord name="C" align="left" p={scrollYProgress} start={0.15} end={0.25} />
             <TechWord name="Python" align="center" p={scrollYProgress} start={0.18} end={0.28} />
             <TechWord name="Bash" align="right" p={scrollYProgress} start={0.2} end={0.3} />
           </div>

           {/* Row 2 */}
           <div className="flex w-full justify-around items-end mt-4">
             <TechWord name="JavaScript" align="center" p={scrollYProgress} start={0.25} end={0.35} />
             <TechWord name="TypeScript" align="center" p={scrollYProgress} start={0.3} end={0.4} />
           </div>

           {/* Thin Guide Line */}
           <motion.div 
             style={{ 
               opacity: useTransform(scrollYProgress, [0.35, 0.45, 0.55], [0, 1, 0]),
               scaleX: useTransform(scrollYProgress, [0.35, 0.45], [0, 1])
             }}
             className="w-1/2 mx-auto h-[1px] bg-[#5C3A21]/10 mt-6 origin-center"
           />

           {/* Row 3: Software */}
           <div className="flex w-full justify-between items-end mt-6">
             <TechWord name="React" align="left" p={scrollYProgress} start={0.4} end={0.5} />
             <TechWord name="Next.js" align="center" p={scrollYProgress} start={0.42} end={0.52} />
             <TechWord name="Node.js" align="right" p={scrollYProgress} start={0.45} end={0.55} />
           </div>

           {/* Row 4 */}
           <div className="flex w-full justify-evenly items-end mt-4">
             <TechWord name="Flutter" align="center" p={scrollYProgress} start={0.48} end={0.58} />
             <TechWord name="Tailwind" align="center" p={scrollYProgress} start={0.5} end={0.6} />
           </div>

           {/* Row 5: Backend & Data */}
           <div className="flex w-full justify-between items-end mt-8">
             <TechWord name="Supabase" align="left" p={scrollYProgress} start={0.6} end={0.7} />
             <TechWord name="SQLite" align="center" p={scrollYProgress} start={0.62} end={0.72} />
             <TechWord name="Firebase" align="right" p={scrollYProgress} start={0.65} end={0.75} />
           </div>

           {/* Row 6: Tools */}
           <div className="flex w-full justify-between items-end mt-8 px-4">
             <TechWord name="Git" align="left" p={scrollYProgress} start={0.7} end={0.8} />
             <TechWord name="Linux" align="center" p={scrollYProgress} start={0.72} end={0.82} />
             <TechWord name="GitHub" align="right" p={scrollYProgress} start={0.75} end={0.85} />
           </div>

           <div className="flex w-full justify-around items-end mt-4">
             <TechWord name="VS Code" align="center" p={scrollYProgress} start={0.78} end={0.88} />
             <TechWord name="Vercel" align="center" p={scrollYProgress} start={0.8} end={0.9} />
           </div>

           {/* Row 7: Exploring */}
           <motion.div 
             style={{ opacity: recordedOpacity }}
             className="flex flex-col items-center mt-12 pt-8 border-t border-dashed border-[#5C3A21]/15"
           >
             <div className="font-serif italic text-[11px] text-[#5C3A21]/50 mb-3">Exploring</div>
             <div className="flex w-full justify-center gap-4 flex-wrap">
               {["Cybersecurity", "AI / ML", "AI Agents", "Cloud"].map((t) => (
                 <span key={t} className="font-mono text-[9px] text-[#5C3A21]/60 tracking-widest uppercase">
                   {t}
                 </span>
               ))}
             </div>
           </motion.div>

          </div>
      </PaperBlock>
    </section>
  );
}

function TechWord({ name, p, start, end, align }: { name: string, p: any, start: number, end: number, align: string }) {
  // subtle shift towards alignment
  const yShift = align === "left" ? 12 : align === "right" ? -12 : 8;
  const y = useTransform(p, [0, start, end, 1], [yShift, yShift, 0, 0]);
  
  const xShift = align === "left" ? -8 : align === "right" ? 8 : 0;
  const x = useTransform(p, [0, start, end, 1], [xShift, xShift, 0, 0]);

  const ls = useTransform(p, [0, start, end, 1], ["0.15em", "0.15em", "0.05em", "0.05em"]);
  
  // Opacity: starts dim (0.3), goes to full (1) when scanner hits, settles at medium (0.6)
  const mid = (start + end) / 2;
  const opacity = useTransform(
    p, 
    [0, start, mid, end, 1], 
    [0.3, 0.3, 1, 0.7, 0.7]
  );

  const blur = useTransform(
    p,
    [0, start, mid, end, 1],
    ["blur(1px)", "blur(1px)", "blur(0px)", "blur(0px)", "blur(0px)"]
  );

  return (
    <motion.span 
      style={{ y, x, letterSpacing: ls, opacity, filter: blur }} 
      className="font-serif text-base sm:text-lg text-[#2A1C12] uppercase block whitespace-nowrap"
    >
      {name}
    </motion.span>
  );
}
