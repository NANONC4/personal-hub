"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOLS = [
  { id: 1, text: "REACT", color: "text-[#61DAFB]" },
  { id: 2, text: "NEXT", color: "text-white" },
  { id: 3, text: "TS", color: "text-[#3178C6]" },
  { id: 4, text: "JS", color: "text-[#F7DF1E]" },
  { id: 5, text: "NODE", color: "text-[#339933]" },
  { id: 6, text: "TAILWIND", color: "text-[#06B6D4]" },
  { id: 7, text: "UNITY", color: "text-white" },
  { id: 8, text: "C#", color: "text-[#239120]" },
  { id: 9, text: "HTML5", color: "text-[#E34F26]" },
  { id: 10, text: "CSS3", color: "text-[#1572B6]" },
];

export function TechSlotMachine() {
  const [spinning, setSpinning] = useState(false);
  // Each reel holds the current visible symbol index
  const [reels, setReels] = useState<number[]>([0, 1, 2]); 
  const [jackpot, setJackpot] = useState(false);
  const [lastWin, setLastWin] = useState<string | null>(null);
  
  // Confetti particles for jackpot
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);

  // Spin logic
  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setJackpot(false);
    setLastWin(null);

    // 20% chance to win (1 in 5)
    const isWin = Math.random() < 0.2;

    let finalReels: number[];
    if (isWin) {
      // Pick a random symbol for the jackpot
      const winIndex = Math.floor(Math.random() * SYMBOLS.length);
      finalReels = [winIndex, winIndex, winIndex];
    } else {
      // Randomize until they are NOT all the same
      do {
        finalReels = [
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length)
        ];
      } while (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]);
    }

    // Simulate slot spinning duration
    setTimeout(() => {
      setReels([finalReels[0], reels[1], reels[2]]); // Stop reel 1
    }, 1000);

    setTimeout(() => {
      setReels([finalReels[0], finalReels[1], reels[2]]); // Stop reel 2
    }, 1500);

    setTimeout(() => {
      setReels(finalReels); // Stop reel 3
      setSpinning(false);
      
      if (isWin) {
        triggerJackpot(SYMBOLS[finalReels[0]].text);
      }
    }, 2000);
  };

  const triggerJackpot = (symbol: string) => {
    setJackpot(true);
    setLastWin(`JACKPOT: ${symbol} MASTERY!`);
    
    // Spawn confetti
    const newParticles = Array.from({ length: 50 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 100 - 50,
      y: Math.random() * -100 - 50,
      color: ['#fbbf24', '#f472b6', '#38bdf8', '#4ade80'][Math.floor(Math.random() * 4)]
    }));
    setParticles(newParticles);
    
    // Clear confetti after 3 seconds
    setTimeout(() => {
      setParticles([]);
      setJackpot(false);
    }, 3000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
      
      {/* The Slot Machine */}
      <div className="relative bg-slate-900 border-[6px] border-slate-700 p-6 md:p-10 rounded-2xl shadow-[8px_8px_0_0_#020617] mb-12">
        {/* Machine Header */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 border-4 border-slate-800 px-6 py-2 shadow-[4px_4px_0_0_#000] z-20">
          <h3 className="font-[family-name:var(--font-pixel)] text-white text-lg md:text-xl tracking-widest whitespace-nowrap">
            TECH CASINO
          </h3>
        </div>

        {/* Jackpot Indicator */}
        <div className="h-8 flex items-center justify-center mb-6">
          <AnimatePresence>
            {lastWin && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="font-[family-name:var(--font-pixel)] text-yellow-400 text-xl animate-pulse"
              >
                {lastWin}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Reels Container */}
        <div className="flex gap-2 md:gap-4 bg-black p-4 border-4 border-slate-800 rounded shadow-inner">
          {reels.map((symbolIndex, i) => (
            <div key={i} className="relative w-24 h-24 md:w-32 md:h-32 bg-slate-800 border-4 border-slate-600 rounded flex items-center justify-center overflow-hidden">
              {/* Spinning blur effect */}
              {spinning && (
                <div className="absolute inset-0 bg-white/10 animate-[pulse_0.1s_linear_infinite]" />
              )}
              
              <motion.div
                key={spinning ? `spin-${i}` : `stop-${symbolIndex}`}
                initial={{ y: spinning ? -100 : -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  type: spinning ? "tween" : "spring", 
                  duration: spinning ? 0.2 : 0.5, 
                  repeat: spinning ? Infinity : 0 
                }}
                className={`font-[family-name:var(--font-pixel)] text-2xl md:text-4xl ${SYMBOLS[symbolIndex].color} relative z-10`}
              >
                {spinning ? "?" : SYMBOLS[symbolIndex].text}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Spin Button */}
        <div className="mt-8 flex justify-center relative z-20">
          <button 
            onClick={spin}
            disabled={spinning}
            className={`
              relative font-[family-name:var(--font-pixel)] text-2xl px-12 py-4 uppercase
              border-4 border-slate-900 transition-all duration-150
              ${spinning 
                ? 'bg-slate-600 text-slate-400 translate-y-2 shadow-none cursor-not-allowed' 
                : 'bg-red-500 text-white hover:bg-red-400 active:translate-y-2 shadow-[0_8px_0_0_#7f1d1d] active:shadow-none'
              }
            `}
          >
            {spinning ? "SPINNING..." : "SPIN!"}
          </button>
        </div>

        {/* Confetti Particles */}
        <AnimatePresence>
          {jackpot && particles.map(p => (
            <motion.div
              key={p.id}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{ x: p.x * 5, y: p.y * 5 + 200, opacity: 0, scale: 0.5, rotate: p.x * 2 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-3 h-3 z-50 [image-rendering:pixelated]"
              style={{ backgroundColor: p.color }}
            />
          ))}
        </AnimatePresence>
      </div>

      {/* Paytable (All Icons Grid) */}
      <div className="w-full text-center">
        <h4 className="font-mono text-slate-500 uppercase tracking-widest text-sm mb-6">
          The Arsenal (Paytable)
        </h4>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-2xl mx-auto">
          {SYMBOLS.map((symbol, idx) => {
            // Check if this symbol is currently on the reels
            const isActive = !spinning && reels.includes(idx);
            
            return (
              <div 
                key={symbol.id}
                className={`
                  font-[family-name:var(--font-pixel)] text-xs md:text-sm px-3 py-2 border-2 transition-all duration-300
                  ${isActive 
                    ? 'border-yellow-400 bg-yellow-400/10 text-yellow-400 shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-110' 
                    : 'border-slate-800 bg-slate-900/50 text-slate-500 opacity-50'
                  }
                `}
              >
                {symbol.text}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
