"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";

export default function RulesOfHorror({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-[#4a0d0d]" buttonTextClass="text-red-500">
      
      {/* Slide 1: Content Block (With Bloody Dark Card) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-[#200909] border-4 border-[#4a0d0d] p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#1a0505] relative">
          {/* Subtle noise or texture could go here */}
          <StoryContentBlock project={project} theme="horror" />
        </div>
      </div>

      {/* Slide 2: Full Bleed Image with Overlay Text */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          viewport={{ once: true, amount: 0.3 }}
          className="w-full h-[70vh] rounded-xl overflow-hidden shadow-[8px_8px_0_0_#1a0505] relative border-4 border-[#4a0d0d] group"
        >
          <img src={project.gallery[0]} alt="Horror Scene 1" className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-[2s]" style={{ imageRendering: 'pixelated' }} />
          
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-12 md:p-20">
            <motion.h4 
              initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
              className="text-4xl md:text-5xl font-black text-red-600 drop-shadow-[3px_3px_0_#4a0d0d] tracking-widest uppercase mb-4 font-[family-name:var(--font-pixel)]"
            >
              Survive the Night
            </motion.h4>
            <motion.p 
              initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
              className="text-red-200/90 text-lg md:text-xl max-w-2xl font-bold bg-[#200909]/80 p-4 rounded-md border-2 border-red-950 backdrop-blur-sm"
            >
              ระบบ Rule-based Survival ที่ผู้เล่นจะต้องทำตามกฎหมายถึงความตาย 
              ถูกพัฒนาอย่างละเอียดเพื่อสร้างบรรยากาศกดดันและหลอนแบบสุดขีด
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Slide 3: Staggered Image Grid */}
      <div className="w-full lg:w-[90vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex gap-4 md:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ once: true, amount: 0.3 }}
            className="w-1/3 h-[60%] rounded-xl overflow-hidden shadow-[8px_8px_0_0_#1a0505] border-4 border-[#4a0d0d]"
          >
            <img src={project.gallery[1]} alt="Gameplay 1" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-700" style={{ imageRendering: 'pixelated' }} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true, amount: 0.3 }}
            className="w-1/3 h-[90%] rounded-xl overflow-hidden shadow-[8px_8px_0_0_#1a0505] border-4 border-[#4a0d0d] relative z-10"
          >
            <img src={project.gallery[2]} alt="Gameplay 2" className="w-full h-full object-cover" style={{ imageRendering: 'pixelated' }} />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.6 }} viewport={{ once: true, amount: 0.3 }}
            className="w-1/3 h-[60%] rounded-xl overflow-hidden shadow-[8px_8px_0_0_#1a0505] border-4 border-[#4a0d0d]"
          >
            <img src={project.gallery[3]} alt="Gameplay 3" className="w-full h-full object-cover opacity-70 hover:opacity-100 transition-all duration-700" style={{ imageRendering: 'pixelated' }} />
          </motion.div>

        </div>
      </div>

    </HorizontalScrollWrapper>
  );
}
