
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

    const ctx = canvas.getContext('2d', { alpha: true }); // Optimize alpha
    if (!ctx) return;

    // --- CONFIGURATION ---
    const starCount = window.innerWidth < 768 ? 100 : 250; 
    const warpFactor = 0.05; // How much mouse speed stretches stars
    const depthSpeed = 2; // Forward movement speed

    // --- 3D STAR SYSTEM ---
    class Star {
      x: number;
      y: number;
      z: number;
      pz: number; // Previous Z for trail calculation

      constructor() {
        this.x = Math.random() * dimensions.current.w - dimensions.current.w / 2;
        this.y = Math.random() * dimensions.current.h - dimensions.current.h / 2;
        this.z = Math.random() * dimensions.current.w;
        this.pz = this.z;
      }

      update(speed: number) {
        this.z -= speed;
        
        // Reset if star passes camera
        if (this.z < 1) {
          this.z = dimensions.current.w;
          this.x = Math.random() * dimensions.current.w - dimensions.current.w / 2;
          this.y = Math.random() * dimensions.current.h - dimensions.current.h / 2;
          this.pz = this.z;
        }
      }

      draw(context: CanvasRenderingContext2D, cx: number, cy: number, isDark: boolean, mouseVx: number, mouseVy: number) {
        // Perspective projection
        const sx = (this.x / this.z) * dimensions.current.w + cx;
        const sy = (this.y / this.z) * dimensions.current.w + cy;

        // Trail calculation (Warp effect)
        // Calculate previous position based on Z + speed and Mouse Velocity influence
        const trailZ = this.z + (depthSpeed * 5) + (Math.abs(mouseVx) + Math.abs(mouseVy)) * 2;
        const ex = (this.x / trailZ) * dimensions.current.w + cx - (mouseVx * warpFactor * (dimensions.current.w - this.z) * 0.01);
        const ey = (this.y / trailZ) * dimensions.current.w + cy - (mouseVy * warpFactor * (dimensions.current.w - this.z) * 0.01);

        const r = (1 - this.z / dimensions.current.w) * 2.5; // Size based on depth
        const opacity = (1 - this.z / dimensions.current.w);

        if (sx > 0 && sx < dimensions.current.w && sy > 0 && sy < dimensions.current.h) {
            context.beginPath();
            context.lineWidth = r;
            context.strokeStyle = isDark 
                ? `rgba(165, 243, 252, ${opacity * 0.8})` // Cyan-ish white
                : `rgba(59, 130, 246, ${opacity * 0.6})`; // Blue
            
            context.moveTo(ex, ey);
            context.lineTo(sx, sy);
            context.stroke();
            
            // Core glow
            if (r > 1.5) {
                context.beginPath();
                context.fillStyle = isDark ? `rgba(255,255,255, ${opacity})` : `rgba(30, 64, 175, ${opacity})`;
                context.arc(sx, sy, r * 0.5, 0, Math.PI * 2);
                context.fill();
            }
        }
        
        this.pz = this.z;
      }
    }

    let stars: Star[] = [];

    const initStars = () => {
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    // --- ANIMATION LOOP ---
    let animationFrameId: number;

    const animate = () => {
      // 1. Clear Canvas (No trails here, clean clear for crisp motion)
      ctx.clearRect(0, 0, dimensions.current.w, dimensions.current.h);
      
      const isDark = theme === 'dark';
      const cx = dimensions.current.w / 2;
      const cy = dimensions.current.h / 2;

      // 2. Physics & Mouse Smoothing
      const ease = 0.05;
      mouse.current.vX = (mouse.current.targetX - mouse.current.x) * ease;
      mouse.current.vY = (mouse.current.targetY - mouse.current.y) * ease;
      
      mouse.current.x += mouse.current.vX;
      mouse.current.y += mouse.current.vY;

      // Dynamic Speed based on mouse movement (Warp effect)
      const currentSpeed = depthSpeed + (Math.sqrt(mouse.current.vX**2 + mouse.current.vY**2) * 0.5);

      // 3. Update CSS Variables for Dom Elements (Spotlight & Grid Tilt)
      if (containerRef.current) {
          containerRef.current.style.setProperty('--mouse-x-px', mouse.current.x.toFixed(1));
          containerRef.current.style.setProperty('--mouse-y-px', mouse.current.y.toFixed(1));
      }
      
      // OPTIMIZED GRID TILT: Calculate rotateX/Y based on normalized mouse position
      if (gridRef.current) {
          const nX = (mouse.current.x / dimensions.current.w) - 0.5; // -0.5 to 0.5
          const nY = (mouse.current.y / dimensions.current.h) - 0.5;
          
          // Limit tilt angles
          const tiltX = nY * 20; // Max 10deg
          const tiltY = nX * -20;
          
          gridRef.current.style.transform = `perspective(1000px) rotateX(${60 + tiltX}deg) rotateY(${tiltY}deg) translateY(0) translateZ(-100px)`;
      }

      // 4. Draw Stars
      for (let i = 0; i < stars.length; i++) {
        stars[i].update(currentSpeed);
        // Parallax offset: Move stars opposite to mouse to simulate camera movement
        const parallaxX = cx + (mouse.current.x - cx) * 0.05;
        const parallaxY = cy + (mouse.current.y - cy) * 0.05;
        
        stars[i].draw(ctx, parallaxX, parallaxY, isDark, mouse.current.vX, mouse.current.vY);
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // --- EVENT LISTENERS ---
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
    
    // Gyroscope for Mobile
    const handleDeviceOrientation = (e: DeviceOrientationEvent) => {
        if (e.gamma !== null && e.beta !== null) {
             const centerX = dimensions.current.w / 2;
             const centerY = dimensions.current.h / 2;
             // Amplify tilt for mobile effect
             mouse.current.targetX = centerX + (e.gamma * 8); 
             mouse.current.targetY = centerY + (e.beta * 8);
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    // Initial Setup
    handleResize();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <style>{`
            :root {
                --mouse-x-px: 0;
                --mouse-y-px: 0;
            }
            
            /* 1. Deep Space Gradient */
            .bg-layer-1 {
                position: absolute; inset: 0;
                background: ${theme === 'dark' 
                    ? 'radial-gradient(ellipse at center, #1e293b 0%, #020408 100%)' 
                    : 'radial-gradient(ellipse at center, #f8fafc 0%, #e2e8f0 100%)'};
                transition: background 0.5s ease;
            }

            /* 2. Interactive Grid (Retro-Future) - Now Controlled by JS Physics */
            .grid-plane {
                position: absolute; inset: -100%; width: 300%; height: 300%;
                background-image: ${theme === 'dark'
                    ? 'linear-gradient(rgba(6, 182, 212, 0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(6, 182, 212, 0.2) 1px, transparent 1px)'
                    : 'linear-gradient(rgba(59, 130, 246, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.15) 1px, transparent 1px)'
                };
                background-size: 80px 80px;
                transform-style: preserve-3d;
                transform-origin: center center;
                /* JS updates transform directly for smoothness */
                /* Subtle animation for flow */
                animation: grid-flow 20s linear infinite;
                mask-image: radial-gradient(circle at center, black 0%, transparent 60%);
            }
            
            @keyframes grid-flow {
                0% { background-position: 0 0; }
                100% { background-position: 0 80px; }
            }

            /* 3. The Canvas (Starfield) */
            canvas { display: block; width: 100%; height: 100%; position: relative; z-index: 10; }

            /* 4. Distortion Field (Glass Effect) */
            .spotlight {
                position: absolute; inset: 0; z-index: 20;
                /* Complex lighting effect */
                background: radial-gradient(
                    800px circle at calc(var(--mouse-x-px) * 1px) calc(var(--mouse-y-px) * 1px),
                    ${theme === 'dark' ? 'rgba(6, 182, 212, 0.08)' : 'rgba(59, 130, 246, 0.05)'},
                    transparent 50%
                );
            }
        `}</style>

        <div className="bg-layer-1"></div>
        <div ref={gridRef} className="grid-plane"></div>
        <canvas ref={canvasRef} />
        <div className="spotlight"></div>
        
        {/* Cinematic Noise (Grain) */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] mix-blend-overlay z-30"></div>
    </div>
  );
};

export default BackgroundSystem;
