"use client";
import { motion } from "framer-motion";
import { ExternalLink, Check, Copy } from "lucide-react";
import { useState } from "react";

interface SocialLinkButtonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href: string;
  highlighted?: boolean;
  index?: number;
  copyText?: string;
  onClick?: (e: React.MouseEvent) => void;
}

export default function SocialLinkButton({ title, subtitle, icon, href, highlighted, index, copyText, onClick }: SocialLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (copyText) {
      e.preventDefault();
      navigator.clipboard.writeText(copyText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
    if (onClick) onClick(e);
  };
  
  // Cute pixel stars pattern
  const starPattern = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="40" height="40" xmlns="http://www.w3.org/2000/svg">
      <path d="M16,4 h8 v8 h8 v8 h-8 v8 h-8 v-8 h-8 v-8 h8 z" fill="rgba(250,204,21,0.25)" />
    </svg>
  `);

  // Cute pixel hearts pattern (perfectly symmetrical)
  const heartPattern = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
      <path d="M10,5 h15 v5 h10 v-5 h15 v10 h5 v10 h-5 v5 h-5 v5 h-5 v5 h-5 v5 h-10 v-5 h-5 v-5 h-5 v-5 h-5 v-5 h-5 v-10 h5 v-10 z" fill="rgba(255,192,203,0.4)" transform="translate(0, 5)" />
    </svg>
  `);

  const i = index ?? 0;
  const isHeart = i % 2 === 0;
  const dirIndex = i % 4;
  
  const patternUrl = isHeart ? "url('" + heartPattern + "')" : "url('" + starPattern + "')";
  const patternSize = isHeart ? "60px 60px" : "40px 40px";
  
  // Base animation speed
  const animationName = "scrollPattern-" + dirIndex + " " + (isHeart ? "8s" : "10s") + " linear infinite";

  return (
    <motion.a
      href={href}
      onClick={handleClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center p-4 lg:p-5 w-full overflow-hidden transition-all duration-150 border-4 border-slate-800 rounded-xl
        ${highlighted 
          ? 'bg-pink-100 shadow-[6px_6px_0_0_#be185d] hover:shadow-[0px_0px_0_0_#be185d] hover:translate-x-[6px] hover:translate-y-[6px]' 
          : 'bg-white shadow-[6px_6px_0_0_#1e293b] hover:shadow-[0px_0px_0_0_#1e293b] hover:translate-x-[6px] hover:translate-y-[6px]'
        }
      `}
    >
      {/* Scrolling Background Pattern (Alternating patterns and directions) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-80"
        style={{
          backgroundImage: patternUrl,
          backgroundSize: patternSize,
          animation: animationName
        }}
      />

      {/* Shine Sweep Effect (Continuous loop) */}
      <div className="absolute top-0 bottom-0 w-12 bg-white/50 blur-[4px] -skew-x-12 -translate-x-[150%] animate-sweep-loop z-10 pointer-events-none" />

      {/* Floating Sparkles (Continuous loop) */}
      <span className="absolute -top-2 right-6 text-pink-400 font-[family-name:var(--font-pixel)] text-xl z-20 pointer-events-none animate-sparkle-1">
        ✦
      </span>
      <span className="absolute -bottom-1 left-[15%] text-yellow-400 font-[family-name:var(--font-pixel)] text-2xl z-20 pointer-events-none animate-sparkle-2">
        ✧
      </span>
      {highlighted && (
        <span className="absolute top-2 right-1/4 text-purple-400 font-[family-name:var(--font-pixel)] text-lg z-20 pointer-events-none animate-sparkle-3">
          ♥
        </span>
      )}

      {/* Icon with continuous gentle bobbing/jiggle */}
      <div className={`relative z-20 flex items-center justify-center w-12 h-12 rounded-lg border-2 border-slate-800 ${highlighted ? 'bg-pink-300' : 'bg-sky-200'} text-slate-800 shadow-inner mr-4 animate-jiggle-loop`}>
        {icon ? icon : <ExternalLink size={24} strokeWidth={2} />}
      </div>

      {/* Content */}
      <div className="flex-1 text-left relative z-20">
        <h3 className="font-[family-name:var(--font-pixel)] text-lg lg:text-xl tracking-wide bg-gradient-to-r from-sky-500 via-pink-500 to-purple-500 bg-clip-text text-transparent animate-gradient-text flex items-center gap-2">
          {title}
          {copied && <span className="text-xs text-pink-500 bg-pink-100 px-2 py-0.5 rounded-full border border-pink-300">Copied!</span>}
        </h3>
        {subtitle && (
          <p className="text-slate-500 text-sm mt-1 group-hover:text-slate-700 transition-colors font-medium bg-white/50 inline-block px-1 rounded">
            {subtitle}
          </p>
        )}
      </div>

      {/* Hover Arrow / Copy Icon */}
      <div className="relative z-20 text-slate-400 group-hover:text-pink-600 transition-all transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-200">
        {copied ? (
          <Check size={24} strokeWidth={3} className="text-pink-500" />
        ) : copyText ? (
          <Copy size={24} strokeWidth={2.5} />
        ) : (
          <ExternalLink size={24} strokeWidth={2.5} />
        )}
      </div>

    </motion.a>
  );
}
