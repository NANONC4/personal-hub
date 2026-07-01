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
      title: "text-neutral-900",
      desc: "text-neutral-600",
      tag: "bg-neutral-100 text-neutral-600 border-neutral-200",
      btnBg: "bg-neutral-900 hover:bg-neutral-800 border-neutral-800 text-white",
      btnOutline: "bg-transparent hover:bg-neutral-100 border-neutral-300 text-neutral-900",
    },
    dark: {
      title: "text-white",
      desc: "text-neutral-400",
      tag: "bg-neutral-800/50 text-neutral-300 border-neutral-700",
      btnBg: "bg-white hover:bg-neutral-200 border-white text-neutral-950",
      btnOutline: "bg-transparent hover:bg-neutral-800 border-neutral-700 text-white",
    },
    gray: {
      title: "text-neutral-100",
      desc: "text-neutral-400",
      tag: "bg-neutral-800 text-neutral-300 border-neutral-700",
      btnBg: "bg-neutral-100 hover:bg-white border-neutral-200 text-neutral-900",
      btnOutline: "bg-transparent hover:bg-neutral-800 border-neutral-600 text-neutral-100",
    },
    horror: {
      title: "text-red-600 drop-shadow-[0_0_15px_rgba(220,38,38,0.4)] tracking-widest",
      desc: "text-red-100/70",
      tag: "bg-red-950 text-red-300 border-red-900/50",
      btnBg: "bg-red-700 hover:bg-red-600 border-red-600 text-white shadow-[0_0_20px_rgba(220,38,38,0.3)]",
      btnOutline: "bg-transparent hover:bg-red-950/50 border-red-800 text-red-400",
    }
  };

  const currentTheme = themeStyles[theme as keyof typeof themeStyles] || themeStyles.light;

  return (
    <div className="flex flex-col max-w-xl">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} viewport={{ once: true }}>
        <h3 className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 ${currentTheme.title}`}>
          {project.title}
        </h3>
        <p className={`text-lg md:text-xl leading-relaxed mb-8 ${currentTheme.desc}`}>
          {project.description}
        </p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }} viewport={{ once: true }} className="flex flex-wrap gap-3 mb-12">
        {project.stack.map((tech) => (
          <span key={tech} className={`px-4 py-1.5 rounded-full text-sm font-medium border ${currentTheme.tag}`}>
            {tech}
          </span>
        ))}
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} viewport={{ once: true }} className="flex flex-wrap items-center gap-4">
        {project.links.demo && (
          <a href={project.links.demo} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors border ${currentTheme.btnBg}`}>
            <ExternalLink size={18} /> Live Demo
          </a>
        )}
        {project.links.github && (
          <a href={project.links.github} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors border ${currentTheme.btnOutline}`}>
            <Code size={18} /> Source Code
          </a>
        )}
        {project.links.document && (
          <a href={project.links.document} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-semibold rounded-full transition-colors border ${currentTheme.btnOutline}`}>
            <FileText size={18} /> Case Study
          </a>
        )}
      </motion.div>
    </div>
  );
}
