
import { Message, Language } from "../types";

// All Gemini API calls go through the backend to keep the API key server-side only.

let chatHistory: Array<{ role: string; parts: Array<{ text: string }> }> = [];

const mapMessagesToHistory = (messages: Message[]) => {
  return messages
    .filter(m => !m.isStreaming && m.text.trim() !== "" && m.id !== 'init')
    .map(m => ({
      role: m.role,
      parts: [{ text: m.text }]
    }));
};

export const startChat = (previousMessages: Message[] = [], language: Language = 'en') => {
  chatHistory = mapMessagesToHistory(previousMessages);
  return true;
};

export const resetChat = () => {
  chatHistory = [];
};

// --- TTS SERVICE (via backend) ---
export const generateSpeech = async (text: string, language: Language = 'en', preferredVoice?: string): Promise<string | null> => {
  try {
    const res = await fetch('/api/gemini/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, language, voiceName: preferredVoice }),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.audioData || null;
  } catch (e) {
    console.error("Gemini TTS request failed:", e);
    return null;
  }
};

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const sendMessageToGemini = async function* (message: string, language: Language = 'en') {
  const maxRetries = 2;
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: chatHistory, message, language }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let fullResponse = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullResponse += chunk;
        yield chunk;
      }

      // Update local history after successful response
      chatHistory.push({ role: 'user', parts: [{ text: message }] });
      chatHistory.push({ role: 'model', parts: [{ text: fullResponse }] });
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
