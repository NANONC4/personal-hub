"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import PixelSky from "@/components/PixelSky";
import { PixelHeart } from "@/components/PixelIcons";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import { ArrowRight, MessageSquare, Terminal } from "lucide-react";

import { Lens } from "@/components/Lens";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { WebDevBackground, GamesBackground, QueueBackground, CommunityBackground } from "@/components/BentoAnimations";
import { Code2, Gamepad2, CalendarDays } from "lucide-react";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { KineticText } from "@/components/KineticText";
import { PixelImage } from "@/components/PixelImage";
import { DiaTextReveal } from "@/components/DiaTextReveal";
import { IconCloud } from "@/components/IconCloud";

const features = [
  {
    Icon: Code2,
    name: "Web Development",
    description: "รับทำเว็บไซต์ระดับพรีเมียม ใส่ใจทั้งเรื่อง Code Performance และงาน UI/UX",
    href: "/services",
    cta: "View Service",
    className: "col-span-1 md:col-span-2",
    background: <WebDevBackground />,
  },
  {
    Icon: Gamepad2,
    name: "Mini Games",
    description: "สร้างเกมบนเว็บและประสบการณ์ Interactive ด้วย Pixel Art",
    href: "/services",
    cta: "View Service",
    className: "col-span-1",
    background: <GamesBackground />,
  },
  {
    Icon: CalendarDays,
    name: "Queue Status",
    description: "Available - ตอนนี้คิวว่าง พร้อมรับโปรเจกต์ใหม่!",
    href: "/services",
    cta: "Book Now",
    className: "col-span-1",
    background: <QueueBackground />,
  },
  {
    Icon: MessageSquare,
    name: "Midnight Cafe",
    description: "แวะมาจิบกาแฟ คุยเรื่องโค้ด เรื่องเกม หรือหาเพื่อนทำโปรเจกต์ด้วยกัน",
    href: "https://discord.gg/",
    cta: "Join Discord",
    className: "col-span-1 md:col-span-2",
    background: <CommunityBackground />,
  },
];

