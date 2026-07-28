"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Blob from "@/components/sections/Blob";
import HomeToAboutTransition from "@/components/sections/HomeToAboutTransition";
import { useLoading } from "@/components/layout/LoadingProvider";
import { useHeroHover } from "@/components/layout/HeroHoverProvider";

const highlights = [
  "Technical Team Vice Head at CHAT",
  "IT undergrad at SRM Institute of Science and Technology",
  "Building Echoes, an anonymous message platform",
];

type Phase = "idle" | "shrink" | "explode" | "slide";

const SHRINK_MS = 400;
const EXPLODE_MS = 700;
const SLIDE_MS = 600;
const SMOOTH_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function Home() {
  const { isLoading } = useLoading();
  const { isHeroHovering, setIsHeroHovering } = useHeroHover();
  const [phase, setPhase] = useState<Phase>("idle");
  const router = useRouter();

  const handleBlobClick = () => {
    if (phase !== "idle") return;

    setIsHeroHovering(true);
    setPhase("shrink");

    setTimeout(() => setPhase("explode"), SHRINK_MS);
    // Slide starts slightly before explode fully finishes, so the two
    // overlap instead of handing off with a hard cut.
    setTimeout(() => setPhase("slide"), SHRINK_MS + EXPLODE_MS - 150);
    setTimeout(() => {
      router.push("/about");
    }, SHRINK_MS + EXPLODE_MS + SLIDE_MS);
  };

  return (
    <main className="h-full relative overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute w-[95vw] h-[95vw] max-w-[680px] max-h-[680px] aspect-square left-[42%] -translate-x-1/2 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          isLoading
            ? { scale: 0, opacity: 0 }
            : phase !== "idle"
              ? { scale: 0.15, opacity: 0 }
              : { scale: 1, opacity: 1 }
        }
        transition={
          phase !== "idle"
            ? { duration: SHRINK_MS / 1000, ease: SMOOTH_EASE }
            : { type: "spring", stiffness: 120, damping: 12 }
        }
      >
        <Blob
          onHoverChange={setIsHeroHovering}
          onClick={handleBlobClick}
          imageSrc="/images/profile.jpg"
        />
      </motion.div>

      <HomeToAboutTransition phase={phase} />

      <motion.div
        layout
        transition={{ type: "spring", stiffness: 170, damping: 22 }}
        className={`z-40 pointer-events-none ${
          isHeroHovering
            ? "fixed left-[42%] top-[68%] -translate-x-1/2 text-center max-w-xs"
            : "relative ml-[30%] max-w-sm"
        }`}
      >
        <motion.h1
          animate={!isLoading ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className={`font-serif text-ink transition-all ${
            isHeroHovering ? "text-2xl mb-2" : "text-5xl mb-6"
          }`}
        >
          IT Undergrad &amp; Developer
        </motion.h1>
        <motion.ul
          className="flex flex-col gap-2"
          animate={{ opacity: isHeroHovering ? 0 : 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {highlights.map((line) => (
            <li key={line} className="font-sans text-sm text-ink/80">
              {line}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </main>
  );
}