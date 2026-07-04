"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { useState } from "react";
import { ExternalLink, Code, FileText } from "lucide-react";
import { PixelStar, PixelSparkle } from "./PixelIcons";

interface StoryContentBlockProps {
  project: Project;
  theme?: "light" | "dark" | "gray" | "horror" | "pastel" | "yellowLofi";
}

export default function StoryContentBlock({ project, theme = "light" }: StoryContentBlockProps) {
  const themeStyles = {
    light: {
      title: "text-slate-900 drop-shadow-[2px_2px_0_#cbd5e1] font-[family-name:var(--font-pixel)]",
      desc: "text-slate-700",
      tag: "bg-white text-slate-800 border-2 border-slate-800 shadow-[2px_2px_0_0_#1e293b] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-slate-900 hover:bg-slate-800 border-4 border-slate-800 text-white shadow-[4px_4px_0_0_#1e293b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-white hover:bg-slate-50 border-4 border-slate-800 text-slate-900 shadow-[4px_4px_0_0_#1e293b] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    },
    dark: {
      title: "text-white drop-shadow-[2px_2px_0_#334155] font-[family-name:var(--font-pixel)]",
      desc: "text-slate-300",
      tag: "bg-slate-800 text-white border-2 border-slate-950 shadow-[2px_2px_0_0_#020617] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-white hover:bg-slate-200 border-4 border-slate-950 text-slate-900 shadow-[4px_4px_0_0_#020617] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-slate-900 hover:bg-slate-800 border-4 border-slate-950 text-white shadow-[4px_4px_0_0_#020617] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    },
    gray: {
      title: "text-slate-100 drop-shadow-[2px_2px_0_#334155] font-[family-name:var(--font-pixel)]",
      desc: "text-slate-400",
      tag: "bg-slate-800 text-slate-200 border-2 border-slate-950 shadow-[2px_2px_0_0_#020617] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-slate-200 hover:bg-white border-4 border-slate-950 text-slate-900 shadow-[4px_4px_0_0_#020617] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-slate-800 hover:bg-slate-700 border-4 border-slate-950 text-slate-100 shadow-[4px_4px_0_0_#020617] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    },
    horror: {
      title: "text-red-600 drop-shadow-[3px_3px_0_#4a0d0d] font-[family-name:var(--font-pixel)] tracking-widest",
      desc: "text-red-200/80 font-medium",
      tag: "bg-[#4a0d0d] text-red-300 border-2 border-[#200909] shadow-[2px_2px_0_0_#200909] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-red-900 hover:bg-red-800 border-4 border-[#200909] text-white shadow-[4px_4px_0_0_#200909] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-[#200909] hover:bg-[#330f0f] border-4 border-red-950 text-red-500 shadow-[4px_4px_0_0_#4a0d0d] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    },
    pastel: {
      title: "text-indigo-900 drop-shadow-[2px_2px_0_#c4b5fd] font-[family-name:var(--font-pixel)]",
      desc: "text-indigo-900/80 font-medium",
      tag: "bg-indigo-50 text-indigo-800 border-2 border-indigo-200 shadow-[2px_2px_0_0_#a5b4fc] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-indigo-500 hover:bg-indigo-400 border-4 border-indigo-900 text-white shadow-[4px_4px_0_0_#312e81] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-slate-50 hover:bg-indigo-50 border-4 border-indigo-300 text-indigo-700 shadow-[4px_4px_0_0_#818cf8] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    },
    yellowLofi: {
      title: "text-amber-900 drop-shadow-[2px_2px_0_#fde68a] font-[family-name:var(--font-pixel)]",
      desc: "text-amber-900/80 font-medium",
      tag: "bg-amber-100 text-amber-900 border-2 border-amber-300 shadow-[2px_2px_0_0_#fcd34d] font-[family-name:var(--font-pixel)] text-xs uppercase",
      btnBg: "bg-amber-500 hover:bg-amber-400 border-4 border-amber-900 text-white shadow-[4px_4px_0_0_#78350f] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
      btnOutline: "bg-orange-50 hover:bg-amber-50 border-4 border-amber-300 text-amber-700 shadow-[4px_4px_0_0_#fbbf24] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none font-[family-name:var(--font-pixel)] uppercase",
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;


  return (
    <div className="flex flex-col max-w-xl">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: false }}>
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 ${currentTheme.title}`}>
          {project.title}
        </h3>
        <p className={`text-lg md:text-xl leading-relaxed mb-8 ${currentTheme.desc}`}>
          {project.description}
        </p>
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: false }} 
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.3 } }
        }}
        className="flex flex-wrap gap-3 mb-12"
      >
        {project.stack.map((tech) => (
          <motion.span 
            variants={{ hidden: { opacity: 0, scale: 0.8 }, show: { opacity: 1, scale: 1 } }}
            key={tech} 
            className={`px-3 py-1.5 border ${currentTheme.tag}`}
          >
            {tech}
          </motion.span>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: false }} className="flex flex-wrap items-center gap-4 relative">
        <div className="absolute -top-10 -left-6 animate-sparkle-1 hidden md:block opacity-80" style={{ filter: 'drop-shadow(2px 2px 0 #ca8a04)' }}>
          <PixelSparkle color="#facc15" className="w-8 h-8" />
        </div>
        
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnBg}`}>
            <ExternalLink size={18} className="relative z-20 group-hover:rotate-12 transition-transform" /> 
            <span className="relative z-20">Live Demo</span>
            <div className="absolute top-0 bottom-0 w-12 bg-white/40 blur-[4px] -skew-x-12 -translate-x-[150%] animate-sweep-loop z-10 pointer-events-none" />
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnOutline}`}>
            <Code size={18} className="relative z-20 group-hover:-rotate-12 transition-transform" /> 
            <span className="relative z-20">Source Code</span>
            <div className="absolute top-0 bottom-0 w-12 bg-white/40 blur-[4px] -skew-x-12 -translate-x-[150%] animate-sweep-loop z-10 pointer-events-none" />
          </a>
        )}
        {project.links.document && (
          <a href={project.links.document} target="_blank" rel="noreferrer" className={`group relative overflow-hidden flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnOutline}`}>
            <FileText size={18} className="relative z-20 group-hover:-rotate-12 transition-transform" /> 
            <span className="relative z-20">Case Study</span>
            <div className="absolute top-0 bottom-0 w-12 bg-white/40 blur-[4px] -skew-x-12 -translate-x-[150%] animate-sweep-loop z-10 pointer-events-none" />
          </a>
        )}
        <div className="absolute -bottom-8 -right-6 animate-sparkle-2 hidden md:block opacity-80" style={{ filter: 'drop-shadow(2px 2px 0 #db2777)' }}>
          <PixelStar color="#f472b6" className="w-8 h-8" />
        </div>
      </motion.div>
    </div>
  );
}
