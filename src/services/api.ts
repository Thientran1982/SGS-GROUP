const API_BASE = '/api';

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  description: string;
  icon: string | null;
  features: string | null;
  isActive: boolean;
  createdAt: string;
}

export interface ChatMessage {
  id: number;
  sessionId: string;
  role: string;
  content: string;
  createdAt: string;
}

export const api = {
  health: async () => {
    const res = await fetch(`${API_BASE}/health`);
    return res.json();
  },

  services: {
    getAll: async (): Promise<Service[]> => {
      const res = await fetch(`${API_BASE}/services`);
      if (!res.ok) throw new Error('Failed to fetch services');
      return res.json();
    },
  },

  contact: {
    submit: async (data: ContactFormData): Promise<{ success: boolean }> => {
      const res = await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Failed to submit contact form');
      return res.json();
    },
  },

  chat: {
    save: async (sessionId: string, role: string, content: string): Promise<ChatMessage> => {
      const res = await fetch(`${API_BASE}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, role, content }),
      });
      if (!res.ok) throw new Error('Failed to save chat message');
      const data = await res.json();
      return data.message;
    },

    getHistory: async (sessionId: string): Promise<ChatMessage[]> => {
      const res = await fetch(`${API_BASE}/chat/${sessionId}`);
      if (!res.ok) throw new Error('Failed to fetch chat history');
      return res.json();
    },
  },
};
