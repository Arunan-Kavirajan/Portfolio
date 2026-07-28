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

const SHRINK_MS = 250;
const EXPLODE_MS = 550;
const SLIDE_MS = 450;

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
    setTimeout(() => setPhase("slide"), SHRINK_MS + EXPLODE_MS);
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
            ? { duration: SHRINK_MS / 1000, ease: "easeIn" }
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
        className="relative z-50 max-w-sm ml-[30%] pointer-events-none"
        initial={{ opacity: 0, y: 12 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-serif text-5xl text-ink mb-6">
          IT Undergrad &amp; Developer
        </h1>
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