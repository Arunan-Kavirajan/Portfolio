"use client";

import { motion } from "framer-motion";
import Blob from "@/components/sections/Blob";
import { useLoading } from "@/components/layout/LoadingProvider";

export default function Home() {
  const { isLoading } = useLoading();

  return (
    <main className="h-full relative overflow-hidden flex items-center justify-center">
      <motion.div
        className="absolute w-[80vw] h-[80vw] max-w-[500px] max-h-[500px] aspect-square"
        initial={{ scale: 0, opacity: 0 }}
        animate={
          !isLoading
            ? { scale: 1, opacity: 1 }
            : { scale: 0, opacity: 0 }
        }
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
      >
        <Blob />
      </motion.div>

      <h1 className="relative z-10 font-serif text-6xl text-ink pointer-events-none">
        Arunan Kavirajan
      </h1>
    </main>
  );
}