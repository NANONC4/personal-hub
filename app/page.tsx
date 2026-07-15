"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BackgroundArt from "@/components/BackgroundArt";
import ProfileSection from "@/components/ProfileSection";
import SocialLinkButton from "@/components/SocialLinkButton";
import IntroSection from "@/components/IntroSection";
import AboutMeSection from "@/components/AboutMeSection";
import Footer from "@/components/Footer";
import LemonyShopPro from "@/components/projects/LemonyShopPro";
import LemonyShop from "@/components/projects/LemonyShop";
import RulesOfHorror from "@/components/projects/RulesOfHorror";
import SectionDivider from "@/components/SectionDivider";
import PortfolioToggle from "@/components/PortfolioToggle";
import PixelSky from "@/components/PixelSky";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import HorrorPortalButton from "@/components/HorrorPortalButton";
import PixelTransition from "@/components/PixelTransition";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import { PixelMail, PixelPhone, PixelHeart } from "@/components/PixelIcons";
import { Code, Link, Globe } from "lucide-react";
import { projects } from "@/data/projects";
import { getPattern } from "@/lib/patterns";
import { useLenis } from 'lenis/react';

type Theme = "light" | "dark" | "gray";

const getTheme = (index: number): Theme => {
  const themes: Theme[] = ["light", "dark", "gray"];
  return themes[index % themes.length];
};

import CategoryGroup from "@/components/CategoryGroup";
import PortfolioFilter, { categories } from "@/components/PortfolioFilter";
import BioGallery from "@/components/BioGallery";

