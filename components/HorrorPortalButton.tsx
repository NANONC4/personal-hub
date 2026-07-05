"use client";
import { motion } from "framer-motion";
import { CassetteTape } from "lucide-react";



const PixelGhost = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 14 14" className={className} shapeRendering="crispEdges">
    <rect x="5" y="1" width="4" height="1" fill="currentColor" />
    <rect x="4" y="2" width="6" height="1" fill="currentColor" />
    <rect x="3" y="3" width="8" height="1" fill="currentColor" />
    <rect x="3" y="4" width="1" height="2" fill="currentColor" />
    <rect x="6" y="4" width="2" height="2" fill="currentColor" />
    <rect x="10" y="4" width="1" height="2" fill="currentColor" />
    <rect x="3" y="6" width="8" height="4" fill="currentColor" />
    <rect x="3" y="10" width="1" height="2" fill="currentColor" />
    <rect x="5" y="10" width="2" height="2" fill="currentColor" />
    <rect x="8" y="10" width="2" height="2" fill="currentColor" />
    <rect x="10" y="10" width="1" height="2" fill="currentColor" />
  </svg>
);

export default function HorrorPortalButton() {
  return (
    <section className="w-full py-24 md:py-32 relative bg-[#09090b] flex justify-center px-6 border-t border-slate-900/50 overflow-hidden">
      
      {/* Background Pixel Art Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden w-full">
        
        {/* Giant Looming Ghost on the FAR LEFT */}
        <motion.div 
          className="absolute -left-20 md:left-0 top-1/4 z-0"
          animate={{ y: [0, -20, 0], scale: [1, 1.05, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <PixelGhost className="w-64 h-64 md:w-80 md:h-80 text-red-950/70" />
        </motion.div>

        {/* Giant Looming Ghost on the FAR RIGHT */}
        <motion.div 
          className="absolute -right-20 md:right-0 top-1/4 z-0"
          animate={{ y: [0, -30, 0], scale: [1, 1.1, 1], opacity: [0.15, 0.35, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        >
          <PixelGhost className="w-56 h-56 md:w-80 md:h-80 text-red-950/60" />
        </motion.div>

        {/* Huge Ghost drifting across the screen */}
        <motion.div 
          className="absolute -left-64 top-0 z-0"
          animate={{ x: [0, 1500, 0], y: [0, 40, -20, 0], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <PixelGhost className="w-80 h-80 text-red-900/20" />
        </motion.div>

        {/* Swarm of smaller ghosts */}
        {/* 1. Fast top right */}
        <motion.div className="absolute right-0 top-10" animate={{ x: [100, -1200], opacity: [0, 0.5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 1 }}>
          <PixelGhost className="w-12 h-12 text-red-800/60" />
        </motion.div>
        
        {/* 2. Slow bottom left */}
        <motion.div className="absolute left-10 bottom-12" animate={{ x: [0, 500, 0], y: [0, -30, 0], opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
          <PixelGhost className="w-16 h-16 text-red-900/50" />
        </motion.div>

        {/* 3. Tiny darting */}
        <motion.div className="absolute left-1/3 top-1/2" animate={{ x: [-100, 800], y: [0, -100], opacity: [0, 0.7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeOut", delay: 4, repeatDelay: 3 }}>
          <PixelGhost className="w-6 h-6 text-red-600/80" />
        </motion.div>

        {/* 4. Bobbing right side */}
        <motion.div className="absolute right-1/4 top-1/4" animate={{ y: [0, -60, 0], x: [0, 20, 0], opacity: [0, 0.5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 0 }}>
          <PixelGhost className="w-10 h-10 text-red-800/70" />
        </motion.div>

        {/* 5. Fast diagonal */}
        <motion.div className="absolute left-0 bottom-0" animate={{ x: [0, 1000], y: [0, -500], opacity: [0, 0.6, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "linear", delay: 7, repeatDelay: 2 }}>
          <PixelGhost className="w-8 h-8 text-red-700/60" />
        </motion.div>

        {/* 6. Sneaky ghost behind left side */}
        <motion.div className="absolute left-20 top-1/3 z-0" animate={{ x: [0, 100, 0], opacity: [0.1, 0.5, 0.1] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 3 }}>
          <PixelGhost className="w-24 h-24 text-red-950/80" />
        </motion.div>

        {/* 7. Super slow large ghost right side */}
        <motion.div className="absolute right-10 bottom-20 z-0" animate={{ y: [0, -100, 0], x: [0, -50, 0], opacity: [0.1, 0.3, 0.1] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}>
          <PixelGhost className="w-40 h-40 text-red-900/30" />
        </motion.div>

        {/* 8. Micro ghost swarm */}
        <motion.div className="absolute left-1/2 top-10" animate={{ x: [0, -400], y: [0, 100], opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeIn", delay: 9, repeatDelay: 4 }}>
          <PixelGhost className="w-4 h-4 text-red-500" />
        </motion.div>
        
        {/* 9. Micro ghost swarm */}
        <motion.div className="absolute right-1/3 bottom-10" animate={{ x: [0, 300], y: [0, -200], opacity: [0, 0.8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeOut", delay: 6, repeatDelay: 5 }}>
          <PixelGhost className="w-5 h-5 text-red-500/80" />
        </motion.div>
      </div>

      <motion.a
        href="#"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.98 }}
        className="w-full max-w-4xl border border-red-900/30 bg-transparent rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group transition-all duration-500 hover:border-red-800/60 hover:bg-red-950/10 hover:shadow-[0_10px_40px_rgba(153,27,27,0.15)] relative z-20"
      >
        <div className="flex items-center gap-6 z-10 text-center md:text-left flex-col md:flex-row">
          <div className="w-16 h-16 rounded-full bg-red-950/50 border border-red-900/50 flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shrink-0 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
            <CassetteTape className="w-8 h-8 text-red-500/80 group-hover:text-red-400 transition-colors" />
          </div>
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse shadow-[0_0_5px_red]"></span>
              <span className="font-mono text-[10px] text-red-500/60 uppercase tracking-[0.3em]">Archive Room</span>
            </div>
            <h3 className="font-[family-name:var(--font-pixel)] text-2xl md:text-3xl text-red-400/90 tracking-widest uppercase">
              Old Portfolio
            </h3>
          </div>
        </div>

        <div className="text-center md:text-right z-10">
          <p className="font-mono text-xs md:text-sm text-red-300/50 leading-relaxed group-hover:text-red-300/80 transition-colors">
            คลิกเพื่อรับชมพอร์ตฟอลิโอเวอร์ชั่นก่อนหน้า
            <br />
            <span className="text-red-500/40 group-hover:text-red-500/70 text-[10px] md:text-xs tracking-widest uppercase mt-1 block">
              ( Interactive Horror / VHS Theme )
            </span>
          </p>
        </div>
      </motion.a>
      
    </section>
  );
}

