"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring, AnimatePresence } from "framer-motion";

// --- TYPES ---
type TechNode = { name: string; x: number; y: number };
type Project = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  tech: TechNode[];
  x: number; // percentage viewport
  y: number; // percentage viewport
  inDevelopment?: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "koda",
    number: "01",
    title: "KODA",
    subtitle: "CODEBASE DETECTIVE",
    description: "Codebase investigation tool. Ingest public GitHub repositories, explore file structure, and prepare for multi-agent analysis.",
    x: 20, y: 30,
    inDevelopment: true,
    tech: [
      { name: "NEXT.JS", x: 0, y: -120 },
      { name: "TYPESCRIPT", x: 140, y: -40 },
      { name: "GITHUB API", x: 150, y: 50 },
      { name: "TAILWIND CSS", x: -130, y: -20 },
    ]
  },
  {
    id: "echoes",
    number: "02",
    title: "ECHOES",
    subtitle: "DRIFTING MESSAGES",
    description: "A public, anonymous message board where notes become part of a permanent, shared time capsule. No accounts, no algorithm. Just thoughts, drifting.",
    x: 55, y: 25,
    tech: [
      { name: "REACT", x: 0, y: -100 },
      { name: "FRAMER MOTION", x: 140, y: -10 },
      { name: "SUPABASE", x: -140, y: -20 },
      { name: "POSTGRESQL", x: 120, y: -70 },
      { name: "VITE", x: -110, y: -80 },
    ]
  },
  {
    id: "certiva",
    number: "03",
    title: "CERTIVA",
    subtitle: "CERTIFICATE AUTOMATION",
    description: "A browser-based certificate automation platform built to instantly map spreadsheet data onto PDF templates and generate personalized certificates in bulk.",
    x: 85, y: 45,
    tech: [
      { name: "REACT", x: -120, y: -70 },
      { name: "VITE", x: 110, y: -60 },
      { name: "PDF-LIB", x: 140, y: -10 },
      { name: "TYPESCRIPT", x: -140, y: 0 },
    ]
  },
  {
    id: "algolab",
    number: "04",
    title: "ALGORITHM LABORATORY",
    subtitle: "VISUALIZATION ENGINE",
    description: "An interactive, physics-driven visualization laboratory for algorithms and data structures, featuring dynamic frontends and a Python calculation engine.",
    x: 15, y: 75,
    inDevelopment: true,
    tech: [
      { name: "FASTAPI", x: 0, y: -110 },
      { name: "PYTHON", x: 120, y: -30 },
      { name: "REACT", x: -120, y: -40 },
      { name: "FRAMER MOTION", x: -70, y: -90 },
    ]
  },
  {
    id: "dbrownie",
    number: "05",
    title: "ANDROID BILLING APP",
    subtitle: "RETAIL POS SYSTEM",
    description: "A Flutter-based billing and order management app built for small food stalls, handling the full lifecycle with live ESC/POS Bluetooth receipt printing.",
    x: 40, y: 85,
    tech: [
      { name: "FLUTTER", x: -110, y: -60 },
      { name: "DART", x: 120, y: -40 },
      { name: "SQLITE", x: 140, y: 20 },
      { name: "BLUETOOTH ESC/POS", x: -150, y: 10 },
    ]
  },
  {
    id: "chatclub",
    number: "06",
    title: "CHAT CLUB WEBSITE",
    subtitle: "OFFICIAL PLATFORM",
    description: "The official platform for the Computer Hardware and AI Technology (CHAT) Club, featuring dynamic event management and fluid animations.",
    x: 75, y: 15,
    tech: [
      { name: "NEXT.JS", x: 0, y: -100 },
      { name: "FIREBASE", x: 130, y: -30 },
      { name: "FRAMER MOTION", x: -110, y: -40 },
      { name: "TAILWIND CSS", x: -60, y: -90 },
    ]
  },
  {
    id: "pallavan",
    number: "07",
    title: "PALLAVAN MES",
    subtitle: "OFFLINE-FIRST MES",
    description: "An enterprise-grade Manufacturing Execution System designed for factory floors, featuring a rigorous offline-first architecture with true 2-way sync.",
    x: 85, y: 80,
    tech: [
      { name: "REACT", x: -100, y: -80 },
      { name: "DEXIE.JS", x: 140, y: -20 },
      { name: "FIREBASE", x: 60, y: -110 },
      { name: "TYPESCRIPT", x: -130, y: 10 },
    ]
  },
  {
    id: "ascend",
    number: "08",
    title: "ASCEND",
    subtitle: "GAMIFIED PRODUCTIVITY",
    description: "A gamified productivity and study session platform featuring active focus tracking, study cohorts, leaderboards, and an achievements store.",
    x: 55, y: 60,
    inDevelopment: true,
    tech: [
      { name: "REACT", x: 0, y: -110 },
      { name: "FIREBASE", x: 140, y: -10 },
      { name: "FRAMER MOTION", x: -140, y: 0 },
      { name: "VITE", x: -120, y: -60 },
    ]
  }
];

