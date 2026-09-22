"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

// 1. HERO
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  
  const yTitle = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const ySubtitle = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  const imgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.4, 0.8]);
  const imgClip = useTransform(
    scrollYProgress, 
    [0, 0.8], 
    ["polygon(0% 35%, 100% 35%, 100% 65%, 0% 65%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
  );

  return (
    <section ref={ref} className="h-[120vh] w-full relative flex items-start justify-center overflow-hidden pt-40">
      
      <motion.div 
        className="absolute z-0 w-full max-w-[500px] aspect-[3/4] top-[15vh]"
        style={{ y: yImage, opacity: imgOpacity, clipPath: imgClip }}
      >
        <Image 
          src="/profile_new.jpg" 
          alt="Arunan" 
          fill 
          className="object-cover grayscale mix-blend-screen"
          priority
        />
        {/* Subtle overlay gradient to merge it into background */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E12] via-transparent to-[#0B0E12] opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E12] via-transparent to-[#0B0E12] opacity-80" />
      </motion.div>
      
      <div className="z-10 text-center mix-blend-difference w-full flex flex-col items-center pointer-events-none mt-20">
        <motion.h1 
          className="font-serif text-[18vw] leading-none tracking-tighter text-[#E8EDF2]"
          style={{ y: yTitle }}
        >
          ARUNAN
        </motion.h1>
        <motion.div 
          className="font-mono text-[9px] md:text-xs tracking-[0.4em] text-[#36D9E6] mt-8 uppercase"
          style={{ y: ySubtitle }}
        >
          Software Development · Cybersecurity · AI/ML
        </motion.div>
      </div>
      
    </section>
  );
}

// 2. CURIOUS
function CuriousSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  const w1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [0, 1, 0]);
  const w2 = useTransform(scrollYProgress, [0.2, 0.35, 0.45], [0, 1, 0]);
  const w3 = useTransform(scrollYProgress, [0.4, 0.55, 0.65], [0, 1, 0]);
  const w4 = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [0, 1, 0]);
  const pOp = useTransform(scrollYProgress, [0.8, 0.9, 1], [0, 1, 1]);
  const pY = useTransform(scrollYProgress, [0.8, 1], [50, 0]);
  
  const y1 = useTransform(scrollYProgress, [0, 0.25], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.45], [100, -100]);
  const y3 = useTransform(scrollYProgress, [0.4, 0.65], [100, -100]);
  const y4 = useTransform(scrollYProgress, [0.6, 0.85], [100, -100]);
  
  const letterSpacing1 = useTransform(scrollYProgress, [0, 0.25], ["-0.05em", "0.2em"]);
  
  return (
    <section ref={ref} className="h-[350vh] relative z-20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <motion.div className="absolute font-serif text-5xl md:text-8xl lg:text-9xl text-[#E8EDF2] uppercase" style={{ opacity: w1, y: y1, letterSpacing: letterSpacing1 }}>BUILDING</motion.div>
        <motion.div className="absolute font-serif text-5xl md:text-8xl lg:text-9xl text-[#E8EDF2] uppercase" style={{ opacity: w2, y: y2 }}>BREAKING</motion.div>
        <motion.div className="absolute font-serif text-4xl md:text-7xl lg:text-8xl text-[#E8EDF2] uppercase" style={{ opacity: w3, y: y3 }}>UNDERSTANDING</motion.div>
        <motion.div className="absolute font-serif text-5xl md:text-8xl lg:text-9xl text-[#36D9E6] uppercase" style={{ opacity: w4, y: y4 }}>REBUILDING</motion.div>
        
        <motion.div 
          className="absolute max-w-2xl text-center px-6"
          style={{ opacity: pOp, y: pY }}
        >
          <p className="font-sans text-xl md:text-3xl leading-relaxed text-[#69737D] font-light">
            My curiosity lies at the intersection of <span className="text-[#E8EDF2]">software architecture</span>, <span className="text-[#36D9E6]">security</span>, and <span className="text-[#E8EDF2]">intelligent systems</span>. I am obsessed with understanding how complex things work—and how they fail.
          </p>
        </motion.div>
        
      </div>
    </section>
  );
}

