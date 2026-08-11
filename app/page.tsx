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

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] text-white mb-8 drop-shadow-lg">
              Hi, I'm <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 animate-gradient-text">Dia.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-slate-400 max-w-2xl font-medium leading-relaxed mb-12">
              นักพัฒนาที่หลงใหลในศิลปะ <span className="text-pink-400 font-[family-name:var(--font-pixel)] tracking-widest">Pixel Art</span> สร้างสรรค์ประสบการณ์บนเว็บไซต์และมินิเกม เพื่อเปลี่ยนไอเดียให้กลายเป็นโค้ดที่จับต้องได้
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link href="#about" className="group px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono font-bold tracking-widest uppercase rounded-lg transition-all hover:scale-105">
                Read My Story
              </Link>
            </div>
          </motion.div>
        </section>

        {/* =========================================
            2. MY PURPOSE & JOURNEY (About Me)
            ========================================= */}
        <section id="about" className="w-full bg-[#0a0f1c] border-y border-slate-800 py-32 md:py-48 relative z-20">
          <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row gap-16 md:gap-32 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="w-48 h-48 md:w-64 md:h-64 shrink-0 rounded-3xl overflow-hidden border-4 border-slate-800 shadow-[20px_20px_0_0_rgba(15,23,42,1)] bg-slate-900 relative"
            >
              <Image 
                src="/จอตั้ง.png" 
                alt="Dia Avatar"
                fill
                className="object-cover object-top opacity-90"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex-1"
            >
              <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] text-white mb-8 uppercase tracking-wider">
                Who am I?
              </h2>
              <div className="space-y-6 text-slate-400 text-lg md:text-xl leading-loose font-medium">
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
            3. WHAT I'M BUILDING (Recent Explorations)
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
            4. COMMUNITY & SERVICES (The Funnel)
            ========================================= */}
        <section className="max-w-6xl mx-auto px-6 pb-32 md:pb-48">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            
            {/* Left: Community */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-amber-100/10 border-2 border-amber-100/30 rounded-[2rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-900/30 border border-amber-800/50 mb-6">
                  <span className="font-mono text-xs tracking-widest text-amber-300 uppercase">Community</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-pixel)] text-amber-100/90 mb-4 tracking-widest uppercase">
                  Midnight Cafe
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  อยากคุยเรื่องโค้ด เรื่องเกม หรือหาเพื่อนทำโปรเจกต์สนุกๆ? แวะมาจิบกาแฟพูดคุยกันในคอมมูนิตี้ของเราได้นะครับ เปิดรับทุกคนเลย!
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <a href="https://discord.gg/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 px-6 py-4 bg-[#5865F2] hover:bg-[#4752C4] text-white font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(88,101,242,0.4)]">
                  <MessageSquare className="w-5 h-5" /> Join Discord
                </a>
              </div>
            </motion.div>

            {/* Right: Hire Me */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-sky-900/20 border-2 border-sky-500/30 rounded-[2rem] p-10 md:p-16 relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
              
              <div className="relative z-10 mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-900/50 border border-sky-800/50 mb-6">
                  <span className="font-mono text-xs tracking-widest text-sky-300 uppercase">Freelance</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-[family-name:var(--font-pixel)] text-sky-100/90 mb-4 tracking-widest uppercase">
                  Let's Work Together
                </h3>
                <p className="text-slate-400 text-lg leading-relaxed">
                  มีโปรเจกต์เจ๋งๆ ที่อยากให้ผมช่วยเนรมิตให้เป็นจริงไหม? ลองเข้ามาดูแพ็กเกจรับทำเว็บ มินิเกม หรือคุยเรื่องไอเดียกันได้เลย
                </p>
              </div>

              <div className="relative z-10 flex flex-col sm:flex-row gap-4">
                <Link href="/services" className="flex items-center justify-center gap-3 px-6 py-4 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold tracking-widest uppercase rounded-xl transition-all shadow-[0_0_15px_rgba(14,165,233,0.4)]">
                  <ArrowRight className="w-5 h-5" /> View Services
                </Link>
              </div>
            </motion.div>

          </div>
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
