"use client";
import { motion } from "framer-motion";

export default function BackgroundArt() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-neutral-950">
      {/* 
        PERFORMANCE FIX: 
        Replaced the heavy CSS `blur-[120px]` filter with native CSS `radial-gradient`.
        This is infinitely faster on the GPU and eliminates lag completely while keeping the premium look.
      */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4],
          x: ["0%", "3%", "0%"],
          y: ["0%", "5%", "0%"]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute -top-[20%] -left-[10%] w-[120vw] h-[120vh] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(88,28,135,0.4) 0%, rgba(49,46,129,0.2) 40%, transparent 70%)",
          transform: "translateZ(0)" /* Force hardware acceleration */
        }}
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
          x: ["0%", "-3%", "0%"],
          y: ["0%", "-5%", "0%"]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-[50%] -translate-x-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(6,78,59,0.4) 0%, rgba(6,78,59,0.1) 40%, transparent 70%)",
          transform: "translateZ(0)"
        }}
      />
      
      {/* Noise overlay for premium texture (using simple opacity instead of mix-blend-mode for performance) */}
      <div 
        className="absolute inset-0 opacity-[0.12] pointer-events-none"
        style={{
          backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
          backgroundRepeat: "repeat"
        }}
      ></div>
    </div>
  );
}
