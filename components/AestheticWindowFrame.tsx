"use client";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { PixelCloud, PixelStar, PixelSparkle } from "./PixelIcons";

interface AestheticWindowFrameProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  children?: ReactNode;
}

export default function AestheticWindowFrame({ title, imageSrc, className = "", children }: AestheticWindowFrameProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`w-full h-full relative ${className}`}>
      
      {/* Floating Background Clouds / Stars (Behind the frame) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-8 z-0 opacity-80"
      >
        <PixelCloud color="#e879f9" className="w-24 h-12" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-16 -right-12 z-0 opacity-90"
      >
        <PixelCloud color="#c084fc" className="w-32 h-16 drop-shadow-[0_4px_10px_rgba(192,132,252,0.3)]" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-6 z-0"
      >
        <PixelStar color="#fcd34d" className="w-8 h-8 drop-shadow-[0_0_8px_#fcd34d]" />
      </motion.div>

      {/* Main Frame Container */}
      <div className="w-full h-full relative z-10 bg-[#0f172a] p-3 rounded-xl shadow-[0_0_40px_rgba(192,132,252,0.5)] border-4 border-[#38bdf8]">
        
        {/* Inner Border Line (Pixel art feel) */}
        <div className="w-full h-full border-2 border-dashed border-[#818cf8]/50 p-2 rounded-lg relative overflow-hidden flex flex-col bg-[#1e1b4b]">
          
          {/* Top Bar (Aesthetic label) */}
          <div className="w-full flex items-center justify-between pb-2 px-2 border-b-2 border-[#818cf8]/30 mb-2">
            <div className="flex gap-1.5">
              <PixelSparkle color="#f472b6" className="w-4 h-4 animate-pulse" />
              <PixelSparkle color="#60a5fa" className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <span className="font-[family-name:var(--font-pixel)] text-[#a78bfa] text-[10px] tracking-widest uppercase opacity-80">
              {title || "Night.Sky.View"}
            </span>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative rounded overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]">
            {imageSrc && !imageError ? (
              <img 
                src={imageSrc} 
                alt={title || "View"} 
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#020617] via-[#1e1b4b] to-[#3b0764] relative overflow-hidden">
                {/* Fallback Night Sky Art */}
                <PixelStar color="#fff" className="absolute top-8 left-8 w-4 h-4 animate-pulse" />
                <PixelStar color="#fbcfe8" className="absolute top-16 right-16 w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
                <PixelStar color="#bfdbfe" className="absolute bottom-1/3 left-1/4 w-5 h-5 animate-pulse" style={{ animationDelay: '0.5s' }} />
                
                {/* Big Moon */}
                <div className="absolute top-8 right-8 w-16 h-16 rounded-full bg-[#fef08a] shadow-[0_0_40px_rgba(254,240,138,0.5)] flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#020617] absolute -top-1 -left-1"></div>
                </div>

                {/* Cloud layer at bottom */}
                <div className="absolute -bottom-4 w-full flex justify-between opacity-50">
                  <PixelCloud color="#1e1b4b" className="w-40 h-20 -ml-10" />
                  <PixelCloud color="#2e1065" className="w-48 h-24 -mr-12" />
                </div>

                <p className="font-[family-name:var(--font-pixel)] text-sm text-[#e879f9] opacity-80 uppercase tracking-widest relative z-10 drop-shadow-[0_0_4px_rgba(232,121,249,0.5)]">
                  Lofi Night Sky
                </p>
              </div>
            )}
            {/* Render children on top of image */}
            {children && (
              <div className="absolute inset-0">
                {children}
              </div>
            )}
          </div>

        </div>
      </div>
      
    </div>
  );
}
