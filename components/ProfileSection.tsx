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
      {/* Profile Image with Glassmorphism ring */}
      <div className="relative group cursor-pointer mb-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-emerald-600 rounded-full blur opacity-40 group-hover:opacity-100 transition duration-700"></div>
        <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-full overflow-hidden border border-white/20 bg-black/50 backdrop-blur-xl p-1">
          <div className="w-full h-full rounded-full bg-neutral-800 overflow-hidden relative flex items-center justify-center">
            {/* Placeholder for Profile Picture - replace src with your actual image */}
            {/* <img src="/your-profile.jpg" alt="Profile" className="w-full h-full object-cover" /> */}
            <span className="text-neutral-500 font-medium tracking-widest text-xs uppercase">Photo</span>
          </div>
        </div>
      </div>

      {/* Name and Bio */}
      <div className="space-y-4 max-w-sm">
        <h1 className="text-4xl lg:text-5xl font-black tracking-tighter text-white drop-shadow-2xl">
          Your Name
        </h1>
        <p className="text-lg text-emerald-400 font-medium tracking-wide">
          Freelance Creative Pro
        </p>
        <p className="text-sm text-neutral-400 leading-relaxed font-light">
          Creating high-end digital experiences, beautiful interfaces, and robust web applications.
        </p>
      </div>
    </motion.div>
  );
}
