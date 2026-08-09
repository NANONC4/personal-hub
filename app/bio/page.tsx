"use client";

import { motion } from "framer-motion";
import ProfileSection from "@/components/ProfileSection";
import SocialLinkButton from "@/components/SocialLinkButton";
import PixelSky from "@/components/PixelSky";
import { PixelMail, PixelPhone, PixelHeart } from "@/components/PixelIcons";

export default function BioPage() {
  const handleUnlockAndScroll = (e: React.MouseEvent) => {
    e.preventDefault();
    // In the standalone /bio page, maybe this should link directly to /showreel or /portfolio
    window.location.href = '/portfolio';
  };

  return (
    <main className="relative min-h-screen font-[family-name:var(--font-geist-sans)] selection:bg-sky-500/30 overflow-x-hidden pt-24">
      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-blue-100 -z-20" />
      <PixelSky className="fixed inset-0 opacity-80 pointer-events-none -z-10" />

      <section className="relative z-10 w-full flex flex-col items-center justify-center overflow-hidden py-10">
        <div className="w-full max-w-[1600px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 px-6 md:px-12 relative z-10">
          
          {/* Left Side: Profile */}
          <div className="flex-shrink-0">
            <ProfileSection />
          </div>

          {/* Right Side: Links */}
          <div className="w-full max-w-xl flex-shrink-0">
            <motion.div 
              initial="hidden"
              animate="show"
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
                  href="/portfolio" 
                  highlighted={true}
                  index={0}
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
    </main>
  );
}
