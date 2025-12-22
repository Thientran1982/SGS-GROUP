import React, { useState, useEffect, useRef } from 'react';
import { Language } from '../types';
import { TEXTS, SOCIAL_LINKS, NAV_ITEMS } from '../constants';
import { BackendService } from '../services/backend';

interface FooterProps {
  language: Language;
  currentView: string;
  setCurrentView: (view: string) => void;
  newsletterEmail: string;
  setNewsletterEmail: (email: string) => void;
  handleNewsletterSubmit: () => void;
  scrollToTop: () => void;
}

const Footer: React.FC<FooterProps> = ({
  language,
  currentView,
  setCurrentView,
  newsletterEmail,
  setNewsletterEmail,
  handleNewsletterSubmit,
  scrollToTop
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [systemStatus, setSystemStatus] = useState<{ status: 'operational' | 'degraded' | 'maintenance' | 'initializing'; latency: number }>({ 
      status: 'initializing', 
      latency: 0 
  });
  
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const checkSystem = async () => {
       try {
           const result = await BackendService.system.check();
           setSystemStatus({ status: result.status, latency: result.latency });
       } catch (e) {
           setSystemStatus({ status: 'degraded', latency: 999 });
       }
    };
    checkSystem();
    const interval = setInterval(checkSystem, 30000);
    return () => clearInterval(interval);
  }, []);

  // --- MOUSE TRACKING SPOTLIGHT ---
  useEffect(() => {
      const handleMouseMove = (e: MouseEvent) => {
          if (footerRef.current) {
              const rect = footerRef.current.getBoundingClientRect();
              const x = e.clientX - rect.left;
              footerRef.current.style.setProperty('--mouse-x', `${x}px`);
          }
      };
      
      const el = footerRef.current;
      if (el) el.addEventListener('mousemove', handleMouseMove);
      
      return () => {
          if (el) el.removeEventListener('mousemove', handleMouseMove);
      };
  }, []);

  const onSubscribe = async () => {
    if (!newsletterEmail) return;
    setIsSubmitting(true);
    await handleNewsletterSubmit();
    setIsSubmitting(false);
    setSubmitSuccess(true);
    setTimeout(() => setSubmitSuccess(false), 3000);
  };

  const getStatusText = () => {
      switch(systemStatus.status) {
          case 'operational': return TEXTS[language].systemStatus.operational;
          case 'degraded': return TEXTS[language].systemStatus.degraded;
          case 'maintenance': return TEXTS[language].systemStatus.maintenance;
          case 'initializing': return TEXTS[language].systemStatus.initializing;
          default: return TEXTS[language].systemStatus.operational;
      }
  };

  const getStatusColor = () => {
      switch(systemStatus.status) {
          case 'operational': return 'bg-emerald-500';
          case 'degraded': return 'bg-amber-500';
          case 'maintenance': return 'bg-red-500';
          case 'initializing': return 'bg-blue-500';
          default: return 'bg-emerald-500';
      }
  };

  return (
    <footer ref={footerRef} className="relative z-10 pt-24 pb-12 bg-slate-50/95 dark:bg-[#020408]/95 backdrop-blur-xl overflow-hidden mt-auto group/footer">
         
         {/* === INTERACTIVE BORDER BEAM === */}
         <div className="absolute top-0 left-0 right-0 h-[1px] z-20 overflow-visible">
             <div className="absolute inset-0 bg-slate-200 dark:bg-white/10 opacity-30"></div>
             {/* Dynamic Spotlight that follows mouse */}
             <div className="absolute top-0 h-[1px] w-[300px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] transform -translate-x-1/2 transition-opacity duration-300 opacity-0 group-hover/footer:opacity-100 will-change-transform" style={{ left: 'var(--mouse-x, 50%)' }}></div>
             <div className="absolute top-[-1px] h-[3px] w-[100px] bg-gradient-to-r from-transparent via-blue-500 to-transparent blur-[4px] transform -translate-x-1/2 transition-opacity duration-300 opacity-0 group-hover/footer:opacity-100 will-change-transform" style={{ left: 'var(--mouse-x, 50%)' }}></div>
         </div>
         
         <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.04] bg-[linear-gradient(rgba(0,0,0,1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,1)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(6,182,212,1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)]"></div>

         <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 relative z-10">
             
             <div className="md:col-span-4 space-y-8">
                 <div className="flex items-center gap-4">
                    <div className="w-14 h-14 relative flex items-center justify-center group/logo cursor-default">
                         <div className="absolute inset-0 bg-blue-500/20 dark:bg-cyan-500/20 blur-xl rounded-full opacity-0 group-hover/logo:opacity-100 transition-opacity duration-700"></div>
                         <svg viewBox="0 0 100 100" className="w-full h-full relative z-10">
                            <path d="M50 15 L85 35 V75 L50 95 L15 75 V35 Z" className="stroke-slate-900 dark:stroke-white stroke-[6] fill-transparent" strokeLinejoin="round" />
                            <path d="M50 50 L50 95 M50 50 L15 35 M50 50 L85 35" className="stroke-slate-900 dark:stroke-white stroke-[4] opacity-30" strokeLinecap="round" />
                            <circle cx="50" cy="50" r="10" className="fill-blue-600 dark:fill-cyan-400" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-3xl font-black tracking-tighter text-slate-900 dark:text-white leading-none bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">SGS GROUP</span>
                        <span className="block text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 tracking-[0.35em] mt-1">TECHNOLOGY</span>
                    </div>
                 </div>
                 <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm font-medium pr-4 border-l-2 border-slate-200 dark:border-white/10 pl-4">
                    {TEXTS[language].footerTagline}
                 </p>
                 
                 <div className="flex gap-3">
                     {SOCIAL_LINKS.map(link => (
                         <a key={link.id} href={link.url} target="_blank" rel="noopener noreferrer" className="group/icon relative w-10 h-10 rounded-lg bg-slate-200 dark:bg-white/5 flex items-center justify-center transition-all hover:bg-blue-600 dark:hover:bg-cyan-500 hover:text-white hover:-translate-y-1 overflow-hidden">
                             <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 group-hover/icon:opacity-100 transition-opacity"></div>
                             <svg className="w-5 h-5 transition-transform group-hover/icon:scale-110 relative z-10" fill="currentColor" viewBox="0 0 24 24"><path d={link.icon}/></svg>
                         </a>
                     ))}
                 </div>
             </div>
             
             <div className="md:col-span-2">
                 <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-blue-600 dark:text-cyan-400 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full"></span>
                    {TEXTS[language].quickLinks}
                 </h4>
                 <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                    {NAV_ITEMS.filter(item => item.id !== 'ai-hub').map(item => (
                         <li key={item.id}><button onClick={() => setCurrentView(item.id)} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors text-left flex items-center gap-2 group w-full">
                            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full group-hover:bg-blue-500 dark:group-hover:bg-cyan-400 transition-all group-hover:w-3 duration-300"></span>
                            {language === 'en' ? item.labelEn : item.labelVi}
                         </button></li>
                     ))}
                 </ul>
             </div>
             
             <div className="md:col-span-2">
                 <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-blue-600 dark:text-cyan-400 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full"></span>
                    {TEXTS[language].legal}
                 </h4>
                 <ul className="space-y-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                     <li><button onClick={() => setCurrentView('privacy')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors text-left">{TEXTS[language].privacy}</button></li>
                     <li><button onClick={() => setCurrentView('terms')} className="hover:text-blue-600 dark:hover:text-cyan-300 transition-colors text-left">{TEXTS[language].terms}</button></li>
                 </ul>
             </div>
             
             <div className="md:col-span-4">
                <h4 className="font-bold uppercase tracking-[0.2em] text-[10px] mb-8 text-blue-600 dark:text-cyan-400 flex items-center gap-2">
                    <span className="w-1 h-4 bg-blue-600 dark:bg-cyan-400 rounded-full"></span>
                    {TEXTS[language].stayUpdated}
                </h4>
                
                <div className="relative group/input">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 rounded-lg opacity-20 group-hover/input:opacity-50 transition duration-500 blur-md"></div>
                    
                    <div className="relative flex flex-col sm:flex-row bg-slate-100 dark:bg-black rounded-lg overflow-hidden border border-slate-200 dark:border-white/10 group-focus-within/input:border-cyan-500/50 transition-colors">
                         <div className="pl-3 py-3 text-slate-400 font-mono text-xs select-none flex items-center">
                             <span className="animate-pulse mr-1 text-cyan-500">{'>'}</span>
                         </div>
                         <input 
                            type="email" 
                            value={newsletterEmail}
                            onChange={(e) => setNewsletterEmail(e.target.value)}
                            placeholder={TEXTS[language].subscribePlaceholder} 
                            disabled={isSubmitting || submitSuccess}
                            className="flex-1 bg-transparent border-none px-2 py-3 text-xs font-mono focus:outline-none text-slate-800 dark:text-cyan-300 placeholder-slate-400/50" 
                         />
                         <button 
                             onClick={onSubscribe} 
                             disabled={isSubmitting || submitSuccess}
                             className={`px-6 py-2 text-[10px] font-bold uppercase tracking-wider transition-all border-l border-slate-200 dark:border-white/10 relative overflow-hidden min-w-[100px]
                                ${submitSuccess 
                                    ? 'bg-emerald-500 text-white' 
                                    : 'bg-slate-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 dark:hover:bg-cyan-400 hover:text-white'
                                }`}
                         >
                             <div className="relative z-10 flex items-center justify-center gap-2">
                                 {isSubmitting ? (
                                     <div className="w-3 h-3 border-2 border-t-transparent border-current rounded-full animate-spin"></div>
                                 ) : submitSuccess ? (
                                     <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                 ) : (
                                     TEXTS[language].subscribeBtn
                                 )}
                             </div>
                         </button>
                    </div>
                </div>
                
                <div className="mt-6 flex items-center gap-3 opacity-80">
                    <div className="w-8 h-8 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                    </div>
                    <div>
                        <div className="text-[10px] font-bold text-slate-900 dark:text-white uppercase tracking-wider">{TEXTS[language].securityBadge}</div>
                        <div className="text-[9px] text-slate-500 dark:text-slate-400">{TEXTS[language].securityMsg}</div>
                    </div>
                </div>
             </div>
         </div>

         <div className="max-w-7xl mx-auto px-6 mt-16 pt-6 border-t border-slate-200 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                 <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                     {TEXTS[language].footer}
                 </div>
                 
                 <div className={`flex items-center gap-2 px-3 py-1 rounded-full border bg-opacity-5 border-opacity-20 ${
                     systemStatus.status === 'operational' ? 'bg-emerald-500 border-emerald-500' : 
                     systemStatus.status === 'initializing' ? 'bg-blue-500 border-blue-500' : 'bg-amber-500 border-amber-500'
                 }`}>
                     <span className="relative flex h-2 w-2">
                        {systemStatus.status !== 'initializing' && (
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${getStatusColor()}`}></span>
                        )}
                        <span className={`relative inline-flex rounded-full h-2 w-2 ${getStatusColor()}`}></span>
                     </span>
                     <div className="flex items-center gap-2">
                         <span className={`text-[9px] font-bold tracking-widest uppercase ${
                             systemStatus.status === 'operational' ? 'text-emerald-600 dark:text-emerald-400' : 
                             systemStatus.status === 'initializing' ? 'text-blue-600 dark:text-blue-400' : 'text-amber-600 dark:text-amber-400'
                         }`}>
                             {getStatusText()}
                         </span>
                         {systemStatus.latency > 0 && (
                            <span className="text-[9px] font-mono text-slate-400 border-l border-slate-300 dark:border-white/10 pl-2">
                                {systemStatus.latency}ms
                            </span>
                         )}
                     </div>
                 </div>
             </div>
             
             <button 
                onClick={scrollToTop}
                className="group flex items-center gap-2 px-4 py-2 rounded-full bg-slate-200 dark:bg-white/5 hover:bg-slate-300 dark:hover:bg-white/10 transition-all border border-transparent hover:border-slate-400 dark:hover:border-white/20 active:scale-95"
             >
                 <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600 dark:text-slate-300">
                    {language === 'en' ? 'Top' : 'Lên Đầu'}
                 </span>
                 <svg className="w-3 h-3 text-slate-600 dark:text-cyan-400 transform group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                 </svg>
             </button>
         </div>
    </footer>
  );
};

export default Footer;