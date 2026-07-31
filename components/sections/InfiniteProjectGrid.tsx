"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { projects } from "@/lib/projects";

/* ── Grid geometry ──────────────────────────────────────── */
const CELL_W = 300;
const CELL_H = 360;
const GAP = 24;
const STEP_X = CELL_W + GAP;
const STEP_Y = CELL_H + GAP;
const GRID_COLS = 4;
const GRID_ROWS = Math.ceil(projects.length / GRID_COLS);

/* ── Centre-proximity scaling ───────────────────────────── */
const MIN_SCALE = 0.75;
const MAX_SCALE = 1.15;

/* ── Momentum / physics ─────────────────────────────────── */
const FRICTION = 0.94;
const MIN_VEL = 0.5;

/* ── Interaction ────────────────────────────────────────── */
const DRAG_THRESHOLD = 5;
const KEYBOARD_SPEED = 20;

/* ── Card accent gradients (one per project slot) ───────── */
const ACCENTS = [
  "rgba(139, 92, 246, 0.20)",
  "rgba(59, 130, 246, 0.20)",
  "rgba(236, 72, 153, 0.20)",
  "rgba(16, 185, 129, 0.20)",
  "rgba(245, 158, 11, 0.20)",
  "rgba(239, 68, 68, 0.20)",
  "rgba(99, 102, 241, 0.20)",
  "rgba(6, 182, 212, 0.20)",
];

/* ── Helpers ────────────────────────────────────────────── */
/** Modulo that always returns a non-negative result. */
function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

type TileData = {
  key: string;
  idx: number;
  slug: string;
  title: string;
  tagline: string;
  x: number;
  y: number;
  scale: number;
};

/* ════════════════════════════════════════════════════════ */

