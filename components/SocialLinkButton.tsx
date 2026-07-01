"use client";
import { motion } from "framer-motion";
import { ExternalLink, LucideIcon } from "lucide-react";

interface SocialLinkButtonProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  href: string;
  highlighted?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export default function SocialLinkButton({ title, subtitle, icon, href, highlighted, onClick }: SocialLinkButtonProps) {
  return (
    <motion.a
      href={href}
      onClick={onClick}
      target="_blank"
      rel="noopener noreferrer"
      className={`group relative flex items-center p-4 lg:p-5 w-full overflow-hidden transition-all duration-150 border-4 border-slate-800 rounded-xl
        ${highlighted 
          ? 'bg-pink-100 shadow-[6px_6px_0_0_#be185d] hover:shadow-[0px_0px_0_0_#be185d] hover:translate-x-[6px] hover:translate-y-[6px]' 
          : 'bg-white shadow-[6px_6px_0_0_#1e293b] hover:shadow-[0px_0px_0_0_#1e293b] hover:translate-x-[6px] hover:translate-y-[6px]'
        }
      `}
    >
      {/* Icon */}
      <div className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 border-slate-800 ${highlighted ? 'bg-pink-300' : 'bg-sky-200'} text-slate-800 shadow-inner mr-4 group-hover:scale-110 transition-transform duration-200`}>
        {icon ? icon : <ExternalLink size={24} strokeWidth={2} />}
      </div>

      {/* Content */}
      <div className="flex-1 text-left">
        <h3 className="text-slate-800 font-[family-name:var(--font-pixel)] text-lg lg:text-xl tracking-wide group-hover:text-pink-600 transition-colors">
          {title}
        </h3>
        {subtitle && (
          <p className="text-slate-500 text-sm mt-1 group-hover:text-slate-700 transition-colors font-medium">
            {subtitle}
          </p>
        )}
      </div>

      {/* Hover Arrow */}
      <div className="text-slate-400 group-hover:text-pink-600 transition-all transform -translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 duration-200">
        <ExternalLink size={24} strokeWidth={2.5} />
      </div>
    </motion.a>
  );
}