export default function DesktopProjectArchive() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);
  
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  // Handle ESC to close project details
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="h-screen w-full bg-[#0B0E12] overflow-hidden relative cursor-default selection:bg-[#36D9E6]/30">
      <AnimatePresence>
        {!selectedId && PROJECTS.map((proj) => (
          <ProjectNode 
            key={proj.id} 
            project={proj} 
            mouseX={mouseX} 
            mouseY={mouseY}
            hoveredId={hoveredId}
            setHoveredId={setHoveredId}
            onSelect={() => setSelectedId(proj.id)}
          />
        ))}
      </AnimatePresence>

      <AnimatePresence>
        {selectedId && (
          <ProjectDetails 
            project={PROJECTS.find(p => p.id === selectedId)!} 
            onClose={() => setSelectedId(null)}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function ProjectNode({ project, mouseX, mouseY, hoveredId, setHoveredId, onSelect }: any) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [awakened, setAwakened] = useState(false);
  
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;

  // Proximity & Drift calculations
  const distance = useMotionValue(1000);
  const driftX = useSpring(0, { stiffness: 50, damping: 20 });
  const driftY = useSpring(0, { stiffness: 50, damping: 20 });
  
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
    // Slight delay to ensure layout is settled before measuring
    setTimeout(updateCenter, 100);
    return () => window.removeEventListener("resize", updateCenter);
  }, [centerX, centerY]);

  useAnimationFrame(() => {
    const mx = mouseX.get();
    const my = mouseY.get();
    const cx = centerX.get();
    const cy = centerY.get();
    
    // Ignore if uninitialized
    if (cx === 0 && cy === 0) return;
    
    const dx = mx - cx;
    const dy = my - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    distance.set(dist);

    // Stage 1: Proximity (100-150px)
    if (dist < 150 && !isHovered) {
      const pull = (150 - dist) / 150; 
      // Drift subtly toward the cursor (max ~15px)
      driftX.set(dx * 0.1 * pull);
      driftY.set(dy * 0.1 * pull);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  // Stage 3: System Awakens
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isHovered) {
      // Small delay before ecosystem emerges organically
      t = setTimeout(() => setAwakened(true), 200);
    } else {
      setAwakened(false);
    }
    return () => clearTimeout(t);
  }, [isHovered]);

  return (
    <motion.div
      ref={nodeRef}
      className="absolute flex items-center justify-center z-10"
      style={{
        left: `${project.x}%`,
        top: `${project.y}%`,
        x: driftX,
        y: driftY,
      }}
      animate={{ opacity: isOtherHovered ? 0.35 : 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={onSelect}
    >
      {/* Interactive Hitbox */}
      <div className="absolute w-[80px] h-[80px] rounded-full cursor-pointer" />
      
      {/* SVG Canvas for Lines */}
      <svg className="absolute overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
        {project.tech.map((t: any, i: number) => (
          <TechLine key={i} target={t} awakened={awakened} delay={i * 0.1} />
        ))}
      </svg>

      {/* Tech Nodes */}
      {project.tech.map((t: any, i: number) => (
        <TechNode key={i} tech={t} awakened={awakened} delay={i * 0.1} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
      ))}

      {/* Project Marker & Title */}
      <div className="relative flex flex-col items-center justify-center pointer-events-none">
        {/* Stage 2: Contact boundary */}
        <motion.div 
          className="absolute rounded-full border border-[#36D9E6]/30"
          initial={{ width: 4, height: 4, opacity: 0 }}
          animate={{ 
            width: isHovered ? 45 : 4, 
            height: isHovered ? 45 : 4, 
            opacity: isHovered ? 1 : 0 
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        />
        
        {/* The Node Dot */}
        <motion.div 
          layoutId={`proj-dot-${project.id}`}
          className="w-[3px] h-[3px] bg-[#E8EDF2] rounded-full" 
        />
        
        <motion.div 
          className="absolute top-5 flex flex-col items-center"
          initial={{ opacity: 0.25, y: -2 }}
          animate={{ opacity: isHovered ? 1 : 0.25, y: isHovered ? 0 : -2 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.span layoutId={`proj-num-${project.id}`} className="font-mono text-[9px] text-[#36D9E6] tracking-widest">{project.number}</motion.span>
            {project.inDevelopment && (
              <span className="font-mono text-[8px] text-[#36D9E6] border border-[#36D9E6]/50 bg-[#36D9E6]/10 px-1.5 py-[2px] tracking-[0.15em] rounded-[2px]">IN DEV</span>
            )}
          </div>
          <motion.span layoutId={`proj-title-${project.id}`} className="font-serif text-sm tracking-widest text-[#E8EDF2] whitespace-nowrap">{project.title}</motion.span>
        </motion.div>

        {/* Stage 5: Project Reveal */}
        <AnimatePresence>
          {awakened && (
            <motion.div 
              className="absolute top-[80px] w-64 p-4 pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 2 }}
              transition={{ delay: project.tech.length * 0.08 + 0.3, duration: 0.5 }}
              onClick={onSelect}
            >
              <h3 className="font-mono text-[10px] text-[#E8EDF2] tracking-[0.2em] mb-2">{project.subtitle}</h3>
              <p className="font-sans text-xs text-[#69737D] leading-relaxed mb-4">{project.description}</p>
              <div className="font-mono text-[9px] text-[#36D9E6] tracking-widest group-hover:text-[#E8EDF2] transition-colors flex items-center">
                VIEW PROJECT <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function TechLine({ target, awakened, delay }: any) {
  return (
    <motion.line
      x1={0} y1={0} x2={target.x} y2={target.y}
      stroke="#69737D"
      strokeWidth={1}
      strokeOpacity={0.15}
      initial={{ pathLength: 0 }}
      animate={{ pathLength: awakened ? 1 : 0 }}
      transition={{ duration: 0.8, delay: awakened ? delay : 0, ease: [0.16, 1, 0.3, 1] }}
    />
  );
}

function TechNode({ tech, awakened, delay, mouseX, mouseY, parentX, parentY }: any) {
  // Stage 4: Magnetic Ecosystem 
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

    // Subtle repulsion effect when hovering over the tech nodes
    if (dist < 80) {
      const push = (80 - dist) / 80;
      driftX.set((dx / dist) * -10 * push); 
      driftY.set((dy / dist) * -10 * push);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  return (
    <motion.div
      className="absolute font-mono text-[9px] text-[#69737D] tracking-widest whitespace-nowrap pointer-events-none"
      style={{
        left: tech.x,
        top: tech.y,
        x: driftX,
        y: driftY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: awakened ? 1 : 0, scale: awakened ? 1 : 0.95 }}
      transition={{ duration: 0.5, delay: awakened ? delay + 0.15 : 0 }}
    >
      {tech.name}
    </motion.div>
  );
}

function ProjectDetails({ project, onClose }: any) {
  return (
    <motion.div
      className="absolute inset-0 bg-[#0B0E12] z-50 flex flex-col"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#36D9E6]/20 to-transparent" />
      
      <button 
        onClick={onClose} 
        className="absolute top-10 right-12 font-mono text-[10px] text-[#69737D] hover:text-[#E8EDF2] transition-colors tracking-[0.2em] z-50"
      >
        [ ESC ] CLOSE
      </button>
      
      <div className="flex-1 overflow-y-auto px-12 py-32">
        <div className="max-w-4xl mx-auto w-full">
          
          <div className="mb-24 relative">
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                layoutId={`proj-dot-${project.id}`}
                className="w-[3px] h-[3px] bg-[#36D9E6] rounded-full" 
              />
              {project.inDevelopment && (
                 <span className="font-mono text-[10px] text-[#0B0E12] bg-[#36D9E6] px-2 py-1 tracking-[0.2em] rounded-sm font-bold">IN DEVELOPMENT</span>
              )}
            </div>
            <motion.span layoutId={`proj-num-${project.id}`} className="block font-mono text-sm text-[#36D9E6] tracking-widest mb-4">
              {project.number}
            </motion.span>
            <motion.h1 layoutId={`proj-title-${project.id}`} className="font-serif text-5xl md:text-7xl text-[#E8EDF2] tracking-tight mb-6">
              {project.title}
            </motion.h1>
            <h2 className="font-mono text-xs text-[#69737D] tracking-[0.3em]">{project.subtitle}</h2>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-[#69737D]/20 pt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="col-span-2">
              <h3 className="font-mono text-[10px] text-[#69737D] mb-6 tracking-widest">DESCRIPTION</h3>
              <p className="font-sans text-xl text-[#E8EDF2] leading-relaxed font-light mb-8">
                {project.description}
              </p>
              <p className="font-sans text-sm text-[#69737D] leading-loose">
                This is a detailed technical breakdown of the architecture, the approach taken, and the challenges resolved. The system leverages complex integrations to achieve high performance while maintaining an impeccable developer experience. Data pipelines, authentication flows, and real-time processing act as the backbone of this ecosystem.
              </p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] text-[#69737D] mb-6 tracking-widest">TECHNOLOGIES</h3>
              <ul className="space-y-4">
                {project.tech.map((t: any) => (
                  <li key={t.name} className="font-mono text-xs text-[#E8EDF2] tracking-[0.15em] flex items-center">
                    <span className="w-1 h-1 bg-[#36D9E6]/40 rounded-full mr-3" />
                    {t.name}
                  </li>
                ))}
              </ul>

              <h3 className="font-mono text-[10px] text-[#69737D] mb-6 mt-12 tracking-widest">LINKS</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="font-mono text-xs text-[#36D9E6] hover:text-[#E8EDF2] tracking-widest transition-colors flex items-center group">
                    GITHUB REPOSITORY
                    <span className="ml-2 group-hover:translate-x-1 transition-transform opacity-50">→</span>
                  </a>
                </li>
                <li>
                  <a href="#" className="font-mono text-xs text-[#36D9E6] hover:text-[#E8EDF2] tracking-widest transition-colors flex items-center group">
                    LIVE DEPLOYMENT
                    <span className="ml-2 group-hover:translate-x-1 transition-transform opacity-50">→</span>
                  </a>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
