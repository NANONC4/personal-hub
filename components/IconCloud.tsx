"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface IconCloudProps {
  slugs: string[];
  className?: string;
}

export function IconCloud({ slugs, className }: IconCloudProps) {
  const [positions, setPositions] = useState<{ x: number; y: number; scale: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random positions and animations for the icons on mount
    const newPositions = slugs.map(() => ({
      x: Math.random() * 80 - 40, // -40% to 40%
      y: Math.random() * 80 - 40, // -40% to 40%
      scale: Math.random() * 0.5 + 0.8, // 0.8 to 1.3
      delay: Math.random() * 2, // 0 to 2s
    }));
    setPositions(newPositions);
  }, [slugs]);

  if (positions.length === 0) return null;

  return (
    <div className={cn("relative flex h-full w-full items-center justify-center overflow-hidden", className)}>
      {slugs.map((slug, i) => (
        <motion.div
          key={slug}
          className="absolute"
          initial={{ opacity: 0, x: 0, y: 0 }}
          animate={{
            opacity: [0.4, 1, 0.4],
            x: [`${positions[i].x}%`, `${positions[i].x + 10}%`, `${positions[i].x}%`],
            y: [`${positions[i].y}%`, `${positions[i].y - 15}%`, `${positions[i].y}%`],
            scale: [positions[i].scale, positions[i].scale * 1.2, positions[i].scale],
          }}
          transition={{
            duration: 8 + Math.random() * 5,
            repeat: Infinity,
            delay: positions[i].delay,
            ease: "easeInOut",
          }}
        >
          <img
            src={`https://cdn.simpleicons.org/${slug}/fff`}
            alt={slug}
            className="w-12 h-12 object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-all filter hover:brightness-150"
            draggable={false}
          />
        </motion.div>
      ))}
      {/* A subtle center glow to tie them together */}
      <div className="absolute inset-0 bg-gradient-radial from-white/5 to-transparent dark:from-white/10 dark:to-transparent blur-3xl pointer-events-none" />
    </div>
  );
}
