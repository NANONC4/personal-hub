"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import WelcomeWindow, { GATE_DONE_EVENT } from "@/components/WelcomeWindow";

/*
 * Scene 01 of docs/animation-plan.md — the hero.
 *
 * There is one hero, pinned to the screen from the first frame. The welcome
 * window is a wall with a hole in it standing in front: you see this hero
 * through the glass, and scrolling moves the wall away and grows the hero to
 * full size (WelcomeWindow drives both). Nothing is ever swapped, so nothing
 * can change at a seam. The moment the wall is gone the lamp flickers on and
 * the badge switches to "on" in step with it — a short beat, not a wait.
 *
 * After that the lamp is a toy: click it and the room light goes off, the
 * sky darkens and every window in the city snaps on (PixelSky listens for
 * "night:lights"). No soft glows anywhere — light is things switching on.
 */

export const NIGHT_LIGHTS_EVENT = "night:lights";

export type LampState = "off" | "flicker" | "on";

const FLICKER_MS = 700;
const FLICKER = "animate-[hero-lamp-on_0.7s_steps(1,end)_both]";

// Kept here, not in globals.css: a long-running dev server can serve that file stale.
const FLICKER_CSS = `@keyframes hero-lamp-on {
  0% { opacity: .15 } 14% { opacity: 1 } 26% { opacity: .2 } 44% { opacity: 1 }
  56% { opacity: .35 } 72%, 100% { opacity: 1 }
}`;

function PixelLamp({ state, lampRef }: { state: LampState; lampRef?: React.Ref<HTMLSpanElement> }) {
  const lit = state !== "off";
  const flick = state === "flicker" ? FLICKER : "";
  return (
    <span ref={lampRef} aria-hidden className="relative inline-block h-[18px] w-4 shrink-0 [image-rendering:pixelated]">
      <span className="absolute left-0.5 top-0 h-[7px] w-3 bg-slate-400 [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)]" />
      <span className={`absolute left-[5px] top-[6px] h-[3px] w-1.5 ${lit ? "bg-amber-100" : "bg-slate-600"} ${flick}`} />
      {/* hard pixel light cone, no blur */}
      <span
        className={`absolute left-[-3px] top-[9px] h-[9px] w-[22px] bg-amber-200/25 [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)] ${lit ? "opacity-100" : "opacity-0"} ${flick}`}
      />
      <span className="absolute left-[7px] top-[7px] h-[9px] w-0.5 bg-slate-500" />
      <span className="absolute bottom-0 left-[3px] h-0.5 w-2.5 bg-slate-500" />
    </span>
  );
}

const WORDS = ["Hi,", "I'm"];

export default function HeroLightOn() {
  const reduce = useReducedMotion();
  const [lamp, setLamp] = useState<LampState>("off");
  const heroRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLSpanElement>(null);

  // The beat: the lamp waits, off, until the welcome window is gone, then
  // flickers on. Only the first arrival plays it; with no gate on the page,
  // or reduced motion, the light is simply on.
  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    const switchOn = () => {
      if (reduce) {
        timers.push(setTimeout(() => setLamp("on"), 0));
        return;
      }
      timers.push(setTimeout(() => setLamp((s) => (s === "off" ? "flicker" : s)), 0));
      timers.push(setTimeout(() => setLamp((s) => (s === "flicker" ? "on" : s)), FLICKER_MS));
    };
    if (document.documentElement.dataset.gate !== "closed") switchOn();
    else window.addEventListener(GATE_DONE_EVENT, switchOn, { once: true });
    return () => {
      window.removeEventListener(GATE_DONE_EVENT, switchOn);
      timers.forEach(clearTimeout);
    };
  }, [reduce]);

  const toggle = () => {
    const next: LampState = lamp === "off" ? "on" : "off";
    setLamp(next);
    window.dispatchEvent(new CustomEvent(NIGHT_LIGHTS_EVENT, { detail: { on: next === "on" } }));
  };

  // The hint is always there and always matches the lamp. "off · … switch on"
  // and "on · … switch off" are the same length, so the badge never changes
  // width when the light comes on.
  const flick = lamp === "flicker" ? FLICKER : "";

  return (
    // Two screens for the welcome window, then the hero holds the centre for
    // 70% of a screen more, so the scroll that carried you through the window
    // runs out while it's sitting still and clickable.
    <div className="relative h-[370vh]">
      <WelcomeWindow heroRef={heroRef} lampRef={lampRef} />

      <section
        ref={heroRef}
        className="sticky top-0 mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-20 lg:py-32"
      >
        <button
          type="button"
          onClick={toggle}
          aria-pressed={lamp === "off"}
          aria-label={lamp === "off" ? "เปิดไฟในห้อง" : "ปิดไฟในห้อง"}
          className="group relative mb-10 inline-flex cursor-pointer items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/80 px-4 py-2 transition-colors hover:border-pink-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400"
        >
          <style>{FLICKER_CSS}</style>
          <PixelLamp state={lamp} lampRef={lampRef} />
          <span className={`font-mono text-sm uppercase tracking-widest text-slate-300 ${flick}`}>
            {lamp === "off" ? "The light's off" : "The light's on"}
          </span>
          <span
            className={`hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-pink-300 sm:inline ${flick}`}
          >
            · {lamp === "off" ? "click to switch on" : "click to switch off"}
          </span>
        </button>

        <h1 className="mb-10 flex flex-wrap items-end gap-3 text-5xl font-black leading-[1] tracking-tighter text-foreground md:gap-4 md:text-7xl lg:text-8xl">
          {WORDS.map((w) => (
            <span key={w} className="inline-flex">
              {Array.from(w).map((ch, i) => (
                <motion.span
                  key={i}
                  className="inline-block origin-bottom"
                  whileHover={{ y: -8, rotate: i % 2 ? 4 : -4, transition: { duration: 0.2 } }}
                >
                  {ch}
                </motion.span>
              ))}
            </span>
          ))}
          <span className="inline-block animate-gradient-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            lemon.
          </span>
        </h1>

        <div className="mb-12 flex flex-wrap items-center gap-4 font-[family-name:var(--font-pixel)] text-3xl md:text-5xl">
          <span className="text-pink-400">Game Dev</span>
          <span aria-hidden className="text-slate-500">·</span>
          <span className="text-sky-400">Web Dev</span>
        </div>

        <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
          ยินดีต้อนรับสู่มุมเล็กๆ ที่มองเห็นเมืองตอนกลางคืน
        </p>

        <div className="flex flex-wrap items-center gap-6">
          <InteractiveHoverButton asLink href="#about" text="Read My Story" className="h-12 w-56 text-base" />
        </div>
      </section>
    </div>
  );
}
