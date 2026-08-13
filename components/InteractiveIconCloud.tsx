"use client";

import React, { useRef, useState, useEffect } from "react";
import { IconCloud } from "./IconCloud";
import { motion, useAnimation } from "framer-motion";

interface InteractiveIconCloudProps {
  slugs: string[];
}

export function InteractiveIconCloud({ slugs }: InteractiveIconCloudProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();
  const [particles, setParticles] = useState<{ x: number; y: number; vx: number; vy: number; life: number; color: string }[]>([]);
  const animationRef = useRef<number>();
  
  // Custom cursor state
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // Setup canvas for particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Match container size
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
      }
    };
    
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // Particle animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = performance.now();

    const loop = (time: number) => {
      const dt = (time - lastTime) / 1000;
      lastTime = time;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      setParticles(prev => {
        const activeParticles = prev.filter(p => p.life > 0);
        
        activeParticles.forEach(p => {
          p.x += p.vx * dt;
          p.y += p.vy * dt;
          p.life -= dt * 2.5; // Fade out speed
          
          // Add some gravity
          p.vy += 200 * dt; 

          ctx.fillStyle = p.color;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillRect(p.x, p.y, 4, 4); // Pixel size
        });
        
        ctx.globalAlpha = 1;
        return activeParticles;
      });

      animationRef.current = requestAnimationFrame(loop);
    };

    animationRef.current = requestAnimationFrame(loop);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleIconClick = (e: any, slug: string) => {
    // Determine explosion position relative to the container
    const container = containerRef.current;
    if (!container) return;
    
    const rect = container.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.type?.includes('touch')) {
      // For Touch events from canvas (react-icon-cloud internally uses mouse events on a canvas, we try to get coords)
      clientX = e.touches ? e.touches[0].clientX : e.clientX;
      clientY = e.touches ? e.touches[0].clientY : e.clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    // Create explosion particles
    const colors = ["#38bdf8", "#f472b6", "#fbbf24", "#ffffff"];
    const newParticles = [];
    for (let i = 0; i < 30; i++) {
      newParticles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 600,
        vy: (Math.random() - 0.5) * 600,
        life: 1.0 + Math.random() * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    setParticles(prev => [...prev, ...newParticles]);

    // Screen Shake Effect
    controls.start({
      x: [0, -10, 10, -10, 10, 0],
      y: [0, 10, -10, 10, -10, 0],
      transition: { duration: 0.4 }
    });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
  };

  return (
    <motion.div 
      ref={containerRef}
      animate={controls}
      className="relative w-full h-full cursor-crosshair md:cursor-none group"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
    >
      {/* The 3D Icon Cloud */}
      <IconCloud slugs={slugs} onIconClick={handleIconClick} />

      {/* Particle Canvas Overlay */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10 [image-rendering:pixelated]"
      />

      {/* Custom Crosshair Cursor (Only on Desktop) */}
      {isHovering && (
        <div 
          className="absolute pointer-events-none z-50 hidden md:block mix-blend-difference"
          style={{
            left: mousePos.x,
            top: mousePos.y,
            transform: "translate(-50%, -50%)",
          }}
        >
          {/* Sniper Crosshair SVG */}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" stroke="#00ff00" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_4s_linear_infinite]" />
            <circle cx="20" cy="20" r="10" stroke="#ff0044" strokeWidth="1.5" />
            <path d="M20 2L20 12" stroke="#ff0044" strokeWidth="1.5"/>
            <path d="M20 38L20 28" stroke="#ff0044" strokeWidth="1.5"/>
            <path d="M2 20L12 20" stroke="#ff0044" strokeWidth="1.5"/>
            <path d="M38 20L28 20" stroke="#ff0044" strokeWidth="1.5"/>
            <circle cx="20" cy="20" r="2" fill="#ff0044" />
          </svg>
        </div>
      )}
    </motion.div>
  );
}
