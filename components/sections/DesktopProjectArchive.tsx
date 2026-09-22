"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring, AnimatePresence, useMotionTemplate, useTransform } from "framer-motion";
import Link from "next/link";

// --- TYPES ---
type TechNode = { name: string; x: number; y: number };
type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: TechNode[];
  x: number;
  y: number;
  inDevelopment?: boolean;
  primary?: boolean;
};

// --- DATA ---
const PROJECTS: Project[] = [
  {
    id: "koda",
    number: "01 / 08",
    title: "KODA",
    subtitle: "CODEBASE DETECTIVE",
    description: "An agentic system for understanding and navigating unfamiliar codebases. Ingests repositories and maps file structures.",
    x: 20, y: 30,
    inDevelopment: true,
    primary: true,
    tech: [
      { name: "NEXT.JS", x: 0, y: -100 },
      { name: "TYPESCRIPT", x: 120, y: -30 },
      { name: "GITHUB API", x: 100, y: 70 },
      { name: "TAILWIND CSS", x: -110, y: 40 },
    ]
  },
  {
    id: "echoes",
    number: "02 / 08",
    title: "ECHOES",
    subtitle: "DRIFTING MESSAGES",
    description: "A public, anonymous message board where notes become part of a permanent, shared time capsule. No accounts, no algorithms.",
    x: 55, y: 25,
    tech: [
      { name: "REACT", x: 0, y: -80 },
      { name: "FRAMER MOTION", x: 110, y: -10 },
      { name: "SUPABASE", x: -100, y: 30 },
      { name: "POSTGRESQL", x: 80, y: 60 },
    ]
  },
  {
    id: "certiva",
    number: "03 / 08",
    title: "CERTIVA",
    subtitle: "CERTIFICATE AUTOMATION",
    description: "A browser-based certificate platform built to instantly map spreadsheet data onto PDF templates and generate personalized certificates in bulk.",
    x: 85, y: 45,
    primary: true,
    tech: [
      { name: "REACT", x: -100, y: -60 },
      { name: "VITE", x: 80, y: -70 },
      { name: "PDF-LIB", x: 110, y: 20 },
      { name: "TYPESCRIPT", x: -90, y: 50 },
    ]
  },
  {
    id: "algolab",
    number: "04 / 08",
    title: "ALGORITHM LABORATORY",
    subtitle: "VISUALIZATION ENGINE",
    description: "An interactive, physics-driven visualization laboratory for algorithms and data structures, featuring dynamic frontends.",
    x: 15, y: 75,
    inDevelopment: true,
    tech: [
      { name: "FASTAPI", x: 0, y: -90 },
      { name: "PYTHON", x: 100, y: -20 },
      { name: "REACT", x: -100, y: -10 },
      { name: "FRAMER MOTION", x: -50, y: -80 },
    ]
  },
  {
    id: "dbrownie",
    number: "05 / 08",
    title: "ANDROID BILLING APP",
    subtitle: "RETAIL POS SYSTEM",
    description: "A Flutter-based billing and order management app built for small food stalls, handling the full lifecycle with Bluetooth printing.",
    x: 40, y: 85,
    tech: [
      { name: "FLUTTER", x: -90, y: -50 },
      { name: "DART", x: 100, y: -30 },
      { name: "SQLITE", x: 90, y: 40 },
      { name: "ESC/POS", x: -110, y: 20 },
    ]
  },
  {
    id: "chatclub",
    number: "06 / 08",
    title: "CHAT CLUB WEBSITE",
    subtitle: "OFFICIAL PLATFORM",
    description: "The official platform for the Computer Hardware and AI Technology (CHAT) Club, featuring dynamic event management.",
    x: 75, y: 15,
    tech: [
      { name: "NEXT.JS", x: 0, y: -80 },
      { name: "FIREBASE", x: 100, y: -20 },
      { name: "FRAMER MOTION", x: -90, y: 30 },
      { name: "TAILWIND CSS", x: 60, y: 70 },
    ]
  },
  {
    id: "pallavan",
    number: "07 / 08",
    title: "PALLAVAN MES",
    subtitle: "OFFLINE-FIRST MES",
    description: "An enterprise-grade Manufacturing Execution System designed for factory floors, featuring a rigorous offline-first architecture.",
    x: 85, y: 80,
    tech: [
      { name: "REACT", x: -80, y: -70 },
      { name: "DEXIE.JS", x: 110, y: -10 },
      { name: "FIREBASE", x: 50, y: -90 },
      { name: "TYPESCRIPT", x: -100, y: 20 },
    ]
  },
  {
    id: "ascend",
    number: "08 / 08",
    title: "ASCEND",
    subtitle: "GAMIFIED PRODUCTIVITY",
    description: "A gamified productivity and study session platform featuring active focus tracking, study cohorts, leaderboards, and a store.",
    x: 55, y: 60,
    inDevelopment: true,
    primary: true,
    tech: [
      { name: "REACT", x: 0, y: -100 },
      { name: "FIREBASE", x: 110, y: -20 },
      { name: "FRAMER MOTION", x: -110, y: 10 },
      { name: "VITE", x: -80, y: -70 },
    ]
  }
];

