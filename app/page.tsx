"use client";
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
  return (
    <main className="relative min-h-screen bg-neutral-950 font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30">
      <BackgroundArt />

      {/* 1. HERO SECTION (Link-in-Bio) */}
      <section className="relative z-10 w-full min-h-screen flex flex-col lg:flex-row max-w-[1600px] mx-auto">
        {/* Left Side: Profile (Sticky on Desktop) */}
        <div className="w-full lg:w-[45%] lg:h-screen lg:sticky top-0 flex items-center justify-center p-6 md:p-12 lg:p-20">
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
                transition: { staggerChildren: 0.1, delayChildren: 0.3 }
              }
            }}
            className="flex flex-col gap-4 max-w-xl mx-auto w-full"
          >
            <motion.h2 
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              className="text-xl md:text-2xl font-semibold text-white mb-6 tracking-tight"
            >
              Let's Connect
            </motion.h2>
            
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="My Portfolio" 
                subtitle="Keep scrolling down to see my works" 
                icon={<Globe size={24} strokeWidth={1.5} />} 
                href="#" 
                highlighted={true}
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Dribbble" 
                subtitle="Design concepts and UI explorations" 
                icon={<Palette size={24} strokeWidth={1.5} />} 
                href="https://dribbble.com" 
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="GitHub" 
                subtitle="Open source contributions and code" 
                icon={<Gift size={24} strokeWidth={1.5} />} 
                href="https://github.com" 
              />
            </motion.div>

            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="LinkedIn" 
                subtitle="Professional network and resume" 
                icon={<Link size={24} strokeWidth={1.5} />} 
                href="https://linkedin.com" 
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
              <SocialLinkButton 
                title="Instagram" 
                subtitle="Behind the scenes and daily life" 
                icon={<Star size={24} strokeWidth={1.5} />} 
                href="https://instagram.com" 
              />
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
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
          />
          <LemonyShopPro project={projects[0]} />
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
          />
          <LemonyShop project={projects[1]} />
        </div>

        {/* Project 3: Rules of Horror (Horror) */}
        <div className="bg-neutral-950 transition-colors duration-700">
          <SectionDivider 
            title={projects[2].title} 
            subtitle={projects[2].category} 
            index={2} 
            theme="dark"
            prevBgClass="bg-white"
            currentBgClass="bg-neutral-950"
          />
          <RulesOfHorror project={projects[2]} />
        </div>

      </section>

      {/* 4. HORROR PORTAL */}
      <section className="relative z-10 w-full">
         <HorrorPortalButton />
      </section>

    </main>
  );
}
