"use client";
import { motion } from "framer-motion";
import { ExternalLink, LucideIcon } from "lucide-react";

interface SocialLinkButtonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href: string;
  highlighted?: boolean;
}

export default function SocialLinkButton({ title, subtitle, icon, href, highlighted }: SocialLinkButtonProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      className={`group relative flex items-center p-4 lg:p-5 w-full rounded-2xl overflow-hidden transition-all duration-300
        ${highlighted 
          ? 'bg-gradient-to-r from-purple-500/20 to-emerald-500/20 border border-white/20 shadow-[0_0_30px_rgba(167,139,250,0.1)] hover:shadow-[0_0_40px_rgba(52,211,153,0.3)]' 
          : 'bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/20 backdrop-blur-md'
        }
      `}
    >
      {/* Icon */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-black/30 text-white shadow-inner mr-4 group-hover:scale-110 transition-transform duration-300`}>
        {icon ? icon : <ExternalLink size={24} strokeWidth={1.5} />}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 className="text-white font-semibold text-lg lg:text-xl tracking-wide group-hover:text-emerald-300 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-neutral-400 text-sm mt-0.5 group-hover:text-neutral-300 transition-colors">
            {subtitle}
          </p>
        )}
      </div>

      {/* Hover Arrow */}
      <div className="text-white/20 group-hover:text-white transition-all transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-300">
        <ExternalLink size={20} />
      </div>
    </motion.a>
  );
}
