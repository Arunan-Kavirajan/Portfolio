"use client";

import { motion } from "framer-motion";

type Phase = "idle" | "shrink" | "explode" | "slide";

export default function HomeToAboutTransition({ phase }: { phase: Phase }) {
  return (
    <>
      {/* Explosion: a circle growing from the blob's position to cover the whole screen */}
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
        transition={{ duration: 0.55, ease: "easeInOut" }}
      />

      {/* Slide: a solid panel rising from the bottom, matching the site background */}
      <motion.div
        className="fixed inset-0 z-[71] bg-bg pointer-events-none"
        initial={{ y: "100%" }}
        animate={{ y: phase === "slide" ? "0%" : "100%" }}
        transition={{ duration: 0.45, ease: "easeInOut" }}
      />
    </>
  );
}