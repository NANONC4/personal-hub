"use client";

import React, { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LensProps {
  children: React.ReactNode;
  zoomFactor?: number;
  lensSize?: number;
  position?: { x: number; y: number };
}

export function Lens({
  children,
  zoomFactor = 1.5,
  lensSize = 170,
  position = { x: 0, y: 0 },
}: LensProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState(position);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden cursor-none w-full h-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Base Content */}
      {children}

      {/* Lens */}
      <AnimatePresence>
        {isHovering && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute pointer-events-none rounded-full overflow-hidden shadow-[0_0_20px_rgba(0,0,0,0.5)] z-50 ring-2 ring-white/20 bg-slate-900/10 backdrop-blur-[1px]"
            style={{
              width: lensSize,
              height: lensSize,
              left: mousePos.x - lensSize / 2,
              top: mousePos.y - lensSize / 2,
            }}
          >
            <div
              className="absolute"
              style={{
                width: containerRef.current?.clientWidth,
                height: containerRef.current?.clientHeight,
                top: -(mousePos.y - lensSize / 2),
                left: -(mousePos.x - lensSize / 2),
                transform: `scale(${zoomFactor})`,
                transformOrigin: `${mousePos.x}px ${mousePos.y}px`,
              }}
            >
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
