"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";

export default function ResumeButton() {
  const [isVisible, setIsVisible] = useState(false);

  // Show the button only after scrolling down a bit
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed bottom-6 right-6 z-[60] pointer-events-auto"
    >
      <a 
        href="#" // Replace with actual PDF path later e.g. "/resume.pdf"
        className="group relative flex items-center justify-center w-14 h-14 bg-slate-900 border-2 border-slate-700 rounded-lg overflow-hidden transition-all hover:border-sky-400/50 hover:shadow-[0_0_20px_rgba(56,189,248,0.4)]"
      >
        {/* Glow behind */}
        <div className="absolute inset-0 bg-sky-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        
        <Download className="w-6 h-6 text-slate-400 group-hover:text-sky-300 transition-colors relative z-10" />
        
        {/* Tooltip */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap">
          <div className="bg-slate-900 border border-slate-700 text-sky-200 text-xs font-[family-name:var(--font-pixel)] tracking-widest px-3 py-2 rounded-md shadow-lg">
            SAVE DATA (CV)
          </div>
        </div>
      </a>
    </motion.div>
  );
}