// 3. MIND VISUAL
function MindVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.2"] });
  
  // Spring physics for smooth drawing
  const pathLength = useSpring(useTransform(scrollYProgress, [0, 0.5], [0, 1]), { stiffness: 40, damping: 20 });
  const nodeOp = useTransform(scrollYProgress, [0.3, 0.6], [0, 1]);

  const floatingTransition = { repeat: Infinity, duration: 6, repeatType: "mirror" as const, ease: "easeInOut" };

  return (
    <section ref={ref} className="h-[120vh] w-full relative flex items-center justify-center border-t border-[#69737D]/20 bg-[#0B0E12]">
      <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] absolute top-16 md:top-24 uppercase">The Topology of Interest</div>
      
      <svg viewBox="0 0 800 600" className="w-full h-full max-w-4xl opacity-80 overflow-visible">
        
        {/* Generative Paths */}
        <motion.path d="M 400 300 Q 200 150 150 200" fill="none" stroke="#69737D" strokeWidth="0.5" style={{ pathLength }} />
        <motion.path d="M 400 300 Q 600 150 650 250" fill="none" stroke="#69737D" strokeWidth="0.5" style={{ pathLength }} />
        <motion.path d="M 400 300 Q 250 450 200 400" fill="none" stroke="#69737D" strokeWidth="0.5" style={{ pathLength }} />
        <motion.path d="M 400 300 Q 550 500 600 400" fill="none" stroke="#69737D" strokeWidth="0.5" style={{ pathLength }} />
        <motion.path d="M 400 300 Q 450 100 400 100" fill="none" stroke="#69737D" strokeWidth="0.5" style={{ pathLength }} />
        <motion.path d="M 150 200 Q 250 250 400 100" fill="none" stroke="#69737D" strokeWidth="0.5" opacity="0.3" style={{ pathLength }} />
        <motion.path d="M 650 250 Q 550 350 600 400" fill="none" stroke="#69737D" strokeWidth="0.5" opacity="0.3" style={{ pathLength }} />
        
        {/* Nodes */}
        <motion.g style={{ opacity: nodeOp }}>
          {/* CORE */}
          <motion.g animate={{ y: [0, -15, 0] }} transition={floatingTransition}>
            <circle cx="400" cy="300" r="3" fill="#E8EDF2" />
            <circle cx="400" cy="300" r="24" fill="none" stroke="#36D9E6" strokeWidth="0.5" opacity="0.5" strokeDasharray="2 4"/>
            <circle cx="400" cy="300" r="40" fill="none" stroke="#69737D" strokeWidth="0.5" opacity="0.1"/>
            <text x="400" y="340" fill="#E8EDF2" fontSize="10" fontFamily="sans-serif" letterSpacing="3" textAnchor="middle">SOFTWARE</text>
          </motion.g>

          {/* SECONDARY NODES */}
          <motion.g animate={{ y: [0, 10, 0] }} transition={{ ...floatingTransition, delay: 1 }}>
            <circle cx="150" cy="200" r="2" fill="#69737D" />
            <text x="150" y="220" fill="#69737D" fontSize="8" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">SECURITY</text>
          </motion.g>

          <motion.g animate={{ y: [0, -12, 0] }} transition={{ ...floatingTransition, delay: 2 }}>
            <circle cx="650" cy="250" r="2" fill="#69737D" />
            <text x="650" y="270" fill="#69737D" fontSize="8" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">AI / ML</text>
          </motion.g>

          <motion.g animate={{ y: [0, 8, 0] }} transition={{ ...floatingTransition, delay: 0.5 }}>
            <circle cx="200" cy="400" r="2" fill="#69737D" />
            <text x="200" y="420" fill="#69737D" fontSize="8" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">SYSTEMS</text>
          </motion.g>

          <motion.g animate={{ y: [0, -8, 0] }} transition={{ ...floatingTransition, delay: 1.5 }}>
            <circle cx="600" cy="400" r="2" fill="#69737D" />
            <text x="600" y="420" fill="#69737D" fontSize="8" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">EXPERIMENTATION</text>
          </motion.g>

          <motion.g animate={{ y: [0, 12, 0] }} transition={{ ...floatingTransition, delay: 2.5 }}>
            <circle cx="400" cy="100" r="2" fill="#69737D" />
            <text x="400" y="85" fill="#69737D" fontSize="8" fontFamily="sans-serif" letterSpacing="2" textAnchor="middle">BUILDING</text>
          </motion.g>
        </motion.g>
      </svg>
    </section>
  );
}

