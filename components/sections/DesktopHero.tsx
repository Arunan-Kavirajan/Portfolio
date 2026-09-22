"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Blob from "@/components/sections/Blob";
import HomeToAboutTransition from "@/components/sections/HomeToAboutTransition";
import PhysicsText from "@/components/sections/PhysicsText";
import { useLoading } from "@/components/layout/LoadingProvider";
import { useHeroHover } from "@/components/layout/HeroHoverProvider";

type Phase = "idle" | "shrink" | "explode" | "slide";

const SHRINK_MS = 400;
const EXPLODE_MS = 700;
const SLIDE_MS = 600;
const SMOOTH_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];

export default function DesktopHero() {
  const { isLoading } = useLoading();
  const { setIsHeroHovering } = useHeroHover();
  const [phase, setPhase] = useState<Phase>("idle");
  const router = useRouter();

  const handleBlobClick = () => {
    if (phase !== "idle") return;

    setIsHeroHovering(true);
    setPhase("shrink");

    setTimeout(() => setPhase("explode"), SHRINK_MS);
    setTimeout(() => setPhase("slide"), SHRINK_MS + EXPLODE_MS - 150);
    setTimeout(() => {
      router.push("/about");
    }, SHRINK_MS + EXPLODE_MS + SLIDE_MS);
  };

  return (
    <main className="min-h-screen relative overflow-hidden flex items-center justify-center w-full">
      <motion.div
        className="absolute w-[100vw] h-[100vw] max-w-[800px] max-h-[800px] aspect-square left-[25%] -translate-x-1/2 pointer-events-none z-10 flex-shrink-0"
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
        <div className="absolute bottom-16 w-full flex justify-center text-center z-20 pointer-events-auto">
          <span 
            className="font-sans text-sm font-medium uppercase tracking-[0.2em] text-ink/90 animate-pulse cursor-pointer drop-shadow-[0_0_8px_rgba(0,0,0,0.8)] hover:text-ink transition-colors" 
            onClick={handleBlobClick}
          >
            Click the blob for more info
          </span>
        </div>
      </motion.div>

      {/* Hero Text Layer */}
      <div className="absolute inset-0 z-20 grid grid-cols-[40%_60%] lg:grid-cols-[45%_55%] w-full max-w-7xl mx-auto px-12 pointer-events-none items-center">
        {/* Empty left side for the blob to breathe */}
        <div className="block"></div>
        
        {/* Elegant typography on the right */}
        <div className="pointer-events-auto flex flex-col justify-center pl-8 lg:pl-12 relative">
          
          {/* Subtle dark halo to ensure perfect readability against the busy matrix */}
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(16,21,28,0.7)_0%,transparent_70%)] scale-[1.5] blur-xl" />

          <h1 className="font-serif text-4xl lg:text-[3rem] xl:text-[3.5rem] tracking-tight leading-[1.2] text-ink drop-shadow-2xl">
            I build software, <br />
            but I&apos;m most curious <br />
            <span className="italic text-ink/90">about how it can be broken.</span>
          </h1>
          <p className="mt-6 font-sans text-lg lg:text-xl text-ink font-light max-w-md leading-relaxed drop-shadow-xl">
            Exploring cybersecurity, AI, <br />
            and the systems behind them.
          </p>
        </div>
      </div>

      {phase === "idle" && <PhysicsText />}
      <HomeToAboutTransition phase={phase} />
    </main>
  );
}
