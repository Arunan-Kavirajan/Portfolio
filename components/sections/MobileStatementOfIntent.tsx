"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MobileStatementOfIntent() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track vertical scroll across a 600vh container to drive the horizontal sequence
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Map vertical scroll progress to horizontal translation
  // It moves from 0% to approximately -85% to slide all panels through the viewport
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-83%"]);

  return (
    <section ref={containerRef} className="h-[600vh] bg-[#120B07] relative z-20">
      
      {/* Sticky container holds the viewport and horizontal scrolling document */}
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden flex flex-col justify-center items-center">
        
        {/* Background Desk Dust/Grain */}
        <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <filter id="desk-dust-statement">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" seed="17" />
              <feColorMatrix type="saturate" values="0" />
              <feComponentTransfer><feFuncA type="linear" slope="0.5" /></feComponentTransfer>
            </filter>
            <rect width="100%" height="100%" filter="url(#desk-dust-statement)" />
          </svg>
        </div>

        {/* The Continuous Horizontal Document Surface */}
        <motion.div 
          style={{ x }}
          className="flex h-[75svh] sm:h-[70svh] items-center px-[15vw] sm:px-[20vw] gap-[20vw] sm:gap-[25vw] bg-[#E5D4B8] shadow-[0_30px_60px_rgba(0,0,0,0.6),inset_0_0_80px_rgba(139,69,19,0.1)] relative"
        >
          {/* Subtle Document Surface Grain */}
          <div className="absolute inset-0 pointer-events-none mix-blend-multiply opacity-30">
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
              <filter id="document-grain">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="4" seed="4" />
                <feColorMatrix type="matrix" values="1 0 0 0 0  0 0.9 0 0 0  0 0.8 0 0 0  0 0 0 0.5 0" />
              </filter>
              <rect width="100%" height="100%" filter="url(#document-grain)" />
            </svg>
          </div>

          {/* Faint Horizontal Registration Lines across the whole document */}
          <div className="absolute top-[8%] bottom-[8%] left-0 w-full border-y border-[#3D2B1F]/10 pointer-events-none" />
          
          {/* OPENING */}
          <div className="w-[75vw] sm:w-[60vw] flex-shrink-0 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-mono text-[9px] tracking-widest text-[#5C3A21]/70 uppercase mb-10 pb-6 border-b border-[#3D2B1F]/15 flex flex-col gap-4"
            >
              <span className="text-[11px] font-bold tracking-[0.25em] text-[#2A1C12]">STATEMENT OF INTENT</span>
              
              <div className="grid grid-cols-2 gap-y-4">
                <div>
                  <span className="opacity-50 block mb-1">SUBMITTED BY</span>
                  ARUNAN KAVIRAJAN
                </div>
                <div>
                  <span className="opacity-50 block mb-1">FILE NO.</span>
                  001
                </div>
                <div>
                  <span className="opacity-50 block mb-1">YEAR</span>
                  2026
                </div>
                <div>
                  <span className="opacity-50 block mb-1">RECORD TYPE</span>
                  PERSONAL STATEMENT
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-2xl sm:text-3xl text-[#2A1C12] leading-relaxed"
            >
              I don&apos;t have everything figured out.<br/>
              I don&apos;t think I want to.<br/><br/>
              What I do have is a direction.
            </motion.p>
          </div>

          {/* ENTRY 01 */}
          <div className="w-[75vw] sm:w-[50vw] flex-shrink-0 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="font-mono text-[9px] tracking-[0.2em] text-[#5C3A21]/60 mb-8 border-l border-[#3D2B1F]/20 pl-4"
            >
              01 / WHAT I&apos;M TRYING TO UNDERSTAND
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-lg sm:text-xl text-[#2A1C12]/90 leading-relaxed"
            >
              I want to understand computers beyond the tools built on top of them.<br/><br/>
              The systems underneath.<br/>
              The reasons they fail.<br/>
              The ways they can be made more secure.<br/>
              The ideas that make them work in the first place.<br/><br/>
              That curiosity keeps pulling me deeper into computer science, cybersecurity, and AI.
            </motion.p>
          </div>

          {/* ENTRY 02 */}
          <div className="w-[75vw] sm:w-[50vw] flex-shrink-0 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="font-mono text-[9px] tracking-[0.2em] text-[#5C3A21]/60 mb-8 border-l border-[#3D2B1F]/20 pl-4"
            >
              02 / WHAT I&apos;M TRYING TO BUILD
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-lg sm:text-xl text-[#2A1C12]/90 leading-relaxed"
            >
              Learning isn&apos;t enough for me if it never leaves my head.<br/><br/>
              I want to keep turning ideas into software, experiments, and eventually things people can actually use.<br/><br/>
              Some will work.<br/>
              Some won&apos;t.<br/><br/>
              I want to make enough of both to learn the difference.
            </motion.p>
            {/* Archival annotation mark */}
            <motion.div 
              initial={{ opacity: 0, rotate: 10 }}
              whileInView={{ opacity: 1, rotate: -2 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-0 right-0 font-mono text-[7px] text-[#3D2B1F]/40 border border-[#3D2B1F]/20 p-1"
            >
              OBJ-A
            </motion.div>
          </div>

          {/* ENTRY 03 */}
          <div className="w-[75vw] sm:w-[50vw] flex-shrink-0 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="font-mono text-[9px] tracking-[0.2em] text-[#5C3A21]/60 mb-8 border-l border-[#3D2B1F]/20 pl-4"
            >
              03 / THE QUESTIONS
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-lg sm:text-xl text-[#2A1C12]/90 leading-relaxed"
            >
              I&apos;m increasingly drawn toward questions that don&apos;t have an obvious answer.<br/><br/>
              The kind that require reading, experimenting, breaking things, starting again, and sometimes admitting that I was wrong.<br/><br/>
              That&apos;s the side of technology I want to spend more time around.
            </motion.p>
          </div>

          {/* ENTRY 04 */}
          <div className="w-[75vw] sm:w-[50vw] flex-shrink-0 flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              className="font-mono text-[9px] tracking-[0.2em] text-[#5C3A21]/60 mb-8 border-l border-[#3D2B1F]/20 pl-4"
            >
              04 / WHERE THIS LEADS
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", x: 20 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="font-serif text-lg sm:text-xl text-[#2A1C12]/90 leading-relaxed"
            >
              Eventually, I want the freedom to choose the problems I work on.<br/><br/>
              To build things of my own.<br/>
              To pursue research when a question is worth pursuing.<br/>
              And to have enough depth to contribute something that wasn&apos;t there before.
            </motion.p>
            {/* Archival annotation mark */}
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute bottom-0 right-10 font-mono text-[7px] text-[#3D2B1F]/40 border-b border-[#3D2B1F]/30 pb-1"
            >
              REF: CONTINUATION
            </motion.div>
          </div>

          {/* FINAL CLOSING */}
          <div className="w-[85vw] sm:w-[60vw] flex-shrink-0 flex flex-col justify-center items-center text-center pr-[15vw] relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="font-mono text-[9px] tracking-[0.3em] text-[#5C3A21]/60 mb-12 uppercase border border-[#3D2B1F]/20 px-4 py-2"
            >
              End of Statement
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, filter: "blur(4px)", y: 10 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
              className="font-serif text-2xl sm:text-3xl text-[#2A1C12] leading-relaxed"
            >
              I know the direction.<br/><br/>
              <span className="italic">The destination can change.</span>
            </motion.p>
          </div>

        </motion.div>

        {/* Subtle foreground vignetting/shadows on the desk to frame the document */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_120px_rgba(0,0,0,0.9)] z-30" />
      </div>
    </section>
  );
}
