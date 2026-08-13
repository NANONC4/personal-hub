"use client";

import React, { useRef, useEffect, useState } from 'react';

// Tech stack to display
const TECH_STACK = [
  { text: "REACT", color: "#61DAFB" },
  { text: "NEXT", color: "#FFFFFF" },
  { text: "TS", color: "#3178C6" },
  { text: "JS", color: "#F7DF1E" },
  { text: "NODE", color: "#339933" },
  { text: "TAILWIND", color: "#06B6D4" },
  { text: "FIGMA", color: "#F24E1E" },
  { text: "UNITY", color: "#FFFFFF" },
  { text: "C#", color: "#239120" },
  { text: "HTML5", color: "#E34F26" },
  { text: "CSS3", color: "#1572B6" },
  { text: "GIT", color: "#F05032" },
  { text: "GITHUB", color: "#FFFFFF" },
  { text: "VERCEL", color: "#000000" },
  { text: "API", color: "#4ADE80" }
];

type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  status: number; // 1 = Dull (solid), 0 = Ignited (ghost)
  text: string;
  color: string;
  id: number;
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  color: string;
  size: number;
};

export function TechBreakout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [wave, setWave] = useState(1);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Disable anti-aliasing for true pixel art look
    ctx.imageSmoothingEnabled = false;

    // Resize handling
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = Math.min(600, window.innerHeight * 0.6);
      ctx.imageSmoothingEnabled = false; // need to re-apply after resize
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game Variables
    let ballSize = 10; // Square ball for pixel look
    let x = canvas.width / 2;
    let y = canvas.height - 60;
    
    // Base speed
    let baseSpeed = 4 + (wave * 0.5); 
    let dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    let dy = -baseSpeed;
    
    let paddleHeight = 16;
    let paddleWidth = 120;
    let paddleX = (canvas.width - paddleWidth) / 2;
    
    // Bricks config
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickPadding = 12;
    const brickOffsetTop = 60;
    const brickOffsetLeft = 30;
    let brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
    let brickHeight = 35;

    let bricks: Brick[][] = [];
    let particles: Particle[] = [];
    let isTransitioningWave = false;
    let transitionTimer = 0;
    let gameOverState = isGameOver; // Local var to keep sync in loop
    
    // Initialization
    const initBricks = () => {
      brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
      bricks = [];
      let techIndex = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          const tech = TECH_STACK[techIndex % TECH_STACK.length];
          bricks[c][r] = { 
            x: 0, 
            y: 0, 
            w: brickWidth, 
            h: brickHeight, 
            status: 1, 
            text: tech.text, 
            color: tech.color,
            id: techIndex 
          };
          techIndex++;
        }
      }
    };
    initBricks();

    // Interaction State
    let rightPressed = false;
    let leftPressed = false;
    let mousePressed = false; // For Speed Boost
    let mouseX = paddleX + paddleWidth / 2;
    let lastInteractionTime = 0;
    let autoPlay = true;

    const restartGame = () => {
      setWave(1);
      setScore(0);
      setLives(3);
      setIsGameOver(false);
      gameOverState = false;
      baseSpeed = 4.5;
      dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
      dy = -baseSpeed;
      x = canvas.width / 2;
      y = canvas.height - 60;
      initBricks();
    };

    const keyDownHandler = (e: KeyboardEvent) => {
      if (gameOverState) return;
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
      else if (e.key === " ") mousePressed = true; 
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
      else if (e.key === " ") mousePressed = false;
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      if (gameOverState) return;
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        mouseX = relativeX;
        paddleX = relativeX - paddleWidth / 2;
      }
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    const mouseDownHandler = (e: MouseEvent | TouchEvent) => { 
      if (gameOverState) {
        restartGame();
        return;
      }
      mousePressed = true; 
      lastInteractionTime = Date.now(); 
      autoPlay = false; 
    };
    const mouseUpHandler = () => { mousePressed = false; };
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (gameOverState) return;
      const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        mouseX = relativeX;
        paddleX = relativeX - paddleWidth / 2;
      }
      lastInteractionTime = Date.now();
      autoPlay = false;
      e.preventDefault();
    };

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    canvas.addEventListener("mousemove", mouseMoveHandler, false);
    canvas.addEventListener("mousedown", mouseDownHandler, false);
    document.addEventListener("mouseup", mouseUpHandler, false); 
    canvas.addEventListener("touchmove", touchMoveHandler, { passive: false });
    canvas.addEventListener("touchstart", mouseDownHandler, { passive: false });
    document.addEventListener("touchend", mouseUpHandler, false);

    const createExplosion = (ex: number, ey: number, color: string = "#475569", isWaveClear: boolean = false) => {
      const count = isWaveClear ? 50 : 15;
      for(let i=0; i< count; i++) {
        particles.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.5) * (isWaveClear ? 20 : 10),
          vy: (Math.random() - 0.5) * (isWaveClear ? 20 : 10),
          life: 1,
          color: color,
          size: Math.floor(Math.random() * 4) + 2 // Chunky pixels
        });
      }
    };

    const triggerWaveClear = () => {
      isTransitioningWave = true;
      transitionTimer = 150; 
      createExplosion(canvas.width/2, canvas.height/2, "#ffffff", true);
    };

    const collisionDetection = () => {
      if (isTransitioningWave || gameOverState) return;

      let allIgnited = true;

      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          
          if (b.status === 1) { 
            allIgnited = false;
            // AABB Collision (Square ball vs Rect brick)
            if (x < b.x + b.w && x + ballSize > b.x && y < b.y + b.h && y + ballSize > b.y) {
              dy = -dy; 
              b.status = 0; 
              setScore(prev => prev + 10);
              createExplosion(x + ballSize/2, y + ballSize/2);
            }
          }
        }
      }

      if (allIgnited) {
        triggerWaveClear();
      }
    };

    const drawBall = () => {
      // Speed Boost Fire Trail
      if (mousePressed && !autoPlay) {
        particles.push({
          x: x,
          y: y + ballSize/2,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2,
          life: 0.5,
          color: ["#ef4444", "#f97316", "#eab308"][Math.floor(Math.random() * 3)],
          size: Math.floor(Math.random() * 4) + 2
        });
        ctx.fillStyle = "#ef4444"; // Red ball during boost
      } else {
        ctx.fillStyle = "#ffffff";
      }
      
      ctx.fillRect(x, y, ballSize, ballSize);
      
      // Retro border
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(x, y, ballSize, ballSize);
    };

    const drawPaddle = () => {
      ctx.fillStyle = mousePressed && !autoPlay ? "#f43f5e" : "#0ea5e9";
      ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
      
      // 3D Pixel border styling
      ctx.fillStyle = "rgba(255,255,255,0.3)";
      ctx.fillRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, 4); // Top highlight
      ctx.fillStyle = "rgba(0,0,0,0.3)";
      ctx.fillRect(paddleX, canvas.height - 10 - 4, paddleWidth, 4); // Bottom shadow
      
      // Outline
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#000000";
      ctx.strokeRect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          b.x = brickX;
          b.y = brickY;
          
          const isVercel = b.text === "VERCEL";
          
          if (b.status === 1) {
            // DULL STATE (Pixel Rock)
            ctx.fillStyle = "#334155";
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            // 3D Inset
            ctx.fillStyle = "rgba(255,255,255,0.15)";
            ctx.fillRect(brickX, brickY, brickWidth, 4); // Top
            ctx.fillRect(brickX, brickY, 4, brickHeight); // Left
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fillRect(brickX, brickY + brickHeight - 4, brickWidth, 4); // Bottom
            ctx.fillRect(brickX + brickWidth - 4, brickY, 4, brickHeight); // Right
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#0f172a"; 
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.fillStyle = "#94a3b8"; 
            // Use custom CSS variable font directly, fallback to monospace
            ctx.font = "bold 12px var(--font-pixel), monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2 + 2); // +2 for visual center
          } else {
            // IGNITED STATE (Hologram/Neon)
            ctx.fillStyle = isVercel ? "rgba(255,255,255,0.1)" : b.color + "20"; 
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = isVercel ? "rgba(255,255,255,0.4)" : b.color;
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.fillStyle = isVercel ? "#ffffff" : b.color;
            ctx.font = "bold 14px var(--font-pixel), monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2 + 2);
          }
        }
      }
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; 
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(Math.floor(p.x), Math.floor(p.y), p.size, p.size);
          ctx.globalAlpha = 1.0;
        }
      }
    };

    const drawGameOver = () => {
      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 40px var(--font-pixel), monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
      
      // Blinking text
      if (Math.floor(Date.now() / 500) % 2 === 0) {
        ctx.fillStyle = "#ffffff";
        ctx.font = "16px var(--font-pixel), monospace";
        ctx.fillText("INSERT COIN TO RESTART", canvas.width / 2, canvas.height / 2 + 50);
        ctx.fillText("(CLICK ANYWHERE)", canvas.width / 2, canvas.height / 2 + 75);
      }
    };

    let animationFrameId: number;

    const draw = () => {
      // Hard clear for true pixel look (no trail)
      ctx.fillStyle = "#0f172a";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isTransitioningWave) {
        drawParticles();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 30px var(--font-pixel), monospace";
        ctx.textAlign = "center";
        ctx.fillText("SYSTEM OVERCLOCK", canvas.width / 2, canvas.height / 2);
        
        transitionTimer--;
        if (transitionTimer <= 0) {
          isTransitioningWave = false;
          setWave(prev => prev + 1);
          initBricks();
          x = canvas.width / 2;
          y = canvas.height - 60;
          baseSpeed = 4 + ((wave + 1) * 0.5);
          dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
          dy = -baseSpeed;
        }
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      drawBricks();
      drawBall();
      drawPaddle();
      drawParticles();
      
      if (gameOverState) {
        drawGameOver();
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      collisionDetection();
      
      // Auto-play logic
      if (Date.now() - lastInteractionTime > 3000) {
        autoPlay = true;
      }
      
      if (autoPlay) {
        const targetX = x - paddleWidth / 2;
        paddleX += (targetX - paddleX) * 0.25;
        mousePressed = false; 
      } else {
        if (rightPressed && paddleX < canvas.width - paddleWidth) paddleX += 8;
        else if (leftPressed && paddleX > 0) paddleX -= 8;
      }
      
      if (paddleX < 0) paddleX = 0;
      if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;

      // === PHYSICS ===
      let currentDx = dx;
      let currentDy = dy;
      
      // SPEED BOOST mechanic (2x speed)
      if (mousePressed && !autoPlay) {
        currentDx *= 2;
        currentDy *= 2;
      }

      // Ball Wall collision
      if (x + currentDx > canvas.width - ballSize || x + currentDx < 0) {
        dx = -dx;
        currentDx = -currentDx;
      }
      if (y + currentDy < 0) {
        dy = -dy;
        currentDy = -currentDy;
      } else if (y + currentDy > canvas.height - ballSize - paddleHeight - 10) {
        // Paddle collision
        if (x + ballSize > paddleX && x < paddleX + paddleWidth) {
          dy = -Math.abs(dy); 
          // Hit position determines X bounce angle
          const hitPoint = (x + ballSize/2) - (paddleX + paddleWidth / 2);
          dx = hitPoint * 0.15;
          if (Math.abs(dx) < 1) dx = dx < 0 ? -2 : 2; 
          
          // Slight upward push to avoid clipping
          y = canvas.height - ballSize - paddleHeight - 15;
          
          // Spawn sparks on paddle hit
          createExplosion(x, y + ballSize, "#0ea5e9");
        } else if (y + currentDy > canvas.height) {
          // Ball out of bounds (Bottom)
          if (autoPlay) {
            // Bot shouldn't lose lives, just reset
            x = canvas.width / 2;
            y = canvas.height - 60;
            dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
            dy = -baseSpeed;
          } else {
            // Player loses life
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setIsGameOver(true);
                gameOverState = true;
              }
              return newLives;
            });
            
            // Reset ball position if not game over
            if (!gameOverState) {
              x = canvas.width / 2;
              y = canvas.height - 60;
              dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
              dy = -baseSpeed;
              paddleX = (canvas.width - paddleWidth) / 2;
              mousePressed = false;
            }
          }
        }
      }

      if (!gameOverState) {
        x += currentDx;
        y += currentDy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener("keydown", keyDownHandler);
      document.removeEventListener("keyup", keyUpHandler);
      canvas.removeEventListener("mousemove", mouseMoveHandler);
      canvas.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      canvas.removeEventListener("touchmove", touchMoveHandler);
      canvas.removeEventListener("touchstart", mouseDownHandler);
      document.removeEventListener("touchend", mouseUpHandler);
    };
  }, [wave]); 
  // Note: effect deps minimized to avoid restarting canvas loop unnecessarily,
  // relies on mutable closure variables for game state.

  return (
    <div className="w-full flex flex-col items-center">
      {/* Arcade Cabinet Header Frame */}
      <div className="w-full max-w-4xl bg-zinc-900 border-x-[12px] border-t-[12px] border-zinc-950 rounded-t-2xl p-4 md:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-20">
        <div className="w-full flex justify-between items-center mb-4">
          <div>
            <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] text-yellow-400 uppercase tracking-widest drop-shadow-[0_0_10px_rgba(250,204,21,0.5)]">
              TECH WARS
            </h2>
          </div>
          
          <div className="text-right flex flex-col items-end gap-2">
            {/* Lives UI */}
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`text-xl md:text-2xl font-[family-name:var(--font-pixel)] ${i < lives ? 'text-red-500' : 'text-zinc-700'}`}
                >
                  ♥
                </div>
              ))}
            </div>
            <div className="font-[family-name:var(--font-pixel)] text-white text-lg md:text-xl">
              SCORE: {score}
            </div>
          </div>
        </div>

        {/* Game Container (The Screen) */}
        <div 
          ref={containerRef} 
          className="w-full relative bg-[#0f172a] border-8 border-zinc-800 rounded-lg shadow-[inset_0_0_30px_rgba(0,0,0,0.9)] overflow-hidden cursor-crosshair group"
        >
          <canvas 
            ref={canvasRef} 
            className="w-full block"
            style={{ imageRendering: 'pixelated' }}
          />
          
          {/* Scanline Overlay for retro TV effect */}
          <div 
            className="absolute inset-0 pointer-events-none z-30 opacity-40 mix-blend-overlay"
            style={{
              backgroundImage: 'linear-gradient(rgba(18,16,16,0) 50%, rgba(0,0,0,0.25) 50%), linear-gradient(90deg, rgba(255,0,0,0.06), rgba(0,255,0,0.02), rgba(0,0,255,0.06))',
              backgroundSize: '100% 4px, 3px 100%'
            }}
          />
          
          {/* Overlay instructions that fade out */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/60 opacity-100 group-hover:opacity-0 transition-opacity duration-500 z-40">
            <div className="bg-zinc-900 border-4 border-zinc-700 px-6 py-4 text-center shadow-2xl">
              <p className="font-[family-name:var(--font-pixel)] text-white text-xl md:text-2xl mb-4 text-shadow-sm">ACTIVATE THE NODES</p>
              <p className="font-[family-name:var(--font-pixel)] text-zinc-400 text-xs md:text-sm uppercase mb-2">Move mouse to play</p>
              <p className="font-[family-name:var(--font-pixel)] text-red-400 text-xs md:text-sm uppercase mb-4">Hold click for SPEED BOOST</p>
              <p className="font-[family-name:var(--font-pixel)] text-yellow-500/80 text-[10px] uppercase">Auto-play active when idle</p>
            </div>
          </div>
        </div>
        
        {/* Cabinet Bottom Lip */}
        <div className="w-full h-4 bg-zinc-800 border-b-8 border-zinc-950 mt-4 rounded-b-lg"></div>
      </div>
      
      {/* Shadow under cabinet */}
      <div className="w-full max-w-3xl h-10 bg-black/50 blur-2xl rounded-[100%] mt-2 relative z-10" />
    </div>
  );
}
