"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import HorizontalScrollWrapper from "../HorizontalScrollWrapper";
import StoryContentBlock from "../StoryContentBlock";
import AestheticWindowFrame from "../AestheticWindowFrame";
import { PixelCloud, PixelStar, PixelSparkle } from "../PixelIcons";

export default function LemonyShopPro({ project }: { project: Project }) {
  return (
    <HorizontalScrollWrapper bgClass="bg-purple-100" buttonTextClass="text-purple-900">
      
      {/* Slide 1: Content Block (With Solid Card to prevent lag) */}
      <div className="w-full lg:w-[60vw] max-w-5xl flex-shrink-0 flex flex-col justify-center h-auto lg:h-full mr-0 lg:mr-24 relative px-0 lg:px-4">
        <div className="w-full bg-white border-4 border-purple-400 p-8 md:p-16 rounded-xl shadow-[8px_8px_0_0_#c084fc] relative overflow-hidden">
          {/* Aesthetic Faint Background */}
          <PixelCloud color="#c084fc" className="absolute -top-4 -right-12 w-48 h-24 opacity-10 pointer-events-none" />
          <PixelCloud color="#93c5fd" className="absolute bottom-4 -left-12 w-64 h-32 opacity-10 pointer-events-none" />
          <PixelStar color="#f472b6" className="absolute top-20 left-16 w-8 h-8 opacity-20 pointer-events-none" />
          <PixelSparkle color="#fef08a" className="absolute bottom-20 right-24 w-6 h-6 opacity-30 pointer-events-none" />
          
          <div className="relative z-10">
            <StoryContentBlock project={project} theme="pastel" />
          </div>
        </div>
      </div>

      {/* Slide 2: Large Mockup & Small Detail */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ amount: 0.3 }}
            className="w-full md:w-2/3 h-full"
          >
            <AestheticWindowFrame 
              title="dashboard.html" 
              imageSrc={project.gallery[0]} 
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ amount: 0.3 }}
            className="w-full md:w-1/3 h-full flex flex-col gap-6"
          >
            <div className="flex-1 rounded-xl overflow-hidden shadow-[8px_8px_0_0_#c084fc] border-4 border-purple-400 bg-white p-8 flex flex-col justify-center relative">
              {/* Aesthetic Faint Background */}
              <PixelCloud color="#c084fc" className="absolute -bottom-6 -right-6 w-32 h-16 opacity-10 pointer-events-none" />
              <PixelStar color="#93c5fd" className="absolute top-6 left-6 w-6 h-6 opacity-20 pointer-events-none" />
              
              <div className="relative z-10">
                <h4 className="text-xl font-[family-name:var(--font-pixel)] text-purple-700 mb-4 uppercase drop-shadow-sm">Admin Dashboard</h4>
                <p className="text-purple-900 text-sm leading-relaxed font-medium">
                  Rewrite โครงสร้างใหม่ด้วย Next.js และ TypeScript ดึงศักยภาพสูงสุดของ Server Components มาใช้ จัดการสินค้า โปรโมชันได้ Real-time
                </p>
              </div>
            </div>
            <div className="flex-1">
              <AestheticWindowFrame 
                title="mobile-view.png" 
                imageSrc={project.gallery[1]} 
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Slide 3: Two Column Layout */}
      <div className="w-full lg:w-[70vw] h-auto lg:h-full flex-shrink-0 flex items-center justify-center mr-0 lg:mr-24 px-0 lg:px-4">
        <div className="w-full h-[70vh] flex flex-col md:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ amount: 0.3 }}
            className="w-full md:w-1/2 h-full"
          >
            <AestheticWindowFrame 
              title="features.png" 
              imageSrc={project.gallery[2]} 
            />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ amount: 0.3 }}
            className="w-full md:w-1/2 h-full"
          >
            <AestheticWindowFrame 
              title="architecture.png" 
              imageSrc={project.gallery[3]} 
            />
          </motion.div>
        </div>
      </div>

    </HorizontalScrollWrapper>
  );
}
