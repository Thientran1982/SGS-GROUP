
import React, { ReactNode } from 'react';

// --- 1. CONTAINERS & CARDS (The "Crystal" Standard) ---

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hoverEffect?: boolean;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true, onClick }) => (
  <div 
    onClick={onClick}
    className={`
      relative overflow-hidden rounded-xl md:rounded-2xl
      /* v6.1 MATERIAL SYSTEM: */
      /* Dark: Obsidian Glass (Black/80%) | Light: Ceramic Glass (White/60%) */
      bg-white/60 dark:bg-[#0C1428]/80 
      border border-slate-200 dark:border-white/[0.10] 
      backdrop-blur-xl
      shadow-lg transition-all duration-300 group/card
      ${hoverEffect ? 'hover:border-blue-300/50 dark:hover:border-white/[0.15] hover:bg-white/80 dark:hover:bg-[#0f1115]/90 hover:shadow-xl dark:hover:shadow-2xl cursor-pointer' : ''}
      ${className}
    `}
  >
    {/* Inner Highlight (Beveled Edge) */}
    <div className="absolute inset-0 rounded-xl md:rounded-2xl shadow-inner-light pointer-events-none z-20 mix-blend-overlay"></div>
    
    {/* Clean Sweep Effect */}
    {hoverEffect && (
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-400/[0.05] dark:from-white/[0.05] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none z-10"></div>
    )}
    
    <div className="relative z-10">{children}</div>
  </div>
);

export const SectionContainer: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <section className={`relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-16 md:py-24 ${className}`}>
    {children}
  </section>
);

// --- 2. TYPOGRAPHY (Adaptive Contrast) ---

export const DisplayHeading: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <h1 className={`font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.04em] leading-[1.1] text-slate-900 dark:text-white transition-colors duration-300 ${className}`}>
    {children}
  </h1>
);

export const SectionHeading: React.FC<{ title: string; subtitle?: string; align?: 'left' | 'center' }> = ({ title, subtitle, align = 'left' }) => (
  <div className={`mb-12 md:mb-20 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    {subtitle && (
      <MonoLabel className={`mb-4 ${align === 'center' ? 'justify-center' : ''}`}>
        {subtitle}
      </MonoLabel>
    )}
    <h2 className="font-display font-semibold text-2xl sm:text-3xl md:text-4xl text-slate-900 dark:text-white tracking-tight leading-tight transition-colors duration-300">
      {title}
    </h2>
  </div>
);

export const MonoLabel: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`flex items-center text-[10px] sm:text-[11px] font-mono font-medium uppercase tracking-[0.2em] text-blue-600 dark:text-primary-DEFAULT transition-colors duration-300 ${className}`}>
    {children}
  </div>
);

// --- 3. INTERACTIVE ELEMENTS (Crystal Buttons - Updated Specs v6.1) ---

interface NeonButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  icon?: ReactNode;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export const NeonButton: React.FC<NeonButtonProps> = ({ children, onClick, variant = 'primary', icon, fullWidth = false, type = "button" }) => {
  const baseStyles = "relative overflow-hidden rounded-lg font-medium text-sm py-3 px-6 h-12 whitespace-nowrap transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2 group select-none backdrop-blur-md";
  
  const variants = {
    // Primary: Brand Cyan — consistent with nav active state & all cyan accents
    primary: "bg-primary-DEFAULT text-slate-950 font-bold shadow-[0_4px_20px_rgba(6,182,212,0.50),inset_0_1px_0_rgba(255,255,255,0.30)] hover:bg-primary-glow hover:shadow-[0_4px_35px_rgba(6,182,212,0.75),0_0_60px_rgba(6,182,212,0.25)] border border-primary-glow/30 hover:border-primary-glow/60",
    
    // Secondary: Glass Plate with cyan hover border
    secondary: "bg-white/50 dark:bg-white/[0.04] text-slate-900 dark:text-white border border-slate-200 dark:border-white/[0.12] shadow-inner-light hover:bg-white dark:hover:bg-white/[0.08] hover:border-blue-300 dark:hover:border-primary-DEFAULT/40 hover:shadow-md",
    
    // Ghost: Pure text
    ghost: "bg-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-white/5"
  };

  return (
    <button onClick={onClick} type={type} className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''}`}>
      {/* Button Shine Effect */}
      {variant !== 'ghost' && (
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_0.8s_ease-in-out]"></div>
      )}
      
      <span className="relative z-20 flex items-center gap-2 font-sans tracking-wide font-bold min-w-0">
        {icon && <span className="shrink-0 text-current opacity-80 group-hover:opacity-100 transition-opacity transform group-hover:translate-x-0.5 duration-200">{icon}</span>}
        <span className="truncate">{children}</span>
      </span>
    </button>
  );
};

export const StatusIndicator: React.FC<{ status: 'active' | 'loading' | 'offline' }> = ({ status }) => {
  const colors = {
    active: "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]",
    loading: "bg-amber-500 animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]",
    offline: "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]"
  };
  return (
      <div className="flex items-center gap-2">
          <div className={`w-1.5 h-1.5 rounded-full ${colors[status]}`} />
      </div>
  );
};

export const RangeSlider: React.FC<{ 
    value: number; 
    min: number; 
    max: number; 
    step: number; 
    onChange: (val: number) => void; 
    label?: string; 
    unit?: string; 
}> = ({ value, min, max, step, onChange, label, unit }) => (
    <div className="w-full">
        {label && (
            <div className="flex justify-between mb-3">
                <span className="text-[10px] font-mono font-medium uppercase text-slate-500 tracking-wider">{label}</span>
                <span className="text-xs font-mono text-slate-900 dark:text-white font-bold">{value} {unit}</span>
            </div>
        )}
        <div className="relative h-5 flex items-center select-none group/slider cursor-pointer">
            {/* Track */}
            <div className="absolute inset-x-0 h-1 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden">
                <div 
                    className="h-full bg-blue-600 dark:bg-primary-DEFAULT transition-all duration-100 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]"
                    style={{ width: `${((value - min) / (max - min)) * 100}%` }}
                ></div>
            </div>
            <input 
                type="range" 
                min={min} 
                max={max} 
                step={step} 
                value={value} 
                onChange={(e) => onChange(parseFloat(e.target.value))} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
            />
            {/* Thumb */}
            <div 
                className="absolute top-1/2 -translate-y-1/2 h-4 w-4 bg-white border border-slate-200 dark:border-transparent rounded-full z-10 pointer-events-none transition-all duration-100 shadow-md dark:shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                style={{ left: `calc(${((value - min) / (max - min)) * 100}% - 8px)` }}
            ></div>
        </div>
    </div>
  );

// --- 4. VISUAL EFFECTS ---

export const TechGridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0">
    {/* Subtle Grid */}
    <div className="absolute inset-0 bg-tech-grid bg-[size:40px_40px] opacity-[0.05] dark:opacity-[0.1]" />
    {/* Soft fade out */}
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc]/50 dark:via-[#020408]/50 to-[#f8fafc] dark:to-[#020408]"></div>
  </div>
);

export const TechPanel: React.FC<{ children: ReactNode; className?: string }> = ({ children, className = "" }) => (
    <div className={`relative overflow-hidden rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/50 dark:bg-[#000000]/40 backdrop-blur-sm shadow-inner-light ${className}`}>
        {/* Minimal Corner Accents (Precision Tech Look) */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-slate-400 dark:border-white/20"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-slate-400 dark:border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-slate-400 dark:border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-slate-400 dark:border-white/20"></div>
        
        <div className="relative z-10 h-full">{children}</div>
    </div>
);
