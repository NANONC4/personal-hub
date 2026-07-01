"use client";
import { motion } from "framer-motion";

export default function IntroSection() {
  return (
    <section id="intro" className="relative w-full min-h-[80vh] flex items-center justify-center bg-white text-black py-24 px-6 md:px-12 z-20">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-neutral-400 font-medium tracking-[0.3em] text-sm uppercase mb-10"
        >
          Introduction
        </motion.p>
        
        <h2 className="text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight leading-[1.1] text-neutral-900 flex flex-wrap justify-center gap-x-4">
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Crafting digital experiences that merge
          </motion.span>
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.5, type: "spring" }}
            className="text-neutral-400 italic font-serif font-light"
          >
            aesthetics
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.7 }}
          >
            with flawless engineering.
          </motion.span>
        </h2>
        
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
