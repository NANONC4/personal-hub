"use client";

import { ReactNode } from "react";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

export const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-1 md:grid-cols-3 gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

export const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className: string;
  background: ReactNode;
  Icon: any;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative flex flex-col justify-between overflow-hidden rounded-[2rem]",
      "bg-slate-900/40 border-2 border-slate-800",
      "transform-gpu transition-all duration-300 hover:border-sky-500/50 hover:shadow-lg hover:shadow-sky-500/10",
      className,
    )}
  >
    {/* Background Animation Container */}
    <div className="absolute inset-0 pointer-events-none z-0">
      {background}
    </div>
    
    {/* Content Container */}
    <div className="pointer-events-none z-10 flex h-full flex-col justify-end p-8 transition-all duration-300 group-hover:-translate-y-12">
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent opacity-80" />
      
      <div className="relative z-10">
        <div className="mb-4 inline-flex p-3 rounded-xl bg-slate-800/80 border border-slate-700/50 backdrop-blur-sm">
          <Icon className="h-6 w-6 transform-gpu text-sky-400 transition-all duration-300 ease-in-out group-hover:scale-75" />
        </div>
        <h3 className="text-2xl font-bold font-[family-name:var(--font-pixel)] text-white uppercase tracking-wider mb-2">
          {name}
        </h3>
        <p className="max-w-lg text-slate-400 leading-relaxed font-medium">
          {description}
        </p>
      </div>
    </div>

    {/* Hover Action */}
    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-8 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 z-20",
      )}
    >
      <Link href={href} className="pointer-events-auto flex items-center gap-2 px-6 py-3 bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono font-bold uppercase tracking-widest text-sm rounded-xl transition-colors shadow-[0_0_15px_rgba(14,165,233,0.4)]">
        {cta}
        <ArrowRightIcon className="h-4 w-4" />
      </Link>
    </div>
    
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-slate-950/20 z-0" />
  </div>
);
