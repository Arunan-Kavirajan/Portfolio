"use client";

import { useEffect, useRef } from "react";
import { getSmoothPath } from "@/lib/blob-path";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const NUM_POINTS = 10;
const CENTER = { x: 300, y: 300 };
const BASE_RADIUS = 200;
const IDLE_AMPLITUDE = 12;
const CURSOR_INFLUENCE_RADIUS = 240;
const CURSOR_PULL_STRENGTH = 55;
const SMOOTHING = 0.08;

export default function Blob() {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const currentPoints = useRef<[number, number][]>([]);
  const seeds = useRef<{ speed: number; phase: number }[]>([]);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    // set up base ring of points + random idle wobble per point
    const pts: [number, number][] = [];
    const sds: { speed: number; phase: number }[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const angle = (i / NUM_POINTS) * Math.PI * 2;
      pts.push([
        CENTER.x + BASE_RADIUS * Math.cos(angle),
        CENTER.y + BASE_RADIUS * Math.sin(angle),
      ]);
      sds.push({
        speed: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }
    currentPoints.current = pts;
    seeds.current = sds;

    // If the user prefers reduced motion, draw one static frame and stop here
    if (prefersReduced) {
      if (pathRef.current) {
        pathRef.current.setAttribute("d", getSmoothPath(currentPoints.current));
      }
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const svg = svgRef.current;
      if (!svg) return;
      const rect = svg.getBoundingClientRect();
      const scaleX = 600 / rect.width;
      const scaleY = 600 / rect.height;
      mouseRef.current = {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    let frame: number;
    const animate = (time: number) => {
      const t = time / 1000;

      for (let i = 0; i < NUM_POINTS; i++) {
        const angle = (i / NUM_POINTS) * Math.PI * 2;
        const { speed, phase } = seeds.current[i];

        const idleOffset = IDLE_AMPLITUDE * Math.sin(t * speed + phase);
        const radius = BASE_RADIUS + idleOffset;

        const baseX = CENTER.x + radius * Math.cos(angle);
        const baseY = CENTER.y + radius * Math.sin(angle);

        const dx = mouseRef.current.x - baseX;
        const dy = mouseRef.current.y - baseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetX = baseX;
        let targetY = baseY;

        if (dist < CURSOR_INFLUENCE_RADIUS) {
          const falloff = 1 - dist / CURSOR_INFLUENCE_RADIUS;
          const pull = falloff * CURSOR_PULL_STRENGTH;
          const nx = dx / (dist || 1);
          const ny = dy / (dist || 1);
          targetX += nx * pull;
          targetY += ny * pull;
        }

        const cur = currentPoints.current[i];
        cur[0] += (targetX - cur[0]) * SMOOTHING;
        cur[1] += (targetY - cur[1]) * SMOOTHING;
      }

      if (pathRef.current) {
        pathRef.current.setAttribute("d", getSmoothPath(currentPoints.current));
      }

      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(frame);
    };
  }, [prefersReduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      className="w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF8F65" />
          <stop offset="100%" stopColor="#FFD3AC" />
        </linearGradient>
      </defs>
      <path ref={pathRef} fill="url(#blobGradient)" />
    </svg>
  );
}