"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";

interface PixelImageProps {
  src: string;
  alt: string;
  className?: string;
}

export function PixelImage({ src, alt, className }: PixelImageProps) {
  const ref = useRef(null);
  // trigger only when the image is near the middle of the viewport
  const isInView = useInView(ref, { once: false, margin: "-30% 0px -30% 0px" });

  return (
    <div 
      ref={ref}
      className={cn("relative overflow-hidden cursor-default", className)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(
          "object-cover object-top transition-all duration-1000 ease-in-out",
          isInView ? "scale-105 opacity-100 filter-none" : "scale-100 opacity-80 grayscale blur-[2px]"
        )}
        style={{ imageRendering: isInView ? "auto" : "pixelated" }}
      />
      
      {/* A subtle grid overlay to fake the pixel chunks */}
      <div 
        className={cn(
          "absolute inset-0 pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPgo8cmVjdCB3aWR0aD0iOCIgaGVpZ2h0PSI4IiBmaWxsPSJub25lIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPgo8L3N2Zz4=')] transition-opacity duration-1000",
          isInView ? "opacity-0" : "opacity-100"
        )} 
      />
    </div>
  );
}
