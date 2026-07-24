"use client";
import { motion, useScroll, useTransform, useSpring, AnimatePresence, useMotionTemplate, useMotionValue } from "framer-motion";
import { useRef, ReactNode, useEffect } from "react";
import { getPattern } from "@/lib/patterns";
import { PixelStar } from "./PixelIcons";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  categoryName?: string;
  index: number;
  theme?: "light" | "dark" | "blue" | "horror";
  prevBgClass?: string;
  currentBgClass?: string;
  prevHasPattern?: boolean;
  children?: ReactNode;
  isDrawerMode?: boolean;
  isActiveDrawer?: boolean;
  onToggle?: () => void;
}

export default function SectionDivider({ 
  title, 
  subtitle, 
  categoryName,
  index, 
  theme = "light",
  prevBgClass = "bg-white",
  currentBgClass = "bg-neutral-950",
  prevHasPattern = false,
  children,
  isDrawerMode = false,
  isActiveDrawer = false,
  onToggle
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const gapRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress specifically for the 100vh gap spacer!
  const { scrollYProgress } = useScroll({
    target: gapRef,
    offset: ["start end", "end start"]
  });

  // Auto-scroll when drawer opens
  useEffect(() => {
    if (isDrawerMode && isActiveDrawer && contentRef.current) {
      setTimeout(() => {
        // Adding a slight delay allows the height animation to start
        // so the browser can calculate the correct final scroll position
        contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 150);
    }
  }, [isDrawerMode, isActiveDrawer]);

  const direction = index % 2 === 0 ? -1 : 1;
  const rotationAngle = isDrawerMode ? 0 : direction * -4;
  
  // 1. Divider Box slides horizontally out of the frame
  // The gap is centered on screen at progress 0.50.
  // The box is w-[150%], so moving it 150% means moving it 225vw.
  const rawBoxX = useTransform(scrollYProgress, [0.50, 0.65], [0, direction * 225]);
  const boxXSpring = useSpring(rawBoxX, { stiffness: 70, damping: 20, mass: 0.8 });
  const scrollBoxX = useTransform(boxXSpring, v => `${v}vw`);
  const boxX = isDrawerMode ? "0vw" : scrollBoxX;

  // Category Divider Box slides horizontally opposite to the main box
  const rawCategoryBoxX = useTransform(scrollYProgress, [0.50, 0.65], [0, -direction * 225]);
  const categoryBoxXSpring = useSpring(rawCategoryBoxX, { stiffness: 70, damping: 20, mass: 0.8 });
  const scrollCategoryBoxX = useTransform(categoryBoxXSpring, v => `${v}vw`);
  const categoryBoxX = isDrawerMode ? "0vw" : scrollCategoryBoxX;
  // Background Parallax
  // Fix the swing bug: disable X movement when in Drawer Mode!
  const isDrawerMV = useMotionValue(isDrawerMode ? 1 : 0);
  useEffect(() => {
    isDrawerMV.set(isDrawerMode ? 1 : 0);
  }, [isDrawerMode]);

  // If DrawerMode, X is 0. If Continuous, X counters the box sliding.
  const bgXVw = useTransform(
    [boxXSpring, isDrawerMV],
    ([box, isDrawer]) => isDrawer === 1 ? "0vw" : `${-box}vw`
  );
  
  const categoryBgXVw = useTransform(
    [categoryBoxXSpring, isDrawerMV],
    ([box, isDrawer]) => isDrawer === 1 ? "0vw" : `${-box}vw`
  );
  
  // Create a depth illusion by moving background slower than scroll
  // We modulo by 960 (LCM of 64, 60, 12, 80 pattern sizes) to loop infinitely!
  const { scrollY } = useScroll();
  const bgYPx = useTransform(scrollY, y => `${(y * 0.5) % 960}px`);
  
  // 2. The NEXT section (children) slides UP by 30vh (or 45vh) to perfectly dock with the Top Piece!
  // It starts right after the box begins to slide out, and finishes docking as the box leaves.
  const slideUpAmount = categoryName && !isDrawerMode ? -45 : -30;
  const rawLowerBgY = useTransform(scrollYProgress, [0.60, 0.75], [0, slideUpAmount]);
  const lowerBgYSpring = useSpring(rawLowerBgY, { stiffness: 70, damping: 20, mass: 0.8 });
  const scrollLowerBgY = useTransform(lowerBgYSpring, v => `${v}vh`);
  const lowerBgY = isDrawerMode ? "0vh" : scrollLowerBgY;

  // Theme Styles for the Divider Box
  // We will override all themes to use the pixel sky theme as requested by the user,
  // but we can keep the object for fallback or future use.
  const themeStyles = {
    blue: {
      gapBg: "bg-sky-200",
      bg: "bg-gradient-to-r from-sky-300 via-fuchsia-300 to-pink-300",
      border: "border-purple-400 border-y-8",
      chapter: "text-purple-700",
      title: "text-white drop-shadow-[4px_4px_0_#9333ea]",
      subtitle: "text-purple-900 bg-white/80 px-4 py-2 rounded-md border-2 border-purple-400 shadow-[4px_4px_0_0_#9333ea] inline-block font-bold",
      shadow: "shadow-[0_-10px_30px_rgba(168,85,247,0.15)]", // Extremely subtle shadow
    },
    light: {
      gapBg: "bg-gradient-to-br from-sky-200 to-sky-100",
      bg: "bg-white",
      border: "border-slate-800 border-y-8",
      chapter: "text-slate-500",
      title: "text-slate-900 drop-shadow-[2px_2px_0_#94a3b8]",
      subtitle: "text-white bg-slate-800 px-4 py-2 rounded-md border-2 border-slate-900 shadow-[4px_4px_0_0_#0f172a] inline-block font-bold",
      shadow: "shadow-[0_-10px_30px_rgba(0,0,0,0.05)]",
    },
    dark: { // Used for Lemony Shop (light bg)
      gapBg: "bg-gradient-to-br from-slate-200 to-slate-100",
      bg: "bg-gradient-to-b from-amber-200 to-yellow-100",
      border: "border-amber-900 border-y-8",
      chapter: "text-amber-900",
      title: "text-amber-950 drop-shadow-[4px_4px_0_#b45309]",
      subtitle: "text-amber-900 bg-amber-50 px-4 py-2 rounded-md border-2 border-amber-900 shadow-[4px_4px_0_0_#b45309] inline-block font-bold",
      shadow: "shadow-[0_-10px_30px_rgba(0,0,0,0.05)]",
    },
    horror: { // Used for Rules of Horror (dark red bg)
      gapBg: "bg-gradient-to-br from-neutral-900 to-[#4a0d0d]",
      bg: "bg-gradient-to-b from-[#3f0b0b] to-[#2a0808]",
      border: "border-black border-y-8",
      chapter: "text-red-500",
      title: "text-red-500 drop-shadow-[4px_4px_0_#000000]",
      subtitle: "text-black bg-red-600 px-4 py-2 rounded-md border-2 border-black shadow-[4px_4px_0_0_#000000] inline-block font-bold",
      shadow: "shadow-[0_-20px_50px_rgba(0,0,0,0.5)]", // Original dark shadow
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div ref={containerRef} className="w-full relative flex flex-col items-center justify-start overflow-visible">
      
      {/* Spacer for the gap */}
      <div 
        ref={gapRef} 
        className={`w-full ${currentTheme.gapBg} relative flex items-center justify-center transition-all duration-700 ease-in-out ${isDrawerMode ? "h-[20vh] md:h-[25vh] cursor-pointer overflow-hidden" : (categoryName ? "h-[75vh] overflow-hidden" : "h-[60vh] overflow-hidden")}`}
        onClick={isDrawerMode ? onToggle : undefined}
      >
        {/* Hover overlay for Drawer Mode */}
        {isDrawerMode && (
          <div className="absolute inset-0 z-20 hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        )}

        {/* CSS Stars Parallax (Fixed) for Gap */}
        <div 
          className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
          style={{
            ...getPattern(index + 1),
            backgroundAttachment: `scroll`
          }}
        />
        
        {/* 1. Upper Background (Top Piece) */}
        {/* Extends from top to 15vh with a slanted bottom edge, using clip-path instead of transform so parallax works! */}
        <div 
          className="absolute w-full h-[150vh] z-10 pointer-events-none"
          style={{
            bottom: "calc(100% - 15vh - 3.5vw)",
            left: "0",
            filter: "drop-shadow(0 20px 25px rgba(0,0,0,0.5))"
          }}
        >
          <div
            className={`w-full h-full ${isDrawerMode ? "bg-transparent" : prevBgClass} pointer-events-auto overflow-hidden relative transition-all duration-700`}
            style={{
              clipPath: isDrawerMode 
                ? 'none' 
                : (direction === -1 
                  ? 'polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 7vw))' 
                  : 'polygon(0 0, 100% 0, 100% calc(100% - 7vw), 0 100%)'),
            }}
          >
            {prevHasPattern && (
              <div 
                className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
                style={{
                  ...getPattern(index),
                  backgroundAttachment: `scroll`
                }}
              />
            )}
          </div>
        </div>

        <div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          {categoryName && !isDrawerMode && (
            <motion.div 
              style={{ x: categoryBoxX, top: "15vh" }} 
              className={`absolute w-[150%] h-[15vh] bg-gradient-to-b from-indigo-950 to-slate-900 flex flex-col items-center justify-center shadow-[inset_0_-10px_20px_rgba(0,0,0,0.5)] border-y-8 border-slate-800 will-change-transform pointer-events-auto overflow-hidden`}
            >
              {/* Category GPU Accelerated Parallax Background */}
              <motion.div 
                className="absolute z-0 opacity-20 pointer-events-none will-change-transform" 
                style={{
                  top: "-1000px", bottom: "-1000px", left: "-300vw", right: "-300vw",
                  ...getPattern(3), // Dark Pixel Sparkles pattern
                  x: categoryBgXVw,
                  y: bgYPx
                }}
              />
              
              <div className="text-center relative z-10 flex flex-col items-center">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] md:text-xs tracking-[0.3em] uppercase text-indigo-400 opacity-80 mb-1">
                  - CATEGORY -
                </span>
                <h2 className="font-[family-name:var(--font-pixel)] text-indigo-100 drop-shadow-[2px_2px_0_#020617] md:drop-shadow-[3px_3px_0_#000000] text-xl md:text-3xl tracking-widest uppercase flex items-center gap-4">
                  <PixelStar color="#818cf8" className="w-5 h-5 md:w-6 md:h-6 opacity-70" />
                  {categoryName}
                  <PixelStar color="#818cf8" className="w-5 h-5 md:w-6 md:h-6 opacity-70" />
                </h2>
              </div>
            </motion.div>
          )}

          <motion.div 
            style={{ 
              x: boxX, 
              top: isDrawerMode ? "50%" : (categoryName && !isDrawerMode ? "30vh" : "15vh"),
              y: isDrawerMode ? "-50%" : "0%"
            }}
            className={`absolute w-[150%] h-[30vh] ${currentTheme.bg} flex flex-col items-center justify-center shadow-[0_20px_0_0_rgba(0,0,0,0.5)] border-y-8 border-slate-800 will-change-transform pointer-events-auto overflow-hidden`}
          >
            {/* GPU Accelerated Parallax Background */}
            <motion.div 
              className="absolute z-0 opacity-60 pointer-events-none will-change-transform" 
              style={{
                // Oversize the div so moving it doesn't reveal empty edges.
                // Modulo 960 keeps Y within 960px. X is bounded by 300vw.
                top: "-1000px", bottom: "-1000px", left: "-300vw", right: "-300vw",
                ...getPattern(index + 2),
                x: bgXVw,
                y: bgYPx
              }}
            />

            <div className={`text-center transition-transform duration-300 ${isDrawerMode && !isActiveDrawer ? "scale-90" : "scale-100"}`}>
              <motion.span 
                className={`font-[family-name:var(--font-pixel)] text-xs md:text-sm tracking-[0.3em] uppercase opacity-80 ${currentTheme.chapter}`}
              >
                - Chapter 0{index + 1} -
              </motion.span>
              <h2 className={`font-[family-name:var(--font-pixel)] text-3xl md:text-5xl lg:text-7xl font-black mt-2 md:mt-4 mb-4 md:mb-6 tracking-widest uppercase ${currentTheme.title}`}>
                {title}
              </h2>
              {subtitle && (
                <div className={`font-[family-name:var(--font-pixel)] text-xs md:text-sm tracking-widest uppercase ${currentTheme.subtitle}`}>
                  {subtitle}
                </div>
              )}
              
              {/* Click instruction for Drawer Mode */}
              {isDrawerMode && (
                <div className="mt-4 animate-pulse">
                  <span className={`font-[family-name:var(--font-pixel)] text-[10px] tracking-widest uppercase ${currentTheme.chapter} bg-white/20 px-3 py-1 rounded-full`}>
                    {isActiveDrawer ? "[ CLICK TO CLOSE ]" : "[ CLICK TO OPEN ]"}
                  </span>
                </div>
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
      <AnimatePresence initial={false}>
        {(!isDrawerMode || isActiveDrawer) && (
          <motion.div 
            initial={isDrawerMode ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={isDrawerMode ? { opacity: 0 } : undefined}
            transition={{ duration: 0.4 }}
            style={{ y: lowerBgY }} 
            className={`w-full z-10 will-change-transform relative`}
          >
            {/* Slanted Top Edge for the Next Section to dock with the Top Piece */}
            {!isDrawerMode && (
              <div 
                className={`absolute w-[150%] h-[30vh] ${currentBgClass} z-[-1] pointer-events-none ${currentTheme.shadow}`}
                style={{ 
                  top: 0, 
                  left: "-25%", 
                  transform: `translateY(-15vh) rotate(${rotationAngle}deg)`, 
                  transformOrigin: "top center"
                }}
              />
            )}
            
            {/* Actual Content of the Next Section! */}
            <motion.div 
              ref={contentRef}
              initial={isDrawerMode ? { height: 0 } : false}
              animate={{ height: "auto" }}
              exit={isDrawerMode ? { height: 0 } : undefined}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="w-full relative overflow-hidden"
            >
              {children}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
