"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The one small light the home page follows from the welcome window down to
 * the footer (see docs/animation-plan.md). A single warm pixel with a hard
 * four-point sparkle; each section decides where it flies and what it turns into.
 */
export function Firefly({ className, ...props }: HTMLMotionProps<"span">) {
  return (
    <motion.span
      aria-hidden
      className={cn(
        "pointer-events-none absolute left-0 top-0 z-20 h-1.5 w-1.5 bg-amber-100 [image-rendering:pixelated]",
        // a hard four-point sparkle, no blur: pixel light, and nothing to repaint
        "shadow-[6px_0_0_rgba(254,240,138,0.4),-6px_0_0_rgba(254,240,138,0.4),0_6px_0_rgba(254,240,138,0.4),0_-6px_0_rgba(254,240,138,0.4)]",
        className,
      )}
      {...props}
    />
  );
}