export default function DesktopProjectArchive() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main 
      className="fixed inset-0 w-[100vw] h-[100vh] bg-[#0B0E12] overflow-hidden cursor-none selection:bg-[#36D9E6]/30"
      onClick={(e) => {
        if ((e.target as HTMLElement).tagName === 'MAIN') {
          setSelectedId(null);
        }
      }}
    >
      {/* BACKGROUND ENVIRONMENT */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(54,217,230,0.03)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] leading-none text-[#E8EDF2] opacity-[0.015] pointer-events-none whitespace-nowrap select-none tracking-tighter">
        WORK
      </div>

      <ConstellationEnvironment mouseX={mouseX} mouseY={mouseY} selectedId={selectedId} />

      {PROJECTS.map((proj) => (
        <ProjectNode 
          key={proj.id} 
          project={proj} 
          mouseX={mouseX} 
          mouseY={mouseY}
          selectedId={selectedId}
          onSelect={() => setSelectedId(selectedId === proj.id ? null : proj.id)}
        />
      ))}

      <CustomCursor mouseX={mouseX} mouseY={mouseY} />
    </main>
  );
}

// --- CONSTANT BACKGROUND ECOSYSTEM ---
function ConstellationEnvironment({ mouseX, mouseY, selectedId }: { mouseX: any, mouseY: any, selectedId: string | null }) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  
  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight });
    const r = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  if (size.w === 0) return null;

  return (
    <motion.div 
      className="absolute inset-0 pointer-events-none"
      animate={{ opacity: selectedId ? 0.3 : 1, filter: selectedId ? "blur(4px)" : "blur(0px)" }}
      transition={{ duration: 0.8 }}
    >
      <svg className="absolute inset-0 w-full h-full">
        <path d={`M ${size.w*0.2} ${size.h*0.3} C ${size.w*0.3} ${size.h*0.1} ${size.w*0.5} ${size.h*0.2} ${size.w*0.55} ${size.h*0.25}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.15} />
        <path d={`M ${size.w*0.55} ${size.h*0.6} C ${size.w*0.7} ${size.h*0.7} ${size.w*0.8} ${size.h*0.6} ${size.w*0.85} ${size.h*0.45}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.1} />
        <path d={`M ${size.w*0.15} ${size.h*0.75} C ${size.w*0.1} ${size.h*0.9} ${size.w*0.3} ${size.h*0.9} ${size.w*0.4} ${size.h*0.85}`} stroke="#36D9E6" strokeWidth={0.5} fill="none" opacity={0.05} />
        
        <circle cx={size.w*0.5} cy={size.h*0.5} r={size.w*0.3} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.03} strokeDasharray="4 8" />
        <circle cx={size.w*0.5} cy={size.h*0.5} r={size.w*0.4} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.02} />
      </svg>
      
      <AtmosphericMarker x={15} y={20} mouseX={mouseX} mouseY={mouseY} />
      <AtmosphericMarker x={85} y={15} mouseX={mouseX} mouseY={mouseY} type="bracket" />
      <AtmosphericMarker x={75} y={75} mouseX={mouseX} mouseY={mouseY} type="cross" />
      <AtmosphericMarker x={25} y={85} mouseX={mouseX} mouseY={mouseY} />
      <AtmosphericMarker x={50} y={10} mouseX={mouseX} mouseY={mouseY} type="dot" />
      <AtmosphericMarker x={90} y={50} mouseX={mouseX} mouseY={mouseY} type="dot" />
      <AtmosphericMarker x={10} y={50} mouseX={mouseX} mouseY={mouseY} type="cross" />
      <AtmosphericMarker x={50} y={90} mouseX={mouseX} mouseY={mouseY} type="bracket" />
    </motion.div>
  );
}

