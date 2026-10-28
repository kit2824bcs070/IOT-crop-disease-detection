import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  TabType,
  SensorData,
  SensorHistoryPoint,
  DiseaseDetectionResult,
  RiskAnalysis,
  AlertItem,
  FarmZone,
  ChatMessage,
  MqttPacket,
  DemoStep
} from '../types';
import { SAMPLE_LEAVES } from '../utils/leafAssets';
import confetti from 'canvas-confetti';

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Sensors
  sensorData: SensorData;
  sensorHistory: SensorHistoryPoint[];
  isSimulating: boolean;
  toggleSimulation: () => void;
  resetSensorData: () => void;
  updateManualSensor: (type: 'temp' | 'humidity' | 'soil' | 'wetness', value: number) => void;

  // Sliders for Risk Simulation
  sliderTemp: number;
  sliderHumidity: number;
  sliderSoilMoisture: number;
  sliderLeafWetness: number;
  setSliderTemp: (val: number) => void;
  setSliderHumidity: (val: number) => void;
  setSliderSoilMoisture: (val: number) => void;
  setSliderLeafWetness: (val: number) => void;
  resetRiskSliders: () => void;

  // Risk
  riskAnalysis: RiskAnalysis;

  // Disease Detection
  selectedLeafType: string;
  setSelectedLeafType: (type: string) => void;
  customImage: string | null;
  setCustomImage: (img: string | null) => void;
  isAnalyzing: boolean;
  dnnStageIndex: number;
  detectionResult: DiseaseDetectionResult;
  showGradCam: boolean;
  setShowGradCam: (val: boolean) => void;
  runDnnAnalysis: (leafId?: string, customImg?: string) => void;

  // Smart Irrigation
  soilMoistureThreshold: number;
  setSoilMoistureThreshold: (val: number) => void;
  pumpStatus: 'OFF' | 'ON';
  isAutoMode: boolean;
  setIsAutoMode: (val: boolean) => void;
  setPumpStatusManual: (status: 'OFF' | 'ON') => void;
  irrigationLogs: string[];

  // Farm Zones
  zones: FarmZone[];
  selectedZone: FarmZone | null;
  setSelectedZone: (zone: FarmZone | null) => void;

  // Alerts
  alerts: AlertItem[];
  resolveAlert: (id: string) => void;
  addAlert: (alert: Omit<AlertItem, 'id' | 'timestamp' | 'resolved'>) => void;

  // GenAI Chat
  chatMessages: ChatMessage[];
  chatLanguage: 'en' | 'ta';
  setChatLanguage: (lang: 'en' | 'ta') => void;
  isAiTyping: boolean;
  sendMessage: (text: string) => void;

  // MQTT
  mqttPackets: MqttPacket[];
  isMqttLive: boolean;

  // Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  currentDemoStep: number;
  isDemoPlaying: boolean;
  demoSteps: DemoStep[];
  startFullDemo: () => void;
  pauseDemo: () => void;
  resumeDemo: () => void;
  restartDemo: () => void;
  goToDemoStep: (stepNumber: number) => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
}

const INITIAL_SENSORS: SensorData = {
  temperature: 29.4,
  humidity: 82,
  soilMoisture: 67,
  lightIntensity: 540,
  leafWetness: 88,
  leafWetnessStatus: 'HIGH',
  lastUpdated: 'Just now'
};

const INITIAL_ZONES: FarmZone[] = [
  {
    id: 'zone-a',
    name: 'Zone A - South Field',
    status: 'HEALTHY',
    crop: 'Tomato',
    variety: 'Roma VF',
    riskScore: 18,
    temperature: 27.2,
    humidity: 68,
    soilMoisture: 68,
    area: '1.2 Acres',
    plantsCount: 2400,
    lastIrrigated: '2 hours ago'
  },
  {
    id: 'zone-b',
    name: 'Zone B - Greenhouse Polyhouse 2',
    status: 'WARNING',
    crop: 'Tomato',
    variety: 'Beefsteak',
    riskScore: 54,
    disease: 'Rust Risk Increasing',
    temperature: 30.1,
    humidity: 79,
    soilMoisture: 52,
    area: '0.8 Acres',
    plantsCount: 1600,
    lastIrrigated: '5 hours ago'
  },
  {
    id: 'zone-c',
    name: 'Zone C - North Perimeter (Open Field)',
    status: 'HIGH RISK',
    crop: 'Tomato',
    variety: 'Cherry Tomato',
    riskScore: 78,
    disease: 'Early Blight',
    temperature: 29.4,
    humidity: 82,
    soilMoisture: 38,
    area: '1.5 Acres',
    plantsCount: 3100,
    lastIrrigated: '11 hours ago'
  }
];

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: 'alt-1',
    severity: 'critical',
    title: 'Leaf Blight Detected',
    zone: 'Zone C',
    message: 'High confidence Early Blight symptoms identified on tomato foliage. Immediate fungicidal and isolation review suggested.',
    timestamp: '10 mins ago',
    resolved: false
  },
  {
    id: 'alt-2',
    severity: 'warning',
    title: 'Rust Risk Increasing',
    zone: 'Zone B',
    message: 'High humidity (>78%) and persistent leaf wetness create favorable sporulation conditions for fungal pathogens.',
    timestamp: '25 mins ago',
    resolved: false
  },
  {
    id: 'alt-3',
    severity: 'info',
    title: 'Soil Moisture Decreasing',
    zone: 'Zone A',
    message: 'Soil moisture trending downwards at 2.4%/hr. ESP32 auto-irrigation threshold monitored.',
    timestamp: '42 mins ago',
    resolved: false
  }
];

