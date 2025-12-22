
import React, { useEffect, useState } from 'react';

// --- LOADING SCREEN COMPONENT v8.0 ---
const LoadingScreen: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [text, setText] = useState('INITIALIZING');

    useEffect(() => {
        // Optimized loading sequence
        const duration = 2000; 
        const interval = 20;
        const steps = duration / interval;
        let currentStep = 0;

        const timer = setInterval(() => {
            currentStep++;
            const newProgress = Math.min((currentStep / steps) * 100, 100);
            setProgress(newProgress);

            // Dynamic Status Text
            if (newProgress < 30) setText('LOADING_MODULES');
            else if (newProgress < 60) setText('CONNECTING_NEURAL_NET');
            else if (newProgress < 90) setText('DECRYPTING_DATA');
            else setText('SYSTEM_READY');

            if (currentStep >= steps) {
                clearInterval(timer);
                setTimeout(onComplete, 500); 
            }
        }, interval);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-[#020408] flex items-center justify-center overflow-hidden">
            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(6,182,212,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(6,182,212,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            
            {/* Center Loader */}
            <div className="relative flex flex-col items-center justify-center w-64">
                {/* Hexagon Spinner */}
                <div className="relative w-24 h-24 mb-8">
                    <div className="absolute inset-0 border-t-2 border-l-2 border-cyan-500/30 rounded-full animate-spin"></div>
                    <div className="absolute inset-2 border-r-2 border-b-2 border-blue-500/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xl font-bold font-mono text-white animate-pulse">{Math.round(progress)}%</span>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden relative">
                    <div 
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 transition-all duration-100 ease-out shadow-[0_0_10px_cyan]"
                        style={{ width: `${progress}%` }}
                    ></div>
                </div>

                {/* Status Text */}
                <div className="mt-4 flex flex-col items-center gap-1">
                    <span className="text-xs font-mono font-bold text-cyan-500 tracking-[0.2em] animate-pulse">
                        {text}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500">
                        v8.0.0-CORE
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
