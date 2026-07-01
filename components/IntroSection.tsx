"use client";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-white text-black py-24 px-6 md:px-12 z-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-neutral-400 font-medium tracking-[0.3em] text-sm uppercase mb-10"
        >
          Introduction
        </motion.p>
        
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-neutral-900"
        >
          Crafting digital experiences that merge <span className="text-neutral-400 italic font-serif font-light">aesthetics</span> with flawless engineering.
        </motion.h2>
        
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          whileInView={{ opacity: 1, height: 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.8, ease: "circOut" }}
          className="mt-20 w-[1px] bg-neutral-300 mx-auto"
        />
      </div>
    </section>
  );
}
