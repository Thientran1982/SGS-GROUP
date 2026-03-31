
import React, { useState, useEffect, useRef, useMemo } from 'react';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import AiHub from './components/AiHub';
import BackgroundSystem from './components/BackgroundSystem';
import Cube3D from './components/Cube3D';
import TechTicker from './components/TechTicker';
import ScrambleText from './components/ScrambleText';
import LoadingScreen from './components/LoadingScreen';
import { SEO } from './components/SEO';
import {
  GlassCard,
  SectionContainer,
  DisplayHeading,
  SectionHeading,
  MonoLabel,
  NeonButton,
  TechGridBackground,
  StatusIndicator,
  RangeSlider,
  TechPanel
} from './components/DesignSystem';
import { BackendService } from './services/backend';
import { 
  TEXTS, 
  SERVICES, 
  ABOUT_CONTENT, 
  CONTACT_CONTENT, 
  LEGAL_CONTENT, 
  LEADERSHIP_CONTENT,
  PARTNERS_CONTENT,
  TESTIMONIALS,
  TRUST_BADGES,
  HOW_WE_WORK,
  TECH_STACK_LIST
} from './constants';
import { Language, Theme } from './types';


const AnimatedCounter: React.FC<{ end: number; duration?: number; prefix?: string; suffix?: string; decimals?: number }> = ({ end, duration = 1500, prefix = '', suffix = '', decimals = 0 }) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let startTime: number | null = null;
    let animationFrame: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      const ease = 1 - Math.pow(1 - percentage, 4); 
      setCount(end * ease);
      if (progress < duration) animationFrame = requestAnimationFrame(animate);
      else setCount(end);
    };
    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);
  return <>{prefix}{count.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{suffix}</>;
};

