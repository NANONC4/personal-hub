"use client";

import { useEffect, useRef, useState } from "react";
import { TechBreakout, TECH_GROUPS } from "@/components/TechBreakout";

/*
 * Scene 03 — "What I use". Tied to the scroll, both ways.
 *
 * The game's building is a real box in CSS 3D: the game on the front, lit
 * windows on the sides and back, the antenna, tank and cat on the roof. It
 * comes in with its back to you, seen from a little above, and turns half a
 * circle as you scroll until the game faces you and the camera has come down
 * level. The heading's letters flip up one by one as it turns, and the tools
 * in the list switch on, each brick showing up in the game with its tool.
 *
 * Only transforms are written per frame (straight to the DOM); React hears
 * about the list when another tool switches on. Reduced motion: it just
 * faces you with everything on.
 */

const ALL = TECH_GROUPS.flatMap((g) => g.items.map((t) => t.text));
const HEADING = "WHAT I USE";

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

/** A wall of the building: dark, with a grid of pixel windows, some lit. */
function Wall({
  cols,
  seed,
  shade,
}: {
  cols: number;
  seed: number;
  shade: string;
}) {
  const rows = 9;
  return (
    <div className="absolute inset-0 p-[8%]" style={{ background: shade }}>
      <div
        className="grid h-full gap-[6%]"
        style={{
          gridTemplateColumns: `repeat(${cols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
        }}
      >
        {Array.from({ length: cols * rows }, (_, k) => {
          const r = Math.sin((k + 1) * 12.9898 + seed * 78.233) * 43758.5453;
          const lit = r - Math.floor(r);
          return (
            <span
              key={k}
              className="block"
              style={{
                background:
                  lit < 0.38 ? "#e9c989" : lit < 0.44 ? "#7dd3fc" : "#060c18",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

/** The other five faces of the box, around the cabinet's own front. Depth is
 *  `--d`, set from the cabinet's width. */
function Box() {
  const face = "pointer-events-none absolute [backface-visibility:hidden]";
  return (
    // preserve-3d here too, or the faces flatten into this div and vanish
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [transform-style:preserve-3d]"
    >
      {/* back: faces away until the box has turned */}
      <div
        className={`${face} inset-0`}
        style={{ transform: "translateZ(calc(var(--d) * -1)) rotateY(180deg)" }}
      >
        <Wall cols={6} seed={3} shade="#0a1426" />
      </div>
      {/* left and right: hinged on the front edges, running back, facing out */}
      <div
        className={`${face} bottom-0 top-0 origin-right`}
        style={{
          width: "var(--d)",
          left: "calc(var(--d) * -1)",
          transform: "rotateY(-90deg)",
        }}
      >
        <Wall cols={3} seed={7} shade="#08111f" />
      </div>
      <div
        className={`${face} bottom-0 top-0 origin-left`}
        style={{
          width: "var(--d)",
          right: "calc(var(--d) * -1)",
          transform: "rotateY(90deg)",
        }}
      >
        <Wall cols={3} seed={11} shade="#0d1a2f" />
      </div>
      {/* roof: hinged on the front top edge, lying back, facing up */}
      <div
        className={`${face} inset-x-0 origin-bottom bg-[#1c2c48]`}
        style={{
          height: "var(--d)",
          top: "calc(var(--d) * -1)",
          transform: "rotateX(90deg)",
        }}
      />
    </div>
  );
}

export default function WhatIUse() {
  const sectionRef = useRef<HTMLElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const letterEls = useRef<(HTMLSpanElement | null)[]>([]);
  const introRef = useRef<HTMLParagraphElement>(null);
  const listRef = useRef<HTMLDListElement>(null);
  const [lit, setLit] = useState(ALL.length);

  useEffect(() => {
    const section = sectionRef.current;
    const box = boxRef.current;
    if (!section || !box) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // the box is as deep as 45% of the cabinet's width
    const cabinet = box.querySelector<HTMLElement>("[data-cabinet]");
    const size = () => {
      if (cabinet)
        box.style.setProperty(
          "--d",
          `${Math.round(cabinet.offsetWidth * 0.45)}px`,
        );
    };
    size();
    const ro = new ResizeObserver(size);
    if (cabinet) ro.observe(cabinet);

    // ---- the words: hidden until the building lands, then played once ----
    const words = () => [...letterEls.current, introRef.current, listRef.current].filter(Boolean) as HTMLElement[];
    // `fade`: going back up, they go quickly rather than blink out
    const hideWords = (fade = false) => {
      const out = fade ? "opacity .25s ease, transform .25s ease" : "none";
      letterEls.current.forEach((el) => {
        if (!el) return;
        el.style.transition = out;
        el.style.opacity = "0";
        el.style.transform = "rotateX(-95deg)";
      });
      for (const el of [introRef.current, listRef.current]) {
        if (!el) continue;
        el.style.transition = out;
        el.style.opacity = "0";
        el.style.transform = "translateY(24px)";
      }
      setLit(0);
    };
    let played = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const land = () => {
      played = true;
      const ease = "cubic-bezier(.2,.8,.2,1)";
      letterEls.current.forEach((el, i) => {
        if (!el) return;
        el.style.transition = `transform .5s ${ease} ${i * 70}ms, opacity .3s ease ${i * 70}ms`;
      });
      introRef.current && (introRef.current.style.transition = `transform .6s ${ease} 650ms, opacity .6s ease 650ms`);
      listRef.current && (listRef.current.style.transition = `transform .6s ${ease} 850ms, opacity .6s ease 850ms`);
      requestAnimationFrame(() =>
        words().forEach((el) => {
          el.style.opacity = "1";
          el.style.transform = "";
        }),
      );
      // then the tools switch on one by one, each brick appearing with it
      for (let n = 1; n <= ALL.length; n++) timers.push(setTimeout(() => setLit(n), 1150 + n * 110));
    };

    let frame = 0;
    const read = () => {
      frame = 0;
      // The zone pins to the screen (sticky, inside a taller runway) and the
      // turn plays while it's held there, so it's all in full view. 0 the
      // moment it pins, 1 when it lets go.
      const vh = window.innerHeight;
      const r = section.getBoundingClientRect();
      const q = clamp(-r.top / Math.max(1, r.height - vh));
      // The zone starts empty but for the city. One of its buildings is this
      // one: small, standing in the skyline with its windowed back to you,
      // like all the others. Then it lifts out of the row, spinning round as
      // it comes forward and grows to full size, and lands facing you. Only
      // then do the words arrive.
      const come = smooth(clamp(q / 0.8));
      const phone = window.innerWidth < 768;
      const spin = phone ? 180 : 540; // ends facing front; starts with its back (the windows) to you
      const angle = (1 - come) * spin;
      const tilt = -26 * Math.sin(Math.PI * come); // leans back mid-flight, level at both ends
      const scale = 0.13 + 0.87 * come;
      const drop = (1 - come) * 43; // vh: starts down among the skyline
      box.style.transform =
        come >= 1
          ? ""
          : `translateY(${drop}vh) scale(${scale}) translateZ(calc(var(--d) * -0.5)) rotateX(${tilt}deg) rotateY(${angle}deg) translateZ(calc(var(--d) * 0.5))`;

      // The words wait, hidden, until it has landed; then they play out on
      // their own, not tied to the scroll, so nobody is left wondering
      // whether to keep scrolling for the rest.
      // scrolling back up takes them away with the building; landing again
      // plays them again
      if (!played) {
        if (come >= 1) land();
        else hideWords();
      } else if (come < 0.97) {
        played = false;
        timers.forEach(clearTimeout);
        timers.length = 0;
        hideWords(true);
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    frame = requestAnimationFrame(read);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const shown = ALL.slice(0, lit);
  let letter = 0;

  return (
    // a runway two screens tall; the zone itself stays pinned in it
    <section ref={sectionRef} className="relative z-20 h-[200vh] w-full">
      <div className="sticky top-0 flex min-h-screen w-full items-center overflow-clip">
        <div className="mx-auto w-full max-w-7xl px-6 py-12 lg:py-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:items-center lg:gap-14">
            {/* The stack, readable without playing. */}
            <div>
              <h2 className="font-[family-name:var(--font-pixel)] text-3xl uppercase tracking-wider text-white [perspective:600px] md:text-5xl">
                <span className="sr-only">What I Use</span>
                {[...HEADING].map((ch, i) => {
                  if (ch === " ")
                    return (
                      <span key={i} aria-hidden>
                        {" "}
                      </span>
                    );
                  const n = letter++;
                  return (
                    <span
                      key={i}
                      aria-hidden
                      ref={(el) => {
                        letterEls.current[n] = el;
                      }}
                      className="inline-block origin-bottom"
                    >
                      {ch}
                    </span>
                  );
                })}
              </h2>

              <p ref={introRef} className="mt-6 max-w-md text-lg leading-relaxed text-slate-400 md:text-xl">
                ของที่ผมใช้ทำงานจริงๆ เอามาเรียงเป็นเกมให้ลองเล่นเล่น
                ยิงโดนอันไหน อันนั้นจะสว่างค้างไว้ ไม่หายไปไหน
              </p>

              {/* One row per tool, in its brick's colour. Each switches on like a
                window and its brick shows up in the game. Names stay readable
                while off. */}
              <dl ref={listRef} className="mt-10 flex flex-col gap-6">
                {TECH_GROUPS.map((g) => (
                  <div key={g.label}>
                    <dt className="font-mono text-xs uppercase tracking-[0.25em] text-slate-500">
                      {g.label}
                    </dt>
                    <dd className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5">
                      {g.items.map((t) => {
                        const on = shown.includes(t.text);
                        return (
                          <span
                            key={t.text}
                            className="flex items-center gap-3"
                          >
                            <span
                              aria-hidden
                              className="h-3 w-3 shrink-0"
                              style={{
                                backgroundColor: on ? t.swatch : "#1e293b",
                                boxShadow: on
                                  ? "none"
                                  : "inset 0 0 0 1px #334155",
                              }}
                            />
                            <span
                              className={`font-mono text-sm uppercase tracking-wide ${on ? "text-slate-200" : "text-slate-500"}`}
                            >
                              {t.text}
                            </span>
                          </span>
                        );
                      })}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* the camera: perspective on the stage, the box turning inside it.
              The cabinet's own front (background, controls, screen) is the
              box's front face, so it is hidden from behind like the others. */}
            <div className="[perspective:1800px] [&_[data-cabinet]]:[backface-visibility:hidden] [&_[data-cabinet]>*:not([data-roof])]:[backface-visibility:hidden]">
              <div
                ref={boxRef}
                className="will-change-transform [transform-style:preserve-3d]"
              >
                <TechBreakout
                  shown={lit >= ALL.length ? null : shown}
                  sides={<Box />}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
