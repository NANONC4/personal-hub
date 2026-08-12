"use client";
import { cn } from "@/lib/utils";

export default function RetroGridBackground({ className }: { className?: string }) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute inset-0 bg-[#050B14]" />
      
      {/* Grid container with perspective */}
      <div className="absolute inset-0 [perspective:1000px]">
        <div 
          className="absolute inset-0 origin-bottom"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(236, 72, 153, 0.15) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(236, 72, 153, 0.15) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            transform: 'rotateX(60deg) translateY(100px) scale(2.5)',
            maskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
          }}
        />
        {/* Animated moving lines (simulate movement) */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes grid-scroll {
            0% { transform: rotateX(60deg) translateY(0) scale(2.5); }
            100% { transform: rotateX(60deg) translateY(50px) scale(2.5); }
          }
        `}} />
        <div 
          className="absolute inset-0 origin-bottom"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(56, 189, 248, 0.2) 2px, transparent 2px)`,
            backgroundSize: '50px 50px',
            maskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
            WebkitMaskImage: 'linear-gradient(to top, black 10%, transparent 60%)',
            animation: 'grid-scroll 2s linear infinite',
          }}
        />
      </div>
      
      {/* Glow at the horizon */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-pink-500/10 via-sky-500/5 to-transparent blur-3xl mix-blend-screen" />
    </div>
  );
}
