import { GoogleGenAI, Chat, GenerateContentResponse, Content } from "@google/genai";
import { Message, Language } from "../types";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getGenAI = () => {
  if (!genAI) {
    genAI = new GoogleGenAI({ apiKey: process.env.API_KEY });
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
  const history = mapMessagesToHistory(previousMessages);
  
  const langInstruction = language === 'vi' ? 'Vietnamese' : 'English';

  chatSession = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: history,
    config: {
      systemInstruction: `You are the advanced AI assistant for SGS GROUP (System for Global Solutions). Act as a professional, concise, and futuristic AI. Respond in ${langInstruction}.`,
    },
  });
  return chatSession;
};

export const resetChat = () => {
  chatSession = null;
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessageToGemini = async function* (message: string, language: Language = 'en') {
  if (!chatSession) {
    startChat([], language);
  }
  
  if (!chatSession) {
     throw new Error("Failed to initialize chat session");
  }

  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
      try {
        const result = await chatSession.sendMessageStream({ message });
        
        for await (const chunk of result) {
            const c = chunk as GenerateContentResponse;
            if (c.text) {
                yield c.text;
            }
        }
        return; 

      } catch (error: any) {
        console.error(`Gemini API Error (Attempt ${attempt + 1}):`, error);
        if (attempt === maxRetries) {
             yield language === 'vi' 
                ? "Kết nối với SGS Mainframe bị gián đoạn." 
                : "Connection to SGS Mainframe interrupted.";
        } else {
             await wait(1000 * Math.pow(2, attempt));
        }
        attempt++;
      }
  }
};