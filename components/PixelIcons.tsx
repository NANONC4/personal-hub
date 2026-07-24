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
    <svg viewBox="0 0 16 16" className="w-6 h-6" {...props}>
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
    <svg viewBox="0 0 16 16" className="w-6 h-6" {...props}>
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
    <svg viewBox="0 0 16 16" className="w-6 h-6" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelStar({ color = "#1e293b", ...props }: PixelIconProps) {
  const grid = [
    "................",
    ".......bb.......",
    "......b..b......",
    "..bbbb....bbbb..",
    "....b......b....",
    "...b........b...",
    "..b..........b..",
    "...b........b...",
    "....b......b....",
    "...b..b..b..b...",
    "......b..b......",
    ".......bb.......",
    "................",
    "................",
    "................",
    "................"
  ];
  const colors = { 'b': color };
  return (
    <svg viewBox="0 0 16 16" className="w-6 h-6" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelSparkle({ color = "#1e293b", ...props }: PixelIconProps) {
  const grid = [
    "................",
    ".......bb.......",
    "......b..b......",
    "......b..b......",
    "...bbb....bbb...",
    "..b..........b..",
    "..b..........b..",
    "...bbb....bbb...",
    "......b..b......",
    "......b..b......",
    ".......bb.......",
    "................",
    "................",
    "................",
    "................",
    "................"
  ];
  const colors = { 'b': color };
  return (
    <svg viewBox="0 0 16 16" className="w-6 h-6" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelCloud({ color = "#ffffff", ...props }: PixelIconProps) {
  const grid = [
    "........................",
    "..........bbbb..........",
    ".........bbbbbb.........",
    "......bbbbbbbbbbb.......",
    ".....bbbbbbbbbbbbbb.....",
    "...bbbbbbbbbbbbbbbbbb...",
    "..bbbbbbbbbbbbbbbbbbbb..",
    ".bbbbbbbbbbbbbbbbbbbbbb.",
    ".bbbbbbbbbbbbbbbbbbbbbb.",
    "..bbbbbbbbbbbbbbbbbbbb..",
    "........................",
    "........................"
  ];
  const colors = { 'b': color };
  return (
    <svg viewBox="0 0 24 12" className="w-12 h-6" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelMoon({ color = "#fef08a", ...props }: PixelIconProps) {
  const grid = [
    "......ww........",
    "....wwwwww......",
    "...wwwwwwww.....",
    "..wwwwww........",
    ".wwwww..........",
    ".wwwww..........",
    "wwwww...........",
    "wwwww...........",
    "wwwww...........",
    "wwwww...........",
    ".wwwww..........",
    ".wwwww..........",
    "..wwwww.........",
    "...wwwwwww......",
    "....wwwwww......",
    "......ww........"
  ];
  const colors = { 'w': color };
  return (
    <svg viewBox="0 0 16 16" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(254,240,138,0.5)]" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelCoffee({ color = "#d4d4d8", ...props }: PixelIconProps) {
  const grid = [
    "......ss........",
    ".......s........",
    ".......ss.......",
    "........s.......",
    "................",
    "...wwwwwwwww....",
    "...wwwwwwwww.ww.",
    "...wwwwwwwww..w.",
    "...wwwwwwwww.ww.",
    "...wwwwwwwww....",
    "...wwwwwwwww....",
    "....wwwwwww.....",
    "....wwwwwww.....",
    ".....wwwww......",
    "..wwwwwwwwwww...",
    "................"
  ];
  const colors = { 'w': color, 's': '#9ca3af' };
  return (
    <svg viewBox="0 0 16 16" className="w-16 h-16" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}

export function PixelCoin({ color = "#facc15", ...props }: PixelIconProps) {
  const grid = [
    "................",
    "......yyyy......",
    "....yyywwyyy....",
    "...yywwwwwyyy...",
    "..yywwwwwwwyyy..",
    "..ywwwwwwwwwyy..",
    ".yywwwyyywwwyyy.",
    ".yywwyyyyywwyyy.",
    ".yywwyyyyywwyyy.",
    ".yywwwyyywwwyyy.",
    "..ywwwwwwwwwyy..",
    "..yywwwwwwwyyy..",
    "...yywwwwwyyy...",
    "....yyywwyyy....",
    "......yyyy......",
    "................"
  ];
  const colors = { 'y': color, 'w': '#fef08a' };
  return (
    <svg viewBox="0 0 16 16" className="w-16 h-16 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" {...props}>
      {renderGrid(grid, colors)}
    </svg>
  );
}
