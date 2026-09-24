"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLenis } from "lenis/react";
import { motion, useReducedMotion } from "framer-motion";
import { Firefly } from "@/components/Firefly";

/**
 * Home page welcome gate — a lofi window you open by scrolling.
 *
 * The window is a wall with a hole in it, standing in front of the page. What
 * you see through the glass is the page itself: its own sky, its own city and
 * the one real hero, already pinned to the screen behind the wall (HeroLightOn
 * renders this gate and passes its hero in). Nothing out there is a copy, so
 * there is no hand-off and nothing can change at a seam.
 *
 * Scroll slides the two glass sashes apart, then the whole room (wall, sashes,
 * frame, sill) scales out past the screen edges while the hero grows to full
 * size. The small light slips out through the gap and lands on the hero's
 * lamp, which switches on as the wall disappears. Every move is tied to
 * scroll — nothing makes anyone wait.
 *
 * Progress: a plain scroll listener on an invisible spacer (framer useScroll
 * misbehaves with Lenis here). Portalled to <body>.
 */

/** Fired the first time the wall is fully gone; the hero's lamp switches on. */
export const GATE_DONE_EVENT = "gate:done";
/** id of the page's fixed sky layer, which the window lifts while it's up. */
export const NIGHT_SKY_ID = "night-sky";

const clamp = (n: number, a = 0, b = 1) => Math.min(Math.max(n, a), b);
const map = (v: number, inA: number, inB: number, outA: number, outB: number) =>
  outA + clamp((v - inA) / (inB - inA)) * (outB - outA);

const WIN = { top: 4, bottom: 80, left: 5, right: 95 };
const SILL = WIN.bottom;
const DARK = "#0a1424";

function Sash({ side, sashRef }: { side: "left" | "right"; sashRef: React.Ref<HTMLDivElement> }) {
  const isLeft = side === "left";
  return (
    <div
      ref={sashRef}
      className="absolute [image-rendering:pixelated] will-change-transform"
      style={{
        top: `${WIN.top}%`,
        bottom: `${100 - WIN.bottom}%`,
        left: isLeft ? `${WIN.left}%` : `${(WIN.left + WIN.right) / 2}%`,
        width: `${(WIN.right - WIN.left) / 2}%`,
      }}
    >
      {/* night glass: dims the sky behind while closed */}
      <div className="absolute inset-0 bg-[#0c1c38]/45" />
      <div className="absolute inset-0 bg-[linear-gradient(120deg,transparent_38%,rgba(160,195,230,0.10)_46%,transparent_54%)]" />
      {/* sash frame + muntins (2 x 4 lites) */}
      <div className="absolute inset-0" style={{ boxShadow: `inset 0 0 0 6px ${DARK}` }} />
      <div className="absolute inset-y-0 left-1/2 w-[5px] -translate-x-1/2" style={{ background: DARK }} />
      {[25, 50, 75].map((y) => (
        <div key={y} className="absolute inset-x-0 h-[5px]" style={{ top: `${y}%`, background: DARK }} />
      ))}
      {/* pull handle on the meeting stile */}
      <div
        className={`absolute top-1/2 ${isLeft ? "right-1" : "left-1"} h-12 w-[6px] -translate-y-1/2 rounded bg-[#1b2c48]`}
      />
    </div>
  );
}

function OuterFrame() {
  const T = 12;
  return (
    <div
      className="pointer-events-none absolute [image-rendering:pixelated]"
      style={{ top: `${WIN.top}%`, bottom: `${100 - WIN.bottom}%`, left: `${WIN.left}%`, right: `${100 - WIN.right}%` }}
    >
      <div className="absolute" style={{ top: -T, left: -T, right: -T, height: T, background: DARK }} />
      <div className="absolute" style={{ bottom: -T, left: -T, right: -T, height: T, background: DARK }} />
      <div className="absolute" style={{ left: -T, top: -T, bottom: -T, width: T, background: DARK }} />
      <div className="absolute" style={{ right: -T, top: -T, bottom: -T, width: T, background: DARK }} />
      <div className="absolute" style={{ top: -T, left: -T, right: -T, height: 3, background: "#25395a" }} />
    </div>
  );
}

/** Darkness around the opening. Part of the room, so it flies away with it. */
function Wall() {
  return (
    <div
      className="pointer-events-none absolute"
      style={{
        top: `${WIN.top}%`,
        bottom: `${100 - WIN.bottom}%`,
        left: `${WIN.left}%`,
        right: `${100 - WIN.right}%`,
        boxShadow: `0 0 0 200vmax ${DARK}`,
      }}
    />
  );
}

