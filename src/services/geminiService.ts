
import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import { Message, Language } from "../types";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

// --- CRITICAL SYSTEM UPDATE v2.5: SAFE ENVIRONMENT ACCESS ---
const getApiKey = (): string => {
  try {
    // 1. Priority: Vite / Modern Bundlers
    // @ts-ignore
    if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_API_KEY) {
      // @ts-ignore
      return import.meta.env.VITE_API_KEY;
    }
    // 2. Fallback: Standard Node/Webpack
    if (typeof process !== 'undefined' && process.env && process.env.API_KEY) {
      return process.env.API_KEY;
    }
    // 3. Fallback: Direct Global Injection
    if (typeof process !== 'undefined' && (process as any).env && (process as any).env.API_KEY) {
        return (process as any).env.API_KEY;
    }
  } catch (e) {
    console.warn("SGS System: Environment access restricted. Running in offline simulation mode.", e);
  }
  return ""; 
};

const getGenAI = () => {
  if (!genAI) {
    const key = getApiKey();
    if (!key) {
        console.error("SGS SECURITY ALERT: API KEY NOT FOUND. AI CORE OFFLINE.");
        return null;
    }
    genAI = new GoogleGenAI({ apiKey: key });
  }
  return genAI;
};

const mapMessagesToHistory = (messages: Message[]): Content[] => {
  return messages
    .filter(m => !m.isStreaming && m.text.trim() !== "" && m.id !== 'init')
    .map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
};

export const startChat = (previousMessages: Message[] = [], language: Language = 'en') => {
  const ai = getGenAI();
  
  if (!ai) {
      return null;
  }

  const history = mapMessagesToHistory(previousMessages);
  const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';

  try {
      chatSession = ai.chats.create({
        model: 'gemini-3-pro-preview', // Upgraded to 3.0 Pro for maximum intelligence
        history: history,
        config: {
          systemInstruction: `You are SGS AI v8.0, the advanced intelligence core for SGS GROUP. 
          Mission: Assist users with technology, code, and business automation.
          Tone: Professional, Futuristic, Concise.
          Language: Respond strictly in ${langInstruction}.`,
        },
      });
      return chatSession;
  } catch (err) {
      console.error("SGS System: Failed to initialize Neural Link", err);
      return null;
  }
};

export const resetChat = () => {
  chatSession = null;
};

// --- TTS SERVICE (GEMINI 2.5) ---
export const generateSpeech = async (text: string, language: Language = 'en', preferredVoice?: string): Promise<string | null> => {
  const ai = getGenAI();
  if (!ai) return null;

  try {
    let speechConfig: any;

    // --- SINGLE SPEAKER CONFIGURATION ---
    // Priority: Preferred Voice > Adaptive Default
    let voiceName = preferredVoice;
    if (!voiceName) {
            voiceName = language === 'vi' ? 'Zephyr' : 'Fenrir';
    }

    speechConfig = {
        voiceConfig: {
            prebuiltVoiceConfig: {
                voiceName: voiceName
            }
        }
    };

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: {
        parts: [{
          text: `
          Style: ${language === 'vi' ? 'Đọc như một người Việt Nam đang trò chuyện tự nhiên, giọng ấm áp.' : 'Professional Tech Podcast Host style.'}
          ${language === 'vi' ? 'Các từ viết tắt (AI, API, CEO) đọc từng chữ cái: A-I, A-P-I, C-E-O.' : ''}
          
          Text: ${text}
        `
        }]
      },
      config: {
        responseModalities: ['AUDIO'],
        speechConfig: speechConfig
      }
    });
    
    // Return base64 PCM data
    return response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data || null;
  } catch (e) {
    console.error("Gemini TTS Generation Failed:", e);
    return null;
  }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessageToGemini = async function* (message: string, language: Language = 'en') {
  if (!chatSession) {
    const session = startChat([], language);
    if (!session) {
        yield language === 'vi' 
            ? "⚠️ CẢNH BÁO HỆ THỐNG: Không tìm thấy khóa bảo mật (API Key). Vui lòng kiểm tra cấu hình .env." 
            : "⚠️ SYSTEM ALERT: Security Key (API Key) not found. Neural Core offline.";
        return;
    }
  }
  
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
      try {
        if (!chatSession) throw new Error("Session lost");
        
        const result = await chatSession.sendMessageStream({ message });
        
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                yield c.text;
            }
        }
        return; 

      } catch (error: any) {
        console.error(`SGS Connection Error (Attempt ${attempt + 1}):`, error);
        
        if (attempt === maxRetries) {
             yield language === 'vi' 
                ? "Mất kết nối với máy chủ SGS. Đang tự động định tuyến lại..." 
                : "Connection to SGS Mainframe lost. Rerouting...";
        } else {
             await wait(1000 * Math.pow(2, attempt));
        }
        attempt++;
      }
  }
};
