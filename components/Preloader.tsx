"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { PixelMoon, PixelStar } from "./PixelIcons";

export default function Preloader({ onComplete }: { onComplete?: () => void }) {
  const [isVisible, setIsVisible] = useState(true);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Show preloader for 2.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleExitComplete = () => {
    if (onComplete) onComplete();
  };

  // Deterministic pseudo-random for SSR hydration matching
  const getRand = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
        >
          {/* Static Stars Background */}
          <div className="absolute inset-0 opacity-40">
            {isMounted && Array.from({ length: 30 }).map((_, i) => (
              <motion.div
                key={`star-${i}`}
                className="absolute"
                style={{
                  top: `${getRand(i * 10) * 100}%`,
                  left: `${getRand(i * 20) * 100}%`,
                }}
                animate={{
                  opacity: [0.2, 1, 0.2],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + getRand(i * 30) * 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: getRand(i * 40) * 2,
                }}
              >
                <PixelStar color={i % 3 === 0 ? "#fef08a" : "#ffffff"} className="w-3 h-3 md:w-4 md:h-4" />
              </motion.div>
            ))}
          </div>

          {/* Rising Moon */}
          <motion.div
            initial={{ y: 200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="relative z-10"
          >
            <PixelMoon className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_30px_rgba(254,240,138,0.4)]" />
          </motion.div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="mt-8 font-[family-name:var(--font-pixel)] text-xs md:text-sm text-yellow-100/70 tracking-[0.3em] uppercase animate-pulse"
          >
            Entering Night City...
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
