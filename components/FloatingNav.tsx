"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, Cpu, Briefcase, Mail } from "lucide-react";

export default function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Show the nav button only after scrolling down a bit to not clutter the initial view
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
        setIsOpen(false); // Close if scrolling all the way up
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 300); // Wait for menu close animation
  };

  const navItems = [
    { label: "Home", id: "home", icon: <Rocket className="w-4 h-4" /> },
    { label: "Skills", id: "about", icon: <Cpu className="w-4 h-4" /> },
    { label: "Works", id: "works", icon: <Briefcase className="w-4 h-4" /> },
    { label: "Contact", id: "contact", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={isVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className="fixed top-6 left-6 z-[70] pointer-events-auto"
    >
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="absolute top-full left-0 mt-4 w-48 bg-[#0f172a] border-2 border-indigo-400/20 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Retro header for the menu */}
            <div className="bg-[#1e1b4b] px-4 py-2 border-b border-indigo-400/20">
              <span className="font-[family-name:var(--font-pixel)] text-[10px] text-indigo-300 tracking-widest uppercase">
                Navigation
              </span>
            </div>
            
            <div className="flex flex-col p-2">
              {navItems.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="flex items-center gap-3 px-4 py-3 text-sm font-mono text-slate-300 hover:text-indigo-300 hover:bg-indigo-900/30 rounded-lg transition-colors duration-200 group w-full text-left"
                >
                  <span className="group-hover:scale-110 group-hover:text-indigo-300 transition-transform">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center justify-center w-14 h-14 bg-[#0f172a] border-2 border-indigo-400/20 rounded-full overflow-hidden transition-all hover:border-indigo-400/40 hover:shadow-[0_0_20px_rgba(129,140,248,0.2)]"
      >
        <div className={`absolute inset-0 bg-indigo-500/20 transition-transform duration-300 ease-out ${isOpen ? 'translate-y-0' : 'translate-y-[100%] group-hover:translate-y-0'}`} />
        
        {isOpen ? (
          <X className="w-6 h-6 text-indigo-300 relative z-10" />
        ) : (
          <Menu className="w-6 h-6 text-slate-400 group-hover:text-indigo-300 transition-colors relative z-10" />
        )}
      </button>
    </motion.div>
  );
}
