"use client";
import { motion, useScroll, useTransform, useSpring, useMotionTemplate } from "framer-motion";
import { useRef, ReactNode } from "react";
import { getPattern } from "@/lib/patterns";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  index: number;
  theme?: "light" | "dark" | "blue" | "horror";
  prevBgClass?: string;
  currentBgClass?: string;
  children?: ReactNode;
}

export default function SectionDivider({ 
  title, 
  subtitle, 
  index, 
  theme = "light",
  prevBgClass = "bg-white",
  currentBgClass = "bg-neutral-950",
  children
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress specifically for the 100vh gap spacer!
  const { scrollYProgress } = useScroll({
    target: gapRef,
    offset: ["start end", "end start"]
  });

  const direction = index % 2 === 0 ? -1 : 1;
  const rotationAngle = direction * -4; 
  
  // 1. Divider Box slides horizontally out of the frame
  // The gap is centered on screen at progress 0.50.
  // The box is w-[150%], so moving it 150% means moving it 225vw.
  const rawBoxX = useTransform(scrollYProgress, [0.50, 0.65], [0, direction * 225]);
  const boxXSpring = useSpring(rawBoxX, { stiffness: 70, damping: 20, mass: 0.8 });
  const boxX = useTransform(boxXSpring, v => `${v}vw`);
  
  // Background Parallax Counters
  // To keep dots perfectly still on screen, they must move opposite to the box's local movement.
  const bgXVw = useTransform(boxXSpring, v => `${-v}vw`);
  const { scrollY } = useScroll();
  const bgYPx = useTransform(scrollY, y => `${y}px`);
  
  // 2. The NEXT section (children) slides UP by 30vh to perfectly dock with the Top Piece!
  // It starts right after the box begins to slide out, and finishes docking as the box leaves.
  const rawLowerBgY = useTransform(scrollYProgress, [0.60, 0.75], [0, -30]);
  const lowerBgYSpring = useSpring(rawLowerBgY, { stiffness: 70, damping: 20, mass: 0.8 });
  const lowerBgY = useTransform(lowerBgYSpring, v => `${v}vh`);

  // Theme Styles for the Divider Box
  // We will override all themes to use the pixel sky theme as requested by the user,
  // but we can keep the object for fallback or future use.
  const themeStyles = {
    blue: {
      gapBg: "bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-200",
      bg: "bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100",
      border: "border-slate-800 border-y-8",
      chapter: "text-slate-800",
      title: "text-white drop-shadow-[4px_4px_0_#1e293b]",
      subtitle: "text-slate-800 bg-white/70 px-4 py-2 rounded-md border-2 border-slate-800 shadow-[4px_4px_0_0_#1e293b] inline-block font-bold",
    },
    light: {
      gapBg: "bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200",
      bg: "bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100",
      border: "border-slate-800 border-y-8",
      chapter: "text-slate-800",
      title: "text-white drop-shadow-[4px_4px_0_#1e293b]",
      subtitle: "text-slate-800 bg-white/70 px-4 py-2 rounded-md border-2 border-slate-800 shadow-[4px_4px_0_0_#1e293b] inline-block font-bold",
    },
    dark: {
      gapBg: "bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200",
      bg: "bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100",
      border: "border-slate-800 border-y-8",
      chapter: "text-slate-800",
      title: "text-white drop-shadow-[4px_4px_0_#1e293b]",
      subtitle: "text-slate-800 bg-white/70 px-4 py-2 rounded-md border-2 border-slate-800 shadow-[4px_4px_0_0_#1e293b] inline-block font-bold",
    },
    horror: {
      gapBg: "bg-gradient-to-br from-purple-200 via-purple-100 to-fuchsia-200",
      bg: "bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100",
      border: "border-slate-800 border-y-8",
      chapter: "text-slate-800",
      title: "text-white drop-shadow-[4px_4px_0_#1e293b]",
      subtitle: "text-slate-800 bg-white/70 px-4 py-2 rounded-md border-2 border-slate-800 shadow-[4px_4px_0_0_#1e293b] inline-block font-bold",
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div ref={containerRef} className="w-full relative flex flex-col items-center justify-start overflow-visible">
      
      {/* Spacer for the gap (Reduced to 60vh to prevent massive empty space) */}
      <div ref={gapRef} className={`h-[60vh] w-full ${currentTheme.gapBg} relative overflow-hidden flex items-center justify-center`}>
        {/* CSS Stars Parallax (Fixed) for Gap */}
        <div 
          className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
          style={{
            ...getPattern(index + 1),
            backgroundAttachment: `fixed`
          }}
        />
        
        {/* 1. Upper Background (Top Piece) */}
        {/* Extends from top to 15vh with a slanted bottom edge, using clip-path instead of transform so parallax works! */}
        <div 
          className="absolute w-full h-[150vh] z-10 pointer-events-none"
          style={{
            bottom: "calc(50% + 15vh - 3.5vw)",
            left: "0",
            filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.5))"
          }}
        >
          <div
            className={`w-full h-full ${prevBgClass} pointer-events-auto overflow-hidden`}
            style={{
              clipPath: direction === -1 
                ? 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 7vw))' 
                : 'polygon(0 0, 100% 0, 100% calc(100% - 7vw), 0 100%)',
            }}
          >
            {/* Add CSS Stars Parallax if this block is an extension of the pastel pink IntroSection */}
            {prevBgClass.includes('pink') && (
              <div 
                className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
                style={{
                  ...getPattern(0),
                  backgroundAttachment: `fixed`
                }}
              />
            )}
          </div>
        </div>

        <div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <motion.div 
            style={{ x: boxX }}
            className={`w-[150%] flex-shrink-0 h-[30vh] ${currentTheme.bg} flex flex-col items-center justify-center shadow-[0_20px_0_0_rgba(0,0,0,0.5)] border-y-8 border-slate-800 will-change-transform pointer-events-auto relative overflow-hidden`}
          >
            {/* CSS Static Stars Background - Parallax illusion! */}
            <motion.div 
              className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
              style={{
                ...getPattern(index + 2),
                backgroundPosition: useMotionTemplate`calc(0vw + ${bgXVw}) calc(0px + ${bgYPx})`
              }}
            />

            <div className="text-center px-4 max-w-4xl relative z-10">
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.6 }}
                className={`${currentTheme.chapter} font-[family-name:var(--font-pixel)] tracking-widest text-xs md:text-sm uppercase mb-2 block`}
              >
                - Chapter 0{index + 1} -
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: false }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className={`text-4xl md:text-6xl lg:text-7xl font-black ${currentTheme.title} font-[family-name:var(--font-pixel)] tracking-widest uppercase leading-none mb-4`}
              >
                {title}
              </motion.h2>
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${currentTheme.subtitle} mt-2 max-w-xl mx-auto text-base md:text-lg font-[family-name:var(--font-pixel)] uppercase`}
                >
                  {subtitle}
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* 2. The Actual Next Section (Bottom Piece)! */}
      {/* 
        Starts at 60vh. Its roof extends up 15vh, so it starts at 45vh.
        This perfectly touches the bottom of the Divider Box (which spans 15vh to 45vh).
      */}
      <motion.div 
        style={{ y: lowerBgY }} 
        className={`w-full z-10 will-change-transform relative`}
      >
        {/* Slanted Top Edge for the Next Section to dock with the Top Piece */}
        <div 
          className={`absolute w-[150%] h-[30vh] ${currentBgClass} z-[-1] pointer-events-none shadow-[0_-20px_50px_rgba(0,0,0,0.5)]`}
          style={{ 
            top: 0, 
            left: "-25%", 
            transform: `translateY(-15vh) rotate(${rotationAngle}deg)`, 
            transformOrigin: "top center" 
          }}
        />
        
        {/* Actual Content of the Next Section! */}
        {children}
      </motion.div>
    </div>
  );
}
