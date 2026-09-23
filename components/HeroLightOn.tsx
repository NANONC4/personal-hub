"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";

/*
 * Scene 01 of docs/animation-plan.md — the hero.
 *
 * The entrance happens in the welcome window, tied to scroll: a copy of this
 * content fades in on the sky as the sashes part and grows into place as you
 * fly through (see WelcomeWindow), with the lamp still off. The moment the
 * page arrives here the lamp flickers on and the badge switches to "on" in
 * step with it — a short beat, not a wait: everything is already readable.
 *
 * After that the lamp is a toy: click it and the room light goes off, the
 * sky darkens and every window in the city snaps on (PixelSky listens for
 * "night:lights"). No soft glows anywhere — light is things switching on.
 */

export const NIGHT_LIGHTS_EVENT = "night:lights";
/** WelcomeWindow fires this the first time it hands over to the real hero. */
export const GATE_DONE_EVENT = "gate:done";

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

/**
 * The hero's contents. Rendered twice: once in the page (interactive) and
 * once inside the welcome window (a still copy that grows into place), so the
 * hand-off between them is pixel-identical. The badge's "click" hint only
 * appears after the light is on, so the badge is the same width at the swap.
 */
export function HeroContent({
  lamp,
  hint,
  onToggle,
  lampRef,
}: {
  lamp: LampState;
  hint?: string | null;
  onToggle?: () => void;
  lampRef?: React.Ref<HTMLSpanElement>;
}) {
  const badgeInner = (
    <>
      <style>{FLICKER_CSS}</style>
      <PixelLamp state={lamp} lampRef={lampRef} />
      <span className={`font-mono text-sm uppercase tracking-widest text-slate-300 ${lamp === "flicker" ? FLICKER : ""}`}>
        {lamp === "off" ? "The light's off" : "The light's on"}
      </span>
      {hint && (
        <motion.span
          key={hint}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-pink-300 sm:inline"
        >
          · {hint}
        </motion.span>
      )}
    </>
  );
  const badgeClass =
    "relative mb-10 inline-flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/80 px-4 py-2";

  // The name's colour sweep is a CSS animation, and each copy of the hero
  // started it at a different moment, so the two showed different colours at
  // the hand-off. Pin every copy to the same clock (the page's time origin).
  const nameRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    nameRef.current?.getAnimations().forEach((a) => {
      a.startTime = 0;
    });
  }, []);

  return (
    <div className="w-full">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={lamp === "off"}
          aria-label={lamp === "off" ? "เปิดไฟในห้อง" : "ปิดไฟในห้อง"}
          className={`group ${badgeClass} cursor-pointer transition-colors hover:border-pink-400/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-400`}
        >
          {badgeInner}
        </button>
      ) : (
        <div className={badgeClass}>{badgeInner}</div>
      )}

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
        <span
          ref={nameRef}
          className="inline-block animate-gradient-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
        >
          Dia.
        </span>
      </h1>

      <div className="mb-12 flex flex-wrap items-center gap-4 font-[family-name:var(--font-pixel)] text-3xl md:text-5xl">
        <span className="text-pink-400">Creative</span>
        <span className="text-sky-400">Developer</span>
      </div>

      <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
        นักพัฒนาที่หลงใหลในศิลปะ{" "}
        <span className="font-[family-name:var(--font-pixel)] tracking-widest text-pink-400">Pixel Art</span>{" "}
        สร้างสรรค์ประสบการณ์บนเว็บไซต์และมินิเกม เพื่อเปลี่ยนไอเดียให้กลายเป็นโค้ดที่จับต้องได้
      </p>

      <div className="flex flex-wrap items-center gap-6">
        <InteractiveHoverButton asLink href="#about" text="Read My Story" className="h-12 w-56 text-base" />
      </div>
    </div>
  );
}

/** The home page <main>'s text colour and font. The welcome window's copy of
 *  the hero lives outside <main>, so it has to be given these by hand. */
export const PAGE_TEXT = "text-slate-200 font-[family-name:var(--font-geist-sans)]";

/** Same box in the page and in the welcome window, so the two line up exactly. */
export const HERO_BOX = "mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-20 lg:py-32";

export default function HeroLightOn() {
  const reduce = useReducedMotion();
  const [lamp, setLamp] = useState<LampState>("off");
  const [touched, setTouched] = useState(false);

  // The beat: the lamp waits, off, until the welcome window hands over, then
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
    setTouched(true);
    window.dispatchEvent(new CustomEvent(NIGHT_LIGHTS_EVENT, { detail: { on: next === "on" } }));
  };

  const hint = lamp === "on" ? "click to switch off" : lamp === "off" && touched ? "click to switch on" : null;

  return (
    // The hero holds the centre of the screen for 70% of a screen of scroll
    // after the window finishes opening, so the scroll that carried you through
    // the window runs out while it's sitting still and clickable — instead of
    // carrying it straight past the centre.
    <div className="relative h-[170vh]">
      {/* Hidden while the welcome window's copy of it is on screen, so the two
          are never visible together (WelcomeWindow sets data-gate on <html>).
          Kept on the element itself rather than in globals.css, which a
          running dev server can serve stale. */}
      <section className={`behind-gate sticky top-0 [html[data-gate=closed]_&]:invisible ${HERO_BOX}`}>
        <HeroContent lamp={lamp} hint={hint} onToggle={toggle} />
      </section>
    </div>
  );
}
