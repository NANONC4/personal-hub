"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface SpaceShooterMiniGameProps {
  className?: string;
}

export function SpaceShooterMiniGame({ className = "" }: SpaceShooterMiniGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false); // To show interaction hint

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas internal resolution to be fixed, scaled by CSS for crisp pixel art
    const GAME_WIDTH = 256;
    const GAME_HEIGHT = 256;
    canvas.width = GAME_WIDTH;
    canvas.height = GAME_HEIGHT;

    // --- GAME STATE ---
    let animationFrameId: number;
    let lastTime = 0;
    
    // Interaction state
    let isUserInteracting = false;
    let idleTimer: NodeJS.Timeout;
    
    // Entities
    const player = {
      x: GAME_WIDTH / 2,
      y: GAME_HEIGHT - 30,
      width: 16,
      height: 16,
      speed: 120, // pixels per second
      color: "#38bdf8", // sky-400
      targetX: GAME_WIDTH / 2, // For smooth movement
      autoDirection: 1,
    };

    let bullets: { x: number; y: number; speed: number; color: string }[] = [];
    let enemies: { x: number; y: number; width: number; height: number; speed: number; color: string; hp: number }[] = [];
    let particles: { x: number; y: number; vx: number; vy: number; life: number; color: string }[] = [];
    
    // Spawn timers
    let enemySpawnTimer = 0;
    let autoShootTimer = 0;

    // --- DRAWING HELPERS ---
    const drawPixelShape = (x: number, y: number, shape: number[][], size: number, color: string) => {
      ctx.fillStyle = color;
      for (let r = 0; r < shape.length; r++) {
        for (let c = 0; c < shape[r].length; c++) {
          if (shape[r][c] === 1) {
            ctx.fillRect(Math.floor(x + c * size), Math.floor(y + r * size), size, size);
          }
        }
      }
    };

    // Pixel matrices (1 = filled, 0 = empty)
    const shipShape = [
      [0,0,1,0,0],
      [0,1,1,1,0],
      [0,1,1,1,0],
      [1,1,0,1,1],
      [1,0,0,0,1],
    ];
    
    const enemyShape = [
      [1,0,1,0,1],
      [0,1,1,1,0],
      [1,1,1,1,1],
      [1,0,1,0,1],
      [0,1,0,1,0],
    ];

    const pixelSize = 3;

    // --- LOGIC ---
    const shoot = () => {
      bullets.push({
        x: player.x,
        y: player.y - 10,
        speed: 300,
        color: "#fbbf24" // amber-400
      });
    };

    const spawnEnemy = () => {
      enemies.push({
        x: Math.random() * (GAME_WIDTH - 20) + 10,
        y: -20,
        width: 15,
        height: 15,
        speed: Math.random() * 30 + 30, // 30-60 px/s
        color: "#f472b6", // pink-400
        hp: 1,
      });
    };

    const createExplosion = (x: number, y: number, color: string) => {
      for (let i = 0; i < 10; i++) {
        particles.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 100,
          vy: (Math.random() - 0.5) * 100,
          life: 1.0,
          color: Math.random() > 0.5 ? color : "#ffffff"
        });
      }
    };

    const resetIdleTimer = () => {
      isUserInteracting = true;
      setIsPlaying(true);
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => {
        isUserInteracting = false;
        setIsPlaying(false);
      }, 3000); // Resume auto-play after 3 seconds of no interaction
    };

    // --- UPDATE LOOP ---
    const update = (dt: number) => {
      // 1. Player movement
      if (isUserInteracting) {
        // Move smoothly to targetX
        player.x += (player.targetX - player.x) * 10 * dt;
      } else {
        // Auto-play (GIF mode)
        player.x += player.autoDirection * player.speed * dt;
        if (player.x <= 20) player.autoDirection = 1;
        if (player.x >= GAME_WIDTH - 20) player.autoDirection = -1;
        
        // Auto shoot
        autoShootTimer += dt;
        if (autoShootTimer > 0.5) {
          shoot();
          autoShootTimer = 0;
        }
      }
      
      // Clamp player to screen
      player.x = Math.max(15, Math.min(GAME_WIDTH - 15, player.x));

      // 2. Bullets
      for (let i = bullets.length - 1; i >= 0; i--) {
        const b = bullets[i];
        b.y -= b.speed * dt;
        if (b.y < -10) bullets.splice(i, 1);
      }

      // 3. Enemies
      enemySpawnTimer += dt;
      if (enemySpawnTimer > 1.2) {
        spawnEnemy();
        enemySpawnTimer = 0;
      }

      for (let i = enemies.length - 1; i >= 0; i--) {
        const e = enemies[i];
        e.y += e.speed * dt;
        
        // Collision with bullets
        for (let j = bullets.length - 1; j >= 0; j--) {
          const b = bullets[j];
          if (Math.abs(b.x - e.x) < 15 && Math.abs(b.y - e.y) < 15) {
            e.hp--;
            bullets.splice(j, 1);
            createExplosion(b.x, b.y, "#f472b6");
            break;
          }
        }
        
        if (e.hp <= 0) {
          createExplosion(e.x, e.y, e.color);
          enemies.splice(i, 1);
          continue;
        }
        
        // Delete if off screen
        if (e.y > GAME_HEIGHT + 20) {
          enemies.splice(i, 1);
        }
      }

      // 4. Particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life -= dt * 2; // fade speed
        if (p.life <= 0) particles.splice(i, 1);
      }
    };

    // --- DRAW LOOP ---
    const draw = () => {
      // Clear with dark pixel sky color
      ctx.fillStyle = "#050810"; // Very dark
      ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      
      // Draw subtle stars
      ctx.fillStyle = "#ffffff22";
      ctx.fillRect(50, 50, 2, 2);
      ctx.fillRect(200, 150, 2, 2);
      ctx.fillRect(100, 220, 2, 2);
      ctx.fillRect(30, 180, 2, 2);

      // Draw Enemies
      enemies.forEach(e => {
        drawPixelShape(e.x - 7.5, e.y - 7.5, enemyShape, pixelSize, e.color);
      });

      // Draw Bullets
      bullets.forEach(b => {
        ctx.fillStyle = b.color;
        ctx.fillRect(Math.floor(b.x - 2), Math.floor(b.y - 6), 4, 12);
      });

      // Draw Particles
      particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), 3, 3);
        ctx.globalAlpha = 1.0;
      });

      // Draw Player
      drawPixelShape(player.x - 7.5, player.y - 7.5, shipShape, pixelSize, player.color);
    };

    // --- MAIN LOOP ---
    const loop = (timestamp: number) => {
      if (!lastTime) lastTime = timestamp;
      const dt = (timestamp - lastTime) / 1000; // delta time in seconds
      lastTime = timestamp;

      // Cap dt to prevent huge jumps if tab is inactive
      if (dt < 0.1) {
        update(dt);
        draw();
      }

      animationFrameId = requestAnimationFrame(loop);
    };

    // Start loop
    animationFrameId = requestAnimationFrame(loop);

    // --- EVENT LISTENERS ---
    const updateMousePos = (e: MouseEvent | TouchEvent) => {
      const rect = canvas.getBoundingClientRect();
      let clientX;
      if (window.TouchEvent && e instanceof TouchEvent) {
        clientX = e.touches[0].clientX;
      } else {
        clientX = (e as MouseEvent).clientX;
      }
      
      const scaleX = canvas.width / rect.width;
      const x = (clientX - rect.left) * scaleX;
      player.targetX = x;
      resetIdleTimer();
    };

    const handleInteract = (e: Event) => {
      e.preventDefault(); // Prevent scrolling when touching game
      shoot();
      resetIdleTimer();
    };

    // Desktop
    canvas.addEventListener("mousemove", updateMousePos as EventListener);
    canvas.addEventListener("mousedown", handleInteract);
    // Mobile
    canvas.addEventListener("touchmove", updateMousePos as EventListener, { passive: false });
    canvas.addEventListener("touchstart", handleInteract, { passive: false });

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(idleTimer);
      canvas.removeEventListener("mousemove", updateMousePos as EventListener);
      canvas.removeEventListener("mousedown", handleInteract);
      canvas.removeEventListener("touchmove", updateMousePos as EventListener);
      canvas.removeEventListener("touchstart", handleInteract);
    };
  }, []);

  return (
    <div className={`relative group w-64 h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 shrink-0 ${className}`} ref={containerRef}>
      {/* Arcade cabinet glowing border effect */}
      <div className="absolute -inset-2 bg-gradient-to-r from-sky-500 to-pink-500 rounded-3xl blur opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200" />
      
      <div className="relative w-full h-full rounded-3xl overflow-hidden border-4 border-slate-700 bg-[#050810] shadow-[0_0_40px_rgba(0,0,0,0.5)] flex items-center justify-center">
        
        {/* The Canvas Game */}
        <canvas 
          ref={canvasRef} 
          className="w-full h-full object-cover [image-rendering:pixelated] cursor-crosshair touch-none"
        />

        {/* Scanlines overlay for retro feel */}
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%] z-10" />
        
        {/* CRT screen glare */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/10 to-transparent rounded-3xl z-20" />

        {/* Interaction Hint (Disappears when playing) */}
        {!isPlaying && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-6 left-0 right-0 flex justify-center pointer-events-none z-30"
          >
            <div className="bg-slate-900/80 backdrop-blur text-white font-mono text-[10px] md:text-xs px-3 py-1.5 rounded-full border border-slate-700/50 uppercase tracking-widest animate-pulse shadow-lg">
              Tap / Hover to Play
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
