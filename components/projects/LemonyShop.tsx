"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";
import SunsetWindowFrame from "../SunsetWindowFrame";
import { PixelCloud, PixelSparkle } from "../PixelIcons";

export default function LemonyShop({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-amber-50" buttonTextClass="text-amber-900">
      
      {/* Slide 1: Content Block (With Light Solid Card) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-white border-4 border-amber-500 p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#d97706] relative overflow-hidden">
          {/* Aesthetic Faint Background */}
          <PixelCloud color="#fbbf24" className="absolute -top-4 -right-12 w-48 h-24 opacity-10 pointer-events-none" />
          <PixelCloud color="#fcd34d" className="absolute bottom-4 -left-12 w-64 h-32 opacity-10 pointer-events-none" />
          <PixelSparkle color="#f59e0b" className="absolute top-20 left-16 w-8 h-8 opacity-20 pointer-events-none" />
          
          <div className="relative z-10">
            <StoryContentBlock project={project} theme="yellowLofi" />
          </div>
        </div>
      </div>

      {/* Slide 2: 3-Column Phone Mockup Style */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ amount: 0.3 }}
            className="w-full h-full"
          >
            <SunsetWindowFrame 
              title="mobile-1.png" 
              imageSrc={project.gallery[0]} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: -40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ amount: 0.3 }}
            className="w-full h-full"
          >
            <SunsetWindowFrame 
              title="mobile-2.png" 
              imageSrc={project.gallery[1]} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ amount: 0.3 }}
            className="w-full h-full"
          >
            <SunsetWindowFrame 
              title="mobile-3.png" 
              imageSrc={project.gallery[2]} 
            />
          </motion.div>
          
        </div>
      </div>

      {/* Slide 3: Big Feature Highlight */}
      <div className="w-full lg:w-[80vw] h-auto lg:h-full flex-shrink-0 flex flex-col justify-center mr-0 lg:mr-24 px-0 lg:px-4">
         <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ amount: 0.3 }}
            className="w-full h-[70vh] rounded-xl border-4 border-amber-500 bg-gradient-to-br from-amber-100 to-orange-100 p-12 md:p-20 flex flex-col justify-between shadow-[8px_8px_0_0_#d97706] overflow-hidden relative"
          >
            {/* Aesthetic Faint Background */}
            <PixelCloud color="#f59e0b" className="absolute -top-10 -right-10 w-64 h-32 opacity-10 pointer-events-none" />
            <PixelCloud color="#fbbf24" className="absolute -bottom-10 -left-10 w-48 h-24 opacity-10 pointer-events-none" />
            
            <div className="max-w-xl relative z-10">
              <h3 className="text-4xl md:text-5xl font-black text-amber-900 tracking-tighter mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-[2px_2px_0_#fff]">
                FAST & SECURE
              </h3>
              <p className="text-lg md:text-xl text-amber-900 font-bold leading-relaxed bg-white/70 p-4 rounded-md border-2 border-amber-400 shadow-[4px_4px_0_0_#d97706]">
                ระบบจัดการคำสั่งซื้อแบบ Real-time ด้วย Firebase และตรวจสอบสลิปอัตโนมัติ 
                ลดภาระแอดมินและตัดปัญหาการโกงได้ 100%
              </p>
            </div>
            
            <div className="flex gap-4 relative z-10 flex-wrap">
               <span className="px-6 py-3 border-2 border-amber-500 bg-white text-amber-800 font-[family-name:var(--font-pixel)] text-sm shadow-[4px_4px_0_0_#d97706]">FIREBASE</span>
               <span className="px-6 py-3 border-2 border-amber-500 bg-white text-amber-800 font-[family-name:var(--font-pixel)] text-sm shadow-[4px_4px_0_0_#d97706]">CLOUD FUNCTIONS</span>
            </div>
         </motion.div>
      </div>

    </HorizontalScrollWrapper>
  );
}
