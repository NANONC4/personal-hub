"use client";

import { motion } from "framer-motion";
import { PixelStar, PixelSparkle } from "./PixelIcons";
import { getPattern } from "@/lib/patterns";

export default function ShopSection() {
  return (
    <section className="w-full relative min-h-[70vh] bg-[#050B14] flex flex-col items-center justify-center py-20 px-6 overflow-hidden border-t-4 border-indigo-900/50">
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-10 pointer-events-none mix-blend-screen" 
        style={{ ...getPattern(1), backgroundAttachment: "scroll" }}
      />
      
      <div className="max-w-6xl w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
        
        {/* LEFT COLUMN: Pixel Art Shop Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full max-w-[500px] flex-shrink-0"
        >
          {/* Retro Window Container */}
          <div className="w-full bg-[#0a0f1c]/90 backdrop-blur-md rounded-xl overflow-hidden shadow-[8px_8px_0_0_rgba(245,158,11,0.3)] border-4 border-yellow-500/50 relative group">
            
            {/* Window Header */}
            <div className="h-8 border-b-4 border-yellow-500/50 bg-[#050B14] flex items-center px-4 gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-sm"></div>
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="ml-2 font-[family-name:var(--font-pixel)] text-[10px] text-yellow-500/80 uppercase">shop.exe</span>
            </div>

            {/* Empty Cover Photo Frame */}
            <div className="w-full h-[180px] bg-slate-900 border-b-4 border-dashed border-slate-700 flex flex-col items-center justify-center relative">
               <span className="font-[family-name:var(--font-pixel)] text-slate-600 text-xs tracking-widest uppercase">
                 [ COVER IMAGE SLOT ]
               </span>
               <PixelSparkle color="#334155" className="absolute top-4 left-4 w-6 h-6" />
               <PixelStar color="#334155" className="absolute bottom-4 right-4 w-4 h-4" />
            </div>

            {/* Profile Info Area */}
            <div className="px-6 pb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                
                {/* Empty Profile Pic Frame & Name */}
                <div className="flex items-end gap-4 -mt-12">
                  <div className="w-[100px] h-[100px] border-4 border-[#0a0f1c] bg-slate-800 border-dashed border-slate-600 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <span className="font-[family-name:var(--font-pixel)] text-slate-500 text-[8px] tracking-widest uppercase text-center px-2">
                      [ AVATAR ]
                    </span>
                  </div>
                  
                  <div className="mb-2">
                    <h4 className="font-[family-name:var(--font-pixel)] text-2xl text-yellow-400 drop-shadow-[0_2px_4px_rgba(250,204,21,0.4)] uppercase tracking-wider">
                      Lemony
                    </h4>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>


        {/* RIGHT COLUMN: Content (Minimalist) */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="w-full flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 mb-6 opacity-80">
            <PixelStar color="#facc15" className="w-4 h-4 animate-bounce" />
            <span className="font-[family-name:var(--font-pixel)] text-yellow-400 text-sm tracking-[0.3em] uppercase">
              - SPONSORED -
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="font-[family-name:var(--font-pixel)] text-5xl md:text-7xl font-black mb-6 tracking-widest uppercase text-white drop-shadow-[4px_4px_0_rgba(245,158,11,0.5)]">
            LEMONY
          </h2>
          
          {/* User's Original Text */}
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed max-w-lg mb-10 font-medium bg-slate-900/50 p-6 rounded-xl border border-slate-800/80 shadow-[inset_0_2px_10px_rgba(0,0,0,0.5)]">
            "ขอฝากร้านไว้ตรงนี้นะครับ หากใครสนใจแวะมาใช้บริการได้เลย"
          </p>
          
          {/* CTA Button */}
          <div className="flex w-full justify-center lg:justify-start">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-xl font-[family-name:var(--font-pixel)] text-sm md:text-base tracking-wider uppercase transition-all shadow-[4px_4px_0_0_rgba(59,130,246,0.3)] hover:shadow-[6px_6px_0_0_rgba(59,130,246,0.4)] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0_0_rgba(59,130,246,0.4)]"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              ไปที่หน้าร้าน
            </a>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