// --- 1. DATA ANALYTICS DEMO ---
const AnalyticsDemo: React.FC<{ language: Language }> = ({ language }) => {
    const [dataPoints, setDataPoints] = useState<{actual: number, predicted: number}[]>([]);
    const labels = language === 'en' ? { title: "Sales Forecast", currency: "$", ai: "AI: ", conf: "Confidence" } : { title: "Dự Báo Doanh Số", currency: "₫", ai: "AI: ", conf: "Độ tin cậy" };

    useEffect(() => {
        const init = Array(15).fill(0).map((_, i) => ({ actual: 50 + Math.sin(i * 0.5) * 20 + Math.random() * 10, predicted: 50 + Math.sin(i * 0.5) * 20 }));
        setDataPoints(init);
        const interval = setInterval(() => {
            setDataPoints(prev => {
                const time = Date.now() / 1000;
                const newActual = 50 + Math.sin(time) * 30 + (Math.random() - 0.5) * 20;
                const newPredicted = 50 + Math.sin(time + 0.5) * 30;
                return [...prev.slice(1), { actual: newActual, predicted: newPredicted }];
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    const h = 160; const w = 320;
    const minVal = 0; const maxVal = 100;
    const getPath = (key: 'actual' | 'predicted') => dataPoints.map((d, i) => `${(i / (dataPoints.length - 1)) * w},${h - ((d[key] - minVal) / (maxVal - minVal)) * h}`).join(" ");
    const latest = dataPoints[dataPoints.length - 1] || { actual: 0, predicted: 0 };
    const accuracy = 100 - Math.abs(latest.predicted - latest.actual);
    const multiplier = language === 'en' ? 1 : 24; 
    const unit = language === 'en' ? 'k' : 'tr';

    return (
        <div className="h-full flex flex-col bg-canvas-subtle p-4 relative overflow-hidden select-none">
            <div className="flex justify-between items-start mb-4 z-10">
                <div>
                    <div className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mb-1">{labels.title}</div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-xl font-bold text-white">{labels.currency}{Math.floor(latest.actual * 120 * multiplier).toLocaleString()}{unit}</span>
                        <span className="text-[10px] text-primary-DEFAULT font-mono">{labels.ai}{labels.currency}{Math.floor(latest.predicted * 120 * multiplier).toLocaleString()}{unit}</span>
                    </div>
                </div>
                <div className="px-2 py-1 bg-accent-DEFAULT/10 border border-accent-DEFAULT/20 rounded text-[9px] font-bold text-accent-glow">{labels.conf}: {Math.floor(accuracy)}%</div>
            </div>
            <div className="flex-1 relative">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 320 160" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" style={{stopColor:'rgba(6,182,212,0.2)', stopOpacity:1}} />
                            <stop offset="100%" style={{stopColor:'rgba(6,182,212,0)', stopOpacity:0}} />
                        </linearGradient>
                    </defs>
                    <polyline points={getPath('predicted')} fill="none" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" className="opacity-60" vectorEffect="non-scaling-stroke" />
                    <path d={`${getPath('actual')} L 320,160 L 0,160 Z`} fill="url(#grad1)" stroke="none" />
                    <polyline points={getPath('actual')} fill="none" stroke="#06B6D4" strokeWidth="2" className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]" vectorEffect="non-scaling-stroke" />
                </svg>
            </div>
        </div>
    );
};

// --- 2. AUTOMATION DEMO ---
const AutomationDemo: React.FC<{ language: Language }> = ({ language }) => {
    const [step, setStep] = useState(0);
    const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
    const [logs, setLogs] = useState<{type: string, text: string}[]>([]);
    const scrollRef = useRef<HTMLDivElement>(null);
    
    // Configurable texts based on language
    const steps = language === 'en' ? ["Scan", "Extract", "Verify", "Sync"] : ["Quét", "Trích xuất", "Kiểm tra", "Đồng bộ"];
    const logTexts = language === 'en' 
        ? { init: 'Initializing...', ocr: 'OCR: Data Captured', val: 'Validating ERP...', sync: 'Sync Complete', btn: "INITIATE SEQUENCE" }
        : { init: 'Đang khởi tạo...', ocr: 'OCR: Đã quét dữ liệu', val: 'Kiểm tra ERP...', sync: 'Đồng bộ hoàn tất', btn: "KHỞI CHẠY QUY TRÌNH" };

    const startProcess = () => {
        if (status === 'processing') return;
        setStep(0); setStatus('processing'); setLogs([]);
        const delay = (ms: number) => new Promise(r => setTimeout(r, ms));
        const run = async () => {
            setLogs(prev => [...prev, { type: 'info', text: logTexts.init }]); await delay(800);
            setStep(1); setLogs(prev => [...prev, { type: 'success', text: logTexts.ocr }]); await delay(1200);
            setStep(2); setLogs(prev => [...prev, { type: 'warn', text: logTexts.val }]); await delay(1000);
            setStep(3); setLogs(prev => [...prev, { type: 'success', text: logTexts.sync }]); await delay(800);
            setStatus('done');
        };
        run();
    };
    useEffect(() => { if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight; }, [logs]);
    return (
        <div className="h-full flex flex-col bg-canvas-subtle p-3 sm:p-5 relative overflow-hidden select-none">
            <div className="relative z-10 mb-3 sm:mb-6">
                <div className="absolute top-2.5 left-0 w-full h-0.5 bg-white/10 -z-10 rounded-full overflow-hidden"><div className="h-full bg-primary-DEFAULT transition-all duration-500 ease-out shadow-[0_0_10px_cyan]" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div></div>
                <div className="grid grid-cols-4 w-full">{steps.map((s, i) => (<div key={i} className={`flex flex-col items-center gap-1 transition-all duration-300 ${i <= step ? 'opacity-100' : 'opacity-40'}`}><div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center text-[8px] sm:text-[9px] font-bold border transition-all duration-500 bg-black ${i < step ? 'bg-primary-DEFAULT border-primary-DEFAULT text-black' : i === step ? 'border-primary-DEFAULT text-primary-DEFAULT shadow-[0_0_10px_cyan]' : 'border-slate-600 text-slate-500'}`}>{i < step ? '✓' : i + 1}</div><span className={`text-[7px] sm:text-[8px] uppercase font-bold tracking-wider text-center w-full truncate ${i === step ? 'text-primary-DEFAULT' : 'text-slate-400'}`}>{s}</span></div>))}</div>
            </div>
            <div className="flex-1 flex flex-col gap-2 sm:gap-4 min-h-0">
                <div className="h-16 sm:h-24 relative border border-white/10 bg-black/30 rounded-lg flex items-center justify-center overflow-hidden shrink-0"><svg className={`w-7 h-7 sm:w-10 sm:h-10 transition-all duration-500 ${status === 'done' ? 'text-status-success scale-110' : 'text-white'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>{status === 'processing' && <div className="absolute inset-0 z-10 animate-[scanline_2s_linear_infinite]"><div className="h-0.5 w-full bg-primary-DEFAULT shadow-[0_0_15px_cyan]"></div></div>}</div>
                <div ref={scrollRef} className="flex-1 bg-[#050507] border border-white/10 rounded-lg p-2 sm:p-3 overflow-y-auto custom-scrollbar font-mono text-[8px] sm:text-[9px] relative shadow-inner-light">{logs.map((l, i) => <div key={i} className="mb-1 sm:mb-1.5 flex gap-1.5 sm:gap-2 animate-fade-in-up"><span className={l.type === 'info' ? 'text-blue-400' : l.type === 'success' ? 'text-emerald-400' : 'text-amber-400'}>[{l.type.toUpperCase()}]</span><span className="text-slate-300">{l.text}</span></div>)}</div>
            </div>
            {(status === 'idle' || status === 'done') && <button onClick={startProcess} className="mt-2 sm:mt-4 w-full py-2 sm:py-3 bg-white hover:bg-slate-200 text-black font-bold uppercase text-[10px] sm:text-xs tracking-widest rounded shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all active:scale-95 z-20">{logTexts.btn}</button>}
        </div>
    );
};

// --- 3. AI DEMO ---
const AIDemo: React.FC<{ language: Language }> = ({ language }) => {
    const [activeLayer, setActiveLayer] = useState(0); const [text, setText] = useState(""); const [processedText, setProcessedText] = useState(""); const inputNodes = [0, 1, 2]; const hiddenNodes = [0, 1, 2, 3]; const outputNodes = [0, 1, 2];
    const runAnalysis = () => { if (!text.trim()) return; setActiveLayer(1); setProcessedText(""); setTimeout(() => setActiveLayer(2), 500); setTimeout(() => setActiveLayer(3), 1200); setTimeout(() => setActiveLayer(4), 2000); setTimeout(() => { setActiveLayer(0); setProcessedText(language === 'en' ? "Classification: " + text.toUpperCase() : "Phân loại: " + text.toUpperCase()); }, 2800); };
    return (
        <div className="h-full flex flex-col bg-canvas-subtle p-5 select-none relative overflow-hidden">
            <div className="flex gap-2 mb-4 relative z-20"><input type="text" value={text} onChange={(e) => { setText(e.target.value); setActiveLayer(0); setProcessedText(""); }} onKeyDown={(e) => e.key === 'Enter' && runAnalysis()} placeholder={language === 'en' ? "Input Data..." : "Nhập dữ liệu..."} className="flex-1 bg-surface-glassHigh border border-surface-border rounded px-3 py-1.5 text-xs text-white focus:border-primary-DEFAULT outline-none shadow-inner-light" /><button onClick={runAnalysis} className="bg-white hover:bg-slate-200 text-black px-3 rounded text-[10px] font-bold uppercase active:scale-95">&rarr;</button></div>
            <div className="flex-1 relative flex items-center justify-center"><svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">{inputNodes.map((i, idx) => hiddenNodes.map((h, hIdx) => <line key={`i${idx}-h${hIdx}`} x1="20%" y1={`${20 + idx * 30}%`} x2="50%" y2={`${15 + hIdx * 23}%`} stroke={activeLayer === 2 ? "#06B6D4" : "#334155"} strokeWidth={activeLayer === 2 ? "2" : "1"} className={`transition-colors duration-500 ${activeLayer === 2 ? 'opacity-100' : 'opacity-20'}`} />))}{hiddenNodes.map((h, hIdx) => outputNodes.map((o, oIdx) => <line key={`h${hIdx}-o${oIdx}`} x1="50%" y1={`${15 + hIdx * 23}%`} x2="80%" y2={`${20 + oIdx * 30}%`} stroke={activeLayer === 3 ? "#6366F1" : "#334155"} strokeWidth={activeLayer === 3 ? "2" : "1"} className={`transition-colors duration-500 ${activeLayer === 3 ? 'opacity-100' : 'opacity-20'}`} />))}</svg><div className="flex justify-between w-full px-4 relative z-10 h-full items-center"><div className="flex flex-col gap-6 items-center">{inputNodes.map(i => <div key={i} className={`w-3 h-3 rounded-full border border-primary-DEFAULT transition-all duration-300 ${activeLayer >= 1 ? 'bg-primary-DEFAULT shadow-[0_0_10px_cyan] scale-125' : 'bg-black'}`}></div>)}</div><div className="flex flex-col gap-4 items-center">{hiddenNodes.map(i => <div key={i} className={`w-4 h-4 rounded-full border border-indigo-500 transition-all duration-300 ${activeLayer === 3 ? 'bg-indigo-500 shadow-[0_0_15px_indigo] animate-pulse' : 'bg-black'}`}></div>)}</div><div className="flex flex-col gap-6 items-center">{outputNodes.map(i => <div key={i} className={`w-3 h-3 rounded-full border border-emerald-500 transition-all duration-300 ${activeLayer === 4 ? 'bg-emerald-500 shadow-[0_0_10px_emerald] scale-125' : 'bg-black'}`}></div>)}</div></div></div>
            <div className="h-8 flex items-center justify-center mt-2">{processedText && <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 rounded text-[10px] font-bold text-emerald-400 animate-fade-in-up">{processedText}</div>}{activeLayer > 0 && !processedText && <span className="text-[9px] font-mono text-cyan-500 animate-pulse">{language === 'en' ? 'PROCESSING...' : 'ĐANG XỬ LÝ...'}</span>}</div>
        </div>
    );
};

// --- 4. CLOUD DEMO ---
const CloudDemo: React.FC<{ language: Language }> = ({ language }) => {
    const [activeLinks, setActiveLinks] = useState<number[]>([]); const [reqCount, setReqCount] = useState(14500);
    useEffect(() => { const i = setInterval(() => { const target = Math.ceil(Math.random() * 4); setActiveLinks(prev => [...prev, target]); setTimeout(() => setActiveLinks(prev => prev.filter(l => l !== target)), 600); setReqCount(p => p + Math.floor(Math.random() * 15)); }, 300); return () => clearInterval(i); }, []);
    const nodes = [{ x: 50, y: 50, type: 'master' }, { x: 20, y: 20 }, { x: 80, y: 20 }, { x: 20, y: 80 }, { x: 80, y: 80 }];
    return (
        <div className="h-full flex flex-col bg-canvas-subtle p-4 select-none relative overflow-hidden"><div className="flex justify-between items-center mb-2 z-10"><div className="flex items-center gap-2"><div className="w-1.5 h-1.5 bg-status-success rounded-full animate-pulse"></div><span className="text-[9px] font-mono text-slate-400 uppercase">{language === 'en' ? 'System: OK' : 'Hệ thống: Ổn định'}</span></div><div className="text-[9px] font-mono text-primary-DEFAULT">RPS: {(reqCount / 1000).toFixed(1)}k</div></div><div className="flex-1 relative"><svg className="absolute inset-0 w-full h-full pointer-events-none">{[1, 2, 3, 4].map(t => (<g key={t}><line x1="50%" y1="50%" x2={`${nodes[t].x}%`} y2={`${nodes[t].y}%`} stroke="#334155" strokeWidth="1" strokeOpacity="0.5" />{activeLinks.includes(t) && <circle r="2" fill="#22D3EE"><animateMotion dur="0.6s" repeatCount="1" path={`M${nodes[0].x * 3.2},${nodes[0].y * 1.6} L${nodes[t].x * 3.2},${nodes[t].y * 1.6}`} begin="0s" /></circle>}</g>))}</svg>{nodes.map((n, i) => (<div key={i} className={`absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center transition-all duration-300 ${n.type === 'master' ? 'w-10 h-10 z-20' : 'w-8 h-8 z-10'}`} style={{ left: `${n.x}%`, top: `${n.y}%` }}><div className={`relative w-full h-full flex items-center justify-center backdrop-blur-md rounded-lg border ${n.type === 'master' ? 'bg-primary-DEFAULT/20 border-primary-DEFAULT shadow-[0_0_20px_rgba(6,182,212,0.3)]' : activeLinks.includes(i) ? 'bg-blue-500/20 border-blue-400 scale-110' : 'bg-slate-800/50 border-slate-600'}`}>{n.type === 'master' ? <div className="w-3 h-3 bg-white rounded-full animate-pulse shadow-[0_0_10px_white]"></div> : <div className={`w-1.5 h-1.5 rounded-sm ${activeLinks.includes(i) ? 'bg-blue-400' : 'bg-slate-500'}`}></div>}</div></div>))}</div></div>
    );
};

// --- 5. BIG DATA DEMO ---
const BigDataDemo: React.FC<{ language: Language }> = ({ language }) => {
    const [volume, setVolume] = useState(84.2);
    useEffect(() => { let frameId: number; const animate = () => { setVolume(prev => prev + 0.005 + Math.random() * 0.01); frameId = requestAnimationFrame(animate); }; frameId = requestAnimationFrame(animate); return () => cancelAnimationFrame(frameId); }, []);
    return (
        <div className="h-full flex flex-col bg-[#050507] p-4 relative overflow-hidden select-none font-mono"><div className="flex justify-between items-start mb-4 z-10"><div><div className="text-[10px] text-slate-500 uppercase tracking-widest mb-1">{language === 'en' ? 'Data Lake Volume' : 'Dung Lượng Hồ Dữ Liệu'}</div><div className="text-xl font-bold text-white flex items-baseline gap-1">{volume.toFixed(4)} <span className="text-primary-DEFAULT text-sm">PB</span></div></div><div className="px-2 py-1 bg-white/5 border border-white/10 rounded text-[9px] text-slate-400 flex items-center gap-2"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span> ETL: {language === 'en' ? 'ACTIVE' : 'HOẠT ĐỘNG'}</div></div><div className="flex-1 flex items-center gap-3 relative"><div className="flex-1 h-full relative overflow-hidden border-r border-white/5 pr-2 group"><div className="absolute inset-0 flex gap-2 opacity-30 group-hover:opacity-50 transition-opacity">{[1, 2, 3].map(col => (<div key={col} className="w-1 bg-gradient-to-b from-transparent via-slate-500 to-transparent h-[200%] animate-[scanline_3s_linear_infinite]" style={{ animationDuration: `${2 + col * 0.5}s`, animationDelay: `-${col}s` }}></div>))}</div><div className="absolute bottom-2 left-0 right-2 text-[8px] text-slate-600 text-center tracking-widest">{language === 'en' ? 'RAW_INGEST' : 'DỮ_LIỆU_THÔ'}</div></div><div className="w-20 h-full flex flex-col items-center justify-center relative"><div className="absolute w-14 h-14 border border-cyan-500/20 rounded-full animate-[spin_4s_linear_infinite]"></div><div className="absolute w-10 h-10 border border-cyan-500/40 rounded-full border-dashed animate-[spin_6s_linear_infinite_reverse]"></div><div className="w-6 h-6 bg-cyan-500/10 border border-cyan-400 rounded flex items-center justify-center shadow-[0_0_15px_cyan]"><div className="w-2 h-2 bg-white rounded-full animate-ping"></div></div><div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent top-1/2"></div></div><div className="flex-1 h-full flex flex-col justify-center gap-1.5 pl-2 border-l border-white/5">{[75, 50, 90, 60, 85].map((width, i) => (<div key={i} className="h-1.5 rounded-sm bg-[#0F172A] overflow-hidden relative"><div className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 to-cyan-400 animate-[shine_2s_ease-in-out_infinite]" style={{ width: `${width}%`, animationDelay: `${i * 0.2}s` }}></div></div>))}<div className="mt-2 text-[8px] text-cyan-500 text-center tracking-widest">{language === 'en' ? 'STRUCTURED' : 'CẤU_TRÚC_HÓA'}</div></div></div></div>
    );
};

const InteractiveZoomContainer: React.FC<{ children: React.ReactNode; language: Language }> = ({ children }) => (
    <div className="relative w-full h-full overflow-hidden group/zoom cursor-default flex items-center justify-center">{children}</div>
);

const ServiceDemoStage: React.FC<{ id: string; language: Language }> = ({ id, language }) => {
    let Component;
    switch (id) {
        case 'data-analytics': Component = <AnalyticsDemo language={language} />; break;
        case 'automation': Component = <AutomationDemo language={language} />; break;
        case 'ai-tech': Component = <AIDemo language={language} />; break;
        case 'cloud-computing': Component = <CloudDemo language={language} />; break;
        case 'big-data': Component = <BigDataDemo language={language} />; break;
        default: Component = <div className="flex items-center justify-center h-full text-slate-500 font-mono text-xs">NO_SIGNAL</div>;
    }
    return <InteractiveZoomContainer language={language}>{Component}</InteractiveZoomContainer>;
};

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [theme, setTheme] = useState<Theme>('dark');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [aiInitialMessage, setAiInitialMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (theme === 'dark') document.documentElement.classList.add('dark'); else document.documentElement.classList.remove('dark'); }, [theme]);
  useEffect(() => { window.scrollTo(0, 0); }, [currentView, selectedServiceId]);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const handleNewsletterSubmit = async () => { const result = await BackendService.newsletter.subscribe(newsletterEmail); if (result.success) setNewsletterEmail(''); };
  const handleConsultAI = (title: string) => { setAiInitialMessage(language === 'en' ? `Tell me about ${title}` : `Nói cho tôi về ${title}`); setCurrentView('ai-hub'); };
  const navigateToService = (id: string) => { setSelectedServiceId(id); setCurrentView('service-detail'); };

  if (loading) return null;

  const HomeView = () => (
    <>
        <div className="relative z-10 min-h-screen flex flex-col justify-center pt-20 sm:pt-24 pb-8 overflow-clip bg-[#f8fafc] dark:bg-transparent w-full">
            <TechGridBackground />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 w-full flex-grow flex flex-col justify-center">
                {/* 2026 LAYOUT: SPLIT SCREEN FOR PROFESSIONAL DASHBOARD FEEL */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-8 items-center">
                    
                    {/* LEFT COLUMN: INFORMATION ARCHITECTURE */}
                    <div className="order-1 flex flex-col items-center lg:items-start text-center lg:text-left relative z-40">

                        {/* HUD Targeting Corners */}
                        <div className="relative inline-block group mb-6 md:mb-8">
                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500/50 rounded-tl-lg -translate-x-2 -translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500/50 rounded-br-lg translate-x-2 translate-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                            
                            <DisplayHeading className="leading-[1.1] md:leading-tight">
                                {TEXTS[language].heroTitle}
                            </DisplayHeading>
                        </div>

                        <p className="text-base md:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed mb-6 md:mb-8 animate-fade-in-up [animation-delay:400ms]">
                            {TEXTS[language].heroSubtitle}
                        </p>

                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto animate-fade-in-up [animation-delay:600ms]">
                            <div className="w-full sm:w-auto">
                                <NeonButton onClick={() => setCurrentView('ai-hub')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>} fullWidth>{TEXTS[language].cta}</NeonButton>
                            </div>
                            <div className="w-full sm:w-auto">
                                <NeonButton variant="secondary" onClick={() => setCurrentView('services')} fullWidth>{TEXTS[language].learnMore}</NeonButton>
                            </div>
                        </div>

                        <p className="text-[11px] text-slate-500 font-mono mt-3 animate-fade-in-up [animation-delay:800ms] text-center lg:text-left">
                            {language === 'en' ? '⚡ Free 30-min audit · No commitment · Response <24h' : '⚡ Tư vấn miễn phí 30 phút · Không ràng buộc · Phản hồi <24h'}
                        </p>

                        <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mt-5 pt-5 border-t border-slate-200 dark:border-white/5 animate-fade-in-up [animation-delay:900ms]">
                            {[
                                { value: '200+', labelEn: 'Projects', labelVi: 'Dự án' },
                                { value: '50+', labelEn: 'Enterprise Clients', labelVi: 'Khách Hàng' },
                                { value: '99.98%', labelEn: 'Uptime SLA', labelVi: 'Uptime SLA' },
                                { value: '6 Wks', labelEn: 'Avg. Deployment', labelVi: 'Triển Khai' },
                            ].map((s, i) => (
                                <div key={i} className="flex items-center gap-1.5">
                                    <span className="text-sm font-black text-slate-900 dark:text-white">{s.value}</span>
                                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">{language === 'en' ? s.labelEn : s.labelVi}</span>
                                    {i < 3 && <span className="hidden sm:block w-px h-3.5 bg-slate-300 dark:bg-white/10 ml-1.5"></span>}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT COLUMN: 3D ARTIFACT */}
                    <div className="order-2 flex justify-center items-center relative h-[220px] sm:h-[340px] md:h-[500px] overflow-hidden">
                        {/* Circular Glow — replaces canvas drop-shadow (no box artifact) */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-cyan-500/30 rounded-full blur-[70px] animate-pulse-slow pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] bg-cyan-400/20 rounded-full blur-[40px] animate-pulse-slow pointer-events-none"></div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 translate-x-16 translate-y-10 w-[220px] h-[220px] bg-violet-500/15 rounded-full blur-[80px] animate-pulse-slow pointer-events-none [animation-delay:1.5s]"></div>
                        <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md md:scale-110 lg:scale-125">
                            <Cube3D language={language} />
                        </div>
                    </div>

                </div>
            </div>

            {/* TICKER BAR — full-width at bottom of hero */}
            <div className="w-full mt-auto pt-6">
                <TechTicker language={language} />
            </div>
        </div>

        {/* ═══ WHY SGS — 3 GUARANTEES SECTION ═══ */}
        <div className="relative z-10 border-t border-white/5 bg-gradient-to-b from-canvas-subtle/60 to-canvas py-14 md:py-20">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.03] pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
                <div className="text-center mb-10 md:mb-14">
                    <p className="text-[10px] font-mono uppercase tracking-widest text-primary-DEFAULT mb-3">
                        {language === 'en' ? '— Why Vietnam\'s Leading Enterprises Choose SGS GROUP —' : '— Tại Sao Doanh Nghiệp Hàng Đầu Chọn SGS GROUP —'}
                    </p>
                    <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white">
                        {language === 'en' ? 'Three Guarantees That Remove All Risk' : 'Ba Cam Kết Loại Bỏ Mọi Rủi Ro'}
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            iconPath: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z',
                            iconBg: 'bg-cyan-500/10',
                            iconBorder: 'border-cyan-500/25',
                            iconColor: 'text-cyan-400',
                            cardBorder: 'border-slate-200 dark:border-cyan-500/15 hover:border-cyan-500/40 dark:hover:border-cyan-500/40',
                            tagClass: 'text-cyan-500 dark:text-cyan-400',
                            dotClass: 'bg-cyan-500',
                            labelEn: '6-WEEK DEPLOYMENT',
                            labelVi: 'TRIỂN KHAI 6 TUẦN',
                            statEn: 'vs. traditional multi-month deployments',
                            statVi: 'nhanh hơn chu kỳ triển khai thông thường',
                            descEn: 'Fixed-scope pilot on your real data. We define success metrics together before writing a single line of code.',
                            descVi: 'Pilot cố định phạm vi trên dữ liệu thực. Xác định chỉ số thành công cùng bạn trước khi viết code.',
                        },
                        {
                            iconPath: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
                            iconBg: 'bg-emerald-500/10',
                            iconBorder: 'border-emerald-500/25',
                            iconColor: 'text-emerald-400',
                            cardBorder: 'border-slate-200 dark:border-emerald-500/15 hover:border-emerald-500/40 dark:hover:border-emerald-500/40',
                            tagClass: 'text-emerald-600 dark:text-emerald-400',
                            dotClass: 'bg-emerald-500',
                            labelEn: '100% MONEY-BACK',
                            labelVi: 'HOÀN TIỀN 100%',
                            statEn: 'if no measurable results in pilot',
                            statVi: 'nếu không có kết quả đo được',
                            descEn: 'No measurable results in 6 weeks? Full refund of the pilot fee — the conditions are defined upfront and written into your contract.',
                            descVi: 'Không có kết quả đo được trong 6 tuần? Hoàn phí pilot đầy đủ — điều kiện được xác định trước và ghi rõ trong hợp đồng.',
                        },
                        {
                            iconPath: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
                            iconBg: 'bg-violet-500/10',
                            iconBorder: 'border-violet-500/25',
                            iconColor: 'text-violet-400',
                            cardBorder: 'border-slate-200 dark:border-violet-500/15 hover:border-violet-500/40 dark:hover:border-violet-500/40',
                            tagClass: 'text-violet-600 dark:text-violet-400',
                            dotClass: 'bg-violet-500',
                            labelEn: 'ZERO DATA BREACHES',
                            labelVi: 'KHÔNG CÓ SỰ CỐ DỮ LIỆU',
                            statEn: 'across 200+ enterprise deployments',
                            statVi: 'qua 200+ triển khai doanh nghiệp',
                            descEn: 'ISO 27001 aligned · AES-256 encryption · PDPA compliant. Data sovereignty built into every engagement — with full on-premises deployment for banking, healthcare, and regulated sectors.',
                            descVi: 'Tuân thủ ISO 27001 · AES-256 · PDPA. Chủ quyền dữ liệu trong mọi hợp đồng — với tùy chọn on-premises cho ngân hàng, y tế và các ngành được quản lý.',
                        },
                    ].map((item, i) => (
                        <div key={i} className={`relative p-6 md:p-8 rounded-2xl border bg-white dark:bg-white/[0.02] hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all duration-300 group ${item.cardBorder}`}>
                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${item.iconBg} ${item.iconBorder}`}>
                                <svg className={`w-6 h-6 ${item.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.iconPath} />
                                </svg>
                            </div>
                            <div className={`text-[10px] font-mono font-bold uppercase tracking-widest mb-1 flex items-center gap-2 ${item.tagClass}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${item.dotClass} animate-pulse`}></span>
                                {language === 'en' ? item.labelEn : item.labelVi}
                            </div>
                            <div className="text-xs text-slate-500 mb-4 font-mono">{language === 'en' ? item.statEn : item.statVi}</div>
                            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{language === 'en' ? item.descEn : item.descVi}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>

        <SectionContainer className="bg-slate-50/80 dark:bg-canvas-subtle/50 backdrop-blur-sm border-t border-surface-border mt-0">
            <SectionHeading title={TEXTS[language].features} subtitle={TEXTS[language].coreModules} />
            {/* V6.1 DATA MODULES (CARTRIDGES) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SERVICES.slice(0, 3).map((service, i) => (
                    <GlassCard key={service.id} className="p-0 group relative overflow-hidden h-full flex flex-col" onClick={() => navigateToService(service.id)}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        {/* Module Header */}
                        <div className="px-6 pt-6 pb-2 flex justify-between items-start shrink-0">
                            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/15 group-hover:border-cyan-500/40 transition-all duration-300">
                                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor"><path d={service.icon} /></svg>
                            </div>
                            <div className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/[0.04] border border-slate-200 dark:border-white/[0.07] text-[9px] font-mono text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/25 group-hover:bg-cyan-500/5 uppercase tracking-widest transition-all">
                                {language === 'en' ? 'Module' : 'Mô-đun'} 0{i + 1}
                            </div>
                        </div>

                        {/* Content Body */}
                        <div className="px-6 py-4 flex flex-col flex-1">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-primary-glow transition-colors">{language === 'en' ? service.titleEn : service.titleVi}</h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2 mb-4 flex-grow">{language === 'en' ? service.descEn : service.descVi}</p>
                            
                            {/* Action Footer */}
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500 group-hover:text-slate-900 dark:group-hover:text-white transition-colors mt-auto pt-4 border-t border-slate-200 dark:border-white/5">
                                <span className="w-4 h-[1px] bg-slate-600 group-hover:bg-cyan-500 transition-colors"></span>
                                {language === 'en' ? 'View Details' : 'Xem Chi Tiết'}
                            </div>
                        </div>

                        {/* Hover Border Glow */}
                        <div className="absolute inset-0 border border-transparent group-hover:border-cyan-500/20 rounded-xl md:rounded-2xl pointer-events-none transition-colors duration-500"></div>
                    </GlassCard>
                ))}
            </div>
            <div className="mt-8 text-center">
                <button
                    onClick={() => setCurrentView('services')}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-DEFAULT hover:text-primary-glow transition-colors underline-offset-4 hover:underline"
                >
                    {language === 'en'
                        ? '+ 2 more: Cloud Computing & Big Data Processing →'
                        : '+ 2 dịch vụ nữa: Điện toán đám mây & Xử lý Big Data →'}
                </button>
            </div>
        </SectionContainer>

        {/* === TRUST BADGES SECTION === */}
        <SectionContainer className="py-12 border-t border-surface-border bg-slate-100/50 dark:bg-canvas-subtle/30">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                {TRUST_BADGES.map((badge, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 p-4 rounded-xl bg-white dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 hover:border-cyan-500/30 dark:hover:border-cyan-500/20 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-all group text-center shadow-sm dark:shadow-none">
                        <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/15 transition-all">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={badge.icon} />
                            </svg>
                        </div>
                        <div>
                            <div className="text-xs font-bold text-slate-900 dark:text-white">{language === 'en' ? badge.labelEn : badge.labelVi}</div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-500 mt-0.5">{language === 'en' ? badge.descEn : badge.descVi}</div>
                        </div>
                    </div>
                ))}
            </div>
        </SectionContainer>

        {/* === TRUST BADGES HEADER === */}
        {/* === TESTIMONIALS SECTION === */}
        <SectionContainer className="py-20 border-t border-surface-border">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[10px] font-mono uppercase tracking-widest mb-4">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
                    {language === 'en' ? 'Client Results' : 'Kết Quả Khách Hàng'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">
                    {language === 'en' ? 'What Our Clients Say' : 'Khách Hàng Nói Gì Về Chúng Tôi'}
                </h2>
                <p className="text-slate-500 dark:text-slate-400 text-base max-w-xl mx-auto">
                    {language === 'en'
                        ? 'Real outcomes from businesses that trusted SGS GROUP to transform their operations.'
                        : 'Kết quả thực từ các doanh nghiệp đã tin tưởng SGS GROUP chuyển đổi hoạt động của họ.'}
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {(language === 'en' ? TESTIMONIALS.en : TESTIMONIALS.vi).map((t, i) => (
                    <GlassCard key={i} className="p-8 flex flex-col h-full relative overflow-hidden" hoverEffect={false}>
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>

                        {/* Stars + Result Badge */}
                        <div className="flex items-center justify-between gap-2 mb-5">
                            <div className="flex gap-1">
                                {Array.from({ length: t.rating }).map((_, s) => (
                                    <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                    </svg>
                                ))}
                            </div>
                            {t.result && (
                                <div className="px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-wider whitespace-nowrap shrink-0">
                                    {t.result}
                                </div>
                            )}
                        </div>

                        <blockquote className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed flex-grow mb-6">
                            &ldquo;{t.quote}&rdquo;
                        </blockquote>

                        <div className="border-t border-slate-200 dark:border-white/5 pt-5 flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-DEFAULT/30 to-accent-DEFAULT/30 border border-slate-200 dark:border-white/10 flex items-center justify-center text-xs font-bold text-slate-900 dark:text-white shrink-0">
                                {t.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                    <div className="text-sm font-bold text-slate-900 dark:text-white truncate">{t.name}</div>
                                    {t.verified && (
                                        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[8px] font-mono font-bold text-blue-400 uppercase tracking-wider shrink-0">
                                            <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                            {language === 'en' ? 'Verified' : 'Đã xác minh'}
                                        </div>
                                    )}
                                </div>
                                <div className="text-[10px] text-slate-500 mt-0.5">{t.role}{(t as any).company ? ` · ${(t as any).company}` : ''}</div>
                                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                    <span className="text-[9px] font-mono text-primary-DEFAULT uppercase tracking-wider">{t.industry}</span>
                                    {(t as any).date && <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">· {(t as any).date}</span>}
                                </div>
                            </div>
                        </div>
                    </GlassCard>
                ))}
            </div>
        </SectionContainer>

        {/* ═══ FINAL CTA BANNER ═══ */}
        <div className="relative z-10 border-t border-slate-100 dark:border-white/5 bg-gradient-to-b from-canvas to-canvas-subtle/80 py-20 md:py-28 overflow-hidden">
            <div className="absolute inset-0 bg-tech-grid opacity-[0.04] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] bg-primary-DEFAULT/6 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 text-primary-DEFAULT text-[10px] font-mono uppercase tracking-widest mb-6">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT animate-pulse"></span>
                    {language === 'en' ? 'Zero-Risk Engagement' : 'Cam Kết Không Rủi Ro'}
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 leading-tight whitespace-pre-line">
                    {language === 'en'
                        ? 'See Results in 6 Weeks —\nOr Pay Nothing.'
                        : 'Kết Quả Trong 6 Tuần —\nHoặc Hoàn Tiền 100%.'}
                </h2>
                <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
                    {language === 'en'
                        ? 'Schedule your free 30-minute technical audit. We map your automation opportunities and deliver a concrete ROI projection — at zero cost, zero obligation.'
                        : 'Đặt lịch kiểm tra kỹ thuật miễn phí 30 phút. Chúng tôi lập bản đồ cơ hội tự động hóa và dự báo ROI cụ thể — hoàn toàn miễn phí, không ràng buộc.'}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <NeonButton onClick={() => setCurrentView('ai-hub')} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}>
                        {language === 'en' ? 'Book Free Audit Now' : 'Đặt Lịch Kiểm Tra Miễn Phí'}
                    </NeonButton>
                    <NeonButton variant="secondary" onClick={() => setCurrentView('contact')}>
                        {language === 'en' ? 'Talk to an Expert' : 'Nói Chuyện Với Chuyên Gia'}
                    </NeonButton>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[11px] text-slate-500 font-mono">
                    {[
                        language === 'en' ? '✓ Free 30-min technical audit' : '✓ Tư vấn kỹ thuật miễn phí 30 phút',
                        language === 'en' ? '✓ 100% money-back if no results' : '✓ Hoàn tiền 100% nếu không có kết quả',
                        language === 'en' ? '✓ Response within 24 hours' : '✓ Phản hồi trong vòng 24 giờ',
                    ].map((item, i) => <span key={i}>{item}</span>)}
                </div>
            </div>
        </div>
    </>
  );

  const ServicesView = () => {
    const howWeWork = language === 'en' ? HOW_WE_WORK.en : HOW_WE_WORK.vi;
    return (
    <SectionContainer>
        <SectionHeading title={TEXTS[language].features} subtitle={TEXTS[language].techStack} />

        {/* === TECH STACK STRIP === */}
        <div className="flex flex-wrap gap-2 justify-center mb-14 pb-14 border-b border-surface-border">
            {TECH_STACK_LIST.map((tech, i) => (
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 hover:border-primary-DEFAULT/30 hover:bg-primary-DEFAULT/5 transition-all cursor-default group">
                    <span className="text-[9px] font-mono text-slate-400 dark:text-slate-600 uppercase tracking-wider group-hover:text-primary-DEFAULT/60 transition-colors">{tech.category}</span>
                    <span className="text-slate-300 dark:text-slate-700">·</span>
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">{tech.name}</span>
                </div>
            ))}
        </div>

        {/* === HOW WE DELIVER SECTION === */}
        <div className="mb-20">
            <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 text-primary-DEFAULT text-[10px] font-mono uppercase tracking-widest mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT animate-pulse"></span>
                    {language === 'en' ? 'Our Process' : 'Quy Trình Của Chúng Tôi'}
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-3">{howWeWork.title}</h2>
                <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm">{howWeWork.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
                <div className="hidden lg:block absolute top-10 left-[14%] right-[14%] h-px bg-gradient-to-r from-transparent via-primary-DEFAULT/25 to-transparent pointer-events-none"></div>
                {howWeWork.steps.map((step, i) => (
                    <div key={i} className="relative">
                        <GlassCard className="p-6 h-full" hoverEffect={false}>
                            <div className="flex items-start gap-3 mb-5">
                                <span className="text-4xl font-black text-white/10 font-mono leading-none select-none">{step.number}</span>
                                <div className="w-9 h-9 rounded-lg bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 flex items-center justify-center text-primary-DEFAULT shrink-0 mt-1">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={step.icon} />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="font-bold text-slate-900 dark:text-white text-sm mb-1">{step.title}</h3>
                            <span className="text-[10px] font-mono text-primary-DEFAULT uppercase tracking-widest">{step.duration}</span>
                            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mt-3">{step.desc}</p>
                        </GlassCard>
                    </div>
                ))}
            </div>
        </div>

        {/* === SERVICE CARDS === */}
        <div className="grid grid-cols-1 gap-8 md:gap-12">
            {SERVICES.map((service, index) => (
                <GlassCard key={service.id} className="p-0 overflow-hidden" hoverEffect={false} onClick={() => navigateToService(service.id)}>
                    <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} cursor-pointer group/card`}>
                        <div className="p-6 md:p-8 lg:p-12 flex-1 flex flex-col justify-center transition-colors group-hover/card:bg-white/5">
                             <div className="flex items-center gap-3 mb-4">
                                 <div className="p-2 rounded-lg bg-primary-DEFAULT/10 text-primary-DEFAULT border border-primary-DEFAULT/20"><svg className="w-5 h-5 md:w-6 md:h-6" viewBox="0 0 24 24" fill="currentColor"><path d={service.icon}/></svg></div>
                                 <MonoLabel className="text-primary-DEFAULT">{language === 'en' ? 'Module' : 'Mô-đun'} 0{index + 1}</MonoLabel>
                                 {(language === 'en' ? service.deployTimeEn : service.deployTimeVi) && (
                                     <span className="hidden sm:inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[9px] font-mono text-emerald-400 uppercase tracking-wider">
                                         <svg className="w-2.5 h-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                         {language === 'en' ? service.deployTimeEn : service.deployTimeVi}
                                     </span>
                                 )}
                             </div>
                             <h3 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-slate-900 dark:text-white mb-4 group-hover/card:text-primary-glow transition-colors">{language === 'en' ? service.titleEn : service.titleVi}</h3>
                             <p className="text-sm md:text-base text-slate-600 dark:text-slate-300 leading-relaxed mb-5">{language === 'en' ? service.longDescEn : service.longDescVi}</p>
                             {service.techStack && (
                                 <div className="flex flex-wrap gap-1.5 mb-6">
                                     {service.techStack.map((t, ti) => (
                                         <span key={ti} className="text-[10px] px-2 py-0.5 rounded bg-black/40 border border-white/10 text-slate-400 font-mono">{t}</span>
                                     ))}
                                 </div>
                             )}
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">{(language === 'en' ? service.featuresEn : service.featuresVi).slice(0, 4).map((feat, i) => (<div key={i} className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT mt-1.5 shrink-0"></div><span className="text-xs md:text-sm font-medium text-slate-400">{feat}</span></div>))}</div>
                             <div className="pt-6 border-t border-surface-border"><div className="flex items-center justify-between gap-4"><div><div className="text-xl md:text-2xl font-bold text-white">{service.useCases[0].stat}</div><div className="text-[9px] md:text-[10px] uppercase tracking-wider text-slate-500">{language === 'en' ? service.useCases[0].statLabelEn : service.useCases[0].statLabelVi}</div></div><span className="text-xs font-bold uppercase tracking-wider text-primary-DEFAULT group-hover/card:underline underline-offset-4 decoration-2">{language === 'en' ? 'View Details & ROI' : 'Xem Chi Tiết & ROI'} &rarr;</span></div></div>
                        </div>
                        <div className="h-64 lg:h-auto lg:w-1/3 bg-canvas-subtle relative overflow-hidden flex items-center justify-center border-l border-surface-border">
                             <div className="absolute inset-0 bg-tech-grid opacity-20"></div>
                             <div className="w-full max-w-[320px] aspect-[4/3] relative z-10 grayscale group-hover/card:grayscale-0 transition-all duration-500 scale-95 group-hover/card:scale-100 shadow-2xl p-4"><TechPanel className="h-full w-full shadow-2xl"><ServiceDemoStage id={service.id} language={language} /></TechPanel></div>
                        </div>
                    </div>
                </GlassCard>
            ))}
        </div>
    </SectionContainer>
    );
  };

  const ServiceDetailView = () => {
      const serviceIndex = SERVICES.findIndex(s => s.id === selectedServiceId);
      const service = SERVICES[serviceIndex];
      if (!service) return <ServicesView />;
      
      const title = language === 'en' ? service.titleEn : service.titleVi;
      const desc = language === 'en' ? service.longDescEn : service.longDescVi;
      const roi = service.roiConfig;
      const [inputA, setInputA] = useState(roi?.inputADefault || 0);
      const [inputB, setInputB] = useState(roi?.inputBDefault || 0);
      const calculatedSavings = roi ? Math.floor(inputA * inputB * roi.efficiencyFactor * 52) : 0;

      return (
          <div className="pt-8 pb-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="sticky top-20 z-30 md:static bg-canvas-DEFAULT/80 backdrop-blur-md md:bg-transparent py-2 md:py-0 md:mb-8 mb-4"><button onClick={() => setCurrentView('services')} className="flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-white transition-colors uppercase tracking-wider px-2 py-1 rounded hover:bg-white/5">&larr; {TEXTS[language].backToServices}</button></div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 mb-16 items-start">
                      <div className="order-1 lg:order-1">
                          <div className="flex items-center gap-4 mb-6">
                              <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full bg-primary-DEFAULT/10 border border-primary-DEFAULT/20 text-primary-DEFAULT text-xs font-bold uppercase tracking-widest"><span className="w-2 h-2 rounded-full bg-primary-DEFAULT animate-pulse"></span>{TEXTS[language].coreModules}</div>
                              <MonoLabel>{language === 'en' ? 'Module' : 'Mô-đun'} 0{serviceIndex + 1}</MonoLabel>
                          </div>
                          <DisplayHeading className="mb-6">{title}</DisplayHeading>
                          <p className="text-lg text-slate-400 leading-relaxed mb-8">{desc}</p>
                          <div className="flex flex-col sm:flex-row gap-4"><NeonButton onClick={() => handleConsultAI(title)} icon={<svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>}>{language === 'en' ? "Request Deep Analysis (AI)" : "Yêu Cầu Phân Tích (AI)"}</NeonButton><NeonButton variant="secondary" onClick={() => setCurrentView('contact')}>{TEXTS[language].contactSales}</NeonButton></div>
                      </div>
                      <div className="order-2 lg:order-2 relative"><div className="absolute -inset-1 bg-gradient-to-r from-primary-DEFAULT/20 to-accent-DEFAULT/20 blur-2xl rounded-2xl"></div><TechPanel className="aspect-[4/3] w-full flex items-center justify-center bg-canvas-subtle shadow-2xl"><div className="w-full h-full will-change-transform"><ServiceDemoStage id={service.id} language={language} /></div></TechPanel></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
                      <GlassCard className="p-8 h-full" hoverEffect={false}><h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-primary-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>{language === 'en' ? 'Core Capabilities' : 'Tính Năng Cốt Lõi'}</h3><ul className="space-y-4">{(language === 'en' ? service.featuresEn : service.featuresVi).map((feat, i) => (<li key={i} className="flex items-start gap-3"><span className="w-1.5 h-1.5 rounded-full bg-primary-DEFAULT mt-2 shrink-0 shadow-neon-cyan"></span><span className="text-sm text-slate-300">{feat}</span></li>))}</ul></GlassCard>
                      <GlassCard className="p-8 h-full" hoverEffect={false}><h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-status-success" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>{language === 'en' ? 'Strategic Benefits' : 'Lợi Ích Chiến Lược'}</h3><ul className="space-y-4">{(language === 'en' ? service.benefitsEn : service.benefitsVi).map((ben, i) => (<li key={i} className="flex items-start gap-3"><svg className="w-4 h-4 text-status-success mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg><span className="text-sm text-slate-300">{ben}</span></li>))}</ul></GlassCard>
                      <GlassCard className="p-8 h-full" hoverEffect={false}><h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2"><svg className="w-5 h-5 text-accent-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>{TEXTS[language].useCases}</h3><div className="space-y-6">{service.useCases.map((uc, i) => (<div key={i} className="border-l-2 border-white/10 pl-4 group hover:border-primary-DEFAULT transition-colors"><div className="text-sm font-bold text-white mb-1 group-hover:text-primary-glow">{language === 'en' ? uc.titleEn : uc.titleVi}</div><div className="text-xs text-slate-400 mb-2">{language === 'en' ? uc.descEn : uc.descVi}</div><div className="flex items-center gap-2"><span className="text-lg font-bold text-primary-DEFAULT">{uc.stat}</span><span className="text-[10px] uppercase text-slate-500 font-mono">{language === 'en' ? uc.statLabelEn : uc.statLabelVi}</span></div></div>))}</div></GlassCard>
                  </div>
                  {roi && <div className="mb-20"><SectionHeading title={TEXTS[language].roiTitle} subtitle={TEXTS[language].roiSubtitle} align="center" /><div className="max-w-4xl mx-auto"><GlassCard className="p-8 md:p-12 relative overflow-hidden" hoverEffect={false}><div className="absolute top-0 right-0 w-64 h-64 bg-primary-DEFAULT/5 rounded-full blur-[80px]"></div><div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10"><div className="space-y-8"><RangeSlider label={language === 'en' ? roi.inputALabelEn : roi.inputALabelVi} value={inputA} min={0} max={roi.inputAMax} step={roi.inputAStep} unit={roi.inputAUnit} onChange={setInputA} /><RangeSlider label={language === 'en' ? roi.inputBLabelEn : roi.inputBLabelVi} value={inputB} min={0} max={roi.inputBMax} step={roi.inputBStep} unit={roi.inputBUnit} onChange={setInputB} /><div className="p-4 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 italic">* {language === 'en' ? 'Estimated annual savings based on standard efficiency metrics from client deployments.' : 'Ước tính tiết kiệm hàng năm dựa trên các chỉ số hiệu quả từ triển khai thực tế của khách hàng.'}</div></div><div className="text-center md:text-right"><div className="text-xs font-mono font-bold uppercase text-slate-500 mb-2 tracking-widest">{TEXTS[language].estimatedSavings}</div><div className="text-5xl md:text-6xl font-black text-white mb-2 tracking-tight text-shadow-neon"><AnimatedCounter end={calculatedSavings} prefix={roi.currency} /></div><div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-status-success/10 text-status-success text-xs font-bold border border-status-success/20"><svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>{language === 'en' ? (roi.badgeLabelEn ?? `${Math.floor(roi.efficiencyFactor * 100)}% Efficiency Boost`) : (roi.badgeLabelVi ?? `Tăng ${Math.floor(roi.efficiencyFactor * 100)}% Hiệu Suất`)}</div></div></div></GlassCard></div></div>}
              </div>
          </div>
      );
  };

  const AboutView = () => {
    const content = language === 'en' ? ABOUT_CONTENT.en : ABOUT_CONTENT.vi;
    const leaderData = LEADERSHIP_CONTENT[language];

    return (
        <SectionContainer>
            <SectionHeading title={TEXTS[language].aboutTitle} subtitle={TEXTS[language].profile} />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24 items-center">
                <div className="space-y-8 relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-mono uppercase tracking-widest">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span> Est. 2020
                    </div>
                    <DisplayHeading className="text-4xl md:text-5xl lg:text-6xl">{content.title}</DisplayHeading>
                    <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 leading-relaxed border-l-2 border-primary-DEFAULT/30 pl-6">{content.subtitle}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                        {content.sections.slice(1).map((section, idx) => (
                            <div key={idx} className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl p-5 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors group">
                                <h4 className="font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2"><svg className="w-4 h-4 text-primary-DEFAULT" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>{section.heading}</h4>
                                {section.text && <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{section.text}</p>}
                                {section.items && (<div className="flex flex-wrap gap-2 mt-2">{section.items.map((item, i) => (<span key={i} className="text-[10px] px-2 py-1 rounded bg-black/40 border border-white/10 text-slate-300 font-mono">{item}</span>))}</div>)}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-DEFAULT/10 via-blue-600/5 to-transparent blur-3xl rounded-full"></div>
                    <div className="relative grid grid-cols-1 gap-6">
                        {content.stats.map((stat, i) => {
                            const match = stat.value.toString().match(/^([\d.]+)(.*)$/);
                            const num = match ? parseFloat(match[1]) : NaN;
                            const suffix = match ? match[2] : stat.value;
                            return (
                                <GlassCard key={i} className="p-6 md:p-8 flex items-center justify-between group overflow-hidden border-l-4 border-l-primary-DEFAULT/50" hoverEffect={true}>
                                    <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-primary-DEFAULT/5 to-transparent pointer-events-none"></div>
                                    <div className="relative z-10">
                                        <div className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-1 flex items-baseline gap-1 tracking-tight">{!isNaN(num) ? <AnimatedCounter end={num} /> : null}<span className="text-primary-DEFAULT">{suffix || stat.value}</span></div>
                                        <div className="text-xs font-mono font-bold uppercase tracking-widest text-slate-500 mt-2 flex items-center gap-2"><span className="w-1 h-1 bg-slate-500 rounded-full"></span>{stat.label}</div>
                                    </div>
                                    <div className="w-16 h-16 rounded-2xl bg-[#0a0a0c] border border-white/10 flex items-center justify-center text-primary-DEFAULT shadow-[0_0_20px_rgba(6,182,212,0.15)] group-hover:scale-110 transition-transform duration-500">
                                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {i === 0 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> : i === 1 ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                        </svg>
                                    </div>
                                </GlassCard>
                            );
                        })}
                    </div>
                </div>
            </div>

            <div className="mb-24 relative">
                <SectionHeading title={leaderData.title} align="center" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                    {leaderData.members.map((member, idx) => (
                        <GlassCard key={idx} className="p-0 overflow-hidden group h-full" hoverEffect={false}>
                            <div className="h-24 bg-gradient-to-b from-slate-200 dark:from-slate-800 to-slate-100 dark:to-[#0a0a0c] relative overflow-hidden"><div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-overlay"></div><div className="absolute top-4 right-4 text-[10px] font-mono text-slate-400 dark:text-white/30 tracking-widest">ID: 00{idx + 1}</div></div>
                            <div className="px-8 pb-8 -mt-12 relative">
                                <div className="w-24 h-24 rounded-2xl bg-[#0F1115] border-2 border-white/10 p-1 mb-6 shadow-2xl relative group-hover:border-primary-DEFAULT/50 transition-colors">
                                    <div className="w-full h-full rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden relative">
                                        <span className="text-2xl font-display font-bold text-white/20 group-hover:text-primary-DEFAULT transition-colors">{member.name.split(' ').map(n => n[0]).join('')}</span>
                                        <div className="absolute top-0 w-full h-full bg-gradient-to-b from-transparent via-primary-DEFAULT/20 to-transparent -translate-y-full group-hover:animate-[scanline_2s_linear_infinite]"></div>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1 group-hover:text-primary-glow transition-colors">{member.name}</h3>
                                <div className="text-xs font-mono text-primary-DEFAULT uppercase tracking-wider mb-4">{member.role}</div>
                                <div className="h-px w-full bg-white/10 mb-4"></div>
                                <p className="text-sm text-slate-400 font-light leading-relaxed">{member.bio}</p>
                            </div>
                        </GlassCard>
                    ))}
                </div>
            </div>

            <GlassCard className="p-8 md:p-10 mb-16 relative overflow-hidden border-l-4 border-l-emerald-500/50" hoverEffect={false}>
                <div className="absolute top-0 right-0 w-64 h-full bg-emerald-500/5 blur-3xl pointer-events-none"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-3">
                            <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-emerald-400">{language === 'en' ? 'Our Delivery Guarantee' : 'Cam Kết Giao Hàng'}</span>
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">{language === 'en' ? 'No results in 6 weeks? You pay nothing.' : 'Không có kết quả trong 6 tuần? Bạn không phải trả tiền.'}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{language === 'en' ? 'Every engagement begins with a fixed-scope pilot on your real data. We define success metrics together before writing a single line of code. If we cannot demonstrate measurable improvement within the pilot window, we refund 100% of pilot fees — no questions asked.' : 'Mỗi hợp đồng bắt đầu bằng giai đoạn pilot có phạm vi cố định trên dữ liệu thực của bạn. Chúng tôi cùng xác định chỉ số thành công trước khi viết bất kỳ dòng code nào. Nếu không thể chứng minh cải thiện đo được trong giai đoạn pilot, chúng tôi hoàn tiền 100% phí pilot — không cần giải thích.'}</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        {[
                            { en: '6-week pilot window', vi: '6 tuần thử nghiệm' },
                            { en: 'Signed SLA before start', vi: 'Ký SLA trước khi bắt đầu' },
                            { en: '100% refund if no results', vi: 'Hoàn tiền 100% nếu không có kết quả' },
                            { en: '12-month support included', vi: 'Bao gồm hỗ trợ 12 tháng' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-3 text-sm text-slate-300">
                                <svg className="w-4 h-4 text-emerald-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                                {language === 'en' ? item.en : item.vi}
                            </div>
                        ))}
                    </div>
                </div>
            </GlassCard>

            <div className="text-center">
                <MonoLabel className="justify-center mb-2 text-slate-500">{language === 'en' ? 'CLOUD & INFRASTRUCTURE PARTNERS' : 'ĐỐI TÁC HẠ TẦNG & CÔNG NGHỆ'}</MonoLabel>
                <p className="text-xs text-slate-600 mb-8 font-mono">{language === 'en' ? '// Platforms we build and deploy on' : '// Nền tảng chúng tôi xây dựng và triển khai'}</p>
                <div className="flex flex-wrap justify-center gap-4">
                    {PARTNERS_CONTENT.map((partner, idx) => (
                        <div key={idx} className="group px-6 py-3 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/10 hover:border-primary-DEFAULT/30 transition-all cursor-default flex items-center gap-3 backdrop-blur-sm shadow-inner-light">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-primary-DEFAULT transition-colors shadow-[0_0_5px_currentColor]"></span>
                            <span className="text-xs font-bold text-slate-400 group-hover:text-white uppercase tracking-wider transition-colors">{partner.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
  };

  const ContactView = () => {
      const infoList = language === 'en' ? CONTACT_CONTENT.en.info : CONTACT_CONTENT.vi.info;
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = {
          name: (form.elements.namedItem('name') as HTMLInputElement).value,
          email: (form.elements.namedItem('email') as HTMLInputElement).value,
          message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
        };
        const res = await BackendService.contact.submitForm(formData, language);
        if (res.success && res.message) {
          // Use a hidden anchor click instead of window.location.href to avoid
          // a full-page reload/navigation-away on mobile browsers when opening
          // a mailto: link.
          const a = document.createElement('a');
          a.href = res.message;
          a.target = '_blank';
          a.rel = 'noopener noreferrer';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          form.reset();
        }
      };
      return (
        <SectionContainer>
            <SectionHeading title={language === 'en' ? CONTACT_CONTENT.en.title : CONTACT_CONTENT.vi.title} subtitle={TEXTS[language].commLink} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                <GlassCard className="p-8 h-full flex flex-col justify-between relative overflow-hidden" hoverEffect={false}>
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-blue-500 to-transparent"></div>
                    <div>
                        <div className="flex justify-between items-center mb-8">
                            <h3 className="text-2xl font-bold text-slate-900 dark:text-white font-display">{TEXTS[language].sendMessageTitle}</h3>
                            <div className="px-3 py-1 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-2 animate-pulse"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>{language === 'en' ? 'Secure Channel' : 'Kênh Bảo Mật'}</div>
                        </div>
                        <form className="space-y-8" onSubmit={handleSubmit}>
                            <div className="group/field relative">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 transition-colors group-focus-within/field:text-cyan-400">{TEXTS[language].name}</label>
                                <input name="name" type="text" className="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 py-3 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm" placeholder={TEXTS[language].namePlaceholder} required />
                                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/field:w-full"></div>
                            </div>
                            <div className="group/field relative">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 transition-colors group-focus-within/field:text-cyan-400">{TEXTS[language].email}</label>
                                <input name="email" type="email" className="w-full bg-transparent border-b border-slate-300 dark:border-slate-600 py-3 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm" placeholder="email@company.com" required />
                                <div className="absolute bottom-0 left-0 h-px w-0 bg-cyan-500 transition-all duration-500 group-focus-within/field:w-full"></div>
                            </div>
                            <div className="group/field relative">
                                <label className="block text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 mb-2 transition-colors group-focus-within/field:text-cyan-400">{TEXTS[language].message}</label>
                                <textarea name="message" rows={4} className="w-full bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-200 dark:border-white/10 p-4 text-slate-900 dark:text-white focus:border-cyan-500 focus:outline-none transition-all placeholder-slate-400 dark:placeholder-slate-600 font-mono text-sm resize-none" placeholder="..." required></textarea>
                            </div>
                            <NeonButton variant="primary" fullWidth type="submit">{TEXTS[language].sendBtn}</NeonButton>
                        </form>
                    </div>
                    <div className="mt-8 pt-6 border-t border-slate-200 dark:border-white/10 space-y-3">
                        <div className="flex items-start gap-3 text-xs text-slate-400">
                            <svg className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            <span>{language === 'en' ? CONTACT_CONTENT.en.responseTime : CONTACT_CONTENT.vi.responseTime}</span>
                        </div>
                        <div className="flex items-start gap-3 text-[10px] text-slate-500 font-mono">
                            <svg className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                            <span>{language === 'en' ? CONTACT_CONTENT.en.registrationNote : CONTACT_CONTENT.vi.registrationNote}</span>
                        </div>
                    </div>
                </GlassCard>
                <div className="space-y-8 flex flex-col h-full">
                    <div className="grid grid-cols-1 gap-0 bg-slate-50 dark:bg-[#0a0a0c] border border-slate-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-inner-light">
                        {infoList.map((info, i) => (
                            <div key={i} className="group p-5 flex items-start gap-5 border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-100 dark:hover:bg-white/[0.02] transition-colors relative cursor-default">
                                <div className="absolute left-0 top-0 bottom-0 w-1 bg-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                <div className="w-10 h-10 rounded bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/30 transition-all shrink-0">
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d={info.icon} /></svg>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[9px] font-mono font-bold uppercase tracking-widest text-slate-500 mb-1">{info.label}</div>
                                    <div className="text-sm text-slate-900 dark:text-white font-medium break-words leading-relaxed">{info.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="flex-1 min-h-[300px] w-full rounded-2xl overflow-hidden border border-cyan-500/20 relative group shadow-[0_0_30px_rgba(6,182,212,0.05)]">
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.1)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none z-20"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-cyan-500/5 mix-blend-overlay pointer-events-none z-20"></div>
                        <div className="absolute inset-0 z-20 pointer-events-none overflow-hidden opacity-30"><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent rotate-45 animate-[spin_4s_linear_infinite]"></div></div>
                        <div className="absolute top-4 left-4 z-30 px-3 py-1 bg-black/80 backdrop-blur-md rounded border border-cyan-500/50 text-[10px] font-mono text-cyan-400 uppercase tracking-widest flex items-center gap-2 shadow-lg"><span className="w-2 h-2 bg-cyan-500 rounded-full animate-ping"></span> {language === 'en' ? 'Live Satellite Feed' : 'Vệ Tinh Trực Tuyến'}</div>
                        <iframe src="https://maps.google.com/maps?q=122+B2,+Sala+Urban+Area,+Thu+Duc+City,+Ho+Chi+Minh+City&t=&z=16&ie=UTF8&iwloc=B&output=embed" width="100%" height="100%" style={{ border: 0, filter: theme === 'dark' ? 'invert(100%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' : 'brightness(0.95) contrast(1.1)' }} allowFullScreen={true} loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="SGS Group Location" className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-500"></iframe>
                    </div>
                </div>
            </div>
        </SectionContainer>
      );
  };

  const LegalView = ({ type }: { type: 'privacy' | 'terms' }) => {
    const data = type === 'privacy' ? (language === 'en' ? LEGAL_CONTENT.privacy.en : LEGAL_CONTENT.privacy.vi) : (language === 'en' ? LEGAL_CONTENT.terms.en : LEGAL_CONTENT.terms.vi);
    return (<SectionContainer><GlassCard className="p-6 md:p-12 max-w-4xl mx-auto" hoverEffect={false}><div className="border-b border-surface-border pb-8 mb-8"><MonoLabel className="mb-2">LEGAL DOC_ID #{type === 'privacy' ? '001' : '002'}</MonoLabel><h1 className="text-2xl md:text-4xl font-display font-bold text-slate-900 dark:text-white mb-2">{data.title}</h1><p className="text-slate-500 font-mono text-xs">{data.updated}</p></div><div className="space-y-8 text-slate-700 dark:text-slate-300 leading-relaxed text-sm md:text-base">{data.sections.map((section, i) => (<div key={i}><h3 className="font-bold text-base md:text-lg text-slate-900 dark:text-white mb-3">{section.heading}</h3><p className="opacity-90">{section.content}</p></div>))}</div><div className="mt-12 pt-8 border-t border-surface-border text-center"><NeonButton variant="ghost" onClick={() => setCurrentView('home')}>&larr; {TEXTS[language].backToServices}</NeonButton></div></GlassCard></SectionContainer>);
  };

  return (
    <div className="app-scroll-container bg-white dark:bg-canvas-DEFAULT text-slate-900 dark:text-white font-sans selection:bg-primary-DEFAULT/30 selection:text-white transition-colors duration-500 flex flex-col min-h-screen">
      <SEO currentView={currentView} language={language} />
      <BackgroundSystem theme={theme} />
      <NavBar currentView={currentView} setCurrentView={setCurrentView} language={language} setLanguage={setLanguage} theme={theme} setTheme={setTheme} />
      
      <main className="relative pt-16 flex flex-col">
        {currentView === 'home' && <HomeView />}
        {currentView === 'services' && <ServicesView />}
        {currentView === 'service-detail' && <ServiceDetailView />}
        {currentView === 'ai-hub' && (<div className="flex flex-col pt-4 md:pt-8 px-2 md:px-4 pb-4" style={{ minHeight: 'calc(100dvh - 64px)' }}><AiHub language={language} initialMessage={aiInitialMessage} onInitialMessageSent={() => setAiInitialMessage(null)} /></div>)}
        {currentView === 'about' && <AboutView />}
        {currentView === 'contact' && <ContactView />}
        {(currentView === 'privacy' || currentView === 'terms') && <LegalView type={currentView as any} />}
      </main>
      <Footer language={language} currentView={currentView} setCurrentView={setCurrentView} newsletterEmail={newsletterEmail} setNewsletterEmail={setNewsletterEmail} handleNewsletterSubmit={handleNewsletterSubmit} scrollToTop={scrollToTop} />
    </div>
  );
};

export default App;
