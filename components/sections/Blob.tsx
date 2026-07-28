"use client";

import { useEffect, useRef, useState } from "react";
import { getSmoothPath } from "@/lib/blob-path";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const NUM_POINTS = 10;
const CENTER = { x: 300, y: 300 };
const BASE_RADIUS = 200;
const IDLE_AMPLITUDE = 12;
const CURSOR_INFLUENCE_RADIUS = 240;
const CURSOR_PULL_STRENGTH = 55;
const SMOOTHING = 0.08;

const SHAPE_PRESETS: number[][] = [
  [1.0, 1.1, 0.9, 1.15, 0.85, 1.05, 0.95, 1.2, 0.8, 1.0],
  [0.9, 1.2, 1.0, 0.85, 1.1, 0.95, 1.15, 0.9, 1.05, 0.8],
  [1.05, 0.85, 1.15, 1.0, 0.9, 1.2, 0.8, 1.1, 0.95, 1.0],
  [0.95, 1.15, 0.85, 1.1, 1.0, 0.8, 1.2, 0.9, 1.05, 0.85],
  [1.1, 0.9, 1.0, 1.2, 0.8, 1.05, 0.85, 0.95, 1.15, 1.0],
];

export default function Blob({
  onHoverChange,
  onClick,
  imageSrc,
}: {
  onHoverChange?: (hovering: boolean) => void;
  onClick?: () => void;
  imageSrc?: string;
} = {}) {
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipPathRef = useRef<SVGPathElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const currentPoints = useRef<[number, number][]>([]);
  const seeds = useRef<{ speed: number; phase: number }[]>([]);
  const shape = useRef<number[]>(SHAPE_PRESETS[0]);
  const prefersReduced = useReducedMotion();
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    shape.current =
      SHAPE_PRESETS[Math.floor(Math.random() * SHAPE_PRESETS.length)];

    const pts: [number, number][] = [];
    const sds: { speed: number; phase: number }[] = [];
    for (let i = 0; i < NUM_POINTS; i++) {
      const angle = (i / NUM_POINTS) * Math.PI * 2;
      const radius = BASE_RADIUS * shape.current[i];
      pts.push([
        CENTER.x + radius * Math.cos(angle),
        CENTER.y + radius * Math.sin(angle),
      ]);
      sds.push({
        speed: 0.4 + Math.random() * 0.6,
        phase: Math.random() * Math.PI * 2,
      });
    }
    currentPoints.current = pts;
    seeds.current = sds;

    const applyPath = () => {
      const d = getSmoothPath(currentPoints.current);
      if (pathRef.current) pathRef.current.setAttribute("d", d);
      if (clipPathRef.current) clipPathRef.current.setAttribute("d", d);
    };

    if (prefersReduced) {
      applyPath();
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

    const handleTouchMove = (e: TouchEvent) => {
      const svg = svgRef.current;
      if (!svg || e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = svg.getBoundingClientRect();
      const scaleX = 600 / rect.width;
      const scaleY = 600 / rect.height;
      mouseRef.current = {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);
    window.addEventListener("touchcancel", handleTouchEnd);

    let frame: number;
    const animate = (time: number) => {
      const t = time / 1000;

      for (let i = 0; i < NUM_POINTS; i++) {
        const angle = (i / NUM_POINTS) * Math.PI * 2;
        const { speed, phase } = seeds.current[i];

        const idleOffset = IDLE_AMPLITUDE * Math.sin(t * speed + phase);
        const radius = BASE_RADIUS * shape.current[i] + idleOffset;

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

      applyPath();
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("touchcancel", handleTouchEnd);
      cancelAnimationFrame(frame);
    };
  }, [prefersReduced]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 600"
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="blobGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5B21B6" />
          <stop offset="100%" stopColor="#C4B5FD" />
        </linearGradient>
        <clipPath id="blobClip">
          <path ref={clipPathRef} />
        </clipPath>
      </defs>

      <path
        ref={pathRef}
        fill="url(#blobGradient)"
        style={{ pointerEvents: "auto", cursor: onClick ? "pointer" : undefined }}
        onMouseEnter={() => {
          setIsHovering(true);
          onHoverChange?.(true);
        }}
        onMouseLeave={() => {
          setIsHovering(false);
          onHoverChange?.(false);
        }}
        onClick={onClick}
      />

      {imageSrc && (
        <image
          href={imageSrc}
          x="0"
          y="0"
          width="600"
          height="600"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#blobClip)"
          style={{
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.3s ease",
            pointerEvents: "none",
          }}
        />
      )}
    </svg>
  );
}