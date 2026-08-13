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
  status: number;
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
};

export function TechBreakout() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
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
      // Fixed height or responsive
      canvas.height = Math.min(600, window.innerHeight * 0.6);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Game Variables
    let ballRadius = 6;
    let x = canvas.width / 2;
    let y = canvas.height - 30;
    let dx = 4;
    let dy = -4;
    let paddleHeight = 12;
    let paddleWidth = 100;
    let paddleX = (canvas.width - paddleWidth) / 2;
    
    // Bricks config
    const brickRowCount = 3;
    const brickColumnCount = 5;
    const brickPadding = 10;
    const brickOffsetTop = 50;
    const brickOffsetLeft = 30;
    let brickWidth = (canvas.width - (brickOffsetLeft * 2) - (brickPadding * (brickColumnCount - 1))) / brickColumnCount;
    let brickHeight = 35;

    let bricks: Brick[][] = [];
    let particles: Particle[] = [];
    
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
    let mouseX = paddleX + paddleWidth / 2;
    let lastInteractionTime = 0; // for auto-play
    let autoPlay = true;

    const keyDownHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
      lastInteractionTime = Date.now();
      autoPlay = false;
    };
    const keyUpHandler = (e: KeyboardEvent) => {
      if (e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
      else if (e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
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
    canvas.addEventListener("touchmove", touchMoveHandler, { passive: false });

    const createExplosion = (ex: number, ey: number, color: string) => {
      for(let i=0; i<15; i++) {
        particles.push({
          x: ex,
          y: ey,
          vx: (Math.random() - 0.5) * 10,
          vy: (Math.random() - 0.5) * 10,
          life: 1,
          color: color
        });
      }
    };

    const collisionDetection = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          let b = bricks[c][r];
          if (b.status === 1) {
            if (x > b.x && x < b.x + b.w && y > b.y && y < b.y + b.h) {
              dy = -dy;
              b.status = 0;
              setScore(prev => prev + 1);
              createExplosion(x, y, b.color);
              
              // Increase speed slightly
              if (Math.abs(dx) < 8) dx *= 1.05;
              if (Math.abs(dy) < 8) dy *= 1.05;
              
              // Check Win condition (all broken)
              let isWin = true;
              for (let i = 0; i < brickColumnCount; i++) {
                for (let j = 0; j < brickRowCount; j++) {
                  if (bricks[i][j].status === 1) isWin = false;
                }
              }
              if (isWin) {
                setTimeout(initBricks, 2000); // Reset after 2 seconds
              }
            }
          }
        }
      }
    };

    const drawBall = () => {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#ff0044";
      ctx.fill();
      
      // glow
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#ff0044";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
    };

    const drawPaddle = () => {
      ctx.beginPath();
      ctx.rect(paddleX, canvas.height - paddleHeight - 10, paddleWidth, paddleHeight);
      ctx.fillStyle = "#38bdf8";
      ctx.fill();
      ctx.shadowBlur = 10;
      ctx.shadowColor = "#38bdf8";
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.closePath();
      
      // Add grip details
      ctx.fillStyle = "#0ea5e9";
      for (let i = 0; i < 5; i++) {
        ctx.fillRect(paddleX + 20 + i * 15, canvas.height - paddleHeight - 10 + 2, 4, 8);
      }
    };

    const drawBricks = () => {
      for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
          if (bricks[c][r].status === 1) {
            let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
            let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
            bricks[c][r].x = brickX;
            bricks[c][r].y = brickY;
            
            // Draw brick background
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            
            // Fix Vercel logo color logic
            const isVercel = bricks[c][r].text === "VERCEL";
            ctx.fillStyle = isVercel ? "#ffffff" : "#1e293b";
            ctx.fill();
            
            ctx.lineWidth = 2;
            ctx.strokeStyle = bricks[c][r].color;
            ctx.stroke();
            
            // Draw Tech Text
            ctx.fillStyle = isVercel ? "#000000" : bricks[c][r].color;
            ctx.font = "bold 14px 'Courier New', monospace";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(bricks[c][r].text, brickX + brickWidth / 2, brickY + brickHeight / 2);
            ctx.closePath();
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
          ctx.fillRect(p.x, p.y, 4, 4);
          ctx.globalAlpha = 1.0;
        }
      }
    };

    let animationFrameId: number;

    const draw = () => {
      // Clear with trail effect
      ctx.fillStyle = "rgba(10, 15, 28, 0.4)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
        // AI Paddle tracks ball perfectly but with slight delay/speed limit
        const targetX = x - paddleWidth / 2;
        paddleX += (targetX - paddleX) * 0.2;
      } else {
        // Manual control
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

      // Ball Wall collision
      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - paddleHeight - 10) {
        // Paddle collision
        if (x > paddleX && x < paddleX + paddleWidth) {
          dy = -dy;
          // Add english/spin based on where it hits the paddle
          const hitPoint = x - (paddleX + paddleWidth / 2);
          dx = hitPoint * 0.15;
          // prevent getting stuck vertically
          if (Math.abs(dx) < 1) dx = dx < 0 ? -2 : 2; 
        } else if (y + dy > canvas.height + ballRadius * 2) {
          // Ball out of bounds (Bottom)
          // If auto-play, it shouldn't happen, but if user misses, reset ball
          x = canvas.width / 2;
          y = canvas.height - 50;
          dx = 4 * (Math.random() > 0.5 ? 1 : -1);
          dy = -4;
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
      canvas.removeEventListener("touchmove", touchMoveHandler);
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Header section */}
      <div className="w-full flex justify-between items-end mb-6">
        <div>
          <h2 className="text-4xl md:text-5xl font-[family-name:var(--font-pixel)] text-white mb-2 uppercase tracking-wider">
            My Arsenal
          </h2>
          <p className="text-slate-400 font-mono text-xs md:text-sm tracking-widest uppercase">
            Tools & Technologies I use
          </p>
        </div>
        <div className="font-[family-name:var(--font-pixel)] text-red-500 text-xl md:text-2xl animate-pulse">
          SCORE: {score * 100}
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
          <div className="bg-slate-900 border-2 border-red-500 px-6 py-4 rounded text-center">
            <p className="font-[family-name:var(--font-pixel)] text-white text-lg md:text-xl mb-2">SMASH THE STACK!</p>
            <p className="font-mono text-slate-400 text-xs uppercase">Move mouse to play • Auto-play is active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