// 4. WHAT I BUILD
function WhatIBuild() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // P1: 0 -> 0.4, P2: 0.5 -> 1.0
  const p1Op = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.1, 0.4, 0.5], [100, 0, 0, -100]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1.05]);

  const p2Op = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 1], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.5, 0.6, 0.9, 1], [100, 0, 0, -100]);
  const p2Scale = useTransform(scrollYProgress, [0.5, 1], [0.9, 1.05]);

  return (
    <section ref={ref} className="h-[250vh] relative border-t border-[#69737D]/20 z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden bg-[#0B0E12]">
        <div className="absolute top-16 md:top-24 font-mono text-[9px] text-[#69737D] tracking-[0.3em] uppercase">What I Build</div>
        
        {/* Project 1 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style={{ opacity: p1Op, y: p1Y, scale: p1Scale }}>
          <h2 className="font-serif text-7xl md:text-9xl text-[#E8EDF2] mb-6 tracking-tighter">KODA</h2>
          <p className="font-sans text-sm md:text-lg text-[#69737D] max-w-lg mb-10 leading-relaxed font-light">
            An autonomous agentic system for understanding unfamiliar codebases. Mapping complex logic into a visual space.
          </p>
          <div className="font-mono text-[10px] md:text-xs text-[#36D9E6] tracking-widest uppercase">Next.js · TypeScript · AI</div>
        </motion.div>

        {/* Project 2 */}
        <motion.div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 pointer-events-none" style={{ opacity: p2Op, y: p2Y, scale: p2Scale }}>
          <h2 className="font-serif text-7xl md:text-9xl text-[#E8EDF2] mb-6 tracking-tighter">CERTIVA</h2>
          <p className="font-sans text-sm md:text-lg text-[#69737D] max-w-lg mb-10 leading-relaxed font-light">
            A blockchain-secured document verification protocol preventing academic and professional credential fraud.
          </p>
          <div className="font-mono text-[10px] md:text-xs text-[#36D9E6] tracking-widest uppercase">Solidity · React · Web3</div>
        </motion.div>
        
        {/* Vignette */}
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(11,14,18,1)]" />
      </div>
    </section>
  );
}

// 5. EXPERIENCE
function Experience() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end center"] });
  const lineWidth = useSpring(useTransform(scrollYProgress, [0, 1], ["0%", "100%"]), { stiffness: 50, damping: 20 });

  return (
    <section ref={ref} className="py-40 md:py-64 border-t border-[#69737D]/20 relative overflow-hidden bg-[#0B0E12]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] uppercase mb-32 md:mb-48">Experience</div>
        
        <div className="relative">
          {/* Base Line */}
          <div className="absolute top-[5px] left-0 w-full h-[1px] bg-[#69737D]/20" />
          {/* Animated Line */}
          <motion.div className="absolute top-[5px] left-0 h-[1px] bg-[#36D9E6]" style={{ width: lineWidth }} />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 pt-12">
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="absolute -top-14 left-0 w-3 h-3 bg-[#0B0E12] border border-[#36D9E6] rounded-full" />
              <div className="font-mono text-[10px] text-[#36D9E6] tracking-widest mb-4">2026</div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#E8EDF2] mb-3">ApexFlow</h3>
              <div className="font-sans text-sm text-[#69737D] tracking-wide">Software Development Intern</div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="absolute -top-14 left-0 w-3 h-3 bg-[#0B0E12] border border-[#69737D] rounded-full" />
              <div className="font-mono text-[10px] text-[#69737D] tracking-widest mb-4">2026</div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#E8EDF2] mb-3">UROP</h3>
              <div className="font-sans text-sm text-[#69737D] tracking-wide">Undergraduate Research</div>
            </motion.div>

            <motion.div 
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="absolute -top-14 left-0 w-3 h-3 bg-[#0B0E12] border border-[#69737D] rounded-full" />
              <div className="font-mono text-[10px] text-[#69737D] tracking-widest mb-4">2025</div>
              <h3 className="font-serif text-2xl md:text-3xl text-[#E8EDF2] mb-3">SRM</h3>
              <div className="font-sans text-sm text-[#69737D] tracking-wide">Computer Science</div>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}

