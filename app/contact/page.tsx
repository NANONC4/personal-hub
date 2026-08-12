"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { PixelStar, PixelMail, PixelCoffee } from "@/components/PixelIcons";
import { Star, ExternalLink } from "lucide-react";
import PixelSky from "@/components/PixelSky";

const reviews = [
  {
    author: "คุณ P***",
    project: "ออกแบบและพัฒนาเว็บไซต์บริษัท",
    rating: 5,
    text: "ทำงานเร็วมากครับ โค้ดเป็นระเบียบสุดๆ แก้ไขงานตามที่บรีฟได้เป๊ะ แนะนำเลยครับสำหรับคนที่หาโปรแกรมเมอร์เก่งๆ",
    date: "12 Mar 2024"
  },
  {
    author: "คุณ A***",
    project: "มินิเกมบนเว็บสำหรับแคมเปญ",
    rating: 5,
    text: "ประทับใจความรับผิดชอบและไอเดียที่ช่วยเสนอครับ ตัวเกมออกมาสนุกและสมูทกว่าที่คิดไว้เยอะเลย",
    date: "05 Feb 2024"
  },
  {
    author: "คุณ S***",
    project: "ปรับปรุง UI/UX ระบบหลังบ้าน",
    rating: 5,
    text: "ให้คำปรึกษาดีมาก ตอบแชทไว งานออกมาสวยและใช้งานง่ายขึ้นมากครับ โอกาสหน้าใช้บริการอีกแน่นอน",
    date: "28 Jan 2024"
  }
];

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-[family-name:var(--font-geist-sans)] pt-24 selection:bg-pink-500/30 overflow-x-hidden flex flex-col">
      {/* Background */}
      <PixelSky className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 py-12 lg:py-16 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-pink-900/30 border border-pink-800/50 mb-6"
        >
          <PixelStar className="w-4 h-4 text-pink-400 animate-pulse" color="currentColor" />
          <span className="font-mono text-xs tracking-widest text-pink-300 uppercase">Get In Touch</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-[0_4px_20px_rgba(236,72,153,0.3)]"
        >
          Reviews & Contact
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 leading-relaxed text-lg max-w-2xl"
        >
          Ready to start a project or just want to say hi? Reach out via any of the channels below. But first, here's what my clients have to say.
        </motion.p>
      </section>

      {/* Fastwork Reviews Section */}
      <section className="max-w-5xl mx-auto px-6 pb-20 w-full">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden w-full"
        >
          {/* Fastwork Badge/Header */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12 border-b border-slate-800 pb-8">
            <div className="flex items-center gap-4">
              <img src="/fastwork.png" alt="Fastwork" className="w-12 h-12 rounded-xl" />
              <div className="text-left">
                <h2 className="text-2xl font-bold text-white font-[family-name:var(--font-pixel)] uppercase">Verified Reviews</h2>
                <div className="flex items-center gap-2 mt-1">
                  <div className="flex text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-slate-400 text-sm font-mono">5.0/5.0 Rating</span>
                </div>
              </div>
            </div>
            
            <a 
              href="https://fastwork.co/user/nanonc4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-lg hover:bg-slate-200 transition-colors"
            >
              Hire me on Fastwork <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Review Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, idx) => (
              <div key={idx} className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80 flex flex-col justify-between">
                <div>
                  <div className="flex text-amber-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                </div>
                <div className="flex flex-col border-t border-slate-800/80 pt-4">
                  <span className="font-bold text-white text-sm">{review.author}</span>
                  <span className="text-xs text-slate-500 font-mono mt-1">{review.project}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Midnight Cafe Contact Section */}
      <section className="relative w-full bg-[#09090b] text-slate-300 py-24 px-6 md:px-12 border-t-8 border-slate-900 overflow-hidden flex-grow flex items-center justify-center">
        {/* Background Streetlamp Glow */}
        <div className="absolute top-0 right-[20%] w-96 h-96 bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-[10%] w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-6xl w-full mx-auto flex flex-col md:flex-row gap-16 items-center justify-between relative z-10">
          
          {/* Left Side: Coffee & Vibe */}
          <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8 }}
              className="mb-8 relative"
            >
              <div className="relative inline-block group">
                <PixelCoffee className="w-24 h-24 text-slate-200 opacity-90 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                {/* Steam animation */}
                <motion.div 
                  className="absolute -top-8 left-1/2 w-4 h-4 bg-white/20 blur-sm rounded-full"
                  animate={{ y: [-10, -40], x: [0, -10, 10, 0], opacity: [0, 0.5, 0], scale: [1, 2] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
                <motion.div 
                  className="absolute -top-4 left-1/3 w-3 h-3 bg-white/20 blur-sm rounded-full"
                  animate={{ y: [-5, -35], x: [0, 10, -5, 0], opacity: [0, 0.4, 0], scale: [1, 1.5] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", delay: 1 }}
                />
              </div>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-[family-name:var(--font-pixel)] text-3xl md:text-5xl text-amber-100/90 mb-4 tracking-widest uppercase"
            >
              Midnight Cafe
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-slate-400 max-w-sm text-sm leading-relaxed"
            >
              ชอบผลงานใช่ไหม? แวะมาจิบกาแฟพูดคุยโปรเจกต์กันได้นะ ☕<br/><br/>
              I'm currently available for freelance work, creative coding, and bringing your aesthetic ideas to life. Let's craft something beautiful together.
            </motion.p>
          </div>

          {/* Right Side: Quick Contact Cards */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: false }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex-1 w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-4 relative"
          >
            {/* Card 1: Email */}
            <a href="mailto:DiaFrampton771@gmail.com" className="flex flex-col justify-between bg-amber-100/10 border-2 border-amber-100/40 p-6 rounded-xl shadow-[4px_4px_0_0_rgba(254,243,199,0.3)] hover:shadow-[0px_0px_0_0_rgba(254,243,199,0)] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-amber-100/15 group relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-6 relative z-10 opacity-80">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-100/50 tracking-widest">SYS.MSG.01</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-100" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100/20 border-2 border-amber-100/50 flex items-center justify-center">
                    <PixelMail className="w-4 h-4 text-sky-400" />
                  </div>
                  <h4 className="font-[family-name:var(--font-pixel)] text-sm text-sky-400 font-bold tracking-widest uppercase relative z-10">Email</h4>
                </div>
                <p className="font-mono text-xs font-semibold text-amber-100/70 group-hover:text-amber-100 transition-colors relative z-10 break-all">DiaFrampton771@gmail.com</p>
              </div>
            </a>

            {/* Card 2: Discord */}
            <a href="#" className="flex flex-col justify-between bg-amber-100/10 border-2 border-amber-100/40 p-6 rounded-xl shadow-[4px_4px_0_0_rgba(254,243,199,0.3)] hover:shadow-[0px_0px_0_0_rgba(254,243,199,0)] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-amber-100/15 group relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-6 relative z-10 opacity-80">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-100/50 tracking-widest">SYS.MSG.02</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-100" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100/20 border-2 border-amber-100/50 flex items-center justify-center">
                    <div className="text-indigo-400 font-mono font-bold text-lg leading-none">#</div>
                  </div>
                  <h4 className="font-[family-name:var(--font-pixel)] text-sm text-indigo-400 font-bold tracking-widest uppercase relative z-10">Discord</h4>
                </div>
                <p className="font-mono text-xs font-semibold text-amber-100/70 group-hover:text-amber-100 transition-colors relative z-10 break-all">@chatchai.dev</p>
              </div>
            </a>

            {/* Card 3: Facebook */}
            <a href="#" className="flex flex-col justify-between bg-amber-100/10 border-2 border-amber-100/40 p-6 rounded-xl shadow-[4px_4px_0_0_rgba(254,243,199,0.3)] hover:shadow-[0px_0px_0_0_rgba(254,243,199,0)] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-amber-100/15 group relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-6 relative z-10 opacity-80">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-100/50 tracking-widest">SYS.MSG.03</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-100" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100/20 border-2 border-amber-100/50 flex items-center justify-center">
                    <div className="text-blue-400 font-mono font-bold text-lg leading-none">f</div>
                  </div>
                  <h4 className="font-[family-name:var(--font-pixel)] text-sm text-blue-400 font-bold tracking-widest uppercase relative z-10">Facebook</h4>
                </div>
                <p className="font-mono text-xs font-semibold text-amber-100/70 group-hover:text-amber-100 transition-colors relative z-10 break-all">Chatchai Danrungruang</p>
              </div>
            </a>

            {/* Card 4: LINE */}
            <a href="#" className="flex flex-col justify-between bg-amber-100/10 border-2 border-amber-100/40 p-6 rounded-xl shadow-[4px_4px_0_0_rgba(254,243,199,0.3)] hover:shadow-[0px_0px_0_0_rgba(254,243,199,0)] transition-all duration-200 hover:translate-x-[4px] hover:translate-y-[4px] hover:bg-amber-100/15 group relative overflow-hidden h-full">
              <div className="flex justify-between items-center mb-6 relative z-10 opacity-80">
                <span className="font-[family-name:var(--font-pixel)] text-[10px] text-amber-100/50 tracking-widest">SYS.MSG.04</span>
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0ms' }} />
                  <div className="w-1.5 h-1.5 bg-amber-100/70 rounded-full animate-pulse opacity-100" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-100/20 border-2 border-amber-100/50 flex items-center justify-center">
                    <div className="text-emerald-400 font-mono font-bold text-lg leading-none">L</div>
                  </div>
                  <h4 className="font-[family-name:var(--font-pixel)] text-sm text-emerald-400 font-bold tracking-widest uppercase relative z-10">LINE ID</h4>
                </div>
                <p className="font-mono text-xs font-semibold text-amber-100/70 group-hover:text-amber-100 transition-colors relative z-10 break-all">@chatchai.work</p>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
