"use client";

import { motion } from "framer-motion";
import Blob from "@/components/sections/Blob";
import { useLoading } from "@/components/layout/LoadingProvider";

const highlights = [
  "Technical Team Vice Head at CHAT",
  "IT undergrad at SRM Institute of Science and Technology",
  "Building Echoes, an anonymous message platform",
];

export default function Home() {
  const { isLoading } = useLoading();

  return (
    <main className="h-full relative overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute w-[95vw] h-[95vw] max-w-[680px] max-h-[680px] aspect-square left-[42%] -translate-x-1/2 pointer-events-none"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          !isLoading ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <Blob />
      </motion.div>

      <motion.div
        className="relative z-10 max-w-sm ml-[30%] pointer-events-none"
        initial={{ opacity: 0, y: 12 }}
        animate={!isLoading ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="font-serif text-5xl text-ink mb-6">
          IT Undergrad &amp; Developer
        </h1>
        <ul className="flex flex-col gap-2">
          {highlights.map((line) => (
            <li key={line} className="font-sans text-sm text-muted">
              {line}
            </li>
          ))}
        </ul>
      </motion.div>
    </main>
  );
}