
import React, { useEffect, useRef, useState } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

interface Cube3DProps {
  onInteract?: () => void;
  language: Language;
}

const Cube3D: React.FC<Cube3DProps> = ({ onInteract, language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);
  
  // Physics State
  const rotation = useRef({ x: -15, y: 45 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const inertia = useRef({ x: 0, y: 0 });
  
  // Interaction State
  const [isBursting, setIsBursting] = useState(false);
  const totalDragDistance = useRef(0);

  // --- OPTIMIZED ANIMATION LOOP ---
  useEffect(() => {
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!lastTime.current) lastTime.current = time;
      const deltaTime = time - lastTime.current;
      lastTime.current = time;

      if (!isDragging.current) {
        // High-end Inertia Decay
        if (Math.abs(inertia.current.x) > 0.01 || Math.abs(inertia.current.y) > 0.01) {
            rotation.current.x += inertia.current.x;
            rotation.current.y += inertia.current.y;
            inertia.current.x *= 0.95; 
            inertia.current.y *= 0.95;
        } else {
            // Idle Animation: Complex Lissajous figure movement
            rotation.current.y += 0.2; 
            rotation.current.x = -15 + Math.sin(time * 0.001) * 10;
        }
      }

      // DOM Updates (Batch transform for performance)
      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      }
      
      // Parallax Effect for Inner Frame (Create depth)
      if (innerRef.current) {
          // Counter-rotate slightly creates volume
          innerRef.current.style.transform = `rotateY(${rotation.current.y * -0.2}deg) rotateX(${rotation.current.x * -0.2}deg)`;
      }

      // Reactor Core Pulse & Spin
      if (coreRef.current) {
          const pulse = 1 + Math.sin(time * 0.003) * 0.1;
          coreRef.current.style.transform = `rotateX(${time * 0.05}deg) rotateY(${time * 0.1}deg) scale(${pulse})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []); 

  // --- PHYSICS HANDLERS ---
  const handleStart = (clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
    totalDragDistance.current = 0;
    inertia.current = { x: 0, y: 0 };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  };

  const handleMove = (clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;
    totalDragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    const rotateSpeed = 0.5; // Responsive sensitivity
    rotation.current.y += deltaX * rotateSpeed;
    rotation.current.x -= deltaY * rotateSpeed;
    
    // Clamp X rotation to avoid flipping upside down fully
    rotation.current.x = Math.max(-90, Math.min(90, rotation.current.x));

    inertia.current = { x: -deltaY * rotateSpeed, y: deltaX * rotateSpeed };
    lastMousePos.current = { x: clientX, y: clientY };
  };

  const handleEnd = () => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  useEffect(() => {
    const onWinUp = () => handleEnd();
    const onWinMove = (e: MouseEvent) => { if (isDragging.current) handleMove(e.clientX, e.clientY); };
    window.addEventListener('mouseup', onWinUp);
    window.addEventListener('mousemove', onWinMove);
    window.addEventListener('touchend', onWinUp);
    return () => {
      window.removeEventListener('mouseup', onWinUp);
      window.removeEventListener('mousemove', onWinMove);
      window.removeEventListener('touchend', onWinUp);
    };
  }, []);

  const handleBurst = () => {
    if (!isBursting && totalDragDistance.current < 5) {
      setIsBursting(true);
      if (onInteract) setTimeout(onInteract, 600);
      setTimeout(() => setIsBursting(false), 1200);
    }
  };

  return (
    <div 
      className="w-full h-[45vh] md:h-[500px] flex items-center justify-center overflow-visible py-10 perspective-1000 relative group touch-none cursor-grab"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={(e) => handleStart(e.touches[0].clientX, e.touches[0].clientY)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX, e.touches[0].clientY)}
      onClick={handleBurst}
    >
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        
        /* Advanced Gyro Rings */
        @keyframes gyro-spin-x { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }
        @keyframes gyro-spin-y { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
        
        /* Laser Scan Effect */
        @keyframes laser-scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      `}</style>

      {/* Holographic Base/Platform */}
      <div className="absolute bottom-0 md:bottom-10 left-1/2 -translate-x-1/2 w-40 h-40 md:w-64 md:h-64 bg-cyan-500/5 rounded-full blur-xl transform rotateX(70deg) pointer-events-none"></div>

      {/* Interaction Hint */}
      <div className={`absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 text-[10px] font-mono tracking-[0.3em] uppercase text-cyan-500/70 transition-all duration-300 pointer-events-none whitespace-nowrap select-none ${isDragging.current ? 'opacity-0 scale-90' : 'opacity-100 animate-pulse'}`}>
         [{TEXTS[language].tapToInit}]
      </div>

      {/* Burst Energy Wave */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-blue-500 via-cyan-400 to-white rounded-full blur-[100px] transition-all duration-500 ease-out pointer-events-none ${isBursting ? 'scale-[6] opacity-0' : 'scale-0 opacity-40'}`}></div>

      {/* === HYPER-TESSERACT CONTAINER === */}
      <div 
        ref={containerRef}
        className={`relative w-[50vmin] h-[50vmin] max-w-[16rem] max-h-[16rem] md:w-64 md:h-64 preserve-3d will-change-transform ${isBursting ? 'scale-0 opacity-0 duration-500' : ''}`}
      >
        
        {/* === LAYER 1: ORBITAL DATA RINGS (Gyroscope) === */}
        {/* Ring X */}
        <div className="absolute inset-[-40px] rounded-full border border-slate-500/20 dark:border-cyan-500/20 border-dashed preserve-3d animate-[gyro-spin-x_20s_linear_infinite]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_15px_cyan]"></div>
        </div>
        {/* Ring Y */}
        <div className="absolute inset-[-20px] rounded-full border border-slate-500/20 dark:border-blue-500/20 preserve-3d animate-[gyro-spin-y_25s_linear_infinite_reverse]">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_10px_blue]"></div>
        </div>

        {/* === LAYER 2: GLASS SHELL (The Cube) === */}
        <div ref={outerRef} className="absolute inset-0 preserve-3d">
             {[
               'rotateY(0deg) translateZ(calc(var(--cube-size)/2))',    
               'rotateY(180deg) translateZ(calc(var(--cube-size)/2))',  
               'rotateY(90deg) translateZ(calc(var(--cube-size)/2))',   
               'rotateY(-90deg) translateZ(calc(var(--cube-size)/2))',  
               'rotateX(90deg) translateZ(calc(var(--cube-size)/2))',   
               'rotateX(-90deg) translateZ(calc(var(--cube-size)/2))'   
             ].map((transform, i) => (
                <div key={`outer-${i}`} 
                    className="absolute inset-0 border border-white/40 dark:border-cyan-500/30 bg-white/5 dark:bg-[#020408]/60 backdrop-blur-[2px] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/50"
                    style={{ transform }}
                >
                    {/* Tech Corners */}
                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500/60"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500/60"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500/60"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500/60"></div>
                    
                    {/* Internal Grid Lines */}
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

                    {/* Scanning Laser Beam */}
                    <div className="absolute top-0 w-full h-[2px] bg-cyan-400/80 shadow-[0_0_15px_cyan] animate-[laser-scan_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.2}s` }}></div>
                </div>
             ))}
        </div>

        {/* === LAYER 3: INNER FLOATING FRAME (The Tesseract) === */}
        <div ref={innerRef} className="absolute inset-8 preserve-3d pointer-events-none">
             {[
               'rotateY(0deg) translateZ(calc(var(--inner-size)/2))',    
               'rotateY(180deg) translateZ(calc(var(--inner-size)/2))',  
               'rotateY(90deg) translateZ(calc(var(--inner-size)/2))',   
               'rotateY(-90deg) translateZ(calc(var(--inner-size)/2))',  
               'rotateX(90deg) translateZ(calc(var(--inner-size)/2))',   
               'rotateX(-90deg) translateZ(calc(var(--inner-size)/2))'   
             ].map((transform, i) => (
                <div key={`inner-${i}`} 
                    className="absolute inset-0 border border-blue-500/40 dark:border-blue-400/40 bg-transparent flex items-center justify-center shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]"
                    style={{ transform }}
                >
                    {/* Glowing Node */}
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_blue]"></div>
                </div>
             ))}
        </div>

        {/* === LAYER 4: REACTOR CORE (The Singularity) === */}
        <div 
            ref={coreRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] preserve-3d will-change-transform"
        >
            {/* Energy Sphere */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-cyan-400 to-blue-600 blur-sm animate-pulse shadow-[0_0_40px_rgba(6,182,212,0.8)]"></div>
            {/* Spinning Spike Field */}
            <div className="absolute inset-[-10px] border border-white/20 rounded-full animate-spin-slow"></div>
        </div>

      </div>
      
      {/* Set CSS Variables for 3D translation based on viewport */}
      <style>{`
          div[class*="preserve-3d"] {
             --cube-size: 50vmin;
             --inner-size: 34vmin;
          }
          @media (min-width: 768px) {
             div[class*="preserve-3d"] {
                --cube-size: 16rem; 
                --inner-size: 10rem;
             }
          }
      `}</style>
    </div>
  );
};

export default Cube3D;
