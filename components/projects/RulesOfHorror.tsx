"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";
import HorrorWindowFrame from "../HorrorWindowFrame";
import { PixelCloud, PixelStar, PixelSparkle } from "../PixelIcons";

export default function RulesOfHorror({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-[#4a0d0d]" buttonTextClass="text-red-500">
      
      {/* Slide 1: Content Block (With Bloody Dark Card) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-[#200909] border-4 border-[#4a0d0d] p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#1a0505] relative overflow-hidden">
          {/* Aesthetic Faint Horror Background */}
          <PixelCloud color="#4a0d0d" className="absolute -top-4 -right-12 w-48 h-24 opacity-30 pointer-events-none" />
          <PixelCloud color="#3f0b0b" className="absolute bottom-4 -left-12 w-64 h-32 opacity-40 pointer-events-none" />
          <PixelStar color="#dc2626" className="absolute top-20 left-16 w-8 h-8 opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <StoryContentBlock project={project} theme="horror" />
          </div>
        </div>
      </div>

      {/* Slide 2: Full Bleed Image with Overlay Text */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 1.5, ease: "easeOut" }} 
          viewport={{ amount: 0.3 }}
          className="w-full h-[70vh]"
        >
          <HorrorWindowFrame 
            title="survival.exe" 
            imageSrc={project.gallery[0]} 
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-12 md:p-20">
              <motion.h4 
                initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                className="text-4xl md:text-5xl font-black text-red-600 drop-shadow-[3px_3px_0_#4a0d0d] tracking-widest uppercase mb-4 font-[family-name:var(--font-pixel)]"
              >
                Survive the Night
              </motion.h4>
              <motion.p 
                initial={{ opacity: 0, y: 30, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.8, delay: 0.7 }}
                className="text-red-200/90 text-lg md:text-xl max-w-2xl font-bold bg-[#200909] p-4 rounded-md border-2 border-red-950"
              >
                ระบบ Rule-based Survival ที่ผู้เล่นจะต้องทำตามกฎหมายถึงความตาย 
                ถูกพัฒนาอย่างละเอียดเพื่อสร้างบรรยากาศกดดันและหลอนแบบสุดขีด
              </motion.p>
            </div>
          </HorrorWindowFrame>
        </motion.div>
      </div>

      {/* Slide 3: Staggered Image Grid */}
      <div className="w-full lg:w-[90vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex gap-4 md:gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: -50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} viewport={{ amount: 0.3 }}
            className="w-1/3 h-[60%]"
          >
            <HorrorWindowFrame 
              title="map_1.png" 
              imageSrc={project.gallery[1]} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.2 }} viewport={{ amount: 0.3 }}
            className="w-1/3 h-[80%]"
          >
            <HorrorWindowFrame 
              title="entity_01.png" 
              imageSrc={project.gallery[2]} 
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.4 }} viewport={{ amount: 0.3 }}
            className="w-1/3 h-[50%]"
          >
            <HorrorWindowFrame 
              title="evidence.jpg" 
              imageSrc={project.gallery[3]} 
            />
          </motion.div>

        </div>
      </div>

    </HorizontalScrollWrapper>
  );
}
