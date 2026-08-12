"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import PortfolioFilter, { categories } from "@/components/PortfolioFilter";
import { ExternalLink, FileText, ArrowRight } from "lucide-react";
import Footer from "@/components/Footer";
import { Lens } from "@/components/Lens";
import RetroGridBackground from "@/components/RetroGridBackground";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProjects = projects.filter(
    (p) => activeCategory === "all" || p.type === activeCategory
  );

  return (
    <main className="min-h-screen bg-[#0f172a] text-slate-200 font-[family-name:var(--font-geist-sans)] pt-24 selection:bg-pink-500/30">
      {/* Background */}
      <RetroGridBackground className="fixed inset-0 z-0 opacity-60 pointer-events-none" />
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-20 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/50 border border-slate-700/50 mb-6"
        >
          <div className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest text-slate-300 uppercase">My Work</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-md"
        >
          Portfolio
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-slate-400 leading-relaxed mb-12"
        >
          Explore my complete collection of projects, ranging from robust full-stack web applications to immersive Unity games and creative UI/UX designs.
        </motion.p>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-xl mx-auto bg-slate-900/50 border border-slate-800 p-2 rounded-xl backdrop-blur-sm"
        >
          <div className="flex flex-wrap justify-center gap-2 w-full">
             <PortfolioFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
          </div>
        </motion.div>
      </section>

      {/* Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
                className="group relative flex flex-col bg-slate-900/60 rounded-2xl overflow-hidden border border-slate-800 hover:border-pink-500/50 transition-colors shadow-lg hover:shadow-[0_0_30px_rgba(236,72,153,0.15)]"
              >
                {/* Image Container */}
                <div className="relative h-56 w-full bg-slate-950">
                  <Lens zoomFactor={1.8} lensSize={160}>
                    <div className="relative w-full h-full">
                      <Image
                        src={project.gallery[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 font-mono text-xs uppercase tracking-widest text-slate-200">
                        {project.category}
                      </div>
                      {/* Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80" />
                    </div>
                  </Lens>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-grow p-6">
                  <h3 className="text-xl font-bold text-white mb-2 font-[family-name:var(--font-pixel)] uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-400 line-clamp-3 mb-6 leading-relaxed flex-grow">
                    {project.description}
                  </p>

                  {/* Tech Stack Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-800 text-xs font-mono text-slate-300 rounded border border-slate-700">
                        {tech}
                      </span>
                    ))}
                    {project.stack.length > 4 && (
                      <span className="px-2 py-1 bg-slate-800 text-xs font-mono text-slate-300 rounded border border-slate-700">
                        +{project.stack.length - 4}
                      </span>
                    )}
                  </div>

                  {/* Links & Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800">
                    {project.links.demo && project.links.demo !== "#" && (
                      <Link 
                        href={project.links.demo} 
                        target="_blank"
                        className="flex-1 flex items-center justify-center gap-2 bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white px-4 py-2 rounded-lg font-mono text-sm tracking-wider transition-colors border border-pink-500/20 hover:border-pink-500"
                      >
                        <ExternalLink className="w-4 h-4" /> Live Demo
                      </Link>
                    )}
                    {project.links.github && (
                      <Link 
                        href={project.links.github} 
                        target="_blank"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                        title="View Source"
                      >
                        <img src="/github-142-svgrepo-com.svg" alt="GitHub" className="w-5 h-5 invert opacity-70" />
                      </Link>
                    )}
                    {project.links.document && (
                      <Link 
                        href={project.links.document} 
                        target="_blank"
                        className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors border border-slate-700"
                        title="View Document"
                      >
                        <FileText className="w-5 h-5" />
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="w-full py-20 flex flex-col items-center justify-center text-slate-500">
            <div className="font-[family-name:var(--font-pixel)] text-4xl mb-4 opacity-50">?</div>
            <p className="font-mono uppercase tracking-widest text-sm">No projects found in this category.</p>
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
