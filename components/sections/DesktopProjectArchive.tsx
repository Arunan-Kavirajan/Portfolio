"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring, AnimatePresence, useMotionTemplate } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

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
// Coordinates are carefully distributed across the fixed 100vw x 100vh canvas
const PROJECTS: Project[] = [
  {
    id: "koda",
    number: "01 / 08",
    title: "KODA",
    subtitle: "CODEBASE DETECTIVE",
    description: "An agentic system for understanding and navigating unfamiliar codebases. Ingests repositories and maps file structures.",
    x: 20, y: 30, // Top Left
    inDevelopment: true,
    primary: true,
    tech: [
      { name: "NEXT.JS", x: 0, y: 0 },
      { name: "TYPESCRIPT", x: 0, y: 0 },
      { name: "GITHUB API", x: 0, y: 0 },
      { name: "TAILWIND CSS", x: 0, y: 0 },
    ]
  },
  {
    id: "echoes",
    number: "02 / 08",
    title: "ECHOES",
    subtitle: "DRIFTING MESSAGES",
    description: "A public, anonymous message board where notes become part of a permanent, shared time capsule. No accounts, no algorithms.",
    x: 55, y: 25, // Top Center
    tech: [
      { name: "REACT", x: 0, y: 0 },
      { name: "FRAMER MOTION", x: 0, y: 0 },
      { name: "SUPABASE", x: 0, y: 0 },
      { name: "POSTGRESQL", x: 0, y: 0 },
    ]
  },
  {
    id: "certiva",
    number: "03 / 08",
    title: "CERTIVA",
    subtitle: "CERTIFICATE AUTOMATION",
    description: "A browser-based certificate platform built to instantly map spreadsheet data onto PDF templates and generate personalized certificates in bulk.",
    x: 85, y: 45, // Right Center
    primary: true,
    tech: [
      { name: "REACT", x: 0, y: 0 },
      { name: "VITE", x: 0, y: 0 },
      { name: "PDF-LIB", x: 0, y: 0 },
      { name: "TYPESCRIPT", x: 0, y: 0 },
    ]
  },
  {
    id: "algolab",
    number: "04 / 08",
    title: "ALGORITHM LABORATORY",
    subtitle: "VISUALIZATION ENGINE",
    description: "An interactive, physics-driven visualization laboratory for algorithms and data structures, featuring dynamic frontends.",
    x: 15, y: 75, // Bottom Left
    inDevelopment: true,
    tech: [
      { name: "FASTAPI", x: 0, y: 0 },
      { name: "PYTHON", x: 0, y: 0 },
      { name: "REACT", x: 0, y: 0 },
      { name: "FRAMER MOTION", x: 0, y: 0 },
    ]
  },
  {
    id: "dbrownie",
    number: "05 / 08",
    title: "ANDROID BILLING APP",
    subtitle: "RETAIL POS SYSTEM",
    description: "A Flutter-based billing and order management app built for small food stalls, handling the full lifecycle with Bluetooth printing.",
    x: 40, y: 85, // Bottom Center
    tech: [
      { name: "FLUTTER", x: 0, y: 0 },
      { name: "DART", x: 0, y: 0 },
      { name: "SQLITE", x: 0, y: 0 },
      { name: "ESC/POS", x: 0, y: 0 },
    ]
  },
  {
    id: "chatclub",
    number: "06 / 08",
    title: "CHAT CLUB WEBSITE",
    subtitle: "OFFICIAL PLATFORM",
    description: "The official platform for the Computer Hardware and AI Technology (CHAT) Club, featuring dynamic event management.",
    x: 75, y: 15, // Top Right
    tech: [
      { name: "NEXT.JS", x: 0, y: 0 },
      { name: "FIREBASE", x: 0, y: 0 },
      { name: "FRAMER MOTION", x: 0, y: 0 },
      { name: "TAILWIND CSS", x: 0, y: 0 },
    ]
  },
  {
    id: "pallavan",
    number: "07 / 08",
    title: "PALLAVAN MES",
    subtitle: "OFFLINE-FIRST MES",
    description: "An enterprise-grade Manufacturing Execution System designed for factory floors, featuring a rigorous offline-first architecture.",
    x: 85, y: 80, // Bottom Right
    tech: [
      { name: "REACT", x: 0, y: 0 },
      { name: "DEXIE.JS", x: 0, y: 0 },
      { name: "FIREBASE", x: 0, y: 0 },
      { name: "TYPESCRIPT", x: 0, y: 0 },
    ]
  },
  {
    id: "ascend",
    number: "08 / 08",
    title: "ASCEND",
    subtitle: "GAMIFIED PRODUCTIVITY",
    description: "A gamified productivity and study session platform featuring active focus tracking, study cohorts, leaderboards, and a store.",
    x: 55, y: 60, // Center
    inDevelopment: true,
    primary: true,
    tech: [
      { name: "REACT", x: 0, y: 0 },
      { name: "FIREBASE", x: 0, y: 0 },
      { name: "FRAMER MOTION", x: 0, y: 0 },
      { name: "VITE", x: 0, y: 0 },
    ]
  }
];

