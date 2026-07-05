"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { PixelCloud, PixelStar } from "./PixelIcons";
import PixelSky from "./PixelSky";

export default function AboutMeSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effects
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const yStars = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const xCloud1 = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const xCloud2 = useTransform(scrollYProgress, [0, 1], ["0%", "-40%"]);
  const xCloud3 = useTransform(scrollYProgress, [0, 1], ["-20%", "50%"]);

  const skillCategories = [
    {
      title: "Frontend & UI",
      color: "text-sky-300",
      borderColor: "border-slate-700/50",
      hoverBorder: "group-hover:border-sky-500/50",
      glowShadow: "group-hover:shadow-[0_0_30px_rgba(56,189,248,0.15)]",
      badgeHover: "hover:border-sky-400/50 hover:bg-sky-900/30 hover:text-sky-200 hover:shadow-[0_0_15px_rgba(56,189,248,0.3)]",
      bgGradient: "from-slate-900/95 to-[#020617]/95",
      icon: <PixelCloud className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-800/40 pointer-events-none transition-transform duration-700 group-hover:-translate-y-4 animate-[float-subtle_6s_ease-in-out_infinite]" color="currentColor" />,
      skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "TypeScript", "HTML/CSS"]
    },
    {
      title: "Backend & Core",
      color: "text-fuchsia-300",
      borderColor: "border-slate-700/50",
      hoverBorder: "group-hover:border-fuchsia-500/50",
      glowShadow: "group-hover:shadow-[0_0_30px_rgba(217,70,239,0.15)]",
      badgeHover: "hover:border-fuchsia-400/50 hover:bg-fuchsia-900/30 hover:text-fuchsia-200 hover:shadow-[0_0_15px_rgba(217,70,239,0.3)]",
      bgGradient: "from-slate-900/95 to-[#020617]/95",
      icon: (
        <div className="absolute top-8 right-8 flex gap-4 opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-125 animate-[float-subtle_5s_ease-in-out_infinite_reverse]">
          <PixelStar className="w-6 h-6 text-slate-400" color="currentColor" />
          <PixelStar className="w-4 h-4 text-slate-400 mt-6" color="currentColor" />
        </div>
      ),
      skills: ["Node.js", "C#", "REST APIs", "SQL", "Git", "Vercel"]
    },
    {
      title: "Creative & Game Dev",
      color: "text-amber-300",
      borderColor: "border-slate-700/50",
      hoverBorder: "group-hover:border-amber-500/50",
      glowShadow: "group-hover:shadow-[0_0_30px_rgba(251,191,36,0.15)]",
      badgeHover: "hover:border-amber-400/50 hover:bg-amber-900/30 hover:text-amber-200 hover:shadow-[0_0_15px_rgba(251,191,36,0.3)]",
      bgGradient: "from-slate-900/95 to-[#020617]/95",
      icon: <PixelStar className="absolute -bottom-4 -left-4 w-24 h-24 text-slate-800/30 pointer-events-none transition-transform duration-700 group-hover:rotate-12 animate-[float-subtle_7s_ease-in-out_infinite]" color="currentColor" />,
      skills: ["Unity 3D", "Game Logic", "Pixel Art", "Aseprite", "UI/UX Design"]
    }
  ];

  // Deterministic pseudo-random for SSR hydration matching
  const getRand = (seed: number) => {
    const x = Math.sin(seed + 1) * 10000;
    return x - Math.floor(x);
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-[120vh] bg-[#020617] overflow-hidden py-32 border-y-8 border-slate-900"
    >
      {/* Static Gradient Background (No CPU Lag) */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#1e1b4b] to-[#0f172a] opacity-90"
      />
      <div 
        className="absolute inset-0 bg-gradient-to-tl from-[#0f172a]/50 via-sky-900/10 to-fuchsia-900/10 opacity-50"
      />

      {/* Performant Dynamic Pixel Stars & Meteors */}
      <PixelSky className="absolute inset-0 z-0 opacity-50 pointer-events-none" />

      {/* Parallax Stars (Midground) */}
      <motion.div className="absolute inset-0 z-0 pointer-events-none will-change-transform" style={{ y: yStars }}>
        {isMounted && Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`mid-star-${i}`}
            className="absolute animate-pulse"
            style={{
              top: `${getRand(i * 40) * 100}%`,
              left: `${getRand(i * 50) * 100}%`,
              animationDuration: `${3 + getRand(i * 60) * 3}s`
            }}
          >
            <PixelStar color="#e2e8f0" className="w-2 h-2 opacity-50" />
          </div>
        ))}
      </motion.div>

      {/* Parallax Clouds */}
      <motion.div className="absolute top-[10%] left-[-10%] z-10 opacity-30 pointer-events-none will-change-transform" style={{ x: xCloud1 }}>
        <PixelCloud className="w-64 h-64 md:w-96 md:h-96" color="#94a3b8" />
      </motion.div>
      <motion.div className="absolute top-[40%] right-[-10%] z-10 opacity-20 pointer-events-none will-change-transform" style={{ x: xCloud2 }}>
        <PixelCloud className="w-48 h-48 md:w-80 md:h-80" color="#64748b" />
      </motion.div>
      <motion.div className="absolute top-[70%] left-[20%] z-10 opacity-40 pointer-events-none will-change-transform" style={{ x: xCloud3 }}>
        <PixelCloud className="w-72 h-72 md:w-[500px] md:h-[500px]" color="#475569" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-20 container mx-auto px-6 h-full flex flex-col items-center justify-center pointer-events-none">
        
        {/* About Me Box */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-slate-900/95 border border-slate-700/50 p-8 md:p-12 rounded-xl text-center w-full max-w-3xl mb-24 shadow-2xl relative overflow-hidden"
        >
          {/* Animated Element inside Midnight Thoughts */}
          <PixelStar color="#818cf8" className="absolute top-6 left-6 w-8 h-8 opacity-20 animate-[float-sparkle-1_3s_ease-in-out_infinite] pointer-events-none" />
          <PixelStar color="#c084fc" className="absolute bottom-6 right-6 w-6 h-6 opacity-20 animate-[float-sparkle-2_4s_ease-in-out_infinite] pointer-events-none" />

          <h2 className="font-[family-name:var(--font-pixel)] text-2xl md:text-4xl text-indigo-300 mb-6 tracking-widest uppercase relative z-10">
            Midnight Thoughts
          </h2>
          <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-4 relative z-10">
            I craft digital experiences with a blend of structured logic and creative magic. 
            By day, I'm weaving intricate systems and robust code. By night, I'm dreaming up 
            pixel-perfect aesthetics and chill atmospheres.
          </p>
          <p className="text-slate-400 text-sm md:text-base font-mono relative z-10">
            "Coding is just bringing constellations down to the screen."
          </p>
        </motion.div>

        {/* Observatory Windows (Skills Grid) */}
        <div className="w-full max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h3 className="font-[family-name:var(--font-pixel)] text-lg md:text-xl text-slate-400 tracking-widest uppercase">
              [ Technology Stack ]
            </h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`flex flex-col bg-gradient-to-br ${category.bgGradient} border ${category.borderColor} p-6 md:p-8 rounded-xl shadow-2xl ${category.hoverBorder} ${category.glowShadow} transition-all duration-500 hover:-translate-y-2 group relative overflow-hidden h-full`}
              >
                {/* Internal Sky Element */}
                {category.icon}

                {/* Subtle highlight effect on hover */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-500 pointer-events-none" />
                
                {/* Tech Header Detail */}
                <div className="flex justify-between items-center mb-6 relative z-10 opacity-60">
                  <span className="font-[family-name:var(--font-pixel)] text-[10px] text-slate-400 tracking-widest">
                    SYS.MOD.0{idx + 1}
                  </span>
                  <div className="flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse opacity-50" style={{ animationDelay: '0ms' }} />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse opacity-50" style={{ animationDelay: '300ms' }} />
                    <div className="w-1.5 h-1.5 bg-current rounded-full animate-pulse opacity-100" style={{ animationDelay: '600ms' }} />
                  </div>
                </div>

                <h4 className={`font-[family-name:var(--font-pixel)] text-sm md:text-base ${category.color} mb-6 tracking-widest uppercase border-b border-slate-700/50 pb-4 relative z-10`}>
                  {category.title}
                </h4>
                
                <div className="flex flex-wrap gap-3 relative z-10">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill} 
                      className={`flex items-center gap-2 px-3 py-1.5 bg-slate-950/80 border border-slate-700/80 text-slate-300 text-xs md:text-sm font-mono rounded-lg transition-all duration-300 cursor-default ${category.badgeHover} hover:-translate-y-0.5`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-500 group-hover:bg-amber-400 group-hover:shadow-[0_0_8px_#fbbf24] transition-all duration-300 shadow-sm" />
                      <span className="text-slate-300 font-mono text-sm tracking-wide group-hover:text-amber-200 transition-colors">{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
