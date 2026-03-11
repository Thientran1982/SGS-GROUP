
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { sendMessageToGemini, startChat, resetChat, generateSpeech } from '../services/geminiService';
import { BackendService } from '../services/backend';
import { Message, Language, ChatSession } from '../types';
import { TEXTS, PHONETIC_MAP, GEMINI_VOICES } from '../constants';

// Add type definition for Web Speech API
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface AiHubProps {
  language: Language;
  initialMessage?: string | null;
  onInitialMessageSent?: () => void;
}

// --- AUDIO UTILITIES ---
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

// --- OPTIMIZED SOUND ENGINE (UI SFX) ---
const soundEngine = {
    ctx: null as AudioContext | null,
    init: () => {
        if (!soundEngine.ctx) {
            const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
            if (AudioContext) {
                soundEngine.ctx = new AudioContext();
            }
        }
    },
    play: (type: 'hover' | 'click' | 'success' | 'error' | 'typing') => {
        if (!soundEngine.ctx) soundEngine.init();
        const ctx = soundEngine.ctx;
        if (!ctx) return;

        if (ctx.state === 'suspended') {
            ctx.resume().catch(() => {});
        }

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);

        const now = ctx.currentTime;

        if (type === 'hover') {
            osc.type = 'sine';
            osc.frequency.setValueAtTime(400, now);
            osc.frequency.exponentialRampToValueAtTime(600, now + 0.05);
            gain.gain.setValueAtTime(0.02, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
            osc.start(now);
            osc.stop(now + 0.05);
        } else if (type === 'click') {
            osc.type = 'square';
            osc.frequency.setValueAtTime(800, now);
            osc.frequency.exponentialRampToValueAtTime(300, now + 0.1);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
            osc.start(now);
            osc.stop(now + 0.1);
        } else if (type === 'success') {
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(440, now);
            osc.frequency.setValueAtTime(880, now + 0.1);
            gain.gain.setValueAtTime(0.03, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.3);
            osc.start(now);
            osc.stop(now + 0.3);
        } else if (type === 'error') {
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);
            osc.frequency.linearRampToValueAtTime(100, now + 0.2);
            gain.gain.setValueAtTime(0.05, now);
            gain.gain.linearRampToValueAtTime(0, now + 0.2);
            osc.start(now);
            osc.stop(now + 0.2);
        } else if (type === 'typing') {
            osc.type = 'sine'; 
            const freq = 600 + Math.random() * 200;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.01, now);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.03);
            osc.start(now);
            osc.stop(now + 0.03);
        }
    }
};

// --- COMPONENT: VOICE WAVEFORM ---
const VoiceWaveform = () => (
  <div className="flex items-center gap-1 h-4 md:h-5 px-2">
    {[...Array(8)].map((_, i) => (
      <div 
        key={i} 
        className="w-0.5 md:w-1 bg-red-500 rounded-full animate-[wave_0.8s_ease-in-out_infinite]"
        style={{ animationDelay: `${i * 0.05}s` }}
      ></div>
    ))}
    <style>{`
      @keyframes wave {
        0%, 100% { height: 20%; opacity: 0.4; }
        50% { height: 100%; opacity: 1; }
      }
    `}</style>
  </div>
);

// --- HELPER: DYNAMIC GREETING ---
const getWelcomeMessage = (lang: Language) => {
    const hour = new Date().getHours();
    let greeting = "";
    if (lang === 'vi') {
        if (hour < 12) greeting = "Chào buổi sáng! ";
        else if (hour < 18) greeting = "Chào buổi chiều! ";
        else greeting = "Chào buổi tối! ";
    } else {
        if (hour < 12) greeting = "Good morning! ";
        else if (hour < 18) greeting = "Good afternoon! ";
        else greeting = "Good evening! ";
    }
    return `${greeting}${TEXTS[lang].aiHubWelcome}`;
};

