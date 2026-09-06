"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IntroSection from "@/components/IntroSection";
import AboutMeSection from "@/components/AboutMeSection";
import Footer from "@/components/Footer";
import PortfolioToggle from "@/components/PortfolioToggle";

// Dynamic Imports for Heavy Below-the-fold Components
import dynamic from 'next/dynamic';
const ShopSection = dynamic(() => import("@/components/ShopSection"), { ssr: false });
const LemonyShopPro = dynamic(() => import("@/components/projects/LemonyShopPro"), { ssr: false });
const LemonyShop = dynamic(() => import("@/components/projects/LemonyShop"), { ssr: false });
const RulesOfHorror = dynamic(() => import("@/components/projects/RulesOfHorror"), { ssr: false });
const SectionDivider = dynamic(() => import("@/components/SectionDivider"), { ssr: false });

import HorrorPortalButton from "@/components/HorrorPortalButton";
import Preloader from "@/components/Preloader";
import FloatingNav from "@/components/FloatingNav";
import { projects } from "@/data/projects";

import CategoryGroup from "@/components/CategoryGroup";
import PortfolioFilter, { categories } from "@/components/PortfolioFilter";
const BioGallery = dynamic(() => import("@/components/BioGallery"), { ssr: false });

export default function ShowreelPage() {
  const [isDrawerMode, setIsDrawerMode] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null); // For projects
  const [activeDrawerCategory, setActiveDrawerCategory] = useState<string | null>(null); // For categories
  const [activeCategory, setActiveCategory] = useState("all");

  const handleToggleMode = (mode: boolean) => {
    setIsDrawerMode(mode);
    if (mode) {
      setActiveDrawer(null);
      setActiveDrawerCategory(null);
    }
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
                {!isDrawerMode && (
                  <div className="w-full bg-[#0a0f1c] py-16 flex justify-center border-y-2 border-indigo-500/40 shadow-[0_0_30px_rgba(99,102,241,0.15)_inset] relative z-10 overflow-hidden">
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
    <main className="relative min-h-screen bg-neutral-950 font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30 overflow-x-hidden pt-20">
      <Preloader />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* 1. INTRO SECTION */}
        <IntroSection />

        {/* 2. ABOUT ME SECTION */}
        <div id="about">
          <AboutMeSection />
        </div>

        {/* 3. STORYTELLING PORTFOLIO */}
        <section id="works" className="relative z-10 w-full bg-[#0f172a]">
          
          <div className="sticky top-[72px] z-[50] w-full bg-[#0f172a] border-y-2 border-slate-800 py-3 px-6 md:px-12 flex flex-col xl:flex-row justify-center items-center gap-6 xl:gap-12 transition-colors duration-500 shadow-[0_4px_0_0_rgba(2,6,23,1)]">
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

        {/* 4. SHOP SECTION */}
        <ShopSection />

        {/* 5. HORROR PORTAL */}
        <div className="py-20 flex justify-center bg-black">
          <HorrorPortalButton />
        </div>

        {/* 6. FOOTER */}
        <div id="contact">
          <Footer />
        </div>
        
        <FloatingNav />
      </motion.div>
    </main>
  );
}