// ... existing code ...

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [isDrawerMode, setIsDrawerMode] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null); // For projects
  const [activeDrawerCategory, setActiveDrawerCategory] = useState<string | null>(null); // For categories
  const [activeCategory, setActiveCategory] = useState("all");
  const lenis = useLenis();

  const handleToggleMode = (mode: boolean) => {
    setIsDrawerMode(mode);
    if (mode) {
      setActiveDrawer(null);
      setActiveDrawerCategory(null);
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleUnlockAndScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
  };

  const onTransitionCovered = () => {
    setIsLocked(false);
    setTimeout(() => {
      const el = document.getElementById("intro");
      if (!el) return;
      
      if (lenis) {
        // Force Lenis to recalculate page height after the new DOM is injected
        lenis.resize();
        lenis.scrollTo(el, { immediate: true });
      }
      // Native fallback to guarantee the jump
      window.scrollTo({ top: el.offsetTop, behavior: "instant" as any });
      
    }, 300); // Wait 300ms (curtain holds for 400ms) to ensure DOM & Layout are fully ready
  };

  // Grouping logic for dynamic rendering
  const filteredProjects = projects.filter(p => activeCategory === 'all' || p.type === activeCategory);
  const groupedProjects: Record<string, typeof projects> = {};
  filteredProjects.forEach(p => {
    if (!groupedProjects[p.type]) groupedProjects[p.type] = [];
    groupedProjects[p.type].push(p);
  });
  
  const categoryOrder = ['web', 'game', 'bio'];
  const activeGroups = categoryOrder.filter(type => groupedProjects[type]);

  const renderGroups = () => {
    let globalIndex = 0;
    let previousBgClass = "bg-[#0f172a]"; // Matches the bottom of the midnight zone

    return activeGroups.map((type) => {
      const groupProjects = groupedProjects[type];
      const categoryLabel = categories.find(c => c.id === type)?.label || type;

      if (type === 'bio') {
        const bioGalleryNode = <BioGallery projects={groupProjects} isDrawerMode={isDrawerMode} />;
        return (
          <div key={type} className="flex flex-col relative w-full">
            {isDrawerMode ? (
              <CategoryGroup 
                title={categoryLabel}
                isOpen={activeDrawerCategory === type}
                setIsOpen={() => setActiveDrawerCategory(activeDrawerCategory === type ? null : type)}
                isDrawerMode={isDrawerMode}
              >
                {bioGalleryNode}
              </CategoryGroup>
            ) : (
              <div className="relative z-30">
                {/* Section header for continuous mode, since BioGallery replaces SectionDivider */}
                {!isDrawerMode && (
                  <div className="w-full bg-[#0a0f1c] py-16 flex justify-center border-y-2 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)_inset] relative z-10 overflow-hidden">
                    {/* Retro Grid Background */}
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#312e81_1px,transparent_1px),linear-gradient(to_bottom,#312e81_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>
                    
                    <div className="relative z-10 flex flex-col items-center gap-2">
                       <span className="font-[family-name:var(--font-pixel)] text-pink-400 text-[10px] md:text-xs tracking-[0.4em] uppercase drop-shadow-[0_0_8px_rgba(244,114,182,0.8)] opacity-90">
                         - CATEGORY -
                       </span>
                       <h2 className="font-[family-name:var(--font-pixel)] text-white tracking-[0.15em] text-2xl md:text-4xl uppercase drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] mt-2">
                         {categoryLabel}
                       </h2>
                    </div>
                  </div>
                )}
                {bioGalleryNode}
              </div>
            )}
          </div>
        );
      }

      const projectNodes = groupProjects.map((project, idx) => {
            const isFirstInCategory = idx === 0;
            const currentPrevBg = previousBgClass;
            previousBgClass = project.bgClass;
            const filteredIndex = globalIndex++;
            const zIndex = 30 - filteredIndex * 5;

            return (
              <div key={project.id} className={`${project.bgClass} transition-colors duration-700 relative`} style={{ zIndex }}>
                <SectionDivider
                  title={project.title}
                  subtitle={project.role}
                  categoryName={!isDrawerMode && isFirstInCategory ? categoryLabel : undefined}
                  index={filteredIndex}
                  theme={project.theme as any}
                  prevBgClass={currentPrevBg}
                  currentBgClass={project.bgClass}
                  prevHasPattern={filteredIndex > 0}
                  isDrawerMode={isDrawerMode}
                  isActiveDrawer={isDrawerMode && activeDrawer === project.id}
                  onToggle={() => setActiveDrawer(activeDrawer === project.id ? null : project.id)}
                >
                  {project.id === 'lemony-shop-pro' && <LemonyShopPro project={project} />}
                  {project.id === 'lemony-shop' && <LemonyShop project={project} />}
                  {project.id === 'rules-of-horror' && <RulesOfHorror project={project} />}
                </SectionDivider>
              </div>
            );
          });

      return (
        <div key={type} className="flex flex-col relative w-full">
          {isDrawerMode ? (
            <CategoryGroup 
              title={categoryLabel}
              isOpen={activeDrawerCategory === type}
              setIsOpen={() => setActiveDrawerCategory(activeDrawerCategory === type ? null : type)}
              isDrawerMode={isDrawerMode}
            >
              {projectNodes}
            </CategoryGroup>
          ) : (
            projectNodes
          )}
        </div>
      );
    });
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30 overflow-x-hidden">
      <Preloader />
      
      <PixelTransition 
        isActive={isTransitioning} 
        onCovered={onTransitionCovered} 
        onComplete={() => setIsTransitioning(false)} 
      />
      {/* 1. HERO SECTION (Link-in-Bio) */}
      <section id="home" className="relative z-10 w-full min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100">
        
        <PixelSky />

        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 px-6 md:px-12 py-20 lg:py-0 relative z-10">
          
          {/* Left Side: Profile */}
          <div className="flex-shrink-0">
            <ProfileSection />
          </div>

          {/* Right Side: Links */}
          <div className="w-full max-w-xl flex-shrink-0">
            <motion.div 
              initial="hidden"
              whileInView="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.2 }
                }
              }}
              className="flex flex-col gap-4 max-w-xl mx-auto lg:mx-0 w-full"
            >
            <motion.div 
              variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } }}
              className="mb-6 self-center lg:self-start relative group inline-block"
            >
              {/* Retro badge background */}
              <div className="absolute inset-0 bg-white border-4 border-slate-800 rounded-xl shadow-[4px_4px_0_0_#1e293b] -z-10 transition-all duration-200"></div>
              
              {/* Decorative Stars */}
              <div className="absolute -top-3 -right-3 text-pink-500 font-[family-name:var(--font-pixel)] text-2xl animate-bounce z-20">✦</div>
              <div className="absolute -bottom-2 -left-2 text-sky-400 font-[family-name:var(--font-pixel)] text-xl animate-bounce" style={{ animationDelay: '0.5s' }}>✧</div>

              <h2 className="px-6 py-4 text-xl md:text-2xl font-[family-name:var(--font-pixel)] bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 bg-clip-text text-transparent tracking-widest uppercase text-center" style={{ backgroundSize: '200% auto', animation: 'gradient-shift 6s linear infinite' }}>
                Let's Connect (✿◠‿◠)
              </h2>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}>
              <SocialLinkButton 
                title="My Portfolio" 
                subtitle="Explore my selected works & case studies" 
                icon={<PixelHeart />} 
                href="#intro" 
                highlighted={true}
                index={0}
                onClick={handleUnlockAndScroll}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: 30 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="GitHub" 
                subtitle="Open source contributions and code" 
                icon={<img src="/github-142-svgrepo-com.svg" alt="GitHub" className="w-6 h-6" />} 
                href="https://github.com/NANONC4" 
                index={1}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95, x: 30 }, show: { opacity: 1, scale: 1, x: 0 } }}>
              <SocialLinkButton 
                title="LinkedIn" 
                subtitle="Professional network and resume" 
                icon={<img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-6 h-6" />} 
                href="https://www.linkedin.com/in/%E0%B8%89%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B8%A2-%E0%B8%94%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%87-1478213aa/" 
                index={2}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="Email Me" 
                subtitle="DiaFrampton771@gmail.com" 
                icon={<PixelMail />} 
                href="mailto:DiaFrampton771@gmail.com" 
                copyText="DiaFrampton771@gmail.com"
                index={3}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95, x: 30 }, show: { opacity: 1, scale: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Call Me" 
                subtitle="062-990-7862" 
                icon={<PixelPhone />} 
                href="tel:0629907862" 
                copyText="062-990-7862"
                index={4}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="Fastwork" 
                subtitle="Hire me for your next web project" 
                icon={<img src="/fastwork.png" alt="Fastwork" className="w-6 h-6 rounded" />} 
                href="https://fastwork.co/user/nanonc4?source=web_chat_user-profile-modal" 
                index={5}
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>

      {!isLocked && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* 2. INTRO SECTION */}
          <IntroSection />

          {/* 2.5 ABOUT ME SECTION (Night Sky Skills) */}
          <div id="about">
            <AboutMeSection />
          </div>

      {/* 3. STORYTELLING PORTFOLIO (Bespoke Hardcoded Layouts) */}
      <section id="works" className="relative z-10 w-full bg-[#0f172a]">
        
        {/* Sticky Portfolio Header */}
        <div className="sticky top-0 z-[50] w-full bg-[#0f172a] border-y-2 border-slate-800 py-3 px-6 md:px-12 flex flex-col xl:flex-row justify-center items-center gap-6 xl:gap-12 transition-colors duration-500 shadow-[0_4px_0_0_rgba(2,6,23,1)]">
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-1.5 h-6 bg-indigo-400 rounded shadow-[2px_2px_0_0_rgba(2,6,23,0.8)]" />
            <h2 className="font-[family-name:var(--font-pixel)] text-slate-300 text-sm md:text-base tracking-widest uppercase mt-1 drop-shadow-[1px_1px_0_#020617]">
              Selected Works
            </h2>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 xl:gap-8 w-full xl:w-auto">
            <PortfolioFilter activeCategory={activeCategory} onSelectCategory={setActiveCategory} />
            <div className="shrink-0 w-full md:w-auto">
              <PortfolioToggle isDrawerMode={isDrawerMode} onToggle={handleToggleMode} />
            </div>
          </div>
        </div>

        {/* Render Grouped Projects */}
        <AnimatePresence mode="popLayout">
          <motion.div
            key={activeCategory + (isDrawerMode ? 'drawer' : 'continuous')}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full flex flex-col"
          >
            {renderGroups()}
          </motion.div>
        </AnimatePresence>

      </section>

          {/* 4. HORROR PORTAL */}
          <section className="relative z-10 w-full">
             <HorrorPortalButton />
          </section>

          {/* 5. FOOTER / CONTACT SECTION (Midnight Cafe) */}
          <div id="contact">
            <Footer />
          </div>
          
          <FloatingNav />
        </motion.div>
      )}

    </main>
  );
}
