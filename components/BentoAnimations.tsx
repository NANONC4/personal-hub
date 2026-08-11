"use client";

import { motion } from "framer-motion";
import { Terminal, Code2, Gamepad2, Database, LayoutTemplate, Clock, CalendarDays, CheckCircle2, MessageSquare, Zap, Users, Coffee } from "lucide-react";
import { PixelHeart, PixelStar, PixelCloud } from "./PixelIcons";

// 1. Web Dev Background (Floating Code/Icons)
export const WebDevBackground = () => (
  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_10%,#000_100%)] pointer-events-none">
    <div className="absolute top-10 left-10 flex flex-col gap-4 opacity-20">
      <motion.div
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700"
      >
        <Code2 className="w-5 h-5 text-sky-400" /> <span className="font-mono text-xs">function build()</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 ml-12"
      >
        <Database className="w-5 h-5 text-pink-400" /> <span className="font-mono text-xs">select * from ideas</span>
      </motion.div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="flex items-center gap-2 p-3 bg-slate-800 rounded-lg border border-slate-700 ml-4"
      >
        <LayoutTemplate className="w-5 h-5 text-purple-400" /> <span className="font-mono text-xs">&lt;Layout /&gt;</span>
      </motion.div>
    </div>
    <div className="absolute top-1/4 -right-10 opacity-30">
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Zap className="w-48 h-48 text-sky-500/20" />
      </motion.div>
    </div>
  </div>
);

// 2. Mini Games Background (Pixel Art floating)
export const GamesBackground = () => (
  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_10%,#000_100%)] flex items-center justify-center opacity-30 pointer-events-none">
    <motion.div
      animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="absolute top-1/4 left-1/4"
    >
      <PixelStar className="w-16 h-16 text-amber-400" />
    </motion.div>
    <motion.div
      animate={{ y: [0, 15, 0], rotate: [0, -10, 10, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      className="absolute bottom-1/4 right-1/4"
    >
      <PixelHeart className="w-20 h-20 text-pink-500" color="#ec4899" />
    </motion.div>
  </div>
);

// 3. Queue Status Background (Pulsing Grid/Calendar)
export const QueueBackground = () => (
  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_10%,#000_100%)] pointer-events-none">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20">
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-32 h-32 rounded-full bg-green-500/30 blur-2xl"
      />
    </div>
    <div className="absolute top-6 right-6 opacity-30">
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <CheckCircle2 className="w-24 h-24 text-green-400" />
      </motion.div>
    </div>
  </div>
);

// 4. Community Background (Floating chat bubbles)
export const CommunityBackground = () => (
  <div className="absolute inset-0 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent_10%,#000_100%)] pointer-events-none">
    <div className="absolute top-10 right-10 flex flex-col gap-6 opacity-20">
      <motion.div
        animate={{ x: [0, -20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="flex items-center gap-3 p-4 bg-[#5865F2]/20 rounded-2xl rounded-tr-none border border-[#5865F2]/30 backdrop-blur-sm"
      >
        <Users className="w-6 h-6 text-[#5865F2]" /> <span className="font-mono text-sm text-[#5865F2]">12 online</span>
      </motion.div>
      <motion.div
        animate={{ x: [0, 20, 0], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="flex items-center gap-3 p-4 bg-amber-500/20 rounded-2xl rounded-tl-none border border-amber-500/30 backdrop-blur-sm ml-12"
      >
        <Coffee className="w-6 h-6 text-amber-400" /> <span className="font-mono text-sm text-amber-400">Coffee break!</span>
      </motion.div>
    </div>
    <div className="absolute bottom-10 left-10 opacity-10">
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }} 
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <MessageSquare className="w-48 h-48 text-[#5865F2]" />
      </motion.div>
    </div>
  </div>
);