function SillStuff() {
  return (
    <>
      {/* left: a tall bottle + a mug */}
      <div className="absolute [image-rendering:pixelated]" style={{ left: "9%", bottom: `${100 - SILL}%` }}>
        <div className="relative h-16 w-14">
          <div className="absolute bottom-0 left-1 h-14 w-4 rounded-t bg-[#12335c]" />
          <div className="absolute bottom-12 left-[9px] h-3 w-1.5 bg-[#12335c]" />
          <div className="absolute bottom-0 left-7 h-6 w-6 rounded-b bg-[#0d2545]" />
          <div className="absolute bottom-2 left-[46px] h-3.5 w-3.5 rounded-full border-2 border-[#0d2545]" />
        </div>
      </div>
      {/* right: a vase with dried stems + two jars */}
      <div className="absolute [image-rendering:pixelated]" style={{ right: "9%", bottom: `${100 - SILL}%` }}>
        <div className="relative h-24 w-24">
          {[-16, -4, 8, 20].map((r, i) => (
            <div
              key={i}
              className="absolute bottom-12 right-8 w-[3px] origin-bottom rounded-t bg-[#173a63]"
              style={{ height: 34 + (i % 2) * 12, transform: `rotate(${r}deg)` }}
            >
              <div className="absolute -left-1 top-1/3 h-2 w-2 rounded-full bg-[#1c4570]" />
            </div>
          ))}
          <div className="absolute bottom-0 right-6 h-14 w-9 rounded-t-md rounded-b bg-[#0f2c50]" />
          <div className="absolute bottom-0 right-0 h-8 w-6 rounded bg-[#0d2545]" />
          <div className="absolute bottom-0 right-[68px] h-6 w-5 rounded bg-[#0d2545]" />
        </div>
      </div>
    </>
  );
}

function Sill() {
  return (
    <div className="pointer-events-none absolute inset-x-0 [image-rendering:pixelated]" style={{ top: `${SILL}%`, bottom: 0 }}>
      <div className="absolute inset-x-0 top-0 h-[10px] bg-[#132741]" />
      <div className="absolute inset-x-0 top-[10px] h-[10px] bg-[#0c1c30]" />
      <div className="absolute inset-x-0 top-[20px] bottom-0 bg-[#060d18]" />
    </div>
  );
}

