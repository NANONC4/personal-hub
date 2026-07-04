"use client";
import { motion, useSpring } from "framer-motion";
import { useRef, useState, useEffect, ReactNode } from "react";
import { useLenis } from 'lenis/react';
import { X } from "lucide-react";

interface HorizontalScrollWrapperProps {
  children: ReactNode;
  bgClass?: string;
  buttonTextClass?: string;
}

export default function HorizontalScrollWrapper({ 
  children, 
  bgClass = "bg-neutral-950", 
  buttonTextClass = "text-white"
}: HorizontalScrollWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const maxScrollRef = useRef(0);
  const lenis = useLenis();

  // Use Framer Motion spring for buttery smooth horizontal movement
  const xSpring = useSpring(0, { stiffness: 120, damping: 25, mass: 0.8 });

  useEffect(() => {
    const handleResize = () => {
      const desktop = window.innerWidth >= 1024;
      setIsDesktop(desktop);
      if (desktop && containerRef.current && trackRef.current) {
        maxScrollRef.current = trackRef.current.scrollWidth - containerRef.current.offsetWidth;
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Also recount after 100ms in case images load
    const timeout = setTimeout(handleResize, 100);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeout);
    };
  }, [isLocked, children]);

  // Handle Wheel Events when locked (Desktop only)
  useEffect(() => {
    if (!isLocked || !isDesktop) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault(); // Stop vertical scroll
      
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
  }, [isLocked, xSpring, lenis, isDesktop]);

  const toggleLock = () => {
    if (!isDesktop) return; // Don't lock on mobile

    if (isLocked) {
      setIsLocked(false);
      lenis?.start();
      xSpring.set(0); // Reset position when unlocked
    } else {
      if (lenis) {
        // Use Lenis to smoothly scroll to the section
        lenis.scrollTo(containerRef.current as HTMLElement, { 
          duration: 0.5,
          lock: false
        });
        
        // Wait for the scroll to finish before locking
        setTimeout(() => {
          setIsLocked(true);
          lenis.stop(); 
        }, 550);
      } else {
        // Fallback
        containerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          setIsLocked(true);
        }, 600);
      }
    }
  };

  return (
    <section 
      ref={containerRef} 
      className={`relative z-10 w-full min-h-screen lg:h-screen flex flex-col lg:flex-row items-center justify-center overflow-visible transition-colors duration-700 ${bgClass}`}
    >
      <motion.div 
        ref={trackRef}
        style={{ x: isDesktop ? xSpring : 0 }} 
        drag={isLocked && isDesktop ? "x" : false}
        dragConstraints={{ right: 0, left: -maxScrollRef.current }}
        dragElastic={0.05}
        dragTransition={{ bounceStiffness: 400, bounceDamping: 30 }}
        className="flex flex-col lg:flex-row h-auto lg:h-full relative lg:absolute left-0 top-0 will-change-transform items-center py-24 lg:py-0 px-6 lg:px-24 gap-16 lg:gap-0 w-full lg:w-auto lg:cursor-grab lg:active:cursor-grabbing"
      >
        {/* Inject Custom Slides Here */}
        {children}
        
        {/* End Slide (Buffer & Unlock) - Desktop Only */}
        {isDesktop && (
          <div className="w-[20vw] flex-shrink-0 flex items-center justify-center pl-12">
            <button 
              onClick={toggleLock}
              className={`flex flex-col items-center gap-4 ${buttonTextClass} hover:opacity-70 transition-opacity`}
            >
              <X size={32} />
              <span className="font-medium tracking-widest uppercase text-sm">Close</span>
            </button>
          </div>
        )}
      </motion.div>

      {/* Floating UI just for the Close button when locked (Desktop Only) */}
      {isDesktop && (
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 pointer-events-none">
          <motion.button 
            initial={false}
            animate={{ opacity: isLocked ? 1 : 0, y: isLocked ? 0 : 20 }}
            className={`pointer-events-auto flex items-center gap-2 px-6 py-3 rounded-full font-medium shadow-xl bg-white/90 ${buttonTextClass} border border-white/20`}
            onClick={toggleLock}
          >
            <X size={18} />
            Close Gallery
          </motion.button>
        </div>
      )}

      {/* Absolute overlay button intercepting clicks when unlocked (Desktop Only) */}
      {!isLocked && isDesktop && (
        <div 
          className="absolute inset-0 cursor-pointer z-0" 
          onClick={toggleLock} 
        />
      )}
    </section>
  );
}
