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
import HorizontalScrollCarousel from "@/components/HorizontalScrollCarousel";
import HorrorPortalButton from "@/components/HorrorPortalButton";
import { Gift, Star, Link, Mail, Globe, Palette } from "lucide-react";
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
    <main className={`relative min-h-screen bg-neutral-950 font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30 ${isLocked ? 'h-screen overflow-hidden' : ''}`}>
      <BackgroundArt />

      {/* 1. HERO SECTION (Link-in-Bio) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row max-w-[1600px] mx-auto bg-sky-100/90 text-slate-800 overflow-hidden"
        style={{
          backgroundImage: "radial-gradient(#94a3b8 1px, transparent 1px)",
          backgroundSize: "20px 20px"
        }}
      >
        {/* Floating Decorative Elements (Desktop Only) */}
        <div className="hidden lg:block absolute inset-0 pointer-events-none z-0">
          <motion.div animate={{ y: [0, -20, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[15%] left-[5%] text-4xl text-pink-400 drop-shadow-md font-[family-name:var(--font-pixel)]">✦</motion.div>
          <motion.div animate={{ y: [0, 15, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute bottom-[20%] left-[10%] text-5xl text-yellow-400 drop-shadow-md font-[family-name:var(--font-pixel)]">☁️</motion.div>
          <motion.div animate={{ y: [0, -15, 0], rotate: [0, 10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }} className="absolute top-[30%] right-[8%] text-4xl text-purple-400 drop-shadow-md font-[family-name:var(--font-pixel)]">♥</motion.div>
          <motion.div animate={{ y: [0, 25, 0], scale: [1, 1.1, 1] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }} className="absolute bottom-[15%] right-[15%] text-6xl text-white drop-shadow-md font-[family-name:var(--font-pixel)]">★</motion.div>
          <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }} className="absolute top-[50%] left-[45%] text-2xl text-emerald-400 drop-shadow-md font-[family-name:var(--font-pixel)]">✧</motion.div>
        </div>

        {/* Left Side: Profile (Sticky on Desktop) */}
        <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex items-center justify-center p-6 md:p-12 lg:p-20 relative z-10">
          <ProfileSection />
        </div>

        {/* Right Side: Links (Scrollable on Desktop) */}
        <div className="w-full lg:w-[55%] flex flex-col justify-center p-6 md:p-12 lg:p-20 lg:py-32">
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
            <motion.h2 
              variants={{ hidden: { opacity: 0, y: -30 }, show: { opacity: 1, y: 0 } }}
              className="text-2xl md:text-3xl font-[family-name:var(--font-pixel)] text-slate-800 mb-6 tracking-tight uppercase drop-shadow-sm"
            >
              Let's Connect (✿◠‿◠)
            </motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.9, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}>
              <SocialLinkButton 
                title="My Portfolio" 
                subtitle="Explore my selected works & case studies" 
                icon={<Globe size={24} strokeWidth={1.5} />} 
                href="#intro" 
                highlighted={true}
                onClick={handleUnlockAndScroll}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Dribbble" 
                subtitle="Design concepts and UI explorations" 
                icon={<Palette size={24} strokeWidth={1.5} />} 
                href="https://dribbble.com" 
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="GitHub" 
                subtitle="Open source contributions and code" 
                icon={<Gift size={24} strokeWidth={1.5} />} 
                href="https://github.com" 
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="LinkedIn" 
                subtitle="Professional network and resume" 
                icon={<Link size={24} strokeWidth={1.5} />} 
                href="https://linkedin.com" 
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, scale: 0.95, x: 30 }, show: { opacity: 1, scale: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Instagram" 
                subtitle="Behind the scenes and daily life" 
                icon={<Star size={24} strokeWidth={1.5} />} 
                href="https://instagram.com" 
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 40 }, show: { opacity: 1, y: 0 } }}>
              <SocialLinkButton 
                title="Email Me" 
                subtitle="Available for freelance opportunities" 
                icon={<Mail size={24} strokeWidth={1.5} />} 
                href="mailto:hello@example.com" 
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

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
            prevBgClass="bg-white"
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

    </main>
  );
}
