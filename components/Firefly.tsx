"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The one small light the home page follows from the welcome window down to
 * the footer (see docs/animation-plan.md). A single warm pixel with a soft
 * halo; each section decides where it flies and what it turns into.
 */
export function Firefly({ className, ...props }: HTMLMotionProps<"span">) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-20 h-1.5 w-1.5 bg-amber-100 shadow-[0_0_10px_3px_rgba(254,240,138,0.6)] [image-rendering:pixelated]",
        className,
      )}
      {...props}
    />
  );
}
