"use client";

import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import { PixelStar, PixelMail, PixelPhone } from "@/components/PixelIcons";
import SocialLinkButton from "@/components/SocialLinkButton";
import { Star, ExternalLink } from "lucide-react";

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
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-[family-name:var(--font-geist-sans)] pt-24 selection:bg-pink-500/30 overflow-x-hidden">
      
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
      <section className="max-w-5xl mx-auto px-6 pb-20">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 md:p-12 relative overflow-hidden"
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
              <div key={idx} className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800/80">
                <div className="flex text-amber-400 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-6 italic">"{review.text}"</p>
                <div className="flex flex-col border-t border-slate-800/80 pt-4">
                  <span className="font-bold text-white text-sm">{review.author}</span>
                  <span className="text-xs text-slate-500 font-mono mt-1">{review.project}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Direct Contact Links */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col gap-4"
        >
          <h3 className="text-xl font-[family-name:var(--font-pixel)] text-center text-slate-300 uppercase mb-4">Direct Contact</h3>
          
          <SocialLinkButton 
            title="Email Me" 
            subtitle="DiaFrampton771@gmail.com" 
            icon={<PixelMail />} 
            href="mailto:DiaFrampton771@gmail.com" 
            copyText="DiaFrampton771@gmail.com"
            index={0}
          />
          
          <SocialLinkButton 
            title="Call Me" 
            subtitle="062-990-7862" 
            icon={<PixelPhone />} 
            href="tel:0629907862" 
            copyText="062-990-7862"
            index={1}
          />

          <SocialLinkButton 
            title="LinkedIn" 
            subtitle="Professional network" 
            icon={<img src="/linkedin-svgrepo-com.svg" alt="LinkedIn" className="w-6 h-6" />} 
            href="https://www.linkedin.com/in/%E0%B8%89%E0%B8%B1%E0%B8%95%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B8%A2-%E0%B8%94%E0%B9%88%E0%B8%B2%E0%B8%99%E0%B8%A3%E0%B8%B8%E0%B9%88%E0%B8%87%E0%B9%80%E0%B8%A3%E0%B8%B7%E0%B8%AD%E0%B8%87-1478213aa/" 
            index={2}
          />
          
          <SocialLinkButton 
            title="GitHub" 
            subtitle="Open source contributions" 
            icon={<img src="/github-142-svgrepo-com.svg" alt="GitHub" className="w-6 h-6" />} 
            href="https://github.com/NANONC4" 
            index={3}
          />
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
