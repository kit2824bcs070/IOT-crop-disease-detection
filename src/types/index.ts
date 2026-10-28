export type TabType =
  | 'dashboard'
  | 'sensors'
  | 'disease'
  | 'risk'
  | 'genai'
  | 'irrigation'
  | 'zones'
  | 'architecture'
  | 'esp32'
  | 'mqtt'
  | 'about';

export interface SensorData {
  temperature: number; // °C
  humidity: number; // %
  soilMoisture: number; // %
  lightIntensity: number; // lux
  leafWetness: number; // %
  leafWetnessStatus: 'LOW' | 'MODERATE' | 'HIGH';
  lastUpdated: string;
}

export interface SensorHistoryPoint {
  time: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  lightIntensity: number;
  leafWetness: number;
}

export interface DiseaseDetectionResult {
  diseaseName: string;
  confidence: number;
  severity: 'Mild' | 'Moderate' | 'Severe';
  affectedArea: number; // percentage
  status: 'Healthy' | 'Infected';
  description: string;
  gradCamAvailable: boolean;
  classProbabilities: {
    name: string;
    probability: number;
  }[];
}

export interface RiskAnalysis {
  diseaseRisk: number; // 0-100
  diseaseRiskStatus: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  cropHealth: number; // 0-100
  cropHealthStatus: 'Critical' | 'Poor' | 'Moderate' | 'Good' | 'Optimal';
  waterStress: number; // 0-100
  heatStress: number; // 0-100
  environmentalRisk: number; // 0-100
}

export interface AlertItem {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  zone: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export interface FarmZone {
  id: string;
  name: string;
  status: 'HEALTHY' | 'WARNING' | 'HIGH RISK';
  crop: string;
  variety: string;
  riskScore: number;
  disease?: string;
  temperature: number;
  humidity: number;
  soilMoisture: number;
  area: string;
  plantsCount: number;
  lastIrrigated: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  language: 'en' | 'ta';
  contextSnippet?: string;
}

export interface MqttPacket {
  id: string;
  topic: string;
  payload: string;
  timestamp: string;
  qos: number;
}

export interface DemoStep {
  step: number;
  title: string;
  description: string;
  targetTab: TabType;
  actionMessage: string;
}
