"use client";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section id="intro" className="relative w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-pink-100 to-pink-200 text-black py-24 px-6 md:px-12 z-20 overflow-hidden">
      {/* CSS Stars Parallax (Fixed) */}
      <div 
        className="absolute inset-0 z-0 opacity-60 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(white 3px, transparent 3px), radial-gradient(white 3px, transparent 3px)`,
          backgroundSize: `40px 40px`,
          backgroundPosition: `0 0, 20px 20px`,
          backgroundAttachment: `fixed`
        }}
      />
      <div className="max-w-5xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-slate-400 font-[family-name:var(--font-pixel)] tracking-widest text-lg uppercase mb-10"
        >
          - Level 01 -
        </motion.p>
        
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter leading-[1.3] text-slate-800 flex flex-wrap justify-center gap-x-4 drop-shadow-sm font-[family-name:var(--font-pixel)] uppercase">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Crafting digital
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="text-sky-500 mx-2"
          >
            experiences
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            with magic.
          </motion.span>
        </h2>
        
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
          className="mt-20 w-[4px] border-l-4 border-dashed border-slate-300 mx-auto"
        />
      </div>
    </section>
  );
}
