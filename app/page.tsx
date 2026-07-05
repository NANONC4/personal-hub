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

type Theme = "light" | "dark" | "gray";

const getTheme = (index: number): Theme => {
  const themes: Theme[] = ["light", "dark", "gray"];
  return themes[index % themes.length];
};

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);
  const [isDrawerMode, setIsDrawerMode] = useState(false);
  const [activeDrawer, setActiveDrawer] = useState<number | null>(0);

  const handleToggleMode = (mode: boolean) => {
    setIsDrawerMode(mode);
    if (mode) {
      // When switching to Drawer Mode, ensure all drawers are folded (closed) initially.
      setActiveDrawer(null);
    }
  };

  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleUnlockAndScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsTransitioning(true);
  };

  const onTransitionCovered = () => {
    setIsLocked(false);
    // Wait for React to render the newly unlocked sections
    setTimeout(() => {
      document.getElementById("intro")?.scrollIntoView({ behavior: "auto" });
    }, 50);
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
      <section id="works" className="relative z-10 w-full bg-neutral-950">
        
        {/* Sticky Portfolio Header */}
        <div className="sticky top-0 z-[50] w-full bg-[#0f172a]/95 border-y border-indigo-900/50 py-3 px-6 md:px-12 flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12 transition-colors duration-500 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-6 bg-sky-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(56,189,248,0.6)]" />
            <h2 className="font-[family-name:var(--font-pixel)] text-slate-300 text-sm md:text-base tracking-widest uppercase mt-1">
              Selected Works
            </h2>
          </div>
          <div className="scale-90 md:scale-100">
            <PortfolioToggle isDrawerMode={isDrawerMode} onToggle={handleToggleMode} />
          </div>
        </div>

        {/* Project 1: Lemony Shop Pro (Pastel Blue/Pink/Purple) */}
        <div className="bg-purple-100 transition-colors duration-700 relative z-[30]">
          <SectionDivider 
            title={projects[0].title} 
            subtitle={projects[0].category} 
            index={0} 
            theme="blue"
            prevBgClass="bg-neutral-950"
            currentBgClass="bg-purple-100"
            prevHasPattern={false}
            isDrawerMode={isDrawerMode}
            isActiveDrawer={activeDrawer === 0}
            onToggle={() => setActiveDrawer(activeDrawer === 0 ? null : 0)}
          >
            <LemonyShopPro project={projects[0]} />
          </SectionDivider>
        </div>

        {/* Project 2: Lemony Shop (Light / Sunset Lofi) */}
        <div className="bg-amber-50 transition-colors duration-700 relative z-[20]">
          <SectionDivider 
            title={projects[1].title} 
            subtitle={projects[1].category} 
            index={1} 
            theme="dark"
            prevBgClass="bg-purple-100"
            currentBgClass="bg-amber-50"
            isDrawerMode={isDrawerMode}
            isActiveDrawer={activeDrawer === 1}
            onToggle={() => setActiveDrawer(activeDrawer === 1 ? null : 1)}
          >
            <LemonyShop project={projects[1]} />
          </SectionDivider>
        </div>

        {/* Project 3: Rules of Horror (Dark Red) */}
        <div className="bg-[#4a0d0d] transition-colors duration-700 relative z-[10]">
          <SectionDivider 
            title={projects[2].title} 
            subtitle={projects[2].category} 
            index={2} 
            theme="horror"
            prevBgClass="bg-amber-50"
            currentBgClass="bg-[#4a0d0d]"
            isDrawerMode={isDrawerMode}
            isActiveDrawer={activeDrawer === 2}
            onToggle={() => setActiveDrawer(activeDrawer === 2 ? null : 2)}
          >
            <RulesOfHorror project={projects[2]} />
          </SectionDivider>
        </div>

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
