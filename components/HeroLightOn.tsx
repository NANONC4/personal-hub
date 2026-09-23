"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { InteractiveHoverButton } from "@/components/InteractiveHoverButton";

/*
 * Scene 01 of docs/animation-plan.md — the hero.
 *
 * Readable the moment it is on screen: no dark room to wait through (Dia
 * tried that and it read as a stuck page). The entrance happens in the
 * welcome window instead, tied to scroll: the same HeroContent is already
 * visible on the sky behind the glass and grows into place as you fly through
 * (see WelcomeWindow).
 *
 * The lamp in the badge is a toy, not a gate: click it and the room light
 * goes off, the sky darkens and every window in the city snaps on
 * (PixelSky listens for "night:lights"). Click again to switch it back.
 * No soft glows anywhere — light is shown by things switching on.
 */

export const NIGHT_LIGHTS_EVENT = "night:lights";

function PixelLamp({ on, lampRef }: { on: boolean; lampRef?: React.Ref<HTMLSpanElement> }) {
  return (
    <span ref={lampRef} aria-hidden className="relative inline-block h-[18px] w-4 shrink-0 [image-rendering:pixelated]">
      <span className="absolute left-0.5 top-0 h-[7px] w-3 bg-slate-400 [clip-path:polygon(22%_0,78%_0,100%_100%,0_100%)]" />
      <span className={`absolute left-[5px] top-[6px] h-[3px] w-1.5 transition-colors duration-150 ${on ? "bg-amber-100" : "bg-slate-600"}`} />
      {/* hard pixel light cone, no blur */}
      <span
        className={`absolute left-[-3px] top-[9px] h-[9px] w-[22px] bg-amber-200/25 transition-opacity duration-150 [clip-path:polygon(35%_0,65%_0,100%_100%,0_100%)] ${on ? "opacity-100" : "opacity-0"}`}
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
 * hand-off between them is pixel-identical.
 */
export function HeroContent({
  lightsOn,
  onToggle,
  lampRef,
}: {
  lightsOn: boolean;
  onToggle?: () => void;
  lampRef?: React.Ref<HTMLSpanElement>;
}) {
  const badgeInner = (
    <>
      <PixelLamp on={lightsOn} lampRef={lampRef} />
      <span className="font-mono text-sm uppercase tracking-widest text-slate-300">
        {lightsOn ? "The light's on" : "The light's off"}
      </span>
      {onToggle && (
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-slate-500 transition-colors group-hover:text-pink-300 sm:inline">
          · {lightsOn ? "click to switch off" : "click to switch on"}
        </span>
      )}
    </>
  );
  const badgeClass =
    "relative mb-10 inline-flex items-center gap-3 rounded-full border border-slate-700/50 bg-slate-800/80 px-4 py-2";

  return (
    <div className="w-full">
      {onToggle ? (
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={!lightsOn}
          aria-label={lightsOn ? "ปิดไฟในห้อง" : "เปิดไฟในห้อง"}
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
        <span className="inline-block animate-gradient-text bg-gradient-to-r from-sky-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
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

/** Same box in the page and in the welcome window, so the two line up exactly. */
export const HERO_BOX = "mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-6 py-20 lg:py-32";

export default function HeroLightOn() {
  const [lightsOn, setLightsOn] = useState(true);

  const toggle = () => {
    const next = !lightsOn;
    setLightsOn(next);
    window.dispatchEvent(new CustomEvent(NIGHT_LIGHTS_EVENT, { detail: { on: next } }));
  };

  return (
    // hidden while the welcome window's copy of it is on screen (globals.css)
    <section className={`behind-gate relative ${HERO_BOX}`}>
      <HeroContent lightsOn={lightsOn} onToggle={toggle} />
    </section>
  );
}
