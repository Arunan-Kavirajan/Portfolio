"use client";

import { useEffect, useRef, useState } from "react";
import { useAnimationFrame } from "framer-motion";

type NodeLayout = { x: number; y: number; label?: string };
type Edge = [number, number];

interface ProjectLayout {
  nodes: NodeLayout[];
  edges: Edge[];
  env: "koda" | "certiva" | "ascend" | "echoes" | "default";
}

const LAYOUTS: Record<string, ProjectLayout> = {
  koda: {
    env: "koda",
    nodes: [
      { x: 300, y: 300, label: "SYNTHESIS.CORE" },
      { x: 200, y: 150, label: "REPOSITORY" },
      { x: 420, y: 180, label: "INGESTION" },
      { x: 180, y: 380, label: "ARCHITECT" },
      { x: 400, y: 400, label: "SECURITY" },
      { x: 120, y: 260, label: "CODE_AGENT" },
      { x: 480, y: 300, label: "GRAPH" },
      { x: 300, y: 100 },
      { x: 300, y: 480, label: "OUTPUT" },
      { x: 240, y: 220 },
      { x: 380, y: 260 },
      { x: 260, y: 400 }
    ],
    edges: [
      [0, 9], [0, 10], [0, 11], [9, 1], [10, 2], [11, 4],
      [1, 5], [2, 6], [3, 5], [4, 6], [3, 8], [4, 8], [1, 7], [2, 7]
    ]
  },
  certiva: {
    env: "certiva",
    nodes: [
      { x: 300, y: 300, label: "VERIFICATION" },
      { x: 150, y: 150, label: "DOCUMENT_A" },
      { x: 300, y: 150, label: "ISSUER" },
      { x: 450, y: 150, label: "DOCUMENT_B" },
      { x: 150, y: 300, label: "LEDGER_1" },
      { x: 450, y: 300, label: "LEDGER_2" },
      { x: 150, y: 450, label: "HASH_A" },
      { x: 300, y: 450, label: "BLOCKCHAIN" },
      { x: 450, y: 450, label: "HASH_B" },
      { x: 225, y: 225 },
      { x: 375, y: 225 },
      { x: 225, y: 375 }
    ],
    edges: [
      [1, 2], [2, 3], [1, 4], [3, 5], [4, 6], [5, 8], [6, 7], [8, 7],
      [4, 0], [5, 0], [2, 0], [7, 0], [1, 9], [9, 0], [3, 10], [10, 0]
    ]
  },
  ascend: {
    env: "ascend",
    nodes: [
      { x: 300, y: 120, label: "APEX" },
      { x: 300, y: 200 },
      { x: 240, y: 280, label: "PHASE_3A" },
      { x: 360, y: 280, label: "PHASE_3B" },
      { x: 180, y: 360, label: "PHASE_2A" },
      { x: 300, y: 360, label: "CORE" },
      { x: 420, y: 360, label: "PHASE_2B" },
      { x: 120, y: 440, label: "FOUNDATION_1" },
      { x: 240, y: 440 },
      { x: 360, y: 440 },
      { x: 480, y: 440, label: "FOUNDATION_2" },
      { x: 300, y: 480, label: "ENTRY" }
    ],
    edges: [
      [11, 8], [11, 9], [8, 4], [8, 5], [9, 5], [9, 6], [7, 4], [10, 6],
      [4, 2], [5, 2], [5, 3], [6, 3], [2, 1], [3, 1], [1, 0]
    ]
  },
  default: {
    env: "default",
    nodes: Array.from({ length: 12 }, (_, i) => ({
      x: 300 + Math.cos((i / 12) * Math.PI * 2) * 150,
      y: 300 + Math.sin((i / 12) * Math.PI * 2) * 150,
      label: i === 0 ? "CORE" : undefined
    })),
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8], [8, 9], [9, 10], [10, 11], [11, 0]]
  }
};

