"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";

export default function LemonyShopPro({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-neutral-950" buttonTextClass="text-white">
      
      {/* Slide 1: Content Block (With Solid Card to prevent lag) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-[#151515] border-4 border-slate-900 p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#020617] relative">
          <StoryContentBlock project={project} theme="dark" />
        </div>
      </div>

      {/* Slide 2: Large Mockup & Small Detail */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-2/3 h-full rounded-xl overflow-hidden shadow-[8px_8px_0_0_#020617] border-4 border-slate-900"
          >
            <img src={project.gallery[0]} alt="Dashboard" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/3 h-full flex flex-col gap-6"
          >
            <div className="flex-1 rounded-xl overflow-hidden shadow-[8px_8px_0_0_#020617] border-4 border-slate-900 bg-neutral-900 p-8 flex flex-col justify-center">
              <h4 className="text-xl font-[family-name:var(--font-pixel)] text-white mb-4 uppercase drop-shadow-md">Admin Dashboard</h4>
              <p className="text-neutral-400 text-sm leading-relaxed">
                Rewrite โครงสร้างใหม่ด้วย Next.js และ TypeScript ดึงศักยภาพสูงสุดของ Server Components มาใช้ จัดการสินค้า โปรโมชันได้ Real-time
              </p>
            </div>
            <div className="flex-1 rounded-xl overflow-hidden shadow-[8px_8px_0_0_#020617] border-4 border-slate-900">
              <img src={project.gallery[1]} alt="Mobile View" className="w-full h-full object-cover" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide 3: Two Column Layout */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 h-full rounded-xl overflow-hidden shadow-[8px_8px_0_0_#020617] border-4 border-slate-900"
          >
            <img src={project.gallery[2]} alt="Features" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full md:w-1/2 h-full rounded-xl overflow-hidden shadow-[8px_8px_0_0_#020617] border-4 border-slate-900"
          >
            <img src={project.gallery[3]} alt="UI Detail" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>

    </HorizontalScrollWrapper>
  );
}
