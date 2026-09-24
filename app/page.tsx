"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PixelSky from "@/components/PixelSky";
import NightDepth from "@/components/NightDepth";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import ProjectSlides from "@/components/ProjectSlides";

import { DiaTextReveal } from "@/components/DiaTextReveal";
import { SpaceShooterMiniGame } from "@/components/SpaceShooterMiniGame";
import { TechBreakout, TECH_GROUPS } from "@/components/TechBreakout";
import HeroLightOn from "@/components/HeroLightOn";
import { NIGHT_SKY_ID } from "@/components/WelcomeWindow";


export default function HomePage() {
  // Select top 3 projects to showcase
  const topProjects = projects.slice(0, 3);

  return (
    // overflow-x-clip, not -hidden: `hidden` turns this into a scroll container
    // and silently breaks `position: sticky` for the project stage below.
    <main className="relative min-h-screen bg-[#070c18] text-slate-200 selection:bg-pink-500/30 overflow-x-clip pt-24 font-[family-name:var(--font-geist-sans)]">
      {/* Background: the base colour ramps with scroll, the sky's own palette
          follows it, and the skyline stays put through the whole descent. */}
      <NightDepth />
      <PixelSky cozy depth id={NIGHT_SKY_ID} className="fixed inset-0 z-0 opacity-70 pointer-events-none" />
      
      <div className="relative z-10 w-full">

        {/* =========================================
            0–1. WELCOME WINDOW + HERO — the one hero, seen through the
            window first (HeroLightOn renders the window in front of itself)
            ========================================= */}
        <HeroLightOn />

        {/* =========================================
            2. MY PURPOSE & JOURNEY (About Me)
            ========================================= */}
        <section id="about" className="w-full relative z-20 overflow-hidden min-h-screen flex flex-col justify-center py-24">

          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24 relative z-10">
            
            {/* Left side: Space Shooter Mini-Game */}
            <motion.div 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <SpaceShooterMiniGame />
            </motion.div>

            {/* Right side: Text (Elegant Typography) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-col justify-center max-w-xl text-left"
            >
              <div className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] mb-8 uppercase tracking-wider text-white relative">
                <DiaTextReveal text="Who am I?" />
                <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-1 h-12 bg-gradient-to-b from-sky-400 to-pink-500 rounded-full hidden md:block" />
              </div>
              <div className="space-y-6 text-slate-100 text-lg md:text-xl leading-relaxed font-medium">
                <p>
                  ผมเป็น <strong className="text-white font-bold">Creative Developer</strong> ที่เชื่อว่าเว็บไซต์ไม่ควรเป็นแค่หน้ากระดาษแบนๆ แต่ควรเป็น "พื้นที่" (Space) ที่ให้ความรู้สึกเหมือนมีชีวิต
                </p>
                <p>
                  จุดเริ่มต้นของผมมาจากการชอบเล่นเกมยุค 90s และความหลงใหลในความคลาสสิกของ <span className="text-pink-400 font-[family-name:var(--font-pixel)] tracking-widest text-sm uppercase">Pixel Art</span> ผมจึงตั้งใจนำกลิ่นอายความ Nostalgia เหล่านั้น มาผสมผสานกับเทคโนโลยีเว็บสมัยใหม่ เพื่อสร้างประสบการณ์ที่ทำให้คนที่เข้ามาดูรู้สึก "ว้าว"
                </p>
                <p className="border-l-2 border-slate-500 pl-4 text-slate-200 italic">
                  เป้าหมายของผมคือการ <strong className="text-white not-italic font-bold">"ทลายขอบเขตระหว่างงานศิลปะและการเขียนโค้ด"</strong> ทุกบรรทัดที่ผมเขียน คือความพยายามในการสร้างโลกใบเล็กๆ ที่มีเอกลักษณ์เฉพาะตัวให้ทุกคนได้สัมผัสครับ
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =========================================
            3. WHAT I USE (Tech Breakout Game)
            ========================================= */}
        <section className="w-full relative z-20 flex min-h-screen items-center">
          <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-0">
            <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">

              {/* The stack, readable without playing. The game had all of this
                  locked behind actually playing it, and most visitors arrive
                  from a bio link and just scroll. */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              >
                <h2 className="font-[family-name:var(--font-pixel)] text-3xl md:text-5xl uppercase tracking-wider text-white">
                  What I Use
                </h2>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400 md:text-xl">
                  ของที่ผมใช้ทำงานจริงๆ เอามาเรียงเป็นเกมให้ลองเล่นเล่น
                  ยิงโดนอันไหน อันนั้นจะสว่างค้างไว้ ไม่หายไปไหน
                </p>

                {/* One row per tool, each carrying the same colour its brick
                    has in the game — so the list and the board read as the
                    same set of things, not two unrelated lists. The name stays
                    white; the colour does the sorting. */}
                <dl className="mt-10 flex flex-col gap-6">
                  {TECH_GROUPS.map((g) => (
                    <div key={g.label}>
                      <dt className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                        {g.label}
                      </dt>
                      <dd className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                        {g.items.map((t) => (
                          <span key={t.text} className="flex items-center gap-3">
                            <span
                              aria-hidden
                              className="h-3 w-3 shrink-0"
                              style={{ backgroundColor: t.swatch }}
                            />
                            <span className="font-mono text-sm uppercase tracking-wide text-slate-200">
                              {t.text}
                            </span>
                          </span>
                        ))}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>

              <TechBreakout />
            </div>
          </div>
        </section>

        {/* =========================================
            4. CREATIVE SANDBOX (Projects)
            ========================================= */}
        <section className="w-full relative z-20 pt-24 md:pt-0">
          <ProjectSlides projects={topProjects} />
        </section>

        {/* =========================================
            5. GOOD NIGHT (Closing)
            The page opened on a window looking out at a night city; it closes
            on the other end of the same night. Almost nothing here on purpose —
            the sky and the skyline behind it are the content.
            ========================================= */}
        <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <h2 className="font-[family-name:var(--font-pixel)] text-2xl uppercase tracking-[0.3em] text-slate-300 md:text-4xl">
              Good Night
            </h2>
            <p className="mt-6 text-base leading-relaxed text-slate-400 md:text-lg">
              ฝันดีนะ แล้วเจอกันใหม่
            </p>

            <Link
              href="/services"
              className="mt-14 inline-block font-mono text-[10px] uppercase tracking-[0.25em] text-slate-500 transition-colors hover:text-pink-400 md:text-xs"
            >
              รับงานฟรีแลนซ์ · ดูบริการ
            </Link>
          </motion.div>
        </section>

      </div>
      
      <Footer />
    </main>
  );
}
