"use client";
import { motion } from "framer-motion";
import { PixelCloud } from "./PixelIcons";

export const categories = [
  { id: "all", label: "ALL WORK" },
  { id: "web", label: "WEB APPS" },
  { id: "game", label: "GAMES" },
  { id: "bio", label: "TEMPLATES" }
];

interface PortfolioFilterProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function PortfolioFilter({ activeCategory, onSelectCategory }: PortfolioFilterProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-1 md:gap-2 bg-[#0f172a] p-1.5 rounded-lg border-b-4 border-slate-900 shadow-[2px_2px_0_0_rgba(0,0,0,0.5)] relative overflow-hidden group">
      
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelectCategory(cat.id)}
          className={`relative px-4 md:px-6 py-2 font-[family-name:var(--font-pixel)] text-[10px] md:text-xs tracking-widest uppercase transition-colors duration-300 z-10 ${
            activeCategory === cat.id 
              ? "text-indigo-200 drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]" 
              : "text-slate-500 hover:text-indigo-300"
          }`}
        >
          {activeCategory === cat.id && (
            <motion.div
              layoutId="activeCategoryIndicator"
              className="absolute inset-0 bg-indigo-900/30 border border-indigo-500/20 rounded shadow-[inset_0_1px_2px_rgba(0,0,0,0.3)] -z-10"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{cat.label}</span>
        </button>
      ))}
    </div>
  );
}
