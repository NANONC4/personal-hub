"use client";

import { useState, useEffect } from "react";
import CategoryRibbon from "./CategoryRibbon";
import { motion, AnimatePresence } from "framer-motion";
import { PixelStar, PixelSparkle } from "./PixelIcons";
import { getPattern } from "@/lib/patterns";

interface CategoryGroupProps {
  title: string;
  isDrawerMode: boolean;
  isOpen: boolean;
  setIsOpen: () => void;
  children: React.ReactNode;
}

export default function CategoryGroup({ title, isDrawerMode, isOpen, setIsOpen, children }: CategoryGroupProps) {


  return (
    <div className="w-full relative">
      {!isDrawerMode && <CategoryRibbon title={title} />}
      
      {isDrawerMode ? (
        <div className="w-full flex flex-col relative z-20">
          {/* Drawer Header for the Category */}
          <div 
            onClick={setIsOpen}
            className="w-full bg-gradient-to-b from-indigo-950 to-slate-900 border-y-8 border-slate-800 py-6 md:py-8 px-6 md:px-12 cursor-pointer hover:brightness-110 transition-all duration-300 flex flex-col justify-center items-center gap-4 relative z-20 group shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            {/* Ambient decorations & Pattern */}
            <div 
              className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
              style={{
                ...getPattern(3),
                backgroundAttachment: "scroll"
              }}
            />
            <PixelSparkle color="#818cf8" className="absolute top-4 right-20 w-4 h-4 opacity-0 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
            <PixelSparkle color="#c084fc" className="absolute bottom-4 left-1/3 w-3 h-3 opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
            
            <div className="text-center relative z-10 flex flex-col items-center">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] md:text-xs tracking-[0.3em] uppercase text-indigo-400 opacity-80 mb-2">
                - CATEGORY -
              </span>
              <h2 className="font-[family-name:var(--font-pixel)] text-indigo-100 drop-shadow-[2px_2px_0_#020617] md:drop-shadow-[3px_3px_0_#000000] group-hover:scale-105 group-hover:text-white text-2xl md:text-4xl tracking-widest uppercase flex items-center gap-4 transition-all duration-300">
                <PixelStar color="#818cf8" className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:animate-pulse" />
                {title}
                <PixelStar color="#818cf8" className="w-5 h-5 md:w-6 md:h-6 opacity-70 group-hover:animate-pulse" />
              </h2>
            </div>
            
            <span className="mt-2 font-[family-name:var(--font-pixel)] text-indigo-300 text-xs md:text-sm tracking-widest bg-slate-900/80 border-b-2 border-[#020617] group-hover:bg-slate-800 px-6 py-2 rounded-md transition-all duration-300 relative z-10 drop-shadow-[2px_2px_0_#020617]">
              {isOpen ? "[ CLOSE CATEGORY ]" : "[ OPEN CATEGORY ]"}
            </span>
          </div>

          {/* Drawer Content */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="w-full overflow-hidden"
              >
                {/* We wrap children in a div with a dark background so it looks like a deep drawer */}
                <div className="w-full bg-[#020617] border-x-4 border-slate-900/50">
                  {children}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ) : (
        children
      )}
    </div>
  );
}
