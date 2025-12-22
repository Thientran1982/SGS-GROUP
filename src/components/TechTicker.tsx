
import React, { useState, useEffect, useMemo } from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

interface TechTickerProps {
    language: Language;
    className?: string;
}

const TechTicker: React.FC<TechTickerProps> = ({ language, className = "max-w-lg mx-auto" }) => {
  const [displayLanguage, setDisplayLanguage] = useState<Language>(language);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // --- SMOOTH TRANSITION LOGIC ---
  // Masks the "jerk" caused by animation resetting when content length changes
  useEffect(() => {
    if (language !== displayLanguage) {
      setIsTransitioning(true); // Fade Out
      
      const timer = setTimeout(() => {
        setDisplayLanguage(language);
        // Small delay to allow DOM to update before fading back in
        requestAnimationFrame(() => {
            setIsTransitioning(false); // Fade In
        });
      }, 300); // Match CSS duration

      return () => clearTimeout(timer);
    }
  }, [language, displayLanguage]);

  // --- MEMOIZED CONTENT ---
  // Prevents unnecessary array regeneration on every render
  const items = useMemo(() => {
      const rawItems = TEXTS[displayLanguage].ticker;
      // Ensure enough content length base if items are few
      const baseItems = rawItems.length < 5 ? [...rawItems, ...rawItems] : rawItems;
      // 4x duplication ensures -50% translation works perfectly for seamless loops
      return [...baseItems, ...baseItems, ...baseItems, ...baseItems];
  }, [displayLanguage]);

  return (
    <div className={`w-full relative group/ticker mb-6 animate-fade-in-up ${className}`}>
        {/* === RUNNING LIGHT BEAM (PLASMA BORDER) === */}
        <div className="absolute -inset-[1.5px] rounded-full overflow-hidden pointer-events-none">
            {/* Spinning Conic Gradient for Border Effect */}
            <div className="absolute top-[50%] left-[50%] w-[150%] h-[500%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0_340deg,rgba(6,182,212,0.8)_360deg)] animate-spin-slow opacity-0 group-hover/ticker:opacity-100 transition-opacity duration-700"></div>
            <div className="absolute top-[50%] left-[50%] w-[150%] h-[500%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_180deg,transparent_0_340deg,rgba(99,102,241,0.8)_360deg)] animate-spin-slow [animation-delay:-6s] opacity-0 group-hover/ticker:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* Glass Container Background */}
        <div className="absolute inset-0 bg-slate-100/90 dark:bg-[#0a0a0c]/90 backdrop-blur-xl rounded-full border border-white/20 dark:border-white/10 shadow-inner-light z-10"></div>
        
        {/* Fade Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#f8fafc] dark:from-[#020408] to-transparent z-20 rounded-l-full pointer-events-none"></div>
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#f8fafc] dark:from-[#020408] to-transparent z-20 rounded-r-full pointer-events-none"></div>
        
        {/* Scroller */}
        <div 
            className={`relative overflow-hidden py-2.5 px-8 cursor-default z-30 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
        >
            {/* key={displayLanguage} forces the animation to reset (restart at 0%) when language updates.
                The opacity transition above hides the "jump". */}
            <div 
                key={displayLanguage} 
                className="flex w-max animate-marquee gap-8 group-hover/ticker:[animation-play-state:paused] will-change-transform"
            >
                {items.map((item, i) => (
                    <div key={`item-${i}`} className="flex items-center gap-3 opacity-70 group-hover/ticker:opacity-100 transition-opacity">
                        <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse shadow-[0_0_5px_cyan]"></span>
                        <span className="text-[10px] md:text-[11px] font-mono font-bold text-slate-700 dark:text-cyan-100 uppercase tracking-widest whitespace-nowrap">
                            {item}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );
};

export default TechTicker;
