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

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Resize handling
    const resizeCanvas = () => {
      canvas.width = container.clientWidth;
      canvas.height = Math.min(600, window.innerHeight * 0.6);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game Variables
    let ballRadius = 5;
    let x = canvas.width / 2;
    let y = canvas.height - 50;
    
    // Base speed increases per wave
    let baseSpeed = 4 + (wave * 0.5); 
    let dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
    let dy = -baseSpeed;
    
    let paddleHeight = 12;
    let paddleWidth = 100;
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
            status: 1, // Start as DULL
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
    let mousePressed = false; // For Gravity Pulse
    let mouseX = paddleX + paddleWidth / 2;
    let lastInteractionTime = 0;
    let autoPlay = true;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
      else if (e.key === " ") mousePressed = true; // spacebar for gravity
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
      else if (e.key === " ") mousePressed = false;
    };
    const mouseMoveHandler = (e: MouseEvent) => {
      const relativeX = e.clientX - canvas.getBoundingClientRect().left;
      if (relativeX > 0 && relativeX < canvas.width) {
        mouseX = relativeX;
        paddleX = relativeX - paddleWidth / 2;
      }
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    const mouseDownHandler = () => { mousePressed = true; lastInteractionTime = Date.now(); autoPlay = false; };
    const mouseUpHandler = () => { mousePressed = false; };
    
    const touchMoveHandler = (e: TouchEvent) => {
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
    document.addEventListener("mouseup", mouseUpHandler, false); // use document to catch off-canvas releases
    canvas.addEventListener("touchmove", touchMoveHandler, { passive: false });
    canvas.addEventListener("touchstart", mouseDownHandler, { passive: false });
    document.addEventListener("touchend", mouseUpHandler, false);

    const createExplosion = (ex: number, ey: number, isWaveClear: boolean = false) => {
      // 1. Dust particles (the gray shell shattering)
      for(let i=0; i< (isWaveClear ? 50 : 10); i++) {
        particles.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.5) * (isWaveClear ? 20 : 8),
          vy: (Math.random() - 0.5) * (isWaveClear ? 20 : 8),
          life: 1,
          color: "#475569", // slate-600
          size: Math.random() * 3 + 1
        });
      }
      // 2. Light particles (the energy spark)
      if (!isWaveClear) {
        for(let i=0; i< 5; i++) {
          particles.push({
            x: ex,
            y: ey,
            vx: (Math.random() - 0.5) * 4,
            vy: (Math.random() - 0.5) * 4,
            life: 1,
            color: "#ffffff",
            size: 2
          });
        }
      }
    };

    const triggerWaveClear = () => {
      isTransitioningWave = true;
      transitionTimer = 150; // frames
      // Create massive explosion in center
      createExplosion(canvas.width/2, canvas.height/2, true);
    };

    const collisionDetection = () => {
      if (isTransitioningWave) return;

      let allIgnited = true;

      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          
          if (b.status === 1) { // 1 = Dull/Solid
            allIgnited = false;
            // Check collision with ball
            if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) {
              dy = -dy; // bounce
              b.status = 0; // Ignite it! (0 = Ghost mode)
              setScore(prev => prev + 10);
              createExplosion(x, y);
            }
          }
        }
      }

      if (allIgnited) {
        triggerWaveClear();
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ffffff";
      ctx.fill();
      
      // Energy glow
      ctx.shadowBlur = 15;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
      
      // Trail effect handled by clearing with opacity in main loop
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
      ctx.fillStyle = mousePressed ? "#f43f5e" : "#0ea5e9";
      ctx.fill();
      ctx.shadowBlur = mousePressed ? 20 : 10;
      ctx.shadowColor = mousePressed ? "#f43f5e" : "#0ea5e9";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
      
      // Draw Gravity Pulse Wave if mouse pressed
      if (mousePressed) {
        ctx.beginPath();
        ctx.arc(paddleX + paddleWidth / 2, canvas.height - paddleHeight - 10, 60, Math.PI, 0);
        ctx.strokeStyle = "rgba(244, 63, 94, 0.3)";
        ctx.lineWidth = 2;
        ctx.setLineDash([5, 5]);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.closePath();
      }
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
            // DULL STATE (Solid wall)
            ctx.fillStyle = "#1e293b"; // slate-800
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = "#334155"; // slate-700
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.fillStyle = "#475569"; // slate-600 text
            ctx.font = "bold 12px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2);
          } else {
            // IGNITED STATE (Ghost Mode)
            ctx.fillStyle = isVercel ? "rgba(255,255,255,0.1)" : b.color + "20"; // 20 hex is ~12% opacity
            ctx.fillRect(brickX, brickY, brickWidth, brickHeight);
            
            ctx.lineWidth = 1;
            ctx.strokeStyle = isVercel ? "rgba(255,255,255,0.3)" : b.color;
            ctx.strokeRect(brickX, brickY, brickWidth, brickHeight);
            
            // Glowing Text
            ctx.shadowBlur = 10;
            ctx.shadowColor = b.color;
            ctx.fillStyle = isVercel ? "#ffffff" : b.color;
            ctx.font = "bold 14px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(b.text, brickX + brickWidth / 2, brickY + brickHeight / 2);
            ctx.shadowBlur = 0;
          }
        }
      }
    };

    const drawParticles = () => {
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.2; // gravity
        p.life -= 0.02;

        if (p.life <= 0) {
          particles.splice(i, 1);
        } else {
          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1.0;
        }
      }
    };

    const drawWaveClearText = () => {
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      ctx.shadowBlur = 20;
      ctx.shadowColor = "#f43f5e";
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 30px 'Courier New', monospace";
      ctx.textAlign = "center";
      ctx.fillText("SYSTEM OVERCLOCK", canvas.width / 2, canvas.height / 2);
      ctx.font = "14px 'Courier New', monospace";
      ctx.fillText(`PREPARING WAVE ${wave + 1}...`, canvas.width / 2, canvas.height / 2 + 40);
      ctx.shadowBlur = 0;
    };

    let animationFrameId: number;

    const draw = () => {
      // Clear canvas with trail
      ctx.fillStyle = "rgba(10, 15, 28, 0.3)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (isTransitioningWave) {
        drawParticles();
        drawWaveClearText();
        transitionTimer--;
        if (transitionTimer <= 0) {
          isTransitioningWave = false;
          setWave(prev => prev + 1);
          initBricks();
          // Reset ball position and increase speed
          x = canvas.width / 2;
          y = canvas.height - 50;
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
      collisionDetection();
      
      // Auto-play logic (Wait 3 seconds before auto-playing)
      if (Date.now() - lastInteractionTime > 3000) {
        autoPlay = true;
      }
      
      if (autoPlay) {
        // AI Paddle tracks ball perfectly but with slight delay
        const targetX = x - paddleWidth / 2;
        paddleX += (targetX - paddleX) * 0.2;
        mousePressed = false; // Bot doesn't use gravity pulse yet
      } else {
        // Manual control fallback for keyboard
        if (rightPressed && paddleX < canvas.width - paddleWidth) {
          paddleX += 7;
        }
        else if (leftPressed && paddleX > 0) {
          paddleX -= 7;
        }
      }
      
      // Keep paddle in bounds
      if (paddleX < 0) paddleX = 0;
      if (paddleX + paddleWidth > canvas.width) paddleX = canvas.width - paddleWidth;

      // === PHYSICS ===
      
      // Gravity Pulse Logic
      if (mousePressed) {
        const paddleCenterX = paddleX + paddleWidth / 2;
        const distY = (canvas.height - paddleHeight) - y;
        
        // If ball is above paddle and within reasonable distance
        if (distY > 0 && distY < 300) {
          // Pull X towards paddle center
          const pullForce = (paddleCenterX - x) * 0.005;
          dx += pullForce;
          
          // Cap horizontal speed so it doesn't go crazy
          if (dx > baseSpeed * 1.5) dx = baseSpeed * 1.5;
          if (dx < -baseSpeed * 1.5) dx = -baseSpeed * 1.5;
          
          // Slightly accelerate downward pull
          dy += 0.2;
        }
      }

      // Ball Wall collision
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - paddleHeight - 10) {
        // Paddle collision
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -Math.abs(dy); // always bounce up
          // Add english/spin based on where it hits the paddle
          const hitPoint = x - (paddleX + paddleWidth / 2);
          dx = hitPoint * 0.15;
          // prevent getting stuck vertically
          if (Math.abs(dx) < 1) dx = dx < 0 ? -2 : 2; 
        } else if (y + dy > canvas.height + ballRadius * 2) {
          // Ball out of bounds (Bottom)
          x = canvas.width / 2;
          y = canvas.height - 50;
          dx = baseSpeed * (Math.random() > 0.5 ? 1 : -1);
          dy = -baseSpeed;
          paddleX = (canvas.width - paddleWidth) / 2;
        }
      }

      x += dx;
      y += dy;

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
  }, [wave]); // Re-run effect slightly to sync React state if needed, though most state is internal

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header section */}
      <div className="w-full flex justify-between items-end mb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pixel)] text-white mb-2 uppercase tracking-wider">
            My Arsenal
          </h2>
          <p className="text-slate-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            The Activation Protocol
          </p>
        </div>
        <div className="text-right">
          <div className="font-[family-name:var(--font-pixel)] text-red-500 text-xl md:text-2xl mb-1">
            WAVE {wave}
          </div>
          <div className="font-mono text-slate-400 text-sm">
            SCORE: {score}
          </div>
        </div>
      </div>

      {/* Game Container */}
      <div 
        ref={containerRef} 
        className="w-full relative bg-[#0a0f1c] border-4 border-slate-700 rounded-lg shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden cursor-crosshair group"
      >
        <canvas 
          ref={canvasRef} 
          className="w-full block"
          style={{ imageRendering: 'pixelated' }}
        />
        
        {/* Overlay instructions that fade out */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/50 opacity-100 group-hover:opacity-0 transition-opacity duration-500">
          <div className="bg-slate-900 border-2 border-red-500 px-6 py-4 rounded text-center shadow-[0_0_30px_rgba(244,63,94,0.3)]">
            <p className="font-[family-name:var(--font-pixel)] text-white text-lg md:text-xl mb-2">IGNITE THE NODES</p>
            <p className="font-mono text-slate-400 text-xs uppercase mb-2">Move mouse to play • Click & Hold for Gravity Pulse</p>
            <p className="font-mono text-yellow-500/80 text-[10px] uppercase">Auto-play active when idle</p>
          </div>
        </div>
      </div>
    </div>
  );
}
