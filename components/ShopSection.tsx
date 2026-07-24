"use client";

import { motion } from "framer-motion";
import { PixelStar, PixelSparkle } from "./PixelIcons";
import { getPattern } from "@/lib/patterns";

export default function ShopSection() {
  return (
    <section className="w-full relative min-h-[70vh] bg-[#02050A] flex flex-col items-center justify-center py-20 px-4 md:px-10 overflow-hidden border-t border-slate-800/50">
      
      {/* Subtle Background Glow */}
      <div 
        className="absolute inset-0 z-0 opacity-20 pointer-events-none mix-blend-screen" 
        style={{ ...getPattern(2), backgroundAttachment: "scroll" }}
      />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="max-w-7xl w-full relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        
        {/* LEFT COLUMN: Facebook Page Mockup */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4 }}
          className="w-full max-w-[550px] flex-shrink-0"
        >
          {/* FB Card Container */}
          <div className="w-full bg-[#18191A] rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(0,0,0,0.5)] border border-slate-800/80 group">
            
            {/* Cover Photo */}
            <div className="w-full h-[180px] sm:h-[220px] relative overflow-hidden bg-gradient-to-br from-indigo-300 via-sky-200 to-pink-200 flex flex-col items-center justify-center">
              <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
              <div className="relative z-10 text-center scale-90 sm:scale-100 transition-transform duration-500 group-hover:scale-105">
                <h3 className="font-black text-3xl sm:text-5xl text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] tracking-tight">
                  LEMONY TOPUP
                </h3>
                <p className="font-medium text-indigo-900/80 text-sm sm:text-base mt-1 italic tracking-wide">
                  Thank you very much for using our service
                </p>
                
                {/* Floating decor in cover */}
                <PixelStar color="#fff" className="absolute -top-4 -left-10 w-6 h-6 animate-pulse opacity-80" />
                <PixelSparkle color="#fff" className="absolute bottom-0 -right-8 w-5 h-5 animate-bounce opacity-80" />
              </div>
            </div>

            {/* Profile Info Area */}
            <div className="px-4 sm:px-6 pb-6 relative">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                
                {/* Profile Pic & Name */}
                <div className="flex items-end gap-4 -mt-10 sm:-mt-12">
                  <div className="relative">
                    <div className="w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] rounded-full border-4 border-[#18191A] bg-gradient-to-tr from-sky-400 to-indigo-500 overflow-hidden flex items-center justify-center shadow-lg relative group-hover:shadow-[0_0_20px_rgba(56,189,248,0.4)] transition-shadow duration-300">
                      {/* Avatar Placeholder (Can replace with actual img later) */}
                      <span className="text-4xl font-bold text-white drop-shadow-md">L</span>
                    </div>
                    {/* Online Dot */}
                    <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 w-4 h-4 sm:w-5 sm:h-5 bg-green-500 rounded-full border-2 border-[#18191A]"></div>
                  </div>
                  
                  <div className="mb-1 sm:mb-2 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-xl sm:text-2xl font-bold text-[#E4E6EB] tracking-tight">Lemony</h4>
                      {/* Verified Badge */}
                      <svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-500" aria-label="Verified">
                        <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-1.9 14.7L6 12.6l1.5-1.5 2.6 2.6 6.4-6.4 1.5 1.5-7.9 7.9z" />
                      </svg>
                    </div>
                    <p className="text-[#B0B3B8] text-sm">@lemonyshop</p>
                  </div>
                </div>

                {/* Buttons (Like & Message) */}
                <div className="flex items-center gap-2 mt-2 sm:mt-0 pb-1 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#2374E1] hover:bg-[#3A82E4] text-white px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M14 9h3l-1-4H8v10h2v5l4-3 3 2-2-10zM5 9h2v10H5z" />
                    </svg>
                    ถูกใจ
                  </button>
                  <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#3A3B3C] hover:bg-[#4E4F50] text-[#E4E6EB] px-4 sm:px-6 py-2 rounded-lg font-semibold text-sm transition-colors">
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                      <path d="M12 2C6.48 2 2 5.84 2 10.17c0 2.47 1.34 4.67 3.42 6.06L4.5 22l3.85-2.07c1.15.34 2.38.53 3.65.53 5.52 0 10-3.84 10-8.17S17.52 2 12 2zm1 11h-2v-2h2v2zm0-4h-2V5h2v4z" />
                    </svg>
                    ส่งข้อความ
                  </button>
                </div>
              </div>
            </div>
            
          </div>
        </motion.div>


        {/* RIGHT COLUMN: Content & CTA */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-50px" }}
          transition={{ duration: 0.7, type: "spring", bounce: 0.4, delay: 0.1 }}
          className="w-full flex-1 flex flex-col items-start text-left"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-900/30 border border-blue-500/30 text-blue-400 text-xs sm:text-sm font-semibold tracking-wide mb-6">
            <PixelSparkle color="#60a5fa" className="w-3 h-3" />
            Community & Giveaway
          </div>
          
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight mb-2">
            ติดตามเพจหรือเฟซบุ๊กวันนี้
          </h2>
          
          <h3 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 sm:mb-8">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              รับโค้ด ฟรี!
            </span>
          </h3>
          
          <p className="text-slate-400 text-base sm:text-lg lg:text-xl leading-relaxed max-w-xl mb-10">
            อัปเดตข่าวสารใหม่ๆ และแจก <strong className="text-yellow-400 font-bold">Gift Voucher</strong> ทุกสัปดาห์ที่หน้าแฟนเพจหรือเฟซบุ๊กเท่านั้น
          </p>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 w-full">
            <a 
              href="#" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-3.5 bg-white hover:bg-slate-100 text-[#1877F2] rounded-xl font-bold text-base sm:text-lg transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1 w-full sm:w-auto"
            >
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              ไปที่เฟซบุ๊ก
            </a>
            
            <p className="text-xs sm:text-sm text-slate-500 flex items-center gap-2">
              <span className="text-yellow-400 text-base">🎁</span>
              กดติดตามเพจปุ๊บแล้วทักเพื่อรับโค้ดเฉพาะเท่านั้น
            </p>
          </div>
          
        </motion.div>

      </div>
    </section>
  );
}
