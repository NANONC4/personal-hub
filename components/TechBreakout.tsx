"use client";

import React, { useRef, useEffect, useState } from 'react';
import { RefreshCw, Play, Atom, Zap, Code, FileCode, Server, Wind, Box, Hash, Layout, Paintbrush, GitBranch, Flame, Database, DatabaseBackup, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TECH_STACK = [
  { text: "REACT", color: "#0ea5e9", icon: Atom }, 
  { text: "NEXT.JS", color: "#d946ef", icon: Zap }, 
  { text: "TS", color: "#3b82f6", icon: Code }, 
  { text: "JS", color: "#eab308", icon: FileCode }, 
  { text: "NODE", color: "#10b981", icon: Server }, 
  { text: "TAILWIND", color: "#06b6d4", icon: Wind }, 
  { text: "FIREBASE", color: "#f59e0b", icon: Flame }, 
  { text: "UNITY", color: "#d946ef", icon: Box }, 
  { text: "C#", color: "#8b5cf6", icon: Hash }, 
  { text: "HTML5", color: "#f97316", icon: Layout }, 
  { text: "CSS3", color: "#0ea5e9", icon: Paintbrush }, 
  { text: "GIT", color: "#f43f5e", icon: GitBranch }, 
  { text: "PRISMA", color: "#14b8a6", icon: Database }, 
  { text: "SUPABASE", color: "#10b981", icon: DatabaseBackup }, 
  { text: "NEXTAUTH", color: "#8b5cf6", icon: ShieldCheck } 
];

type Brick = {
  x: number;
  y: number;
  w: number;
  h: number;
  status: number; 
  text: string;
  color: string;
  id: number;
  icon: any;
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
  const [floatingIcons, setFloatingIcons] = useState<{id: number, x: number, y: number, icon: any, color: string}[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // We use the actual container size for crispness, but we enforce an aspect ratio via CSS
    let canvasWidth = container.clientWidth;
    let canvasHeight = container.clientHeight;
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    // Disable smoothing to keep borders hard
    ctx.imageSmoothingEnabled = false;

    const resizeCanvas = () => {
      canvasWidth = container.clientWidth;
      canvasHeight = container.clientHeight;
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      ctx.imageSmoothingEnabled = false;
      // Re-init sizes based on new width
      initSizes();
    };
    window.addEventListener('resize', resizeCanvas);

    // Dynamic Sizing variables
    let ballSize = 12;
    let baseSpeed = 5;
    let dx = baseSpeed;
    let dy = -baseSpeed;
    let paddleHeight = 16;
    let paddleWidth = 120;
    
    // Position variables
    let x = canvasWidth / 2;
    let y = canvasHeight - 60;
    let paddleX = (canvasWidth - paddleWidth) / 2;

    const brickRowCount = 3;
    const brickColumnCount = 5;
    let brickWidth = 100;
    let brickHeight = 30;
    let brickPadding = 10;
    let brickOffsetTop = 50;
    let brickOffsetLeft = 30;

    let bricks: Brick[][] = [];
    let particles: Particle[] = [];
    let isTransitioningWave = false;
    let transitionTimer = 0;
    let localGameOver = false;
    let gameOverTimer = 0; // Timer for auto-restart

    const resetGameVariables = () => {
      setWave(1);
      setScore(0);
      setLives(3);
      setIsGameOver(false);
      localGameOver = false;
      
      initSizes();
      x = canvasWidth / 2;
      y = canvasHeight - 60;
      // Mobile-friendly slower curve
      const isMobile = canvasWidth < 600;
      baseSpeed = (canvasWidth / (isMobile ? 300 : 250)) + (1 * 0.2);
      dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
      dy = -baseSpeed;
      paddleX = (canvasWidth - paddleWidth) / 2;
      
      // Re-init bricks
      let techIndex = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          const tech = TECH_STACK[techIndex % TECH_STACK.length];
          bricks[c][r].status = 1;
          bricks[c][r].text = tech.text;
          bricks[c][r].color = tech.color;
          techIndex++;
        }
      }
    };

    const initSizes = () => {
      // Scale everything relative to canvas width
      ballSize = Math.max(8, Math.floor(canvasWidth * 0.015));
      paddleWidth = Math.max(80, Math.floor(canvasWidth * 0.15));
      paddleHeight = Math.max(12, Math.floor(canvasHeight * 0.03));
      
      brickPadding = Math.max(6, Math.floor(canvasWidth * 0.015));
      brickOffsetLeft = Math.max(16, Math.floor(canvasWidth * 0.04));
      brickOffsetTop = Math.max(40, Math.floor(canvasHeight * 0.1));
      
      brickWidth = (canvasWidth - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
      brickHeight = Math.max(24, Math.floor(canvasHeight * 0.08));
      
      const isMobile = canvasWidth < 600;
      baseSpeed = (canvasWidth / (isMobile ? 300 : 250)) + (wave * 0.2);
      
      // Keep ball within bounds if resized
      if (x > canvasWidth) x = canvasWidth / 2;
      if (y > canvasHeight) y = canvasHeight - 60;
      if (paddleX > canvasWidth) paddleX = (canvasWidth - paddleWidth) / 2;
      
      // Update existing bricks width/height without resetting status
      if (bricks.length > 0) {
        for (let c = 0; c < brickColumnCount; c++) {
          for (let r = 0; r < brickRowCount; r++) {
            bricks[c][r].w = brickWidth;
            bricks[c][r].h = brickHeight;
          }
        }
      }
    };

    const initBricks = () => {
      initSizes();
      bricks = [];
      let techIndex = 0;
      for (let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < brickRowCount; r++) {
          const tech = TECH_STACK[techIndex % TECH_STACK.length];
          bricks[c][r] = { 
            x: 0, y: 0, w: brickWidth, h: brickHeight, 
            status: 1, text: tech.text, color: tech.color, id: techIndex, icon: tech.icon 
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
    
    const mouseMoveHandler = (e: MouseEvent) => {
      if (localGameOver) return;
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      if (relativeX > 0 && relativeX < canvasWidth) {
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
      const rect = canvas.getBoundingClientRect();
      const relativeX = e.touches[0].clientX - rect.left;
      if (relativeX > 0 && relativeX < canvasWidth) {
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
      const count = isWaveClear ? 60 : 15;
      for(let i=0; i< count; i++) {
        particles.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.5) * (isWaveClear ? 15 : 8),
          vy: (Math.random() - 0.5) * (isWaveClear ? 15 : 8),
          life: 1,
          color: color,
          size: Math.floor(Math.random() * 4) + 2 
        });
      }
    };

    const triggerWaveClear = () => {
      isTransitioningWave = true;
      transitionTimer = 100; 
      createExplosion(canvasWidth/2, canvasHeight/2, "#ffffff", true);
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
              
              // Trigger Floating Icon
              const iconId = Date.now() + Math.random();
              setFloatingIcons(prev => [...prev, {
                id: iconId,
                x: b.x + b.w / 2,
                y: b.y,
                icon: b.icon,
                color: b.color
              }]);
              
              setTimeout(() => {
                setFloatingIcons(prev => prev.filter(item => item.id !== iconId));
              }, 2500); // Wait 2.5s before cleanup
            }
          }
        }
      }

      if (allIgnited) triggerWaveClear();
    };

    const drawBall = () => {
      if (mousePressed && !autoPlay) {
        particles.push({
          x: x + ballSize/2,
          y: y + ballSize/2,
          vx: (Math.random() - 0.5) * 2,
          vy: Math.random() * 2,
          life: 0.5,
          color: ["#ef4444", "#f97316", "#eab308"][Math.floor(Math.random() * 3)],
          size: Math.floor(Math.random() * 4) + 2
        });
        ctx.fillStyle = "#ef4444"; 
      } else {
        ctx.fillStyle = "#ffffff";
      }
      ctx.fillRect(Math.floor(x), Math.floor(y), ballSize, ballSize);
    };

    const drawPaddle = () => {
      ctx.fillStyle = mousePressed && !autoPlay ? "#f43f5e" : "#0ea5e9";
      ctx.fillRect(Math.floor(paddleX), canvasHeight - paddleHeight - 10, paddleWidth, paddleHeight);
      
      ctx.fillStyle = "rgba(255,255,255,0.4)";
      ctx.fillRect(Math.floor(paddleX), canvasHeight - paddleHeight - 10, paddleWidth, 4);
      ctx.fillStyle = "rgba(0,0,0,0.4)";
      ctx.fillRect(Math.floor(paddleX), canvasHeight - 10 - 4, paddleWidth, 4);
    };

    const drawBricks = () => {
      // Significantly increase font size for better readability
      const fontSize = Math.max(12, Math.floor(canvasWidth * 0.025)); 

      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
          let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
          b.x = brickX;
          b.y = brickY;
          
          if (b.status === 1) {
            // DULL STATE (Solid physical block)
            ctx.fillStyle = "#1e293b"; // slate-800
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            // Chunky 3D Bevels
            ctx.fillStyle = "#334155"; // highlight
            ctx.fillRect(brickX, brickY, brickWidth, 4);
            ctx.fillRect(brickX, brickY, 4, brickHeight);
            ctx.fillStyle = "#020617"; // shadow
            ctx.fillRect(brickX, brickY + brickHeight - 4, brickWidth, 4);
            ctx.fillRect(brickX + brickWidth - 4, brickY, 4, brickHeight);
            
            // Text: Vibrant Neon Color + Hard Black Shadow for popping contrast
            ctx.font = `bold ${fontSize}px var(--font-pixel), monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            // Draw Hard Shadow
            ctx.fillStyle = "#000000";
            ctx.fillText(b.text, brickX + brickWidth / 2 + 2, brickY + brickHeight / 2 + 4);
            
            // Draw Foreground Text
            ctx.fillStyle = b.color; 
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2 + 2);
            
          } else {
            // IGNITED STATE (Holographic energy)
            ctx.fillStyle = b.color + "30"; // Slightly more opaque for visibility
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            // Hard Neon Outline
            ctx.lineWidth = 3; // Thicker border
            ctx.strokeStyle = b.color;
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            // Text: Pure White + Hard Black Shadow
            ctx.font = `bold ${fontSize}px var(--font-pixel), monospace`;
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            
            // Draw Hard Shadow
            ctx.fillStyle = "#000000";
            ctx.fillText(b.text, brickX + brickWidth / 2 + 2, brickY + brickHeight / 2 + 4);
            
            // Draw Foreground Text
            ctx.fillStyle = "#ffffff";
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
        p.vy += 0.15; 
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
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
      
      const fontSize = Math.max(30, Math.floor(canvasWidth * 0.06));
      ctx.fillStyle = "#ef4444";
      ctx.font = `bold ${fontSize}px var(--font-pixel), monospace`;
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", canvasWidth / 2, canvasHeight / 2);
      
      // Draw auto-restart countdown
      const countdown = Math.ceil(gameOverTimer / 60);
      ctx.fillStyle = "#94a3b8";
      ctx.font = `${Math.max(14, Math.floor(canvasWidth * 0.03))}px var(--font-pixel), monospace`;
      ctx.fillText(`AUTO RESTART IN ${countdown}...`, canvasWidth / 2, canvasHeight / 2 + fontSize);
    };

    let animationFrameId: number;

    const draw = () => {
      ctx.fillStyle = "#020617"; 
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      if (isTransitioningWave) {
        drawParticles();
        
        const fontSize = Math.max(24, Math.floor(canvasWidth * 0.05));
        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${fontSize}px var(--font-pixel), monospace`;
        ctx.textAlign = "center";
        ctx.fillText("OVERCLOCK", canvasWidth / 2, canvasHeight / 2);
        
        transitionTimer--;
        if (transitionTimer <= 0) {
          isTransitioningWave = false;
          setWave(prev => prev + 1);
          initBricks();
          x = canvasWidth / 2;
          y = canvasHeight - 60;
          const isMobile = canvasWidth < 600;
          baseSpeed = (canvasWidth / (isMobile ? 300 : 250)) + ((wave + 1) * 0.2);
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
        
        // Auto restart logic
        gameOverTimer--;
        if (gameOverTimer <= 0) {
          resetGameVariables();
          autoPlay = true;
          lastInteractionTime = Date.now() - 4000; // Force autoplay immediately
        }
        
        animationFrameId = requestAnimationFrame(draw);
        return;
      }

      collisionDetection();
      
      if (Date.now() - lastInteractionTime > 3000) {
        autoPlay = true;
      }
      
      if (autoPlay) {
        const targetX = x - paddleWidth / 2;
        paddleX += (targetX - paddleX) * 0.25;
        mousePressed = false; 
      } else {
        // Reduced paddle speed slightly for better control
        if (rightPressed && paddleX < canvasWidth - paddleWidth) paddleX += baseSpeed * 1.5;
        else if (leftPressed && paddleX > 0) paddleX -= baseSpeed * 1.5;
        
        // Reset speed to normal if we took over from an out-of-control autoplay
        if (Math.abs(dx) > baseSpeed * 1.5) {
           dx = (dx > 0 ? 1 : -1) * (baseSpeed * 1.2);
        }
      }
      
      if (paddleX < 0) paddleX = 0;
      if (paddleX + paddleWidth > canvasWidth) paddleX = canvasWidth - paddleWidth;

      let currentDx = dx;
      let currentDy = dy;
      
      if (mousePressed && !autoPlay) {
        currentDx *= 2;
        currentDy *= 2;
      }

      if (x + currentDx > canvasWidth - ballSize || x + currentDx < 0) {
        dx = -dx;
        currentDx = -currentDx;
      }
      if (y + currentDy < 0) {
        dy = -dy;
        currentDy = -currentDy;
      } else if (y + currentDy > canvasHeight - ballSize - paddleHeight - 8) {
        if (x + ballSize > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          
          // Add english, but clamp max speed to prevent runaway fast ball
          let newDx = dx + (x - (paddleX + paddleWidth / 2)) * 0.05;
          const maxSpeed = baseSpeed * 1.5;
          if (newDx > maxSpeed) newDx = maxSpeed;
          if (newDx < -maxSpeed) newDx = -maxSpeed;
          dx = newDx;
          
          // Ensure minimum vertical speed so it doesn't get stuck bouncing horizontally
          if (Math.abs(dy) < baseSpeed * 0.5) {
            dy = (dy > 0 ? 1 : -1) * baseSpeed * 0.5;
          }
          y = canvasHeight - ballSize - paddleHeight - 12;
          createExplosion(x, y + ballSize, "#0ea5e9");
        } else if (y + currentDy > canvasHeight) {
          if (autoPlay) {
            x = canvasWidth / 2;
            y = canvasHeight - 60;
            dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
            dy = -baseSpeed;
          } else {
            setLives(prev => {
              const newLives = prev - 1;
              if (newLives <= 0) {
                setIsGameOver(true);
                localGameOver = true;
                gameOverTimer = 180; // 3 seconds at 60fps
              }
              return newLives;
            });
            
            if (!localGameOver) {
              x = canvasWidth / 2;
              y = canvasHeight - 60;
              dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
              dy = -baseSpeed;
              paddleX = (canvasWidth - paddleWidth) / 2;
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

  const handleRestart = () => {
    window.location.reload(); 
  };

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[900px] bg-slate-900 border-b-[16px] border-r-[16px] border-slate-950 rounded-xl p-4 md:p-8 shadow-2xl relative z-20">
        
        {/* Header HUD */}
        <div className="w-full flex justify-between items-center mb-6 px-2">
          <h2 className="text-3xl md:text-5xl font-[family-name:var(--font-pixel)] text-sky-400 uppercase tracking-widest drop-shadow-[0_0_8px_rgba(56,189,248,0.5)]">
            ARSENAL
          </h2>
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Permanent Restart Button */}
            <button 
              onClick={handleRestart}
              className="flex items-center gap-1 md:gap-2 px-3 py-1 md:px-4 md:py-2 bg-red-500 hover:bg-red-400 text-white font-[family-name:var(--font-pixel)] text-sm md:text-base rounded-sm border-b-4 border-r-4 border-red-800 active:border-0 active:mt-1 transition-all"
            >
              <RefreshCw className="w-4 h-4 md:w-5 md:h-5" />
              RESET
            </button>

            {/* Lives & Score */}
            <div className="flex flex-col items-end gap-1">
              <div className="flex gap-1">
                {[...Array(3)].map((_, i) => (
                  <div 
                    key={i} 
                    className={`text-lg md:text-xl font-[family-name:var(--font-pixel)] ${i < lives ? 'text-red-500 drop-shadow-[0_0_5px_red]' : 'text-slate-700 opacity-30'}`}
                  >
                    ♥
                  </div>
                ))}
              </div>
              <div className="font-[family-name:var(--font-pixel)] text-sky-400 bg-slate-950 px-2 py-1 rounded border-b-4 border-black text-sm md:text-base">
                {score.toString().padStart(4, '0')}
              </div>
            </div>
            
          </div>
        </div>

        {/* The Screen Bezel */}
        <div className="w-full bg-[#1e293b] p-4 md:p-6 rounded-t-xl rounded-bl-xl rounded-br-[40px] shadow-[inset_0_5px_20px_rgba(0,0,0,0.8)] relative">
          
          {/* Game Container */}
          <div 
            ref={containerRef} 
            className="w-full aspect-[16/10] relative bg-[#020617] overflow-hidden cursor-crosshair shadow-[inset_0_0_10px_rgba(0,0,0,1)]"
          >
            <canvas 
              ref={canvasRef} 
              className="w-full h-full block"
              style={{ imageRendering: 'pixelated' }}
            />
            
            {/* Floating Pop-up Icons */}
            <div className="absolute inset-0 pointer-events-none z-40 overflow-hidden">
              <AnimatePresence>
                {floatingIcons.map(item => {
                  const Icon = item.icon;
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: item.y, x: item.x, scale: 0.5 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        y: item.y - 80, 
                        scale: [0.5, 2.5, 2.5, 2.5] 
                      }}
                      exit={{ opacity: 0 }}
                      transition={{ 
                        duration: 2.5, 
                        times: [0, 0.15, 0.8, 1], // Quick pop in, stay long, fade out
                        ease: "easeOut" 
                      }}
                      className="absolute pointer-events-none flex items-center justify-center"
                      style={{
                        color: item.color,
                        filter: `drop-shadow(0 0 10px ${item.color})`
                      }}
                    >
                      <Icon size={32} strokeWidth={2} style={{ transform: 'translate(-50%, -50%)' }} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
            
            {/* Explicit RESTART button layered on top of Canvas when Game Over */}
            {isGameOver && (
              <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/60 backdrop-blur-sm gap-6">
                <button 
                  onClick={handleRestart}
                  className="flex items-center gap-2 px-8 py-4 bg-red-500 hover:bg-red-400 text-white font-[family-name:var(--font-pixel)] text-2xl md:text-3xl rounded-sm border-b-4 border-r-4 border-red-800 active:border-0 active:mt-1 transition-all"
                >
                  <Play className="w-8 h-8 fill-current" />
                  PLAY AGAIN
                </button>
              </div>
            )}
          </div>
          
          <div className="absolute top-1/2 left-2 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_5px_red]" />
        </div>
        
        <div className="w-full flex justify-between items-end mt-6 px-4">
          <div className="flex gap-2">
            <div className="w-3 h-10 bg-slate-950 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.5)] transform -rotate-12"></div>
            <div className="w-3 h-10 bg-slate-950 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.5)] transform -rotate-12"></div>
            <div className="w-3 h-10 bg-slate-950 rounded-full shadow-[inset_2px_0_5px_rgba(0,0,0,0.5)] transform -rotate-12"></div>
          </div>
          <div className="font-[family-name:var(--font-pixel)] text-slate-700 text-xs md:text-sm">
            DARK PROTOCOL
          </div>
        </div>
      </div>
    </div>
  );
}