// 6. BEYOND CODE
function BeyondCode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  
  const y1 = useTransform(scrollYProgress, [0, 1], [150, -250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [300, -100]);
  const y3 = useTransform(scrollYProgress, [0, 1], [100, -350]);
  const y4 = useTransform(scrollYProgress, [0, 1], [400, -50]);
  const y5 = useTransform(scrollYProgress, [0, 1], [250, -150]);

  return (
    <section ref={ref} className="h-[120vh] relative overflow-hidden border-t border-[#69737D]/20 flex items-center justify-center bg-[#0B0E12]">
      <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] uppercase absolute top-16 md:top-24">Beyond Code</div>
      
      <motion.div className="absolute left-[5%] md:left-[15%] font-serif text-4xl md:text-6xl text-[#E8EDF2]/20" style={{ y: y1 }}>Philosophy</motion.div>
      <motion.div className="absolute right-[10%] md:right-[20%] top-[20%] font-sans text-xl md:text-3xl text-[#69737D]/50 font-light" style={{ y: y2 }}>Electronics</motion.div>
      <motion.div className="absolute left-[20%] md:left-[30%] bottom-[30%] font-mono text-sm tracking-widest text-[#36D9E6]/30 uppercase" style={{ y: y3 }}>Experimenting</motion.div>
      <motion.div className="absolute right-[5%] md:right-[15%] bottom-[15%] font-serif text-5xl md:text-8xl text-[#E8EDF2]/10 italic" style={{ y: y4 }}>Books</motion.div>
      <motion.div className="absolute left-[40%] top-[15%] font-sans text-2xl md:text-4xl text-[#69737D]/30" style={{ y: y5 }}>Curiosity</motion.div>
      
      <motion.div 
        className="absolute text-center z-10 pointer-events-none px-6"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-200px" }}
        transition={{ duration: 1 }}
      >
        <div className="font-sans text-xl md:text-3xl text-[#E8EDF2] font-light tracking-wide max-w-xl leading-relaxed">
          Driven by a quiet obsession to experiment, build random things, and figure out how the world works.
        </div>
      </motion.div>
    </section>
  );
}

// 7. FINAL TRANSITION
function FinalTransition() {
  return (
    <section className="min-h-screen relative flex flex-col items-center justify-center border-t border-[#69737D]/20 bg-[#0B0E12]">
      <motion.h2 
        className="font-serif text-5xl md:text-7xl lg:text-9xl text-[#E8EDF2] mb-32 tracking-tighter"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        STILL CURIOUS.
      </motion.h2>
      
      <motion.div 
        className="flex flex-col items-center gap-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
      >
        <div className="font-sans text-[10px] md:text-xs tracking-[0.4em] text-[#69737D] uppercase mb-4">Arunan Kavirajan</div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <a href="#" className="font-mono text-[10px] text-[#E8EDF2] hover:text-[#36D9E6] tracking-widest uppercase transition-colors">Email</a>
          <a href="#" className="font-mono text-[10px] text-[#E8EDF2] hover:text-[#36D9E6] tracking-widest uppercase transition-colors">GitHub</a>
          <a href="#" className="font-mono text-[10px] text-[#E8EDF2] hover:text-[#36D9E6] tracking-widest uppercase transition-colors">LinkedIn</a>
          <a href="/resume" className="font-mono text-[10px] text-[#36D9E6] hover:text-[#E8EDF2] tracking-widest uppercase transition-colors">Resume</a>
        </div>
      </motion.div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <main className="bg-[#0B0E12] text-[#E8EDF2] selection:bg-[#36D9E6]/30 overflow-hidden">
      <HeroSection />
      <CuriousSection />
      <MindVisual />
      <WhatIBuild />
      <Experience />
      <BeyondCode />
      <FinalTransition />
    </main>
  );
}
