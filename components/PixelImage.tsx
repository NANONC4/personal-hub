"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PixelImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PixelImage({ src, alt, className }: PixelImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={cn("relative overflow-hidden group cursor-pointer", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 
        We use a simple CSS trick here: 
        We have two images, one is heavily pixelated (using blur and contrast) or grayscale, 
        and the other is the clear image that fades in on hover.
      */}
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover object-top transition-all duration-700 ease-in-out",
          isHovered ? "scale-105 opacity-100 filter-none" : "scale-100 opacity-80 grayscale blur-[2px]"
        )}
        style={{ imageRendering: isHovered ? "auto" : "pixelated" }}
      />
      
      {/* A subtle grid overlay to fake the pixel chunks */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] transition-opacity duration-500",
          isHovered ? "opacity-0" : "opacity-100"
        )} 
      />
    </div>
  );
}
