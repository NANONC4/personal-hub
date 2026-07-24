"use client";
import { motion } from "framer-motion";
import { PixelHeart, PixelStar, PixelSparkle } from "./PixelIcons";
import PixelSky from "./PixelSky";

export default function IntroSection() {
  return (
    <section id="intro" className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#0f172a] text-slate-200 py-24 px-6 md:px-12 z-20 overflow-hidden">
      
      {/* Pixel Sky Background */}
      <PixelSky className="absolute inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* Floating Retro Elements */}
      <div className="absolute top-32 left-[10%] opacity-80 animate-sparkle-1 hidden md:block">
        <PixelHeart color="#f472b6" className="w-10 h-10" />
      </div>
      <div className="absolute bottom-32 right-[15%] opacity-80 animate-sparkle-2 hidden md:block">
        <PixelHeart color="#38bdf8" className="w-12 h-12" />
      </div>
      <div className="absolute top-1/2 right-[10%] animate-spin-slow hidden md:block opacity-90">
        <PixelStar color="#facc15" className="w-8 h-8" />
      </div>
      <div className="absolute bottom-1/4 left-[15%] animate-jiggle-loop hidden md:block opacity-90">
        <PixelSparkle color="#c084fc" className="w-10 h-10" />
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.p 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ margin: "-100px", once: false }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-indigo-300 font-[family-name:var(--font-pixel)] tracking-widest text-lg uppercase mb-10 bg-[#1e1b4b]/90 px-6 py-2 rounded-full inline-block border-2 border-indigo-500/30"
        >
          - Level 01 -
        </motion.p>
        
        <h2 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter leading-[1.3] text-slate-100 flex flex-wrap justify-center gap-x-4 drop-shadow-sm font-[family-name:var(--font-pixel)] uppercase">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Crafting digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="mx-2 bg-gradient-to-r from-sky-300 via-pink-300 to-purple-300 bg-clip-text text-transparent animate-gradient-text"
          >
            experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-100px", once: false }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            with magic.
          </motion.span>
        </h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ margin: "-100px", once: false }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 text-slate-300 text-lg md:text-2xl max-w-2xl mx-auto font-medium"
        >
          Building immersive and interactive web experiences by blending code with creativity and a touch of retro charm.
        </motion.p>        <motion.div 
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ opacity: 1, scaleY: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
          className="mt-16 w-[4px] h-[60px] origin-top border-l-4 border-dashed border-pink-400 mx-auto opacity-50"
        />
      </div>
    </section>
  );
}
