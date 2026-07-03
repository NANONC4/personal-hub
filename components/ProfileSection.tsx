"use client";
import { motion } from "framer-motion";

export default function ProfileSection() {
  
  // 1. Classic fluffy cloud
  const cloudPattern1 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="64" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,32 v-8 h8 v-8 h8 v-8 h24 v8 h8 v8 h16 v8 z" fill="#ffffff" />
    </svg>
  `);

  // 2. Longer, flatter cloud
  const cloudPattern2 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="80" height="24" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,24 v-8 h16 v-8 h16 v-8 h16 v8 h16 v8 h16 v8 z" fill="#ffffff" />
    </svg>
  `);

  // 3. Small, tall bubbly cloud
  const cloudPattern3 = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="48" height="32" xmlns="http://www.w3.org/2000/svg">
      <path d="M8,32 v-16 h8 v-16 h16 v16 h8 v8 h8 v8 z" fill="#ffffff" />
    </svg>
  `);

  // 4. Crescent Moon (Classic pixel-art banana crescent - perfected tips)
  const moonPattern = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="100" height="100" viewBox="0 0 16 30" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M12,0 h1 v1 h-1 z
        M11,1 h2 v1 h-2 z
        M10,2 h3 v1 h-3 z
        M8,3 h4 v1 h-4 z
        M7,4 h4 v1 h-4 z
        M6,5 h4 v1 h-4 z
        M5,6 h4 v1 h-4 z
        M4,7 h4 v2 h-4 z
        M3,9 h4 v2 h-4 z
        M2,11 h5 v8 h-5 z
        M3,19 h4 v2 h-4 z
        M4,21 h4 v2 h-4 z
        M5,23 h4 v1 h-4 z
        M6,24 h4 v1 h-4 z
        M7,25 h4 v1 h-4 z
        M8,26 h4 v1 h-4 z
        M10,27 h3 v1 h-3 z
        M11,28 h2 v1 h-2 z
        M12,29 h1 v1 h-1 z
      " fill="white" />
    </svg>
  `);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 w-full lg:w-[350px] lg:sticky lg:top-24 z-10 relative"
    >
      {/* Melancholic Pixel Clouds Drifting in the Background */}
      <div className="absolute -inset-x-20 inset-y-0 z-0 pointer-events-none">
        <img src={cloudPattern1} className="absolute top-0 left-[-20%] w-16 opacity-80 animate-drift-slow" style={{ animationDelay: '0s' }} alt="" />
        <img src={cloudPattern2} className="absolute top-[35%] left-[-20%] w-24 opacity-60 animate-drift-slower" style={{ animationDelay: '5s' }} alt="" />
        <img src={cloudPattern3} className="absolute top-[75%] left-[-20%] w-12 opacity-90 animate-drift-slow" style={{ animationDelay: '12s' }} alt="" />
      </div>

      {/* Profile Image Area with Moon */}
      <div className="relative mt-6 mb-2">
        {/* Floating Moon Decoration (Now visible on mobile, positioned left of profile) */}
        <div className="absolute top-[-30px] left-[-70px] lg:top-[-40px] lg:left-[-120px] z-0 pointer-events-none opacity-90">
          <img src={moonPattern} className="w-24 lg:w-32 xl:w-48 animate-float-slow drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]" style={{ animationDelay: '0.5s' }} alt="Large Crescent Moon" />
        </div>

        {/* Profile Image with Floating Effect & Pixel-Art Shadow */}
        <div className="relative group cursor-pointer animate-float-slow z-10" style={{ animationDelay: '0.2s' }}>
          <div className="relative w-32 h-32 lg:w-44 lg:h-44 rounded-xl overflow-hidden border-4 border-slate-800 bg-sky-200 p-1 shadow-[6px_6px_0_0_#1e293b] group-hover:translate-x-[2px] group-hover:translate-y-[2px] group-hover:shadow-[4px_4px_0_0_#1e293b] transition-all duration-200">
            <div className="w-full h-full rounded-lg bg-pink-100 overflow-hidden relative flex items-center justify-center border-2 border-slate-800/20">
              {/* Shine Sweep Effect */}
              <div className="absolute top-0 bottom-0 w-16 bg-white/60 blur-[6px] -skew-x-12 -translate-x-[150%] group-hover:animate-sweep z-10 pointer-events-none" />
              
              <img src="/profile.png" alt="Profile" className="w-full h-full object-cover z-0" />
            </div>
          </div>
        </div>
      </div>

      {/* Name and Dialogue Box */}
      <div className="space-y-4 max-w-sm w-full z-10 flex flex-col items-center lg:items-start">
        {/* 3D Stacked Name */}
        <div className="relative text-6xl lg:text-7xl font-black tracking-tighter font-[family-name:var(--font-pixel)] uppercase leading-[1.1] z-10 text-center lg:text-left mb-2 whitespace-nowrap">
          {/* Layer 3: Deep Shadow */}
          <div className="absolute top-[6px] left-[6px] lg:top-[8px] lg:left-[8px] text-slate-800 z-0 select-none">
            CHATCHAI
          </div>
          {/* Layer 2: Mid Shadow/Extrusion */}
          <div className="absolute top-[3px] left-[3px] lg:top-[4px] lg:left-[4px] text-indigo-900 z-10 select-none">
            CHATCHAI
          </div>
          {/* Layer 1: Front Gradient */}
          <div className="relative z-20 bg-gradient-to-r from-sky-400 via-pink-500 to-purple-500 text-transparent bg-clip-text animate-gradient-shift drop-shadow-sm" style={{ backgroundSize: '200% auto' }}>
            CHATCHAI
          </div>
        </div>
        
        {/* RPG Dialogue Box Description */}
        <div className="relative mt-2">
          {/* Dialogue Box Tail */}
          <div className="absolute -top-3 left-8 lg:left-6 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[12px] border-b-slate-800"></div>
          <div className="absolute -top-2 left-[33px] lg:left-[25px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[10px] border-b-white z-10"></div>
          
          <div className="bg-white border-4 border-slate-800 rounded-xl p-4 lg:p-5 shadow-[4px_4px_0_0_#1e293b] relative z-0">
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              私は川で、星は、どこを参照してください。<br/>
              <span className="text-xs text-slate-500 mt-2 block font-semibold">— Chatchai Danrungruang</span>
            </p>
            {/* Blinking Continue Triangle */}
            <div className="absolute bottom-3 right-4 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-pink-500 animate-blink"></div>
          </div>
        </div>
      </div>

      
      <style jsx global>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }

        @keyframes sweep {
          0% { transform: translateX(-150%) skewX(-12deg); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(200%) skewX(-12deg); opacity: 1; }
        }
        .animate-sweep {
          animation: sweep 1s cubic-bezier(0.4, 0, 0.2, 1);
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient-shift {
          animation: gradient-shift 6s linear infinite;
        }

        @keyframes drift {
          0% { transform: translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateX(450px); opacity: 0; }
        }
        .animate-drift-slow {
          animation: drift 18s linear infinite;
        }
        .animate-drift-slower {
          animation: drift 25s linear infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .animate-blink {
          animation: blink 1s step-end infinite;
        }

      `}</style>
    </motion.div>
  );
}
