"use client";
import { useEffect, useRef } from "react";

export default function PixelSky() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = 0;
    let height = 0;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener("resize", resize);
    resize();

    class Star {
      x: number;
      y: number;
      size: number;
      opacity: number;
      fadeSpeed: number;
      isFadingIn: boolean;
      isFalling: boolean;
      fallSpeedX: number;
      fallSpeedY: number;

      constructor(forceFullOpacity = false) {
        // Spawn anywhere on the screen
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        
        // 15% chance to be a falling star (meteor/rain)
        this.isFalling = Math.random() < 0.15;
        
        if (this.isFalling) {
          this.size = Math.random() < 0.5 ? 4 : 8; // Longer streaks for falling
          this.fallSpeedX = -(Math.random() * 3 + 3); // Fall bottom-left
          this.fallSpeedY = Math.random() * 3 + 3;
          this.fadeSpeed = Math.random() * 0.01 + 0.01; // Slower fade for meteors
        } else {
          // Blinking stars
          const sizes = [4, 4, 6, 8]; // Big pixelated sizes
          this.size = sizes[Math.floor(Math.random() * sizes.length)];
          this.fallSpeedX = 0;
          this.fallSpeedY = 0;
          this.fadeSpeed = Math.random() * 0.02 + 0.015; // Random blink speed
        }

        // If it's the initial load, randomize current opacity so they don't all blink together
        this.opacity = forceFullOpacity ? Math.random() : 0;
        this.isFadingIn = !forceFullOpacity;
      }

      update() {
        if (this.isFadingIn) {
          this.opacity += this.fadeSpeed;
          if (this.opacity >= 1) {
            this.opacity = 1;
            this.isFadingIn = false;
          }
        } else {
          this.opacity -= this.fadeSpeed;
        }

        if (this.isFalling) {
          this.x += this.fallSpeedX;
          this.y += this.fallSpeedY;
        }
      }

      draw(ctx: CanvasRenderingContext2D) {
        if (this.opacity <= 0) return;

        // Simulate 8-bit discrete opacity steps (optional, for retro feel)
        // const steppedOpacity = Math.floor(this.opacity * 5) / 5;
        const currentOpacity = this.opacity; 

        // 1. Draw Drop Shadow (Blueish to contrast with background)
        ctx.fillStyle = `rgba(2, 132, 199, ${currentOpacity * 0.3})`;
        
        if (this.isFalling) {
           // Draw falling streak shadow
           ctx.fillRect(Math.floor(this.x) + 4, Math.floor(this.y) + 4, this.size * 2, this.size / 2);
        } else {
           ctx.fillRect(Math.floor(this.x) + 4, Math.floor(this.y) + 4, this.size, this.size);
        }

        // 2. Draw Main White Star
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        
        if (this.isFalling) {
          // Draw falling streak
          ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size * 2, this.size / 2);
        } else {
          ctx.fillRect(Math.floor(this.x), Math.floor(this.y), this.size, this.size);
        }
      }
    }

    // Initialize 100 stars (good density for full screen, not too cluttered)
    let stars: Star[] = [];
    const maxStars = 100;
    for (let i = 0; i < maxStars; i++) {
      stars.push(new Star(true));
    }

    const render = () => {
      // Clear canvas each frame
      ctx.clearRect(0, 0, width, height);

      for (let i = stars.length - 1; i >= 0; i--) {
        const star = stars[i];
        star.update();
        star.draw(ctx);

        // If star completely faded out, remove it and spawn a new one in a NEW random location!
        if (star.opacity <= 0 && !star.isFadingIn) {
          stars.splice(i, 1);
          stars.push(new Star());
        }
        
        // If falling star went off screen, respawn
        if (star.isFalling && (star.x < -20 || star.y > height + 20)) {
            stars.splice(i, 1);
            stars.push(new Star());
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-sky-200 pointer-events-none">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
}
