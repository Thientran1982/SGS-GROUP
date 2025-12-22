
export type Language = 'vi' | 'en';
export type Theme = 'dark' | 'light';

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  isStreaming?: boolean;
}

export interface NavItem {
  id: string;
  labelEn: string;
  labelVi: string;
}

export interface UseCase {
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  stat: string;
  statLabelEn: string;
  statLabelVi: string;
}

export interface RoiConfig {
    // Variable A (e.g., Number of Employees / Volume)
    inputALabelEn: string;
    inputALabelVi: string;
    inputAUnit: string;
    inputAMax: number;
    inputAStep: number;
    inputADefault: number;

    // Variable B (e.g., Hourly Rate / Cost per Unit)
    inputBLabelEn: string;
    inputBLabelVi: string;
    inputBUnit: string;
    inputBMax: number;
    inputBStep: number;
    inputBDefault: number;

    // Calculation Factors
    efficiencyFactor: number; // e.g., 0.4 for 40% improvement
    currency: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  icon: string;
  // Detailed Content
  longDescEn: string;
  longDescVi: string;
  featuresEn: string[];
  featuresVi: string[];
  benefitsEn: string[];
  benefitsVi: string[];
  useCases: UseCase[];
  roiConfig?: RoiConfig; // Updated for Advanced Calculator
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance';
  latency: number;
  activeNodes: number;
}