export default function HomePage() {
  // Select top 3 projects to showcase
  const topProjects = projects.slice(0, 3);

  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 selection:bg-pink-500/30 overflow-x-hidden pt-24 font-[family-name:var(--font-geist-sans)]">
      {/* Background */}
      <PixelSky className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      <div className="relative z-10 w-full">
        
        {/* =========================================
            1. THE WELCOME (Hero Section)
            ========================================= */}
        <section className="max-w-6xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-start min-h-[90vh] justify-center pb-20">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 mb-10">
              <span className="animate-pulse">👾</span>
              <span className="font-mono text-sm tracking-widest text-slate-300 uppercase">Welcome to my digital space</span>
            </div>

            <div className="mb-10 flex flex-wrap items-end gap-3 md:gap-4">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] text-foreground drop-shadow-lg flex flex-wrap items-end gap-3 md:gap-4">
                <KineticText text="Hi," />
                <KineticText text="I'm" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 animate-gradient-text inline-block">
                  <KineticText text="Dia." />
                </span>
              </h1>
            </div>
            
            <div className="mb-12 flex flex-wrap items-center gap-4 text-3xl md:text-5xl font-[family-name:var(--font-pixel)] drop-shadow-lg">
              <KineticText text="Creative" className="text-pink-400" />
              <KineticText text="Developer" className="text-sky-400" />
            </div>

            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed mb-12">
              นักพัฒนาที่หลงใหลในศิลปะ <span className="text-pink-400 font-[family-name:var(--font-pixel)] tracking-widest">Pixel Art</span> สร้างสรรค์ประสบการณ์บนเว็บไซต์และมินิเกม เพื่อเปลี่ยนไอเดียให้กลายเป็นโค้ดที่จับต้องได้
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <InteractiveHoverButton 
                asLink 
                href="#about" 
                text="Read My Story" 
                className="w-56 h-12 text-base"
              />
            </div>
          </motion.div>
        </section>

        {/* =========================================
            2. MY PURPOSE & JOURNEY (About Me)
            ========================================= */}
        <section id="about" className="w-full relative z-20 transition-colors duration-300 overflow-hidden min-h-screen flex flex-col justify-center bg-[#0a0f1c]/80 backdrop-blur-2xl border-y border-slate-800/60 py-24">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:32px_32px]" />
          
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 relative z-10">
            
            {/* Left side: Avatar (Floating & Unified) */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative group shrink-0"
            >
              {/* Soft glow behind the avatar */}
              <div className="absolute -inset-4 bg-gradient-to-r from-sky-500/20 to-purple-500/20 blur-2xl rounded-full opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
              
              <div className="w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 shrink-0 rounded-3xl overflow-hidden border-2 border-slate-700/50 shadow-[0_0_40px_rgba(0,0,0,0.5)] bg-[#0a0f1c] relative z-10 transition-all hover:scale-[1.02] duration-500 hover:border-slate-500/50 hover:shadow-[0_0_50px_rgba(56,189,248,0.15)]">
                <PixelImage 
                  src="/จอตั้ง.png" 
                  alt="Dia Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>

            {/* Right side: Text (Elegant Typography) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col justify-center max-w-xl text-left"
            >
              <div className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] mb-8 uppercase tracking-wider text-white relative">
                <DiaTextReveal text="Who am I?" />
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-sky-400 to-pink-500 rounded-full hidden md:block" />
              </div>
              <div className="space-y-6 text-slate-300 text-lg md:text-xl leading-relaxed font-medium">
                <p>
                  ผมเป็น <strong className="text-white font-bold">Creative Developer</strong> ที่เชื่อว่าเว็บไซต์ไม่ควรเป็นแค่หน้ากระดาษแบนๆ แต่ควรเป็น "พื้นที่" (Space) ที่ให้ความรู้สึกเหมือนมีชีวิต
                </p>
                <p>
                  จุดเริ่มต้นของผมมาจากการชอบเล่นเกมยุค 90s และความหลงใหลในความคลาสสิกของ <span className="text-pink-400 font-[family-name:var(--font-pixel)] tracking-widest text-sm uppercase">Pixel Art</span> ผมจึงตั้งใจนำกลิ่นอายความ Nostalgia เหล่านั้น มาผสมผสานกับเทคโนโลยีเว็บสมัยใหม่ เพื่อสร้างประสบการณ์ที่ทำให้คนที่เข้ามาดูรู้สึก "ว้าว"
                </p>
                <p className="border-l-2 border-slate-700 pl-4 text-slate-400 italic">
                  เป้าหมายของผมคือการ <strong className="text-white not-italic font-bold">"ทลายขอบเขตระหว่างงานศิลปะและการเขียนโค้ด"</strong> ทุกบรรทัดที่ผมเขียน คือความพยายามในการสร้างโลกใบเล็กๆ ที่มีเอกลักษณ์เฉพาะตัวให้ทุกคนได้สัมผัสครับ
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            3. MY ARSENAL (Tech Stack Icon Cloud)
            ========================================= */}
        <section className="w-full py-32 md:py-48 relative z-20 transition-colors duration-300 overflow-hidden">
          <div className="w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-[family-name:var(--font-pixel)] text-white mb-6 uppercase tracking-wider">
                My Arsenal
              </h2>
              <p className="text-slate-400 font-mono text-base tracking-widest uppercase">
                Tools & Technologies I use to build digital spaces
              </p>
            </div>
            
            <div className="h-[400px] md:h-[600px] w-full flex items-center justify-center relative overflow-hidden transition-all duration-300">
              <IconCloud 
                slugs={[
                  "react", "nextdotjs", "typescript", "javascript", "nodedotjs",
                  "tailwindcss", "framer", "figma", "github", "git",
                  "vercel", "visualstudiocode", "unity", "csharp", "html5", "css3"
                ]} 
              />
            </div>
          </div>
        </section>

        {/* =========================================
            4. CREATIVE SANDBOX (Projects)
            ========================================= */}
        <section className="w-full bg-[#0a0f1c]/80 backdrop-blur-2xl border-y border-slate-800/60 relative z-20 py-32 md:py-48 mb-32">
          <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <Terminal className="w-6 h-6 text-sky-400" />
                <span className="font-mono text-sky-400 uppercase tracking-widest text-base">Recent Explorations</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-[family-name:var(--font-pixel)] text-white uppercase tracking-wider">
                What I've Built
              </h2>
            </div>
            
            <Link href="/portfolio" className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-mono uppercase tracking-widest text-sm">
              View all works <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topProjects.map((project, idx) => (
              <motion.div 
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative flex flex-col bg-slate-900/60 rounded-3xl overflow-hidden border border-slate-800 hover:border-sky-500/50 transition-all hover:-translate-y-2 shadow-lg"
              >
                <div className="relative h-56 md:h-64 w-full bg-slate-950">
                  <Lens zoomFactor={1.8} lensSize={160}>
                    <div className="relative w-full h-full">
                      <Image
                        src={project.gallery[0]}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90" />
                    </div>
                  </Lens>
                </div>
                <div className="p-8 md:p-10 flex flex-col flex-grow relative z-10 bg-slate-900/60">
                  <h3 className="text-xl font-bold text-white mb-4 font-[family-name:var(--font-pixel)] uppercase tracking-wide">
                    {project.title}
                  </h3>
                  <p className="text-sm md:text-base text-slate-400 line-clamp-3 mb-6 flex-grow leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.slice(0, 3).map((tech) => (
                      <span key={tech} className="px-2 py-1 bg-slate-800 text-[10px] font-mono text-slate-300 rounded border border-slate-700">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 flex justify-center">
            <Link href="/showreel" className="group relative px-8 py-4 bg-transparent border-2 border-pink-500/50 hover:bg-pink-500 text-pink-400 hover:text-white font-mono font-bold tracking-widest uppercase rounded-lg transition-all">
              <span className="flex items-center gap-2">
                Experience Full Showreel <PixelHeart className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </div>
          </div>
        </section>

        {/* =========================================
            5. SERVICES & COMMUNITY (Bento Grid)
            ========================================= */}
        <section className="max-w-6xl mx-auto px-6 pb-32 md:pb-48">
          <BentoGrid>
            {features.map((feature, idx) => (
              <BentoCard key={idx} {...feature} />
            ))}
          </BentoGrid>
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
