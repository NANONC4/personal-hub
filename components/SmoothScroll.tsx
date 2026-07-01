"use client";
import { ReactLenis } from 'lenis/react';
import React from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
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
