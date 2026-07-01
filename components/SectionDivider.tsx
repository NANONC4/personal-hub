"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface SectionDividerProps {
  title: string;
  subtitle?: string;
  index: number;
  theme?: "light" | "dark" | "blue";
  prevBgClass?: string;
  currentBgClass?: string;
}

export default function SectionDivider({ 
  title, 
  subtitle, 
  index, 
  theme = "light",
  prevBgClass = "bg-white",
  currentBgClass = "bg-neutral-950"
}: SectionDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const direction = index % 2 === 0 ? -1 : 1;
  const rotationAngle = direction * -4; // e.g. 4deg or -4deg
  
  const x = useTransform(scrollYProgress, [0, 0.6, 0.9], ["0%", "0%", `${direction * 100}%`]);
  const opacity = useTransform(scrollYProgress, [0, 0.6, 0.85], [1, 1, 0]);

  // Theme Styles
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
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div ref={containerRef} className="h-[70vh] w-full flex items-center justify-center relative overflow-hidden bg-transparent">
      
      {/* Seamless Background Split */}
      {/* 1. Upper Background (matches previous section) */}
      <div className={`absolute inset-0 w-full h-full ${prevBgClass} z-0`} />
      
      {/* 2. Lower Background (matches current section) with slanted edge */}
      <div 
        className={`absolute w-[150%] h-[150vh] ${currentBgClass} z-0`}
        style={{
          top: "50%",
          left: "-25%",
          transform: `rotate(${rotationAngle}deg)`,
          transformOrigin: "top center"
        }}
      />

      <motion.div 
        style={{ x, opacity }}
        className={`absolute w-[120%] py-32 ${currentTheme.bg} flex flex-col items-center justify-center shadow-2xl border-y ${currentTheme.border} origin-center z-10 will-change-transform`}
        initial={{ rotate: rotationAngle }}
      >
        <div className="text-center px-4 max-w-4xl" style={{ transform: `rotate(${-rotationAngle}deg)` }}>
          <span className={`${currentTheme.chapter} font-bold tracking-[0.3em] text-xs md:text-sm uppercase mb-4 block`}>
            Chapter 0{index + 1}
          </span>
          <h2 className={`text-5xl md:text-7xl lg:text-8xl font-black ${currentTheme.title} tracking-tighter uppercase leading-none`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`${currentTheme.subtitle} mt-6 max-w-xl mx-auto text-lg md:text-xl font-light`}>
              {subtitle}
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
}
