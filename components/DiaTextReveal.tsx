"use client";

import { motion } from "framer-motion";
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
  const characters = text.split("");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Stagger from left to right
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-20% 0px -20% 0px" }}
      className={cn("flex flex-wrap relative z-0", className)}
    >
      {characters.map((char, i) => {
        const color = colors[i % colors.length];
        
        return (
          <motion.span
            key={i}
            variants={{
              hidden: { 
                opacity: 0, 
                textShadow: `0 0 0px transparent` 
              },
              visible: {
                opacity: 1,
                textShadow: [
                  `0 0 0px transparent`,
                  `0 0 40px ${color}, 0 0 20px ${color}`, // intense glow flash
                  `0 0 10px ${color}40`, // settles to subtle shadow
                ],
                transition: {
                  duration: 1.5,
                  times: [0, 0.4, 1], // The glow flashes in the middle then fades
                  ease: "easeOut",
                }
              },
            }}
            className={cn(
              "relative text-foreground font-black tracking-tight",
              char === " " ? "w-3" : "" // preserve spaces
            )}
          >
            {char}
          </motion.span>
        );
      })}
    </motion.div>
  );
};
