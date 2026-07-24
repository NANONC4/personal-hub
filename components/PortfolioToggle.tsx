"use client";
import { motion } from "framer-motion";
import { PixelSparkle, PixelStar } from "./PixelIcons";

interface PortfolioToggleProps {
  isDrawerMode: boolean;
  onToggle: (mode: boolean) => void;
}

export default function PortfolioToggle({ isDrawerMode, onToggle }: PortfolioToggleProps) {
  return (
    <div className="w-[280px] md:w-[320px] mx-auto bg-[#0f172a] p-2 rounded-lg border-b-4 border-slate-900 shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col items-center gap-2 group">
      
      {/* Decorative BG */}
      <PixelStar color="#818cf8" className="absolute -top-1 -left-1 w-6 h-6 opacity-10 group-hover:opacity-30 group-hover:rotate-12 transition-all duration-500" />
      <PixelSparkle color="#c084fc" className="absolute -bottom-1 -right-1 w-5 h-5 opacity-10 group-hover:opacity-30 group-hover:scale-125 transition-all duration-500" />

      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-indigo-300 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-widest font-medium opacity-70 group-hover:opacity-100 transition-opacity">
          View Mode
        </span>
      </div>

      {/* Toggle Container */}
      <div className="w-full bg-slate-900/40 p-1 rounded-lg border border-slate-700/30 flex relative">
        
        {/* Sliding Indicator Background */}
        <motion.div
          initial={false}
          animate={{
            x: isDrawerMode ? "100%" : "0%",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="absolute top-1 bottom-1 left-1 w-[calc(50%-4px)] bg-indigo-900/30 border border-indigo-500/20 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] z-0"
        />

        {/* Option 1: Scroll */}
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 py-2 relative z-10 font-[family-name:var(--font-pixel)] text-[10px] md:text-xs uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded ${
            !isDrawerMode ? "text-indigo-200 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]" : "text-slate-500 hover:text-indigo-300"
          }`}
        >
          Continuous
        </button>

        {/* Option 2: Drawer */}
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 py-2 relative z-10 font-[family-name:var(--font-pixel)] text-[10px] md:text-xs uppercase tracking-wide transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 rounded ${
            isDrawerMode ? "text-indigo-200 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]" : "text-slate-500 hover:text-indigo-300"
          }`}
        >
          Drawer
        </button>

      </div>
    </div>
  );
}
