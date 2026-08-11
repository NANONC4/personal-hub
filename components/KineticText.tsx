"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

interface KineticTextProps {
  text: string;
  className?: string;
}

export function KineticText({ text, className }: KineticTextProps) {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 * i },
    }),
  };

  const child: Variants = {
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 30,
      filter: "blur(10px)",
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className={cn("flex overflow-hidden", className)}
    >
      {letters.map((letter, index) => (
        <motion.span
          variants={child}
          key={index}
          className={letter === " " ? "w-3 md:w-6" : "inline-block origin-bottom"}
          whileHover={{
            y: -8,
            rotate: Math.random() * 10 - 5,
            transition: { duration: 0.2 },
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
