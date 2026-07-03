"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import BackgroundArt from "@/components/BackgroundArt";
import ProfileSection from "@/components/ProfileSection";
import SocialLinkButton from "@/components/SocialLinkButton";
import IntroSection from "@/components/IntroSection";
import LemonyShopPro from "@/components/projects/LemonyShopPro";
import LemonyShop from "@/components/projects/LemonyShop";
import RulesOfHorror from "@/components/projects/RulesOfHorror";
import SectionDivider from "@/components/SectionDivider";
import PixelSky from "@/components/PixelSky";
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import HorrorPortalButton from "@/components/HorrorPortalButton";
import { Code, Link, Mail, Globe, Phone, Gamepad2 } from "lucide-react";
import { projects } from "@/data/projects";

type Theme = "light" | "dark" | "gray";

const getTheme = (index: number): Theme => {
  const themes: Theme[] = ["light", "dark", "gray"];
  return themes[index % themes.length];
};

export default function Home() {
  const [isLocked, setIsLocked] = useState(true);

  const handleUnlockAndScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLocked(false);
    
    // Allow React state to update and unlock scroll, then perform smooth scroll
    setTimeout(() => {
      document.getElementById("intro")?.scrollIntoView({ behavior: "smooth" });
    }, 50);
  };

  return (
    <main className="relative min-h-screen bg-neutral-950 font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30 overflow-x-hidden">
      {/* 1. HERO SECTION (Link-in-Bio) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row mx-auto text-slate-800 overflow-hidden bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100">
        
        <PixelSky />

        {/* Left Side: Profile (Sticky on Desktop) */}
        <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex items-center justify-center p-6 md:p-12 lg:p-20 relative z-10 max-w-4xl mx-auto lg:max-w-none">
          <ProfileSection />
        </div>

        {/* Right Side: Links (Scrollable on Desktop) */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center p-6 md:p-12 lg:p-20 lg:py-32 relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.15, delayChildren: 0.2 }
              }
            }}
            className="flex flex-col gap-4 max-w-xl mx-auto w-full"
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
                icon={<Globe size={24} strokeWidth={1.5} />} 
                href="#intro" 
                highlighted={true}
                index={0}
                onClick={handleUnlockAndScroll}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="GitHub" 
                subtitle="Open source contributions and code" 
                icon={<Code size={24} strokeWidth={1.5} />} 
                href="https://github.com/NANONC4" 
                index={1}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="LinkedIn" 
                subtitle="Professional network and resume" 
                icon={<Link size={24} strokeWidth={1.5} />} 
                href="https://www.linkedin.com/in/%E0%B8%89%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B8%A2-%E0%B8%94%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%87-1478213aa/" 
                index={2}
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="Email Me" 
                subtitle="DiaFrampton771@gmail.com" 
                icon={<Mail size={24} strokeWidth={1.5} />} 
                href="mailto:DiaFrampton771@gmail.com" 
                index={3}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95, x: 30 }, show: { opacity: 1, scale: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Call Me" 
                subtitle="062-990-7862" 
                icon={<Phone size={24} strokeWidth={1.5} />} 
                href="tel:0629907862" 
                index={4}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="Itch.io" 
                subtitle="Play my indie games and experiments" 
                icon={<Gamepad2 size={24} strokeWidth={1.5} />} 
                href="https://itch.io" 
                index={5}
              />
            </motion.div>
          </motion.div>
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

      {/* 3. STORYTELLING PORTFOLIO (Bespoke Hardcoded Layouts) */}
      <section className="relative z-10 w-full">
        
        {/* Project 1: Lemony Shop Pro (Dark) */}
        <div className="bg-neutral-950 transition-colors duration-700">
          <SectionDivider 
            title={projects[0].title} 
            subtitle={projects[0].category} 
            index={0} 
            theme="blue"
            prevBgClass="bg-pink-200"
            currentBgClass="bg-neutral-950"
          >
            <LemonyShopPro project={projects[0]} />
          </SectionDivider>
        </div>

        {/* Project 2: Lemony Shop (Light) */}
        <div className="bg-white transition-colors duration-700">
          <SectionDivider 
            title={projects[1].title} 
            subtitle={projects[1].category} 
            index={1} 
            theme="dark"
            prevBgClass="bg-neutral-950"
            currentBgClass="bg-white"
          >
            <LemonyShop project={projects[1]} />
          </SectionDivider>
        </div>

        {/* Project 3: Rules of Horror (Dark Red) */}
        <div className="bg-[#4a0d0d] transition-colors duration-700">
          <SectionDivider 
            title={projects[2].title} 
            subtitle={projects[2].category} 
            index={2} 
            theme="horror"
            prevBgClass="bg-white"
            currentBgClass="bg-[#4a0d0d]"
          >
            <RulesOfHorror project={projects[2]} />
          </SectionDivider>
        </div>

      </section>

          {/* 4. HORROR PORTAL */}
          <section className="relative z-10 w-full">
             <HorrorPortalButton />
          </section>
        </motion.div>
      )}

    </main>
  );
}