export default function DesktopProjectArchive() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  // Track globally which project is hovered so others can dim
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <main className="fixed inset-0 w-[100vw] h-[100vh] bg-[#0B0E12] overflow-hidden selection:bg-[#36D9E6]/30">
      
      {/* BACKGROUND ENVIRONMENT - Layered, Restrained, Technical */}
      
      {/* HUGE EDITORIAL TYPOGRAPHY */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[20vw] leading-none text-[#E8EDF2] opacity-[0.015] pointer-events-none whitespace-nowrap select-none tracking-tighter z-0">
        WORK
      </div>

      {/* Layer 1: Grain texture */}
      <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none z-0" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      {/* Layer 2: Environment Constellations & Technical Markers */}
      <TechnicalEnvironment mouseX={mouseX} mouseY={mouseY} hoveredId={hoveredId} />

      {/* PROJECT FIELD */}
      {PROJECTS.map((proj) => (
        <ProjectNode 
          key={proj.id} 
          project={proj} 
          mouseX={mouseX} 
          mouseY={mouseY}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}
      
    </main>
  );
}

// --- CONSTANT BACKGROUND ECOSYSTEM ---
function TechnicalEnvironment({ mouseX, mouseY, hoveredId }: { mouseX: any, mouseY: any, hoveredId: string | null }) {
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
      className="absolute inset-0 pointer-events-none z-0"
      animate={{ opacity: hoveredId ? 0.3 : 1, filter: hoveredId ? "blur(2px)" : "blur(0px)" }}
      transition={{ duration: 0.8 }}
    >
      <svg className="absolute inset-0 w-full h-full">
        {/* Subtle coordinate arcs and routing lines */}
        <path d={`M ${size.w*0.2} ${size.h*0.3} Q ${size.w*0.4} ${size.h*0.1} ${size.w*0.55} ${size.h*0.25}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.15} />
        <path d={`M ${size.w*0.55} ${size.h*0.6} C ${size.w*0.7} ${size.h*0.7} ${size.w*0.8} ${size.h*0.6} ${size.w*0.85} ${size.h*0.45}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.1} />
        <path d={`M ${size.w*0.15} ${size.h*0.75} C ${size.w*0.1} ${size.h*0.9} ${size.w*0.3} ${size.h*0.9} ${size.w*0.4} ${size.h*0.85}`} stroke="#36D9E6" strokeWidth={0.5} fill="none" opacity={0.05} />
        
        {/* Geographic / Technical grid lines */}
        <line x1={size.w*0.5} y1="0" x2={size.w*0.5} y2={size.h} stroke="#69737D" strokeWidth={0.5} opacity={0.03} strokeDasharray="4 8" />
        <line x1="0" y1={size.h*0.5} x2={size.w} y2={size.h*0.5} stroke="#69737D" strokeWidth={0.5} opacity={0.03} strokeDasharray="4 8" />
      </svg>
      
      {/* Ambient technical markers instead of generic stars */}
      <AtmosphericMarker x={15} y={20} mouseX={mouseX} mouseY={mouseY} label="SYS.01" />
      <AtmosphericMarker x={85} y={15} mouseX={mouseX} mouseY={mouseY} type="bracket" />
      <AtmosphericMarker x={75} y={75} mouseX={mouseX} mouseY={mouseY} type="cross" />
      <AtmosphericMarker x={25} y={85} mouseX={mouseX} mouseY={mouseY} label="LAT.22" />
      <AtmosphericMarker x={50} y={10} mouseX={mouseX} mouseY={mouseY} type="cross" />
      <AtmosphericMarker x={90} y={50} mouseX={mouseX} mouseY={mouseY} type="bracket" />
      <AtmosphericMarker x={10} y={50} mouseX={mouseX} mouseY={mouseY} type="cross" />
      <AtmosphericMarker x={50} y={90} mouseX={mouseX} mouseY={mouseY} type="bracket" />
    </motion.div>
  );
}

function AtmosphericMarker({ x, y, type = "text", label, mouseX, mouseY }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const driftX = useSpring(0, { stiffness: 30, damping: 25 });
  const driftY = useSpring(0, { stiffness: 30, damping: 25 });

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
    
    // Magnetic distortion of background elements
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
      className="absolute flex items-center justify-center opacity-20 pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, x: driftX, y: driftY }}
    >
      {type === "text" && <div className="font-mono text-[8px] text-[#69737D] tracking-widest">{label || "+"}</div>}
      {type === "bracket" && <div className="font-mono text-[8px] text-[#69737D] tracking-widest">[ ]</div>}
      {type === "cross" && (
        <div className="relative w-3 h-3">
          <div className="absolute top-1/2 left-0 w-full h-[1px] bg-[#69737D] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 h-full w-[1px] bg-[#69737D] -translate-x-1/2" />
        </div>
      )}
    </motion.div>
  );
}

