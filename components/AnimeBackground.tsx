"use client";

export default function AnimeBackground() {
  // A cute grid pattern SVG (dashed lines)
  const gridPattern = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.4)" stroke-width="2" stroke-dasharray="4 4"/>
    </svg>
  `);

  // A cute pixel heart pattern
  const heartPattern = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(`
    <svg width="160" height="160" xmlns="http://www.w3.org/2000/svg">
      <path d="M40,30 v-10 h10 v-10 h20 v10 h10 v10 h10 v20 h-10 v10 h-10 v10 h-10 v10 h-10 v-10 h-10 v-10 h-10 v-10 h-10 v-20 z" fill="rgba(255,192,203,0.4)" transform="scale(0.8) translate(50, 50)" />
    </svg>
  `);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-sky-200 pointer-events-none">
      
      {/* Grid layer scrolling bottom-right */}
      <div 
        className="absolute -inset-[200px] opacity-80"
        style={{
          backgroundImage: "url('" + gridPattern + "')",
          backgroundSize: "80px 80px",
          animation: "scrollGrid 8s linear infinite"
        }}
      />
      
      {/* Hearts layer scrolling top-left slightly faster */}
      <div 
        className="absolute -inset-[320px] opacity-100"
        style={{
          backgroundImage: "url('" + heartPattern + "')",
          backgroundSize: "160px 160px",
          animation: "scrollHearts 12s linear infinite reverse"
        }}
      />

      <style jsx global>{`
        @keyframes scrollGrid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(80px, 80px); }
        }
        @keyframes scrollHearts {
          0% { transform: translate(0, 0); }
          100% { transform: translate(160px, 160px); }
        }
      `}</style>
    </div>
  );
}
