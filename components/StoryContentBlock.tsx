"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink, Code, FileText } from "lucide-react";

interface StoryContentBlockProps {
  project: Project;
  theme?: "light" | "dark" | "gray" | "horror";
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
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div className="flex flex-col max-w-xl">
      <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
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
        viewport={{ once: true }} 
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

      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.5 }} viewport={{ once: true }} className="flex flex-wrap items-center gap-4">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnBg}`}>
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnOutline}`}>
            <Code size={18} /> Source Code
          </a>
        )}
        {project.links.document && (
          <a href={project.links.document} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold transition-all ${currentTheme.btnOutline}`}>
            <FileText size={18} /> Case Study
          </a>
        )}
      </motion.div>
    </div>
  );
}
