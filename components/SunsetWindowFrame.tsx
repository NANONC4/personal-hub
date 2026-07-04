"use client";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { PixelCloud, PixelStar, PixelSparkle } from "./PixelIcons";

interface SunsetWindowFrameProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  children?: ReactNode;
}

export default function SunsetWindowFrame({ title, imageSrc, className = "", children }: SunsetWindowFrameProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`w-full h-full relative ${className}`}>
      
      {/* Floating Background Clouds / Stars (Behind the frame) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-8 z-0 opacity-80"
      >
        <PixelCloud color="#fb923c" className="w-24 h-12" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-16 -right-12 z-0 opacity-90"
      >
        <PixelCloud color="#fcd34d" className="w-32 h-16 drop-shadow-[0_4px_10px_rgba(251,146,60,0.3)]" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }} 
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-6 z-0"
      >
        <PixelSparkle color="#fef08a" className="w-8 h-8 drop-shadow-[0_0_8px_#fef08a]" />
      </motion.div>

      {/* Main Frame Container */}
      <div className="w-full h-full relative z-10 bg-[#451a03] p-3 rounded-xl shadow-[0_0_40px_rgba(245,158,11,0.3)] border-4 border-[#f59e0b]">
        
        {/* Inner Border Line (Pixel art feel) */}
        <div className="w-full h-full border-2 border-dashed border-[#fbbf24]/50 p-2 rounded-lg relative overflow-hidden flex flex-col bg-[#78350f]">
          
          {/* Top Bar (Aesthetic label) */}
          <div className="w-full flex items-center justify-between pb-2 px-2 border-b-2 border-[#fbbf24]/30 mb-2">
            <div className="flex gap-1.5">
              <PixelSparkle color="#fcd34d" className="w-4 h-4 animate-pulse" />
              <PixelSparkle color="#f97316" className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <span className="font-[family-name:var(--font-pixel)] text-[#fde68a] text-[10px] tracking-widest uppercase opacity-80">
              {title || "Golden.Hour.View"}
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
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#78350f] via-[#b45309] to-[#f59e0b] relative overflow-hidden">
                {/* Fallback Sunset Sky Art */}
                <PixelStar color="#fef08a" className="absolute top-8 left-8 w-4 h-4 animate-pulse" />
                <PixelSparkle color="#ffedd5" className="absolute top-16 right-16 w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Big Setting Sun */}
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-24 h-24 rounded-full bg-[#fef08a] shadow-[0_0_60px_rgba(254,240,138,0.8)]"></div>

                {/* Cloud layer at bottom */}
                <div className="absolute -bottom-4 w-full flex justify-between opacity-70">
                  <PixelCloud color="#9a3412" className="w-40 h-20 -ml-10" />
                  <PixelCloud color="#ea580c" className="w-48 h-24 -mr-12" />
                </div>

                <p className="font-[family-name:var(--font-pixel)] text-sm text-[#ffedd5] opacity-90 uppercase tracking-widest relative z-10 drop-shadow-[0_0_4px_rgba(255,237,213,0.8)] mt-12">
                  Golden Hour
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
