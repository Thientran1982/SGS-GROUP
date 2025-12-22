
import React from 'react';
import { Language } from '../types';
import { TEXTS } from '../constants';

const TechTicker: React.FC<{ language: Language }> = ({ language }) => {
  // Triple the items to ensure smooth infinite loop without gaps
  const items = [
      ...TEXTS[language].ticker, 
      ...TEXTS[language].ticker, 
      ...TEXTS[language].ticker
  ];

  return (
    <div className="w-full max-w-lg mx-auto relative group/ticker mb-6">
        {/* Glass Container */}
        <div className="absolute inset-0 bg-slate-100/30 dark:bg-white/5 backdrop-blur-md rounded-full border border-slate-200/50 dark:border-white/10 shadow-sm"></div>
        
        {/* Fade Masks */}
        <div className="absolute top-0 left-0 bottom-0 w-12 bg-gradient-to-r from-[#f8fafc] dark:from-[#020408] to-transparent z-10 rounded-l-full"></div>
        <div className="absolute top-0 right-0 bottom-0 w-12 bg-gradient-to-l from-[#f8fafc] dark:from-[#020408] to-transparent z-10 rounded-r-full"></div>
        
        {/* Scroller */}
        <div className="relative overflow-hidden py-2.5 px-8 cursor-default">
            <div className="flex w-max animate-marquee gap-8 group-hover/ticker:[animation-play-state:paused] will-change-transform">
                {items.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 flex-shrink-0 opacity-80 hover:opacity-100 transition-opacity">
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
