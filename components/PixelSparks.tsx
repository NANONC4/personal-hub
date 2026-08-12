"use client";
import { cn } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function PixelSparks({ className }: { className?: string }) {
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

    const sparks: { x: number; y: number; size: number; speedY: number; opacity: number; color: string }[] = [];
    const colors = ["#f472b6", "#38bdf8", "#fbbf24", "#a855f7"];
    
    // Initialize sparks
    for (let i = 0; i < 50; i++) {
      sparks.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() > 0.8 ? 4 : 2, // square size
        speedY: Math.random() * 0.5 + 0.1,
        opacity: Math.random(),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      sparks.forEach(spark => {
        spark.y -= spark.speedY;
        spark.opacity = Math.sin(spark.y * 0.01) * 0.5 + 0.5; // twinkle

        if (spark.y < 0) {
          spark.y = canvas.height;
          spark.x = Math.random() * canvas.width;
        }

        ctx.fillStyle = spark.color;
        ctx.globalAlpha = spark.opacity * 0.6;
        ctx.fillRect(spark.x, spark.y, spark.size, spark.size);
      });
      ctx.globalAlpha = 1.0;

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
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050B14_100%)] opacity-80" />
    </div>
  );
}
