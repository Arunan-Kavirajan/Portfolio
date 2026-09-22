"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useAnimationFrame, useSpring, AnimatePresence, useTransform, useMotionTemplate } from "framer-motion";

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
    number: "01",
    title: "KODA",
    subtitle: "CODEBASE DETECTIVE",
    description: "Codebase investigation tool. Ingest public GitHub repositories, explore file structure, and prepare for multi-agent analysis.",
    x: 20, y: 30,
    inDevelopment: true,
    primary: true,
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
    primary: true,
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
    primary: true,
    tech: [
      { name: "REACT", x: 0, y: -110 },
      { name: "FIREBASE", x: 140, y: -10 },
      { name: "FRAMER MOTION", x: -140, y: 0 },
      { name: "VITE", x: -120, y: -60 },
    ]
  }
];

const STARS = [
  { id: 's1', type: 'anchor', x: 10, y: 15 },
  { id: 's2', type: 'anchor', x: 80, y: 30 },
  { id: 's3', type: 'anchor', x: 25, y: 85 },
  { id: 's4', type: 'anchor', x: 90, y: 70 },
  { id: 'm1', type: 'mid', x: 15, y: 45, blur: true },
  { id: 'm2', type: 'mid', x: 45, y: 15 },
  { id: 'm3', type: 'mid', x: 60, y: 50, blur: true },
  { id: 'm4', type: 'mid', x: 35, y: 70 },
  { id: 'm5', type: 'mid', x: 75, y: 85 },
  { id: 'mi1', type: 'micro', x: 5, y: 25 },
  { id: 'mi2', type: 'micro', x: 35, y: 5 },
  { id: 'mi3', type: 'micro', x: 55, y: 40 },
  { id: 'mi4', type: 'micro', x: 25, y: 55 },
  { id: 'mi5', type: 'micro', x: 15, y: 95 },
  { id: 'mi6', type: 'micro', x: 45, y: 95 },
  { id: 'mi7', type: 'micro', x: 85, y: 10 },
  { id: 'mi8', type: 'micro', x: 95, y: 45 },
  { id: 'mi9', type: 'micro', x: 65, y: 75 },
  { id: 'mi10', type: 'micro', x: 95, y: 95 },
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedId(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="h-screen w-full bg-[#0B0E12] overflow-hidden relative cursor-default selection:bg-[#36D9E6]/30">
      {/* Subtle Atmosphere: Very faint photographic noise */}
      <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <StarField mouseX={mouseX} mouseY={mouseY} hoveredId={hoveredId} />

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

function StarField({ mouseX, mouseY, hoveredId }: any) {
  const [size, setSize] = useState({ w: 0, h: 0 });
  useEffect(() => {
    setSize({ w: window.innerWidth, h: window.innerHeight });
    const r = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', r);
    return () => window.removeEventListener('resize', r);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {/* Inactive Lines */}
      {size.w > 0 && (
        <svg className="absolute inset-0 w-full h-full" width={size.w} height={size.h}>
          <path d={`M ${size.w*0.2} ${size.h*0.3} Q ${size.w*0.3} ${size.h*0.5} ${size.w*0.55} ${size.h*0.6}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.15} />
          <path d={`M ${size.w*0.55} ${size.h*0.25} Q ${size.w*0.7} ${size.h*0.2} ${size.w*0.85} ${size.h*0.45}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.1} strokeDasharray="4 4" />
          <path d={`M ${size.w*0.15} ${size.h*0.75} Q ${size.w*0.25} ${size.h*0.9} ${size.w*0.4} ${size.h*0.85}`} stroke="#69737D" strokeWidth={0.5} fill="none" opacity={0.15} />
        </svg>
      )}
      
      {/* Constellation Stars */}
      {STARS.map((star) => (
        <Star key={star.id} star={star} mouseX={mouseX} mouseY={mouseY} hoveredId={hoveredId} />
      ))}
    </div>
  );
}

function Star({ star, mouseX, mouseY, hoveredId }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const cx = useMotionValue(0);
  const cy = useMotionValue(0);
  const driftX = useSpring(0, { stiffness: 30, damping: 20 });
  const driftY = useSpring(0, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const measure = () => {
      if (ref.current) {
        const r = ref.current.getBoundingClientRect();
        cx.set(r.left + r.width / 2);
        cy.set(r.top + r.height / 2);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    setTimeout(measure, 100);
    return () => window.removeEventListener('resize', measure);
  }, [cx, cy]);

  useAnimationFrame(() => {
    if (cx.get() === 0) return;
    const dx = mouseX.get() - cx.get();
    const dy = mouseY.get() - cy.get();
    const dist = Math.sqrt(dx * dx + dy * dy);
    
    // Phase 1/4: Stars subtly shift toward the cursor/project
    if (dist < 200) {
      const pull = (200 - dist) / 200;
      driftX.set(dx * 0.05 * pull);
      driftY.set(dy * 0.05 * pull);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  const isAnchor = star.type === 'anchor';
  const isMid = star.type === 'mid';
  const size = isAnchor ? 3 : isMid ? 2 : 1;

  return (
    <motion.div
      ref={ref}
      className="absolute flex items-center justify-center"
      style={{ left: `${star.x}%`, top: `${star.y}%`, x: driftX, y: driftY }}
    >
      <div 
        className="rounded-full bg-[#E8EDF2]"
        style={{ 
          width: size, height: size, 
          opacity: isAnchor ? 0.6 : isMid ? 0.3 : 0.1,
          filter: star.blur ? "blur(1px)" : "none" 
        }} 
      />
      {isAnchor && (
        <>
          <div className="absolute w-4 h-4 border border-[#69737D]/20 rounded-full" style={{ borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%" }} />
          <div className="absolute w-8 h-8 border border-[#69737D]/10 rounded-full" style={{ borderRadius: "60% 40% 50% 50% / 40% 60% 50% 50%" }} />
        </>
      )}
    </motion.div>
  );
}

function ProjectNode({ project, mouseX, mouseY, hoveredId, setHoveredId, onSelect }: any) {
  const nodeRef = useRef<HTMLDivElement>(null);
  const [awakened, setAwakened] = useState(false);
  
  const centerX = useMotionValue(0);
  const centerY = useMotionValue(0);
  
  const isHovered = hoveredId === project.id;
  const isOtherHovered = hoveredId !== null && hoveredId !== project.id;

  const distance = useMotionValue(1000);
  const driftX = useSpring(0, { stiffness: 40, damping: 20 });
  const driftY = useSpring(0, { stiffness: 40, damping: 20 });
  
  // Phase 1: Dynamic opacity based on proximity
  const nodeOpacity = useMotionValue(0.15);
  
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

    if (dist < 150 && !isHovered) {
      const pull = (150 - dist) / 150; 
      driftX.set(dx * 0.1 * pull);
      driftY.set(dy * 0.1 * pull);
    } else {
      driftX.set(0);
      driftY.set(0);
    }

    // Dynamic Opacity Logic
    if (isHovered) {
      nodeOpacity.set(1);
    } else if (isOtherHovered) {
      nodeOpacity.set(0.05); // Unrelated projects fade deeply
    } else {
      // Proximity boost
      if (dist < 200) {
        nodeOpacity.set(0.15 + (1 - dist/200) * 0.6);
      } else {
        nodeOpacity.set(0.15);
      }
    }
  });

  // Phase 3: Delayed Awakening
  useEffect(() => {
    let t: NodeJS.Timeout;
    if (isHovered) {
      t = setTimeout(() => setAwakened(true), 200);
    } else {
      setAwakened(false);
    }
    return () => clearTimeout(t);
  }, [isHovered]);

  const pSize = project.primary ? 4 : 3;

  return (
    <motion.div
      ref={nodeRef}
      className="absolute flex items-center justify-center z-10"
      style={{ left: `${project.x}%`, top: `${project.y}%`, x: driftX, y: driftY }}
      onMouseEnter={() => setHoveredId(project.id)}
      onMouseLeave={() => setHoveredId(null)}
      onClick={onSelect}
    >
      <div className="absolute w-[80px] h-[80px] rounded-full cursor-pointer" />
      
      <svg className="absolute overflow-visible pointer-events-none" style={{ width: 1, height: 1 }}>
        {project.tech.map((t: any, i: number) => (
          <TechLine key={i} target={t} awakened={awakened} delay={i * 0.1} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
        ))}
      </svg>

      {project.tech.map((t: any, i: number) => (
        <TechNode key={i} tech={t} awakened={awakened} delay={i * 0.1} mouseX={mouseX} mouseY={mouseY} parentX={centerX} parentY={centerY} />
      ))}

      <div className="relative flex flex-col items-center justify-center pointer-events-none">
        
        {/* Project Beacon */}
        <div className="relative flex items-center justify-center">
          {/* Phase 2: Outer Ring expands organically */}
          <motion.div 
            className="absolute border border-[#69737D]/30"
            style={{ borderRadius: "45% 55% 40% 60% / 55% 45% 60% 40%" }}
            initial={{ width: pSize * 6, height: pSize * 6, opacity: 0.1, rotate: 0 }}
            animate={{ 
              width: isHovered ? 50 : pSize * 6, 
              height: isHovered ? 50 : pSize * 6, 
              opacity: isHovered ? 0.8 : 0.1,
              rotate: isHovered ? 90 : 0 
            }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
          {/* Inner Ring */}
          <motion.div 
            className="absolute border border-[#36D9E6]/30"
            style={{ borderRadius: "60% 40% 50% 50% / 40% 60% 50% 50%" }}
            initial={{ width: pSize * 3, height: pSize * 3, opacity: 0 }}
            animate={{ 
              width: isHovered ? 35 : pSize * 3, 
              height: isHovered ? 35 : pSize * 3, 
              opacity: isHovered ? 1 : 0 
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* Central Point */}
          <motion.div 
            layoutId={`proj-dot-${project.id}`}
            className="rounded-full" 
            style={{ width: pSize, height: pSize }}
            animate={{ backgroundColor: isHovered ? "#36D9E6" : "#E8EDF2" }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <motion.div 
          className="absolute top-6 flex flex-col items-center"
          style={{ opacity: nodeOpacity }}
        >
          <div className="flex items-center gap-2 mb-1">
            <motion.span layoutId={`proj-num-${project.id}`} className="font-mono text-[9px] text-[#36D9E6] tracking-widest">{project.number}</motion.span>
            {project.inDevelopment && (
              <span className="font-mono text-[8px] text-[#36D9E6] border border-[#36D9E6]/50 bg-[#36D9E6]/10 px-1.5 py-[2px] tracking-[0.15em] rounded-[2px]">IN DEV</span>
            )}
          </div>
          <motion.span layoutId={`proj-title-${project.id}`} className="font-serif text-sm tracking-widest text-[#E8EDF2] whitespace-nowrap">{project.title}</motion.span>
        </motion.div>

        {/* Phase 5: Project Information */}
        <AnimatePresence>
          {awakened && (
            <motion.div 
              className="absolute top-[90px] w-72 pointer-events-auto cursor-pointer group"
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ delay: project.tech.length * 0.08 + 0.2, duration: 0.6, ease: "easeOut" }}
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

function TechLine({ target, awakened, delay, mouseX, mouseY, parentX, parentY }: any) {
  // Phase 4: Curving ecosystem lines
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
      // Bend the line control point slightly away from the cursor
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
      strokeOpacity={0.25}
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
      driftX.set((dx / dist) * -8 * push); 
      driftY.set((dy / dist) * -8 * push);
    } else {
      driftX.set(0);
      driftY.set(0);
    }
  });

  return (
    <motion.div
      className="absolute font-mono text-[9px] text-[#69737D] tracking-widest whitespace-nowrap pointer-events-none"
      style={{ left: tech.x, top: tech.y, x: driftX, y: driftY, translateX: "-50%", translateY: "-50%" }}
      initial={{ opacity: 0, filter: "blur(4px)" }}
      animate={{ opacity: awakened ? 1 : 0, filter: awakened ? "blur(0px)" : "blur(4px)" }}
      transition={{ duration: 0.6, delay: awakened ? delay + 0.15 : 0 }}
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
      <div className="absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <button 
        onClick={onClose} 
        className="absolute top-10 right-12 font-mono text-[10px] text-[#69737D] hover:text-[#E8EDF2] transition-colors tracking-[0.2em] z-50"
      >
        [ ESC ] CLOSE
      </button>
      
      <div className="flex-1 overflow-y-auto px-12 py-32 z-10">
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
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
