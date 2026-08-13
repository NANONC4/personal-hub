"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYMBOLS = [
  { id: 1, text: "REACT", color: "text-[#61DAFB]", bg: "bg-[#61DAFB]/10", border: "border-[#61DAFB]" },
  { id: 2, text: "NEXT", color: "text-white", bg: "bg-white/10", border: "border-white" },
  { id: 3, text: "TS", color: "text-[#3178C6]", bg: "bg-[#3178C6]/10", border: "border-[#3178C6]" },
  { id: 4, text: "JS", color: "text-[#F7DF1E]", bg: "bg-[#F7DF1E]/10", border: "border-[#F7DF1E]" },
  { id: 5, text: "NODE", color: "text-[#339933]", bg: "bg-[#339933]/10", border: "border-[#339933]" },
  { id: 6, text: "TAILWIND", color: "text-[#06B6D4]", bg: "bg-[#06B6D4]/10", border: "border-[#06B6D4]" },
  { id: 7, text: "UNITY", color: "text-white", bg: "bg-white/10", border: "border-white" },
  { id: 8, text: "C#", color: "text-[#239120]", bg: "bg-[#239120]/10", border: "border-[#239120]" },
  { id: 9, text: "HTML5", color: "text-[#E34F26]", bg: "bg-[#E34F26]/10", border: "border-[#E34F26]" },
  { id: 10, text: "CSS3", color: "text-[#1572B6]", bg: "bg-[#1572B6]/10", border: "border-[#1572B6]" },
];

