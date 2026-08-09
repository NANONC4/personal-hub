"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PixelSky from "@/components/PixelSky";
import { PixelStar, PixelHeart, PixelCloud } from "@/components/PixelIcons";

export default function HomePage() {
  return (
    <main className="relative min-h-screen bg-[#0f172a] text-slate-200 selection:bg-pink-500/30 overflow-x-hidden pt-24 font-[family-name:var(--font-geist-sans)]">
      {/* Background */}
      <PixelSky className="fixed inset-0 z-0 opacity-40 pointer-events-none" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col items-center justify-center min-h-[80vh]">
        
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-center w-full max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50 mb-8 backdrop-blur-sm">
            <PixelStar className="w-4 h-4 text-pink-400 animate-pulse" />
            <span className="font-mono text-sm tracking-widest text-slate-300 uppercase">Chatchai Danrungruang</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] text-slate-100 mb-8 drop-shadow-lg">
            Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 animate-gradient-text">Digital Magic</span> <br className="hidden md:block"/> 
            Through Code & Pixels
          </h1>
          
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed mb-12">
            Welcome to my hub. I'm a Creative Developer blending robust engineering with retro aesthetics, building immersive web experiences and games.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/showreel" className="group relative px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white font-mono font-bold tracking-widest uppercase rounded-lg shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(236,72,153,0.6)]">
              <span className="relative z-10 flex items-center gap-2">
                Enter Showreel <PixelHeart className="w-5 h-5 group-hover:animate-ping" color="#fff" />
              </span>
            </Link>
            
            <Link href="/portfolio" className="group px-8 py-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 font-mono font-bold tracking-widest uppercase rounded-lg transition-all hover:scale-105">
              <span className="flex items-center gap-2">
                View Portfolio <PixelCloud className="w-5 h-5 opacity-70 group-hover:opacity-100 transition-opacity" />
              </span>
            </Link>
          </div>
        </motion.div>

        {/* Quick Hub Links Grid */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-32"
        >
          {/* Card 1 */}
          <Link href="/services" className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-sky-500/50 backdrop-blur-sm transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-sky-500/20 flex items-center justify-center mb-6 text-sky-400 group-hover:scale-110 transition-transform">
              ✦
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 font-[family-name:var(--font-pixel)] tracking-wide uppercase">Freelance Services</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Need a stunning website or a mini-game? Check out my service packages, pricing, and current queue status.
            </p>
          </Link>

          {/* Card 2 */}
          <Link href="/bio" className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-pink-500/50 backdrop-blur-sm transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center mb-6 text-pink-400 group-hover:scale-110 transition-transform">
              ✧
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 font-[family-name:var(--font-pixel)] tracking-wide uppercase">Link in Bio</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              A clean, focused page containing all my social media links and direct contact information.
            </p>
          </Link>

          {/* Card 3 */}
          <Link href="/contact" className="group p-8 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-purple-500/50 backdrop-blur-sm transition-all hover:-translate-y-2">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
              ★
            </div>
            <h3 className="text-xl font-bold text-slate-200 mb-3 font-[family-name:var(--font-pixel)] tracking-wide uppercase">Reviews & Contact</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Read what clients say about my work on Fastwork and find ways to get in touch directly.
            </p>
          </Link>
        </motion.div>

      </div>
    </main>
  );
}
