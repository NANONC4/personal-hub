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
      
      <div className="max-w-[85rem] w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-24">
        
        {/* LEFT COLUMN: Pixel Art Shop Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
          className="w-full lg:w-[55%] max-w-[700px] flex-shrink-0"
        >
          {/* Retro Picture Frame Container */}
          <div className="w-full bg-[#0a0f1c]/90 backdrop-blur-md rounded-2xl overflow-hidden shadow-[12px_12px_0_0_rgba(56,189,248,0.2)] border-8 border-sky-400/60 relative group p-2">

            {/* Empty Cover Photo Frame */}
            <div className="w-full h-[220px] md:h-[260px] bg-slate-900 border-4 border-dashed border-slate-700 flex flex-col items-center justify-center relative rounded-t-lg">
               <span className="font-[family-name:var(--font-pixel)] text-slate-600 text-sm tracking-widest uppercase">
                 [ COVER IMAGE SLOT ]
               </span>
               <PixelSparkle color="#334155" className="absolute top-4 left-4 w-6 h-6" />
               <PixelStar color="#334155" className="absolute bottom-4 right-4 w-4 h-4" />
            </div>

            {/* Profile Info Area */}
            <div className="px-6 pb-8 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                
                {/* Empty Profile Pic Frame & Name */}
                <div className="flex items-end gap-6 -mt-16">
                  <div className="w-[120px] h-[120px] md:w-[140px] md:h-[140px] border-4 border-[#0a0f1c] bg-slate-800 border-dashed border-slate-600 flex flex-col items-center justify-center relative shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
                    <span className="font-[family-name:var(--font-pixel)] text-slate-500 text-[10px] tracking-widest uppercase text-center px-2">
                      [ AVATAR ]
                    </span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-[family-name:var(--font-pixel)] text-3xl md:text-4xl text-sky-300 drop-shadow-[0_2px_4px_rgba(125,211,252,0.4)] uppercase tracking-wider">
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
          className="w-full lg:w-[45%] flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-3 mb-6 opacity-80">
            <PixelStar color="#7dd3fc" className="w-5 h-5 animate-bounce" />
            <span className="font-[family-name:var(--font-pixel)] text-sky-300 text-base tracking-[0.3em] uppercase">
              - SPONSORED -
            </span>
          </div>
          
          {/* Main Title */}
          <h2 className="font-[family-name:var(--font-pixel)] text-6xl md:text-[6rem] leading-none font-black mb-8 tracking-widest uppercase text-white drop-shadow-[6px_6px_0_rgba(56,189,248,0.5)]">
            LEMONY
          </h2>
          
          {/* User's Original Text */}
          <p className="text-slate-300 text-xl md:text-2xl leading-relaxed w-full mb-12 font-[family-name:var(--font-pixel)] uppercase tracking-wide bg-slate-900/50 p-8 md:p-10 rounded-2xl border-2 border-slate-800/80 shadow-[inset_0_4px_15px_rgba(0,0,0,0.5)]">
            "LEAVING MY SHOP HERE! IF YOU'RE INTERESTED, FEEL FREE TO DROP BY AND USE OUR SERVICES!"
          </p>
          
          {/* CTA Button */}
          <div className="flex w-full justify-center lg:justify-start">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-4 px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white border-4 border-blue-400 font-[family-name:var(--font-pixel)] text-lg md:text-xl tracking-wider uppercase transition-all shadow-[6px_6px_0_0_rgba(59,130,246,0.5)] hover:shadow-[8px_8px_0_0_rgba(59,130,246,0.6)] hover:-translate-y-1 active:translate-y-0 active:shadow-[2px_2px_0_0_rgba(59,130,246,0.6)]"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              VISIT SHOP
            </a>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
