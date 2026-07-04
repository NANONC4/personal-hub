"use client";
import { motion } from "framer-motion";
import { PixelSparkle, PixelStar } from "./PixelIcons";

interface PortfolioToggleProps {
  isDrawerMode: boolean;
  onToggle: (mode: boolean) => void;
}

export default function PortfolioToggle({ isDrawerMode, onToggle }: PortfolioToggleProps) {
  return (
    <div className="w-full max-w-sm mx-auto my-12 bg-white p-3 rounded-xl border-4 border-pink-400 shadow-[4px_4px_0_0_#f472b6] relative overflow-hidden flex flex-col items-center gap-3">
      
      {/* Decorative BG */}
      <PixelStar color="#fcd34d" className="absolute -top-2 -left-2 w-8 h-8 opacity-40" />
      <PixelSparkle color="#c084fc" className="absolute -bottom-2 -right-2 w-6 h-6 opacity-40" />

      {/* Label */}
      <div className="flex items-center gap-2">
        <span className="text-pink-500 font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-widest font-bold">
          View Mode
        </span>
      </div>

      {/* Toggle Container */}
      <div className="w-full bg-pink-50 p-1.5 rounded-lg border-2 border-dashed border-pink-300 flex relative">
        
        {/* Sliding Indicator Background */}
        <motion.div
          initial={false}
          animate={{
            x: isDrawerMode ? "100%" : "0%",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="absolute top-1.5 bottom-1.5 left-1.5 w-[calc(50%-6px)] bg-gradient-to-b from-pink-300 to-purple-400 rounded shadow-[inset_0_2px_4px_rgba(255,255,255,0.5)] border-2 border-pink-400 z-0"
        />

        {/* Option 1: Scroll */}
        <button
          onClick={() => onToggle(false)}
          className={`flex-1 py-2 relative z-10 font-[family-name:var(--font-pixel)] text-xs uppercase tracking-wide transition-colors duration-200 ${
            !isDrawerMode ? "text-white drop-shadow-[1px_1px_0_#c026d3]" : "text-pink-400 hover:text-pink-600"
          }`}
        >
          Continuous
        </button>

        {/* Option 2: Drawer */}
        <button
          onClick={() => onToggle(true)}
          className={`flex-1 py-2 relative z-10 font-[family-name:var(--font-pixel)] text-xs uppercase tracking-wide transition-colors duration-200 ${
            isDrawerMode ? "text-white drop-shadow-[1px_1px_0_#c026d3]" : "text-pink-400 hover:text-pink-600"
          }`}
        >
          Drawer
        </button>

      </div>
    </div>
  );
}
