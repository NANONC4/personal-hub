"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";
import { Firefly } from "@/components/Firefly";

/*
 * Scene 01 of docs/animation-plan.md — "The light's on".
 *
 * The hero arrives dark. The small light from the welcome window drifts in,
 * lands on the desk lamp in the badge, the lamp flickers on, and the room
 * light spreads: letters light up nearest-the-lamp first, "Creative
 * Developer" catches like a neon sign, the rest settles in. After that a soft
 * pool of lamplight follows the mouse.
 *
 * Plays once, when the section is actually on screen — the old hero animated
 * on page load, while it was still hidden behind the welcome window.
 */

type Phase = "dark" | "fly" | "flicker" | "lit";

const EASE = [0.22, 1, 0.36, 1] as const;
const DIM = 0.1;
const LETTER_STEP = 0.06;

function PixelLamp({ phase, lampRef }: { phase: Phase; lampRef: React.RefObject<HTMLSpanElement | null> }) {
  const bulb =
    phase === "flicker"
      ? { opacity: [0.12, 1, 0.15, 1, 0.3, 1], transition: { duration: 0.9, times: [0, 0.15, 0.3, 0.5, 0.7, 1] } }
      : { opacity: phase === "lit" ? 1 : 0.12 };

  return (
    <span ref={lampRef} aria-hidden className="relative inline-block h-[18px] w-4 shrink-0 [image-rendering:pixelated]">
      <span className="absolute left-0.5 top-0 h-[7px] w-3 bg-slate-400 [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)]" />
      <motion.span
        className="absolute left-[5px] top-[6px] h-[3px] w-1.5 bg-amber-100 shadow-[0_0_8px_2px_rgba(254,240,138,0.7)]"
        initial={false}
        animate={bulb}
      />
      <span className="absolute left-[7px] top-[7px] h-[9px] w-0.5 bg-slate-500" />
      <span className="absolute bottom-0 left-[3px] h-0.5 w-2.5 bg-slate-500" />
    </span>
  );
}

