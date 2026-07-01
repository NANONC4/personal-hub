"use client";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, ReactNode } from "react";

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
  const rawBoxX = useTransform(scrollYProgress, [0.50, 0.65], [0, direction * 150]);
  const boxXSpring = useSpring(rawBoxX, { stiffness: 70, damping: 20, mass: 0.8 });
  const boxX = useTransform(boxXSpring, v => `${v}%`);
  
  // 2. The NEXT section (children) slides UP by 30vh to perfectly dock with the Top Piece!
  // It starts right after the box begins to slide out, and finishes docking as the box leaves.
  const rawLowerBgY = useTransform(scrollYProgress, [0.60, 0.75], [0, -30]);
  const lowerBgYSpring = useSpring(rawLowerBgY, { stiffness: 70, damping: 20, mass: 0.8 });
  const lowerBgY = useTransform(lowerBgYSpring, v => `${v}vh`);

  // Theme Styles for the Divider Box
  const themeStyles = {
    blue: {
      bg: "bg-[#b5cddf]",
      border: "border-[#a3bcd0]",
      chapter: "text-sky-600",
      title: "text-sky-950",
      subtitle: "text-sky-800",
    },
    light: {
      bg: "bg-white",
      border: "border-neutral-200",
      chapter: "text-neutral-400",
      title: "text-neutral-900",
      subtitle: "text-neutral-500",
    },
    dark: {
      bg: "bg-neutral-900",
      border: "border-neutral-800",
      chapter: "text-neutral-500",
      title: "text-white",
      subtitle: "text-neutral-400",
    },
    horror: {
      bg: "bg-black",
      border: "border-red-900/50",
      chapter: "text-red-700",
      title: "text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]",
      subtitle: "text-red-800",
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div ref={containerRef} className="w-full relative flex flex-col items-center justify-start overflow-visible">
      
      {/* Spacer for the gap (Reduced to 60vh to prevent massive empty space) */}
      <div ref={gapRef} className="h-[60vh] w-full bg-neutral-800 relative overflow-hidden flex items-center justify-center">
        
        {/* 1. Upper Background (Top Piece) */}
        {/* Extends from top to 15vh with a slanted bottom edge */}
        <div 
          className={`absolute w-[150%] h-[150vh] ${prevBgClass} z-10 shadow-2xl`}
          style={{
            bottom: "50%",
            left: "-25%",
            transform: `translateY(-15vh) rotate(${rotationAngle}deg)`,
            transformOrigin: "bottom center"
          }}
        />

        {/* 3. The Divider Box (The yellow band in the gap) */}
        <div 
          className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{ transform: `rotate(${rotationAngle}deg)` }}
        >
          <motion.div 
            style={{ x: boxX }}
            className={`w-[150%] flex-shrink-0 h-[30vh] ${currentTheme.bg} flex flex-col items-center justify-center shadow-2xl border-y ${currentTheme.border} will-change-transform pointer-events-auto`}
          >
            <div className="text-center px-4 max-w-4xl" style={{ transform: `rotate(${-rotationAngle}deg)` }}>
              <motion.span 
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`${currentTheme.chapter} font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-2 block`}
              >
                Chapter 0{index + 1}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                className={`text-4xl md:text-6xl lg:text-7xl font-black ${currentTheme.title} tracking-tighter uppercase leading-none`}
              >
                {title}
              </motion.h2>
              {subtitle && (
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className={`${currentTheme.subtitle} mt-2 max-w-xl mx-auto text-base md:text-lg font-light`}
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
