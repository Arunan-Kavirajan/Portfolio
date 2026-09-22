"use client";

import { useEffect, useRef, useState } from "react";
import { getSmoothPath } from "@/lib/blob-path";
import { useReducedMotion } from "@/lib/hooks/useReducedMotion";

const NUM_POINTS = 10;
const CENTER = { x: 400, y: 400 };
const BASE_RADIUS = 280;
const IDLE_AMPLITUDE = 16;
const CURSOR_INFLUENCE_RADIUS = 300;
const CURSOR_PULL_STRENGTH = 75;
const SMOOTHING = 0.12;

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

  const pointerDownTime = useRef<number>(0);
  const pointerDownPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

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
      const scaleX = 800 / rect.width;
      const scaleY = 800 / rect.height;
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
      const scaleX = 800 / rect.width;
      const scaleY = 800 / rect.height;
      mouseRef.current = {
        x: (touch.clientX - rect.left) * scaleX,
        y: (touch.clientY - rect.top) * scaleY,
      };

      // Detect if dragging over the blob from outside
      const elUnderFinger = document.elementFromPoint(touch.clientX, touch.clientY);
      const isOverBlob = elUnderFinger?.id === "mainBlobPath";
      setIsHovering(isOverBlob);
      onHoverChange?.(isOverBlob);
    };

    const handleTouchEnd = () => {
      mouseRef.current = { x: -9999, y: -9999 };
      // Note: we don't reset hover here so tap/click logic can finish in onPointerUp
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
  }, [prefersReduced, onHoverChange]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 800 800"
      className="w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="blobClip">
          <path ref={clipPathRef} />
        </clipPath>
      </defs>

      <path
        id="mainBlobPath"
        ref={pathRef}
        fill="var(--color-ink)"
        data-blob-hover="true"
        style={{ pointerEvents: "auto", touchAction: "none", cursor: onClick ? "pointer" : undefined }}
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") {
            setIsHovering(true);
            onHoverChange?.(true);
          }
        }}
        onPointerLeave={(e) => {
          if (e.pointerType === "mouse") {
            setIsHovering(false);
            onHoverChange?.(false);
          }
        }}
        onPointerDown={(e) => {
          pointerDownTime.current = performance.now();
          pointerDownPos.current = { x: e.clientX, y: e.clientY };
          setIsHovering(true);
          onHoverChange?.(true);
          try { (e.target as Element).setPointerCapture(e.pointerId); } catch {}
        }}
        onPointerUp={(e) => {
          const elapsed = performance.now() - pointerDownTime.current;
          const dx = e.clientX - pointerDownPos.current.x;
          const dy = e.clientY - pointerDownPos.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (e.pointerType !== "mouse") {
            setIsHovering(false);
            onHoverChange?.(false);
          }

          if (elapsed < 300 && dist < 15) {
            onClick?.();
          }
          try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
        }}
        onPointerCancel={(e) => {
          if (e.pointerType !== "mouse") {
            setIsHovering(false);
            onHoverChange?.(false);
          }
          try { (e.target as Element).releasePointerCapture(e.pointerId); } catch {}
        }}
      />

      {imageSrc && (
        <image
          href={imageSrc}
          x="0"
          y="0"
          width="800"
          height="800"
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