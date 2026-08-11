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
        <section className="max-w-5xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-start min-h-[90vh] justify-center pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/80 border border-slate-700/50 mb-8">
              <span className="animate-pulse">👾</span>
              <span className="font-mono text-sm tracking-widest text-slate-300 uppercase">Welcome to my digital space</span>
            </div>

            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-foreground drop-shadow-lg flex items-end gap-4">
                <KineticText text="Hi, I'm" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 animate-gradient-text inline-block">
                  <KineticText text="Dia." />
                </span>
              </h1>
            </div>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed mb-12">
              นักพัฒนาที่หลงใหลในศิลปะ <span className="text-pink-400 font-[family-name:var(--font-pixel)] tracking-widest">Pixel Art</span> สร้างสรรค์ประสบการณ์บนเว็บไซต์และมินิเกม เพื่อเปลี่ยนไอเดียให้กลายเป็นโค้ดที่จับต้องได้
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <InteractiveHoverButton 
                asLink 
                href="#about" 
                text="Read My Story" 
                className="w-56"
              />
            </div>
          </motion.div>
        </section>

        {/* =========================================
            2. MY PURPOSE & JOURNEY (About Me)
            ========================================= */}
        <section id="about" className="w-full bg-background border-y border-slate-200 dark:border-slate-800 py-32 md:py-48 relative z-20 transition-colors duration-300">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-32 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 shadow-[20px_20px_0_0_rgba(15,23,42,0.1)] dark:shadow-[20px_20px_0_0_rgba(15,23,42,1)] bg-slate-100 dark:bg-slate-900 relative transition-all duration-300"
            >
              <PixelImage 
                src="/จอตั้ง.png" 
                alt="Dia Avatar"
                className="w-full h-full"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1"
            >
              <div className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] mb-8 uppercase tracking-wider h-16">
                <DiaTextReveal text="Who am I?" />
              </div>
              <div className="space-y-6 text-slate-600 dark:text-slate-400 text-lg md:text-xl leading-loose font-medium transition-colors duration-300">
                <p>
                  ผมเป็น <strong>Creative Developer</strong> ที่เชื่อว่าเว็บไซต์ไม่ควรเป็นแค่หน้ากระดาษแบนๆ แต่ควรเป็น "พื้นที่" (Space) ที่ให้ความรู้สึกเหมือนมีชีวิต
                </p>
                <p>
                  จุดเริ่มต้นของผมมาจากการชอบเล่นเกมยุค 90s และความหลงใหลในความคลาสสิกของ Pixel Art ผมจึงตั้งใจนำกลิ่นอายความ Nostalgia เหล่านั้น มาผสมผสานกับเทคโนโลยีเว็บสมัยใหม่ เพื่อสร้างประสบการณ์ที่ทำให้คนที่เข้ามาดูรู้สึก "ว้าว"
                </p>
                <p>
                  เป้าหมายของผมคือการ <strong>"ทลายขอบเขตระหว่างงานศิลปะและการเขียนโค้ด"</strong> ทุกบรรทัดที่ผมเขียน คือความพยายามในการสร้างโลกใบเล็กๆ ที่มีเอกลักษณ์เฉพาะตัวให้ทุกคนได้สัมผัสครับ
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            3. MY ARSENAL (Tech Stack Icon Cloud)
            ========================================= */}
        <section className="w-full bg-slate-100 dark:bg-slate-950/50 py-24 md:py-32 relative z-20 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300 overflow-hidden">
          <div className="max-w-6xl mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] text-foreground mb-4 uppercase tracking-wider">
                My Arsenal
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-mono text-sm tracking-widest uppercase">
                Tools & Technologies I use to build digital spaces
              </p>
            </div>
            
            <div className="h-[400px] md:h-[500px] w-full rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0a0f1c] shadow-xl dark:shadow-[0_0_50px_-12px_rgba(236,72,153,0.1)] flex items-center justify-center relative overflow-hidden transition-all duration-300">
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
        <section className="max-w-6xl mx-auto px-6 py-32 md:py-48">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
          >
            <div>
              <div className="inline-flex items-center gap-2 mb-4">
                <Terminal className="w-5 h-5 text-sky-400" />
                <span className="font-mono text-sky-400 uppercase tracking-widest text-sm">Recent Explorations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pixel)] text-white uppercase tracking-wider">
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
          
          <div className="mt-12 flex justify-center">
            <Link href="/showreel" className="group relative px-8 py-4 bg-transparent border-2 border-pink-500/50 hover:bg-pink-500 text-pink-400 hover:text-white font-mono font-bold tracking-widest uppercase rounded-lg transition-all">
              <span className="flex items-center gap-2">
                Experience Full Showreel <PixelHeart className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </div>
        </section>

        {/* =========================================
            4. SERVICES & COMMUNITY (Bento Grid)
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