export default function InfiniteProjectGrid() {
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  /* movement state kept in refs to avoid re-renders */
  const offsetRef = useRef({ x: 0, y: 0 });
  const velRef = useRef({ x: 0, y: 0 });
  const draggingRef = useRef(false);
  const lastPtrRef = useRef({ x: 0, y: 0 });
  const dragStartRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);
  const prevPtrRef = useRef({ x: 0, y: 0, t: 0 });
  const rafRef = useRef(0);
  const readyRef = useRef(false);

  /* only React state: the visible tile set (updated every frame) */
  const [tiles, setTiles] = useState<TileData[]>([]);

  /* ── centre the viewport on the tile pattern ─────────── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el || readyRef.current) return;
    readyRef.current = true;
    const vw = el.clientWidth;
    const vh = el.clientHeight;
    offsetRef.current.x = (GRID_COLS * STEP_X) / 2 - vw / 2;
    offsetRef.current.y = (GRID_ROWS * STEP_Y) / 2 - vh / 2;
  }, []);

  /* ── compute which tiles are visible + their transforms ─ */
  const computeTiles = useCallback((): TileData[] => {
    const el = containerRef.current;
    if (!el || !readyRef.current) return [];

    const vw = el.clientWidth;
    const vh = el.clientHeight;
    if (vw === 0 || vh === 0) return [];

    const ox = offsetRef.current.x;
    const oy = offsetRef.current.y;
    const cx = vw / 2;
    const cy = vh / 2;
    const maxDist = Math.sqrt(cx * cx + cy * cy);

    /* visible column/row range (plus one-tile buffer) */
    const startCol = Math.floor(ox / STEP_X) - 1;
    const endCol = Math.ceil((ox + vw) / STEP_X) + 1;
    const startRow = Math.floor(oy / STEP_Y) - 1;
    const endRow = Math.ceil((oy + vh) / STEP_Y) + 1;

    const result: TileData[] = [];

    for (let row = startRow; row <= endRow; row++) {
      for (let col = startCol; col <= endCol; col++) {
        /* map infinite grid position → project index */
        const c = mod(col, GRID_COLS);
        const r = mod(row, GRID_ROWS);
        const idx = mod(r * GRID_COLS + c, projects.length);
        const p = projects[idx];

        /* pixel position relative to viewport */
        const x = col * STEP_X - ox;
        const y = row * STEP_Y - oy;

        /* centre-proximity scale */
        const tcx = x + CELL_W / 2;
        const tcy = y + CELL_H / 2;
        const dist = Math.sqrt((tcx - cx) ** 2 + (tcy - cy) ** 2);
        const t = Math.min(dist / maxDist, 1);
        const scale = MAX_SCALE - t * (MAX_SCALE - MIN_SCALE);

        result.push({
          key: `${col}_${row}`,
          idx,
          slug: p.slug,
          title: p.title,
          tagline: p.tagline,
          x,
          y,
          scale,
        });
      }
    }

    return result;
  }, []);

  /* ── animation loop ──────────────────────────────────── */
  const tick = useCallback(() => {
    /* apply momentum when not dragging */
    if (!draggingRef.current) {
      const { x: vx, y: vy } = velRef.current;
      if (Math.abs(vx) > MIN_VEL || Math.abs(vy) > MIN_VEL) {
        offsetRef.current.x -= vx;
        offsetRef.current.y -= vy;
        velRef.current.x *= FRICTION;
        velRef.current.y *= FRICTION;
      } else {
        velRef.current.x = 0;
        velRef.current.y = 0;
      }
    }

    setTiles(computeTiles());
    rafRef.current = requestAnimationFrame(tick);
  }, [computeTiles]);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [tick]);

  /* ── wheel (must be non-passive to preventDefault) ───── */
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.shiftKey) {
        offsetRef.current.x += e.deltaY;
      } else {
        offsetRef.current.x += e.deltaX;
        offsetRef.current.y += e.deltaY;
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, []);

  /* ── keyboard arrows ─────────────────────────────────── */
  useEffect(() => {
    const pressed = new Set<string>();
    let kbRaf = 0;

    const applyKeys = () => {
      if (pressed.size === 0) return;
      if (pressed.has("ArrowUp")) offsetRef.current.y -= KEYBOARD_SPEED;
      if (pressed.has("ArrowDown")) offsetRef.current.y += KEYBOARD_SPEED;
      if (pressed.has("ArrowLeft")) offsetRef.current.x -= KEYBOARD_SPEED;
      if (pressed.has("ArrowRight")) offsetRef.current.x += KEYBOARD_SPEED;
      kbRaf = requestAnimationFrame(applyKeys);
    };

    const onDown = (e: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key))
        return;
      e.preventDefault();
      const wasEmpty = pressed.size === 0;
      pressed.add(e.key);
      if (wasEmpty) kbRaf = requestAnimationFrame(applyKeys);
    };

    const onUp = (e: KeyboardEvent) => {
      pressed.delete(e.key);
      if (pressed.size === 0) cancelAnimationFrame(kbRaf);
    };

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      cancelAnimationFrame(kbRaf);
    };
  }, []);

  /* ── pointer handlers (drag + momentum) ──────────────── */
  const onPtrDown = useCallback((e: React.PointerEvent) => {
    draggingRef.current = true;
    hasDraggedRef.current = false;
    velRef.current = { x: 0, y: 0 };
    lastPtrRef.current = { x: e.clientX, y: e.clientY };
    dragStartRef.current = { x: e.clientX, y: e.clientY };
    prevPtrRef.current = { x: e.clientX, y: e.clientY, t: performance.now() };
    containerRef.current?.setPointerCapture(e.pointerId);
  }, []);

  const onPtrMove = useCallback((e: React.PointerEvent) => {
    if (!draggingRef.current) return;

    const dx = e.clientX - lastPtrRef.current.x;
    const dy = e.clientY - lastPtrRef.current.y;
    offsetRef.current.x -= dx;
    offsetRef.current.y -= dy;

    /* drag threshold to separate click from drag */
    const totalDx = e.clientX - dragStartRef.current.x;
    const totalDy = e.clientY - dragStartRef.current.y;
    if (Math.abs(totalDx) > DRAG_THRESHOLD || Math.abs(totalDy) > DRAG_THRESHOLD) {
      hasDraggedRef.current = true;
    }

    /* velocity tracking (normalised to ~60 fps) */
    const now = performance.now();
    const dt = now - prevPtrRef.current.t;
    if (dt > 0) {
      const f = 16 / dt;
      velRef.current.x = (e.clientX - prevPtrRef.current.x) * f;
      velRef.current.y = (e.clientY - prevPtrRef.current.y) * f;
    }

    prevPtrRef.current = { x: e.clientX, y: e.clientY, t: now };
    lastPtrRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  const onPtrUp = useCallback(() => {
    draggingRef.current = false;
  }, []);

  /* ── tile click (navigate only if the pointer didn't drag) */
  const onTileClick = useCallback(
    (e: React.MouseEvent, slug: string) => {
      if (hasDraggedRef.current) {
        e.preventDefault();
        return;
      }
      e.preventDefault();
      router.push(`/projects/${slug}`);
    },
    [router],
  );

  /* ── render ──────────────────────────────────────────── */
  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden select-none"
      style={{ touchAction: "none" }}
      onPointerDown={onPtrDown}
      onPointerMove={onPtrMove}
      onPointerUp={onPtrUp}
      onPointerCancel={onPtrUp}
    >
      {tiles.map((tile) => (
        <a
          key={tile.key}
          href={`/projects/${tile.slug}`}
          onClick={(e) => onTileClick(e, tile.slug)}
          draggable={false}
          className="absolute top-0 left-0 rounded-[20px] bg-surface border border-border
                     flex flex-col justify-end p-6 overflow-hidden
                     hover:border-muted/50"
          style={{
            width: CELL_W,
            height: CELL_H,
            transform: `translate(${tile.x}px, ${tile.y}px) scale(${tile.scale.toFixed(4)})`,
            transformOrigin: "center center",
            willChange: "transform",
            backgroundImage: `linear-gradient(135deg, ${ACCENTS[tile.idx % ACCENTS.length]} 0%, transparent 60%)`,
          }}
        >
          <h2 className="font-serif text-2xl text-ink leading-tight">
            {tile.title}
          </h2>
          <p className="font-sans text-sm text-muted mt-1">{tile.tagline}</p>
        </a>
      ))}
    </div>
  );
}