export const DEMO_STEPS: DemoStep[] = [
  {
    step: 1,
    title: 'Sensors Start',
    description: 'IoT telemetry feed initialized across DHT22, Soil Moisture, BH1750, and Leaf Wetness sensors.',
    targetTab: 'sensors',
    actionMessage: 'Activating live telemetry generator...'
  },
  {
    step: 2,
    title: 'Sensor Readings Appear',
    description: 'Live sensor readings stream in: Temp 29.4°C, Humidity 82%, Soil Moisture 67%, Leaf Wetness HIGH.',
    targetTab: 'sensors',
    actionMessage: 'Syncing multi-sensor telemetry stream via MQTT...'
  },
  {
    step: 3,
    title: 'Leaf Image Uploaded',
    description: 'Field camera or mobile device captures infected crop canopy leaf sample from Zone C.',
    targetTab: 'disease',
    actionMessage: 'Loading tomato leaf image with characteristic bullseye lesions...'
  },
  {
    step: 4,
    title: 'DNN Processing Starts',
    description: 'EfficientNet-B0 Deep Neural Network pipeline executes preprocessing, normalization, and feature extraction.',
    targetTab: 'disease',
    actionMessage: 'Executing 7-stage simulated tensor inference pipeline...'
  },
  {
    step: 5,
    title: 'Early Blight is Detected',
    description: 'DNN classifies image as Early Blight (Alternaria solani) with 91.3% confidence and moderate severity.',
    targetTab: 'disease',
    actionMessage: 'Outputting multi-class softmax probability distribution...'
  },
  {
    step: 6,
    title: 'Grad-CAM Visualization Appears',
    description: 'Explainable AI Grad-CAM overlay illuminates exact gradient attention regions matching concentric necrotic rings.',
    targetTab: 'disease',
    actionMessage: 'Computing feature map gradients for Explainable AI visual heatmaps...'
  },
  {
    step: 7,
    title: 'Environmental Risk Increases',
    description: 'High humidity (82%) + Leaf Wetness (88%) amplify biological disease spore germination probability.',
    targetTab: 'risk',
    actionMessage: 'Multimodal AI fusion engine cross-references image diagnosis with IoT weather data...'
  },
  {
    step: 8,
    title: 'Disease Risk Becomes 78%',
    description: 'Multimodal Risk Score spikes to 78/100 (HIGH Risk alert state) with Crop Health index at 74/100.',
    targetTab: 'risk',
    actionMessage: 'Risk matrix updated: HIGH fungal vulnerability confirmed.'
  },
  {
    step: 9,
    title: 'Generative AI Recommendation Appears',
    description: 'Generative AI Advisor generates agronomic treatment plan (airflow improvement, organic copper fungicide, overhead water restriction).',
    targetTab: 'genai',
    actionMessage: 'RAG context synthesis complete: Dispatching farmer advisory in English & Tamil...'
  },
  {
    step: 10,
    title: 'Soil Moisture Becomes Low',
    description: 'Simulated drought condition causes soil moisture in root zone to drop below threshold (<40%).',
    targetTab: 'irrigation',
    actionMessage: 'Sensors detect dry root zone (34% moisture). Critical threshold breached.'
  },
  {
    step: 11,
    title: 'ESP32 Decision Appears',
    description: 'Edge microcontroller ESP32 triggers autonomous irrigation logic: `moisture < 40% -> activate GPIO 26`.',
    targetTab: 'irrigation',
    actionMessage: 'ESP32 edge algorithm evaluates rules: Irrigation command authorized.'
  },
  {
    step: 12,
    title: 'Relay Activates',
    description: '5V Optocoupler relay module energizes, closing circuit contacts with tactile feedback.',
    targetTab: 'irrigation',
    actionMessage: 'Relay switch closed: 230V AC pump contactor engaged.'
  },
  {
    step: 13,
    title: 'Water Pump Turns ON',
    description: 'Submersible drip irrigation water pump starts active discharge. Soil moisture begins replenishing.',
    targetTab: 'irrigation',
    actionMessage: 'Automatic irrigation active! Water flowing to Zone C root zone.'
  },
  {
    step: 14,
    title: 'Dashboard Updates',
    description: 'Central farm control center reflects restored system parameters, logged telemetry, and audit trail.',
    targetTab: 'dashboard',
    actionMessage: 'System loop closed: Full end-to-end IoT + AI smart farming review complete!'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Sensors State
  const [sensorData, setSensorData] = useState<SensorData>(INITIAL_SENSORS);
  const [sensorHistory, setSensorHistory] = useState<SensorHistoryPoint[]>(() => {
    // Generate 15 initial history points
    const points: SensorHistoryPoint[] = [];
    const now = new Date();
    for (let i = 14; i >= 0; i--) {
      const t = new Date(now.getTime() - i * 60000);
      points.push({
        time: t.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        temperature: +(28.5 + Math.random() * 1.5).toFixed(1),
        humidity: Math.round(80 + Math.random() * 4),
        soilMoisture: Math.round(66 + Math.random() * 3),
        lightIntensity: Math.round(520 + Math.random() * 40),
        leafWetness: Math.round(85 + Math.random() * 6)
      });
    }
    return points;
  });

  const [isSimulating, setIsSimulating] = useState<boolean>(true);

  // Manual sliders for Risk Simulation
  const [sliderTemp, setSliderTemp] = useState<number>(29.4);
  const [sliderHumidity, setSliderHumidity] = useState<number>(82);
  const [sliderSoilMoisture, setSliderSoilMoisture] = useState<number>(67);
  const [sliderLeafWetness, setSliderLeafWetness] = useState<number>(88);

  // Smart Irrigation State
  const [soilMoistureThreshold, setSoilMoistureThreshold] = useState<number>(40);
  const [pumpStatus, setPumpStatus] = useState<'OFF' | 'ON'>('OFF');
  const [isAutoMode, setIsAutoMode] = useState<boolean>(true);
  const [irrigationLogs, setIrrigationLogs] = useState<string[]>([
    '[10:00:15] System booted: ESP32 FW v2.4.1 online on GPIO 26',
    '[10:00:20] Auto Irrigation Mode active: Threshold set to 40%',
    '[10:01:45] Soil moisture nominal (67%). Relay in idle state (OFF)'
  ]);

  // Disease Detection State
  const [selectedLeafType, setSelectedLeafType] = useState<string>('early-blight');
  const [customImage, setCustomImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [dnnStageIndex, setDnnStageIndex] = useState<number>(7); // Completed initially
  const [showGradCam, setShowGradCam] = useState<boolean>(false);
  const [detectionResult, setDetectionResult] = useState<DiseaseDetectionResult>({
    diseaseName: 'Early Blight',
    confidence: 91.3,
    severity: 'Moderate',
    affectedArea: 34,
    status: 'Infected',
    description: 'Alternaria solani infection characterized by concentric ring lesions on leaves with yellow halos.',
    gradCamAvailable: true,
    classProbabilities: [
      { name: 'Early Blight', probability: 91.3 },
      { name: 'Late Blight', probability: 4.8 },
      { name: 'Leaf Mold', probability: 2.1 },
      { name: 'Bacterial Spot', probability: 1.2 },
      { name: 'Healthy', probability: 0.6 }
    ]
  });

  // Zones & Alerts
  const [zones, setZones] = useState<FarmZone[]>(INITIAL_ZONES);
  const [selectedZone, setSelectedZone] = useState<FarmZone | null>(null);
  const [alerts, setAlerts] = useState<AlertItem[]>(INITIAL_ALERTS);

  // Chat State
  const [chatLanguage, setChatLanguage] = useState<'en' | 'ta'>('en');
  const [isAiTyping, setIsAiTyping] = useState<boolean>(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'ai',
      text: 'Hello! I am your Generative AI Agricultural Advisor. I am currently monitoring Zone A, B, and C with live IoT telemetries. How can I assist your crop management today?',
      timestamp: 'Just now',
      language: 'en'
    }
  ]);

  // MQTT Packets Stream
  const [mqttPackets, setMqttPackets] = useState<MqttPacket[]>([
    {
      id: 'pkt-1',
      topic: 'farm/telemetry/dht22',
      payload: '{"temp": 29.4, "humidity": 82.0}',
      timestamp: new Date().toLocaleTimeString(),
      qos: 1
    },
    {
      id: 'pkt-2',
      topic: 'farm/telemetry/soil',
      payload: '{"moisture": 67, "adc": 2180}',
      timestamp: new Date().toLocaleTimeString(),
      qos: 1
    },
    {
      id: 'pkt-3',
      topic: 'farm/actuator/relay',
      payload: '{"pump": "OFF", "state": 0}',
      timestamp: new Date().toLocaleTimeString(),
      qos: 1
    }
  ]);
  const [isMqttLive] = useState<boolean>(true);

  // Demo Presentation Mode State
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [currentDemoStep, setCurrentDemoStep] = useState<number>(1);
  const [isDemoPlaying, setIsDemoPlaying] = useState<boolean>(false);
  const demoTimerRef = useRef<number | null>(null);

  // Calculate Multimodal Risk dynamically based on sliders
  const calculateRisk = useCallback((): RiskAnalysis => {
    // Environmental risk based on high humidity (>70%) and high wetness (>75%)
    const humidityFactor = Math.max(0, (sliderHumidity - 60) * 1.8);
    const wetnessFactor = Math.max(0, (sliderLeafWetness - 50) * 1.2);
    const tempFungalFactor = (sliderTemp >= 24 && sliderTemp <= 32) ? 20 : 5;
    
    // Disease Risk calculation
    const rawDiseaseRisk = Math.min(98, Math.max(12, Math.round(30 + (humidityFactor * 0.45) + (wetnessFactor * 0.35) + tempFungalFactor)));
    
    // Water stress: high if soil moisture is low (<40%) or too flooded (>90%)
    const rawWaterStress = sliderSoilMoisture < 45
      ? Math.round((45 - sliderSoilMoisture) * 2.2 + 20)
      : Math.round(Math.max(10, 100 - sliderSoilMoisture * 0.9));

    // Heat stress: high if temp > 32°C
    const rawHeatStress = sliderTemp > 28
      ? Math.min(95, Math.round((sliderTemp - 28) * 8 + 15))
      : 18;

    // Environmental Risk score
    const envRisk = Math.min(96, Math.round((humidityFactor * 0.5) + (wetnessFactor * 0.4) + (rawHeatStress * 0.2)));

    // Overall Crop Health: inversely proportional to highest stresses
    const healthPenalty = (rawDiseaseRisk * 0.4) + (rawWaterStress * 0.3) + (rawHeatStress * 0.3);
    const cropHealth = Math.max(20, Math.min(96, Math.round(100 - (healthPenalty * 0.55))));

    let diseaseStatus: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL' = 'LOW';
    if (rawDiseaseRisk >= 75) diseaseStatus = 'HIGH';
    else if (rawDiseaseRisk >= 50) diseaseStatus = 'MEDIUM';
    if (rawDiseaseRisk >= 88) diseaseStatus = 'CRITICAL';

    let healthStatus: 'Critical' | 'Poor' | 'Moderate' | 'Good' | 'Optimal' = 'Good';
    if (cropHealth >= 80) healthStatus = 'Optimal';
    else if (cropHealth >= 70) healthStatus = 'Good';
    else if (cropHealth >= 50) healthStatus = 'Moderate';
    else healthStatus = 'Poor';

    return {
      diseaseRisk: rawDiseaseRisk,
      diseaseRiskStatus: diseaseStatus,
      cropHealth: cropHealth,
      cropHealthStatus: healthStatus,
      waterStress: Math.min(95, rawWaterStress),
      heatStress: Math.min(95, rawHeatStress),
      environmentalRisk: Math.min(95, envRisk)
    };
  }, [sliderTemp, sliderHumidity, sliderSoilMoisture, sliderLeafWetness]);

  const riskAnalysis = calculateRisk();

  // Reset risk sliders
  const resetRiskSliders = () => {
    setSliderTemp(29.4);
    setSliderHumidity(82);
    setSliderSoilMoisture(67);
    setSliderLeafWetness(88);
  };

  // Toggle Live Simulation
  const toggleSimulation = () => {
    setIsSimulating(prev => !prev);
  };

  // Reset Sensor Data to nominal benchmark
  const resetSensorData = () => {
    setSensorData({ ...INITIAL_SENSORS, lastUpdated: 'Reset just now' });
    setSliderTemp(29.4);
    setSliderHumidity(82);
    setSliderSoilMoisture(67);
    setSliderLeafWetness(88);
    setPumpStatus('OFF');
  };

  const updateManualSensor = (type: 'temp' | 'humidity' | 'soil' | 'wetness', value: number) => {
    if (type === 'temp') {
      setSliderTemp(value);
      setSensorData(s => ({ ...s, temperature: value }));
    } else if (type === 'humidity') {
      setSliderHumidity(value);
      setSensorData(s => ({ ...s, humidity: value }));
    } else if (type === 'soil') {
      setSliderSoilMoisture(value);
      setSensorData(s => ({ ...s, soilMoisture: value }));
    } else if (type === 'wetness') {
      setSliderLeafWetness(value);
      setSensorData(s => ({
        ...s,
        leafWetness: value,
        leafWetnessStatus: value > 75 ? 'HIGH' : value > 40 ? 'MODERATE' : 'LOW'
      }));
    }
  };

  // Automated Sensor Fluctuations (Every 2.5 seconds when simulating)
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setSensorData(prev => {
        // Temperature fluctuates slightly between 27 and 34
        const tempDelta = (Math.random() - 0.48) * 0.4;
        const newTemp = +(Math.min(34.2, Math.max(27.1, prev.temperature + tempDelta))).toFixed(1);

        // Humidity fluctuates between 68 and 90
        const humDelta = (Math.random() - 0.5) * 1.2;
        const newHum = Math.round(Math.min(92, Math.max(68, prev.humidity + humDelta)));

        // Soil moisture slowly evaporates or increases if pump is ON
        let newMoisture = prev.soilMoisture;
        if (pumpStatus === 'ON') {
          newMoisture = Math.min(85, prev.soilMoisture + 3);
        } else {
          // Slow evaporation
          const evap = Math.random() > 0.6 ? 1 : 0;
          newMoisture = Math.max(25, prev.soilMoisture - evap);
        }

        // Light fluctuates
        const newLight = Math.round(Math.min(750, Math.max(380, prev.lightIntensity + (Math.random() - 0.5) * 20)));

        // Leaf wetness follows humidity
        const newWetness = Math.round(Math.min(98, Math.max(40, newHum + (Math.random() * 8 - 4))));

        const now = new Date();
        const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });

        // Update history
        setSensorHistory(hist => {
          const next = [...hist.slice(1), {
            time: timeStr,
            temperature: newTemp,
            humidity: newHum,
            soilMoisture: newMoisture,
            lightIntensity: newLight,
            leafWetness: newWetness
          }];
          return next;
        });

        // Add MQTT packet occasionally
        if (Math.random() > 0.4) {
          const newPkt: MqttPacket = {
            id: `pkt-${Date.now()}`,
            topic: Math.random() > 0.5 ? 'farm/telemetry/sensors' : 'farm/telemetry/dht22',
            payload: JSON.stringify({ temp: newTemp, humidity: newHum, soil_moisture: newMoisture }),
            timestamp: timeStr,
            qos: 1
          };
          setMqttPackets(p => [newPkt, ...p.slice(0, 14)]);
        }

        return {
          temperature: newTemp,
          humidity: newHum,
          soilMoisture: newMoisture,
          lightIntensity: newLight,
          leafWetness: newWetness,
          leafWetnessStatus: newWetness > 75 ? 'HIGH' : newWetness > 45 ? 'MODERATE' : 'LOW',
          lastUpdated: 'Live streaming'
        };
      });
    }, 2800);

    return () => clearInterval(interval);
  }, [isSimulating, pumpStatus]);

  // Smart Irrigation Auto Control Loop
  useEffect(() => {
    if (!isAutoMode) return;

    if (sensorData.soilMoisture < soilMoistureThreshold) {
      if (pumpStatus !== 'ON') {
        setPumpStatus('ON');
        const timestamp = new Date().toLocaleTimeString();
        setIrrigationLogs(prev => [
          `[${timestamp}] 🔴 THRESHOLD BREACH: Soil moisture ${sensorData.soilMoisture}% < ${soilMoistureThreshold}%`,
          `[${timestamp}] ⚡ ESP32 DECISION: Triggering GPIO 26 relay pin HIGH`,
          `[${timestamp}] 💧 RELAY ON: Submersible irrigation pump ACTIVATED`,
          ...prev.slice(0, 15)
        ]);
      }
    } else if (sensorData.soilMoisture >= soilMoistureThreshold + 15) {
      // Auto shutoff after reaching hysteresis buffer
      if (pumpStatus === 'ON') {
        setPumpStatus('OFF');
        const timestamp = new Date().toLocaleTimeString();
        setIrrigationLogs(prev => [
          `[${timestamp}] 🟢 MOISTURE RESTORED: Soil moisture reached ${sensorData.soilMoisture}%`,
          `[${timestamp}] ⚡ ESP32 DECISION: GPIO 26 relay pin LOW`,
          `[${timestamp}] 🛑 RELAY OFF: Water pump DEACTIVATED automatically`,
          ...prev.slice(0, 15)
        ]);
      }
    }
  }, [sensorData.soilMoisture, soilMoistureThreshold, pumpStatus, isAutoMode]);

  // Manual Pump toggle
  const setPumpStatusManual = (status: 'OFF' | 'ON') => {
    setPumpStatus(status);
    const timestamp = new Date().toLocaleTimeString();
    setIrrigationLogs(prev => [
      `[${timestamp}] 👤 MANUAL OVERRIDE: User switched pump to ${status}`,
      `[${timestamp}] ⚡ Relay command executed via Web Dashboard`,
      ...prev.slice(0, 15)
    ]);
  };

  // Run DNN Analysis pipeline
  const runDnnAnalysis = (leafId?: string, customImg?: string) => {
    const targetId = leafId || selectedLeafType;
    const leafConfig = SAMPLE_LEAVES.find(l => l.id === targetId) || SAMPLE_LEAVES[0];

    setIsAnalyzing(true);
    setDnnStageIndex(0);

    // Step through the 7 stages of inference
    const stageTimes = [400, 700, 1100, 1600, 2200, 2800, 3400];
    stageTimes.forEach((delay, idx) => {
      setTimeout(() => {
        setDnnStageIndex(idx + 1);
        if (idx === 6) {
          setIsAnalyzing(false);
          setShowGradCam(true);

          if (customImg) {
            setDetectionResult({
              diseaseName: 'Early Blight',
              confidence: 91.3,
              severity: 'Moderate',
              affectedArea: 34,
              status: 'Infected',
              description: 'Alternaria solani infection detected on uploaded sample with characteristic target spots.',
              gradCamAvailable: true,
              classProbabilities: [
                { name: 'Early Blight', probability: 91.3 },
                { name: 'Late Blight', probability: 4.8 },
                { name: 'Leaf Mold', probability: 2.1 },
                { name: 'Bacterial Spot', probability: 1.2 },
                { name: 'Healthy', probability: 0.6 }
              ]
            });
          } else {
            setDetectionResult({
              diseaseName: leafConfig.defaultDisease,
              confidence: leafConfig.confidence,
              severity: leafConfig.severity,
              affectedArea: leafConfig.affectedArea,
              status: leafConfig.defaultDisease === 'Healthy' ? 'Healthy' : 'Infected',
              description: leafConfig.description,
              gradCamAvailable: leafConfig.defaultDisease !== 'Healthy',
              classProbabilities: leafConfig.probabilities
            });
          }
        }
      }, delay);
    });
  };

  // Alerts Management
  const resolveAlert = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, resolved: true } : a));
  };

  const addAlert = (alertData: Omit<AlertItem, 'id' | 'timestamp' | 'resolved'>) => {
    const newAlert: AlertItem = {
      ...alertData,
      id: `alt-${Date.now()}`,
      timestamp: 'Just now',
      resolved: false
    };
    setAlerts(prev => [newAlert, ...prev]);
  };

  // Generative AI Chat messaging with Tamil/English responses
  const sendMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      language: chatLanguage
    };

    setChatMessages(prev => [...prev, userMsg]);
    setIsAiTyping(true);

    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (chatLanguage === 'ta') {
        // Tamil Responses
        if (lower.includes('water') || lower.includes('தண்ணீர்') || lower.includes('பாசனம்')) {
          reply = `தற்போதைய மண் ஈரப்பதம் ${sensorData.soilMoisture}% ஆக உள்ளது (வரம்பு: ${soilMoistureThreshold}%). உடனடி பாசனம் தேவையில்லை. மண் ஈரப்பதம் ${soilMoistureThreshold}%-க்கு கீழ் குறையும் போது ESP32 தானியங்கி பாசனம் செயல்படுத்தப்படும்.`;
        } else if (lower.includes('early blight') || lower.includes('நோய்') || lower.includes('இலை')) {
          reply = `தக்காளி பயிரில் Early Blight (Alternaria solani) 91.3% துல்லியத்துடன் கண்டறியப்பட்டுள்ளது. தற்போதைய ஈரப்பதம் (${sensorData.humidity}%) அதிகமாக இருப்பதால் பூஞ்சை பரவும் வாய்ப்புள்ளது. பாதிக்கப்பட்ட இலைகளை உடனடியாக அகற்றி, ஆர்கானிக் காப்பர் பூஞ்சைக் கொல்லியை தெளிக்கவும். இலைகளில் மேல் நீர் தெளிப்பதைத் தவிர்க்கவும்.`;
        } else {
          reply = `IoT சென்சார்கள் தற்போதைய வெப்பநிலை ${sensorData.temperature}°C மற்றும் ஈரப்பதம் ${sensorData.humidity}% என காட்டுகின்றன. பயிர் ஆரோக்கியம் ${riskAnalysis.cropHealth}/100. பயிர் பாதுகாப்பு மற்றும் ஊட்டச்சத்து மேலாண்மைக்கு நாங்கள் தொடர்ந்து வழிகாட்டுவோம்.`;
        }
      } else {
        // English Responses
        if (lower.includes('water') || lower.includes('irrigate') || lower.includes('irrigation')) {
          if (sensorData.soilMoisture < soilMoistureThreshold) {
            reply = `Current soil moisture is low at ${sensorData.soilMoisture}%, which is below the safe threshold of ${soilMoistureThreshold}%. The ESP32 automated irrigation relay has been triggered to activate root-zone drip lines.`;
          } else {
            reply = `Current soil moisture is sufficient at ${sensorData.soilMoisture}%, well above the configured ${soilMoistureThreshold}% threshold. Immediate irrigation is not necessary. Continuous monitoring remains active to prevent overwatering and fungal root rot.`;
          }
        } else if (lower.includes('early blight') || lower.includes('blight') || lower.includes('disease') || lower.includes('treatment')) {
          reply = `Early Blight (Alternaria solani) has been confirmed with 91.3% confidence via the EfficientNet-B0 DNN model. Current ambient humidity (${sensorData.humidity}%) and leaf wetness (${sensorData.leafWetness}%) create favorable spore dissemination conditions. Recommended actions: 1) Prune lower infected leaflets with disinfected shears, 2) Avoid overhead spray irrigation, 3) Apply copper hydroxide or Bacillus subtilis bio-fungicide, 4) Ensure polyhouse ventilation fans are active.`;
        } else if (lower.includes('humidity') || lower.includes('weather') || lower.includes('temperature')) {
          reply = `Environmental sensors indicate Temp: ${sensorData.temperature}°C, Relative Humidity: ${sensorData.humidity}%, and Leaf Wetness: ${sensorData.leafWetnessStatus}. This microclimate yields an elevated Disease Risk Score of ${riskAnalysis.diseaseRisk}/100. Fungal sporulation rates peak when humidity exceeds 80% for >6 hours.`;
        } else {
          reply = `Based on current multimodal data (Leaf Diagnosis: ${detectionResult.diseaseName}, Temp: ${sensorData.temperature}°C, Soil: ${sensorData.soilMoisture}%), the overall Crop Health index is evaluated at ${riskAnalysis.cropHealth}/100. I recommend inspecting Zone C for localized blight spread and maintaining scheduled drip irrigation.`;
        }
      }

      const aiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'ai',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        language: chatLanguage,
        contextSnippet: `Context: Temp ${sensorData.temperature}°C | Humidity ${sensorData.humidity}% | Disease: ${detectionResult.diseaseName}`
      };

      setChatMessages(prev => [...prev, aiMsg]);
      setIsAiTyping(false);
    }, 1200);
  };

  // Demo Presentation Walkthrough Logic
  const executeStepActions = useCallback((stepNumber: number) => {
    const stepConfig = DEMO_STEPS.find(s => s.step === stepNumber);
    if (!stepConfig) return;

    // Switch to target tab
    setActiveTab(stepConfig.targetTab);

    switch (stepNumber) {
      case 1: // Sensors Start
        setIsSimulating(true);
        break;
      case 2: // Sensor readings appear
        setSensorData({
          temperature: 29.4,
          humidity: 82,
          soilMoisture: 67,
          lightIntensity: 540,
          leafWetness: 88,
          leafWetnessStatus: 'HIGH',
          lastUpdated: 'Live Telemetry Active'
        });
        break;
      case 3: // Leaf image appears
        setSelectedLeafType('early-blight');
        setShowGradCam(false);
        break;
      case 4: // DNN processing starts
        runDnnAnalysis('early-blight');
        break;
      case 5: // Early Blight is detected
        setDetectionResult({
          diseaseName: 'Early Blight',
          confidence: 91.3,
          severity: 'Moderate',
          affectedArea: 34,
          status: 'Infected',
          description: 'Alternaria solani infection detected with concentric necrotic rings.',
          gradCamAvailable: true,
          classProbabilities: [
            { name: 'Early Blight', probability: 91.3 },
            { name: 'Late Blight', probability: 4.8 },
            { name: 'Leaf Mold', probability: 2.1 },
            { name: 'Bacterial Spot', probability: 1.2 },
            { name: 'Healthy', probability: 0.6 }
          ]
        });
        break;
      case 6: // Grad-CAM visualization appears
        setShowGradCam(true);
        break;
      case 7: // Environmental risk increases
        setSliderHumidity(82);
        setSliderLeafWetness(88);
        setSliderTemp(29.4);
        break;
      case 8: // Disease Risk becomes 78%
        // Sliders already set yield 78% risk
        break;
      case 9: // GenAI recommendation appears
        sendMessage('What should I do about Early Blight?');
        break;
      case 10: // Soil moisture becomes low
        setSliderSoilMoisture(34);
        setSensorData(s => ({ ...s, soilMoisture: 34 }));
        break;
      case 11: // ESP32 decision appears
        setSoilMoistureThreshold(40);
        break;
      case 12: // Relay activates
      case 13: // Water pump turns ON
        setPumpStatus('ON');
        break;
      case 14: // Dashboard updates & celebration
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        break;
    }
  }, []);

  const goToDemoStep = (stepNumber: number) => {
    if (stepNumber >= 1 && stepNumber <= 14) {
      setCurrentDemoStep(stepNumber);
      executeStepActions(stepNumber);
    }
  };

  const nextDemoStep = () => {
    if (currentDemoStep < 14) {
      goToDemoStep(currentDemoStep + 1);
    } else {
      setIsDemoPlaying(false);
    }
  };

  const prevDemoStep = () => {
    if (currentDemoStep > 1) {
      goToDemoStep(currentDemoStep - 1);
    }
  };

  const startFullDemo = () => {
    setIsDemoMode(true);
    setCurrentDemoStep(1);
    setIsDemoPlaying(true);
    executeStepActions(1);
  };

  const pauseDemo = () => {
    setIsDemoPlaying(false);
    if (demoTimerRef.current !== null) window.clearInterval(demoTimerRef.current);
  };

  const resumeDemo = () => {
    setIsDemoPlaying(true);
  };

  const restartDemo = () => {
    setCurrentDemoStep(1);
    setIsDemoPlaying(true);
    executeStepActions(1);
  };

  // Demo Auto-playback timer
  useEffect(() => {
    if (isDemoPlaying && isDemoMode) {
      demoTimerRef.current = window.setInterval(() => {
        setCurrentDemoStep(prev => {
          if (prev >= 14) {
            setIsDemoPlaying(false);
            if (demoTimerRef.current !== null) window.clearInterval(demoTimerRef.current);
            return 14;
          }
          const next = prev + 1;
          executeStepActions(next);
          return next;
        });
      }, 4200);
    } else {
      if (demoTimerRef.current !== null) window.clearInterval(demoTimerRef.current);
    }

    return () => {
      if (demoTimerRef.current !== null) window.clearInterval(demoTimerRef.current);
    };
  }, [isDemoPlaying, isDemoMode, executeStepActions]);

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        sensorData,
        sensorHistory,
        isSimulating,
        toggleSimulation,
        resetSensorData,
        updateManualSensor,
        sliderTemp,
        sliderHumidity,
        sliderSoilMoisture,
        sliderLeafWetness,
        setSliderTemp,
        setSliderHumidity,
        setSliderSoilMoisture,
        setSliderLeafWetness,
        resetRiskSliders,
        riskAnalysis,
        selectedLeafType,
        setSelectedLeafType,
        customImage,
        setCustomImage,
        isAnalyzing,
        dnnStageIndex,
        detectionResult,
        showGradCam,
        setShowGradCam,
        runDnnAnalysis,
        soilMoistureThreshold,
        setSoilMoistureThreshold,
        pumpStatus,
        isAutoMode,
        setIsAutoMode,
        setPumpStatusManual,
        irrigationLogs,
        zones,
        selectedZone,
        setSelectedZone,
        alerts,
        resolveAlert,
        addAlert,
        chatMessages,
        chatLanguage,
        setChatLanguage,
        isAiTyping,
        sendMessage,
        mqttPackets,
        isMqttLive,
        isDemoMode,
        setIsDemoMode,
        currentDemoStep,
        isDemoPlaying,
        demoSteps: DEMO_STEPS,
        startFullDemo,
        pauseDemo,
        resumeDemo,
        restartDemo,
        goToDemoStep,
        nextDemoStep,
        prevDemoStep
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