export default function WelcomeWindow({
  heroRef,
  lampRef,
}: {
  heroRef: React.RefObject<HTMLElement | null>;
  lampRef: React.RefObject<HTMLSpanElement | null>;
}) {
  const spacerRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);

  // Scroll moves the layers by writing their styles directly. Re-rendering the
  // gate on every scroll frame (hundreds of painted windows) held a throttled
  // laptop to 20fps on the fly-through; React only hears about the three
  // moments that change what's on the page.
  const [open, setOpen] = useState(false); // past the sashes: clicks go through
  const [gone, setGone] = useState(false); // the wall is out of sight

  const gateRef = useRef<HTMLDivElement>(null);
  const roomRef = useRef<HTMLDivElement>(null);
  const sashLRef = useRef<HTMLDivElement>(null);
  const sashRRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const flyRef = useRef<HTMLSpanElement>(null);
  const measureRef = useRef<() => void>(() => {});

  // Lenis moves the page inside its own animation frame and only raises the
  // browser's scroll event on the next one. Hooking Lenis directly keeps the
  // wall and the hero on the same frame as the page.
  useLenis(() => measureRef.current(), []);

  useEffect(() => {
    if (!mounted) return;
    const origin = `50% ${(WIN.top + WIN.bottom) / 2}%`;
    const hero = heroRef.current;
    for (const el of [hero, roomRef.current]) if (el) el.style.transformOrigin = origin;
    // The page's sky (page.tsx). Its city is drawn along the bottom of the
    // screen, which the sill covers, so while the room is up the sky is lifted
    // to sit the city on the sill, and it rides down with the sill as the
    // room flies out. Same city, just seen from a step back.
    const sky = document.getElementById(NIGHT_SKY_ID);
    const root = document.documentElement;

    // Two phases across the spacer, each one screen tall, all tied to scroll.
    //   0   → 0.44  sashes slide apart; the hero surfaces behind them
    //   0.5 → 1     fly-through: the room scales past the screen edges and the
    //               hero grows to full size, clickable the whole way.
    let wasGone = false;
    const apply = (p: number) => {
      const offset = map(p, 0.06, 0.44, 0, 108); // sash travel, %
      const fly = map(p, 0.5, 1, 0, 1);
      const ease = fly * fly * (3 - 2 * fly);
      const roomScale = reduce ? 1 : 1 + ease * 2.4;
      if (sashLRef.current) sashLRef.current.style.transform = `translateX(${-offset}%)`;
      if (sashRRef.current) sashRRef.current.style.transform = `translateX(${offset}%)`;
      if (roomRef.current) {
        roomRef.current.style.transform = `scale(${roomScale})`;
        roomRef.current.style.opacity = String(reduce ? 1 - map(p, 0.5, 0.9, 0, 1) : 1 - map(p, 0.84, 0.97, 0, 1));
      }
      if (sky) {
        const h = window.innerHeight;
        const originY = (h * (WIN.top + WIN.bottom)) / 200;
        const sillTop = originY + ((h * SILL) / 100 - originY) * roomScale;
        const lift = reduce && p > 0.5 ? 0 : Math.max(0, h - sillTop);
        sky.style.transform = lift > 0.5 ? `translateY(${-lift}px)` : "";
      }
      if (hero) {
        // the first frame is only the window; the hero surfaces behind the
        // glass as the sashes part, then grows into place on the fly-through.
        // At rest it carries no styles at all. (No will-change: the text is
        // redrawn sharp at each size instead of stretching a snapshot.)
        const appear = map(p, 0.1, 0.38, 0, 1);
        const rise = reduce ? 0 : (1 - appear) * 24;
        const scale = reduce ? 1 : 0.6 + ease * 0.4;
        hero.style.opacity = appear === 1 ? "" : String(appear);
        hero.style.transform = scale === 1 && rise === 0 ? "" : `translateY(${rise}px) scale(${scale})`;
      }
      if (hintRef.current) hintRef.current.style.opacity = String(1 - map(p, 0, 0.1, 0, 1));

      // the small light: out through the gap between the sashes, a lazy arc,
      // then onto the lamp, positioned straight from the lamp's live rect
      const dot = flyRef.current;
      const lamp = lampRef.current;
      if (dot && lamp) {
        const visible = !reduce && p > 0.3 && p < 0.999;
        dot.style.opacity = visible ? String(map(p, 0.3, 0.36, 0, 1)) : "0";
        if (visible) {
          const t = map(p, 0.3, 0.9, 0, 1);
          const k = t * t * (3 - 2 * t);
          const r = lamp.getBoundingClientRect();
          const sx = window.innerWidth / 2;
          const sy = window.innerHeight * 0.45;
          const x = sx + (r.left + r.width / 2 - 3 - sx) * k;
          const y = sy + (r.top + 5 - sy) * k - Math.sin(Math.PI * k) * 90;
          dot.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        }
      }

      // hidden straight from here, in the same frame as the positions above
      const isGone = p >= 0.999;
      if (gateRef.current) gateRef.current.style.visibility = isGone ? "hidden" : "visible";
      const gate = isGone ? "done" : "closed";
      if (root.dataset.gate !== gate) root.dataset.gate = gate;
      // the site menu stays out of the glass until the sashes are open (TopNavbar)
      const sashes = p > 0.5 ? "open" : "shut";
      if (root.dataset.sashes !== sashes) root.dataset.sashes = sashes;

      // first arrival: the hero plays its lamp-on beat (HeroLightOn)
      if (isGone && !wasGone) window.dispatchEvent(new Event(GATE_DONE_EVENT));
      wasGone = isGone;

      setOpen(p > 0.5);
      setGone(isGone);
    };

    const measure = () => {
      const el = spacerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      apply(rect.height > 0 ? clamp(-rect.top / rect.height) : 0);
    };
    // Measured in the scroll event too, for when Lenis is off (reduced motion).
    measureRef.current = measure;
    measure();
    window.addEventListener("scroll", measure, { passive: true });
    window.addEventListener("resize", measure);
    return () => {
      measureRef.current = () => {};
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (hero) {
        hero.style.opacity = "";
        hero.style.transform = "";
        hero.style.transformOrigin = "";
      }
      if (sky) sky.style.transform = "";
      delete root.dataset.sashes;
    };
  }, [mounted, reduce, heroRef, lampRef]);

  useEffect(() => {
    const init = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(init);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.gate = gone ? "done" : "closed";
    return () => {
      delete root.dataset.gate;
    };
  }, [gone]);

  /** Scroll past the spacer so the gate finishes opening on its own. */
  const openGate = useCallback(() => {
    const el = spacerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    window.scrollTo({
      top: window.scrollY + rect.top + rect.height,
      behavior: reduce ? "auto" : "smooth",
    });
  }, [reduce]);

  // Esc dismisses the gate, like any other overlay.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") openGate();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openGate]);

  return (
    <>
      {/* two screens: one for the gate, one to fly through it. Laid over the
          top of HeroLightOn's runway, which pins the hero for all of it. */}
      <div ref={spacerRef} aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-[200vh]" />
      {!mounted && <div aria-hidden className="fixed inset-0 z-[70]" style={{ background: DARK }} />}
      {mounted &&
        createPortal(
          <div
            ref={gateRef}
            aria-hidden
            onClick={openGate}
            className="fixed inset-0 z-[70] overflow-hidden [image-rendering:pixelated]"
            style={{
              pointerEvents: open ? "none" : "auto",
              visibility: gone ? "hidden" : "visible",
              cursor: open ? "default" : "pointer",
            }}
          >
            <div ref={roomRef} className="absolute inset-0 will-change-transform">
              <Wall />
              <Sash side="left" sashRef={sashLRef} />
              <Sash side="right" sashRef={sashRRef} />
              <OuterFrame />
              <Sill />
              <SillStuff />
            </div>

            <Firefly ref={flyRef} className="fixed opacity-0" />

            <div ref={hintRef} className="pointer-events-none absolute bottom-[9%] left-1/2 z-10 -translate-x-1/2 text-center">
              <p className="font-[family-name:var(--font-pixel)] text-[10px] uppercase tracking-[0.35em] text-sky-100/80 md:text-xs">
                scroll or click to open
              </p>
              <motion.div
                animate={reduce ? undefined : { y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                className="mx-auto mt-2 h-4 w-4 rotate-45 border-b-2 border-r-2 border-sky-100/60"
              />
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
