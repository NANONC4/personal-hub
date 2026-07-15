"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PixelStar } from "./PixelIcons";

interface CategoryRibbonProps {
  title: string;
}

export default function CategoryRibbon({ title }: CategoryRibbonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // When scrolling down past the ribbon, slide it out to the right and fade out
  const x = useTransform(scrollYProgress, [0.3, 0.7], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0.4, 0.6], [1, 0]);

  return (
    <div ref={containerRef} className="w-full absolute top-0 left-0 h-[20vh] z-[60] flex flex-col justify-center px-0 pointer-events-none">
      <motion.div 
        style={{ x, opacity }}
        className="bg-[#1e293b] border-y-2 border-r-2 border-slate-800 py-3 px-8 shadow-[4px_4px_0_0_#020617] flex items-center gap-4 w-fit pointer-events-auto"
      >
        <PixelStar color="#818cf8" className="w-4 h-4 opacity-70" />
        <h3 className="font-[family-name:var(--font-pixel)] text-indigo-100 drop-shadow-[2px_2px_0_#020617] text-sm md:text-base tracking-[0.2em] uppercase">
          {title}
        </h3>
      </motion.div>
    </div>
  );
}