// --- PROJECT NODE ---
function ProjectNode({ project, mouseX, mouseY, hoveredId, setHoveredId }: any) {
  const router = useRouter();
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;
  
  // Staggered animation triggers
  const [stage, setStage] = useState(0);

  // Physics
  const driftX = useSpring(0, { stiffness: 60, damping: 15, mass: 0.8 });
  const driftY = useSpring(0, { stiffness: 60, damping: 15, mass: 0.8 });
  
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

    // 1. Magnetic Radius Check & Pull
    const MAGNETIC_RADIUS = 280;
    
    if (dist < MAGNETIC_RADIUS) {
      if (!isHovered && hoveredId === null) {
        // Only pull if we are not hovering something else
        const normalized = (MAGNETIC_RADIUS - dist) / MAGNETIC_RADIUS;
        const pull = Math.pow(normalized, 1.5); 
        // Strong physical pull up to 45px
        driftX.set(dx * pull * 0.45);
        driftY.set(dy * pull * 0.45);
      }
    } else {
      if (!isHovered) {
        driftX.set(0);
        driftY.set(0);
      }
    }

    // Set Hovered based strictly on distance to center
    if (dist < 80 && hoveredId === null) {
      setHoveredId(project.id);
    } else if (dist > 180 && isHovered) {
      setHoveredId(null);
    }
    
    // When hovered, resist cursor slightly but follow
    if (isHovered) {
      driftX.set(dx * 0.2);
      driftY.set(dy * 0.2);
    }
  });

  // Staggered Hover Cascade
  useEffect(() => {
    let t1: NodeJS.Timeout, t2: NodeJS.Timeout, t3: NodeJS.Timeout, t4: NodeJS.Timeout;
    if (isHovered) {
      setStage(1); // Marker brightens
      t1 = setTimeout(() => setStage(2), 150); // Title brightens
      t2 = setTimeout(() => setStage(3), 300); // Tech lines draw
      t3 = setTimeout(() => setStage(4), 500); // Tech labels appear
      t4 = setTimeout(() => setStage(5), 700); // Description appears
    } else {
      setStage(0);
    }
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
  }, [isHovered]);

  // Click Handler - Navigates to existing project route
  const handleClick = () => {
    // Stop hover interaction cleanly before navigating
    setHoveredId(null);
    router.push(`/projects/${project.id}`);
  };

  const bSize = project.primary ? 18 : 14; 
  const innerDot = project.primary ? 4 : 3;

  // SMART POSITIONING LOGIC
  // Calculate description box position based on quadrant to prevent overflow
  const isRightHalf = project.x > 50;
  const isBottomHalf = project.y > 50;
  
  const descAlignX = isRightHalf ? "right-12" : "left-12";
  const descAlignY = isBottomHalf ? "bottom-12" : "top-12";
  const descTextAlign = isRightHalf ? "text-right items-end" : "text-left items-start";

  // DYNAMIC TECH STACK POSITIONING (Prevents Overlap)
  // Calculate an arc strictly pointing AWAY from the description box
  let sweepCenter = 0;
  if (!isRightHalf && !isBottomHalf) sweepCenter = -135;      // Desc goes Bottom-Right, Tech arcs Top-Left
  else if (isRightHalf && !isBottomHalf) sweepCenter = -45;   // Desc goes Bottom-Left, Tech arcs Top-Right
  else if (isRightHalf && isBottomHalf) sweepCenter = 45;     // Desc goes Top-Left, Tech arcs Bottom-Right
  else if (!isRightHalf && isBottomHalf) sweepCenter = 135;   // Desc goes Top-Right, Tech arcs Bottom-Left

  const dynamicTech = project.tech.map((t: any, i: number) => {
    const N = project.tech.length;
    const spread = 150; // Sweep across 150 degrees
    const startAngle = sweepCenter - spread / 2;
    const angle = startAngle + (N > 1 ? (i / (N - 1)) * spread : 0);
    const rad = angle * (Math.PI / 180);
    // Irregular distance
    const distance = 90 + (i % 2 === 0 ? 0 : 40) + (i % 3 === 0 ? 20 : 0);
    return { ...t, x: Math.cos(rad) * distance, y: Math.sin(rad) * distance };
  });

  return (
    <motion.div
      ref={nodeRef}
      className="absolute flex items-center justify-center z-10"
      style={{ left: `${project.x}%`, top: `${project.y}%`, x: driftX, y: driftY }}
      animate={{ opacity: isOtherHovered ? 0.05 : 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Interaction Hitbox (No tooltips) */}
      <div 
        className="absolute w-[160px] h-[160px] rounded-full cursor-pointer z-20" 
        onClick={handleClick}
      />

      {/* PROJECT BEACON / MARKER */}
      <motion.div 
        className="relative flex items-center justify-center pointer-events-none z-10"
        animate={{ opacity: stage >= 1 ? 1 : 0.4, scale: stage >= 1 ? 1.2 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="absolute border border-[#69737D]/20 rounded-full" style={{ width: bSize * 1.5, height: bSize * 1.5 }} />
        <div className="absolute border border-[#36D9E6]/30" style={{ width: bSize, height: bSize, borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" }} />
        <div className="bg-[#E8EDF2]" style={{ width: innerDot, height: innerDot, borderRadius: "50%" }} />
      </motion.div>

      {/* PROJECT LABEL (Inactive / Stage 2) */}
      <motion.div 
        className={`absolute flex flex-col pointer-events-none whitespace-nowrap ${isBottomHalf ? 'bottom-8' : 'top-8'} ${isRightHalf ? 'right-0 items-end' : 'left-0 items-start'}`}
        animate={{ opacity: stage >= 2 ? 0 : 0.7 }}
        transition={{ duration: 0.3 }}
      >
        <div className="font-mono text-[9px] text-[#69737D] tracking-widest mb-1">{project.number}</div>
        <div className="font-serif text-sm tracking-widest text-[#E8EDF2]">{project.title}</div>
      </motion.div>

      {/* PROJECT ECOSYSTEM (Unified Composition) */}
      {/* Lines */}
      <svg className="absolute overflow-visible pointer-events-none z-0" style={{ width: 1, height: 1 }}>
        {dynamicTech.map((t: any, i: number) => (
          <TechLine key={i} target={t} awakened={stage >= 3} delay={i * 0.05} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
        ))}
      </svg>

      {/* Tech Nodes */}
      {dynamicTech.map((t: any, i: number) => (
        <TechNode key={i} tech={t} awakened={stage >= 4} delay={i * 0.05} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
      ))}

      {/* ACTIVE PROJECT DESCRIPTION (Stage 5) */}
      <AnimatePresence>
        {stage >= 5 && (
          <motion.div
            className={`absolute w-80 pointer-events-none flex flex-col ${descAlignX} ${descAlignY} ${descTextAlign} z-20`}
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(4px)", transition: { duration: 0.3 } }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="font-mono text-[10px] text-[#36D9E6] tracking-widest mb-2 flex items-center gap-3">
              {project.number}
              {project.inDevelopment && (
                <span className="text-[7px] border border-[#36D9E6]/30 px-1 py-[1px] tracking-[0.2em]">IN DEV</span>
              )}
            </div>
            
            <h2 className="font-serif text-[26px] leading-none text-[#E8EDF2] tracking-widest mb-2">{project.title}</h2>
            <h3 className="font-mono text-[9px] text-[#69737D] tracking-[0.2em] mb-4 uppercase">{project.subtitle}</h3>
            
            <p className={`font-sans text-xs text-[#E8EDF2]/80 leading-relaxed font-light mb-6 ${isRightHalf ? 'text-right' : 'text-left'}`}>
              {project.description}
            </p>
            
            {/* Click to Navigate instruction (Non-interactive visual only, parent div handles click) */}
            <div className="group font-mono text-[9px] text-[#36D9E6] tracking-[0.2em] flex items-center mt-2 pointer-events-none">
              {isRightHalf && <span className="mr-3 transition-transform">←</span>}
              ACCESS ARCHIVE 
              {!isRightHalf && <span className="ml-3 transition-transform">→</span>}
            </div>
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
      const push = Math.pow((150 - dist) / 150, 2);
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
      strokeOpacity={0.4}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: awakened ? 1 : 0 }}
      transition={{ duration: 0.6, delay: awakened ? delay : 0, ease: "easeOut" }}
    />
  );
}

function TechNode({ tech, awakened, delay, mouseX, mouseY, parentX, parentY }: any) {
  const driftX = useSpring(0, { stiffness: 40, damping: 20 });
  const driftY = useSpring(0, { stiffness: 40, damping: 20 });

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
      driftX.set((dx / dist) * -15 * push); 
      driftY.set((dy / dist) * -15 * push);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  return (
    <motion.div
      className="absolute font-mono text-[10px] text-[#E8EDF2] tracking-widest whitespace-nowrap pointer-events-none flex items-center gap-2 z-10"
      style={{ left: tech.x, top: tech.y, x: driftX, y: driftY, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, filter: "blur(2px)" }}
      animate={{ opacity: awakened ? 1 : 0, filter: awakened ? "blur(0px)" : "blur(2px)" }}
      transition={{ duration: 0.4, delay: awakened ? delay : 0 }}
    >
      <span className="text-[#36D9E6] text-[8px]">◇</span>
      {tech.name}
    </motion.div>
  );
}
