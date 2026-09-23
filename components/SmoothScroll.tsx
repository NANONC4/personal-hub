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
      // 0.05 kept the page gliding ~1.5s after the wheel stopped, so the
      // scroll-tied scenes (the welcome window fly-through) trailed the hand
      // and read as lag. 0.1 settles in ~0.7s: still smooth, but it follows.
      lerp: 0.1,
      smoothWheel: true,
      wheelMultiplier: 1.2
    }}>
      {children}
    </ReactLenis>
  );
}
