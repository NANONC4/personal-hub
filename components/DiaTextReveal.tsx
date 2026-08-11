"use client";

import { motion, Variants } from "framer-motion";
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
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      className={cn("flex flex-wrap gap-x-3 gap-y-2 relative z-0", className)}
    >
      {words.map((word, i) => {
        // Randomly assign a color to the text shadow for the premium feel
        const color = colors[i % colors.length];
        return (
          <motion.span
            key={i}
            variants={child}
            className="relative text-foreground font-black tracking-tight drop-shadow-md"
            style={{ textShadow: `0 0 20px ${color}80` }}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
