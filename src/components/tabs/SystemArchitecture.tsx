import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Radio,
  Camera,
  Zap,
  Droplets,
  Wifi,
  Share2,
  Globe,
  Server,
  Activity,
  Layers,
  Sparkles,
  Bot,
  LayoutDashboard,
  User,
  CheckCircle2,
  X,
  Info
} from 'lucide-react';

interface ComponentDetail {
  title: string;
  layer: string;
  tech: string;
  description: string;
  ioSpec: string;
}

export const SystemArchitecture: React.FC = () => {
  const [selectedComp, setSelectedComp] = useState<ComponentDetail | null>(null);

  const architectureLayers = [
    {
      id: 'edge',
      title: 'EDGE — FARM',
      badge: 'Layer 1: Perception & Physical Actuation',
      borderColor: 'border-emerald-500/40',
      bgColor: 'bg-emerald-950/20',
      components: [
        {
          title: 'Camera + IoT Sensors',
          layer: 'EDGE — FARM',
          tech: 'DHT22, Capacitive Soil V1.2, BH1750, Leaf Wetness, OV2640',
          description: 'Physical environmental transduction. Measures canopy temperature, relative humidity, light lux, dielectric moisture, and captures foliage imagery.',
          ioSpec: 'Input: Physical parameters -> Output: Analog ADC voltages / I2C frames'
        },
        {
          title: 'ESP32 Microcontroller',
          layer: 'EDGE — FARM',
          tech: 'Xtensa Dual-Core 32-bit LX6 MCU @ 240MHz with FreeRTOS',
          description: 'Edge computing node. Performs sensor polling, ADC conversion, calibration filtering, WiFi stack management, and autonomous threshold logic for irrigation.',
          ioSpec: 'Input: Sensor signals -> Output: MQTT JSON messages & GPIO 26 trigger'
        },
        {
          title: '5V Relay Module',
          layer: 'EDGE — FARM',
          tech: 'Songle SRD-05VDC-SL-C with Optocoupler isolation',
          description: 'Galvanically isolated switching stage translating 3.3V logic signals into high-current power contact closure for the water pump.',
          ioSpec: 'Input: ESP32 GPIO 26 3.3V logic -> Output: 230V AC / 12V DC power switch'
        },
        {
          title: 'Water Pump',
          layer: 'EDGE — FARM',
          tech: '12V DC Brushless Submersible Pump / Drip Emitters',
          description: 'Physical agricultural actuator delivering precision root-zone drip irrigation to restore soil moisture above wilting threshold.',
          ioSpec: 'Input: Relay power connection -> Output: 4.2 L/min pressurized water delivery'
        }
      ]
    },
    {
      id: 'connectivity',
      title: 'CONNECTIVITY',
      badge: 'Layer 2: Transport & Messaging Fabric',
      borderColor: 'border-cyan-500/40',
      bgColor: 'bg-cyan-950/20',
      components: [
        {
          title: 'Wi-Fi 802.11 b/g/n',
          layer: 'CONNECTIVITY',
          tech: '2.4 GHz IEEE 802.11 b/g/n Wi-Fi with WPA2-PSK Enterprise',
          description: 'Local edge wireless transmission bridging the farm sensor nodes to the on-site gateway router.',
          ioSpec: 'Bandwidth: Up to 150 Mbps | Range: ~100m Line of Sight'
        },
        {
          title: 'MQTT Broker',
          layer: 'CONNECTIVITY',
          tech: 'EMQX / Eclipse Mosquitto v3.1.1 (Port 1883/8883 TLS)',
          description: 'Lightweight publish/subscribe messaging broker handling telemetry topics with Quality of Service (QoS 1) guarantees.',
          ioSpec: 'Topics: farm/zones/telemetry, farm/actuators/relay'
        },
        {
          title: 'Internet Gateway',
          layer: 'CONNECTIVITY',
          tech: 'Cellular 4G LTE / Fiber Optic WAN with WireGuard VPN',
          description: 'Secure uplink routing edge field packets to cloud infrastructure and API endpoints.',
          ioSpec: 'Protocol: TCP/IP over TLS 1.3'
        }
      ]
    },
    {
      id: 'backend',
      title: 'BACKEND / INTELLIGENCE',
      badge: 'Layer 3: Neural Networks & Multimodal Reasoning',
      borderColor: 'border-indigo-500/40',
      bgColor: 'bg-indigo-950/20',
      components: [
        {
          title: 'Backend Server',
          layer: 'BACKEND / INTELLIGENCE',
          tech: 'FastAPI (Python 3.11), Uvicorn ASGI, PostgreSQL + TimescaleDB',
          description: 'High-throughput async server coordinating MQTT ingestion, time-series telemetry storage, model inference queues, and WebSocket streams.',
          ioSpec: 'REST Endpoints + WSS real-time sockets'
        },
        {
          title: 'Environmental Risk Analysis',
          layer: 'BACKEND / INTELLIGENCE',
          tech: 'Bioclimatic Empirical Spore Germination Algorithms',
          description: 'Evaluates pathogen incubation risks using Mills Period and high leaf-wetness duration models.',
          ioSpec: 'Input: Temp, Humidity, Wetness -> Output: Disease Risk Index (0-100)'
        },
        {
          title: 'DNN Disease Detection (EfficientNet-B0)',
          layer: 'BACKEND / INTELLIGENCE',
          tech: 'PyTorch / ONNX Runtime Transfer-Learned EfficientNet-B0',
          description: 'Deep Convolutional Neural Network classifying tomato leaf diseases across 5 pathological classes with MBConv feature blocks.',
          ioSpec: 'Input: 224x224x3 Tensor -> Output: Softmax Probability Distribution'
        },
        {
          title: 'Data Fusion Core',
          layer: 'BACKEND / INTELLIGENCE',
          tech: 'Early/Late Multimodal Feature Concatenation Vector',
          description: 'Fuses visual latent embeddings with physical sensor telemetry vectors for holistically validated diagnosis.',
          ioSpec: 'Vector: [CNN_Feature_Map ⊕ Weather_Vector]'
        },
        {
          title: 'Generative AI Advisor',
          layer: 'BACKEND / INTELLIGENCE',
          tech: 'Retrieval-Augmented Generation (RAG) + Domain LLM Prompting',
          description: 'Translates quantitative risk and disease predictions into natural language recommendations in English and Tamil.',
          ioSpec: 'Input: Multimodal Context Prompt -> Output: Agronomic Advisory Response'
        }
      ]
    },
    {
      id: 'action',
      title: 'USER / ACTION',
      badge: 'Layer 4: Decision Support & Agronomic Closed Loop',
      borderColor: 'border-emerald-400/40',
      bgColor: 'bg-emerald-950/20',
      components: [
        {
          title: 'Web Dashboard',
          layer: 'USER / ACTION',
          tech: 'React 19, TypeScript, Tailwind CSS, SVG Visualizers',
          description: 'Interactive control center rendering real-time telemetry, Grad-CAM heatmaps, sensor controls, and sector diagnostics.',
          ioSpec: 'User-facing browser responsive UI'
        },
        {
          title: 'Farmer / Agronomist',
          layer: 'USER / ACTION',
          tech: 'Human-in-the-Loop Operational Management',
          description: 'Receives alerts, verifies AI recommendations, schedules organic fungicides, and maintains farm zones.',
          ioSpec: 'Action authorization & field verification'
        },
        {
          title: 'AI Recommendations',
          layer: 'USER / ACTION',
          tech: 'Prioritized Agronomic Action Engine',
          description: 'Actionable guidance on ventilation fan triggers, biological copper fungicides, and canopy pruning.',
          ioSpec: 'Categorized by Priority (High / Med / Action)'
        },
        {
          title: 'Automated Irrigation',
          layer: 'USER / ACTION',
          tech: 'Closed-Loop Closed Feedback Hydraulic Actuation',
          description: 'Autonomous water delivery ensuring root zones remain above stress thresholds without human intervention.',
          ioSpec: 'Setpoint: 40% Moisture Buffer'
        }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-5 rounded-2xl bg-[#09150d] border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-mono tracking-widest text-emerald-400 font-bold">
              Engineering System Architecture
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950 border border-emerald-500/40 text-emerald-300 font-bold">
              4-TIER PIPELINE
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-1 flex items-center gap-2">
            <Network className="w-6 h-6 text-emerald-400" />
            <span>FULL SYSTEM ARCHITECTURE & COMPONENT INSPECTOR</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Click any component block to inspect hardware specifications, protocol bindings, data structures, and computational roles.
          </p>
        </div>

        <div className="text-xs font-mono text-emerald-300 bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/40">
          Interactive Architecture Map
        </div>
      </div>

      {/* 4 Layers Flow (Requirement 16) */}
      <div className="space-y-4">
        {architectureLayers.map((layer, lIdx) => (
          <div
            key={layer.id}
            className={`p-5 rounded-2xl border ${layer.borderColor} ${layer.bgColor} transition-all`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <h3 className="font-mono font-bold text-base text-white tracking-wide">
                  {layer.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-emerald-300/80">
                {layer.badge}
              </span>
            </div>

            {/* Component Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {layer.components.map((comp, cIdx) => (
                <div
                  key={cIdx}
                  onClick={() => setSelectedComp(comp)}
                  className="p-3.5 rounded-xl bg-black/50 border border-emerald-900/40 hover:border-emerald-400/80 hover:bg-black/70 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <h4 className="font-bold text-xs text-white group-hover:text-emerald-300 transition-colors">
                      {comp.title}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-400 mt-1 line-clamp-2">
                      {comp.tech}
                    </p>
                  </div>

                  <div className="pt-2 mt-2 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                    <span>Inspect Specs</span>
                    <Info className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                  </div>
                </div>
              ))}
            </div>

            {/* Downward Connector Arrow */}
            {lIdx < architectureLayers.length - 1 && (
              <div className="flex justify-center -mb-8 mt-4 relative z-10">
                <div className="w-7 h-7 rounded-full bg-emerald-950 border border-emerald-500/50 flex items-center justify-center text-xs font-bold text-emerald-400 shadow-md">
                  ↓
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Component Inspector Modal when clicked */}
      {selectedComp && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#0c1a12] border border-emerald-500/50 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-emerald-900/40 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">
                  {selectedComp.layer}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedComp.title}</h3>
              </div>
              <button
                onClick={() => setSelectedComp(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-emerald-950"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div className="p-3 rounded-xl bg-black/40 border border-emerald-900/40 font-mono">
                <span className="text-[10px] text-slate-400 block uppercase">Technology / Framework</span>
                <span className="font-bold text-emerald-300">{selectedComp.tech}</span>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">Architectural Role:</span>
                <p className="text-slate-300 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/30">
                  {selectedComp.description}
                </p>
              </div>

              <div>
                <span className="font-bold text-white block mb-1">I/O Specification:</span>
                <div className="p-2.5 rounded-xl bg-black/50 border border-emerald-900/40 font-mono text-[11px] text-cyan-300">
                  {selectedComp.ioSpec}
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedComp(null)}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
