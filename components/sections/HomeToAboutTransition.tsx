"use client";

import { motion } from "framer-motion";

type Phase = "idle" | "shrink" | "explode" | "slide";

const SMOOTH_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function HomeToAboutTransition({ phase }: { phase: Phase }) {
  return (
    <>
      <motion.div
        className="fixed z-[70] rounded-full pointer-events-none"
        style={{
          left: "42%",
          top: "50%",
          width: "680px",
          height: "680px",
          translateX: "-50%",
          translateY: "-50%",
          background: "linear-gradient(135deg, #5B21B6 0%, #C4B5FD 100%)",
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={
          phase === "explode" || phase === "slide"
            ? { scale: 8, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ duration: 0.7, ease: SMOOTH_EASE }}
      />

      <motion.div
        className="fixed inset-0 z-[71] bg-bg pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: phase === "slide" ? "0%" : "100%" }}
        transition={{ duration: 0.6, ease: SMOOTH_EASE }}
      />
    </>
  );
}