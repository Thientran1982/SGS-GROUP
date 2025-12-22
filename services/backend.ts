import { ChatSession, SystemStatus } from '../types';

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const STORAGE_KEY = 'sgs_chat_history';

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

  // --- CONTACT MODULE ---
  contact: {
    submitForm: async (data: { name: string; email: string; message: string }): Promise<{ success: boolean; message: string }> => {
      await delay(800); 
      
      const safeName = sanitizeInput(data.name);
      const safeEmail = sanitizeInput(data.email);
      const safeMessage = sanitizeInput(data.message);

      const subject = `[SGS WEBSITE] Liên hệ từ: ${safeName}`;
      const body = `THÔNG TIN LIÊN HỆ:\n\n` +
                   `• Họ tên: ${safeName}\n` +
                   `• Email: ${safeEmail}\n\n` +
                   `--------------------------------\n` +
                   `NỘI DUNG:\n\n${safeMessage}\n\n` +
                   `--------------------------------\n` +
                   `Gửi từ hệ thống SGS GROUP Mobile App\n` +
                   `Security Check: PASSED`;

      const mailtoLink = `mailto:info@sgsgroup.vn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
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
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(safeEmail)) {
          return { success: false, message: "Invalid email format" };
      }
      
      const subject = `[SGS WEBSITE] Đăng ký nhận bản tin`;
      const body = `Yêu cầu đăng ký nhận bản tin công nghệ.\n\nEmail đăng ký: ${safeEmail}\n\nThời gian: ${new Date().toLocaleString()}\nSecurity Check: PASSED`;
      
      const mailtoLink = `mailto:info@sgsgroup.vn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      window.location.href = mailtoLink;
      
      return { success: true };
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