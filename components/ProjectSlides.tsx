"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { PixelHeart } from "@/components/PixelIcons";
import type { Project } from "@/data/projects";

/** Long ease-out. Fast at the start, settles slowly — reads calm rather than snappy. */
const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * How much scroll each slide is worth, on top of the one screen the stage
 * occupies. Half a viewport is about four wheel notches through Lenis — enough
 * for the transition to land, short enough that three projects don't feel like
 * a chore.
 */
const VH_PER_SLIDE = 70;

const clamp = (n: number) => Math.min(1, Math.max(0, n));
const smooth = (t: number) => t * t * (3 - 2 * t);

/**
 * The label has to match what the link actually opens: `demo` is a live site for
 * the web projects but a Drive build for the Unity one.
 */
function outboundLink(p: Project) {
  if (p.links.demo) {
    return { href: p.links.demo, label: p.type === "game" ? "โหลดตัวเกม" : "เปิดเว็บจริง" };
  }
  if (p.links.github) return { href: p.links.github, label: "ดูโค้ดบน GitHub" };
  if (p.links.document) return { href: p.links.document, label: "อ่านเอกสาร" };
  return null;
}

/* ------------------------------------------------------------------ visual */

/* The projects ride in on the last train of the night (scene 04). A car is
   side window, door, the big window with the project in it, door, side
   window, over a coloured band, a skirt and two bogies; the front car gets a
   sloped nose with a headlight. The big window is shaped like the screenshots
   (about 1.85:1), so the whole shot shows. */
const BODY = "#16243d";
const ROOF = "#2b3f5e";
const DARK = "#0b1426";
const BAND = "#be185d"; // the line's colour, the site's pink run darker
/** Car width to height. */
const CAR_RATIO = 2.4;
/** Big on desktop, but never taller than 52% of the screen. */
const CAR_W = `min(80vw, calc(52vh * ${CAR_RATIO}))`;
const CAR_GAP = 0.04; // between cars, as a share of a car's width

/** A window with the light on, and sometimes someone sitting in it. */
function LitWindow({ rider, className }: { rider: boolean; className: string }) {
  return (
    <div aria-hidden className={`absolute overflow-hidden bg-[#e9c989] shadow-[0_0_0_3px_#0b1426] ${className}`}>
      <div className="absolute inset-x-0 top-0 h-[16%] bg-[#d6b476]" />
      {rider && (
        <>
          <div className="absolute bottom-[34%] left-[32%] h-[16%] w-[34%] bg-[#1a2238]" />
          <div className="absolute bottom-0 left-[20%] h-[36%] w-[58%] bg-[#1a2238]" />
        </>
      )}
    </div>
  );
}

/** A door: a narrow panel with a tall window, a seam down the middle. */
function Door({ className }: { className: string }) {
  return (
    <div aria-hidden className={`absolute bg-[#1b2c48] shadow-[inset_0_0_0_2px_#0b1426] ${className}`}>
      <div className="absolute inset-y-0 left-1/2 w-[2px] -translate-x-1/2 bg-[#0b1426]" />
      <div className="absolute left-[16%] top-[10%] h-[42%] w-[26%] bg-[#e9c989]/80" />
      <div className="absolute right-[16%] top-[10%] h-[42%] w-[26%] bg-[#e9c989]/80" />
    </div>
  );
}

