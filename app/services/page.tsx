"use client";

import { motion, Variants } from "framer-motion";
import Footer from "@/components/Footer";
import { PixelStar, PixelSparkle } from "@/components/PixelIcons";
import PixelSky from "@/components/PixelSky";
import { Code, Gamepad2, LayoutPanelLeft, Clock, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", bounce: 0.4 } }
  };

  return (
    <main className="min-h-screen bg-[#050B14] text-slate-200 font-[family-name:var(--font-geist-sans)] pt-24 selection:bg-sky-500/30 overflow-x-hidden">
      {/* Background */}
      <PixelSky className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 py-12 lg:py-16 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/30 border border-blue-800/50 mb-6"
        >
          <PixelStar className="w-4 h-4 text-sky-400 animate-spin-slow" color="currentColor" />
          <span className="font-mono text-xs tracking-widest text-sky-300 uppercase">Hire Me</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black tracking-tight text-white mb-6 font-[family-name:var(--font-pixel)] uppercase drop-shadow-[0_4px_20px_rgba(56,189,248,0.3)]"
        >
          Services & Pricing
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl text-slate-400 leading-relaxed mb-8 text-lg"
        >
          I specialize in building high-performance web applications, creative bio pages, and interactive mini-games. Choose a package below or contact me for a custom quote.
        </motion.p>
      </section>

      {/* Packages Grid */}
      <section className="max-w-7xl mx-auto px-6 pb-48">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10"
        >
          {/* Package 1: Web Application */}
          <motion.div variants={itemVariants} className="lg:col-span-7 group relative flex flex-col bg-[#050810] rounded-[2.5rem] overflow-hidden border border-slate-800/80 hover:border-sky-500/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(56,189,248,0.15)] hover:-translate-y-2">
            <div className="p-8 flex-grow">
              <div className="w-14 h-14 rounded-2xl bg-sky-500/20 flex items-center justify-center mb-6 text-sky-400 border border-sky-500/30 shadow-[inset_0_0_15px_rgba(56,189,248,0.2)]">
                <Code className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-pixel)] tracking-wide">Web App</h3>
              <p className="text-slate-400 mb-6 min-h-[3rem]">Full-stack websites, e-commerce, or interactive landing pages.</p>
              
              <div className="mb-6">
                <span className="text-3xl font-black text-sky-400">฿15,000</span>
                <span className="text-slate-500 ml-2">Starting</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" /> Custom Design & UI/UX
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" /> Responsive Mobile-Ready
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" /> Admin Dashboard (Optional)
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0" /> SEO Optimization
                </li>
              </ul>
            </div>
            <div className="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/40 flex flex-col justify-center min-w-[300px]">
              <a href="/contact" className="block w-full py-4 text-center bg-purple-500/10 hover:bg-purple-500 text-purple-400 hover:text-white rounded-xl font-mono tracking-widest uppercase transition-colors border border-purple-500/30">
                Get Quote
              </a>
            </div>
          </motion.div>

          {/* Package 2: Mini Games */}
          <motion.div variants={itemVariants} className="lg:col-span-5 group relative flex flex-col bg-[#050810] rounded-[2.5rem] overflow-hidden border border-slate-800/80 hover:border-pink-500/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(236,72,153,0.15)] hover:-translate-y-2">
            {/* Best Value Badge */}
            <div className="absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-mono tracking-widest font-bold px-4 py-1 rounded-bl-xl z-10">
              POPULAR
            </div>
            
            <div className="p-8 flex-grow">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 border border-purple-500/30 shadow-[inset_0_0_15px_rgba(168,85,247,0.2)]">
                <Gamepad2 className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-pixel)] tracking-wide">Mini Game</h3>
              <p className="text-slate-400 mb-6 min-h-[3rem]">Playable browser games for marketing campaigns or fun projects.</p>
              
              <div className="mb-6">
                <span className="text-3xl font-black text-purple-400">฿8,000</span>
                <span className="text-slate-500 ml-2">Starting</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> WebGL / Unity Web Build
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> 1-2 Core Mechanics
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> Leaderboard Integration
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-purple-500 shrink-0" /> Mobile Touch Support
                </li>
              </ul>
            </div>
            <div className="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/40 flex flex-col justify-center min-w-[300px]">
              <a href="/contact" className="block w-full py-4 text-center bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-mono tracking-widest uppercase transition-colors shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_25px_rgba(168,85,247,0.6)]">
                Let's Build It
              </a>
            </div>
          </motion.div>

          {/* Package 3: Custom Link-in-Bio */}
          <motion.div variants={itemVariants} className="lg:col-span-12 group relative flex flex-col lg:flex-row bg-[#050810] rounded-[2.5rem] overflow-hidden border border-slate-800/80 hover:border-purple-500/50 transition-all duration-500 shadow-2xl hover:shadow-[0_0_40px_rgba(168,85,247,0.15)] hover:-translate-y-2 mt-4">
            <div className="p-8 lg:p-12 flex-1">
              <div className="w-14 h-14 rounded-2xl bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 border border-pink-500/30 shadow-[inset_0_0_15px_rgba(236,72,153,0.2)]">
                <LayoutPanelLeft className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2 font-[family-name:var(--font-pixel)] tracking-wide">Bio Page</h3>
              <p className="text-slate-400 mb-6 min-h-[3rem]">Beautiful Linktree-style pages with retro pixel art themes.</p>
              
              <div className="mb-6">
                <span className="text-3xl font-black text-pink-400">฿3,500</span>
                <span className="text-slate-500 ml-2">Fixed</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> 1-Page Minimal Design
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> Custom Pixel Art Avatar
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> Micro-animations
                </li>
                <li className="flex items-start gap-3 text-sm text-slate-300">
                  <CheckCircle2 className="w-5 h-5 text-pink-500 shrink-0" /> Vercel Free Hosting Setup
                </li>
              </ul>
            </div>
            <div className="p-8 lg:p-12 border-t lg:border-t-0 lg:border-l border-slate-800 bg-slate-900/40 flex flex-col justify-center min-w-[300px]">
              <a href="/contact" className="block w-full py-4 text-center bg-pink-500/10 hover:bg-pink-500 text-pink-400 hover:text-white rounded-xl font-mono tracking-widest uppercase transition-colors border border-pink-500/30">
                Order Now
              </a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Queue Status Widget */}
      <section className="max-w-4xl mx-auto px-6 pb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, type: "spring" }}
          className="relative bg-gradient-to-r from-emerald-900/20 to-teal-900/20 border border-emerald-500/30 rounded-3xl p-8 md:p-12 overflow-hidden shadow-[0_0_40px_rgba(16,185,129,0.1)]"
        >
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center md:justify-between gap-8 text-center md:text-left">
            <div className="flex flex-col gap-2">
              <div className="inline-flex items-center justify-center md:justify-start gap-3 mb-2">
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500"></span>
                </span>
                <span className="font-mono text-emerald-400 font-bold tracking-widest uppercase">Available for Work</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-[family-name:var(--font-pixel)] text-white">Current Queue: 1</h2>
              <p className="text-slate-400 max-w-md mt-2">
                I am currently accepting new projects! Typical turnaround time is 2-4 weeks depending on scope.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <a 
                href="https://fastwork.co/user/nanonc4" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-4 px-8 py-4 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold font-mono tracking-widest uppercase rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] hover:-translate-y-1"
              >
                <Clock className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Book Slot
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
