"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

interface DiaTextRevealProps {
  text: string;
  className?: string;
  colors?: string[];
}

export const DiaTextReveal = ({
  text,
  className,
  colors = ["#38bdf8", "#f472b6", "#c084fc"],
}: DiaTextRevealProps) => {
  const targetRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start 80%", "end 50%"],
  });

  const words = text.split(" ");

  return (
    <div ref={targetRef} className={cn("relative z-0", className)}>
      <p className="flex flex-wrap gap-x-3 gap-y-2">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={i} progress={scrollYProgress} range={[start, end]} colors={colors}>
              {word}
            </Word>
          );
        })}
      </p>
    </div>
  );
};

const Word = ({ children, progress, range, colors }: any) => {
  const opacity = useTransform(progress, range, [0.2, 1]);
  // Use colors array to create a static text shadow or gradient mapping
  const color = colors[Math.floor(Math.random() * colors.length)];

  return (
    <span className="relative">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity }} className="relative text-foreground drop-shadow-md">
        {children}
      </motion.span>
    </span>
  );
};
