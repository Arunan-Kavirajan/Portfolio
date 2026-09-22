"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Blob from "@/components/sections/Blob";
import HomeToAboutTransition from "@/components/sections/HomeToAboutTransition";
import PhysicsText from "@/components/sections/PhysicsText";
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
        className="absolute w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] aspect-square max-md:left-[50%] md:left-[25%] -translate-x-1/2 pointer-events-none"
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
          imageSrc="/profile_new.jpg"
        />
        <div className="absolute bottom-8 md:bottom-16 w-full flex justify-center text-center z-20 pointer-events-auto">
          <span 
            className="font-sans text-xs md:text-sm font-medium uppercase tracking-[0.2em] text-ink/90 animate-pulse cursor-pointer drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] hover:text-ink transition-colors" 
            onClick={handleBlobClick}
          >
            Click the blob for more info
          </span>
        </div>
      </motion.div>

      {/* Hero Text Layer */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-[40%_60%] lg:grid-cols-[45%_55%] h-full w-full max-w-7xl mx-auto px-8 md:px-12 pointer-events-none max-md:items-end md:items-center max-md:pb-[20vh]">
        {/* Empty left side for the blob to breathe on desktop */}
        <div className="hidden md:block"></div>
        
        {/* Elegant typography on the right */}
        <div className="pointer-events-auto flex flex-col justify-center pl-0 md:pl-8 lg:pl-12 relative">
          
          {/* Subtle dark halo to ensure perfect readability against the busy matrix */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,21,28,0.7)_0%,transparent_70%)] scale-[1.5] blur-xl" />

          <h1 className="font-serif text-3xl md:text-4xl lg:text-[3rem] xl:text-[3.5rem] tracking-tight leading-[1.2] text-ink drop-shadow-2xl">
            I build software, <br />
            but I&apos;m most curious <br />
            <span className="italic text-ink/90">about how it can be broken.</span>
          </h1>
          <p className="mt-6 font-sans text-base md:text-lg lg:text-xl text-ink font-light max-w-md leading-relaxed drop-shadow-xl">
            Exploring cybersecurity, AI, <br className="hidden md:block" />
            and the systems behind them.
          </p>
        </div>
      </div>

      {/* Physics Interactive Text Layer */}
      {phase === "idle" && <PhysicsText />}

      <HomeToAboutTransition phase={phase} />
    </main>
  );
}