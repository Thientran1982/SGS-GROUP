
import React, { useEffect, useRef, useState } from 'react';

interface ScrambleTextProps {
  text: string;
  className?: string;
  scrambleSpeed?: number;
  revealSpeed?: number;
  preserveSpace?: boolean;
}

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

const ScrambleText: React.FC<ScrambleTextProps> = ({ 
  text, 
  className = "", 
  scrambleSpeed = 30,
  revealSpeed = 50,
  preserveSpace = true
}) => {
  const [displayText, setDisplayText] = useState(text);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<any>(null);
  const isMounted = useRef(true);

  useEffect(() => {
    isMounted.current = true;
    let iteration = 0;
    
    clearInterval(intervalRef.current);
    setIsComplete(false);

    intervalRef.current = setInterval(() => {
      if (!isMounted.current) return;

      const scrambled = text
        .split("")
        .map((char, index) => {
          if (char === ' ') return ' '; // Always preserve spaces
          if (index < iteration) {
            return char;
          }
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplayText(scrambled);

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setIsComplete(true);
      }

      iteration += 1 / 3; 
    }, scrambleSpeed);

    return () => {
      isMounted.current = false;
      clearInterval(intervalRef.current);
    };
  }, [text, scrambleSpeed]);

  return (
    <span className={`${className} inline-block whitespace-pre-wrap ${isComplete ? 'text-inherit' : 'text-slate-500 dark:text-slate-400'}`}>
      {displayText}
      {/* Smart Cursor: Hides when complete */}
      {!isComplete && (
          <span className="inline-block w-[0.5em] h-[1em] bg-cyan-500 ml-0.5 align-middle animate-pulse"></span>
      )}
    </span>
  );
};

export default ScrambleText;
