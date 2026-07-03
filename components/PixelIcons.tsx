import React from 'react';

type PixelIconProps = React.SVGProps<SVGSVGElement> & {
  color?: string;
};

// Helper to render pixel grid
const renderGrid = (grid: string[], colorMap: Record<string, string>) => {
  return grid.map((row, y) => 
    row.split('').map((char, x) => 
      char !== '.' && colorMap[char] ? (
        <rect key={`${x}-${y}`} x={x} y={y} width="1.05" height="1.05" fill={colorMap[char]} />
      ) : null
    )
  );
};

export function PixelMail({ color = "#1e293b", ...props }: PixelIconProps) {
  const grid = [
    "................",
    "................",
    "................",
    ".bbbbbbbbbbbbbb.",
    "b.b..........b.b",
    "b..b........b..b",
    "b...b......b...b",
    "b....b....b....b",
    "b.....bbbb.....b",
    "b..............b",
    "b..............b",
    "b..............b",
    ".bbbbbbbbbbbbbb.",
    "................",
    "................",
    "................",
  ];
  
  const colors = {
    'b': color
  };

  return (
    <svg viewBox="0 0 16 16" className="w-6 h-6 drop-shadow-sm" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelPhone({ color = "#1e293b", ...props }: PixelIconProps) {
  const grid = [
    "................",
    "....bbbbbbbb....",
    "...b........b...",
    "...b.bbbbbb.b...",
    "...b.b....b.b...",
    "...b.b....b.b...",
    "...b.b....b.b...",
    "...b.b....b.b...",
    "...b.b....b.b...",
    "...b.b....b.b...",
    "...b.bbbbbb.b...",
    "...b........b...",
    "...b...bb...b...",
    "....bbbbbbbb....",
    "................",
    "................",
  ];
  
  const colors = {
    'b': color
  };

  return (
    <svg viewBox="0 0 16 16" className="w-6 h-6 drop-shadow-sm" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelHeart({ color = "#1e293b", ...props }: PixelIconProps) {
  const grid = [
    "................",
    "................",
    "..bbbb....bbbb..",
    ".b....b..b....b.",
    "b......bb......b",
    "b..............b",
    "b..............b",
    ".b............b.",
    "..b..........b..",
    "...b........b...",
    "....b......b....",
    ".....b....b.....",
    "......b..b......",
    ".......bb.......",
    "................",
    "................",
  ];
  
  const colors = {
    'b': color
  };

  return (
    <svg viewBox="0 0 16 16" className="w-6 h-6 drop-shadow-sm" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}
