
import React, { useEffect, useRef } from 'react';
import { Theme } from '../types';

interface BackgroundSystemProps {
  theme: Theme;
}

const BackgroundSystem: React.FC<BackgroundSystemProps> = ({ theme }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Advanced Physics State
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0, vX: 0, vY: 0 });
  const dimensions = useRef({ w: 0, h: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true }); 
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;

    // --- CONFIGURATION v6.1 ---
    const starCount = isMobile ? 40 : 160; 
    const baseSpeed = 0.3; 
    const connectionDistance = isMobile ? 90 : 180; 

    class Star {
      x: number;
      y: number;
      z: number;
      size: number;

      constructor() {
        this.x = Math.random() * dimensions.current.w - dimensions.current.w / 2;
        this.y = Math.random() * dimensions.current.h - dimensions.current.h / 2;
        this.z = Math.random() * dimensions.current.w;
        this.size = Math.random();
      }

      update(speed: number, mouseVx: number, mouseVy: number) {
        this.z -= speed;
        this.x -= mouseVx * 0.2;
        this.y -= mouseVy * 0.2;

        if (this.z < 1 || Math.abs(this.x) > dimensions.current.w || Math.abs(this.y) > dimensions.current.h) {
          this.z = dimensions.current.w;
          this.x = Math.random() * dimensions.current.w - dimensions.current.w / 2;
          this.y = Math.random() * dimensions.current.h - dimensions.current.h / 2;
        }
      }

      getScreenPos(cx: number, cy: number) {
          const scale = dimensions.current.w / this.z;
          const sx = this.x * scale + cx;
          const sy = this.y * scale + cy;
          return { x: sx, y: sy, scale: scale, opacity: (1 - this.z / dimensions.current.w) };
      }
    }

    let stars: Star[] = [];
    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) stars.push(new Star());
    };

    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = isMobile ? 30 : 60;
    const frameInterval = 1000 / targetFPS;
    
    const animate = (timestamp: number = 0) => {
      const elapsed = timestamp - lastFrameTime;
      if (elapsed < frameInterval) {
        animationFrameId = requestAnimationFrame(animate);
        return;
      }
      lastFrameTime = timestamp - (elapsed % frameInterval);
      ctx.clearRect(0, 0, dimensions.current.w, dimensions.current.h);
      
      const isDark = theme === 'dark';
      const cx = dimensions.current.w / 2;
      const cy = dimensions.current.h / 2;

      const ease = 0.08;
      mouse.current.vX = (mouse.current.targetX - mouse.current.x) * ease;
      mouse.current.vY = (mouse.current.targetY - mouse.current.y) * ease;
      mouse.current.x += mouse.current.vX;
      mouse.current.y += mouse.current.vY;

      if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x-px', mouse.current.x.toFixed(1));
          containerRef.current.style.setProperty('--mouse-y-px', mouse.current.y.toFixed(1));
      }
      
      if (gridRef.current && !isMobile) {
          const nX = (mouse.current.x / dimensions.current.w) - 0.5;
          const nY = (mouse.current.y / dimensions.current.h) - 0.5;
          gridRef.current.style.transform = `perspective(1000px) rotateX(${60 + nY * 15}deg) rotateY(${nX * -15}deg) translateY(0) translateZ(-50px)`;
      }

      const screenPoints: {x: number, y: number, scale: number, opacity: number}[] = [];
      
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(baseSpeed, mouse.current.vX, mouse.current.vY);
        screenPoints.push(stars[i].getScreenPos(cx, cy));
      }

      // --- RENDER NEURAL NETWORK (THEME ADAPTIVE) ---
      ctx.lineWidth = 1;
      
      for (let i = 0; i < stars.length; i++) {
          const p1 = screenPoints[i];
          if (p1.x < 0 || p1.x > dimensions.current.w || p1.y < 0 || p1.y > dimensions.current.h) continue;

          for (let j = i + 1; j < stars.length; j++) {
              const p2 = screenPoints[j];
              const dx = p1.x - p2.x;
              const dy = p1.y - p2.y;
              const dist = Math.sqrt(dx * dx + dy * dy);

              if (dist < connectionDistance) {
                  const lineAlpha = (1 - dist / connectionDistance) * p1.opacity * p2.opacity * 0.8;
                  
                  if (lineAlpha > 0.05) {
                      ctx.beginPath();
                      ctx.moveTo(p1.x, p1.y);
                      ctx.lineTo(p2.x, p2.y);
                      // v6.1 COLOR LOGIC:
                      // Dark: Cyan/Electric Blue (Energy)
                      // Light: Slate/Indigo (Structure)
                      ctx.strokeStyle = isDark 
                        ? `rgba(6, 182, 212, ${lineAlpha})` 
                        : `rgba(99, 102, 241, ${lineAlpha * 0.6})`; // Indigo-500
                      ctx.stroke();
                  }
              }
          }

          const r = Math.max(1, 3.0 * (1 - p1.opacity));
          ctx.beginPath();
          ctx.arc(p1.x, p1.y, r, 0, Math.PI * 2);
          ctx.fillStyle = isDark 
            ? `rgba(255, 255, 255, ${p1.opacity})` 
            : `rgba(30, 41, 59, ${p1.opacity * 0.5})`; // Slate-800
          ctx.fill();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      dimensions.current.w = window.innerWidth;
      dimensions.current.h = window.innerHeight;
      canvas.width = dimensions.current.w;
      canvas.height = dimensions.current.h;
      initStars();
    };

    const handleMouseMove = (e: MouseEvent) => {
        mouse.current.targetX = e.clientX;
        mouse.current.targetY = e.clientY;
    };

    let lastOrientationTime = 0;
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
        const now = Date.now();
        if (now - lastOrientationTime < 100) return; // throttle to ~10fps
        lastOrientationTime = now;
        if (e.gamma !== null && e.beta !== null) {
             const centerX = dimensions.current.w / 2;
             const centerY = dimensions.current.h / 2;
             mouse.current.targetX = centerX + (e.gamma * 10); 
             mouse.current.targetY = centerY + ((e.beta - 45) * 10);
        }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('deviceorientation', handleDeviceOrientation, { passive: true });

    handleResize();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <style>{`
            :root { --mouse-x-px: 0; --mouse-y-px: 0; }
            
            .bg-void {
                position: absolute; inset: 0;
                /* 2026 CHROMATIC VOID: Deep Space Navy w/ dual-tone aurora */
                background: ${theme === 'dark' 
                    ? `radial-gradient(ellipse at 30% 0%, rgba(6, 182, 212, 0.12) 0%, transparent 50%),
                       radial-gradient(ellipse at 70% 0%, rgba(168, 85, 247, 0.08) 0%, transparent 50%),
                       radial-gradient(ellipse at 50% 100%, rgba(99, 102, 241, 0.06) 0%, transparent 60%),
                       linear-gradient(180deg, #04091A 0%, #030712 40%, #020510 100%)` 
                    : 'radial-gradient(circle at center, #f8fafc 0%, #e2e8f0 100%)'};
                transition: background 1.5s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .grid-hologram {
                position: absolute; inset: -150%; width: 400%; height: 400%;
                /* 2026: Cyan-tinted grid (chromatic, not white) */
                background-image: ${theme === 'dark'
                    ? 'linear-gradient(rgba(6, 182, 212, 0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.10) 1px, transparent 1px)'
                    : 'linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)'
                };
                background-size: 80px 80px; 
                transform-style: preserve-3d;
                transform-origin: center center;
                animation: grid-cruise 120s linear infinite;
                mask-image: radial-gradient(circle at center, black 0%, transparent 70%);
            }
            
            @keyframes grid-cruise { 0% { background-position: 0 0; } 100% { background-position: 0 80px; } }

            canvas { display: block; width: 100%; height: 100%; position: relative; z-index: 10; opacity: 1; }

            .searchlight {
                position: absolute; inset: 0; z-index: 20;
                /* Dark: Searchlight | Light: Ambient Shadow */
                background: radial-gradient(
                    ${theme === 'dark' ? '500px' : '800px'} circle at calc(var(--mouse-x-px) * 1px) calc(var(--mouse-y-px) * 1px),
                    ${theme === 'dark' ? 'rgba(34, 211, 238, 0.08)' : 'rgba(255, 255, 255, 0)'},
                    ${theme === 'dark' ? 'transparent 60%' : 'rgba(0, 0, 0, 0.03) 100%'} 
                );
                mix-blend-mode: ${theme === 'dark' ? 'screen' : 'multiply'};
            }
        `}</style>
        
        <div className="bg-void"></div>
        <div ref={gridRef} className="grid-hologram"></div>
        <canvas ref={canvasRef} />
        <div className="searchlight"></div>
        
        {/* Cinematic Grain - Stronger in Dark Mode */}
        <div className={`absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay z-30 pointer-events-none transition-opacity duration-1000 ${theme === 'dark' ? 'opacity-[0.04]' : 'opacity-[0.02]'}`}></div>
    </div>
  );
};

export default BackgroundSystem;
