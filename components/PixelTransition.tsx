"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";

interface PixelTransitionProps {
  isActive: boolean;
  onCovered: () => void;
  onComplete: () => void;
}

export default function PixelTransition({ isActive, onCovered, onComplete }: PixelTransitionProps) {
  const [shouldRender, setShouldRender] = useState(false);
  const [phase, setPhase] = useState<"idle" | "in" | "out">("idle");

  const rows = 8;
  const cols = 12;
  const totalBlocks = rows * cols;

  useEffect(() => {
    if (isActive && phase === "idle") {
      setShouldRender(true);
      setPhase("in");
      
      // Calculate max delay time (cols + rows) * 0.04s + 0.3s base duration
      const maxInDuration = ((cols + rows) * 40) + 300;
      
      setTimeout(() => {
        onCovered();
        setPhase("out");
        
        setTimeout(() => {
          setPhase("idle");
          setShouldRender(false);
          onComplete();
        }, maxInDuration + 100);
      }, maxInDuration);
    }
  }, [isActive, phase, onCovered, onComplete, cols, rows]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col pointer-events-none">
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex-1 flex">
          {Array.from({ length: cols }).map((_, colIndex) => {
            const delay = (rowIndex + colIndex) * 0.04;
            return (
              <motion.div
                key={`block-${rowIndex}-${colIndex}`}
                className="flex-1 bg-slate-900 border border-slate-900/10"
                initial={{ scale: 0, opacity: 0, borderRadius: "50%" }}
                animate={
                  phase === "in" 
                    ? { scale: 1.05, opacity: 1, borderRadius: "0%" }
                    : { scale: 0, opacity: 0, borderRadius: "50%" }
                }
                transition={{
                  duration: 0.4,
                  ease: "easeInOut",
                  delay: delay,
                }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
}
