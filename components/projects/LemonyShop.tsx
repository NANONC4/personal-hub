"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";

export default function LemonyShop({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-neutral-50" buttonTextClass="text-neutral-900">
      
      {/* Slide 1: Content Block (With Light Solid Card) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-white p-8 md:p-16 rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-neutral-100 relative">
          <StoryContentBlock project={project} theme="light" />
        </div>
      </div>

      {/* Slide 2: 3-Column Phone Mockup Style */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-white"
          >
            <img src={project.gallery[0]} alt="Mobile 1" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-white"
          >
            <img src={project.gallery[1]} alt="Mobile 2" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-[2rem] overflow-hidden shadow-2xl border border-neutral-200 bg-white"
          >
            <img src={project.gallery[2]} alt="Mobile 3" className="w-full h-full object-cover" />
          </motion.div>
          
        </div>
      </div>

      {/* Slide 3: Big Feature Highlight */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex flex-col justify-center mr-0 lg:mr-24 px-0 lg:px-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-[70vh] rounded-[2.5rem] bg-gradient-to-br from-[#b5cddf] to-[#a3bcd0] p-12 md:p-20 flex flex-col justify-between shadow-2xl"
          >
            <div className="max-w-xl">
              <h3 className="text-4xl md:text-6xl font-black text-sky-950 tracking-tighter mb-6">
                FAST & SECURE
              </h3>
              <p className="text-lg md:text-xl text-sky-900/80 font-medium leading-relaxed">
                ระบบจัดการคำสั่งซื้อแบบ Real-time ด้วย Firebase และตรวจสอบสลิปอัตโนมัติ 
                ลดภาระแอดมินและตัดปัญหาการโกงได้ 100%
              </p>
            </div>
            
            <div className="flex gap-4">
               <span className="px-6 py-3 rounded-full bg-white/50 text-sky-900 font-bold text-sm backdrop-blur-sm">Firebase</span>
               <span className="px-6 py-3 rounded-full bg-white/50 text-sky-900 font-bold text-sm backdrop-blur-sm">Cloud Functions</span>
            </div>
         </motion.div>
      </div>

    </HorizontalScrollWrapper>
  );
}