/** One car of the train. The project shot goes in `children`. */
function TrainCar({
  children,
  front = false,
  rider = 0,
  width = CAR_W,
}: {
  children: React.ReactNode;
  front?: boolean;
  rider?: number;
  width?: string;
}) {
  return (
    <div className="relative shrink-0 [image-rendering:pixelated]" style={{ width, aspectRatio: CAR_RATIO }}>
      {/* roof: stepped corners, pixel style */}
      <div className="absolute inset-x-[1.5%] top-0 h-[3%]" style={{ background: ROOF }} />
      <div className="absolute inset-x-[0.5%] top-[3%] h-[2%]" style={{ background: ROOF }} />
      <div className="absolute inset-x-0 bottom-[13%] top-[5%]" style={{ background: BODY }} />
      {/* the coloured band along the side, under the windows */}
      <div className="absolute inset-x-0 bottom-[19%] h-[3.5%]" style={{ background: BAND }} />
      {/* side window, door, big window, door, side window */}
      <LitWindow rider={rider % 2 === 1} className="left-[3%] top-[13%] h-[38%] w-[7%]" />
      <Door className="left-[12%] top-[9%] h-[70%] w-[8%]" />
      <div className="absolute left-[22%] right-[22%] top-[9%] h-[70%] overflow-hidden bg-[#0b1220] shadow-[0_0_0_4px_#0b1426]">
        {children}
      </div>
      <Door className="right-[12%] top-[9%] h-[70%] w-[8%]" />
      <LitWindow rider={rider % 3 === 0} className="right-[3%] top-[13%] h-[38%] w-[7%]" />
      {/* skirt and two bogies */}
      <div className="absolute inset-x-[2%] bottom-[8%] h-[5%]" style={{ background: DARK }} />
      {[10, 70].map((l) => (
        <div key={l} className="absolute bottom-0 h-[9%] w-[20%]" style={{ left: `${l}%` }}>
          <div className="absolute inset-x-[10%] top-0 h-[40%]" style={{ background: DARK }} />
          <div className="absolute bottom-0 left-0 h-[70%] w-[30%] rounded-full bg-[#1e293b]" />
          <div className="absolute bottom-0 right-0 h-[70%] w-[30%] rounded-full bg-[#1e293b]" />
        </div>
      ))}
      {/* the front car's sloped nose; the train heads left */}
      {front && (
        <div aria-hidden className="absolute bottom-[13%] right-full top-[5%] w-[9%]">
          <div className="absolute inset-0 [clip-path:polygon(100%_0,100%_100%,0_100%,0_52%,55%_0)]" style={{ background: BODY }} />
          <div className="absolute inset-0 [clip-path:polygon(100%_8%,100%_46%,14%_46%,60%_8%)] bg-[#0b1220]" />
          <div className="absolute bottom-[10%] left-0 right-0 h-[7%]" style={{ background: BAND }} />
          <div className="absolute bottom-[24%] left-[6%] h-[7%] w-[16%] bg-amber-100" />
        </div>
      )}
    </div>
  );
}

/** What you see through the window: the project shot, or an honest stand-in
 *  if it fails — PRODUCT.md forbids passing a placeholder off as content. */
