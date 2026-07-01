"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";

export default function LemonyShopPro({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-neutral-950" buttonTextClass="text-white">
      
      {/* Slide 1: Content Block (With Solid Card to prevent lag) */}
      <div className="w-[80vw] md:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-full mr-12 md:mr-24 relative px-4">
        <div className="w-full bg-[#151515] border border-white/5 p-8 md:p-16 rounded-[2.5rem] shadow-2xl relative">
          <StoryContentBlock project={project} theme="dark" />
        </div>
      </div>

      {/* Slide 2: Large Mockup & Small Detail */}
      <div className="w-[85vw] md:w-[70vw] h-full flex-shrink-0 flex items-center justify-center mr-12 md:mr-24 px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-2/3 h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={project.gallery[0]} alt="Dashboard" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/3 h-full flex flex-col gap-6"
          >
            <div className="flex-1 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10 bg-neutral-900/50 p-8 flex flex-col justify-center">
              <h4 className="text-2xl font-bold text-white mb-4">Admin Dashboard</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Rewrite โครงสร้างใหม่ด้วย Next.js และ TypeScript ดึงศักยภาพสูงสุดของ Server Components มาใช้ จัดการสินค้า โปรโมชันได้ Real-time
              </p>
            </div>
            <div className="flex-1 rounded-[2rem] overflow-hidden shadow-2xl border border-white/10">
              <img src={project.gallery[1]} alt="Mobile View" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide 3: Two Column Layout */}
      <div className="w-[85vw] md:w-[70vw] h-full flex-shrink-0 flex items-center justify-center mr-12 md:mr-24 px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={project.gallery[2]} alt="Features" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 h-full rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={project.gallery[3]} alt="UI Detail" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

    </HorizontalScrollWrapper>
  );
}