function LitLetters({ text, start, lit, reduce }: { text: string; start: number; lit: boolean; reduce: boolean }) {
  return (
    <span className="inline-flex">
      {Array.from(text).map((ch, i) => (
        <motion.span
          key={i}
          className="inline-block origin-bottom"
          initial={{ opacity: reduce ? 1 : DIM }}
          animate={
            lit
              ? {
                  opacity: 1,
                  textShadow: ["0 0 0px rgba(251,191,36,0)", "0 0 18px rgba(251,191,36,0.55)", "0 0 0px rgba(251,191,36,0)"],
                }
              : { opacity: DIM }
          }
          transition={{ delay: reduce ? 0 : (start + i) * LETTER_STEP, duration: reduce ? 0 : 1.1, ease: EASE }}
          whileHover={{ y: -8, rotate: i % 2 ? 4 : -4, transition: { duration: 0.2 } }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

export default function HeroLightOn() {
  const sectionRef = useRef<HTMLElement>(null);
  const lampRef = useRef<HTMLSpanElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();
  const inView = useInView(sectionRef, { once: true, amount: 0.45 });
  const [rawPhase, setPhase] = useState<Phase>("dark");
  const phase: Phase = reduce ? "lit" : rawPhase;
  const [flight, setFlight] = useState<{ x: number[]; y: number[] } | null>(null);
  const [touch, setTouch] = useState(false);

  // the sequence, once, when the hero is really in view
  useEffect(() => {
    if (!inView || reduce) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const later = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

    later(0, () => {
      const sec = sectionRef.current?.getBoundingClientRect();
      const lamp = lampRef.current?.getBoundingClientRect();
      if (!sec || !lamp) return setPhase("lit");
      const tx = lamp.left - sec.left + lamp.width / 2 - 3;
      const ty = lamp.top - sec.top + 4;
      // enters high on the right, where the window scene was, and curls down onto the lamp
      setFlight({
        x: [sec.width * 0.92, sec.width * 0.62, tx + 70, tx],
        y: [-30, sec.height * 0.1, ty - 60, ty],
      });
      setPhase("fly");
    });
    later(1600, () => setPhase("flicker"));
    later(2500, () => setPhase("lit"));
    return () => timers.forEach(clearTimeout);
  }, [inView, reduce]);

  // no mouse on phones: the lamplight sways a little on its own instead
  useEffect(() => {
    const coarse = !window.matchMedia("(pointer: fine)").matches;
    if (coarse) {
      const id = setTimeout(() => setTouch(true), 0);
      return () => clearTimeout(id);
    }
  }, []);

  // after the light is on, a soft pool of lamplight follows the mouse
  useEffect(() => {
    if (phase !== "lit" || reduce || touch) return;
    const sec = sectionRef.current;
    const glow = cursorGlowRef.current;
    if (!sec || !glow) return;
    let raf = 0;
    let x = 0;
    let y = 0;
    const move = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      x = e.clientX - r.left;
      y = e.clientY - r.top;
      glow.style.opacity = y > -80 && y < r.height + 80 ? "1" : "0";
      if (!raf) {
        raf = requestAnimationFrame(() => {
          raf = 0;
          glow.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        });
      }
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, [phase, reduce, touch]);

  const lit = phase === "lit";
  const words = ["Hi,", "I'm"];
  const diaStart = words.join("").length + 1;
  const afterLetters = (diaStart + 4) * LETTER_STEP;

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-20 lg:py-32"
    >
      {/* the room with the lights off; lifts as the lamp comes on */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[calc(50%-50vw)] w-screen bg-[#02050b] [mask-image:linear-gradient(transparent,black_16%,black_84%,transparent)]"
        initial={{ opacity: reduce ? 0 : 0.78 }}
        animate={{ opacity: lit ? 0 : 0.78 }}
        transition={{ duration: 1.8, ease: EASE }}
      />

      {/* lamplight that follows the mouse (desktop only) */}
      <div
        ref={cursorGlowRef}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 -ml-[240px] -mt-[240px] h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.09),transparent_65%)] opacity-0 transition-opacity duration-700 will-change-transform"
      />

      {flight && (
        <Firefly
          initial={{ x: flight.x[0], y: flight.y[0], opacity: 0 }}
          animate={
            phase === "fly"
              ? { x: flight.x, y: flight.y, opacity: [0, 1, 1, 1] }
              : { opacity: 0, transition: { duration: 0.25 } }
          }
          transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.35, 0.75, 1] }}
        />
      )}

      <div className="relative z-10 w-full">
        {/* badge: the lamp lives here, and so does the room light it throws */}
        <div className="relative mb-10 inline-flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/80 px-4 py-2">
          <motion.span
            aria-hidden
            className={`pointer-events-none absolute left-4 top-1/2 -z-10 -ml-[450px] -mt-[450px] h-[900px] w-[900px] rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.16),rgba(251,191,36,0.05)_40%,transparent_68%)] ${
              lit && touch && !reduce ? "animate-[lamp-sway_8s_ease-in-out_infinite]" : ""
            }`}
            initial={{ opacity: reduce ? 1 : 0, scale: reduce ? 1 : 0.2 }}
            animate={lit ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.2 }}
            transition={{ duration: 1.4, ease: EASE }}
          />
          <PixelLamp phase={phase} lampRef={lampRef} />
          <span className="font-mono text-sm uppercase tracking-widest text-slate-300">
            {lit ? "The light's on" : "The light's off"}
          </span>
        </div>

        <h1 className="mb-10 flex flex-wrap items-end gap-3 text-5xl font-black leading-[1] tracking-tighter text-foreground drop-shadow-lg md:gap-4 md:text-7xl lg:text-8xl">
          {words.map((w, k) => (
            <LitLetters key={w} text={w} start={words.slice(0, k).join("").length} lit={lit} reduce={reduce} />
          ))}
          {/* the name lights last and as one, with a little more glow */}
          <motion.span
            className="inline-block animate-gradient-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent"
            initial={{ opacity: reduce ? 1 : DIM }}
            animate={
              lit
                ? { opacity: 1, filter: ["drop-shadow(0 0 0px rgba(244,114,182,0))", "drop-shadow(0 0 22px rgba(244,114,182,0.6))", "drop-shadow(0 0 0px rgba(244,114,182,0))"] }
                : { opacity: DIM }
            }
            transition={{ delay: reduce ? 0 : diaStart * LETTER_STEP, duration: reduce ? 0 : 1.4, ease: EASE }}
          >
            Dia.
          </motion.span>
        </h1>

        {/* catches like a neon sign: a stutter, then steady */}
        <div className="mb-12 flex flex-wrap items-center gap-4 font-[family-name:var(--font-pixel)] text-3xl drop-shadow-lg md:text-5xl">
          {[
            { t: "Creative", c: "text-pink-400 drop-shadow-[0_0_10px_rgba(244,114,182,0.35)]" },
            { t: "Developer", c: "text-sky-400 drop-shadow-[0_0_10px_rgba(56,189,248,0.35)]" },
          ].map((w, k) => (
            <motion.span
              key={w.t}
              className={w.c}
              initial={{ opacity: reduce ? 1 : DIM }}
              animate={lit ? { opacity: [DIM, 1, 0.15, 1, 0.4, 1] } : { opacity: DIM }}
              transition={{
                delay: reduce ? 0 : afterLetters + 0.2 + k * 0.22,
                duration: reduce ? 0 : 0.9,
                times: [0, 0.12, 0.24, 0.46, 0.62, 1],
              }}
            >
              {w.t}
            </motion.span>
          ))}
        </div>

        <motion.div
          initial={{ opacity: reduce ? 1 : DIM }}
          animate={{ opacity: lit ? 1 : DIM }}
          transition={{ delay: reduce ? 0 : afterLetters + 0.9, duration: reduce ? 0 : 1.2, ease: EASE }}
        >
          <p className="mb-12 max-w-2xl text-xl font-medium leading-relaxed text-slate-200 md:text-2xl">
            นักพัฒนาที่หลงใหลในศิลปะ{" "}
            <span className="font-[family-name:var(--font-pixel)] tracking-widest text-pink-400">Pixel Art</span>{" "}
            สร้างสรรค์ประสบการณ์บนเว็บไซต์และมินิเกม เพื่อเปลี่ยนไอเดียให้กลายเป็นโค้ดที่จับต้องได้
          </p>

          <div className="flex flex-wrap items-center gap-6">
            <InteractiveHoverButton asLink href="#about" text="Read My Story" className="h-12 w-56 text-base" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
