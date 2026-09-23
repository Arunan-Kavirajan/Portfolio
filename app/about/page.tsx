"use client";

import { motion, useScroll, useTransform, useSpring, useAnimationFrame, useMotionValue, type Transition } from "framer-motion";
import { useRef, useEffect, useMemo, useState } from "react";
import Image from "next/image";

import type { MotionValue } from "framer-motion";

type AnimatedLetterProps = {
  letter: string;
  index: number;
  length: number;
  mouseX: MotionValue<number>;
  mouseY: MotionValue<number>;
  letterSpacing: MotionValue<string>;
};

function AnimatedLetter({ letter, index, length, mouseX, mouseY, letterSpacing }: AnimatedLetterProps) {
  const offsetMultiplier = (index - (length - 1) / 2);
  const letterX = useTransform(mouseX, (x: number) => x * offsetMultiplier * 0.5);
  const letterY = useTransform(mouseY, (y: number) => y * Math.abs(offsetMultiplier) * 0.3);

  return (
    <motion.span 
      style={{ x: letterX, y: letterY, marginRight: index === length - 1 ? 0 : letterSpacing }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, delay: index * 0.08, ease: [0.2, 0.8, 0.2, 1] }}
    >
      {letter}
    </motion.span>
  );
}

// 1. HERO
function HeroSection() {
  const ref = useRef(null);
  const { scrollY } = useScroll();
  
  // Mouse tracking for subtle letter interaction
  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20); // range -10 to 10
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Use absolute scroll pixels to bypass Chrome's IntersectionObserver height calculation bugs
  const imgOpacity = useTransform(scrollY, [0, 480], [0.1, 0.7]);
  const imgScale = useTransform(scrollY, [0, 720], [0.95, 1.05]);
  const imgY = useTransform(scrollY, [0, 1200], [0, 100]);
  const imgClip = useTransform(
    scrollY, 
    [0, 600], 
    ["polygon(0% 45%, 100% 45%, 100% 55%, 0% 55%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
  );

  const titleY = useTransform(scrollY, [0, 960], [0, -150]);
  const letterSpacing = useTransform(scrollY, [0, 720], ["0em", "0.3em"]);
  
  const lastNameOpacity = useTransform(scrollY, [240, 600], [0.01, 1]);
  const lastNameY = useTransform(scrollY, [240, 600], [20, 0]);

  const subtitleY = useTransform(scrollY, [0, 1200], [0, -80]);

  const indicatorDotY = useTransform(scrollY, [0, 600], [0, 36]);

  const titleLetters = "ARUNAN".split("");

  return (
    <section ref={ref} className="h-[150vh] w-full relative flex items-start justify-center overflow-hidden pt-32 md:pt-40">
      
      {/* PORTRAIT */}
      <motion.div 
        className="absolute z-0 w-full max-w-[500px] md:max-w-[600px] aspect-[3/4] top-[15vh] mix-blend-screen"
      >
        <motion.div
          className="w-full h-full relative"
          style={{ 
            y: imgY, 
            opacity: imgOpacity, 
            scale: imgScale, 
            clipPath: imgClip,
            WebkitClipPath: imgClip as any
          }}
        >
          <Image 
            src="/profile_new.jpg" 
            alt="Arunan" 
            fill 
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0E12] via-transparent to-[#0B0E12] opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0E12] via-transparent to-[#0B0E12] opacity-80" />
        </motion.div>
      </motion.div>
      
      {/* TYPOGRAPHY */}
      <div className="z-10 text-center w-full flex flex-col items-center mt-[10vh]">
        <motion.div style={{ y: titleY }} className="relative flex flex-col items-center">
          
          <h1 className="font-serif text-[18vw] leading-none tracking-tighter text-[#E8EDF2] flex mix-blend-difference">
            {titleLetters.map((letter, i) => (
              <AnimatedLetter
                key={i}
                letter={letter}
                index={i}
                length={titleLetters.length}
                mouseX={mouseX}
                mouseY={mouseY}
                letterSpacing={letterSpacing}
              />
            ))}
          </h1>
          
          {/* Identity Emergence */}
          <motion.div 
            className="font-serif text-[6vw] leading-none tracking-widest text-[#E8EDF2] absolute -bottom-10 md:-bottom-16 w-full text-center mix-blend-difference"
            style={{ 
              opacity: lastNameOpacity, 
              y: lastNameY,
              willChange: "opacity, transform"
            }}
          >
            KAVIRAJAN
          </motion.div>

        </motion.div>

        {/* SUBTITLE */}
        <motion.div 
          className="font-mono text-[8px] md:text-xs tracking-[0.3em] md:tracking-[0.4em] text-[#36D9E6] mt-24 md:mt-32 uppercase flex flex-wrap justify-center gap-2 md:gap-4 overflow-hidden px-4 mix-blend-difference"
          style={{ y: subtitleY }}
        >
          {["SOFTWARE DEVELOPMENT", "·", "CYBERSECURITY", "·", "AI/ML"].map((phrase, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 + i * 0.15, ease: "easeOut" }}
            >
              {phrase}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* SCROLL INDICATOR */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.5 }}
      >
        <div className="w-[1px] h-10 bg-[#69737D]/30 relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-[#E8EDF2]"
            style={{ height: "4px", y: indicatorDotY }}
          />
        </div>
      </motion.div>

    </section>
  );
}

