"use client";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { PixelCloud, PixelStar, PixelSparkle } from "./PixelIcons";

interface HorrorWindowFrameProps {
  title?: string;
  imageSrc?: string;
  className?: string;
  children?: ReactNode;
}

export default function HorrorWindowFrame({ title, imageSrc, className = "", children }: HorrorWindowFrameProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className={`w-full h-full relative ${className}`}>
      
      {/* Floating Background Dark Clouds / Blood Stars (Behind the frame) */}
      <motion.div 
        animate={{ y: [0, -10, 0] }} 
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-12 -left-8 z-0 opacity-80"
      >
        <PixelCloud color="#4a0d0d" className="w-24 h-12 drop-shadow-[0_4px_10px_rgba(220,38,38,0.2)]" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 15, 0] }} 
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-16 -right-12 z-0 opacity-90"
      >
        <PixelCloud color="#3f0b0b" className="w-32 h-16 drop-shadow-[0_4px_10px_rgba(0,0,0,0.5)]" />
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }} 
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 -right-6 z-0"
      >
        <PixelStar color="#dc2626" className="w-8 h-8 drop-shadow-[0_0_12px_#dc2626]" />
      </motion.div>

      {/* Main Frame Container */}
      <div className="w-full h-full relative z-10 bg-[#0f0000] p-3 rounded-xl shadow-[0_0_40px_rgba(220,38,38,0.3)] border-4 border-[#7f1d1d]">
        
        {/* Inner Border Line (Pixel art feel) */}
        <div className="w-full h-full border-2 border-dashed border-[#4a0d0d] p-2 rounded-lg relative overflow-hidden flex flex-col bg-[#200909]">
          
          {/* Top Bar (Aesthetic label) */}
          <div className="w-full flex items-center justify-between pb-2 px-2 border-b-2 border-[#4a0d0d] mb-2">
            <div className="flex gap-1.5">
              <PixelStar color="#b91c1c" className="w-4 h-4 animate-pulse" />
              <PixelStar color="#7f1d1d" className="w-4 h-4 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>
            <span className="font-[family-name:var(--font-pixel)] text-[#ef4444] text-[10px] tracking-widest uppercase opacity-70">
              {title || "Blood.Moon.View"}
            </span>
          </div>

          {/* Image Content */}
          <div className="flex-1 relative rounded overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] bg-black">
            {imageSrc && !imageError ? (
              <img 
                src={imageSrc} 
                alt={title || "View"} 
                className="w-full h-full object-cover opacity-90"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-b from-[#1a0505] via-[#2a0808] to-[#3f0b0b] relative overflow-hidden">
                {/* Fallback Blood Moon Sky Art */}
                <PixelStar color="#dc2626" className="absolute top-8 left-8 w-4 h-4 animate-pulse" />
                <PixelSparkle color="#ef4444" className="absolute top-16 right-16 w-3 h-3 animate-pulse" style={{ animationDelay: '1s' }} />
                
                {/* Big Blood Moon */}
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-28 h-28 rounded-full bg-[#991b1b] shadow-[0_0_80px_rgba(220,38,38,0.7)] flex items-center justify-center">
                   <div className="w-24 h-24 rounded-full bg-[#1a0505] absolute -top-1 -right-2"></div>
                </div>

                {/* Thunder Cloud layer at bottom */}
                <div className="absolute -bottom-4 w-full flex justify-between opacity-80">
                  <PixelCloud color="#0f0000" className="w-40 h-20 -ml-10" />
                  <PixelCloud color="#1a0505" className="w-48 h-24 -mr-12" />
                </div>

                <p className="font-[family-name:var(--font-pixel)] text-sm text-[#fca5a5] opacity-90 uppercase tracking-widest relative z-10 drop-shadow-[0_0_4px_rgba(220,38,38,0.8)] mt-20">
                  Blood Moon
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
