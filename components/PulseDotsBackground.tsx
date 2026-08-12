"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function PulseDotsBackground({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    const dots: { x: number; y: number; maxAlpha: number; currentAlpha: number; speed: number; growing: boolean }[] = [];
    const spacing = 40;
    
    // Initialize dot grid
    for (let x = 0; x < window.innerWidth; x += spacing) {
      for (let y = 0; y < window.innerHeight; y += spacing) {
        if (Math.random() > 0.5) { // Only animate some dots
          dots.push({
            x,
            y,
            maxAlpha: Math.random() * 0.5 + 0.1,
            currentAlpha: Math.random() * 0.5,
            speed: Math.random() * 0.005 + 0.002,
            growing: Math.random() > 0.5
          });
        }
      }
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw static grid
      ctx.fillStyle = "rgba(255, 255, 255, 0.03)";
      for (let x = 0; x < canvas.width; x += spacing) {
        for (let y = 0; y < canvas.height; y += spacing) {
          ctx.beginPath();
          ctx.arc(x, y, 1, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw animated dots
      dots.forEach(dot => {
        if (dot.growing) {
          dot.currentAlpha += dot.speed;
          if (dot.currentAlpha >= dot.maxAlpha) dot.growing = false;
        } else {
          dot.currentAlpha -= dot.speed;
          if (dot.currentAlpha <= 0.05) dot.growing = true;
        }

        ctx.fillStyle = `rgba(168, 85, 247, ${dot.currentAlpha})`; // Purple glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
        ctx.fill();
        
        ctx.shadowBlur = 10;
        ctx.shadowColor = "rgba(168, 85, 247, 0.8)";
      });
      ctx.shadowBlur = 0; // reset

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className={cn("absolute inset-0 bg-[#050B14]", className)}>
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#050B14]" />
    </div>
  );
}
