"use client";

import { motion } from "framer-motion";
import { PixelStar, PixelSparkle, PixelCoin } from "./PixelIcons";
import { getPattern } from "@/lib/patterns";

export default function ShopSection() {
  return (
    <section className="w-full relative min-h-[60vh] bg-[#050B14] flex flex-col items-center justify-center py-20 px-6 overflow-hidden border-t-4 border-indigo-900/50">
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.04] pointer-events-none mix-blend-screen" 
        style={{ ...getPattern(1), backgroundAttachment: "scroll" }}
      />
      
      <div className="max-w-4xl w-full relative z-10 flex flex-col items-center">
        
        {/* Neon Sign */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="mb-12 relative flex flex-col items-center"
        >
           <PixelSparkle color="#fde047" className="absolute -top-6 -left-8 w-8 h-8 animate-pulse" />
           <PixelStar color="#f472b6" className="absolute -bottom-4 -right-6 w-6 h-6 animate-bounce" />
           <div className="text-center font-[family-name:var(--font-pixel)] text-yellow-300 text-sm tracking-[0.3em] uppercase mb-4 drop-shadow-[0_0_8px_rgba(253,224,71,0.6)]">
             - SPONSORED -
           </div>
           <h2 className="font-[family-name:var(--font-pixel)] text-5xl md:text-7xl text-white tracking-widest uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] text-center relative">
             <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-orange-500 bg-clip-text text-transparent animate-gradient-text drop-shadow-[0_0_20px_rgba(251,191,36,0.5)]">
               LEMONY
             </span>
           </h2>
        </motion.div>

        {/* Shop Box */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
          <div className="relative bg-[#0a0f1c]/90 backdrop-blur-md border-4 border-yellow-500/50 rounded-2xl p-8 md:p-12 shadow-[8px_8px_0_0_rgba(245,158,11,0.3)] flex flex-col md:flex-row items-center gap-8 md:gap-12 text-center md:text-left transition-transform duration-300 group-hover:-translate-y-1">
            
            {/* Icon/Logo */}
            <div className="shrink-0 w-32 h-32 bg-slate-900 border-4 border-yellow-400/80 rounded-xl flex items-center justify-center shadow-[inset_0_0_20px_rgba(250,204,21,0.2)] relative overflow-hidden group-hover:border-yellow-300 transition-colors">
               <div className="absolute inset-0 bg-yellow-500/10 animate-pulse"></div>
               <PixelCoin className="w-16 h-16 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300" />
            </div>

            {/* Content */}
            <div className="flex-1 space-y-4">
               <h3 className="text-2xl md:text-3xl font-bold text-white tracking-tight drop-shadow-sm">
                 บริการเติมเกม รวดเร็ว ปลอดภัย
               </h3>
               <p className="text-slate-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0">
                 ขอฝากร้านไว้ตรงนี้นะครับ หากใครสนใจแวะมาใช้บริการได้เลย รับประกันคุณภาพ บริการด้วยใจ 💛
               </p>
               
               <div className="pt-4 flex justify-center md:justify-start">
                 <a 
                   href="#" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-[family-name:var(--font-pixel)] text-sm tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:-translate-y-1"
                 >
                   <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                     <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                   </svg>
                   VISIT LEMONY SHOP
                 </a>
               </div>
            </div>
            
          </div>
        </motion.div>
      </div>
    </section>
  );
}
