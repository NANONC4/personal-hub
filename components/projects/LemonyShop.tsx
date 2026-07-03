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
        <div className="w-full bg-white border-4 border-slate-800 p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#1e293b] relative">
          <StoryContentBlock project={project} theme="light" />
        </div>
      </div>

      {/* Slide 2: 3-Column Phone Mockup Style */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-xl overflow-hidden shadow-[6px_6px_0_0_#1e293b] border-4 border-slate-800 bg-white"
          >
            <img src={project.gallery[0]} alt="Mobile 1" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-xl overflow-hidden shadow-[6px_6px_0_0_#1e293b] border-4 border-slate-800 bg-white"
          >
            <img src={project.gallery[1]} alt="Mobile 2" className="w-full h-full object-cover" />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-full rounded-xl overflow-hidden shadow-[6px_6px_0_0_#1e293b] border-4 border-slate-800 bg-white"
          >
            <img src={project.gallery[2]} alt="Mobile 3" className="w-full h-full object-cover" />
          </motion.div>
          
        </div>
      </div>

      {/* Slide 3: Big Feature Highlight */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex flex-col justify-center mr-0 lg:mr-24 px-0 lg:px-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true, amount: 0.3 }}
            className="w-full h-[70vh] rounded-xl border-4 border-slate-800 bg-gradient-to-br from-[#b5cddf] to-[#a3bcd0] p-12 md:p-20 flex flex-col justify-between shadow-[8px_8px_0_0_#1e293b]"
          >
            <div className="max-w-xl">
              <h3 className="text-4xl md:text-5xl font-black text-slate-800 tracking-tighter mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-[2px_2px_0_#fff]">
                FAST & SECURE
              </h3>
              <p className="text-lg md:text-xl text-slate-800 font-bold leading-relaxed bg-white/70 p-4 rounded-md border-2 border-slate-800 shadow-[4px_4px_0_0_#1e293b]">
                ระบบจัดการคำสั่งซื้อแบบ Real-time ด้วย Firebase และตรวจสอบสลิปอัตโนมัติ 
                ลดภาระแอดมินและตัดปัญหาการโกงได้ 100%
              </p>
            </div>
            
            <div className="flex gap-4">
               <span className="px-6 py-3 border-2 border-slate-800 bg-white text-slate-800 font-[family-name:var(--font-pixel)] text-sm shadow-[4px_4px_0_0_#1e293b]">FIREBASE</span>
               <span className="px-6 py-3 border-2 border-slate-800 bg-white text-slate-800 font-[family-name:var(--font-pixel)] text-sm shadow-[4px_4px_0_0_#1e293b]">CLOUD FUNCTIONS</span>
            </div>
         </motion.div>
      </div>

    </HorizontalScrollWrapper>
  );
}