export default function ProjectField({ projectId }: { projectId: string }) {
  const svgRef = useRef<SVGSVGElement>(null);
  
  // Physical simulation state (lazy initialization to avoid impure function calls during render)
  const nodesRef = useRef<{id: number, x: number, y: number, bx: number, by: number, vx: number, vy: number, label: string}[] | null>(null);
  if (nodesRef.current === null) {
    nodesRef.current = Array.from({ length: 12 }, (_, i) => ({
      id: i, x: 300, y: 300, bx: 300, by: 300, vx: 0, vy: 0,
      label: ""
    }));
  }

  const secondaryNodesRef = useRef<{id: number, parentId: number, angleOffset: number, x: number, y: number, dist: number}[] | null>(null);
  if (secondaryNodesRef.current === null) {
    secondaryNodesRef.current = Array.from({ length: 24 }, (_, i) => ({
      // eslint-disable-next-line react-hooks/purity
      id: i, parentId: Math.floor(i / 2), angleOffset: (i % 2) * Math.PI + Math.random(),
      // eslint-disable-next-line react-hooks/purity
      x: 300, y: 300, dist: 20 + Math.random() * 20
    }));
  }

  const edgesRef = useRef<Edge[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  // DOM Refs for manual high-performance updates
  const primaryCircles = useRef<(SVGCircleElement | null)[]>([]);
  const secondaryCircles = useRef<(SVGCircleElement | null)[]>([]);
  const paths = useRef<(SVGPathElement | null)[]>([]);
  const labels = useRef<(SVGTextElement | null)[]>([]);

  const [env, setEnv] = useState<string>("default");
  const [edgeCount, setEdgeCount] = useState<number>(0);

  // Handle Project Change (Morphing)
  useEffect(() => {
    const layout = LAYOUTS[projectId] || LAYOUTS.default;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnv(layout.env);
    setEdgeCount(layout.edges.length);
    edgesRef.current = layout.edges;
    
    // Animate base positions to new layout
    layout.nodes.forEach((n, i) => {
      if (nodesRef.current && nodesRef.current[i]) {
        nodesRef.current[i].bx = n.x;
        nodesRef.current[i].by = n.y;
        nodesRef.current[i].label = n.label || "";
      }
    });
  }, [projectId]);

  // Handle Mouse Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      // Calculate coordinates relative to the 600x600 viewBox
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 600;
      mouseRef.current.y = ((e.clientY - rect.top) / rect.height) * 600;
      mouseRef.current.active = true;
    };
    const handleMouseLeave = () => { mouseRef.current.active = false; };
    
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // 60FPS Physics Engine
  useAnimationFrame((t, delta) => {
    const dt = Math.min(delta / 16, 2); // Normalize frame rate
    const mouse = mouseRef.current;
    
    if (!nodesRef.current || !secondaryNodesRef.current) return;

    // 1. Update Primary Nodes
    nodesRef.current.forEach((n, i) => {
      let targetX = n.bx;
      let targetY = n.by;

      // Magnetic Cursor Field
      if (mouse.active) {
        const dx = mouse.x - n.bx;
        const dy = mouse.y - n.by;
        const dist = Math.hypot(dx, dy);
        if (dist < 180) {
          const pull = (180 - dist) / 180;
          targetX += dx * pull * 0.4; // Pull towards mouse
          targetY += dy * pull * 0.4;
        }
      }

      // Very slow organic drift
      targetX += Math.cos(t * 0.001 + i) * 5;
      targetY += Math.sin(t * 0.0013 + i) * 5;

      // Spring physics
      const stiffness = 0.04;
      const damping = 0.75;
      const ax = (targetX - n.x) * stiffness;
      const ay = (targetY - n.y) * stiffness;
      
      n.vx = (n.vx + ax) * damping;
      n.vy = (n.vy + ay) * damping;
      
      n.x += n.vx * dt;
      n.y += n.vy * dt;

      // Update DOM
      if (primaryCircles.current[i]) {
        primaryCircles.current[i]!.setAttribute("cx", String(n.x));
        primaryCircles.current[i]!.setAttribute("cy", String(n.y));
      }

      // Labels reveal dynamically
      if (labels.current[i] && n.label) {
        labels.current[i]!.setAttribute("x", String(n.x + 10));
        labels.current[i]!.setAttribute("y", String(n.y + 3));
        labels.current[i]!.textContent = n.label;
        
        // Opacity based on mouse proximity
        const distToMouse = mouse.active ? Math.hypot(mouse.x - n.x, mouse.y - n.y) : 1000;
        const opacity = distToMouse < 120 ? 1 : 0.15;
        labels.current[i]!.setAttribute("opacity", String(opacity));
      }
    });

    // 2. Update Secondary Nodes (Orbiting Primaries)
    secondaryNodesRef.current.forEach((sn, i) => {
      const parent = nodesRef.current![sn.parentId];
      if (!parent) return;

      const angle = sn.angleOffset + t * 0.0005;
      const targetX = parent.x + Math.cos(angle) * sn.dist;
      const targetY = parent.y + Math.sin(angle) * sn.dist;
      
      sn.x += (targetX - sn.x) * 0.1 * dt;
      sn.y += (targetY - sn.y) * 0.1 * dt;

      if (secondaryCircles.current[i]) {
        secondaryCircles.current[i]!.setAttribute("cx", String(sn.x));
        secondaryCircles.current[i]!.setAttribute("cy", String(sn.y));
        
        const distToMouse = mouse.active ? Math.hypot(mouse.x - sn.x, mouse.y - sn.y) : 1000;
        secondaryCircles.current[i]!.setAttribute("opacity", String(distToMouse < 120 ? 0.6 : 0));
      }
    });

    // 3. Update Connections (Bending Lines)
    edgesRef.current.forEach((edge, i) => {
      const n1 = nodesRef.current![edge[0]];
      const n2 = nodesRef.current![edge[1]];
      if (!n1 || !n2 || !paths.current[i]) return;

      let midX = (n1.x + n2.x) / 2;
      let midY = (n1.y + n2.y) / 2;

      // Magnetic field bends the lines
      if (mouse.active) {
        const dist = Math.hypot(mouse.x - midX, mouse.y - midY);
        if (dist < 150) {
          const pull = (150 - dist) / 150;
          midX += (mouse.x - midX) * pull * 0.5;
          midY += (mouse.y - midY) * pull * 0.5;
        }
      }

      paths.current[i]!.setAttribute("d", `M ${n1.x} ${n1.y} Q ${midX} ${midY} ${n2.x} ${n2.y}`);
    });
  });

  return (
    <div className="w-full h-full min-h-[400px] flex items-center justify-center opacity-90">
      <svg ref={svgRef} viewBox="0 0 600 600" className="w-full max-w-[600px] aspect-square overflow-visible">
        
        {/* ENVIRONMENTAL GEOMETRY (Project Specific) */}
        <g className="transition-opacity duration-1000 ease-in-out" opacity={env === "koda" ? 0.15 : 0}>
          <circle cx="300" cy="300" r="220" fill="none" stroke="#69737D" strokeWidth="0.5" strokeDasharray="2 12" />
          <circle cx="300" cy="300" r="140" fill="none" stroke="#69737D" strokeWidth="0.5" opacity="0.5" />
          <path d="M 300 50 L 300 80 M 300 520 L 300 550 M 50 300 L 80 300 M 520 300 L 550 300" stroke="#69737D" strokeWidth="0.5" />
        </g>
        
        <g className="transition-opacity duration-1000 ease-in-out" opacity={env === "certiva" ? 0.15 : 0}>
          <path d="M 150 50 L 150 550 M 300 50 L 300 550 M 450 50 L 450 550" stroke="#69737D" strokeWidth="0.5" strokeDasharray="4 4" />
          <path d="M 50 150 L 550 150 M 50 300 L 550 300 M 50 450 L 550 450" stroke="#69737D" strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
        
        <g className="transition-opacity duration-1000 ease-in-out" opacity={env === "ascend" ? 0.15 : 0}>
          <path d="M 300 50 L 100 450 L 500 450 Z" fill="none" stroke="#69737D" strokeWidth="0.5" strokeDasharray="1 6" />
          <line x1="300" y1="50" x2="300" y2="550" stroke="#69737D" strokeWidth="0.5" opacity="0.5" />
        </g>

        {/* CONNECTIONS */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => (
            <path 
              key={`edge-${i}`} 
              ref={(el) => { paths.current[i] = el; }}
              fill="none" 
              stroke="#69737D" 
              strokeWidth="0.5" 
              opacity={i < edgeCount ? 0.3 : 0} 
              className="transition-opacity duration-1000"
            />
          ))}
        </g>

        {/* SECONDARY NODES */}
        <g>
          {Array.from({ length: 24 }).map((_, i) => (
            <circle 
              key={`sec-${i}`} 
              ref={(el) => { secondaryCircles.current[i] = el; }}
              r="1" 
              fill="#69737D" 
              className="transition-opacity duration-300"
            />
          ))}
        </g>

        {/* PRIMARY NODES & CORE */}
        <g>
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={`node-${i}`}>
              {i === 0 && (
                <circle 
                  cx="300" cy="300" r="14" 
                  fill="none" stroke="#36D9E6" strokeWidth="0.5" opacity="0.3" 
                  className="animate-spin-slow origin-center" style={{ transformOrigin: '300px 300px' }}
                />
              )}
              <circle 
                ref={(el) => { primaryCircles.current[i] = el; }}
                r={i === 0 ? "2.5" : "1.5"} 
                fill={i === 0 ? "#36D9E6" : "#E8EDF2"} 
              />
              <text
                ref={(el) => { labels.current[i] = el; }}
                className="font-mono text-[8px] tracking-[0.2em] transition-opacity duration-300"
                fill="#69737D"
                style={{ pointerEvents: 'none' }}
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
}
