"use client";
import { motion } from "framer-motion";
import { Tv } from "lucide-react";

export default function HorrorPortalButton() {
  return (
    <div className="w-full flex justify-center py-48 relative z-20">
      <motion.a
        href="#" // Users can link this to their VHS site URL
        whileHover={{ scale: 1.05, filter: "contrast(1.2) brightness(1.2)" }}
        whileTap={{ scale: 0.95 }}
        className="relative group overflow-hidden border border-red-900 bg-neutral-950 px-12 py-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-all duration-300"
        style={{
          boxShadow: "0 0 40px rgba(185, 28, 28, 0.15)"
        }}
      >
        {/* CRT Scanline effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10 pointer-events-none opacity-50"></div>
        
        {/* Noise */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-40 pointer-events-none mix-blend-overlay"></div>
        
        <Tv size={48} className="text-red-700 group-hover:text-red-500 transition-colors z-20 relative" />
        
        <h3 className="text-red-700 group-hover:text-red-500 transition-colors font-black tracking-[0.3em] uppercase text-2xl md:text-3xl z-20 relative text-center">
          Enter The VHS
        </h3>
        
        <p className="text-red-900 group-hover:text-red-700 transition-colors font-mono text-sm uppercase tracking-widest z-20 relative">
          Interactive Horror Portfolio
        </p>
      </motion.a>
    </div>
  );
}