function WindowView({ project }: { project: Project }) {
  const [failed, setFailed] = useState(false);
  const src = project.gallery[0];

  if (src && !failed) {
    return (
      <Image
        src={src}
        alt={project.title}
        fill
        sizes="(min-width: 768px) 45vw, 80vw"
        className="object-contain"
        onError={() => setFailed(true)}
      />
    );
  }
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3
                 bg-[linear-gradient(to_right,#94a3b810_1px,transparent_1px),linear-gradient(to_bottom,#94a3b810_1px,transparent_1px)]
                 bg-[size:16px_16px]"
    >
      <span className="font-[family-name:var(--font-pixel)] text-xs uppercase tracking-[0.3em] text-slate-600">
        {project.category}
      </span>
      <span className="font-mono text-[10px] tracking-[0.2em] text-slate-700">ภาพตัวอย่างกำลังมา</span>
    </div>
  );
}

/** One car per project — the mobile list, where nothing is pinned. */
function SlideVisual({ project, i }: { project: Project; i: number }) {
  return (
    <div className="flex justify-end">
      <TrainCar front={i === 0} rider={i} width="92%">
        <WindowView project={project} />
      </TrainCar>
    </div>
  );
}

/* ------------------------------------------------------------------- slide */

/** The words under the window. Swapped on their own; the window never moves. */
function SlideText({ project, reduce }: { project: Project; reduce: boolean }) {
  const link = outboundLink(project);

  const block = {
    enter: { opacity: 0 },
    center: {
      opacity: 1,
      transition: { duration: reduce ? 0.2 : 0.5, ease: EASE, staggerChildren: reduce ? 0 : 0.07, delayChildren: reduce ? 0 : 0.15 },
    },
    exit: { opacity: 0, transition: { duration: reduce ? 0.15 : 0.3, ease: EASE } },
  };
  const line = {
    enter: { opacity: 0, y: reduce ? 0 : 14 },
    center: { opacity: 1, y: 0, transition: { duration: reduce ? 0.2 : 0.6, ease: EASE } },
    exit: { opacity: 0 },
  };

  return (
    <motion.div variants={block} initial="enter" animate="center" exit="exit" className="absolute inset-x-0 top-0">
      <motion.h3
        variants={line}
        className="font-[family-name:var(--font-pixel)] text-2xl uppercase tracking-wider text-white lg:text-3xl"
      >
        {project.title}
      </motion.h3>

      <motion.p variants={line} className="mt-4 line-clamp-3 max-w-[62ch] leading-relaxed text-slate-400">
        {project.description}
      </motion.p>

      <motion.div variants={line} className="mt-6 flex flex-col gap-3">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-slate-500">
          {project.stack.slice(0, 4).join(" · ")}
        </span>
        {link && (
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex w-fit items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-pink-400 transition-colors hover:text-pink-300"
          >
            {link.label}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------- stage */

export default function ProjectSlides({ projects }: { projects: Project[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trainRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion() ?? false;
  const count = projects.length;

  // Lenis runs the page, and framer's useScroll does not stay in step with it —
  // read the rect straight off a passive scroll listener instead.
  useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const el = wrapRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const travel = rect.height - vh;
      if (travel <= 0) return;
      // arriving: the train pulls in from the right while the zone scrolls up
      // into place, slowing to a stop with the first car in the middle
      const arrive = reduce ? 1 : smooth(clamp((vh * 0.85 - rect.top) / (vh * 0.85)));
      // then, pinned, it holds at each car and moves on to the next one,
      // tied to the scroll both ways
      const p = clamp(-rect.top / travel);
      const seg = 1 / count;
      const i = Math.min(count - 1, Math.floor(p / seg));
      const f = (p - i * seg) / seg;
      const move = i < count - 1 ? smooth(clamp((f - 0.55) / 0.45)) : 0;
      const at = reduce ? Math.round(i + move) : i + move;
      setActive(Math.round(i + move));

      const train = trainRef.current;
      const car = train?.firstElementChild as HTMLElement | null;
      if (train && car) {
        const w = car.offsetWidth;
        // the stopped car sits right of centre; the rest of the train runs
        // on behind the words on the left
        const centre = window.innerWidth * 0.6 - w / 2;
        const x = centre - at * w * (1 + CAR_GAP) + (1 - arrive) * window.innerWidth;
        train.style.transform = `translate3d(${x}px, 0, 0)`;
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, reduce]);

  // Clicking the index drops you where that car is standing still.
  const jumpTo = useCallback(
    (i: number) => {
      const el = wrapRef.current;
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY;
      const travel = el.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (travel * (i + 0.25)) / count, behavior: reduce ? "auto" : "smooth" });
    },
    [count, reduce]
  );

  const current = projects[active];

  return (
    <>
      {/* ---------- desktop: the stage pins, the slides move ---------- */}
      <div
        ref={wrapRef}
        className="relative hidden md:block"
        style={{ height: `${count * VH_PER_SLIDE + 100}vh` }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* the elevated line across the whole screen: the train, its rail and
              pillars. It runs behind the words on the left. */}
          <div className="absolute inset-x-0 top-[8vh]">
            <div ref={trainRef} aria-hidden className="flex will-change-transform" style={{ gap: `calc(${CAR_W} * ${CAR_GAP})` }}>
              {projects.map((p, i) => (
                <TrainCar key={p.id} front={i === 0} rider={i + 1}>
                  <WindowView project={p} />
                </TrainCar>
              ))}
            </div>
            <div aria-hidden className="h-[6px] w-full bg-[#1e293b] shadow-[0_2px_0_#0f1a2e]" />
            {[6, 30, 54, 78].map((x) => (
              <div key={x} aria-hidden className="absolute top-full h-[50vh] w-[10px] bg-[#0f1a2e]" style={{ left: `${x}%` }} />
            ))}

            {/* the station sign, right under the rail and centred under the
                stopped car; fixed height, so a longer or shorter description
                never moves anything. Above the words' shade (z-20). */}
            <div
              className="relative z-20 mt-3 h-56 border-t-4 border-[#1b2c48] bg-[#0b1426] px-6 py-5 shadow-[4px_4px_0_#050a14]"
              style={{ width: `calc(${CAR_W} * 0.72)`, marginLeft: `calc(60vw - ${CAR_W} * 0.36)` }}
            >
              <div className="relative h-full">
                <AnimatePresence initial={false} mode="wait">
                  <SlideText key={current.id} project={current} reduce={reduce} />
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* night air between the train and the words on the left, so a car
              passing behind them never makes them hard to read */}
          <div aria-hidden className="pointer-events-none absolute inset-y-0 left-0 z-[5] w-[46%] bg-gradient-to-r from-[#0b1628] via-[#0b1628]/85 to-transparent" />

          {/* the words float over it */}
          <div className="relative z-10 mx-auto grid h-full w-full max-w-[1600px] grid-cols-[minmax(0,4fr)_minmax(0,8fr)] gap-12 px-6 lg:gap-16 lg:px-10">
            {/* index */}
            <div className="flex flex-col justify-center">
              <h2 className="font-[family-name:var(--font-pixel)] text-4xl uppercase leading-[1.1] tracking-wider text-white lg:text-6xl">
                What I&apos;ve Built
              </h2>

              <ol className="mt-12 flex flex-col gap-1">
                {projects.map((p, i) => {
                  const on = i === active;
                  return (
                    <li key={p.id}>
                      <button
                        type="button"
                        onClick={() => jumpTo(i)}
                        aria-current={on ? "true" : undefined}
                        className="group flex w-full items-center gap-4 py-3 text-left"
                      >
                        <span
                          className={`font-mono text-[11px] tabular-nums transition-colors ${
                            on ? "text-pink-400" : "text-slate-600 group-hover:text-slate-500"
                          }`}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`h-2 w-2 shrink-0 transition-colors ${
                            on ? "bg-pink-400" : "bg-slate-700 group-hover:bg-slate-600"
                          }`}
                        />
                        <span
                          className={`font-[family-name:var(--font-pixel)] text-sm uppercase tracking-wider transition-colors ${
                            on ? "text-white" : "text-slate-600 group-hover:text-slate-400"
                          }`}
                        >
                          {p.title}
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              {/* both exits from this section live here, inside it — floating
                  them after the stage put them on top of the closing */}
              <div className="mt-12 flex flex-col items-start gap-6">
                <Link
                  href="/showreel"
                  className="group border-2 border-pink-500/50 px-6 py-3 font-mono text-sm font-bold uppercase tracking-[0.15em] text-pink-400 transition-all hover:bg-pink-500 hover:text-white"
                >
                  <span className="flex items-center gap-2">
                    Watch the showreel
                    <PixelHeart className="h-4 w-4 shrink-0 opacity-70 transition-opacity group-hover:opacity-100" />
                  </span>
                </Link>

                <Link
                  href="/portfolio"
                  className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500 transition-colors hover:text-white"
                >
                  View all works
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>


          </div>
        </div>
      </div>

      {/* ---------- mobile: no pinning, one project per block ---------- */}
      <div className="pb-28 md:hidden md:pb-0">
        <div className="px-6">
          <h2 className="font-[family-name:var(--font-pixel)] text-3xl uppercase leading-[1.1] tracking-wider text-white">
            What I&apos;ve Built
          </h2>
        </div>

        <div className="mt-12 flex flex-col gap-20 px-6">
          {projects.map((p, i) => {
            const link = outboundLink(p);
            return (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: reduce ? 0 : 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: reduce ? 0.2 : 0.8, ease: EASE }}
              >
                <span className="font-mono text-[11px] tabular-nums text-pink-400">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="mt-3">
                  <SlideVisual project={p} i={i} />
                </div>
                {/* the same station sign as on desktop, solid behind the words */}
                <div className="relative z-10 mt-5 border-t-4 border-[#1b2c48] bg-[#0b1426] px-5 py-4 shadow-[4px_4px_0_#050a14]">
                <h3 className="font-[family-name:var(--font-pixel)] text-xl uppercase tracking-wider text-white">
                  {p.title}
                </h3>
                <p className="mt-3 line-clamp-4 leading-relaxed text-slate-400">{p.description}</p>
                <p className="mt-4 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-slate-500">
                  {p.stack.slice(0, 3).join(" · ")}
                </p>
                {link && (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-pink-400"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 flex flex-col items-start gap-6 px-6">
          <Link
            href="/showreel"
            className="border-2 border-pink-500/50 px-6 py-3 font-mono text-xs font-bold uppercase tracking-[0.15em] text-pink-400"
          >
            <span className="flex items-center gap-2">
              Watch the showreel
              <PixelHeart className="h-4 w-4 shrink-0 opacity-70" />
            </span>
          </Link>

          <Link
            href="/portfolio"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-slate-500"
          >
            View all works
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </>
  );
}