// 2. CURIOUS
// 2. CURIOUS WORLD SIMULATION
function WorldCanvas({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const N = 1200;
  const particles = useMemo(() => {
    const random = (seed: number) => {
      const x = Math.sin(seed) * 10000;
      return x - Math.floor(x);
    };

    const arr = [];
    for (let i = 0; i < N; i++) {
      // S0: Scattered field
      const s0 = [
        (random(i) - 0.5) * 4000,
        (random(i + N) - 0.5) * 4000,
        (random(i + N * 2) - 0.5) * 4000 + 1000
      ];

      // S1: Building (Sphere)
      const phi = Math.acos(1 - 2 * (i + 0.5) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const R = 220;
      const s1 = [
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta)
      ];

      // S2: Breaking (Cracked/Drifting by clusters)
      const cx = Math.sign(s1[0]) || 1;
      const cy = Math.sign(s1[1]) || 1;
      const cz = Math.sign(s1[2]) || 1;
      const s2 = [
        s1[0] + cx * (150 + random(i + N * 3) * 200) + (random(i + N * 4) - 0.5) * 150,
        s1[1] + cy * (150 + random(i + N * 5) * 200) + (random(i + N * 6) - 0.5) * 150,
        s1[2] + cz * (150 + random(i + N * 7) * 200) + (random(i + N * 8) - 0.5) * 150
      ];

      // S3: Understanding (Ordered 10x10x12 grid)
      const gx = (i % 10) - 4.5;
      const gy = Math.floor((i / 10)) % 10 - 4.5;
      const gz = Math.floor(i / 100) - 5.5; // up to 12 deep
      const s3 = [gx * 45, gy * 45, gz * 45];

      // S4: Rebuilding (Torus)
      const tu = (i % 60) / 60 * Math.PI * 2;
      const tv = Math.floor(i / 60) / 20 * Math.PI * 2;
      const rMaj = 240;
      const rMin = 70;
      const s4 = [
        (rMaj + rMin * Math.cos(tv)) * Math.cos(tu),
        rMin * Math.sin(tv),
        (rMaj + rMin * Math.cos(tv)) * Math.sin(tu)
      ];

      // S5: Exit (Dissolve upward & scatter)
      const s5 = [
        s4[0] * 3 + (random(i + N * 9) - 0.5) * 500,
        s4[1] * 3 - 1500,
        s4[2] * 3 + (random(i + N * 10) - 0.5) * 500
      ];

      arr.push({ s0, s1, s2, s3, s4, s5 });
    }
    return arr;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    let animationFrameId: number;
    let currentProgress = 0;

    const getInterpolatedState = (p: number, particle: { s0: number[], s1: number[], s2: number[], s3: number[], s4: number[], s5: number[] }) => {
      let sA, sB, ratio;
      if (p < 0.2) { sA = particle.s0; sB = particle.s1; ratio = p / 0.2; }
      else if (p < 0.4) { sA = particle.s1; sB = particle.s2; ratio = (p - 0.2) / 0.2; }
      else if (p < 0.6) { sA = particle.s2; sB = particle.s3; ratio = (p - 0.4) / 0.2; }
      else if (p < 0.8) { sA = particle.s3; sB = particle.s4; ratio = (p - 0.6) / 0.2; }
      else { sA = particle.s4; sB = particle.s5; ratio = Math.min(1, Math.max(0, (p - 0.8) / 0.15)); }
      
      const ease = ratio < 0.5 ? 4 * ratio * ratio * ratio : 1 - Math.pow(-2 * ratio + 2, 3) / 2;
      
      return {
        x: sA[0] + (sB[0] - sA[0]) * ease,
        y: sA[1] + (sB[1] - sA[1]) * ease,
        z: sA[2] + (sB[2] - sA[2]) * ease,
      };
    };

    const render = () => {
      const targetProgress = scrollYProgress.get();
      currentProgress += (targetProgress - currentProgress) * 0.08;

      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      ctx.clearRect(0, 0, width, height);

      const globalAlpha = currentProgress > 0.85 ? Math.max(0, 1 - (currentProgress - 0.85) / 0.1) : 1;
      ctx.globalAlpha = globalAlpha;
      if (globalAlpha <= 0) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const globalRotY = currentProgress * Math.PI * 3; 
      const globalRotX = 0.2 + currentProgress * 0.5;

      const projected: { px: number, py: number, scale: number, z: number }[] = [];
      const fov = 1000;

      for (let i = 0; i < N; i++) {
        const pt = getInterpolatedState(currentProgress, particles[i]);
        
        const cosX = Math.cos(globalRotX), sinX = Math.sin(globalRotX);
        const y1 = pt.y * cosX - pt.z * sinX;
        const z1 = pt.y * sinX + pt.z * cosX;

        const cosY = Math.cos(globalRotY), sinY = Math.sin(globalRotY);
        const x2 = pt.x * cosY + z1 * sinY;
        const z2 = -pt.x * sinY + z1 * cosY;

        const zFinal = z2 + 1200; 
        let px = 0, py = 0, scale = 0;
        if (zFinal > 0) {
          scale = fov / zFinal;
          px = width / 2 + x2 * scale;
          py = height / 2 + y1 * scale;
        }
        
        projected.push({ px, py, scale, z: z2 });
      }

      const lineOpacity = Math.max(0, 1 - Math.abs(currentProgress - 0.6) * 5);
      if (lineOpacity > 0.01) {
        ctx.strokeStyle = `rgba(54, 217, 230, ${lineOpacity * 0.3})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const p1 = projected[i];
          if (p1.z < -1000) continue; 
          const x = i % 10;
          const y = Math.floor((i / 10)) % 10;
          const z = Math.floor(i / 100);

          if (x < 9) { const p2 = projected[i + 1]; if(p2) { ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); } }
          if (y < 9) { const p2 = projected[i + 10]; if(p2) { ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); } }
          if (z < 11) { const p2 = projected[i + 100]; if(p2) { ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); } }
        }
        ctx.stroke();
      }

      const torusLineOpacity = Math.max(0, 1 - Math.abs(currentProgress - 0.8) * 5);
      if (torusLineOpacity > 0.01) {
        ctx.strokeStyle = `rgba(232, 237, 242, ${torusLineOpacity * 0.15})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let i = 0; i < N; i++) {
          const p1 = projected[i];
          if (p1.z < -1000) continue;
          const u = i % 60;
          const v = Math.floor(i / 60);

          const nextU = (u === 59) ? (i - 59) : (i + 1);
          const p2 = projected[nextU];
          if (p2) { ctx.moveTo(p1.px, p1.py); ctx.lineTo(p2.px, p2.py); }

          const nextV = (v === 19) ? (i % 60) : (i + 60);
          const p3 = projected[nextV];
          if (p3) { ctx.moveTo(p1.px, p1.py); ctx.lineTo(p3.px, p3.py); }
        }
        ctx.stroke();
      }

      const sortedIndices = Array.from({ length: N }, (_, i) => i).sort((a, b) => projected[b].z - projected[a].z);
      
      ctx.fillStyle = '#E8EDF2';
      for (let i = 0; i < N; i++) {
        const p = projected[sortedIndices[i]];
        if (p.scale > 0) {
          ctx.beginPath();
          ctx.arc(p.px, p.py, 1.5 * p.scale, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [particles, scrollYProgress]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

function CinematicTypography({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const w1Op = useTransform(scrollYProgress, [0.1, 0.2, 0.25, 0.3], [0, 1, 1, 0]);
  const w2Op = useTransform(scrollYProgress, [0.3, 0.4, 0.45, 0.5], [0, 1, 1, 0]);
  const w3Op = useTransform(scrollYProgress, [0.5, 0.6, 0.65, 0.7], [0, 1, 1, 0]);
  const w4Op = useTransform(scrollYProgress, [0.7, 0.8, 0.85, 0.9], [0, 1, 1, 0]);

  const y1 = useTransform(scrollYProgress, [0.1, 0.3], [30, -30]);
  const y2 = useTransform(scrollYProgress, [0.3, 0.5], [30, -30]);
  const y3 = useTransform(scrollYProgress, [0.5, 0.7], [30, -30]);
  const y4 = useTransform(scrollYProgress, [0.7, 0.9], [30, -30]);

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center mix-blend-difference overflow-hidden">
      <motion.div className="absolute font-serif text-[12vw] md:text-8xl text-[#E8EDF2] tracking-widest uppercase" style={{ opacity: w1Op, y: y1 }}>BUILDING</motion.div>
      <motion.div className="absolute font-serif text-[12vw] md:text-8xl text-[#E8EDF2] tracking-widest uppercase" style={{ opacity: w2Op, y: y2 }}>BREAKING</motion.div>
      <motion.div className="absolute font-serif text-[8vw] md:text-6xl text-[#E8EDF2] uppercase" style={{ opacity: w3Op, y: y3, letterSpacing: "0.1em" }}>UNDERSTANDING</motion.div>
      <motion.div className="absolute font-serif text-[12vw] md:text-8xl text-[#E8EDF2] tracking-widest uppercase" style={{ opacity: w4Op, y: y4 }}>REBUILDING</motion.div>
    </div>
  );
}

function AftermathText({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const pOp = useTransform(scrollYProgress, [0.93, 0.98], [0, 1]);
  const pY = useTransform(scrollYProgress, [0.93, 0.98], [30, 0]);

  return (
    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center px-6">
       <motion.div 
         className="max-w-2xl text-center flex flex-col gap-6 md:gap-8"
         style={{ opacity: pOp, y: pY }}
       >
          <p className="font-sans text-xl md:text-3xl leading-relaxed text-[#69737D] font-light">
            I’ve always been the kind of person who wants to know <span className="text-[#36D9E6]">what’s underneath.</span>
          </p>
          
          <p className="font-sans text-xl md:text-3xl leading-relaxed text-[#69737D] font-light">
            How things work, why they fail, and what happens when you start pulling them apart.
          </p>
          
          <p className="font-sans text-xl md:text-3xl leading-relaxed text-[#69737D] font-light">
            <span className="text-[#E8EDF2] font-medium">That curiosity</span> is probably what keeps me building.
          </p>
       </motion.div>
    </div>
  );
}

function CuriousSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  return (
    <section ref={ref} className="h-[600vh] relative z-20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        <WorldCanvas scrollYProgress={scrollYProgress} />
        <CinematicTypography scrollYProgress={scrollYProgress} />
        <AftermathText scrollYProgress={scrollYProgress} />
        
      </div>
    </section>
  );
}

// 3. MIND VISUAL
function TopologyEnvironment({ scrollYProgress, hoveredId }: { scrollYProgress: any, hoveredId: string | null }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef(hoveredId);
  const scrollRef = useRef(0);

  useEffect(() => {
    hoverRef.current = hoveredId;
  }, [hoveredId]);

  useEffect(() => {
    const unsub = scrollYProgress.on("change", (v: number) => { scrollRef.current = v; });
    return () => unsub();
  }, [scrollYProgress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    let animationId: number;
    let time = 0;
    
    let w = canvas.offsetWidth;
    let h = canvas.offsetHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    
    const setSize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
    };
    setSize();
    window.addEventListener("resize", setSize);

    // Generative Data
    const sysCrosses = Array.from({length: 30}, () => ({ ox: Math.random()*160-80, oy: Math.random()*160-80 }));
    const aiPoints = Array.from({length: 40}, () => ({ x: Math.random()*120-60, y: Math.random()*120-60, vx: (Math.random()-0.5)*0.8, vy: (Math.random()-0.5)*0.8 }));
    const bldFrags = Array.from({length: 20}, () => ({ x: Math.random()*100-50, y: Math.random()*100-50, size: Math.random()*12+4 }));
    const swLines = Array.from({length: 15}, () => ({ x: Math.random()*150-75, y: Math.random()*150-75, w: Math.random()*50+10, h: Math.random()*50+10 }));

    const render = () => {
       time += 0.015;
       const scroll = scrollRef.current;
       const hover = hoverRef.current;
       
       ctx.clearRect(0, 0, w, h);
       
       const globalIntensity = Math.min(1, Math.max(0, (scroll - 0.1) * 2.5));
       if (globalIntensity <= 0) {
          animationId = requestAnimationFrame(render);
          return;
       }

       // SOFTWARE (Architecture / Recomposition)
       ctx.save();
       ctx.translate(w * 0.3, h * 0.35);
       const swHover = hover === 'sw' ? 1 : 0;
       const swAlpha = (0.02 + swHover * 0.08) * globalIntensity;
       ctx.strokeStyle = `rgba(105, 115, 125, ${swAlpha})`;
       ctx.lineWidth = 1;
       swLines.forEach((l, i) => {
          let curX = l.x + Math.sin(time * 0.5 + i) * 15;
          let curY = l.y + Math.cos(time * 0.4 + i) * 15;
          ctx.strokeRect(curX, curY, l.w, l.h);
          if (i > 0 && Math.sin(time * 1.5 + i) > 0.7) {
             ctx.beginPath();
             ctx.moveTo(curX, curY);
             ctx.lineTo(swLines[i-1].x, swLines[i-1].y);
             ctx.stroke();
          }
       });
       ctx.restore();

       // CYBERSECURITY (Scanning Sweep)
       ctx.save();
       ctx.translate(w * 0.7, h * 0.25);
       const secHover = hover === 'sec' ? 1 : 0;
       let scanY = (time * 60) % 200 - 100; 
       ctx.strokeStyle = secHover ? `rgba(54, 217, 230, ${0.4 * globalIntensity})` : `rgba(105, 115, 125, ${0.1 * globalIntensity})`;
       ctx.beginPath(); ctx.moveTo(-120, scanY); ctx.lineTo(120, scanY); ctx.stroke();
       ctx.fillStyle = `rgba(105, 115, 125, ${(0.1 + secHover * 0.2) * globalIntensity})`;
       for(let x=-100; x<=100; x+=25) {
         for(let y=-80; y<=80; y+=25) {
           if (Math.abs(y - scanY) < 15) ctx.fillRect(x, y, 2, 2);
           else ctx.fillRect(x, y, 0.5, 0.5);
         }
       }
       ctx.restore();

       // AI / ML (Probabilistic Field)
       ctx.save();
       ctx.translate(w * 0.25, h * 0.55);
       const aiHover = hover === 'ai' ? 1 : 0;
       ctx.fillStyle = `rgba(105, 115, 125, ${(0.15 + aiHover * 0.2) * globalIntensity})`;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.05 + aiHover * 0.1) * globalIntensity})`;
       aiPoints.forEach(p => {
          p.x += p.vx * (1 + aiHover * 1.5);
          p.y += p.vy * (1 + aiHover * 1.5);
          if(p.x > 100) p.x = -100; if(p.x < -100) p.x = 100;
          if(p.y > 80) p.y = -80; if(p.y < -80) p.y = 80;
          ctx.beginPath(); ctx.arc(p.x, p.y, 1, 0, Math.PI*2); ctx.fill();
       });
       for(let i=0; i<aiPoints.length; i++) {
          for(let j=i+1; j<aiPoints.length; j++) {
             let dx = aiPoints[i].x - aiPoints[j].x;
             let dy = aiPoints[i].y - aiPoints[j].y;
             if(dx*dx + dy*dy < 1200) { 
                ctx.beginPath(); ctx.moveTo(aiPoints[i].x, aiPoints[i].y); ctx.lineTo(aiPoints[j].x, aiPoints[j].y); ctx.stroke();
             }
          }
       }
       ctx.restore();

       // SYSTEMS (Structural Alignment)
       ctx.save();
       ctx.translate(w * 0.75, h * 0.6);
       const sysHover = hover === 'sys' ? 1 : 0;
       const alignFactor = (Math.sin(time * 0.8) + 1) / 2; 
       const finalAlign = sysHover ? 1 : alignFactor;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.1 + sysHover * 0.15) * globalIntensity})`;
       sysCrosses.forEach(c => {
          let gx = Math.round(c.ox / 40) * 40;
          let gy = Math.round(c.oy / 40) * 40;
          let curX = c.ox + (gx - c.ox) * finalAlign;
          let curY = c.oy + (gy - c.oy) * finalAlign;
          ctx.beginPath();
          ctx.moveTo(curX - 4, curY); ctx.lineTo(curX + 4, curY);
          ctx.moveTo(curX, curY - 4); ctx.lineTo(curX, curY + 4);
          ctx.stroke();
       });
       ctx.restore();

       // EXPERIMENTATION (Branching Traces)
       ctx.save();
       ctx.translate(w * 0.35, h * 0.75);
       const expHover = hover === 'exp' ? 1 : 0;
       ctx.strokeStyle = `rgba(105, 115, 125, ${(0.08 + expHover * 0.15) * globalIntensity})`;
       for(let i=0; i<4; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          for(let t=0; t<40; t++) {
             let angle = Math.sin(time * 0.5 + t*0.1 + i*2.5) * 2.5;
             let rad = t * (2 + expHover * 1.5);
             ctx.lineTo(Math.cos(angle)*rad, Math.sin(angle)*rad);
          }
          ctx.stroke();
       }
       ctx.restore();

       // BUILDING (Assembly)
       ctx.save();
       ctx.translate(w * 0.65, h * 0.8);
       const bldHover = hover === 'bld' ? 1 : 0;
       ctx.strokeStyle = `rgba(232, 237, 242, ${(0.04 + bldHover * 0.1) * globalIntensity})`;
       ctx.fillStyle = `rgba(232, 237, 242, ${(0.01 + bldHover * 0.04) * globalIntensity})`;
       const assembleFactor = (Math.cos(time * 1.2) + 1) / 2; 
       const bldAlign = bldHover ? 1 : assembleFactor;
       bldFrags.forEach((f, i) => {
          let cols = 5;
          let row = Math.floor(i / cols);
          let col = i % cols;
          let tx = (col - 2) * 18;
          let ty = (row - 1) * 18;
          let curX = f.x + (tx - f.x) * bldAlign;
          let curY = f.y + (ty - f.y) * bldAlign;
          ctx.fillRect(curX, curY, f.size, f.size);
          ctx.strokeRect(curX, curY, f.size, f.size);
       });
       ctx.restore();

       animationId = requestAnimationFrame(render);
    }
    render();
    
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", setSize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

function MindVisual() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Entrance animation: fades in and translates slightly up into fixed position
  const entryY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);
  const entryOp = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const yOffset = useTransform(entryY, (v: number) => `calc(-50% + ${v}px)`);

  const statementOp = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);
  const statementY = useTransform(scrollYProgress, [0.8, 0.95], [20, 0]);

  const ANCHORS = [
    { id: "sw",  label: "SOFTWARE",        cx: 30, cy: 35, font: "font-serif text-3xl md:text-4xl text-[#E8EDF2]" },
    { id: "sec", label: "CYBERSECURITY",   cx: 70, cy: 25, font: "font-mono text-xl md:text-2xl text-[#36D9E6]" },
    { id: "ai",  label: "AI / ML",         cx: 25, cy: 55, font: "font-sans font-light text-2xl md:text-4xl text-[#69737D]" },
    { id: "sys", label: "SYSTEMS",         cx: 75, cy: 60, font: "font-mono font-bold text-xl md:text-2xl text-[#69737D]" },
    { id: "exp", label: "Experimentation", cx: 35, cy: 75, font: "font-serif italic text-2xl md:text-4xl text-[#69737D]" },
    { id: "bld", label: "BUILDING",        cx: 65, cy: 80, font: "font-sans font-bold text-3xl md:text-4xl tracking-tight text-[#E8EDF2]" },
  ];

  return (
    <section ref={ref} className="h-[300vh] w-full relative border-t border-[#69737D]/20 bg-[#0B0E12]">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        <TopologyEnvironment scrollYProgress={scrollYProgress} hoveredId={hoveredId} />

        <div className="font-mono text-[9px] text-[#69737D] tracking-[0.3em] absolute top-16 md:top-24 uppercase z-10 pointer-events-none">
          The Topology of Interest
        </div>
        
        <div className="relative w-full h-full max-w-7xl mx-auto">
          {ANCHORS.map(a => (
            <motion.div
              key={a.id}
              className="absolute flex items-center justify-center pointer-events-auto cursor-default z-20"
              style={{ 
                left: `${a.cx}%`, 
                top: `${a.cy}%`, 
                x: "-50%", 
                y: yOffset,
                opacity: entryOp
              }}
              onMouseEnter={() => setHoveredId(a.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <span className={a.font}>{a.label}</span>
            </motion.div>
          ))}

          <motion.div 
            className="absolute bottom-32 md:bottom-24 z-30 pointer-events-none whitespace-nowrap"
            style={{ left: "50%", x: "-50%", opacity: statementOp, y: statementY }}
          >
            <p className="font-serif italic text-[#69737D] text-lg md:text-xl">The things I keep coming back to.</p>
          </motion.div>
        </div>

      </div>
    </section>
  );
}


// 4. WHAT I BUILD
function WhatIBuild() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  
  // P1: 0 -> 0.4, P2: 0.5 -> 1.0
  const p1Op = useTransform(scrollYProgress, [0, 0.05, 0.4, 0.5], [0, 1, 1, 0]);
  const p1Y = useTransform(scrollYProgress, [0, 0.05, 0.4, 0.5], [50, 0, 0, -50]);
  const p1Scale = useTransform(scrollYProgress, [0, 0.4], [0.9, 1.05]);

  const p2Op = useTransform(scrollYProgress, [0.5, 0.55, 0.9, 1], [0, 1, 1, 0]);
  const p2Y = useTransform(scrollYProgress, [0.5, 0.55, 0.9, 1], [50, 0, 0, -50]);
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
    <main className="bg-[#0B0E12] text-[#E8EDF2] selection:bg-[#36D9E6]/30">
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
