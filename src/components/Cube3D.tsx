
import React, { useEffect, useRef, useState, useCallback } from 'react';
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
  
  const rotation = useRef({ x: -20, y: 45 });
  const isDragging = useRef(false);
  const lastMousePos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const inertia = useRef({ x: 0, y: 0 });
  
  const [isBursting, setIsBursting] = useState(false);
  const totalDragDistance = useRef(0);

  useEffect(() => {
    let animationFrameId: number;

    const animate = (time: number) => {
      if (!lastTime.current) lastTime.current = time;
      lastTime.current = time;

      if (!isDragging.current) {
        if (Math.abs(inertia.current.x) > 0.01 || Math.abs(inertia.current.y) > 0.01) {
            rotation.current.x += inertia.current.x;
            rotation.current.y += inertia.current.y;
            inertia.current.x *= 0.96;
            inertia.current.y *= 0.96;
        } else {
            rotation.current.y += 0.3; 
            rotation.current.x = -20 + Math.sin(time * 0.001) * 8;
        }
      }

      if (containerRef.current) {
        containerRef.current.style.transform = `rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg)`;
      }
      
      if (innerRef.current) {
          innerRef.current.style.transform = `rotateY(${rotation.current.y * -0.3}deg) rotateX(${rotation.current.x * -0.3}deg)`;
      }

      if (coreRef.current) {
          const pulse = 1 + Math.sin(time * 0.005) * 0.15;
          coreRef.current.style.transform = `rotateX(${time * 0.1}deg) rotateY(${time * 0.2}deg) scale(${pulse})`;
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, []); 

  const handleStart = useCallback((clientX: number, clientY: number) => {
    isDragging.current = true;
    lastMousePos.current = { x: clientX, y: clientY };
    totalDragDistance.current = 0;
    inertia.current = { x: 0, y: 0 };
    if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
  }, []);

  const handleMove = useCallback((clientX: number, clientY: number) => {
    if (!isDragging.current) return;
    const deltaX = clientX - lastMousePos.current.x;
    const deltaY = clientY - lastMousePos.current.y;
    totalDragDistance.current += Math.abs(deltaX) + Math.abs(deltaY);

    const rotateSpeed = 0.6;
    rotation.current.y += deltaX * rotateSpeed;
    rotation.current.x -= deltaY * rotateSpeed;
    rotation.current.x = Math.max(-90, Math.min(90, rotation.current.x));

    inertia.current = { x: -deltaY * rotateSpeed, y: deltaX * rotateSpeed };
    lastMousePos.current = { x: clientX, y: clientY };
  }, []);

  const handleEnd = useCallback(() => {
    isDragging.current = false;
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  }, []);

  useEffect(() => {
    const onWinUp = () => handleEnd();
    const onWinMove = (e: MouseEvent) => { if (isDragging.current) handleMove(e.clientX, e.clientY); };
    window.addEventListener('mouseup', onWinUp);
    window.addEventListener('mousemove', onWinMove);
    window.addEventListener('touchend', onWinUp, { passive: true });
    window.addEventListener('touchcancel', onWinUp, { passive: true });
    return () => {
      window.removeEventListener('mouseup', onWinUp);
      window.removeEventListener('mousemove', onWinMove);
      window.removeEventListener('touchend', onWinUp);
      window.removeEventListener('touchcancel', onWinUp);
    };
  }, [handleEnd, handleMove]);

  const handleBurst = useCallback(() => {
    if (!isBursting) {
      setIsBursting(true);
      setTimeout(() => setIsBursting(false), 1200);
    }
  }, [isBursting]);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleStart]);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches && e.touches.length > 0) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [handleMove]);

  return (
    <div 
      className="w-full h-[45vh] md:h-[500px] flex items-center justify-center overflow-visible py-10 perspective-1000 relative group touch-none cursor-grab select-none"
      onMouseDown={(e) => handleStart(e.clientX, e.clientY)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onClick={handleBurst}
    >
      <style>{`
        .preserve-3d { transform-style: preserve-3d; }
        
        @keyframes gyro-spin-x { 0% { transform: rotateX(0deg); } 100% { transform: rotateX(360deg); } }
        @keyframes gyro-spin-y { 0% { transform: rotateY(0deg); } 100% { transform: rotateY(360deg); } }
        @keyframes data-scan { 
            0% { background-position: 0% 0%; } 
            100% { background-position: 0% 200%; } 
        }
        @keyframes laser-sweep {
            0% { top: -10%; opacity: 0; }
            20% { opacity: 1; }
            80% { opacity: 1; }
            100% { top: 110%; opacity: 0; }
        }
      `}</style>

      <div className="absolute bottom-0 md:bottom-12 left-1/2 -translate-x-1/2 w-48 h-48 md:w-72 md:h-72 bg-cyan-500/10 rounded-full blur-[50px] transform rotateX(70deg) pointer-events-none transition-all duration-700 group-hover:bg-cyan-500/20 group-hover:scale-125"></div>

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-gradient-to-r from-blue-500 via-cyan-400 to-white rounded-full blur-[80px] transition-all duration-500 ease-out pointer-events-none ${isBursting ? 'scale-[5] opacity-0' : 'scale-0 opacity-40'}`}></div>

      <div 
        ref={containerRef}
        className={`relative w-[50vmin] h-[50vmin] max-w-[16rem] max-h-[16rem] md:w-64 md:h-64 preserve-3d will-change-transform ${isBursting ? 'scale-0 opacity-0 duration-500' : ''}`}
      >
        
        <div className="absolute inset-[-50px] rounded-full border border-slate-500/30 dark:border-cyan-500/40 border-dashed preserve-3d animate-[gyro-spin-x_30s_linear_infinite] pointer-events-none shadow-[0_0_15px_rgba(6,182,212,0.1)]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full shadow-[0_0_10px_cyan]"></div>
        </div>
        <div className="absolute inset-[-30px] rounded-full border border-slate-500/30 dark:border-blue-500/40 preserve-3d animate-[gyro-spin-y_35s_linear_infinite_reverse] pointer-events-none shadow-[0_0_15px_rgba(59,130,246,0.1)]">
             <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_10px_blue]"></div>
        </div>

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
                    className="absolute inset-0 border border-white/30 bg-[#0a0a0c]/60 backdrop-blur-[6px] flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:bg-cyan-500/10 group-hover:border-cyan-400/60 shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]"
                    style={{ transform }}
                >
                    <div className="absolute inset-0 opacity-20 bg-[linear-gradient(transparent_0%,rgba(6,182,212,0.6)_50%,transparent_100%)] bg-[length:100%_200%] animate-[data-scan_3s_linear_infinite]"></div>
                    
                    <div className="absolute left-0 right-0 h-[2px] bg-cyan-400 shadow-[0_0_10px_cyan] animate-[laser-sweep_3s_ease-in-out_infinite]" style={{ animationDelay: `${i * 0.5}s` }}></div>

                    <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-500"></div>
                    <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-500"></div>
                    
                    <div className="absolute inset-0 flex items-center justify-center opacity-40">
                        <div className="w-6 h-[1px] bg-cyan-400"></div>
                        <div className="h-6 w-[1px] bg-cyan-400 absolute"></div>
                    </div>
                </div>
             ))}
        </div>

        <div ref={innerRef} className="absolute inset-10 preserve-3d pointer-events-none">
             {[
               'rotateY(0deg) translateZ(calc(var(--inner-size)/2))',    
               'rotateY(180deg) translateZ(calc(var(--inner-size)/2))',  
               'rotateY(90deg) translateZ(calc(var(--inner-size)/2))',   
               'rotateY(-90deg) translateZ(calc(var(--inner-size)/2))',  
               'rotateX(90deg) translateZ(calc(var(--inner-size)/2))',   
               'rotateX(-90deg) translateZ(calc(var(--inner-size)/2))'   
             ].map((transform, i) => (
                <div key={`inner-${i}`} 
                    className="absolute inset-0 border-2 border-blue-500/60 bg-transparent flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.2)]"
                    style={{ transform }}
                >
                    <div className="w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_white]"></div>
                </div>
             ))}
        </div>

        <div 
            ref={coreRef}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[25%] h-[25%] preserve-3d will-change-transform"
        >
            <div className="absolute inset-0 rounded-full bg-black border-2 border-cyan-400 shadow-[0_0_50px_rgba(6,182,212,1)]"></div>
            <div className="absolute inset-[-12px] border-2 border-transparent border-l-cyan-400 border-r-blue-500 rounded-full animate-[spin_1s_linear_infinite] opacity-90"></div>
            <div className="absolute inset-[-6px] border border-white/50 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
        </div>

      </div>
      
      <style>{`
          div[class*="preserve-3d"] {
             --cube-size: 50vmin;
             --inner-size: 30vmin;
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
