"use client";
import { Project } from "@/data/projects";
import { motion, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import StoryContentBlock from "./StoryContentBlock";
import { useLenis } from 'lenis/react';
import { Expand, X } from "lucide-react";

interface HorizontalScrollCarouselProps {
  project: Project;
  theme?: "light" | "dark" | "gray";
}

export default function HorizontalScrollCarousel({ project, theme = "light" }: HorizontalScrollCarouselProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const maxScrollRef = useRef(0);
  const lenis = useLenis();

  // Use Framer Motion spring for buttery smooth horizontal movement
  const xSpring = useSpring(0, { stiffness: 120, damping: 25, mass: 0.8 });

  // Update max scroll distance when locked
  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current && trackRef.current) {
        maxScrollRef.current = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isLocked]);

  // Handle Wheel Events when locked
  useEffect(() => {
    if (!isLocked) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop vertical scroll
      
      // Multiply the scroll amount to make it less sluggish (faster)
      const scrollSpeedMultiplier = 2.5; 
      const scrollAmount = e.deltaY * scrollSpeedMultiplier;
      const currentX = xSpring.get();
      
      let newX = currentX - scrollAmount;
      
      // Clamp values and auto-unlock at boundaries
      if (newX > 0) {
        newX = 0;
        if (currentX === 0 && e.deltaY < 0) {
          toggleLock(); // Reached start, scrolling up -> unlock
        }
      } else if (newX < -maxScrollRef.current) {
        newX = -maxScrollRef.current;
        if (currentX === -maxScrollRef.current && e.deltaY > 0) {
          toggleLock(); // Reached end, scrolling down -> unlock
        }
      }

      xSpring.set(newX);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, [isLocked, xSpring, lenis]);

  const toggleLock = () => {
    if (isLocked) {
      setIsLocked(false);
      lenis?.start();
      xSpring.set(0); // Reset position when unlocked
    } else {
      // Auto-scroll to perfectly center the carousel in the viewport
      containerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
      
      // Lock after a short delay to allow the scroll to happen
      setTimeout(() => {
        setIsLocked(true);
        lenis?.stop(); // Pause vertical lenis scroll
      }, 500);
    }
  };

  // Theme Styles
  const themeStyles = {
    light: { bg: "bg-neutral-50", buttonText: "text-neutral-900" },
    dark: { bg: "bg-neutral-950", buttonText: "text-white" },
    gray: { bg: "bg-neutral-900", buttonText: "text-neutral-200" },
    horror: { bg: "bg-neutral-950", buttonText: "text-red-500" } // Custom Horror Theme
  };
  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <section 
      ref={containerRef} 
      className={`relative w-full h-screen flex items-center justify-center overflow-hidden transition-all duration-700 ${currentTheme.bg}`}
    >
      <motion.div 
        animate={{ opacity: 1, scale: 1 }} // Removed dimming and scaling
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="w-full h-full relative"
      >
        <motion.div 
          ref={trackRef}
          style={{ x: xSpring }} 
          drag={isLocked ? "x" : false}
          dragConstraints={{ right: 0, left: -maxScrollRef.current }}
          dragElastic={0.05}
          dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
          className="flex h-full absolute left-0 top-0 will-change-transform items-center px-12 md:px-24 cursor-grab active:cursor-grabbing"
        >
          {/* Slide 1: Content */}
          <div className="w-[80vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-full mr-24 relative">
            <StoryContentBlock project={project} theme={theme} />
            
            {/* Embedded Click to Explore Button */}
            {!isLocked && (
              <div className="mt-12 flex">
                <button 
                  onClick={toggleLock}
                  className={`px-5 py-2.5 rounded-full backdrop-blur-md bg-neutral-800/10 hover:bg-neutral-800/30 font-medium text-sm tracking-widest flex items-center gap-2 border border-current shadow-lg transition-all hover:scale-105 ${currentTheme.buttonText}`}
                >
                  <Expand size={16} />
                  CLICK TO EXPLORE
                </button>
              </div>
            )}
          </div>
          
          {/* Gallery Slides */}
          {project.gallery?.map((img, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
              className="w-[70vw] md:w-[50vw] max-w-4xl h-[70vh] flex-shrink-0 flex items-center justify-center px-4 md:px-8"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative group">
                <img src={img} alt={`${project.title} gallery ${idx + 1}`} className="w-full h-full object-cover" />
              </div>
            </motion.div>
          ))}

          {/* End Slide (Buffer) */}
          <div className="w-[20vw] flex-shrink-0 flex items-center justify-center">
            <button 
              onClick={toggleLock}
              className={`flex flex-col items-center gap-4 ${currentTheme.buttonText} hover:opacity-70 transition-opacity`}
            >
              <X size={32} />
              <span className="font-medium tracking-widest uppercase text-sm">Close</span>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating UI just for the Close button when locked */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
        <motion.button 
          initial={false}
          animate={{ opacity: isLocked ? 1 : 0, y: isLocked ? 0 : 20 }}
          className={`pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-xl backdrop-blur-md bg-white/10 ${currentTheme.buttonText} border border-white/20`}
          onClick={toggleLock}
        >
          <X size={18} />
          Close Gallery
        </motion.button>
      </div>
    </section>
  );
}
