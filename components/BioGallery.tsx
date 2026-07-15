"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/data/projects";
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
    <div id="bio-gallery" className={`w-full ${isDrawerMode ? "h-[70vh]" : "h-screen"} bg-[#0a0f1c] relative flex justify-center overflow-hidden border-y-4 transition-all duration-500 ${activeProject.id === 'bio-lemony' ? 'border-sky-500/60 shadow-[0_0_30px_rgba(14,165,233,0.2)_inset]' : activeProject.id === 'bio-dinino' ? 'border-pink-500/60 shadow-[0_0_30px_rgba(236,72,153,0.2)_inset]' : 'border-fuchsia-500/60 shadow-[0_0_30px_rgba(217,70,239,0.2)_inset]'}`}>
      
      {/* Background Decor */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none mix-blend-screen" 
        style={{ ...getPattern(0), backgroundAttachment: "scroll" }}
      />
      
      <PixelCloud color="#4f46e5" className="absolute top-10 left-[10%] w-20 h-10 opacity-20 animate-pulse" />
      <PixelCloud color="#db2777" className="absolute top-[40%] left-[5%] w-16 h-8 opacity-20" />
      <PixelCloud color="#8b5cf6" className="absolute bottom-20 right-[5%] w-24 h-12 opacity-20 animate-pulse" />
      
      {/* Centered App Container */}
      <div className="w-full max-w-[1600px] h-full flex flex-col md:flex-row relative z-10">
        
        {/* LEFT: Character Select Grid */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          whileInView={{ opacity: 1, x: 0 }} 
          viewport={{ once: false, margin: "-50px" }} 
          transition={{ duration: 0.6, ease: "easeOut" }}
          className={`w-full md:w-80 lg:w-[400px] xl:w-[450px] p-6 md:p-8 lg:p-10 relative z-10 flex flex-col border-b-4 md:border-b-0 md:border-r-4 bg-[#0a0f1c]/90 backdrop-blur-md h-full overflow-hidden shrink-0 transition-all duration-500 ${activeProject.id === 'bio-lemony' ? 'border-sky-500/80 shadow-[4px_0_20px_rgba(14,165,233,0.3)]' : activeProject.id === 'bio-dinino' ? 'border-pink-500/80 shadow-[4px_0_20px_rgba(236,72,153,0.3)]' : 'border-fuchsia-500/80 shadow-[4px_0_20px_rgba(217,70,239,0.3)]'}`}
        >
        <div className="mb-6 shrink-0 relative">
          <PixelStar color="#818cf8" className="absolute -top-4 -right-2 w-6 h-6 animate-bounce" />
          <h3 className="font-[family-name:var(--font-pixel)] text-pink-400 text-sm tracking-[0.3em] uppercase mb-2 drop-shadow-[0_0_8px_rgba(244,114,182,0.6)]">
            - BIO SHOWCASE -
          </h3>
          <h2 className="font-[family-name:var(--font-pixel)] text-2xl text-white tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
            BIO PORTFOLIOS
          </h2>
          <p className="text-sky-200 font-medium text-xs mt-2 leading-relaxed">
            Explore bio websites we've crafted for our amazing clients.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto p-2 -m-2 pr-4 content-start [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-slate-900/50">
          {projects.map((project, idx) => {
            const isActive = idx === activeIndex;
            return (
              <button
                key={project.id}
                onClick={() => setActiveIndex(idx)}
                className={`relative group aspect-square rounded-xl border-4 transition-all duration-300 overflow-hidden flex flex-col items-center p-0
                  ${isActive 
                    ? (project.id === 'bio-lemony' ? 'border-sky-300 shadow-[0_0_25px_rgba(125,211,252,0.8)] scale-105 z-20' : 
                       project.id === 'bio-dinino' ? 'border-pink-300 shadow-[0_0_25px_rgba(249,168,212,0.8)] scale-105 z-20' : 
                       'border-indigo-400 shadow-[0_0_25px_rgba(99,102,241,0.8)] scale-105 z-20')
                    : (project.id === 'bio-lemony' ? 'border-sky-400/60 shadow-[0_0_8px_rgba(125,211,252,0.3)] hover:border-sky-300 hover:shadow-[0_0_15px_rgba(125,211,252,0.5)] hover:-translate-y-1' :
                       project.id === 'bio-dinino' ? 'border-pink-400/60 shadow-[0_0_8px_rgba(249,168,212,0.3)] hover:border-pink-300 hover:shadow-[0_0_15px_rgba(249,168,212,0.5)] hover:-translate-y-1' :
                       'border-indigo-500/60 shadow-[0_0_8px_rgba(99,102,241,0.3)] hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:-translate-y-1')
                  }`}
              >
                {/* Background Image */}
                {project.avatar ? (
                  <img src={project.avatar} alt={project.title} className={`absolute inset-0 w-full h-full object-cover z-0 transition-all duration-500 ${isActive ? 'opacity-100 scale-110' : 'opacity-70 group-hover:opacity-90 group-hover:scale-105'}`} />
                ) : (
                  <div className={`absolute inset-0 w-full h-full ${project.bgClass} opacity-80`} />
                )}
                
                {/* Dark Gradient Overlay for Text Readability */}
                <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-[#020617] via-[#020617]/70 to-transparent z-10 pointer-events-none" />
                
                {/* Active Inner Glow */}
                {isActive && (
                  <div className={`absolute inset-0 border-2 ${project.id === 'bio-lemony' ? 'border-sky-200/50' : 'border-pink-200/50'} rounded-lg z-10 pointer-events-none mix-blend-overlay`} />
                )}

                {/* Project Title */}
                <div className="relative z-20 mt-auto w-full p-2 pb-3 text-center">
                  <span className={`font-[family-name:var(--font-pixel)] text-[10px] sm:text-[11px] tracking-wider drop-shadow-md
                    ${isActive 
                      ? (project.id === 'bio-lemony' ? 'text-sky-200 font-bold' : project.id === 'bio-dinino' ? 'text-pink-200 font-bold' : 'text-indigo-200 font-bold') 
                      : 'text-slate-300 group-hover:text-white'}
                  `}>
                    {project.title}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </motion.div>

      {/* RIGHT: Live Preview Area */}
      <div className="flex-1 p-6 md:p-8 lg:p-12 relative z-10 flex items-center justify-center h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:bg-slate-700 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
        
        {/* Ambient Sparkles */}
        <PixelSparkle color="#818cf8" className="absolute top-10 left-10 w-6 h-6 opacity-30 animate-pulse" />
        <PixelSparkle color="#38bdf8" className="absolute bottom-20 right-10 w-8 h-8 opacity-20 animate-bounce" />

        <motion.div 
          initial="hidden" 
          whileInView="show" 
          viewport={{ once: false, margin: "-50px" }} 
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } }} 
          className="w-full max-w-5xl flex flex-col md:flex-row items-stretch justify-center gap-6 lg:gap-10 relative z-10 h-full"
        >
          
          {/* Left Column (Desktop Mockup + Meta Info) */}
          <div className="w-full md:w-3/5 flex flex-col gap-6 justify-between">
            
            {/* Desktop Mockup (Pixel Art Style) */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="relative w-full group">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-none blur opacity-10 group-hover:opacity-30 transition duration-1000" />
              <div className="relative bg-slate-900 border-8 border-indigo-500 rounded-xl shadow-[8px_8px_0_0_#312e81] flex flex-col group-hover:-translate-y-1 transition-transform duration-300">
                {/* Pixel Browser Bar */}
                <div className="h-6 bg-indigo-950 border-b-4 border-indigo-500 rounded-t flex items-center px-2 gap-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 border-2 border-indigo-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-yellow-500 border-2 border-indigo-500 rounded-full" />
                  <div className="w-2.5 h-2.5 bg-green-500 border-2 border-indigo-500 rounded-full" />
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
            </motion.div>

            {/* Project Meta Info */}
            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="relative group w-full flex-grow flex">
               <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-none blur opacity-5 group-hover:opacity-10 transition duration-1000" />
               <div className="relative bg-slate-900/90 border-4 border-purple-500 rounded-xl p-5 md:p-6 shadow-[6px_6px_0_0_#4c1d95] w-full flex flex-col justify-center overflow-hidden">
                  
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
                          <span key={tech} className="px-3 py-1.5 bg-indigo-950/40 border-2 border-indigo-500/50 rounded-md text-xs font-[family-name:var(--font-pixel)] text-indigo-200 shadow-[2px_2px_0_0_#312e81]">
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
            </motion.div>
          </div>

          {/* Right Column (Mobile Mockup) */}
          <motion.div variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } } }} className="w-full md:w-2/5 flex items-center justify-center group relative mt-6 md:mt-0">
             <div className={`relative bg-slate-900 border-[4px] md:border-[6px] ${activeProject.id === 'bio-lemony' ? 'border-sky-400 shadow-[0_0_25px_rgba(56,189,248,0.5)]' : activeProject.id === 'bio-dinino' ? 'border-pink-400 shadow-[0_0_25px_rgba(244,114,182,0.5)]' : 'border-fuchsia-500 shadow-[0_0_25px_rgba(217,70,239,0.5)]'} rounded-[2rem] aspect-[9/16] w-[75%] md:w-full max-w-[340px] xl:max-w-[360px] h-auto flex flex-col group-hover:-translate-y-2 transition-all duration-300`}>
                {/* Pixel Notch */}
                <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 md:h-5 ${activeProject.id === 'bio-lemony' ? 'bg-sky-400' : activeProject.id === 'bio-dinino' ? 'bg-pink-400' : 'bg-fuchsia-500'} rounded-b-xl z-50 flex justify-center items-center transition-colors duration-300`}>
                   <div className={`w-1/2 h-1.5 ${activeProject.id === 'bio-lemony' ? 'bg-sky-900' : activeProject.id === 'bio-dinino' ? 'bg-pink-900' : 'bg-fuchsia-900'} rounded-full transition-colors duration-300`}></div>
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
                      className="w-full h-full object-cover object-top z-10"
                      onError={(e) => {
                        e.currentTarget.style.opacity = '0';
                      }}
                    />
                  </AnimatePresence>
                </div>
             </div>
          </motion.div>
          
        </motion.div>
      </div>
      
      {/* End Centered App Container */}
      </div>
    </div>
  );
}
