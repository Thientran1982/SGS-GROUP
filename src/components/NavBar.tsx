
import React, { useState, useEffect, useRef } from 'react';
import { NavItem, Language, Theme } from '../types';
import { NAV_ITEMS, TEXTS } from '../constants';

interface NavBarProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const NavBar: React.FC<NavBarProps> = ({ 
  currentView, 
  setCurrentView, 
  language, 
  setLanguage,
  theme,
  setTheme
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  // --- MAGNETIC BUTTON COMPONENT ---
  const MagneticButton = ({ children, onClick, isActive, className }: any) => {
      const btnRef = useRef<HTMLButtonElement>(null);
      const [position, setPosition] = useState({ x: 0, y: 0 });

      const handleMouseMove = (e: React.MouseEvent) => {
          if (!btnRef.current) return;
          const { left, top, width, height } = btnRef.current.getBoundingClientRect();
          const x = e.clientX - (left + width / 2);
          const y = e.clientY - (top + height / 2);
          setPosition({ x: x * 0.2, y: y * 0.2 });
      };

      const handleMouseLeave = () => {
          setPosition({ x: 0, y: 0 });
      };

      return (
          <button
              ref={btnRef}
              onClick={onClick}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
              className={`${className} transition-transform duration-200 ease-out will-change-transform`}
          >
              {children}
          </button>
      );
  };

  // --- SCROLL LOCK WHEN MOBILE MENU OPEN ---
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
    };
  }, [isMobileMenuOpen]);

  // --- SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 20);

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current) {
        setIsVisible(false);
        setIsMobileMenuOpen(false);
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileNav = (viewId: string) => {
      setIsMobileMenuOpen(false);
      requestAnimationFrame(() => {
          setCurrentView(viewId);
      });
  };

  return (
    <>
      <nav 
        className={`fixed left-0 right-0 z-50 flex justify-center px-2 md:px-4 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] pointer-events-none
        ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}
        ${scrolled ? 'top-2 md:top-4' : 'top-4 md:top-6'}
      `}>
        {/* Main HUD Container - CRYSTALLINE SHARD */}
        <div className={`pointer-events-auto relative rounded-full flex items-center justify-between gap-1.5 md:gap-8 border transition-all duration-500 w-full max-w-[98%] md:max-w-fit backdrop-blur-xl overflow-hidden group/nav-container shadow-inner-light
            ${scrolled 
                ? 'bg-white/80 dark:bg-[#050505]/80 border-slate-200/80 dark:border-white/10 p-1.5 pl-3 md:pl-4 pr-1.5 backdrop-saturate-150 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.1)]' 
                : 'bg-white/60 dark:bg-[#050505]/50 border-white/40 dark:border-white/10 p-1.5 md:p-2.5 md:pl-6 md:pr-2.5 shadow-[0_4px_20px_-5px_rgba(0,0,0,0.05)]'
            }
        `}>
          
          {/* Logo Area */}
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer group flex-shrink-0 pl-1"
            onClick={() => setCurrentView('home')}
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 flex items-center justify-center">
                <div className="absolute inset-0 bg-blue-500/20 dark:bg-cyan-400/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-all duration-500 scale-125"></div>
                <svg viewBox="0 0 100 100" className="w-full h-full transform transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:rotate-[360deg] drop-shadow-sm">
                    <path d="M50 15 L85 35 V75 L50 95 L15 75 V35 Z" className="stroke-slate-900 dark:stroke-white stroke-[6] fill-white dark:fill-[#0a0a0a] transition-colors" strokeLinejoin="round" />
                    <path d="M50 50 L50 95 M50 50 L15 35 M50 50 L85 35" className="stroke-slate-900 dark:stroke-white stroke-[4] opacity-50" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="7" className="fill-blue-600 dark:fill-cyan-400 animate-pulse" />
                </svg>
            </div>
            
            <div className="flex flex-col justify-center">
                <span className="font-display font-black text-base md:text-xl tracking-tighter text-slate-900 dark:text-white leading-none group-hover:tracking-widest transition-all duration-500">SGS GROUP</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center bg-slate-100/50 dark:bg-white/5 rounded-full p-1 border border-white/40 dark:border-white/5 backdrop-blur-md shadow-inner-light">
            {NAV_ITEMS.map((item) => (
              <MagneticButton
                key={item.id}
                onClick={() => setCurrentView(item.id)}
                isActive={currentView === item.id}
                className={`relative px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider overflow-hidden group/nav ${
                  currentView === item.id 
                    ? 'text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)]' 
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {currentView === item.id && (
                  <div className="absolute inset-0 bg-slate-900 dark:bg-cyan-600 rounded-full border border-white/10">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shine_3s_infinite]"></div>
                  </div>
                )}
                {currentView !== item.id && (
                    <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 opacity-0 group-hover/nav:opacity-100 rounded-full transition-opacity duration-300"></div>
                )}
                <span className="relative z-10 flex items-center gap-2">
                    {language === 'en' ? item.labelEn : item.labelVi}
                </span>
              </MagneticButton>
            ))}
          </div>

          {/* Right Action Area */}
          <div className="flex items-center gap-1.5 md:gap-3 pl-2 md:pl-6 md:border-l border-slate-200/80 dark:border-white/10 h-8">
              {/* Language Switch */}
              <button 
                  onClick={() => setLanguage(language === 'en' ? 'vi' : 'en')}
                  className="relative w-10 md:w-12 h-6 md:h-7 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-black/40 overflow-hidden group transition-all hover:border-blue-400 dark:hover:border-cyan-400 shadow-inner-light"
                  title="Toggle Language"
              >
                   <div className={`absolute top-0.5 bottom-0.5 w-[50%] bg-white dark:bg-cyan-900/80 dark:border dark:border-cyan-400/50 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.3)] transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${language === 'en' ? 'left-0.5' : 'left-[46%]'}`}>
                      <div className="absolute top-0 left-0 right-0 h-[40%] bg-gradient-to-b from-white/40 to-transparent rounded-full opacity-70"></div>
                   </div>
                   
                   <div className="relative z-10 flex w-full h-full items-center justify-between px-1.5 md:px-2">
                       <span className={`text-[7px] md:text-[8px] font-bold font-mono transition-colors duration-300 ${language === 'en' ? 'text-blue-600 dark:text-white' : 'text-slate-400 opacity-50'}`}>EN</span>
                       <span className={`text-[7px] md:text-[8px] font-bold font-mono transition-colors duration-300 ${language === 'vi' ? 'text-blue-600 dark:text-white' : 'text-slate-400 opacity-50'}`}>VN</span>
                   </div>
              </button>

              {/* Theme Switch - PRISM BUTTON v6.1 */}
              <button
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`relative w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-500 overflow-hidden group flex-shrink-0 shadow-inner-light
                    ${theme === 'light' 
                        ? 'bg-amber-50 border-amber-200 shadow-[0_0_15px_rgba(251,191,36,0.3)] hover:bg-amber-100' 
                        : 'bg-slate-900 border-white/10 hover:border-cyan-500/50 hover:bg-black'
                    }`}
                  title="Switch Theme"
              >
                  {/* Internal Glow */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-full pointer-events-none"></div>
                  
                  {/* Sun Icon */}
                  <div className={`absolute transition-all duration-500 ease-in-out ${theme === 'light' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 rotate-90 scale-50'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-500 drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" /></svg>
                  </div>
                  {/* Moon Icon */}
                  <div className={`absolute transition-all duration-500 ease-in-out ${theme === 'dark' ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.7-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" /></svg>
                  </div>
              </button>

              {/* Mobile Menu Trigger */}
               <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className={`md:hidden w-8 h-8 rounded-full flex items-center justify-center shadow-lg active:scale-95 transition-all duration-200 border flex-shrink-0 touch-manipulation shadow-inner-light
                    ${isMobileMenuOpen 
                        ? 'bg-red-500 text-white border-red-400 rotate-90' 
                        : 'bg-slate-900 dark:bg-white/10 text-white dark:text-white border-transparent hover:border-cyan-400'
                    }`}
              >
                  {isMobileMenuOpen ? (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  ) : (
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                  )}
              </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`fixed inset-0 z-[49] bg-[#f8fafc]/98 dark:bg-[#020408]/98 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] flex flex-col overscroll-contain touch-pan-y ${isMobileMenuOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-full pointer-events-none'}`}>
         
         <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(6,182,212,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.15)_1px,transparent_1px)] bg-[size:30px_30px]"></div>
         <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.05] pointer-events-none mix-blend-overlay"></div>
         <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>

         <div className="flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto space-y-6 relative z-10 p-8 pt-24">
            <div className="w-full space-y-3">
                {NAV_ITEMS.map((item, idx) => (
                    <button
                        key={item.id}
                        onClick={() => handleMobileNav(item.id)}
                        className={`w-full py-4 px-6 text-xl font-display font-bold text-left transition-all duration-500 transform border border-slate-200 dark:border-white/10 rounded-xl relative overflow-hidden group hover:scale-[1.02] active:scale-95 touch-manipulation shadow-lg
                            ${currentView === item.id 
                                ? 'bg-white dark:bg-[#0f1115] border-blue-500 dark:border-cyan-500 shadow-[0_0_20px_rgba(6,182,212,0.15)] translate-x-2' 
                                : 'bg-white/50 dark:bg-white/5 hover:border-blue-400 dark:hover:border-cyan-400'
                            }
                            ${isMobileMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                        `}
                        style={{ transitionDelay: isMobileMenuOpen ? `${idx * 75}ms` : '0ms' }}
                    >
                        {currentView === item.id && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-500 dark:bg-cyan-500 shadow-[0_0_10px_cyan]"></div>}
                        
                        <div className="flex items-center justify-between pl-2">
                            <span className={`${currentView === item.id ? 'text-blue-600 dark:text-cyan-300' : 'text-slate-800 dark:text-slate-300'}`}>
                                {language === 'en' ? item.labelEn : item.labelVi}
                            </span>
                            <span className="text-xs font-mono text-slate-400 opacity-50">0{idx + 1}</span>
                        </div>
                    </button>
                ))}
            </div>
         </div>
      </div>
    </>
  );
};

export default NavBar;
