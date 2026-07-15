"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/lib/portfolioData";
import { PixelStar, PixelSparkle, PixelCloud, PixelHeart } from "./PixelIcons";
import { getPattern } from "@/lib/patterns";

interface BioGalleryProps {
  projects: Project[];
  isDrawerMode?: boolean;
}

export default function BioGallery({ projects, isDrawerMode }: BioGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!projects || projects.length === 0) return null;

  const activeProject = projects[activeIndex];

  return (
    <div className={`w-full ${isDrawerMode ? "h-[70vh]" : "h-screen"} bg-slate-900 relative flex justify-center overflow-hidden border-y-8 border-slate-950`}>
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
        style={{ ...getPattern(0), backgroundAttachment: "scroll" }}
      />
      
      <PixelCloud color="#1e293b" className="absolute top-10 left-[10%] w-20 h-10 opacity-50 animate-pulse" />
      <PixelCloud color="#0f172a" className="absolute top-[40%] left-[5%] w-16 h-8 opacity-40" />
      <PixelCloud color="#1e293b" className="absolute bottom-20 right-[5%] w-24 h-12 opacity-60 animate-pulse" />
      
      {/* Centered App Container */}
      <div className="w-full max-w-[1600px] h-full flex flex-col md:flex-row relative z-10">
        
        {/* LEFT: Character Select Grid */}
        <div className="w-full md:w-80 lg:w-[400px] xl:w-[450px] p-6 md:p-8 lg:p-10 relative z-10 flex flex-col border-b-4 md:border-b-0 md:border-r-8 border-slate-950 bg-slate-900/80 backdrop-blur-md shadow-[8px_0_0_0_rgba(2,6,23,0.3)] h-full overflow-hidden shrink-0">
        <div className="mb-6 shrink-0 relative">
          <PixelStar color="#818cf8" className="absolute -top-4 -right-2 w-6 h-6 animate-bounce" />
          <h3 className="font-[family-name:var(--font-pixel)] text-indigo-400 text-sm tracking-[0.3em] uppercase mb-2">
            - BIO SHOWCASE -
          </h3>
          <h2 className="font-[family-name:var(--font-pixel)] text-2xl text-white tracking-widest uppercase drop-shadow-[2px_2px_0_#020617]">
            BIO PORTFOLIOS
          </h2>
          <p className="text-slate-400 font-medium text-xs mt-2 leading-relaxed">
            Explore bio websites we've crafted for our amazing clients.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto p-2 -m-2 pr-4 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-900/50">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative group min-h-[110px] h-auto py-3 rounded-xl border-4 transition-all duration-300 overflow-hidden flex flex-col items-center justify-center px-2
                  ${isActive 
                    ? `border-indigo-400 bg-slate-800 shadow-[0_0_15px_rgba(129,140,248,0.3)] scale-105 z-20` 
                    : `border-slate-800 bg-slate-900/50 hover:border-slate-700 hover:bg-slate-800 hover:-translate-y-1`
                  }`}
              >
                
                <div className={`w-10 h-10 rounded-full mb-2 shadow-[0_4px_10px_rgba(0,0,0,0.5)] border-2 border-slate-700 ${project.bgClass} flex items-center justify-center overflow-hidden relative z-10`}>
                   {project.avatar ? (
                     <img src={project.avatar} alt={project.title} className="w-full h-full object-cover" />
                   ) : (
                     <div className="w-full h-full bg-black/20 flex flex-col items-center justify-end p-1">
                       <div className="w-1/2 h-1/2 bg-white/40 rounded-t-sm" />
                     </div>
                   )}
                   {isActive && <PixelStar color="#ffffff" className="absolute inset-0 m-auto w-5 h-5 animate-pulse drop-shadow-md" />}
                </div>
                
                <span className={`relative z-10 font-[family-name:var(--font-pixel)] text-[9px] text-center tracking-wider px-1
                  ${isActive ? "text-indigo-200 font-bold" : "text-slate-400 group-hover:text-slate-300"}
                `}>
                  {project.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RIGHT: Live Preview Area */}
      <div className="flex-1 p-6 md:p-8 lg:p-12 relative z-10 flex items-center justify-center h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        
        {/* Ambient Sparkles */}
        <PixelSparkle color="#818cf8" className="absolute top-10 left-10 w-6 h-6 opacity-30 animate-pulse" />
        <PixelSparkle color="#38bdf8" className="absolute bottom-20 right-10 w-8 h-8 opacity-20 animate-bounce" />

        <div className="w-full max-w-5xl flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-10 relative z-10 h-full">
          
          {/* Left Column (Desktop Mockup + Meta Info) */}
          <div className="w-full md:w-3/5 flex flex-col gap-6 justify-between">
            
            {/* Desktop Mockup (Pixel Art Style) */}
            <div className="relative w-full group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-none blur opacity-10 group-hover:opacity-30 transition duration-1000" />
              <div className="relative bg-slate-900 border-8 border-slate-950 rounded-xl shadow-[6px_6px_0_0_rgba(2,6,23,0.8)] flex flex-col group-hover:-translate-y-1 transition-transform duration-300">
                {/* Pixel Browser Bar */}
                <div className="h-6 bg-slate-800 border-b-4 border-slate-950 rounded-t flex items-center px-2 gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 border-2 border-slate-950 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-500 border-2 border-slate-950 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-500 border-2 border-slate-950 rounded-full" />
                </div>
                {/* Desktop Screen Content */}
                <div className="aspect-video bg-slate-950 rounded-b relative overflow-hidden flex items-center justify-center">
                  {/* Fallback Placeholder (Always behind image) */}
                  <div className={`absolute inset-0 ${activeProject.bgClass} opacity-30 flex items-center justify-center -z-10`}>
                     <div className="font-[family-name:var(--font-pixel)] text-slate-300 text-xs drop-shadow-[1px_1px_0_#000]">[ DESKTOP PREVIEW ]</div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`desktop-${activeProject.id}`}
                      src={activeProject.gallery[0]}
                      alt={activeProject.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-auto min-h-full object-cover object-top z-10"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* Project Meta Info */}
            <div className="relative group w-full flex-grow flex">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-none blur opacity-5 group-hover:opacity-10 transition duration-1000" />
               <div className="relative bg-slate-900 border-4 border-slate-950 rounded-xl p-5 md:p-6 shadow-[6px_6px_0_0_rgba(2,6,23,0.8)] w-full flex flex-col justify-center overflow-hidden">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`meta-${activeProject.id}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-[family-name:var(--font-pixel)] text-xl md:text-2xl text-white tracking-wider mb-3 drop-shadow-md">
                        {activeProject.title}
                      </h3>
                      <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-5 md:mb-6">
                        {activeProject.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mb-6">
                        {activeProject.stack.map(tech => (
                          <span key={tech} className="px-3 py-1.5 bg-slate-800 border-2 border-slate-700 rounded-md text-xs font-[family-name:var(--font-pixel)] text-slate-300 shadow-[2px_2px_0_0_rgba(2,6,23,0.5)]">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      {activeProject.links?.demo && (
                        <a 
                          href={activeProject.links.demo} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-indigo-500 hover:bg-indigo-400 text-white border-2 border-indigo-700 hover:border-indigo-300 rounded-lg font-bold text-sm transition-colors shadow-[2px_2px_0_0_#312e81] hover:shadow-[4px_4px_0_0_#312e81] hover:-translate-y-0.5 active:translate-y-0 active:shadow-none max-w-max"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                          </svg>
                          VISIT LIVE SITE
                        </a>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
            </div>
          </div>

          {/* Right Column (Mobile Mockup) */}
          <div className="w-full md:w-2/5 flex items-center justify-center group relative mt-6 md:mt-0">
             <div className="relative bg-slate-900 border-[8px] md:border-[12px] border-slate-950 rounded-[2rem] shadow-[8px_8px_0_0_rgba(2,6,23,0.8)] aspect-[9/19] w-[60%] md:w-full max-w-[280px] h-auto flex flex-col group-hover:-translate-y-2 transition-transform duration-300">
                {/* Pixel Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-5 bg-slate-950 rounded-b-xl z-10 flex justify-center items-center">
                   <div className="w-1/2 h-1.5 bg-slate-800 rounded-full"></div>
                </div>
                {/* Mobile Screen Content */}
                <div className="flex-1 bg-slate-950 rounded-[1.5rem] relative overflow-hidden flex items-center justify-center">
                  {/* Fallback Placeholder (Always behind image) */}
                  <div className={`absolute inset-0 ${activeProject.bgClass} opacity-30 flex items-center justify-center -z-10`}>
                     <div className="font-[family-name:var(--font-pixel)] text-slate-300 text-[10px] text-center px-4 drop-shadow-[1px_1px_0_#000]">[ MOBILE<br/>PREVIEW ]</div>
                  </div>
                  
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={`mobile-${activeProject.id}`}
                      src={activeProject.gallery[1]}
                      alt={activeProject.title}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-full h-auto min-h-full object-cover object-top z-10"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  </AnimatePresence>
                </div>
             </div>
          </div>
          
        </div>
      </div>
      
      {/* End Centered App Container */}
      </div>
    </div>
  );
}
