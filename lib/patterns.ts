export const plusSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 60 60"><path d="M29 20 h2 v9 h9 v2 h-9 v9 h-2 v-9 h-9 v-2 h9 z" fill="rgba(255,255,255,0.4)"/></svg>`);
export const diamondSvg = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80"><path d="M39 30 h2 v4 h4 v2 h-4 v4 h-2 v-4 h-4 v-2 h4 z" fill="rgba(255,255,255,0.5)"/></svg>`);

export const patterns = [
  // 0: Grid (Graph Paper)
  {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.3) 2px, transparent 2px), linear-gradient(90deg, rgba(255,255,255,0.3) 2px, transparent 2px)`,
    backgroundSize: `64px 64px`,
  },
  // 1: Plus Signs (+)
  {
    backgroundImage: `url('data:image/svg+xml;utf8,${plusSvg}')`,
    backgroundSize: `60px 60px`,
  },
  // 2: Scanlines (Horizontal only)
  {
    backgroundImage: `linear-gradient(rgba(255,255,255,0.2) 2px, transparent 2px)`,
    backgroundSize: `100% 12px`,
  },
  // 3: Pixel Sparkles (Diamonds)
  {
    backgroundImage: `url('data:image/svg+xml;utf8,${diamondSvg}')`,
    backgroundSize: `80px 80px`,
  }
];

export const getPattern = (index: number) => {
  return patterns[index % patterns.length];
};