export function TechSlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const [reels, setReels] = useState<number[]>([0, 1, 2]); 
  const [jackpot, setJackpot] = useState(false);
  const [lastWin, setLastWin] = useState<string | null>(null);
  const [particles, setParticles] = useState<{ id: number, x: number, y: number, color: string }[]>([]);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setJackpot(false);
    setLastWin(null);

    // 20% chance to win
    const isWin = Math.random() < 0.2;

    let finalReels: number[];
    if (isWin) {
      const winIndex = Math.floor(Math.random() * SYMBOLS.length);
      finalReels = [winIndex, winIndex, winIndex];
    } else {
      do {
        finalReels = [
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length),
          Math.floor(Math.random() * SYMBOLS.length)
        ];
      } while (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]);
    }

    setTimeout(() => setReels([finalReels[0], reels[1], reels[2]]), 1000);
    setTimeout(() => setReels([finalReels[0], finalReels[1], reels[2]]), 1500);
    setTimeout(() => {
      setReels(finalReels);
      setSpinning(false);
      if (isWin) triggerJackpot(SYMBOLS[finalReels[0]].text);
    }, 2000);
  };

  const triggerJackpot = (symbol: string) => {
    setJackpot(true);
    setLastWin(`JACKPOT: ${symbol} MASTERY!`);
    
    const newParticles = Array.from({ length: 100 }).map((_, i) => ({
      id: Date.now() + i,
      x: Math.random() * 200 - 100,
      y: Math.random() * -150 - 50,
      color: ['#fbbf24', '#f472b6', '#38bdf8', '#4ade80', '#ffffff'][Math.floor(Math.random() * 5)]
    }));
    setParticles(newParticles);
    
    setTimeout(() => {
      setParticles([]);
      setJackpot(false);
    }, 4000);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center pb-20 relative z-30">
      
      {/* 
        ====================================================
        THE ARCADE CABINET
        ====================================================
      */}
      <div className="relative w-full flex flex-col items-center bg-zinc-900 border-x-[12px] border-t-[12px] border-zinc-950 rounded-t-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden">
        
        {/* SIDE ART (Left & Right stripes) */}
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-gradient-to-b from-red-600 via-yellow-500 to-blue-600 opacity-80" />
        <div className="absolute top-0 bottom-0 right-0 w-2 bg-gradient-to-b from-red-600 via-yellow-500 to-blue-600 opacity-80" />

        {/* 1. MARQUEE (Top Header) */}
        <div className="w-full bg-black py-4 md:py-6 flex items-center justify-center border-b-[8px] border-zinc-950 shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] z-20">
          <div className="px-8 py-2 bg-zinc-900 border-4 border-yellow-500 shadow-[0_0_20px_rgba(234,179,8,0.5),inset_0_0_15px_rgba(234,179,8,0.3)]">
            <h3 className="font-[family-name:var(--font-pixel)] text-yellow-400 text-2xl md:text-3xl tracking-[0.2em] uppercase animate-pulse drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]">
              TECH CASINO
            </h3>
          </div>
        </div>

        {/* 2. CRT SCREEN (The Monitor) */}
        <div className="w-full px-6 md:px-12 py-8 md:py-12 bg-zinc-800 border-b-[12px] border-zinc-950 flex flex-col items-center relative perspective-[1000px]">
          
          {/* CRT Bezel */}
          <div className="relative w-full max-w-xl bg-black p-4 md:p-8 rounded-3xl border-8 border-zinc-700 shadow-[inset_0_0_50px_rgba(0,0,0,0.9),0_20px_40px_rgba(0,0,0,0.7)] rotate-x-[5deg]">
            
            {/* The Actual Screen */}
            <div className="relative w-full bg-[#0a0f1c] rounded-xl overflow-hidden border-2 border-slate-800/50 shadow-[inset_0_0_100px_rgba(0,0,0,1)]">
              
              {/* Scanlines Overlay */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] pointer-events-none z-30 opacity-70" />
              
              {/* Screen Glare */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none z-20 rounded-xl" />

              {/* Jackpot Banner */}
              <div className="absolute top-4 w-full h-8 flex items-center justify-center z-40">
                <AnimatePresence>
                  {lastWin && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.5, y: -20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="font-[family-name:var(--font-pixel)] text-yellow-400 text-lg md:text-2xl drop-shadow-[0_0_8px_rgba(234,179,8,1)] animate-pulse px-4 py-1 bg-black/80 border-2 border-yellow-400"
                    >
                      {lastWin}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* The Reels */}
              <div className="flex gap-2 md:gap-4 p-6 md:p-10 justify-center items-center mt-6">
                {reels.map((symbolIndex, i) => (
                  <div key={i} className="relative w-20 h-24 md:w-28 md:h-32 bg-[#050810] border-4 border-slate-700 rounded shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex items-center justify-center overflow-hidden">
                    
                    {/* Spinning motion blur */}
                    {spinning && (
                      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/10 to-transparent animate-[pulse_0.1s_linear_infinite]" />
                    )}
                    
                    <motion.div
                      key={spinning ? `spin-${i}` : `stop-${symbolIndex}`}
                      initial={{ y: spinning ? -150 : -30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        type: spinning ? "tween" : "spring", 
                        duration: spinning ? 0.15 : 0.6, 
                        repeat: spinning ? Infinity : 0 
                      }}
                      className={`font-[family-name:var(--font-pixel)] text-xl md:text-3xl ${SYMBOLS[symbolIndex].color} drop-shadow-[0_0_5px_currentColor] relative z-10`}
                    >
                      {spinning ? "?" : SYMBOLS[symbolIndex].text}
                    </motion.div>
                  </div>
                ))}
              </div>

              {/* Confetti Explosion Layer */}
              <AnimatePresence>
                {jackpot && particles.map(p => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 50, opacity: 1, scale: 1 }}
                    animate={{ x: p.x * 3, y: p.y * 3, opacity: 0, scale: 0.5, rotate: p.x * 2 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    className="absolute top-1/2 left-1/2 w-4 h-4 z-50 [image-rendering:pixelated]"
                    style={{ backgroundColor: p.color }}
                  />
                ))}
              </AnimatePresence>

            </div>
          </div>
        </div>

        {/* 3. CONTROL PANEL (Dashboard) */}
        <div className="w-full bg-zinc-700 pt-8 pb-12 px-6 md:px-12 flex justify-center items-center relative border-b-[20px] border-zinc-950 shadow-[0_30px_30px_rgba(0,0,0,0.8)]">
          {/* Angled panel effect using CSS */}
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-600 to-zinc-800" style={{ transform: "perspective(500px) rotateX(15deg)", transformOrigin: "top" }} />
          
          <div className="relative z-10 flex flex-col items-center gap-4">
            <p className="font-mono text-zinc-400 text-xs tracking-[0.3em] uppercase">Insert Coin to Play</p>
            
            {/* Arcade Button (3D) */}
            <button 
              onClick={spin}
              disabled={spinning}
              className="group relative cursor-pointer outline-none"
            >
              {/* Button Base/Shadow */}
              <div className="absolute inset-0 bg-red-950 rounded-full translate-y-3 md:translate-y-4" />
              {/* Button Bezel */}
              <div className="absolute inset-0 bg-zinc-900 rounded-full scale-110 -z-10 shadow-[0_10px_20px_rgba(0,0,0,0.8)]" />
              
              {/* Button Top */}
              <div className={`
                relative bg-red-500 rounded-full w-32 h-32 md:w-40 md:h-40 flex items-center justify-center
                border-t-4 border-red-400 border-b-8 border-red-700
                transition-transform duration-100 ease-out
                ${spinning ? 'translate-y-3 md:translate-y-4' : 'group-active:translate-y-3 md:group-active:translate-y-4 group-hover:-translate-y-1'}
              `}>
                <span className={`font-[family-name:var(--font-pixel)] text-white text-2xl md:text-3xl drop-shadow-md ${spinning ? 'opacity-50' : ''}`}>
                  {spinning ? "..." : "SPIN"}
                </span>
                {/* Button Glare */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 md:w-24 h-6 bg-white/20 rounded-full blur-sm" />
              </div>
            </button>
          </div>
        </div>

        {/* 4. BELLY GLASS (Lower Body with Paytable) */}
        <div className="w-full bg-zinc-900 pt-16 pb-12 px-6 md:px-12 flex flex-col items-center relative border-x-8 border-b-8 border-zinc-950">
          <div className="absolute inset-0 bg-black/40 pointer-events-none" />
          
          <div className="relative z-10 w-full max-w-2xl text-center">
            <h4 className="font-[family-name:var(--font-pixel)] text-yellow-500 tracking-[0.2em] text-lg md:text-xl mb-8 flex items-center justify-center gap-4">
              <span className="w-8 h-[2px] bg-yellow-500/50" />
              PAYTABLE
              <span className="w-8 h-[2px] bg-yellow-500/50" />
            </h4>
            
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {SYMBOLS.map((symbol, idx) => {
                const isActive = !spinning && reels.includes(idx);
                
                return (
                  <div 
                    key={symbol.id}
                    className={`
                      font-[family-name:var(--font-pixel)] text-xs md:text-sm px-4 py-3 
                      border-2 transition-all duration-300 relative overflow-hidden
                      ${isActive 
                        ? `${symbol.border} ${symbol.bg} ${symbol.color} shadow-[0_0_15px_currentColor] scale-110 z-10` 
                        : 'border-zinc-800 bg-zinc-900 text-zinc-500 opacity-50'
                      }
                    `}
                  >
                    {isActive && <div className="absolute inset-0 bg-white/10 animate-pulse pointer-events-none" />}
                    <span className="relative z-10">{symbol.text}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="mt-12 text-zinc-600 font-mono text-xs uppercase tracking-[0.2em]">
              © 2026 Developer Arcade System
            </div>
          </div>
        </div>

      </div>

      {/* Arcade machine floor shadow */}
      <div className="w-full max-w-4xl h-8 bg-black/50 blur-xl rounded-full mt-4" />
      
    </div>
  );
}
