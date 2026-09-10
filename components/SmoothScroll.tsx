"use client";
import { ReactLenis } from 'lenis/react';
import { useReducedMotion } from 'framer-motion';
import React from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  // Momentum scrolling is the first thing that makes a motion-sensitive
  // visitor queasy — hand them the browser's native scroll instead.
  if (reduce) return <>{children}</>;

  return (
    <ReactLenis root options={{
      lerp: 0.05,        // Linear interpolation factor (0.01 - 0.1) for buttery smoothness
      duration: 1.5,     // Makes the momentum last a bit longer
      smoothWheel: true,
      wheelMultiplier: 1.2
    }}>
      {children}
    </ReactLenis>
  );
}
