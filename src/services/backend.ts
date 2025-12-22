
import { ChatSession, SystemStatus, Language } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'sgs_chat_history';
const ADMIN_EMAIL = 'info@sgsgroup.vn'; // Centralized Configuration

// --- SECURITY UTILS ---
const sanitizeInput = (text: string): string => {
  if (!text) return "";
  let clean = text.trim();
  // Strip HTML
  clean = clean.replace(/<[^>]*>?/gm, '');
  // Limit length
  if (clean.length > 5000) clean = clean.substring(0, 5000);
  return clean;
};

// --- SAFE STORAGE WRAPPER ---
// Handles Private Mode (SecurityError) and Full Storage (QuotaExceededError)
class SafeStorage {
    private memoryStorage: Record<string, string> = {};
    private isAvailable: boolean = false;

    constructor() {
        this.isAvailable = this.checkAvailability();
    }

    private checkAvailability(): boolean {
        try {
            const test = '__sgs_storage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            console.warn("Storage warning: Running in volatile memory mode (Private Browsing or Restricted).");
            return false;
        }
    }

    getItem(key: string): string | null {
        if (this.isAvailable) {
            try {
                return localStorage.getItem(key);
            } catch {
                return null;
            }
        }
        return this.memoryStorage[key] || null;
    }

    setItem(key: string, value: string): boolean {
        if (this.isAvailable) {
            try {
                localStorage.setItem(key, value);
                return true;
            } catch (e: any) {
                // Handle QuotaExceededError
                if (e.name === 'QuotaExceededError' || e.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
                    console.error("Storage Quota Exceeded. Attempting to prune.");
                    return false; // Signal to caller that save failed so they can prune
                }
                return false;
            }
        }
        this.memoryStorage[key] = value;
        return true;
    }

    removeItem(key: string): void {
        if (this.isAvailable) {
            try { localStorage.removeItem(key); } catch {}
        } else {
            delete this.memoryStorage[key];
        }
    }
}

const storage = new SafeStorage();

/**
 * Backend Service Simulation
 */
export const BackendService = {
  
  // --- CHAT MODULE ---
  chat: {
    getAll: async (): Promise<ChatSession[]> => {
      await delay(Math.random() * 200 + 100); 
      
      const saved = storage.getItem(STORAGE_KEY);
      if (!saved) return [];
      try {
        const parsed = JSON.parse(saved);
        return Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn("Corrupted chat history detected, resetting.", e);
        storage.removeItem(STORAGE_KEY); // Self-healing
        return [];
      }
    },

    saveAll: async (sessions: ChatSession[]): Promise<boolean> => {
      // 1. Initial attempt
      let safeSessions = sessions.slice(0, 50); // Hard limit 50
      let json = JSON.stringify(safeSessions);
      
      let success = storage.setItem(STORAGE_KEY, json);

      // 2. If failed (Quota), aggressive prune
      if (!success) {
          console.warn("Retrying save with aggressive pruning...");
          // Keep only top 10 most recent
          safeSessions = sessions.slice(0, 10);
          json = JSON.stringify(safeSessions);
          success = storage.setItem(STORAGE_KEY, json);
      }

      return success;
    },

    delete: async (id: string): Promise<boolean> => {
      await delay(200);
      try {
        const saved = storage.getItem(STORAGE_KEY);
        if (!saved) return false;
        
        let sessions: ChatSession[];
        try {
             sessions = JSON.parse(saved);
        } catch {
             return false;
        }

        const newSessions = sessions.filter(s => s.id !== id);
        return storage.setItem(STORAGE_KEY, JSON.stringify(newSessions));
      } catch {
        return false;
      }
    }
  },

  // --- CONTACT MODULE (MULTI-LANGUAGE SUPPORT) ---
  contact: {
    submitForm: async (data: { name: string; email: string; message: string }, language: Language = 'en'): Promise<{ success: boolean; message: string }> => {
      await delay(800); 
      
      const safeName = sanitizeInput(data.name);
      const safeEmail = sanitizeInput(data.email);
      const safeMessage = sanitizeInput(data.message);

      let subject = "";
      let body = "";

      if (language === 'vi') {
          subject = `[SGS WEBSITE] Liên hệ từ: ${safeName}`;
          body = `THÔNG TIN LIÊN HỆ:\n\n` +
                 `• Họ tên: ${safeName}\n` +
                 `• Email: ${safeEmail}\n\n` +
                 `--------------------------------\n` +
                 `NỘI DUNG:\n\n${safeMessage}\n\n` +
                 `--------------------------------\n` +
                 `Gửi từ hệ thống SGS GROUP Mobile App (Giao diện Tiếng Việt)\n` +
                 `Kiểm tra bảo mật: ĐÃ THÔNG QUA`;
      } else {
          subject = `[SGS WEBSITE] Contact from: ${safeName}`;
          body = `CONTACT DETAILS:\n\n` +
                 `• Name: ${safeName}\n` +
                 `• Email: ${safeEmail}\n\n` +
                 `--------------------------------\n` +
                 `MESSAGE:\n\n${safeMessage}\n\n` +
                 `--------------------------------\n` +
                 `Sent from SGS GROUP Mobile App (English Interface)\n` +
                 `Security Check: PASSED`;
      }

      // Creates a real email draft to the admin
      const mailtoLink = `mailto:${ADMIN_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      return { 
        success: true, 
        message: mailtoLink 
      };
    }
  },

  // --- NEWSLETTER MODULE ---
  newsletter: {
    subscribe: async (email: string): Promise<{ success: boolean; message?: string }> => {
      await delay(500);
      
      const safeEmail = sanitizeInput(email);
      // Strict regex check
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(safeEmail)) {
          console.warn(`[Backend] Invalid email rejected: ${safeEmail}`);
          return { success: false, message: "Invalid email format" };
      }
      
      // Database Simulation (Log only, do NOT open mail client)
      console.log(`[Backend Simulation] New Subscriber: ${safeEmail} -> Added to list for ${ADMIN_EMAIL}`);
      
      return { success: true, message: "Subscribed successfully" };
    }
  },

  // --- SYSTEM STATUS MODULE ---
  system: {
    check: async (): Promise<SystemStatus> => {
      await delay(Math.random() * 500 + 200);
      return {
        status: 'operational',
        latency: Math.floor(Math.random() * 15) + 8, 
        activeNodes: 800 + Math.floor(Math.random() * 100)
      };
    }
  }
};
