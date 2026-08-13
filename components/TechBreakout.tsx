"use client";

import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw } from 'lucide-react';

// Tech stack to display
const TECH_STACK = [
  { text: "REACT", color: "#61DAFB" },
  { text: "NEXT", color: "#FFFFFF" },
  { text: "TS", color: "#3178C6" },
  { text: "JS", color: "#F7DF1E" },
  { text: "NODE", color: "#339933" },
  { text: "TWIND", color: "#06B6D4" }, // Shortened for small res
  { text: "FIGMA", color: "#F24E1E" },
  { text: "UNITY", color: "#FFFFFF" },
  { text: "C#", color: "#239120" },
  { text: "HTML", color: "#E34F26" },
  { text: "CSS", color: "#1572B6" },
  { text: "GIT", color: "#F05032" },
  { text: "GHUB", color: "#FFFFFF" },
  { text: "VERCEL", color: "#10b981" }, // Changed to green so it's not purely black/white in dark mode
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

  // GAME CONSTANTS
  const GAME_WIDTH = 400;
  const GAME_HEIGHT = 300;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Fixed low resolution for chunky pixel art
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;
    ctx.imageSmoothingEnabled = false;

    // Game Variables
    let ballSize = 6;
    let x = GAME_WIDTH / 2;
    let y = GAME_HEIGHT - 40;
    
    let baseSpeed = 2 + (wave * 0.2); 
    let dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    let dy = -baseSpeed;
    
    let paddleHeight = 8;
    let paddleWidth = 60;
    let paddleX = (GAME_WIDTH - paddleWidth) / 2;
    
    // Bricks config
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickPadding = 4;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 20;
    let brickWidth = (GAME_WIDTH - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
    let brickHeight = 16;

    let bricks: Brick[][] = [];
    let particles: Particle[] = [];
    let isTransitioningWave = false;
    let transitionTimer = 0;
    
    // We use refs/mutable vars to keep loop fast without React re-renders for every frame
    let localGameOver = false;
    
    const initBricks = () => {
      bricks = [];
      let techIndex = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          const tech = TECH_STACK[techIndex % TECH_STACK.length];
          bricks[c][r] = { 
            x: 0, y: 0, w: brickWidth, h: brickHeight, 
            status: 1, text: tech.text, color: tech.color, id: techIndex 
          };
          techIndex++;
        }
      }
    };
    initBricks();

    // Interaction State
    let rightPressed = false;
    let leftPressed = false;
    let mousePressed = false; 
    let lastInteractionTime = 0;
    let autoPlay = true;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (localGameOver) return;
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
    
    // Convert screen coordinates to fixed canvas coordinates
    const getCanvasMouseX = (clientX: number) => {
      const rect = canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      return (clientX - rect.left) * scaleX;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      if (localGameOver) return;
      const relativeX = getCanvasMouseX(e.clientX);
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    
    const mouseDownHandler = () => { 
      if (localGameOver) return;
      mousePressed = true; 
      lastInteractionTime = Date.now(); 
      autoPlay = false; 
    };
    const mouseUpHandler = () => { mousePressed = false; };
    
    const touchMoveHandler = (e: TouchEvent) => {
      if (localGameOver) return;
      const relativeX = getCanvasMouseX(e.touches[0].clientX);
      if (relativeX > 0 && relativeX < canvas.width) {
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
      const count = isWaveClear ? 40 : 8;
      for(let i=0; i< count; i++) {
        particles.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.5) * (isWaveClear ? 10 : 5),
          vy: (Math.random() - 0.5) * (isWaveClear ? 10 : 5),
          life: 1,
          color: color,
          size: Math.floor(Math.random() * 2) + 1 
        });
      }
    };

    const triggerWaveClear = () => {
      isTransitioningWave = true;
      transitionTimer = 100; 
      createExplosion(GAME_WIDTH/2, GAME_HEIGHT/2, "#ffffff", true);
    };

    const collisionDetection = () => {
      if (isTransitioningWave || localGameOver) return;
      let allIgnited = true;

      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          
          if (b.status === 1) { 
            allIgnited = false;
            if (x < b.x + b.w && x + ballSize > b.x && y < b.y + b.h && y + ballSize > b.y) {
              dy = -dy; 
              b.status = 0; 
              setScore(prev => prev + 10);
              createExplosion(x + ballSize/2, y + ballSize/2);
            }
          }
        }
      }

      if (allIgnited) triggerWaveClear();
    };

    const drawBall = () => {
      if (mousePressed && !autoPlay) {
        // Fire Trail
        particles.push({
          x: x + ballSize/2,
          y: y + ballSize/2,
          vx: (Math.random() - 0.5),
          vy: Math.random(),
          life: 0.5,
          color: ["#ef4444", "#f97316", "#eab308"][Math.floor(Math.random() * 3)],
          size: Math.floor(Math.random() * 2) + 1
        });
        ctx.fillStyle = "#ef4444"; 
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(Math.floor(x), Math.floor(y), ballSize, ballSize);
    };

    const drawPaddle = () => {
      ctx.fillStyle = mousePressed && !autoPlay ? "#f43f5e" : "#0ea5e9";
      ctx.fillRect(Math.floor(paddleX), GAME_HEIGHT - paddleHeight - 4, paddleWidth, paddleHeight);
      
      // Highlight & shadow for pixel 3D feel
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(Math.floor(paddleX), GAME_HEIGHT - paddleHeight - 4, paddleWidth, 2);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(Math.floor(paddleX), GAME_HEIGHT - 4 - 2, paddleWidth, 2);
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          b.x = brickX;
          b.y = brickY;
          
          if (b.status === 1) {
            // DULL
            ctx.fillStyle = "#1e293b";
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            // 3D effect
            ctx.fillStyle = "rgba(255,255,255,0.1)";
            ctx.fillRect(brickX, brickY, brickWidth, 2);
            ctx.fillRect(brickX, brickY, 2, brickHeight);
            ctx.fillStyle = "rgba(0,0,0,0.3)";
            ctx.fillRect(brickX, brickY + brickHeight - 2, brickWidth, 2);
            ctx.fillRect(brickX + brickWidth - 2, brickY, 2, brickHeight);
            
            ctx.fillStyle = "#94a3b8"; 
            ctx.font = "8px 'Courier New', monospace"; // System font scaled down looks pixelated
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2 + 1);
          } else {
            // IGNITED
            ctx.fillStyle = b.color + "20"; 
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = b.color + "80";
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.fillStyle = b.color;
            ctx.font = "bold 8px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2 + 1);
          }
        }
      }
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; 
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
      ctx.fillStyle = "rgba(0,0,0,0.8)";
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 24px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", GAME_WIDTH / 2, GAME_HEIGHT / 2 - 10);
    };

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "#020617"; // slate-950 background
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

      if (isTransitioningWave) {
        drawParticles();
        ctx.fillStyle = "#ffffff";
        ctx.font = "bold 20px 'Courier New', monospace";
        ctx.textAlign = "center";
        ctx.fillText("OVERCLOCK", GAME_WIDTH / 2, GAME_HEIGHT / 2);
        
        transitionTimer--;
        if (transitionTimer <= 0) {
          isTransitioningWave = false;
          setWave(prev => prev + 1);
          initBricks();
          x = GAME_WIDTH / 2;
          y = GAME_HEIGHT - 40;
          baseSpeed = 2 + ((wave + 1) * 0.2);
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
      
      if (localGameOver) {
        drawGameOver();
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      collisionDetection();
      
      if (Date.now() - lastInteractionTime > 4000) {
        autoPlay = true;
      }
      
      if (autoPlay) {
        const targetX = x - paddleWidth / 2;
        paddleX += (targetX - paddleX) * 0.2;
        mousePressed = false; 
      } else {
        if (rightPressed && paddleX < GAME_WIDTH - paddleWidth) paddleX += 5;
        else if (leftPressed && paddleX > 0) paddleX -= 5;
      }
      
      if (paddleX < 0) paddleX = 0;
      if (paddleX + paddleWidth > GAME_WIDTH) paddleX = GAME_WIDTH - paddleWidth;

      let currentDx = dx;
      let currentDy = dy;
      
      if (mousePressed && !autoPlay) {
        currentDx *= 2;
        currentDy *= 2;
      }

      if (x + currentDx > GAME_WIDTH - ballSize || x + currentDx < 0) {
        dx = -dx;
        currentDx = -currentDx;
      }
      if (y + currentDy < 0) {
        dy = -dy;
        currentDy = -currentDy;
      } else if (y + currentDy > GAME_HEIGHT - ballSize - paddleHeight - 4) {
        if (x + ballSize > paddleX && x < paddleX + paddleWidth) {
          dy = -Math.abs(dy); 
          const hitPoint = (x + ballSize/2) - (paddleX + paddleWidth / 2);
          dx = hitPoint * 0.1;
          if (Math.abs(dx) < 0.5) dx = dx < 0 ? -1 : 1; 
          y = GAME_HEIGHT - ballSize - paddleHeight - 6;
          createExplosion(x, y + ballSize, "#0ea5e9");
        } else if (y + currentDy > GAME_HEIGHT) {
          if (autoPlay) {
            x = GAME_WIDTH / 2;
            y = GAME_HEIGHT - 40;
            dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
            dy = -baseSpeed;
          } else {
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setIsGameOver(true);
                localGameOver = true;
              }
              return newLives;
            });
            
            if (!localGameOver) {
              x = GAME_WIDTH / 2;
              y = GAME_HEIGHT - 40;
              dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
              dy = -baseSpeed;
              paddleX = (GAME_WIDTH - paddleWidth) / 2;
              mousePressed = false;
            }
          }
        }
      }

      if (!localGameOver) {
        x += currentDx;
        y += currentDy;
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
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

  const handleRestart = () => {
    // We force a re-mount or wave reset by updating states that trigger the loop reset in a real app,
    // but since our game loop traps state, we can just reload the component or use a key
    // For simplicity here, we'll let the user reload the component via key prop trick
    window.location.reload(); // Quick hack for pure reset without breaking canvas bindings
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Gameboy/Arcade style casing */}
      <div className="w-full max-w-[800px] bg-[#d1d5db] border-b-[16px] border-r-[16px] border-[#9ca3af] rounded-xl p-4 md:p-8 shadow-2xl relative z-20">
        
        {/* Header HUD */}
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <h2 className="text-2xl md:text-4xl font-[family-name:var(--font-pixel)] text-slate-800 uppercase tracking-widest">
            ARSENAL
          </h2>
          <div className="flex items-center gap-6">
            <div className="flex gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className={`text-xl md:text-2xl font-[family-name:var(--font-pixel)] ${i < lives ? 'text-red-500' : 'text-slate-400 opacity-30'}`}
                >
                  ♥
                </div>
              ))}
            </div>
            <div className="font-[family-name:var(--font-pixel)] text-slate-800 bg-slate-300 px-3 py-1 rounded border-b-4 border-slate-400">
              {score.toString().padStart(4, '0')}
            </div>
          </div>
        </div>

        {/* The Screen Bezel */}
        <div className="w-full bg-[#1e293b] p-4 md:p-6 rounded-t-xl rounded-bl-xl rounded-br-[40px] shadow-[inset_0_5px_20px_rgba(0,0,0,0.8)] relative">
          
          {/* Game Container */}
          <div 
            ref={containerRef} 
            className="w-full aspect-[4/3] relative bg-[#020617] overflow-hidden cursor-crosshair shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
          >
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block"
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Explicit RESTART button layered on top of Canvas when Game Over */}
            {isGameOver && (
              <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
                <button 
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-6 py-4 bg-red-500 hover:bg-red-400 text-white font-[family-name:var(--font-pixel)] text-xl md:text-2xl rounded-sm border-b-4 border-r-4 border-red-800 active:border-0 active:mt-1 transition-all"
                >
                  <RefreshCw className="w-6 h-6 animate-spin" />
                  RESTART
                </button>
              </div>
            )}
          </div>
          
          {/* Battery Light */}
          <div className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]" />
        </div>
        
        {/* Arcade Decor */}
        <div className="w-full flex justify-between items-end mt-6 px-4">
          <div className="flex gap-2">
            <div className="w-3 h-10 bg-slate-400 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] transform -rotate-12"></div>
            <div className="w-3 h-10 bg-slate-400 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] transform -rotate-12"></div>
            <div className="w-3 h-10 bg-slate-400 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.2)] transform -rotate-12"></div>
          </div>
          <div className="font-[family-name:var(--font-pixel)] text-slate-500 text-xs">
            NINTENDO STYLE
          </div>
        </div>

      </div>
    </div>
  );
}
