"use client";

import { AnimatePresence, motion } from "framer-motion";

export default function LoadingScreen({
  show,
  count,
}: {
  show: boolean;
  count: number;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-bg flex flex-col items-center justify-center gap-4"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <p className="font-sans text-sm tracking-wide text-muted">
            arunan kavirajan
          </p>
          <p className="font-serif text-7xl text-ink">{count}&apos;</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}