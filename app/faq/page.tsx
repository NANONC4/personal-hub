"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Footer from "@/components/Footer";
import { ChevronDown } from "lucide-react";
import { PixelStar } from "@/components/PixelIcons";
import PulseDotsBackground from "@/components/PulseDotsBackground";

const faqs = [
  {
    question: "รับเขียนเว็บด้วย Framework อะไรบ้าง?",
    answer: "หลักๆ ผมถนัดและเชี่ยวชาญ Next.js, React และ Tailwind CSS ครับ เพราะให้ประสิทธิภาพที่ดีที่สุดและโหลดไวมาก แต่ถ้าลูกค้าต้องการใช้ Vue หรือ HTML/CSS ธรรมดาก็สามารถทำได้เช่นกันครับ"
  },
  {
    question: "ระยะเวลาในการทำงานแต่ละโปรเจกต์นานแค่ไหน?",
    answer: "ขึ้นอยู่กับสเกลงานครับ: \n- หน้า Link-in-Bio: 3-5 วัน\n- เว็บไซต์หน้าเดียว (Landing Page): 1-2 สัปดาห์\n- เว็บไซต์ระบบหลังบ้าน (Full-stack): 3-4 สัปดาห์\n- มินิเกม (Mini Game): 2-4 สัปดาห์"
  },
  {
    question: "รับแก้บั๊ก หรืองานแก้โค้ดคนอื่นไหม?",
    answer: "รับครับ! แต่จะต้องขอประเมินโครงสร้างโค้ดเดิมก่อน ถ้าโค้ดเดิมเป็น React/Next.js จะพิจารณาเป็นพิเศษครับ"
  },
  {
    question: "จ้างทำมินิเกม เอาไปลงที่ไหนได้บ้าง?",
    answer: "เกมที่ผมพัฒนาจะเป็นรูปแบบ WebGL (เล่นบนบราวเซอร์) สามารถนำไปแปะบนเว็บไซต์หลักของลูกค้า หรือเล่นผ่านมือถือได้เลยโดยไม่ต้องโหลดแอปครับ เหมาะกับการทำแคมเปญการตลาดมากๆ"
  },
  {
    question: "มีบริการออกแบบ UI/UX ให้ด้วยไหม?",
    answer: "มีครับ! ผมสามารถรับจบตั้งแต่การออกแบบ Figma (Wireframe/UI) ไปจนถึงการเขียนโค้ดออกมาให้ใช้งานได้จริง 100% เลยครับ"
  }
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-[family-name:var(--font-geist-sans)] pt-24 selection:bg-purple-500/30 overflow-x-hidden">
      {/* Background */}
      <PulseDotsBackground className="fixed inset-0 z-0 opacity-100 pointer-events-none" />
      
      {/* Header */}
      <section className="max-w-3xl mx-auto px-6 py-12 lg:py-16 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-900/30 border border-purple-800/50 mb-6"
        >
          <PixelStar className="w-4 h-4 text-purple-400 animate-spin-slow" color="currentColor" />
          <span className="font-mono text-xs tracking-widest text-purple-300 uppercase">Information</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-white mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-[0_4px_20px_rgba(168,85,247,0.3)]"
        >
          FAQ
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-slate-400 leading-relaxed text-lg"
        >
          Frequently Asked Questions about my freelance services, tech stack, and workflow.
        </motion.p>
      </section>

      {/* Accordion List */}
      <section className="max-w-3xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col gap-4"
        >
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-2xl overflow-hidden transition-colors duration-300 ${isOpen ? 'bg-slate-900/80 border-purple-500/50 shadow-[0_0_20px_rgba(168,85,247,0.1)]' : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'}`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none"
                >
                  <span className="font-bold text-white text-lg pr-4">{faq.question}</span>
                  <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                </button>
                
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-slate-300 leading-relaxed whitespace-pre-line border-t border-slate-800 pt-4 mt-2">
                    {faq.answer}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </motion.div>
        
        {/* Still have questions CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-slate-400 mb-4">Still have questions?</p>
          <a href="/contact" className="inline-block px-8 py-3 rounded-lg border-2 border-purple-500/50 text-purple-400 hover:bg-purple-500 hover:text-white font-mono uppercase tracking-widest transition-all">
            Contact Me
          </a>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
