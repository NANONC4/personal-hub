"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PixelSky from "@/components/PixelSky";
import NightDepth from "@/components/NightDepth";
import { projects } from "@/data/projects";
import Footer from "@/components/Footer";
import ProjectSlides from "@/components/ProjectSlides";

import WhoAmI from "@/components/WhoAmI";
import { BackgroundCity, CityStyle, CityEvening, CityLate, CityLastTrain, CitySmallHours, GoodNightLanterns, ShootingStar } from "@/components/CityProps";
import WhatIUse from "@/components/WhatIUse";
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
      {/* the sky and the city on the ground, fixed; the welcome window lifts
          this whole layer (by id) while it's up */}
      <div id={NIGHT_SKY_ID} className="pointer-events-none fixed inset-0 z-0">
        <PixelSky cozy depth className="absolute inset-0 opacity-70" />
        <BackgroundCity />
      </div>
      
      <div className="relative z-10 w-full">

        {/* =========================================
            0–1. WELCOME WINDOW + HERO — the one hero, seen through the
            window first (HeroLightOn renders the window in front of itself)
            ========================================= */}
        <HeroLightOn />

        {/* the city between the zones: scrolling down is drifting down through it,
            and it gets later the deeper you go (components/CityProps.tsx) */}
        <CityStyle />
        <CityEvening />

        {/* =========================================
            2. MY PURPOSE & JOURNEY (About Me)
            ========================================= */}
        <WhoAmI />
        <CityLate />

        {/* =========================================
            3. WHAT I USE (Tech Breakout Game)
            ========================================= */}
        <WhatIUse />

        {/* =========================================
            4. CREATIVE SANDBOX (Projects)
            ========================================= */}
        <CityLastTrain />
        <section className="w-full relative z-20 pt-24 md:pt-0">
          <ProjectSlides projects={topProjects} />
        </section>

        {/* =========================================
            5. GOOD NIGHT (Closing)
            The page opened on a window looking out at a night city; it closes
            on the other end of the same night. Almost nothing here on purpose —
            the sky and the skyline behind it are the content.
            ========================================= */}
        <CitySmallHours />
        <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
          <GoodNightLanterns />
          <ShootingStar />
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
