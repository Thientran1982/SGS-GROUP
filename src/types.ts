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
    inputALabelEn: string;
    inputALabelVi: string;
    inputAUnit: string;
    inputAMax: number;
    inputAStep: number;
    inputADefault: number;

    inputBLabelEn: string;
    inputBLabelVi: string;
    inputBUnit: string;
    inputBMax: number;
    inputBStep: number;
    inputBDefault: number;

    efficiencyFactor: number;
    currency: string;

    badgeLabelEn?: string;
    badgeLabelVi?: string;
}

export interface ServiceItem {
  id: string;
  titleEn: string;
  titleVi: string;
  descEn: string;
  descVi: string;
  icon: string;
  deployTimeEn?: string;
  deployTimeVi?: string;
  techStack?: string[];
  longDescEn: string;
  longDescVi: string;
  featuresEn: string[];
  featuresVi: string[];
  benefitsEn: string[];
  benefitsVi: string[];
  useCases: UseCase[];
  roiConfig?: RoiConfig;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
}

export interface SystemStatus {
  status: 'operational' | 'degraded' | 'maintenance' | 'initializing';
  latency: number;
  activeNodes: number;
}
