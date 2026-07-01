"use client";
import { motion } from "framer-motion";

export default function ProfileSection() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 w-full lg:w-[350px] lg:sticky lg:top-24 z-10"
    >
      {/* Profile Image with Pixel-Art Shadow */}
      <div className="relative group cursor-pointer mb-2">
        <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-xl overflow-hidden border-4 border-slate-800 bg-sky-200 p-1 shadow-[6px_6px_0_0_#1e293b] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0_0_#1e293b] transition-all duration-200">
          <div className="w-full h-full rounded-lg bg-pink-100 overflow-hidden relative flex items-center justify-center border-2 border-slate-800/20">
            {/* Placeholder for Profile Picture - replace src with your actual image */}
            {/* <img src="/your-profile.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
            <span className="text-slate-800 font-[family-name:var(--font-pixel)] tracking-widest text-xs uppercase text-center leading-relaxed">Insert<br/>Coin</span>
          </div>
        </div>
      </div>

      {/* Name and Bio */}
      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-pink-500 drop-shadow-[2px_2px_0_#1e293b] font-[family-name:var(--font-pixel)] uppercase">
          Dia<br/>Fria
        </h1>
        <p className="text-lg text-purple-600 font-bold tracking-widest uppercase font-[family-name:var(--font-pixel)] drop-shadow-sm">
          Lv. 99 Creative
        </p>
        <p className="text-sm text-slate-600 leading-relaxed font-medium">
          Creating high-end digital experiences, beautiful interfaces, and robust web applications with a sprinkle of magic. ✧･ﾟ: *
        </p>
      </div>
    </motion.div>
  );
}
