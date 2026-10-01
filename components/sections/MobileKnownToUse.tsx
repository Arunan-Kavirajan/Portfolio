"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { techStackData } from "@/lib/data/techStack";

export default function MobileKnownToUse() {
  const ref = useRef(null);
  
  // Create a tall section so the user scrolls through the cataloguing process
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  // Step 1: Document enters
  const docOpacity = useTransform(scrollYProgress, [0, 0.1], [0, 1]);
  const docY = useTransform(scrollYProgress, [0, 0.1], [50, 0]);

  // Step 2 & 3: Header
  const headerOpacity = useTransform(scrollYProgress, [0.1, 0.15], [0, 1]);
  const headerY = useTransform(scrollYProgress, [0.1, 0.15], [10, 0]);
  
  // Step 4: Line draws
  const lineWidth = useTransform(scrollYProgress, [0.15, 0.2], ["0%", "100%"]);

  // Step 5-11: Categories reveal
  const c1Op = useTransform(scrollYProgress, [0.2, 0.3], [0, 1]);
  const c1Y = useTransform(scrollYProgress, [0.2, 0.3], [10, 0]);

  const c2Op = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const c2Y = useTransform(scrollYProgress, [0.35, 0.45], [10, 0]);

  const c3Op = useTransform(scrollYProgress, [0.5, 0.6], [0, 1]);
  const c3Y = useTransform(scrollYProgress, [0.5, 0.6], [10, 0]);

  const c4Op = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  const c4Y = useTransform(scrollYProgress, [0.65, 0.75], [10, 0]);

  const c5Op = useTransform(scrollYProgress, [0.8, 0.9], [0, 1]);
  const c5Y = useTransform(scrollYProgress, [0.8, 0.9], [10, 0]);

  return (
    <div ref={ref} className="relative h-[250vh] bg-[#D3C7B5] z-10 border-t border-[#3D2B1F]/10">
       <div className="sticky top-0 h-[100svh] flex flex-col pt-20 sm:pt-24 pb-12 px-6 sm:px-8 overflow-hidden">
         
         {/* Environmental Noise */}
         <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-25">
            <svg width="100%" height="100%">
              <filter id="noise-ktu"><feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" /></filter>
              <rect width="100%" height="100%" filter="url(#noise-ktu)" />
            </svg>
         </div>

         {/* The Archival Sheet */}
         <motion.div 
           style={{ opacity: docOpacity, y: docY }}
           className="relative flex-1 w-full max-w-[400px] mx-auto bg-[#EAE0CD] shadow-[0_20px_40px_rgba(0,0,0,0.15)] border-x border-b border-t-4 border-t-[#3D2B1F] border-[#5C3A21]/15 flex flex-col overflow-hidden"
         >
           {/* Faint vertical registration line on the left */}
           <div className="absolute left-6 sm:left-8 top-0 bottom-0 w-[1px] bg-[#5C3A21]/10 z-0" />

           {/* Faint edge measurement marks */}
           <div className="absolute left-0 top-1/4 bottom-1/4 w-2 flex flex-col justify-between py-10 opacity-30 z-0">
             {[...Array(6)].map((_, i) => <div key={i} className="w-1.5 h-[1px] bg-[#5C3A21]" />)}
           </div>

           {/* Sheet Content Wrapper */}
           <div className="flex-1 w-full h-full pt-8 px-8 pb-4 flex flex-col relative z-10">
             
             {/* Header */}
             <motion.div style={{ opacity: headerOpacity, y: headerY }} className="flex flex-col ml-4">
               <div className="font-mono text-[8px] text-[#5C3A21]/50 tracking-[0.25em] mb-2 font-bold uppercase">
                 04 / Technical Record
               </div>
               <h2 className="font-serif text-3xl sm:text-4xl text-[#2A1C12] tracking-tight mb-2">
                 KNOWN TO USE
               </h2>
               <p className="font-serif italic text-[#5C3A21]/80 text-[13px] mb-4">
                 Tools observed across the subject's work.
               </p>
             </motion.div>

             <motion.div style={{ width: lineWidth }} className="h-[1px] bg-[#5C3A21]/20 mb-6 ml-4" />

             {/* Categories - Scrollable inside the sheet if needed */}
             <div className="flex-1 overflow-y-auto hide-scrollbar pb-6 ml-4">
               
               <div className="flex flex-col gap-7">
                 
                 <CategoryBlock 
                   title="LANGUAGES" 
                   code="L / 01" 
                   items={techStackData.languages} 
                   opacity={c1Op} 
                   y={c1Y}
                 />

                 <CategoryBlock 
                   title="SOFTWARE" 
                   code="S / 02" 
                   items={techStackData.software} 
                   opacity={c2Op} 
                   y={c2Y}
                 />

                 <div className="grid grid-cols-2 gap-4">
                   <CategoryBlock 
                     title="BACKEND & DATA" 
                     code="D / 03" 
                     items={techStackData.backend} 
                     opacity={c3Op} 
                     y={c3Y}
                   />
                   <CategoryBlock 
                     title="TOOLS" 
                     code="T / 04" 
                     items={techStackData.tools} 
                     opacity={c4Op} 
                     y={c4Y}
                   />
                 </div>

                 {/* Exploring - Visually distinct */}
                 <motion.div style={{ opacity: c5Op, y: c5Y }} className="mt-4 pt-5 relative">
                   <div className="absolute top-0 left-0 right-12 h-[1px] bg-[#5C3A21]/15 border-b border-dashed border-[#5C3A21]/15" />
                   
                   <div className="absolute -left-6 top-6 -rotate-90 origin-top-right font-mono text-[5px] text-[#5C3A21]/30 tracking-widest uppercase whitespace-nowrap">
                     X / 05
                   </div>
                   
                   <h3 className="font-serif italic text-[#2A1C12]/80 text-[13px] mb-3 mt-2 flex items-center gap-3">
                     Exploring
                     <span className="flex-1 h-[1px] bg-[#5C3A21]/10 mr-4"></span>
                   </h3>
                   <div className="flex flex-wrap gap-x-2 gap-y-2">
                     {techStackData.exploring.map(tech => (
                       <div key={tech} className="font-mono text-[8px] text-[#3D2B1F]/70 tracking-widest uppercase border border-[#5C3A21]/20 px-2 py-1 bg-[#5C3A21]/[0.02]">
                         {tech}
                       </div>
                     ))}
                   </div>
                 </motion.div>

               </div>

             </div>
           </div>
         </motion.div>
       </div>
    </div>
  );
}

function CategoryBlock({ title, code, items, opacity, y }: any) {
  return (
    <motion.div style={{ opacity, y }} className="flex flex-col relative">
       {/* Archival category code */}
       <div className="absolute -left-6 top-0 -rotate-90 origin-top-right font-mono text-[5px] text-[#5C3A21]/30 tracking-widest uppercase whitespace-nowrap">
         {code}
       </div>
       
       <h3 className="font-mono text-[9px] text-[#3D2B1F]/80 tracking-[0.2em] mb-2 uppercase font-bold">
         {title}
       </h3>
       
       <div className="flex flex-col gap-1 pr-6">
         {items.map((tech: string) => (
           <div 
             key={tech} 
             className="relative group flex items-end justify-between py-1 border-b border-[#5C3A21]/5 hover:border-[#5C3A21]/30 transition-colors"
           >
             <span className="font-sans text-[#2A1C12] text-[13px] font-medium tracking-tight">
               {tech}
             </span>
             {/* Small hover evidence tag */}
             <span className="font-mono text-[5px] text-[#8A3A20] opacity-0 group-hover:opacity-100 transition-opacity tracking-widest uppercase translate-y-[-2px]">
               IN USE
             </span>
           </div>
         ))}
       </div>
    </motion.div>
  );
}