function AtmosphericMarker({ x, y, type = "line", mouseX, mouseY }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const driftX = useSpring(0, { stiffness: 20, damping: 20 });
  const driftY = useSpring(0, { stiffness: 20, damping: 20 });

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        cx.set(r.left + r.width / 2);
        cy.set(r.top + r.height / 2);
      }
    };
    measure();
    setTimeout(measure, 100);
  }, [cx, cy]);

  useAnimationFrame(() => {
    if (cx.get() === 0) return;
    const dx = mouseX.get() - cx.get();
    const dy = mouseY.get() - cy.get();
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    if (dist < 300) {
      const pull = Math.pow((300 - dist) / 300, 2);
      driftX.set((dx / dist) * 15 * pull);
      driftY.set((dy / dist) * 15 * pull);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  return (
    <motion.div 
      ref={ref}
      className="absolute flex items-center justify-center opacity-20"
      style={{ left: `${x}%`, top: `${y}%`, x: driftX, y: driftY }}
    >
      {type === "line" && <div className="w-8 h-[1px] bg-[#69737D]" />}
      {type === "bracket" && <div className="font-mono text-[8px] text-[#69737D] tracking-widest">[ ]</div>}
      {type === "cross" && (
        <div className="relative w-3 h-3">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#69737D] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#69737D] -translate-x-1/2" />
        </div>
      )}
      {type === "dot" && <div className="w-[2px] h-[2px] bg-[#E8EDF2] rounded-full blur-[1px]" />}
    </motion.div>
  );
}

// --- PROJECT NODE ---
function ProjectNode({ project, mouseX, mouseY, selectedId, onSelect }: any) {
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  
  const isSelected = selectedId === project.id;
  const isOtherSelected = selectedId !== null && selectedId !== project.id;

  const distance = useMotionValue(1000);
  const driftX = useSpring(0, { stiffness: 50, damping: 15, mass: 0.8 });
  const driftY = useSpring(0, { stiffness: 50, damping: 15, mass: 0.8 });
  const ringScale = useSpring(1, { stiffness: 100, damping: 20 });
  const beaconOpacity = useSpring(0.3, { stiffness: 100, damping: 20 });
  
  useEffect(() => {
    const updateCenter = () => {
      if (nodeRef.current) {
        const rect = nodeRef.current.getBoundingClientRect();
        centerX.set(rect.left + rect.width / 2);
        centerY.set(rect.top + rect.height / 2);
      }
    };
    updateCenter();
    window.addEventListener("resize", updateCenter);
    setTimeout(updateCenter, 100);
    return () => window.removeEventListener("resize", updateCenter);
  }, [centerX, centerY]);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const cx = centerX.get();
    const cy = centerY.get();
    
    if (cx === 0 && cy === 0) return;
    
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distance.set(dist);

    const MAGNETIC_RADIUS = 280;
    if (dist < MAGNETIC_RADIUS && !isSelected) {
      const normalized = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
      const pull = Math.pow(normalized, 1.5); 
      driftX.set(dx * pull * 0.4);
      driftY.set(dy * pull * 0.4);
      
      ringScale.set(1 + (pull * 0.5));
      beaconOpacity.set(0.3 + (pull * 0.7));
    } else {
      driftX.set(0);
      driftY.set(0);
      ringScale.set(isSelected ? 1.5 : 1);
      beaconOpacity.set(isSelected ? 1 : 0.3);
    }
  });

  const bSize = project.primary ? 24 : 18;
  const innerDot = project.primary ? 4 : 3;

  return (
    <motion.div
      ref={nodeRef}
      className="absolute flex items-center justify-center z-10"
      style={{ left: `${project.x}%`, top: `${project.y}%`, x: driftX, y: driftY }}
      animate={{ 
        opacity: isOtherSelected ? 0.05 : 1,
        filter: isOtherSelected ? "blur(4px)" : "blur(0px)" 
      }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div 
        className="absolute w-[120px] h-[120px] rounded-full cursor-none z-20" 
        onClick={onSelect}
      />

      {project.primary && (
        <motion.div 
          className="absolute pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        >
          <div className="w-[140px] h-[140px] rounded-full border border-[#69737D]/5 border-dashed" />
          <div className="absolute top-2 left-1/2 w-[1px] h-[4px] bg-[#36D9E6]/30 -translate-x-1/2" />
          <div className="absolute bottom-4 right-4 font-mono text-[6px] text-[#69737D]/40 rotate-90">SYS.ON</div>
        </motion.div>
      )}

      <motion.div 
        className="relative flex items-center justify-center pointer-events-none"
        style={{ scale: ringScale, opacity: beaconOpacity }}
      >
        <div className="absolute border border-[#69737D]/10 rounded-full" style={{ width: bSize * 1.8, height: bSize * 1.8 }} />
        <div className="absolute border border-[#69737D]/40" style={{ width: bSize, height: bSize, borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" }} />
        <div className="absolute border border-[#36D9E6]/30" style={{ width: bSize * 0.6, height: bSize * 0.6, borderRadius: "60% 40% 50% 50% / 40% 60% 50% 50%" }} />
        <div className="bg-[#E8EDF2] rounded-full" style={{ width: innerDot, height: innerDot, boxShadow: isSelected ? "0 0 10px rgba(54,217,230,0.5)" : "none" }} />
        <div className="absolute top-[-2px] right-[-4px] w-[2px] h-[2px] bg-[#36D9E6] opacity-70" />
      </motion.div>

      <motion.div 
        className="absolute top-8 flex flex-col items-center pointer-events-none"
        animate={{ 
          opacity: isSelected ? 1 : 0.6,
          y: isSelected ? 5 : 0,
        }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-2 mb-1">
          <span className="font-mono text-[9px] text-[#36D9E6] tracking-widest">{project.number}</span>
          {project.inDevelopment && (
            <span className="font-mono text-[7px] text-[#36D9E6] border border-[#36D9E6]/50 bg-[#36D9E6]/10 px-1 py-[1px] tracking-[0.15em] rounded-[2px]">IN DEV</span>
          )}
        </div>
        <span className={`font-serif tracking-widest whitespace-nowrap transition-all duration-500 ${isSelected ? 'text-[#E8EDF2] text-lg' : 'text-[#69737D] text-sm'}`}>
          {project.title}
        </span>
      </motion.div>

      <svg className="absolute overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
        {project.tech.map((t: any, i: number) => (
          <TechLine key={i} target={t} awakened={isSelected} delay={i * 0.08} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
        ))}
      </svg>
      {project.tech.map((t: any, i: number) => (
        <TechNode key={i} tech={t} awakened={isSelected} delay={i * 0.08} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
      ))}

      <AnimatePresence>
        {isSelected && (
          <motion.div
            className="absolute top-[80px] w-72 pointer-events-auto group cursor-pointer"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: 5, filter: "blur(4px)" }}
            transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
          >
            <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#36D9E6]/50 to-transparent" />
            <h3 className="font-mono text-[10px] text-[#E8EDF2] tracking-[0.2em] mb-3">{project.subtitle}</h3>
            <p className="font-sans text-xs text-[#69737D] leading-relaxed mb-6">
              {project.description}
            </p>
            <div className="font-mono text-[9px] text-[#36D9E6] tracking-widest flex flex-wrap gap-2 mb-8 opacity-60">
              {project.tech.map((t: any) => t.name).join(" · ")}
            </div>
            
            <Link href={`/projects/${project.id}`} className="font-mono text-[9px] text-[#E8EDF2] hover:text-[#36D9E6] tracking-widest transition-colors flex items-center">
              ACCESS ARCHIVE 
              <span className="ml-3 w-4 h-[1px] bg-current inline-block relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-1.5 after:h-1.5 after:border-t after:border-r after:border-current after:rotate-45" />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// --- PROJECT ECOSYSTEM COMPONENTS ---
function TechLine({ target, awakened, delay, mouseX, mouseY, parentX, parentY }: any) {
  const controlX = useMotionValue(target.x / 2);
  const controlY = useMotionValue(target.y / 2);

  useAnimationFrame(() => {
    if (!awakened) return;
    const mx = mouseX.get();
    const my = mouseY.get();
    const nx = parentX.get() + target.x;
    const ny = parentY.get() + target.y;
    
    const dx = mx - nx;
    const dy = my - ny;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 150) {
      const push = (150 - dist) / 150;
      controlX.set((target.x / 2) + (dx * -0.2 * push));
      controlY.set((target.y / 2) + (dy * -0.2 * push));
    } else {
      controlX.set(target.x / 2);
      controlY.set(target.y / 2);
    }
  });

  const pathD = useMotionTemplate`M 0 0 Q ${controlX} ${controlY} ${target.x} ${target.y}`;

  return (
    <motion.path
      d={pathD}
      stroke="#69737D"
      strokeWidth={0.5}
      fill="none"
      strokeOpacity={0.3}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: awakened ? 1 : 0 }}
      transition={{ duration: 0.8, delay: awakened ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function TechNode({ tech, awakened, delay, mouseX, mouseY, parentX, parentY }: any) {
  const driftX = useSpring(0, { stiffness: 40, damping: 25 });
  const driftY = useSpring(0, { stiffness: 40, damping: 25 });

  useAnimationFrame(() => {
    if (!awakened) {
      driftX.set(0);
      driftY.set(0);
      return;
    }
    const mx = mouseX.get();
    const my = mouseY.get();
    const nx = parentX.get() + tech.x;
    const ny = parentY.get() + tech.y;
    
    const dx = mx - nx;
    const dy = my - ny;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 100) {
      const push = (100 - dist) / 100;
      driftX.set((dx / dist) * -10 * push); 
      driftY.set((dy / dist) * -10 * push);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  return (
    <motion.div
      className="absolute font-mono text-[9px] text-[#69737D] tracking-widest whitespace-nowrap pointer-events-none flex items-center gap-2"
      style={{ left: tech.x, top: tech.y, x: driftX, y: driftY, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: awakened ? 1 : 0, filter: awakened ? "blur(0px)" : "blur(4px)" }}
      transition={{ duration: 0.6, delay: awakened ? delay + 0.15 : 0 }}
    >
      <div className="w-1 h-1 border border-[#36D9E6]/40 rotate-45" />
      {tech.name}
    </motion.div>
  );
}

// --- MULTI-LAYER CURSOR ---
function CustomCursor({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
  const smoothX = useSpring(mouseX, { stiffness: 1000, damping: 40 });
  const smoothY = useSpring(mouseY, { stiffness: 1000, damping: 40 });
  
  const outerX = useSpring(mouseX, { stiffness: 150, damping: 25 });
  const outerY = useSpring(mouseY, { stiffness: 150, damping: 25 });

  const [isHoveringProject, setIsHoveringProject] = useState(false);
  const [isProximate, setIsProximate] = useState(false);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    let minDist = 1000;
    PROJECTS.forEach(p => {
      const px = (p.x / 100) * w;
      const py = (p.y / 100) * h;
      const dist = Math.sqrt(Math.pow(mx - px, 2) + Math.pow(my - py, 2));
      if (dist < minDist) minDist = dist;
    });

    setIsProximate(minDist < 280);
    setIsHoveringProject(minDist < 40);
  });

  return (
    <>
      <motion.div 
        className="fixed top-0 left-0 w-[3px] h-[3px] bg-[#E8EDF2] rounded-full pointer-events-none z-[100]"
        style={{ x: smoothX, y: smoothY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[100]"
        style={{ x: outerX, y: outerY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: isHoveringProject ? 16 : isProximate ? 32 : 0,
          height: isHoveringProject ? 16 : isProximate ? 32 : 0,
          opacity: isHoveringProject ? 0.8 : isProximate ? 0.3 : 0,
          border: isHoveringProject ? "1px solid #E8EDF2" : "1px solid #36D9E6",
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </>
  );
}