const AiHub: React.FC<AiHubProps> = ({ language, initialMessage, onInitialMessageSent }) => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isHydrated, setIsHydrated] = useState(false);
  
  // Renaming & UI State
  const [editingSessionId, setEditingSessionId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [deleteConfirmationId, setDeleteConfirmationId] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);

  // --- Voice Chat State ---
  const [isListening, setIsListening] = useState(false);
  const [isSpeakingId, setIsSpeakingId] = useState<string | null>(null);
  const speechRecognitionRef = useRef<any>(null);
  
  // Browser Speech Fallback
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false); 
  
  // Gemini TTS Audio Context
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioSourceRef = useRef<AudioBufferSourceNode | null>(null);
  
  // Voice Settings State
  const [voiceRate, setVoiceRate] = useState(1.0);
  const [voicePitch, setVoicePitch] = useState(1.0);
  // selectedVoiceURI can now store Gemini Voice IDs (Puck, Fenrir...) OR Browser URI
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | null>(null);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);

  const currentSpeakingMsgIdRef = useRef<string | null>(null);
  const speakRequestIdRef = useRef<number>(0); // Prevent overlapping audio calls
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto-welcome tracking
  const hasGreetedRef = useRef(false);

  const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
      setNotification({ message, type });
      if (type === 'error') soundEngine.play('error');
      else if (type === 'success') soundEngine.play('success');
      setTimeout(() => setNotification(null), 3000);
  };

  // --- AUDIO CLEANUP & INIT ---
  useEffect(() => {
      return () => {
          if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
              audioCtxRef.current.close();
          }
          if (window.speechSynthesis) window.speechSynthesis.cancel();
      };
  }, []);

  // --- BROWSER VOICE LOADING ---
  useEffect(() => {
    let intervalId: any;
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
          setAvailableVoices(voices);
          setVoicesLoaded(true);
          if (intervalId) clearInterval(intervalId);
      }
    };
    loadVoices();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
    }
    intervalId = setInterval(loadVoices, 200);
    setTimeout(() => {
        setVoicesLoaded(true);
        if (intervalId) clearInterval(intervalId);
    }, 3000);
    return () => { if (intervalId) clearInterval(intervalId); };
  }, []);

  useEffect(() => {
    const fetchSessions = async () => {
        try {
            const loadedSessions = await BackendService.chat.getAll();
            if (loadedSessions.length > 0) {
                // Normalize content & titles on load
                const processedSessions = loadedSessions.map(s => {
                    let newTitle = s.title;
                    const enTitle = TEXTS.en.defaultChatTitle;
                    const viTitle = TEXTS.vi.defaultChatTitle;
                    if (language === 'vi' && s.title === enTitle) newTitle = viTitle;
                    else if (language === 'en' && s.title === viTitle) newTitle = enTitle;

                    const newMessages = s.messages.map(m => {
                        if (m.id === 'init') return { ...m, text: getWelcomeMessage(language) };
                        if (m.text === TEXTS.en.error || m.text === TEXTS.vi.error) return { ...m, text: TEXTS[language].error };
                        return m;
                    });
                    return { ...s, title: newTitle, messages: newMessages };
                });
                setSessions(processedSessions);
                const recent = processedSessions[0];
                setCurrentSessionId(recent.id);
                setMessages(recent.messages);
                startChat(recent.messages, language);
                hasGreetedRef.current = true;
                setIsHydrated(true);
            } else {
                createNewSession();
            }
        } catch (error) { createNewSession(); }
    };
    fetchSessions();
  }, []); 

  useEffect(() => {
    if (messages.length > 0) startChat(messages, language);
    const enError = TEXTS.en.error;
    const viError = TEXTS.vi.error;
    setMessages(prev => prev.map(msg => {
        if (msg.id === 'init') return { ...msg, text: getWelcomeMessage(language) };
        if (msg.text === enError || msg.text === viError) return { ...msg, text: TEXTS[language].error };
        return msg;
    }));
    const enTitle = TEXTS.en.defaultChatTitle;
    const viTitle = TEXTS.vi.defaultChatTitle;
    setSessions(prev => prev.map(s => {
        if (s.title === enTitle && language === 'vi') return { ...s, title: viTitle };
        if (s.title === viTitle && language === 'en') return { ...s, title: enTitle };
        return s;
    }));
  }, [language]);

  useEffect(() => {
    if (!currentSessionId || sessions.length === 0 || !isHydrated) return;
    setSessions(prevSessions => {
      const currentInState = prevSessions.find(s => s.id === currentSessionId);
      if (currentInState && currentInState.messages.length > 1 && messages.length <= 1 && messages[0]?.id === 'init') return prevSessions;
      const updatedSessions = prevSessions.map(session => {
        if (session.id === currentSessionId) {
          const updatedSession = { ...session, messages };
          const defaultTitleEn = TEXTS.en.defaultChatTitle;
          const defaultTitleVi = TEXTS.vi.defaultChatTitle;
          if ((updatedSession.title === defaultTitleEn || updatedSession.title === defaultTitleVi) && messages.length > 1) {
             const firstUserMsg = messages.find(m => m.role === 'user');
             if (firstUserMsg) updatedSession.title = firstUserMsg.text.slice(0, 24) + (firstUserMsg.text.length > 24 ? '...' : '');
          }
          return updatedSession;
        }
        return session;
      });
      BackendService.chat.saveAll(updatedSessions);
      return updatedSessions;
    });
  }, [messages, currentSessionId, isHydrated]);

  const createNewSession = () => {
    soundEngine.play('click');
    resetChat(); 
    const newId = Date.now().toString();
    const defaultTitle = TEXTS[language].defaultChatTitle;
    const initialMessage: Message = { id: 'init', role: 'model', text: getWelcomeMessage(language) };
    const newSession: ChatSession = { id: newId, title: defaultTitle, messages: [initialMessage], createdAt: Date.now() };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newId);
    setMessages([initialMessage]);
    startChat([initialMessage], language);
    setIsSidebarOpen(false);
    hasGreetedRef.current = false;
    setIsHydrated(true);
  };

  const selectSession = (id: string) => {
    soundEngine.play('click');
    if (editingSessionId) return; 
    const session = sessions.find(s => s.id === id);
    if (session) {
      setCurrentSessionId(id);
      setMessages(session.messages);
      startChat(session.messages, language);
      setIsSidebarOpen(false);
      
      // Stop all audio
      window.speechSynthesis.cancel();
      if (audioSourceRef.current) audioSourceRef.current.stop();
      
      setIsSpeakingId(null);
      currentSpeakingMsgIdRef.current = null;
      hasGreetedRef.current = true;
    }
  };

  const handleManualSave = async () => {
    const success = await BackendService.chat.saveAll(sessions);
    if (success) showNotification(TEXTS[language].sessionSaved, 'success');
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showNotification(TEXTS[language].copied, 'info');
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  const handleResend = (text: string) => {
      handleSend(text);
  };

  const cleanTextForSpeech = useCallback((text: string) => {
    const isVietnamese = language === 'vi';
    let cleaned = text.replace(/```[\s\S]*?```/g, isVietnamese ? '. Chi tiết mã nguồn bên dưới. ' : '. Code details below. ');
    cleaned = cleaned.replace(/`[^`]*`/g, isVietnamese ? ' mã lệnh ' : ' code snippet ');
    cleaned = cleaned.replace(/[*#_~>]/g, ' ');
    cleaned = cleaned.replace(/\[\d+\]/g, '');
    cleaned = cleaned.replace(/\[(.*?)\]\(.*?\)/g, '$1');
    cleaned = cleaned.replace(/https?:\/\/\S+/g, isVietnamese ? ' liên kết ' : ' link ');
    cleaned = cleaned.replace(/^\s*[-*]\s+/gm, ', '); 
    cleaned = cleaned.replace(/^\s*\d+\.\s+/gm, ', ');
    
    // For Browser TTS only: Apply manual phonetic map
    if (isVietnamese && !window.speechSynthesis.paused) { 
        const sortedKeys = Object.keys(PHONETIC_MAP).sort((a, b) => b.length - a.length);
        sortedKeys.forEach(key => {
            const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`\\b${escapedKey}\\b`, 'gi');
            cleaned = cleaned.replace(regex, ` ${PHONETIC_MAP[key]} `);
        });
    }
    return cleaned.replace(/\s+/g, ' ').trim();
  }, [language]);

  const normalizeSpeechInput = useCallback((text: string) => {
    if (language !== 'vi') return text;
    let normalized = text.toLowerCase();
    return normalized.replace(/(^\w|[.?!]\s*\w)/g, c => c.toUpperCase());
  }, [language]);

  // --- UNIFIED SPEAK HANDLER ---
  const handleSpeak = async (text: string, id: string) => {
    // Generate unique ID for this speak request to handle race conditions
    const requestId = ++speakRequestIdRef.current;
    
    soundEngine.play('click');
    
    // STOP Logic
    if (isSpeakingId === id) {
      window.speechSynthesis.cancel();
      if (audioSourceRef.current) {
          try { audioSourceRef.current.stop(); } catch (e) {}
          audioSourceRef.current = null;
      }
      setIsSpeakingId(null);
      currentSpeakingMsgIdRef.current = null;
      return;
    }

    // Stop previous audio immediately
    window.speechSynthesis.cancel();
    if (audioSourceRef.current) {
        try { audioSourceRef.current.stop(); } catch (e) {}
        audioSourceRef.current = null;
    }

    currentSpeakingMsgIdRef.current = id;
    setIsSpeakingId(id);

    // Check if selected voice is a Gemini Voice
    const isGeminiVoice = GEMINI_VOICES.some(v => v.id === selectedVoiceURI);
    const forceGemini = isGeminiVoice ? selectedVoiceURI : undefined;

    // --- STRATEGY 1: GEMINI TTS (High Quality or Forced) ---
    try {
        const pcmData = await generateSpeech(text, language, forceGemini || undefined);
        
        // Race Condition Check: If user clicked something else while waiting, abort.
        if (requestId !== speakRequestIdRef.current) return;
        if (currentSpeakingMsgIdRef.current !== id) return;

        if (pcmData) {
            if (!audioCtxRef.current) {
                const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                audioCtxRef.current = new AudioContext({ sampleRate: 24000 });
            }
            const ctx = audioCtxRef.current;
            
            if (ctx.state === 'suspended') {
                await ctx.resume();
            }

            const audioBuffer = await decodeAudioData(decode(pcmData), ctx, 24000, 1);
            const source = ctx.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(ctx.destination);
            
            source.onended = () => {
                if (currentSpeakingMsgIdRef.current === id) {
                    setIsSpeakingId(null);
                    currentSpeakingMsgIdRef.current = null;
                }
            };
            
            source.start();
            audioSourceRef.current = source;
            return; // Success, skip fallback
        }
    } catch (e) {
        console.warn("Gemini TTS failed, falling back to browser", e);
    }

    // --- STRATEGY 2: BROWSER TTS (Fallback or Explicit Selection) ---
    // If request is still valid after Gemini fail/skip
    if (requestId !== speakRequestIdRef.current) return;
    
    if (!window.speechSynthesis) {
        setIsSpeakingId(null);
        showNotification("TTS not supported", "error");
        return;
    }

    let currentVoices = availableVoices.length > 0 ? availableVoices : window.speechSynthesis.getVoices();
    // If selectedVoiceURI is a browser voice, use it. Otherwise find best match.
    let preferredVoice = !isGeminiVoice && selectedVoiceURI 
        ? currentVoices.find(v => v.voiceURI === selectedVoiceURI) 
        : undefined;

    if (!preferredVoice) {
      if (language === 'vi') {
          // Priority for Vietnamese: Google Tiếng Việt > Microsoft An/Nam > Others
          preferredVoice = currentVoices.find(v => v.name.includes("Google Tiếng Việt")) ||
                           currentVoices.find(v => v.name.includes("Linh")) || 
                           currentVoices.find(v => v.name.includes("An")) ||
                           currentVoices.find(v => v.lang.toLowerCase().includes('vi')) ||
                           currentVoices[0];
      } else {
          // Priority for English: Microsoft David/Mark > Google US English > Others
          preferredVoice = currentVoices.find(v => v.name.includes("Microsoft David")) ||
                           currentVoices.find(v => v.name.includes("Microsoft Mark")) ||
                           currentVoices.find(v => v.name.includes("Google US English")) ||
                           currentVoices.find(v => v.lang.toLowerCase().includes('en-us')) ||
                           currentVoices[0];
      }
    }

    const cleanedText = cleanTextForSpeech(text);
    const utterance = new SpeechSynthesisUtterance(cleanedText);
    utterance.lang = language === 'vi' ? 'vi-VN' : 'en-US';
    if (preferredVoice) {
        utterance.voice = preferredVoice;
        // Match utterance language to selected voice to avoid silences if mismatch
        utterance.lang = preferredVoice.lang;
    }
    
    if (language === 'vi') {
        utterance.rate = voiceRate * 0.95;
        utterance.pitch = voicePitch * 0.9; 
    } else {
        utterance.rate = voiceRate;
        utterance.pitch = voicePitch;
    }

    utterance.onend = () => { 
        if (currentSpeakingMsgIdRef.current === id) {
            setIsSpeakingId(null); 
            currentSpeakingMsgIdRef.current = null; 
        }
    };
    utterance.onerror = () => { 
        setIsSpeakingId(null); 
        currentSpeakingMsgIdRef.current = null; 
    };
    
    window.speechSynthesis.speak(utterance);
  };

  const startListening = (retryLang?: string) => {
    soundEngine.play('click');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      showNotification(TEXTS[language].speechNotSupported, 'error');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    speechRecognitionRef.current = new SpeechRecognition();
    speechRecognitionRef.current.continuous = false;
    speechRecognitionRef.current.interimResults = true;
    speechRecognitionRef.current.lang = retryLang || (language === 'vi' ? 'vi-VN' : 'en-US');

    speechRecognitionRef.current.onstart = () => setIsListening(true);
    speechRecognitionRef.current.onend = () => setIsListening(false);
    speechRecognitionRef.current.onerror = (event: any) => {
        if (event.error === 'language-not-supported' && !retryLang) {
             startListening(language === 'vi' ? 'vi' : 'en');
             return;
        }
        if (event.error !== 'no-speech') setIsListening(false);
    };

    speechRecognitionRef.current.onresult = (event: any) => {
      let finalTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) finalTranscript += event.results[i][0].transcript;
      }
      if (finalTranscript) {
          const processed = normalizeSpeechInput(finalTranscript);
          setInputValue(processed);
          setTimeout(() => handleSend(processed, true), 800);
      }
    };
    try { speechRecognitionRef.current.start(); } catch (e) { setIsListening(false); }
  };

  const stopListening = () => { if (speechRecognitionRef.current) speechRecognitionRef.current.stop(); };
  const toggleVoice = () => { isListening ? stopListening() : startListening(); };

  const startEditing = (e: React.MouseEvent, session: ChatSession) => { e.stopPropagation(); soundEngine.play('click'); setEditingSessionId(session.id); setEditTitle(session.title); };
  const saveTitle = () => {
    if (editingSessionId) {
      const finalTitle = editTitle.trim() || TEXTS[language].defaultChatTitle;
      const updated = sessions.map(s => s.id === editingSessionId ? { ...s, title: finalTitle } : s);
      setSessions(updated);
      BackendService.chat.saveAll(updated);
      setEditingSessionId(null); setEditTitle(''); soundEngine.play('success');
    }
  };
  const handleRenameKeyDown = (e: React.KeyboardEvent) => { if (e.key === 'Enter') saveTitle(); else if (e.key === 'Escape') { setEditingSessionId(null); setEditTitle(''); } };
  const requestDelete = (e: React.MouseEvent, id: string) => { e.stopPropagation(); soundEngine.play('click'); setDeleteConfirmationId(id); };
  const confirmDelete = async () => {
    if (!deleteConfirmationId) return;
    const newSessions = sessions.filter(s => s.id !== deleteConfirmationId);
    setSessions(newSessions);
    await BackendService.chat.delete(deleteConfirmationId);
    if (deleteConfirmationId === currentSessionId) {
      if (newSessions.length > 0) { setCurrentSessionId(newSessions[0].id); setMessages(newSessions[0].messages); startChat(newSessions[0].messages, language); }
      else createNewSession();
    }
    setDeleteConfirmationId(null); soundEngine.play('click');
  };

  const scrollToBottom = () => {
    if (scrollContainerRef.current) {
        const container = scrollContainerRef.current;
        requestAnimationFrame(() => container.scrollTo({ top: container.scrollHeight, behavior: "smooth" }));
    }
  };
  useEffect(() => scrollToBottom(), [messages, isSidebarOpen]);
  useEffect(() => { if (inputValue.length > 0) soundEngine.play('typing'); }, [inputValue]);

  const handleSend = async (manualText?: string, wasVoiceTriggered: boolean = false) => {
    const textToSend = manualText || inputValue;
    if (!textToSend.trim() || isLoading) return;

    soundEngine.play('success');
    setInputValue('');
    window.speechSynthesis.cancel(); 
    setIsSpeakingId(null); currentSpeakingMsgIdRef.current = null;
    
    const newMessage: Message = { id: Date.now().toString(), role: 'user', text: textToSend };
    setMessages(prev => [...prev, newMessage]);
    setIsLoading(true);

    try {
      const responseId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: responseId, role: 'model', text: '', isStreaming: true }]);
      let fullResponse = "";
      const stream = sendMessageToGemini(textToSend, language);
      for await (const chunk of stream) {
        fullResponse += chunk;
        setMessages(prev => prev.map(msg => msg.id === responseId ? { ...msg, text: fullResponse } : msg));
      }
      setMessages(prev => prev.map(msg => msg.id === responseId ? { ...msg, isStreaming: false } : msg));
      soundEngine.play('success');
      if (wasVoiceTriggered) setTimeout(() => handleSpeak(fullResponse, responseId), 100);
    } catch (error) {
      soundEngine.play('error');
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: TEXTS[language].error }]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage && sessions.length > 0 && !isLoading) {
        handleSend(initialMessage);
        if (onInitialMessageSent) onInitialMessageSent();
    }
  }, [sessions, initialMessage]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const formatDate = (timestamp: number) => new Date(timestamp).toLocaleDateString(language === 'en' ? 'en-US' : 'vi-VN', { month: 'short', day: 'numeric' });

  const renderMessageContent = (text: string) => {
    if (!text) return null;
    // Enhanced Markdown Parser
    // 1. Split Code Blocks
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
            const rawContent = part.slice(3, -3);
            const match = rawContent.match(/^([a-z0-9+\-#]+)\n/i);
            const code = match ? rawContent.slice(match[0].length) : (rawContent.startsWith('\n') ? rawContent.slice(1) : rawContent);
            const lang = match ? match[1] : 'Code';
            return (
                <div key={index} className="my-4 rounded-xl overflow-hidden bg-[#050505] border border-cyan-500/20 shadow-lg relative group/code text-left">
                    <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/5">
                        <span className="text-[10px] font-mono uppercase text-cyan-500 tracking-wider">{TEXTS[language].chatMetadata.module}: {lang}</span>
                    </div>
                    <div className="p-4 overflow-x-auto custom-scrollbar">
                         <pre className="font-mono text-xs md:text-sm leading-6 text-emerald-400 whitespace-pre-wrap [word-break:break-word]"><code>{code}</code></pre>
                    </div>
                    <button onClick={() => handleCopy(code)} className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-400 hover:text-white opacity-0 group-hover/code:opacity-100 transition-opacity"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                </div>
            );
        }
        
        return part.split('\n').map((line, i) => {
            if (line.trim() === '') return <div key={i} className="h-2"></div>;
            
            // --- CLEANUP ARTIFACTS ---
            // Remove markdown headers '#' but keep emphasis
            let processedLine = line.replace(/^#+\s*/, ''); 
            
            // List Handling
            const listMatch = line.match(/^(\s*)([-*]|\d+\.)\s+(.*)/);
            if (listMatch) {
                const isOrdered = /^\d+\./.test(listMatch[2]);
                const content = listMatch[3];
                // Process Bold (**text**) and Italic (*text*)
                const contentParts = content.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((subPart, j) => {
                    if (subPart.startsWith('**') && subPart.endsWith('**')) return <strong key={j} className="font-bold text-cyan-300">{subPart.slice(2, -2)}</strong>;
                    if (subPart.startsWith('*') && subPart.endsWith('*')) return <em key={j} className="italic text-slate-300">{subPart.slice(1, -1)}</em>;
                    return subPart;
                });
                return (
                    <div key={i} className="flex items-start my-1.5 pl-1" style={{ marginLeft: `${listMatch[1].length * 0.5}rem` }}>
                        <span className={`mr-2 mt-[0.4rem] flex-shrink-0 ${isOrdered ? 'text-xs font-mono text-cyan-500 font-bold' : 'w-1.5 h-1.5 bg-cyan-500 rounded-full'}`}>{isOrdered ? listMatch[2] : ''}</span>
                        <span className="leading-7 text-inherit opacity-90">{contentParts}</span>
                    </div>
                );
            }

            // Standard Paragraph Processing
            const lineParts = processedLine.split(/(\*\*.*?\*\*|\*.*?\*)/g).map((subPart, j) => {
                if (subPart.startsWith('**') && subPart.endsWith('**')) return <strong key={j} className="font-bold text-cyan-300">{subPart.slice(2, -2)}</strong>;
                if (subPart.startsWith('*') && subPart.endsWith('*')) return <em key={j} className="italic text-slate-300">{subPart.slice(1, -1)}</em>;
                return subPart;
            });
            
            // Check for Blockquotes
            if (line.startsWith('>')) {
                 return <div key={i} className="border-l-2 border-cyan-500/50 pl-4 py-1 my-2 italic text-slate-400 bg-white/5 rounded-r">{lineParts}</div>;
            }

            return <p key={i} className="mb-2 leading-relaxed text-inherit whitespace-pre-wrap [word-break:break-word] opacity-90">{lineParts}</p>;
        });
    });
  };

  const getFilteredVoices = () => {
    // Return all voices but prioritize current language for sorting if needed
    // This ensures users can see ALL devices voices like "Microsoft David" even if in VI mode
    return availableVoices;
  };

  return (
    <div className="flex flex-col h-[85dvh] md:h-[calc(100vh-12rem)] min-h-[500px] max-h-[800px] w-full max-w-6xl mx-auto mt-4 md:mt-8 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-[#0a0a0c]/95 backdrop-blur-xl border border-white/10 shadow-glass-lg group perspective-1000">
        
        {/* === LAYER 1: TACTILE FRAME === */}
        <div className="absolute inset-0 rounded-[1.5rem] md:rounded-[2rem] shadow-inner-light pointer-events-none z-50">
            <div className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-transparent via-cyan-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
        
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 pointer-events-none mix-blend-overlay z-10"></div>
        
        {/* === HEADER: UPLINK STATUS === */}
        <div className="relative z-20 flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-white/5 bg-[#08090b]/80 backdrop-blur-xl">
            <div className="flex items-center gap-3 md:gap-4">
                 <button onClick={() => { setIsSidebarOpen(!isSidebarOpen); soundEngine.play('click'); }} className="md:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white active:scale-95 transition-all shadow-inner-light">
                    <svg className={`w-5 h-5 transition-transform duration-300 ${isSidebarOpen ? 'rotate-90' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={isSidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
                 </button>
                <div className="flex flex-col justify-center min-h-[32px]">
                    <div className="flex items-center gap-2 md:gap-3">
                        <span className="font-mono font-bold text-xs md:text-sm tracking-[0.1em] md:tracking-[0.15em] text-white uppercase text-shadow-neon whitespace-nowrap">{TEXTS[language].aiCoreTitle}</span>
                        <div className="flex gap-0.5 items-end h-3">
                            <div className="w-1 h-1 bg-cyan-500 rounded-sm animate-[pulse_1s_infinite]"></div>
                            <div className="w-1 h-2 bg-cyan-500 rounded-sm animate-[pulse_1.2s_infinite]"></div>
                            <div className="w-1 h-3 bg-cyan-500 rounded-sm animate-[pulse_1.4s_infinite]"></div>
                        </div>
                    </div>
                    {/* Status Container with Fixed Height to Prevent Layout Shift */}
                    <div className="h-3 flex items-center mt-0.5">
                        {TEXTS[language].aiCoreStatus && (
                            <span className="text-[7px] md:text-[9px] font-mono text-cyan-500/60 tracking-[0.2em] md:tracking-[0.3em] uppercase flex items-center gap-2 whitespace-nowrap animate-fade-in">
                                {TEXTS[language].aiCoreStatus}
                            </span>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center bg-white/5 border border-white/10 rounded-xl p-1 gap-1 shadow-inner-light">
                <button onClick={() => { setShowVoiceSettings(!showVoiceSettings); soundEngine.play('click'); }} className={`p-2 rounded-lg transition-all ${showVoiceSettings ? 'bg-cyan-500/20 text-cyan-300' : 'hover:bg-white/10 text-slate-400 hover:text-white'}`}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" /></svg></button>
                <div className="w-px h-4 bg-white/10"></div>
                <button onClick={handleManualSave} className="p-2 rounded-lg transition-all hover:bg-emerald-500/20 text-emerald-500/70 hover:text-emerald-400"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" /></svg></button>
                <div className="w-px h-4 bg-white/10 hidden md:block"></div>
                <button onClick={createNewSession} className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white font-bold uppercase tracking-wider text-[10px] shadow-[0_0_15px_rgba(6,182,212,0.4)] active:scale-95 transition-all border border-cyan-400/50">
                    <span className="text-lg leading-none mb-0.5">+</span> {TEXTS[language].newChat}
                </button>
                <button onClick={createNewSession} className="md:hidden p-2 rounded-lg bg-cyan-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg></button>
            </div>
        </div>

        {showVoiceSettings && (
            <div className="absolute top-16 right-4 z-40 w-[calc(100vw-32px)] md:w-72 bg-[#0a0a0c]/95 backdrop-blur-xl border border-cyan-500/30 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] p-5 animate-fade-in-down max-h-[80vh] overflow-y-auto custom-scrollbar">
                <div className="flex justify-between items-center mb-6 pb-2 border-b border-white/10">
                    <h3 className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-2"><span className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></span>{TEXTS[language].audioConfig}</h3>
                    <button onClick={() => setShowVoiceSettings(false)} className="text-slate-500 hover:text-white"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="space-y-6">
                    <div>
                        <label className="block text-[10px] font-mono text-slate-400 mb-2 uppercase tracking-wide">{TEXTS[language].selectVoice}</label>
                        <select 
                            value={selectedVoiceURI || ''} 
                            onChange={(e) => setSelectedVoiceURI(e.target.value)} 
                            className="w-full bg-cyan-900/10 border border-cyan-500/30 rounded-lg text-xs p-2.5 text-cyan-300 focus:outline-none focus:border-cyan-500 font-mono hover:bg-cyan-900/20 transition-colors mb-4"
                        >
                            <option value="">{TEXTS[language].autoDetect}</option>
                            <optgroup label={TEXTS[language].geminiVoices}>
                                {GEMINI_VOICES.map((voice) => (
                                    <option key={voice.id} value={voice.id}>{voice.name}</option>
                                ))}
                            </optgroup>
                        </select>
                    </div>
                    <div>
                        <div className="flex justify-between text-[10px] mb-3 font-mono uppercase"><label className="text-slate-400">{TEXTS[language].tempo}</label><span className="text-cyan-400 font-bold">{voiceRate.toFixed(1)}x</span></div>
                        <div className="relative h-8 flex items-center select-none group/slider">
                            <div className="absolute inset-x-0 h-1 bg-white/10 rounded-full"><div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-75 ease-out shadow-[0_0_10px_rgba(6,182,212,0.5)]" style={{ width: `${((voiceRate - 0.5) / 1.5) * 100}%` }}></div></div>
                            <input type="range" min="0.5" max="2" step="0.1" value={voiceRate} onChange={(e) => setVoiceRate(parseFloat(e.target.value))} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20 m-0 p-0" />
                            <div className="absolute top-1/2 -translate-y-1/2 h-5 w-5 bg-[#020408] border-2 border-cyan-500 rounded-full shadow-[0_0_15px_cyan] z-10 pointer-events-none transition-all duration-75" style={{ left: `calc(${((voiceRate - 0.5) / 1.5) * 100}% - 10px)` }}></div>
                        </div>
                    </div>
                </div>
            </div>
        )}

        <div className="flex flex-1 overflow-hidden relative z-10">
            {/* Sidebar - MEMORY BANKS */}
            <div className={`absolute md:relative z-30 inset-y-0 left-0 w-full sm:w-72 transform transition-transform duration-500 bg-[#08090b]/95 backdrop-blur-xl border-r border-white/5 flex flex-col shadow-2xl md:shadow-none ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="md:hidden flex justify-between items-center p-4 border-b border-white/10">
                    <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">{TEXTS[language].history}</span>
                    <button onClick={() => setIsSidebarOpen(false)} className="p-2 text-slate-400 hover:text-white border border-white/10 rounded-lg shadow-inner-light"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg></button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
                    <h3 className="hidden md:flex px-2 text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 mb-4 mt-2 items-center gap-2">{TEXTS[language].memoryLogs}<span className="flex-grow h-px bg-white/5"></span></h3>
                    {sessions.map(session => (
                      <div key={session.id} onMouseEnter={() => soundEngine.play('hover')} onClick={() => selectSession(session.id)} className={`group relative flex items-center justify-between p-3.5 rounded border-l-2 cursor-pointer transition-all duration-200 ${currentSessionId === session.id ? 'bg-cyan-900/10 border-cyan-500 shadow-[inset_10px_0_20px_-10px_rgba(6,182,212,0.1)]' : 'border-transparent hover:bg-white/5 hover:border-white/20'}`}>
                         <div className="flex-1 min-w-0 pr-2 pl-2">
                            {editingSessionId === session.id ? (
                                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} onBlur={saveTitle} onKeyDown={handleRenameKeyDown} autoFocus onClick={(e) => e.stopPropagation()} className="w-full bg-transparent border-b border-cyan-500 text-sm font-mono text-white focus:outline-none" />
                            ) : (
                                <>
                                    <div className={`text-xs font-medium truncate font-mono ${currentSessionId === session.id ? 'text-cyan-300' : 'text-slate-400 group-hover:text-slate-200'}`}>{session.title}</div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className={`w-1.5 h-1.5 rounded-sm ${currentSessionId === session.id ? 'bg-cyan-400 shadow-[0_0_5px_cyan]' : 'bg-slate-700'}`}></div>
                                        <div className="text-[9px] text-slate-600 group-hover:text-slate-500 uppercase tracking-wider">{formatDate(session.createdAt)}</div>
                                        {currentSessionId === session.id && <span className="text-[8px] text-cyan-500 animate-pulse">{language === 'en' ? 'READING' : 'ĐANG ĐỌC'}</span>}
                                    </div>
                                </>
                            )}
                         </div>
                         <div className={`flex items-center gap-1 opacity-0 group-hover:opacity-100 ${currentSessionId === session.id ? 'opacity-100' : ''}`}>
                             <button onClick={(e) => startEditing(e, session)} className="p-1.5 text-slate-500 hover:text-cyan-400 rounded-md hover:bg-white/5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg></button>
                             <button onClick={(e) => requestDelete(e, session.id)} className="p-1.5 text-slate-500 hover:text-red-500 rounded-md hover:bg-white/5"><svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                         </div>
                      </div>
                    ))}
                </div>
            </div>
            {isSidebarOpen && <div className="absolute inset-0 z-20 bg-black/60 backdrop-blur-sm md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}

            <div className="flex-1 flex flex-col relative z-10">
                <div ref={scrollContainerRef} className="flex-1 overflow-y-auto p-3 md:p-8 space-y-6 md:space-y-8 scroll-smooth custom-scrollbar relative">
                    <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center transition-opacity duration-1000 ${messages.length > 1 ? 'opacity-0 pointer-events-none' : 'opacity-40 pointer-events-none select-none'}`}>
                        <div className="relative w-48 h-48 mb-6">
                            <div className="absolute inset-0 rounded-full border border-cyan-500/20 border-dashed animate-[spin_20s_linear_infinite]"></div>
                            <div className="absolute inset-8 rounded-full border border-blue-500/20 border-dotted animate-[spin_15s_linear_infinite_reverse]"></div>
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 rounded-full blur-xl animate-pulse"></div>
                        </div>
                        <div className="flex flex-col items-center gap-2 text-center h-4">
                            {TEXTS[language].neuralCoreOnline && (
                                <span className="text-[10px] font-mono text-cyan-500 tracking-[0.5em] uppercase animate-pulse whitespace-nowrap animate-fade-in">
                                    {TEXTS[language].neuralCoreOnline}
                                </span>
                            )}
                        </div>
                    </div>

                    {messages.map((msg) => (
                        <div key={msg.id} className={`flex flex-col animate-fade-in-up ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                           <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} max-w-full`}>
                                {msg.role === 'model' && (
                                    <div className="hidden md:flex w-8 h-8 rounded border border-cyan-500/30 items-center justify-center mr-4 bg-cyan-900/10 flex-shrink-0 relative group/avatar mt-1 shadow-inner-light">
                                        <div className="absolute inset-0 bg-cyan-400 blur-sm opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                                        <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 text-cyan-400">
                                            <path d="M12 2.5L20.66 7.5V17.5L12 22.5L3.34 17.5V7.5L12 2.5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-80" />
                                            <path d="M12 12.5L12 22.5 M12 12.5L3.34 7.5 M12 12.5L20.66 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60" />
                                            <circle cx="12" cy="12.5" r="2.5" fill="currentColor" className={`${msg.isStreaming ? 'animate-pulse text-cyan-200' : 'text-cyan-500'}`} />
                                        </svg>
                                    </div>
                                )}
                                <div className={`relative w-fit max-w-[85%] md:max-w-[80%] px-5 py-3 md:px-6 md:py-4 text-sm md:text-base transition-all duration-300 border backdrop-blur-md shadow-lg ${
                                    msg.role === 'user' 
                                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-l-2xl rounded-tr-2xl border-blue-400/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]' 
                                        : 'bg-[#0a0a0c]/60 text-slate-200 border-white/10 rounded-r-2xl rounded-tl-2xl shadow-inner-light bg-[size:20px_20px] bg-grid-pattern'
                                } ${isSpeakingId === msg.id ? 'ring-1 ring-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-[1.01]' : ''}`}>
                                    {msg.role === 'model' && <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none rounded-r-2xl rounded-tl-2xl"></div>}
                                    {renderMessageContent(msg.text)}
                                    {msg.isStreaming && (
                                        <div className="inline-block w-1.5 h-4 bg-cyan-500 ml-1 align-middle animate-pulse shadow-[0_0_10px_cyan]"></div>
                                    )}
                                </div>
                            </div>
                            <div className={`flex items-center gap-2 mt-2 transition-opacity duration-300 ${msg.role === 'user' ? 'mr-4 md:mr-6 justify-end' : 'ml-4 md:ml-16'} opacity-100 md:opacity-0 group-hover:opacity-100`}>
                                {msg.role === 'user' && (
                                    <button onClick={() => handleResend(msg.text)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 shadow-inner-light backdrop-blur-sm" title="Resend">
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                                    </button>
                                )}
                                <button onClick={() => handleCopy(msg.text)} className="p-1.5 rounded-lg bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 shadow-inner-light backdrop-blur-sm" title={TEXTS[language].copy}>
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                                </button>
                                {msg.role === 'model' && !msg.isStreaming && (
                                    <button onClick={() => handleSpeak(msg.text, msg.id)} className={`p-1.5 rounded-lg border border-white/10 shadow-inner-light backdrop-blur-sm transition-all ${isSpeakingId === msg.id ? 'bg-cyan-500 text-white shadow-[0_0_15px_cyan]' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`}>
                                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">{isSpeakingId === msg.id ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z M9 10a1 1 0 011-1h4a1 1 0 01-1 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" /> : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />}</svg>
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-3 md:p-6 bg-[#050507]/90 backdrop-blur-md border-t border-cyan-500/20 relative z-20 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
                    {isLoading && (
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex items-center gap-2 px-3 md:px-4 py-0.5 md:py-1 rounded-full bg-[#0a0a0c] border border-cyan-500/30 shadow-[0_0_15px_rgba(6,182,212,0.2)] z-30 animate-fade-in-up">
                             <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping"></div>
                             <span className="text-[8px] md:text-[9px] font-mono font-bold text-slate-300 uppercase tracking-widest">{TEXTS[language].processingData}</span>
                        </div>
                    )}

                    <div className="relative max-w-4xl mx-auto pt-2">
                        <div className="relative group/input">
                            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500/30 to-blue-500/30 rounded-t-xl opacity-0 group-focus-within/input:opacity-100 transition-opacity duration-500 blur-lg"></div>
                            
                            <div className="relative flex items-end bg-[#0a0a0c] border border-white/10 group-focus-within/input:border-cyan-500/50 rounded-t-xl rounded-b-lg p-2 shadow-inner-light transition-all duration-300">
                                <div className={`w-1.5 h-8 mr-2 rounded-full transition-colors duration-300 ${isLoading ? 'bg-amber-500 animate-pulse' : 'bg-cyan-500'}`}></div>

                                <div className="flex-1 flex items-center min-w-0 bg-[#050505] rounded-lg border border-white/5 focus-within:border-cyan-500/30 px-3 transition-colors">
                                    {isListening ? (
                                        <div className="flex-1 flex items-center justify-center overflow-hidden h-11">
                                            <VoiceWaveform />
                                            <span className="text-xs font-mono text-red-400 animate-pulse ml-3 whitespace-nowrap">{TEXTS[language].listening}</span>
                                        </div>
                                    ) : (
                                        <textarea 
                                            value={inputValue} 
                                            onChange={(e) => {
                                                setInputValue(e.target.value);
                                                e.target.style.height = 'auto';
                                                e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                                            }}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter' && !e.shiftKey) {
                                                    e.preventDefault();
                                                    handleSend();
                                                }
                                            }}
                                            placeholder={TEXTS[language].placeholder} 
                                            className="flex-1 bg-transparent border-none text-white placeholder-slate-600 focus:outline-none text-sm md:text-base font-mono tracking-wide min-w-0 resize-none overflow-y-auto py-2.5 custom-scrollbar leading-relaxed" 
                                            disabled={isLoading} 
                                            autoFocus
                                            rows={1}
                                            style={{ height: '44px' }}
                                        />
                                    )}
                                </div>

                                <div className="flex items-center gap-2 pl-2 h-11 self-end">
                                    <button 
                                        onClick={toggleVoice} 
                                        className={`h-11 w-11 rounded-lg flex items-center justify-center transition-all duration-200 border relative overflow-hidden group/mic ${
                                            isListening 
                                                ? 'bg-red-500/10 border-red-500 text-red-500 shadow-[0_0_15px_rgba(239,68,68,0.4)]' 
                                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:border-white/30'
                                        }`}
                                        title={language === 'en' ? "Voice Input" : "Nhập Giọng Nói"}
                                    >
                                         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 relative z-10"><path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" /></svg>
                                    </button>

                                    <button 
                                        onClick={() => handleSend()} 
                                        disabled={isLoading || (!inputValue.trim() && !isListening)} 
                                        className="h-11 px-6 rounded-lg bg-white hover:bg-slate-200 text-black font-bold text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(255,255,255,0.2)] disabled:opacity-50 disabled:shadow-none disabled:bg-slate-800 disabled:text-slate-600 transition-all active:scale-95 flex items-center justify-center group/send border-b-4 border-slate-300 hover:border-slate-400 active:border-b-0 active:translate-y-1"
                                        title={TEXTS[language].sendBtn}
                                    >
                                        {isLoading ? (
                                            <div className="w-4 h-4 border-2 border-t-transparent border-black rounded-full animate-spin"></div>
                                        ) : (
                                            TEXTS[language].sendBtn
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {notification && (
            <div className={`absolute top-24 left-1/2 -translate-x-1/2 z-50 px-5 py-2.5 backdrop-blur-md text-xs font-bold font-mono rounded-lg shadow-lg flex items-center gap-3 animate-fade-in-down border ${notification.type === 'error' ? 'bg-red-900/90 text-red-100 border-red-500/50 shadow-[0_0_20px_rgba(220,38,38,0.3)]' : notification.type === 'info' ? 'bg-blue-900/90 text-blue-100 border-blue-500/50 shadow-[0_0_20px_rgba(37,99,235,0.3)]' : 'bg-emerald-900/90 text-emerald-100 border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.3)]'}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${notification.type === 'error' ? 'bg-red-500' : notification.type === 'info' ? 'bg-blue-500' : 'bg-emerald-500'}`}></div>
                {notification.message}
            </div>
        )}

        {deleteConfirmationId && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                <div className="bg-[#0f1115] border border-red-500/30 rounded-2xl p-6 w-full max-w-sm shadow-[0_0_40px_rgba(220,38,38,0.2)] relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
                    <h3 className="text-lg font-bold text-white mb-2 font-mono uppercase tracking-wider text-red-500 flex items-center gap-2"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>{TEXTS[language].deleteChat}</h3>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">{TEXTS[language].deleteConfirmation}</p>
                    <div className="flex justify-end gap-3"><button onClick={() => setDeleteConfirmationId(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-colors uppercase tracking-wide border border-transparent">{TEXTS[language].cancel}</button><button onClick={confirmDelete} className="px-4 py-2 rounded-lg text-sm font-bold bg-red-600/20 border border-red-600/50 text-red-400 hover:bg-red-600 hover:text-white shadow-lg transition-all uppercase tracking-wide">{TEXTS[language].delete}</button></div>
                </div>
            </div>
        )}
    </div>
  );
};

export default AiHub;
