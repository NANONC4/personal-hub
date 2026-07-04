"use client";
import { useState, ReactNode } from "react";
import { motion } from "framer-motion";

interface RetroBrowserFrameProps {
  title?: string;
  imageSrc?: string;
  theme?: "light" | "dark" | "blue" | "horror" | "pastel";
  className?: string;
  children?: ReactNode;
}

export default function RetroBrowserFrame({ title = "window.exe", imageSrc, theme = "light", className = "", children }: RetroBrowserFrameProps) {
  const [imageError, setImageError] = useState(false);

  const themeStyles = {
    light: {
      border: "border-slate-800",
      topBar: "bg-slate-200 border-b-4 border-slate-800",
      titleText: "text-slate-800",
      bodyBg: "bg-slate-50",
      shadow: "shadow-[8px_8px_0_0_#1e293b]",
    },
    dark: {
      border: "border-slate-900",
      topBar: "bg-slate-800 border-b-4 border-slate-900",
      titleText: "text-slate-200",
      bodyBg: "bg-neutral-900",
      shadow: "shadow-[8px_8px_0_0_#020617]",
    },
    blue: {
      border: "border-slate-950",
      topBar: "bg-slate-900 border-b-4 border-slate-950",
      titleText: "text-slate-200",
      bodyBg: "bg-[#0b1120]",
      shadow: "shadow-[8px_8px_0_0_#020617]",
    },
    horror: {
      border: "border-black",
      topBar: "bg-red-950 border-b-4 border-black",
      titleText: "text-red-500",
      bodyBg: "bg-[#200909]",
      shadow: "shadow-[8px_8px_0_0_#000000]",
    },
    pastel: {
      border: "border-purple-400",
      topBar: "bg-pink-100 border-b-4 border-purple-400",
      titleText: "text-purple-800",
      bodyBg: "bg-sky-50",
      shadow: "shadow-[8px_8px_0_0_#c084fc]",
    }
  };

  const currentTheme = themeStyles[theme];

  return (
    <div className={`w-full h-full flex flex-col rounded-xl overflow-hidden border-4 ${currentTheme.shadow} ${currentTheme.border} ${className}`}>
      {/* Top Bar */}
      <div className={`px-4 py-2 flex items-center justify-between ${currentTheme.topBar}`}>
        <div className="flex gap-1">
          {/* Minimize */}
          <div className={`w-5 h-5 flex items-end justify-center pb-1 border-2 border-r-black border-b-black border-t-white border-l-white bg-slate-200 ${currentTheme.titleText} font-[family-name:var(--font-pixel)] text-[10px] leading-none cursor-default active:border-r-white active:border-b-white active:border-t-black active:border-l-black`}>_</div>
          {/* Maximize */}
          <div className={`w-5 h-5 flex items-center justify-center border-2 border-r-black border-b-black border-t-white border-l-white bg-slate-200 ${currentTheme.titleText} font-[family-name:var(--font-pixel)] text-[10px] leading-none cursor-default active:border-r-white active:border-b-white active:border-t-black active:border-l-black`}>□</div>
          {/* Close */}
          <div className={`w-5 h-5 flex items-center justify-center border-2 border-r-black border-b-black border-t-white border-l-white bg-slate-200 ${currentTheme.titleText} font-[family-name:var(--font-pixel)] text-[10px] font-bold leading-none cursor-default active:border-r-white active:border-b-white active:border-t-black active:border-l-black`}>X</div>
        </div>
        {/* Title */}
        <div className={`font-[family-name:var(--font-pixel)] text-xs uppercase tracking-widest ${currentTheme.titleText}`}>
          {title}
        </div>
        {/* Empty space for balance */}
        <div className="w-10"></div>
      </div>

      {/* Body */}
      <div className={`flex-1 relative overflow-hidden ${currentTheme.bodyBg}`}>
        {imageSrc && !imageError ? (
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center gap-4">
            <div className="w-16 h-16 opacity-30 animate-jiggle-loop">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                <line x1="8" y1="21" x2="16" y2="21"></line>
                <line x1="12" y1="17" x2="12" y2="21"></line>
              </svg>
            </div>
            <p className={`font-[family-name:var(--font-pixel)] text-sm ${currentTheme.titleText} opacity-50 uppercase`}>
              No Image Data
            </p>
          </div>
        )}
        {/* Render children on top of image/placeholder */}
        {children && (
          <div className="absolute inset-0">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}
